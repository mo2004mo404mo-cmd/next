/**
 * Exam Simulation — Submit
 *
 * POST /api/exam-sim/[id]/submit
 *   Body: { answers: { [questionId]: selectedAnswer }, autoSubmitted?: boolean }
 *
 * Grades server-side (the client never sees the answer key during the exam),
 * records every answer as a QuestionAttempt (mode 'exam-sim' — feeding the
 * adaptive difficulty calibration + weakness analysis), saves the ExamAttempt
 * and returns a full score report:
 *   - overall score + pass-fail band (USMLE-style 55% / 70% bands)
 *   - per organ-system and per task breakdown (USMLE-style blueprint report)
 *   - per-question results with the full question (answers + explanations now
 *     included, so the client can render the review screen)
 *   - confidence metacognition stats when available
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

const PASS_MARK = 0.55;
const HIGH_PERFORMANCE = 0.7;

export const POST = withErrorHandler(async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const userId = await resolveUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { id } = await params;
  const exam = await db.exam.findUnique({
    where: { id },
    include: { questions: { orderBy: { order: 'asc' }, include: { question: true } } },
  });
  if (!exam) {
    return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
  }

  // One attempt per exam per user
  const existing = await db.examAttempt.findFirst({
    where: { examId: id, userId },
    orderBy: { completedAt: 'desc' },
  });
  if (existing) {
    return NextResponse.json({ error: 'This exam was already submitted.' }, { status: 409 });
  }

  const body = await req.json().catch(() => ({}));
  const answers = (body.answers && typeof body.answers === 'object' ? body.answers : {}) as Record<string, string>;
  const autoSubmitted = Boolean(body.autoSubmitted);

  const norm = (s: string) =>
    String(s ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

  interface ResultRow {
    questionId: string;
    order: number;
    correct: boolean;
    selectedAnswer: string;
    correctAnswer: string;
    correctIdx: number;
    blank: boolean;
  }

  const results: ResultRow[] = [];
  const perOrgan = new Map<string, { correct: number; total: number }>();
  const perTask = new Map<string, { correct: number; total: number }>();
  const confidenceBuckets = new Map<string, { correct: number; total: number }>();

  for (const eq of exam.questions) {
    const q = eq.question;
    const selected = String(answers[q.id] ?? '');
    const blank = !selected.trim();
    const correct =
      !blank &&
      (norm(selected) === norm(q.answer) ||
        (norm(selected).length > 3 && norm(selected).startsWith(norm(q.answer))) ||
        (norm(q.answer).length > 3 && norm(q.answer).startsWith(norm(selected))));

    results.push({
      questionId: q.id,
      order: eq.order,
      correct,
      selectedAnswer: selected,
      correctAnswer: q.answer,
      correctIdx: Array.isArray(JSON.parse(q.options || '[]'))
        ? JSON.parse(q.options).findIndex(
            (o: string) => norm(o) === norm(q.answer) || norm(q.answer).startsWith(norm(o)) || norm(o).startsWith(norm(q.answer)),
          )
        : -1,
      blank,
    });

    const organ = q.blueprintOrgan || q.system || 'General';
    const organStat = perOrgan.get(organ) || { correct: 0, total: 0 };
    organStat.total += 1;
    if (correct) organStat.correct += 1;
    perOrgan.set(organ, organStat);

    if (q.blueprintTask) {
      const taskStat = perTask.get(q.blueprintTask) || { correct: 0, total: 0 };
      taskStat.total += 1;
      if (correct) taskStat.correct += 1;
      perTask.set(q.blueprintTask, taskStat);
    }
  }

  const total = results.length;
  const correctCount = results.filter((r) => r.correct).length;
  const score = total ? correctCount / total : 0;

  // Record each answer as an attempt (feeds calibration + weakness targeting)
  // Best-effort bulk — failures must not break the report.
  try {
    const { recalibrateQuestion } = await import('@/lib/calibration');
    await db.questionAttempt.createMany({
      data: results.map((r) => ({
        userId,
        questionId: r.questionId,
        selectedAnswer: r.selectedAnswer.slice(0, 500) || '(blank)',
        isCorrect: r.correct,
        confidence: '',
        timeSpent: 60,
        mode: 'exam-sim',
      })),
    });
    // Recalibrate all touched questions in the background (best effort)
    for (const r of results) {
      recalibrateQuestion(r.questionId).catch(() => {});
    }
  } catch (err) {
    console.error('[exam-sim] recording attempts failed:', err instanceof Error ? err.message : err);
  }

  const attempt = await db.examAttempt.create({
    data: {
      userId,
      examId: id,
      score: correctCount,
      totalQuestions: total,
      answers: JSON.stringify({ answers, autoSubmitted, score, perOrgan: Object.fromEntries(perOrgan) }),
    },
  });

  // Full questions (WITH answers + explanations) for the review screen
  const fullQuestions = await db.question.findMany({
    where: { id: { in: results.map((r) => r.questionId) } },
  });
  const fullById = new Map(fullQuestions.map((q) => [q.id, q]));

  const band =
    score >= HIGH_PERFORMANCE ? 'High performance' :
    score >= PASS_MARK ? 'Passing' :
    'Below passing';

  return NextResponse.json({
    attemptId: attempt.id,
    score: correctCount,
    total,
    percentage: Math.round(score * 1000) / 10,
    band,
    autoSubmitted,
    perOrgan: [...perOrgan.entries()]
      .map(([system, s]) => ({ system, ...s, pct: s.total ? Math.round((s.correct / s.total) * 100) : 0 }))
      .sort((a, b) => a.pct - b.pct),
    perTask: [...perTask.entries()]
      .map(([task, s]) => ({ task, ...s, pct: s.total ? Math.round((s.correct / s.total) * 100) : 0 }))
      .sort((a, b) => a.pct - b.pct),
    results: results.map((r) => {
      const q = fullById.get(r.questionId);
      return {
        ...r,
        question: q
          ? {
              ...q,
              options: JSON.parse(q.options || '[]'),
              tags: JSON.parse(q.tags || '[]'),
              sources: JSON.parse(q.sources || '[]'),
            }
          : null,
      };
    }),
  });
});
