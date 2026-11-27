import { db } from '@/lib/db';

const GUEST_EMAIL = 'guest@medq.local';
let cachedGuestId: string | null = null;
let guestInitPromise: Promise<string> | null = null;

const WELCOME_BONUS = 25;

/**
 * Returns the ID of the default "guest" user.
 * Creates the guest user (and their subscription + wallet) on first call.
 * Uses a singleton promise to prevent race conditions from parallel calls.
 */
export async function getGuestUserId(): Promise<string> {
  if (cachedGuestId) return cachedGuestId;

  // Re-use the same promise for concurrent callers (prevents race conditions)
  if (!guestInitPromise) {
    guestInitPromise = _initGuestUser();
  }
  return guestInitPromise;
}

async function _initGuestUser(): Promise<string> {
  if (cachedGuestId) return cachedGuestId;

  let user = await db.user.findUnique({ where: { email: GUEST_EMAIL } });
  if (!user) {
    user = await db.user.create({
      data: {
        email: GUEST_EMAIL,
        name: 'Guest',
        role: 'student',
        onboardingCompleted: true,
      },
    });

    // Ensure subscription exists
    await db.subscription.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        tier: 'free',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  // Ensure wallet with welcome bonus — also fixes existing guest users with 0 balance
  const existingWallet = await db.creditWallet.findUnique({ where: { userId: user.id } });
  if (!existingWallet) {
    await db.creditWallet.create({
      data: {
        userId: user.id,
        balance: WELCOME_BONUS,
        totalEarned: WELCOME_BONUS,
        totalSpent: 0,
      },
    });
  } else if (existingWallet.balance === 0 && existingWallet.totalEarned === 0) {
    // Migrate: existing guest user with 0 credits → grant welcome bonus
    await db.creditWallet.update({
      where: { id: existingWallet.id },
      data: { balance: WELCOME_BONUS, totalEarned: WELCOME_BONUS, updatedAt: new Date() },
    });
  }

  // Ensure welcome bonus transaction exists (use findFirst to avoid duplicates)
  const existingTx = await db.creditTransaction.findFirst({
    where: { userId: user.id, category: 'welcome_bonus' },
  });
  if (!existingTx) {
    await db.creditTransaction.create({
      data: {
        userId: user.id,
        type: 'admin_grant',
        amount: WELCOME_BONUS,
        balance: WELCOME_BONUS,
        category: 'welcome_bonus',
        description: 'Welcome bonus - 25 free credits!',
      },
    });
  }

  cachedGuestId = user.id;
  return user.id;
}
