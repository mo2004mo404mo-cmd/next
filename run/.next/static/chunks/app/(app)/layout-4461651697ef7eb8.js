(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[4944],{

/***/ 26883:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AppShellLayout */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37206);
/* harmony import */ var _components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10244);
/* harmony import */ var _components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27436);
/* harmony import */ var _components_ui_sonner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25044);
/* harmony import */ var _components_medq_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(79379);
/* harmony import */ var _components_medq_header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(38463);
/* harmony import */ var _components_medq_OfflineIndicator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(66284);
/* harmony import */ var _components_medq_UpgradeModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64012);
/* harmony import */ var _lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(83557);
/* harmony import */ var _lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(26846);
/* harmony import */ var _lib_utils_app_events__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(57434);
/* harmony import */ var _barrel_optimize_names_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(28342);
/* __next_internal_client_entry_do_not_use__ AppShellLayout,default auto */ 
/**
 * AppShellLayout — the MedQ application shell as a REAL App Router layout.
 *
 * Why this exists (user feedback 2026-11-04): clicking a sidebar tab with a
 * standalone page (Bank, Generate, Flashcards, …) used to land on a page
 * that rendered WITHOUT the sidebar/header — a dead end where the only way
 * out was the browser Back button. The shell chrome lived inside the SPA
 * root only.
 *
 * This component is rendered by src/app/(app)/layout.tsx for every route in
 * the (app) route group. Because App Router layouts PERSIST across route
 * changes within the same layout, the sidebar, header, dialogs and bottom
 * nav stay mounted while the user moves between /bank → /generate → /home —
 * no remount, no state loss, no Back-button dead ends.
 *
 * Contents (mirrors the SPA shell's chrome in MedQAppShell.tsx):
 *   - background blobs + OfflineIndicator
 *   - SidebarNav (desktop + mobile drawer)
 *   - Header (top bar: credits, theme, search, notifications, user menu)
 *   - shared dialogs (profile / settings / global search / credit shop /
 *     upgrade modal / rewarded ad) — opened via `medq-header-action` events
 *   - Pomodoro floating button + desktop footer
 *   - MobileBottomNav + customizer
 *   - {children} renders the page; {modal} renders the @modal parallel slot
 *     (used by intercepting routes, e.g. the bank question detail modal).
 */ 













// Heavy dialogs are lazy-loaded so the layout's initial chunk stays small.
const PomodoroTimer = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>__webpack_require__.e(/* import() */ 19672).then(__webpack_require__.bind(__webpack_require__, 19672)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(19672)
            ]
    },
    ssr: false
});
const RewardedAd = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>__webpack_require__.e(/* import() */ 65161).then(__webpack_require__.bind(__webpack_require__, 65161)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(65161)
            ]
    },
    ssr: false
});
const CreditShop = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(36127), __webpack_require__.e(13745)]).then(__webpack_require__.bind(__webpack_require__, 36127)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(36127)
            ]
    },
    ssr: false
});
const ProfileDialog = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(33697), __webpack_require__.e(43342), __webpack_require__.e(40379), __webpack_require__.e(47775)]).then(__webpack_require__.bind(__webpack_require__, 47775)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(47775)
            ]
    },
    ssr: false
});
const SettingsDialog = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(33697), __webpack_require__.e(43342), __webpack_require__.e(40379), __webpack_require__.e(59644), __webpack_require__.e(10885), __webpack_require__.e(42998), __webpack_require__.e(33257), __webpack_require__.e(55331), __webpack_require__.e(34364)]).then(__webpack_require__.bind(__webpack_require__, 9127)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(9127)
            ]
    },
    ssr: false
});
const DeviceSecurityDialog = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(43342), __webpack_require__.e(40184), __webpack_require__.e(21181)]).then(__webpack_require__.bind(__webpack_require__, 40184)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(40184)
            ]
    },
    ssr: false
});
const GlobalSearch = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(64673), __webpack_require__.e(99716)]).then(__webpack_require__.bind(__webpack_require__, 64673)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(64673)
            ]
    },
    ssr: false
});
/*
 * The MedQ AI assistant — same MedQAgentV3 the SPA shell mounts at "/",
 * hosted here so it is present on EVERY (app) route (user feedback
 * 2026-11-04: "medq assistant present only in /"). Lazy-loaded like the
 * other heavy chrome pieces. AppShellAgent also bridges the agent event
 * bus (medq-agent-navigate …) to real App Router navigation.
 */ const AppShellAgent = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(52968), __webpack_require__.e(99519), __webpack_require__.e(57083), __webpack_require__.e(97432), __webpack_require__.e(10976), __webpack_require__.e(10962), __webpack_require__.e(80037), __webpack_require__.e(13644), __webpack_require__.e(95284)]).then(__webpack_require__.bind(__webpack_require__, 95284)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(95284)
            ]
    },
    ssr: false
});
/*
 * SW registration + device-session tracking used to live only in AppEntry
 * ("/"). Now that "/" redirects to /home, landing directly on any real
 * route would never register the service worker — breaking offline study
 * and web push. Mount both here so every (app) route registers them.
 * (Neither reloads on ordinary navigation; the registrar only reloads when
 * a NEW service worker activates — once per deploy, by design.)
 */ const ServiceWorkerRegistrar = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>__webpack_require__.e(/* import() */ 52192).then(__webpack_require__.bind(__webpack_require__, 52192)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(52192)
            ]
    },
    ssr: false
});
const DeviceSessionTracker = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(()=>__webpack_require__.e(/* import() */ 21662).then(__webpack_require__.bind(__webpack_require__, 21662)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(21662)
            ]
    },
    ssr: false
});
function AppShellChrome({ children, modal }) {
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { tier } = (0,_components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_4__/* .useSubscription */ .R)();
    /*
   * App Router is the source of truth for the active navigation tab
   * (e.g. /bank → 'bank', /messages → 'advanced-chat'). The sidebar and
   * bottom nav navigate with plain <Link> elements — real routing, no
   * click interception — and this URL-derived activeTab drives highlighting.
   */ const activeTab = (0,_lib_medq_routing__WEBPACK_IMPORTED_MODULE_11__/* .pathToTab */ .cM)(pathname || '/');
    /*
   * Fullscreen routes intentionally hide the shell chrome.
   */ const hideSidebar = activeTab === 'meeting' || activeTab === 'advanced-chat' || activeTab === 'whiteboard-studio';
    const { items: bottomNavItems, itemIds: bottomNavIds, setItems: setBottomNavItems, customizerOpen, openCustomizer, closeCustomizer } = (0,_components_medq_navigation__WEBPACK_IMPORTED_MODULE_7__/* .useBottomNav */ .MN)();
    // ── Shell-owned dialog state (opened by Header via medq-header-action) ──
    const [sidebarOpen, setSidebarOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showProfile, setShowProfile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showSettings, setShowSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showDeviceSecurity, setShowDeviceSecurity] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showGlobalSearch, setShowGlobalSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showCreditShop, setShowCreditShop] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showRewardedAd, setShowRewardedAd] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showPomodoro, setShowPomodoro] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Allow deeply-nested children to ask the layout to open the app-wide
    // SettingsDialog (same pattern as the SPA shell).
    (0,_lib_utils_app_events__WEBPACK_IMPORTED_MODULE_13__/* .useAppSettingsOpener */ .TR)((_section)=>{
        setShowSettings(true);
    });
    // Header dispatches medq-header-action; the shell owns the dialogs those
    // actions open. (Same event contract as the SPA shell — header.tsx works
    // unchanged in both shells.)
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleHeaderAction = (event)=>{
            const { action } = event.detail || {};
            switch(action){
                case 'profile':
                    setShowProfile(true);
                    break;
                case 'settings':
                    setShowSettings(true);
                    break;
                case 'pricing':
                    (0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .navigateToTab */ .s2)((p)=>router.push(p), 'pricing');
                    break;
                case 'device-security':
                    setShowDeviceSecurity(true);
                    break;
                case 'sidebar':
                    setSidebarOpen(true);
                    break;
                case 'search':
                    setShowGlobalSearch(true);
                    break;
                case 'credit-shop':
                    setShowCreditShop(true);
                    break;
                case 'rewarded-ad':
                    setShowRewardedAd(true);
                    break;
            }
        };
        window.addEventListener('medq-header-action', handleHeaderAction);
        return ()=>window.removeEventListener('medq-header-action', handleHeaderAction);
    }, [
        router
    ]);
    // Ctrl/Cmd+K → global search (parity with the SPA shell).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handler = (e)=>{
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setShowGlobalSearch(true);
            }
        };
        window.addEventListener('keydown', handler);
        return ()=>window.removeEventListener('keydown', handler);
    }, []);
    // The AI assistant (AppShellAgent) asks the chrome to open the Pomodoro
    // timer via this event — same contract as the SPA shell's actionId handler.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const openPomodoro = ()=>setShowPomodoro(true);
        window.addEventListener('medq-open-pomodoro', openPomodoro);
        return ()=>window.removeEventListener('medq-open-pomodoro', openPomodoro);
    }, []);
    /* Navigation note: the sidebar/bottom-nav navigate with plain <Link>
   * elements (real App-Router routing, no click interception). Only the
   * GlobalSearch and header actions navigate programmatically via
   * router.push — also real routing; the (app) layout persists across it. */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-screen flex flex-col relative medq-app-root overflow-hidden max-w-full",
        style: {
            background: 'var(--medq-bg, #0c0e14)',
            color: 'var(--medq-text, #e8ecf4)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_OfflineIndicator__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_UpgradeModal__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RewardedAd, {
                open: showRewardedAd,
                onClose: ()=>setShowRewardedAd(false)
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
                onNavigateToTab: (tab)=>(0,_lib_medq_nav__WEBPACK_IMPORTED_MODULE_12__/* .navigateToTab */ .s2)((p)=>router.push(p), tab)
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
                    !hideSidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_navigation__WEBPACK_IMPORTED_MODULE_7__/* .SidebarNav */ .wZ, {
                        activeTab: activeTab,
                        tier: tier,
                        isOpen: sidebarOpen,
                        onClose: ()=>setSidebarOpen(false)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1 flex flex-col min-w-0 h-full overflow-hidden",
                        children: [
                            !hideSidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_header__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
                                className: `medq-main-content w-full mx-auto overflow-x-hidden ${hideSidebar ? 'flex-1 flex flex-col h-full max-w-full px-0 py-0 overflow-hidden' : 'flex-1 overflow-y-auto max-w-[1400px] px-3 py-3 pb-24 lg:pb-3'}`,
                                children: children
                            }),
                            !hideSidebar && (showPomodoro ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
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
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Timer_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-semibold hidden sm:inline",
                                        children: "Pomodoro"
                                    })
                                ]
                            })),
                            !hideSidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", {
                                className: "hidden lg:block mt-auto border-t border-white/[0.05] py-3",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "max-w-[960px] mx-auto px-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex items-center justify-center gap-2 mb-1",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] text-[#3a4055]",
                                                children: "MedQ — Medical Education Platform \xb7 Powered by AI"
                                            })
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
            !hideSidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_navigation__WEBPACK_IMPORTED_MODULE_7__/* .MobileBottomNav */ .Xb, {
                activeTab: activeTab,
                unreadNotifs: 0,
                items: bottomNavItems,
                onCustomize: openCustomizer
            }),
            customizerOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_navigation__WEBPACK_IMPORTED_MODULE_7__/* .BottomNavCustomizer */ .gV, {
                selectedItems: bottomNavIds,
                onChange: setBottomNavItems,
                onClose: closeCustomizer
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AppShellAgent, {
                currentTab: String(activeTab)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ServiceWorkerRegistrar, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DeviceSessionTracker, {}),
            modal
        ]
    });
}
/**
 * Exported wrapper — mounts the providers the chrome needs
 * (SubscriptionContext for tier gating, SettingsContext for the header,
 * Toaster for page-level toasts) so every (app) page has them available.
 */ function AppShellLayout({ children, modal }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_SubscriptionContext__WEBPACK_IMPORTED_MODULE_4__/* .SubscriptionProvider */ .d, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_5__.SettingsProvider, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(AppShellChrome, {
                    children: [
                        children,
                        modal
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_sonner__WEBPACK_IMPORTED_MODULE_6__/* .Toaster */ .l, {})
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppShellLayout);


/***/ }),

/***/ 36203:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 26883));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [18409,68298,27173,2595,31573,53686,98500,57932,81147,2040,2760,62278,13706,45738,28441,93794,77358], () => (__webpack_exec__(36203)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);