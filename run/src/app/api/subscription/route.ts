import { NextResponse } from 'next/server';
import { getTier, getAllUsage, getCredits, setTier } from '@/lib/freemium-store';
import { getCurrentUser } from '@/lib/auth-helpers';
import { withErrorHandler, apiHandler } from '@/lib/api-handler';
import { badRequest } from '@/lib/auth-helpers';

/**
 * GET /api/subscription
 * Returns the caller's current tier, usage counters, and credit balance.
 *
 * Public: anonymous callers get the 'free' tier defaults. Authenticated
 * callers get their actual tier/usage/credits.
 *
 * Migrated: try/catch is now handled by withErrorHandler; user lookup
 * via getCurrentUser() (returns null for anonymous — handled gracefully).
 */
export const GET = withErrorHandler(async () => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;

  const [tier, usage, credits] = await Promise.all([
    getTier(userId),
    getAllUsage(userId),
    getCredits(userId),
  ]);
  return NextResponse.json({ tier, usage, credits });
});

/**
 * POST /api/subscription
 * Updates the caller's tier. Requires authentication.
 *
 * Migrated from manual getServerSession() to apiHandler() — auth is now
 * declarative. Anonymous callers get a 401 instead of silently writing to
 * the anonymous-user tier bucket (which was a bug).
 */
export const POST = apiHandler(async (req, ctx) => {
  const { tier } = await req.json();
  if (!['free', 'premium', 'pro'].includes(tier)) {
    return badRequest('Invalid tier');
  }
  await setTier(tier as 'free' | 'premium' | 'pro', ctx.userId);
  return NextResponse.json({ tier });
});
