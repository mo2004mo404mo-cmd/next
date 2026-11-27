import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser, badRequest, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import {
  fsrsReview,
  cardFromProgress,
  ratingFromAction,
  sm2Compat,
  NEW_CARD,
} from '@/lib/fsrs';

/* ─── Types ─── */

interface ReviewItem {
  id: string;
  type: 'flashcard' | 'bookmarked' | 'wrong' | 'noted';
  questionId: string;
  questionText: string;
  answer: string;
  explanation: string;
  system: string;
  topic: string;
  difficulty: string;
  dueDate: string;
  interval: number;
  easeFactor: number;
  note?: string;
  lastAccuracy?: number;
}

interface ReviewStats {
  totalDue: number;
  reviewed: number;
  remaining: number;
  streak: number;
  byType: {
    flashcard: number;
    bookmarked: number;
    wrong: number;
    noted: number;
  };
}

/* ─── Helpers ─── */

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]*>/g, '')
    .trim();
}

function getTodayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Resolve the caller's user ID — authenticated session takes priority,
 * falls back to a stable guest ID cookie so anonymous reviews are still
 * scoped per-browser.
 *
 * Migrated: uses getCurrentUser() instead of manual getServerSession().
 */
async function resolveUserId(): Promise<string> {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  return userId || (await getGuestUserId());
}

async function calculateStreak(userId: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  const checkDate = new Date(today);

  while (true) {
    const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    const record = await db.studyStreak.findUnique({
      where: { userId_date: { userId, date: dateStr } },
    });
    if (record && record.questionsStudied > 0) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
    // Safety limit
    if (streak > 365) break;
  }
  return streak;
}

/* ─── GET: Fetch all items due for review ─── */

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all'; // all, flashcard, bookmarked, wrong, noted
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  const userId = await resolveUserId();
  const now = new Date();
  const items: ReviewItem[] = [];

    // 1. Flashcards due for review (FlashcardProgress where nextReview <= now)
    if (filter === 'all' || filter === 'flashcard') {
      const dueFlashcards = await db.flashcardProgress.findMany({
        where: {
          userId,
          nextReview: { lte: now },
        },
        include: {
          question: true,
        },
        take: limit,
        orderBy: { nextReview: 'asc' },
      });

      for (const fp of dueFlashcards) {
        items.push({
          id: fp.id,
          type: 'flashcard',
          questionId: fp.questionId,
          questionText: stripHtml(fp.question.text),
          answer: stripHtml(fp.question.answer),
          explanation: stripHtml(fp.question.explanation),
          system: fp.question.system,
          topic: fp.question.topic,
          difficulty: fp.question.difficulty,
          dueDate: fp.nextReview.toISOString(),
          interval: fp.interval,
          easeFactor: fp.efactor,
        });
      }
    }

    // 2. Bookmarked questions that were answered incorrectly (from StudySession with low accuracy)
    if (filter === 'all' || filter === 'bookmarked') {
      const bookmarks = await db.bookmark.findMany({
        where: { userId },
        include: {
          question: true,
        },
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      for (const bm of bookmarks) {
        // Skip if already in items
        if (items.find(i => i.questionId === bm.questionId)) continue;

        // Check if flashcard progress exists for this question
        const fp = await db.flashcardProgress.findUnique({
          where: { userId_questionId: { userId, questionId: bm.questionId } },
        });

        // Include if: no progress (never reviewed) OR nextReview is past due
        if (!fp || fp.nextReview <= now) {
          // Check study sessions for accuracy
          let lastAccuracy: number | undefined;
          const sessions = await db.studySession.findMany({
            where: {
              userId,
              type: { in: ['bank-review', 'quiz', 'exam'] },
            },
            take: 10,
            orderBy: { createdAt: 'desc' },
          });

          for (const session of sessions) {
            try {
              const meta = JSON.parse(session.metadata || '{}');
              if (meta.questionId === bm.questionId || (meta.questionIds && Array.isArray(meta.questionIds) && meta.questionIds.includes(bm.questionId))) {
                lastAccuracy = session.questionsStudied > 0 ? Math.round((session.correctAnswers / session.questionsStudied) * 100) : 0;
                break;
              }
            } catch { /* skip */ }
          }

          items.push({
            id: `bm-${bm.id}`,
            type: 'bookmarked',
            questionId: bm.questionId,
            questionText: stripHtml(bm.question.text),
            answer: stripHtml(bm.question.answer),
            explanation: stripHtml(bm.question.explanation),
            system: bm.question.system,
            topic: bm.question.topic,
            difficulty: bm.question.difficulty,
            dueDate: bm.createdAt.toISOString(),
            interval: fp?.interval ?? 0,
            easeFactor: fp?.efactor ?? 2.5,
            lastAccuracy,
          });
        }
      }
    }

    // 3. Wrong answers - questions from study sessions with low accuracy
    if (filter === 'all' || filter === 'wrong') {
      const recentSessions = await db.studySession.findMany({
        where: {
          userId,
          type: { in: ['bank-review', 'quiz', 'exam'] },
          correctAnswers: { lt: 2 }, // low accuracy sessions
        },
        take: 20,
        orderBy: { createdAt: 'desc' },
      });

      for (const session of recentSessions) {
        try {
          const meta = JSON.parse(session.metadata || '{}');
          const questionId = meta.questionId;
          if (!questionId) continue;

          // Skip if already in items
          if (items.find(i => i.questionId === questionId)) continue;

          const question = await db.question.findUnique({
            where: { id: questionId },
          });
          if (!question) continue;

          const accuracy = session.questionsStudied > 0 ? Math.round((session.correctAnswers / session.questionsStudied) * 100) : 0;

          items.push({
            id: `wrong-${session.id}`,
            type: 'wrong',
            questionId,
            questionText: stripHtml(question.text),
            answer: stripHtml(question.answer),
            explanation: stripHtml(question.explanation),
            system: question.system,
            topic: question.topic,
            difficulty: question.difficulty,
            dueDate: session.createdAt.toISOString(),
            interval: 0,
            easeFactor: 2.5,
            lastAccuracy: accuracy,
          });
        } catch { /* skip */ }
      }
    }

    // 4. Questions with notes that haven't been reviewed recently
    if (filter === 'all' || filter === 'noted') {
      const notes = await db.questionNote.findMany({
        where: { userId },
        include: {
          question: true,
        },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      });

      for (const note of notes) {
        // Skip if already in items
        if (items.find(i => i.questionId === note.questionId)) continue;

        // Check if there's flashcard progress
        const fp = await db.flashcardProgress.findUnique({
          where: { userId_questionId: { userId, questionId: note.questionId } },
        });

        // Include if: no progress (never reviewed) OR nextReview is past due
        if (!fp || fp.nextReview <= now) {
          items.push({
            id: `note-${note.id}`,
            type: 'noted',
            questionId: note.questionId,
            questionText: stripHtml(note.question.text),
            answer: stripHtml(note.question.answer),
            explanation: stripHtml(note.question.explanation),
            system: note.question.system,
            topic: note.question.topic,
            difficulty: note.question.difficulty,
            dueDate: note.updatedAt.toISOString(),
            interval: fp?.interval ?? 0,
            easeFactor: fp?.efactor ?? 2.5,
            note: note.note,
          });
        }
      }
    }

    // Deduplicate by questionId (keep first occurrence)
    const seen = new Set<string>();
    const deduped = items.filter(item => {
      if (seen.has(item.questionId)) return false;
      seen.add(item.questionId);
      return true;
    });

    // Calculate stats
    const streak = await calculateStreak(userId);

    // Count how many were reviewed today
    const todayStr = getTodayStr();
    const todayStreak = await db.studyStreak.findUnique({
      where: { userId_date: { userId, date: todayStr } },
    });
    const reviewedToday = todayStreak?.questionsStudied ?? 0;

    const stats: ReviewStats = {
      totalDue: deduped.length,
      reviewed: reviewedToday,
      remaining: Math.max(0, deduped.length - reviewedToday),
      streak,
      byType: {
        flashcard: deduped.filter(i => i.type === 'flashcard').length,
        bookmarked: deduped.filter(i => i.type === 'bookmarked').length,
        wrong: deduped.filter(i => i.type === 'wrong').length,
        noted: deduped.filter(i => i.type === 'noted').length,
      },
    };

    return NextResponse.json({ items: deduped, stats });
});

/* ─── POST: Record a review action (FSRS-5 scheduler) ─── */

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { questionId, action } = body as {
    questionId: string;
    action: 'got_it' | 'almost' | 'forgot' | 'easy';
  };

  if (!questionId || !action) {
    return badRequest('questionId and action are required');
  }

  const rating = ratingFromAction(action);

  // Verify the question exists
  const question = await db.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return notFound('Question not found');
  }

  const userId = await resolveUserId();
  const now = new Date();

  // ── FSRS-5: compute the next memory state from the current one ──
  const existing = await db.flashcardProgress.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  const card = existing ? cardFromProgress(existing) : NEW_CARD;
  const elapsedDays = existing
    ? Math.max(0, (now.getTime() - existing.lastReview.getTime()) / (24 * 3600 * 1000))
    : 0;
  const result = fsrsReview(card, rating, elapsedDays);
  const compat = sm2Compat(result.state, result.intervalDays);

  // Calculate next review date
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + result.intervalDays);

  // Upsert flashcard progress: FSRS state is canonical, SM-2 fields stay in
  // sync for compatibility with anything still reading them.
  const progress = await db.flashcardProgress.upsert({
    where: { userId_questionId: { userId, questionId } },
    update: {
      interval: compat.interval,
      repetition: compat.repetition,
      efactor: compat.efactor,
      nextReview,
      lastReview: now,
      stability: result.state.stability,
      fsrsDifficulty: result.state.difficulty,
      reps: result.state.reps,
      lapses: result.state.lapses,
      lastRating: result.state.lastRating,
      state: result.state.state,
    },
    create: {
      userId,
      questionId,
      interval: compat.interval,
      repetition: compat.repetition,
      efactor: compat.efactor,
      nextReview,
      lastReview: now,
      stability: result.state.stability,
      fsrsDifficulty: result.state.difficulty,
      reps: result.state.reps,
      lapses: result.state.lapses,
      lastRating: result.state.lastRating,
      state: result.state.state,
    },
  });

  // Record a StudySession
  const isCorrect = rating >= 2;
  await db.studySession.create({
    data: {
      userId,
      type: 'review-hub',
      questionsStudied: 1,
      correctAnswers: isCorrect ? 1 : 0,
      totalTimeSpent: 0,
      metadata: JSON.stringify({
        questionId,
        rating,
        action,
        mode: 'review-hub',
        scheduler: 'fsrs-5',
        stability: Math.round(result.state.stability * 100) / 100,
        difficulty: Math.round(result.state.difficulty * 100) / 100,
      }),
    },
  });

  // Update StudyStreak for today
  const todayStr = now.toISOString().split('T')[0];
  const xpEarned = isCorrect ? 10 : 2;

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
    progress: {
      id: progress.id,
      questionId: progress.questionId,
      interval: progress.interval,
      repetition: progress.repetition,
      efactor: progress.efactor,
      nextReview: progress.nextReview,
      lastReview: progress.lastReview,
      // FSRS memory state
      fsrs: {
        stability: Math.round(result.state.stability * 100) / 100,
        difficulty: Math.round(result.state.difficulty * 100) / 100,
        reps: result.state.reps,
        lapses: result.state.lapses,
        state: result.state.state,
        retrievabilityAtReview: Math.round(result.retrievability * 1000) / 1000,
        nextRetrievability: Math.round(result.nextRetrievability * 1000) / 1000,
      },
    },
    xpEarned,
    newInterval: result.intervalDays,
    nextReviewDate: nextReview.toISOString(),
  });
});
