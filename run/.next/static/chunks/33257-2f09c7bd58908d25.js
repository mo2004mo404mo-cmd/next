"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[33257],{

/***/ 12561:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ ModelPicker)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22200);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93744);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7589);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(65342);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(50626);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40980);
/* harmony import */ var _lib_ai_model_catalog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(33201);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96231);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50694);
/* __next_internal_client_entry_do_not_use__ ModelPicker auto */ 
/**
 * ModelPicker — the searchable model combobox (FreeLLMAPI model-combobox
 * pattern) that reads the LIVE /api/providers catalog.
 *
 * This is the component that makes "the models I added" visible app-wide:
 * the catalog's `byok` section is built from the user's curated
 * modelsConfig, so anything added in Settings → AI Providers → Models
 * appears here immediately.
 *
 * Usage:
 *   <ModelPicker
 *     value={model}                    // "providerId:modelId" | null (auto)
 *     onChange={(v) => setModel(v)}
 *     compact                          // inline trigger (default: block)
 *   />
 */ 





/** Brand tile for a model option: the provider's /logos/ mark when the
 *  catalog carries one, the registry's icon as a fallback, else a colored
 *  dot (the pre-logo treatment). Mono logos are inverted by ProviderAvatar. */ function optionAvatar(o) {
    const icon = o.providerIcon ?? _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_3__/* .BYOK_PROVIDER_BY_ID */ .Uy[o.providerId]?.icon;
    if (!icon) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            "aria-hidden": true,
            className: "size-2 rounded-full shrink-0",
            style: {
                backgroundColor: (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .platformColor */ .pG)(o.providerId)
            }
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .ProviderAvatar */ .$N, {
        provider: {
            id: o.providerId,
            name: o.providerName,
            icon
        },
        size: "xs"
    });
}
const SECTION_META = {
    server: {
        label: 'Server (managed)',
        icon: _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A
    },
    byok: {
        label: 'Your providers',
        icon: _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A
    },
    local: {
        label: 'Local',
        icon: _barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A
    }
};
function ModelPicker({ value, onChange, compact = false, placeholder = 'Auto (server decides)', className }) {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [catalog, setCatalog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const rootRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Fetch the live catalog whenever the picker opens (cheap, no-store).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open || catalog) return;
        let cancelled = false;
        (async ()=>{
            try {
                const res = await fetch('/api/providers', {
                    cache: 'no-store'
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!cancelled) setCatalog(data);
            } catch  {
            /* picker still usable with "Auto" */ } finally{
                if (!cancelled) setLoading(false);
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        open,
        catalog
    ]);
    // Close on outside click / Escape.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        const onDown = (e)=>{
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e)=>{
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return ()=>{
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [
        open
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (open) setTimeout(()=>inputRef.current?.focus(), 30);
    }, [
        open
    ]);
    const options = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!catalog) return [];
        const out = [];
        const push = (p, section)=>{
            for (const m of p.models){
                out.push({
                    value: `${p.id}:${m.id}`,
                    providerId: p.id,
                    providerName: p.name,
                    providerIcon: p.icon,
                    model: m,
                    section
                });
            }
        };
        for (const p of catalog.server)push(p, 'server');
        for (const p of catalog.byok)push(p, 'byok');
        for (const p of catalog.local)push(p, 'local');
        return out;
    }, [
        catalog
    ]);
    const filtered = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter((o)=>o.model.name.toLowerCase().includes(q) || o.model.id.toLowerCase().includes(q) || o.providerName.toLowerCase().includes(q) || o.providerId.toLowerCase().includes(q));
    }, [
        options,
        query
    ]);
    // Group filtered options by section for rendering.
    const grouped = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const map = new Map();
        for (const o of filtered){
            const list = map.get(o.section);
            if (list) list.push(o);
            else map.set(o.section, [
                o
            ]);
        }
        return map;
    }, [
        filtered
    ]);
    const selected = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!value || !catalog) return null;
        const parsed = (0,_lib_ai_model_catalog__WEBPACK_IMPORTED_MODULE_7__/* .parseModelString */ .U)(value);
        if (!parsed) return null;
        return options.find((o)=>o.providerId === parsed.providerId && o.model.id === parsed.modelId) ?? null;
    }, [
        value,
        catalog,
        options
    ]);
    const byokCount = catalog?.byok.reduce((n, p)=>n + p.models.length, 0) ?? 0;
    const select = (v)=>{
        onChange(v);
        setOpen(false);
        setQuery('');
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: rootRef,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('relative', !compact && 'w-full', className),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                type: "button",
                onClick: ()=>setOpen((o)=>!o),
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#08090f] text-left transition-colors hover:border-[#00e5a0]/30', compact ? 'h-8 px-2.5' : 'h-9 px-3 w-full'),
                children: [
                    selected ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            optionAvatar(selected),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[11px] font-medium text-[#e8ecf4] truncate",
                                children: selected.model.name
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[10px] text-[#5a6478] truncate hidden sm:inline",
                                children: selected.providerName
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "size-3.5 text-[#00e5a0] shrink-0"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[11px] text-[#8b95a8] truncate",
                                children: placeholder
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                        className: "size-3.5 text-[#5a6478] ml-auto shrink-0"
                    })
                ]
            }),
            open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute z-50 mt-1.5 w-[min(26rem,calc(100vw-3rem))] rounded-xl border border-white/[0.08] bg-[#0c0e14] shadow-2xl shadow-black/60 overflow-hidden left-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 px-3 h-10 border-b border-white/[0.06]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "size-3.5 text-[#5a6478] shrink-0"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                ref: inputRef,
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                placeholder: "Search models…",
                                className: "flex-1 bg-transparent text-[11px] text-[#e8ecf4] placeholder:text-[#5a6478] outline-none"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] text-[#5a6478] tabular-nums shrink-0",
                                children: loading ? '…' : `${filtered.length} models`
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "max-h-[45vh] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>select(null),
                                className: "w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[0.04] text-left border-b border-white/[0.04]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "size-3.5 text-[#00e5a0] shrink-0"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[11px] font-medium text-[#e8ecf4]",
                                        children: "Auto"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] text-[#5a6478] truncate",
                                        children: catalog?.serverDefault ? `defaults to ${catalog.serverDefault}` : 'server decides'
                                    }),
                                    value == null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "size-3.5 text-[#00e5a0] ml-auto shrink-0"
                                    })
                                ]
                            }),
                            loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "px-3 py-6 text-center text-[10px] text-[#5a6478]",
                                children: "Loading catalog…"
                            }),
                            !loading && filtered.length === 0 && query && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-3 py-6 text-center text-[10px] text-[#5a6478]",
                                children: [
                                    "No models match “",
                                    query,
                                    "”"
                                ]
                            }),
                            !loading && filtered.length === 0 && !query && !options.length && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-3 py-6 text-center space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] text-[#8b95a8]",
                                        children: "No models available yet."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] text-[#5a6478]",
                                        children: "Add a provider key in Settings → AI Providers, then add models."
                                    })
                                ]
                            }),
                            [
                                ...grouped.entries()
                            ].map(([section, list])=>{
                                const meta = SECTION_META[section];
                                const Icon = meta.icon;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-1.5 px-3 pt-2.5 pb-1 sticky top-0 bg-[#0c0e14] z-10",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                                    className: "size-3 text-[#5a6478]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[9px] font-bold uppercase tracking-wider text-[#5a6478]",
                                                    children: [
                                                        meta.label,
                                                        section === 'byok' && byokCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "ml-1 text-[#00e5a0]",
                                                            children: [
                                                                "\xb7 ",
                                                                byokCount,
                                                                " yours"
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        list.slice(0, 60).map((o)=>{
                                            // #task29: a non-chat TOOL model (tts / asr / image / web-search /
                                            // web-reader) cannot answer chat completions — selecting it would
                                            // only produce a 400 from the provider. Shown for transparency,
                                            // but not selectable.
                                            const nonChat = o.model.capabilities?.chat === false;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "button",
                                                disabled: nonChat,
                                                onClick: ()=>select(o.value),
                                                title: nonChat ? `Tool model (${o.model.capabilityLabel ?? 'non-chat'}) — it is used by its own feature, not chat completions` : undefined,
                                                "aria-disabled": nonChat,
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('w-full flex items-center gap-2.5 px-3 py-2 text-left group', nonChat ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/[0.04] cursor-pointer'),
                                                children: [
                                                    optionAvatar(o),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "block text-[11px] font-medium text-[#e8ecf4] truncate",
                                                                children: o.model.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "block text-[9px] text-[#5a6478] truncate font-mono",
                                                                children: [
                                                                    o.providerId,
                                                                    ":",
                                                                    o.model.id
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-1 shrink-0",
                                                        children: [
                                                            nonChat && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[9px] rounded-full px-1.5 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/25",
                                                                children: [
                                                                    o.model.capabilityLabel ?? 'tool',
                                                                    " \xb7 not chat"
                                                                ]
                                                            }),
                                                            o.model.capabilities?.vision && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .CapabilityChip */ .lc, {
                                                                kind: "vision"
                                                            }),
                                                            o.model.capabilities?.tools && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .CapabilityChip */ .lc, {
                                                                kind: "tools"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .ContextChip */ .Au, {
                                                                tokens: o.model.contextWindow
                                                            })
                                                        ]
                                                    }),
                                                    value === o.value && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                        className: "size-3.5 text-[#00e5a0] shrink-0"
                                                    })
                                                ]
                                            }, o.value);
                                        }),
                                        list.length > 60 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "px-3 py-1.5 text-[9px] text-[#5a6478]",
                                            children: [
                                                "+",
                                                list.length - 60,
                                                " more — type to search"
                                            ]
                                        })
                                    ]
                                }, section);
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1.5 px-3 h-8 border-t border-white/[0.06] bg-[#08090f]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronsUpDown_Globe_HardDrive_Search_Server_Sparkles_User_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                className: "size-3 text-[#5a6478]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[9px] text-[#5a6478]",
                                children: [
                                    "Catalog from server + your providers",
                                    catalog?.userDefault ? ' · default saved' : ''
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 29991:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 33201:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ parseModelString)
/* harmony export */ });
/* unused harmony export buildModelString */
/**
 * Shared model catalog types — client-safe (no server-only imports).
 *
 * Used by:
 *   - /api/providers              (server: assembles the catalog)
 *   - ModelPicker.tsx             (client: renders the catalog)
 *   - useUserModel hook           (client: persists selection)
 *
 * The catalog is split into three clearly-differentiated sections:
 *
 *   1. `server`  — providers the operator configured server-side
 *                  (env vars or server-providers.yml). Users can use these
 *                  without any setup; the operator pays.
 *
 *   2. `byok`    — providers the current user has saved their own API key
 *                  for (encrypted in UserApiKey). The user pays. The server
 *                  resolves the key from the DB — it NEVER crosses the wire
 *                  back to the browser.
 *
 *   3. `local`   — keyless local providers (Ollama, Lemonade). Auto-detected
 *                  by probing localhost; usable from any device that has
 *                  the local service running.
 *
 *   4. `available` — providers the user *could* add a key for (BYOK entry
 *                  point). Useful for the "Add provider" UI.
 */ /** Build a model string from providerId + modelId */ function buildModelString(providerId, modelId) {
    return `${providerId}:${modelId}`;
}
/** Parse a model string into providerId + modelId */ function parseModelString(s) {
    if (!s || typeof s !== 'string') return null;
    const idx = s.indexOf(':');
    if (idx <= 0 || idx >= s.length - 1) return null;
    return {
        providerId: s.slice(0, idx),
        modelId: s.slice(idx + 1)
    };
}


/***/ }),

/***/ 33807:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Label auto */ 


function Label({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        "data-slot": "label",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    });
}



/***/ }),

/***/ 60529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44886);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_input__WEBPACK_IMPORTED_MODULE_2__/* .Input */ .p, {
        type: type,
        "data-slot": "input",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
        ...props
    });
}



/***/ })

}]);