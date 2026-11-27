/**
 * Exam Simulation — Start
 *
 * POST /api/exam-sim/start
 *   Body: { count?, durationMinutes?, system? }
 *   Creates a timed USMLE-style block: balanced across organ systems when
 *   possible, preferring medically-reviewed questions, excluding questions the
 *   user attempted in the last 14 days when the bank is large enough. Returns
 *   the exam WITHOUT answer keys (grading happens server-side at submit).
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

/** Fields safe to send to the client DURING the exam (no answer key). */
const SAFE_FIELDS = {
  id: true, type: true, text: true, options: true, difficulty: true,
  system: true, topic: true, tags: true, isAIGenerated: true,
  imageUrl: true, audioUrl: true, videoUrl: true, modelUrl: true,
  labPanel: true, pcgSpec: true, hotspots: true, structureTags: true,
  blueprintOrgan: true, blueprintTask: true, sources: true,
} as const;

interface RankedQuestion {
  id: string;
  system: string;
  blueprintOrgan: string;
  reviewStatus: string;
  difficultyP: number;
  attemptsCount: number;
}

function rank(q: RankedQuestion): number {
  let score = 0;
  if (q.reviewStatus === 'approved') score += 2;
  if (q.difficultyP >= 0 && q.attemptsCount >= 3) score += 1;
  return -score; // ascending sort → best first
}

export const POST = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const count = Math.min(Math.max(Number(body.count) || 40, 5), 60);
  const durationMinutes = Math.min(Math.max(Number(body.durationMinutes) || Math.round(count * 1.5), 10), 240);
  const systemFilter = typeof body.system === 'string' && body.system !== 'all' ? body.system : undefined;

  // ── Custom question picker ──
  // When the user picks specific questions in the setup picker, the client
  // sends questionIds: string[]. We bypass random sampling entirely and use
  // those questions in the order they were picked. Validates: at least 5,
  // at most 60, all must exist and be MCQ/TF.
  const customQuestionIds: string[] | undefined = Array.isArray(body.questionIds)
    ? body.questionIds.filter((x: unknown): x is string => typeof x === 'string' && x.length > 0)
    : undefined;

  let pickedIds: string[] = [];

  if (customQuestionIds && customQuestionIds.length >= 5) {
    // Validate the picked questions exist + are exam-compatible
    const valid = await db.question.findMany({
      where: { id: { in: customQuestionIds }, type: { in: ['mcq', 'tf'] } },
      select: { id: true },
    });
    const validSet = new Set(valid.map((q) => q.id));
    // Preserve the user's order
    pickedIds = customQuestionIds.filter((id) => validSet.has(id));
    if (pickedIds.length < 5) {
      return NextResponse.json(
        { error: 'Not enough valid questions in your selection (need at least 5).' },
        { status: 400 },
      );
    }
    pickedIds = pickedIds.slice(0, 60);
  } else {
    // ── Random balanced blueprint (original logic) ──
    const baseWhere = {
      type: { in: ['mcq', 'tf'] },
      ...(systemFilter ? { system: systemFilter } : {}),
    };

    // Questions recently attempted by this user (exclude last-14-days attempts)
    const recentQuestionIds: string[] = [];
    try {
      const since = new Date(Date.now() - 14 * 24 * 3600 * 1000);
      const recents = await db.questionAttempt.findMany({
        where: { userId, createdAt: { gte: since }, question: baseWhere },
        select: { questionId: true },
        distinct: ['questionId'],
        take: 100,
      });
      recentQuestionIds.push(...recents.map((r) => r.questionId));
    } catch { /* best effort */ }

    const whereFresh = {
      ...baseWhere,
      ...(recentQuestionIds.length ? { id: { notIn: recentQuestionIds } } : {}),
    };

    const totalFresh = await db.question.count({ where: whereFresh });
    const where = totalFresh >= count ? whereFresh : baseWhere;

    // Bucket by organ system for a balanced blueprint
    const sampled = await db.question.findMany({
      where,
      select: { id: true, system: true, blueprintOrgan: true, reviewStatus: true, difficultyP: true, attemptsCount: true },
      take: 800,
      orderBy: { createdAt: 'desc' },
    });
    const buckets = new Map<string, RankedQuestion[]>();
    for (const q of sampled) {
      const bucketKey = q.blueprintOrgan || q.system || 'General';
      if (!buckets.has(bucketKey)) buckets.set(bucketKey, []);
      buckets.get(bucketKey)!.push(q);
    }
    for (const list of buckets.values()) list.sort((a, b) => rank(a) - rank(b));

    // Round-robin across buckets for an organ-balanced exam
    const picked: RankedQuestion[] = [];
    const bucketKeys = [...buckets.keys()];
    let guard = 0;
    while (picked.length < count && guard < 5000) {
      let progressed = false;
      for (const key of bucketKeys) {
        if (picked.length >= count) break;
        const list = buckets.get(key)!;
        const next = list.shift();
        if (next) {
          picked.push(next);
          progressed = true;
        }
      }
      if (!progressed) break;
      guard++;
    }

    if (picked.length < 5) {
      return NextResponse.json(
        { error: 'Not enough questions in the bank to build an exam. Generate or import more questions first.' },
        { status: 400 },
      );
    }

    pickedIds = picked.map((q) => q.id);
  }
  const exam = await db.exam.create({
    data: {
      title: `USMLE-style Simulation · ${new Date().toLocaleDateString()} · ${pickedIds.length} questions`,
      description: customQuestionIds
        ? `Custom selection of ${pickedIds.length} questions`
        : systemFilter ? `Focused on ${systemFilter}` : 'Balanced across organ systems',
      duration: durationMinutes,
      questions: {
        create: pickedIds.map((questionId, order) => ({ questionId, order })),
      },
    },
  });

  const questions = await db.question.findMany({
    where: { id: { in: pickedIds } },
    select: SAFE_FIELDS,
  });
  const byId = new Map(questions.map((q) => [q.id, q]));
  const orderedQuestions = pickedIds.map((id) => byId.get(id)).filter(Boolean);

  // Blueprint preview of what actually got picked
  const breakdown = new Map<string, number>();
  for (const q of orderedQuestions) {
    const key = (q as { blueprintOrgan?: string; system?: string }).blueprintOrgan || (q as { system?: string }).system || 'General';
    breakdown.set(key, (breakdown.get(key) || 0) + 1);
  }

  return NextResponse.json({
    examId: exam.id,
    title: exam.title,
    durationMinutes: exam.duration,
    count: orderedQuestions.length,
    questions: orderedQuestions,
    blueprintBreakdown: Object.fromEntries([...breakdown.entries()].sort((a, b) => b[1] - a[1])),
  });
});
