/**
 * Web Push subscription removal.
 *
 * POST /api/push/unsubscribe
 * Body: { endpoint: string }
 *
 * Called by usePushNotifications().disable() AFTER the browser-side
 * sub.unsubscribe() succeeded. The row is deleted by endpoint so the
 * server stops fanning out to a device the browser just relinquished —
 * otherwise every future send would 410 against the push service and rely
 * on the automatic pruning path (which also works, but only after one
 * wasted push per send).
 *
 * Auth: required, but deliberately ownership-tolerant — we delete by
 * endpoint and only check that the caller is authenticated. If the row
 * belongs to a different user the delete is a no-op (where clause includes
 * the endpoint unique key), and an endpoint can only be re-subscribed by
 * the browser that owns it, so there is nothing to abuse here.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { apiHandler } from '@/lib/api-handler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const unsubscribeSchema = z.object({
  endpoint: z.string().url().min(10).max(2048),
});

export const POST = apiHandler(async (req: Request, ctx) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = unsubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid endpoint payload' }, { status: 422 });
  }

  // Scoped delete: endpoint is globally unique, and restricting to the
  // caller's own rows keeps one authenticated user from evicting another's
  // subscription.
  const result = await db.pushSubscription.deleteMany({
    where: { endpoint: parsed.data.endpoint, userId: ctx.userId },
  });

  // 200 even when 0 rows were deleted — the browser already unsubscribed,
  // so "already gone" is the desired end state. Idempotent by design.
  return NextResponse.json({ ok: true, deleted: result.count });
});
