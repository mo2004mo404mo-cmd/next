exports.id = 1068;
exports.ids = [1068];
exports.modules = {

/***/ 26960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOSInstallPrompt)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(569473);
/* harmony import */ var _barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(279058);
/* harmony import */ var _barrel_optimize_names_Plus_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(645535);
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
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (true) return;
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

/***/ 58142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"/workspaces/next/run/src/components/medq/IOSInstallPrompt.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/components/medq/IOSInstallPrompt.tsx",
"default",
));


/***/ }),

/***/ 107380:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 521445));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 412789));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 225329));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 58142));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 522719));


/***/ }),

/***/ 169241:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 423318, 23));


/***/ }),

/***/ 180702:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 199083:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 847613));


/***/ }),

/***/ 213903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ initialsOf),
/* harmony export */   o: () => (/* binding */ formatCallDuration)
/* harmony export */ });
/**
 * Shared types for the global call system (CallProvider + MiroTalkCall +
 * IncomingCallModal + MinimizedCallBar).
 */ /** mm:ss (or h:mm:ss for long calls) — used by the timer chips. */ function formatCallDuration(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${m}:${String(sec).padStart(2, '0')}`;
}
/** Initials for avatar circles ("Dr. Sarah Chen" → "SC"). */ function initialsOf(name) {
    const parts = String(name ?? '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}


/***/ }),

/***/ 225329:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"/workspaces/next/run/src/components/medq/InstallPrompt.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/components/medq/InstallPrompt.tsx",
"default",
));


/***/ }),

/***/ 246621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ IncomingCallModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(457974);
/* harmony import */ var _barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(312535);
/* harmony import */ var _barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(980859);
/* harmony import */ var _barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(948581);
/* harmony import */ var _barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(732438);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(213903);
/* __next_internal_client_entry_do_not_use__ IncomingCallModal auto */ 
/**
 * IncomingCallModal — the full-screen ringer shown anywhere in the app when
 * someone calls (the CallProvider listens app-wide, so this rings on the
 * dashboard, in study modules, on the messages page — everywhere).
 *
 * FaceTime/WhatsApp-style: pulsing avatar with concentric ripple rings,
 * caller name, call type, big round Accept (green) / Decline (red) buttons,
 * and a subtle countdown to the auto "missed" timeout.
 */ 


const RING_TIMEOUT_SECONDS = 45;
function IncomingCallModal({ incoming, onAccept, onDecline }) {
    const [elapsed, setElapsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const t = setInterval(()=>setElapsed(Math.floor((Date.now() - incoming.receivedAt) / 1000)), 1000);
        return ()=>clearInterval(t);
    }, [
        incoming.receivedAt
    ]);
    const remaining = Math.max(0, RING_TIMEOUT_SECONDS - elapsed);
    const pct = remaining / RING_TIMEOUT_SECONDS * 100;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-[500] flex items-center justify-center p-4",
        style: {
            background: 'radial-gradient(1200px 800px at 50% 20%, rgba(0,60,45,0.55), rgba(3,8,16,0.92) 70%)',
            backdropFilter: 'blur(10px)'
        },
        role: "alert",
        "aria-live": "assertive",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative w-full max-w-sm rounded-3xl px-6 py-10 flex flex-col items-center text-center",
                style: {
                    background: 'linear-gradient(180deg, rgba(18,26,44,0.92), rgba(10,15,28,0.96))',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 40px 120px rgba(0,0,0,0.65)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative flex items-center justify-center mb-6",
                        style: {
                            width: 132,
                            height: 132
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "incoming-ring-ring",
                                style: {
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(0,229,160,0.35)',
                                    animation: 'call-ripple 2.2s ease-out infinite'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(0,229,160,0.25)',
                                    animation: 'call-ripple 2.2s ease-out 0.7s infinite'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(0,229,160,0.15)',
                                    animation: 'call-ripple 2.2s ease-out 1.4s infinite'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center justify-center select-none",
                                style: {
                                    width: 108,
                                    height: 108,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #00e5a0 0%, #0a8f6b 100%)',
                                    color: '#04121a',
                                    fontSize: 34,
                                    fontWeight: 700,
                                    boxShadow: '0 12px 40px rgba(0,229,160,0.35)'
                                },
                                children: (0,_types__WEBPACK_IMPORTED_MODULE_2__/* .initialsOf */ .b)(incoming.callerName)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-[22px] font-semibold text-[#e8ecf4] leading-tight max-w-full truncate",
                        children: incoming.callerName || 'Someone'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "mt-1.5 text-[13px] text-[#8b94a8] flex items-center gap-1.5",
                        children: [
                            incoming.callType === 'video' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Incoming ",
                            incoming.callType,
                            " call",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "incoming-dots",
                                style: {
                                    letterSpacing: 2,
                                    animation: 'incoming-pulse-dots 1.4s infinite'
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-5 w-40 h-1 rounded-full overflow-hidden",
                        style: {
                            background: 'rgba(255,255,255,0.08)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full rounded-full transition-all duration-1000 ease-linear",
                            style: {
                                width: `${pct}%`,
                                background: 'linear-gradient(90deg, #00e5a0, rgba(0,229,160,0.5))'
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "mt-1.5 text-[10px] text-[#5a6478]",
                        children: [
                            "answering in ",
                            remaining,
                            "s"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-8 flex items-center gap-14",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onDecline,
                                className: "group flex flex-col items-center gap-2 outline-none",
                                "aria-label": "Decline call",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex items-center justify-center rounded-full transition-transform group-hover:scale-110 group-active:scale-95",
                                        style: {
                                            width: 64,
                                            height: 64,
                                            background: 'linear-gradient(135deg, #ff5757, #c62828)',
                                            boxShadow: '0 10px 30px rgba(255,87,87,0.4)'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-7 h-7 text-white"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[11px] font-medium text-[#8b94a8]",
                                        children: "Decline"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onAccept,
                                className: "group flex flex-col items-center gap-2 outline-none",
                                "aria-label": "Accept call",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex items-center justify-center rounded-full transition-transform group-hover:scale-110 group-active:scale-95",
                                        style: {
                                            width: 72,
                                            height: 72,
                                            background: 'linear-gradient(135deg, #00e5a0, #00a37a)',
                                            boxShadow: '0 12px 36px rgba(0,229,160,0.5)',
                                            animation: 'incoming-accept-pulse 1.6s ease-in-out infinite'
                                        },
                                        children: incoming.callType === 'video' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                            className: "w-8 h-8 text-[#04121a]"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                            className: "w-8 h-8 text-[#04121a]"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[11px] font-medium text-[#00e5a0]",
                                        children: "Accept"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-8 flex items-center gap-4 text-[#5a6478]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-1 text-[10px]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    " End-to-end option"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-1 text-[10px]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Phone_PhoneOff_ShieldCheck_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    " Ringing…"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes call-ripple {
          0%   { transform: scale(1);   opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes incoming-accept-pulse {
          0%, 100% { box-shadow: 0 12px 36px rgba(0,229,160,0.45); }
          50%      { box-shadow: 0 12px 52px rgba(0,229,160,0.8); }
        }
        @keyframes incoming-pulse-dots {
          0%, 20% { opacity: 0.2; }
          50%     { opacity: 1; }
          80%, 100% { opacity: 0.2; }
        }
      `
                }
            })
        ]
    });
}


/***/ }),

/***/ 280347:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ MinimizedCallBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(457974);
/* harmony import */ var _barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(312535);
/* harmony import */ var _barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24422);
/* harmony import */ var _barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(980859);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(213903);
/* __next_internal_client_entry_do_not_use__ MinimizedCallBar auto */ 
/**
 * MinimizedCallBar — the floating pill shown when a call is minimized so the
 * user can keep browsing/using the app while on the call (like WhatsApp /
 * Meet picture-in-picture). Shows peer, live timer and phase, plus expand
 * (back to full call UI) and end buttons.
 */ 


function MinimizedCallBar({ call, onExpand, onEnd }) {
    const [now, setNow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Date.now());
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const t = setInterval(()=>setNow(Date.now()), 1000);
        return ()=>clearInterval(t);
    }, []);
    const reference = call.connectedAt ?? call.startedAt;
    const duration = call.phase === 'connected' ? Math.floor((now - reference) / 1000) : 0;
    const ringing = call.phase === 'ringing' || call.phase === 'connecting';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed z-[290] flex items-center gap-3 rounded-full pl-3 pr-2 py-2 select-none",
        style: {
            right: 20,
            bottom: 20,
            background: 'linear-gradient(135deg, rgba(16,22,38,0.97), rgba(10,15,28,0.97))',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative flex items-center justify-center shrink-0",
                style: {
                    width: 34,
                    height: 34
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center justify-center font-bold",
                        style: {
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00e5a0, #0a8f6b)',
                            color: '#04121a',
                            fontSize: 12
                        },
                        children: (0,_types__WEBPACK_IMPORTED_MODULE_2__/* .initialsOf */ .b)(call.peerName)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "absolute rounded-full",
                        style: {
                            width: 10,
                            height: 10,
                            right: -1,
                            bottom: -1,
                            background: ringing ? '#ffb020' : '#00e5a0',
                            border: '2px solid #0a0f1c',
                            animation: ringing ? 'minimized-pulse 1.2s ease-in-out infinite' : 'none'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "min-w-0",
                style: {
                    maxWidth: 160
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[12px] font-semibold text-[#e8ecf4] truncate leading-tight",
                        children: call.peerName || call.roomName || 'Call'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-[10px] leading-tight flex items-center gap-1",
                        style: {
                            color: ringing ? '#ffb020' : '#00e5a0'
                        },
                        children: [
                            call.callType === 'video' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                className: "w-2.5 h-2.5"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-2.5 h-2.5"
                            }),
                            call.phase === 'connected' ? (0,_types__WEBPACK_IMPORTED_MODULE_2__/* .formatCallDuration */ .o)(duration) : call.phase === 'ringing' ? call.role === 'caller' ? 'Ringing…' : 'Incoming…' : 'Connecting…'
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                onClick: onExpand,
                className: "flex items-center justify-center rounded-full transition-colors hover:bg-white/10",
                style: {
                    width: 32,
                    height: 32,
                    color: '#e8ecf4'
                },
                title: "Back to call",
                "aria-label": "Back to call",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                    className: "w-4 h-4"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                onClick: onEnd,
                className: "flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95",
                style: {
                    width: 32,
                    height: 32,
                    background: 'linear-gradient(135deg, #ff5757, #c62828)',
                    color: 'white'
                },
                title: "End call",
                "aria-label": "End call",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Maximize2_Phone_PhoneOff_Video_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "w-4 h-4"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes minimized-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `
                }
            })
        ]
    });
}


/***/ }),

/***/ 295909:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ useTheme),
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ ThemeProvider,useTheme auto */ 

const ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('system');
    const [systemTheme, setSystemTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('dark');
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    // Hydrate from localStorage after mount (avoids SSR mismatch)
    /* eslint-disable react-hooks/set-state-in-effect -- Hydration from localStorage must happen in effect */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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

/***/ 305689:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 502116, 23));


/***/ }),

/***/ 308979:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(963059);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);

// src/app/not-found.tsx — Next.js App Router root 404 page.
//
// Rendered automatically by Next.js when:
//   1. A user navigates to a URL that doesn't match any route in src/app/,
//      AND the next.config.ts `fallback` rewrite doesn't catch it.
//   2. A notFound() function is called from any server component / route handler.
//
// WITHOUT this file, Next.js renders its default 404 page (a plain white page
// with "404: This page could not be found." text) — which breaks the dark
// theme of MedQ and offers no path forward for the user.
//
// IMPORTANT NOTES ON THE CATCH-ALL REWRITE:
//   next.config.ts has a `fallback` rewrite that sends almost every unknown
//   path to '/' (the SPA shell). So in practice, MOST unknown URLs go to the
//   SPA, not to this file. This file only fires for:
//     - Paths explicitly excluded from the fallback regex (api, _next,
//       classroom, openmaic-generation-preview, offline, favicon, icon,
//       apple-icon, manifest, sw, robots, sitemap, openmaic, logo-horizontal)
//       that don't actually have a matching file.
//     - Routes where a server component explicitly calls notFound().
//
//   That's still a meaningful improvement over the default Next.js 404 page
//   — and when the SPA eventually migrates to real App Router routes, this
//   file will automatically become the fallback for all of them.
//
//   Server component (no 'use client') so it can be statically rendered
//   and cached at the edge. The only interactivity is a plain <a> link,
//   which works without JS enabled.

function NotFound() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--medq-bg-deep, #0a0e1a)',
            color: 'var(--medq-text, #e8ecf4)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            flexDirection: 'column',
            gap: 20,
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: 'rgba(0, 229, 160, 0.08)',
                    border: '1px solid rgba(0, 229, 160, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                    width: "36",
                    height: "36",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "var(--medq-accent, #00e5a0)",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                            cx: "11",
                            cy: "11",
                            r: "8"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                            x1: "21",
                            y1: "21",
                            x2: "16.65",
                            y2: "16.65"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 64,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--medq-accent, #00e5a0)',
                    lineHeight: 1
                },
                children: "404"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 18,
                    fontWeight: 700
                },
                children: "Page not found"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 14,
                    color: 'var(--medq-text-muted, #8b95a8)',
                    textAlign: 'center',
                    maxWidth: 420,
                    lineHeight: 1.5
                },
                children: "The page you're looking for doesn't exist or may have been moved. Head back to MedQ to continue studying."
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/",
                style: {
                    marginTop: 8,
                    background: 'var(--medq-accent, #00e5a0)',
                    color: '#0c0e14',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                    display: 'inline-block'
                },
                children: "Back to MedQ"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    fontSize: 12,
                    color: 'var(--medq-text-faint, #5a6478)',
                    marginTop: 12
                },
                children: "Tip: use the search bar at the top of MedQ to find what you need."
            })
        ]
    });
}


/***/ }),

/***/ 375107:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 856771));


/***/ }),

/***/ 376537:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RootLayout),
/* harmony export */   metadata: () => (/* binding */ metadata),
/* harmony export */   viewport: () => (/* binding */ viewport)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(302202);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(564988);
/* harmony import */ var next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(461135);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_medq_InstallPrompt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(225329);
/* harmony import */ var _components_medq_IOSInstallPrompt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58142);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(521445);
/* harmony import */ var _lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(522719);
/* harmony import */ var _components_medq_calls_CallProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(412789);









const viewport = {
    themeColor: "#00e5a0",
    width: "device-width",
    initialScale: 1
};
const metadata = {
    title: "MedQ — Medical Question Generator",
    description: "Generate visually rich, exam-ready medical questions powered by AI",
    manifest: "/manifest.json",
    icons: {
        icon: [
            {
                url: "/favicon.ico",
                sizes: "32x32"
            },
            {
                url: "/icon.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
        apple: [
            {
                url: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png"
            }
        ]
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "MedQ"
    }
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("html", {
        lang: "en",
        className: "dark",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("head", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-icon",
                        href: "/apple-icon.png",
                        sizes: "180x180"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-icon",
                        href: "/apple-icon-120.png",
                        sizes: "120x120"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-icon",
                        href: "/apple-icon-152.png",
                        sizes: "152x152"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-icon",
                        href: "/apple-icon-167.png",
                        sizes: "167x167"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "mobile-web-app-capable",
                        content: "yes"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "black-translucent"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                        name: "apple-mobile-web-app-title",
                        content: "MedQ"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("script", {
                        src: "/scripts/theme-init.js"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                        dangerouslySetInnerHTML: {
                            __html: `
          :root:not(.dark) {
            --medq-bg: #f5f7fb;
            --medq-bg-deep: #eef1f6;
            --medq-surface: #ffffff;
            --medq-surface-2: #f8fafc;
            --medq-surface-3: #eef2f7;
            --medq-card-bg: #ffffff;
            --medq-card-border: rgba(15, 23, 42, 0.08);
            --medq-border: rgba(15, 23, 42, 0.08);
            --medq-border-strong: rgba(15, 23, 42, 0.14);
            --medq-text: #0f172a;
            --medq-text-2: #1e293b;
            --medq-text-muted: #64748b;
            --medq-text-faint: #94a3b8;
            --medq-accent: #00b27e;
            --medq-accent-2: #0284c7;
            --medq-header-bg: rgba(255, 255, 255, 0.92);
            --medq-shadow: 0 4px 24px rgba(15, 23, 42, 0.06);
            --medq-shadow-lg: 0 12px 48px rgba(15, 23, 42, 0.12);
          }
          :root.dark, :root {
            /* Dark defaults — also apply to bare :root so that if .dark
               is removed by the no-flash script but the CSS file hasn't
               loaded yet, we still have dark values (better than no values).
               The :root:not(.dark) block above overrides these for light. */
            --medq-bg: #0c0e14;
            --medq-bg-deep: #0a0e1a;
            --medq-surface: #1a1e2b;
            --medq-surface-2: #151821;
            --medq-surface-3: #1e2130;
            --medq-card-bg: #151821;
            --medq-card-border: rgba(255, 255, 255, 0.06);
            --medq-border: rgba(255, 255, 255, 0.06);
            --medq-border-strong: rgba(255, 255, 255, 0.1);
            --medq-text: #e8ecf4;
            --medq-text-2: #c8d0e0;
            --medq-text-muted: #8b95a8;
            --medq-text-faint: #5a6478;
            --medq-accent: #00e5a0;
            --medq-accent-2: #0ea5e9;
            --medq-header-bg: rgba(12, 14, 20, 0.92);
            --medq-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
            --medq-shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.6);
          }
          /* Light-mode body bg override — beats the inline style on <body> */
          :root:not(.dark) body {
            background: #f5f7fb !important;
            color: #0f172a !important;
          }
        `
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-startup-image",
                        href: "/splash/apple-splash-2048x2732.png",
                        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-startup-image",
                        href: "/splash/apple-splash-1668x2388.png",
                        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-startup-image",
                        href: "/splash/apple-splash-1170x2532.png",
                        media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-startup-image",
                        href: "/splash/apple-splash-1125x2436.png",
                        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-startup-image",
                        href: "/splash/apple-splash-828x1792.png",
                        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "apple-touch-startup-image",
                        href: "/splash/apple-splash-750x1334.png",
                        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("script", {
                        src: "/scripts/resilience.js"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("body", {
                className: `${(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_arguments_variable_font_geist_sans_subsets_latin_variableName_geistSans___WEBPACK_IMPORTED_MODULE_7___default().variable)} ${(next_font_google_target_css_path_src_app_layout_tsx_import_Geist_Mono_arguments_variable_font_geist_mono_subsets_latin_variableName_geistMono___WEBPACK_IMPORTED_MODULE_8___default().variable)} antialiased`,
                style: {
                    background: 'var(--medq-bg, #0c0e14)',
                    color: 'var(--medq-text, #e8ecf4)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_auth_react__WEBPACK_IMPORTED_MODULE_4__.SessionProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_medq_calls_CallProvider__WEBPACK_IMPORTED_MODULE_6__.CallProvider, {
                            children: [
                                children,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_InstallPrompt__WEBPACK_IMPORTED_MODULE_2__["default"], {}),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_IOSInstallPrompt__WEBPACK_IMPORTED_MODULE_3__["default"], {})
                            ]
                        })
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 412789:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CallProvider: () => (/* binding */ CallProvider)
/* harmony export */ });
/* unused harmony export useCall */
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

const useCall = (0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call useCall() from the server but useCall is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/components/medq/calls/CallProvider.tsx",
"useCall",
);const CallProvider = (0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call CallProvider() from the server but CallProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/components/medq/calls/CallProvider.tsx",
"CallProvider",
);

/***/ }),

/***/ 416833:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cr: () => (/* binding */ playBusyTone),
/* harmony export */   KQ: () => (/* binding */ playEndTone),
/* harmony export */   OB: () => (/* binding */ startRingback),
/* harmony export */   nn: () => (/* binding */ startIncomingRing),
/* harmony export */   yj: () => (/* binding */ primeCallAudio)
/* harmony export */ });
/* unused harmony export playConnectTone */
/**
 * call-sounds.ts — synthesized call tones (Web Audio, zero assets).
 *
 * The classic telephony cadences, generated with oscillators so no audio
 * files need to ship:
 *
 *   • Incoming ring  — 440+480 Hz dual tone, 1.6 s on / 2.0 s off loop
 *     (what the CALLEE hears; a deliberate, insistent rhythm)
 *   • Ringback       — 440+480 Hz, 1.0 s on / 3.0 s off loop (what the
 *     CALLER hears while waiting; the familiar "brrring… brrring…")
 *   • Connect tone   — soft rising two-note chime when the call answers
 *   • End tone       — short falling "boop" when the call ends
 *
 * Autoplay policy: an AudioContext may only start after a user gesture.
 * Browsers treat that generously once the page has been interacted with
 * (clicking anywhere in the app earlier counts), and we additionally try to
 * resume() the context on every play call. If the browser still refuses, the
 * ring is visual-only — the incoming-call modal and document.title flashing
 * keep working regardless.
 */ let ctx = null;
function getCtx() {
    if (true) return null;
    try {
        if (!ctx) {
            const Ctor = window.AudioContext ?? window.webkitAudioContext;
            if (!Ctor) return null;
            ctx = new Ctor();
        }
        if (ctx.state === 'suspended') void ctx.resume().catch(()=>{});
        return ctx;
    } catch  {
        return null;
    }
}
/** Prime the AudioContext from a user gesture (call buttons etc.). */ function primeCallAudio() {
    getCtx();
}
/**
 * Play one dual-tone burst with soft attack/release (anti-click ramps).
 * Returns the stop handle so loops can schedule the next burst cancellably.
 */ function burst(freqs, duration, volume, when) {
    const audio = getCtx();
    if (!audio) return {
        stop: ()=>{}
    };
    const start = when ?? audio.currentTime;
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.04);
    gain.gain.setValueAtTime(volume, start + duration - 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    gain.connect(audio.destination);
    const oscillators = freqs.map((f)=>{
        const osc = audio.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        osc.connect(gain);
        osc.start(start);
        osc.stop(start + duration + 0.05);
        return osc;
    });
    return {
        stop: ()=>{
            try {
                const now = audio.currentTime;
                gain.gain.cancelScheduledValues(now);
                gain.gain.setValueAtTime(gain.gain.value, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
                oscillators.forEach((o)=>o.stop(now + 0.06));
            } catch  {
            // Already stopped.
            }
        }
    };
}
/** Run a ring cadence loop until stopped. */ function ringLoop(freqs, onMs, offMs, volume) {
    let stopped = false;
    let current = null;
    let timer = null;
    const tick = ()=>{
        if (stopped) return;
        const audio = getCtx();
        if (!audio) {
            // No AudioContext (autoplay-blocked): keep the visual ring alive by
            // respecting the cadence silently.
            timer = setTimeout(tick, onMs + offMs);
            return;
        }
        current = burst(freqs, onMs / 1000, volume);
        timer = setTimeout(tick, onMs + offMs);
    };
    tick();
    return {
        stop: ()=>{
            stopped = true;
            if (timer) clearTimeout(timer);
            current?.stop();
            current = null;
        }
    };
}
/** Insistent incoming-call ring (callee). */ function startIncomingRing() {
    return ringLoop([
        440,
        480
    ], 1600, 2000, 0.22);
}
/** Familiar ringback while waiting for the other side to pick up (caller). */ function startRingback() {
    return ringLoop([
        440,
        480
    ], 1000, 3000, 0.12);
}
/** Soft two-note "connected" chime. */ function playConnectTone() {
    const audio = getCtx();
    if (!audio) return;
    const t = audio.currentTime;
    burst([
        660
    ], 0.12, 0.12, t);
    burst([
        880
    ], 0.18, 0.12, t + 0.13);
}
/** Falling end-of-call tone. */ function playEndTone() {
    const audio = getCtx();
    if (!audio) return;
    const t = audio.currentTime;
    burst([
        480
    ], 0.14, 0.14, t);
    burst([
        320
    ], 0.2, 0.14, t + 0.15);
}
/** Short "message-like" double blip (busy / declined feedback). */ function playBusyTone() {
    const audio = getCtx();
    if (!audio) return;
    const t = audio.currentTime;
    burst([
        480
    ], 0.12, 0.14, t);
    burst([
        480
    ], 0.12, 0.14, t + 0.2);
    burst([
        480
    ], 0.12, 0.14, t + 0.4);
}


/***/ }),

/***/ 461135:
/***/ (() => {



/***/ }),

/***/ 522719:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* unused harmony export useTheme */
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

const ThemeProvider = (0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call ThemeProvider() from the server but ThemeProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/lib/hooks/use-theme.tsx",
"ThemeProvider",
);const useTheme = (0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call useTheme() from the server but useTheme is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/lib/hooks/use-theme.tsx",
"useTheme",
);

/***/ }),

/***/ 597728:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 581921, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 760440, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 384342, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 882265, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 635421, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 261335, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 970664, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 174661));


/***/ }),

/***/ 695127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RootLoading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(770583);


// src/app/loading.tsx — Next.js App Router root loading UI.
//
// This file is automatically rendered by Next.js whenever a route segment
// beneath src/app/ is loading (server component streaming, dynamic params,
// or suspense boundaries without their own loading.tsx). Without this file,
// Next.js shows a blank white screen during navigation — this file replaces
// that with the branded MedQ loading shell.
//
// IMPORTANT: This MUST be a server component (no 'use client') and must not
// import anything heavy. It renders synchronously on the server before the
// real page chunk arrives, so it should be tiny (just inline SVG + CSS).
//
// Visual design matches:
//   - src/app/page.tsx LoadingShell (the initial app-load spinner)
//   - the inline CSS variables in src/app/layout.tsx
// so the user sees a consistent loading state regardless of whether the
// load is the initial SPA boot OR a subsequent route transition.
function RootLoading() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "min-h-screen flex flex-col items-center justify-center",
        style: {
            background: '#0c0e14'
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5a0] to-[#00b87a] flex items-center justify-center shadow-lg shadow-[#00e5a0]/25",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, {
                        className: "w-7 h-7 text-[#0c0e14] animate-spin"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-sm font-semibold text-[#e8ecf4]",
                            style: {
                                fontFamily: "'Space Grotesk', sans-serif"
                            },
                            children: [
                                "Loading Med",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[#00e5a0]",
                                    children: "Q"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[10px] text-[#5a6478] mt-1",
                            children: "Preparing your study environment..."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1 mt-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '0ms'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '150ms'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
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


/***/ }),

/***/ 712406:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23));


/***/ }),

/***/ 715787:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ chatEmitUrl),
/* harmony export */   z: () => (/* binding */ chatSocketUrl)
/* harmony export */ });
/**
 * Shared chat-socket URL resolution.
 *
 * Where the chat socket service lives from THIS browser's point of view:
 * behind the preview gateway the relative "/?XTransformPort=3004" form is
 * routed to the service; on plain localhost (dev / e2e tests) the gateway
 * doesn't exist, so connect directly to the service on 127.0.0.1:3004
 * (its CORS is open). Same logic for the HTTP /emit endpoint.
 *
 * Previously this lived privately inside CallProvider; the messages page
 * hardcoded the gateway form, which meant its realtime socket could NEVER
 * connect when the app was opened on localhost (no gateway to transform the
 * port) — new messages then only arrived via refetch (open room / refresh),
 * exactly the "I have to leave the chat and come back" bug.
 */ function chatSocketUrl() {
    if (true) return '/?XTransformPort=3004';
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host.startsWith('127.');
    return isLocal ? 'http://127.0.0.1:3004/' : '/?XTransformPort=3004';
}
function chatEmitUrl() {
    if (true) return '/emit?XTransformPort=3004';
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host.startsWith('127.');
    return isLocal ? 'http://127.0.0.1:3004/emit' : '/emit?XTransformPort=3004';
}


/***/ }),

/***/ 734176:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 615098, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 147644, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 533859, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 998099, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 916237, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 798562, 23));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 836675, 23));


/***/ }),

/***/ 759262:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 581921, 23));


/***/ }),

/***/ 770440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
  /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    const imageData = {"type":"image/x-icon","sizes":"192x192"}

    return [{
      ...imageData,
      url: "/favicon.ico?bfdba65b84bfc68d",
    }]
  }

/***/ }),

/***/ 845143:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CallProvider: () => (/* binding */ CallProvider),
/* harmony export */   G: () => (/* binding */ useCall)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(490314);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(554559);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(106860);
/* harmony import */ var _lib_chat_socket_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(715787);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(980859);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(346633);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(607383);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(605920);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(77014);
/* harmony import */ var _call_sounds__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(416833);
/* harmony import */ var _IncomingCallModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(246621);
/* harmony import */ var _MinimizedCallBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(280347);
/* __next_internal_client_entry_do_not_use__ useCall,CallProvider auto */ 
/**
 * CallProvider — the app-wide call orchestrator.
 *
 * Mounted once in the root layout (inside SessionProvider) so it survives ALL
 * navigation. This is what makes calls work "from anywhere":
 *
 *   • A single socket.io connection to the chat service is kept alive for the
 *     whole session and joins every chat room the user belongs to — so a
 *     `call:invite` rings whether the user is on the dashboard, studying, or
 *     in the messages tab.
 *   • Incoming calls ring with a full-screen modal + synthesized ring tone +
 *     document.title flashing + a browser Notification when the tab is hidden.
 *     Users without a connected socket additionally get a web push from the
 *     server (see /api/chat/call-notify) — that covers "app closed".
 *   • The active call renders in a global MiroTalk overlay that survives
 *     route changes, and can be MINIMIZED to a floating pill so the user can
 *     keep using the app mid-call.
 *
 * Call lifecycle events (all routed via the chat socket service):
 *   call:invite  room      → callee starts ringing
 *   call:accept  targeted  → caller stops ringback, shows "connecting"
 *   call:decline targeted  → caller shows "declined" (callee logs the message)
 *   call:busy    targeted  → caller shows "busy"
 *   call:cancel  room      → callee stops ringing (caller hung up first)
 *   call:hangup  room      → both sides close (the side that ends logs it)
 */ 








const MiroTalkCallLazy = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_2__["default"])(async ()=>{
     true && /*require.resolve*/(null /* weak dependency, without id */);
}, {
    loadableGenerated: {
        modules: [
            "components/medq/calls/CallProvider.tsx -> " + "@/components/medq/MiroTalkCall"
        ]
    },
    ssr: false
});
const CallOverlayBoundary = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_2__["default"])(async ()=>{
     true && /*require.resolve*/(null /* weak dependency, without id */);
}, {
    loadableGenerated: {
        modules: [
            "components/medq/calls/CallProvider.tsx -> " + "@/components/medq/CallOverlayBoundary"
        ]
    },
    ssr: false
});
/** Demo-user resolution mirrors the messages page (same cache key, same API)
 * so guests ring under the SAME identity the chat rooms use. */ const DEMO_USER_CACHE_KEY = 'medq-demo-user-v2';
/** Callee-side: how long the incoming call rings before "missed". */ const RING_TIMEOUT_MS = 45000;
/** Caller-side: how long to wait before giving up (callee timeout + grace). */ const DIAL_TIMEOUT_MS = 60000;
/** How long the terminal splash ("Call ended" etc.) stays up. */ const SPLASH_MS = 2800;
const CallContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function useCall() {
    const ctx = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CallContext);
    if (!ctx) throw new Error('useCall must be used inside <CallProvider>');
    return ctx;
}
function CallProvider({ children }) {
    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__/* .useSession */ .wV)();
    const authUserId = status === 'authenticated' ? session?.user?.id : undefined;
    // Demo-user fallback (guest mode): the messages page resolves chat identity
    // the same way, so calls and chat share one identity per browser.
    const [demoUser, setDemoUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (authUserId || status === 'loading') return;
        let cancelled = false;
        try {
            const stored = localStorage.getItem(DEMO_USER_CACHE_KEY);
            if (stored) setDemoUser(JSON.parse(stored));
        } catch  {}
        fetch('/api/chat/demo-user').then((r)=>r.ok ? r.json() : null).then((data)=>{
            if (!cancelled && data?.user) {
                setDemoUser(data.user);
                try {
                    localStorage.setItem(DEMO_USER_CACHE_KEY, JSON.stringify(data.user));
                } catch  {}
            }
        }).catch(()=>{});
        return ()=>{
            cancelled = true;
        };
    }, [
        authUserId,
        status
    ]);
    const userId = authUserId ?? demoUser?.id;
    const userName = session?.user?.name ?? demoUser?.name ?? undefined;
    const [incoming, setIncoming] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [activeCall, setActiveCall] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [minimized, setMinimized] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* ── Call state sync: server is the source of truth ────────────────────
   * Instead of persisting call state to localStorage (client-side guessing
   * that can get out of sync), the chat service maintains a server-side
   * active-call registry. On socket connect, the client emits `call:sync`
   * and the server responds with the active call (if any). This handles
   * page refresh correctly: the server knows the call is still live, tells
   * the reconnecting client, and the client restores the call UI + rejoins
   * the MiroTalk room.
   *
   * On `beforeunload` (refresh/close), we send a `call:hangup` via
   * `navigator.sendBeacon` so the peer is notified immediately — the
   * server's 30-second disconnect grace timer is a fallback, not the
   * primary cleanup path. */ // Refs so socket listeners (registered once) always see fresh state.
    const incomingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const activeCallRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const socketRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const ringLoopRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const ringbackRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const ringTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const dialTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const splashTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const titleFlashRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const originalTitleRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const joinedRoomsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Set());
    /** RoomId of a call owned by ANOTHER tab of this browser (cross-tab guard). */ const activeCallBlockedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    incomingRef.current = incoming;
    activeCallRef.current = activeCall;
    /* ── Helpers ──────────────────────────────────────────────────────────── */ const stopRing = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        ringLoopRef.current?.stop();
        ringLoopRef.current = null;
        if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
        ringTimeoutRef.current = null;
    }, []);
    const stopRingback = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        ringbackRef.current?.stop();
        ringbackRef.current = null;
        if (dialTimeoutRef.current) clearTimeout(dialTimeoutRef.current);
        dialTimeoutRef.current = null;
    }, []);
    const stopTitleFlash = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (titleFlashRef.current) clearInterval(titleFlashRef.current);
        titleFlashRef.current = null;
        if (originalTitleRef.current !== null && typeof document !== 'undefined') {
            document.title = originalTitleRef.current;
        }
        originalTitleRef.current = null;
    }, []);
    const flashTitle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((message)=>{
        if (typeof document === 'undefined') return;
        if (originalTitleRef.current === null) originalTitleRef.current = document.title;
        if (titleFlashRef.current) return;
        let on = false;
        titleFlashRef.current = setInterval(()=>{
            on = !on;
            document.title = on ? message : originalTitleRef.current || 'MedQ';
        }, 1000);
    }, []);
    /** Fire-and-forget chat-message log (call history rows). */ const logCallMessage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((roomId, callType, durationSec, callStatus)=>{
        if (!userId) return;
        const missed = callStatus !== 'completed';
        void fetch('/api/chat/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId
            },
            body: JSON.stringify({
                roomId,
                content: `${missed ? 'Missed ' : ''}${callType === 'video' ? 'Video' : 'Voice'} Call`,
                type: 'call',
                metadata: JSON.stringify({
                    callType,
                    duration: Math.round(durationSec),
                    status: callStatus
                })
            })
        }).catch(()=>{});
    }, [
        userId
    ]);
    /** Broadcast a room-scoped lifecycle event through the chat service. */ const emitRoomEvent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((event, roomId, data)=>{
        void fetch((0,_lib_chat_socket_url__WEBPACK_IMPORTED_MODULE_7__/* .chatEmitUrl */ .n)(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event,
                room: roomId,
                data: {
                    roomId,
                    ...data
                }
            })
        }).catch(()=>{});
    }, []);
    const emitTargeted = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((event, targetUserId, data)=>{
        socketRef.current?.emit(event, {
            targetUserId,
            ...data
        });
    }, []);
    /** Move to the terminal splash, then clear the session. */ const finishCall = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((reason, opts = {})=>{
        const current = activeCallRef.current;
        stopRingback();
        stopTitleFlash();
        if (opts.log) logCallMessage(opts.log.roomId, opts.log.callType, opts.log.durationSec, opts.log.status);
        // Tell this browser's other tabs the call is over (unblocks them).
        if (current) broadcastCallEvent({
            type: 'call-ended',
            roomId: current.roomId
        });
        setActiveCall(current ? {
            ...current,
            phase: 'ended',
            endReason: reason
        } : null);
        if (splashTimeoutRef.current) clearTimeout(splashTimeoutRef.current);
        splashTimeoutRef.current = setTimeout(()=>{
            setActiveCall(null);
            setMinimized(false);
        }, SPLASH_MS);
    }, // broadcastCallEvent is defined below in the same render scope and is
    // stable — referenced via closure, deliberately omitted from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        logCallMessage,
        stopRingback,
        stopTitleFlash
    ]);
    /* ── Incoming call management ─────────────────────────────────────────── */ const declineIncoming = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((status)=>{
        const inc = incomingRef.current;
        if (!inc) return;
        stopRing();
        stopTitleFlash();
        setIncoming(null);
        incomingRef.current = null;
        // Silence the ring in this browser's other tabs.
        broadcastCallEvent({
            type: 'incoming-handled',
            roomId: inc.roomId
        });
        // Tell the caller what happened: a decline is its own event (they see
        // "Call declined"), while a ring-timeout is a hangup with reason
        // "missed" (they see "No answer"). roomId lets the socket service stop
        // the pending invite for late joiners.
        if (status === 'declined') {
            emitTargeted('call:decline', inc.callerUserId, {
                fromUserId: userId,
                roomId: inc.roomId
            });
        } else {
            emitTargeted('call:hangup', inc.callerUserId, {
                fromUserId: userId,
                roomId: inc.roomId,
                reason: 'missed'
            });
        }
        logCallMessage(inc.roomId, inc.callType, 0, status);
        if (status === 'declined') (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .playEndTone */ .KQ)();
    }, [
        emitTargeted,
        logCallMessage,
        stopRing,
        stopTitleFlash,
        userId
    ]);
    const startIncoming = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((data)=>{
        if (!userId || !data.roomId || !data.callerUserId) return;
        if (!data.joinUrl) {
            emitTargeted('call:busy', data.callerUserId, {
                roomId: data.roomId
            });
            return;
        }
        const inc = {
            roomId: data.roomId,
            joinUrl: data.joinUrl,
            callerUserId: data.callerUserId,
            callerName: data.callerName || 'Someone',
            callType: data.callType === 'video' ? 'video' : 'voice',
            receivedAt: Date.now()
        };
        // Already busy? Politely bounce the new caller.
        if (activeCallRef.current || incomingRef.current) {
            emitTargeted('call:busy', inc.callerUserId, {
                roomId: inc.roomId
            });
            return;
        }
        setIncoming(inc);
        incomingRef.current = inc;
        ringLoopRef.current = (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .startIncomingRing */ .nn)();
        flashTitle(`📞 ${inc.callerName} is calling — MedQ`);
        // System notification when the tab is hidden (permission already granted).
        try {
            if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && document.hidden) {
                const n = new Notification(`Incoming ${inc.callType} call`, {
                    body: `${inc.callerName} is calling you on MedQ`,
                    tag: `medq-call:${inc.roomId}`,
                    icon: '/icons/icon-192.png'
                });
                n.onclick = ()=>{
                    window.focus();
                    n.close();
                };
            }
        } catch  {
        // Notification constructor unavailable — visual ring continues.
        }
        // Ring timeout → missed call.
        if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
        ringTimeoutRef.current = setTimeout(()=>{
            if (incomingRef.current?.roomId === inc.roomId) declineIncoming('missed');
        }, RING_TIMEOUT_MS);
    }, [
        declineIncoming,
        emitTargeted,
        flashTitle,
        userId
    ]);
    const acceptIncoming = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const inc = incomingRef.current;
        if (!inc || !userId) return;
        stopRing();
        stopTitleFlash();
        setIncoming(null);
        incomingRef.current = null;
        // Silence the ring in this browser's other tabs.
        broadcastCallEvent({
            type: 'incoming-handled',
            roomId: inc.roomId
        });
        emitTargeted('call:accept', inc.callerUserId, {
            fromUserId: userId,
            roomId: inc.roomId,
            joinUrl: inc.joinUrl
        });
        setActiveCall({
            roomId: inc.roomId,
            joinUrl: inc.joinUrl,
            callType: inc.callType,
            role: 'callee',
            peerId: inc.callerUserId,
            peerName: inc.callerName,
            phase: 'connecting',
            startedAt: Date.now()
        });
        setMinimized(false);
    }, [
        emitTargeted,
        stopRing,
        stopTitleFlash,
        userId
    ]);
    /* ── Outgoing calls ───────────────────────────────────────────────────── */ const startCall = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((opts)=>{
        if (!userId) return;
        if (activeCallRef.current) return; // one call at a time
        if (activeCallBlockedRef.current && activeCallBlockedRef.current !== opts.roomId) {
            return; // another tab of this browser is already in a call
        }
        if (incomingRef.current) declineIncoming('declined'); // clear a pending ring
        (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .primeCallAudio */ .yj)();
        broadcastCallEvent({
            type: 'call-active',
            roomId: opts.roomId
        });
        setActiveCall({
            roomId: opts.roomId,
            roomName: opts.roomName,
            callType: opts.callType,
            role: 'caller',
            peerId: opts.peerId,
            peerName: opts.peerName,
            phase: 'ringing',
            startedAt: Date.now()
        });
        setMinimized(false);
        ringbackRef.current = (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .startRingback */ .OB)();
        // Ring everyone: in-app sockets + pending-invite replay + web push for
        // members not connected to the app at all.
        void (async ()=>{
            try {
                const response = await fetch('/api/chat/call-notify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-id': userId
                    },
                    body: JSON.stringify({
                        roomId: opts.roomId,
                        callType: opts.callType,
                        callerName: userName
                    })
                });
                const data = await response.json().catch(()=>({}));
                if (!response.ok || typeof data.joinUrl !== 'string') {
                    throw new Error(data.error || 'Could not create the meeting room.');
                }
                const current = activeCallRef.current;
                if (current?.roomId === opts.roomId && current.phase !== 'ended') {
                    setActiveCall({
                        ...current,
                        joinUrl: data.joinUrl
                    });
                } else {
                    emitRoomEvent('call:cancel', opts.roomId, {
                        fromUserId: userId
                    });
                }
            } catch  {
                const current = activeCallRef.current;
                if (current?.roomId === opts.roomId && current.phase !== 'ended') {
                    finishCall('failed');
                }
            }
        })();
        // Dial timeout → "no answer". The callee logs its own missed row when
        // reachable; this fires only when the callee is unreachable.
        if (dialTimeoutRef.current) clearTimeout(dialTimeoutRef.current);
        dialTimeoutRef.current = setTimeout(()=>{
            const cur = activeCallRef.current;
            if (cur && cur.roomId === opts.roomId && cur.phase === 'ringing') {
                logCallMessage(opts.roomId, opts.callType, 0, 'missed');
                finishCall('no-answer');
            }
        }, DIAL_TIMEOUT_MS);
    }, [
        declineIncoming,
        emitRoomEvent,
        finishCall,
        logCallMessage,
        userId,
        userName
    ]);
    const endActiveCall = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const cur = activeCallRef.current;
        if (!cur) return;
        if (cur.phase === 'ended') return;
        const wasConnected = cur.phase === 'connected' || cur.connectedAt !== undefined;
        const durationSec = cur.connectedAt ? (Date.now() - cur.connectedAt) / 1000 : 0;
        if (cur.role === 'caller' && cur.phase === 'ringing') {
            // Caller gave up before anyone answered → cancel the ring everywhere.
            if (cur.peerId) emitTargeted('call:cancel', cur.peerId, {
                fromUserId: userId,
                roomId: cur.roomId
            });
            emitRoomEvent('call:cancel', cur.roomId, {
                fromUserId: userId
            });
            finishCall('completed');
            (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .playEndTone */ .KQ)();
            return;
        }
        // Normal end: tell the room, log the completed call from this side only.
        emitRoomEvent('call:hangup', cur.roomId, {
            fromUserId: userId,
            reason: 'completed'
        });
        finishCall('completed', {
            log: {
                roomId: cur.roomId,
                callType: cur.callType,
                durationSec,
                status: 'completed'
            }
        });
        (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .playEndTone */ .KQ)();
    }, [
        emitRoomEvent,
        emitTargeted,
        finishCall,
        userId
    ]);
    const toggleMinimize = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>setMinimized((v)=>!v), []);
    /* ── MiroTalk call callbacks ──────────────────────────────────────────── */ const handleConnected = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setActiveCall((cur)=>{
            if (!cur || cur.phase === 'connected' || cur.phase === 'ended') return cur;
            return {
                ...cur,
                phase: 'connected',
                connectedAt: cur.connectedAt ?? Date.now()
            };
        });
    }, []);
    /* ── Socket lifecycle (one connection for the whole app) ──────────────── */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!userId) return;
        const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_4__.io)((0,_lib_chat_socket_url__WEBPACK_IMPORTED_MODULE_7__/* .chatSocketUrl */ .z)(), {
            transports: [
                'websocket',
                'polling'
            ],
            reconnection: true,
            reconnectionDelay: 3000
        });
        socketRef.current = socket;
        const identifyAndJoin = async ()=>{
            socket.emit('identify', userId);
            // Ask the server if we have an active call (survives page refresh).
            // The server responds via `call:sync-response` (handler below).
            socket.emit('call:sync');
            joinedRoomsRef.current = new Set();
            try {
                const res = await fetch('/api/chat/rooms', {
                    headers: {
                        'x-user-id': userId
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    for (const room of data.rooms ?? []){
                        if (room?.id && !joinedRoomsRef.current.has(room.id)) {
                            joinedRoomsRef.current.add(room.id);
                            socket.emit('join:room', room.id);
                        }
                    }
                }
            } catch  {
            // Rooms will be re-joined on the next reconnect.
            }
        };
        socket.on('connect', ()=>void identifyAndJoin());
        // ── Server-side call sync: on (re)connect, ask the server if we have
        //    an active call. The server is the source of truth — it tracks
        //    call state in its activeCalls registry, surviving our refresh.
        socket.on('call:sync-response', (data)=>{
            // Only restore if we don't already have an active call (avoid
            // clobbering a call we just started in this tab).
            if (activeCallRef.current) return;
            if (!data?.roomId) return;
            if (typeof data.joinUrl !== 'string') return;
            setActiveCall({
                roomId: data.roomId,
                joinUrl: data.joinUrl,
                callType: data.callType,
                role: data.role,
                peerId: data.peerId,
                peerName: data.peerName,
                phase: 'connecting',
                startedAt: data.startedAt
            });
        });
        socket.on('call:invite', (data)=>{
            if (!data?.roomId || data.callerUserId === userId) return;
            startIncoming(data);
        });
        socket.on('call:accept', (data)=>{
            const cur = activeCallRef.current;
            if (cur && cur.role === 'caller' && data.roomId === cur.roomId && cur.phase === 'ringing') {
                stopRingback();
                setActiveCall({
                    ...cur,
                    joinUrl: typeof data.joinUrl === 'string' ? data.joinUrl : cur.joinUrl,
                    phase: 'connecting'
                });
            }
        });
        socket.on('call:decline', (data)=>{
            const cur = activeCallRef.current;
            if (cur && data.roomId === cur.roomId && cur.phase !== 'ended' && !cur.connectedAt) {
                (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .playBusyTone */ .Cr)();
                finishCall('declined');
            }
        });
        socket.on('call:busy', (data)=>{
            const cur = activeCallRef.current;
            if (cur && data.roomId === cur.roomId && cur.phase === 'ringing') {
                (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .playBusyTone */ .Cr)();
                finishCall('busy');
            }
        });
        socket.on('call:cancel', (data)=>{
            // Caller gave up before we answered.
            const inc = incomingRef.current;
            if (inc && data.roomId === inc.roomId) {
                stopRing();
                stopTitleFlash();
                setIncoming(null);
                incomingRef.current = null;
                (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .playEndTone */ .KQ)();
                try {
                    if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && document.hidden) {
                        const n = new Notification('Missed call', {
                            body: `${inc.callerName} called you on MedQ`,
                            tag: `medq-missed:${inc.roomId}`,
                            icon: '/icons/icon-192.png'
                        });
                        n.onclick = ()=>{
                            window.focus();
                            n.close();
                        };
                    }
                } catch  {}
            }
        });
        socket.on('call:hangup', (data)=>{
            const cur = activeCallRef.current;
            if (cur && data.roomId === cur.roomId && cur.phase !== 'ended') {
                const reason = data.reason === 'missed' ? 'no-answer' : 'completed';
                // The side that hung up logs the call — never double-log.
                (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .playEndTone */ .KQ)();
                finishCall(reason);
            }
        });
        return ()=>{
            socket.removeAllListeners();
            socket.disconnect();
            socketRef.current = null;
            joinedRoomsRef.current = new Set();
        };
    }, [
        userId,
        finishCall,
        startIncoming,
        stopRing,
        stopRingback,
        stopTitleFlash
    ]);
    /* ── Cross-tab dedup (BroadcastChannel) ────────────────────────────────
     The incoming-call modal rings in EVERY tab of the user's browser (each
     tab's provider has its own socket). Answering in one tab must silence the
     others — otherwise the stragglers time out at 45 s and would post a
     bogus "missed call" message while the call is actually running. */ const callChannelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const broadcastCallEvent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((message)=>{
        try {
            callChannelRef.current?.postMessage(message);
        } catch  {
        // Channel closed — single-tab scenario.
        }
    }, []);
    const openMeeting = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((opts)=>{
        if (!userId || activeCallRef.current) return;
        if (activeCallBlockedRef.current && activeCallBlockedRef.current !== opts.roomId) return;
        (0,_call_sounds__WEBPACK_IMPORTED_MODULE_8__/* .primeCallAudio */ .yj)();
        broadcastCallEvent({
            type: 'call-active',
            roomId: opts.roomId
        });
        setActiveCall({
            roomId: opts.roomId,
            roomName: opts.roomName,
            joinUrl: opts.joinUrl,
            callType: 'video',
            role: 'caller',
            phase: 'connecting',
            startedAt: Date.now()
        });
        setMinimized(false);
    }, [
        broadcastCallEvent,
        userId
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (typeof BroadcastChannel === 'undefined') return;
        const bc = new BroadcastChannel('medq-calls');
        callChannelRef.current = bc;
        bc.onmessage = (ev)=>{
            const msg = ev.data;
            if (!msg?.type || !msg.roomId) return;
            if (msg.type === 'incoming-handled') {
                // Another tab accepted/declined this invite — silence our ring.
                const inc = incomingRef.current;
                if (inc && inc.roomId === msg.roomId) {
                    stopRing();
                    stopTitleFlash();
                    setIncoming(null);
                    incomingRef.current = null;
                }
            } else if (msg.type === 'call-active') {
                // Another tab already owns a call session — don't start a second one.
                if (!activeCallRef.current) activeCallBlockedRef.current = msg.roomId;
            } else if (msg.type === 'call-ended') {
                if (activeCallBlockedRef.current === msg.roomId) activeCallBlockedRef.current = null;
            }
        };
        return ()=>{
            bc.close();
            callChannelRef.current = null;
        };
    }, [
        stopRing,
        stopTitleFlash
    ]);
    /* ── Cleanup on unmount ───────────────────────────────────────────────── */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            stopRing();
            stopRingback();
            stopTitleFlash();
            if (splashTimeoutRef.current) clearTimeout(splashTimeoutRef.current);
        };
    }, [
        stopRing,
        stopRingback,
        stopTitleFlash
    ]);
    /* ── beforeunload: immediate hangup notification ───────────────────────
   * On page refresh / tab close, send a `call:hangup` via sendBeacon so
   * the peer is notified immediately (the server's 30s disconnect grace
   * timer is the fallback if sendBeacon fails). sendBeacon completes
   * during page unload, unlike fetch which gets cancelled. */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (true) return;
        const handleBeforeUnload = ()=>{
            const cur = activeCallRef.current;
            if (!cur || cur.phase === 'ended') return;
            if (!userId) return;
            const blob = new Blob([
                JSON.stringify({
                    event: 'call:hangup',
                    room: cur.roomId,
                    data: {
                        roomId: cur.roomId,
                        fromUserId: userId,
                        reason: 'completed'
                    }
                })
            ], {
                type: 'application/json'
            });
            try {
                navigator.sendBeacon((0,_lib_chat_socket_url__WEBPACK_IMPORTED_MODULE_7__/* .chatEmitUrl */ .n)(), blob);
            } catch  {}
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return ()=>window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [
        userId
    ]);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            activeCall,
            incoming,
            minimized,
            inCall: activeCall !== null,
            startCall,
            openMeeting,
            acceptIncoming,
            declineIncoming: ()=>declineIncoming('declined'),
            endActiveCall,
            toggleMinimize
        }), [
        acceptIncoming,
        activeCall,
        declineIncoming,
        endActiveCall,
        incoming,
        minimized,
        openMeeting,
        startCall,
        toggleMinimize
    ]);
    /* ── Render: children + global call surfaces ──────────────────────────── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CallContext.Provider, {
        value: value,
        children: [
            children,
            incoming && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_IncomingCallModal__WEBPACK_IMPORTED_MODULE_5__/* .IncomingCallModal */ .m, {
                incoming: incoming,
                onAccept: acceptIncoming,
                onDecline: ()=>declineIncoming('declined')
            }, `${incoming.roomId}:${incoming.receivedAt}`),
            activeCall && activeCall.phase !== 'ended' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: minimized ? {
                    display: 'none'
                } : undefined,
                "aria-hidden": minimized,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CallOverlayBoundary, {
                    resetKey: `${activeCall.roomId}:${activeCall.callType}:${activeCall.role}`,
                    onFallbackClose: endActiveCall,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MiroTalkCallLazy, {
                        roomId: activeCall.roomId,
                        url: activeCall.joinUrl,
                        userName: userName ?? undefined,
                        callType: activeCall.callType,
                        role: activeCall.role,
                        peerName: activeCall.peerName,
                        onConnected: handleConnected,
                        onMinimize: ()=>setMinimized(true),
                        onEnd: endActiveCall
                    })
                })
            }),
            activeCall && minimized && activeCall.phase !== 'ended' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MinimizedCallBar__WEBPACK_IMPORTED_MODULE_6__/* .MinimizedCallBar */ .w, {
                call: activeCall,
                onExpand: ()=>setMinimized(false),
                onEnd: endActiveCall
            }),
            activeCall?.phase === 'ended' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EndedSplash, {
                reason: activeCall.endReason
            })
        ]
    });
}
/* ── Terminal splash ──────────────────────────────────────────────────── */ function reasonCopy(reason) {
    switch(reason){
        case 'declined':
            return {
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                    className: "w-10 h-10"
                }),
                title: 'Call declined',
                subtitle: 'The person you called was unavailable.'
            };
        case 'no-answer':
            return {
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                    className: "w-10 h-10"
                }),
                title: 'No answer',
                subtitle: 'Nobody picked up within the ring window.'
            };
        case 'busy':
            return {
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                    className: "w-10 h-10"
                }),
                title: 'Person is busy',
                subtitle: 'They are already on another call.'
            };
        case 'failed':
            return {
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                    className: "w-10 h-10"
                }),
                title: 'Call failed',
                subtitle: 'The connection could not be established.'
            };
        default:
            return {
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                    className: "w-10 h-10"
                }),
                title: 'Call ended',
                subtitle: 'Thanks for using MedQ calls.'
            };
    }
}
function EndedSplash({ reason }) {
    const copy = reasonCopy(reason);
    const isNegative = reason === 'declined' || reason === 'no-answer' || reason === 'busy' || reason === 'failed';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-[500] flex items-center justify-center",
        style: {
            background: 'rgba(3,8,16,0.88)',
            backdropFilter: 'blur(8px)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col items-center text-center px-8",
                style: {
                    animation: 'ended-splash-in 0.35s ease-out'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center justify-center rounded-full mb-5",
                        style: {
                            width: 84,
                            height: 84,
                            background: isNegative ? 'rgba(255,87,87,0.12)' : 'rgba(0,229,160,0.12)',
                            color: isNegative ? '#ff5757' : '#00e5a0'
                        },
                        children: copy.icon ?? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Clock_PhoneCall_PhoneOff_UserX_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                            className: "w-10 h-10"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-xl font-semibold text-[#e8ecf4]",
                        children: copy.title
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "mt-1 text-[13px] text-[#8b94a8]",
                        children: copy.subtitle
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes ended-splash-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `
                }
            })
        ]
    });
}


/***/ }),

/***/ 905991:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 925940:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 554559));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 845143));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 943279));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 26960));
;
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 295909));


/***/ }),

/***/ 943279:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InstallPrompt)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(640245);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(279058);
/* harmony import */ var _barrel_optimize_names_Download_PlusSquare_Share_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(924669);
/* __next_internal_client_entry_do_not_use__ default auto */ 


const DISMISS_KEY = 'medq-install-prompt-dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;
function isStandalone() {
    if (true) return false;
    return window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches || window.navigator.standalone === true;
}
function isIOS() {
    if (true) return false;
    const ua = window.navigator.userAgent;
    return /iPad|iPhone|iPod/.test(ua) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}
function getIOSBrowser() {
    if (true) return 'other';
    const ua = navigator.userAgent;
    if (/CriOS/.test(ua)) return 'chrome';
    if (/FxiOS/.test(ua)) return 'firefox';
    if (/Safari/.test(ua) && !/CriOS|FxiOS/.test(ua)) return 'safari';
    return 'other';
}
function wasRecentlyDismissed() {
    if (true) return false;
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
   */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
   */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
   */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (wasRecentlyDismissed()) {
            setDismissed(true);
        }
    }, []);
    /*
   * Hide installation UI whenever the app becomes standalone.
   */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (true) return;
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
   */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
   */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
   */ process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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

/***/ 998558:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
  /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    const imageData = {"type":"image/jpeg","width":1024,"height":1024}

    return [{
      ...imageData,
      url: "/opengraph-image.jpg?f6a9d396c00f4060",
    }]
  }

/***/ })

};
;