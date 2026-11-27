import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/questions/[questionId]/comments
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> }
) {
  try {
    const { id, questionId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const comments = await db.groupQuestionComment.findMany({
      where: { questionId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    // Nest replies under their parent
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
    console.error('Error listing question comments:', error);
    return Response.json({ error: 'Failed to list comments' }, { status: 500 });
  }
}

// POST /api/groups/[id]/questions/[questionId]/comments
// Body: { text: string, parentCommentId?: string }
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> }
) {
  try {
    const { id, questionId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const question = await db.groupQuestion.findUnique({ where: { id: questionId } });
    if (!question || question.groupId !== id) {
      return Response.json({ error: 'Question not found' }, { status: 404 });
    }

    const body = await request.json();
    const text = (body?.text || '').toString().trim();
    if (!text) return Response.json({ error: 'Comment text required' }, { status: 400 });
    if (text.length > 2000) return Response.json({ error: 'Comment too long' }, { status: 400 });

    const comment = await db.groupQuestionComment.create({
      data: {
        questionId,
        userId: user.id,
        text,
        parentCommentId: body.parentCommentId || null,
      },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    return Response.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating question comment:', error);
    return Response.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
