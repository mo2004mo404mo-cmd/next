"""Add tests for resolveAccessTier (the DB-aware helper added in the wiring
patch). Tests use stubs for the db + guest-user modules so they don't
require a live Postgres.
"""
from pathlib import Path

TEST = Path("/tmp/my-project/test/visitor-strategy.test.ts")
src = TEST.read_text()

APPENDIX = """

// ── resolveAccessTier (DB-aware) tests ───────────────────────────────────────
//
// These tests stub the lazy imports for @/lib/db and @/lib/guest-user so
// resolveAccessTier can be exercised without a live Postgres. The stubs
// are installed via vitest's vi.mock() at the top of the file.

import { vi } from 'vitest';

// Stub the db module's subscription lookup.
vi.mock('@/lib/db', () => ({
  db: {
    subscription: {
      findUnique: vi.fn(async ({ where: { userId } }: { where: { userId: string } }) => {
        // Test fixture: user_tier_free → free; user_tier_premium → premium;
        // user_tier_pro → pro; anyone else → no subscription (default free).
        if (userId === 'user_tier_free') return { tier: 'free' };
        if (userId === 'user_tier_premium') return { tier: 'premium' };
        if (userId === 'user_tier_pro') return { tier: 'pro' };
        return null;
      }),
    },
  },
}));

// Stub the guest-user module so we control which userId is "the guest".
vi.mock('@/lib/guest-user', () => ({
  getGuestUserId: vi.fn(async () => 'guest_user_id_fixture'),
}));

// Re-import AFTER mocks are in place so resolveAccessTier sees the stubs.
// Dynamic import returns a fresh module graph under vitest's module registry.
async function loadStrategy() {
  return await import('@/lib/subscription/visitor-strategy');
}

describe('resolveAccessTier (DB-aware)', () => {
  it('returns "visitor" when userId === guest user id', async () => {
    const m = await loadStrategy();
    const tier = await m.resolveAccessTier('guest_user_id_fixture');
    expect(tier).toBe('visitor');
  });

  it('returns the user subscription tier when authenticated', async () => {
    const m = await loadStrategy();
    expect(await m.resolveAccessTier('user_tier_free')).toBe('free');
    expect(await m.resolveAccessTier('user_tier_premium')).toBe('premium');
    expect(await m.resolveAccessTier('user_tier_pro')).toBe('pro');
  });

  it('defaults to "free" when the user has no subscription row', async () => {
    const m = await loadStrategy();
    expect(await m.resolveAccessTier('user_no_sub')).toBe('free');
  });
});
"""

if "resolveAccessTier (DB-aware)" in src:
    print("[visitor-strategy.test.ts] resolveAccessTier tests already present, skipping")
else:
    TEST.write_text(src.rstrip() + "\n" + APPENDIX + "\n")
    print("[visitor-strategy.test.ts] appended resolveAccessTier tests")
