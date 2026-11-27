import { db } from '@/lib/db';
import { getGuestUserId } from '@/lib/guest-user';

export type Tier = 'free' | 'premium' | 'pro';

export interface UsageEntry {
  used: number;
  limit: number;
}

export const LIMITS: Record<Tier, Record<string, number>> = {
  free: {
    ai_generations: 5, tutor_messages: 10, video_lessons: 1, case_simulations: 2,
    flashcard_decks: 3, image_analyzer: 3, voice_study: 5, board_prep_sessions: 1,
    mnemonics: 3, anatomy_visuals: 2, study_planner: 3,
  },
  premium: {
    ai_generations: 100, tutor_messages: 100, video_lessons: 100, case_simulations: 100,
    flashcard_decks: 100, image_analyzer: 100, voice_study: 100, board_prep_sessions: 100,
    mnemonics: 100, anatomy_visuals: 100, study_planner: 100,
  },
  pro: {
    ai_generations: 999999, tutor_messages: 999999, video_lessons: 999999, case_simulations: 999999,
    flashcard_decks: 999999, image_analyzer: 999999, voice_study: 999999, board_prep_sessions: 999999,
    mnemonics: 999999, anatomy_visuals: 999999, study_planner: 999999,
  },
};

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

function isValidTier(tier: string): tier is Tier {
  return ['free', 'premium', 'pro'].includes(tier);
}

// ── User-scoped helpers ──

async function ensureSubscription(userId?: string) {
  const uid = userId || await getGuestUserId();
  let sub = await db.subscription.findUnique({ where: { userId: uid } });
  if (!sub) {
    sub = await db.subscription.create({
      data: { userId: uid, tier: 'free', status: 'active', currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    });
  }
  return sub;
}

async function ensureWallet(userId?: string) {
  const uid = userId || await getGuestUserId();
  let wallet = await db.creditWallet.findUnique({ where: { userId: uid } });
  if (!wallet) {
    wallet = await db.creditWallet.create({ data: { userId: uid, balance: 25, totalEarned: 25, totalSpent: 0 } });
    // Log welcome bonus credit transaction (idempotent check)
    const existingTx = await db.creditTransaction.findFirst({
      where: { userId: uid, category: 'welcome_bonus' },
    });
    if (!existingTx) {
      await db.creditTransaction.create({
        data: { userId: uid, type: 'admin_grant', amount: 25, balance: 25, category: 'welcome_bonus', description: 'Welcome bonus - 25 free credits!' },
      });
    }
  }
  return wallet;
}

// ── Legacy unscoped helpers now delegate to ensureSubscription/ensureWallet with guest user ──

async function ensureSubscriptionAnon() {
  return ensureSubscription();
}

async function ensureWalletAnon() {
  return ensureWallet();
}

// ── Tier Management ──

export async function getTier(userId?: string): Promise<Tier> {
  const sub = userId ? await ensureSubscription(userId) : await ensureSubscriptionAnon();
  return isValidTier(sub.tier) ? sub.tier : 'free';
}

export async function setTier(tier: Tier, userId?: string): Promise<void> {
  const sub = userId ? await ensureSubscription(userId) : await ensureSubscriptionAnon();
  await db.subscription.update({
    where: { id: sub.id },
    data: { tier, status: 'active', currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), updatedAt: new Date() },
  });
}

// ── Usage Tracking ──

export async function getUsage(category: string, userId?: string): Promise<UsageEntry> {
  const today = getTodayKey();
  const uid = userId || await getGuestUserId();
  const tier = await getTier(uid);
  const limit = LIMITS[tier]?.[category] ?? 5;
  const where: { date: string; category: string; userId: string } = { date: today, category, userId: uid };
  const record = await db.usageRecord.findFirst({ where });
  return { used: record?.count ?? 0, limit };
}

export async function getAllUsage(userId?: string): Promise<Record<string, UsageEntry>> {
  const today = getTodayKey();
  const uid = userId || await getGuestUserId();
  const tier = await getTier(uid);
  const limits = LIMITS[tier];
  const where: { date: string; userId: string } = { date: today, userId: uid };
  const records = await db.usageRecord.findMany({ where });
  const usageMap: Record<string, number> = {};
  for (const r of records) usageMap[r.category] = r.count;
  const result: Record<string, UsageEntry> = {};
  for (const key of Object.keys(limits)) {
    result[key] = { used: usageMap[key] || 0, limit: limits[key] };
  }
  return result;
}

export async function incrementUsage(category: string, userId?: string): Promise<UsageEntry> {
  const today = getTodayKey();
  const uid = userId || await getGuestUserId();
  const tier = await getTier(uid);
  const limit = LIMITS[tier]?.[category] ?? 5;

  // Try to find existing record
  const where: { date: string; category: string; userId: string } = { date: today, category, userId: uid };
  const existing = await db.usageRecord.findFirst({ where });

  if (existing) {
    if (existing.count >= limit) return { used: existing.count, limit };
    const updated = await db.usageRecord.update({ where: { id: existing.id }, data: { count: existing.count + 1, updatedAt: new Date() } });
    return { used: updated.count, limit };
  }

  // Create new record
  const data: { userId: string; date: string; category: string; count: number } = { userId: uid, date: today, category, count: 1 };
  await db.usageRecord.create({ data });
  return { used: 1, limit };
}

export async function isLimited(category: string, userId?: string): Promise<boolean> {
  const { used, limit } = await getUsage(category, userId);
  return used >= limit;
}

// ── Credits ──

export async function getCredits(userId?: string): Promise<{ balance: number; totalEarned: number; totalSpent: number }> {
  const wallet = userId ? await ensureWallet(userId) : await ensureWalletAnon();
  return { balance: wallet.balance, totalEarned: wallet.totalEarned, totalSpent: wallet.totalSpent };
}

export async function earnCredits(amount: number, type: string, description: string, referenceId?: string, userId?: string): Promise<{ balance: number; transactionId: string }> {
  if (amount <= 0) throw new Error('Amount must be positive');
  const uid = userId || await getGuestUserId();
  const wallet = await ensureWallet(uid);
  const newBalance = wallet.balance + amount;
  const newTotalEarned = wallet.totalEarned + amount;
  await db.creditWallet.update({ where: { id: wallet.id }, data: { balance: newBalance, totalEarned: newTotalEarned, updatedAt: new Date() } });
  const txData: { userId: string; type: string; amount: number; balance: number; description: string; referenceId: string } = { userId: uid, type, amount, balance: newBalance, description, referenceId: referenceId || '' };
  const transaction = await db.creditTransaction.create({ data: txData });
  return { balance: newBalance, transactionId: transaction.id };
}

export async function spendCredits(amount: number, category: string, description: string, userId?: string): Promise<{ success: boolean; balance: number; transactionId?: string }> {
  if (amount <= 0) throw new Error('Amount must be positive');
  const uid = userId || await getGuestUserId();
  const wallet = await ensureWallet(uid);
  if (wallet.balance < amount) return { success: false, balance: wallet.balance };
  const newBalance = wallet.balance - amount;
  const newTotalSpent = wallet.totalSpent + amount;
  await db.creditWallet.update({ where: { id: wallet.id }, data: { balance: newBalance, totalSpent: newTotalSpent, updatedAt: new Date() } });
  const txData: { userId: string; type: string; amount: number; balance: number; category: string; description: string } = { userId: uid, type: 'spend_feature', amount: -amount, balance: newBalance, category, description };
  const transaction = await db.creditTransaction.create({ data: txData });
  return { success: true, balance: newBalance, transactionId: transaction.id };
}

export async function getCreditHistory(limit: number = 20, userId?: string) {
  const where: { userId?: string } = {};
  if (userId) where.userId = userId;
  return db.creditTransaction.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit });
}

// ── Ad System ──

export async function getAdCampaign(placement: string) {
  const now = new Date();
  const campaign = await db.adCampaign.findFirst({
    where: { placement, status: 'active', startDate: { lte: now }, OR: [{ endDate: null }, { endDate: { gte: now } }] },
    orderBy: { priority: 'desc' },
  });

  if (campaign) return campaign;

  return db.adCampaign.findFirst({
    where: { status: 'active', startDate: { lte: now }, OR: [{ endDate: null }, { endDate: { gte: now } }] },
    orderBy: { priority: 'desc' },
  });
}

export async function getAdsWatchedToday(userId?: string): Promise<number> {
  const uid = userId || await getGuestUserId();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  return db.adImpression.count({
    where: {
      userId: uid,
      rewarded: true,
      createdAt: { gte: startOfDay },
    },
  });
}

export async function canAwardAdReward(userId?: string, limit = 5): Promise<boolean> {
  return (await getAdsWatchedToday(userId)) < limit;
}

async function updateTodayRevenue(data: { impressions?: number; clicks?: number; adRevenue?: number; subscriptionRevenue?: number }) {
  const today = getTodayKey();
  let record = await db.revenueRecord.findUnique({ where: { date: today } });
  if (!record) {
    record = await db.revenueRecord.create({ data: { date: today } });
  }
  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (data.impressions) updateData.adImpressions = { increment: data.impressions };
  if (data.clicks) updateData.adClicks = { increment: data.clicks };
  if (data.adRevenue) updateData.adRevenue = { increment: data.adRevenue };
  if (data.subscriptionRevenue) updateData.subscriptionRev = { increment: data.subscriptionRevenue };
  const newAdRev = record.adRevenue + (data.adRevenue ?? 0);
  const newSubRev = record.subscriptionRev + (data.subscriptionRevenue ?? 0);
  updateData.totalRevenue = newAdRev + newSubRev;
  await db.revenueRecord.update({ where: { date: today }, data: updateData });
}

export async function trackAdImpression(campaignId: string, adType: string, placement: string, userId?: string) {
  const uid = userId || await getGuestUserId();
  const campaign = await db.adCampaign.findUnique({ where: { id: campaignId } });
  const cpm = campaign?.cpm ?? 0;
  const revenuePerImpression = cpm / 1000;
  const impData: { userId: string; campaignId: string; adType: string; placement: string; revenue: number } = { userId: uid, campaignId, adType, placement, revenue: revenuePerImpression };
  const impression = await db.adImpression.create({ data: impData });
  await db.adCampaign.update({ where: { id: campaignId }, data: { impressions: { increment: 1 }, revenue: { increment: revenuePerImpression }, updatedAt: new Date() } });
  await updateTodayRevenue({ impressions: 1, adRevenue: revenuePerImpression });
  return impression;
}

export async function trackAdClick(impressionId: string) {
  const impression = await db.adImpression.findUnique({ where: { id: impressionId } });
  if (!impression) throw new Error('Impression not found');
  if (impression.clicked) return impression;
  const campaign = await db.adCampaign.findUnique({ where: { id: impression.campaignId } });
  const cpc = campaign?.cpc ?? 0;
  const updated = await db.adImpression.update({ where: { id: impressionId }, data: { clicked: true } });
  if (campaign) {
    await db.adCampaign.update({ where: { id: campaign.id }, data: { clicks: { increment: 1 }, revenue: { increment: cpc }, updatedAt: new Date() } });
  }
  await updateTodayRevenue({ clicks: 1, adRevenue: cpc });
  return updated;
}

export async function getRevenueStats(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString().split('T')[0];
  return db.revenueRecord.findMany({ where: { date: { gte: startDateStr } }, orderBy: { date: 'desc' } });
}

export async function seedAdCampaigns(): Promise<void> {
  const existing = await db.adCampaign.count();
  if (existing > 0) return;

  const campaigns = [
    { name: 'MedBoard Prep', advertiser: 'MedBoard Inc.', adType: 'banner', placement: 'dashboard_top', cpm: 8, cpc: 0.3, title: 'Ace Your Board Exams', subtitle: '2,000+ practice questions with detailed explanations', ctaText: 'Start Free Trial', priority: 10 },
    { name: 'Picmonic', advertiser: 'Picmonic Inc.', adType: 'banner', placement: 'tab_bottom', cpm: 6, cpc: 0.25, title: 'Learn with Pictures', subtitle: 'Visual mnemonics that stick — research-proven', ctaText: 'Try Free', priority: 8 },
    { name: 'Osmosis', advertiser: 'Osmosis.org', adType: 'interstitial', placement: 'tab_switch', cpm: 12, cpc: 0.4, title: 'Understand Medicine Faster', subtitle: '1,800+ videos, questions, and flashcards', ctaText: 'Watch Free', priority: 15 },
    { name: 'Anki Deck Pro', advertiser: 'AnkiDeck', adType: 'rewarded', placement: 'dashboard_top', cpm: 15, cpc: 0.5, title: 'Get Premium Flashcards', subtitle: 'Curated medical decks with spaced repetition', ctaText: 'Watch Ad to Earn', priority: 12 },
    { name: 'Sketchy Medical', advertiser: 'Sketchy Group', adType: 'banner', placement: 'quiz_result', cpm: 10, cpc: 0.35, title: 'Story-Based Learning', subtitle: 'Unforgettable visual stories for medical topics', ctaText: 'Explore Free', priority: 9 },
    { name: 'UWorld', advertiser: 'UWorld LLC', adType: 'interstitial', placement: 'tab_switch', cpm: 20, cpc: 0.6, title: '#1 Board Prep Resource', subtitle: 'Trusted by 90%+ of medical students nationwide', ctaText: 'Start Practicing', priority: 20 },
    { name: 'Pathoma', advertiser: 'Pathoma', adType: 'rewarded', placement: 'dashboard_top', cpm: 18, cpc: 0.75, title: 'Fundamentals of Pathology', subtitle: 'Dr. Husain Sattar\'s renowned video lectures', ctaText: 'Watch Ad to Access', priority: 14 },
  ];

  for (const c of campaigns) {
    await db.adCampaign.create({ data: { ...c, status: 'active', startDate: new Date() } });
  }
}
