import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { setTier, earnCredits, type Tier } from "@/lib/freemium-store";
import { isValidTier } from "@/lib/subscription/tiers";
import { getAppUrl } from "@/lib/payments/stripe";

/**
 * GET /api/payments/mock-success?order=<PaymentOrder id>
 *
 * Mock-mode checkout fulfillment. When Stripe keys aren't configured,
 * createCheckoutSession() (src/lib/payments/stripe.ts) redirects the browser
 * here instead of to Stripe Checkout. This endpoint fulfills the order the
 * same way the Stripe webhook would (src/app/api/subscription/webhook/route.ts
 * → fulfillOrder()):
 *
 *   1. Marks the PaymentOrder as paid (idempotent — re-visits are no-ops)
 *   2. kind=subscription → upgrades the tier + grants the tier credit bonus
 *   3. kind=credits       → grants the purchased credits
 *
 * Then redirects to the home page so the user sees their upgraded account.
 */
export async function GET(request: NextRequest) {
  // Build redirect URLs from the request's forwarded headers (rewritten to
  // the public host by src/middleware.ts on proxied requests) instead of
  // request.url, which can carry the internal host behind a proxy.
  const appUrl = await getAppUrl();
  const redirect = (path: string) => NextResponse.redirect(new URL(path, appUrl));
  const fail = (reason: string) =>
    redirect(`/?payment=error&reason=${encodeURIComponent(reason)}`);

  const orderId = request.nextUrl.searchParams.get("order");
  if (!orderId) return fail("missing_order");

  let order;
  try {
    order = await db.paymentOrder.findUnique({ where: { id: orderId } });
  } catch (err) {
    console.error("[mock-success] DB lookup failed:", err);
    return fail("db_error");
  }
  if (!order) return fail("order_not_found");

  // Idempotency: Stripe (and browsers with sticky redirects) can re-deliver.
  if (order.status === "paid") {
    return redirect(`/?payment=success&order=${encodeURIComponent(order.id)}`);
  }

  try {
    // 1. Mark the order as paid.
    await db.paymentOrder.update({
      where: { id: order.id },
      data: {
        status: "paid",
        stripeCheckoutSessionId: `mock_cs_${order.id}`,
        stripePaymentIntentId: `mock_pi_${order.id}`,
        paidAt: new Date(),
      },
    });

    // 2/3. Fulfill.
    if (order.kind === "subscription" && isValidTier(order.referenceId)) {
      await setTier(order.referenceId as Tier, order.userId);

      // Tier bonus credits (mirrors the webhook's subscription bonus).
      if (order.credits > 0) {
        await earnCredits(
          order.credits,
          "subscription_bonus",
          `${order.referenceId} tier bonus — ${order.credits} credits`,
          order.id,
          order.userId,
        );
      }
    } else if (order.kind === "credits" && order.credits > 0) {
      await earnCredits(
        order.credits,
        "purchase",
        `Purchased ${order.credits} credits (package: ${order.referenceId})`,
        order.id,
        order.userId,
      );
    }

    return redirect(
      `/?payment=success&order=${encodeURIComponent(order.id)}&kind=${order.kind}`,
    );
  } catch (err) {
    console.error("[mock-success] Fulfillment failed:", err);
    return fail("fulfillment_error");
  }
}
