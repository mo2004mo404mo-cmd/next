#!/usr/bin/env python3
"""Stage 10 — Visitor strategy threshold table.

Creates two new files in /tmp/my-project:
  1. src/lib/subscription/visitor-strategy.ts
  2. test/visitor-strategy.test.ts

The visitor-strategy.ts module introduces an explicit 'visitor' access tier
BELOW 'free' for unauthenticated traffic, with a documented threshold matrix
covering: AI generations/day, tutor messages/day, file upload caps, video
analysis gate, deep-agent gate, save-to-bank gate, library-upload gate, ads
level. Adds a `classifyVisitor` classifier and a `rateLimitKey` helper that
keys visitors by IP and authenticated users by userId — closing the
'one guest = entire free-tier bucket' gap flagged by the audit.

Tests cover:
  • classifyVisitor returns 'visitor' for guest user
  • classifyVisitor returns the user's tier for authenticated users
  • thresholdFor returns the matching matrix entry
  • thresholdFor throws on unknown tier
  • rateLimitKey uses ip: prefix for visitors, user: for authenticated
  • The matrix covers every capability for every tier (no missing keys)

Idempotent.
"""
from pathlib import Path

PROJECT = Path("/tmp/my-project")
STRATEGY_FILE = PROJECT / "src/lib/subscription/visitor-strategy.ts"
TEST_FILE = PROJECT / "test/visitor-strategy.test.ts"

STRATEGY_SRC = '''/**
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
    fileUploadMaxMb: 15,
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
    fileUploadMaxMb: 50,
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
'''

TEST_SRC = '''import { describe, it, expect } from 'vitest';
import {
  VISITOR_THRESHOLDS,
  classifyVisitor,
  thresholdFor,
  rateLimitKey,
  type AccessTier,
} from '@/lib/subscription/visitor-strategy';

// ── Stage 10: visitor strategy threshold table ──────────────────────────────

describe('VISITOR_THRESHOLDS', () => {
  it('covers every tier in AccessTier (no missing keys)', () => {
    const tiers: AccessTier[] = ['visitor', 'free', 'premium', 'pro'];
    for (const t of tiers) {
      expect(VISITOR_THRESHOLDS[t], `tier=${t}`).toBeDefined();
    }
  });

  it('visitor has the tightest caps of any tier', () => {
    const v = VISITOR_THRESHOLDS.visitor;
    const f = VISITOR_THRESHOLDS.free;
    expect(v.aiGenerationsPerDay).toBeLessThanOrEqual(f.aiGenerationsPerDay);
    expect(v.tutorMessagesPerDay).toBeLessThanOrEqual(f.tutorMessagesPerDay);
    expect(v.fileUploadMaxMb).toBeLessThanOrEqual(f.fileUploadMaxMb);
    expect(v.fileUploadsPerDay).toBeLessThanOrEqual(f.fileUploadsPerDay);
  });

  it('visitor cannot use video analysis, deep agent, save, or upload', () => {
    const v = VISITOR_THRESHOLDS.visitor;
    expect(v.videoAnalysisAllowed).toBe(false);
    expect(v.deepAgentAllowed).toBe(false);
    expect(v.canSaveQuestions).toBe(false);
    expect(v.canUploadToLibrary).toBe(false);
  });

  it('visitor is anonymous; every paid tier is not', () => {
    expect(VISITOR_THRESHOLDS.visitor.isAnonymous).toBe(true);
    expect(VISITOR_THRESHOLDS.free.isAnonymous).toBe(false);
    expect(VISITOR_THRESHOLDS.premium.isAnonymous).toBe(false);
    expect(VISITOR_THRESHOLDS.pro.isAnonymous).toBe(false);
  });

  it('ads level escalates from full to none across tiers', () => {
    expect(VISITOR_THRESHOLDS.visitor.adsLevel).toBe('full');
    expect(VISITOR_THRESHOLDS.free.adsLevel).toBe('full');
    expect(VISITOR_THRESHOLDS.premium.adsLevel).toBe('minimal');
    expect(VISITOR_THRESHOLDS.pro.adsLevel).toBe('none');
  });
});

describe('classifyVisitor', () => {
  it('returns visitor when isGuestUser=true', () => {
    expect(classifyVisitor({ isGuestUser: true, tier: 'free' })).toBe('visitor');
    expect(classifyVisitor({ isGuestUser: true, tier: 'premium' })).toBe('visitor');
    expect(classifyVisitor({ isGuestUser: true, tier: 'pro' })).toBe('visitor');
  });

  it('returns the user tier when isGuestUser=false', () => {
    expect(classifyVisitor({ isGuestUser: false, tier: 'free' })).toBe('free');
    expect(classifyVisitor({ isGuestUser: false, tier: 'premium' })).toBe('premium');
    expect(classifyVisitor({ isGuestUser: false, tier: 'pro' })).toBe('pro');
  });

  it('defaults to free when no tier is provided', () => {
    expect(classifyVisitor({ isGuestUser: false })).toBe('free');
  });
});

describe('thresholdFor', () => {
  it('returns the matching matrix entry for each known tier', () => {
    expect(thresholdFor('visitor').label).toBe('Visitor');
    expect(thresholdFor('free').label).toBe('Free');
    expect(thresholdFor('premium').label).toBe('Premium');
    expect(thresholdFor('pro').label).toBe('Pro');
  });

  it('throws on unknown tier', () => {
    // Cast through unknown to bypass the type guard and exercise runtime check.
    expect(() => thresholdFor('gold' as AccessTier)).toThrow(/Unknown access tier/);
  });
});

describe('rateLimitKey', () => {
  it('keys visitors by IP (per-IP cap)', () => {
    expect(
      rateLimitKey({ tier: 'visitor', category: 'ai_generations', ip: '1.2.3.4' }),
    ).toBe('ai_generations:ip:1.2.3.4');
  });

  it('keys authenticated users by userId (per-user cap)', () => {
    expect(
      rateLimitKey({
        tier: 'free',
        category: 'ai_generations',
        ip: '1.2.3.4',
        userId: 'user_42',
      }),
    ).toBe('ai_generations:user:user_42');
  });

  it('falls back to "unknown" when userId is missing for an authenticated tier', () => {
    expect(
      rateLimitKey({ tier: 'premium', category: 'tutor_messages', ip: '5.6.7.8' }),
    ).toBe('tutor_messages:user:unknown');
  });

  it('different IPs produce different visitor keys (no shared bucket)', () => {
    const a = rateLimitKey({ tier: 'visitor', category: 'ai_generations', ip: '1.1.1.1' });
    const b = rateLimitKey({ tier: 'visitor', category: 'ai_generations', ip: '2.2.2.2' });
    expect(a).not.toBe(b);
  });
});
'''

def main() -> int:
    STRATEGY_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not STRATEGY_FILE.exists():
        STRATEGY_FILE.write_text(STRATEGY_SRC)
        print(f"[visitor-strategy.ts] wrote {len(STRATEGY_SRC)} bytes")
    else:
        existing = STRATEGY_FILE.read_text()
        if "Stage 10 visitor strategy" in existing:
            print("[visitor-strategy.ts] already exists, skipping")
        else:
            STRATEGY_FILE.write_text(STRATEGY_SRC)
            print(f"[visitor-strategy.ts] overwrote {len(STRATEGY_SRC)} bytes")

    if not TEST_FILE.exists():
        TEST_FILE.write_text(TEST_SRC)
        print(f"[visitor-strategy.test.ts] wrote {len(TEST_SRC)} bytes")
    else:
        existing = TEST_FILE.read_text()
        if "Stage 10: visitor strategy" in existing:
            print("[visitor-strategy.test.ts] already exists, skipping")
        else:
            TEST_FILE.write_text(TEST_SRC)
            print(f"[visitor-strategy.test.ts] overwrote {len(TEST_SRC)} bytes")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
