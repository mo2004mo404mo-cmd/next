"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[97291],{

/***/ 19672:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PomodoroTimer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24893);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79267);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36619);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8962);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24860);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(28342);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(88074);
/* harmony import */ var _barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(65408);
/* __next_internal_client_entry_do_not_use__ default auto */ 


// ── Default durations ────────────────────────────────────────────────────────
const DEFAULT_DURATIONS = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};
const MODE_CONFIG = {
    focus: (d)=>({
            label: 'Focus',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                className: "w-4 h-4"
            }),
            duration: d.focus,
            color: '#00e5a0',
            bgClass: 'bg-[#00e5a0]/10 text-[#00e5a0]',
            ringClass: 'stroke-[#00e5a0]'
        }),
    shortBreak: (d)=>({
            label: 'Short Break',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                className: "w-4 h-4"
            }),
            duration: d.shortBreak,
            color: '#f59e0b',
            bgClass: 'bg-[#f59e0b]/10 text-[#f59e0b]',
            ringClass: 'stroke-[#f59e0b]'
        }),
    longBreak: (d)=>({
            label: 'Long Break',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "w-4 h-4"
            }),
            duration: d.longBreak,
            color: '#8b5cf6',
            bgClass: 'bg-[#8b5cf6]/10 text-[#8b5cf6]',
            ringClass: 'stroke-[#8b5cf6]'
        })
};
// ── Web Audio Chime ──────────────────────────────────────────────────────────
function playChime() {
    try {
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
        // Second tone for a pleasant double-chime
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1000, ctx.currentTime + 0.2);
        gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.2);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.2);
        osc2.stop(ctx.currentTime + 0.6);
        // Cleanup
        setTimeout(()=>ctx.close(), 1000);
    } catch  {
    // Web Audio not available — silently ignore
    }
}
// ── Format helpers ───────────────────────────────────────────────────────────
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
function formatMinutes(seconds) {
    const m = Math.round(seconds / 60);
    return `${m} min`;
}
// ── SVG Circle Constants ─────────────────────────────────────────────────────
const RING_SIZE = 200;
const RING_STROKE = 6;
const RING_RADIUS = (RING_SIZE - RING_STROKE * 2) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_CENTER = RING_SIZE / 2;
// ── Component ────────────────────────────────────────────────────────────────
function PomodoroTimer({ compact = false, onClose }) {
    // ── State ────────────────────────────────────────────────────────────────
    const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('focus');
    const [timeLeft, setTimeLeft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(DEFAULT_DURATIONS.focus);
    const [isRunning, setIsRunning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [focusSession, setFocusSession] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1); // 1-4
    const [minimized, setMinimized] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showSettings, setShowSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [durations, setDurations] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        ...DEFAULT_DURATIONS
    });
    const [tempDurations, setTempDurations] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        ...DEFAULT_DURATIONS
    });
    const [completedNotification, setCompletedNotification] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const intervalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const startTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const timeLeftRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(DEFAULT_DURATIONS.focus);
    // Keep ref in sync via effect (avoid accessing ref during render)
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        timeLeftRef.current = timeLeft;
    }, [
        timeLeft
    ]);
    const config = MODE_CONFIG[mode](durations);
    const totalDuration = durations[mode];
    const progress = 1 - timeLeft / totalDuration;
    const isLast30Seconds = timeLeft <= 30 && timeLeft > 0 && isRunning;
    // ── Determine ring color ─────────────────────────────────────────────────
    const getRingColor = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (isLast30Seconds) return '#ff5757';
        return config.color;
    }, [
        isLast30Seconds,
        config.color
    ]);
    // ── Timer Tick ───────────────────────────────────────────────────────────
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isRunning) {
            startTimeRef.current = Date.now();
            const startLeft = timeLeftRef.current;
            intervalRef.current = setInterval(()=>{
                const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                const newTimeLeft = Math.max(0, startLeft - elapsed);
                setTimeLeft(newTimeLeft);
                if (newTimeLeft <= 0) {
                    setIsRunning(false);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    playChime();
                    setCompletedNotification(true);
                    setTimeout(()=>setCompletedNotification(false), 4000);
                }
            }, 250); // Update 4x/sec for smoother ring
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return ()=>{
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [
        isRunning
    ]);
    // ── Title sync (show timer in browser tab) ───────────────────────────────
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isRunning) {
            document.title = `${formatTime(timeLeft)} — ${config.label} | MedQ`;
        } else {
            document.title = 'MedQ — Medical Question Generator';
        }
        return ()=>{
            document.title = 'MedQ — Medical Question Generator';
        };
    }, [
        timeLeft,
        isRunning,
        config.label
    ]);
    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleStartPause = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setIsRunning((prev)=>!prev);
    }, []);
    const handleReset = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setIsRunning(false);
        setTimeLeft(durations[mode]);
    }, [
        durations,
        mode
    ]);
    const handleSkip = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setIsRunning(false);
        if (mode === 'focus') {
            if (focusSession >= 4) {
                // After 4 focus sessions, suggest long break
                setMode('longBreak');
                setTimeLeft(durations.longBreak);
                setFocusSession(1);
            } else {
                setMode('shortBreak');
                setTimeLeft(durations.shortBreak);
                setFocusSession((prev)=>prev + 1);
            }
        } else {
            // After any break, go to focus
            setMode('focus');
            setTimeLeft(durations.focus);
        }
    }, [
        mode,
        focusSession,
        durations
    ]);
    const handleModeChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((newMode)=>{
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(durations[newMode]);
    }, [
        durations
    ]);
    const handleSaveSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setDurations({
            ...tempDurations
        });
        // If timer is not running, update current timeLeft
        if (!isRunning) {
            setTimeLeft(tempDurations[mode]);
        }
        setShowSettings(false);
    }, [
        tempDurations,
        isRunning,
        mode
    ]);
    const openSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setTempDurations({
            ...durations
        });
        setShowSettings(true);
    }, [
        durations
    ]);
    // ── SVG Ring ─────────────────────────────────────────────────────────────
    const ringColor = getRingColor();
    const dashOffset = RING_CIRCUMFERENCE * (1 - progress);
    // ── Minimized Bar ────────────────────────────────────────────────────────
    if (minimized) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "relative flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300",
            style: {
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.06)'
            },
            children: [
                isRunning && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "w-2 h-2 rounded-full animate-pulse",
                    style: {
                        background: config.color,
                        boxShadow: `0 0 8px ${config.color}60`
                    }
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-xs font-medium text-[#5a6478]",
                    children: config.label
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-lg font-bold font-mono tracking-wider",
                    style: {
                        color: ringColor
                    },
                    children: formatTime(timeLeft)
                }),
                mode === 'focus' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: "text-[10px] text-[#5a6478]",
                    children: [
                        "#",
                        focusSession,
                        "/4"
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1 ml-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleStartPause,
                            className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                            "aria-label": isRunning ? 'Pause' : 'Start',
                            children: isRunning ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5",
                                style: {
                                    color: config.color
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5",
                                style: {
                                    color: config.color
                                }
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>setMinimized(false),
                            className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                            "aria-label": "Expand",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 text-[#5a6478]"
                            })
                        }),
                        onClose && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onClose,
                            className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 text-[#5a6478]"
                            })
                        })
                    ]
                })
            ]
        });
    }
    // ── Compact Inline Widget ────────────────────────────────────────────────
    if (compact) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300",
            style: {
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.06)'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex items-center gap-1",
                    children: [
                        'focus',
                        'shortBreak',
                        'longBreak'
                    ].map((m)=>{
                        const mc = MODE_CONFIG[m](durations);
                        const isActive = mode === m;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>handleModeChange(m),
                            className: `
                  flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${isActive ? mc.bgClass + ' border border-current/20' : 'text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.04]'}
                `,
                            style: isActive ? {
                                borderColor: mc.color + '33'
                            } : {},
                            children: [
                                mc.icon,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "hidden sm:inline",
                                    children: mc.label
                                })
                            ]
                        }, m);
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                            width: 80,
                            height: 80,
                            className: "-rotate-90",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                    cx: 40,
                                    cy: 40,
                                    r: 34,
                                    fill: "none",
                                    stroke: "rgba(255,255,255,0.06)",
                                    strokeWidth: 4
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                    cx: 40,
                                    cy: 40,
                                    r: 34,
                                    fill: "none",
                                    stroke: ringColor,
                                    strokeWidth: 4,
                                    strokeLinecap: "round",
                                    strokeDasharray: 2 * Math.PI * 34,
                                    strokeDashoffset: 2 * Math.PI * 34 * (1 - progress),
                                    className: "transition-all duration-300 ease-linear"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-base font-bold font-mono",
                                style: {
                                    color: ringColor
                                },
                                children: formatTime(timeLeft)
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleStartPause,
                            className: "flex items-center justify-center w-9 h-9 rounded-xl transition-all",
                            style: {
                                background: ringColor + '18',
                                color: ringColor
                            },
                            "aria-label": isRunning ? 'Pause' : 'Start',
                            children: isRunning ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "w-4 h-4 ml-0.5"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleReset,
                            className: "flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all",
                            "aria-label": "Reset",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleSkip,
                            className: "flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all",
                            "aria-label": "Skip",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        })
                    ]
                }),
                mode === 'focus' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: "text-[10px] text-[#5a6478]",
                    children: [
                        "Session ",
                        focusSession,
                        " of 4"
                    ]
                })
            ]
        });
    }
    // ── Full Widget ──────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative flex flex-col items-center gap-5 p-6 sm:p-8 rounded-2xl border transition-all duration-300",
        style: {
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.06)',
            minWidth: 300
        },
        children: [
            completedNotification && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold z-20 pomo-animate-slide-up",
                style: {
                    background: config.color + '22',
                    color: config.color,
                    border: `1px solid ${config.color}44`,
                    boxShadow: `0 4px 20px ${config.color}22`
                },
                children: mode === 'focus' ? '🎯 Focus session complete!' : '☕ Break is over — back to focus!'
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-5 h-5",
                                style: {
                                    color: config.color
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold text-[#e8ecf4]",
                                children: "Pomodoro Timer"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: openSettings,
                                className: "p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all",
                                "aria-label": "Settings",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setMinimized(true),
                                className: "p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all",
                                "aria-label": "Minimize",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            }),
                            onClose && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onClose,
                                className: "p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all",
                                "aria-label": "Close",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-1.5",
                children: [
                    'focus',
                    'shortBreak',
                    'longBreak'
                ].map((m)=>{
                    const mc = MODE_CONFIG[m](durations);
                    const isActive = mode === m;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>handleModeChange(m),
                        className: `
                flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all
                ${isActive ? mc.bgClass : 'text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.04]'}
              `,
                        style: isActive ? {
                            boxShadow: `0 0 12px ${mc.color}15`
                        } : {},
                        children: [
                            mc.icon,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: mc.label
                            })
                        ]
                    }, m);
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-500",
                        style: {
                            background: ringColor
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                        width: RING_SIZE,
                        height: RING_SIZE,
                        className: "-rotate-90 relative z-10",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                cx: RING_CENTER,
                                cy: RING_CENTER,
                                r: RING_RADIUS,
                                fill: "none",
                                stroke: "rgba(255,255,255,0.06)",
                                strokeWidth: RING_STROKE
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                cx: RING_CENTER,
                                cy: RING_CENTER,
                                r: RING_RADIUS,
                                fill: "none",
                                stroke: ringColor,
                                strokeWidth: RING_STROKE,
                                strokeLinecap: "round",
                                strokeDasharray: RING_CIRCUMFERENCE,
                                strokeDashoffset: dashOffset,
                                className: "transition-all duration-300 ease-linear",
                                style: {
                                    filter: `drop-shadow(0 0 6px ${ringColor}66)`
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "absolute inset-0 flex flex-col items-center justify-center z-20",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mb-1.5 transition-all duration-300",
                                style: {
                                    color: ringColor
                                },
                                children: config.icon
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-4xl sm:text-5xl font-bold font-mono tracking-wider transition-colors duration-300",
                                style: {
                                    color: isLast30Seconds ? '#ff5757' : '#e8ecf4'
                                },
                                children: formatTime(timeLeft)
                            }),
                            mode === 'focus' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[11px] text-[#5a6478] mt-1.5",
                                children: [
                                    "Session ",
                                    focusSession,
                                    " of 4"
                                ]
                            }),
                            mode === 'shortBreak' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[11px] text-[#5a6478] mt-1.5",
                                children: [
                                    "After focus #",
                                    focusSession
                                ]
                            }),
                            mode === 'longBreak' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[11px] text-[#5a6478] mt-1.5",
                                children: "Great work — you earned this!"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleReset,
                        className: "flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all active:scale-95",
                        "aria-label": "Reset",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: "w-5 h-5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleStartPause,
                        className: "flex items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-95",
                        style: {
                            background: ringColor + '20',
                            color: ringColor,
                            boxShadow: `0 0 20px ${ringColor}15`
                        },
                        "aria-label": isRunning ? 'Pause' : 'Start',
                        children: isRunning ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                            className: "w-6 h-6"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-6 h-6 ml-0.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: handleSkip,
                        className: "flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all active:scale-95",
                        "aria-label": "Skip to next",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                            className: "w-5 h-5"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    [
                        1,
                        2,
                        3,
                        4
                    ].map((session)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            style: {
                                background: session < focusSession ? '#00e5a0' : session === focusSession && mode === 'focus' ? '#00e5a0' : 'rgba(255,255,255,0.08)',
                                boxShadow: session === focusSession && mode === 'focus' ? '0 0 8px #00e5a040' : 'none'
                            }
                        }, session)),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] text-[#5a6478] ml-1",
                        children: focusSession < 4 ? `${4 - focusSession} more to long break` : 'Long break next!'
                    })
                ]
            }),
            showSettings && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0 z-30 flex items-center justify-center rounded-2xl",
                style: {
                    background: 'rgba(12,14,20,0.95)',
                    backdropFilter: 'blur(12px)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col gap-5 w-full max-w-xs px-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                                    className: "text-sm font-semibold text-[#e8ecf4]",
                                    children: "Timer Settings"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setShowSettings(false),
                                    className: "p-1.5 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all",
                                    "aria-label": "Close settings",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "text-xs font-medium text-[#5a6478] flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#00e5a0]"
                                        }),
                                        "Focus Duration"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "range",
                                            min: 5,
                                            max: 60,
                                            step: 5,
                                            value: Math.round(tempDurations.focus / 60),
                                            onChange: (e)=>setTempDurations((prev)=>({
                                                        ...prev,
                                                        focus: Number(e.target.value) * 60
                                                    })),
                                            className: "flex-1 accent-[#00e5a0] h-1.5 rounded-full appearance-none cursor-pointer",
                                            style: {
                                                background: `linear-gradient(to right, #00e5a0 0%, #00e5a0 ${(Math.round(tempDurations.focus / 60) - 5) / 55 * 100}%, rgba(255,255,255,0.06) ${(Math.round(tempDurations.focus / 60) - 5) / 55 * 100}%, rgba(255,255,255,0.06) 100%)`
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-mono text-[#e8ecf4] w-14 text-right",
                                            children: formatMinutes(tempDurations.focus)
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "text-xs font-medium text-[#5a6478] flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#f59e0b]"
                                        }),
                                        "Short Break"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "range",
                                            min: 1,
                                            max: 15,
                                            step: 1,
                                            value: Math.round(tempDurations.shortBreak / 60),
                                            onChange: (e)=>setTempDurations((prev)=>({
                                                        ...prev,
                                                        shortBreak: Number(e.target.value) * 60
                                                    })),
                                            className: "flex-1 accent-[#f59e0b] h-1.5 rounded-full appearance-none cursor-pointer",
                                            style: {
                                                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(Math.round(tempDurations.shortBreak / 60) - 1) / 14 * 100}%, rgba(255,255,255,0.06) ${(Math.round(tempDurations.shortBreak / 60) - 1) / 14 * 100}%, rgba(255,255,255,0.06) 100%)`
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-mono text-[#e8ecf4] w-14 text-right",
                                            children: formatMinutes(tempDurations.shortBreak)
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "text-xs font-medium text-[#5a6478] flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_Coffee_Maximize2_Minimize2_Pause_Play_RotateCcw_Settings_SkipForward_Timer_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#8b5cf6]"
                                        }),
                                        "Long Break"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "range",
                                            min: 5,
                                            max: 30,
                                            step: 5,
                                            value: Math.round(tempDurations.longBreak / 60),
                                            onChange: (e)=>setTempDurations((prev)=>({
                                                        ...prev,
                                                        longBreak: Number(e.target.value) * 60
                                                    })),
                                            className: "flex-1 accent-[#8b5cf6] h-1.5 rounded-full appearance-none cursor-pointer",
                                            style: {
                                                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(Math.round(tempDurations.longBreak / 60) - 5) / 25 * 100}%, rgba(255,255,255,0.06) ${(Math.round(tempDurations.longBreak / 60) - 5) / 25 * 100}%, rgba(255,255,255,0.06) 100%)`
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-mono text-[#e8ecf4] w-14 text-right",
                                            children: formatMinutes(tempDurations.longBreak)
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleSaveSettings,
                            className: "w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]",
                            style: {
                                background: '#00e5a0',
                                color: '#0c0e14'
                            },
                            children: "Save Settings"
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 24860:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SkipForward)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "skip-forward",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 4v16",
                key: "7j8fe9"
            }
        ],
        [
            "path",
            {
                d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
                key: "zs4d6"
            }
        ]
    ]
};
__iconData.node;
const SkipForward = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=skip-forward.mjs.map


/***/ }),

/***/ 24893:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Coffee)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34019);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "coffee",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 2v2",
                key: "7u0qdc"
            }
        ],
        [
            "path",
            {
                d: "M14 2v2",
                key: "6buw04"
            }
        ],
        [
            "path",
            {
                d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
                key: "pwadti"
            }
        ],
        [
            "path",
            {
                d: "M6 2v2",
                key: "colzsn"
            }
        ]
    ]
};
__iconData.node;
const Coffee = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=coffee.mjs.map


/***/ })

}]);