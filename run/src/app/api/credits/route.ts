import { NextRequest, NextResponse } from 'next/server';
import { getCredits, earnCredits, spendCredits, getCreditHistory } from '@/lib/freemium-store';
import { getCurrentUser, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

/**
 * GET /api/credits
 * Returns the calling user's wallet + recent transaction history.
 *
 * Auth is optional — anonymous callers get their per-browser guest wallet.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const GET = withErrorHandler(async () => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;

  const [credits, history] = await Promise.all([
    getCredits(userId),
    getCreditHistory(20, userId),
  ]);
  return NextResponse.json({ ...credits, history });
});

/**
 * POST /api/credits
 * Generic endpoint for earning or spending credits.
 * Body: { action: 'spend', amount, category, description }
 *    OR { amount, type, description }   (earn)
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;

  const body = await request.json();
  const { amount, type, description, category, action } = body;

  if (action === 'spend' && category) {
    if (!amount || amount <= 0) return badRequest('Amount must be positive');
    const result = await spendCredits(amount, category, description || `Spent ${amount} credits on ${category}`, userId);
    if (!result.success) return NextResponse.json({ error: 'Insufficient credits', balance: result.balance }, { status: 400 });
    return NextResponse.json({ success: true, balance: result.balance, transactionId: result.transactionId });
  }

  // Default: earn credits
  if (!amount || !type) return badRequest('Amount and type required');
  const result = await earnCredits(amount, type, description || 'Manual credit', undefined, userId);
  return NextResponse.json({ balance: result.balance });
});
