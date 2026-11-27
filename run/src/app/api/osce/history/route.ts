/**
 * /api/osce/history — the caller's past OSCE sessions.
 *
 * GET /api/osce/history
 *   → { sessions: [{ id, title, score, status, durationSec, createdAt }] }
 *
 * Titles/summaries only — full transcripts and results are fetched by id
 * via GET /api/osce/history?sessionId=… (owner-scoped).
 */
import { NextResponse } from 'next/server';
import { resolveUserId, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export const GET = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const sessionId = new URL(req.url).searchParams.get('sessionId');

  if (sessionId) {
    const session = await db.osceSession.findFirst({ where: { id: sessionId, userId } });
    if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({
      session: {
        id: session.id,
        scenario: JSON.parse(session.scenario),
        transcript: JSON.parse(session.transcript),
        result: session.result ? JSON.parse(session.result) : null,
        status: session.status,
        durationSec: session.durationSec,
        createdAt: session.createdAt,
      },
    });
  }

  const sessions = await db.osceSession.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 30,
    select: { id: true, scenario: true, result: true, status: true, durationSec: true, createdAt: true },
  });

  return NextResponse.json({
    sessions: sessions.map((s) => {
      let title = 'OSCE encounter';
      let score: number | null = null;
      try {
        const scenario = JSON.parse(s.scenario);
        title = scenario.title ?? title;
        if (s.result) score = JSON.parse(s.result).score ?? null;
      } catch { /* corrupted JSON — keep defaults */ }
      return { id: s.id, title, score, status: s.status, durationSec: s.durationSec, createdAt: s.createdAt.toISOString() };
    }),
  });
});
