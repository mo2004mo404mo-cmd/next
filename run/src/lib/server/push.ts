/**
 * Web Push server-side helper.
 *
 * Wraps the `web-push` library with MedQ's VAPID config and Prisma
 * PushSubscription storage. Used by:
 *   - /api/push/subscribe   (client subscribes a new device)
 *   - /api/push/unsubscribe (client removes a device)
 *   - /api/push/send        (admin/debug: send to one user)
 *   - sendPushForNotification() (auto-called whenever a Notification is created)
 *
 * VAPID keys are read from env (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY,
 * VAPID_SUBJECT). If any are missing, push is disabled — functions become
 * no-ops and return a `disabled` status, so the rest of the app keeps working.
 */

import webpush, { type PushSubscription as WPPushSubscription } from 'web-push';
import { db } from '@/lib/db';

let configured = false;

function ensureConfigured() {
  if (configured) return true;
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || 'mailto:admin@medq.local';

  if (!publicKey || !privateKey) {
    return false;
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
  return true;
}

export interface PushPayload {
  title: string;
  body: string;
  /** Optional URL to open when the notification is clicked. */
  url?: string;
  /** Optional icon URL (defaults to /icons/icon-192.png). */
  icon?: string;
  /** Optional badge URL (Android notification tray icon). */
  badge?: string;
  /** Optional tag — notifications with the same tag replace each other. */
  tag?: string;
  /** Optional arbitrary data passed to the SW push handler. */
  data?: Record<string, unknown>;
}

/**
 * Send a push notification to ALL of a user's subscribed devices.
 * Returns per-subscription outcomes so callers can prune dead subscriptions.
 */
export async function sendPushToUser(
  userId: string,
  payload: PushPayload,
): Promise<{ sent: number; failed: number; total: number; disabled?: boolean }> {
  if (!ensureConfigured()) {
    // Push not configured — silently no-op. Callers should still create the
    // Notification row in the DB so it shows up in the in-app bell.
    return { sent: 0, failed: 0, total: 0, disabled: true };
  }

  const subs = await db.pushSubscription.findMany({ where: { userId } });
  if (subs.length === 0) {
    return { sent: 0, failed: 0, total: 0 };
  }

  const message = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url || '/',
    icon: payload.icon || '/icons/icon-192.png',
    badge: payload.badge || '/icons/icon-192.png',
    tag: payload.tag || 'medq-notification',
    data: payload.data || {},
  });

  const staleEndpoints: string[] = [];
  let sent = 0;
  let failed = 0;

  await Promise.all(
    subs.map(async (sub) => {
      const wpSub: WPPushSubscription = {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      };
      try {
        await webpush.sendNotification(wpSub, message);
        sent++;
      } catch (err: any) {
        failed++;
        // 404 = subscription expired, 410 = subscription deleted, 413 = payload too large (config error)
        // In all these cases the subscription is dead and should be removed.
        const status = err?.statusCode;
        if (status === 404 || status === 410 || status === 400) {
          staleEndpoints.push(sub.endpoint);
        }
        // 429 (rate limit) and 5xx are transient — leave the subscription alone.
      }
    }),
  );

  // Prune dead subscriptions in the background (don't block the response).
  if (staleEndpoints.length > 0) {
    db.pushSubscription
      .deleteMany({ where: { endpoint: { in: staleEndpoints } } })
      .catch(() => {
        // Best-effort cleanup — failures here don't matter.
      });
  }

  return { sent, failed, total: subs.length };
}

/**
 * Convenience: send a push notification matching an in-app Notification row.
 * Called from notification creation sites (friends, posts, groups, etc.) so
 * users on mobile get a real system notification even when the tab is closed.
 */
export async function sendPushForNotification(notificationId: string) {
  try {
    const n = await db.notification.findUnique({
      where: { id: notificationId },
      select: {
        id: true,
        userId: true,
        type: true,
        title: true,
        message: true,
        referenceId: true,
      },
    });
    if (!n) return;

    // Map notification types to deep-link URLs.
    // For chat-related notifications, `referenceId` may encode the
    // `<roomId>:<messageId>` pair — if so, we deep-link directly to the
    // specific message so the recipient lands on the conversation context
    // instead of just the Messages tab.
    const chatDeepLink = (() => {
      if (!n.referenceId) return null;
      // referenceId format: `<roomId>:<messageId>` (set by chat mention
      // notification creators). Anything else falls back to /messages.
      const parts = n.referenceId.split(':');
      if (parts.length === 2 && parts[0] && parts[1]) {
        return `/messages?room=${parts[0]}&msg=${parts[1]}`;
      }
      if (parts.length === 1 && parts[0]) {
        return `/messages?room=${parts[0]}`;
      }
      return null;
    })();

    const urlForType: Record<string, string> = {
      friend_request: '/friends',
      challenge: '/challenge-arena',
      group_invite: '/groups',
      post_like: '/feed',
      post_comment: '/feed',
      mention: chatDeepLink || '/feed',
      chat_mention: chatDeepLink || '/messages',
      chat_reply: chatDeepLink || '/messages',
      chat_message: chatDeepLink || '/messages',
      achievement: '/achievements',
      system: '/',
      daily_challenge: '/daily-challenge',
      study_reminder: '/dashboard',
    };

    await sendPushToUser(n.userId, {
      title: n.title || 'MedQ',
      body: n.message,
      url: urlForType[n.type] || '/',
      tag: `medq-${n.type}`,
      data: { notificationId: n.id, type: n.type, referenceId: n.referenceId },
    });
  } catch (err) {
    // Push failures must never break the calling API route.
    console.error('[push] sendPushForNotification failed:', err);
  }
}
