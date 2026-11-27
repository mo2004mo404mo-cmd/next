'use client';

/**
 * Client-side chunk precache warmer.
 *
 * Background — why this exists:
 * ──────────────────────────────
 * The MedQ service worker (public/sw.js) precaches the homepage HTML and
 * every chunk URL referenced inside it (script src, link href, modulepreload).
 * That's enough to bootstrap the React shell offline.
 *
 * BUT: every tab component (DashboardTab, BankTab, FlashcardsTab, …) is
 * loaded on-demand via `import('./tabs/group-<name>')` followed by
 * `groupMod.loadTab(tabId)`. Those chunk files are NOT referenced in the
 * homepage HTML — Turbopack emits them as separate lazy chunks. So they
 * are never precached by the SW install hook.
 *
 * The same is true for the bootstrap chunks that AppEntry.tsx loads via
 * `next/dynamic` — AuthProvider, SubscriptionProvider, SettingsProvider,
 * MedQAppShell, Toaster, ServiceWorkerRegistrar. These ARE loaded on
 * first render (so they get cached by the SW's asset SWR handler at that
 * point), but if the user goes offline before first render completes,
 * they're missing.
 *
 * Result without this module:
 *   1. User goes offline
 *   2. User reloads the page
 *   3. SW returns cached '/' HTML → React boots → AppEntry renders
 *   4. AppEntry's dynamic() calls fire for AuthProvider, SubscriptionProvider,
 *      MedQAppShell, etc.
 *   5. If any of those chunks isn't cached → fetch fails → dynamic() shows
 *      its `loading` fallback FOREVER (next/dynamic has no built-in error
 *      recovery) → user sees "Loading MedQ…" spinner that never resolves
 *   6. OR: user clicks a tab → tab chunk fetch fails → "Failed to load tab"
 *
 * Fix:
 *   After the app first renders (and the SW is the controller), the client
 *   triggers dynamic imports of EVERY tab group AND every bootstrap module
 *   in the background. The fetches go through the SW's asset SWR handler
 *   (`handleAssetSwr`), which caches each chunk for offline use. The
 *   imported modules are discarded (we don't actually render them) — we
 *   only care about the side-effect of caching their chunk files.
 *
 *   To avoid hammering the network on every page load, we only warm up
 *   once per sessionStorage marker, and we skip if the user is offline
 *   (the imports would fail anyway).
 *
 * Cost:
 *   - One-time cost: ~18 chunk fetches (≈ 300 KB – 1 MB total, depending on
 *     shared deps). Run in the background after first paint, so it does
 *     NOT delay initial render.
 *   - Ongoing: skipped if sessionStorage marker exists, or if SW is not
 *     the controller.
 */

const SESSION_KEY = 'medq:precache-chunks:v2';

// API endpoints to eagerly cache for offline use (Telegram-style).
// After the user logs in, we fetch all these in the background so the
// very first offline visit has data ready. The list is curated to the
// highest-value read-only tabs — anything missing here will still be
// cached on first visit to that tab (via the SW's handleApiSwr).
const API_URLS_TO_PRECACHE: string[] = [
  '/api/dashboard',
  '/api/streaks?range=365',
  '/api/achievements',
  '/api/review-hub',
  '/api/leaderboard',
  '/api/qotd',
  '/api/exam-countdown',
  '/api/weak-areas',
  '/api/insights',
  '/api/knowledge-map',
  '/api/medical-trivia',
  '/api/missions',
  '/api/notifications',
  // Chat
  '/api/chat/rooms',
  '/api/chat/demo-user',
  // Auth (so the user identity survives offline)
  '/api/auth/session',
];

// All known tab-group loaders. Keep this list in sync with the files in
// src/components/medq/tabs/group-*.ts. The dynamic-import expressions below
// MUST be statically analyzable by Turbopack (no template literals) so the
// chunk files are emitted and their URLs are known to the runtime.
const TAB_GROUP_LOADERS: Array<() => Promise<unknown>> = [
  () => import('@/components/medq/tabs copy/group-study'),
  () => import('@/components/medq/tabs/group-ai'),
  () => import('@/components/medq/tabs/group-social'),
  () => import('@/components/medq/tabs/group-admin'),
  () => import('@/components/medq/tabs/group-drugs'),
  () => import('@/components/medq/tabs/group-tools'),
  () => import('@/components/medq/tabs/group-exam'),
  () => import('@/components/medq/tabs/group-community'),
  () => import('@/components/medq/tabs/group-advanced-clinical'),
  () => import('@/components/medq/tabs/group-advanced-media'),
  () => import('@/components/medq/tabs/group-advanced-misc'),
  () => import('@/components/medq/tabs/group-advanced'),
];

// Bootstrap chunks loaded by AppEntry.tsx via next/dynamic. These are on
// the critical render path — if they fail to load offline, the user sees
// a perpetual "Loading MedQ…" spinner. Warming them up ensures the SW
// has them cached for the next offline reload.
const BOOTSTRAP_LOADERS: Array<() => Promise<unknown>> = [
  () => import('@/components/medq/SubscriptionContext'),
  () => import('@/components/medq/SettingsContext'),
  () => import('@/components/medq/MedQAppShell'),
  () => import('@/components/medq/ServiceWorkerRegistrar'),
  () => import('@/components/medq/OfflineIndicator'),
  // Toaster is imported via @/components/ui/sonner — include it too
  () => import('@/components/ui/sonner'),
];

let started = false;

/**
 * Warm up the SW cache with all tab-group AND bootstrap chunk files.
 *
 * Safe to call multiple times — subsequent calls are no-ops once started.
 * Also a no-op if:
 *   - We're in SSR (no window)
 *   - The SW is not supported / not the controller
 *   - The browser is currently offline
 *   - We've already warmed up this session (sessionStorage marker)
 */
export function warmUpTabChunks(): void {
  if (started) return;
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;
  if (!navigator.serviceWorker.controller) return;
  if (!navigator.onLine) return;

  // Skip if we've already warmed up this session. sessionStorage is cleared
  // when the tab closes, so the next session will warm up again — but a
  // single long-lived tab won't keep re-warming.
  try {
    if (sessionStorage.getItem(SESSION_KEY) === 'done') {
      return;
    }
  } catch {
    // sessionStorage may throw in private mode — fall through and warm up
  }

  started = true;

  // Defer to the next idle callback so we don't compete with first paint.
  const run = () => {
    // Fire all the dynamic imports in parallel. Each one goes through the
    // SW's fetch handler (handleAssetSwr), which caches the chunk for
    // offline use. We intentionally DON'T await — we don't need the module
    // result, just the cache side-effect.
    const allLoaders = [...BOOTSTRAP_LOADERS, ...TAB_GROUP_LOADERS];
    Promise.allSettled(allLoaders.map((loader) => loader())).then(
      (results) => {
        const ok = results.filter((r) => r.status === 'fulfilled').length;
        const failed = results.length - ok;
        if (failed > 0) {
          console.warn(
            `[precache-chunks] ${ok}/${results.length} chunks cached, ${failed} failed (will retry next session)`,
          );
        } else {
          console.log(`[precache-chunks] All ${ok} chunks cached for offline use`);
        }
        try {
          sessionStorage.setItem(SESSION_KEY, 'done');
        } catch {
          // ignore — private mode
        }
      },
    );

    // ── Telegram-style: eagerly cache API data for offline use ──
    // Ask the SW to fetch + cache the high-value API endpoints so the
    // very first offline visit has data ready. Without this, the user
    // would need to visit each tab once while online before it works
    // offline.
    try {
      navigator.serviceWorker.controller?.postMessage({
        type: 'medq:precache-apis',
        urls: API_URLS_TO_PRECACHE,
      });
    } catch (e) {
      // ignore — SW might be unavailable
    }
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 2000);
  }
}
