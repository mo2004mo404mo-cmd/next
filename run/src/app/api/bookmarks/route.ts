import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { apiHandler } from '@/lib/api-handler';
import { badRequest, notFound, forbidden } from '@/lib/auth-helpers';

/** Safely parse a JSON column — a malformed row used to 500 the whole
 *  bookmarks endpoint. Degrade gracefully per column instead. */
function safeJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

/**
 * GET /api/bookmarks
 * Returns the authenticated user's bookmarked questions.
 *
 * BUGFIX: previously returned ALL bookmarks globally (data leak). Also
 * previously had no auth check at all. Migrated to apiHandler — auth is
 * required, ctx.userId filters the query.
 */
export const GET = apiHandler(async (req, ctx) => {
  const bookmarks = await db.bookmark.findMany({
    where: { userId: ctx.userId },
    include: { question: true },
    orderBy: { createdAt: 'desc' },
  });

  const formatted = bookmarks.map((b) => ({
    id: b.id,
    questionId: b.questionId,
    createdAt: b.createdAt,
    question: {
      ...b.question,
      options: safeJson(b.question.options, []),
      tags: safeJson(b.question.tags, []),
      sources: safeJson(b.question.sources, []),
      citations: safeJson(b.question.citations, []),
    },
  }));

  return NextResponse.json({ bookmarks: formatted });
});

/**
 * POST /api/bookmarks
 * Adds a question to the authenticated user's bookmarks.
 *
 * BUGFIX: previously omitted userId (would crash on create due to required
 * field). Also used the wrong unique key for the duplicate check.
 */
export const POST = apiHandler(async (req: Request, ctx) => {
  const body = await req.json();
  const { questionId } = body;

  if (!questionId) {
    return badRequest('questionId is required');
  }

  // Verify the question exists
  const question = await db.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return notFound('Question not found');
  }

  // Check if already bookmarked by THIS user (composite unique key)
  const existing = await db.bookmark.findUnique({
    where: { userId_questionId: { userId: ctx.userId, questionId } },
  }).catch(() => null);
  if (existing) {
    return NextResponse.json(
      { error: 'Question is already bookmarked' },
      { status: 409 }
    );
  }

  const bookmark = await db.bookmark.create({
    data: { userId: ctx.userId, questionId },
    include: { question: true },
  });

  const formatted = {
    id: bookmark.id,
    questionId: bookmark.questionId,
    createdAt: bookmark.createdAt,
    question: {
      ...bookmark.question,
      options: safeJson(bookmark.question.options, []),
      tags: safeJson(bookmark.question.tags, []),
      sources: safeJson(bookmark.question.sources, []),
      citations: safeJson(bookmark.question.citations, []),
    },
  };

  return NextResponse.json({ bookmark: formatted });
});

/**
 * DELETE /api/bookmarks
 * Removes a question from the authenticated user's bookmarks.
 *
 * BUGFIX: previously used `where: { questionId }` on delete — wrong unique
 * key (composite is [userId, questionId]). Would have deleted other users'
 * bookmarks. Now correctly scoped to the calling user.
 */
export const DELETE = apiHandler(async (req: Request, ctx) => {
  const body = await req.json();
  const { questionId } = body;

  if (!questionId) {
    return badRequest('questionId is required');
  }

  // Find this user's bookmark for this question
  const bookmark = await db.bookmark.findUnique({
    where: { userId_questionId: { userId: ctx.userId, questionId } },
  }).catch(() => null);

  if (!bookmark) {
    return notFound('Bookmark not found');
  }

  // Ownership is implicit (we filtered by userId above), but double-check
  if (bookmark.userId !== ctx.userId) {
    return forbidden('Access denied');
  }

  await db.bookmark.delete({
    where: { id: bookmark.id },
  });

  return NextResponse.json({ success: true });
});
