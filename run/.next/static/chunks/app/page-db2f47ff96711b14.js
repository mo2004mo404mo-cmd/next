(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[58974],{

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

/***/ 1227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppEntry)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10244);
/* harmony import */ var _components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27436);
/* harmony import */ var _components_medq_MedQAppShell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79254);
/* harmony import */ var _components_ui_sonner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25044);
/* harmony import */ var _components_medq_ServiceWorkerRegistrar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(52192);
/* harmony import */ var _components_medq_DeviceSessionTracker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21662);
/* __next_internal_client_entry_do_not_use__ default auto */ 







class ChunkErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error) {
        // Only treat as chunk-load failure if it looks like one. Other errors
        // should propagate to the Next.js error page.
        const msg = (error?.message || String(error)).toLowerCase();
        const isChunkError = msg.includes('loading chunk') || msg.includes('chunkloaderror') || msg.includes('failed to fetch dynamically imported module') || msg.includes('importing a module script failed') || msg.includes('networkerror') || msg.includes('fetch') && typeof navigator !== 'undefined' && !navigator.onLine;
        if (!isChunkError) {
            // Re-throw so Next.js's error boundary handles it
            throw error;
        }
        console.warn('[AppEntry] Chunk load failed (likely offline):', error.message);
        // Auto-retry when the network comes back online
        if (true) {
            // Clean up any previous handlers (in case componentDidCatch fires again)
            if (this.onlineHandler) {
                window.removeEventListener('online', this.onlineHandler);
                this.onlineHandler = null;
            }
            if (this.offlineHandler) {
                window.removeEventListener('offline', this.offlineHandler);
                this.offlineHandler = null;
            }
            this.onlineHandler = this.scheduleRetry;
            this.offlineHandler = this.cancelRetry;
            window.addEventListener('online', this.onlineHandler);
            window.addEventListener('offline', this.offlineHandler);
        }
    }
    componentWillUnmount() {
        this.clearRetryTimer();
        if (this.onlineHandler && "object" !== 'undefined') {
            window.removeEventListener('online', this.onlineHandler);
            this.onlineHandler = null;
        }
        if (this.offlineHandler && "object" !== 'undefined') {
            window.removeEventListener('offline', this.offlineHandler);
            this.offlineHandler = null;
        }
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OfflineChunkFallback, {
                error: this.state.error,
                onRetry: ()=>this.setState({
                        hasError: false,
                        error: null
                    })
            });
        }
        return this.props.children;
    }
    constructor(...args){
        super(...args), this.state = {
            hasError: false,
            error: null
        }, this.onlineHandler = null, this.offlineHandler = null, this.retryTimer = null, this.clearRetryTimer = ()=>{
            if (this.retryTimer) {
                clearTimeout(this.retryTimer);
                this.retryTimer = null;
            }
        }, this.scheduleRetry = ()=>{
            // Cancel any previous pending retry
            this.clearRetryTimer();
            // Wait 1.5s for the network to actually be usable
            this.retryTimer = setTimeout(()=>{
                this.retryTimer = null;
                // Double-check we're STILL online — the network may have flapped
                // back to offline during the 1.5s window
                if (typeof navigator !== 'undefined' && navigator.onLine) {
                    this.setState({
                        hasError: false,
                        error: null
                    });
                }
            }, 1500);
        }, this.cancelRetry = ()=>{
            // Network went back offline — cancel the pending retry
            this.clearRetryTimer();
        };
    }
}
function OfflineChunkFallback({ error, onRetry }) {
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--medq-bg, #0a0e1a)',
            color: 'var(--medq-text, #e8ecf4)',
            fontFamily: 'system-ui',
            flexDirection: 'column',
            gap: 16,
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: 'rgba(255, 179, 71, 0.1)',
                    border: '1px solid rgba(255, 179, 71, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                    width: "36",
                    height: "36",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#ffb347",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                            x1: "1",
                            y1: "1",
                            x2: "23",
                            y2: "23"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: "M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: "M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: "M10.71 5.05A16 16 0 0 1 22.58 9"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: "M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                            d: "M8.53 16.11a6 6 0 0 1 6.95 0"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                            x1: "12",
                            y1: "20",
                            x2: "12.01",
                            y2: "20"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#ffb347'
                },
                children: isOffline ? "You're offline" : 'Connection Lost'
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 14,
                    color: 'var(--medq-text-muted, #8b95a8)',
                    textAlign: 'center',
                    maxWidth: 340,
                    lineHeight: 1.5
                },
                children: isOffline ? "MedQ can't load a required app component right now. Reconnect to the internet and tap the button below to try again." : 'A required app component failed to load. The server may be restarting — tap the button below to retry.'
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                onClick: onRetry,
                style: {
                    marginTop: 8,
                    background: 'var(--medq-accent, #00e5a0)',
                    color: 'var(--medq-bg, #0c0e14)',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer'
                },
                children: "Try Again"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 12,
                    color: 'var(--medq-text-faint, #5a6478)',
                    marginTop: 4,
                    textAlign: 'center'
                },
                children: isOffline ? 'Tip: open the app once while online so all components are cached for offline use.' : 'The page will auto-retry when the connection is restored.'
            })
        ]
    });
}
function AppEntry() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChunkErrorBoundary, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_2__/* .SubscriptionProvider */ .d, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_3__.SettingsProvider, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
                        fallback: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ShellBootFallback, {}),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_MedQAppShell__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {})
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_sonner__WEBPACK_IMPORTED_MODULE_5__/* .Toaster */ .l, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ServiceWorkerRegistrar__WEBPACK_IMPORTED_MODULE_6__["default"], {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_DeviceSessionTracker__WEBPACK_IMPORTED_MODULE_7__["default"], {})
                ]
            })
        })
    });
}
/* Minimal first-paint fallback while the Suspense boundary above resolves
   the shell's URL-derived state (search params). Matches the app theme. */ function ShellBootFallback() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--medq-bg, #0c0e14)',
            color: 'var(--medq-accent, #00e5a0)',
            fontFamily: 'inherit',
            fontSize: 13
        },
        role: "status",
        "aria-live": "polite",
        children: "Loading MedQ…"
    });
}


/***/ }),

/***/ 25370:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./group-admin": [
		86356,
		86356
	],
	"./group-admin.ts": [
		86356,
		86356
	],
	"./group-advanced": [
		70011,
		70011
	],
	"./group-advanced-clinical": [
		89583,
		89583
	],
	"./group-advanced-clinical.ts": [
		89583,
		89583
	],
	"./group-advanced-media": [
		52962,
		52962
	],
	"./group-advanced-media.ts": [
		52962,
		52962
	],
	"./group-advanced-misc": [
		7634,
		7634
	],
	"./group-advanced-misc.ts": [
		7634,
		7634
	],
	"./group-advanced.ts": [
		70011,
		70011
	],
	"./group-ai": [
		63543,
		63543
	],
	"./group-ai.ts": [
		63543,
		63543
	],
	"./group-community": [
		33918,
		33918
	],
	"./group-community.ts": [
		33918,
		33918
	],
	"./group-drugs": [
		8916,
		8916
	],
	"./group-drugs.ts": [
		8916,
		8916
	],
	"./group-exam": [
		79370,
		79370
	],
	"./group-exam.ts": [
		79370,
		79370
	],
	"./group-social": [
		91834,
		91834
	],
	"./group-social.ts": [
		91834,
		91834
	],
	"./group-study": [
		92406,
		92406
	],
	"./group-study.ts": [
		92406,
		92406
	],
	"./group-tools": [
		100,
		100
	],
	"./group-tools.ts": [
		100,
		100
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 25370;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 32563:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 1227));


/***/ }),

/***/ 32792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ TabVisibilityContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);

const TabVisibilityContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(true);


/***/ }),

/***/ 49293:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ VisualGuidanceOverlay)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _UIStateContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23255);
/* harmony import */ var _barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(78780);
/* harmony import */ var _barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76721);
/* __next_internal_client_entry_do_not_use__ VisualGuidanceOverlay auto */ 
/**
 * MedQ Visual Guidance Overlay — Renders highlights, tooltips, and guided tours
 * over existing UI elements. This component is rendered by the AI agent
 * and positions itself relative to target DOM elements.
 *
 * Features:
 * - Highlight: Pulsing border + overlay around target element
 * - Tooltip: Speech bubble with contextual message
 * - Tour: Multi-step guided walkthrough with navigation
 */ 


function VisualGuidanceOverlay() {
    const { state, updateState } = (0,_UIStateContext__WEBPACK_IMPORTED_MODULE_2__/* .useUIState */ .Fx)();
    const { guidance } = state;
    const [position, setPosition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [tooltipPos, setTooltipPos] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const overlayRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const updateTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Update position when guidance target changes
    const updatePosition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!guidance.active || !guidance.targetSelector) {
            setPosition(null);
            setTooltipPos(null);
            return;
        }
        const target = document.querySelector(guidance.targetSelector);
        if (!target) {
            setPosition(null);
            setTooltipPos(null);
            return;
        }
        const rect = target.getBoundingClientRect();
        const newPos = {
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8
        };
        setPosition(newPos);
        // Calculate tooltip position
        if (guidance.message) {
            const tipOffset = 12;
            let tipTop = rect.bottom + tipOffset;
            let tipLeft = rect.left + rect.width / 2;
            let tipPosition = 'bottom';
            // Adjust if tooltip would go off screen
            if (tipTop + 100 > window.innerHeight) {
                tipTop = rect.top - tipOffset;
                tipPosition = 'top';
            }
            if (tipLeft + 200 > window.innerWidth) {
                tipLeft = window.innerWidth - 220;
            }
            if (tipLeft < 20) {
                tipLeft = 20;
            }
            setTooltipPos({
                top: tipTop,
                left: tipLeft,
                position: tipPosition
            });
        }
    }, [
        guidance.active,
        guidance.targetSelector,
        guidance.message
    ]);
    // Update position on changes and on scroll/resize
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleUpdate = ()=>{
            if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
            updateTimerRef.current = setTimeout(()=>{
                updatePosition();
            }, 50);
        };
        const initialTimer = setTimeout(()=>{
            updatePosition();
        }, 0);
        window.addEventListener('scroll', handleUpdate, true);
        window.addEventListener('resize', handleUpdate);
        return ()=>{
            window.removeEventListener('scroll', handleUpdate, true);
            window.removeEventListener('resize', handleUpdate);
            if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
            clearTimeout(initialTimer);
        };
    }, [
        updatePosition
    ]);
    // Tour navigation
    const handleNextStep = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const win = window;
        window.dispatchEvent(new CustomEvent('medq-agent-action', {
            detail: {
                actionId: 'tour_next'
            }
        }));
        // Also use the UIActionEngine pattern
        const steps = win.__medqTourSteps || [];
        const currentStep = guidance.tourStep ?? -1;
        const nextStep = currentStep + 1;
        if (nextStep >= steps.length) {
            updateState({
                guidance: {
                    active: false
                }
            });
            delete win.__medqTourSteps;
        } else {
            updateState({
                guidance: {
                    active: true,
                    targetType: 'tour-step',
                    tourId: guidance.tourId,
                    tourStep: nextStep,
                    tourTotalSteps: steps.length,
                    targetSelector: steps[nextStep].selector,
                    message: steps[nextStep].message
                }
            });
        }
    }, [
        guidance,
        updateState
    ]);
    const handlePrevStep = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const win = window;
        const currentStep = guidance.tourStep ?? 1;
        const prevStep = currentStep - 1;
        if (prevStep < 0) return;
        const steps = win.__medqTourSteps || [];
        updateState({
            guidance: {
                active: true,
                targetType: 'tour-step',
                tourId: guidance.tourId,
                tourStep: prevStep,
                tourTotalSteps: steps.length,
                targetSelector: steps[prevStep].selector,
                message: steps[prevStep].message
            }
        });
    }, [
        guidance,
        updateState
    ]);
    const handleEndTour = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const win = window;
        updateState({
            guidance: {
                active: false
            }
        });
        delete win.__medqTourSteps;
    }, [
        updateState
    ]);
    if (!guidance.active || !position) return null;
    const isTour = guidance.targetType === 'tour-step';
    const isHighlight = guidance.targetType === 'highlight';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            isTour && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99990,
                    background: 'rgba(0,0,0,0.5)',
                    pointerEvents: 'none'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        position: 'absolute',
                        top: position.top - 4,
                        left: position.left - 4,
                        width: position.width + 8,
                        height: position.height + 8,
                        background: 'transparent',
                        borderRadius: '8px',
                        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                ref: overlayRef,
                style: {
                    position: 'fixed',
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    height: position.height,
                    zIndex: 99991,
                    pointerEvents: 'none',
                    borderRadius: '8px',
                    border: isHighlight ? '3px solid #00e5a0' : isTour ? '3px solid #00e5a0' : '2px dashed #8b5cf6',
                    boxShadow: isHighlight ? '0 0 20px rgba(0,229,160,0.4), inset 0 0 20px rgba(0,229,160,0.1)' : isTour ? '0 0 20px rgba(0,229,160,0.4), inset 0 0 20px rgba(0,229,160,0.1)' : '0 0 10px rgba(139,92,246,0.3)',
                    animation: 'agentPulseHighlight 2s ease-in-out infinite'
                }
            }),
            guidance.message && tooltipPos && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    position: 'fixed',
                    top: tooltipPos.top,
                    left: tooltipPos.left,
                    zIndex: 99992,
                    transform: 'translateX(-50%)',
                    pointerEvents: 'auto',
                    maxWidth: '340px',
                    minWidth: '200px'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        background: 'rgba(12,14,20,0.97)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(0,229,160,0.3)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,229,160,0.15)',
                        color: '#e8ecf4',
                        fontSize: '13px',
                        lineHeight: '1.5'
                    },
                    children: [
                        tooltipPos.position === 'bottom' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                position: 'absolute',
                                top: '-6px',
                                left: '50%',
                                transform: 'translateX(-50%) rotate(45deg)',
                                width: '12px',
                                height: '12px',
                                background: 'rgba(12,14,20,0.97)',
                                borderLeft: '1px solid rgba(0,229,160,0.3)',
                                borderTop: '1px solid rgba(0,229,160,0.3)'
                            }
                        }),
                        tooltipPos.position === 'top' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                position: 'absolute',
                                bottom: '-6px',
                                left: '50%',
                                transform: 'translateX(-50%) rotate(45deg)',
                                width: '12px',
                                height: '12px',
                                background: 'rgba(12,14,20,0.97)',
                                borderRight: '1px solid rgba(0,229,160,0.3)',
                                borderBottom: '1px solid rgba(0,229,160,0.3)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                    style: {
                                        width: '16px',
                                        height: '16px',
                                        color: '#00e5a0',
                                        flexShrink: 0,
                                        marginTop: '2px'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: [
                                        isTour && guidance.tourStep !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            style: {
                                                fontSize: '10px',
                                                color: '#00e5a0',
                                                fontWeight: 600,
                                                marginBottom: '4px'
                                            },
                                            children: [
                                                "Step ",
                                                guidance.tourStep + 1,
                                                " of ",
                                                guidance.tourTotalSteps
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            children: guidance.message
                                        })
                                    ]
                                }),
                                !isTour && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>updateState({
                                            guidance: {
                                                active: false
                                            }
                                        }),
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: '#5a6478',
                                        cursor: 'pointer',
                                        padding: '2px',
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        style: {
                                            width: '14px',
                                            height: '14px'
                                        }
                                    })
                                })
                            ]
                        }),
                        isTour && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '10px',
                                paddingTop: '8px',
                                borderTop: '1px solid rgba(255,255,255,0.08)'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: handleEndTour,
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: '#5a6478',
                                        cursor: 'pointer',
                                        fontSize: '11px'
                                    },
                                    children: "End tour"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '6px'
                                    },
                                    children: [
                                        (guidance.tourStep ?? 0) > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: handlePrevStep,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.04)',
                                                color: '#9ca3b8',
                                                cursor: 'pointer',
                                                fontSize: '11px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    style: {
                                                        width: '12px',
                                                        height: '12px'
                                                    }
                                                }),
                                                "Back"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: handleNextStep,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '4px 12px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                                                color: '#0c0e14',
                                                cursor: 'pointer',
                                                fontSize: '11px',
                                                fontWeight: 600
                                            },
                                            children: [
                                                (guidance.tourStep ?? 0) >= (guidance.tourTotalSteps ?? 0) - 1 ? 'Finish' : 'Next',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronLeft_ChevronRight_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                    style: {
                                                        width: '12px',
                                                        height: '12px'
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                children: `
        @keyframes agentPulseHighlight {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `
            })
        ]
    });
}


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

/***/ 79254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73321);
/* harmony import */ var _components_medq_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79379);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12115);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37206);
/* harmony import */ var _components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10244);
/* harmony import */ var _components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27436);
/* harmony import */ var _lib_utils_app_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(57434);
/* harmony import */ var _components_medq_ai_agent_UIStateContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23255);
/* harmony import */ var _components_medq_ai_agent_useAgentVersion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83207);
/* harmony import */ var _components_medq_useNotificationStream__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(17940);
/* harmony import */ var _lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(83557);
/* harmony import */ var _lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(26846);
/* harmony import */ var _components_medq_PricingInline__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(465);
/* harmony import */ var _lib_generate_prefill__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(15517);
/* harmony import */ var _OfflineTabFallback__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(52304);
/* harmony import */ var _TabVisibilityContext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(32792);
/* harmony import */ var _barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(71019);
/* harmony import */ var _barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(50981);
/* harmony import */ var _barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(28342);
/* harmony import */ var _barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(69072);
/* harmony import */ var _components_medq_header__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(38463);
/* harmony import */ var _components_medq_ai_agent_MedQAgentV3__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(13644);
/* harmony import */ var _components_medq_ai_agent_VisualGuidanceOverlay__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(49293);
/* harmony import */ var _components_medq_BannerAd__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(83213);
/* harmony import */ var _components_medq_OfflineIndicator__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(66284);
/* harmony import */ var _components_medq_UpgradeModal__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(64012);
/* __next_internal_client_entry_do_not_use__ default auto */ 
let user = {
    id: "string",
    name: "Admin User",
    email: "admin@medq.com",
    image: null,
    password: "test123",
    role: "admin"
};


















// import { MedQAgent } from '@/components/medq/ai-agent/MedQAgent';





// Heavy UI components are lazy-loaded via next/dynamic so the initial compile
// of this shell stays within the 4GB memory budget on this host.
const PomodoroTimer = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_4__["default"])(()=>__webpack_require__.e(/* import() */ 97291).then(__webpack_require__.bind(__webpack_require__, 19672)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(19672)
            ]
    },
    ssr: false
});
// const InterstitialAd = dynamic(() => import('@/components/medq/InterstitialAd'), { ssr: false });
const RewardedAd = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_4__["default"])(()=>__webpack_require__.e(/* import() */ 87542).then(__webpack_require__.bind(__webpack_require__, 65161)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(65161)
            ]
    },
    ssr: false
});
const CreditShop = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_4__["default"])(()=>__webpack_require__.e(/* import() */ 36127).then(__webpack_require__.bind(__webpack_require__, 36127)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(36127)
            ]
    },
    ssr: false
});
// const AuthModal = dynamic(() => import('@/components/medq/AuthModal'), { ssr: false });
const ProfileDialog = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_4__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(33697), __webpack_require__.e(43342), __webpack_require__.e(40379), __webpack_require__.e(70156)]).then(__webpack_require__.bind(__webpack_require__, 47775)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(47775)
            ]
    },
    ssr: false
});
const SettingsDialog = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_4__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(33697), __webpack_require__.e(43342), __webpack_require__.e(40379), __webpack_require__.e(59644), __webpack_require__.e(10885), __webpack_require__.e(42998), __webpack_require__.e(33257), __webpack_require__.e(55331)]).then(__webpack_require__.bind(__webpack_require__, 9127)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(9127)
            ]
    },
    ssr: false
});
const DeviceSecurityDialog = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_4__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(43342), __webpack_require__.e(40184)]).then(__webpack_require__.bind(__webpack_require__, 40184)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(40184)
            ]
    },
    ssr: false
});
const GlobalSearch = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_4__["default"])(()=>__webpack_require__.e(/* import() */ 64673).then(__webpack_require__.bind(__webpack_require__, 64673)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(64673)
            ]
    },
    ssr: false
});
const ALL_TABS = _components_medq_navigation__WEBPACK_IMPORTED_MODULE_2__/* .SIDEBAR_NAV */ .nx.flatMap((s)=>s.items);
const SPECIAL_TABS = [
    {
        id: 'pricing',
        label: 'Pricing',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
            className: "w-4 h-4"
        })
    },
    {
        id: 'revenue',
        label: 'Revenue',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
            className: "w-4 h-4"
        })
    },
    {
        id: 'admin',
        label: 'Admin',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        adminOnly: true
    }
];
const TAB_TO_CATEGORY = {
    generate: 'ai_generations',
    files: 'ai_generations',
    tutor: 'tutor_messages',
    cases: 'case_simulations',
    video: 'video_lessons',
    'image-analyzer': 'image_analyzer',
    voice: 'voice_study',
    'board-prep': 'board_prep_sessions',
    mnemonics: 'mnemonics',
    anatomy: 'anatomy_visuals',
    planner: 'study_planner',
    'oral-exam': 'voice_study',
    'advanced-chat': 'tutor_messages',
    'whiteboard-studio': 'ai_generations',
    'video-library': 'ai_generations'
};
const INTERSTITIAL_INTERVAL = 4;
const INTERSTITIAL_ENABLED_TABS = new Set([
    'generate',
    'tutor',
    'cases',
    'video',
    'board-prep'
]);
const componentCache = new Map();
function PersistentTab({ tabId, active, ...props }) {
    const [Comp, setComp] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(()=>componentCache.get(tabId) ?? null);
    const [err, setErr] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const mounted = (0,react__WEBPACK_IMPORTED_MODULE_3__.useSyncExternalStore)(()=>()=>{}, ()=>true, ()=>false);
    // retryKey bumps each time the user taps "Retry" on the OfflineTabFallback.
    // The useEffect below depends on it, so bumping it re-runs the chunk import.
    const [retryKey, setRetryKey] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
    const loadedRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(componentCache.has(tabId));
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        // On a fresh mount OR a user-initiated retry, attempt the import.
        // The retryKey === 0 path short-circuits if the chunk is already cached
        // (avoids re-fetching on every PersistentTab re-mount). For retries
        // (retryKey > 0) we always re-attempt — the user explicitly asked us to.
        if (loadedRef.current && retryKey === 0) {
            setComp(()=>componentCache.get(tabId));
            return;
        }
        let cancelled = false;
        setErr(false);
        const loadTab = async ()=>{
            try {
                // Route tab load to the appropriate group loader. Each group is a
                // separate dynamically-imported chunk with ~10 entries, so no single
                // compile pass exceeds the 4GB memory budget.
                const TAB_GROUP = {
                    // study group — core home/compete/streak/achievement
                    'dashboard': 'study',
                    'challenge': 'study',
                    'tutor': 'study',
                    'arena': 'study',
                    'live-battle': 'study',
                    'leaderboard': 'study',
                    'qotd': 'study',
                    'speed-quiz': 'study',
                    'streak-calendar': 'study',
                    'study-streaks': 'study',
                    'achievements': 'study',
                    'erc': 'study',
                    // ai group — AI-powered tools
                    'generate': 'ai',
                    'insights': 'ai',
                    'cases': 'ai',
                    'anatomy': 'ai',
                    'clinical-vignettes': 'ai',
                    'ai-mode': 'ai',
                    'micro-lessons': 'ai',
                    'ai-classroom': 'ai',
                    'freellm': 'ai',
                    // social group — oral/med-memorize/med-chat
                    'files': 'social',
                    'weak-areas': 'social',
                    'board-prep': 'social',
                    'oral-exam': 'social',
                    'med-memorize': 'social',
                    'med-chat': 'social',
                    // admin group — bank/planner/video/admin/pricing/revenue/feed/stats
                    'bank': 'admin',
                    'planner': 'admin',
                    'video': 'admin',
                    'admin': 'admin',
                    'pricing': 'admin',
                    'revenue': 'admin',
                    'feed': 'admin',
                    'study-stats': 'admin',
                    // drugs group — drug tools + flashcards/knowledge-map/image-analyzer
                    'flashcards': 'drugs',
                    'knowledge-map': 'drugs',
                    'image-analyzer': 'drugs',
                    'drug-interactions': 'drugs',
                    'medicine-prices': 'drugs',
                    'openfda-drugs': 'drugs',
                    'drug-zoom': 'drugs',
                    'drug-zoom-labs': 'drugs',
                    'medication-tables': 'drugs',
                    // tools group — calculators, timers, notes, etc.
                    'lab-values': 'tools',
                    'exams': 'tools',
                    'mnemonics': 'tools',
                    'medical-calculator': 'tools',
                    'symptom-checker': 'tools',
                    'exam-countdown': 'tools',
                    'medical-dictionary': 'tools',
                    'study-timer': 'tools',
                    'quick-notes': 'tools',
                    // exam group — exam prep, revision, arena, playlist, coach
                    'review': 'exam',
                    'create': 'exam',
                    'voice': 'exam',
                    'mnemonic-maker': 'exam',
                    'revision-scheduler': 'exam',
                    'peer-compare': 'exam',
                    'flashcard-arena': 'exam',
                    'study-playlist': 'exam',
                    'performance-coach': 'exam',
                    // advanced group — split into 3 sub-groups to keep per-chunk bundle
                    // size small. The former 16-tab 'advanced' chunk was the largest
                    // per-group bundle in the app; splitting by domain isolates
                    // media-heavy studio tabs from lightweight clinical reference tabs
                    // and from data-table misc tabs. See src/components/medq/tabs/
                    // group-advanced-{clinical,media,misc}.ts.
                    //
                    // advanced-clinical — decision trees, guidelines, pathways, dx, CME
                    'decision-tree': 'advanced-clinical',
                    'decision-making-tree': 'advanced-clinical',
                    'guideline-library': 'advanced-clinical',
                    'clinical-pathways': 'advanced-clinical',
                    'diff-diagnosis': 'advanced-clinical',
                    'cme-tracker': 'advanced-clinical',
                    // advanced-media — heavy studio tabs (whiteboard, video, procedure, image)
                    'whiteboard-studio': 'advanced-media',
                    'video-library': 'advanced-media',
                    'procedure-player': 'advanced-media',
                    'image-occlusion': 'advanced-media',
                    // advanced-misc — lightweight data tabs (collections, take-exam, news, ecg, trivia, gap-analyzer)
                    'collections': 'advanced-misc',
                    'take-exam': 'advanced-misc',
                    'news': 'advanced-misc',
                    'ecg-challenge': 'advanced-misc',
                    'medical-trivia': 'advanced-misc',
                    'knowledge-gap-analyzer': 'advanced-misc',
                    // community group — chat, friends, groups, meeting
                    'advanced-chat': 'community',
                    'friends': 'community',
                    'groups': 'community',
                    'meeting': 'community'
                };
                const groupName = TAB_GROUP[tabId];
                if (!groupName) {
                    // Unknown tab — fail gracefully instead of throwing. This can happen
                    // for tabs listed in SIDEBAR_NAV that don't have a group loader yet.
                    // Log a warning and mark as errored so the user sees the fallback UI
                    // rather than a console exception that breaks the page.
                    console.warn(`[PersistentTab] No group loader registered for tab: "${tabId}". Add it to TAB_GROUP in MedQAppShell.tsx.`);
                    if (!cancelled) setErr(true);
                    return;
                }
                const groupMod = await __webpack_require__(25370)(`./group-${groupName}`);
                const mod = await groupMod.loadTab(tabId);
                if (!cancelled) {
                    componentCache.set(tabId, mod.default);
                    loadedRef.current = true;
                    setComp(()=>mod.default);
                }
            } catch (e) {
                console.error(`Failed to load tab ${tabId}:`, e);
                if (!cancelled) setErr(true);
            }
        };
        loadTab();
        return ()=>{
            cancelled = true;
        };
    }, [
        tabId,
        retryKey
    ]);
    const isMeeting = tabId === 'meeting' || tabId === 'whiteboard-studio' || tabId === 'video-library' || tabId === 'drug-zoom' || tabId === 'drug-zoom-labs' || tabId === 'freellm';
    if (err) {
        // Chunk-load failure — most likely cause is the user is offline and
        // this tab's chunk hasn't been cached yet. Show the friendly
        // OfflineTabFallback ("You're offline — Retry") instead of the bare
        // "Failed to load tab." red text. The Retry button bumps retryKey,
        // which re-runs the import effect above. If the user is online and
        // the chunk genuinely fails (e.g. dev server restarted),
        // OfflineTabFallback shows a "Something went wrong" variant with
        // the same Retry button.
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: active && mounted ? 'flex flex-col flex-1 min-h-0' : 'hidden',
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OfflineTabFallback__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                label: tabId,
                onRetry: ()=>{
                    // Clear the cache so we don't short-circuit on stale state
                    componentCache.delete(tabId);
                    loadedRef.current = false;
                    setComp(null);
                    setErr(false);
                    setRetryKey((k)=>k + 1);
                }
            })
        });
    }
    if (!Comp) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: active && mounted ? 'flex flex-col flex-1 min-h-0' : 'hidden',
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex items-center justify-center py-20",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                className: "w-6 h-6 animate-spin text-[#00e5a0]"
            })
        })
    });
    const visible = active && mounted;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: visible ? `animate-fade-in flex flex-col flex-1 min-h-0${isMeeting ? ' h-full' : ''}` : 'hidden',
        "aria-hidden": !visible,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabVisibilityContext__WEBPACK_IMPORTED_MODULE_15__/* .TabVisibilityContext */ .z.Provider, {
            value: visible,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp, {
                ...props
            })
        })
    });
}
/* ═══════════════════════════════════════════════════════════════
   MAIN APP - Redesigned with integrated features
   ═══════════════════════════════════════════════════════════════ */ function MedQApp() {
    const { tier, adsEnabled, canAccess, trackUsage, setShowUpgradeModal, showUpgradeModal, usage, credits, refresh } = (0,_components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_5__/* .useSubscription */ .R)();
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.usePathname)();
    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useSearchParams)();
    const { items: bottomNavItems, itemIds: bottomNavIds, setItems: setBottomNavItems, customizerOpen, openCustomizer, closeCustomizer } = (0,_components_medq_navigation__WEBPACK_IMPORTED_MODULE_2__/* .useBottomNav */ .MN)();
    /*
   * REAL Next.js routing (user directive 2026-11-04): the App Router URL
   * is the single source of truth for the active tab.
   *   - "/"            → the SPA dashboard home
   *   - "/?tab=<id>"   → SPA tabs — REAL, refresh-safe URLs served by this
   *                      page; the shell renders the tab from the URL
   *   - real routes    → /bank, /generate … render through the (app)
   *                      AppShellLayout instead (never in-shell here)
   *
   * The sidebar and bottom nav navigate with plain <Link> elements — no
   * onTabSwitch interception — so this derivation must react to the URL
   * (usePathname + useSearchParams) alone.
   */ const activeTab = react__WEBPACK_IMPORTED_MODULE_3__.useMemo(()=>{
        const tabParam = searchParams.get('tab');
        if (tabParam && (!pathname || pathname === '/')) {
            const resolved = (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__/* .resolveNavigationTarget */ .UN)(tabParam);
            if (resolved.kind === 'tab') {
                // Real-page tabs own their own routes — /?tab=bank bounces to
                // /bank (redirect effect below); never mount them in-shell.
                if (_lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .REAL_PAGE_TABS */ .ud[resolved.target] && resolved.target !== 'dashboard') {
                    return 'dashboard'; // transient — the redirect fires immediately
                }
                return resolved.target;
            }
        }
        return (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__/* .pathToTab */ .cM)(pathname);
    }, [
        pathname,
        searchParams
    ]);
    /*
   * /?tab=<real-page-tab> → the tab's real route. Handles links/bookmarks
   * like /?tab=bank (and keeps them out of the in-shell PersistentTab
   * mount, which deliberately has no group-loader cases for standalone
   * tabs).
   */ (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const tabParam = searchParams.get('tab');
        if (!tabParam || pathname && pathname !== '/') return;
        const resolved = (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__/* .resolveNavigationTarget */ .UN)(tabParam);
        const realPath = resolved.kind === 'tab' ? _lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .REAL_PAGE_TABS */ .ud[resolved.target] : undefined;
        if (realPath && resolved.target !== 'dashboard') {
            router.replace(realPath);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        searchParams,
        pathname
    ]);
    /*
   * URL-driven keep-alive: whenever the URL says a SPA tab is active, mount
   * its PersistentTab. Covers plain <Link> navigations from the sidebar /
   * bottom nav (no onTabSwitch interception anymore), browser back/forward,
   * and deep links — every path that changes the URL.
   */ (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (_lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .REAL_PAGE_TABS */ .ud[activeTab] && activeTab !== 'dashboard') return; // standalone tabs render at their routes
        setVisitedTabs((prev)=>prev.has(activeTab) ? prev : new Set(prev).add(activeTab));
        if (true) {
            window.dispatchEvent(new CustomEvent('medq-tab-visible', {
                detail: activeTab
            }));
        }
    }, [
        activeTab
    ]);
    /*
   * These pages intentionally use their own
   * full-screen/mobile layouts without the
   * standard sidebar.
   */ const hideSidebar = activeTab === 'meeting' || activeTab === 'advanced-chat' || activeTab === 'whiteboard-studio';
    const { settings, playSoundIfEnabled } = (0,_components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_6__.useSettings)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    // v3: UI State context for the AI agent
    const { updateState: updateUIState } = (0,_components_medq_ai_agent_UIStateContext__WEBPACK_IMPORTED_MODULE_8__/* .useUIState */ .Fx)();
    const { v2: useV2Agent } = (0,_components_medq_ai_agent_useAgentVersion__WEBPACK_IMPORTED_MODULE_9__/* .useAgentVersion */ .J)();
    const [browserPathname] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)('/');
    const initialTab = react__WEBPACK_IMPORTED_MODULE_3__.useMemo(()=>{
        if (true) {
            const sp = new URLSearchParams(window.location.search);
            const tabParam = sp.get('tab');
            if (tabParam) {
                const resolved = (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__/* .resolveNavigationTarget */ .UN)(tabParam);
                if (resolved.kind === 'tab') return resolved.target;
            }
        }
        return (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__/* .pathToTab */ .cM)(browserPathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [showAuthModal, setShowAuthModal] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [authModalTab, setAuthModalTab] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)('signin');
    const [showProfile, setShowProfile] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [showSettings, setShowSettings] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [showDeviceSecurity, setShowDeviceSecurity] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    // Allow deeply-nested children (e.g. OpenMAIC SettingsDialog) to ask the
    // page to open the app-wide SettingsDialog → BYOK section without prop-
    // drilling through 6+ layers.
    (0,_lib_utils_app_events__WEBPACK_IMPORTED_MODULE_7__/* .useAppSettingsOpener */ .TR)((_section)=>{
        setShowSettings(true);
    });
    const [visitedTabs, setVisitedTabs] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(()=>new Set([
            // Standalone tabs (e.g. a deep link to /?tab=bank) never render
            // in-shell — the redirect effect above bounces them to their real
            // route — so seed with the SPA-safe tab.
            _lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .REAL_PAGE_TABS */ .ud[initialTab] && initialTab !== 'dashboard' ? 'dashboard' : initialTab
        ]));
    const [examId, setExamId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [showPomodoro, setShowPomodoro] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [showInterstitial, setShowInterstitial] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [interstitialCallback, setInterstitialCallback] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [showRewardedAd, setShowRewardedAd] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [showCreditShop, setShowCreditShop] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [dailyBonusClaimed, setDailyBonusClaimed] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [sidebarOpen, setSidebarOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [notifCount, setNotifCount] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
    const [showNotifications, setShowNotifications] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [showGlobalSearch, setShowGlobalSearch] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [initialMeetingId, setInitialMeetingId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [openfdaInitialSearch, setOpenfdaInitialSearch] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(undefined);
    /**
   * Cross-feature integration flag: when WeakAreasTab wants to start an AI viva
   * targeting the user's weak topics, it calls onNavigateToTab('oral-exam', { weakAreasViva: true }).
   * The oral-exam tab reads this on mount and auto-starts a weak-areas viva.
   */ const [triggerWeakAreasViva, setTriggerWeakAreasViva] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [drugInteractionInitialDrug, setDrugInteractionInitialDrug] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(undefined);
    const premiumSwitchCountRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(0);
    const dailyBonusRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
    const previousTabRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(initialTab);
    // Header owns its controls; the shell owns the dialogs those controls open.
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const handleHeaderAction = (event)=>{
            const action = event.detail?.action;
            if (action === 'profile') setShowProfile(true);
            if (action === 'settings') setShowSettings(true);
            if (action === 'pricing') router.push('/pricing');
            if (action === 'device-security') setShowDeviceSecurity(true);
            if (action === 'sidebar') setSidebarOpen(true);
            if (action === 'search') setShowGlobalSearch(true);
            if (action === 'credit-shop') setShowCreditShop(true);
            if (action === 'rewarded-ad') setShowRewardedAd(true);
        };
        window.addEventListener('medq-header-action', handleHeaderAction);
        return ()=>window.removeEventListener('medq-header-action', handleHeaderAction);
    }, [
        router
    ]);
    // Check URL for meeting join parameter
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (false) {}
        const params = new URLSearchParams(window.location.search);
        const meetingParam = params.get('meeting');
        if (meetingParam) {
            setInitialMeetingId(meetingParam);
            // Real routing: settle on the REAL /?tab=meeting URL (the old
            // replaceState('/meeting') wrote a client-only path that 404'd on
            // refresh). initialMeetingId is already captured in state above.
            router.replace('/?tab=meeting');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // ─── Prewarm offline AI backend on idle ──────────────────────────────
    // Kicks off WebGPU capability detection + RAG embedder warm-up on idle
    // so the user doesn't see a 5-8s cold start when they first trigger an
    // offline AI feature. Safe to call multiple times — both probe and
    // warmup are cached for the session.
    //
    // The embedder downloads a 23MB ONNX model on first run (cached in the
    // browser cache afterwards). We deliberately defer this to idle so it
    // doesn't compete with the user's actual network activity.
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (false) {}
        let cancelled = false;
        const schedule = ()=>{
            if (cancelled) return;
            Promise.all(/* import() */[__webpack_require__.e(10885), __webpack_require__.e(88321)]).then(__webpack_require__.bind(__webpack_require__, 88321)).then(({ prewarmBackend })=>prewarmBackend()).catch(()=>{
            /* silent — prewarm is best-effort */ });
        };
        if ('requestIdleCallback' in window) {
            const ric = window.requestIdleCallback(schedule, {
                timeout: 8000
            });
            return ()=>{
                cancelled = true;
                if ('cancelIdleCallback' in window) {
                    window.cancelIdleCallback(ric);
                }
            };
        }
        const t = setTimeout(schedule, 3000);
        return ()=>{
            cancelled = true;
            clearTimeout(t);
        };
    }, []);
    const [onboardingDismissed, setOnboardingDismissed] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    // const showOnboarding = !onboardingDismissed && !!isAuthenticated && !!user && user.onboardingCompleted === false;
    // v3: Sync UI state with active tab changes (for AI agent context awareness)
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const moduleMap = {
            'dashboard': 'study',
            'challenge': 'study',
            'tutor': 'study',
            'arena': 'study',
            'live-battle': 'study',
            'leaderboard': 'study',
            'qotd': 'study',
            'speed-quiz': 'study',
            'streak-calendar': 'study',
            'study-streaks': 'study',
            'achievements': 'study',
            'erc': 'study',
            'generate': 'ai',
            'insights': 'ai',
            'cases': 'ai',
            'anatomy': 'ai',
            'clinical-vignettes': 'ai',
            'ai-mode': 'ai',
            'micro-lessons': 'ai',
            'ai-classroom': 'ai',
            'freellm': 'ai',
            'files': 'social',
            'weak-areas': 'social',
            'board-prep': 'social',
            'oral-exam': 'social',
            'med-memorize': 'social',
            'med-chat': 'social',
            'bank': 'admin',
            'planner': 'admin',
            'video': 'admin',
            'admin': 'admin',
            'pricing': 'admin',
            'revenue': 'admin',
            'feed': 'admin',
            'study-stats': 'admin',
            'flashcards': 'drugs',
            'knowledge-map': 'drugs',
            'image-analyzer': 'drugs',
            'drug-interactions': 'drugs',
            'medicine-prices': 'drugs',
            'openfda-drugs': 'drugs',
            'drug-zoom': 'drugs',
            'drug-zoom-labs': 'drugs',
            'medication-tables': 'drugs',
            'lab-values': 'tools',
            'exams': 'tools',
            'mnemonics': 'tools',
            'medical-calculator': 'tools',
            'symptom-checker': 'tools',
            'exam-countdown': 'tools',
            'medical-dictionary': 'tools',
            'study-timer': 'tools',
            'quick-notes': 'tools',
            'review': 'exam',
            'create': 'exam',
            'voice': 'exam',
            'mnemonic-maker': 'exam',
            'revision-scheduler': 'exam',
            'peer-compare': 'exam',
            'flashcard-arena': 'exam',
            'study-playlist': 'exam',
            'performance-coach': 'exam',
            'collections': 'advanced',
            'take-exam': 'advanced',
            'news': 'advanced',
            'whiteboard-studio': 'advanced',
            'video-library': 'advanced',
            'image-occlusion': 'advanced',
            'decision-tree': 'advanced',
            'decision-making-tree': 'advanced',
            'guideline-library': 'advanced',
            'procedure-player': 'advanced',
            'cme-tracker': 'advanced',
            'knowledge-gap-analyzer': 'advanced',
            'ecg-challenge': 'advanced',
            'clinical-pathways': 'advanced',
            'diff-diagnosis': 'advanced',
            'medical-trivia': 'advanced'
        };
        const module = moduleMap[activeTab] || 'study';
        updateUIState({
            currentPage: activeTab,
            currentModule: module,
            currentRoute: (0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .tabHref */ .tW)(activeTab),
            openTabs: Array.from(visitedTabs),
            workspace: {
                sidebarOpen: sidebarOpen,
                sidebarCollapsed: false,
                theme: 'dark',
                viewport: {
                    width:  true ? window.innerWidth : 0,
                    height:  true ? window.innerHeight : 0
                }
            }
        });
    }, [
        activeTab,
        visitedTabs,
        sidebarOpen,
        updateUIState
    ]);
    // Direct-URL mount: on a hard load of a tab path (e.g. /freellm), activeTab
    // already resolves from the URL, but the visitedTabs mount-gate starts at
    // 'dashboard' (initialTab uses a static '/'), so the URL's tab would never
    // render. Add the URL's active tab to the mounted set on first paint.
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        setVisitedTabs((prev)=>prev.has(activeTab) ? prev : new Set([
                ...prev,
                activeTab
            ]));
    }, [
        activeTab
    ]);
    // v3: Listen for agent navigation events from UIActionEngine
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const handleAgentNavigate = (e)=>{
            const detail = e.detail;
            if (detail?.tab) {
                // Defensive: resolve any free-text tab name through the same
                // resolveNavigationTarget() helper the backend uses, so the
                // frontend stays correct even if the backend validator misses
                // an edge case. This also rejects URL-like values (download URLs,
                // absolute URLs, paths containing dots/filenames) that would
                // otherwise crash pushState with a cross-origin SecurityError.
                const t = String(detail.tab);
                // Fast reject: URL-like values that should never be set as activeTab
                if (t.startsWith('/') || /^https?:\/\//i.test(t) || t.startsWith('//') || t.includes('.')) {
                    console.warn('[MedQ] Ignored agent-navigate with URL-like tab value:', t);
                    return;
                }
                const resolved = (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__/* .resolveNavigationTarget */ .UN)(t);
                if (resolved.kind === 'dialog') {
                    // Profile/settings/etc. should open as dialogs, not as tabs.
                    console.log(`[MedQ] Nav reroute: "${t}" → dialog "${resolved.target}"`);
                    const setterMap = {
                        'profile': setShowProfile,
                        'settings': setShowSettings,
                        'search': setShowGlobalSearch,
                        'upgrade': setShowUpgradeModal,
                        'credit-shop': setShowCreditShop,
                        'auth-modal': setShowAuthModal
                    };
                    const setter = setterMap[resolved.target];
                    if (setter) setter(true);
                    else console.warn('[MedQ] Unknown dialog target:', resolved.target);
                    return;
                }
                if (resolved.remapped && resolved.target === 'dashboard' && t !== 'dashboard') {
                    // Genuine unknown — log clearly so it shows up in dev logs.
                    console.warn(`[MedQ] Unknown nav target "${t}" → falling back to dashboard`);
                } else if (resolved.remapped) {
                    console.log(`[MedQ] Nav alias: "${t}" → "${resolved.target}"`);
                }
                handleTabSwitch(resolved.target);
            }
        };
        const handleAgentSearch = (e)=>{
            const detail = e.detail;
            if (detail?.query) {
                if (detail.category === 'drugs') {
                    setOpenfdaInitialSearch(detail.query);
                    handleTabSwitch('drug-zoom');
                } else {
                    setShowGlobalSearch(true);
                    setTimeout(()=>{
                        window.dispatchEvent(new CustomEvent('medq-global-search', {
                            detail: detail.query
                        }));
                    }, 300);
                }
            }
        };
        const handleAgentDrugLookup = (e)=>{
            const detail = e.detail;
            if (detail?.drugName) {
                setDrugInteractionInitialDrug(detail.drugName);
                handleTabSwitch('drug-interactions');
            }
        };
        const handleAgentOpenDialog = (e)=>{
            const detail = e.detail;
            if (detail?.dialogId === 'auth-modal') {
                // Allow callers to preselect the auth-modal tab (signin | signup).
                if (detail?.data?.tab === 'signup') setAuthModalTab('signup');
                else setAuthModalTab('signin');
                setShowAuthModal(true);
            } else if (detail?.dialogId === 'profile') setShowProfile(true);
            else if (detail?.dialogId === 'settings') setShowSettings(true);
            else if (detail?.dialogId === 'upgrade') setShowUpgradeModal(true);
            else if (detail?.dialogId === 'credit-shop') setShowCreditShop(true);
            else if (detail?.dialogId === 'search') setShowGlobalSearch(true);
        };
        const handleAgentCloseDialog = (e)=>{
            const detail = e.detail;
            // Close the most likely dialog
            if (showAuthModal) setShowAuthModal(false);
            else if (showProfile) setShowProfile(false);
            else if (showSettings) setShowSettings(false);
            else if (showGlobalSearch) setShowGlobalSearch(false);
            else if (showUpgradeModal) setShowUpgradeModal(false);
            else if (showCreditShop) setShowCreditShop(false);
        };
        const handleAgentCrud = (e)=>{
            const detail = e.detail;
            if (detail?.action === 'create' && detail?.entity === 'question') {
                handleTabSwitch('create');
            } else if (detail?.action === 'create' && detail?.entity === 'exam') {
                handleTabSwitch('exams');
            } else if (detail?.action === 'create' && detail?.entity === 'collection') {
                handleTabSwitch('collections');
            } else if (detail?.action === 'create' && detail?.entity === 'flashcard') {
                handleTabSwitch('flashcards');
                setTimeout(()=>window.dispatchEvent(new CustomEvent('medq-create-flashcard', {
                        detail: {
                            topic: 'New',
                            count: 1,
                            style: 'qa'
                        }
                    })), 500);
            }
        };
        const handleAgentNavigateModule = (e)=>{
            const detail = e.detail;
            if (detail?.module) {
                // Map module names to their first/default tab
                const moduleToTab = {
                    'study': 'dashboard',
                    'ai': 'generate',
                    'social': 'feed',
                    'admin': 'bank',
                    'drugs': 'flashcards',
                    'tools': 'lab-values',
                    'exam': 'review',
                    'advanced': 'collections'
                };
                const targetTab = moduleToTab[detail.module] || 'dashboard';
                handleTabSwitch(targetTab);
            }
        };
        const handleAgentGoBack = ()=>{
            // Navigate to the previous page if tracked, otherwise dashboard
            if (previousTabRef.current) {
                handleTabSwitch(previousTabRef.current);
            } else {
                handleTabSwitch('dashboard');
            }
        };
        const handleAgentTogglePanel = (e)=>{
            const detail = e.detail;
            if (detail?.panelId === 'sidebar') {
                setSidebarOpen(detail.open !== undefined ? detail.open : !sidebarOpen);
            } else if (detail?.panelId === 'notifications') {
                setShowNotifications(detail.open !== undefined ? detail.open : !showNotifications);
            } else if (detail?.panelId === 'search') {
                setShowGlobalSearch(detail.open !== undefined ? detail.open : !showGlobalSearch);
            }
        };
        const handleAgentAction = (e)=>{
            const detail = e.detail;
            // Generic action routing — can be extended per actionId
            if (detail?.actionId === 'toggle-sidebar') {
                setSidebarOpen(!sidebarOpen);
            } else if (detail?.actionId === 'open-pomodoro') {
                setShowPomodoro(true);
            } else if (detail?.actionId === 'open-search') {
                setShowGlobalSearch(true);
            } else if (detail?.actionId === 'open-chat-room') {
                // v6: Agent created/accepted a DM or group → switch to chat tab and
                // forward the roomId so AdvancedChatTab can open it directly.
                // setActiveTab('advanced-chat' as TabId);
                // Defer the event so AdvancedChatTab has a chance to mount/remount
                // before the listener fires.
                setTimeout(()=>{
                    window.dispatchEvent(new CustomEvent('medq-agent-open-chat-room', {
                        detail: {
                            roomId: detail?.data?.roomId,
                            targetUserId: detail?.data?.targetUserId,
                            targetName: detail?.data?.targetName,
                            groupName: detail?.data?.groupName
                        }
                    }));
                }, 350);
            } else if (detail?.actionId === 'refresh-chat') {
                // v6: Agent mutated a room (added member, sent message, etc.) → tell
                // AdvancedChatTab to refetch its room list and (if matching) the open room.
                window.dispatchEvent(new CustomEvent('medq-agent-refresh-chat', {
                    detail: {
                        roomId: detail?.data?.roomId
                    }
                }));
            }
        };
        window.addEventListener('medq-agent-navigate', handleAgentNavigate);
        window.addEventListener('medq-agent-search', handleAgentSearch);
        window.addEventListener('medq-agent-drug-lookup', handleAgentDrugLookup);
        window.addEventListener('medq-agent-open-dialog', handleAgentOpenDialog);
        window.addEventListener('medq-agent-close-dialog', handleAgentCloseDialog);
        window.addEventListener('medq-agent-crud', handleAgentCrud);
        window.addEventListener('medq-agent-navigate-module', handleAgentNavigateModule);
        window.addEventListener('medq-agent-go-back', handleAgentGoBack);
        window.addEventListener('medq-agent-toggle-panel', handleAgentTogglePanel);
        window.addEventListener('medq-agent-action', handleAgentAction);
        return ()=>{
            window.removeEventListener('medq-agent-navigate', handleAgentNavigate);
            window.removeEventListener('medq-agent-search', handleAgentSearch);
            window.removeEventListener('medq-agent-drug-lookup', handleAgentDrugLookup);
            window.removeEventListener('medq-agent-open-dialog', handleAgentOpenDialog);
            window.removeEventListener('medq-agent-close-dialog', handleAgentCloseDialog);
            window.removeEventListener('medq-agent-crud', handleAgentCrud);
            window.removeEventListener('medq-agent-navigate-module', handleAgentNavigateModule);
            window.removeEventListener('medq-agent-go-back', handleAgentGoBack);
            window.removeEventListener('medq-agent-toggle-panel', handleAgentTogglePanel);
            window.removeEventListener('medq-agent-action', handleAgentAction);
        };
    }, [
        showAuthModal,
        showProfile,
        showSettings,
        showGlobalSearch,
        showUpgradeModal,
        showCreditShop,
        sidebarOpen,
        showNotifications
    ]);
    // Real-time notifications via SSE — replaces the old 30s poll.
    // The hook opens a single EventSource per tab and updates `unreadCount`
    // within ~8s of any new notification arriving on the server.
    (0,_components_medq_useNotificationStream__WEBPACK_IMPORTED_MODULE_10__/* .useNotificationStream */ .n)({
        enabled:  true && settings.notifications,
        onUnreadCount: (c)=>setNotifCount(c),
        onNotification: (n)=>{
            // Toast + chime on every new (unread) notification, unless the user
            // has the panel open (in which case the in-app list will surface it).
            try {
                if (!n.isRead) {
                    if (settings.soundEffects) playSoundIfEnabled('notification');
                    // Defer toast import to keep this hot path tiny
                    Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 66609)).then(({ toast })=>{
                        toast(n.title || 'New notification', {
                            description: n.message,
                            duration: 4500
                        });
                    });
                }
            } catch  {}
        }
    });
    // Fallback: if SSE is unavailable (very old browser, network issue), still
    // poll every 60s as a safety net so the badge doesn't go stale.
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (false) {}
        const fetchNotifs = async ()=>{
            try {
                const res = await fetch('/api/notifications?unreadOnly=true&limit=1');
                if (res.ok) {
                    const d = await res.json();
                    setNotifCount(d.unreadCount || 0);
                }
            } catch  {}
        };
        const interval = setInterval(()=>{
            fetchNotifs();
        }, 60000);
        return ()=>clearInterval(interval);
    }, [
        true
    ]);
    // Ctrl+K / Cmd+K keyboard shortcut for global search
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const handler = (e)=>{
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowGlobalSearch((prev)=>!prev);
            }
        };
        window.addEventListener('keydown', handler);
        return ()=>window.removeEventListener('keydown', handler);
    }, []);
    // ── Real App-Router routing (user directive 2026-11-04) ──
    // handleTabSwitch — for PROGRAMMATIC navigation only (AI agent
    // ui_action navigate, internal feature events like medq-start-exam).
    // The sidebar / bottom nav no longer use it: they navigate with plain
    // <Link> elements (real routing). Every branch below is a REAL
    // App-Router navigation via router.push to a refresh-safe URL:
    //   standalone tabs → their real route (/bank, /generate …)
    //   SPA tabs       → the REAL /?tab=<id> URL (this shell renders it)
    // The old raw window.history.pushState('/tutor') wrote client-only
    // URLs that 404'd on refresh — removed (user directive 2026-11-04).
    //
    // Do NOT add standalone tabs to visitedTabs: PersistentTab (mount-gate
    // in ALL_TABS.map below) would transiently mount a hidden in-shell copy
    // before the route transition completes — and whenever a group loader
    // case was missing, that transient mount threw "Unknown tab in group …"
    // (the generate console error of 2026-11-04). Standalone tabs live at
    // their own routes and are deliberately NOT wired in the group loaders
    // (src/components/medq/tabs/*): importing their heavy page subtrees into
    // the / route graph is what OOM-kills the dev compiler on the 4GB box.
    const handleTabSwitch = (tabId)=>{
        if (tabId === 'admin' && (!user || user.role !== 'admin')) return;
        // Save previous tab before switching (for go_back navigation)
        previousTabRef.current = activeTab;
        const goToTab = ()=>{
            router.push((0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .tabHref */ .tW)(tabId));
            if (!_lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .REAL_PAGE_TABS */ .ud[tabId] || tabId === 'revenue') {
                // SPA tab — mount it in-shell (revenue renders inline, not via
                // PersistentTab, but the visitedTabs bookkeeping is harmless).
                setVisitedTabs((prev)=>prev.has(tabId) ? prev : new Set(prev).add(tabId));
            }
            if (true) window.dispatchEvent(new CustomEvent('medq-tab-visible', {
                detail: tabId
            }));
        };
        const category = TAB_TO_CATEGORY[tabId];
        if (category && tier === 'free') {
            if (!canAccess(category)) {
                setShowUpgradeModal(true);
                return;
            }
            if (INTERSTITIAL_ENABLED_TABS.has(tabId)) {
                premiumSwitchCountRef.current += 1;
                if (premiumSwitchCountRef.current % INTERSTITIAL_INTERVAL === 0) {
                    setShowInterstitial(true);
                    setInterstitialCallback(()=>()=>{
                            trackUsage(category);
                            goToTab();
                        });
                    return;
                }
            }
            trackUsage(category);
        }
        goToTab();
    };
    // ─── AI Agent Action Handler ────────────────────────────────────
    const handleAgentAction = (action)=>{
        switch(action.type){
            case 'navigate_to_tab':
                {
                    const tab = action.params.tab;
                    if (tab) handleTabSwitch(tab);
                    break;
                }
            case 'search_content':
                {
                    const query = action.params.query;
                    if (query) {
                        setOpenfdaInitialSearch(action.params.category === 'drugs' ? query : undefined);
                        if (action.params.category === 'drugs') {
                            handleTabSwitch('drug-zoom');
                        } else {
                            setShowGlobalSearch(true);
                            setTimeout(()=>{
                                if (true) {
                                    window.dispatchEvent(new CustomEvent('medq-global-search', {
                                        detail: query
                                    }));
                                }
                            }, 300);
                        }
                    }
                    break;
                }
            case 'generate_questions':
                {
                    const topic = action.params.topic;
                    if (topic) {
                        // Stash BEFORE navigating — the /generate route may take longer than
                        // the 500 ms event delay to mount, so the page drains this on
                        // arrival (src/lib/generate-prefill.ts).
                        (0,_lib_generate_prefill__WEBPACK_IMPORTED_MODULE_26__/* .stageGeneratePrefill */ .Mq)({
                            topic,
                            count: action.params.count || 5,
                            difficulty: action.params.difficulty || 'mixed'
                        });
                        handleTabSwitch('generate');
                        setTimeout(()=>{
                            if (true) {
                                window.dispatchEvent(new CustomEvent('medq-generate-questions', {
                                    detail: {
                                        topic,
                                        count: action.params.count || 5,
                                        difficulty: action.params.difficulty || 'mixed'
                                    }
                                }));
                            }
                        }, 500);
                    }
                    break;
                }
            case 'start_quiz':
                {
                    const mode = action.params.mode;
                    const modeToTab = {
                        'speed-quiz': 'speed-quiz',
                        'daily-challenge': 'challenge',
                        'qotd': 'qotd',
                        'live-battle': 'live-battle',
                        'flashcard-arena': 'flashcards',
                        'exam': 'exams'
                    };
                    const tab = modeToTab[mode] || 'speed-quiz';
                    handleTabSwitch(tab);
                    break;
                }
            case 'look_up_drug':
                {
                    const drugName = action.params.drugName;
                    if (drugName) {
                        setDrugInteractionInitialDrug(drugName);
                        handleTabSwitch('drug-interactions');
                    }
                    break;
                }
            case 'create_flashcard':
                {
                    const topic = action.params.topic;
                    if (topic) {
                        handleTabSwitch('flashcards');
                        setTimeout(()=>{
                            if (true) {
                                window.dispatchEvent(new CustomEvent('medq-create-flashcard', {
                                    detail: {
                                        topic,
                                        count: action.params.count || 10,
                                        style: action.params.style || 'qa'
                                    }
                                }));
                            }
                        }, 500);
                    }
                    break;
                }
            case 'set_study_timer':
                {
                    handleTabSwitch('study-timer');
                    setTimeout(()=>{
                        if (true) {
                            window.dispatchEvent(new CustomEvent('medq-set-timer', {
                                detail: {
                                    minutes: action.params.minutes || 25,
                                    mode: action.params.mode || 'pomodoro'
                                }
                            }));
                        }
                    }, 500);
                    break;
                }
            case 'bookmark_content':
                {
                    // Dispatch bookmark event — tabs can listen for this
                    if (true) {
                        window.dispatchEvent(new CustomEvent('medq-bookmark', {
                            detail: {
                                type: action.params.type,
                                identifier: action.params.identifier
                            }
                        }));
                    }
                    break;
                }
            case 'explain_concept':
                {
                    handleTabSwitch('ai-mode');
                    setTimeout(()=>{
                        if (true) {
                            window.dispatchEvent(new CustomEvent('medq-explain-concept', {
                                detail: {
                                    concept: action.params.concept,
                                    depth: action.params.depth || 'standard'
                                }
                            }));
                        }
                    }, 500);
                    break;
                }
            case 'get_study_plan':
                {
                    handleTabSwitch('planner');
                    setTimeout(()=>{
                        if (true) {
                            window.dispatchEvent(new CustomEvent('medq-study-plan', {
                                detail: {
                                    exam: action.params.exam,
                                    daysLeft: action.params.daysLeft,
                                    focusAreas: action.params.focusAreas
                                }
                            }));
                        }
                    }, 500);
                    break;
                }
            case 'review_weak_areas':
                {
                    handleTabSwitch('weak-areas');
                    break;
                }
            case 'answer_medical_question':
                {
                    break;
                }
            default:
                break;
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const handler = (e)=>{
            setExamId(e.detail);
            handleTabSwitch('take-exam');
        };
        window.addEventListener('medq-start-exam', handler);
        return ()=>window.removeEventListener('medq-start-exam', handler);
    }, []);
    const handleTakeExam = (id)=>{
        setExamId(id);
        handleTabSwitch('take-exam');
    };
    const handleBackFromExam = ()=>{
        setExamId(null);
        handleTabSwitch('exams');
    };
    const getTabProps = (tabId)=>{
        switch(tabId){
            case 'dashboard':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'generate':
                return {
                    onQuestionsGenerated: ()=>{}
                };
            case 'knowledge-map':
                return {
                    onNavigateToBank: ()=>handleTabSwitch('bank')
                };
            case 'exams':
                return {
                    onTakeExam: handleTakeExam
                };
            case 'take-exam':
                return {
                    examId,
                    onBack: handleBackFromExam
                };
            case 'erc':
                return {
                    onWatchAd: ()=>setShowRewardedAd(true)
                };
            case 'advanced-chat':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'chat':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'friends':
                return {
                    onOpenChat: ()=>handleTabSwitch('advanced-chat'),
                    onChallenge: ()=>handleTabSwitch('arena'),
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'groups':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'weak-areas':
                return {
                    onNavigateToTab: (tab, context)=>{
                        if (tab === 'oral-exam' && context?.weakAreasViva) {
                            setTriggerWeakAreasViva(true);
                        }
                        handleTabSwitch(tab);
                    }
                };
            case 'meeting':
                return {
                    initialMeetingId,
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'oral-exam':
                return {
                    triggerWeakAreasViva,
                    clearWeakAreasVivaTrigger: ()=>setTriggerWeakAreasViva(false),
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'advanced-chat':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'whiteboard-studio':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'video-library':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'medicine-prices':
                return {
                    onNavigateToTab: (tab, searchQuery)=>{
                        if (searchQuery && tab === 'openfda-drugs') setOpenfdaInitialSearch(searchQuery);
                        handleTabSwitch(tab);
                    }
                };
            case 'openfda-drugs':
                return {
                    initialSearch: openfdaInitialSearch,
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'drug-zoom':
                return {
                    onNavigateToTab: (tab, searchQuery)=>{
                        if (searchQuery && tab === 'openfda-drugs') setOpenfdaInitialSearch(searchQuery);
                        handleTabSwitch(tab);
                    }
                };
            case 'drug-zoom-labs':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'drug-interactions':
                return {
                    initialDrug: drugInteractionInitialDrug,
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'medication-tables':
                return {
                    onNavigateToTab: (tab, searchQuery)=>{
                        if (searchQuery && tab === 'drug-interactions') setDrugInteractionInitialDrug(searchQuery);
                        handleTabSwitch(tab);
                    }
                };
            case 'performance-coach':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'ai-mode':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'micro-lessons':
                return {
                    onNavigateToTab: (tab, query)=>handleTabSwitch(tab)
                };
            case 'ai-classroom':
                return {};
            case 'decision-tree':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'decision-making-tree':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'guideline-library':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'procedure-player':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'cme-tracker':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            case 'knowledge-gap-analyzer':
                return {
                    onNavigateToTab: (tab)=>handleTabSwitch(tab)
                };
            default:
                return {};
        }
    };
    // Find current tab label for header
    const currentTab = [
        ...ALL_TABS,
        ...SPECIAL_TABS
    ].find((t)=>t.id === activeTab);
    const currentLabel = currentTab?.label || 'MedQ';
    // Update browser title and URL based on current tab
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (typeof document === 'undefined') return;
        const label = currentLabel === 'Home' ? 'MedQ — Medical Question Generator' : `${currentLabel} — MedQ`;
        document.title = label;
    }, [
        currentLabel
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-screen flex flex-col relative medq-app-root overflow-hidden max-w-full",
        style: {
            background: 'var(--medq-bg, #0c0e14)',
            color: 'var(--medq-text, #e8ecf4)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_OfflineIndicator__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_UpgradeModal__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RewardedAd, {
                open: showRewardedAd,
                onClose: ()=>setShowRewardedAd(false),
                onReward: async ()=>{
                    await refresh();
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CreditShop, {
                open: showCreditShop,
                onClose: ()=>setShowCreditShop(false),
                onWatchAd: ()=>{
                    setShowCreditShop(false);
                    setShowRewardedAd(true);
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProfileDialog, {
                open: showProfile,
                onClose: ()=>setShowProfile(false)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsDialog, {
                open: showSettings,
                onClose: ()=>setShowSettings(false)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DeviceSecurityDialog, {
                open: showDeviceSecurity,
                onClose: ()=>setShowDeviceSecurity(false)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GlobalSearch, {
                open: showGlobalSearch,
                onClose: ()=>setShowGlobalSearch(false),
                onNavigateToTab: (tab)=>handleTabSwitch(tab)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes blobFloat { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -30px) scale(1.05); } 66% { transform: translate(-20px, 20px) scale(0.95); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }
        .animate-slide-in { animation: slide-in 0.2s ease-out; }
        .medq-blob-green { background: radial-gradient(circle, #00e5a0, transparent 70%); animation: blobFloat 20s ease-in-out infinite; }
        .medq-blob-red { background: radial-gradient(circle, #ff5757, transparent 70%); animation: blobFloat 25s ease-in-out infinite reverse; }
        .medq-blob-blue { background: radial-gradient(circle, #4fc3f7, transparent 70%); animation: blobFloat 18s ease-in-out infinite 5s; }
      `
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "medq-bg-blob medq-blob-green fixed",
                style: {
                    width: 600,
                    height: 600,
                    top: -200,
                    right: -100,
                    opacity: 0.06
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "medq-bg-blob medq-blob-red fixed",
                style: {
                    width: 500,
                    height: 500,
                    bottom: -150,
                    left: -100,
                    opacity: 0.04
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "medq-bg-blob medq-blob-blue fixed",
                style: {
                    width: 400,
                    height: 400,
                    top: '40%',
                    left: '50%',
                    opacity: 0.03
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative z-10 flex-1 flex h-full overflow-hidden max-w-full",
                children: [
                    !hideSidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_navigation__WEBPACK_IMPORTED_MODULE_2__/* .SidebarNav */ .wZ, {
                        activeTab: activeTab,
                        tier: tier,
                        isOpen: sidebarOpen,
                        onClose: ()=>setSidebarOpen(false)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1 flex flex-col min-w-0 h-full overflow-hidden",
                        children: [
                            activeTab !== 'meeting' && activeTab !== 'advanced-chat' && activeTab !== 'whiteboard-studio' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_header__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                                className: `medq-main-content w-full mx-auto overflow-x-hidden ${activeTab === 'meeting' || activeTab === 'advanced-chat' || activeTab === 'whiteboard-studio' ? 'flex-1 flex flex-col h-full max-w-full px-0 py-0 overflow-hidden' : 'flex-1 overflow-y-auto max-w-[1400px] px-3 py-3 pb-24 lg:pb-3'}`,
                                children: [
                                    adsEnabled && activeTab === 'dashboard' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mb-4",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_BannerAd__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                            placement: "dashboard_top"
                                        })
                                    }),
                                    activeTab === 'pricing' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_PricingInline__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        onUpgrade: async (t)=>{
                                            await fetch('/api/subscription', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    tier: t
                                                })
                                            });
                                            await refresh();
                                        },
                                        tier: tier
                                    }),
                                    activeTab === 'revenue' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RevenueInline, {}),
                                    activeTab === 'admin' && user?.role === 'admin' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PersistentTab, {
                                        tabId: "admin",
                                        active: true
                                    }),
                                    activeTab !== 'pricing' && activeTab !== 'revenue' && activeTab !== 'admin' && ALL_TABS.map((tab)=>{
                                        if (!visitedTabs.has(tab.id)) return null;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PersistentTab, {
                                            tabId: tab.id,
                                            active: activeTab === tab.id,
                                            ...getTabProps(tab.id)
                                        }, tab.id);
                                    }),
                                    adsEnabled && activeTab !== 'dashboard' && activeTab !== 'pricing' && activeTab !== 'revenue' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mt-6",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_BannerAd__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                            placement: "tab_bottom"
                                        })
                                    })
                                ]
                            }),
                            activeTab !== 'meeting' && activeTab !== 'advanced-chat' && activeTab !== 'whiteboard-studio' && (showPomodoro ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "fixed bottom-24 lg:bottom-5 right-4 z-50",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PomodoroTimer, {
                                    onClose: ()=>setShowPomodoro(false)
                                })
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setShowPomodoro(true),
                                className: "fixed bottom-24 lg:bottom-5 right-4 z-50 flex min-h-[44px] min-w-[44px] items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-105 active:scale-95",
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.06)',
                                    color: '#00e5a0'
                                },
                                "aria-label": "Pomodoro Timer",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-semibold hidden sm:inline",
                                        children: "Pomodoro"
                                    })
                                ]
                            })),
                            activeTab !== 'meeting' && activeTab !== 'advanced-chat' && activeTab !== 'whiteboard-studio' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", {
                                className: "hidden lg:block mt-auto border-t border-white/[0.05] py-3",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "max-w-[960px] mx-auto px-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-center gap-2 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] text-[#3a4055]",
                                                    children: "MedQ — Medical Education Platform \xb7 Powered by AI"
                                                }),
                                                tier === 'free' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                    onClick: ()=>setShowUpgradeModal(true),
                                                    className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold transition-all hover:scale-105",
                                                    style: {
                                                        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                                        color: '#000'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_CreditCard_Crown_Loader2_ShieldCheck_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        " Go Premium"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-center gap-3 text-[9px] text-[#3a4055] flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0]"
                                                        }),
                                                        "Study \xb7 Quiz \xb7 Compete"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"
                                                        }),
                                                        "Social \xb7 Groups \xb7 Chat"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-[#f59e0b]"
                                                        }),
                                                        "Earn \xb7 Battle \xb7 Premium"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            !hideSidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_navigation__WEBPACK_IMPORTED_MODULE_2__/* .MobileBottomNav */ .Xb, {
                activeTab: activeTab,
                unreadNotifs: 0,
                items: bottomNavItems,
                onCustomize: openCustomizer
            }),
            customizerOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_navigation__WEBPACK_IMPORTED_MODULE_2__/* .BottomNavCustomizer */ .gV, {
                selectedItems: bottomNavIds,
                onChange: setBottomNavItems,
                onClose: closeCustomizer
            }),
            useV2Agent ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ai_agent_MedQAgentV3__WEBPACK_IMPORTED_MODULE_17__/* .MedQAgentV3 */ .m, {
                onAction: handleAgentAction,
                currentTab: activeTab
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ai_agent_MedQAgentV3__WEBPACK_IMPORTED_MODULE_17__/* .MedQAgentV3 */ .m, {
                onAction: handleAgentAction,
                currentTab: activeTab
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ai_agent_VisualGuidanceOverlay__WEBPACK_IMPORTED_MODULE_18__/* .VisualGuidanceOverlay */ .V, {})
        ]
    });
}
/**
 * The exported component wraps MedQApp in UIStateProvider
 * so that useUIState() works in MedQAgent and all children.
 */ function MedQAppWithProvider() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ai_agent_UIStateContext__WEBPACK_IMPORTED_MODULE_8__/* .UIStateProvider */ .rV, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MedQApp, {})
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MedQAppWithProvider);
/* ── Inline Revenue Tab ── */ function RevenueInline() {
    const [stats, setStats] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        fetch('/api/ads/revenue').then((r)=>r.json()).then((d)=>setStats(d.stats || [])).catch(()=>{});
    }, []);
    const totalRev = stats.reduce((a, s)=>a + (s.totalRevenue || 0), 0);
    const totalImp = stats.reduce((a, s)=>a + (s.adImpressions || 0), 0);
    const totalClk = stats.reduce((a, s)=>a + (s.adClicks || 0), 0);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-lg font-bold mb-4",
                children: "Revenue Dashboard"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-3 gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 bg-[#1a1e2b] rounded-xl border border-white/[0.06] text-center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xl font-bold text-[#00e5a0]",
                                children: [
                                    "$",
                                    totalRev.toFixed(2)
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#5a6478]",
                                children: "Total Revenue"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 bg-[#1a1e2b] rounded-xl border border-white/[0.06] text-center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xl font-bold text-[#4fc3f7]",
                                children: totalImp
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#5a6478]",
                                children: "Ad Impressions"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 bg-[#1a1e2b] rounded-xl border border-white/[0.06] text-center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xl font-bold text-[#f59e0b]",
                                children: totalClk
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#5a6478]",
                                children: "Ad Clicks"
                            })
                        ]
                    })
                ]
            }),
            stats.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs text-[#5a6478] text-center py-8",
                children: "No revenue data yet. Start showing ads to earn!"
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "max-h-64 overflow-y-auto space-y-2",
                children: stats.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between p-3 bg-[#1a1e2b] rounded-lg border border-white/[0.04] text-xs",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[#8b95a8]",
                                children: s.date
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[#4fc3f7]",
                                        children: [
                                            s.adImpressions,
                                            " imp"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[#f59e0b]",
                                        children: [
                                            s.adClicks,
                                            " clk"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[#00e5a0] font-bold",
                                        children: [
                                            "$",
                                            s.totalRevenue?.toFixed(2)
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, s.id))
            })
        ]
    });
}


/***/ }),

/***/ 83207:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ useAgentVersion)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* provided dependency */ var process = __webpack_require__(41463);
/* __next_internal_client_entry_do_not_use__ useAgentVersion auto */ /**
 * Feature flag for switching between MedQAgent v1 and v2.
 *
 * Activation precedence (highest first):
 *   1. localStorage.getItem('medq:useV2Agent') === '1'  (user override)
 *   2. process.env.NEXT_PUBLIC_AGENT_V2 === '1'         (deploy-time flag)
 *   3. default: false (v1 still active)
 *
 * The toggle is also exposed on window for dev console access:
 *   window.__setAgentV2(true)  → forces v2
 *   window.__setAgentV2(false) → forces v1
 *   window.__getAgentV2()      → returns current state
 */ 
const LS_KEY = 'medq:useV2Agent';
// Read env at module load. NEXT_PUBLIC_ prefix ensures it's inlined at build
// time, so this works in the browser bundle.
const ENV_FLAG = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_AGENT_V2 === '1' || false;
function readFlag() {
    if (false) {}
    try {
        const v = window.localStorage.getItem(LS_KEY);
        if (v === '1') return true;
        if (v === '0') return false;
    } catch  {}
    return ENV_FLAG;
}
function useAgentVersion() {
    const [v2, setV2State] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(()=>readFlag());
    // Hydrate from localStorage/env on mount
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const win = window;
        // Expose window globals for dev console
        win.__setAgentV2 = (v)=>{
            try {
                window.localStorage.setItem(LS_KEY, v ? '1' : '0');
            } catch  {}
            setV2State(v);
            // Reload so the new component mounts cleanly
            window.location.reload();
        };
        win.__getAgentV2 = ()=>readFlag();
        // Listen for cross-tab sync
        const onStorage = (e)=>{
            if (e.key === LS_KEY) setV2State(readFlag());
        };
        window.addEventListener('storage', onStorage);
        return ()=>{
            window.removeEventListener('storage', onStorage);
            delete win.__setAgentV2;
            delete win.__getAgentV2;
        };
    }, []);
    const setV2 = (v)=>{
        try {
            window.localStorage.setItem(LS_KEY, v ? '1' : '0');
        } catch  {}
        setV2State(v);
        // Reload to swap component cleanly
        window.location.reload();
    };
    return {
        v2,
        setV2
    };
}


/***/ }),

/***/ 83213:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ BannerAd)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5772);
/* harmony import */ var _barrel_optimize_names_ExternalLink_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_ExternalLink_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1275);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function BannerAd({ placement, onImpression }) {
    const [campaign, setCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [impressionId, setImpressionId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [dismissed, setDismissed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchCampaign = async ()=>{
            try {
                const res = await fetch(`/api/ads/campaigns?placement=${placement}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.campaign) {
                        setCampaign(data.campaign);
                        // Track impression
                        const impRes = await fetch('/api/ads/impression', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                campaignId: data.campaign.id,
                                adType: data.campaign.adType,
                                placement
                            })
                        });
                        if (impRes.ok) {
                            const impData = await impRes.json();
                            setImpressionId(impData.id);
                            onImpression?.(impData.id);
                        }
                    }
                }
            } catch (e) {
                console.error('BannerAd fetch error:', e);
            }
        };
        fetchCampaign();
    }, [
        placement,
        onImpression
    ]);
    const handleClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (impressionId) {
            try {
                await fetch('/api/ads/click', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        impressionId
                    })
                });
            } catch (e) {
                console.error('Ad click track error:', e);
            }
        }
        if (campaign?.targetUrl) {
            window.open(campaign.targetUrl, '_blank', 'noopener');
        }
    }, [
        impressionId,
        campaign
    ]);
    if (!campaign || dismissed) return null;
    const gradients = {
        dashboard_top: 'from-[#1a3a2a] to-[#0d1f17]',
        tab_bottom: 'from-[#1a2a3a] to-[#0d1720]',
        quiz_result: 'from-[#2a1a3a] to-[#170d20]'
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-r ${gradients[placement] || 'from-[#1a2a3a] to-[#0d1720]'} p-4`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                onClick: ()=>setDismissed(true),
                className: "absolute top-2 right-2 text-white/30 hover:text-white/60 transition-colors",
                "aria-label": "Dismiss ad",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-4",
                children: [
                    campaign.imageUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        src: campaign.imageUrl,
                        alt: campaign.title,
                        width: 96,
                        height: 64,
                        unoptimized: true,
                        loading: "lazy",
                        className: "h-12 w-16 flex-shrink-0 rounded-lg object-cover sm:h-16 sm:w-24",
                        onError: (event)=>{
                            event.currentTarget.style.display = 'none';
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[9px] font-bold uppercase tracking-wider text-[#00e5a0]/60",
                                    children: "Sponsored"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold text-[#e8ecf4] truncate",
                                children: campaign.title
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#8b95a8] mt-0.5 truncate",
                                children: campaign.subtitle
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleClick,
                        className: "flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00e5a0] text-[#0c0e14] text-xs font-bold hover:bg-[#00d090] transition-all hover:scale-105 active:scale-95 flex-shrink-0",
                        children: [
                            campaign.ctaText || 'Learn More',
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [18409,68298,27173,2595,31573,53686,98500,57932,52968,81147,99519,2040,2760,57083,97432,10976,62278,13706,10962,80037,13644,45738,21662,52192,28441,93794,77358], () => (__webpack_exec__(32563)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);