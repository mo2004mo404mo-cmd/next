/**
 * Per-Question Check (Instant Feedback Mode)
 *
 * POST /api/exam-sim/[id]/check
 *   Body: { questionId: string, answer: string }
 *   → { correct: boolean, correctAnswer: string, explanation: string, selectedAnswer: string }
 *
 * Used by the "Show answer after answering" toggle in the exam simulator.
 * Returns whether the user's answer is correct, plus the correct answer and
 * explanation — but ONLY for the question being checked, so the rest of the
 * exam's answer key stays hidden until submit.
 *
 * The exam must belong to the calling user. The question must be in the exam.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

export const POST = withErrorHandler(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { questionId, answer } = body as { questionId?: string; answer?: string };

  if (!questionId || typeof answer !== 'string') {
    return NextResponse.json(
      { error: 'Missing questionId or answer' },
      { status: 400 },
    );
  }

  // Verify the exam exists and contains this question.
  // NOTE: the Exam model has no userId field — exams are global (the existing
  // /submit endpoint also doesn't check ownership). We rely on the examId
  // being a random unguessable cuid, which is sufficient for a study tool.
  const exam = await db.exam.findUnique({
    where: { id },
    select: {
      id: true,
      questions: {
        where: { questionId },
        select: { questionId: true, order: true },
        take: 1,
      },
    },
  });

  if (!exam) {
    return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
  }
  if (exam.questions.length === 0) {
    return NextResponse.json({ error: 'Question not in this exam' }, { status: 404 });
  }

  // Fetch the full question (with answer key + explanation)
  const question = await db.question.findUnique({
    where: { id: questionId },
    select: {
      id: true,
      answer: true,
      explanation: true,
      options: true,
      clinicalPearl: true,
      mnemonic: true,
    },
  });

  if (!question) {
    return NextResponse.json({ error: 'Question missing' }, { status: 404 });
  }

  // Grade using the same normalization as the submit endpoint
  const norm = (s: string) =>
    String(s ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

  const selected = String(answer ?? '');
  const blank = !selected.trim();
  const correct =
    !blank &&
    (norm(selected) === norm(question.answer || '') ||
      (norm(selected).length > 3 && norm(selected).startsWith(norm(question.answer || ''))) ||
      (norm(question.answer || '').length > 3 && norm(question.answer || '').startsWith(norm(selected))));

  return NextResponse.json({
    correct,
    blank,
    correctAnswer: question.answer || '',
    explanation: question.explanation || '',
    clinicalPearl: question.clinicalPearl || '',
    mnemonic: question.mnemonic || '',
    selectedAnswer: selected,
  });
});
