import { NextResponse } from 'next/server';
import { getCredits } from '@/lib/freemium-store';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { CREDIT_PACKAGES } from '@/lib/subscription/credits';

/**
 * GET /api/credits/packages
 *
 * Returns the catalog of buyable credit packages plus the user's current
 * balance. Used by the CreditShop's "Buy Credits" tab.
 *
 * Auth is optional — anonymous callers get their per-browser guest balance.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const GET = withErrorHandler(async () => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  const uid = userId || (await getGuestUserId());

  const credits = await getCredits(uid);

  // Attach runtime info (canAfford flag, total credits) to each package.
  const packages = CREDIT_PACKAGES.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    tagline: pkg.tagline,
    baseCredits: pkg.baseCredits,
    bonusCredits: pkg.bonusCredits,
    totalCredits: pkg.baseCredits + pkg.bonusCredits,
    priceUsd: pkg.priceUsd,
    centPerCredit: Number(pkg.centPerCredit.toFixed(2)),
    popular: !!pkg.popular,
    bestValue: !!pkg.bestValue,
    accentColor: pkg.accentColor,
  }));

  return NextResponse.json({
    balance: credits.balance,
    totalEarned: credits.totalEarned,
    totalSpent: credits.totalSpent,
    packages,
  });
});
