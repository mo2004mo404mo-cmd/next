/**
 * Server-side caching helpers for App Router pages.
 *
 * ─── Why this exists ───
 *
 * Before this module, every SSR page in src/app/<tab>/page.tsx fetched its
 * data with `cache: 'no-store'` — meaning every page hit re-ran the
 * underlying DB query, even for content that changes rarely (question bank,
 * medical dictionary terms, leaderboard snapshots, etc.). Under load this
 * was a major contributor to the OOM-and-restart loop the watchdog was
 * mitigating.
 *
 * This module provides:
 *
 *   1. `cachedFetch(tag, fetcher, opts)` — wraps `unstable_cache` with a
 *      typed signature and sensible defaults. Use this for SSR pages where
 *      the data changes rarely and a small staleness window is acceptable.
 *
 *   2. Tag constants — `CACHE_TAGS.questions`, `CACHE_TAGS.dailyChallenge`,
 *      etc. Centralising the tag strings prevents typos (a typo'd tag
 *      silently disables invalidation, which is the worst kind of bug).
 *
 *   3. `invalidate(...tags)` — thin wrapper around `revalidateTag`. Call
 *      this from service-layer write paths (create/update/delete) so the
 *      SSR cache is busted the moment the underlying data changes.
 *
 *   4. `invalidatePath(path)` — wrapper around `revalidatePath`. Use this
 *      when a write invalidates a specific page (e.g. posting a question
 *      invalidates /bank).
 *
 * ─── Usage ───
 *
 *   // SSR page (src/app/bank/page.tsx)
 *   import { cachedFetch, CACHE_TAGS } from '@/lib/server/cache';
 *   const getBankCatalog = cachedFetch(
 *     'bank-catalog:v1',
 *     async () => questionRepository.list({ page: 1, limit: 20 }),
 *     { tags: [CACHE_TAGS.questions], revalidate: 60 }
 *   );
 *   const data = await getBankCatalog();
 *
 *   // Service write path (src/lib/services/question-service.ts)
 *   import { invalidate, CACHE_TAGS } from '@/lib/server/cache';
 *   async create(input) {
 *     const q = await this.repo.create(input);
 *     await invalidate(CACHE_TAGS.questions);   // ← busts the SSR cache
 *     return q;
 *   }
 *
 * ─── Important caveats ───
 *
 *   - `unstable_cache` is invoked at module load time, not call time. The
 *     cache key is the tuple `(keyVersion, ...args)`. Bump `keyVersion`
 *     (e.g. `bank-catalog:v1` → `bank-catalog:v2`) to force a full
 *     re-cache after a shape change.
 *
 *   - `unstable_cache` only caches the Promise result. If the fetcher
 *     throws, the cache stores the rejection and re-throws on every
 *     subsequent call until the revalidate window expires. Wrap fetchers
 *     in try/catch if you want graceful degradation.
 *
 *   - `revalidateTag` and `revalidatePath` only work inside Next.js
 *     request scope (route handlers, server actions, SSR pages). They
 *     DON'T work inside BullMQ workers or detached background jobs —
 *     for those, call the HTTP API instead.
 */

import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';

// ─────────────────────────────────────────────────────────────────────────
// Cache tag catalog
//
// Centralising tag strings here prevents typos. A typo'd tag silently
// disables invalidation, which is the worst kind of bug — the cache
// stays stale forever and nobody notices until a user complains.
// ─────────────────────────────────────────────────────────────────────────

export const CACHE_TAGS = {
  /** Question bank list + individual question pages. */
  questions: 'questions',
  /** Individual question by id (used by /api/questions/[id] SSR). */
  questionById: 'question-by-id',
  /** Daily challenge — changes once per day, but invalidate on admin override. */
  dailyChallenge: 'daily-challenge',
  /** Question of the day — same cadence as daily challenge. */
  qotd: 'qotd',
  /** Leaderboard — invalidate on every new attempt. */
  leaderboard: 'leaderboard',
  /** Medical dictionary — invalidate on term add/edit. */
  medicalDictionary: 'medical-dictionary',
  /** Medication tables — invalidate on drug add/edit. */
  medicationTables: 'medication-tables',
  /** Study streaks — invalidate on check-in. */
  studyStreaks: 'study-streaks',
  /** User achievements — invalidate on unlock. */
  achievements: 'achievements',
  /** Exam countdown — invalidate on exam add/edit. */
  examCountdown: 'exam-countdown',
  /** Medical news — fetched from upstream, long revalidate window. */
  medicalNews: 'medical-news',
  /** Speed quiz / arena sessions — invalidate on session end. */
  speedQuiz: 'speed-quiz',
  /** Flashcard decks — invalidate on deck create/edit/review. */
  flashcards: 'flashcards',
  /** User collections — invalidate on collection add/edit/delete. */
  collections: 'collections',
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

// ─────────────────────────────────────────────────────────────────────────
// cachedFetch — typed wrapper around unstable_cache
// ─────────────────────────────────────────────────────────────────────────

export interface CachedFetchOptions {
  /** Cache tags for on-demand invalidation via `revalidateTag`. */
  tags?: CacheTag[];
  /** Time-to-live in seconds. Default: 60s. Set to `false` for indefinite (only invalidated by tag). */
  revalidate?: number | false;
}

/**
 * Wraps a fetcher in `unstable_cache` with a typed signature.
 *
 *   const getBankCatalog = cachedFetch(
 *     'bank-catalog:v1',
 *     async () => questionRepository.list({ page: 1, limit: 20 }),
 *     { tags: [CACHE_TAGS.questions], revalidate: 60 }
 *   );
 *   const data = await getBankCatalog();
 *
 * The `keyVersion` argument lets you force a full re-cache after a shape
 * change — bump it from `:v1` to `:v2` and all existing cache entries
 * become orphans (eventually GC'd by Next.js).
 */
export function cachedFetch<TArgs extends unknown[], TResult>(
  keyVersion: string,
  fetcher: (...args: TArgs) => Promise<TResult>,
  opts: CachedFetchOptions = {}
): (...args: TArgs) => Promise<TResult> {
  const tags = opts.tags ?? [];
  const revalidate = opts.revalidate ?? 60;

  return unstable_cache(
    fetcher,
    tags.length > 0 ? [...tags, keyVersion] : [keyVersion],
    {
      ...(revalidate !== false ? { revalidate } : {}),
      ...(tags.length > 0 ? { tags } : {}),
    }
  );
}

/**
 * Cached fetcher for nullary fetchers (no arguments).
 *
 * Most SSR page fetchers take no args — they just fetch a fixed dataset.
 * This helper makes the call site cleaner:
 *
 *   const getBankCatalog = cachedFetch0('bank-catalog:v1', async () => { ... });
 *   const data = await getBankCatalog();
 */
export function cachedFetch0<TResult>(
  keyVersion: string,
  fetcher: () => Promise<TResult>,
  opts: CachedFetchOptions = {}
): () => Promise<TResult> {
  return cachedFetch(keyVersion, fetcher, opts);
}

// ─────────────────────────────────────────────────────────────────────────
// Invalidation helpers
//
// These are thin wrappers around revalidateTag/revalidatePath that exist
// for two reasons:
//   1. They centralise the import of `next/cache` so callers don't need
//      to remember which module the functions live in.
//   2. They return Promise<void> instead of void (the upstream signature
//      is misleading — revalidateTag is actually async under Next.js 16).
// ─────────────────────────────────────────────────────────────────────────

/**
 * Invalidate one or more cache tags. Call this from service-layer write
 * paths (create/update/delete) so the SSR cache is busted the moment
 * the underlying data changes.
 *
 *   await invalidate(CACHE_TAGS.questions);
 *   await invalidate(CACHE_TAGS.questions, CACHE_TAGS.leaderboard);
 *
 * Note: Next.js 16's `revalidateTag` requires a `profile` argument
 * (a cache life profile name like 'default', or a `{ expire: seconds }`
 * object). We pass `'default'` which uses Next.js's built-in profile
 * (5min stale, 15min revalidate). For custom expiry, call
 * `revalidateTag(tag, { expire: 60 })` directly.
 */
export async function invalidate(...tags: CacheTag[]): Promise<void> {
  for (const tag of tags) {
    revalidateTag(tag, 'default');
  }
}

/**
 * Invalidate a specific path. Use this when a write invalidates a
 * specific SSR page (e.g. posting a question invalidates /bank).
 *
 *   await invalidatePath('/bank');
 *   await invalidatePath('/bank', 'page');  // ← only the page, not layout
 */
export async function invalidatePath(
  path: string,
  type?: 'layout' | 'page'
): Promise<void> {
  revalidatePath(path, type);
}
