/**
 * Question Search for Exam Simulator
 *
 * GET /api/exam-sim/search-questions?q=...&system=...&topic=...&limit=...
 *
 * Lightweight search endpoint for the "Pick questions" picker in the exam
 * simulator setup screen. Returns questions safe to show during exam
 * assembly (NO answer key, NO explanation — those are stripped).
 *
 * Used by the picker UI to let the user find specific questions by text,
 * organ system, or topic and add them to a custom exam block.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();
  const system = searchParams.get('system') || undefined;
  const topic = searchParams.get('topic') || undefined;
  const limit = Math.min(Math.max(Number(searchParams.get('limit')) || 50, 1), 200);

  // Build where clause — text search is case-insensitive contains
  const where: Record<string, unknown> = {
    type: { in: ['mcq', 'tf'] },
  };
  if (system && system !== 'all') where.system = system;
  if (topic && topic !== 'all') where.topic = topic;
  if (q) {
    // Use contains with insensitive mode for Postgres
    where.OR = [
      { text: { contains: q, mode: 'insensitive' } },
      { topic: { contains: q, mode: 'insensitive' } },
    ];
  }

  const rows = await db.question.findMany({
    where,
    select: {
      id: true,
      type: true,
      text: true,
      options: true,
      difficulty: true,
      system: true,
      topic: true,
      tags: true,
      isAIGenerated: true,
      reviewStatus: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  // Strip HTML from text for the picker preview, parse options
  const safe = rows.map((r) => {
    const opts = typeof r.options === 'string' ? safeParseArr(r.options) : (r.options as unknown as string[]) || [];
    const tags = typeof r.tags === 'string' ? safeParseArr(r.tags) : (r.tags as unknown as string[]) || [];
    return {
      id: r.id,
      type: r.type,
      text: stripHtml(r.text).slice(0, 200),
      optionsCount: opts.length,
      difficulty: r.difficulty,
      system: r.system,
      topic: r.topic,
      tags: tags.slice(0, 5),
      isAIGenerated: r.isAIGenerated,
      reviewStatus: r.reviewStatus,
    };
  });

  return NextResponse.json({ questions: safe, total: safe.length });
});

function stripHtml(s: string): string {
  return String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function safeParseArr(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
