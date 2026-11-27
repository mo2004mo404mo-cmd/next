/**
 * Subscription tier definitions & feature gating rules.
 *
 * Three tiers:
 *   - free     — $0/mo, daily-limited access to every AI tool, banner ads
 *   - premium  — $9.99/mo, 20x higher daily limits, no banner ads, priority support
 *   - pro      — $19.99/mo, effectively-unlimited daily limits, no ads at all,
 *                early-access features, monthly credit allowance
 *
 * Daily limits live in LIMITS (mirrored from src/lib/freemium-store.ts). They
 * are per-category per-day counters persisted in the UsageRecord table. When a
 * user hits their daily limit, they can either:
 *   - wait for the next UTC day (limit resets), OR
 *   - spend credits from their CreditWallet to unlock more actions of the
 *     same category (see src/lib/subscription/credits.ts → debitAICredits).
 *
 * Pro tier limits are set to 999999 (effectively unlimited). Stripe handles
 * the actual hard cap on Pro monthly usage via the metered billing API (TBD).
 *
 * Stripe price IDs are loaded from env (STRIPE_PRICE_PREMIUM, STRIPE_PRICE_PRO).
 * If unset, the checkout flow falls back to "mock mode" — see
 * src/lib/payments/stripe.ts → isStripeConfigured().
 */

import type { Tier } from '@/lib/freemium-store';

export interface TierDefinition {
  id: Tier;
  name: string;
  tagline: string;
  priceUsd: number;
  /** ISO currency code. */
  currency: 'usd';
  /** Billing interval for display + Stripe price lookup. */
  interval: 'month' | 'year' | 'forever';
  /** Monthly credit allowance granted on renewal. 0 = none. */
  monthlyCreditAllowance: number;
  /** Feature bullets shown on /pricing and in UpgradeModal. */
  features: string[];
  /** True if this tier removes banner ads. */
  adFree: boolean;
  /** True if this tier removes ALL ads (including rewarded). */
  adFreeAll: boolean;
  /** Per-category daily limits. Mirrored in freemium-store.LIMITS. */
  limits: Record<string, number>;
  /** Stripe Price ID (loaded from env, empty when Stripe not configured). */
  stripePriceId: string;
  /** Accent color used in the UpgradeModal / pricing cards. */
  accentColor: string;
  /** Whether this tier is marked "Most Popular" on pricing surfaces. */
  popular?: boolean;
}

/**
 * All 14 AI tools gated behind `premium: true` in MedQAppShell.tsx.
 * Used as the canonical list when checking feature access. Maps tool ID →
 * usage-tracking category (the same category stored in UsageRecord.category).
 */
export const AI_TOOL_CATEGORIES: Record<string, string> = {
  generate: 'ai_generations',
  tutor: 'tutor_messages',
  cases: 'case_simulations',
  mnemonics: 'mnemonics',
  'image-analyzer': 'image_analyzer',
  voice: 'voice_study',
  files: 'ai_generations', // From-Files uses the same bucket as Generate
  video: 'video_lessons',
  'board-prep': 'board_prep_sessions',
  anatomy: 'anatomy_visuals',
  'clinical-vignettes': 'clinical_vignettes',
  'whiteboard-studio': 'whiteboard_studio',
  'video-library': 'video_library',
  planner: 'study_planner',
};

export const AI_TOOL_IDS = Object.keys(AI_TOOL_CATEGORIES);

/**
 * Daily-limit values per tier. Must stay in sync with LIMITS in
 * src/lib/freemium-store.ts. Duplicated here so the tier definitions file is
 * the single source of truth for *what each tier gets*.
 */
const FREE_LIMITS: Record<string, number> = {
  ai_generations: 5,
  tutor_messages: 10,
  video_lessons: 1,
  case_simulations: 2,
  flashcard_decks: 3,
  image_analyzer: 3,
  voice_study: 5,
  board_prep_sessions: 1,
  mnemonics: 3,
  anatomy_visuals: 2,
  study_planner: 3,
  clinical_vignettes: 1,
  whiteboard_studio: 1,
  video_library: 2,
};

const PREMIUM_LIMITS: Record<string, number> = Object.fromEntries(
  Object.entries(FREE_LIMITS).map(([k, v]) => [k, Math.max(20, v * 20)]),
);

const PRO_LIMITS: Record<string, number> = Object.fromEntries(
  Object.keys(FREE_LIMITS).map((k) => [k, 999999]),
);

function priceIdFromEnv(key: string): string {
  // env is only readable at runtime on the server. This function is invoked
  // lazily inside getTierDefinition() so it's safe to call from client code
  // (the result is "no price id" on the client).
  if (typeof process === 'undefined') return '';
  return process.env[key] ?? '';
}

let _cachedTiers: Record<Tier, TierDefinition> | null = null;

export function getTierDefinitions(): Record<Tier, TierDefinition> {
  if (_cachedTiers) return _cachedTiers;
  _cachedTiers = {
    free: {
      id: 'free',
      name: 'Free',
      tagline: 'Get started, no credit card required',
      priceUsd: 0,
      currency: 'usd',
      interval: 'forever',
      monthlyCreditAllowance: 25, // welcome bonus only (one-time)
      features: [
        '5 AI question generations / day',
        '10 AI tutor messages / day',
        '1 video lesson / day',
        '2 case simulations / day',
        '3 flashcard decks / day',
        'Banner ads (removable with credits)',
        'Earn credits by watching rewarded ads',
        'Community access',
      ],
      adFree: false,
      adFreeAll: false,
      limits: FREE_LIMITS,
      stripePriceId: '',
      accentColor: '#5a6478',
    },
    premium: {
      id: 'premium',
      name: 'Premium',
      tagline: 'For serious medical students',
      priceUsd: 9.99,
      currency: 'usd',
      interval: 'month',
      monthlyCreditAllowance: 250,
      features: [
        '100 AI question generations / day',
        '100 AI tutor messages / day',
        'Unlimited video lessons',
        'Unlimited case simulations',
        'No banner ads',
        'Priority email support',
        'Advanced analytics dashboard',
        '250 bonus credits / month',
        'Custom study themes',
      ],
      adFree: true,
      adFreeAll: false,
      limits: PREMIUM_LIMITS,
      stripePriceId: priceIdFromEnv('STRIPE_PRICE_PREMIUM'),
      accentColor: '#8b5cf6',
      popular: true,
    },
    pro: {
      id: 'pro',
      name: 'Pro',
      tagline: 'Maximum power for board prep',
      priceUsd: 19.99,
      currency: 'usd',
      interval: 'month',
      monthlyCreditAllowance: 1000,
      features: [
        'Unlimited AI generations',
        'Unlimited AI tutor messages',
        'Unlimited everything',
        'No ads of any kind',
        'Early access to new features',
        'Dedicated support channel',
        '1000 bonus credits / month',
        'Custom study plans & schedules',
        'API access (coming soon)',
        'Revenue dashboard',
      ],
      adFree: true,
      adFreeAll: true,
      limits: PRO_LIMITS,
      stripePriceId: priceIdFromEnv('STRIPE_PRICE_PRO'),
      accentColor: '#f59e0b',
    },
  };
  return _cachedTiers;
}

export function getTierDefinition(tier: Tier): TierDefinition {
  return getTierDefinitions()[tier];
}

export function getTierList(): TierDefinition[] {
  const defs = getTierDefinitions();
  return [defs.free, defs.premium, defs.pro];
}

export function isValidTier(tier: string): tier is Tier {
  return tier === 'free' || tier === 'premium' || tier === 'pro';
}

/**
 * Returns true if the user on `tier` can use `toolId` without spending
 * credits — i.e. they're under their daily limit for that category.
 *
 * Usage:
 *   const { allowed, reason, category, used, limit } = canUseTool('premium', 'generate', 5);
 *   if (!allowed && reason === 'limit_reached') { /* prompt credit spend *\/ }
 */
export function canUseTool(
  tier: Tier,
  toolId: string,
  currentUsageCount: number,
): {
  allowed: boolean;
  reason: 'ok' | 'limit_reached' | 'unknown_tool';
  category: string;
  used: number;
  limit: number;
} {
  const category = AI_TOOL_CATEGORIES[toolId];
  if (!category) return { allowed: false, reason: 'unknown_tool', category: '', used: 0, limit: 0 };
  const def = getTierDefinition(tier);
  const limit = def.limits[category] ?? 0;
  const allowed = currentUsageCount < limit;
  return {
    allowed,
    reason: allowed ? 'ok' : 'limit_reached',
    category,
    used: currentUsageCount,
    limit,
  };
}

/**
 * Reset the tier-definition cache. Only used in tests.
 */
export function _resetTierCache(): void {
  _cachedTiers = null;
}
