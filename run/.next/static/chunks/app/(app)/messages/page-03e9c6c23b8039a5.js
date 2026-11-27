(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[92164],{

/***/ 26846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I3: () => (/* binding */ hasRealPage),
/* harmony export */   s2: () => (/* binding */ navigateToTab),
/* harmony export */   tW: () => (/* binding */ tabHref),
/* harmony export */   ud: () => (/* binding */ REAL_PAGE_TABS)
/* harmony export */ });
/* __next_internal_client_entry_do_not_use__ REAL_PAGE_TABS,tabHref,navigateToTab,hasRealPage auto */ /**
 * Tabs extracted to real App Router pages. Those inside the (app) route
 * group render within the shared AppShellLayout, so navigating between any
 * of them keeps the sidebar/header mounted (App Router layouts persist
 * across route changes within the same layout). '/freellm' is a real route
 * that owns its full-screen dashboard layout.
 *
 * NOTE 'take-exam' is deliberately NOT here: /exam/take is only a deep-link
 * forwarding shim to /?tab=take-exam — linking there directly would add a
 * pointless redirect hop. The sidebar targets the real /?tab= URL.
 */ const REAL_PAGE_TABS = {
    'dashboard': '/home',
    'bank': '/bank',
    'generate': '/generate',
    'flashcards': '/flashcards',
    'advanced-chat': '/messages',
    'admin': '/admin',
    'ai-classroom': '/ai-classroom',
    'exam-sim': '/exam-sim',
    'pricing': '/pricing',
    'freellm': '/freellm',
    'osce': '/osce'
};
/**
 * The REAL href a navigation surface (sidebar link, bottom-nav link,
 * programmatic router.push) uses for a tab.
 *
 *   'bank'  → '/bank'   (real (app) route)
 *   'tutor' → '/?tab=tutor' (real URL — the SPA shell renders that tab)
 *
 * Every href this returns is a genuine, refresh-safe App-Router URL.
 */ function tabHref(tabId) {
    const id = String(tabId);
    if (REAL_PAGE_TABS[id]) return REAL_PAGE_TABS[id];
    return `/?tab=${encodeURIComponent(id)}`;
}
/**
 * Navigate to a MedQ tab from anywhere (command palette, AI agent events,
 * header actions). Real-page tabs stay inside the (app) layout; SPA tabs
 * hop to their real "/?tab=" URL.
 */ function navigateToTab(push, tabId) {
    push(tabHref(tabId));
}
/** True when the tab has a real standalone page (used for <Link> decisions). */ function hasRealPage(tabId) {
    return Boolean(REAL_PAGE_TABS[String(tabId)]);
}


/***/ }),

/***/ 31945:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 35000));


/***/ }),

/***/ 52304:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ OfflineTabFallback)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65878);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11012);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * OfflineTabFallback — graceful "you're offline" UI for tab components.
 *
 * Background — why this exists:
 * ──────────────────────────────
 * Several MedQ tabs (AdvancedChatTab, GroupsTab, FriendsTab, FeedTab, …) gate
 * their initial data fetch on `userId` being non-null. When the user is
 * offline AND `/api/auth/session` can't be fetched AND no cached demo user
 * exists, `userId` stays `undefined` → the fetch never fires → the tab's
 * `loading` state never transitions to `false` → the user sees an indefinite
 * spinner ("Loading chat…", "Loading groups…", etc.).
 *
 * This component provides a single, reusable fallback that:
 *   1. Waits a short grace period (default 1.5s) before showing the offline
 *      message — this avoids flicker on slow networks where userId resolves
 *      a beat after first paint.
 *   2. After the grace period, if we're still mounted AND `navigator.onLine`
 *      is false, shows a friendly "You're offline" panel with a Retry button.
 *   3. If we're online but userId still hasn't resolved, shows a different
 *      "Something went wrong" message — also with Retry — so the user isn't
 *      stuck staring at a spinner forever.
 *
 * Usage:
 *   if (!userId) return <OfflineTabFallback label="chat" onRetry={() => location.reload()} />;
 *
 * The component is intentionally tiny (no external deps beyond lucide-react)
 * so it can be safely imported into already-large tab bundles.
 */ 

function OfflineTabFallback({ label, onRetry, graceMs = 1500 }) {
    const [showFallback, setShowFallback] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isOffline, setIsOffline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(typeof navigator !== 'undefined' ? !navigator.onLine : false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // After the grace period, flip `showFallback` to true. If userId resolves
        // before the timer fires, the parent will unmount us and the timer is
        // cleared by the cleanup function — no flicker.
        const t = setTimeout(()=>setShowFallback(true), graceMs);
        return ()=>clearTimeout(t);
    }, [
        graceMs
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const on = ()=>setIsOffline(false);
        const off = ()=>setIsOffline(true);
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return ()=>{
            window.removeEventListener('online', on);
            window.removeEventListener('offline', off);
        };
    }, []);
    if (!showFallback) {
        // Still within the grace period — show a minimal spinner so the user
        // sees something is happening.
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col items-center justify-center h-full gap-3",
            style: {
                background: '#0c0e14'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-6 h-6 rounded-full border-2 border-[#00e5a0] border-t-transparent animate-spin",
                    "aria-label": "Loading"
                }),
                label && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-[#8b95a8] text-sm",
                    children: [
                        "Loading ",
                        label,
                        "…"
                    ]
                })
            ]
        });
    }
    const handleRetry = ()=>{
        if (onRetry) onRetry();
        else if (true) window.location.reload();
    };
    if (isOffline) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col items-center justify-center h-full gap-4 px-6 text-center",
            style: {
                background: '#0c0e14'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-14 h-14 rounded-2xl flex items-center justify-center",
                    style: {
                        background: 'rgba(255, 87, 87, 0.08)'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                        className: "w-7 h-7 text-[#ff5757]"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[#e4e7ec] text-sm font-medium",
                            children: "You're offline"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[#8b95a8] text-xs mt-1 max-w-xs",
                            children: label ? `We couldn't load your ${label} because you're not connected to the internet. Reconnect and try again.` : "We couldn't load this content because you're not connected to the internet. Reconnect and try again."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: handleRetry,
                    className: "mt-1 px-4 py-2 rounded-xl text-xs font-medium text-[#0c0e14] flex items-center gap-2",
                    style: {
                        background: '#00e5a0'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        }),
                        "Retry"
                    ]
                })
            ]
        });
    }
    // Online but userId still hasn't resolved after grace period — likely a
    // server-side issue. Show a generic "something went wrong" message.
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center h-full gap-4 px-6 text-center",
        style: {
            background: '#0c0e14'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-14 h-14 rounded-2xl flex items-center justify-center",
                style: {
                    background: 'rgba(255, 193, 7, 0.08)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "w-7 h-7 text-[#ffc107]"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[#e4e7ec] text-sm font-medium",
                        children: "Something went wrong"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[#8b95a8] text-xs mt-1 max-w-xs",
                        children: label ? `We couldn't load your ${label}. Please try again.` : 'We couldn\'t load this content. Please try again.'
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: handleRetry,
                className: "mt-1 px-4 py-2 rounded-xl text-xs font-medium text-[#0c0e14] flex items-center gap-2",
                style: {
                    background: '#00e5a0'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5"
                    }),
                    "Retry"
                ]
            })
        ]
    });
}


/***/ }),

/***/ 69776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J1: () => (/* binding */ subscribeToReplayForPath),
/* harmony export */   Rs: () => (/* binding */ initOfflineQueue),
/* harmony export */   aU: () => (/* binding */ subscribeToReplaySuccess),
/* harmony export */   fY: () => (/* binding */ subscribeToQueueStatus)
/* harmony export */ });
/* unused harmony exports triggerReplay, getPendingCount, isOnline */
/* __next_internal_client_entry_do_not_use__ initOfflineQueue,subscribeToQueueStatus,subscribeToReplaySuccess,subscribeToReplayForPath,triggerReplay,getPendingCount,isOnline auto */ const statusListeners = new Set();
const replayListeners = new Set();
let currentPending = 0;
let initialized = false;
function handleServiceWorkerMessage(event) {
    const data = event.data || {};
    if (data.type === 'medq:queue-status') {
        currentPending = typeof data.pending === 'number' ? data.pending : 0;
        statusListeners.forEach((fn)=>{
            try {
                fn(currentPending);
            } catch (e) {}
        });
    } else if (data.type === 'medq:queue-replay-success') {
        replayListeners.forEach((fn)=>{
            try {
                fn({
                    url: data.url,
                    method: data.method,
                    status: data.status,
                    body: data.body || ''
                });
            } catch (e) {}
        });
    }
}
function handleOnline() {
    // Browser is back online — ask the SW to:
    //   1. Reset its _lastFetchFailAt flag (so it stops assuming the network
    //      is down and starts trying fetches again)
    //   2. Replay the queued outbox
    // This is the fallback path for browsers without Background Sync.
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration)=>{
            registration.active?.postMessage({
                type: 'medq:client-online'
            });
            registration.active?.postMessage({
                type: 'medq:replay-now'
            });
        }).catch(()=>{});
    }
}
function handleOffline() {
    // Browser reports offline — notify the SW so its _onlineClientCount
    // stays accurate. The SW uses this count to decide whether to try the
    // network or short-circuit to cache/503.
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration)=>{
            registration.active?.postMessage({
                type: 'medq:client-offline'
            });
        }).catch(()=>{});
    }
}
/**
 * Initialize the offline-queue listener. Safe to call multiple times —
 * subsequent calls are no-ops.
 */ function initOfflineQueue() {
    if (initialized) return;
    if (false) {}
    if (!('serviceWorker' in navigator)) return;
    initialized = true;
    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // Request an initial status broadcast from the SW
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'medq:get-queue-status'
        });
        // Also report our current online/offline state so the SW's
        // _onlineClientCount is accurate from the start
        if (typeof navigator !== 'undefined') {
            navigator.serviceWorker.controller.postMessage({
                type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline'
            });
        }
    } else {
        // The SW might not have taken control yet — try again on controllerchange
        navigator.serviceWorker.addEventListener('controllerchange', ()=>{
            navigator.serviceWorker.controller?.postMessage({
                type: 'medq:get-queue-status'
            });
            if (typeof navigator !== 'undefined') {
                navigator.serviceWorker.controller?.postMessage({
                    type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline'
                });
            }
        });
    }
}
/**
 * Subscribe to pending-queue-count changes.
 * Returns an unsubscribe function.
 */ function subscribeToQueueStatus(listener) {
    statusListeners.add(listener);
    // Immediately invoke with the current value
    try {
        listener(currentPending);
    } catch (e) {}
    return ()=>{
        statusListeners.delete(listener);
    };
}
/**
 * Subscribe to "queued write replayed successfully" events.
 * Chat components use this to refetch messages/rooms after a reconnect.
 * Returns an unsubscribe function.
 */ function subscribeToReplaySuccess(listener) {
    replayListeners.add(listener);
    return ()=>{
        replayListeners.delete(listener);
    };
}
/**
 * Subscribe to replay-success events filtered by URL substring.
 *
 * Convenience wrapper around `subscribeToReplaySuccess` for components
 * that only care about a specific API path (e.g. `/api/notes`,
 * `/api/bookmarks`, `/api/quick-notes`, `/api/study-streaks/check-in`).
 *
 * Example:
 *   useEffect(() => subscribeToReplayForPath('/api/notes', () => refetchNotes()), []);
 */ function subscribeToReplayForPath(pathSubstring, listener) {
    const wrapped = (info)=>{
        if (info.url.includes(pathSubstring)) {
            try {
                listener();
            } catch (e) {}
        }
    };
    replayListeners.add(wrapped);
    return ()=>{
        replayListeners.delete(wrapped);
    };
}
/**
 * Manually trigger a queue replay (e.g. from a "Retry now" button).
 */ function triggerReplay() {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then((registration)=>{
        registration.active?.postMessage({
            type: 'medq:replay-now'
        });
    }).catch(()=>{});
}
/**
 * Current pending count (read-only snapshot).
 */ function getPendingCount() {
    return currentPending;
}
/**
 * Returns true if the browser is currently offline.
 */ function isOnline() {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [2595,81147,52524,2760,21568,21159,76277,35000,28441,93794,77358], () => (__webpack_exec__(31945)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);