import { NextRequest, NextResponse } from 'next/server';
import { getCreditHistory } from '@/lib/freemium-store';
import { getGuestUserId } from '@/lib/guest-user';
import { getCurrentUser } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

/**
 * GET /api/credits/history?limit=50
 * Returns the user's credit transactions, most-recent first.
 *
 * Auth is optional — anonymous callers get their per-browser guest history.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  const uid = userId || (await getGuestUserId());

  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = Math.min(Number(limitParam) || 50, 200);

  const history = await getCreditHistory(limit, uid);
  return NextResponse.json({ history, count: history.length });
});
