/**
 * Exam Simulation — History
 *
 * GET /api/exam-sim/history
 *   Returns the user's completed simulation attempts with score summaries.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

export const GET = withErrorHandler(async () => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const attempts = await db.examAttempt.findMany({
    where: { userId },
    orderBy: { completedAt: 'desc' },
    take: 20,
    include: {
      exam: { select: { id: true, title: true, description: true, duration: true } },
    },
  });

  return NextResponse.json({
    attempts: attempts.map((a) => {
      let meta: Record<string, unknown> = {};
      try { meta = JSON.parse(a.answers || '{}'); } catch { /* ignore */ }
      const score = typeof meta.score === 'number' ? meta.score : a.totalQuestions ? a.score / a.totalQuestions : 0;
      return {
        id: a.id,
        examId: a.examId,
        title: a.exam?.title || 'Simulation',
        description: a.exam?.description || '',
        score: a.score,
        totalQuestions: a.totalQuestions,
        percentage: Math.round(score * 1000) / 10,
        completedAt: a.completedAt,
      };
    }),
  });
});
