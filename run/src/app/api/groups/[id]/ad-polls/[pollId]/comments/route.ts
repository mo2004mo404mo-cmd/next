import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/ad-polls/[pollId]/comments
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

    const comments = await db.groupAdPollComment.findMany({
      where: { pollId },
      orderBy: { createdAt: 'asc' },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    const byId = new Map(comments.map(c => [c.id, { ...c, replies: [] as any[] }]));
    const roots: any[] = [];
    for (const c of byId.values()) {
      if (c.parentCommentId && byId.has(c.parentCommentId)) {
        byId.get(c.parentCommentId)!.replies.push(c);
      } else {
        roots.push(c);
      }
    }

    return Response.json({ comments: roots });
  } catch (error) {
    console.error('Error listing poll comments:', error);
    return Response.json({ error: 'Failed to list comments' }, { status: 500 });
  }
}

// POST /api/groups/[id]/ad-polls/[pollId]/comments
// Body: { text: string, parentCommentId?: string }
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

    const body = await request.json();
    const text = (body?.text || '').toString().trim();
    if (!text) return Response.json({ error: 'Comment text required' }, { status: 400 });
    if (text.length > 2000) return Response.json({ error: 'Comment too long' }, { status: 400 });

    const comment = await db.groupAdPollComment.create({
      data: {
        pollId,
        userId: user.id,
        text,
        parentCommentId: body.parentCommentId || null,
      },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    return Response.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating poll comment:', error);
    return Response.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
