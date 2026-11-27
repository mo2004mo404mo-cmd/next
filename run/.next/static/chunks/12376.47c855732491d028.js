"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[12376],{

/***/ 12376:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlashcardsSection)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19707);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44539);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18986);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(41189);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(9005);
/* harmony import */ var _components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3301);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * FlashcardsSection — shared flashcard decks for a study group.
 *
 * Features:
 *   - Grid of decks (with creation date, card count, due count)
 *   - Create / edit / delete decks (admin or any member)
 *   - Open a deck → study mode with flip animation + SM-2 review buttons
 *   - "Due today" filter
 *   - Inline card editor
 *
 * API:
 *   GET    /api/groups/[id]/flashcards           → list decks
 *   POST   /api/groups/[id]/flashcards           → create deck
 *   GET    /api/groups/[id]/flashcards/[deckId]  → fetch single deck
 *   PATCH  /api/groups/[id]/flashcards/[deckId]  → update deck + cards
 *   DELETE /api/groups/[id]/flashcards/[deckId]  → delete deck
 *   POST   /api/groups/[id]/flashcards/[deckId]/review  → record review
 */ 


const TOKENS = {
    card: {
        radius: 'rounded-2xl',
        bg: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        hoverShadow: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]',
        transition: 'transition-all duration-300 ease-out'
    },
    color: {
        green: 'var(--medq-accent-green, #00e5a0)',
        orange: 'var(--medq-accent-amber, #f59e0b)',
        purple: 'var(--medq-accent-purple, #a78bfa)',
        blue: '#4fc3f7',
        red: 'var(--medq-accent-danger, #ff5757)',
        muted: '#8b95a7'
    }
};
function gradientFor(title) {
    const palettes = [
        [
            '#6366f1',
            '#8b5cf6'
        ],
        [
            '#0ea5e9',
            '#06b6d4'
        ],
        [
            '#f59e0b',
            '#ef4444'
        ],
        [
            '#10b981',
            '#06b6d4'
        ],
        [
            '#ec4899',
            '#f43f5e'
        ],
        [
            '#8b5cf6',
            '#ec4899'
        ]
    ];
    let hash = 0;
    for(let i = 0; i < title.length; i++)hash = hash * 31 + title.charCodeAt(i) | 0;
    const [a, b] = palettes[Math.abs(hash) % palettes.length];
    return `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;
}
function isDueToday(review) {
    if (!review) return true; // never reviewed → due
    return new Date(review.dueAt).getTime() <= Date.now();
}
function FlashcardsSection({ groupId, isAdmin }) {
    const { authHeaders } = (0,_components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_2__/* .useCurrentUser */ .i)();
    const chatHeaders = authHeaders;
    const [decks, setDecks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [openDeck, setOpenDeck] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [studyMode, setStudyMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editingDeck, setEditingDeck] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [creating, setCreating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [filterDue, setFilterDue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const fetchDecks = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!chatHeaders) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/groups/${groupId}/flashcards`, {
                headers: chatHeaders()
            });
            if (!res.ok) throw new Error('Failed to load decks');
            const data = await res.json();
            setDecks(data.decks || []);
        } catch (e) {
            setError(e.message || 'Unknown error');
        } finally{
            setLoading(false);
        }
    }, [
        groupId,
        chatHeaders
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchDecks();
    }, [
        fetchDecks
    ]);
    const totalCards = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>decks.reduce((sum, d)=>sum + (d.flashcards?.length || 0), 0), [
        decks
    ]);
    const dueCount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>decks.reduce((sum, d)=>sum + (d.flashcards || []).filter((c)=>isDueToday(c.review)).length, 0), [
        decks
    ]);
    // ── Study mode logic ──
    if (studyMode && openDeck) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StudyMode, {
            deck: openDeck,
            groupId: groupId,
            chatHeaders: chatHeaders,
            onExit: async ()=>{
                // Refresh deck state (review times changed)
                await fetchDecks();
                // Re-fetch the open deck too
                try {
                    const res = await fetch(`/api/groups/${groupId}/flashcards/${openDeck.id}`, {
                        headers: chatHeaders()
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setOpenDeck(data.deck);
                    }
                } catch  {}
                setStudyMode(false);
            }
        });
    }
    // ── Deck detail view ──
    if (openDeck) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DeckDetail, {
            deck: openDeck,
            groupId: groupId,
            isAdmin: isAdmin,
            chatHeaders: chatHeaders,
            onBack: ()=>setOpenDeck(null),
            onStudy: ()=>setStudyMode(true),
            onEdit: ()=>setEditingDeck(openDeck),
            onChanged: async ()=>{
                await fetchDecks();
                try {
                    const res = await fetch(`/api/groups/${groupId}/flashcards/${openDeck.id}`, {
                        headers: chatHeaders()
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setOpenDeck(data.deck);
                    }
                } catch  {}
            }
        });
    }
    // ── Deck editor ──
    if (creating || editingDeck) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DeckEditor, {
            deck: editingDeck,
            groupId: groupId,
            chatHeaders: chatHeaders,
            onCancel: ()=>{
                setCreating(false);
                setEditingDeck(null);
            },
            onSaved: async ()=>{
                setCreating(false);
                setEditingDeck(null);
                await fetchDecks();
            }
        });
    }
    // ── Decks grid ──
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 text-xs",
                        style: {
                            color: TOKENS.color.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        style: {
                                            color: '#fff'
                                        },
                                        children: decks.length
                                    }),
                                    " decks"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        style: {
                                            color: '#fff'
                                        },
                                        children: totalCards
                                    }),
                                    " cards"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: TOKENS.color.orange
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        style: {
                                            color: TOKENS.color.orange
                                        },
                                        children: dueCount
                                    }),
                                    " due today"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setFilterDue((v)=>!v),
                                className: "px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all",
                                style: {
                                    background: filterDue ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                                    color: filterDue ? TOKENS.color.orange : TOKENS.color.muted,
                                    border: `1px solid ${filterDue ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}`
                                },
                                title: "Show only cards due today",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-3 h-3 inline mr-1"
                                    }),
                                    "Due only"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setCreating(true),
                                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all",
                                style: {
                                    background: 'rgba(0,229,160,0.12)',
                                    color: TOKENS.color.green,
                                    border: '1px solid rgba(0,229,160,0.25)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "New Deck"
                                ]
                            })
                        ]
                    })
                ]
            }),
            loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex justify-center py-12",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                    className: "w-6 h-6 animate-spin",
                    style: {
                        color: TOKENS.color.green
                    }
                })
            }) : error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "text-center py-8 text-xs",
                style: {
                    color: TOKENS.color.red
                },
                children: error
            }) : decks.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-center py-12",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-10 h-10 mx-auto mb-2",
                        style: {
                            color: '#2a3040'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm font-semibold",
                        style: {
                            color: '#5a6478'
                        },
                        children: "No flashcard decks yet"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[11px] mt-1",
                        style: {
                            color: '#3a4055'
                        },
                        children: "Create a deck to start studying with the group"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setCreating(true),
                        className: "mt-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold",
                        style: {
                            background: 'rgba(0,229,160,0.12)',
                            color: TOKENS.color.green
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            "Create your first deck"
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                children: decks.map((deck)=>{
                    const cards = deck.flashcards || [];
                    const due = cards.filter((c)=>isDueToday(c.review)).length;
                    const display = filterDue ? cards.filter((c)=>isDueToday(c.review)) : cards;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>filterDue && display.length === 0 ? null : setOpenDeck(deck),
                        className: `text-left p-4 ${TOKENS.card.radius} ${TOKENS.card.transition} ${TOKENS.card.hoverShadow} hover:border-white/10`,
                        style: {
                            background: TOKENS.card.bg,
                            border: TOKENS.card.border
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                                        style: {
                                            background: gradientFor(deck.name)
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                            className: "w-5 h-5 text-white"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-sm font-bold text-white truncate",
                                                children: deck.name
                                            }),
                                            deck.subject && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] uppercase tracking-wider mt-0.5",
                                                style: {
                                                    color: TOKENS.color.blue
                                                },
                                                children: deck.subject
                                            })
                                        ]
                                    })
                                ]
                            }),
                            deck.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[11px] mb-3 line-clamp-2",
                                style: {
                                    color: TOKENS.color.muted
                                },
                                children: deck.description
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-3 text-[10px]",
                                style: {
                                    color: TOKENS.color.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            cards.length,
                                            " cards"
                                        ]
                                    }),
                                    due > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "flex items-center gap-1",
                                        style: {
                                            color: TOKENS.color.orange
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            due,
                                            " due"
                                        ]
                                    }),
                                    deck.creator && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "ml-auto truncate",
                                        children: [
                                            "by ",
                                            deck.creator.name || 'Unknown'
                                        ]
                                    })
                                ]
                            }),
                            filterDue && display.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mt-2 pt-2 border-t border-white/[0.04] text-[10px] text-center",
                                style: {
                                    color: TOKENS.color.green
                                },
                                children: "✓ All caught up"
                            })
                        ]
                    }, deck.id);
                })
            })
        ]
    });
}
/* ───────── Deck Detail View ───────── */ function DeckDetail({ deck, groupId, isAdmin, chatHeaders, onBack, onStudy, onEdit, onChanged }) {
    const [deleting, setDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const dueCount = (deck.flashcards || []).filter((c)=>isDueToday(c.review)).length;
    async function handleDelete() {
        if (!confirm(`Delete deck "${deck.name}"? This removes all ${deck.flashcards.length} cards and everyone's review progress.`)) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/groups/${groupId}/flashcards/${deck.id}`, {
                method: 'DELETE',
                headers: chatHeaders()
            });
            if (res.ok) {
                onChanged();
                onBack();
            } else {
                alert('Failed to delete deck');
            }
        } catch (e) {
            alert('Error deleting deck');
        } finally{
            setDeleting(false);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: onBack,
                        className: "flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold",
                        style: {
                            color: TOKENS.color.muted,
                            background: 'rgba(255,255,255,0.04)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " All decks"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: onStudy,
                                disabled: deck.flashcards.length === 0,
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40",
                                style: {
                                    background: 'rgba(0,229,160,0.15)',
                                    color: TOKENS.color.green,
                                    border: '1px solid rgba(0,229,160,0.3)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    " Study ",
                                    dueCount > 0 ? `(${dueCount} due)` : ''
                                ]
                            }),
                            (isAdmin || true) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: onEdit,
                                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold",
                                        style: {
                                            background: 'rgba(167,139,250,0.12)',
                                            color: TOKENS.color.purple
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }),
                                            " Edit"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: handleDelete,
                                        disabled: deleting,
                                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40",
                                        style: {
                                            background: 'rgba(255,87,87,0.12)',
                                            color: TOKENS.color.red
                                        },
                                        children: [
                                            deleting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }),
                                            " Delete"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-lg font-bold text-white",
                        children: deck.name
                    }),
                    deck.subject && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] uppercase tracking-wider mt-0.5",
                        style: {
                            color: TOKENS.color.blue
                        },
                        children: deck.subject
                    }),
                    deck.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs mt-1.5",
                        style: {
                            color: TOKENS.color.muted
                        },
                        children: deck.description
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-xs font-semibold mb-2",
                        style: {
                            color: TOKENS.color.muted
                        },
                        children: [
                            deck.flashcards.length,
                            " cards"
                        ]
                    }),
                    deck.flashcards.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-center py-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-8 h-8 mx-auto mb-2",
                                style: {
                                    color: '#2a3040'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs",
                                style: {
                                    color: '#5a6478'
                                },
                                children: "No cards in this deck yet"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onEdit,
                                className: "mt-2 text-xs font-semibold",
                                style: {
                                    color: TOKENS.color.purple
                                },
                                children: "Add some cards →"
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-2",
                        children: deck.flashcards.map((card, i)=>{
                            const due = isDueToday(card.review);
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: `p-3 ${TOKENS.card.radius}`,
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.04)'
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[10px] font-mono mt-0.5",
                                            style: {
                                                color: TOKENS.color.muted
                                            },
                                            children: [
                                                "#",
                                                i + 1
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs font-semibold text-white",
                                                    children: card.front
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[11px] mt-1",
                                                    style: {
                                                        color: TOKENS.color.muted
                                                    },
                                                    children: card.back
                                                }),
                                                card.tags && card.tags.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "flex flex-wrap gap-1 mt-1.5",
                                                    children: card.tags.map((t, ti)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[9px] px-1.5 py-0.5 rounded",
                                                            style: {
                                                                background: 'rgba(79,195,247,0.1)',
                                                                color: TOKENS.color.blue
                                                            },
                                                            children: [
                                                                "#",
                                                                t
                                                            ]
                                                        }, ti))
                                                })
                                            ]
                                        }),
                                        card.review && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[9px] px-1.5 py-0.5 rounded flex-shrink-0",
                                            style: {
                                                background: due ? 'rgba(245,158,11,0.1)' : 'rgba(0,229,160,0.1)',
                                                color: due ? TOKENS.color.orange : TOKENS.color.green
                                            },
                                            children: due ? 'Due' : `in ${card.review.interval}d`
                                        })
                                    ]
                                })
                            }, card.id);
                        })
                    })
                ]
            })
        ]
    });
}
/* ───────── Study Mode (flashcard flip + SM-2 review) ───────── */ function StudyMode({ deck, groupId, chatHeaders, onExit }) {
    // Study only due cards; if none due, study all
    const queue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const due = deck.flashcards.filter((c)=>isDueToday(c.review));
        const list = due.length > 0 ? due : deck.flashcards;
        // Shuffle
        return [
            ...list
        ].sort(()=>Math.random() - 0.5);
    }, [
        deck
    ]);
    const [idx, setIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [flipped, setFlipped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [submitting, setSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [stats, setStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        reviewed: 0,
        correct: 0
    });
    if (queue.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "text-center py-16",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                    className: "w-10 h-10 mx-auto mb-2",
                    style: {
                        color: TOKENS.color.green
                    }
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm font-semibold text-white",
                    children: "No cards to study"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    onClick: onExit,
                    className: "mt-3 text-xs font-semibold",
                    style: {
                        color: TOKENS.color.green
                    },
                    children: "Back to deck"
                })
            ]
        });
    }
    if (idx >= queue.length) {
        // Session complete
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "text-center py-16",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                    className: "w-12 h-12 mx-auto mb-3",
                    style: {
                        color: TOKENS.color.purple
                    }
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-lg font-bold text-white",
                    children: "Session complete!"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-xs mt-1",
                    style: {
                        color: TOKENS.color.muted
                    },
                    children: [
                        "Reviewed ",
                        stats.reviewed,
                        " cards \xb7 ",
                        stats.correct,
                        " correct"
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex justify-center gap-2 mt-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>{
                                setIdx(0);
                                setFlipped(false);
                                setStats({
                                    reviewed: 0,
                                    correct: 0
                                });
                            },
                            className: "px-3 py-1.5 rounded-lg text-xs font-semibold",
                            style: {
                                background: 'rgba(0,229,160,0.12)',
                                color: TOKENS.color.green
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5 inline mr-1"
                                }),
                                "Study again"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onExit,
                            className: "px-3 py-1.5 rounded-lg text-xs font-semibold",
                            style: {
                                background: 'rgba(255,255,255,0.06)',
                                color: '#fff'
                            },
                            children: "Back to deck"
                        })
                    ]
                })
            ]
        });
    }
    const card = queue[idx];
    async function rate(rating) {
        if (submitting) return;
        setSubmitting(true);
        try {
            await fetch(`/api/groups/${groupId}/flashcards/${deck.id}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...chatHeaders()
                },
                body: JSON.stringify({
                    flashcardId: card.id,
                    rating
                })
            });
            setStats((s)=>({
                    reviewed: s.reviewed + 1,
                    correct: s.correct + (rating >= 2 ? 1 : 0)
                }));
            setFlipped(false);
            setIdx((i)=>i + 1);
        } catch (e) {
            alert('Failed to save review');
        } finally{
            setSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: onExit,
                        className: "flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold",
                        style: {
                            color: TOKENS.color.muted,
                            background: 'rgba(255,255,255,0.04)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Exit study"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-[11px] font-semibold",
                        style: {
                            color: TOKENS.color.muted
                        },
                        children: [
                            idx + 1,
                            " / ",
                            queue.length
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "h-1 rounded-full overflow-hidden",
                style: {
                    background: 'rgba(255,255,255,0.04)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-full transition-all",
                    style: {
                        width: `${idx / queue.length * 100}%`,
                        background: `linear-gradient(90deg, ${TOKENS.color.green}, ${TOKENS.color.blue})`
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex justify-center py-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: ()=>setFlipped((f)=>!f),
                    className: "w-full max-w-2xl min-h-[280px] p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300",
                    style: {
                        background: flipped ? `linear-gradient(135deg, rgba(0,229,160,0.08), rgba(79,195,247,0.05))` : `linear-gradient(135deg, rgba(167,139,250,0.08), rgba(99,102,241,0.05))`,
                        border: `1px solid ${flipped ? 'rgba(0,229,160,0.2)' : 'rgba(167,139,250,0.2)'}`,
                        cursor: 'pointer'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "text-[10px] uppercase tracking-wider mb-3",
                            style: {
                                color: flipped ? TOKENS.color.green : TOKENS.color.purple
                            },
                            children: flipped ? 'Answer' : 'Question'
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "text-base font-semibold text-white whitespace-pre-wrap",
                            children: flipped ? card.back : card.front
                        }),
                        card.hint && !flipped && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-[11px] mt-3 italic",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: [
                                "\uD83D\uDCA1 Hint: ",
                                card.hint
                            ]
                        }),
                        !flipped && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "text-[10px] mt-4",
                            style: {
                                color: TOKENS.color.muted
                            },
                            children: "Click to flip"
                        })
                    ]
                })
            }),
            flipped && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-4 gap-2 max-w-2xl mx-auto",
                children: [
                    {
                        label: 'Again',
                        rating: 0,
                        color: TOKENS.color.red,
                        desc: '<1m'
                    },
                    {
                        label: 'Hard',
                        rating: 1,
                        color: TOKENS.color.orange,
                        desc: '1d'
                    },
                    {
                        label: 'Good',
                        rating: 2,
                        color: TOKENS.color.blue,
                        desc: '3d'
                    },
                    {
                        label: 'Easy',
                        rating: 3,
                        color: TOKENS.color.green,
                        desc: '6d+'
                    }
                ].map((b)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>rate(b.rating),
                        disabled: submitting,
                        className: "p-2.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50",
                        style: {
                            background: `${b.color}1a`,
                            color: b.color,
                            border: `1px solid ${b.color}40`
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                children: b.label
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "text-[9px] mt-0.5 opacity-70",
                                children: b.desc
                            })
                        ]
                    }, b.rating))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex justify-center gap-2",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    onClick: ()=>{
                        setFlipped(false);
                        setIdx((i)=>Math.min(i + 1, queue.length));
                    },
                    className: "text-[11px] font-semibold px-2 py-1",
                    style: {
                        color: TOKENS.color.muted
                    },
                    children: "Skip →"
                })
            })
        ]
    });
}
function DeckEditor({ deck, groupId, chatHeaders, onCancel, onSaved }) {
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(deck?.name || '');
    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(deck?.description || '');
    const [subject, setSubject] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(deck?.subject || '');
    const [cards, setCards] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(deck?.flashcards?.map((c)=>({
            id: c.id,
            front: c.front,
            back: c.back,
            hint: c.hint,
            tags: (c.tags || []).join(', ')
        })) || [
        {
            front: '',
            back: '',
            hint: '',
            tags: ''
        }
    ]);
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    function updateCard(idx, field, value) {
        setCards((cs)=>cs.map((c, i)=>i === idx ? {
                    ...c,
                    [field]: value
                } : c));
    }
    function addCard() {
        setCards((cs)=>[
                ...cs,
                {
                    front: '',
                    back: '',
                    hint: '',
                    tags: ''
                }
            ]);
    }
    function removeCard(idx) {
        setCards((cs)=>cs.length === 1 ? cs : cs.filter((_, i)=>i !== idx));
    }
    async function handleSave() {
        if (!name.trim()) {
            alert('Deck name is required');
            return;
        }
        const validCards = cards.filter((c)=>c.front.trim() || c.back.trim());
        setSaving(true);
        try {
            const payload = {
                name: name.trim(),
                description: description.trim(),
                subject: subject.trim(),
                flashcards: validCards.map((c, i)=>({
                        id: c.id,
                        front: c.front.trim(),
                        back: c.back.trim(),
                        hint: c.hint.trim(),
                        tags: c.tags.split(',').map((t)=>t.trim()).filter(Boolean),
                        order: i
                    }))
            };
            const url = deck ? `/api/groups/${groupId}/flashcards/${deck.id}` : `/api/groups/${groupId}/flashcards`;
            const method = deck ? 'PATCH' : 'POST';
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...chatHeaders()
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Save failed');
            }
            onSaved();
        } catch (e) {
            alert(e.message || 'Save failed');
        } finally{
            setSaving(false);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: onCancel,
                        className: "flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold",
                        style: {
                            color: TOKENS.color.muted,
                            background: 'rgba(255,255,255,0.04)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Cancel"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleSave,
                        disabled: saving,
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40",
                        style: {
                            background: 'rgba(0,229,160,0.15)',
                            color: TOKENS.color.green,
                            border: '1px solid rgba(0,229,160,0.3)'
                        },
                        children: [
                            saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 animate-spin"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            deck ? 'Save changes' : 'Create deck'
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-[10px] font-semibold uppercase tracking-wider",
                                style: {
                                    color: TOKENS.color.muted
                                },
                                children: "Deck name *"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: name,
                                onChange: (e)=>setName(e.target.value),
                                placeholder: "e.g. Cardiology High-Yield",
                                className: "w-full mt-1 px-3 py-2 rounded-lg text-sm text-white",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)'
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        className: "text-[10px] font-semibold uppercase tracking-wider",
                                        style: {
                                            color: TOKENS.color.muted
                                        },
                                        children: "Subject (optional)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        value: subject,
                                        onChange: (e)=>setSubject(e.target.value),
                                        placeholder: "Cardiology",
                                        className: "w-full mt-1 px-3 py-2 rounded-lg text-sm text-white",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.08)'
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        className: "text-[10px] font-semibold uppercase tracking-wider",
                                        style: {
                                            color: TOKENS.color.muted
                                        },
                                        children: "Description"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        value: description,
                                        onChange: (e)=>setDescription(e.target.value),
                                        placeholder: "High-yield cards for board prep",
                                        className: "w-full mt-1 px-3 py-2 rounded-lg text-sm text-white",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.08)'
                                        }
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs font-semibold",
                                style: {
                                    color: TOKENS.color.muted
                                },
                                children: [
                                    "Cards (",
                                    cards.filter((c)=>c.front.trim() || c.back.trim()).length,
                                    ")"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: addCard,
                                className: "flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold",
                                style: {
                                    background: 'rgba(167,139,250,0.12)',
                                    color: TOKENS.color.purple
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    " Add card"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-2",
                        children: cards.map((card, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "p-3 rounded-xl space-y-2",
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.04)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[10px] font-mono",
                                                style: {
                                                    color: TOKENS.color.muted
                                                },
                                                children: [
                                                    "#",
                                                    i + 1
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>removeCard(i),
                                                className: "text-[10px]",
                                                style: {
                                                    color: cards.length === 1 ? '#3a4055' : TOKENS.color.red
                                                },
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Brain_Calendar_Check_Layers_Loader2_Pencil_Plus_RotateCw_Sparkles_Trash2_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                        value: card.front,
                                        onChange: (e)=>updateCard(i, 'front', e.target.value),
                                        placeholder: "Front (question)",
                                        rows: 2,
                                        className: "w-full px-2 py-1.5 rounded text-xs text-white resize-none",
                                        style: {
                                            background: 'rgba(167,139,250,0.05)',
                                            border: '1px solid rgba(167,139,250,0.15)'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                        value: card.back,
                                        onChange: (e)=>updateCard(i, 'back', e.target.value),
                                        placeholder: "Back (answer)",
                                        rows: 2,
                                        className: "w-full px-2 py-1.5 rounded text-xs text-white resize-none",
                                        style: {
                                            background: 'rgba(0,229,160,0.05)',
                                            border: '1px solid rgba(0,229,160,0.15)'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                value: card.hint,
                                                onChange: (e)=>updateCard(i, 'hint', e.target.value),
                                                placeholder: "Hint (optional)",
                                                className: "px-2 py-1 rounded text-[11px] text-white",
                                                style: {
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.06)'
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                value: card.tags,
                                                onChange: (e)=>updateCard(i, 'tags', e.target.value),
                                                placeholder: "tags, comma, separated",
                                                className: "px-2 py-1 rounded text-[11px] text-white",
                                                style: {
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.06)'
                                                }
                                            })
                                        ]
                                    })
                                ]
                            }, i))
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 41189:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RotateCw)
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
    name: "rotate-cw",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
                key: "1p45f6"
            }
        ],
        [
            "path",
            {
                d: "M21 3v5h-5",
                key: "1q7to0"
            }
        ]
    ]
};
__iconData.node;
const RotateCw = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=rotate-cw.mjs.map


/***/ })

}]);