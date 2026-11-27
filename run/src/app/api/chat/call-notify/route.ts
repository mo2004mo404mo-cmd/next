import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, unauthorized, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { sendPushToUser } from '@/lib/server/push';
import { randomBytes } from 'node:crypto';
import { createMiroTalkJoinUrl } from '@/lib/mirotalk-server';

/**
 * POST /api/chat/call-notify — start ringing the other side of a chat room.
 *
 * Called by the global CallProvider when the caller presses the call button:
 *
 *   1. Emits `call:invite` to the chat socket service → every member with the
 *      app open (any page — the provider listens app-wide) gets the in-app
 *      ringer. The socket service also stores it as a pending invite, so a
 *      member whose app connects late (e.g. tapped the push notification)
 *      still rings within the 45 s window.
 *   2. Sends a web push to members with NO live socket — "receive the call
 *      even when not in the app". Online status comes from the socket
 *      service's /online endpoint so we never double-notify a connected user.
 *
 * Body: { roomId, callType: 'voice' | 'video', callerName? }
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CHAT_SOCKET_URL = process.env.CHAT_SOCKET_URL || 'http://localhost:3004';

interface CallNotifyBody {
  roomId?: string;
  callType?: 'voice' | 'video';
  callerName?: string;
}

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to start calls.');

  const body = (await req.json().catch(() => ({}))) as CallNotifyBody;
  const roomId = String(body.roomId ?? '');
  const callType = body.callType === 'video' ? 'video' : 'voice';
  if (!roomId) return badRequest('Missing roomId.');

  // The caller must be a member of the room (prevents ringing arbitrary rooms).
  const membership = await db.chatRoomMember.findFirst({
    where: { roomId, userId },
    select: { id: true, role: true },
  });
  if (!membership) return NextResponse.json({ error: 'You are not a member of this room.' }, { status: 403 });

  const caller = await db.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });
  const callerName = String(body.callerName || caller?.name || 'Someone').slice(0, 80);
  const meeting = await createMiroTalkJoinUrl({
    room: `call-${randomBytes(18).toString('hex')}`,
    name: callerName,
    audio: true,
    video: callType === 'video',
  });
  if (!meeting.ok) {
    return NextResponse.json({ error: meeting.error }, { status: meeting.status });
  }

  // 1) In-app ring: broadcast the invite through the socket service. It also
  //    stores it as a pending invite for late joiners.
  let delivered = 0;
  try {
    const res = await fetch(`${CHAT_SOCKET_URL}/emit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'call:invite',
        room: roomId,
        data: { roomId, callerUserId: userId, callerName, callType, joinUrl: meeting.url },
      }),
    });
    if (res.ok) delivered = 1;
  } catch {
    // Socket service down — pushes still go out below.
  }

  // 2) Out-of-app ring: web push to members without a live socket.
  const members = await db.chatRoomMember.findMany({
    where: { roomId, userId: { not: userId }, isMuted: false },
    select: { userId: true },
  });

  let pushed = 0;
  let offlineMembers: string[] = members.map((m) => m.userId);
  if (members.length > 0) {
    try {
      const ids = members.map((m) => m.userId).join(',');
      const onlineRes = await fetch(`${CHAT_SOCKET_URL}/online?ids=${encodeURIComponent(ids)}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (onlineRes.ok) {
        const data = (await onlineRes.json()) as { online?: string[] };
        const onlineSet = new Set(data.online ?? []);
        offlineMembers = members.map((m) => m.userId).filter((id) => !onlineSet.has(id));
      }
    } catch {
      // Status probe failed — fall back to pushing everyone (better a
      // duplicate notification than a missed call).
    }

    await Promise.all(
      offlineMembers.map(async (memberId) => {
        try {
          const result = await sendPushToUser(memberId, {
            title: `Incoming ${callType} call`,
            body: `${callerName} is calling you on MedQ`,
            url: `/messages?room=${encodeURIComponent(roomId)}`,
            tag: `medq-call:${roomId}`,
            data: { kind: 'call', roomId, callType, callerUserId: userId },
          });
          if (result.sent > 0) pushed += 1;
        } catch {
          // One member's push must never block the call.
        }
      }),
    );
  }

  return NextResponse.json({
    ok: true,
    invited: delivered,
    pushed,
    offline: offlineMembers.length,
    joinUrl: meeting.url,
  });
});
