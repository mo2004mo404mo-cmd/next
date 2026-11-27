import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// GET /api/groups/[id]/flashcards — list all decks (with flashcards) in a group
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const decks = await db.groupFlashcardDeck.findMany({
      where: { groupId: id },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        flashcards: { orderBy: { order: 'asc' } },
        creator: { select: { id: true, name: true, image: true } },
        _count: { select: { flashcards: true } },
      },
    });

    // Get the user's review state for all flashcards in this group's decks
    const flashcardIds = decks.flatMap(d => d.flashcards.map(f => f.id));
    const reviews = await db.groupFlashcardReview.findMany({
      where: { userId, flashcardId: { in: flashcardIds } },
    });
    const reviewByCard = new Map(reviews.map(r => [r.flashcardId, r]));

    return Response.json({
      decks: decks.map(d => ({
        id: d.id,
        name: d.name,
        description: d.description,
        subject: d.subject,
        lectureId: d.lectureId,
        createdBy: d.createdBy,
        creator: d.creator,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
        flashcardCount: d._count.flashcards,
        flashcards: d.flashcards.map(f => {
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
      })),
    });
  } catch (error) {
    console.error('Error fetching flashcard decks:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/groups/[id]/flashcards — create a new deck
// Body: { name, description?, subject?, lectureId?, flashcards?: [{front, back, hint?, tags?}] }
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const body = await request.json();
    const { name, description, subject, lectureId, flashcards } = body;

    if (!name || typeof name !== 'string') {
      return Response.json({ error: 'Deck name is required' }, { status: 400 });
    }

    const deck = await db.groupFlashcardDeck.create({
      data: {
        groupId: id,
        name,
        description: description || '',
        subject: subject || '',
        lectureId: lectureId || null,
        createdBy: userId,
        flashcards: flashcards && Array.isArray(flashcards) && flashcards.length > 0 ? {
          create: flashcards.map((f: any, i: number) => ({
            front: f.front || '',
            back: f.back || '',
            hint: f.hint || '',
            tags: JSON.stringify(f.tags || []),
            order: i,
            createdBy: userId,
          })),
        } : undefined,
      },
      include: {
        flashcards: true,
        creator: { select: { id: true, name: true } },
      },
    });

    return Response.json({ deck }, { status: 201 });
  } catch (error) {
    console.error('Error creating flashcard deck:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
