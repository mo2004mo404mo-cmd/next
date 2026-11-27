import { NextRequest, NextResponse } from 'next/server';
import { spendCredits, getCredits } from '@/lib/freemium-store';
import { getGuestUserId } from '@/lib/guest-user';
import { db } from '@/lib/db';
import { getCurrentUser, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

const VALID_ACTIONS: Record<string, { amount: number; description: string; category: string }> = {
  hint: { amount: 3, description: 'Quiz Hint — Eliminate 2 wrong options', category: 'hint' },
  streak_freeze: { amount: 5, description: 'Streak Freeze — Protect your streak for 1 missed day', category: 'streak_freeze' },
  premium_hour: { amount: 10, description: 'Premium Hour — Unlock premium features for 1 hour', category: 'premium_hour' },
  question_pack: { amount: 15, description: 'Question Pack — 5 bonus AI-generated questions', category: 'question_pack' },
  custom_theme: { amount: 20, description: 'Custom Theme — Unlock a custom color theme', category: 'custom_theme' },
};

/**
 * POST /api/credits/spend
 * Spends credits on a power-up action (hint, streak_freeze, etc.).
 *
 * Auth is optional — guests have their own per-browser wallet so they can
 * try power-ups without signing up.
 *
 * Migrated from manual getServerSession() to withErrorHandler() +
 * getCurrentUser().
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;

  const body = await request.json();
  const { action, amount: customAmount, description: customDescription } = body;

  // Validate action
  if (!action || !VALID_ACTIONS[action]) {
    return NextResponse.json(
      { error: `Invalid action. Valid actions: ${Object.keys(VALID_ACTIONS).join(', ')}` },
      { status: 400 },
    );
  }

  const config = VALID_ACTIONS[action];
  const amount = customAmount ?? config.amount;
  const description = customDescription ?? config.description;

  if (amount <= 0) {
    return badRequest('Amount must be positive');
  }

  // Check balance first
  const credits = await getCredits(userId);
  if (credits.balance < amount) {
    return NextResponse.json(
      { error: 'Insufficient credits', balance: credits.balance, required: amount },
      { status: 400 },
    );
  }

  // Deduct credits
  const result = await spendCredits(amount, config.category, description, userId);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Insufficient credits', balance: result.balance },
      { status: 400 },
    );
  }

  // Handle streak_freeze: increment streakFreezes on the user's StudyStreak record
  if (action === 'streak_freeze') {
    const uid = userId || await getGuestUserId();
    const todayStr = new Date().toISOString().split('T')[0];
    await db.studyStreak.upsert({
      where: { userId_date: { userId: uid, date: todayStr } },
      update: { streakFreezes: { increment: 1 } },
      create: { userId: uid, date: todayStr, streakFreezes: 1 },
    });
  }

  return NextResponse.json({
    success: true,
    action,
    balance: result.balance,
    transactionId: result.transactionId,
    message: `Successfully purchased ${description}`,
  });
});

/**
 * GET /api/credits/spend
 * Returns available spend actions with costs + canAfford flags.
 *
 * Migrated from manual getServerSession() to withErrorHandler().
 */
export const GET = withErrorHandler(async () => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;
  const uid = userId || await getGuestUserId();

  const credits = await getCredits(uid);

  const actions = Object.entries(VALID_ACTIONS).map(([key, config]) => ({
    action: key,
    amount: config.amount,
    description: config.description,
    category: config.category,
    canAfford: credits.balance >= config.amount,
  }));

  return NextResponse.json({ balance: credits.balance, actions });
});
