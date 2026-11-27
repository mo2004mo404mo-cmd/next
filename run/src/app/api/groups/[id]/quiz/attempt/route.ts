import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// POST /api/groups/[id]/quiz/attempt — record a self-test attempt
export async function POST(
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

    const body = await request.json();
    const { questionId, selectedAnswer, timeSpent } = body;

    if (!questionId) return Response.json({ error: 'questionId required' }, { status: 400 });

    const question = await db.groupQuestion.findUnique({ where: { id: questionId } });
    if (!question || question.groupId !== id) {
      return Response.json({ error: 'Question not found' }, { status: 404 });
    }

    const isCorrect = String(selectedAnswer).trim() === String(question.answer).trim();

    const attempt = await db.groupQuizAttempt.create({
      data: {
        userId: user.id,
        groupId: id,
        questionId,
        selectedAnswer: String(selectedAnswer ?? ''),
        isCorrect,
        timeSpent: Number(timeSpent) || 0,
      },
    });

    return Response.json({
      attempt,
      isCorrect,
      correctAnswer: question.answer,
      explanation: question.explanation,
    }, { status: 201 });
  } catch (error) {
    console.error('Error recording quiz attempt:', error);
    return Response.json({ error: 'Failed to record attempt' }, { status: 500 });
  }
}
