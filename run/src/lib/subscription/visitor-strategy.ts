/**
 * visitor-strategy.ts — Stage 10 visitor strategy threshold table.
 *
 * ── Audit context ──
 * Before this module, all unauthenticated traffic was bucketed under the
 * shared `guest@medq.local` user record (see src/lib/guest-user.tsx) with a
 * `free` subscription. That meant EVERY visitor on the internet drew from
 * ONE free-tier daily quota — a single visitor could exhaust the limit for
 * all guests, and a coordinated attacker could trivially starve the pool.
 *
 * ── Strategy ──
 * Add an explicit `visitor` tier BELOW `free` for unauthenticated traffic,
 * with much tighter per-IP caps. Authenticated users keep their existing
 * free / premium / pro tier. The matrix below is the single source of truth
 * for "what can each tier do" — wired into the rate limiter and surfaced
 * to product via /api/visitor-strategy (so the marketing site can render a
 * comparison table without re-deriving the numbers).
 *
 * ── Why a separate tier (not a flag) ──
 * A visitor's caps are PER-IP (rate-limit.ts, key=`<category>:<ip>`), while
 * an authenticated user's caps are PER-USER (key=`<category>:<userId>`).
 * Splitting the tier makes that policy explicit at the call site instead
 * of hiding it behind "isGuest" branches scattered across routes.
 */

import type { Tier } from '@/lib/freemium-store';

/** All access tiers, lowest to highest privilege. */
export type AccessTier = 'visitor' | Tier;

/** The full threshold matrix. Adding a new capability means adding one
 *  field here and one entry per tier — the type system enforces coverage. */
export interface VisitorThreshold {
  /** Display label for the marketing site / pricing table. */
  label: string;
  /** True if this tier is unauthenticated (per-IP caps, no account). */
  isAnonymous: boolean;
  /** AI generations per day. */
  aiGenerationsPerDay: number;
  /** Tutor messages per day. */
  tutorMessagesPerDay: number;
  /** File upload: max single-file size in MB. */
  fileUploadMaxMb: number;
  /** File uploads per day. */
  fileUploadsPerDay: number;
  /** Whether video analysis (VLM scene segmentation) is allowed. */
  videoAnalysisAllowed: boolean;
  /** Whether the deep-agent autonomous loop is allowed. */
  deepAgentAllowed: boolean;
  /** Whether the user can save questions to the bank. */
  canSaveQuestions: boolean;
  /** Whether the user can upload to the shared knowledge library. */
  canUploadToLibrary: boolean;
  /** Banner ads shown to this tier. */
  adsLevel: 'full' | 'minimal' | 'none';
}

export const VISITOR_THRESHOLDS: Record<AccessTier, VisitorThreshold> = {
  visitor: {
    label: 'Visitor',
    isAnonymous: true,
    aiGenerationsPerDay: 2,
    tutorMessagesPerDay: 3,
    fileUploadMaxMb: 2,
    fileUploadsPerDay: 1,
    videoAnalysisAllowed: false,
    deepAgentAllowed: false,
    canSaveQuestions: false,
    canUploadToLibrary: false,
    adsLevel: 'full',
  },
  free: {
    label: 'Free',
    isAnonymous: false,
    aiGenerationsPerDay: 5,
    tutorMessagesPerDay: 10,
    // 50 MB — raised from 15 MB (2026-11-03): medical PDFs (textbook
    // chapters, clinical guidelines, case reports) routinely run 20-80
    // MB; 15 MB blocked the core use case. The tier hierarchy is
    // preserved by the OTHER caps (5 uploads/day vs premium's 100, no
    // deep-agent, full ads) so file size alone no longer gates real
    // medical documents.
    fileUploadMaxMb: 50,
    fileUploadsPerDay: 5,
    videoAnalysisAllowed: true,
    deepAgentAllowed: false,
    canSaveQuestions: true,
    canUploadToLibrary: true,
    adsLevel: 'full',
  },
  premium: {
    label: 'Premium',
    isAnonymous: false,
    aiGenerationsPerDay: 100,
    tutorMessagesPerDay: 100,
    // 80 MB — raised from 50 MB (2026-11-03) to keep a clear step above
    // the new free tier (50 MB) while staying below pro's absolute cap.
    fileUploadMaxMb: 80,
    fileUploadsPerDay: 100,
    videoAnalysisAllowed: true,
    deepAgentAllowed: true,
    canSaveQuestions: true,
    canUploadToLibrary: true,
    adsLevel: 'minimal',
  },
  pro: {
    label: 'Pro',
    isAnonymous: false,
    aiGenerationsPerDay: 999_999,
    tutorMessagesPerDay: 999_999,
    fileUploadMaxMb: 100,
    fileUploadsPerDay: 999_999,
    videoAnalysisAllowed: true,
    deepAgentAllowed: true,
    canSaveQuestions: true,
    canUploadToLibrary: true,
    adsLevel: 'none',
  },
};

/**
 * Classify a request into its AccessTier. The classification is the single
 * decision point routes call before applying caps — keeps policy in one file.
 *
 *   - isGuestUser=true -> 'visitor' (regardless of any other field)
 *   - otherwise -> the user's subscription tier, defaulting to 'free'
 *
 * The caller is responsible for the actual anonymous check (session lookup,
 * guest-user comparison). We don't reach into the DB here so the function
 * stays pure and unit-testable.
 */
export function classifyVisitor(opts: {
  isGuestUser: boolean;
  tier?: Tier;
}): AccessTier {
  if (opts.isGuestUser) return 'visitor';
  return opts.tier ?? 'free';
}

/**
 * Look up the threshold matrix entry for a tier. Throws on unknown tier
 * (which should be impossible because AccessTier is a closed union, but
 * this guards against runtime drift if VISITOR_THRESHOLDS is edited
 * without adding the matching key).
 */
export function thresholdFor(tier: AccessTier): VisitorThreshold {
  const t = VISITOR_THRESHOLDS[tier];
  if (!t) {
    throw new Error(`Unknown access tier: ${tier as string}`);
  }
  return t;
}

/**
 * Rate-limit key for a given category. Visitors are keyed by IP (since they
 * have no user id), authenticated users by userId. This separation is what
 * makes the per-IP caps for visitors actually work.
 */
export function rateLimitKey(opts: {
  tier: AccessTier;
  category: string;
  ip: string;
  userId?: string;
}): string {
  if (opts.tier === 'visitor') {
    return `${opts.category}:ip:${opts.ip}`;
  }
  return `${opts.category}:user:${opts.userId ?? 'unknown'}`;
}


// ── DB-aware resolver (server-only) ────────────────────────────────────────
//
// `classifyVisitor` (above) is pure: callers pass isGuestUser + tier.
// `resolveAccessTier` is the DB-aware counterpart: given a userId, it looks
// up whether that user IS the guest user (shared anonymous record) and what
// their subscription tier is, then returns the AccessTier.
//
// Routes call this after resolveUserId() to get the tier, then thresholdFor()
// to apply caps.

// Lazy imports so the pure functions above stay pure-testable without a DB.
// (These imports only run when resolveAccessTier is actually called.)
type DbLike = {
  subscription: {
    findUnique: (args: { where: { userId: string } }) => Promise<{ tier: string } | null>;
  };
};

async function loadDb(): Promise<DbLike> {
  const mod = await import('@/lib/db');
  return mod.db as unknown as DbLike;
}

async function loadGuestResolver(): Promise<() => Promise<string>> {
  const mod = await import('@/lib/guest-user');
  return mod.getGuestUserId;
}

/**
 * Resolve the AccessTier for a given userId. Server-only (touches DB).
 *
 *   - If userId === guest user id → 'visitor'
 *   - Otherwise → look up subscription.tier; default to 'free' if missing
 *
 * Lazy-imports the db + guest-user modules so the pure helpers above stay
 * unit-testable without a DB or Next runtime.
 */
export async function resolveAccessTier(userId: string): Promise<AccessTier> {
  const getGuestUserId = await loadGuestResolver();
  const guestId = await getGuestUserId();
  if (userId === guestId) return 'visitor';

  const db = await loadDb();
  const sub = await db.subscription.findUnique({ where: { userId } });
  const tier = (sub?.tier as Tier) ?? 'free';
  return classifyVisitor({ isGuestUser: false, tier });
}

