import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// GET /api/groups/[id]/quiz/stats — current user's quiz stats in this group
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

    const attempts = await db.groupQuizAttempt.findMany({
      where: { userId: user.id, groupId: id },
      select: { isCorrect: true, timeSpent: true, questionId: true },
    });

    const totalAttempts = attempts.length;
    const correct = attempts.filter(a => a.isCorrect).length;
    const uniqueQuestions = new Set(attempts.map(a => a.questionId)).size;
    const totalTime = attempts.reduce((s, a) => s + a.timeSpent, 0);
    const accuracy = totalAttempts > 0 ? Math.round((correct / totalAttempts) * 100) : 0;

    return Response.json({
      totalAttempts,
      correct,
      uniqueQuestions,
      totalTimeSpent: totalTime,
      accuracy,
    });
  } catch (error) {
    console.error('Error getting quiz stats:', error);
    return Response.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}
