/**
 * Chat unread digest API — the Messages tab's "AI digest" button.
 *
 * POST /api/chat/digest  { roomId }
 *
 * Runs the chunked map-reduce digest (src/lib/chat/digest.ts — the SAME
 * engine the agent's summarize_unread_messages tool uses) over the user's
 * UNREAD messages in one room and returns the digest plus extracted events
 * (meetings, exam schedules, deadlines). Never marks the room as read.
 */
import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';
import { sendPushToUser } from '@/lib/server/push';
import { digestUnreadMessages } from '@/lib/chat/digest';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({})) as { roomId?: unknown; hours?: unknown };
    const roomId = typeof body.roomId === 'string' ? body.roomId : '';
    if (!roomId) return NextResponse.json({ error: 'roomId is required' }, { status: 400 });

    // Time-window mode: opening a room marks it read, so the Messages-tab
    // button offers "digest the last N hours" as the fallback scope.
    let since: Date | undefined;
    if (typeof body.hours === 'number' && Number.isFinite(body.hours)) {
      const hours = Math.min(Math.max(body.hours, 1), 24 * 30);
      since = new Date(Date.now() - hours * 60 * 60 * 1000);
    }

    const digest = await digestUnreadMessages({ userId, roomId, since });
    return NextResponse.json(digest);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = message === 'Not a member of that room' ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * PUT /api/chat/digest  { roomId, messageId?, title, body }
 *
 * "Notify me" for one extracted event: creates an in-app Notification and
 * sends the web push (deep-linking back to the room — or the exact message
 * when the digest carried its id). The user asked for this explicitly from
 * the digest dialog, so no HITL gate is needed here (unlike the agent tool).
 */
export async function PUT(req: Request) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({})) as {
      roomId?: unknown; messageId?: unknown; title?: unknown; body?: unknown;
    };
    const roomId = typeof body.roomId === 'string' ? body.roomId : '';
    const messageId = typeof body.messageId === 'string' ? body.messageId : '';
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const message = typeof body.body === 'string' ? body.body.trim() : '';
    if (!roomId || !title || !message) {
      return NextResponse.json({ error: 'roomId, title and body are required' }, { status: 400 });
    }

    // Membership check — notifications only for rooms the user belongs to.
    const membership = await db.chatRoomMember
      .findUnique({ where: { roomId_userId: { roomId, userId } } })
      .catch(() => null);
    if (!membership) {
      return NextResponse.json({ error: 'Not a member of that room' }, { status: 403 });
    }

    const created = await db.notification.create({
      data: {
        userId,
        type: roomId ? 'chat_mention' : 'system',
        title: title.slice(0, 120),
        message: message.slice(0, 300),
        referenceId: roomId && messageId ? `${roomId}:${messageId}` : (roomId || ''),
      },
    });
    // sendPushToUser returns real delivery stats (sendPushForNotification is
    // void); the deep-link mirrors the referenceId format it would compute.
    const push = await sendPushToUser(userId, {
      title,
      body: message,
      url: roomId && messageId
        ? `/messages?room=${roomId}&msg=${messageId}`
        : roomId ? `/messages?room=${roomId}` : '/',
      tag: 'medq-chat-event',
      data: { notificationId: created.id },
    }).catch(() => ({ sent: 0, failed: 0, total: 0, disabled: true }));
    return NextResponse.json({ sent: true, notificationId: created.id, push });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
