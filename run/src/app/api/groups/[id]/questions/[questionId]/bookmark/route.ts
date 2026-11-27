import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// POST /api/groups/[id]/questions/[questionId]/bookmark
// Body: { bookmark?: boolean } — toggles bookmark if no body / no bookmark field.
// Returns { bookmarked: boolean }
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

    let desired: boolean | null = null;
    try {
      const body = await request.json();
      if (typeof body?.bookmark === 'boolean') desired = body.bookmark;
    } catch { /* empty body = toggle */ }

    const existing = await db.groupQuestionBookmark.findUnique({
      where: { userId_questionId: { userId: user.id, questionId } },
    });

    const shouldBookmark = desired !== null ? desired : !existing;

    if (shouldBookmark && !existing) {
      await db.groupQuestionBookmark.create({
        data: { userId: user.id, questionId, groupId: id },
      });
    } else if (!shouldBookmark && existing) {
      await db.groupQuestionBookmark.delete({ where: { id: existing.id } });
    }

    return Response.json({ bookmarked: shouldBookmark });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return Response.json({ error: 'Failed to toggle bookmark' }, { status: 500 });
  }
}

// DELETE /api/groups/[id]/questions/[questionId]/bookmark
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> }
) {
  try {
    const { id, questionId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await db.groupQuestionBookmark.deleteMany({
      where: { userId: user.id, questionId },
    });
    return Response.json({ bookmarked: false });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return Response.json({ error: 'Failed to remove bookmark' }, { status: 500 });
  }
}
