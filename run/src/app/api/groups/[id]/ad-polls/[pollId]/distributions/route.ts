import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/ad-polls/[pollId]/distributions
// Returns the full distribution history for a poll.
// Non-admins see only their own payouts; admins see everyone's.
export async function GET(
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

    const isAdmin = membership.role === 'admin';

    const where: any = { pollId };
    if (!isAdmin) where.userId = user.id;

    const shares = await db.groupAdRevenueShare.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    return Response.json({
      distributions: shares,
      totalDistributed: poll.totalDistributed,
      totalRevenue: poll.totalRevenue,
      isAdmin,
    });
  } catch (error) {
    console.error('Error listing distributions:', error);
    return Response.json({ error: 'Failed to list distributions' }, { status: 500 });
  }
}
