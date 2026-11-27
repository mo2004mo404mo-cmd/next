import { NextRequest, NextResponse } from 'next/server';
import { canAwardAdReward, earnCredits } from '@/lib/freemium-store';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';

export async function POST(request: NextRequest) {
  try {
    const { impressionId } = await request.json();
    if (!impressionId) return NextResponse.json({ error: 'impressionId required' }, { status: 400 });

    const user = await getCurrentUser();
    const userId = (user as { id?: string } | null | undefined)?.id;

    // Mark impression as completed and rewarded
    const impression = await db.adImpression.findUnique({ where: { id: impressionId } });
    if (!impression) return NextResponse.json({ error: 'Impression not found' }, { status: 404 });
    if (impression.rewarded) return NextResponse.json({ error: 'Already rewarded' }, { status: 400 });

    const targetUserId = userId || impression.userId || undefined;
    const canReward = await canAwardAdReward(targetUserId, 5);
    if (!canReward) {
      return NextResponse.json({ error: 'Daily ad limit reached', remaining: 0 }, { status: 429 });
    }

    await db.adImpression.update({ where: { id: impressionId }, data: { completed: true, rewarded: true } });

    // Award credits
    const CREDITS_PER_AD = 10;
    const result = await earnCredits(CREDITS_PER_AD, 'earn_ad', 'Watched ad for credits', impressionId, targetUserId);

    return NextResponse.json({ credits: CREDITS_PER_AD, balance: result.balance });
  } catch (error) {
    console.error('Reward POST error:', error);
    return NextResponse.json({ error: 'Failed to claim reward' }, { status: 500 });
  }
}
