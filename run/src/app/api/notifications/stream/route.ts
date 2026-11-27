import { apiHandler } from '@/lib/api-handler';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/notifications/stream
 *
 * Server-Sent Events (SSE) endpoint for real-time notification push.
 *
 * Protocol:
 *   - Client opens EventSource connection.
 *   - Server immediately emits a `hello` event with the current unread count.
 *   - Server polls the database every 8 seconds for new notifications and
 *     emits `notification` events (one per new notification) plus `unread-count`
 *     events whenever the count changes.
 *   - Keep-alive `ping` comments every 25s to prevent proxy timeouts.
 *
 * Auth: required (apiHandler enforces it — anonymous connections get 401
 * before the stream is opened, so we never leak notification data to guests).
 *
 * Migrated from manual getServerSession() + db.user.findUnique({email}) to
 * apiHandler() — ctx.userId comes straight from the session, eliminating
 * the redundant user lookup. Also removes the manual try/catch (errors
 * inside the stream are handled inline; errors before the stream starts
 * are caught by withErrorHandler).
 */
export const GET = apiHandler(async (request, ctx) => {
  const userId = ctx.userId;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let closed = false;

      const send = (event: string, data: any) => {
        if (closed) return;
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
          );
        } catch {
          closed = true;
        }
      };

      const sendComment = (text: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`: ${text}\n\n`));
        } catch {
          closed = true;
        }
      };

      // Last-seen notification createdAt — only push notifications newer than this.
      let lastSeenCreatedAt: Date | null = null;
      let lastUnreadCount = -1;

      // Initial hello: send current unread count + last 5 notifications (if any)
      try {
        const [unreadCount, recent] = await Promise.all([
          db.notification.count({ where: { userId, isRead: false } }),
          db.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
              user: { select: { id: true, name: true, image: true } },
            },
          }),
        ]);
        lastUnreadCount = unreadCount;
        if (recent[0]) lastSeenCreatedAt = recent[0].createdAt;

        send('hello', { unreadCount, userId });
        // Backfill: emit the most recent notifications in order (oldest first)
        // so the client can render them in chronological order if it wants.
        for (const n of [...recent].reverse()) {
          send('notification', n);
        }
      } catch (err) {
        console.error('[notifications/stream] initial fetch failed:', err);
        send('error', { message: 'initial fetch failed' });
      }

      // Polling interval: 8 seconds.
      const POLL_MS = 8_000;
      const poll = async () => {
        if (closed) return;
        try {
          const where = lastSeenCreatedAt
            ? { userId, createdAt: { gt: lastSeenCreatedAt } }
            : { userId };
          const [newOnes, unreadCount] = await Promise.all([
            db.notification.findMany({
              where,
              orderBy: { createdAt: 'asc' },
              take: 50,
              include: {
                user: { select: { id: true, name: true, image: true } },
              },
            }),
            db.notification.count({ where: { userId, isRead: false } }),
          ]);

          if (newOnes.length > 0) {
            for (const n of newOnes) {
              send('notification', n);
              if (!lastSeenCreatedAt || n.createdAt > lastSeenCreatedAt) {
                lastSeenCreatedAt = n.createdAt;
              }
            }
          }
          if (unreadCount !== lastUnreadCount) {
            lastUnreadCount = unreadCount;
            send('unread-count', { unreadCount });
          }
        } catch (err) {
          console.error('[notifications/stream] poll failed:', err);
          // Don't close the stream — transient DB errors should self-heal.
        }
      };

      const pollTimer = setInterval(poll, POLL_MS);

      // Keep-alive ping every 25s (must be < 30s for many proxies)
      const pingTimer = setInterval(() => {
        sendComment(`ping ${Date.now()}`);
      }, 25_000);

      // Cleanup when the client disconnects
      const onAbort = () => {
        closed = true;
        clearInterval(pollTimer);
        clearInterval(pingTimer);
        try { controller.close(); } catch {}
      };
      request.signal?.addEventListener('abort', onAbort);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // disable nginx buffering so events flush immediately
    },
  });
});
