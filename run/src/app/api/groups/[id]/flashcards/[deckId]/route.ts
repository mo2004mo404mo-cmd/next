import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// GET /api/groups/[id]/flashcards/[deckId] — get one deck with cards + user review state
export async function GET(
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

    const deck = await db.groupFlashcardDeck.findUnique({
      where: { id: deckId },
      include: {
        flashcards: { orderBy: { order: 'asc' } },
        creator: { select: { id: true, name: true } },
      },
    });
    if (!deck || deck.groupId !== id) {
      return Response.json({ error: 'Deck not found' }, { status: 404 });
    }

    const reviews = await db.groupFlashcardReview.findMany({
      where: { userId, flashcardId: { in: deck.flashcards.map(f => f.id) } },
    });
    const reviewByCard = new Map(reviews.map(r => [r.flashcardId, r]));

    return Response.json({
      deck: {
        id: deck.id,
        name: deck.name,
        description: deck.description,
        subject: deck.subject,
        lectureId: deck.lectureId,
        creator: deck.creator,
        createdAt: deck.createdAt,
        flashcards: deck.flashcards.map(f => {
          const r = reviewByCard.get(f.id);
          return {
            id: f.id,
            front: f.front,
            back: f.back,
            hint: f.hint,
            tags: f.tags ? JSON.parse(f.tags) : [],
            order: f.order,
            review: r ? {
              rating: r.rating,
              repetitions: r.repetitions,
              interval: r.interval,
              easeFactor: r.easeFactor,
              dueAt: r.dueAt,
              lastReviewed: r.lastReviewed,
            } : null,
          };
        }),
      },
    });
  } catch (error) {
    console.error('Error fetching deck:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/groups/[id]/flashcards/[deckId] — update deck metadata or replace flashcards
// Body: { name?, description?, subject?, lectureId?, flashcards?: [...] }
export async function PATCH(
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

    const deck = await db.groupFlashcardDeck.findUnique({ where: { id: deckId } });
    if (!deck || deck.groupId !== id) {
      return Response.json({ error: 'Deck not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, description, subject, lectureId, flashcards } = body;

    // If flashcards provided, replace them
    if (Array.isArray(flashcards)) {
      await db.groupFlashcard.deleteMany({ where: { deckId } });
      if (flashcards.length > 0) {
        await db.groupFlashcard.createMany({
          data: flashcards.map((f: any, i: number) => ({
            deckId,
            front: f.front || '',
            back: f.back || '',
            hint: f.hint || '',
            tags: JSON.stringify(f.tags || []),
            order: f.order ?? i,
            createdBy: userId,
          })),
        });
      }
    }

    const updated = await db.groupFlashcardDeck.update({
      where: { id: deckId },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(subject !== undefined ? { subject } : {}),
        ...(lectureId !== undefined ? { lectureId: lectureId || null } : {}),
      },
      include: {
        flashcards: { orderBy: { order: 'asc' } },
      },
    });

    return Response.json({ deck: updated });
  } catch (error) {
    console.error('Error updating deck:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/groups/[id]/flashcards/[deckId] — delete entire deck (cascades to flashcards + reviews)
export async function DELETE(
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

    const deck = await db.groupFlashcardDeck.findUnique({ where: { id: deckId } });
    if (!deck || deck.groupId !== id) {
      return Response.json({ error: 'Deck not found' }, { status: 404 });
    }

    await db.groupFlashcardDeck.delete({ where: { id: deckId } });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting deck:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
