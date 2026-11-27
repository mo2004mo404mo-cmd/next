/**
 * POST /api/agent/chat/v2/cancel
 *
 * Explicit, authenticated kill switch for an ACTIVE deep-agent run.
 *
 * Context (stream-interruption fix): chat v2 runs are DETACHED from the SSE
 * connection — a page reload no longer aborts the run; it keeps executing
 * server-side so the finished answer lands in the thread and the client's
 * restore monitor recovers it. That means aborting the local fetch alone no
 * longer stops a run, which is exactly what the UI Stop button used to do.
 *
 * The Stop button therefore calls this endpoint (fire-and-forget, keepalive)
 * with the requestId from the run's `meta` SSE event. We look the run up in
 * the in-process registry, verify ownership, and abort its run-scoped
 * AbortController. The chat v2 route then persists whatever partial text
 * exists, flagged `interrupted: true`, and the client shows an honest
 * "answer was interrupted" hint with a retry affordance on restore.
 *
 * Auth: caller must resolve to the run's owner (session or guest fallback).
 * Responses are idempotent — cancelling a finished/unknown run is 200 OK.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cancelActiveRun } from '@/lib/agent/runs/registry';
import { resolveUserId } from '@/lib/auth-helpers';
import { rateLimit } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let body: { requestId?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    // Empty/invalid body — fall through to validation below.
  }
  const requestId = typeof body.requestId === 'string' ? body.requestId : '';
  if (!requestId || !/^[a-zA-Z0-9_-]{8,64}$/.test(requestId)) {
    return NextResponse.json({ error: 'Invalid requestId' }, { status: 400 });
  }

  const userId = await resolveUserId().catch(() => null);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const rl = await rateLimit({ key: `agent-run-cancel:${userId}`, max: 30, windowMs: 60_000 }).catch(() => null);
  if (rl && !rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const result = cancelActiveRun(requestId, userId);
  if (result.reason === 'forbidden') {
    // Do not confirm or deny the existence of another user's run.
    return NextResponse.json({ cancelled: false }, { status: 200 });
  }

  return NextResponse.json(
    { cancelled: result.cancelled },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
