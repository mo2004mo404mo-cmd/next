import { db } from '@/lib/db';
import { apiHandler } from '@/lib/api-handler';
import { notFound, forbidden } from '@/lib/auth-helpers';

/**
 * PUT /api/notifications/[id]/read
 * Marks a single notification as read.
 *
 * Auth: required (notification must belong to the calling user).
 * Migrated from manual getServerSession() to apiHandler() — auth is now
 * declarative, params are auto-resolved, errors auto-caught.
 */
export const PUT = apiHandler<{ id: string }>(async (req, ctx) => {
  const { id } = ctx.params;

  // Verify the notification belongs to the calling user
  const notification = await db.notification.findUnique({
    where: { id },
    select: { userId: true, isRead: true },
  });

  if (!notification) {
    return notFound('Notification not found');
  }

  if (notification.userId !== ctx.userId) {
    return forbidden('Access denied');
  }

  if (notification.isRead) {
    return Response.json({ message: 'Notification already read', notification });
  }

  const updated = await db.notification.update({
    where: { id },
    data: { isRead: true },
  });

  return Response.json({ notification: updated });
});
