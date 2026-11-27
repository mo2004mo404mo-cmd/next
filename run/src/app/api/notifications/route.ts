import { db } from '@/lib/db';
import { apiHandler } from '@/lib/api-handler';

/**
 * GET /api/notifications
 * Returns paginated notifications for the authenticated user.
 *
 * Query params:
 *   page    — page number (default 1)
 *   limit   — items per page (default 20)
 *   unread  — "true" to filter only unread
 *   type    — filter by notification type
 *
 * Migrated from manual getServerSession() boilerplate to apiHandler():
 *   - Auth check is now 1 line (ctx.userId is guaranteed non-null)
 *   - No try/catch needed — errors auto-caught and logged by withErrorHandler
 *   - User lookup is gone — ctx.userId comes straight from the session
 */
export const GET = apiHandler(async (req, ctx) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const unreadOnly = searchParams.get('unread') === 'true';
  const type = searchParams.get('type') || undefined;

  const whereClause: any = {
    userId: ctx.userId,
    ...(unreadOnly ? { isRead: false } : {}),
    ...(type ? { type } : {}),
  };

  const [notifications, unreadCount] = await Promise.all([
    db.notification.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.notification.count({
      where: { userId: ctx.userId, isRead: false },
    }),
  ]);

  return Response.json({
    notifications,
    unreadCount,
    pagination: { page, limit },
  });
});

/**
 * PUT /api/notifications
 * Marks all unread notifications as read for the authenticated user.
 */
export const PUT = apiHandler(async (req, ctx) => {
  const result = await db.notification.updateMany({
    where: {
      userId: ctx.userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  return Response.json({
    message: 'All notifications marked as read',
    updatedCount: result.count,
  });
});
