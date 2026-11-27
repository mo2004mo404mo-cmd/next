import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser, badRequest, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

/**
 * Resolve the caller's user ID — authenticated session takes priority,
 * falls back to a stable guest ID cookie so anonymous notes are still
 * saved per-browser.
 *
 * Migrated: uses getCurrentUser() instead of manual getServerSession().
 */
async function resolveUserId(): Promise<string> {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  return userId || await getGuestUserId();
}

/**
 * GET /api/notes?questionId=...
 * Returns the calling user's note for a specific question.
 *
 * Auth is optional — guests have their own per-browser notes.
 *
 * Migrated from manual getServerSession() to withErrorHandler().
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get('questionId');

  if (!questionId) {
    return badRequest('questionId query parameter is required');
  }

  const userId = await resolveUserId();
  const note = await db.questionNote.findUnique({
    where: { userId_questionId: { userId, questionId } },
  }).catch(() => null);

  return NextResponse.json({ note });
});

/**
 * POST /api/notes
 * Creates or updates a note for a question (upsert).
 *
 * Supports anatomy illustrations: if questionId starts with "anatomy-",
 * auto-creates a Question record to satisfy the foreign key constraint.
 *
 * Migrated from manual getServerSession() to withErrorHandler().
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { questionId, note: noteText } = body;

  if (!questionId || noteText === undefined || noteText === null) {
    return badRequest('questionId and note are required');
  }

  const userId = await resolveUserId();

  // Check if question exists; if not, and it's an anatomy ID, create one
  let question = await db.question.findUnique({
    where: { id: questionId },
  });

  if (!question && questionId.startsWith('anatomy-')) {
    // Auto-create a Question record for anatomy illustrations
    const { title, system, imageUrl, style } = body;
    question = await db.question.create({
      data: {
        id: questionId,
        type: 'anatomy',
        text: title || `Anatomy illustration: ${questionId.replace('anatomy-', '')}`,
        system: system || '',
        imageUrl: imageUrl || '',
        tags: JSON.stringify(['anatomy', style || 'diagram'].filter(Boolean)),
        isAIGenerated: true,
      },
    });
  } else if (!question) {
    return notFound('Question not found');
  }

  // Use compound unique key for upsert
  const note = await db.questionNote.upsert({
    where: { userId_questionId: { userId, questionId } },
    update: { note: noteText },
    create: { userId, questionId, note: noteText },
  });

  return NextResponse.json({ note });
});

/**
 * DELETE /api/notes
 * Deletes a note. Body: { questionId }
 *
 * Migrated from manual getServerSession() to withErrorHandler().
 */
export const DELETE = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { questionId } = body;

  if (!questionId) {
    return badRequest('questionId is required');
  }

  const userId = await resolveUserId();
  const note = await db.questionNote.findUnique({
    where: { userId_questionId: { userId, questionId } },
  }).catch(() => null);
  if (!note) {
    return notFound('Note not found');
  }

  await db.questionNote.delete({
    where: { userId_questionId: { userId, questionId } },
  });

  return NextResponse.json({ success: true });
});
