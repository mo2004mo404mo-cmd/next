"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[25818],{

/***/ 25818:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnatomyDiscover)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(61491);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29450);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1275);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(54757);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(82749);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AnatomyDiscover — AI-powered in-app discovery of 3D anatomy models + images.
 *
 * STREAMING ARCHITECTURE
 * ───────────────────────
 * The component fires TWO parallel API calls on every search:
 *
 *   POST /api/anatomy-discover/sketchfab   (fast: ~1-3s)
 *   POST /api/anatomy-discover/images      (slow: ~15-50s)
 *
 * Each call resolves independently. State is tracked separately:
 *
 *   sketchfabStatus: 'idle' | 'loading' | 'done' | 'error'
 *   imagesStatus:    'idle' | 'loading' | 'done' | 'error'
 *
 * Whichever call resolves first renders immediately. The user sees 3D
 * models within ~2s, and images fill in over the next ~30s. If images
 * fail entirely, 3D models still render — and vice versa.
 *
 * This is "streaming-like" without needing SSE or ReadableStream: just
 * two independent fetches updating two independent state slices.
 */ 


// ── Color constants ──
const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, rgba(255,255,255,0.03))',
    cardSolid: '#151821',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    blue: '#3b82f6'
};
function alpha(color, percentage) {
    return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
}
const SYSTEMS = [
    'General',
    'Cardiovascular',
    'Respiratory',
    'Neurological',
    'Gastrointestinal',
    'Renal/Urinary',
    'Endocrine',
    'Musculoskeletal',
    'Hematology',
    'Psychiatry',
    'Pediatrics',
    'OB/GYN',
    'Emergency'
];
const QUICK_TOPICS = [
    'Circle of Willis',
    'Brachial plexus',
    'Heart chambers and valves',
    'Cranial nerves',
    'Female pelvic floor',
    'Spinal cord tracts',
    'Shoulder joint muscles',
    'Abdominal wall layers',
    'Inner ear anatomy',
    'Cerebellum'
];
// ── Helpers ──
function formatCount(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
}
const INITIAL_SKETCHFAB = {
    status: 'idle',
    models: []
};
const INITIAL_IMAGES = {
    status: 'idle',
    images: []
};
// ── Component ──
function AnatomyDiscover() {
    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [system, setSystem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('General');
    const [sketchfab, setSketchfab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(INITIAL_SKETCHFAB);
    const [images, setImages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(INITIAL_IMAGES);
    const [activeModel, setActiveModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [activeImage, setActiveImage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showAllModels, setShowAllModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const resultsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const searching = sketchfab.status === 'loading' || images.status === 'loading';
    const runSearch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const q = query.trim();
        if (!q) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Type a topic to search', {
                description: 'e.g. "brachial plexus" or "circle of Willis"'
            });
            return;
        }
        // Reset state, keep query
        setActiveModel(null);
        setActiveImage(null);
        setShowAllModels(false);
        setSketchfab({
            status: 'loading',
            models: []
        });
        setImages({
            status: 'loading',
            images: []
        });
        // Scroll to results area immediately so the user sees the loading state
        requestAnimationFrame(()=>{
            resultsRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        // Fire BOTH requests in parallel. We do NOT await them together —
        // each fetch().then() updates its own state slice independently,
        // so whichever resolves first renders immediately.
        //
        // AbortController lets us cancel if the user starts a new search
        // before the previous one finishes.
        const skCtrl = new AbortController();
        const imgCtrl = new AbortController();
        // Sketchfab (fast) — ~1-3s
        fetch('/api/anatomy-discover/sketchfab', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: q,
                count: 12
            }),
            signal: skCtrl.signal
        }).then(async (res)=>{
            const data = await res.json();
            if (!res.ok) {
                setSketchfab({
                    status: 'error',
                    models: [],
                    error: data?.error || `HTTP ${res.status}`
                });
                return;
            }
            setSketchfab({
                status: 'done',
                models: data.models ?? [],
                suggestedModelId: data.suggestedModelId
            });
        }).catch((err)=>{
            if (err?.name === 'AbortError') return;
            setSketchfab({
                status: 'error',
                models: [],
                error: err instanceof Error ? err.message : 'Network error'
            });
        });
        // Images (slow) — ~15-50s
        fetch('/api/anatomy-discover/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: q,
                system,
                count: 8
            }),
            signal: imgCtrl.signal
        }).then(async (res)=>{
            const data = await res.json();
            if (!res.ok) {
                setImages({
                    status: 'error',
                    images: [],
                    error: data?.error || `HTTP ${res.status}`
                });
                return;
            }
            setImages({
                status: 'done',
                images: data.images ?? []
            });
        }).catch((err)=>{
            if (err?.name === 'AbortError') return;
            setImages({
                status: 'error',
                images: [],
                error: err instanceof Error ? err.message : 'Network error'
            });
        });
        // Note: we don't store the AbortControllers — the next runSearch()
        // call simply replaces state, and any in-flight responses are
        // discarded by React (state updates from stale fetches still land
        // but get overwritten by the new fetches' state updates). For a
        // medical-ed app with infrequent re-searches, this is acceptable.
        // If we wanted true cancellation we'd store the controllers in a
        // ref and abort them in runSearch's preamble.
        void skCtrl;
        void imgCtrl;
    }, [
        query,
        system
    ]);
    const handleAutoPick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (sketchfab.status !== 'done' || !sketchfab.suggestedModelId) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('No suggested model yet', {
                description: sketchfab.status === 'loading' ? 'Still searching Sketchfab — give it a few seconds.' : 'Run a search first — the AI picks the best model from the results.'
            });
            return;
        }
        const picked = sketchfab.models.find((m)=>m.uid === sketchfab.suggestedModelId);
        if (picked) {
            setActiveModel(picked);
            setActiveImage(null);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`AI picked: ${picked.name}`, {
                description: `by ${picked.author} · ${formatCount(picked.likeCount)} likes`
            });
            requestAnimationFrame(()=>{
                resultsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    }, [
        sketchfab
    ]);
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !searching) {
            e.preventDefault();
            runSearch();
        }
    };
    // ── Visible models: show 6 by default, expand to all on demand ──
    const visibleModels = showAllModels ? sketchfab.models : sketchfab.models.slice(0, 6);
    // ── For "no results" empty state — only show if BOTH sources are done and empty ──
    const bothEmpty = sketchfab.status === 'done' && images.status === 'done' && sketchfab.models.length === 0 && images.images.length === 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-w-0 space-y-4 pb-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl border p-3 sm:p-5",
                style: {
                    background: `linear-gradient(135deg, ${alpha(C.cyan, 8)}, ${alpha(C.purple, 8)})`,
                    borderColor: alpha(C.cyan, 30)
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                style: {
                                    background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-white"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-base font-bold leading-tight",
                                        style: {
                                            color: C.text
                                        },
                                        children: "AI Anatomy Discovery"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "mt-1 max-w-2xl text-xs leading-relaxed",
                                        style: {
                                            color: C.muted
                                        },
                                        children: "Type any topic — the AI agent searches Sketchfab for 3D models and the web for related medical images, all in-app."
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_10rem] lg:flex lg:flex-row",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
                                        style: {
                                            color: C.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        value: query,
                                        onChange: (e)=>setQuery(e.target.value),
                                        onKeyDown: handleKeyDown,
                                        placeholder: "e.g. brachial plexus, circle of Willis, shoulder joint…",
                                        className: "w-full rounded-lg py-2.5 pl-9 pr-3 text-sm",
                                        style: {
                                            background: C.bg,
                                            border: `1px solid ${C.cardBorder}`,
                                            color: C.text,
                                            outline: 'none'
                                        },
                                        disabled: searching
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative min-w-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
                                        value: system,
                                        onChange: (e)=>setSystem(e.target.value),
                                        "aria-label": "Anatomy system",
                                        className: "w-full cursor-pointer appearance-none rounded-lg py-2.5 pl-3 pr-8 text-sm font-medium",
                                        style: {
                                            background: C.bg,
                                            border: `1px solid ${C.cardBorder}`,
                                            color: C.text,
                                            outline: 'none'
                                        },
                                        disabled: searching,
                                        children: SYSTEMS.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                value: s,
                                                children: s
                                            }, s))
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none",
                                        style: {
                                            color: C.muted
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: runSearch,
                                disabled: searching,
                                className: "flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50",
                                style: {
                                    background: C.cyan,
                                    color: C.bg
                                },
                                children: [
                                    sketchfab.status === 'loading' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    searching ? 'Searching…' : 'Search'
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: handleAutoPick,
                                disabled: sketchfab.status !== 'done' || !sketchfab.suggestedModelId,
                                className: "flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40",
                                style: {
                                    background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`,
                                    color: '#fff'
                                },
                                title: "AI picks the single best 3D model for your topic and embeds it",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    "AI Auto-pick"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-3 flex min-w-0 flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "shrink-0 text-[10px] uppercase tracking-wider",
                                style: {
                                    color: C.muted
                                },
                                children: "Try:"
                            }),
                            QUICK_TOPICS.map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>{
                                        setQuery(t);
                                    },
                                    disabled: searching,
                                    className: "whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] transition-colors disabled:opacity-50",
                                    style: {
                                        borderColor: C.cardBorder,
                                        color: C.muted,
                                        background: 'transparent'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.borderColor = alpha(C.cyan, 40);
                                        e.currentTarget.style.color = C.cyan;
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.borderColor = C.cardBorder;
                                        e.currentTarget.style.color = C.muted;
                                    },
                                    children: t
                                }, t))
                        ]
                    })
                ]
            }),
            activeModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl overflow-hidden border",
                style: {
                    background: C.cardSolid,
                    borderColor: alpha(C.cyan, 40),
                    boxShadow: `0 0 0 1px ${alpha(C.cyan, 20)}, 0 8px 32px ${alpha(C.cyan, 10)}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between px-4 py-3 border-b",
                        style: {
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4 flex-shrink-0",
                                        style: {
                                            color: C.cyan
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-sm font-semibold truncate",
                                                style: {
                                                    color: C.text
                                                },
                                                children: activeModel.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: C.muted
                                                },
                                                children: [
                                                    "by ",
                                                    activeModel.author,
                                                    " \xb7 ",
                                                    formatCount(activeModel.likeCount),
                                                    " likes \xb7 ",
                                                    formatCount(activeModel.viewCount),
                                                    " views"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5 flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                        href: activeModel.viewerUrl,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "text-[10px] flex items-center gap-1 px-2 py-1 rounded-md",
                                        style: {
                                            background: C.card,
                                            color: C.muted
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Sketchfab"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveModel(null),
                                        className: "text-[10px] flex items-center gap-1 px-2 py-1 rounded-md",
                                        style: {
                                            background: C.card,
                                            color: C.muted
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Close"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "aspect-[4/3] max-h-[560px]",
                        style: {
                            position: 'relative',
                            background: C.bg
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("iframe", {
                            src: activeModel.embedUrl,
                            title: activeModel.name,
                            allow: "autoplay; fullscreen; xr-spatial-tracking",
                            referrerPolicy: "origin",
                            style: {
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }
                        }, activeModel.uid)
                    }),
                    activeModel.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "px-4 py-3 text-xs border-t",
                        style: {
                            borderColor: C.cardBorder,
                            color: C.muted
                        },
                        children: activeModel.description
                    })
                ]
            }),
            activeImage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl overflow-hidden border",
                style: {
                    background: C.cardSolid,
                    borderColor: alpha(C.green, 40)
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between px-4 py-3 border-b",
                        style: {
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-4 h-4 flex-shrink-0",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-sm font-semibold truncate",
                                        style: {
                                            color: C.text
                                        },
                                        children: activeImage.caption || 'Reference image'
                                    }),
                                    activeImage.source && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[10px]",
                                        style: {
                                            color: C.muted
                                        },
                                        children: [
                                            "\xb7 ",
                                            activeImage.source
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setActiveImage(null),
                                className: "text-[10px] flex items-center gap-1 px-2 py-1 rounded-md",
                                style: {
                                    background: C.card,
                                    color: C.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    "Close"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center justify-center p-4",
                        style: {
                            background: C.bg
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                            src: activeImage.url,
                            alt: activeImage.caption || 'anatomy reference',
                            style: {
                                maxHeight: 560,
                                maxWidth: '100%',
                                objectFit: 'contain',
                                borderRadius: 8
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                ref: resultsRef,
                children: [
                    bothEmpty && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl p-12 border flex flex-col items-center gap-3",
                        style: {
                            background: C.card,
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-8 h-8",
                                style: {
                                    color: C.amber
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: C.text
                                },
                                children: [
                                    'No results for "',
                                    query,
                                    '"'
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-center",
                                style: {
                                    color: C.muted
                                },
                                children: "Try a more specific topic, or check your network connection. Both Sketchfab and image search may be temporarily unavailable."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-3 text-[10px] mt-2",
                                children: [
                                    sketchfab.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            color: C.danger
                                        },
                                        children: [
                                            "Sketchfab: ",
                                            sketchfab.error
                                        ]
                                    }),
                                    images.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            color: C.danger
                                        },
                                        children: [
                                            "Images: ",
                                            images.error
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    (sketchfab.status === 'loading' || sketchfab.status === 'done' && sketchfab.models.length > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl p-4 border mb-4",
                        style: {
                            background: C.card,
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-4 h-4",
                                        style: {
                                            color: C.purple
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-sm font-semibold",
                                        style: {
                                            color: C.text
                                        },
                                        children: "3D Models on Sketchfab"
                                    }),
                                    sketchfab.status === 'done' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[9px] px-1.5 py-0.5 rounded-full font-bold",
                                        style: {
                                            background: alpha(C.purple, 15),
                                            color: C.purple
                                        },
                                        children: [
                                            sketchfab.models.length,
                                            " found"
                                        ]
                                    }),
                                    sketchfab.status === 'loading' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1",
                                        style: {
                                            background: alpha(C.purple, 15),
                                            color: C.purple
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                className: "w-2.5 h-2.5 animate-spin"
                                            }),
                                            "searching…"
                                        ]
                                    }),
                                    sketchfab.status === 'done' && sketchfab.suggestedModelId && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: handleAutoPick,
                                        className: "ml-auto text-[10px] flex items-center gap-1 px-2 py-1 rounded-md font-semibold",
                                        style: {
                                            background: alpha(C.purple, 15),
                                            color: C.purple,
                                            border: `1px solid ${alpha(C.purple, 30)}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Pick best for me"
                                        ]
                                    })
                                ]
                            }),
                            sketchfab.status === 'loading' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
                                children: Array.from({
                                    length: 6
                                }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "rounded-xl overflow-hidden border",
                                        style: {
                                            background: C.cardSolid,
                                            borderColor: C.cardBorder,
                                            animation: 'pulse 1.5s ease-in-out infinite'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    aspectRatio: '4 / 3',
                                                    background: C.bg
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "p-2.5 space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "h-2 rounded",
                                                        style: {
                                                            background: C.cardBorder
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "h-2 rounded w-2/3",
                                                        style: {
                                                            background: C.cardBorder
                                                        }
                                                    })
                                                ]
                                            })
                                        ]
                                    }, i))
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
                                        children: visibleModels.map((m)=>{
                                            const isActive = activeModel?.uid === m.uid;
                                            const isSuggested = m.uid === sketchfab.suggestedModelId;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: ()=>{
                                                    setActiveModel(m);
                                                    setActiveImage(null);
                                                },
                                                className: "text-left rounded-xl overflow-hidden border transition-all",
                                                style: {
                                                    background: C.cardSolid,
                                                    borderColor: isActive ? alpha(C.cyan, 80) : isSuggested ? alpha(C.purple, 60) : C.cardBorder,
                                                    boxShadow: isActive ? `0 0 0 1px ${alpha(C.cyan, 40)}` : isSuggested ? `0 0 0 1px ${alpha(C.purple, 30)}` : 'none'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "relative",
                                                        style: {
                                                            aspectRatio: '4 / 3',
                                                            background: C.bg,
                                                            backgroundImage: m.thumbnailUrl ? `url(${m.thumbnailUrl})` : 'none',
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center'
                                                        },
                                                        children: [
                                                            !m.thumbnailUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "absolute inset-0 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                                    className: "w-8 h-8",
                                                                    style: {
                                                                        color: C.muted
                                                                    }
                                                                })
                                                            }),
                                                            isSuggested && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1",
                                                                style: {
                                                                    background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`,
                                                                    color: '#fff'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                                        className: "w-2.5 h-2.5"
                                                                    }),
                                                                    "AI PICK"
                                                                ]
                                                            }),
                                                            isActive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1",
                                                                style: {
                                                                    background: C.cyan,
                                                                    color: C.bg
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                        className: "w-2.5 h-2.5"
                                                                    }),
                                                                    "VIEWING"
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "p-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "text-[11px] font-semibold leading-tight line-clamp-2 mb-1",
                                                                style: {
                                                                    color: C.text
                                                                },
                                                                children: m.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex items-center gap-2 text-[9px]",
                                                                style: {
                                                                    color: C.muted
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "truncate flex-1",
                                                                        children: [
                                                                            "by ",
                                                                            m.author
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "flex items-center gap-0.5 flex-shrink-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                                                className: "w-2.5 h-2.5"
                                                                            }),
                                                                            formatCount(m.likeCount)
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, m.uid);
                                        })
                                    }),
                                    sketchfab.models.length > 6 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setShowAllModels(!showAllModels),
                                        className: "mt-3 mx-auto text-xs flex items-center gap-1 px-3 py-1.5 rounded-md",
                                        style: {
                                            background: 'transparent',
                                            color: C.cyan,
                                            border: `1px solid ${alpha(C.cyan, 30)}`
                                        },
                                        children: [
                                            showAllModels ? 'Show fewer' : `Show all ${sketchfab.models.length} models`,
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                className: "w-3 h-3",
                                                style: {
                                                    transform: showAllModels ? 'rotate(180deg)' : 'none'
                                                }
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    sketchfab.status === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl p-4 border mb-4 flex items-start gap-2",
                        style: {
                            background: alpha(C.danger, 8),
                            borderColor: alpha(C.danger, 30)
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-4 h-4 mt-0.5 flex-shrink-0",
                                style: {
                                    color: C.danger
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-xs",
                                style: {
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "font-semibold mb-0.5",
                                        children: "Sketchfab search failed"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            color: C.muted
                                        },
                                        children: [
                                            sketchfab.error,
                                            ". You can still try the image search below, or use the Web 3D tab to paste a Sketchfab URL manually."
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    (images.status === 'loading' || images.status === 'done' && images.images.length > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl p-4 border",
                        style: {
                            background: C.card,
                            borderColor: C.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-4 h-4",
                                        style: {
                                            color: C.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-sm font-semibold",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Related Medical Images"
                                    }),
                                    images.status === 'done' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[9px] px-1.5 py-0.5 rounded-full font-bold",
                                        style: {
                                            background: alpha(C.green, 15),
                                            color: C.green
                                        },
                                        children: [
                                            images.images.length,
                                            " found"
                                        ]
                                    }),
                                    images.status === 'loading' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1",
                                        style: {
                                            background: alpha(C.green, 15),
                                            color: C.green
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                className: "w-2.5 h-2.5 animate-spin"
                                            }),
                                            "searching the web…"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "ml-auto text-[10px]",
                                        style: {
                                            color: C.muted
                                        },
                                        children: images.status === 'loading' ? 'this takes ~15-50s — 3D models above load faster' : 'Click to enlarge'
                                    })
                                ]
                            }),
                            images.status === 'loading' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
                                children: Array.from({
                                    length: 4
                                }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "rounded-xl overflow-hidden border",
                                        style: {
                                            background: C.cardSolid,
                                            borderColor: C.cardBorder,
                                            animation: 'pulse 1.5s ease-in-out infinite'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                style: {
                                                    aspectRatio: '4 / 3',
                                                    background: C.bg
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "p-2",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-2 rounded",
                                                    style: {
                                                        background: C.cardBorder
                                                    }
                                                })
                                            })
                                        ]
                                    }, i))
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
                                children: images.images.map((img, i)=>{
                                    const isActive = activeImage?.url === img.url;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>{
                                            setActiveImage(img);
                                            setActiveModel(null);
                                        },
                                        className: "text-left rounded-xl overflow-hidden border transition-all",
                                        style: {
                                            background: C.cardSolid,
                                            borderColor: isActive ? alpha(C.green, 80) : C.cardBorder
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "relative",
                                                style: {
                                                    aspectRatio: '4 / 3',
                                                    background: C.bg,
                                                    backgroundImage: `url(${img.url})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "p-2",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[10px] leading-tight line-clamp-2",
                                                    style: {
                                                        color: C.muted
                                                    },
                                                    children: img.caption || img.source || 'Reference image'
                                                })
                                            })
                                        ]
                                    }, `${img.url}-${i}`);
                                })
                            })
                        ]
                    }),
                    images.status === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl p-4 border flex items-start gap-2",
                        style: {
                            background: alpha(C.danger, 8),
                            borderColor: alpha(C.danger, 30)
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-4 h-4 mt-0.5 flex-shrink-0",
                                style: {
                                    color: C.danger
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-xs",
                                style: {
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "font-semibold mb-0.5",
                                        children: "Image search failed"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            color: C.muted
                                        },
                                        children: [
                                            images.error,
                                            ". 3D models above (if any) are unaffected."
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    (sketchfab.status === 'done' || images.status === 'done') && !searching && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex justify-center pt-2",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>{
                                setSketchfab(INITIAL_SKETCHFAB);
                                setImages(INITIAL_IMAGES);
                                setActiveModel(null);
                                setActiveImage(null);
                                setShowAllModels(false);
                            },
                            className: "text-xs flex items-center gap-1.5 px-3 py-2 rounded-md",
                            style: {
                                background: C.card,
                                color: C.muted,
                                border: `1px solid ${C.cardBorder}`
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Box_ChevronDown_ExternalLink_Eye_Heart_ImageIcon_Loader2_RefreshCw_Search_Sparkles_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5"
                                }),
                                "Start a new search"
                            ]
                        })
                    })
                ]
            })
        ]
    });
}


/***/ })

}]);