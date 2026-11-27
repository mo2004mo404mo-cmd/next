import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { getCreditPackage, packageTotalCredits } from '@/lib/subscription/credits';
import { createCheckoutSession } from '@/lib/payments/stripe';

/**
 * POST /api/credits/purchase
 * Body: { packageId: 'starter' | 'scholar' | 'master' | 'institution' }
 *
 * Creates a pending PaymentOrder for a credit package, then a Stripe Checkout
 * Session (or mock URL). Returns { url, mock, orderId, packageId, credits }.
 *
 * Auth is optional — anonymous callers can initiate a purchase via their
 * guest ID; they'll need to sign in before completing checkout.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  const uid = userId || (await getGuestUserId());

  const body = await request.json();
  const { packageId } = body as { packageId?: string };

  if (!packageId) {
    return badRequest('packageId is required');
  }

  const pkg = getCreditPackage(packageId);
  if (!pkg) {
    return NextResponse.json(
      { error: `Invalid packageId. Valid: ${['starter', 'scholar', 'master', 'institution'].join(', ')}` },
      { status: 400 },
    );
  }

  const totalCredits = packageTotalCredits(pkg);
  const userRow = await db.user.findUnique({
    where: { id: uid },
    select: { email: true },
  });

  const order = await db.paymentOrder.create({
    data: {
      userId: uid,
      kind: 'credits',
      referenceId: packageId,
      amountUsd: pkg.priceUsd,
      credits: totalCredits,
      status: 'pending',
    },
  });

  const result = await createCheckoutSession({
    userId: uid,
    kind: 'credits',
    referenceId: packageId,
    amountUsd: pkg.priceUsd,
    credits: totalCredits,
    stripePriceId: pkg.stripePriceId,
    customerEmail: userRow?.email || undefined,
    orderId: order.id,
  });

  return NextResponse.json({
    url: result.url,
    mock: result.mock,
    orderId: order.id,
    packageId,
    credits: totalCredits,
    amountUsd: pkg.priceUsd,
  });
});
