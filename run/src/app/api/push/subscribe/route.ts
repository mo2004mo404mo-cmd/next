/**
 * Web Push subscription registration.
 *
 * POST /api/push/subscribe
 * Body: { endpoint: string, keys: { p256dh: string, auth: string }, userAgent?: string }
 *
 * Called by usePushNotifications() after the browser's pushManager
 * creates (or re-creates — see the SW's pushsubscriptionchange handler) a
 * subscription. The row is upserted on `endpoint` (unique) so re-subscribes
 * and the pushsubscriptionchange renewal path are idempotent: the newest
 * keys win, no duplicate rows.
 *
 * Auth: required — subscriptions are tenant-scoped (userId) so a leaked
 * endpoint can never be re-registered under another account.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { apiHandler } from '@/lib/api-handler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const subscribeSchema = z.object({
  endpoint: z.string().url().min(10).max(2048),
  keys: z.object({
    p256dh: z.string().min(1).max(512),
    auth: z.string().min(1).max(512),
  }),
  userAgent: z.string().max(512).optional(),
});

export const POST = apiHandler(async (req: Request, ctx) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid subscription payload', detail: parsed.error.issues[0]?.message },
      { status: 422 },
    );
  }

  const { endpoint, keys, userAgent } = parsed.data;

  // Upsert on endpoint: the browser reuses the same push-service endpoint
  // while it stays alive, but the p256dh/auth keys rotate on renewal. If a
  // DIFFERENT user re-registers an endpoint they somehow obtained, the row
  // moves to them — an endpoint can only ever deliver to the browser that
  // owns it, so this is the safe tie-break.
  const subscription = await db.pushSubscription.upsert({
    where: { endpoint },
    update: { p256dh: keys.p256dh, auth: keys.auth, userId: ctx.userId, userAgent },
    create: {
      endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      userId: ctx.userId,
      userAgent,
    },
  });

  return NextResponse.json({ ok: true, id: subscription.id }, { status: 201 });
});
