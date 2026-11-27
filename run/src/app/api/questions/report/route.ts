import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, badRequest, notFound, forbidden } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';

const VALID_REASONS = ['incorrect', 'outdated', 'offensive', 'duplicate', 'other'];

/**
 * Resolve the caller's user ID — authenticated session takes priority,
 * falls back to a stable guest ID cookie so anonymous reports are still
 * attributed per-browser. Always returns a string (guest ID is always
 * available), so no null check is needed downstream.
 *
 * Migrated: uses getCurrentUser() instead of manual getServerSession().
 */
async function resolveUserId(): Promise<string> {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  return userId || await getGuestUserId();
}

/**
 * POST /api/questions/report — Submit a report.
 * Body: { questionId, reason, comment? }
 *
 * One report per user per question (enforced by `userId_questionId`
 * composite unique key).
 *
 * Auth-optional — guests can report too. The guest ID scopes the report
 * to the browser so a guest can't submit multiple reports for the same
 * question (the composite unique key still applies).
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * Also eliminated the dead `if (!userId) return 401` branch — resolveUserId()
 * always returns a string.
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const userId = await resolveUserId();

  const body = await request.json();
  const { questionId, reason, comment } = body;

  if (!questionId || !reason) {
    return badRequest('questionId and reason are required');
  }

  if (!VALID_REASONS.includes(reason)) {
    return badRequest(`Invalid reason. Must be one of: ${VALID_REASONS.join(', ')}`);
  }

  // Check if question exists
  const question = await db.question.findUnique({ where: { id: questionId } });
  if (!question) {
    return notFound('Question not found');
  }

  // Prevent duplicate reports (one per user per question)
  const existing = await db.questionReport.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });
  if (existing) {
    return NextResponse.json(
      { error: 'You have already reported this question', reported: true },
      { status: 409 },
    );
  }

  const report = await db.questionReport.create({
    data: {
      questionId,
      userId,
      reason,
      comment: comment || null,
      status: 'pending',
    },
  });

  return NextResponse.json({
    success: true,
    report: {
      id: report.id,
      questionId: report.questionId,
      reason: report.reason,
      status: report.status,
      createdAt: report.createdAt,
    },
  }, { status: 201 });
});

/**
 * GET /api/questions/report?questionId=...
 *   → Check if the calling user reported a question.
 * GET /api/questions/report?questionId=...&all=true
 *   → Get all reports for a question (admin only).
 *
 * Auth-optional for the per-user check; admin-only for the all-reports view.
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * Also eliminated the dead `if (!userId) return 401` branch.
 *
 * Note: the admin branch needs the user's role, so we still call
 * getCurrentUser() directly (rather than just resolveUserId) to get the
 * full session object.
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const userId = await resolveUserId();

  const questionId = request.nextUrl.searchParams.get('questionId');
  if (!questionId) {
    return badRequest('questionId is required');
  }

  const getAll = request.nextUrl.searchParams.get('all') === 'true';

  // Admin: get all reports for a question
  if (getAll) {
    const user = await getCurrentUser();
    const userRole = (user as any)?.role;
    if (userRole !== 'admin') {
      return forbidden('Admin access required');
    }

    const reports = await db.questionReport.findMany({
      where: { questionId },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ reports });
  }

  // Regular user: check if they reported this question
  const existing = await db.questionReport.findUnique({
    where: { userId_questionId: { userId, questionId } },
    select: { id: true, reason: true, status: true, createdAt: true },
  });

  return NextResponse.json({ reported: !!existing, report: existing || null });
});
