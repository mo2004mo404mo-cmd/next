import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/questions/bookmarks
// Returns the current user's bookmarked questions in this group.
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

    const bookmarks = await db.groupQuestionBookmark.findMany({
      where: { userId: user.id, groupId: id },
      orderBy: { createdAt: 'desc' },
      include: {
        question: {
          include: {
            author: { select: { id: true, name: true, image: true } },
            lecture: { select: { id: true, title: true } },
            _count: { select: { attempts: true } },
          },
        },
      },
    });

    const attempts = await db.groupQuizAttempt.findMany({
      where: {
        userId: user.id,
        groupId: id,
        questionId: { in: bookmarks.map(b => b.questionId) },
      },
      select: { questionId: true, isCorrect: true },
    });
    const attemptMap = new Map<string, { count: number; correct: number }>();
    for (const a of attempts) {
      const cur = attemptMap.get(a.questionId) || { count: 0, correct: 0 };
      cur.count += 1;
      if (a.isCorrect) cur.correct += 1;
      attemptMap.set(a.questionId, cur);
    }

    return Response.json({
      questions: bookmarks.map(b => ({
        ...b.question,
        myAttempts: attemptMap.get(b.questionId) || { count: 0, correct: 0 },
        bookmarkedAt: b.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error listing bookmarks:', error);
    return Response.json({ error: 'Failed to list bookmarks' }, { status: 500 });
  }
}
