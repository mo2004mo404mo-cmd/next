/**
 * GET /api/agent/threads/[threadId]/messages
 *
 * Read-only thread history endpoint. Primary consumers:
 *   1. The floating assistant's network-drop recovery (useAgentV2Stream):
 *      when the SSE wire breaks mid-turn, the server keeps executing the
 *      agent run and persists the finished assistant message. The client
 *      polls this endpoint to pick that message back up and complete the
 *      turn instead of surfacing a dead "network error".
 *   2. Future thread-replay UI (restore a past conversation on reopen).
 *
 * Auth: the caller must resolve to a user (session or guest fallback) that
 * owns the thread — thread ids are random UUIDs but ownership is still
 * enforced so one user can never read another user's transcript.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getThreadMessages } from '@/lib/agent/threads/service';
import { resolveUserId } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> },
) {
  const { threadId } = await params;
  if (!threadId || !/^[a-zA-Z0-9-]{8,64}$/.test(threadId)) {
    return NextResponse.json({ error: 'Invalid thread id' }, { status: 400 });
  }

  const userId = await resolveUserId().catch(() => null);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const messages = await getThreadMessages(threadId, userId, 200);
  return NextResponse.json(
    { threadId, messages },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
