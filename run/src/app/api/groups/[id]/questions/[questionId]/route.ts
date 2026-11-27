import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// DELETE /api/groups/[id]/questions/[questionId]
export async function DELETE(
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

    if (question.authorId !== user.id && membership.role !== 'admin') {
      return Response.json({ error: 'Only the author or admin can delete' }, { status: 403 });
    }

    await db.groupQuestion.delete({ where: { id: questionId } });
    return Response.json({ message: 'Question deleted' });
  } catch (error) {
    console.error('Error deleting group question:', error);
    return Response.json({ error: 'Failed to delete question' }, { status: 500 });
  }
}
