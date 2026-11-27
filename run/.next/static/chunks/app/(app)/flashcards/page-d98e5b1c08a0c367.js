(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[85333],{

/***/ 10214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MatchGame)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69072);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67044);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(95697);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(36083);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28342);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(31966);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88758);
/* __next_internal_client_entry_do_not_use__ default auto */ 




/* ─── Color Constants ─── */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
function MatchTile({ tile, isFlipped, isMatched, isWrong, onClick }) {
    const borderColor = isMatched ? C.green : isWrong ? C.danger : isFlipped ? C.cyan : C.cardBorder;
    const bgColor = isMatched ? `${C.green}08` : isWrong ? `${C.danger}08` : isFlipped ? `${C.cyan}06` : 'rgba(255,255,255,0.02)';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: onClick,
        disabled: isMatched,
        className: `
        relative w-full p-3 rounded-xl border text-left transition-all duration-200
        ${isMatched ? 'opacity-60 cursor-default' : 'cursor-pointer hover:border-white/15'}
      `,
        style: {
            borderColor: `${borderColor}40`,
            background: bgColor,
            boxShadow: isFlipped && !isMatched ? `0 0 15px ${C.cyan}10` : 'none'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0 rounded-xl transition-opacity duration-300",
                style: {
                    background: isFlipped && !isMatched ? `linear-gradient(135deg, ${C.cyan}08, ${C.purple}08)` : 'transparent',
                    opacity: isFlipped ? 1 : 0
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[9px] font-bold uppercase tracking-wider mb-1 block",
                        style: {
                            color: tile.type === 'term' ? C.cyan : C.amber
                        },
                        children: tile.type === 'term' ? 'Term' : 'Definition'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs leading-relaxed",
                        style: {
                            color: isMatched ? C.green : isFlipped ? C.text : C.muted
                        },
                        children: tile.content.length > 80 ? tile.content.slice(0, 78) + '...' : tile.content
                    })
                ]
            }),
            isMatched && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute top-2 right-2",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: C.green
                    }
                })
            })
        ]
    });
}
/* ─── Leaderboard ─── */ function MatchLeaderboard({ entries }) {
    if (entries.length === 0) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-4 rounded-xl border",
        style: {
            background: C.card,
            borderColor: C.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                        className: "w-4 h-4",
                        style: {
                            color: C.amber
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs font-bold",
                        style: {
                            color: C.text
                        },
                        children: "Top Scores"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-1.5",
                children: entries.slice(0, 5).map((entry, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between text-[11px]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: i === 0 ? C.amber : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : C.dimmed
                                        },
                                        children: i === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }) : i === 1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            color: C.muted
                                        },
                                        children: [
                                            Math.round(entry.time),
                                            "s"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "\xb7"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            color: C.muted
                                        },
                                        children: [
                                            entry.mistakes,
                                            " mistakes"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "font-bold",
                                style: {
                                    color: i === 0 ? C.amber : C.cyan
                                },
                                children: [
                                    entry.score,
                                    "pts"
                                ]
                            })
                        ]
                    }, i))
            })
        ]
    });
}
/* ─── Main MatchGame Component ─── */ function MatchGame({ cards, onBack }) {
    const store = (0,_store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$)();
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [elapsed, setElapsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [showResults, setShowResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [leaderboard, setLeaderboard] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // Generate pairs from cards
    const pairs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>cards.slice(0, 8).map((card)=>({
                id: card.id,
                term: card.text.length > 60 ? card.text.slice(0, 58) + '...' : card.text,
                definition: card.answer.length > 60 ? card.answer.slice(0, 58) + '...' : card.answer
            })), [
        cards
    ]);
    // Generate shuffled tiles
    const tiles = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const allTiles = [];
        pairs.forEach((pair)=>{
            allTiles.push({
                id: `${pair.id}-term`,
                pairId: pair.id,
                content: pair.term,
                type: 'term'
            });
            allTiles.push({
                id: `${pair.id}-def`,
                pairId: pair.id,
                content: pair.definition,
                type: 'definition'
            });
        });
        // Shuffle using Fisher-Yates
        for(let i = allTiles.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [allTiles[i], allTiles[j]] = [
                allTiles[j],
                allTiles[i]
            ];
        }
        return allTiles;
    }, [
        pairs
    ]);
    // Initialize match on mount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().initMatch(pairs);
    }, [
        pairs
    ]);
    // Start timer
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        timerRef.current = setInterval(()=>{
            setElapsed((prev)=>prev + 1);
        }, 1000);
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);
    // Handle card click
    const handleTileClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((tile)=>{
        const state = _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState();
        if (state.match.isComplete) return;
        if (state.match.matchedIds.includes(tile.id)) return;
        if (state.match.flippedIds.includes(tile.id)) return;
        if (state.match.flippedIds.length >= 2) return;
        state.flipCard(tile.id);
        const newFlipped = [
            ...state.match.flippedIds,
            tile.id
        ];
        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            const firstTile = tiles.find((t)=>t.id === first);
            const secondTile = tiles.find((t)=>t.id === second);
            if (firstTile && secondTile && firstTile.pairId === secondTile.pairId && firstTile.type !== secondTile.type) {
                // Match found!
                setTimeout(()=>{
                    _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().recordMatch(first, second);
                    // Check completion
                    const newState = _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState();
                    if (newState.match.isComplete) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        handleSubmitScore();
                    }
                }, 400);
            } else {
                // Mismatch
                setTimeout(()=>{
                    _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().recordMismatch();
                }, 800);
            }
        }
    }, [
        tiles
    ]);
    const handleSubmitScore = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const state = _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState();
        const time = (Date.now() - state.match.startTime) / 1000;
        try {
            const res = await fetch('/api/flashcards/match-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    time,
                    mistakes: state.match.mistakes,
                    pairs: pairs.length,
                    score: state.score
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.xpEarned) {
                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`+${data.xpEarned} XP`, {
                        duration: 2000
                    });
                }
                if (data.leaderboard) {
                    setLeaderboard(data.leaderboard);
                }
            }
        } catch  {
        // silent fail
        }
        setShowResults(true);
    }, [
        pairs.length
    ]);
    const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        _store__WEBPACK_IMPORTED_MODULE_3__/* .useFlashcardGameStore */ .$.getState().initMatch(pairs);
        setElapsed(0);
        setShowResults(false);
        // Restart timer
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(()=>{
            setElapsed((prev)=>prev + 1);
        }, 1000);
    }, [
        pairs
    ]);
    const formatTime = (seconds)=>{
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };
    const matchState = store.match;
    const totalPairs = pairs.length;
    const matchedCount = matchState.matchedIds.length / 2;
    const progressPercent = totalPairs > 0 ? matchedCount / totalPairs * 100 : 0;
    /* ─── Results Screen ─── */ if (showResults) {
        const totalTime = matchState.endTime && matchState.startTime ? (matchState.endTime - matchState.startTime) / 1000 : elapsed;
        const timeBonus = Math.max(0, 300 - Math.round(totalTime));
        const mistakePenalty = matchState.mistakes * 15;
        const finalScore = store.score + timeBonus - mistakePenalty;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 overflow-y-auto custom-scrollbar p-6",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center",
                        style: {
                            background: `${C.amber}10`
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "w-10 h-10",
                            style: {
                                color: C.amber
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-2xl font-bold mb-2",
                        style: {
                            color: C.text
                        },
                        children: "Match Complete!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm mb-6",
                        style: {
                            color: C.muted
                        },
                        children: [
                            "You matched all ",
                            totalPairs,
                            " pairs"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-3 gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: formatTime(Math.round(totalTime))
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Time"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.danger
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.danger
                                        },
                                        children: matchState.mistakes
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Mistakes"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.amber
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.amber
                                        },
                                        children: finalScore
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Score"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 rounded-xl border text-left mb-6",
                        style: {
                            background: C.card,
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs font-bold mb-3",
                                style: {
                                    color: C.text
                                },
                                children: "Score Breakdown"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2 text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Base Score"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    color: C.green
                                                },
                                                children: [
                                                    "+",
                                                    store.score
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Time Bonus"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    color: C.cyan
                                                },
                                                children: [
                                                    "+",
                                                    timeBonus
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Mistake Penalty"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                style: {
                                                    color: C.danger
                                                },
                                                children: [
                                                    "-",
                                                    mistakePenalty
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex justify-between pt-2 border-t",
                                        style: {
                                            borderColor: C.cardBorder
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "font-bold",
                                                style: {
                                                    color: C.text
                                                },
                                                children: "Final"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "font-bold",
                                                style: {
                                                    color: C.amber
                                                },
                                                children: finalScore
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchLeaderboard, {
                        entries: leaderboard
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-3 mt-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: handleRestart,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: `${C.cyan}15`,
                                    color: C.cyan,
                                    border: `1px solid ${C.cyan}25`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Play Again"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onBack,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(255,255,255,0.04)',
                                    color: C.muted,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Back"
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    /* ─── Game Board ─── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col flex-1 min-h-0",
        style: {
            background: C.bg
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder,
                    background: C.card
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onBack,
                                className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                                style: {
                                    color: C.muted
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-sm font-bold",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Match Game"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px]",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Match terms to definitions"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-mono font-bold",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: formatTime(elapsed)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: matchState.mistakes > 0 ? C.danger : C.dimmed
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: matchState.mistakes > 0 ? C.danger : C.dimmed
                                        },
                                        children: matchState.mistakes
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: `${C.amber}08`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_CheckCircle2_Crown_Medal_RotateCcw_Star_Timer_Trophy_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.amber
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: C.amber
                                        },
                                        children: store.score
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 py-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px]",
                                style: {
                                    color: C.muted
                                },
                                children: [
                                    matchedCount,
                                    "/",
                                    totalPairs,
                                    " matched"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px]",
                                style: {
                                    color: C.muted
                                },
                                children: [
                                    Math.round(progressPercent),
                                    "%"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full rounded-full transition-all duration-500 ease-out",
                            style: {
                                width: `${progressPercent}%`,
                                background: `linear-gradient(90deg, ${C.cyan}, ${C.green})`
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
                    children: tiles.map((tile)=>{
                        const isFlipped = matchState.flippedIds.includes(tile.id);
                        const isMatched = matchState.matchedIds.includes(tile.id);
                        const isWrong = matchState.flippedIds.length === 2 && matchState.flippedIds.includes(tile.id);
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchTile, {
                            tile: tile,
                            isFlipped: isFlipped || isMatched,
                            isMatched: isMatched,
                            isWrong: isWrong && !isMatched,
                            onClick: ()=>handleTileClick(tile)
                        }, tile.id);
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 23263:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ OfflineEmptyState)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65878);
/* harmony import */ var _barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82749);
/* harmony import */ var _lib_offline_response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59766);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * OfflineEmptyState — a reusable "You're offline" empty-state component.
 *
 * Used by every tab that hits an API endpoint that may not be cached.
 * When the SW returns a 503 offline response (or when navigator.onLine
 * is false and the fetch failed), the tab renders this component instead
 * of misleading "Failed to load" toast + empty list.
 *
 * Props:
 *   - label: what we tried to load (e.g. "questions", "flashcards")
 *   - onRetry: callback for the "Retry" button
 *   - hint: optional extra explanation
 *   - compact: if true, render a smaller version for inline panels
 *
 * IMPORTANT: The `online` event listener is attached ONCE on mount (using
 * a ref to hold the latest onRetry callback). Previously the listener was
 * re-attached on every parent re-render because `onRetry` was a dependency
 * of the useEffect — this caused listener churn and re-render storms when
 * the parent component re-rendered frequently.
 */ 


function OfflineEmptyState({ label = 'content', onRetry, hint, compact = false }) {
    const [retrying, setRetrying] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Use a ref to hold the latest onRetry callback so the `online` event
    // listener doesn't need to be re-attached on every parent re-render.
    // This was a major source of "heavy" feeling — every parent state
    // change was tearing down and re-adding the listener.
    const onRetryRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onRetry);
    onRetryRef.current = onRetry;
    // Auto-retry when the browser comes back online (Telegram-style —
    // user doesn't need to tap Retry if they just wait for connectivity).
    // The empty dependency array means this listener is attached ONCE
    // for the lifetime of this component instance.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleOnline = ()=>{
            const fn = onRetryRef.current;
            if (fn) {
                setRetrying(true);
                // Small delay so the spinner is visible briefly + gives the
                // network time to actually be usable
                setTimeout(()=>{
                    try {
                        fn();
                    } catch (e) {
                    /* ignore */ }
                    setRetrying(false);
                }, 500);
            }
        };
        window.addEventListener('online', handleOnline);
        return ()=>window.removeEventListener('online', handleOnline);
    }, []);
    const handleRetry = ()=>{
        if ((0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_2__/* .browserIsOffline */ .Ey)()) {
            // Browser still offline — no point retrying, just jiggle the button
            // briefly so the user gets feedback that they tapped it
            setRetrying(true);
            setTimeout(()=>setRetrying(false), 400);
            return;
        }
        const fn = onRetryRef.current;
        if (fn) {
            setRetrying(true);
            try {
                Promise.resolve(fn()).finally(()=>setRetrying(false));
            } catch (e) {
                setRetrying(false);
            }
        }
    };
    if (compact) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col items-center justify-center py-8 px-4 text-center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-10 h-10 rounded-xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-2",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-5 h-5 text-[#ffb347]"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-[#ffb347] text-xs font-semibold",
                    children: "You're offline"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-[#5a6178] text-[11px] mt-1 max-w-[240px]",
                    children: hint || `${label[0].toUpperCase() + label.slice(1)} will load once you reconnect.`
                }),
                onRetry && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: handleRetry,
                    disabled: retrying,
                    className: "mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-semibold text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-50 transition-colors",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                            className: `w-3 h-3 ${retrying ? 'animate-spin' : ''}`
                        }),
                        "Retry"
                    ]
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center py-20 px-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-16 h-16 rounded-2xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "w-7 h-7 text-[#ffb347]"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[#ffb347] text-sm font-semibold",
                children: "You're offline"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[#5a6178] text-xs mt-1 text-center max-w-xs",
                children: hint || `The ${label} hasn't been cached yet. Open this tab while online once, and your ${label} will be available offline afterwards.`
            }),
            onRetry && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: handleRetry,
                disabled: retrying,
                className: "mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-50 transition-colors",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_WifiOff_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        className: `w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`
                    }),
                    "Retry"
                ]
            })
        ]
    });
}


/***/ }),

/***/ 26522:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 94681));


/***/ }),

/***/ 29991:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TR: () => (/* binding */ SelectLabel),
/* harmony export */   bq: () => (/* binding */ SelectTrigger),
/* harmony export */   eb: () => (/* binding */ SelectItem),
/* harmony export */   gC: () => (/* binding */ SelectContent),
/* harmony export */   l6: () => (/* binding */ Select),
/* harmony export */   mi: () => (/* binding */ SelectSeparator),
/* harmony export */   s3: () => (/* binding */ SelectGroup),
/* harmony export */   yv: () => (/* binding */ SelectValue)
/* harmony export */ });
/* unused harmony exports SelectScrollDownButton, SelectScrollUpButton */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87925);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59739);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(70943);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4835);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11699);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(29381);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34181);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(50955);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(58585);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(76286);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(73255);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(19766);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(43208);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(54235);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8651);
/* harmony import */ var _base_ui_react_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(40633);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40980);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(94088);
/* __next_internal_client_entry_do_not_use__ Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectScrollDownButton,SelectScrollUpButton,SelectSeparator,SelectTrigger,SelectValue auto */ 




const Select = _base_ui_react_select__WEBPACK_IMPORTED_MODULE_2__/* .SelectRoot */ .H;
function SelectGroup({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectGroup */ .s, {
        "data-slot": "select-group",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("scroll-my-1 p-1", className),
        ...props
    });
}
function SelectValue({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_5__/* .SelectValue */ .y, {
        "data-slot": "select-value",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-1 text-left", className),
        ...props
    });
}
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .b, {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_7__/* .SelectIcon */ .w, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                    className: "pointer-events-none size-4 text-muted-foreground"
                })
            })
        ]
    });
}
function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_9__/* .SelectPortal */ .V, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_10__/* .SelectPositioner */ .l, {
            side: side,
            sideOffset: sideOffset,
            align: align,
            alignOffset: alignOffset,
            alignItemWithTrigger: alignItemWithTrigger,
            className: "isolate z-50",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_11__/* .SelectPopup */ .t, {
                "data-slot": "select-content",
                "data-align-trigger": alignItemWithTrigger,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollUpButton, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_12__/* .SelectList */ .B, {
                        children: children
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollDownButton, {})
                ]
            })
        })
    });
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_13__/* .SelectGroupLabel */ .M, {
        "data-slot": "select-label",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("px-1.5 py-1 text-xs text-muted-foreground", className),
        ...props
    });
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_14__/* .SelectItem */ .e, {
        "data-slot": "select-item",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_15__/* .SelectItemText */ .h, {
                className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
                children: children
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_16__/* .SelectItemIndicator */ .h, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center"
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                    className: "pointer-events-none"
                })
            })
        ]
    });
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectSeparator */ .m, {
        "data-slot": "select-separator",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("pointer-events-none -mx-1 my-1 h-px bg-border", className),
        ...props
    });
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_19__/* .SelectScrollUpArrow */ .w, {
        "data-slot": "select-scroll-up-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {})
    });
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_select__WEBPACK_IMPORTED_MODULE_21__/* .SelectScrollDownArrow */ .d, {
        "data-slot": "select-scroll-down-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {})
    });
}



/***/ }),

/***/ 38272:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LearnMode)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17494);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(93954);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(40557);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(90467);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88758);
/* __next_internal_client_entry_do_not_use__ default auto */ 



/* ─── Color Constants ─── */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
const MASTERY_LABELS = {
    0: {
        label: 'Unseen',
        color: C.dimmed
    },
    1: {
        label: 'New',
        color: C.danger
    },
    2: {
        label: 'Learning',
        color: C.amber
    },
    3: {
        label: 'Reviewing',
        color: C.cyan
    },
    4: {
        label: 'Mastered',
        color: C.green
    }
};
/* ─── Progress Ring SVG ─── */ function ProgressRing({ progress, size = 48, strokeWidth = 4 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - progress / 100 * circumference;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: size,
        height: size,
        className: "-rotate-90",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: `${C.dimmed}20`,
                strokeWidth: strokeWidth
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: progress >= 80 ? C.green : progress >= 50 ? C.cyan : C.amber,
                strokeWidth: strokeWidth,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                strokeLinecap: "round",
                style: {
                    transition: 'stroke-dashoffset 0.5s ease'
                }
            })
        ]
    });
}
/* ─── Main LearnMode Component ─── */ function LearnMode({ cards, onBack }) {
    const store = (0,_store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$)();
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('mcq');
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [typedAnswer, setTypedAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [showResult, setShowResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isCorrect, setIsCorrect] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [sessionComplete, setSessionComplete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [sessionStats, setSessionStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        correct: 0,
        incorrect: 0,
        total: 0
    });
    const currentCard = cards[currentIndex];
    const totalCards = cards.length;
    // Determine phase based on mastery level
    const masteryLevel = currentCard ? store.mastery[currentCard.id]?.level || 0 : 0;
    const effectivePhase = masteryLevel >= 2 ? 'typed' : 'mcq';
    // Generate MCQ options (shuffle correct + distractors)
    const mcqOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!currentCard || effectivePhase !== 'mcq') return [];
        const correctAnswer = currentCard.answer;
        const distractors = cards.filter((c)=>c.id !== currentCard.id).map((c)=>c.answer).slice(0, 3);
        const options = [
            correctAnswer,
            ...distractors
        ];
        // Shuffle
        for(let i = options.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [
                options[j],
                options[i]
            ];
        }
        return options;
    }, [
        currentCard,
        cards,
        effectivePhase
    ]);
    const handleMCQSubmit = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (selectedOption === null || !currentCard) return;
        const selected = mcqOptions[selectedOption];
        const correct = selected === currentCard.answer;
        setIsCorrect(correct);
        setShowResult(true);
        setSessionStats((prev)=>({
                correct: prev.correct + (correct ? 1 : 0),
                incorrect: prev.incorrect + (correct ? 0 : 1),
                total: prev.total + 1
            }));
        _store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().updateMastery(currentCard.id, correct);
        // Record to flashcard progress API
        fetch('/api/flashcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: currentCard.id,
                quality: correct ? 4 : 0
            })
        }).catch(()=>{});
    }, [
        selectedOption,
        mcqOptions,
        currentCard
    ]);
    const handleTypedSubmit = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!typedAnswer.trim() || !currentCard) return;
        const correct = typedAnswer.trim().toLowerCase() === currentCard.answer.trim().toLowerCase() || currentCard.answer.trim().toLowerCase().includes(typedAnswer.trim().toLowerCase());
        setIsCorrect(correct);
        setShowResult(true);
        setSessionStats((prev)=>({
                correct: prev.correct + (correct ? 1 : 0),
                incorrect: prev.incorrect + (correct ? 0 : 1),
                total: prev.total + 1
            }));
        _store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().updateMastery(currentCard.id, correct);
        fetch('/api/flashcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: currentCard.id,
                quality: correct ? 5 : 1
            })
        }).catch(()=>{});
    }, [
        typedAnswer,
        currentCard
    ]);
    const handleNext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (currentIndex >= totalCards - 1) {
            setSessionComplete(true);
            return;
        }
        setCurrentIndex((prev)=>prev + 1);
        setSelectedOption(null);
        setTypedAnswer('');
        setShowResult(false);
    }, [
        currentIndex,
        totalCards
    ]);
    const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setCurrentIndex(0);
        setSelectedOption(null);
        setTypedAnswer('');
        setShowResult(false);
        setSessionComplete(false);
        setSessionStats({
            correct: 0,
            incorrect: 0,
            total: 0
        });
        _store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().resetLearn();
    }, []);
    // Compute mastery stats
    const masteryStats = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const levels = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };
        cards.forEach((card)=>{
            const level = store.mastery[card.id]?.level || 0;
            levels[level]++;
        });
        return levels;
    }, [
        cards,
        store.mastery
    ]);
    const masteredCount = masteryStats[4];
    const masterProgress = totalCards > 0 ? masteredCount / totalCards * 100 : 0;
    const accuracy = sessionStats.total > 0 ? Math.round(sessionStats.correct / sessionStats.total * 100) : 0;
    /* ─── Session Complete ─── */ if (sessionComplete) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 overflow-y-auto custom-scrollbar p-6",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center",
                        style: {
                            background: `${C.green}10`
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                            className: "w-10 h-10",
                            style: {
                                color: C.green
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-2xl font-bold mb-2",
                        style: {
                            color: C.text
                        },
                        children: "Learn Session Complete!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm mb-6",
                        style: {
                            color: C.muted
                        },
                        children: [
                            "You reviewed ",
                            totalCards,
                            " cards"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-3 gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.green
                                        },
                                        children: sessionStats.correct
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Correct"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.danger
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.danger
                                        },
                                        children: sessionStats.incorrect
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Incorrect"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: [
                                            accuracy,
                                            "%"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Accuracy"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 rounded-xl border text-left mb-6",
                        style: {
                            background: C.card,
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs font-bold mb-3 flex items-center gap-2",
                                style: {
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-4 h-4",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    "Mastery Breakdown"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-2",
                                children: [
                                    4,
                                    3,
                                    2,
                                    1,
                                    0
                                ].map((level)=>{
                                    const info = MASTERY_LABELS[level];
                                    const count = masteryStats[level];
                                    if (count === 0) return null;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-2 h-2 rounded-full",
                                                        style: {
                                                            background: info.color
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[11px]",
                                                        style: {
                                                            color: C.muted
                                                        },
                                                        children: info.label
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[11px] font-bold",
                                                style: {
                                                    color: info.color
                                                },
                                                children: count
                                            })
                                        ]
                                    }, level);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: handleRestart,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: `${C.cyan}15`,
                                    color: C.cyan,
                                    border: `1px solid ${C.cyan}25`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Learn Again"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onBack,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(255,255,255,0.04)',
                                    color: C.muted,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Back"
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    if (!currentCard) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 flex items-center justify-center",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                style: {
                    color: C.muted
                },
                children: "No cards available for learning"
            })
        });
    }
    /* ─── Active Learning View ─── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col flex-1 min-h-0",
        style: {
            background: C.bg
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder,
                    background: C.card
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onBack,
                                className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                                style: {
                                    color: C.muted
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-sm font-bold",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Learn Mode"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px]",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Adaptive learning"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: `${MASTERY_LABELS[masteryLevel].color}08`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-2 h-2 rounded-full",
                                        style: {
                                            background: MASTERY_LABELS[masteryLevel].color
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] font-bold",
                                        style: {
                                            color: MASTERY_LABELS[masteryLevel].color
                                        },
                                        children: MASTERY_LABELS[masteryLevel].label
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: C.green
                                        },
                                        children: [
                                            sessionStats.correct,
                                            "/",
                                            sessionStats.total
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProgressRing, {
                                    progress: masterProgress,
                                    size: 40,
                                    strokeWidth: 3
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "absolute inset-0 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-bold",
                                        style: {
                                            color: C.green
                                        },
                                        children: masteredCount
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between mb-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[10px]",
                                            style: {
                                                color: C.muted
                                            },
                                            children: [
                                                "Card ",
                                                currentIndex + 1,
                                                " of ",
                                                totalCards
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[10px]",
                                            style: {
                                                color: C.muted
                                            },
                                            children: [
                                                masteredCount,
                                                "/",
                                                totalCards,
                                                " mastered"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "h-full rounded-full transition-all duration-500",
                                        style: {
                                            width: `${(currentIndex + 1) / totalCards * 100}%`,
                                            background: `linear-gradient(90deg, ${C.cyan}, ${C.green})`
                                        }
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-6",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "p-5 rounded-2xl border mb-5",
                            style: {
                                background: `${C.cyan}04`,
                                borderColor: `${C.cyan}15`
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-4 h-4 flex-shrink-0 mt-0.5",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] uppercase tracking-wider font-semibold mb-2",
                                                style: {
                                                    color: C.cyan
                                                },
                                                children: effectivePhase === 'mcq' ? 'Multiple Choice' : 'Type Your Answer'
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-sm leading-relaxed",
                                                style: {
                                                    color: C.text
                                                },
                                                children: currentCard.text
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex-1 h-1 rounded-full",
                                    style: {
                                        background: effectivePhase === 'mcq' ? C.cyan : `${C.cyan}20`
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex-1 h-1 rounded-full",
                                    style: {
                                        background: effectivePhase === 'typed' ? C.green : `${C.dimmed}20`
                                    }
                                })
                            ]
                        }),
                        effectivePhase === 'mcq' && !showResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2 mb-5",
                            children: [
                                mcqOptions.map((option, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>setSelectedOption(idx),
                                        className: "w-full text-left p-3.5 rounded-xl border transition-all",
                                        style: {
                                            background: selectedOption === idx ? `${C.cyan}08` : 'rgba(255,255,255,0.01)',
                                            borderColor: selectedOption === idx ? `${C.cyan}30` : C.cardBorder,
                                            cursor: 'pointer'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold",
                                                    style: {
                                                        background: selectedOption === idx ? `${C.cyan}20` : 'rgba(255,255,255,0.03)',
                                                        color: selectedOption === idx ? C.cyan : C.muted,
                                                        border: `1px solid ${selectedOption === idx ? `${C.cyan}40` : 'transparent'}`
                                                    },
                                                    children: String.fromCharCode(65 + idx)
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[12px] leading-relaxed flex-1",
                                                    style: {
                                                        color: selectedOption === idx ? C.text : C.muted
                                                    },
                                                    children: option
                                                })
                                            ]
                                        })
                                    }, idx)),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: handleMCQSubmit,
                                    disabled: selectedOption === null,
                                    className: "w-full py-3 rounded-xl text-sm font-bold transition-all mt-3",
                                    style: {
                                        background: selectedOption !== null ? C.cyan : `${C.dimmed}30`,
                                        color: selectedOption !== null ? C.bg : C.dimmed,
                                        cursor: selectedOption !== null ? 'pointer' : 'not-allowed'
                                    },
                                    children: "Check Answer"
                                })
                            ]
                        }),
                        effectivePhase === 'typed' && !showResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        value: typedAnswer,
                                        onChange: (e)=>setTypedAnswer(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') handleTypedSubmit();
                                        },
                                        placeholder: "Type your answer...",
                                        className: "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#22d3ee]/40 transition-colors",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: C.cardBorder,
                                            color: C.text
                                        },
                                        autoFocus: true
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: handleTypedSubmit,
                                    disabled: !typedAnswer.trim(),
                                    className: "w-full py-3 rounded-xl text-sm font-bold transition-all mt-3",
                                    style: {
                                        background: typedAnswer.trim() ? C.green : `${C.dimmed}30`,
                                        color: typedAnswer.trim() ? C.bg : C.dimmed,
                                        cursor: typedAnswer.trim() ? 'pointer' : 'not-allowed'
                                    },
                                    children: "Submit Answer"
                                })
                            ]
                        }),
                        showResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "animate-in fade-in slide-in-from-bottom-2 duration-300",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "p-4 rounded-xl border mb-4",
                                    style: {
                                        borderColor: `${isCorrect ? C.green : C.danger}30`,
                                        background: `${isCorrect ? C.green : C.danger}05`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            children: [
                                                isCorrect ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "w-5 h-5",
                                                    style: {
                                                        color: C.green
                                                    }
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "w-5 h-5",
                                                    style: {
                                                        color: C.danger
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: isCorrect ? C.green : C.danger
                                                    },
                                                    children: isCorrect ? 'Correct!' : 'Not quite right'
                                                })
                                            ]
                                        }),
                                        !isCorrect && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "p-3 rounded-lg mb-2",
                                            style: {
                                                background: `${C.green}08`,
                                                border: `1px solid ${C.green}20`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] uppercase tracking-wider font-semibold mb-1",
                                                    style: {
                                                        color: C.green
                                                    },
                                                    children: "Correct Answer"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-sm",
                                                    style: {
                                                        color: C.text
                                                    },
                                                    children: currentCard.answer
                                                })
                                            ]
                                        }),
                                        currentCard.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs leading-relaxed",
                                            style: {
                                                color: C.muted
                                            },
                                            children: currentCard.explanation
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 mb-4 px-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5",
                                            style: {
                                                color: C.purple
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[10px] font-bold uppercase tracking-wider",
                                            style: {
                                                color: C.purple
                                            },
                                            children: [
                                                "Mastery: ",
                                                MASTERY_LABELS[_store__WEBPACK_IMPORTED_MODULE_2__/* .useFlashcardGameStore */ .$.getState().mastery[currentCard.id]?.level || 0].label
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: handleNext,
                                    className: "w-full py-3 rounded-xl text-sm font-bold transition-all",
                                    style: {
                                        background: `${C.cyan}15`,
                                        color: C.cyan,
                                        border: `1px solid ${C.cyan}25`
                                    },
                                    children: [
                                        currentIndex >= totalCards - 1 ? 'Finish Session' : 'Continue',
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_ArrowRight_BarChart3_BookOpen_Brain_CheckCircle2_RotateCcw_Sparkles_Target_TrendingUp_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "w-4 h-4 inline ml-2"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 40980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29722);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(622);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .$)(inputs));
}


/***/ }),

/***/ 45160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Badge)
/* harmony export */ });
/* unused harmony export badgeVariants */
/* harmony import */ var _base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40253);
/* harmony import */ var _base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41537);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18460);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52968);




const badgeVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_0__/* .cva */ .F)("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
            destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
            outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
            ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
            link: "text-primary underline-offset-4 hover:underline"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant = "default", render, ...props }) {
    return (0,_base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__/* .useRender */ .C)({
        defaultTagName: "span",
        props: (0,_base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__/* .mergeProps */ .v6)({
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)(badgeVariants({
                variant
            }), className)
        }, props),
        render,
        state: {
            slot: "badge",
            variant
        }
    });
}



/***/ }),

/***/ 54776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ TestMode)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(28342);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76721);
/* __next_internal_client_entry_do_not_use__ default auto */ 


/* ─── Color Constants ─── */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}
/* ─── Test Setup Screen ─── */ function TestSetup({ cards, onStart, onBack }) {
    const [questionCount, setQuestionCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Math.min(10, cards.length));
    const [includeMCQ, setIncludeMCQ] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [includeTF, setIncludeTF] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [includeWritten, setIncludeWritten] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const selectedTypes = [];
    if (includeMCQ) selectedTypes.push('mcq');
    if (includeTF) selectedTypes.push('tf');
    if (includeWritten) selectedTypes.push('written');
    const canStart = selectedTypes.length > 0 && questionCount > 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex-1 overflow-y-auto custom-scrollbar p-6",
        style: {
            background: C.bg
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-md mx-auto",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onBack,
                            className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                            style: {
                                color: C.muted
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold",
                                    style: {
                                        color: C.text
                                    },
                                    children: "Practice Test"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs",
                                    style: {
                                        color: C.muted
                                    },
                                    children: "Configure your test"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-4 rounded-xl border mb-4",
                    style: {
                        background: C.card,
                        borderColor: C.cardBorder
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs font-bold mb-3",
                            style: {
                                color: C.text
                            },
                            children: "Number of Questions"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setQuestionCount(Math.max(1, questionCount - 1)),
                                    className: "w-8 h-8 rounded-lg flex items-center justify-center border",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        borderColor: C.cardBorder,
                                        color: C.muted
                                    },
                                    children: "-"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-2xl font-black flex-1 text-center",
                                    style: {
                                        color: C.cyan
                                    },
                                    children: questionCount
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setQuestionCount(Math.min(cards.length, questionCount + 1)),
                                    className: "w-8 h-8 rounded-lg flex items-center justify-center border",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        borderColor: C.cardBorder,
                                        color: C.muted
                                    },
                                    children: "+"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                            type: "range",
                            min: 1,
                            max: Math.min(30, cards.length),
                            value: questionCount,
                            onChange: (e)=>setQuestionCount(parseInt(e.target.value)),
                            className: "w-full mt-3 accent-[#22d3ee]"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-4 rounded-xl border mb-4",
                    style: {
                        background: C.card,
                        borderColor: C.cardBorder
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs font-bold mb-3",
                            style: {
                                color: C.text
                            },
                            children: "Question Types"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2",
                            children: [
                                {
                                    type: 'mcq',
                                    label: 'Multiple Choice',
                                    desc: 'Select the correct answer from options',
                                    checked: includeMCQ,
                                    toggle: ()=>setIncludeMCQ(!includeMCQ),
                                    color: C.cyan
                                },
                                {
                                    type: 'tf',
                                    label: 'True / False',
                                    desc: 'Determine if the statement is true or false',
                                    checked: includeTF,
                                    toggle: ()=>setIncludeTF(!includeTF),
                                    color: C.amber
                                },
                                {
                                    type: 'written',
                                    label: 'Written Answer',
                                    desc: 'Type your answer without hints',
                                    checked: includeWritten,
                                    toggle: ()=>setIncludeWritten(!includeWritten),
                                    color: C.purple
                                }
                            ].map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: item.toggle,
                                    className: "w-full text-left p-3 rounded-xl border transition-all",
                                    style: {
                                        background: item.checked ? `${item.color}06` : 'transparent',
                                        borderColor: item.checked ? `${item.color}25` : C.cardBorder
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-semibold",
                                                        style: {
                                                            color: item.checked ? C.text : C.muted
                                                        },
                                                        children: item.label
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[10px]",
                                                        style: {
                                                            color: C.dimmed
                                                        },
                                                        children: item.desc
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-5 h-5 rounded-md border flex items-center justify-center",
                                                style: {
                                                    background: item.checked ? item.color : 'transparent',
                                                    borderColor: item.checked ? item.color : C.cardBorder
                                                },
                                                children: item.checked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5",
                                                    style: {
                                                        color: C.bg
                                                    }
                                                })
                                            })
                                        ]
                                    })
                                }, item.type))
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: ()=>canStart && onStart(questionCount, selectedTypes),
                    disabled: !canStart,
                    className: "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
                    style: {
                        background: canStart ? C.cyan : `${C.dimmed}30`,
                        color: canStart ? C.bg : C.dimmed,
                        cursor: canStart ? 'pointer' : 'not-allowed'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                            className: "w-4 h-4 inline mr-2"
                        }),
                        "Start Test (",
                        questionCount,
                        " questions)"
                    ]
                })
            ]
        })
    });
}
/* ─── Main TestMode Component ─── */ function TestMode({ cards, onBack }) {
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('setup');
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentIdx, setCurrentIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [typedAnswer, setTypedAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [timer, setTimer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [questionTimer, setQuestionTimer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const qTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Start test
    const handleStartTest = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((count, types)=>{
        // Generate test questions from cards
        const shuffled = [
            ...cards
        ].sort(()=>Math.random() - 0.5).slice(0, count);
        const testQuestions = shuffled.map((card, idx)=>{
            const type = types[idx % types.length];
            const q = {
                cardId: card.id,
                questionText: card.text,
                correctAnswer: card.answer,
                questionType: type,
                explanation: card.explanation,
                userAnswer: '',
                isCorrect: false,
                timeSpent: 0
            };
            if (type === 'mcq') {
                // Build MCQ options
                const distractors = cards.filter((c)=>c.id !== card.id).map((c)=>c.answer).sort(()=>Math.random() - 0.5).slice(0, 3);
                const options = [
                    card.answer,
                    ...distractors
                ].sort(()=>Math.random() - 0.5);
                q.options = options;
            } else if (type === 'tf') {
                // For TF, randomly decide if the statement is true or false
                const isTrueStatement = Math.random() > 0.5;
                if (!isTrueStatement) {
                    // Make it false by modifying the answer slightly
                    q.questionText = card.text;
                    q.correctAnswer = 'False';
                    q.options = [
                        'True',
                        'False'
                    ];
                } else {
                    q.correctAnswer = 'True';
                    q.options = [
                        'True',
                        'False'
                    ];
                }
            }
            // written: no options
            return q;
        });
        setQuestions(testQuestions);
        setCurrentIdx(0);
        setPhase('testing');
        setTimer(0);
        // Start timers
        timerRef.current = setInterval(()=>setTimer((t)=>t + 1), 1000);
        qTimerRef.current = setInterval(()=>setQuestionTimer((t)=>t + 1), 1000);
    }, [
        cards
    ]);
    // Stop timers
    const stopTimers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (qTimerRef.current) {
            clearInterval(qTimerRef.current);
            qTimerRef.current = null;
        }
    }, []);
    // Submit answer for current question
    const handleSubmitAnswer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const q = questions[currentIdx];
        if (!q) return;
        let answer = '';
        let correct = false;
        if (q.questionType === 'mcq' && q.options && selectedOption !== null) {
            answer = q.options[selectedOption];
            correct = answer === q.correctAnswer;
        } else if (q.questionType === 'tf' && q.options && selectedOption !== null) {
            answer = q.options[selectedOption];
            correct = answer === q.correctAnswer;
        } else if (q.questionType === 'written') {
            answer = typedAnswer.trim();
            correct = answer.toLowerCase() === q.correctAnswer.toLowerCase() || q.correctAnswer.toLowerCase().includes(answer.toLowerCase());
        }
        const updated = [
            ...questions
        ];
        updated[currentIdx] = {
            ...updated[currentIdx],
            userAnswer: answer,
            isCorrect: correct,
            timeSpent: questionTimer
        };
        setQuestions(updated);
        // Record to API
        fetch('/api/flashcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: q.cardId,
                quality: correct ? 4 : 1
            })
        }).catch(()=>{});
        // Next question or finish
        if (currentIdx + 1 >= questions.length) {
            stopTimers();
            setPhase('results');
        } else {
            setCurrentIdx((prev)=>prev + 1);
            setSelectedOption(null);
            setTypedAnswer('');
            setQuestionTimer(0);
            // Restart question timer
            if (qTimerRef.current) clearInterval(qTimerRef.current);
            qTimerRef.current = setInterval(()=>setQuestionTimer((t)=>t + 1), 1000);
        }
    }, [
        questions,
        currentIdx,
        selectedOption,
        typedAnswer,
        questionTimer,
        stopTimers
    ]);
    // Cleanup
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>stopTimers();
    }, [
        stopTimers
    ]);
    const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setPhase('setup');
        setQuestions([]);
        setCurrentIdx(0);
        setTimer(0);
        setSelectedOption(null);
        setTypedAnswer('');
    }, []);
    /* ─── Setup Phase ─── */ if (phase === 'setup') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TestSetup, {
            cards: cards,
            onStart: handleStartTest,
            onBack: onBack
        });
    }
    /* ─── Results Phase ─── */ if (phase === 'results') {
        const correctCount = questions.filter((q)=>q.isCorrect).length;
        const totalQuestions = questions.length;
        const scorePercent = Math.round(correctCount / totalQuestions * 100);
        const avgTime = Math.round(questions.reduce((s, q)=>s + q.timeSpent, 0) / totalQuestions);
        const gradeLabel = scorePercent >= 90 ? 'Outstanding' : scorePercent >= 75 ? 'Good' : scorePercent >= 60 ? 'Passing' : 'Needs Work';
        const gradeColor = scorePercent >= 90 ? C.green : scorePercent >= 75 ? C.cyan : scorePercent >= 60 ? C.amber : C.danger;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-1 overflow-y-auto custom-scrollbar p-6",
            style: {
                background: C.bg
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative w-28 h-28 mx-auto mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                        className: "w-full h-full -rotate-90",
                                        viewBox: "0 0 100 100",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                cx: "50",
                                                cy: "50",
                                                r: "42",
                                                fill: "none",
                                                stroke: `${C.dimmed}20`,
                                                strokeWidth: "6"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                                cx: "50",
                                                cy: "50",
                                                r: "42",
                                                fill: "none",
                                                stroke: gradeColor,
                                                strokeWidth: "6",
                                                strokeDasharray: `${scorePercent / 100 * 264} 264`,
                                                strokeLinecap: "round",
                                                style: {
                                                    transition: 'stroke-dasharray 1s ease'
                                                }
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "absolute inset-0 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-2xl font-black",
                                                style: {
                                                    color: gradeColor
                                                },
                                                children: [
                                                    scorePercent,
                                                    "%"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[8px] uppercase tracking-wider",
                                                style: {
                                                    color: C.muted
                                                },
                                                children: "Score"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-bold mb-1",
                                style: {
                                    color: C.text
                                },
                                children: gradeLabel
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-sm",
                                style: {
                                    color: C.muted
                                },
                                children: [
                                    correctCount,
                                    "/",
                                    totalQuestions,
                                    " correct \xb7 ",
                                    formatTime(timer),
                                    " total"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-3 gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.green
                                        },
                                        children: correctCount
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Correct"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.danger
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.danger
                                        },
                                        children: totalQuestions - correctCount
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Incorrect"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-4 rounded-xl border text-center",
                                style: {
                                    background: C.card,
                                    borderColor: C.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-5 h-5 mx-auto mb-2",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xl font-black",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: [
                                            avgTime,
                                            "s"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] uppercase tracking-wider",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Avg/Q"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                className: "text-xs font-bold mb-3 flex items-center gap-2",
                                style: {
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-4 h-4",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    "Answer Review"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-2",
                                children: questions.map((q, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "p-3 rounded-xl border",
                                        style: {
                                            background: q.isCorrect ? `${C.green}04` : `${C.danger}04`,
                                            borderColor: q.isCorrect ? `${C.green}15` : `${C.danger}15`
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold",
                                                    style: {
                                                        background: q.isCorrect ? `${C.green}15` : `${C.danger}15`,
                                                        color: q.isCorrect ? C.green : C.danger
                                                    },
                                                    children: idx + 1
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[11px] font-semibold mb-1 line-clamp-2",
                                                            style: {
                                                                color: C.text
                                                            },
                                                            children: q.questionText.length > 80 ? q.questionText.slice(0, 78) + '...' : q.questionText
                                                        }),
                                                        !q.isCorrect && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                    className: "text-[10px]",
                                                                    style: {
                                                                        color: C.danger
                                                                    },
                                                                    children: [
                                                                        "Your answer: ",
                                                                        q.userAnswer || '(none)'
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                    className: "text-[10px]",
                                                                    style: {
                                                                        color: C.green
                                                                    },
                                                                    children: [
                                                                        "Correct: ",
                                                                        q.correctAnswer
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        q.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[10px] mt-1 line-clamp-2",
                                                            style: {
                                                                color: C.dimmed
                                                            },
                                                            children: q.explanation
                                                        })
                                                    ]
                                                }),
                                                q.isCorrect ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 flex-shrink-0",
                                                    style: {
                                                        color: C.green
                                                    }
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 flex-shrink-0",
                                                    style: {
                                                        color: C.danger
                                                    }
                                                })
                                            ]
                                        })
                                    }, idx))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: handleRestart,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: `${C.cyan}15`,
                                    color: C.cyan,
                                    border: `1px solid ${C.cyan}25`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " New Test"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onBack,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(255,255,255,0.04)',
                                    color: C.muted,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    " Back"
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    /* ─── Testing Phase ─── */ const currentQ = questions[currentIdx];
    if (!currentQ) return null;
    const canSubmit = currentQ.questionType === 'written' ? typedAnswer.trim().length > 0 : selectedOption !== null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col flex-1 min-h-0",
        style: {
            background: C.bg
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 border-b",
                style: {
                    borderColor: C.cardBorder,
                    background: C.card
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center gap-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-sm font-bold",
                                    style: {
                                        color: C.text
                                    },
                                    children: "Practice Test"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[10px]",
                                    style: {
                                        color: C.dimmed
                                    },
                                    children: [
                                        "Question ",
                                        currentIdx + 1,
                                        " of ",
                                        questions.length
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-2 py-0.5 rounded-full font-bold",
                                style: {
                                    background: currentQ.questionType === 'mcq' ? `${C.cyan}12` : currentQ.questionType === 'tf' ? `${C.amber}12` : `${C.purple}12`,
                                    color: currentQ.questionType === 'mcq' ? C.cyan : currentQ.questionType === 'tf' ? C.amber : C.purple
                                },
                                children: currentQ.questionType === 'mcq' ? 'MCQ' : currentQ.questionType === 'tf' ? 'T/F' : 'Written'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(255,255,255,0.03)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-mono font-bold",
                                        style: {
                                            color: C.cyan
                                        },
                                        children: formatTime(timer)
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 py-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-1 bg-white/[0.04] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full rounded-full transition-all duration-300",
                            style: {
                                width: `${currentIdx / questions.length * 100}%`,
                                background: C.cyan
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex justify-between mt-1",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex gap-1",
                            children: questions.map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-2 h-2 rounded-full",
                                    style: {
                                        background: i < currentIdx ? questions[i]?.isCorrect ? C.green : C.danger : i === currentIdx ? C.cyan : `${C.dimmed}30`
                                    }
                                }, i))
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-6",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "p-5 rounded-2xl border mb-5",
                            style: {
                                background: `${C.cyan}04`,
                                borderColor: `${C.cyan}15`
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
                                        style: {
                                            background: `${C.cyan}15`,
                                            color: C.cyan
                                        },
                                        children: currentIdx + 1
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-sm leading-relaxed",
                                        style: {
                                            color: C.text
                                        },
                                        children: currentQ.questionText
                                    })
                                ]
                            })
                        }),
                        (currentQ.questionType === 'mcq' || currentQ.questionType === 'tf') && currentQ.options && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2 mb-5",
                            children: currentQ.options.map((option, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setSelectedOption(idx),
                                    className: "w-full text-left p-3.5 rounded-xl border transition-all",
                                    style: {
                                        background: selectedOption === idx ? `${C.cyan}08` : 'rgba(255,255,255,0.01)',
                                        borderColor: selectedOption === idx ? `${C.cyan}30` : C.cardBorder,
                                        cursor: 'pointer'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold",
                                                style: {
                                                    background: selectedOption === idx ? `${C.cyan}20` : 'rgba(255,255,255,0.03)',
                                                    color: selectedOption === idx ? C.cyan : C.muted,
                                                    border: `1px solid ${selectedOption === idx ? `${C.cyan}40` : 'transparent'}`
                                                },
                                                children: currentQ.questionType === 'tf' ? idx === 0 ? 'T' : 'F' : String.fromCharCode(65 + idx)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[12px] leading-relaxed flex-1",
                                                style: {
                                                    color: selectedOption === idx ? C.text : C.muted
                                                },
                                                children: option
                                            })
                                        ]
                                    })
                                }, idx))
                        }),
                        currentQ.questionType === 'written' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "mb-5",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                value: typedAnswer,
                                onChange: (e)=>setTypedAnswer(e.target.value),
                                placeholder: "Type your answer...",
                                className: "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#22d3ee]/40 transition-colors min-h-[100px] resize-y",
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: C.cardBorder,
                                    color: C.text
                                },
                                autoFocus: true
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: handleSubmitAnswer,
                            disabled: !canSubmit,
                            className: "w-full py-3 rounded-xl text-sm font-bold transition-all",
                            style: {
                                background: canSubmit ? C.cyan : `${C.dimmed}30`,
                                color: canSubmit ? C.bg : C.dimmed,
                                cursor: canSubmit ? 'pointer' : 'not-allowed'
                            },
                            children: [
                                currentIdx + 1 >= questions.length ? 'Finish Test' : 'Next Question',
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_CheckCircle2_ChevronRight_FileText_RotateCcw_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-4 h-4 inline ml-1"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 59766:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ey: () => (/* binding */ browserIsOffline),
/* harmony export */   ej: () => (/* binding */ isOfflineError)
/* harmony export */ });
/* unused harmony exports isOfflineStatus, isOfflineBody */
/* __next_internal_client_entry_do_not_use__ isOfflineStatus,isOfflineBody,isOfflineError,browserIsOffline auto */ /**
 * Helpers for gracefully handling offline 503 responses from the SW.
 *
 * The SW (public/sw.js) returns:
 *   { status: 503, body: { error: string, offline: true } }
 * for any API GET that fails because the network is down AND no cached
 * response is available.
 *
 * Without these helpers, tab components show misleading errors like:
 *   - "Failed to load questions" (BankTab)
 *   - "Failed to fetch dashboard data" (DashboardTab)
 *   - "Fetch rooms error" (ChatTab)
 * …even though the actual cause is just "you're offline, no cache".
 *
 * Usage:
 *   const res = await fetch('/api/questions?...');
 *   if (!res.ok) {
 *     if (isOfflineResponse(res)) {
 *       // Show "You're offline — showing cached data when available" empty state
 *     } else {
 *       // Show generic "Failed to load" error
 *     }
 *   }
 */ /**
 * Returns true if the Response is a 503 from the SW's offline fallback.
 * The SW stamps these responses with `{ offline: true }` in the JSON body.
 *
 * Note: this only works AFTER `await res.json()` has been called, OR by
 * checking the status code alone (less precise but doesn't require parsing).
 */ function isOfflineStatus(res) {
    return res.status === 503;
}
/**
 * Returns true if the parsed JSON body has `offline: true` — the marker
 * the SW adds to its offline fallback responses.
 *
 * Use this when you've already parsed the response body:
 *   const data = await res.json().catch(() => null);
 *   if (isOfflineBody(data)) { ... }
 */ function isOfflineBody(data) {
    return !!data && typeof data === 'object' && data.offline === true;
}
/**
 * Combined check: status 503 OR body.offline === true.
 *
 * Example:
 *   const res = await fetch('/api/dashboard');
 *   if (!res.ok) {
 *     const data = await res.json().catch(() => null);
 *     if (isOfflineError(res, data)) {
 *       setOfflineEmptyState(true);  // show "You're offline" UI
 *     } else {
 *       setError('Failed to load');  // show generic error
 *     }
 *     return;
 *   }
 */ function isOfflineError(res, data) {
    return isOfflineStatus(res) || isOfflineBody(data);
}
/**
 * Convenience: returns true if the browser is currently offline.
 * Use this to preemptively skip fetches that will obviously fail.
 */ function browserIsOffline() {
    return typeof navigator !== 'undefined' && !navigator.onLine;
}


/***/ }),

/***/ 75478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FU: () => (/* binding */ MEDICAL_SYSTEMS),
/* harmony export */   Fc: () => (/* binding */ DIFFICULTY_COLORS),
/* harmony export */   L7: () => (/* binding */ TOPIC_MAP),
/* harmony export */   My: () => (/* binding */ DIFFICULTY_LABELS),
/* harmony export */   Yg: () => (/* binding */ DIFFICULTY_LEVELS),
/* harmony export */   bU: () => (/* binding */ QUESTION_TYPES),
/* harmony export */   hy: () => (/* binding */ normalizeDifficulty),
/* harmony export */   rX: () => (/* binding */ DIFFICULTY_OPTIONS)
/* harmony export */ });
/* unused harmony exports DIFFICULTY_BG_COLORS, getDifficultyLevel */
const MEDICAL_SYSTEMS = [
    'OBG',
    'Cardiovascular',
    'Respiratory',
    'Neurological',
    'Gastrointestinal',
    'Renal',
    'Endocrine',
    'Hematologic',
    'Musculoskeletal',
    'Integumentary',
    'Reproductive',
    'Immunologic',
    'Pharmacology',
    'Pathology',
    'Microbiology',
    'Biochemistry'
];
const TOPIC_MAP = {
    OBG: [
        'Operative Vaginal Delivery',
        'Malpresentation Malpositions Breech',
        'Abnormal Labour Patterns',
        'Multiple Multifetal Pregnancy',
        'Postpartum Hemorrhage PPH',
        'PROM Preterm Labour',
        'SGA Fetal Growth Restriction',
        'Rh Iso-immunization',
        'Cesarean Delivery',
        'Amenorrhea',
        'Hyperprolactinemia Hirsutism PCOS',
        'Puberty Menopause',
        'Physiology of Menstruation',
        'Anatomy Embryology'
    ],
    Cardiovascular: [
        'Hypertension',
        'Heart Failure',
        'Arrhythmias',
        'Coronary Artery Disease',
        'Valvular Heart Disease',
        'Myocarditis',
        'Aortic Dissection',
        'Endocarditis'
    ],
    Respiratory: [
        'COPD',
        'Asthma',
        'Pneumonia',
        'Pulmonary Embolism',
        'Interstitial Lung Disease',
        'ARDS',
        'Lung Cancer',
        'Pleural Effusion'
    ],
    Neurological: [
        'Stroke',
        'Epilepsy',
        'Parkinson Disease',
        'Multiple Sclerosis',
        'Meningitis',
        'Myasthenia Gravis',
        'Alzheimer Disease',
        'Guillain-Barre'
    ],
    Gastrointestinal: [
        'Peptic Ulcer Disease',
        'Inflammatory Bowel Disease',
        'Pancreatitis',
        'Cirrhosis',
        'Hepatitis',
        'Celiac Disease',
        'GI Bleeding',
        'Appendicitis'
    ],
    Renal: [
        'Acute Kidney Injury',
        'Chronic Kidney Disease',
        'Nephrotic Syndrome',
        'Glomerulonephritis',
        'Renal Stones',
        'UTI',
        'Polycystic Kidney Disease'
    ],
    Endocrine: [
        'Diabetes Mellitus',
        'Thyroid Disorders',
        'Cushing Syndrome',
        'Addison Disease',
        'Pheochromocytoma',
        'Hyperparathyroidism',
        'SIADH',
        'Diabetes Insipidus'
    ],
    Hematologic: [
        'Anemia',
        'Leukemia',
        'Lymphoma',
        'Coagulation Disorders',
        'Sickle Cell Disease',
        'Thrombocytopenia',
        'Hemophilia',
        'DIC'
    ],
    Musculoskeletal: [
        'Rheumatoid Arthritis',
        'Osteoarthritis',
        'Osteoporosis',
        'Gout',
        'Lyme Disease',
        'Osteomyelitis',
        'Fractures',
        'Lupus'
    ],
    Integumentary: [
        'Melanoma',
        'Psoriasis',
        'Eczema',
        'Burns',
        'Cellulitis',
        'Contact Dermatitis',
        'Acne Vulgaris',
        'Basal Cell Carcinoma'
    ],
    Reproductive: [
        'Ectopic Pregnancy',
        'PCOS',
        'Endometriosis',
        'Preeclampsia',
        'Prostate Cancer',
        'Cervical Cancer',
        'Infertility',
        'Menorrhagia'
    ],
    Immunologic: [
        'HIV/AIDS',
        'Autoimmune Diseases',
        'Transplant Rejection',
        'Primary Immunodeficiency',
        'Anaphylaxis',
        'SLE',
        'Sarcoidosis',
        'Vasculitis'
    ],
    Pharmacology: [
        'ACE Inhibitors',
        'Beta Blockers',
        'Statins',
        'Antibiotics',
        'Anticoagulants',
        'NSAIDs',
        'Opioids',
        'Antidepressants'
    ],
    Pathology: [
        'Neoplasia',
        'Inflammation',
        'Infarction',
        'Apoptosis',
        'Necrosis',
        'Amyloidosis',
        'Hemochromatosis',
        'Atherosclerosis'
    ],
    Microbiology: [
        'Staphylococcus',
        'Streptococcus',
        'E. coli',
        'TB',
        'Malaria',
        'HIV',
        'Hepatitis Viruses',
        'Fungal Infections'
    ],
    Biochemistry: [
        'Glycolysis',
        'TCA Cycle',
        'Urea Cycle',
        'Lipid Metabolism',
        'Porphyrias',
        'Glycogen Storage Diseases',
        'Electron Transport Chain'
    ]
};
const DIFFICULTY_OPTIONS = [
    'Easy',
    'Basic',
    'Moderate',
    'Hard',
    'Expert'
];
const DIFFICULTY_LEVELS = {
    'Easy': 1,
    'Basic': 2,
    'Moderate': 3,
    'Hard': 4,
    'Expert': 5
};
const DIFFICULTY_LABELS = {
    1: 'Easy',
    2: 'Basic',
    3: 'Moderate',
    4: 'Hard',
    5: 'Expert'
};
const DIFFICULTY_COLORS = {
    1: '#22c55e',
    2: '#4ade80',
    3: '#f59e0b',
    4: '#f97316',
    5: '#ef4444'
};
const DIFFICULTY_BG_COLORS = {
    1: 'rgba(34,197,94,0.10)',
    2: 'rgba(74,222,128,0.10)',
    3: 'rgba(245,158,11,0.10)',
    4: 'rgba(249,115,22,0.10)',
    5: 'rgba(239,68,68,0.10)'
};
/** Map legacy difficulty values to new 5-level system */ function normalizeDifficulty(difficulty) {
    if (difficulty === 'Medium') return 'Moderate';
    const valid = new Set([
        'Easy',
        'Basic',
        'Moderate',
        'Hard',
        'Expert'
    ]);
    return valid.has(difficulty) ? difficulty : 'Moderate';
}
/** Get numeric level from difficulty label */ function getDifficultyLevel(difficulty) {
    return DIFFICULTY_LEVELS[normalizeDifficulty(difficulty)] ?? 3;
}
const QUESTION_TYPES = [
    'mcq',
    'tf',
    'short'
];


/***/ }),

/***/ 88758:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ useFlashcardGameStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41535);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31692);
/* __next_internal_client_entry_do_not_use__ useFlashcardGameStore auto */ 

const useFlashcardGameStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .v)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__/* .persist */ .Zr)((set, get)=>({
        mode: 'classic',
        score: 0,
        timeLeft: 0,
        match: {
            pairs: [],
            flippedIds: [],
            matchedIds: [],
            mistakes: 0,
            startTime: 0,
            endTime: null,
            isComplete: false
        },
        mastery: {},
        learnCardIds: [],
        learnCurrentIndex: 0,
        test: {
            questions: [],
            currentIndex: 0,
            isComplete: false,
            startTime: 0,
            endTime: null
        },
        setMode: (mode)=>set({
                mode
            }),
        setScore: (score)=>set({
                score
            }),
        addScore: (delta)=>set((s)=>({
                    score: s.score + delta
                })),
        setTimeLeft: (seconds)=>set({
                timeLeft: seconds
            }),
        tickTimer: ()=>set((s)=>({
                    timeLeft: Math.max(0, s.timeLeft - 1)
                })),
        // Match
        initMatch: (pairs)=>set({
                match: {
                    pairs,
                    flippedIds: [],
                    matchedIds: [],
                    mistakes: 0,
                    startTime: Date.now(),
                    endTime: null,
                    isComplete: false
                },
                score: 0
            }),
        flipCard: (id)=>set((s)=>({
                    match: {
                        ...s.match,
                        flippedIds: [
                            ...s.match.flippedIds,
                            id
                        ]
                    }
                })),
        recordMatch: (id1, id2)=>{
            const s = get();
            const newMatched = [
                ...s.match.matchedIds,
                id1,
                id2
            ];
            const isComplete = newMatched.length === s.match.pairs.length * 2;
            set({
                match: {
                    ...s.match,
                    matchedIds: newMatched,
                    flippedIds: [],
                    isComplete,
                    endTime: isComplete ? Date.now() : null
                },
                score: s.score + 100
            });
        },
        recordMismatch: ()=>set((s)=>({
                    match: {
                        ...s.match,
                        flippedIds: [],
                        mistakes: s.match.mistakes + 1
                    },
                    score: Math.max(0, s.score - 10)
                })),
        completeMatch: ()=>set((s)=>({
                    match: {
                        ...s.match,
                        isComplete: true,
                        endTime: Date.now()
                    }
                })),
        resetMatch: ()=>set({
                match: {
                    pairs: [],
                    flippedIds: [],
                    matchedIds: [],
                    mistakes: 0,
                    startTime: 0,
                    endTime: null,
                    isComplete: false
                },
                score: 0
            }),
        // Learn
        updateMastery: (cardId, correct)=>set((s)=>{
                const existing = s.mastery[cardId] || {
                    cardId,
                    level: 0,
                    correctCount: 0,
                    incorrectCount: 0,
                    lastSeen: 0
                };
                const newCorrect = existing.correctCount + (correct ? 1 : 0);
                const newIncorrect = existing.incorrectCount + (correct ? 0 : 1);
                let newLevel = existing.level;
                if (existing.level === 0) newLevel = 1;
                else if (existing.level === 1 && newCorrect >= 1) newLevel = 2;
                else if (existing.level === 2 && newCorrect >= 2) newLevel = 3;
                else if (existing.level === 3 && newCorrect >= 3) newLevel = 4;
                if (!correct && newLevel > 1) newLevel = newLevel - 1;
                return {
                    mastery: {
                        ...s.mastery,
                        [cardId]: {
                            cardId,
                            level: newLevel,
                            correctCount: newCorrect,
                            incorrectCount: newIncorrect,
                            lastSeen: Date.now()
                        }
                    }
                };
            }),
        setLearnCards: (cardIds)=>set({
                learnCardIds: cardIds,
                learnCurrentIndex: 0
            }),
        advanceLearnCard: ()=>set((s)=>({
                    learnCurrentIndex: s.learnCurrentIndex + 1
                })),
        resetLearn: ()=>set({
                learnCardIds: [],
                learnCurrentIndex: 0
            }),
        // Test
        initTest: (cardIds)=>set({
                test: {
                    questions: cardIds.map((id)=>({
                            cardId: id,
                            userAnswer: '',
                            isCorrect: false,
                            timeSpent: 0
                        })),
                    currentIndex: 0,
                    isComplete: false,
                    startTime: Date.now(),
                    endTime: null
                },
                score: 0
            }),
        answerTestQuestion: (cardId, userAnswer, isCorrect, timeSpent)=>set((s)=>({
                    test: {
                        ...s.test,
                        questions: s.test.questions.map((q)=>q.cardId === cardId ? {
                                ...q,
                                userAnswer,
                                isCorrect,
                                timeSpent
                            } : q),
                        currentIndex: s.test.currentIndex + 1,
                        isComplete: s.test.currentIndex + 1 >= s.test.questions.length,
                        endTime: s.test.currentIndex + 1 >= s.test.questions.length ? Date.now() : null
                    },
                    score: s.score + (isCorrect ? 10 : 0)
                })),
        completeTest: ()=>set((s)=>({
                    test: {
                        ...s.test,
                        isComplete: true,
                        endTime: Date.now()
                    }
                })),
        resetTest: ()=>set({
                test: {
                    questions: [],
                    currentIndex: 0,
                    isComplete: false,
                    startTime: 0,
                    endTime: null
                },
                score: 0
            }),
        resetGame: ()=>set({
                mode: 'classic',
                score: 0,
                timeLeft: 0,
                match: {
                    pairs: [],
                    flippedIds: [],
                    matchedIds: [],
                    mistakes: 0,
                    startTime: 0,
                    endTime: null,
                    isComplete: false
                },
                learnCardIds: [],
                learnCurrentIndex: 0,
                test: {
                    questions: [],
                    currentIndex: 0,
                    isComplete: false,
                    startTime: 0,
                    endTime: null
                }
            })
    }), {
    name: 'medq-flashcard-game-store',
    partialize: (state)=>({
            mastery: state.mastery
        })
}));


/***/ }),

/***/ 89239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button),
/* harmony export */   r: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35684);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18460);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__/* .cva */ .F)("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        "data-slot": "button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    });
}



/***/ }),

/***/ 94681:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlashcardTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45160);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29991);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(45216);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(97625);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(73246);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(13626);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(84794);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(78780);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(94890);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(75478);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(66609);
/* harmony import */ var _lib_offline_response__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(59766);
/* harmony import */ var _components_medq_OfflineEmptyState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23263);
/* harmony import */ var _components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(88758);
/* harmony import */ var _components_medq_flashcard_games_MatchGame__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10214);
/* harmony import */ var _components_medq_flashcard_games_LearnMode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(38272);
/* harmony import */ var _components_medq_flashcard_games_TestMode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(54776);
/* __next_internal_client_entry_do_not_use__ default auto */ 













/* ─── Helpers ─── */ function stripHtml(html) {
    if (!html) return '';
    // Replace common HTML entities first
    const decoded = html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<\/li>/gi, '\n').replace(/<li[^>]*>/gi, '- ').replace(/<[^>]*>/g, '').trim();
    return decoded;
}
function formatInterval(interval) {
    if (interval <= 0) return 'Now';
    if (interval === 1) return '1 day';
    if (interval < 7) return `${interval} days`;
    if (interval < 30) return `${Math.round(interval / 7)} week${Math.round(interval / 7) > 1 ? 's' : ''}`;
    return `${Math.round(interval / 30)} month${Math.round(interval / 30) > 1 ? 's' : ''}`;
}
const MODE_OPTIONS = [
    {
        value: 'due',
        label: 'Due for Review',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    },
    {
        value: 'new',
        label: 'New Cards',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    },
    {
        value: 'all',
        label: 'All Cards',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    },
    {
        value: 'random',
        label: 'Random',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
            className: "w-3.5 h-3.5"
        })
    }
];
const GAME_MODE_OPTIONS = [
    {
        value: 'classic',
        label: 'Classic',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Spaced repetition',
        color: '#00e5a0'
    },
    {
        value: 'match',
        label: 'Match',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Match terms & definitions',
        color: '#22d3ee'
    },
    {
        value: 'learn',
        label: 'Learn',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Adaptive learning',
        color: '#8b5cf6'
    },
    {
        value: 'test',
        label: 'Test',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        desc: 'Practice test',
        color: '#ffb347'
    }
];
const RATING_OPTIONS = [
    {
        quality: 0,
        label: 'Again',
        emoji: '😕',
        color: 'bg-[#ff5757]/15 border-[#ff5757]/30 text-[#ff5757] hover:bg-[#ff5757]/25',
        key: '1'
    },
    {
        quality: 3,
        label: 'Hard',
        emoji: '🤔',
        color: 'bg-[#f59e0b]/15 border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/25',
        key: '2'
    },
    {
        quality: 4,
        label: 'Good',
        emoji: '🙂',
        color: 'bg-[#00e5a0]/15 border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/25',
        key: '3'
    },
    {
        quality: 5,
        label: 'Easy',
        emoji: '😎',
        color: 'bg-[#8b5cf6]/15 border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/25',
        key: '4'
    }
];
/* ─── Component ─── */ function FlashcardTab() {
    // Game mode state
    const gameStore = (0,_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$)();
    const gameMode = gameStore.mode;
    // Card data state
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [offlineEmpty, setOfflineEmpty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [submitting, setSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Controls state
    const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('due');
    const [systemFilter, setSystemFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    // Flip state
    const [isFlipped, setIsFlipped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Slide animation
    const [slideDirection, setSlideDirection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isAnimating, setIsAnimating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Session tracking
    const [sessionStats, setSessionStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        studied: 0,
        correct: 0,
        incorrect: 0,
        startTime: Date.now()
    });
    const [sessionComplete, setSessionComplete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Keyboard shortcut help
    const [showShortcuts, setShowShortcuts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Ref for session recording on unmount
    const sessionStatsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(sessionStats);
    const hasRecordedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    // Keep ref in sync
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        sessionStatsRef.current = sessionStats;
    }, [
        sessionStats
    ]);
    // Record StudySession on unmount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            if (hasRecordedRef.current) return;
            const stats = sessionStatsRef.current;
            if (stats.studied > 0) {
                hasRecordedRef.current = true;
                const timeSpent = Math.round((Date.now() - stats.startTime) / 1000);
                fetch('/api/study-sessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: 'flashcard',
                        questionsStudied: stats.studied,
                        correctAnswers: stats.correct,
                        totalTimeSpent: timeSpent
                    })
                }).catch(()=>{
                // Silent fail on unmount
                });
            }
        };
    }, []);
    /* ─── Fetch flashcards ─── */ const fetchFlashcards = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (fetchMode, fetchSystem)=>{
        setLoading(true);
        setOfflineEmpty(false);
        setIsFlipped(false);
        setCurrentIndex(0);
        setSessionComplete(false);
        setSessionStats({
            studied: 0,
            correct: 0,
            incorrect: 0,
            startTime: Date.now()
        });
        try {
            const params = new URLSearchParams({
                mode: fetchMode,
                limit: '20'
            });
            if (fetchSystem && fetchSystem !== 'all') {
                params.set('system', fetchSystem);
            }
            const res = await fetch(`/api/flashcard?${params.toString()}`);
            if (!res.ok) {
                const errBody = await res.json().catch(()=>null);
                if ((0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_20__/* .isOfflineError */ .ej)(res, errBody)) {
                    setOfflineEmpty(true);
                    setQuestions([]);
                    return;
                }
                throw new Error('Failed to fetch flashcards');
            }
            const data = await res.json();
            setQuestions(data.questions || []);
        } catch (err) {
            console.error('Fetch flashcards error:', err);
            if ((0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_20__/* .browserIsOffline */ .Ey)()) {
                setOfflineEmpty(true);
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_6__.toast.error('Failed to load flashcards');
            }
            setQuestions([]);
        } finally{
            setLoading(false);
        }
    }, []);
    // Initial load and mode/filter changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchFlashcards(mode, systemFilter);
    }, [
        mode,
        systemFilter,
        fetchFlashcards
    ]);
    /* ─── Current card ─── */ const currentCard = questions[currentIndex];
    const totalCards = questions.length;
    /* ─── Flip handler ─── */ const handleFlip = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!currentCard || isAnimating) return;
        setIsFlipped((prev)=>!prev);
    }, [
        currentCard,
        isAnimating
    ]);
    /* ─── Rating handler ─── */ const handleRate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (quality)=>{
        if (!currentCard || submitting || isAnimating) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/flashcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: currentCard.id,
                    quality
                })
            });
            if (!res.ok) throw new Error('Failed to record review');
            const data = await res.json();
            // Update session stats
            const isCorrect = quality >= 3;
            setSessionStats((prev)=>({
                    ...prev,
                    studied: prev.studied + 1,
                    correct: prev.correct + (isCorrect ? 1 : 0),
                    incorrect: prev.incorrect + (isCorrect ? 0 : 1)
                }));
            // Show XP toast
            if (data.xpEarned) {
                sonner__WEBPACK_IMPORTED_MODULE_6__.toast.success(`+${data.xpEarned} XP`, {
                    duration: 1500
                });
            }
            // Auto-advance to next card
            if (currentIndex < totalCards - 1) {
                setSlideDirection('left');
                setIsAnimating(true);
                setTimeout(()=>{
                    setCurrentIndex((prev)=>prev + 1);
                    setIsFlipped(false);
                    setSlideDirection(null);
                    setTimeout(()=>setIsAnimating(false), 300);
                }, 250);
            } else {
                // Session complete
                setSessionComplete(true);
                // Record session
                if (!hasRecordedRef.current) {
                    hasRecordedRef.current = true;
                    const timeSpent = Math.round((Date.now() - sessionStatsRef.current.startTime) / 1000);
                    fetch('/api/study-sessions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            type: 'flashcard',
                            questionsStudied: sessionStatsRef.current.studied + 1,
                            correctAnswers: sessionStatsRef.current.correct + (isCorrect ? 1 : 0),
                            totalTimeSpent: timeSpent
                        })
                    }).catch(()=>{});
                }
            }
        } catch (err) {
            console.error('Rate error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_6__.toast.error('Failed to save review');
        } finally{
            setSubmitting(false);
        }
    }, [
        currentCard,
        submitting,
        isAnimating,
        currentIndex,
        totalCards
    ]);
    /* ─── Navigation ─── */ const goNext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (currentIndex < totalCards - 1 && !isAnimating) {
            setSlideDirection('left');
            setIsAnimating(true);
            setTimeout(()=>{
                setCurrentIndex((prev)=>prev + 1);
                setIsFlipped(false);
                setSlideDirection(null);
                setTimeout(()=>setIsAnimating(false), 300);
            }, 250);
        }
    }, [
        currentIndex,
        totalCards,
        isAnimating
    ]);
    const goPrev = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (currentIndex > 0 && !isAnimating) {
            setSlideDirection('right');
            setIsAnimating(true);
            setTimeout(()=>{
                setCurrentIndex((prev)=>prev - 1);
                setIsFlipped(false);
                setSlideDirection(null);
                setTimeout(()=>setIsAnimating(false), 300);
            }, 250);
        }
    }, [
        currentIndex,
        isAnimating
    ]);
    /* ─── Keyboard shortcuts ─── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleKeyDown = (e)=>{
            // Don't capture if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            switch(e.key){
                case ' ':
                    e.preventDefault();
                    handleFlip();
                    break;
                case '1':
                    if (isFlipped) handleRate(0);
                    break;
                case '2':
                    if (isFlipped) handleRate(3);
                    break;
                case '3':
                    if (isFlipped) handleRate(4);
                    break;
                case '4':
                    if (isFlipped) handleRate(5);
                    break;
                case 'ArrowRight':
                    goNext();
                    break;
                case 'ArrowLeft':
                    goPrev();
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>window.removeEventListener('keydown', handleKeyDown);
    }, [
        handleFlip,
        handleRate,
        goNext,
        goPrev,
        isFlipped
    ]);
    /* ─── Restart session ─── */ const handleRestart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        fetchFlashcards(mode, systemFilter);
    }, [
        mode,
        systemFilter,
        fetchFlashcards
    ]);
    /* ─── Back to classic mode from game modes ─── */ const handleBackToClassic = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        _components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode('classic');
    }, []);
    /* ─── Computed values ─── */ const accuracy = sessionStats.studied > 0 ? Math.round(sessionStats.correct / sessionStats.studied * 100) : 0;
    const progressPercent = totalCards > 0 ? (currentIndex + (sessionComplete ? 1 : 0)) / totalCards * 100 : 0;
    /* ─── Game Mode Rendering ─── */ // Match Game mode
    if (gameMode === 'match') {
        if (questions.length === 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#22d3ee]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Match Game"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#5a6478]",
                                        children: "Load some flashcards first to play"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#5a6478] text-center py-8",
                        children: "No cards available. Switch to Classic mode and load cards first."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleBackToClassic,
                            className: "px-4 py-2 rounded-xl text-sm font-bold bg-[#22d3ee]/15 border border-[#22d3ee]/30 text-[#22d3ee] hover:bg-[#22d3ee]/25",
                            children: "Go to Classic Mode"
                        })
                    })
                ]
            });
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_flashcard_games_MatchGame__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                cards: questions.map((q)=>({
                        id: q.id,
                        text: q.text,
                        answer: q.answer
                    })),
                onBack: handleBackToClassic
            })
        });
    }
    // Learn Mode
    if (gameMode === 'learn') {
        if (questions.length === 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#8b5cf6]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Learn Mode"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#5a6478]",
                                        children: "Load some flashcards first to learn"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#5a6478] text-center py-8",
                        children: "No cards available. Switch to Classic mode and load cards first."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleBackToClassic,
                            className: "px-4 py-2 rounded-xl text-sm font-bold bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/25",
                            children: "Go to Classic Mode"
                        })
                    })
                ]
            });
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_flashcard_games_LearnMode__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                cards: questions.map((q)=>({
                        id: q.id,
                        text: q.text,
                        answer: q.answer,
                        options: q.options,
                        explanation: q.explanation,
                        type: q.type,
                        difficulty: q.difficulty
                    })),
                onBack: handleBackToClassic
            })
        });
    }
    // Test Mode
    if (gameMode === 'test') {
        if (questions.length === 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[#ffb347]/10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#ffb347]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Practice Test"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-[#5a6478]",
                                        children: "Load some flashcards first to test"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#5a6478] text-center py-8",
                        children: "No cards available. Switch to Classic mode and load cards first."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: handleBackToClassic,
                            className: "px-4 py-2 rounded-xl text-sm font-bold bg-[#ffb347]/15 border border-[#ffb347]/30 text-[#ffb347] hover:bg-[#ffb347]/25",
                            children: "Go to Classic Mode"
                        })
                    })
                ]
            });
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_flashcard_games_TestMode__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                cards: questions.map((q)=>({
                        id: q.id,
                        text: q.text,
                        answer: q.answer,
                        options: q.options,
                        explanation: q.explanation,
                        type: q.type,
                        difficulty: q.difficulty
                    })),
                onBack: handleBackToClassic
            })
        });
    }
    /* ─── Render: Loading skeleton ─── */ if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-white/[0.03] animate-pulse"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-5 w-32 rounded bg-white/[0.03] animate-pulse mb-2"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-3 w-20 rounded bg-white/[0.03] animate-pulse"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "max-w-lg mx-auto",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "min-h-80 rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.06]"
                    })
                })
            ]
        });
    }
    /* ─── Render: Offline empty state (no cached flashcards) ─── */ if (offlineEmpty && questions.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "w-5 h-5 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold text-[#e8ecf4]",
                                    children: "Flashcards"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#5a6478]",
                                    children: "Spaced repetition study"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_OfflineEmptyState__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                    label: "flashcards",
                    onRetry: ()=>fetchFlashcards(mode, systemFilter),
                    hint: "Flashcards haven't been cached yet. Open this tab while online once to make your deck available offline."
                })
            ]
        });
    }
    /* ─── Render: Session complete summary ─── */ if (sessionComplete) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "w-5 h-5 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold text-[#e8ecf4]",
                                    children: "Flashcards"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#5a6478]",
                                    children: "Spaced repetition study"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]",
                    children: GAME_MODE_OPTIONS.map((opt)=>{
                        const isActive = gameMode === opt.value;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode(opt.value),
                            className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all",
                            style: {
                                background: isActive ? `${opt.color}12` : 'transparent',
                                color: isActive ? opt.color : '#5a6478'
                            },
                            children: [
                                opt.icon,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "hidden sm:inline",
                                    children: opt.label
                                })
                            ]
                        }, opt.value);
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto text-center py-8",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-20 h-20 rounded-2xl bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-6",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                className: "w-10 h-10 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-2xl font-bold text-[#e8ecf4] mb-2",
                            children: "Session Complete!"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm text-[#5a6478] mb-8",
                            children: "Great work reviewing your flashcards"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid grid-cols-3 gap-4 mb-8",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-2xl font-bold text-[#00e5a0]",
                                            children: sessionStats.studied
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mt-1",
                                            children: "Studied"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-2xl font-bold text-[#00e5a0]",
                                            children: sessionStats.correct
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mt-1",
                                            children: "Correct"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-2xl font-bold text-[#00e5a0]",
                                            children: [
                                                accuracy,
                                                "%"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mt-1",
                                            children: "Accuracy"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                            onClick: handleRestart,
                            className: "bg-[#00e5a0]/15 border border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/25 transition-all px-8 py-3 text-sm font-bold",
                            variant: "outline",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                    className: "w-4 h-4 mr-2"
                                }),
                                "Study Again"
                            ]
                        })
                    ]
                })
            ]
        });
    }
    /* ─── Render: Empty state ─── */ if (totalCards === 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "w-5 h-5 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-bold text-[#e8ecf4]",
                                    children: "Flashcards"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#5a6478]",
                                    children: "Spaced repetition study"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]",
                    children: GAME_MODE_OPTIONS.map((opt)=>{
                        const isActive = gameMode === opt.value;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode(opt.value),
                            className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all",
                            style: {
                                background: isActive ? `${opt.color}12` : 'transparent',
                                color: isActive ? opt.color : '#5a6478'
                            },
                            children: [
                                opt.icon,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "hidden sm:inline",
                                    children: opt.label
                                })
                            ]
                        }, opt.value);
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-wrap gap-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                            value: mode,
                            onValueChange: (v)=>setMode(v),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                    className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[170px] hover:border-white/[0.15] transition-colors text-xs",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {})
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                    className: "bg-[#1a1e2b] border-white/[0.08]",
                                    children: MODE_OPTIONS.map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                            value: opt.value,
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    opt.icon,
                                                    " ",
                                                    opt.label
                                                ]
                                            })
                                        }, opt.value))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                            value: systemFilter,
                            onValueChange: setSystemFilter,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                    className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {
                                        placeholder: "System"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                    className: "bg-[#1a1e2b] border-white/[0.08]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                            value: "all",
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: "All Systems"
                                        }),
                                        _lib_medq_types__WEBPACK_IMPORTED_MODULE_5__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                                value: s,
                                                className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                children: s
                                            }, s))
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-lg mx-auto text-center py-12",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                className: "w-7 h-7 text-[#3a4055]"
                            })
                        }),
                        mode === 'due' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#8b95a8] text-sm font-medium mb-1",
                                    children: "No cards due for review"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#3a4055] text-xs",
                                    children: "Great job! Come back later when cards are scheduled for review."
                                })
                            ]
                        }) : mode === 'new' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#8b95a8] text-sm font-medium mb-1",
                                    children: "No new cards available"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#3a4055] text-xs",
                                    children: "Generate some questions first, then come back to study them as flashcards."
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#8b95a8] text-sm font-medium mb-1",
                                    children: "No flashcards available"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[#3a4055] text-xs",
                                    children: "Generate some questions first to start studying with flashcards."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex gap-3 justify-center mt-6",
                            children: [
                                mode !== 'all' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                    onClick: ()=>setMode('all'),
                                    variant: "outline",
                                    className: "bg-[#1a1e2b] border-white/[0.1] text-[#e8ecf4] hover:bg-white/[0.06] hover:border-white/[0.2] text-xs",
                                    children: "Try All Cards"
                                }),
                                mode !== 'random' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                    onClick: ()=>setMode('random'),
                                    variant: "outline",
                                    className: "bg-[#00e5a0]/10 border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 text-xs",
                                    children: "Try Random"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
    /* ─── Main Render ─── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-4 sm:p-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3 mb-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                            className: "w-5 h-5 text-[#00e5a0]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-bold text-[#e8ecf4]",
                                children: "Flashcards"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478]",
                                children: "Spaced repetition study"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: ()=>setShowShortcuts(!showShortcuts),
                        className: "p-2 rounded-lg text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-all",
                        title: "Keyboard shortcuts",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]",
                children: GAME_MODE_OPTIONS.map((opt)=>{
                    const isActive = gameMode === opt.value;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>_components_medq_flashcard_games_store__WEBPACK_IMPORTED_MODULE_8__/* .useFlashcardGameStore */ .$.getState().setMode(opt.value),
                        className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all",
                        style: {
                            background: isActive ? `${opt.color}12` : 'transparent',
                            color: isActive ? opt.color : '#5a6478',
                            boxShadow: isActive ? `0 0 12px ${opt.color}08` : 'none'
                        },
                        children: [
                            opt.icon,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: opt.label
                            })
                        ]
                    }, opt.value);
                })
            }),
            showShortcuts && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-4 p-3 rounded-xl bg-[#1a1e2b] border border-white/[0.08] text-xs text-[#8b95a8]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "font-semibold text-[#e8ecf4] mb-2",
                        children: "Keyboard Shortcuts"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 gap-x-6 gap-y-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "Space"
                                    }),
                                    " Flip card"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "←"
                                    }),
                                    " Previous"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "1"
                                    }),
                                    " Again (\uD83D\uDE15)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "→"
                                    }),
                                    " Next"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "2"
                                    }),
                                    " Hard (\uD83E\uDD14)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "3"
                                    }),
                                    " Good (\uD83D\uDE42)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                        className: "px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono",
                                        children: "4"
                                    }),
                                    " Easy (\uD83D\uDE0E)"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap gap-3 mb-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                        value: mode,
                        onValueChange: (v)=>setMode(v),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[170px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {})
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: MODE_OPTIONS.map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                        value: opt.value,
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                opt.icon,
                                                " ",
                                                opt.label
                                            ]
                                        })
                                    }, opt.value))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .Select */ .l6, {
                        value: systemFilter,
                        onValueChange: setSystemFilter,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectTrigger */ .bq, {
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectValue */ .yv, {
                                    placeholder: "System"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                        value: "all",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "All Systems"
                                    }),
                                    _lib_medq_types__WEBPACK_IMPORTED_MODULE_5__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_4__/* .SelectItem */ .eb, {
                                            value: s,
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: s
                                        }, s))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                        variant: "ghost",
                        size: "sm",
                        onClick: handleRestart,
                        className: "text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 text-xs h-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1"
                            }),
                            "Refresh"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mb-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-xs text-[#5a6478]",
                                children: [
                                    "Card ",
                                    currentIndex + 1,
                                    " of ",
                                    totalCards
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-xs text-[#5a6478]",
                                children: [
                                    Math.round(progressPercent),
                                    "% complete"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-full h-1 bg-white/[0.06] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-full bg-[#00e5a0] rounded-full transition-all duration-500 ease-out",
                            style: {
                                width: `${progressPercent}%`
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-lg mx-auto",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "relative cursor-pointer",
                        style: {
                            perspective: '1200px'
                        },
                        onClick: handleFlip,
                        role: "button",
                        tabIndex: 0,
                        "aria-label": isFlipped ? 'Click to show question' : 'Click to reveal answer',
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') handleFlip();
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "transition-transform duration-300 ease-out",
                            style: {
                                transform: slideDirection === 'left' ? 'translateX(-30px)' : slideDirection === 'right' ? 'translateX(30px)' : 'translateX(0)',
                                opacity: slideDirection ? 0 : 1
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative w-full transition-transform duration-500 ease-in-out",
                                style: {
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "w-full min-h-80 rounded-2xl border border-white/[0.06] p-6 sm:p-8 flex flex-col",
                                        style: {
                                            backfaceVisibility: 'hidden',
                                            background: 'rgba(255,255,255,0.03)',
                                            boxShadow: '0 0 40px rgba(0,229,160,0.06), 0 4px 20px rgba(0,0,0,0.3)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex items-center gap-2 mb-4 flex-wrap",
                                                children: currentCard && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: `text-[10px] font-semibold border-0 px-2 py-0.5 ${currentCard.type === 'mcq' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' : currentCard.type === 'tf' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#8b5cf6]/10 text-[#8b5cf6]'}`,
                                                            children: currentCard.type === 'mcq' ? 'MCQ' : currentCard.type === 'tf' ? 'TF' : 'Short'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: `text-[10px] font-semibold border-0 px-2 py-0.5 ${currentCard.difficulty === 'Easy' ? 'bg-[#22c55e]/10 text-[#22c55e]' : currentCard.difficulty === 'Basic' ? 'bg-[#4ade80]/10 text-[#4ade80]' : currentCard.difficulty === 'Moderate' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : currentCard.difficulty === 'Hard' ? 'bg-[#f97316]/10 text-[#f97316]' : 'bg-[#ef4444]/10 text-[#ef4444]'}`,
                                                            children: currentCard.difficulty
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: "text-[10px] font-semibold bg-white/[0.05] text-[#8b92a8] border-0 px-2 py-0.5",
                                                            children: currentCard.system
                                                        }),
                                                        currentCard.flashcardProgress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_3__/* .Badge */ .E, {
                                                            variant: "secondary",
                                                            className: "text-[10px] font-semibold bg-[#00e5a0]/10 text-[#00e5a0] border-0 px-2 py-0.5",
                                                            children: [
                                                                "Review in ",
                                                                formatInterval(currentCard.flashcardProgress.interval)
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex-1 flex items-center",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs text-[#5a6478] uppercase tracking-wider font-semibold mb-3",
                                                            children: "Question"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[15px] sm:text-base leading-relaxed text-[#e8ecf4]",
                                                            children: currentCard ? stripHtml(currentCard.text) : ''
                                                        }),
                                                        currentCard && currentCard.type === 'mcq' && currentCard.options && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "mt-4 space-y-2",
                                                            children: currentCard.options.map((opt, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-start gap-2 text-sm text-[#8b95a8]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "text-[10px] font-bold text-[#3a4055] mt-0.5 w-5 text-center flex-shrink-0",
                                                                            children: String.fromCharCode(65 + i)
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            children: stripHtml(opt)
                                                                        })
                                                                    ]
                                                                }, i))
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mt-4 pt-4 border-t border-white/[0.06] text-center",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-xs text-[#3a4055]",
                                                    children: [
                                                        "Tap to reveal answer \xb7 ",
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                                            className: "px-1 py-0.5 rounded bg-white/[0.06] text-[#5a6478] font-mono text-[10px]",
                                                            children: "Space"
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "absolute inset-0 w-full min-h-80 rounded-2xl border border-white/[0.06] p-6 sm:p-8 flex flex-col",
                                        style: {
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            background: 'rgba(255,255,255,0.03)',
                                            boxShadow: '0 0 40px rgba(0,229,160,0.08), 0 4px 20px rgba(0,0,0,0.3)'
                                        },
                                        children: currentCard && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-2 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                                    className: "w-4 h-4 text-[#00e5a0]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs text-[#00e5a0] uppercase tracking-wider font-semibold",
                                                                    children: "Answer"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "bg-[#00e5a0]/10 border border-[#00e5a0]/20 rounded-xl px-4 py-3",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-sm sm:text-base text-[#e8ecf4] font-medium",
                                                                children: stripHtml(currentCard.answer)
                                                            })
                                                        })
                                                    ]
                                                }),
                                                currentCard.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs text-[#5a6478] uppercase tracking-wider font-semibold mb-1.5",
                                                            children: "Explanation"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs sm:text-sm text-[#8b95a8] leading-relaxed",
                                                            children: stripHtml(currentCard.explanation)
                                                        })
                                                    ]
                                                }),
                                                currentCard.mnemonic && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-1.5 mb-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3 text-[#8b5cf6]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs text-[#8b5cf6] uppercase tracking-wider font-semibold",
                                                                    children: "Mnemonic"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-lg px-3 py-2",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs sm:text-sm text-[#c4b5fd] leading-relaxed",
                                                                children: stripHtml(currentCard.mnemonic)
                                                            })
                                                        })
                                                    ]
                                                }),
                                                currentCard.clinicalPearl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-1.5 mb-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3 text-[#f59e0b]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs text-[#f59e0b] uppercase tracking-wider font-semibold",
                                                                    children: "Clinical Pearl"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg px-3 py-2",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs sm:text-sm text-[#fcd34d] leading-relaxed",
                                                                children: stripHtml(currentCard.clinicalPearl)
                                                            })
                                                        })
                                                    ]
                                                }),
                                                currentCard.flashcardProgress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "mt-auto pt-3 border-t border-white/[0.06]",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px] text-[#3a4055]",
                                                        children: [
                                                            "Last reviewed: ",
                                                            new Date(currentCard.flashcardProgress.lastReview).toLocaleDateString(),
                                                            " \xb7 Interval: ",
                                                            formatInterval(currentCard.flashcardProgress.interval),
                                                            " \xb7 Repetition: ",
                                                            currentCard.flashcardProgress.repetition
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    isFlipped && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#5a6478] text-center mb-3",
                                children: "How well did you know this? Rate your recall:"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-4 gap-2 sm:gap-3",
                                children: RATING_OPTIONS.map((rating)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>handleRate(rating.quality),
                                        disabled: submitting,
                                        className: `
                    flex flex-col items-center gap-1.5 py-3 sm:py-4 px-2 rounded-xl
                    border text-sm font-bold transition-all
                    ${rating.color}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    min-h-[60px]
                  `,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-lg sm:text-xl",
                                                children: rating.emoji
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs sm:text-sm",
                                                children: rating.label
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] opacity-60",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                                    className: "px-1 py-0.5 rounded bg-white/[0.06] font-mono",
                                                    children: rating.key
                                                })
                                            })
                                        ]
                                    }, rating.quality))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mt-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: goPrev,
                                disabled: currentIndex <= 0 || isAnimating,
                                className: "text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] text-xs disabled:opacity-30",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-4 h-4 mr-1"
                                    }),
                                    "Prev"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    Array.from({
                                        length: Math.min(totalCards, 10)
                                    }, (_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                if (!isAnimating) {
                                                    setSlideDirection(i > currentIndex ? 'left' : 'right');
                                                    setIsAnimating(true);
                                                    setTimeout(()=>{
                                                        setCurrentIndex(i);
                                                        setIsFlipped(false);
                                                        setSlideDirection(null);
                                                        setTimeout(()=>setIsAnimating(false), 300);
                                                    }, 250);
                                                }
                                            },
                                            className: `w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#00e5a0] w-4' : i < currentIndex ? 'bg-[#00e5a0]/40' : 'bg-white/[0.1]'}`,
                                            "aria-label": `Go to card ${i + 1}`
                                        }, i)),
                                    totalCards > 10 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[10px] text-[#3a4055] ml-1",
                                        children: [
                                            "+",
                                            totalCards - 10
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: goNext,
                                disabled: currentIndex >= totalCards - 1 || isAnimating,
                                className: "text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] text-xs disabled:opacity-30",
                                children: [
                                    "Next",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                        className: "w-4 h-4 ml-1"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-6 pt-4 border-t border-white/[0.06]",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#f59e0b]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-bold text-[#e8ecf4]",
                                                    children: sessionStats.studied
                                                }),
                                                " studied"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#00e5a0]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-bold text-[#00e5a0]",
                                                    children: sessionStats.correct
                                                }),
                                                " correct"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bookmark_Brain_CheckCircle2_ChevronLeft_ChevronRight_FileText_Flame_GraduationCap_Keyboard_RefreshCw_RotateCcw_Shuffle_Sparkles_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#ff5757]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-bold text-[#ff5757]",
                                                    children: sessionStats.incorrect
                                                }),
                                                " missed"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-xs text-[#5a6478]",
                            children: [
                                "Accuracy: ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: `font-bold ${accuracy >= 70 ? 'text-[#00e5a0]' : accuracy >= 40 ? 'text-[#f59e0b]' : 'text-[#ff5757]'}`,
                                    children: [
                                        accuracy,
                                        "%"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [18409,68298,27173,2595,31573,53686,52968,40379,66247,28441,93794,77358], () => (__webpack_exec__(26522)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);