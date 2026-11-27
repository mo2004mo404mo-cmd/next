import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// GET /api/chat/messages?roomId=...&cursor=...&limit=50&search=...
export async function GET(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('roomId');
    const cursor = searchParams.get('cursor');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const search = searchParams.get('search') || '';

    if (!roomId) return NextResponse.json({ error: 'roomId is required' }, { status: 400 });

    // Verify membership
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    const where: any = {
      roomId,
      isDeleted: false,
      ...(cursor ? { id: { lt: cursor } } : {}),
      ...(search ? { content: { contains: search } } : {}),
    };

    const messages = await db.chatMessage.findMany({
      where,
      include: {
        sender: { select: { id: true, name: true, image: true } },
        replyTo: {
          select: {
            id: true,
            content: true,
            senderId: true,
            sender: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Update lastReadAt only when explicitly requested
    const updateRead = searchParams.get('updateRead') === 'true';
    if (updateRead) {
      await db.chatRoomMember.update({
        where: { roomId_userId: { roomId, userId } },
        data: { lastReadAt: new Date() },
      });
    }

    const nextCursor = messages.length === limit ? messages[messages.length - 1].id : null;

    return NextResponse.json({
      messages: messages.reverse(),
      nextCursor,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/chat/messages - Send a message
export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { roomId, content, type, metadata, replyToId } = await req.json();

    if (!roomId || !content?.trim()) return NextResponse.json({ error: 'roomId and content are required' }, { status: 400 });

    // Verify membership
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    // Validate replyToId if provided
    if (replyToId) {
      const replyToMessage = await db.chatMessage.findUnique({
        where: { id: replyToId },
      });
      if (!replyToMessage || replyToMessage.roomId !== roomId) {
        return NextResponse.json({ error: 'Reply message not found in this room' }, { status: 400 });
      }
    }

    // Save message
    const message = await db.chatMessage.create({
      data: {
        roomId,
        senderId: userId,
        content: content.trim(),
        type: type || 'text',
        metadata: JSON.stringify(metadata || {}),
        replyToId: replyToId || null,
      },
      include: {
        sender: { select: { id: true, name: true, image: true } },
        replyTo: {
          select: {
            id: true,
            content: true,
            senderId: true,
            sender: { select: { id: true, name: true } },
          },
        },
      },
    });

    // Update room lastMessageAt
    await db.chatRoom.update({
      where: { id: roomId },
      data: { lastMessageAt: new Date() },
    });

    // Broadcast via chat service
    try {
      await fetch('http://localhost:3004/emit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new:message',
          room: roomId,
          data: message,
        }),
      });
    } catch (e) {
      console.error('Failed to broadcast via chat service:', e);
    }

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/chat/messages - Edit a message (change content, set isDeleted, set isPinned)
export async function PATCH(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { messageId, content, isDeleted, isPinned, metadata, deleteForEveryone } = await req.json();

    if (!messageId) return NextResponse.json({ error: 'messageId is required' }, { status: 400 });

    const existingMessage = await db.chatMessage.findUnique({
      where: { id: messageId },
    });
    if (!existingMessage) return NextResponse.json({ error: 'Message not found' }, { status: 404 });

    // Check membership for any modification
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId: existingMessage.roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member of this room' }, { status: 403 });

    // "Delete for Everyone" - admin can delete any message, sender can delete their own
    if (deleteForEveryone) {
      if (existingMessage.senderId !== userId && membership.role !== 'admin') {
        return NextResponse.json({ error: 'Only the sender or admin can delete for everyone' }, { status: 403 });
      }
      // Hard delete: actually remove the message from the database
      await db.chatMessage.delete({ where: { id: messageId } });

      // Broadcast deletion via chat service
      try {
        await fetch('http://localhost:3004/emit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'delete:message',
            room: existingMessage.roomId,
            data: { messageId, deletedForEveryone: true },
          }),
        });
      } catch (e) {
        console.error('Failed to broadcast message deletion via chat service:', e);
      }

      return NextResponse.json({ deleted: true, messageId });
    }

    // Only the sender can edit content or soft-delete
    if ((content !== undefined || isDeleted !== undefined) && existingMessage.senderId !== userId) {
      return NextResponse.json({ error: 'Only the sender can edit or delete this message' }, { status: 403 });
    }

    // Pin/unpin authorization (Telegram behavior):
    // • Direct chats: any participant (membership already verified above).
    // • Group chats: only admins can pin/unpin. This is the Telegram default
    //   for groups — non-admins see the option grayed out and the API rejects
    //   the action with 403. Defense-in-depth: the client also enforces this,
    //   but the server is the source of truth.
    if (isPinned !== undefined) {
      const room = await db.chatRoom.findUnique({
        where: { id: existingMessage.roomId },
        select: { type: true },
      });
      if (room?.type === 'group' && membership.role !== 'admin') {
        return NextResponse.json(
          { error: 'Only group admins can pin or unpin messages' },
          { status: 403 }
        );
      }
    }

    const updateData: any = {};
    if (content !== undefined) {
      updateData.content = content.trim();
      updateData.editedAt = new Date();
    }
    if (isDeleted !== undefined) {
      updateData.isDeleted = isDeleted;
      if (isDeleted) updateData.editedAt = new Date();
    }
    if (isPinned !== undefined) {
      updateData.isPinned = isPinned;
    }
    if (metadata !== undefined) {
      updateData.metadata = typeof metadata === 'string' ? metadata : JSON.stringify(metadata);
    }

    const message = await db.chatMessage.update({
      where: { id: messageId },
      data: updateData,
      include: {
        sender: { select: { id: true, name: true, image: true } },
        replyTo: {
          select: {
            id: true,
            content: true,
            senderId: true,
            sender: { select: { id: true, name: true } },
          },
        },
      },
    });

    // Broadcast update via chat service
    try {
      await fetch('http://localhost:3004/emit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'update:message',
          room: existingMessage.roomId,
          data: message,
        }),
      });
    } catch (e) {
      console.error('Failed to broadcast message update via chat service:', e);
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error editing message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
