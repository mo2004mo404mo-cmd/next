/**
 * Create a MiroTalk SFU meeting link for an active OSCE session.
 *
 * This uses MiroTalk's REST API to create a password-protected room join
 * URL. The embedded client handles peer media; MedQ's parent page separately
 * runs browser speech recognition and the AI patient turn flow.
 */
import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { audit } from '@/lib/agent/audit';
import { db } from '@/lib/db';
import { createMiroTalkJoinUrl } from '@/lib/mirotalk-server';

export const runtime = 'nodejs';
export const maxDuration = 30;

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const body = await req.json().catch(() => ({})) as { sessionId?: unknown };
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  if (!sessionId) return badRequest('sessionId is required');

  const session = await db.osceSession.findFirst({
    where: { id: sessionId, userId, status: 'active' },
    select: { id: true },
  });
  if (!session) {
    return NextResponse.json({ error: 'Active session not found' }, { status: 404 });
  }

  const room = `osce-${session.id}`.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
  const identity = userId.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
  const meeting = await createMiroTalkJoinUrl({
    room,
    name: `Student-${identity.slice(0, 12)}`,
    audio: true,
    video: false,
  });
  if (!meeting.ok) {
    return NextResponse.json({ error: meeting.error }, { status: meeting.status });
  }

  await audit({
    userId,
    action: 'integration.save',
    target: 'osce.voice.start',
    detail: { room, sessionId: session.id, provider: 'mirotalk' },
  });

  return NextResponse.json({ sessionId: session.id, room: meeting.room, url: meeting.url });
});
