import { NextResponse } from 'next/server';
import { getCredits } from '@/lib/freemium-store';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

/**
 * GET /api/credits/balance
 * Lightweight endpoint that returns just the wallet balance + totals.
 * Use this for polling the credit balance in the header (cheaper than
 * /api/credits which also returns the history array).
 *
 * Auth is optional — anonymous callers get their per-browser guest wallet.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const GET = withErrorHandler(async () => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  const uid = userId || (await getGuestUserId());
  const credits = await getCredits(uid);
  return NextResponse.json(credits);
});
