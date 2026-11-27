/**
 * Credit system — packages, costs, and AI-tool debit helpers.
 *
 * Three concerns:
 *
 * 1. CREDIT_PACKAGES — the catalog of buyable credit bundles shown in the
 *    Credit Shop's "Buy Credits" tab. Each package has a USD price, a base
 *    credit amount, and an optional bonus (e.g. "250 + 50 bonus").
 *
 * 2. AI_CREDIT_COSTS — per-category credit cost when a user wants to exceed
 *    their daily free-tier limit. E.g. one extra AI question generation = 2
 *    credits. Used by debitAICredits() below.
 *
 * 3. SPEND_ACTIONS — the non-AI spend catalog (quiz hint, streak freeze,
 *    premium hour, etc.). Mirrors the VALID_ACTIONS map in
 *    /api/credits/spend/route.ts.
 *
 * The actual wallet-balance mutation lives in src/lib/freemium-store.ts
 * (spendCredits, earnCredits). This module is the pure-data layer + a thin
 * server-side wrapper (debitAICredits) that combines "check limit → check
 * balance → spend → increment usage" into one call so AI routes don't have
 * to re-implement the dance.
 */

import type { Tier } from '@/lib/freemium-store';
import { AI_TOOL_CATEGORIES } from './tiers';

export interface CreditPackage {
  id: string;
  name: string;
  tagline: string;
  baseCredits: number;
  bonusCredits: number;
  priceUsd: number;
  /** Effective cost per credit in cents, for "best value" badges. */
  centPerCredit: number;
  popular?: boolean;
  bestValue?: boolean;
  accentColor: string;
  stripePriceId: string;
}

/**
 * Buyable credit packages. Stripe Price IDs are loaded from env
 * (STRIPE_PRICE_CREDITS_<ID>) and default to '' (mock checkout).
 */
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Top up when you need a little extra',
    baseCredits: 100,
    bonusCredits: 0,
    priceUsd: 4.99,
    centPerCredit: 499 / 100,
    accentColor: '#5a6478',
    stripePriceId: '',
  },
  {
    id: 'scholar',
    name: 'Scholar',
    tagline: 'Best for regular study sessions',
    baseCredits: 250,
    bonusCredits: 25,
    priceUsd: 9.99,
    centPerCredit: 999 / 275,
    popular: true,
    accentColor: '#8b5cf6',
    stripePriceId: '',
  },
  {
    id: 'master',
    name: 'Master',
    tagline: 'For intensive board-prep months',
    baseCredits: 600,
    bonusCredits: 100,
    priceUsd: 19.99,
    centPerCredit: 1999 / 700,
    bestValue: true,
    accentColor: '#00e5a0',
    stripePriceId: '',
  },
  {
    id: 'institution',
    name: 'Institution',
    tagline: 'Bulk credits for study groups & schools',
    baseCredits: 1500,
    bonusCredits: 400,
    priceUsd: 39.99,
    centPerCredit: 3999 / 1900,
    accentColor: '#f59e0b',
    stripePriceId: '',
  },
];

/** Look up a package by id (returns undefined if not found). */
export function getCreditPackage(id: string): CreditPackage | undefined {
  return CREDIT_PACKAGES.find((p) => p.id === id);
}

/** Total credits granted by a package (base + bonus). */
export function packageTotalCredits(pkg: CreditPackage): number {
  return pkg.baseCredits + pkg.bonusCredits;
}

/**
 * Per-category credit cost when a user exceeds their daily free limit and
 * wants to unlock additional uses of an AI tool. Cost is per-single-use.
 *
 * These are *also* mirrored in AI_TOOL_CATEGORIES in tiers.ts (which maps
 * toolId → category). The cost here is keyed by category.
 */
export const AI_CREDIT_COSTS: Record<string, number> = {
  ai_generations: 2,
  tutor_messages: 1,
  video_lessons: 5,
  case_simulations: 4,
  flashcard_decks: 3,
  image_analyzer: 4,
  voice_study: 2,
  board_prep_sessions: 8,
  mnemonics: 2,
  anatomy_visuals: 6,
  study_planner: 3,
  clinical_vignettes: 4,
  whiteboard_studio: 5,
  video_library: 3,
};

/**
 * Non-AI spendable actions shown in the Credit Shop. Mirrors VALID_ACTIONS
 * in /api/credits/spend/route.ts — keep in sync when adding new actions.
 */
export interface SpendAction {
  action: string;
  title: string;
  description: string;
  cost: number;
  category: string;
}

export const SPEND_ACTIONS: SpendAction[] = [
  { action: 'hint', title: 'Quiz Hint', description: 'Eliminate 2 wrong options on the current question', cost: 3, category: 'hint' },
  { action: 'streak_freeze', title: 'Streak Freeze', description: 'Protect your streak for 1 missed day', cost: 5, category: 'streak_freeze' },
  { action: 'premium_hour', title: 'Premium Hour', description: 'Unlock all premium features for 1 hour', cost: 10, category: 'premium_hour' },
  { action: 'question_pack', title: 'Question Pack', description: '5 bonus AI-generated questions on a topic of your choice', cost: 15, category: 'question_pack' },
  { action: 'custom_theme', title: 'Custom Theme', description: 'Unlock a custom color theme for your MedQ experience', cost: 20, category: 'custom_theme' },
];

/**
 * Returns the credit cost for one extra use of `toolId` beyond the user's
 * daily limit. Returns 0 if the tool is unknown.
 */
export function creditCostForTool(toolId: string): number {
  const category = AI_TOOL_CATEGORIES[toolId];
  if (!category) return 0;
  return AI_CREDIT_COSTS[category] ?? 0;
}

/**
 * Result of an AI-feature gate check. AI routes call debitAICredits() and
 * branch on `allowed`:
 *
 *   - allowed=true, source='tier_limit'  → free use, under daily limit
 *   - allowed=true, source='credits'     → paid use, credits were debited
 *   - allowed=false, reason='no_credits' → user needs to buy more credits
 *   - allowed=false, reason='unknown_tool' → tool not in catalog
 *
 * Note: Pro tier has limit=999999, so source is always 'tier_limit'.
 */
export interface AIFeatureGateResult {
  allowed: boolean;
  source: 'tier_limit' | 'credits' | 'none';
  reason?: 'no_credits' | 'unknown_tool' | 'limit_reached_and_no_credits';
  toolId: string;
  category: string;
  creditsSpent?: number;
  balanceBefore?: number;
  balanceAfter?: number;
  usageBefore?: number;
  usageAfter?: number;
  limit?: number;
  tier?: Tier;
}

/**
 * Server-side helper: check whether the user can use `toolId` and, if they're
 * over their daily limit, optionally debit credits to unlock one extra use.
 *
 * Behaviour:
 *   1. Look up the tool's category. If unknown → allowed=false, reason='unknown_tool'.
 *   2. Look up the user's current usage count for today.
 *   3. If under limit → allowed=true, source='tier_limit'. Nothing debited.
 *   4. If over limit:
 *      a. Compute credit cost for the category.
 *      b. If balance >= cost → spend credits, increment usage, return allowed=true, source='credits'.
 *      c. Else → allowed=false, reason='no_credits'.
 *
 * The caller is responsible for actually performing the AI work AFTER
 * receiving allowed=true. If the AI work fails, the caller should call
 * refundAICredits() to return the credits.
 *
 * Implementation detail: this function imports freemium-store lazily to
 * avoid a circular dependency at module-load time (freemium-store imports
 * from db, which is fine, but it keeps the surface area small).
 */
export async function debitAICredits(
  userId: string,
  toolId: string,
  opts?: { allowCreditSpend?: boolean },
): Promise<AIFeatureGateResult> {
  const allowCreditSpend = opts?.allowCreditSpend ?? true;
  // Lazy import to avoid pulling db into client bundles accidentally.
  const { getTier, getUsage, incrementUsage, getCredits, spendCredits } = await import('@/lib/freemium-store');
  const { AI_TOOL_CATEGORIES, canUseTool } = await import('./tiers');

  const category = AI_TOOL_CATEGORIES[toolId];
  if (!category) {
    return { allowed: false, source: 'none', reason: 'unknown_tool', toolId, category: '' };
  }

  const tier = await getTier(userId);
  const usageBefore = await getUsage(category, userId);
  const check = canUseTool(tier, toolId, usageBefore.used);

  if (check.allowed) {
    // Under the daily limit — bump usage counter and let the call through.
    const usageAfter = await incrementUsage(category, userId);
    return {
      allowed: true,
      source: 'tier_limit',
      toolId,
      category,
      usageBefore: usageBefore.used,
      usageAfter: usageAfter.used,
      limit: usageAfter.limit,
      tier,
    };
  }

  // Over limit. Either spend credits or deny.
  if (!allowCreditSpend) {
    return {
      allowed: false,
      source: 'none',
      reason: 'limit_reached_and_no_credits',
      toolId,
      category,
      usageBefore: usageBefore.used,
      usageAfter: usageBefore.used,
      limit: usageBefore.limit,
      tier,
    };
  }

  const cost = AI_CREDIT_COSTS[category] ?? 0;
  if (cost <= 0) {
    // No credit cost defined for this category — straight denial.
    return {
      allowed: false,
      source: 'none',
      reason: 'limit_reached_and_no_credits',
      toolId,
      category,
      usageBefore: usageBefore.used,
      usageAfter: usageBefore.used,
      limit: usageBefore.limit,
      tier,
    };
  }

  const wallet = await getCredits(userId);
  if (wallet.balance < cost) {
    return {
      allowed: false,
      source: 'none',
      reason: 'no_credits',
      toolId,
      category,
      usageBefore: usageBefore.used,
      usageAfter: usageBefore.used,
      limit: usageBefore.limit,
      tier,
      balanceBefore: wallet.balance,
      balanceAfter: wallet.balance,
    };
  }

  const spend = await spendCredits(
    cost,
    `ai:${category}`,
    `Extra ${toolId} use (over daily limit)`,
    userId,
  );
  if (!spend.success) {
    return {
      allowed: false,
      source: 'none',
      reason: 'no_credits',
      toolId,
      category,
      usageBefore: usageBefore.used,
      usageAfter: usageBefore.used,
      limit: usageBefore.limit,
      tier,
      balanceBefore: wallet.balance,
      balanceAfter: wallet.balance,
    };
  }

  const usageAfter = await incrementUsage(category, userId);
  return {
    allowed: true,
    source: 'credits',
    toolId,
    category,
    usageBefore: usageBefore.used,
    usageAfter: usageAfter.used,
    limit: usageAfter.limit,
    creditsSpent: cost,
    balanceBefore: wallet.balance,
    balanceAfter: spend.balance,
    tier,
  };
}

/**
 * Refund credits spent by debitAICredits(). Used when an AI route fails after
 * the gate has already debited the user. Returns the new balance, or null if
 * no refund was applicable (e.g. the original gate was free-tier-limit, not
 * credit-spend).
 */
export async function refundAICredits(
  userId: string,
  gate: AIFeatureGateResult,
  reason: string = 'AI call failed',
): Promise<number | null> {
  if (!gate.allowed || gate.source !== 'credits' || !gate.creditsSpent) {
    return null;
  }
  const { earnCredits } = await import('@/lib/freemium-store');
  const result = await earnCredits(
    gate.creditsSpent,
    'refund',
    `Refund: ${reason} (${gate.toolId})`,
    undefined,
    userId,
  );
  return result.balance;
}
