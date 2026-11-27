import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, badRequest, notFound } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';

/**
 * Resolve the caller's user ID — authenticated session takes priority,
 * falls back to a stable guest ID cookie so anonymous comments are still
 * attributed per-browser.
 *
 * Migrated: uses getCurrentUser() instead of manual getServerSession().
 */
async function resolveUserId(): Promise<string> {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  return userId || await getGuestUserId();
}

// GET /api/questions/discussions?questionId=xxx&page=1&limit=20
/**
 * Public read endpoint — no auth required to read discussions.
 *
 * Migrated from manual try/catch to withErrorHandler().
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const questionId = request.nextUrl.searchParams.get('questionId');
  if (!questionId) {
    return badRequest('questionId is required');
  }

  const page = Math.max(1, Number(request.nextUrl.searchParams.get('page')) || 1);
  const limit = Math.min(50, Math.max(1, Number(request.nextUrl.searchParams.get('limit')) || 20));
  const skip = (page - 1) * limit;

  const [discussions, total] = await Promise.all([
    db.questionDiscussion.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          },
        },
      },
    }),
    db.questionDiscussion.count({ where: { questionId } }),
  ]);

  const formatted = discussions.map((d) => ({
    id: d.id,
    content: d.content,
    likes: d.likes,
    isExpert: d.isExpert,
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
    user: {
      id: d.user.id,
      name: d.user.name || 'Anonymous',
      avatar: d.user.image || null,
      role: d.user.role,
    },
  }));

  return NextResponse.json({
    discussions: formatted,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

// POST /api/questions/discussions
/**
 * Auth-optional — guests can post discussions under their guest ID.
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const userId = await resolveUserId();
  const body = await request.json();
  const { questionId, content } = body as { questionId?: string; content?: string };

  if (!questionId || !content?.trim()) {
    return badRequest('questionId and content are required');
  }

  if (content.length > 2000) {
    return badRequest('Content must be under 2000 characters');
  }

  // Verify question exists
  const question = await db.question.findUnique({ where: { id: questionId } });
  if (!question) {
    return notFound('Question not found');
  }

  // Check if user is an expert (educator or admin role)
  const user = await db.user.findUnique({ where: { id: userId } });
  const isExpert = user?.role === 'educator' || user?.role === 'admin';

  const discussion = await db.questionDiscussion.create({
    data: {
      questionId,
      userId,
      content: content.trim(),
      isExpert,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      },
    },
  });

  return NextResponse.json({
    id: discussion.id,
    content: discussion.content,
    likes: discussion.likes,
    isExpert: discussion.isExpert,
    createdAt: discussion.createdAt.toISOString(),
    updatedAt: discussion.updatedAt.toISOString(),
    user: {
      id: discussion.user.id,
      name: discussion.user.name || 'Anonymous',
      avatar: discussion.user.image || null,
      role: discussion.user.role,
    },
  }, { status: 201 });
});

// PATCH /api/questions/discussions — Like a comment
/**
 * Auth-optional — likes are anonymous (no per-user tracking). Anyone can
 * like/unlike any discussion.
 *
 * TODO: this is a pre-existing design issue — likes should be scoped per-user
 * (e.g. via a QuestionDiscussionLike join table) to prevent double-likes and
 * allow un-liking. Out of scope for this migration.
 *
 * Migrated from manual try/catch to withErrorHandler().
 */
export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { discussionId, action } = body as { discussionId?: string; action?: 'like' | 'unlike' };

  if (!discussionId || !action) {
    return badRequest('discussionId and action are required');
  }

  const discussion = await db.questionDiscussion.findUnique({ where: { id: discussionId } });
  if (!discussion) {
    return notFound('Discussion not found');
  }

  const updated = await db.questionDiscussion.update({
    where: { id: discussionId },
    data: {
      likes: action === 'like'
        ? { increment: 1 }
        : Math.max(0, discussion.likes - 1),
    },
  });

  return NextResponse.json({ id: updated.id, likes: updated.likes });
});
