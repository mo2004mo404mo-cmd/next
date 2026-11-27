(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[7177],{

/***/ 14730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOSInstallPrompt)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49260);
/* harmony import */ var _barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9005);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * IOSInstallPrompt — shows iOS Safari users instructions for "Add to Home Screen".
 *
 * iOS Safari is the only major browser that does NOT fire `beforeinstallprompt`.
 * Instead we have to detect:
 *   - iOS Safari (iPhone|iPad|iPod, but NOT iPadOS 13+ which reports as Mac)
 *   - Not already in standalone mode (window.navigator.standalone)
 *
 * When both conditions are met, we show a dismissible banner the first time
 * the user logs in. Dismissal is persisted for 30 days in localStorage so
 * we don't nag.
 */ 

const DISMISS_KEY = 'medq-ios-install-dismissed';
const DISMISS_DAYS = 30;
function IOSInstallPrompt() {
    const [shouldShow, setShouldShow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (false) {}
        // Detect iOS Safari (covers iPhone, iPod, and iPad < iOS 13).
        // iPadOS 13+ reports as Macintosh but still has no beforeinstallprompt.
        const ua = window.navigator.userAgent;
        const isIOS = /iPhone|iPad|iPod/.test(ua) || ua.includes('Mac') && 'ontouchend' in document;
        if (!isIOS) return;
        // Already installed (PWA running in standalone mode)?
        const standalone = window.matchMedia('(display-mode: standalone)').matches || // iOS Safari (pre-13) uses navigator.standalone
        window.navigator.standalone === true;
        if (standalone) return;
        // Recently dismissed?
        try {
            const dismissedAt = localStorage.getItem(DISMISS_KEY);
            if (dismissedAt) {
                const ageDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
                if (ageDays < DISMISS_DAYS) return;
            }
        } catch  {
        // localStorage unavailable — proceed to show
        }
        // Only show if user is signed in (avoid showing on landing page)
        // We rely on the absence of an anonymous session cookie — but a simple
        // heuristic is to wait 8 seconds so the auth provider has settled.
        const timer = setTimeout(()=>setShouldShow(true), 8000);
        return ()=>clearTimeout(timer);
    }, []);
    const handleDismiss = ()=>{
        setShouldShow(false);
        try {
            localStorage.setItem(DISMISS_KEY, Date.now().toString());
        } catch  {
        // ignore
        }
    };
    if (!shouldShow) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed bottom-4 left-4 right-4 z-50 bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-2xl p-4 shadow-2xl shadow-black/50 animate-slide-up",
        role: "dialog",
        "aria-labelledby": "ios-install-title",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-start gap-3",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center flex-shrink-0",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                        className: "w-5 h-5 text-[#00e5a0]"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            id: "ios-install-title",
                            className: "text-sm font-bold text-[#e8ecf4]",
                            children: "Install MedQ on your Home Screen"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ol", {
                            className: "text-xs text-[#5a6478] mt-2 space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "font-mono text-[#00e5a0] flex-shrink-0",
                                            children: "1."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                "Tap the ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                                    className: "inline w-3 h-3 mx-0.5 -mt-0.5"
                                                }),
                                                " Share button in Safari's toolbar"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "font-mono text-[#00e5a0] flex-shrink-0",
                                            children: "2."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                "Scroll down and tap ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                                    className: "text-[#e8ecf4]",
                                                    children: "Add to Home Screen"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "font-mono text-[#00e5a0] flex-shrink-0",
                                            children: "3."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                "Tap ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                                    className: "text-[#e8ecf4]",
                                                    children: "Add"
                                                }),
                                                " — you'll get offline access & push notifications"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    onClick: handleDismiss,
                    className: "text-[#5a6478] hover:text-[#e8ecf4] transition-colors p-1 flex-shrink-0",
                    "aria-label": "Dismiss",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        className: "w-4 h-4"
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 31891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InstallPrompt)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49260);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(48203);
/* __next_internal_client_entry_do_not_use__ default auto */ 


const DISMISS_KEY = 'medq-install-prompt-dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;
function isStandalone() {
    if (false) {}
    return window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches || window.navigator.standalone === true;
}
function isIOS() {
    if (false) {}
    const ua = window.navigator.userAgent;
    return /iPad|iPhone|iPod/.test(ua) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}
function getIOSBrowser() {
    if (false) {}
    const ua = navigator.userAgent;
    if (/CriOS/.test(ua)) return 'chrome';
    if (/FxiOS/.test(ua)) return 'firefox';
    if (/Safari/.test(ua) && !/CriOS|FxiOS/.test(ua)) return 'safari';
    return 'other';
}
function wasRecentlyDismissed() {
    if (false) {}
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const timestamp = Number(raw);
    if (!Number.isFinite(timestamp)) {
        localStorage.removeItem(DISMISS_KEY);
        return false;
    }
    if (Date.now() - timestamp < DISMISS_DURATION) {
        return true;
    }
    localStorage.removeItem(DISMISS_KEY);
    return false;
}
function InstallPrompt() {
    const [platform, setPlatform] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('other');
    const [deferredPrompt, setDeferredPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showBanner, setShowBanner] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showIOSModal, setShowIOSModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [dismissed, setDismissed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [installing, setInstalling] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const iosBrowser = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(getIOSBrowser());
    /*
   * Detect the environment immediately.
   */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isStandalone()) {
            setPlatform('installed');
            return;
        }
        if (isIOS()) {
            setPlatform('ios');
        }
    }, []);
    /*
   * Listen for beforeinstallprompt immediately.
   *
   * Important:
   * We don't wait for platform detection because the event
   * can fire before React finishes another effect.
   */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleBeforeInstallPrompt = (event)=>{
            event.preventDefault();
            const installEvent = event;
            setDeferredPrompt(installEvent);
            setPlatform('chromium');
            if (!wasRecentlyDismissed()) {
                setDismissed(false);
            }
        };
        const handleAppInstalled = ()=>{
            setDeferredPrompt(null);
            setShowBanner(false);
            setShowIOSModal(false);
            setPlatform('installed');
            setInstalling(false);
            // Installation succeeded, so an old dismissal is no longer relevant.
            localStorage.removeItem(DISMISS_KEY);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);
        return ()=>{
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);
    /*
   * Load dismissal state.
   */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (wasRecentlyDismissed()) {
            setDismissed(true);
        }
    }, []);
    /*
   * Hide installation UI whenever the app becomes standalone.
   */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (false) {}
        const mediaQuery = window.matchMedia('(display-mode: standalone)');
        const handleDisplayModeChange = ()=>{
            if (isStandalone()) {
                setPlatform('installed');
                setShowBanner(false);
                setShowIOSModal(false);
            }
        };
        mediaQuery.addEventListener?.('change', handleDisplayModeChange);
        return ()=>{
            mediaQuery.removeEventListener?.('change', handleDisplayModeChange);
        };
    }, []);
    /*
   * Chromium:
   *
   * Wait until the user has had time to interact with the app.
   * This is less annoying than immediately showing the banner.
   */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!deferredPrompt || dismissed) return;
        const timer = window.setTimeout(()=>{
            if (!isStandalone()) {
                setShowBanner(true);
            }
        }, 5000);
        return ()=>window.clearTimeout(timer);
    }, [
        deferredPrompt,
        dismissed
    ]);
    /*
   * iOS:
   * Give the user some time before showing installation instructions.
   */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (platform !== 'ios' || dismissed || isStandalone()) {
            return;
        }
        const timer = window.setTimeout(()=>{
            setShowIOSModal(true);
        }, 5000);
        return ()=>window.clearTimeout(timer);
    }, [
        platform,
        dismissed
    ]);
    /*
   * Chromium: auto-dismiss the banner after 7s if the user hasn't
   * interacted — it should never linger over content indefinitely.
   */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!showBanner) return;
        const timer = window.setTimeout(()=>{
            setShowBanner(false);
        }, 7000);
        return ()=>window.clearTimeout(timer);
    }, [
        showBanner
    ]);
    const handleInstall = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!deferredPrompt || installing) return;
        setInstalling(true);
        try {
            await deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === 'accepted') {
                setShowBanner(false);
            }
        } catch  {
        // Native prompt may have been dismissed or become unavailable.
        } finally{
            setDeferredPrompt(null);
            setInstalling(false);
        }
    }, [
        deferredPrompt,
        installing
    ]);
    const handleDismiss = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setShowBanner(false);
        setShowIOSModal(false);
        setDismissed(true);
        localStorage.setItem(DISMISS_KEY, Date.now().toString());
    }, []);
    /*
   * Don't render anything when installation isn't relevant.
   */ if (platform === 'installed' || platform === 'other' || dismissed) {
        return null;
    }
    /*
   * Chromium install banner.
   */ if (platform === 'chromium' && showBanner && deferredPrompt) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "fixed bottom-20 left-4 right-4 sm:bottom-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-2xl p-4 shadow-2xl shadow-black/50 animate-slide-up",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center flex-shrink-0",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                            className: "w-5 h-5 text-[#00e5a0]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold text-[#e8ecf4]",
                                children: "Install MedQ"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478] mt-0.5",
                                children: "Add MedQ to your home screen for faster access."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mt-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: handleInstall,
                                        disabled: installing,
                                        className: "px-4 py-1.5 rounded-lg bg-[#00e5a0] text-[#0c0e14] text-xs font-bold hover:bg-[#00e5a0]/90 disabled:opacity-50 transition-colors",
                                        children: installing ? 'Installing…' : 'Install'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: handleDismiss,
                                        className: "px-3 py-1.5 rounded-lg text-xs text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-colors",
                                        children: "Not now"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleDismiss,
                        className: "text-[#8b95a8] hover:text-[#e8ecf4] transition-colors flex-shrink-0 flex min-h-[44px] min-w-[44px] items-center justify-center -m-2",
                        "aria-label": "Dismiss installation prompt",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    })
                ]
            })
        });
    }
    /*
   * iOS installation instructions.
   */ if (platform === 'ios' && showIOSModal) {
        const browserName = iosBrowser.current === 'chrome' ? 'Chrome' : iosBrowser.current === 'firefox' ? 'Firefox' : 'Safari';
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in",
            onClick: handleDismiss,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "ios-install-title",
                className: "w-full sm:max-w-md bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl",
                onClick: (event)=>event.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-start justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                            className: "w-5 h-5 text-[#00e5a0]"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        id: "ios-install-title",
                                        className: "text-base font-bold text-[#e8ecf4]",
                                        children: "Add MedQ to your Home Screen"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: handleDismiss,
                                className: "text-[#8b95a8] hover:text-[#e8ecf4] transition-colors flex min-h-[44px] min-w-[44px] items-center justify-center",
                                "aria-label": "Close",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                    className: "w-5 h-5"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm text-[#5a6478] mb-5 leading-relaxed",
                        children: [
                            browserName,
                            " on iPhone/iPad doesn't provide the same one-tap installation flow as Chromium browsers. Add MedQ to your Home Screen using the Share menu."
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ol", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center",
                                        children: "1"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-sm text-[#e8ecf4] font-medium",
                                                children: "Tap the Share button"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs text-[#5a6478] mt-0.5",
                                                children: "In your browser's toolbar."
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#00e5a0] mt-1.5"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center",
                                        children: "2"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-sm text-[#e8ecf4] font-medium",
                                                children: 'Select "Add to Home Screen"'
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs text-[#5a6478] mt-0.5",
                                                children: "Scroll through the Share menu if necessary."
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#00e5a0] mt-1.5"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center",
                                        children: "3"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-sm text-[#e8ecf4] font-medium",
                                                children: 'Tap "Add"'
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs text-[#5a6478] mt-0.5",
                                                children: "Launch MedQ from your Home Screen for the installed app experience."
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleDismiss,
                        className: "w-full mt-6 px-4 py-2.5 rounded-xl bg-[#00e5a0] text-[#0c0e14] text-sm font-bold hover:bg-[#00e5a0]/90 transition-colors",
                        children: "Got it"
                    })
                ]
            })
        });
    }
    return null;
}


/***/ }),

/***/ 43385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ useTheme),
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ ThemeProvider,useTheme auto */ 

const ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('system');
    const [systemTheme, setSystemTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('dark');
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    // Hydrate from localStorage after mount (avoids SSR mismatch)
    /* eslint-disable react-hooks/set-state-in-effect -- Hydration from localStorage must happen in effect */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const stored = localStorage.getItem('theme');
        if (stored && [
            'light',
            'dark',
            'system'
        ].includes(stored)) {
            setThemeState(stored);
        } else {
            // No stored preference → default to dark (matches layout.tsx's html className="dark")
            // so the user's first paint is the polished dark theme.
            setThemeState('dark');
        }
        setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */ // Apply theme to document
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const root = document.documentElement;
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [
        resolvedTheme
    ]);
    // Listen to system theme changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = ()=>{
            setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, []);
    // Save theme to localStorage
    const handleSetTheme = (newTheme)=>{
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ThemeContext.Provider, {
        value: {
            theme,
            setTheme: handleSetTheme,
            resolvedTheme
        },
        children: children
    });
}
function useTheme() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}


/***/ }),

/***/ 51743:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 95708:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 84507));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 60421, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 79695, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 51743, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 76277));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 31891));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 14730));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 43385));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [10293,73334,52524,2760,1698,76277,28441,93794,77358], () => (__webpack_exec__(95708)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);