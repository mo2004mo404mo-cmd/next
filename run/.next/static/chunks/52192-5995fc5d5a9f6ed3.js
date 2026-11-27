"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[52192],{

/***/ 52192:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ServiceWorkerRegistrar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _lib_offline_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69776);
/* __next_internal_client_entry_do_not_use__ default auto */ 

// import { warmUpTabChunks } from '@/lib/precache-tabs';
/**
 * Registers the MedQ service worker and wires up:
 *   - Auto-reload when a new SW version takes over (skipWaiting flow)
 *   - Initial outbox replay for browsers without Background Sync
 *   - The offline-queue client (listens for SW messages + online events)
 *   - Immediate update check on mount (so v8 replaces v7 without waiting
 *     for the default 24h SW update check)
 *   - Background warm-up of tab-group chunks so tabs work offline
 *
 * The SW is now registered in ALL environments including localhost and
 * preview URLs, so offline mode works everywhere. To bypass SW caching
 * for a dev session, append `?nosw=1` to the URL — this unregisters
 * any existing SW for that origin.
 *
 * OFFLINE RELOAD SAFETY (v14):
 *   The previous implementation called window.location.reload() unconditionally
 *   whenever a new SW took control (skipWaiting → controllerchange). When the
 *   user was offline, this caused:
 *     1. Reload tries to fetch chunks → some not cached → ChunkErrorBoundary
 *     2. ChunkErrorBoundary adds an `online` listener for auto-retry
 *     3. Network blips fire `online` → reload → back to step 1 → storm
 *   Plus, with multiple tabs open, ALL tabs would reload simultaneously
 *   on controllerchange, compounding the problem.
 *
 *   The fix introduces three layers of protection:
 *     A. If offline, defer the reload until `online` fires AND the network
 *        has been stable for ~1.5s (no `offline` event during that window).
 *     B. Use localStorage as a cross-tab coordinator: only ONE tab performs
 *        the post-SW-update reload within a 15s window. Other tabs skip the
 *        reload (their next navigation will pick up the new SW assets).
 *     C. Skip `registration.update()` entirely when offline — the network
 *        check would fail anyway, and calling it could trigger updatefound
 *        for a previously-downloaded-but-not-yet-installed SW.
 */ // localStorage key for cross-tab SW reload coordination.
// Value: timestamp (ms) of the last SW-triggered reload across ALL tabs.
const SW_RELOAD_COORD_KEY = 'medq:sw-reload-at';
const SW_RELOAD_COORD_WINDOW_MS = 15000; // 15s — only one tab reloads per SW activation
// ─── SW VERSION HANDSHAKE ────────────────────────────────────────────
// The client expects the SW to broadcast its version on activation.
// If the active SW doesn't match this version, the client force-unregisters
// it and clears all caches, then reloads. This is the only reliable way to
// push a SW update to browsers that have already cached the old sw.js.
//
// When you bump the cache version in sw.js (SHELL_CACHE / RUNTIME_CACHE / API_CACHE),
// ALSO bump this constant — otherwise clients with the old SW will keep
// serving stale chunks forever.
const EXPECTED_SW_VERSION = 'v22';
function isOffline() {
    try {
        return typeof navigator !== 'undefined' && navigator.onLine === false;
    } catch  {
        return false;
    }
}
/**
 * Nuke ALL service workers + ALL caches for this origin, then reload.
 * Used when we detect a stale SW (version mismatch) or when the user
 * visits ?forceupdate=1.
 *
 * This is the nuclear option — it throws away offline-queued mutations
 * too. But it's the only reliable way to recover from a stuck SW.
 */ async function nukeSwAndCaches(reason) {
    // OFFLINE GUARD (v21): never destroy caches while the user is offline —
    // the SW is the only thing serving them content right now. Defer the
    // nuke until the connection returns, then retry once.
    if (isOffline()) {
        console.warn('[MedQ] SW nuke deferred until online (' + reason + ')');
        window.addEventListener('online', ()=>{
            void nukeSwAndCaches(reason);
        }, {
            once: true
        });
        return;
    }
    console.warn('[MedQ] Nuking SW + caches (' + reason + ')');
    try {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(registrations.map((r)=>r.unregister()));
        }
        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((k)=>caches.delete(k)));
        }
        // Also clear localStorage SW coordination flag so the next load
        // doesn't skip the reload dance.
        try {
            localStorage.removeItem('medq:sw-reload-at');
        } catch  {}
    } catch (e) {
        console.warn('[MedQ] nukeSwAndCaches error:', e);
    }
    // Reload to the clean URL (without ?forceupdate=1) so we don't loop.
    const cleanUrl = window.location.pathname + window.location.search.replace(/[?&]forceupdate=1/g, '').replace(/[?&]noswclean=1/g, '').replace(/^[?&]/, '?');
    window.location.replace(cleanUrl || '/');
}
function shouldSkipReloadDueToCoordination() {
    try {
        const last = localStorage.getItem(SW_RELOAD_COORD_KEY);
        if (!last) return false;
        const ts = parseInt(last, 10);
        if (!Number.isFinite(ts)) return false;
        return Date.now() - ts < SW_RELOAD_COORD_WINDOW_MS;
    } catch  {
        return false;
    }
}
function markReloadDone() {
    try {
        localStorage.setItem(SW_RELOAD_COORD_KEY, String(Date.now()));
    } catch  {}
}
function ServiceWorkerRegistrar() {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (false) {}
        // Initialize the offline-queue client (no-op if SW is unsupported).
        // Listens for SW replay-success events, triggers replay on 'online',
        // and keeps the pending count in sync — required now that sw.js (v21)
        // ships the real outbox.
        (0,_lib_offline_queue__WEBPACK_IMPORTED_MODULE_1__/* .initOfflineQueue */ .Rs)();
        if (!('serviceWorker' in navigator)) {
            console.warn('[MedQ] Service Worker not supported in this browser');
            return;
        }
        // ─── Skip SW registration in preview/chat iframes ──────────────────
        // When the app is rendered inside a preview iframe (e.g. the
        // `preview-chat-<id>.space-z.ai` wrapper used by the IM gateway), SW
        // registration either fails outright with AbortError or stalls because
        // the iframe's lifecycle is controlled by the parent. The 3s version-ping
        // timeout then fires, "nukes" the SW + caches, and the nuke function
        // calls window.location.replace() — which reloads the iframe. The whole
        // cycle repeats forever, spamming the server with auth/profile/
        // subscription/notifications requests on every loop.
        //
        // SW doesn't buy us anything in a preview iframe anyway (no offline use
        // case there), so detect the preview environment and bail out. We check
        // THREE things:
        //   1. Cross-origin iframe (window.top.location throws)
        //   2. Same-origin iframe (window.self !== window.top but origins match)
        //   3. Hostname matches a known preview pattern (preview-chat-*, *.space-z.ai)
        try {
            if (window.self !== window.top) {
                try {
                    const topOrigin = window.top.location.origin;
                    if (topOrigin !== window.location.origin) {
                        console.log('[MedQ] Skipping SW registration (cross-origin iframe)');
                        return;
                    }
                } catch  {
                    console.log('[MedQ] Skipping SW registration (cross-origin iframe)');
                    return;
                }
                console.log('[MedQ] Skipping SW registration (same-origin iframe)');
                return;
            }
        } catch  {
            console.log('[MedQ] Skipping SW registration (iframe detection failed)');
            return;
        }
        // Hostname check REMOVED (v21): preview-chat-*.space-z.ai pages now
        // register the SW at the top level — that is the whole point of offline
        // study. The old skip was papering over an iframe reload storm whose
        // root cause is fixed (the 3s version-ping nuke only arms when a stale
        // SW controller actually exists, and nukes never run while offline).
        // Iframes above still skip REGISTERING; they are covered by the SW that
        // the top-level visit registers (control is per-origin+scope, so
        // embedded preview iframes are served by it too).
        // Escape hatch: ?nosw=1 unregisters all SWs for this origin.
        // Useful for dev sessions where you want fresh code without SW caching.
        const params = new URLSearchParams(window.location.search);
        if (params.get('nosw') === '1') {
            navigator.serviceWorker.getRegistrations().then((registrations)=>{
                registrations.forEach((registration)=>{
                    registration.unregister();
                    console.log('[MedQ] Unregistered SW (nosw=1):', registration.scope);
                });
            });
            return;
        }
        // ─── ?forceupdate=1 — nuclear cleanup ────────────────────────────
        // Visiting /?forceupdate=1 unregisters ALL SWs + clears ALL caches +
        // reloads to the clean URL. This is the recovery path for users whose
        // browsers are stuck on an old SW that keeps serving stale chunks.
        if (params.get('forceupdate') === '1') {
            nukeSwAndCaches('user-initiated ?forceupdate=1');
            return;
        }
        // ─── Version handshake ───────────────────────────────────────────
        // After registration, we wait up to 3s for the active SW to post its
        // version. If it doesn't, or the version doesn't match EXPECTED_SW_VERSION,
        // we nuke + reload. This auto-recovers users on the old SW without
        // requiring them to manually visit ?forceupdate=1.
        //
        // We also send a `medq:ping-version` message to the active SW — old SWs
        // (v14 and earlier) won't respond to this message, which is itself a
        // signal that they need to be replaced.
        let versionCheckTimedOut = false;
        let receivedVersion = null;
        const versionMessageListener = (event)=>{
            if (!event.data) return;
            if (event.data.type === 'medq:sw-version') {
                receivedVersion = event.data.version;
                console.log('[MedQ] Active SW reports version:', receivedVersion);
                if (receivedVersion !== EXPECTED_SW_VERSION) {
                    console.warn('[MedQ] SW version mismatch — expected ' + EXPECTED_SW_VERSION + ', got ' + receivedVersion + ' — nuking');
                    nukeSwAndCaches('version mismatch: ' + receivedVersion + ' != ' + EXPECTED_SW_VERSION);
                }
            }
        };
        navigator.serviceWorker.addEventListener('message', versionMessageListener);
        // Ask the active SW for its version. Old SWs (pre-v15) won't respond.
        // 2026-10-22 hardening: arm the 3s nuke timeout ONLY when a controller
        // already exists (the stale-SW replacement path this handshake exists
        // for). On a cold first visit there is no controller until the freshly
        // registered SW installs, activates and claims — arming the timeout
        // there caused a reload race right as the page became interactive
        // (e.g. a user toggling System Push in the first seconds of their very
        // first visit lost the page mid-action). A fresh install that never
        // activates simply yields no SW — no nuke needed, and no reload loop.
        let versionCheckTimeout = null;
        if (navigator.serviceWorker.controller) {
            try {
                navigator.serviceWorker.controller.postMessage({
                    type: 'medq:ping-version'
                });
            } catch  {}
            // 3s timeout — if the CONTROLLING SW hasn't posted its version by
            // then, it's definitely an old SW (or a broken one). Nuke it.
            versionCheckTimeout = window.setTimeout(()=>{
                versionCheckTimedOut = true;
                if (receivedVersion === null) {
                    console.warn('[MedQ] SW did not respond to version ping within 3s — assuming stale, nuking');
                    nukeSwAndCaches('no version response within 3s');
                }
            }, 3000);
        }
        let reloading = false;
        let deferredOnlineHandler = null;
        let deferredOfflineHandler = null;
        let stabilityTimer = null;
        const clearDeferredReload = ()=>{
            if (deferredOnlineHandler) {
                window.removeEventListener('online', deferredOnlineHandler);
                deferredOnlineHandler = null;
            }
            if (deferredOfflineHandler) {
                window.removeEventListener('offline', deferredOfflineHandler);
                deferredOfflineHandler = null;
            }
            if (stabilityTimer) {
                clearTimeout(stabilityTimer);
                stabilityTimer = null;
            }
        };
        const performReload = (reason)=>{
            if (reloading) return;
            // Cross-tab coordination: if another tab already reloaded for this
            // SW activation within the last 15s, skip our reload. The user will
            // pick up the new SW assets on their next navigation.
            if (shouldSkipReloadDueToCoordination()) {
                console.log('[MedQ] SW activated but another tab already reloaded recently — skipping');
                return;
            }
            reloading = true;
            markReloadDone();
            console.log('[MedQ] New service worker activated — reloading page (' + reason + ')');
            window.location.reload();
        };
        const handleControllerChange = ()=>{
            if (reloading) return;
            clearDeferredReload();
            // OFFLINE SAFETY: If we're offline, do NOT reload immediately.
            // Reloading offline would try to fetch chunks that may not be cached,
            // triggering ChunkErrorBoundary → online-listener → reload storm.
            // Instead, defer the reload until the network has been stable for 1.5s.
            if (isOffline()) {
                console.log('[MedQ] New SW activated but offline — deferring reload until network is stable');
                deferredOnlineHandler = ()=>{
                    // Network reported online — start a stability timer. If `offline`
                    // fires during the window, cancel and wait for the next `online`.
                    if (stabilityTimer) clearTimeout(stabilityTimer);
                    stabilityTimer = setTimeout(()=>{
                        stabilityTimer = null;
                        // Double-check we're still online (network may have flapped back)
                        if (!isOffline()) {
                            performReload('after offline defer');
                        } else {
                            console.log('[MedQ] SW deferred reload: still offline, waiting again');
                        }
                    }, 1500);
                };
                deferredOfflineHandler = ()=>{
                    // Network flapped — cancel the pending stability timer
                    if (stabilityTimer) {
                        clearTimeout(stabilityTimer);
                        stabilityTimer = null;
                    }
                };
                window.addEventListener('online', deferredOnlineHandler);
                window.addEventListener('offline', deferredOfflineHandler);
                return;
            }
            performReload('online');
        };
        const handleUpdateFound = (registration)=>{
            const newWorker = registration.installing;
            if (!newWorker) return;
            newWorker.addEventListener('statechange', ()=>{
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // A new version is waiting to activate — tell it to skip waiting
                    console.log('[MedQ] New service worker installed — activating');
                    newWorker.postMessage({
                        type: 'medq:skip-waiting'
                    });
                }
            });
        };
        // First: clean up old-scope SWs from previous sessions (defensive)
        navigator.serviceWorker.getRegistrations().then((registrations)=>{
            registrations.forEach((registration)=>{
                if (registration.scope !== window.location.origin + '/') {
                    registration.unregister();
                }
            });
        });
        // Register the SW (small delay to avoid contention with first-paint fetches)
        const timeoutId = window.setTimeout(()=>{
            navigator.serviceWorker.register('/sw.js', {
                updateViaCache: 'none'
            }).then(async (registration)=>{
                console.log('[MedQ] Service Worker registered:', registration.scope);
                registration.addEventListener('updatefound', ()=>handleUpdateFound(registration));
                // Force an immediate update check — by default the browser only
                // checks for SW updates every 24h, which means a newly deployed
                // v8 SW won't replace a v7 SW until tomorrow. This call forces
                // the check to happen now.
                //
                // SKIP WHEN OFFLINE: registration.update() triggers a network
                // fetch for /sw.js. When offline, this fetch fails (update()
                // rejects) AND, worse, if a new SW was previously downloaded
                // but not yet installed, the update() call can cause
                // `updatefound` to fire — which leads to skipWaiting →
                // controllerchange → reload storm. Skipping update() when
                // offline avoids this entire cascade.
                if (!isOffline()) {
                    try {
                        await registration.update();
                        console.log('[MedQ] SW update check completed');
                    } catch (e) {
                    // update() can fail if the network is unavailable — ignore
                    }
                } else {
                    console.log('[MedQ] Skipping SW update check (offline)');
                }
                // If a new SW is waiting to activate, force it to skip waiting.
                // NOTE: This is safe even when offline — skipWaiting just causes
                // the waiting SW to activate. The handleControllerChange handler
                // above is offline-aware and will defer the reload if needed.
                if (registration.waiting) {
                    console.log('[MedQ] Waiting SW found — activating now');
                    registration.waiting.postMessage({
                        type: 'medq:skip-waiting'
                    });
                }
                // Trigger an initial replay attempt in case the queue has stale items
                // and Background Sync isn't supported
                if (registration.active) {
                    registration.active.postMessage({
                        type: 'medq:replay-now'
                    });
                }
            // Warm up the SW cache with all tab-group chunk files so that
            // tab navigation works offline. This is a no-op if the SW is not
            // yet the controller, if we're offline, or if we've already
            // warmed up this session (sessionStorage marker).
            // warmUpTabChunks();
            }).catch((error)=>{
                console.warn('[MedQ] Service Worker registration failed:', error);
            });
        }, 800);
        navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
        // Also warm up if the SW was already the controller before this mount
        // (e.g. on a soft navigation, not a full page load). The warmer itself
        // is idempotent via a sessionStorage marker, so calling it twice is safe.
        if (navigator.serviceWorker.controller) {
        // warmUpTabChunks();
        }
        // On `online` event (extra safety net — the offline-queue client already
        // handles this, but having a redundant trigger at the registrar level is
        // cheap insurance against early-unmount scenarios)
        const handleOnline = ()=>{
        // triggerReplay();
        // If we came back online after being offline during initial load,
        // the tab-chunk warm-up was skipped — try again now.
        // warmUpTabChunks();
        };
        window.addEventListener('online', handleOnline);
        return ()=>{
            window.clearTimeout(timeoutId);
            if (versionCheckTimeout) window.clearTimeout(versionCheckTimeout);
            navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
            navigator.serviceWorker.removeEventListener('message', versionMessageListener);
            window.removeEventListener('online', handleOnline);
            clearDeferredReload();
        };
    }, []);
    return null;
}


/***/ })

}]);