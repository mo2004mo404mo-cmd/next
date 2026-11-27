import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// POST /api/groups/[id]/ad-polls/[pollId]/revenue — credit ad revenue to the poll pool
// In production this is called by the ad-serving pipeline when an ad is shown/clicked
// in a group that has accepted ads. For demo/admin use it accepts an explicit amount.
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
    if (membership.role !== 'admin') {
      return Response.json({ error: 'Only admins can credit revenue' }, { status: 403 });
    }

    const poll = await db.groupAdPoll.findUnique({ where: { id: pollId } });
    if (!poll || poll.groupId !== id) {
      return Response.json({ error: 'Poll not found' }, { status: 404 });
    }

    const body = await request.json();
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const updated = await db.groupAdPoll.update({
      where: { id: pollId },
      data: { totalRevenue: { increment: amount } },
    });

    return Response.json({
      poll: updated,
      credited: amount,
      availableToDistribute: updated.totalRevenue - updated.totalDistributed,
    });
  } catch (error) {
    console.error('Error crediting ad revenue:', error);
    return Response.json({ error: 'Failed to credit revenue' }, { status: 500 });
  }
}
