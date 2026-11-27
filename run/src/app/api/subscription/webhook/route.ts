import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { constructWebhookEvent, isStripeConfigured } from '@/lib/payments/stripe';
import { setTier } from '@/lib/freemium-store';
import { earnCredits } from '@/lib/freemium-store';
import { isValidTier } from '@/lib/subscription/tiers';

/**
 * Stripe Webhook handler.
 *
 * Verified events:
 *   - checkout.session.completed       → fulfill subscription or credit package
 *   - customer.subscription.updated    → sync status, currentPeriodEnd, cancelAtPeriodEnd
 *   - customer.subscription.deleted    → downgrade to free
 *
 * In mock mode, this endpoint is unreachable (mock fulfillment happens in
 * /api/payments/mock-success). But it's registered so production deploys
 * "just work" once STRIPE_SECRET_KEY is set.
 *
 * CRITICAL: the raw body must be readable. Next.js 16 in App Router buffers
 * the body for `request.body` access — we use `request.text()` and pass the
 * raw string to constructEvent. Do NOT JSON.parse the body first.
 */
export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Stripe not configured — webhook endpoint is disabled in mock mode.' },
      { status: 503 },
    );
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const rawBody = await request.text();

  let event;
  try {
    event = await constructWebhookEvent(rawBody, signature);
  } catch (err: any) {
    console.error('[stripe/webhook] Signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  if (!event) {
    return NextResponse.json({ error: 'Webhook event was null' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        await fulfillOrder(session);
        break;
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as any;
        await syncSubscription(sub);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any;
        await downgradeOnCancel(sub);
        break;
      }
      default:
        // Unhandled event type — acknowledge receipt so Stripe doesn't retry.
        break;
    }
    return NextResponse.json({ received: true, type: event.type });
  } catch (err: any) {
    console.error('[stripe/webhook] Fulfillment error:', err);
    return NextResponse.json({ error: `Webhook fulfillment failed: ${err.message}` }, { status: 500 });
  }
}

/**
 * Fulfill a paid checkout session. Looks up the PaymentOrder by either
 * Stripe session id (production) or client_reference_id (mock). For
 * subscriptions: sets the user's tier. For credit packages: grants credits.
 */
async function fulfillOrder(session: any) {
  const orderId = session.client_reference_id || session.metadata?.orderId;
  if (!orderId) {
    console.error('[stripe/webhook] No orderId in session metadata');
    return;
  }

  const order = await db.paymentOrder.findUnique({ where: { id: orderId } });
  if (!order) {
    console.error(`[stripe/webhook] PaymentOrder ${orderId} not found`);
    return;
  }

  if (order.status === 'paid') {
    // Already fulfilled (idempotency — Stripe can retry).
    return;
  }

  // Mark the order as paid.
  await db.paymentOrder.update({
    where: { id: order.id },
    data: {
      status: 'paid',
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent || '',
      paidAt: new Date(),
    },
  });

  if (order.kind === 'subscription' && isValidTier(order.referenceId)) {
    // Upgrade the user's tier.
    await setTier(order.referenceId, order.userId);

    // Persist the Stripe customer + subscription ids so we can later manage
    // the subscription via the Billing Portal.
    const stripeSubId = session.subscription as string | undefined;
    const stripeCustomerId = session.customer as string | undefined;
    if (stripeSubId || stripeCustomerId) {
      await db.subscription.update({
        where: { userId: order.userId },
        data: {
          ...(stripeCustomerId ? { stripeCustomerId } : {}),
          ...(stripeSubId ? { stripeSubscriptionId: stripeSubId } : {}),
          stripePriceId: order.referenceId === 'pro'
            ? process.env.STRIPE_PRICE_PRO || ''
            : process.env.STRIPE_PRICE_PREMIUM || '',
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Grant the monthly credit allowance as a one-time bonus on upgrade.
    if (order.credits > 0) {
      await earnCredits(
        order.credits,
        'subscription_bonus',
        `${order.referenceId} tier bonus — ${order.credits} credits`,
        order.id,
        order.userId,
      );
    }
  } else if (order.kind === 'credits' && order.credits > 0) {
    // Grant the purchased credits.
    await earnCredits(
      order.credits,
      'purchase',
      `Purchased ${order.credits} credits (package: ${order.referenceId})`,
      order.id,
      order.userId,
    );
  }
}

/**
 * Sync subscription status from Stripe's `customer.subscription.updated` event.
 */
async function syncSubscription(sub: any) {
  const stripeCustomerId = sub.customer as string;
  if (!stripeCustomerId) return;
  // Find the user's subscription row by stripeCustomerId.
  const existing = await db.subscription.findFirst({
    where: { stripeCustomerId },
  });
  if (!existing) return;
  await db.subscription.update({
    where: { id: existing.id },
    data: {
      status: sub.status === 'active' ? 'active' : sub.status === 'past_due' ? 'past_due' : sub.status === 'canceled' ? 'expired' : 'active',
      currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : existing.currentPeriodEnd,
      cancelAtPeriodEnd: !!sub.cancel_at_period_end,
      stripePriceId: sub.items?.data?.[0]?.price?.id ?? existing.stripePriceId,
    },
  });
}

/**
 * Downgrade the user to free when their subscription is deleted (cancelled).
 */
async function downgradeOnCancel(sub: any) {
  const stripeCustomerId = sub.customer as string;
  if (!stripeCustomerId) return;
  const existing = await db.subscription.findFirst({
    where: { stripeCustomerId },
  });
  if (!existing) return;
  await db.subscription.update({
    where: { id: existing.id },
    data: {
      tier: 'free',
      status: 'expired',
      stripeSubscriptionId: '',
      cancelAtPeriodEnd: false,
      currentPeriodEnd: new Date(),
    },
  });
}
