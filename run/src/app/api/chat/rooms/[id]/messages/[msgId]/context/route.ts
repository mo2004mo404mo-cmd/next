import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

/**
 * GET /api/chat/rooms/[id]/messages/[msgId]/context?before=20&after=20
 *
 * Fetches the messages surrounding a target message, so a deep-link recipient
 * landing on `/messages?room=X&msg=Y` can render a continuous conversation
 * instead of jumping to a single orphan message.
 *
 * Returns:
 *   {
 *     target: ChatMessage,
 *     before: ChatMessage[],  // older messages, oldest first, length ≤ before
 *     after:  ChatMessage[],  // newer messages, oldest first, length ≤ after
 *     nextCursorBefore: string | null  // for further backwards paging
 *   }
 *
 * Membership is enforced — 403 if the caller is not a member of `roomId`.
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
    if (!membership) {
      return NextResponse.json({ error: 'Not a member of this room' }, { status: 403 });
    }

    // Locate the target message — it must belong to the requested room.
    const target = await db.chatMessage.findUnique({
      where: { id: msgId },
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
    if (!target || target.roomId !== roomId || target.isDeleted) {
      return NextResponse.json({ error: 'Message not found in this room' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const before = Math.min(parseInt(searchParams.get('before') || '20'), 100);
    const after = Math.min(parseInt(searchParams.get('after') || '20'), 100);

    // Older messages: createdAt < target.createdAt, newest-first, then reverse.
    const beforeMsgs = await db.chatMessage.findMany({
      where: {
        roomId,
        isDeleted: false,
        createdAt: { lt: target.createdAt },
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
      orderBy: { createdAt: 'desc' },
      take: before,
    });

    // Newer messages: createdAt > target.createdAt, oldest-first.
    const afterMsgs = await db.chatMessage.findMany({
      where: {
        roomId,
        isDeleted: false,
        createdAt: { gt: target.createdAt },
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
      orderBy: { createdAt: 'asc' },
      take: after,
    });

    // Cursor for further backwards paging: id of the oldest message in `before`.
    const nextCursorBefore = beforeMsgs.length === before
      ? beforeMsgs[beforeMsgs.length - 1].id
      : null;

    return NextResponse.json({
      target,
      before: beforeMsgs.reverse(),  // oldest → newest
      after: afterMsgs,              // oldest → newest
      nextCursorBefore,
    });
  } catch (error) {
    console.error('Error fetching message context:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
