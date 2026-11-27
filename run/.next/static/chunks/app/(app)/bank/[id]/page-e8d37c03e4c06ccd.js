(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[78016],{

/***/ 16004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestionDetailFull)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92571);
/* harmony import */ var _components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28258);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * QuestionDetailFull — the direct-URL question detail page body.
 *
 * Rendered by (app)/bank/[id]/page.tsx when /bank/<id> is loaded directly
 * (fresh tab, shared link, search-engine click) — the non-intercepted,
 * full-page version of the question detail. It renders the same
 * QuestionCard as the bank list's expanded view plus a back affordance.
 */ 



function QuestionDetailFull({ id }) {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [question, setQuestion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [notFound, setNotFound] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let alive = true;
        setLoading(true);
        setNotFound(false);
        (async ()=>{
            try {
                const res = await fetch(`/api/questions/${encodeURIComponent(id)}`);
                if (!alive) return;
                if (!res.ok) {
                    setNotFound(true);
                    setQuestion(null);
                    return;
                }
                const q = await res.json();
                if (alive) setQuestion(q);
            } catch  {
                if (alive) setNotFound(true);
            } finally{
                if (alive) setLoading(false);
            }
        })();
        return ()=>{
            alive = false;
        };
    }, [
        id
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "animate-fade-in max-w-3xl mx-auto",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                type: "button",
                onClick: ()=>router.push('/bank'),
                className: "inline-flex items-center gap-2 px-3.5 py-2.5 mb-5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#c8d0e0] text-xs font-semibold hover:bg-white/[0.06] hover:border-white/[0.12] transition-all",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        className: "w-4 h-4"
                    }),
                    "Back to Question Bank"
                ]
            }),
            loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center justify-center py-24",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                    className: "w-6 h-6 animate-spin text-[#00e5a0]"
                })
            }),
            !loading && notFound && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-10 text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm font-semibold text-[#ff8a8a]",
                        children: "Question not found"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs text-[#8b95a8] mt-1.5",
                        children: "It may have been deleted, or the link is out of date."
                    })
                ]
            }),
            !loading && question && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                question: question,
                forceRevealed: true
            })
        ]
    });
}


/***/ }),

/***/ 61592:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 16004));


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
/******/ __webpack_require__.O(0, [18409,68298,27173,2595,31573,53686,57932,81147,97248,13706,28258,28441,93794,77358], () => (__webpack_exec__(61592)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);