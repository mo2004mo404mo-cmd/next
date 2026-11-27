import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

/**
 * GET /api/chat/rooms/[id]/messages/[msgId]/thread
 *
 * Retrieves all threaded replies for a given parent message.
 * Returns the parent message with thread metadata plus all replies in chronological order.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; msgId: string }> }
) {
  try {
    const { id: roomId, msgId } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Verify membership
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    // Get the parent message
    const parentMessage = await db.chatMessage.findUnique({
      where: { id: msgId },
      include: {
        sender: { select: { id: true, name: true, image: true } },
      },
    });

    if (!parentMessage || parentMessage.roomId !== roomId) {
      return NextResponse.json({ error: 'Message not found in this room' }, { status: 404 });
    }

    // Get all threaded replies (messages whose replyToId = msgId OR whose metadata.threadId = msgId)
    const threadReplies = await db.chatMessage.findMany({
      where: {
        roomId,
        isDeleted: false,
        OR: [
          { replyToId: msgId },
          { metadata: { contains: `"threadId":"${msgId}"` } },
          { metadata: { contains: `"threadId": "${msgId}"` } },
        ],
      },
      include: {
        sender: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Compute thread metadata
    const participantIds = new Set<string>([parentMessage.senderId]);
    for (const reply of threadReplies) {
      participantIds.add(reply.senderId);
    }

    const lastReply = threadReplies.length > 0
      ? threadReplies[threadReplies.length - 1]
      : null;

    return NextResponse.json({
      parentMessage,
      threadReplies,
      threadMeta: {
        threadId: msgId,
        replyCount: threadReplies.length,
        participantCount: participantIds.size,
        participantIds: Array.from(participantIds),
        lastReplyAt: lastReply?.createdAt || parentMessage.createdAt,
        lastReplyPreview: lastReply
          ? lastReply.content.slice(0, 80) + (lastReply.content.length > 80 ? '...' : '')
          : null,
      },
    });
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/chat/rooms/[id]/messages/[msgId]/thread
 *
 * Send a reply within a thread. Creates a new message with thread metadata.
 * Body: { content, type?, metadata? }
 */

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; msgId: string }> }
) {
  try {
    const { id: roomId, msgId } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { content, type, metadata } = body;

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Verify membership
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId, userId } },
    });
    if (!membership) return NextResponse.json({ error: 'Not a member' }, { status: 403 });

    // Verify parent message exists in this room
    const parentMessage = await db.chatMessage.findUnique({
      where: { id: msgId },
      include: {
        sender: { select: { id: true, name: true } },
      },
    });

    if (!parentMessage || parentMessage.roomId !== roomId) {
      return NextResponse.json({ error: 'Parent message not found in this room' }, { status: 400 });
    }

    // Build metadata with thread info
    const threadMetadata = {
      ...(typeof metadata === 'object' ? metadata : {}),
      threadId: msgId,
      threadRoot: false,
    };

    // Create the threaded reply message
    const message = await db.chatMessage.create({
      data: {
        roomId,
        senderId: userId,
        content: content.trim(),
        type: type || 'text',
        metadata: JSON.stringify(threadMetadata),
        replyToId: msgId, // Link to parent via replyToId
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

    // Broadcast thread reply via chat service
    try {
      await fetch('http://localhost:3004/emit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'thread-reply',
          room: roomId,
          data: {
            message,
            threadId: msgId,
            parentSenderId: parentMessage.senderId,
          },
        }),
      });
    } catch (e) {
      console.error('Failed to broadcast thread reply via chat service:', e);
    }

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error sending thread reply:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
