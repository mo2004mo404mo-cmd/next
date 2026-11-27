import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/ad-polls — list ad-acceptance polls for this group
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const polls = await db.groupAdPoll.findMany({
      where: { groupId: id },
      orderBy: { createdAt: 'desc' },
      include: {
        votes: true,
        creator: { select: { id: true, name: true, image: true } },
        _count: { select: { shares: true, comments: true, votes: true } },
      },
    });

    // Auto-close polls whose deadline has passed
    const now = new Date();
    const toClose = polls.filter(p => p.status === 'active' && p.closesAt && new Date(p.closesAt) <= now);
    if (toClose.length > 0) {
      await db.groupAdPoll.updateMany({
        where: { id: { in: toClose.map(p => p.id) } },
        data: { status: 'closed' },
      });
      for (const p of toClose) p.status = 'closed';
    }

    // Annotate each poll with the current user's vote + their qualifying correct answers
    const myCorrect = await db.groupQuizAttempt.groupBy({
      by: ['userId'],
      where: { userId: user.id, groupId: id, isCorrect: true },
      _count: { _all: true },
    });
    const myCorrectCount = myCorrect[0]?._count?._all ?? 0;

    return Response.json({
      polls: polls.map(p => ({
        ...p,
        myVote: p.votes.find(v => v.userId === user.id)?.vote || null,
        myCorrectAnswers: myCorrectCount,
        eligibleForShare: myCorrectCount >= p.quizThreshold,
      })),
    });
  } catch (error) {
    console.error('Error listing ad polls:', error);
    return Response.json({ error: 'Failed to list polls' }, { status: 500 });
  }
}

// POST /api/groups/[id]/ad-polls — create an ad-acceptance poll (admin only)
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });
    if (membership.role !== 'admin') {
      return Response.json({ error: 'Only admins can create ad polls' }, { status: 403 });
    }

    const body = await request.json();
    const { question, description, revenueSharePct, quizThreshold, closesAt } = body;

    if (!question || !question.trim()) {
      return Response.json({ error: 'Poll question is required' }, { status: 400 });
    }

    const poll = await db.groupAdPoll.create({
      data: {
        groupId: id,
        createdBy: user.id,
        question: question.trim(),
        description: description || '',
        revenueSharePct: Math.min(100, Math.max(0, Number(revenueSharePct) || 60)),
        quizThreshold: Math.max(0, Number(quizThreshold) || 10),
        closesAt: closesAt ? new Date(closesAt) : null,
      },
      include: {
        votes: true,
        creator: { select: { id: true, name: true, image: true } },
      },
    });

    return Response.json({ poll }, { status: 201 });
  } catch (error) {
    console.error('Error creating ad poll:', error);
    return Response.json({ error: 'Failed to create poll' }, { status: 500 });
  }
}
