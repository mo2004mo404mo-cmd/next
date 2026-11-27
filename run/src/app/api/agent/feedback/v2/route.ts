/**
 * Agent chat feedback API (v2).
 *
 * POST /api/agent/feedback/v2
 *   body: { feedback: 'positive' | 'negative', userMessage?, agentResponse?,
 *           reason?, comment?, threadId?, messageId?, llmCallCount?, toolCalls? }
 *
 * Persists one AgentFeedback row (rating up|down). Consumed by the floating
 * assistant's thumbs up/down (MedQAgentV3 giveFeedback → useAgentV2Stream
 * submitFeedback) so the rating survives reloads and can power future
 * reward-model / quality analytics. The client shows an honest failure toast
 * when this endpoint is unreachable — previously the request 404'd silently
 * while the UI claimed success.
 *
 * Auth: any resolved user (session or guest fallback) — feedback is always
 * attributable when possible but never blocked for guests.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { createLogger } from '@/lib/logger';

const log = createLogger('AgentFeedback');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const userId = await resolveUserId().catch(() => null);

  const body = await req.json().catch(() => null) as {
    feedback?: unknown;
    userMessage?: unknown;
    agentResponse?: unknown;
    reason?: unknown;
    comment?: unknown;
    threadId?: unknown;
    messageId?: unknown;
    llmCallCount?: unknown;
    toolCalls?: unknown;
    requestId?: unknown;
  } | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rating = body.feedback === 'positive' ? 'up' : body.feedback === 'negative' ? 'down' : null;
  if (!rating) {
    return NextResponse.json({ error: 'feedback must be "positive" or "negative"' }, { status: 400 });
  }

  const asTrimmed = (v: unknown, max: number) =>
    typeof v === 'string' ? v.trim().slice(0, max) : undefined;

  const comment =
    asTrimmed(body.comment, 1000) ??
    asTrimmed(body.reason, 1000);

  const row = await db.agentFeedback.create({
    data: {
      userId: userId ?? undefined,
      threadId: asTrimmed(body.threadId, 64),
      messageId: asTrimmed(body.messageId, 64),
      rating,
      comment,
    },
  }).catch((error) => {
    log.warn?.('agentFeedback create failed:', error);
    return null;
  });

  if (!row) {
    return NextResponse.json({ error: 'Could not record feedback' }, { status: 500 });
  }

  log.info?.(`Feedback ${rating} recorded${userId ? ` for ${userId}` : ' (guest)'}${body.threadId ? ` on thread ${body.threadId}` : ''}`);
  return NextResponse.json({ ok: true, id: row.id, rating });
}
