import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

const VALID_REASONS = ['incorrect', 'outdated', 'offensive', 'duplicate', 'ambiguous', 'other'];

// POST /api/groups/[id]/questions/[questionId]/report — report a question
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
    const { reason, comment } = body;
    if (!VALID_REASONS.includes(reason)) {
      return Response.json({ error: 'Invalid reason' }, { status: 400 });
    }

    const reports = JSON.parse(question.reports || '[]');
    // one report per user per question
    if (reports.some((r: any) => r.userId === user.id)) {
      return Response.json({ error: 'You already reported this question' }, { status: 400 });
    }
    const newReport = {
      id: `report_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      userId: user.id,
      userName: user.name || 'Unknown',
      reason,
      comment: (comment || '').trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    reports.push(newReport);

    await db.groupQuestion.update({
      where: { id: questionId },
      data: { reports: JSON.stringify(reports) },
    });

    return Response.json({ report: newReport }, { status: 201 });
  } catch (error) {
    console.error('Error reporting question:', error);
    return Response.json({ error: 'Failed to report question' }, { status: 500 });
  }
}
