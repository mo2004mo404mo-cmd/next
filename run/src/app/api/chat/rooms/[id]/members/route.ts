import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// GET /api/chat/rooms/[id]/members - List members with roles
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id: roomId } = await params;

    // Verify membership
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    const members = await db.chatRoomMember.findMany({
      where: { roomId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            specialty: true,
            isOnline: true,
            lastActiveAt: true,
          },
        },
      },
      orderBy: [{ role: 'asc' }, { joinedAt: 'asc' }],
    });

    return NextResponse.json({
      members: members.map(m => ({
        id: m.user.id,
        name: m.user.name,
        image: m.user.image,
        specialty: m.user.specialty,
        isOnline: m.user.isOnline,
        lastActiveAt: m.user.lastActiveAt,
        role: m.role,
        joinedAt: m.joinedAt,
        isMuted: m.isMuted,
      })),
    });
  } catch (error) {
    console.error('Error fetching room members:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/chat/rooms/[id]/members - Add member to group
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id: roomId } = await params;
    const { userId: newMemberId } = await req.json();

    if (!newMemberId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });

    // Verify caller is admin
    const callerMembership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!callerMembership || callerMembership.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can add members' }, { status: 403 });
    }

    // Verify room is a group
    const room = await db.chatRoom.findUnique({ where: { id: roomId } });
    if (!room || room.type !== 'group') {
      return NextResponse.json({ error: 'Can only add members to group chats' }, { status: 400 });
    }

    // Check if already a member
    const existingMembership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId: newMemberId } },
    });
    if (existingMembership) return NextResponse.json({ error: 'User is already a member' }, { status: 400 });

    // Add member
    const newMember = await db.chatRoomMember.create({
      data: { roomId, userId: newMemberId, role: 'member' },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    return NextResponse.json({ member: newMember }, { status: 201 });
  } catch (error) {
    console.error('Error adding member:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/chat/rooms/[id]/members - Remove member from group / leave group
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id: roomId } = await params;
    const { userId: targetUserId } = await req.json();

    const removeUserId = targetUserId || userId;

    // If removing someone else, verify caller is admin
    if (removeUserId !== userId) {
      const callerMembership = await db.chatRoomMember.findUnique({
        where: { roomId_userId: { roomId, userId } },
      });
      if (!callerMembership || callerMembership.role !== 'admin') {
        return NextResponse.json({ error: 'Only admins can remove members' }, { status: 403 });
      }
    }

    // Remove member
    await db.chatRoomMember.delete({
      where: { roomId_userId: { roomId, userId: removeUserId } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing member:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
