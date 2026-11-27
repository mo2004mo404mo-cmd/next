import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// GET /api/chat/rooms/[id] - Get room details
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;

    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId: id, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    const room = await db.chatRoom.findUnique({
      where: { id },
      include: {
        members: {
          include: { user: { select: { id: true, name: true, image: true, specialty: true, isOnline: true, lastActiveAt: true } } },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          where: { isDeleted: false },
          include: { sender: { select: { id: true, name: true } } },
        },
      },
    });

    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });

    // Normalize to the same ChatRoomInfo shape returned by GET /api/chat/rooms
    // so the client can pass it directly to openRoom().
    const otherMembers = room.members.filter(mm => mm.userId !== userId);
    const lastMessage = room.messages[0];
    const name = room.type === 'direct'
      ? otherMembers[0]?.user.name || 'Direct Chat'
      : room.name;
    const avatar = room.type === 'direct'
      ? otherMembers[0]?.user.name?.[0]?.toUpperCase() || '?'
      : room.avatar || '👥';

    const unreadCount = await db.chatMessage.count({
      where: {
        roomId: room.id,
        senderId: { not: userId },
        isDeleted: false,
        createdAt: { gt: membership.lastReadAt },
      },
    });

    const normalizedRoom = {
      id: room.id,
      type: room.type,
      name,
      avatar,
      description: room.description,
      createdBy: room.createdBy,
      lastMessage: lastMessage ? {
        id: lastMessage.id,
        content: lastMessage.content,
        senderName: lastMessage.sender.name,
        createdAt: lastMessage.createdAt,
        type: lastMessage.type,
      } : null,
      members: room.members.map(mm => ({
        id: mm.user.id,
        name: mm.user.name,
        image: mm.user.image,
        role: mm.role,
        isOnline: mm.user.isOnline,
        lastActiveAt: mm.user.lastActiveAt,
      })),
      unreadCount,
      lastMessageAt: room.lastMessageAt,
      isPinned: membership.isPinned,
      isMuted: membership.isMuted,
      pinOrder: membership.pinOrder,
    };

    return NextResponse.json({ room: normalizedRoom });
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/chat/rooms/[id] - Update room settings (name, avatar, description)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id: roomId } = await params;
    const { name, avatar, description, pinnedMessageIds, transferAdminTo } = await req.json();

    // Verify caller is admin
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });
    if (membership.role !== 'admin') return NextResponse.json({ error: 'Only admins can update room settings' }, { status: 403 });

    // Verify room is a group
    const room = await db.chatRoom.findUnique({ where: { id: roomId } });
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    if (room.type !== 'group') return NextResponse.json({ error: 'Can only update group chat settings' }, { status: 400 });

    // Handle admin transfer
    if (transferAdminTo) {
      // Verify target user is a member of the room
      const targetMembership = await db.chatRoomMember.findUnique({
        where: { roomId_userId: { roomId, userId: transferAdminTo } },
      });
      if (!targetMembership) return NextResponse.json({ error: 'Target user is not a member of this room' }, { status: 400 });

      // Demote current admin to member
      await db.chatRoomMember.update({
        where: { roomId_userId: { roomId, userId } },
        data: { role: 'member' },
      });

      // Promote target user to admin
      await db.chatRoomMember.update({
        where: { roomId_userId: { roomId, userId: transferAdminTo } },
        data: { role: 'admin' },
      });

      // Create system message about admin transfer
      const currentUser = await db.user.findUnique({ where: { id: userId } });
      const targetUser = await db.user.findUnique({ where: { id: transferAdminTo } });
      await db.chatMessage.create({
        data: {
          roomId,
          senderId: userId,
          content: `${currentUser?.name || 'Admin'} transferred admin rights to ${targetUser?.name || 'a member'}`,
          type: 'system',
          metadata: JSON.stringify({ systemEvent: 'admin_transferred', fromUser: userId, toUser: transferAdminTo }),
        },
      });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (avatar !== undefined) updateData.avatar = avatar;
    if (description !== undefined) updateData.description = description;
    if (pinnedMessageIds !== undefined) updateData.pinnedMessageIds = JSON.stringify(pinnedMessageIds);

    const updatedRoom = await db.chatRoom.update({
      where: { id: roomId },
      data: updateData,
      include: {
        members: { include: { user: { select: { id: true, name: true, image: true } } } },
      },
    });

    // Broadcast update via chat service
    try {
      await fetch('http://localhost:3004/emit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'update:room',
          room: roomId,
          data: updatedRoom,
        }),
      });
    } catch (e) {
      console.error('Failed to broadcast room update via chat service:', e);
    }

    return NextResponse.json({ room: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/chat/rooms/[id] - Delete room (admin only) or leave room
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id: roomId } = await params;
    const { deleteRoom } = await req.json();

    // Verify membership
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    if (deleteRoom) {
      // Delete entire room - admin only
      if (membership.role !== 'admin') {
        return NextResponse.json({ error: 'Only admins can delete a room' }, { status: 403 });
      }

      // Verify it's a group chat (can't delete direct chats)
      const room = await db.chatRoom.findUnique({ where: { id: roomId } });
      if (!room || room.type !== 'group') {
        return NextResponse.json({ error: 'Can only delete group chats' }, { status: 400 });
      }

      await db.chatRoom.delete({ where: { id: roomId } });
      return NextResponse.json({ success: true, message: 'Room deleted' });
    } else {
      // Leave room
      await db.chatRoomMember.delete({
        where: { roomId_userId: { roomId, userId } },
      });

      // If last member left, delete the room
      const remainingMembers = await db.chatRoomMember.count({
        where: { roomId },
      });
      if (remainingMembers === 0) {
        await db.chatRoom.delete({ where: { id: roomId } });
      } else if (membership.role === 'admin') {
        // If admin leaves, promote the oldest member to admin
        const oldestMember = await db.chatRoomMember.findFirst({
          where: { roomId, userId: { not: userId } },
          orderBy: { joinedAt: 'asc' },
        });
        if (oldestMember) {
          await db.chatRoomMember.update({
            where: { id: oldestMember.id },
            data: { role: 'admin' },
          });
        }
      }

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting/leaving room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
