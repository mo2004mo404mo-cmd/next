import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { getTierDefinition, isValidTier } from '@/lib/subscription/tiers';
import { createCheckoutSession } from '@/lib/payments/stripe';

/**
 * POST /api/subscription/checkout
 * Body: { tier: 'premium' | 'pro' }
 *
 * Creates a pending PaymentOrder, then a Stripe Checkout Session (or mock
 * checkout URL). Returns { url, mock, orderId } — the client should redirect
 * to `url` to complete payment.
 *
 * Auth is optional — guests can start checkout but will be prompted to sign
 * in before completing.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  const uid = userId || (await getGuestUserId());

  const body = await request.json();
  const { tier } = body as { tier?: string };

  if (!tier || !isValidTier(tier) || tier === 'free') {
    return badRequest("Invalid tier. Must be 'premium' or 'pro'.");
  }

  const def = getTierDefinition(tier);
  const userRow = await db.user.findUnique({
    where: { id: uid },
    select: { email: true, name: true },
  });

  // Create the PaymentOrder first so the webhook can find it by id.
  const order = await db.paymentOrder.create({
    data: {
      userId: uid,
      kind: 'subscription',
      referenceId: tier,
      amountUsd: def.priceUsd,
      credits: def.monthlyCreditAllowance,
      status: 'pending',
    },
  });

  const result = await createCheckoutSession({
    userId: uid,
    kind: 'subscription',
    referenceId: tier,
    amountUsd: def.priceUsd,
    credits: def.monthlyCreditAllowance,
    stripePriceId: def.stripePriceId,
    customerEmail: userRow?.email || undefined,
    orderId: order.id,
  });

  return NextResponse.json({
    url: result.url,
    mock: result.mock,
    orderId: order.id,
    tier,
    amountUsd: def.priceUsd,
  });
});
