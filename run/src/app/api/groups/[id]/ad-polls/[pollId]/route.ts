import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// PATCH /api/groups/[id]/ad-polls/[pollId] — close a poll (admin)
export async function PATCH(
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
      return Response.json({ error: 'Only admins can close polls' }, { status: 403 });
    }

    const poll = await db.groupAdPoll.findUnique({ where: { id: pollId } });
    if (!poll || poll.groupId !== id) {
      return Response.json({ error: 'Poll not found' }, { status: 404 });
    }

    const body = await request.json();
    const updated = await db.groupAdPoll.update({
      where: { id: pollId },
      data: { status: body.status || 'closed' },
    });

    return Response.json({ poll: updated });
  } catch (error) {
    console.error('Error updating ad poll:', error);
    return Response.json({ error: 'Failed to update poll' }, { status: 500 });
  }
}
