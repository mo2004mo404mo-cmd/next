/**
 * Web Push test/admin send.
 *
 * POST /api/push/send
 * Body: { userId?: string, title?: string, body?: string, url?: string, tag?: string }
 *
 * ADMIN ONLY. Sends one web push to the target user's devices (default:
 * the caller) via sendPushToUser — the exact same fan-out path used by
 * sendPushForNotification() when real notifications are created. This is
 * the debug/verification endpoint referenced in push.ts's header comment:
 * it exists so the delivery pipeline (VAPID signing, push-service POST,
 * stale-subscription pruning) can be exercised end-to-end without having
 * to synthesize a Notification row first.
 *
 * Response: { sent, failed, total, disabled } from sendPushToUser.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { apiHandler } from '@/lib/api-handler';
import { sendPushToUser } from '@/lib/server/push';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sendSchema = z.object({
  userId: z.string().min(1).max(64).optional(),
  title: z.string().min(1).max(120).default('MedQ test push'),
  body: z.string().min(1).max(300).default('If you can read this, web push is working.'),
  url: z.string().max(2048).optional(),
  tag: z.string().max(120).optional(),
});

export const POST = apiHandler(
  async (req: Request, ctx) => {
    let body: unknown = {};
    try {
      body = await req.json();
    } catch {
      // Empty body is fine — every field has a default.
    }

    const parsed = sendSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid send payload', detail: parsed.error.issues[0]?.message },
        { status: 422 },
      );
    }

    const { userId, title, body: text, url, tag } = parsed.data;
    const targetUserId = userId || ctx.userId;

    // A real target user must exist — otherwise we'd report a bogus
    // "sent: 0" that is indistinguishable from "no subscriptions yet".
    const target = await db.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, name: true },
    });
    if (!target) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    const result = await sendPushToUser(targetUserId, {
      title,
      body: text,
      url: url || '/',
      tag: tag || 'medq-test',
    });

    return NextResponse.json({
      ok: true,
      targetUserId,
      ...result,
    });
  },
  { requiredRole: 'admin' },
);
