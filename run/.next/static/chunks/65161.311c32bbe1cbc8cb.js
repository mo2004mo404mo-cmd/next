"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[65161,87542],{

/***/ 36619:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Play)
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
    name: "play",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
                key: "10ikf1"
            }
        ]
    ]
};
__iconData.node;
const Play = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=play.mjs.map


/***/ }),

/***/ 65161:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RewardedAd)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(63199);
/* harmony import */ var _barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(36619);
/* __next_internal_client_entry_do_not_use__ default auto */ 


/* ── Confetti particle ── */ function ConfettiParticle({ delay, x, color }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "absolute w-2 h-2 rounded-full pointer-events-none",
        style: {
            left: `${x}%`,
            top: '40%',
            backgroundColor: color,
            animation: `confettiFall 1.2s ${delay}ms ease-out forwards`,
            opacity: 0
        }
    });
}
function RewardedAd({ open, onClose, onReward }) {
    const [campaign, setCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [impressionId, setImpressionId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [watching, setWatching] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [completed, setCompleted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [claimed, setClaimed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showConfetti, setShowConfetti] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [soundPulse, setSoundPulse] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [loadError, setLoadError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const CREDITS = 10;
    const DURATION = 15;
    // Ref-based reset to avoid React lint warning about setState in useEffect
    const resetRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) {
            resetRef.current = true;
            return;
        }
        // Reset states when opening (only if we were previously closed)
        if (resetRef.current) {
            resetRef.current = false;
            setProgress(0);
            setWatching(false);
            setCompleted(false);
            setClaimed(false);
            setShowConfetti(false);
            setSoundPulse(false);
        }
        const fetchCampaign = async ()=>{
            try {
                setLoadError(false);
                const res = await fetch('/api/ads/campaigns?placement=dashboard_top');
                if (!res.ok) {
                    setCampaign(null);
                    setLoadError(true);
                    return;
                }
                const data = await res.json();
                const selectedCampaign = data.campaign && data.campaign.adType === 'rewarded' ? data.campaign : null;
                setCampaign(selectedCampaign);
                if (!selectedCampaign) {
                    setLoadError(true);
                    return;
                }
                const impRes = await fetch('/api/ads/impression', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        campaignId: selectedCampaign.id,
                        adType: 'rewarded',
                        placement: 'dashboard_top'
                    })
                });
                if (impRes.ok) {
                    const impData = await impRes.json();
                    setImpressionId(impData.id);
                }
            } catch (e) {
                console.error('RewardedAd fetch error:', e);
                setCampaign(null);
                setLoadError(true);
            }
        };
        fetchCampaign();
    }, [
        open
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!watching || completed) return;
        const interval = setInterval(()=>{
            setProgress((prev)=>{
                const next = prev + 100 / DURATION;
                if (next >= 100) {
                    setCompleted(true);
                    setWatching(false);
                    return 100;
                }
                // Visual "sound" pulse every few seconds
                if (Math.floor(next) % 25 < 7) {
                    setSoundPulse(true);
                    setTimeout(()=>setSoundPulse(false), 300);
                }
                return next;
            });
        }, 1000);
        return ()=>clearInterval(interval);
    }, [
        watching,
        completed
    ]);
    const handleClaim = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!impressionId) return;
        try {
            const res = await fetch('/api/ads/reward', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    impressionId
                })
            });
            if (res.ok) {
                setClaimed(true);
                setShowConfetti(true);
                onReward?.(CREDITS);
                setTimeout(()=>{
                    setShowConfetti(false);
                    onClose();
                }, 2200);
            }
        } catch (e) {
            console.error('Reward claim error:', e);
        }
    }, [
        impressionId,
        onReward,
        onClose
    ]);
    const secondsLeft = Math.ceil(DURATION * (1 - progress / 100));
    if (!open) return null;
    const confettiColors = [
        '#00e5a0',
        '#f59e0b',
        '#8b5cf6',
        '#4fc3f7',
        '#fbbf24',
        '#ff5757'
    ];
    const confettiParticles = showConfetti ? Array.from({
        length: 20
    }, (_, i)=>({
            delay: i * 18,
            x: 10 + i * 11 % 80,
            color: confettiColors[i % confettiColors.length]
        })) : [];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center",
        style: {
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(120px) scale(0.3) rotate(720deg); }
        }
        @keyframes coinPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 229, 160, 0); }
          50% { box-shadow: 0 0 20px 4px rgba(0, 229, 160, 0.3); }
        }
        @keyframes countdownPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative w-full max-w-sm mx-4 bg-[#151821] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl",
                children: [
                    showConfetti && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-0 z-20 pointer-events-none overflow-hidden",
                        children: confettiParticles.map((p, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ConfettiParticle, {
                                delay: p.delay,
                                x: p.x,
                                color: p.color
                            }, i))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: onClose,
                        className: "absolute top-3 right-3 text-white/30 hover:text-white/60 z-10 transition-colors",
                        "aria-label": "Close",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "p-6",
                        children: claimed ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-center py-6",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-16 h-16 rounded-full bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-4",
                                    style: {
                                        animation: 'glowPulse 1s ease-in-out infinite'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                        className: "w-8 h-8 text-[#00e5a0]"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                    className: "text-xl font-bold text-[#e8ecf4]",
                                    children: [
                                        "+",
                                        CREDITS,
                                        " Credits!"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#8b95a8] mt-2",
                                    children: "Use credits to unlock premium features"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-4 flex items-center justify-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#f59e0b]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs text-[#f59e0b] font-semibold",
                                            children: "Reward claimed!"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#f59e0b]"
                                        })
                                    ]
                                })
                            ]
                        }) : completed ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-center py-6",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mx-auto mb-4",
                                    style: {
                                        animation: 'glowPulse 1s ease-in-out infinite'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-8 h-8 text-[#f59e0b]",
                                        style: {
                                            animation: 'coinPulse 1s ease-in-out infinite'
                                        }
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                    className: "text-xl font-bold text-[#e8ecf4]",
                                    children: "Ad Complete!"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#8b95a8] mt-2 mb-5",
                                    children: "Your reward is ready — claim it now!"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    disabled: !impressionId,
                                    onClick: handleClaim,
                                    className: "px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#000] font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#f59e0b]/25 flex items-center gap-2 mx-auto disabled:opacity-60 disabled:cursor-not-allowed",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        " Claim ",
                                        CREDITS,
                                        " Credits"
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2.5 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                className: "w-4 h-4 text-[#f59e0b]"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-sm font-bold text-[#f59e0b]",
                                                    children: [
                                                        "Watch to earn ",
                                                        CREDITS,
                                                        " credits"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] text-[#5a6478]",
                                                    children: [
                                                        "A short ",
                                                        DURATION,
                                                        "s ad — your reward awaits!"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                campaign ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#1a1e2b] rounded-xl p-4 mb-4 border border-white/[0.04]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[9px] font-bold uppercase tracking-wider text-[#00e5a0]/60",
                                            children: "Sponsored"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "text-sm font-bold text-[#e8ecf4] mt-1",
                                            children: campaign.title
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#8b95a8] mt-0.5",
                                            children: campaign.subtitle
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "bg-[#1a1e2b] rounded-xl p-4 mb-4 text-center border border-white/[0.04]",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#8b95a8]",
                                        children: loadError ? 'No ad available right now. Please try again later.' : 'Preparing ad...'
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex items-center justify-center mb-3",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative w-16 h-16",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                        className: "w-16 h-16 -rotate-90",
                                                        viewBox: "0 0 64 64",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                                cx: "32",
                                                                cy: "32",
                                                                r: "28",
                                                                fill: "none",
                                                                stroke: "rgba(255,255,255,0.06)",
                                                                strokeWidth: "4"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                                cx: "32",
                                                                cy: "32",
                                                                r: "28",
                                                                fill: "none",
                                                                stroke: "url(#progressGrad)",
                                                                strokeWidth: "4",
                                                                strokeLinecap: "round",
                                                                strokeDasharray: `${2 * Math.PI * 28}`,
                                                                strokeDashoffset: `${2 * Math.PI * 28 * (1 - progress / 100)}`,
                                                                className: "transition-all duration-1000"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                                                                    id: "progressGrad",
                                                                    x1: "0%",
                                                                    y1: "0%",
                                                                    x2: "100%",
                                                                    y2: "0%",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                                                            offset: "0%",
                                                                            stopColor: "#f59e0b"
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                                                            offset: "100%",
                                                                            stopColor: "#fbbf24"
                                                                        })
                                                                    ]
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "absolute inset-0 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: `text-lg font-bold font-mono ${watching ? 'text-[#f59e0b]' : 'text-[#5a6478]'}`,
                                                            style: watching ? {
                                                                animation: 'countdownPulse 1s ease-in-out infinite'
                                                            } : undefined,
                                                            children: watching ? secondsLeft : DURATION
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-1.5 bg-[#1a1e2b] rounded-full overflow-hidden",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full transition-all duration-1000",
                                                style: {
                                                    width: `${progress}%`
                                                }
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex justify-between mt-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[10px] text-[#5a6478]",
                                                    children: [
                                                        Math.round(progress),
                                                        "%"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[10px] text-[#5a6478]",
                                                    children: [
                                                        secondsLeft,
                                                        "s remaining"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                soundPulse && watching && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-center gap-1 mb-2 animate-pulse",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "w-3 h-3 text-[#4fc3f7]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[9px] text-[#4fc3f7]/60",
                                            children: "Audio playing"
                                        })
                                    ]
                                }),
                                !watching ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    disabled: !campaign,
                                    onClick: ()=>setWatching(true),
                                    className: "w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#00e5a0] to-[#00b87a] text-[#0c0e14] font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#00e5a0]/20 disabled:opacity-60 disabled:cursor-not-allowed",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Coins_Play_Sparkles_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        " Watch Ad & Earn Credits"
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-center",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/10",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs text-[#8b95a8]",
                                                children: "Watching ad... please wait"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 84614:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Volume2)
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
    name: "volume-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
                key: "uqj9uw"
            }
        ],
        [
            "path",
            {
                d: "M16 9a5 5 0 0 1 0 6",
                key: "1q6k2b"
            }
        ],
        [
            "path",
            {
                d: "M19.364 18.364a9 9 0 0 0 0-12.728",
                key: "ijwkga"
            }
        ]
    ]
};
__iconData.node;
const Volume2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=volume-2.mjs.map


/***/ })

}]);