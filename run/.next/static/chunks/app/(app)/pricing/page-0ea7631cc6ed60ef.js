(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[37114],{

/***/ 465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ PricingInline)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ default auto */ 

/**
 * PricingInline — the MedQ plan chooser.
 *
 * Extracted from MedQAppShell (2026-11-04) so the REAL /pricing route —
 * src/app/(app)/pricing/page.tsx, rendered inside the shared AppShellLayout —
 * and the SPA shell both render the same component instead of maintaining
 * two copies.
 *
 * Props are kept identical to the in-shell usage:
 *   onUpgrade — POSTs the chosen tier to /api/subscription (provided by the
 *               hosting page, which owns the subscription refresh)
 *   tier       — the user's current plan id (free | premium | pro)
 */ function PricingInline({ onUpgrade, tier }) {
    const [upgrading, setUpgrading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: '$0',
            period: '/forever',
            color: '#5a6478',
            features: [
                '5 AI generations/day',
                '10 tutor messages/day',
                '823+ question bank',
                'Banner ads',
                'Earn credits from ads'
            ]
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '$9.99',
            period: '/mo',
            color: '#8b5cf6',
            popular: true,
            features: [
                '100 AI generations/day',
                '100 tutor messages/day',
                'No banner ads',
                'Priority support',
                'Advanced analytics'
            ]
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '$19.99',
            period: '/mo',
            color: '#f59e0b',
            features: [
                'Unlimited everything',
                'Zero ads',
                'Revenue dashboard',
                'Dedicated support',
                'API access'
            ]
        }
    ];
    const handleUpgrade = async (id)=>{
        setUpgrading(id);
        await onUpgrade(id);
        setUpgrading(null);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-lg font-bold text-center mb-2",
                children: "Choose Your Plan"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs text-[#8b95a8] text-center mb-6",
                children: "Start free. Upgrade when you need more. Earn credits by watching ads."
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: plans.map((plan)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `relative p-5 rounded-xl border ${plan.popular ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.03]' : 'border-white/[0.06] bg-[#1a1e2b]'}`,
                        children: [
                            plan.popular && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold px-3 py-0.5 rounded-full bg-[#b79bff] text-[#0c0e14]",
                                children: "POPULAR"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-center mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-sm font-bold",
                                        children: plan.name
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xl font-bold",
                                        children: plan.price
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs text-[#5a6478]",
                                        children: plan.period
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
                                className: "space-y-1.5 mb-4",
                                children: plan.features.map((f, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        className: "flex items-center gap-1.5 text-xs text-[#8b95a8]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    color: plan.color
                                                },
                                                children: "✓"
                                            }),
                                            f
                                        ]
                                    }, i))
                            }),
                            tier === plan.id ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-full py-2 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/20 text-[#00e5a0] text-xs font-bold text-center",
                                children: "Current Plan"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>handleUpgrade(plan.id),
                                disabled: upgrading === plan.id,
                                className: "w-full py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50",
                                style: {
                                    background: plan.color,
                                    color: plan.id === 'free' ? '#e8ecf4' : '#000'
                                },
                                children: upgrading === plan.id ? 'Upgrading...' : plan.id === 'free' ? 'Downgrade' : 'Upgrade Now'
                            })
                        ]
                    }, plan.id))
            })
        ]
    });
}


/***/ }),

/***/ 10244:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ useSubscription),
/* harmony export */   d: () => (/* binding */ SubscriptionProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useSubscription,SubscriptionProvider auto */ 


const SubscriptionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    tier: 'free',
    adsEnabled: true,
    credits: {
        balance: 0,
        totalEarned: 0,
        totalSpent: 0
    },
    usage: {},
    loading: true,
    canAccess: ()=>true,
    trackUsage: async ()=>{},
    refresh: async ()=>{},
    setShowUpgradeModal: ()=>{},
    showUpgradeModal: false
});
const useSubscription = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SubscriptionContext);
function SubscriptionLoadingSkeleton() {
    return /*#__PURE__*/ _jsx("div", {
        className: "min-h-screen flex flex-col items-center justify-center",
        style: {
            background: '#0c0e14'
        },
        children: /*#__PURE__*/ _jsxs("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5a0] to-[#00b87a] flex items-center justify-center shadow-lg shadow-[#00e5a0]/25",
                    children: /*#__PURE__*/ _jsx(Loader2, {
                        className: "w-7 h-7 text-[#0c0e14] animate-spin"
                    })
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ _jsxs("p", {
                            className: "text-sm font-semibold text-[#e8ecf4]",
                            style: {
                                fontFamily: "'Space Grotesk', sans-serif"
                            },
                            children: [
                                "Loading Med",
                                /*#__PURE__*/ _jsx("span", {
                                    className: "text-[#00e5a0]",
                                    children: "Q"
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            className: "text-[10px] text-[#5a6478] mt-1",
                            children: "Preparing your study environment..."
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "flex items-center gap-1 mt-2",
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '0ms'
                            }
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '150ms'
                            }
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '300ms'
                            }
                        })
                    ]
                })
            ]
        })
    });
}
function SubscriptionProvider({ children }) {
    const [tier, setTier] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('free');
    const [credits, setCredits] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        balance: 0,
        totalEarned: 0,
        totalSpent: 0
    });
    const [usage, setUsage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [showUpgradeModal, setShowUpgradeModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const hasFetchedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const refresh = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        // Fast path: if we're offline, don't even try to fetch — just clear
        // loading state immediately so the app shell renders with the default
        // 'free' tier values. The SW would return a 503 anyway, but skipping
        // the round-trip avoids a flash of the loading skeleton when the user
        // reloads the page offline.
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch('/api/subscription');
            if (res.ok) {
                const data = await res.json();
                setTier(data.tier || 'free');
                setCredits(data.credits || {
                    balance: 0,
                    totalEarned: 0,
                    totalSpent: 0
                });
                setUsage(data.usage || {});
            }
        } catch (e) {
            console.error('Subscription refresh error:', e);
        } finally{
            setLoading(false);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!hasFetchedRef.current) {
            hasFetchedRef.current = true;
            refresh();
        }
    }, [
        refresh
    ]);
    // When the network comes back online, re-fetch the subscription data
    // (it was skipped during the offline fast-path above). This ensures
    // the correct tier/credits/usage are restored as soon as connectivity
    // returns, instead of waiting for the next manual refresh.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleOnline = ()=>{
            // hasFetchedRef.current is already true, so we call refresh() directly
            refresh();
        };
        window.addEventListener('online', handleOnline);
        return ()=>window.removeEventListener('online', handleOnline);
    }, [
        refresh
    ]);
    const canAccess = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((category)=>{
        const entry = usage[category];
        if (!entry) return true;
        return entry.used < entry.limit;
    }, [
        usage
    ]);
    const trackUsage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (category)=>{
        // OFFLINE GUARD: skip usage tracking entirely when offline.
        // Usage tracking is best-effort analytics — when the network is down,
        // we should NOT attempt the fetch, because:
        //   1. It throws a "Failed to fetch" TypeError that pollutes the
        //      browser console (the error is caught, but `console.error`
        //      still surfaces it, which is what the user sees).
        //   2. /api/subscription/usage is intentionally NOT in the SW's
        //      QUEUEABLE_PATTERNS list (usage tracking isn't a critical
        //      write that needs to be replayed — it's just analytics).
        //   3. The synthetic 202 path would add complexity for no benefit.
        // Telegram-style: app should appear completely normal offline.
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            return;
        }
        try {
            const res = await fetch('/api/subscription/usage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category
                })
            });
            if (res.ok) {
                const data = await res.json();
                setUsage((prev)=>({
                        ...prev,
                        [category]: data
                    }));
            }
        } catch (e) {
            // SILENT FAIL: do not log network errors to console.error —
            // they're expected when the network is flaky, and surfacing
            // them creates the impression that the app is broken.
            // Only log non-network errors (which are programming bugs).
            const isNetworkError = e instanceof TypeError && (e.message === 'Failed to fetch' || e.message.includes('fetch'));
            if (!isNetworkError) {
                console.error('Track usage error:', e);
            }
        }
    }, []);
    const adsEnabled = tier === 'free';
    // if (loading) {
    //   return <SubscriptionLoadingSkeleton />;
    // }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SubscriptionContext.Provider, {
        value: {
            tier,
            adsEnabled,
            credits,
            usage,
            loading,
            canAccess,
            trackUsage,
            refresh,
            setShowUpgradeModal,
            showUpgradeModal
        },
        children: children
    });
}


/***/ }),

/***/ 29770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PricingPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_medq_PricingInline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(465);
/* harmony import */ var _components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10244);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * /pricing — a REAL (app) route-group page (2026-11-04).
 *
 * Previously this URL was a 1,677-line fork of the whole SPA shell with its
 * own state-based tab switching and monkeypatched history. Now it renders
 * inside the shared AppShellLayout (persistent sidebar + header) — real
 * routing, consistent chrome, one shell to maintain.
 *
 * The plan chooser is the extracted PricingInline component (also used by
 * the SPA shell's inline pricing tab).
 */ 


function PricingPage() {
    const { tier, refresh } = (0,_components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_3__/* .useSubscription */ .R)();
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const handleUpgrade = async (t)=>{
        try {
            setError(null);
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tier: t
                })
            });
            if (!res.ok) throw new Error(`Update failed (${res.status})`);
            await refresh();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Could not update your plan. Please try again.');
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "w-full max-w-4xl mx-auto py-2",
        children: [
            error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                role: "alert",
                className: "mb-4 px-4 py-3 rounded-xl border border-[#ff5757]/30 bg-[#ff5757]/10 text-sm text-[#ff5757]",
                children: error
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_PricingInline__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                onUpgrade: handleUpgrade,
                tier: tier
            })
        ]
    });
}


/***/ }),

/***/ 50869:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 29770));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [28441,93794,77358], () => (__webpack_exec__(50869)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);