import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { resolveUserId, unauthorized, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { createMiroTalkJoinUrl } from '@/lib/mirotalk-server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to start a meeting.');

  const body = await req.json().catch(() => ({})) as {
    roomId?: unknown;
    callType?: unknown;
  };
  const roomId = typeof body.roomId === 'string' ? body.roomId : '';
  if (!roomId) return badRequest('Missing roomId.');

  const membership = await db.chatRoomMember.findFirst({
    where: { roomId, userId },
    select: { id: true },
  });
  if (!membership) {
    return NextResponse.json({ error: 'You are not a member of this room.' }, { status: 403 });
  }

  const user = await db.user.findUnique({ where: { id: userId }, select: { name: true } });
  const callType = body.callType === 'voice' ? 'voice' : 'video';
  const meeting = await createMiroTalkJoinUrl({
    room: `group-${randomBytes(18).toString('hex')}`,
    name: String(user?.name || 'MedQ participant').slice(0, 80),
    audio: true,
    video: callType === 'video',
  });
  if (!meeting.ok) {
    return NextResponse.json({ error: meeting.error }, { status: meeting.status });
  }

  return NextResponse.json({ joinUrl: meeting.url, room: meeting.room });
});
