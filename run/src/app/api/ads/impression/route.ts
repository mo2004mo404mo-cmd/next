import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { trackAdImpression } from '@/lib/freemium-store';

/**
 * POST /api/ads/impression
 * Body: { campaignId, adType?, placement? }
 *
 * Records an ad impression. Auth-optional — guests' impressions are
 * attributed to their per-browser guest ID so the freemium ad-counter
 * still applies.
 *
 * Migrated from manual try/catch + getServerSession to withErrorHandler().
 * The original code accepted a missing userId (passing undefined to
 * trackAdImpression); preserved that behavior — trackAdImpression handles
 * undefined userId by counting towards a global counter.
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;

  const { campaignId, adType, placement } = await request.json();
  if (!campaignId) return badRequest('campaignId required');
  const impression = await trackAdImpression(campaignId, adType || 'banner', placement || '', userId);
  return NextResponse.json(impression);
});
