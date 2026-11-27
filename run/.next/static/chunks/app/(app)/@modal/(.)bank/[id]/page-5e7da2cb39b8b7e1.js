(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[8181],{

/***/ 25798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestionDetailModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var _barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(51128);
/* harmony import */ var _barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(92571);
/* harmony import */ var _components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28258);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * QuestionDetailModal — the intercepted-route question detail overlay.
 *
 * Rendered into the (app)/@modal parallel slot when the user soft-navigates
 * from the bank list to /bank/[id] (see (app)/@modal/(.)bank/[id]/page.tsx).
 * The bank list page stays mounted UNDERNEATH this modal — its filters,
 * scroll position and pagination survive because it never unmounted.
 *
 * Closing (backdrop click, × button, Escape key) calls router.back(), which
 * soft-navigates from /bank/[id] back to /bank: the @modal slot re-renders
 * to its null default and the modal disappears. No full reload, no lost
 * list state — this is the Intercepting Routes + Parallel Routes pattern
 * the App Router is designed around.
 */ 



function QuestionDetailModal({ id }) {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [question, setQuestion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [notFound, setNotFound] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [copied, setCopied] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Fetch the question from the public questions API.
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
    /*
   * Close = router.back(). The intercepted route is popped off the history
   * stack; @modal falls back to its null default. If the modal was somehow
   * opened on a hard load (no history), fall back to /bank.
   */ const close = ()=>{
        if ( true && window.history.length > 1) {
            router.back();
        } else {
            router.push('/bank');
        }
    };
    // Escape key closes the modal.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const onKey = (e)=>{
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return ()=>window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Lock body scroll while the modal is open.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = prev;
        };
    }, []);
    const copyLink = async ()=>{
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(()=>setCopied(false), 1600);
        } catch  {}
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-[60] flex items-start justify-center p-3 sm:p-6",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Question detail",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0 bg-black/65 backdrop-blur-sm animate-fade-in",
                onClick: close,
                "aria-hidden": "true"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative w-full max-w-3xl mt-[4vh] mb-6 max-h-[88vh] flex flex-col rounded-2xl border border-white/[0.08] bg-[#151821] shadow-2xl animate-fade-in overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/[0.06] flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-sm font-bold text-[#e8ecf4] truncate",
                                        children: "Question Detail"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-[10px] text-[#8b95a8] truncate",
                                        children: [
                                            question?.topic ? `${question.topic} · ` : '',
                                            question?.system || 'Bank',
                                            " \xb7 ID ",
                                            String(id).slice(0, 10)
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: copyLink,
                                        title: "Copy direct link to this question",
                                        "aria-label": "Copy link to this question",
                                        className: "w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.06] border border-white/[0.06] transition-all",
                                        children: copied ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#00e5a0]"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#8b95a8]"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: close,
                                        "aria-label": "Close question detail",
                                        className: "w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.06] border border-white/[0.06] transition-all",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#8b95a8]"
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "overflow-y-auto px-5 py-5",
                        children: [
                            loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center justify-center py-20",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Link2_Loader2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                    className: "w-6 h-6 animate-spin text-[#00e5a0]"
                                })
                            }),
                            !loading && notFound && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-center py-14",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-sm font-semibold text-[#ff8a8a]",
                                        children: "Question not found"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#8b95a8] mt-1.5",
                                        children: "It may have been deleted, or the link is out of date."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: close,
                                        className: "mt-5 px-5 py-2.5 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] text-xs font-bold hover:bg-[#00e5a0]/20 transition-all",
                                        children: "Back to Bank"
                                    })
                                ]
                            }),
                            !loading && question && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                question: question,
                                forceRevealed: true
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 66348:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 25798));


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
/******/ __webpack_require__.O(0, [18409,68298,27173,2595,31573,53686,57932,81147,54381,13706,28258,28441,93794,77358], () => (__webpack_exec__(66348)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);