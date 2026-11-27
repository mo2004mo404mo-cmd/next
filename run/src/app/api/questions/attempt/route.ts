/**
 * Question Attempt API — records an answer attempt and updates the question's
 * ADAPTIVE DIFFICULTY calibration from real user statistics.
 *
 * POST /api/questions/attempt
 *   Body: { questionId, selectedAnswer, confidence?, timeSpent?, mode? }
 *
 * The confidence field (sure | probably | guessing) captures the metacognition
 * rating the UI collects BEFORE the answer is revealed.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { recalibrateQuestion } from '@/lib/calibration';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const body = await req.json();
  const { questionId, selectedAnswer, confidence, timeSpent, mode } = body as {
    questionId?: string;
    selectedAnswer?: string;
    confidence?: string;
    timeSpent?: number;
    mode?: string;
  };

  if (!questionId) {
    return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
  }

  const question = await db.question.findUnique({
    where: { id: questionId },
    select: { id: true, answer: true },
  });
  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  // Grade the attempt against the stored answer key (normalized comparison)
  const norm = (s: string) => String(s ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const selected = String(selectedAnswer ?? '');
  const isCorrect =
    norm(selected) === norm(question.answer) ||
    (norm(selected).length > 3 && norm(selected).startsWith(norm(question.answer))) ||
    (norm(question.answer).length > 3 && norm(question.answer).startsWith(norm(selected)));

  const validConfidence = ['sure', 'probably', 'guessing'].includes(String(confidence)) ? String(confidence) : '';
  const validMode = ['bank', 'exam', 'review', 'weakness', 'smart', 'generate', 'flashcard', 'exam-sim'].includes(String(mode))
    ? String(mode)
    : 'bank';

  const attempt = await db.questionAttempt.create({
    data: {
      userId,
      questionId,
      selectedAnswer: selected.slice(0, 500),
      isCorrect,
      confidence: validConfidence,
      timeSpent: Math.min(Math.max(Number(timeSpent) || 0, 0), 3600),
      mode: validMode,
    },
  });

  // Recalibrate the question's difficulty from real user stats (best effort —
  // a calibration failure must never break the answering flow).
  let calibration: Awaited<ReturnType<typeof recalibrateQuestion>> = null;
  try {
    calibration = await recalibrateQuestion(questionId);
  } catch (err) {
    console.error('[attempt] calibration failed:', err instanceof Error ? err.message : err);
  }

  return NextResponse.json(
    {
      attempt,
      isCorrect,
      calibration,
    },
    { status: 201 },
  );
});
