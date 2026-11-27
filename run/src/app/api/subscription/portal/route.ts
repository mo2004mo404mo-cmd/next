import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { createBillingPortalSession, isStripeConfigured, getAppUrl } from '@/lib/payments/stripe';

/**
 * POST /api/subscription/portal
 *
 * Returns a Stripe Billing Portal URL where the user can manage their
 * subscription (update card, cancel, view invoices). In mock mode, redirects
 * to the in-app subscription management page.
 *
 * Auth is optional — guests have their own per-browser subscription state.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const POST = withErrorHandler(async (_request: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  const uid = userId || (await getGuestUserId());

  // In-app subscription management surface. (A dedicated
  // /settings/subscription page doesn't exist in this build — /pricing
  // carries the plan management UI.)
  const appUrl = await getAppUrl();
  const manageUrl = `${appUrl}/pricing`;

  const sub = await db.subscription.findUnique({ where: { userId: uid } });
  if (!sub || !sub.stripeCustomerId) {
    // No Stripe customer yet — send them to the in-app page.
    return NextResponse.json({
      url: manageUrl,
      mock: !isStripeConfigured(),
    });
  }

  const portal = await createBillingPortalSession(
    sub.stripeCustomerId,
    manageUrl,
  );

  if (!portal) {
    return NextResponse.json({
      url: manageUrl,
      mock: true,
    });
  }

  return NextResponse.json({ url: portal.url, mock: false });
});
