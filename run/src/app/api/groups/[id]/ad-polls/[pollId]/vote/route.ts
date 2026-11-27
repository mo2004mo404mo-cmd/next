import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// POST /api/groups/[id]/ad-polls/[pollId]/vote — cast or change a vote
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; pollId: string }> }
) {
  try {
    const { id, pollId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const poll = await db.groupAdPoll.findUnique({ where: { id: pollId } });
    if (!poll || poll.groupId !== id) {
      return Response.json({ error: 'Poll not found' }, { status: 404 });
    }
    // Auto-close poll if past its deadline
    if (poll.status === 'active' && poll.closesAt && new Date(poll.closesAt) <= new Date()) {
      await db.groupAdPoll.update({ where: { id: pollId }, data: { status: 'closed' } });
      return Response.json({ error: 'Poll is closed (deadline passed)', pollClosed: true }, { status: 400 });
    }
    if (poll.status === 'closed') {
      return Response.json({ error: 'Poll is closed' }, { status: 400 });
    }

    const body = await request.json();
    const vote = body.vote === 'reject' ? 'reject' : 'accept';

    // upsert vote (unique constraint on [pollId, userId])
    const existing = await db.groupAdPollVote.findUnique({
      where: { pollId_userId: { pollId, userId: user.id } },
    });

    let newVote;
    if (existing) {
      if (existing.vote === vote) {
        // toggling off — remove vote
        await db.groupAdPollVote.delete({ where: { id: existing.id } });
        newVote = null;
      } else {
        newVote = await db.groupAdPollVote.update({
          where: { id: existing.id },
          data: { vote },
        });
      }
    } else {
      newVote = await db.groupAdPollVote.create({
        data: { pollId, userId: user.id, vote },
      });
    }

    // recompute accept/reject counts
    const votes = await db.groupAdPollVote.findMany({ where: { pollId } });
    const acceptCount = votes.filter(v => v.vote === 'accept').length;
    const rejectCount = votes.filter(v => v.vote === 'reject').length;
    const updated = await db.groupAdPoll.update({
      where: { id: pollId },
      data: { acceptCount, rejectCount },
    });

    return Response.json({
      poll: updated,
      myVote: newVote?.vote || null,
      acceptCount,
      rejectCount,
    });
  } catch (error) {
    console.error('Error voting on ad poll:', error);
    return Response.json({ error: 'Failed to vote' }, { status: 500 });
  }
}
