import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// POST /api/groups/[id]/flashcards/[deckId]/review — record a review for one flashcard
// Body: { flashcardId, rating: 0|1|2|3 }
//   0 = again, 1 = hard, 2 = good, 3 = easy
// Implements a simple SM-2 spaced-repetition update.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; deckId: string }> }
) {
  try {
    const { id, deckId } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const body = await request.json();
    const { flashcardId, rating } = body;
    if (!flashcardId || typeof rating !== 'number' || rating < 0 || rating > 3) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const card = await db.groupFlashcard.findUnique({ where: { id: flashcardId } });
    if (!card || card.deckId !== deckId) {
      return Response.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    // Fetch existing review (or use defaults)
    const existing = await db.groupFlashcardReview.findUnique({
      where: { flashcardId_userId: { flashcardId, userId } },
    });

    let repetitions = existing?.repetitions ?? 0;
    let interval = existing?.interval ?? 0;
    let easeFactor = existing?.easeFactor ?? 2.5;

    // SM-2 update
    if (rating === 0) {
      // Again — reset repetitions, short interval
      repetitions = 0;
      interval = 0; // due again today
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    } else if (rating === 1) {
      // Hard — keep repetitions, but smaller interval
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      interval = Math.max(1, Math.round(interval * 1.2));
    } else if (rating === 2) {
      // Good — increment repetitions, standard interval growth
      repetitions += 1;
      if (repetitions === 1) interval = 1;
      else if (repetitions === 2) interval = 3;
      else interval = Math.round(interval * easeFactor);
    } else {
      // Easy — bigger increment, ease bump
      repetitions += 1;
      easeFactor = Math.min(3.0, easeFactor + 0.15);
      if (repetitions === 1) interval = 3;
      else if (repetitions === 2) interval = 6;
      else interval = Math.round(interval * easeFactor * 1.3);
    }

    const now = new Date();
    const dueAt = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    const review = await db.groupFlashcardReview.upsert({
      where: { flashcardId_userId: { flashcardId, userId } },
      create: {
        flashcardId, userId,
        rating, repetitions, interval, easeFactor,
        dueAt, lastReviewed: now,
      },
      update: {
        rating, repetitions, interval, easeFactor,
        dueAt, lastReviewed: now,
      },
    });

    return Response.json({ review });
  } catch (error) {
    console.error('Error recording flashcard review:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
