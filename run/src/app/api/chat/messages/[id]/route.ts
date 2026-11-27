import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

/**
 * GET /api/chat/messages/[id]
 *
 * Fetches a single chat message by ID, including sender + reply context.
 * Enforces room membership — only members of the room the message belongs to
 * can fetch it. Used by deep-link recipients who land on
 * `/messages?room=X&msg=Y` and need to look up the target message even if it
 * is older than the initially loaded 50 messages.
 *
 * Response: { message: ChatMessage }
 * Errors: 401 (no auth), 403 (not a member), 404 (not found / deleted)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: messageId } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const message = await db.chatMessage.findUnique({
      where: { id: messageId },
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

    if (!message || message.isDeleted) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Enforce membership — only members of the room can fetch the message.
    const membership = await db.chatRoomMember.findUnique({
      where: { roomId_userId: { roomId: message.roomId, userId } },
    });
    if (!membership) {
      return NextResponse.json({ error: 'Not a member of this room' }, { status: 403 });
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error fetching single message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
