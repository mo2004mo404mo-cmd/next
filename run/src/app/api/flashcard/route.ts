import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser, badRequest, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

/**
 * Resolve the caller's user ID — authenticated session takes priority,
 * falls back to a stable guest ID cookie so anonymous progress is still
 * scoped per-browser.
 *
 * Migrated: uses getCurrentUser() instead of manual getServerSession().
 */
async function resolveUserId(): Promise<string> {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  return userId || await getGuestUserId();
}

/**
 * GET /api/flashcard?mode=due|new|all|random
 *
 * Returns a list of questions, optionally filtered by `system`, with the
 * caller's FlashcardProgress attached.
 *
 * Auth-optional — guests get their own per-browser progress.
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * Also fixed a privacy bug: in the `all` and `random` branches, the
 * `include: { flashcardProgress: true }` was returning ALL users' progress
 * records for each Question (1-to-many relation). The buggy destructure
 * `flashcardProgress && flashcardProgress.id` then evaluated to `undefined`
 * on the array, so progress was always reported as null — but the records
 * were still being fetched from the DB. The fix is to filter the include
 * by `userId` and take `[0]`, which both prevents the leak AND makes the
 * user's progress actually show up in the response.
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'due';
  const system = searchParams.get('system') || undefined;
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  const now = new Date();
  const userId = await resolveUserId();

  // Build system filter if provided
  const systemFilter = system ? { system } : {};

  let questions;

  switch (mode) {
    case 'due': {
      // Questions with FlashcardProgress where nextReview <= now (due for review)
      const progressRecords = await db.flashcardProgress.findMany({
        where: {
          userId,
          nextReview: { lte: now },
          question: systemFilter,
        },
        include: {
          question: true,
        },
        take: limit,
        orderBy: { nextReview: 'asc' },
      });

      questions = progressRecords.map((p) => ({
        ...formatQuestion(p.question),
        flashcardProgress: formatProgress(p),
      }));
      break;
    }

    case 'new': {
      // Questions that have NO FlashcardProgress record (never studied)
      const studiedIds = await db.flashcardProgress.findMany({
        where: { userId },
        select: { questionId: true },
      });
      const studiedIdSet = new Set(studiedIds.map((s) => s.questionId));

      const allQuestions = await db.question.findMany({
        where: {
          ...systemFilter,
          id: { notIn: Array.from(studiedIdSet) },
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      questions = allQuestions.map((q) => ({
        ...formatQuestion(q),
        flashcardProgress: null,
      }));
      break;
    }

    case 'all': {
      // All questions with progress info attached (filtered to this user)
      const allQuestions = await db.question.findMany({
        where: systemFilter,
        include: {
          flashcardProgress: { where: { userId } },
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      questions = allQuestions.map((q) => {
        const { flashcardProgress, ...questionData } = q;
        const progress = Array.isArray(flashcardProgress) ? flashcardProgress[0] : flashcardProgress;
        return {
          ...formatQuestion(questionData),
          flashcardProgress: progress?.id ? formatProgress(progress) : null,
        };
      });
      break;
    }

    case 'random': {
      // Random selection of questions with progress info attached (filtered to this user)
      // SQLite doesn't support native random via Prisma, so we fetch and sample
      const total = await db.question.count({ where: systemFilter });
      const skip = total > limit ? Math.floor(Math.random() * (total - limit + 1)) : 0;

      const randomQuestions = await db.question.findMany({
        where: systemFilter,
        include: {
          flashcardProgress: { where: { userId } },
        },
        skip,
        take: limit,
      });

      questions = randomQuestions.map((q) => {
        const { flashcardProgress, ...questionData } = q;
        const progress = Array.isArray(flashcardProgress) ? flashcardProgress[0] : flashcardProgress;
        return {
          ...formatQuestion(questionData),
          flashcardProgress: progress?.id ? formatProgress(progress) : null,
        };
      });
      break;
    }

    default:
      return badRequest('Invalid mode. Use: due, all, new, or random');
  }

  return NextResponse.json({ questions });
});

/**
 * POST /api/flashcard — Record a flashcard review (SM-2 spaced repetition).
 *
 * Body: { questionId, quality: 0-5 }
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { questionId, quality } = body;

  if (!questionId || quality === undefined || quality === null) {
    return badRequest('questionId and quality (0-5) are required');
  }

  const q = Math.max(0, Math.min(5, Math.round(Number(quality))));
  if (isNaN(q)) {
    return badRequest('Quality must be a number between 0 and 5');
  }

  // Verify the question exists
  const question = await db.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return notFound('Question not found');
  }

  const now = new Date();

  // Get existing progress or set defaults for SM-2
  const userId = await resolveUserId();

  const existing = await db.flashcardProgress.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  let repetition = existing?.repetition ?? 0;
  let interval = existing?.interval ?? 1;
  let efactor = existing?.efactor ?? 2.5;

  // SM-2 Algorithm
  if (q >= 3) {
    // Correct response
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * efactor);
    }
    repetition += 1;
  } else {
    // Incorrect response
    repetition = 0;
    interval = 1;
  }

  // Update easiness factor
  efactor = Math.max(
    1.3,
    efactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  );

  // Calculate next review date
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  // Upsert flashcard progress
  const progress = await db.flashcardProgress.upsert({
    where: { userId_questionId: { userId, questionId } },
    update: {
      interval,
      repetition,
      efactor,
      nextReview,
      lastReview: now,
    },
    create: {
      userId,
      questionId,
      interval,
      repetition,
      efactor,
      nextReview,
      lastReview: now,
    },
  });

  // Record a StudySession
  const isCorrect = q >= 3;
  await db.studySession.create({
    data: {
      userId,
      type: 'flashcard',
      questionsStudied: 1,
      correctAnswers: isCorrect ? 1 : 0,
      totalTimeSpent: 0,
      metadata: JSON.stringify({
        questionId,
        quality: q,
        mode: 'flashcard',
      }),
    },
  });

  // Update StudyStreak for today
  const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const xpEarned = isCorrect ? 10 : 2; // More XP for correct answers

  await db.studyStreak.upsert({
    where: { userId_date: { userId, date: todayStr } },
    update: {
      questionsStudied: { increment: 1 },
      xpEarned: { increment: xpEarned },
    },
    create: {
      userId,
      date: todayStr,
      questionsStudied: 1,
      xpEarned,
      timeSpent: 0,
    },
  });

  return NextResponse.json({
    progress: formatProgress(progress),
    xpEarned,
  });
});

// Helper: format a Question record for API response (parse JSON fields)
function formatQuestion(q: Record<string, unknown>) {
  return {
    ...q,
    options: typeof q.options === 'string' ? JSON.parse(q.options as string) : q.options,
    tags: typeof q.tags === 'string' ? JSON.parse(q.tags as string) : q.tags,
    sources: typeof q.sources === 'string' ? JSON.parse(q.sources as string) : q.sources,
  };
}

// Helper: format a FlashcardProgress record for API response
function formatProgress(p: {
  id: string;
  questionId: string;
  interval: number;
  repetition: number;
  efactor: number;
  nextReview: Date;
  lastReview: Date;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: p.id,
    questionId: p.questionId,
    interval: p.interval,
    repetition: p.repetition,
    efactor: p.efactor,
    nextReview: p.nextReview,
    lastReview: p.lastReview,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
