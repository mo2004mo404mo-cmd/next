"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[55331],{

/***/ 2487:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ DiscoverModelsDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_CircleAlert_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Check_CircleAlert_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35484);
/* harmony import */ var _barrel_optimize_names_Check_CircleAlert_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(64577);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42763);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * DiscoverModelsDialog — FreeLLMAPI's discover-models pattern.
 *
 * Fires a live /models probe against the endpoint and shows the discovered
 * models as selectable rows. Distinguishes:
 *   - already registered (checked + disabled + tag)
 *   - new (selectable)
 * "Add N models" registers the genuinely-new picks into the provider's
 * modelsConfig — after which they're visible in every ModelPicker.
 */ 





function DiscoverModelsDialog({ target, onClose, testKey, saveModels }) {
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [discovered, setDiscovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [registering, setRegistering] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Probe whenever a new target mounts (dialog mounts only-while-open).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!target) return;
        let cancelled = false;
        setLoading(true);
        setError(null);
        setDiscovered([]);
        setSelected(new Set());
        (async ()=>{
            const res = await testKey(target.id, target.providerId);
            if (cancelled) return;
            setLoading(false);
            if (!res.ok) {
                setError(res.error || 'The endpoint could not be reached');
                return;
            }
            const models = res.models ?? [];
            if (!models.length) {
                setError('The endpoint responded but did not list any models (no /models support).');
                return;
            }
            setDiscovered(models);
            // Pre-select models that are NOT already registered.
            const existing = new Set((target.modelsConfig ?? []).map((m)=>m.id));
            setSelected(new Set(models.filter((m)=>!existing.has(m))));
        })();
        return ()=>{
            cancelled = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        target?.id
    ]);
    const existing = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>new Set((target?.modelsConfig ?? []).map((m)=>m.id)), [
        target
    ]);
    const newCount = [
        ...selected
    ].filter((id)=>!existing.has(id)).length;
    const register = async ()=>{
        if (!target || newCount === 0) return;
        setRegistering(true);
        try {
            const merged = new Map((target.modelsConfig ?? []).map((m)=>[
                    m.id,
                    m
                ]));
            for (const id of selected){
                if (!merged.has(id)) merged.set(id, {
                    id,
                    name: id
                });
            }
            await saveModels(target.providerId, [
                ...merged.values()
            ]);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Added ${newCount} model${newCount === 1 ? '' : 's'} — now visible in every picker`);
            onClose();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Could not register models');
        } finally{
            setRegistering(false);
        }
    };
    if (!target) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .Dialog */ .lG, {
        open: true,
        onOpenChange: (o)=>{
            if (!o) onClose();
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogContent */ .Cf, {
            className: "max-w-xl bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pt-5 pb-3 space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogTitle */ .L3, {
                            className: "text-sm font-bold text-[#e8ecf4]",
                            children: [
                                "Discover models \xb7 ",
                                target.label || target.maskedKey
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogDescription */ .rr, {
                            className: "text-[10px] text-[#8b95a8] leading-relaxed",
                            children: [
                                "Probes the endpoint's ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                    className: "font-mono",
                                    children: "/models"
                                }),
                                " list. Registering a model makes it selectable app-wide."
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pb-5 space-y-3",
                    children: [
                        loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "py-10 flex flex-col items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_CircleAlert_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                    className: "size-5 animate-spin text-[#00e5a0]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[10px] text-[#8b95a8]",
                                    children: "Probing the endpoint…"
                                })
                            ]
                        }),
                        error && !loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-start gap-2 p-3 rounded-lg bg-[#ff5757]/[0.06] border border-[#ff5757]/15",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_CircleAlert_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    className: "size-3.5 text-[#ff5757] shrink-0 mt-0.5"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#ff5757]/90 break-all leading-relaxed",
                                            children: error
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: onClose,
                                            className: "text-[9px] font-semibold text-[#00e5a0] hover:underline",
                                            children: "Close and check the endpoint settings"
                                        })
                                    ]
                                })
                            ]
                        }),
                        !loading && !error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 text-[10px] text-[#5a6478]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                            className: "flex items-center gap-1.5 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "checkbox",
                                                    checked: newCount === 0 ? false : newCount === [
                                                        ...discovered
                                                    ].filter((d)=>!existing.has(d)).length,
                                                    onChange: (e)=>{
                                                        const next = new Set(selected);
                                                        for (const m of discovered){
                                                            if (existing.has(m)) continue;
                                                            if (e.target.checked) next.add(m);
                                                            else next.delete(m);
                                                        }
                                                        setSelected(next);
                                                    },
                                                    className: "accent-[#00e5a0]"
                                                }),
                                                "Select new"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "tabular-nums",
                                            children: [
                                                discovered.length,
                                                " found \xb7 ",
                                                existing.size,
                                                " already added"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "max-h-[45vh] overflow-y-auto rounded-xl border border-white/[0.06] divide-y divide-white/[0.04]",
                                    children: discovered.map((m)=>{
                                        const isExisting = existing.has(m);
                                        const isSelected = selected.has(m);
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)('flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-white/[0.03]', isExisting && 'opacity-50 cursor-not-allowed'),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "checkbox",
                                                    checked: isExisting || isSelected,
                                                    disabled: isExisting,
                                                    onChange: (e)=>{
                                                        const next = new Set(selected);
                                                        if (e.target.checked) next.add(m);
                                                        else next.delete(m);
                                                        setSelected(next);
                                                    },
                                                    className: "accent-[#00e5a0]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                    className: "text-[10px] font-mono text-[#e8ecf4] truncate",
                                                    children: m
                                                }),
                                                isExisting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "ml-auto text-[8px] rounded-full px-1.5 py-px bg-white/[0.06] text-[#8b95a8] border border-white/[0.06] shrink-0",
                                                    children: "already added"
                                                })
                                            ]
                                        }, m);
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                            onClick: register,
                                            disabled: registering || newCount === 0,
                                            className: "h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg disabled:opacity-40",
                                            children: [
                                                registering ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_CircleAlert_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "size-3.5 animate-spin"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_CircleAlert_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "size-3.5"
                                                }),
                                                newCount > 0 ? `Add ${newCount} model${newCount === 1 ? '' : 's'}` : 'Nothing new selected'
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                            variant: "ghost",
                                            onClick: onClose,
                                            className: "h-8 px-3 ml-auto text-[11px] text-[#5a6478] hover:text-[#e8ecf4] rounded-lg",
                                            children: "Cancel"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 5736:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Lock)
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
    name: "lock",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "11",
                x: "3",
                y: "11",
                rx: "2",
                ry: "2",
                key: "1w4ew1"
            }
        ],
        [
            "path",
            {
                d: "M7 11V7a5 5 0 0 1 10 0v4",
                key: "fwvmzm"
            }
        ]
    ]
};
__iconData.node;
const Lock = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=lock.mjs.map


/***/ }),

/***/ 7589:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ HardDrive)
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
    name: "hard-drive",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 16h.01",
                key: "1bzywj"
            }
        ],
        [
            "path",
            {
                d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
                key: "18tbho"
            }
        ],
        [
            "path",
            {
                d: "M21.946 12.013H2.054",
                key: "zqlbp7"
            }
        ],
        [
            "path",
            {
                d: "M6 16h.01",
                key: "1pmjb7"
            }
        ]
    ]
};
__iconData.node;
const HardDrive = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=hard-drive.mjs.map


/***/ }),

/***/ 9127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42763);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33807);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21767);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29991);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66609);
/* harmony import */ var _components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(27436);
/* harmony import */ var _lib_pronunciation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31620);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(88074);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(15298);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(95000);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(56395);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(47603);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(78890);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(50626);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(34018);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(46844);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(12651);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(7589);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(97625);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(34306);
/* harmony import */ var _barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(92298);
/* harmony import */ var _components_medq_byok_ByokHub__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21586);
/* harmony import */ var _components_medq_offline_ai_OfflineAIManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(48531);
/* harmony import */ var _components_medq_usePushNotifications__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(81951);
/* harmony import */ var _components_medq_useInstallApp__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(44075);
/* harmony import */ var _components_medq_InstallModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(75632);
/* __next_internal_client_entry_do_not_use__ default auto */ 















function SettingsDialog({ open, onClose }) {
    const { settings, updateSetting, resetSettings } = (0,_components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_8__.useSettings)();
    const [resetting, setResetting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [exporting, setExporting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showByok, setShowByok] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { supported: pushSupported, unavailableReason: pushUnavailable, permission: pushPermission, enabled: pushEnabled, enable: enablePush, disable: disablePush } = (0,_components_medq_usePushNotifications__WEBPACK_IMPORTED_MODULE_12__/* .usePushNotifications */ .c)();
    const [pushBusy, setPushBusy] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // ── Install App ──
    const { platform: installPlatform, canPrompt, isInstalled, installing, install, instructions: installInstructions } = (0,_components_medq_useInstallApp__WEBPACK_IMPORTED_MODULE_13__/* .useInstallApp */ .k)();
    const [installModalOpen, setInstallModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleInstallClick = async ()=>{
        const result = await install();
        if (result.ok && result.method === 'native') {
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success('MedQ installed! Find it on your Home Screen.');
            setInstallModalOpen(false);
        } else if (result.ok && result.method === 'instructions') {
            // Show the modal with platform-specific instructions
            setInstallModalOpen(true);
        } else if (!result.ok && result.reason === 'dismissed') {
            // User dismissed the native prompt — show fallback instructions
            setInstallModalOpen(true);
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.info('No problem — you can install later from your browser menu.');
        } else if (!result.ok && result.reason === 'installed') {
            setInstallModalOpen(true);
        }
    };
    const handleTogglePush = async (next)=>{
        setPushBusy(true);
        try {
            if (next) {
                const result = await enablePush();
                if (!result.ok) {
                    sonner__WEBPACK_IMPORTED_MODULE_7__.toast.error(result.error || 'Failed to enable push notifications');
                } else {
                    sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success('Push notifications enabled — you’ll get reminders even when the tab is closed');
                }
            } else {
                await disablePush();
                sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success('Push notifications disabled');
            }
        } finally{
            setPushBusy(false);
        }
    };
    const handleExport = async (type)=>{
        setExporting(type);
        try {
            const res = await fetch(`/api/export?type=${type}`);
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Export failed');
            }
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // Extract filename from Content-Disposition header, or use default
            const disposition = res.headers.get('Content-Disposition');
            let filename = `medq-${type}-${new Date().toISOString().split('T')[0]}.json`;
            if (disposition) {
                const match = disposition.match(/filename="?([^";]+)"?/);
                if (match) filename = match[1];
            }
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success(`${type === 'all' ? 'All data' : type.charAt(0).toUpperCase() + type.slice(1)} exported successfully!`);
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.error(err.message || 'Failed to export data');
        } finally{
            setExporting(null);
        }
    };
    const handleReset = async ()=>{
        setResetting(true);
        await new Promise((r)=>setTimeout(r, 500));
        resetSettings();
        setResetting(false);
        sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success('Settings reset to defaults');
    };
    const handleClearCache = ()=>{
        try {
            const keysToKeep = [
                'medq-settings',
                'medq-daily-bonus-date',
                'authjs.session-token',
                'next-auth.session-token'
            ];
            const allKeys = Object.keys(localStorage);
            for (const key of allKeys){
                if (!keysToKeep.some((k)=>key.startsWith(k))) {
                    localStorage.removeItem(key);
                }
            }
            if ('caches' in window) {
                caches.keys().then((names)=>names.forEach((name)=>caches.delete(name)));
            }
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success('Cache cleared successfully');
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.error('Failed to clear cache');
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
                open: open && !showByok,
                onOpenChange: (v)=>!v && onClose(),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
                        className: "max-w-lg rounded-2xl border-white/[0.06] p-0 overflow-hidden",
                        style: {
                            background: '#151821'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogHeader */ .c7, {
                                className: "px-6 pt-6 pb-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                                        className: "text-lg font-bold text-[#e8ecf4] flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "w-5 h-5 text-[#00e5a0]"
                                            }),
                                            "Settings"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogDescription */ .rr, {
                                        className: "text-xs text-[#5a6478]",
                                        children: "Customize your MedQ experience"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-6 pb-4 space-y-5 max-h-[65vh] overflow-y-auto",
                                style: {
                                    scrollbarWidth: 'thin'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SettingsSection, {
                                        title: "Notifications",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                                label: "Push Notifications",
                                                description: settings.notifications ? "You'll see the notification bell in the header" : "Notification bell is hidden",
                                                checked: settings.notifications,
                                                onChange: (v)=>updateSetting('notifications', v)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "py-2 px-2 rounded-lg border border-white/[0.04] bg-[#0c0e14]/30 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center justify-between gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "text-xs font-semibold text-[#e8ecf4]",
                                                                        children: "System Push Notifications"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                        className: "text-[10px] text-[#5a6478] mt-0.5",
                                                                        children: [
                                                                            !pushSupported && pushUnavailable === 'iframe' && 'Not available inside the preview frame — open the app in a standalone browser tab',
                                                                            !pushSupported && !pushUnavailable && 'Not supported in this browser',
                                                                            pushSupported && pushPermission === 'denied' && 'Blocked in browser settings — enable in site permissions',
                                                                            pushSupported && pushPermission !== 'denied' && pushEnabled && 'Active — you’ll get notifications even with the tab closed',
                                                                            pushSupported && pushPermission !== 'denied' && !pushEnabled && 'Get reminders for daily challenge, friend requests, and more'
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_5__/* .Switch */ .d, {
                                                                checked: pushEnabled,
                                                                onCheckedChange: handleTogglePush,
                                                                disabled: !pushSupported || pushPermission === 'denied' || pushBusy
                                                            })
                                                        ]
                                                    }),
                                                    pushBusy && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                className: "w-3 h-3 animate-spin"
                                                            }),
                                                            " Working…"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                                label: "Daily Study Reminder",
                                                description: "Receive a daily reminder to study",
                                                checked: settings.dailyReminder,
                                                onChange: (v)=>updateSetting('dailyReminder', v)
                                            }),
                                            settings.dailyReminder && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "ml-8 mt-1 flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_3__/* .Label */ .J, {
                                                        className: "text-[10px] text-[#5a6478]",
                                                        children: "Reminder time"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                        type: "time",
                                                        value: settings.reminderTime,
                                                        onChange: (e)=>updateSetting('reminderTime', e.target.value),
                                                        className: "h-7 px-2 text-xs rounded-md border border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4]"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsSection, {
                                        title: "Install App",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "py-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center justify-between gap-3 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs font-semibold text-[#e8ecf4]",
                                                                    children: isInstalled ? 'MedQ is installed' : 'Install MedQ as an app'
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-[10px] text-[#5a6478] mt-0.5 leading-relaxed",
                                                                    children: isInstalled ? 'You\'re running the installed PWA right now. Launch it from your Home Screen next time.' : installPlatform === 'ios' ? 'Add to iPhone Home Screen for full-screen, offline access.' : installPlatform === 'chromium' ? 'Install as a standalone app with offline access & push notifications.' : 'Open in Chrome, Edge, or Safari to install as an app.'
                                                                })
                                                            ]
                                                        }),
                                                        isInstalled ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/20",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                                    className: "w-3.5 h-3.5 text-[#00e5a0]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[11px] font-semibold text-[#00e5a0]",
                                                                    children: "Installed"
                                                                })
                                                            ]
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: handleInstallClick,
                                                            disabled: installing,
                                                            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e5a0] text-[#0c0e14] text-[11px] font-bold hover:bg-[#00e5a0]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
                                                            children: installing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3 animate-spin"
                                                                    }),
                                                                    "Installing…"
                                                                ]
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3"
                                                                    }),
                                                                    "Install"
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                }),
                                                !isInstalled && installPlatform === 'chromium' && !canPrompt && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] text-[#5a6478] leading-relaxed mt-1",
                                                    children: "Tip: If the Install button doesn't do anything, your browser may have blocked the prompt. Open the browser menu (⋮) → “Install MedQ” manually."
                                                }),
                                                !isInstalled && installPlatform === 'other' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] text-[#5a6478] leading-relaxed mt-1",
                                                    children: "Your current browser doesn't support one-tap PWA install. Try Chrome, Edge, or Safari for the best experience."
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SettingsSection, {
                                        title: "Audio & Playback",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                                label: "Sound Effects",
                                                description: settings.soundEffects ? "Sounds play for correct/wrong answers & achievements" : "All sounds are muted",
                                                checked: settings.soundEffects,
                                                onChange: (v)=>updateSetting('soundEffects', v)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "ml-8 mt-1",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ()=>(0,_components_medq_SettingsContext__WEBPACK_IMPORTED_MODULE_8__.playSound)('correct'),
                                                    className: "h-6 px-2 text-[9px] text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10",
                                                    children: "\\ud83d\\udd0a Preview sound"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                                label: "Auto-play Audio",
                                                description: "Automatically play audio explanations for questions",
                                                checked: settings.autoPlayAudio,
                                                onChange: (v)=>updateSetting('autoPlayAudio', v)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SettingsSection, {
                                        title: "Pronunciation",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                                label: "Term Pronunciation",
                                                description: settings.pronunciationEnabled ? "Speaker icons appear next to medical terms — tap to hear" : "Pronunciation buttons are hidden",
                                                checked: settings.pronunciationEnabled,
                                                onChange: (v)=>updateSetting('pronunciationEnabled', v)
                                            }),
                                            settings.pronunciationEnabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "ml-8 mt-1 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "text-xs font-medium text-[#e8ecf4]",
                                                                        children: "Speed"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                        className: "text-[10px] text-[#5a6478]",
                                                                        children: [
                                                                            (settings.pronunciationSpeed * 100).toFixed(0),
                                                                            "% — ",
                                                                            settings.pronunciationSpeed <= 0.6 ? 'Very slow' : settings.pronunciationSpeed <= 0.8 ? 'Slow & clear' : settings.pronunciationSpeed <= 1.0 ? 'Normal' : 'Fast'
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                        onClick: ()=>updateSetting('pronunciationSpeed', Math.max(0.5, Math.round((settings.pronunciationSpeed - 0.1) * 10) / 10)),
                                                                        className: "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border border-white/[0.06] hover:bg-white/[0.06] transition-colors text-[#8b95a8]",
                                                                        children: "-"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                        className: "w-16 h-1.5 rounded-full bg-[#3a4055] relative overflow-hidden",
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                            className: "absolute inset-y-0 left-0 rounded-full bg-[#00e5a0]",
                                                                            style: {
                                                                                width: `${(settings.pronunciationSpeed - 0.5) / 1.0 * 100}%`
                                                                            }
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                        onClick: ()=>updateSetting('pronunciationSpeed', Math.min(1.5, Math.round((settings.pronunciationSpeed + 0.1) * 10) / 10)),
                                                                        className: "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border border-white/[0.06] hover:bg-white/[0.06] transition-colors text-[#8b95a8]",
                                                                        children: "+"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        onClick: ()=>{
                                                            (0,_lib_pronunciation__WEBPACK_IMPORTED_MODULE_9__/* .clearPronunciationCache */ .ry)();
                                                            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success('Pronunciation cache cleared');
                                                        },
                                                        className: "h-6 px-2 text-[9px] text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10",
                                                        children: "Clear pronunciation cache"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SettingsSection, {
                                        title: "Display",
                                        icon: settings.theme === 'light' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-between py-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex-1 mr-3",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs font-medium text-[#e8ecf4]",
                                                                children: "Theme"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[10px] text-[#5a6478]",
                                                                children: settings.theme === 'dark' ? 'Dark mode active' : 'Light mode active'
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-1 bg-[#0c0e14]/50 rounded-lg p-0.5 border border-white/[0.06]",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                onClick: ()=>updateSetting('theme', 'dark'),
                                                                className: `flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${settings.theme === 'dark' ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#5a6478] hover:text-[#8b95a8]'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3"
                                                                    }),
                                                                    " Dark"
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                onClick: ()=>updateSetting('theme', 'light'),
                                                                className: `flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${settings.theme === 'light' ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#5a6478] hover:text-[#8b95a8]'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3"
                                                                    }),
                                                                    " Light"
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                                label: "Compact Mode",
                                                description: settings.compactMode ? "Reduced spacing — more content visible" : "Normal spacing — comfortable reading",
                                                checked: settings.compactMode,
                                                onChange: (v)=>updateSetting('compactMode', v)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                                label: "Show Usage Meters",
                                                description: settings.showUsageMeters ? "Usage limits shown in the header" : "Usage meters hidden from header",
                                                checked: settings.showUsageMeters,
                                                onChange: (v)=>updateSetting('showUsageMeters', v)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsSection, {
                                        title: "Language & Region",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between py-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs font-medium text-[#e8ecf4]",
                                                            children: "Language"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[10px] text-[#5a6478]",
                                                            children: "Choose your preferred language"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: settings.language,
                                                    onValueChange: (v)=>{
                                                        if (v === null) return;
                                                        updateSetting('language', v);
                                                        if (v !== 'en') {
                                                            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.info('Language preference saved — multi-language support coming soon!');
                                                        }
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-[140px] h-8 text-xs rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4]",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: '#1a1e2b',
                                                                border: '1px solid rgba(255,255,255,0.06)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "en",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "English"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "ar",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "العربية"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "es",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "Espa\xf1ol"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "fr",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "Fran\xe7ais"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "de",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "Deutsch"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "pt",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "Portugu\xeas"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "tr",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "T\xfcrk\xe7e"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "hi",
                                                                    className: "text-xs text-[#8b95a8]",
                                                                    children: "हिन्दी"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsSection, {
                                        title: "Privacy",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleRow, {
                                            label: "Ad Personalization",
                                            description: settings.adPersonalization ? "Ads may be personalized based on interests" : "Only generic ads shown",
                                            checked: settings.adPersonalization,
                                            onChange: (v)=>updateSetting('adPersonalization', v)
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsSection, {
                                        title: "AI Providers",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>setShowByok(true),
                                            className: "w-full flex items-center justify-between py-2 group text-left",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5 text-[#5a6478] group-hover:text-[#00e5a0] transition-colors"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs font-medium text-[#e8ecf4]",
                                                                    children: "Manage API keys"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-[10px] text-[#5a6478]",
                                                                    children: "Configure providers and available models"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 text-[#3a4055] group-hover:text-[#5a6478] transition-colors"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsSection, {
                                        title: "Offline AI Engine",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_offline_ai_OfflineAIManager__WEBPACK_IMPORTED_MODULE_11__/* .OfflineAIManager */ .r, {})
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsSection, {
                                        title: "Data & Storage",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: handleClearCache,
                                            className: "w-full flex items-center justify-between py-2 group",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5 text-[#5a6478]"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "text-left",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs font-medium text-[#e8ecf4]",
                                                                    children: "Clear Cache"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-[10px] text-[#5a6478]",
                                                                    children: "Remove cached data and temporary files"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 text-[#3a4055] group-hover:text-[#5a6478] transition-colors"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SettingsSection, {
                                        title: "Data Export",
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ExportRow, {
                                                label: "Export Progress",
                                                description: "Study sessions, streaks & achievements",
                                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                loading: exporting === 'progress',
                                                onClick: ()=>handleExport('progress')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ExportRow, {
                                                label: "Export Notes",
                                                description: "All your question notes",
                                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                loading: exporting === 'notes',
                                                onClick: ()=>handleExport('notes')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ExportRow, {
                                                label: "Export Bookmarks",
                                                description: "All bookmarked questions",
                                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                loading: exporting === 'bookmarks',
                                                onClick: ()=>handleExport('bookmarks')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ExportRow, {
                                                label: "Export Everything",
                                                description: "All data combined into one file",
                                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                loading: exporting === 'all',
                                                onClick: ()=>handleExport('all'),
                                                highlight: true
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-6 py-4 border-t border-white/[0.04] flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                        variant: "ghost",
                                        onClick: handleReset,
                                        disabled: resetting,
                                        className: "text-[10px] text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 h-8 px-2",
                                        children: resetting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 animate-spin mr-1"
                                                }),
                                                "Resetting..."
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 mr-1"
                                                }),
                                                "Reset All"
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                        onClick: onClose,
                                        className: "h-9 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs rounded-lg",
                                        children: "Done"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_InstallModal__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                        open: installModalOpen,
                        onClose: ()=>setInstallModalOpen(false),
                        instructions: installInstructions,
                        installing: installing
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
                open: showByok,
                onOpenChange: setShowByok,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
                    className: "w-[min(92vw,72rem)] rounded-2xl border-white/[0.06] p-0 overflow-hidden",
                    style: {
                        background: '#151821',
                        maxWidth: 'none'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogHeader */ .c7, {
                            className: "px-6 pt-6 pb-3 border-b border-white/[0.06]",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                                    className: "text-lg font-bold text-[#e8ecf4] flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                            className: "w-5 h-5 text-[#00e5a0]"
                                        }),
                                        "AI Providers"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogDescription */ .rr, {
                                    className: "text-xs text-[#5a6478]",
                                    children: "Manage encrypted API keys and model preferences across your devices"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "max-h-[calc(90vh-7rem)] overflow-y-auto px-6 py-5",
                            style: {
                                scrollbarWidth: 'thin'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_byok_ByokHub__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {})
                        })
                    ]
                })
            })
        ]
    });
}
/* ── Sub-components ── */ function SettingsSection({ title, icon, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[#00e5a0]",
                        children: icon
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                        className: "text-xs font-bold text-[#8b95a8] uppercase tracking-wider",
                        children: title
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "ml-1 space-y-0.5 pl-4 border-l border-white/[0.04]",
                children: children
            })
        ]
    });
}
function ToggleRow({ label, description, checked, onChange }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between py-2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1 mr-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs font-medium text-[#e8ecf4]",
                        children: label
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] text-[#5a6478]",
                        children: description
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_5__/* .Switch */ .d, {
                checked: checked,
                onCheckedChange: onChange,
                className: "data-[state=checked]:bg-[#00e5a0] data-[state=unchecked]:bg-[#3a4055]"
            })
        ]
    });
}
function ExportRow({ label, description, icon, loading, onClick, highlight }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: onClick,
        disabled: loading,
        className: "w-full flex items-center justify-between py-2 group disabled:opacity-60",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: highlight ? 'text-[#00e5a0]' : 'text-[#5a6478]',
                        children: loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5 animate-spin"
                        }) : icon
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-left",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: `text-xs font-medium ${highlight ? 'text-[#00e5a0]' : 'text-[#e8ecf4]'}`,
                                children: label
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#5a6478]",
                                children: description
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AudioWaveform_Bell_Bookmark_Check_ChevronRight_Cpu_Database_Download_FileText_Globe_HardDrive_Key_Loader2_Moon_RotateCcw_Settings_Shield_Smartphone_Sun_Trash2_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5 text-[#3a4055] group-hover:text-[#5a6478] transition-colors"
            })
        ]
    });
}


/***/ }),

/***/ 10463:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OG: () => (/* binding */ GPU_MODELS),
/* harmony export */   QV: () => (/* binding */ getGpuModel)
/* harmony export */ });
/* unused harmony exports DEFAULT_GPU_MODEL_ID, buildGpuModelUrl */
/**
 * GPU (WebGPU) model catalog for web-llm.
 *
 * web-llm uses MLC-compiled `.bin` model files (NOT GGUF). These models
 * run on the GPU via WebGPU when available — typically 10–50× faster than
 * CPU/WASM inference for the same parameter count.
 *
 * Model choice rationale:
 *   - Llama-3.2-1B: tiny, fast, multilingual. Best default for GPU.
 *   - Llama-3.2-3B: better quality, still fast on GPU (~30 tok/s).
 *   - Qwen2.5-1.5B: medical/technical strong, very fast on GPU.
 *   - Qwen2.5-3B: best quality, ~15 tok/s on mid-range GPU.
 *   - Phi-3.5-mini-3.8B: high quality for size, slower (~10 tok/s).
 *
 * Sizes are approximate (q4f16 quantization, in MB).
 * Speeds are approximate tokens/sec on an M1 / RTX 3060 / mid-range GPU.
 *
 * Models are downloaded on-demand from HuggingFace (mlc-ai organization
 * hosts pre-compiled weights) and cached by the browser.
 */ const GPU_MODELS = [
    {
        id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
        name: 'Llama 3.2 1B (GPU)',
        description: 'Tiny & fast on GPU. Best default for WebGPU devices.',
        sizeMb: 980,
        tokPerSec: 60,
        repo: 'mlc-ai/Llama-3.2-1B-Instruct-q4f16_1-MLC',
        path: '',
        contextLength: 4096,
        temperature: 0.6,
        topP: 0.9,
        tier: 'tiny'
    },
    {
        id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC',
        name: 'Qwen2.5 1.5B (GPU)',
        description: 'Medical/technical strong. ~50 tok/s on GPU.',
        sizeMb: 1300,
        tokPerSec: 50,
        repo: 'mlc-ai/Qwen2.5-1.5B-Instruct-q4f16_1-MLC',
        path: '',
        contextLength: 4096,
        temperature: 0.6,
        topP: 0.9,
        tier: 'small'
    },
    {
        id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
        name: 'Llama 3.2 3B (GPU)',
        description: 'Balanced quality + speed. ~30 tok/s on GPU.',
        sizeMb: 2100,
        tokPerSec: 30,
        repo: 'mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC',
        path: '',
        contextLength: 4096,
        temperature: 0.6,
        topP: 0.9,
        tier: 'medium'
    },
    {
        id: 'Qwen2.5-3B-Instruct-q4f16_1-MLC',
        name: 'Qwen2.5 3B (GPU)',
        description: 'Best medical reasoning. ~25 tok/s on GPU.',
        sizeMb: 2300,
        tokPerSec: 25,
        repo: 'mlc-ai/Qwen2.5-3B-Instruct-q4f16_1-MLC',
        path: '',
        contextLength: 4096,
        temperature: 0.6,
        topP: 0.9,
        tier: 'medium'
    },
    {
        id: 'Phi-3.5-mini-instruct-q4f16_1-MLC',
        name: 'Phi 3.5 mini 3.8B (GPU)',
        description: 'Highest quality in this size class. ~15 tok/s on GPU.',
        sizeMb: 2600,
        tokPerSec: 15,
        repo: 'mlc-ai/Phi-3.5-mini-instruct-q4f16_1-MLC',
        path: '',
        contextLength: 4096,
        temperature: 0.6,
        topP: 0.9,
        tier: 'medium'
    }
];
const DEFAULT_GPU_MODEL_ID = 'Llama-3.2-1B-Instruct-q4f16_1-MLC';
function getGpuModel(id) {
    return GPU_MODELS.find((m)=>m.id === id);
}
/**
 * Build a HuggingFace URL for a web-llm model. web-llm accepts the repo
 * id directly via `CreateMLCEngine(modelId)` — it knows the internal path
 * structure. The `path` field is unused for GPU models.
 */ function buildGpuModelUrl(model) {
    return `https://huggingface.co/${model.repo}`;
}


/***/ }),

/***/ 12262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AnalyticsPanel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(36338);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24760);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(53646);
/* harmony import */ var _barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(28342);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(40980);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96231);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AnalyticsPanel — FreeLLMAPI AnalyticsPage pattern, MedQ data.
 *
 *   - range SegmentedControl (24h / 7d / 30d / 90d), sticky in localStorage
 *   - stat-card grid: Requests, Success rate, Tokens in/out, Avg latency
 *   - requests-over-time bar chart (pure CSS bars — no chart lib needed)
 *   - by-provider table with PlatformDot colors + share bars
 *   - recent calls table (status, model, tokens, latency, stage)
 *
 * Data: GET /api/user/ai-analytics?range=… (AiCallLog telemetry written
 * fire-and-forget by callChat).
 */ 



const RANGE_KEY = 'medq:byok-analytics-range';
function AnalyticsPanel() {
    const [range, setRange] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('30d');
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            const stored = localStorage.getItem(RANGE_KEY);
            if (stored && [
                '24h',
                '7d',
                '30d',
                '90d'
            ].includes(stored)) setRange(stored);
        } catch  {}
    }, []);
    const load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (r)=>{
        setLoading(true);
        try {
            const res = await fetch(`/api/user/ai-analytics?range=${r}`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setData(await res.json());
        } catch  {
            setData(null);
        } finally{
            setLoading(false);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void load(range);
    }, [
        range,
        load
    ]);
    const changeRange = (r)=>{
        setRange(r);
        try {
            localStorage.setItem(RANGE_KEY, r);
        } catch  {}
    };
    if (loading && !data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "py-16 flex flex-col items-center gap-2.5",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "size-5 animate-spin text-[#00e5a0]"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-[10px] text-[#8b95a8]",
                    children: "Loading your AI usage…"
                })
            ]
        });
    }
    if (!data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs font-semibold text-[#e8ecf4]",
                    children: "Analytics unavailable"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "mt-1 text-[10px] text-[#8b95a8]",
                    children: "Could not load usage data — try again shortly."
                })
            ]
        });
    }
    const s = data.summary;
    const hasData = s.totalRequests > 0;
    const maxDayRequests = Math.max(1, ...data.timeline.map((d)=>d.requests));
    const maxProviderRequests = Math.max(1, ...data.byProvider.map((p)=>p.requests));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .SegmentedControl */ .Iz, {
                        options: [
                            {
                                value: '24h',
                                label: '24h'
                            },
                            {
                                value: '7d',
                                label: '7d'
                            },
                            {
                                value: '30d',
                                label: '30d'
                            },
                            {
                                value: '90d',
                                label: '90d'
                            }
                        ],
                        value: range,
                        onChange: changeRange
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[9px] text-[#5a6478] ml-auto",
                        children: "every AI call made with your account — both your keys and server-managed ones"
                    })
                ]
            }),
            !hasData ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mx-auto size-10 rounded-full bg-[#00e5a0]/[0.06] border border-[#00e5a0]/15 flex items-center justify-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                            className: "size-4.5 text-[#00e5a0]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs font-semibold text-[#e8ecf4]",
                        children: "No AI calls in this range yet"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] text-[#8b95a8] max-w-sm mx-auto leading-relaxed",
                        children: "Generate a question explanation or ask the tutor — every call is logged here with tokens, latency, and the provider that served it."
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }),
                                label: "Requests",
                                value: String(s.totalRequests)
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                icon: s.successRate != null && s.successRate >= 0.9 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }),
                                label: "Success rate",
                                value: s.successRate == null ? '—' : `${Math.round(s.successRate * 100)}%`,
                                sub: s.errorCount ? `${s.errorCount} failed` : undefined,
                                tone: s.successRate != null && s.successRate < 0.8 ? 'warn' : 'ok'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }),
                                label: "Tokens in",
                                value: (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(s.totalInputTokens)
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }),
                                label: "Tokens out",
                                value: (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(s.totalOutputTokens)
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }),
                                label: "Avg latency",
                                value: (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(s.avgLatencyMs)
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_ArrowDownToLine_ArrowUpFromLine_BarChart3_CheckCircle2_Loader2_Timer_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }),
                                label: "Providers used",
                                value: String(data.byProvider.length)
                            })
                        ]
                    }),
                    data.timeline.length > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Panel, {
                        title: "Requests over time",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "px-4 pb-4 pt-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-end gap-px h-24",
                                    children: data.timeline.map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            title: `${d.date}: ${d.requests} requests${d.errors ? ` · ${d.errors} errors` : ''}`,
                                            className: "flex-1 min-w-px group relative flex flex-col justify-end gap-px h-full cursor-default",
                                            children: [
                                                d.errors > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-full rounded-t-sm bg-[#ff5757]/70",
                                                    style: {
                                                        height: `${d.errors / maxDayRequests * 100}%`
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-full rounded-t-sm bg-[#00e5a0]/60 group-hover:bg-[#00e5a0]",
                                                    style: {
                                                        height: `${d.requests / maxDayRequests * 100}%`
                                                    }
                                                })
                                            ]
                                        }, d.date))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-between mt-1.5 text-[8px] text-[#5a6478] tabular-nums",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: data.timeline[0]?.date.slice(5)
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: data.timeline[Math.floor(data.timeline.length / 2)]?.date.slice(5)
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: "today"
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid lg:grid-cols-2 gap-4",
                        children: [
                            data.byProvider.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Panel, {
                                title: "By provider",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "px-4 py-3 space-y-2.5",
                                    children: data.byProvider.map((p)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2 text-[10px]",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .PlatformDot */ .DL, {
                                                            providerId: p.providerId
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "font-medium text-[#e8ecf4]",
                                                            children: p.providerId
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[#5a6478] tabular-nums ml-auto",
                                                            children: [
                                                                p.requests,
                                                                " req \xb7 ",
                                                                (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(p.inputTokens + p.outputTokens),
                                                                " tok"
                                                            ]
                                                        }),
                                                        p.errors > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[#ff5757] tabular-nums",
                                                            children: [
                                                                p.errors,
                                                                " err"
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-1.5 rounded-full bg-white/[0.04] overflow-hidden flex",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "h-full rounded-l-full",
                                                        style: {
                                                            width: `${p.requests / maxProviderRequests * 100}%`,
                                                            backgroundColor: (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .platformColor */ .pG)(p.providerId)
                                                        }
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex gap-3 text-[9px] text-[#5a6478] tabular-nums",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            children: [
                                                                "avg ",
                                                                (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(p.avgLatencyMs)
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            children: [
                                                                "in ",
                                                                (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(p.inputTokens)
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            children: [
                                                                "out ",
                                                                (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(p.outputTokens)
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, p.providerId))
                                })
                            }),
                            data.byModel.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Panel, {
                                title: "Top models",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "px-4 py-3 space-y-2",
                                    children: data.byModel.map((m)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 text-[10px]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .PlatformDot */ .DL, {
                                                    providerId: m.providerId
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                    className: "font-mono text-[#e8ecf4] truncate min-w-0 flex-1",
                                                    children: m.modelId
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[#5a6478] tabular-nums shrink-0",
                                                    children: [
                                                        m.requests,
                                                        " req"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[#5a6478] tabular-nums shrink-0",
                                                    children: [
                                                        (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(m.tokens),
                                                        " tok"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#5a6478] tabular-nums shrink-0",
                                                    children: (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(m.avgLatencyMs)
                                                })
                                            ]
                                        }, `${m.providerId}:${m.modelId}`))
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Panel, {
                        title: "Recent calls",
                        count: data.recent.length,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "max-h-72 overflow-y-auto",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                                className: "w-full text-[10px]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                                        className: "sticky top-0 bg-[#0c0e14]",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                            className: "text-[#5a6478] text-left",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                    className: "px-4 py-2 font-semibold",
                                                    children: "When"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                    className: "py-2 font-semibold",
                                                    children: "Model"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                    className: "py-2 font-semibold",
                                                    children: "Stage"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                    className: "py-2 font-semibold",
                                                    children: "Tokens"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                    className: "py-2 font-semibold",
                                                    children: "Latency"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                    className: "px-4 py-2 font-semibold",
                                                    children: "Status"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                                        className: "divide-y divide-white/[0.04]",
                                        children: data.recent.map((r, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                className: "hover:bg-white/[0.02]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                        className: "px-4 py-1.5 text-[#5a6478] tabular-nums whitespace-nowrap",
                                                        children: new Date(r.createdAt).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                        className: "py-1.5 max-w-48",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "flex items-center gap-1.5 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_2__/* .PlatformDot */ .DL, {
                                                                    providerId: r.providerId
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                                    className: "font-mono text-[#8b95a8] truncate",
                                                                    children: r.modelId
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                        className: "py-1.5 text-[#5a6478]",
                                                        children: r.stage ?? '—'
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                        className: "py-1.5 text-[#8b95a8] tabular-nums whitespace-nowrap",
                                                        children: [
                                                            (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(r.inputTokens),
                                                            " → ",
                                                            (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatTokens */ ._y)(r.outputTokens)
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                        className: "py-1.5 text-[#8b95a8] tabular-nums",
                                                        children: (0,_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(r.latencyMs)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                        className: "px-4 py-1.5",
                                                        children: r.status === 'success' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15",
                                                            children: "ok"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            title: r.error ?? undefined,
                                                            className: "text-[9px] rounded-full px-1.5 py-px bg-[#ff5757]/10 text-[#ff5757] border border-[#ff5757]/15 cursor-help truncate max-w-40 inline-block",
                                                            children: "error"
                                                        })
                                                    })
                                                ]
                                            }, i))
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
}
// ── Building blocks ──
function StatCard({ icon, label, value, sub, tone = 'default' }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] px-3 py-2.5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1.5 text-[#5a6478]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__.cn)(tone === 'ok' && 'text-[#00e5a0]', tone === 'warn' && 'text-[#f5b73d]'),
                        children: icon
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[9px] font-semibold uppercase tracking-wider",
                        children: label
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-1 text-lg font-semibold text-[#e8ecf4] tabular-nums leading-tight",
                children: value
            }),
            sub && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[9px] text-[#5a6478] tabular-nums",
                children: sub
            })
        ]
    });
}
function Panel({ title, count, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] overflow-hidden",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                className: "flex items-center gap-2 px-4 h-9 border-b border-white/[0.04]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] font-bold uppercase tracking-wider text-[#8b95a8]",
                        children: title
                    }),
                    count != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[9px] text-[#5a6478] tabular-nums",
                        children: count
                    })
                ]
            }),
            children
        ]
    });
}


/***/ }),

/***/ 14237:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ EditKeyDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Loader2_Lock_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5736);
/* harmony import */ var _barrel_optimize_names_Loader2_Lock_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33807);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21767);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42763);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(50694);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(96231);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * EditKeyDialog — edit an existing endpoint (freellmapi edit-key pattern).
 *
 * Platform is LOCKED (endpoint identity is stable — same rule as freellmapi:
 * "platform is locked" so resolution keeps working). Credential field starts
 * EMPTY because the server never returns plaintext; leaving it empty keeps
 * the stored key.
 */ 









function EditKeyDialog({ keyData: k, onClose, onSave, onDelete, onToggle }) {
    const [label, setLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [baseUrl, setBaseUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (k) {
            setLabel(k.label ?? '');
            setBaseUrl(k.baseUrl ?? '');
            setSaving(false);
        }
    }, [
        k
    ]);
    if (!k) return null;
    const provider = _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_8__/* .BYOK_PROVIDER_BY_ID */ .Uy[k.providerId];
    const hasChanges = label !== (k.label ?? '') || (baseUrl.trim() || null) !== k.baseUrl;
    const save = async ()=>{
        if (!k) return;
        setSaving(true);
        try {
            const res = await onSave({
                id: k.id,
                providerId: k.providerId,
                baseUrl: baseUrl.trim() || null,
                label: label.trim() || null
            });
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(res.error || 'Could not save changes');
                return;
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Endpoint updated');
            onClose();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Could not save changes');
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .Dialog */ .lG, {
        open: !!k,
        onOpenChange: (o)=>{
            if (!o) onClose();
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogContent */ .Cf, {
            className: "max-w-md bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pt-5 pb-3 space-y-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogTitle */ .L3, {
                            className: "text-sm font-bold text-[#e8ecf4] flex items-center gap-2",
                            children: [
                                provider && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_9__/* .ProviderAvatar */ .$N, {
                                    provider: provider,
                                    size: "sm"
                                }),
                                "Edit endpoint"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogDescription */ .rr, {
                            className: "text-[10px] text-[#8b95a8]",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                    className: "font-mono text-[#8b95a8]",
                                    children: k.maskedKey
                                }),
                                k.lastVerifiedAt ? ` · verified ${(0,_shared__WEBPACK_IMPORTED_MODULE_9__/* .formatRelativeTime */ .fw)(k.lastVerifiedAt)}` : ' · never verified'
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pb-5 space-y-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: "Provider"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] px-2.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Lock_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            className: "size-3 text-[#5a6478]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[11px] text-[#8b95a8]",
                                            children: provider?.name ?? k.providerId
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[9px] text-[#5a6478] ml-auto",
                                            children: "locked — endpoint identity"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: "Label"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                    value: label,
                                    onChange: (e)=>setLabel(e.target.value),
                                    placeholder: "Work key, Local Ollama…",
                                    className: "h-9 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: [
                                        "Base URL ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#5a6478] font-normal",
                                            children: "(empty = provider default)"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                    value: baseUrl,
                                    onChange: (e)=>setBaseUrl(e.target.value),
                                    placeholder: provider?.defaultBaseUrl ?? 'https://…',
                                    className: "h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#08090f]/60 px-3 py-2.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[11px] font-medium text-[#e8ecf4]",
                                            children: "Enabled"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[9px] text-[#5a6478]",
                                            children: "Disabled endpoints are skipped by routing & failover"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_6__/* .Switch */ .d, {
                                    checked: k.enabled,
                                    onCheckedChange: (v)=>onToggle(k, v)
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 pt-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    onClick: save,
                                    disabled: saving || !hasChanges,
                                    className: "h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg disabled:opacity-40",
                                    children: [
                                        saving && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Lock_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                            className: "size-3.5 animate-spin"
                                        }),
                                        " Save changes"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>{
                                        onDelete(k);
                                        onClose();
                                    },
                                    className: "h-8 px-3 text-[11px] text-[#ff5757] hover:bg-[#ff5757]/10 rounded-lg",
                                    children: "Delete endpoint"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: onClose,
                                    className: "h-8 px-3 ml-auto text-[11px] text-[#5a6478] hover:text-[#e8ecf4] rounded-lg",
                                    children: "Cancel"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 19805:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowDown)
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
    name: "arrow-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 5v14",
                key: "s699le"
            }
        ],
        [
            "path",
            {
                d: "m19 12-7 7-7-7",
                key: "1idqje"
            }
        ]
    ]
};
__iconData.node;
const ArrowDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-down.mjs.map


/***/ }),

/***/ 21586:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ByokHub)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84507);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(34018);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(35484);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(81499);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(19707);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(22200);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(93744);
/* harmony import */ var _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(94774);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89239);
/* harmony import */ var _lib_utils_app_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(57434);
/* harmony import */ var _lib_ai_model_catalog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(33201);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(96231);
/* harmony import */ var _useByokData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(96682);
/* harmony import */ var _ModelPicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12561);
/* harmony import */ var _ProviderList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(82215);
/* harmony import */ var _AddKeyDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(40382);
/* harmony import */ var _EditKeyDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(14237);
/* harmony import */ var _ModelEditDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(72943);
/* harmony import */ var _DiscoverModelsDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2487);
/* harmony import */ var _AnalyticsPanel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(12262);
/* harmony import */ var _components_medq_AiModelsGuide__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(58600);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * ByokHub — the FreeLLMAPI-style BYOK center (replaces ByokSettingsSection).
 *
 * Layout:
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ header: title · default-model picker · [+ Add key]           │
 *   │ tabs:   Providers | Models | Analytics                        │
 *   ├──────────────────────────────────────────────────────────────┤
 *   │ Providers: search + filter + provider cards (keys, models)    │
 *   │ Models:    unified table of every model the user can use      │
 *   │ Analytics: stat cards + charts + recent calls                 │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * The default-model picker in the header is THE fix for "I can't see the
 * model I added": it lists everything from /api/providers, whose byok
 * section is built from the user's modelsConfig.
 */ 

















function ByokHub({ onKeysChanged }) {
    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__/* .useSession */ .wV)();
    const user = session?.user;
    const b = (0,_useByokData__WEBPACK_IMPORTED_MODULE_7__/* .useByokData */ .H)();
    const [tab, setTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('providers');
    const [addOpen, setAddOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [addPreset, setAddPreset] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editingKey, setEditingKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [discoverTarget, setDiscoverTarget] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [modelEdit, setModelEdit] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [testingKeyId, setTestingKeyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [discoveringKeyId, setDiscoveringKeyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // After AddKeyDialog succeeds, offer model discovery for the new endpoint
    // once the refreshed keys list lands (state updates async after reload).
    const [pendingDiscoverKeyId, setPendingDiscoverKeyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!pendingDiscoverKeyId) return;
        const k = b.keys.find((x)=>x.id === pendingDiscoverKeyId);
        if (k) {
            setPendingDiscoverKeyId(null);
            setDiscoverTarget(k);
        }
    }, [
        pendingDiscoverKeyId,
        b.keys
    ]);
    const existingProviderIds = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>new Set(b.keys.map((k)=>k.providerId)), [
        b.keys
    ]);
    // ── Handlers ──
    const handleToggle = async (k, enabled)=>{
        try {
            await b.toggleKey(k.id, k.providerId, enabled);
            onKeysChanged?.();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(e instanceof Error ? e.message : 'Could not update the endpoint');
        }
    };
    const handleDelete = async (k)=>{
        try {
            await b.deleteKey(k.id, k.providerId);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Endpoint deleted');
            onKeysChanged?.();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(e instanceof Error ? e.message : 'Could not delete the endpoint');
        }
    };
    const handleMove = async (k, move)=>{
        try {
            await b.moveKey(k.id, k.providerId, move);
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(e instanceof Error ? e.message : 'Could not reorder');
        }
    };
    const handleTest = async (k)=>{
        setTestingKeyId(k.id);
        try {
            const res = await b.testKey(k.id, k.providerId);
            if (res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Key works${res.models?.length ? ` — ${res.models.length} models available` : ''}`);
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(res.error || 'Key test failed');
            }
        } finally{
            setTestingKeyId(null);
        }
    };
    const handleDiscover = async (k)=>{
        // The dialog does its own live probe; opening it is all we do here.
        setDiscoverTarget(k);
    };
    const handleAddModel = (provider, key)=>{
        setModelEdit({
            provider,
            key,
            model: null
        });
    };
    const handleEditModel = (provider, key, model)=>{
        setModelEdit({
            provider,
            key,
            model
        });
    };
    const handleSaveModel = async (provider, key, model)=>{
        try {
            const existing = key.modelsConfig ?? [];
            const next = existing.some((m)=>m.id === model.id) ? existing.map((m)=>m.id === model.id ? model : m) : [
                ...existing,
                model
            ];
            await b.saveModels(key.providerId, next);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`${model.id} saved — visible in every model picker`);
            onKeysChanged?.();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(e instanceof Error ? e.message : 'Could not save the model');
        }
    };
    const handleDeleteModel = async (provider, key, modelId)=>{
        try {
            const next = (key.modelsConfig ?? []).filter((m)=>m.id !== modelId);
            await b.saveModels(key.providerId, next.length ? next : null);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`${modelId} removed`);
            onKeysChanged?.();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(e instanceof Error ? e.message : 'Could not remove the model');
        }
    };
    const handleSetDefault = async (model)=>{
        try {
            await b.setDefaultModel(model);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(model ? `Default model set to ${model}` : 'Default model cleared — back to Auto');
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Could not save the default model');
        }
    };
    // ── Models tab data: every model the user can use, from the live catalog ──
    const modelRows = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!b.catalog) return [];
        const rows = [];
        const sections = [
            [
                'server',
                b.catalog.server
            ],
            [
                'byok',
                b.catalog.byok
            ],
            [
                'local',
                b.catalog.local
            ]
        ];
        for (const [section, providers] of sections){
            for (const p of providers){
                for (const m of p.models){
                    rows.push({
                        value: `${p.id}:${m.id}`,
                        providerId: p.id,
                        providerName: p.name,
                        section,
                        name: m.name,
                        contextWindow: m.contextWindow,
                        vision: m.capabilities?.vision,
                        tools: m.capabilities?.tools
                    });
                }
            }
        }
        return rows;
    }, [
        b.catalog
    ]);
    const userDefault = b.catalog?.userDefault ?? null;
    const defaultParsed = userDefault ? (0,_lib_ai_model_catalog__WEBPACK_IMPORTED_MODULE_16__/* .parseModelString */ .U)(userDefault) : null;
    const totalModels = modelRows.length;
    const byokModels = modelRows.filter((r)=>r.section === 'byok').length;
    // ── Error states (auth) ──
    if (!b.loading && b.loadError) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Header, {
                    tab: tab,
                    setTab: setTab,
                    totalModels: totalModels,
                    onAddKey: ()=>setAddOpen(true),
                    defaultModel: userDefault,
                    onSetDefault: handleSetDefault,
                    catalogLoading: b.catalogLoading
                }),
                b.loadError === '__unauthenticated__' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AuthNotice, {
                    icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5 text-[#00e5a0]"
                    }),
                    text: "Sign in to manage your API keys. Keys are encrypted (AES-256-GCM) and stored on the server so they sync across your devices.",
                    action: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                size: "sm",
                                onClick: ()=>(0,_lib_utils_app_events__WEBPACK_IMPORTED_MODULE_5__/* .openAuthModal */ .eK)('signin'),
                                className: "h-7 px-3 text-[10px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-md",
                                children: "Sign in"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>(0,_lib_utils_app_events__WEBPACK_IMPORTED_MODULE_5__/* .openAuthModal */ .eK)('signup'),
                                className: "h-7 px-2 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-md",
                                children: "Create account"
                            })
                        ]
                    })
                }),
                b.loadError === '__session_expired__' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AuthNotice, {
                    icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5 text-amber-400"
                    }),
                    text: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "font-semibold text-[#e8ecf4]",
                                children: "Your session has expired."
                            }),
                            ' ',
                            user?.email ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    "You're signed in as ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "font-mono text-amber-300",
                                        children: user.email
                                    }),
                                    ", but the server can't verify the session cookie."
                                ]
                            }) : null,
                            ' ',
                            "Sign out and back in to manage your keys."
                        ]
                    }),
                    action: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                size: "sm",
                                onClick: ()=>setTimeout(()=>(0,_lib_utils_app_events__WEBPACK_IMPORTED_MODULE_5__/* .openAuthModal */ .eK)('signin'), 400),
                                className: "h-7 px-3 text-[10px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-md",
                                children: "Sign out & back in"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>b.reload(),
                                className: "h-7 px-2 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-md",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                        className: "w-3 h-3 mr-1"
                                    }),
                                    " Retry"
                                ]
                            })
                        ]
                    }),
                    tone: "amber"
                }),
                b.loadError !== '__unauthenticated__' && b.loadError !== '__session_expired__' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AuthNotice, {
                    icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5 text-[#ff5757]"
                    }),
                    text: b.loadError,
                    tone: "red",
                    action: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                        variant: "ghost",
                        size: "sm",
                        onClick: ()=>b.reload(),
                        className: "h-7 px-2 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-md",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                className: "w-3 h-3 mr-1"
                            }),
                            " Retry"
                        ]
                    })
                })
            ]
        });
    }
    // ── Main render ──
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Header, {
                tab: tab,
                setTab: setTab,
                totalModels: totalModels,
                onAddKey: ()=>{
                    setAddPreset(null);
                    setAddOpen(true);
                },
                defaultModel: userDefault,
                onSetDefault: handleSetDefault,
                catalogLoading: b.catalogLoading
            }),
            tab === 'providers' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ProviderList__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                keys: b.keys,
                testResults: b.testResults,
                loading: b.loading,
                onToggle: handleToggle,
                onDelete: handleDelete,
                onMove: handleMove,
                onTest: handleTest,
                onDiscover: handleDiscover,
                onEdit: (k)=>setEditingKey(k),
                onAddModel: handleAddModel,
                onEditModel: handleEditModel,
                onDeleteModel: handleDeleteModel,
                onAddKey: (p)=>{
                    setAddPreset(p ?? null);
                    setAddOpen(true);
                },
                testingKeyId: testingKeyId,
                discoveringKeyId: discoveringKeyId
            }),
            tab === 'models' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModelsTable, {
                rows: modelRows,
                loading: b.catalogLoading,
                defaultModel: userDefault,
                onSetDefault: handleSetDefault,
                byokModels: byokModels
            }),
            tab === 'analytics' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AnalyticsPanel__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {}),
            addOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AddKeyDialog__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                open: addOpen,
                onClose: ()=>setAddOpen(false),
                initialProvider: addPreset,
                existingProviderIds: existingProviderIds,
                onAdded: (_providerId, keyId)=>{
                    onKeysChanged?.();
                    // Offer discovery right away for the endpoint just added.
                    if (keyId) setPendingDiscoverKeyId(keyId);
                },
                saveKey: b.saveKey
            }),
            editingKey && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_EditKeyDialog__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                keyData: editingKey,
                onClose: ()=>setEditingKey(null),
                onSave: async (p)=>{
                    const res = await b.saveKey(p);
                    if (res.ok) onKeysChanged?.();
                    return res;
                },
                onDelete: handleDelete,
                onToggle: handleToggle
            }, editingKey.id),
            modelEdit && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModelEditDialog__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                open: true,
                onClose: ()=>setModelEdit(null),
                model: modelEdit.model,
                providerName: modelEdit.provider.name,
                existingIds: (modelEdit.key.modelsConfig ?? []).map((m)=>m.id),
                onSave: (m)=>handleSaveModel(modelEdit.provider, modelEdit.key, m)
            }),
            discoverTarget && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DiscoverModelsDialog__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                target: discoverTarget,
                onClose: ()=>setDiscoverTarget(null),
                testKey: async (keyId, providerId)=>{
                    setDiscoveringKeyId(keyId ?? null);
                    try {
                        return await b.testKey(keyId, providerId);
                    } finally{
                        setDiscoveringKeyId(null);
                    }
                },
                saveModels: async (providerId, models)=>{
                    await b.saveModels(providerId, models);
                    onKeysChanged?.();
                }
            })
        ]
    });
}
// ── Header (title + default-model picker + tabs + add button) ──
function Header({ tab, setTab, totalModels, onAddKey, defaultModel, onSetDefault, catalogLoading }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3 flex-wrap",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                className: "text-xs font-bold text-[#8b95a8] uppercase tracking-wider flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#00e5a0]"
                                    }),
                                    "AI Providers (Bring Your Own Key)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "mt-1 text-[10px] text-[#5a6478] leading-relaxed max-w-lg",
                                children: "Keys are encrypted (AES-256-GCM) server-side and sync across devices. Multiple endpoints per provider get round-robin load spreading with automatic failover."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ml-auto flex items-center gap-2 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-semibold uppercase tracking-wider text-[#5a6478] hidden sm:inline",
                                        children: "Default model"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModelPicker__WEBPACK_IMPORTED_MODULE_8__/* .ModelPicker */ .Y, {
                                        value: defaultModel,
                                        onChange: onSetDefault,
                                        compact: true,
                                        placeholder: "Auto (server decides)"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_AiModelsGuide__WEBPACK_IMPORTED_MODULE_15__/* .AiModelsGuideButton */ .z, {
                                label: "How it works"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                size: "sm",
                                onClick: onAddKey,
                                className: "h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                        className: "size-3.5"
                                    }),
                                    " Add key"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .SegmentedControl */ .Iz, {
                    options: [
                        {
                            value: 'providers',
                            label: 'Providers'
                        },
                        {
                            value: 'models',
                            label: 'Models',
                            count: catalogLoading ? undefined : totalModels
                        },
                        {
                            value: 'analytics',
                            label: 'Analytics'
                        }
                    ],
                    value: tab,
                    onChange: setTab
                })
            })
        ]
    });
}
// ── Models tab: unified searchable table ──
function ModelsTable({ rows, loading, defaultModel, onSetDefault, byokModels }) {
    const [q, setQ] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const filtered = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const lq = q.trim().toLowerCase();
        if (!lq) return rows;
        return rows.filter((r)=>r.name.toLowerCase().includes(lq) || r.value.toLowerCase().includes(lq));
    }, [
        rows,
        q
    ]);
    if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] h-40 animate-pulse"
        });
    }
    if (!rows.length) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center space-y-2",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                    className: "mx-auto size-5 text-[#00e5a0]"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs font-semibold text-[#e8ecf4]",
                    children: "No models yet"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-[10px] text-[#8b95a8] max-w-xs mx-auto leading-relaxed",
                    children: "Add a provider key on the Providers tab, then use Discover (lists models from the endpoint) or Add model by hand."
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-2.5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: q,
                                onChange: (e)=>setQ(e.target.value),
                                placeholder: "Search models…",
                                className: "h-8 w-56 rounded-lg bg-[#08090f] border border-white/[0.08] pl-8 pr-3 text-[11px] text-[#e8ecf4] placeholder:text-[#5a6478] outline-none focus:border-[#00e5a0]/30"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                className: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6478]",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                                        cx: "11",
                                        cy: "11",
                                        r: "8"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                        d: "m21 21-4.3-4.3"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[10px] text-[#5a6478] tabular-nums ml-auto",
                        children: [
                            byokModels,
                            " yours \xb7 ",
                            rows.length - byokModels,
                            " server/local"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] overflow-hidden",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-h-[50vh] overflow-y-auto divide-y divide-white/[0.04]",
                    children: [
                        filtered.map((r)=>{
                            const isDefault = defaultModel === r.value;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>onSetDefault(isDefault ? null : r.value),
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_23__.cn)('w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-white/[0.03] text-left transition-colors', isDefault && 'bg-[#00e5a0]/[0.05]'),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .PlatformDot */ .DL, {
                                        providerId: r.providerId
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[11px] font-medium text-[#e8ecf4] truncate",
                                                        children: r.name
                                                    }),
                                                    r.vision && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .CapabilityChip */ .lc, {
                                                        kind: "vision"
                                                    }),
                                                    r.tools && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .CapabilityChip */ .lc, {
                                                        kind: "tools"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .ContextChip */ .Au, {
                                                        tokens: r.contextWindow
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "block text-[9px] text-[#5a6478] font-mono truncate",
                                                children: r.value
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "flex items-center gap-1.5 shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SectionBadge, {
                                                section: r.section
                                            }),
                                            isDefault && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15 font-semibold",
                                                children: "default"
                                            })
                                        ]
                                    })
                                ]
                            }, r.value);
                        }),
                        !filtered.length && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "px-4 py-8 text-center text-[10px] text-[#5a6478]",
                            children: [
                                "No models match “",
                                q,
                                "”"
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[9px] text-[#5a6478]",
                children: "Click a model to make it your app-wide default (used for explanations, tutor, and generation). The server default applies when nothing is selected."
            })
        ]
    });
}
function SectionBadge({ section }) {
    const meta = {
        server: {
            label: 'server',
            cls: 'text-[#8b95a8] bg-white/[0.04] border-white/[0.06]',
            icon: _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A
        },
        byok: {
            label: 'yours',
            cls: 'text-[#00e5a0] bg-[#00e5a0]/10 border-[#00e5a0]/15',
            icon: _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A
        },
        local: {
            label: 'local',
            cls: 'text-[#8b95a8] bg-white/[0.04] border-white/[0.06]',
            icon: _barrel_optimize_names_AlertCircle_BarChart3_KeyRound_Layers_Plus_RefreshCw_Server_Shield_User_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A
        }
    }[section];
    const Icon = meta.icon;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_23__.cn)('inline-flex items-center gap-1 text-[8px] rounded-full px-1.5 py-px border', meta.cls),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                className: "size-2.5"
            }),
            " ",
            meta.label
        ]
    });
}
// ── Auth notice (shared with old section's pattern) ──
function AuthNotice({ icon, text, action, tone = 'green' }) {
    const cls = {
        green: 'bg-[#00e5a0]/[0.04] border-[#00e5a0]/10',
        amber: 'bg-amber-500/[0.06] border-amber-500/20',
        red: 'bg-[#ff5757]/[0.06] border-[#ff5757]/15'
    }[tone];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_23__.cn)('flex items-start gap-2 p-2.5 rounded-lg border', cls),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "flex-shrink-0 mt-0.5",
                children: icon
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-1.5 min-w-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] leading-relaxed text-[#8b95a8]",
                        children: text
                    }),
                    action && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex items-center gap-1.5",
                        children: action
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 24760:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowDownToLine)
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
    name: "arrow-down-to-line",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 17V3",
                key: "1cwfxf"
            }
        ],
        [
            "path",
            {
                d: "m6 11 6 6 6-6",
                key: "12ii2o"
            }
        ],
        [
            "path",
            {
                d: "M19 21H5",
                key: "150jfl"
            }
        ]
    ]
};
__iconData.node;
const ArrowDownToLine = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-down-to-line.mjs.map


/***/ }),

/***/ 31620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ry: () => (/* binding */ clearPronunciationCache)
/* harmony export */ });
/* unused harmony exports loadPronunciationCache, savePronunciationCache, getCachedPronunciation, setCachedPronunciation, isMedicalTerm, detectMedicalTerms, fetchPronunciationAudio, batchPregeneratePronunciations, playPronunciation, stopPronunciation, isPronunciationPlaying */
/* harmony import */ var _medical_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95301);
/**
 * Pronunciation Utility — Medical term detection, TTS caching, and audio playback.
 *
 * Features:
 * - localStorage cache for TTS audio blobs (avoids repeated API calls)
 * - Medical term detection using the built-in dictionary
 * - Batch pre-generation of pronunciations
 * - Audio playback with speed control
 */ 
/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */ const CACHE_KEY = 'medq-pronunciation-cache';
const CACHE_DURATION_MS = (/* unused pure expression or super */ null && (7 * 24 * 60 * 60 * 1000)); // 7 days
const MAX_CACHE_ENTRIES = 500;
// Common medical term suffixes for detection
const MEDICAL_SUFFIXES = (/* unused pure expression or super */ null && ([
    'itis',
    'osis',
    'oma',
    'pathy',
    'emia',
    'algia',
    'penia',
    'plegia',
    'ectomy',
    'ostomy',
    'otomy',
    'scopy',
    'graphy',
    'logy',
    'gram',
    'meter',
    'scopy',
    'plasty',
    'rrhaphy',
    'rrhea',
    'rrhage',
    'rrhagia',
    'stasis',
    'stenosis',
    'trophy',
    'trophy',
    'penia',
    'phobia',
    'phil',
    'phobia',
    'genesis',
    'lysis',
    'lytic',
    'cyte',
    'blast',
    'clast',
    'blast'
]));
// Common medical prefixes for detection
const MEDICAL_PREFIXES = (/* unused pure expression or super */ null && ([
    'hypo',
    'hyper',
    'endo',
    'exo',
    'intra',
    'inter',
    'sub',
    'supra',
    'peri',
    'para',
    'meta',
    'dys',
    'tachy',
    'brady',
    'poly',
    'oligo',
    'macro',
    'micro',
    'mega',
    'anti',
    'pro',
    'neo',
    'pre',
    'post',
    'retro',
    'antero',
    'latero'
]));
/* ═══════════════════════════════════════════════════════════════
   CACHE MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */ /**
 * Load the pronunciation cache from localStorage.
 */ function loadPronunciationCache() {
    if (false) {}
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return new Map();
        const parsed = JSON.parse(raw);
        const now = Date.now();
        const map = new Map();
        for (const entry of parsed){
            // Skip expired entries while loading
            if (entry.expiresAt > now) {
                map.set(entry.term.toLowerCase(), entry);
            }
        }
        return map;
    } catch  {
        return new Map();
    }
}
/**
 * Save the pronunciation cache to localStorage.
 */ function savePronunciationCache(cache) {
    if (false) {}
    try {
        // Enforce max entries — remove oldest first
        const entries = Array.from(cache.values());
        if (entries.length > MAX_CACHE_ENTRIES) {
            entries.sort((a, b)=>a.cachedAt - b.cachedAt);
            const toRemove = entries.slice(0, entries.length - MAX_CACHE_ENTRIES);
            for (const entry of toRemove){
                cache.delete(entry.term.toLowerCase());
            }
        }
        const serializable = Array.from(cache.values());
        localStorage.setItem(CACHE_KEY, JSON.stringify(serializable));
    } catch  {
        // localStorage might be full — clear old entries
        try {
            const entries = Array.from(cache.values()).sort((a, b)=>b.cachedAt - a.cachedAt).slice(0, MAX_CACHE_ENTRIES / 2);
            localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
        } catch  {
        // Give up silently
        }
    }
}
/**
 * Get a cached pronunciation entry.
 */ function getCachedPronunciation(term) {
    const cache = loadPronunciationCache();
    const entry = cache.get(term.toLowerCase());
    if (!entry) return null;
    if (entry.expiresAt < Date.now()) {
        // Expired — remove it
        cache.delete(term.toLowerCase());
        savePronunciationCache(cache);
        return null;
    }
    return entry;
}
/**
 * Add a pronunciation entry to the cache.
 */ function setCachedPronunciation(entry) {
    const cache = loadPronunciationCache();
    cache.set(entry.term.toLowerCase(), entry);
    savePronunciationCache(cache);
}
/**
 * Clear the entire pronunciation cache.
 */ function clearPronunciationCache() {
    if (false) {}
    try {
        localStorage.removeItem(CACHE_KEY);
    } catch  {
    // silent
    }
}
/* ═══════════════════════════════════════════════════════════════
   MEDICAL TERM DETECTION
   ═══════════════════════════════════════════════════════════════ */ /**
 * Check if a word looks like a medical term based on suffixes, prefixes,
 * or presence in the dictionary.
 */ function isMedicalTerm(word) {
    const lower = word.toLowerCase().trim();
    // Check exact dictionary match
    if (MEDICAL_DICTIONARY[lower]) return true;
    // Check multi-word dictionary terms
    for (const key of Object.keys(MEDICAL_DICTIONARY)){
        if (key.includes(' ') && lower.includes(key)) return true;
    }
    // Check medical suffixes (word must be long enough to be meaningful)
    if (lower.length >= 5) {
        for (const suffix of MEDICAL_SUFFIXES){
            if (lower.endsWith(suffix)) return true;
        }
    }
    // Check medical prefixes (word must be long enough)
    if (lower.length >= 7) {
        for (const prefix of MEDICAL_PREFIXES){
            if (lower.startsWith(prefix)) return true;
        }
    }
    // Check for common medical word patterns
    const medicalPatterns = [
        /^[A-Z][a-z]+[A-Z]/,
        /^\w+(itis|osis|oma|emia|pathy)$/i
    ];
    for (const pattern of medicalPatterns){
        if (pattern.test(word)) return true;
    }
    return false;
}
function detectMedicalTerms(text) {
    const results = [];
    const seen = new Set();
    // First, check multi-word dictionary terms (longer matches first)
    const multiWordTerms = Object.keys(MEDICAL_DICTIONARY).filter((k)=>k.includes(' ')).sort((a, b)=>b.length - a.length); // longest first for greedy matching
    const textLower = text.toLowerCase();
    const usedRanges = [];
    for (const dictTerm of multiWordTerms){
        let searchFrom = 0;
        while(searchFrom < textLower.length){
            const idx = textLower.indexOf(dictTerm, searchFrom);
            if (idx === -1) break;
            const endIdx = idx + dictTerm.length;
            // Check if this range overlaps with an already-detected term
            const overlaps = usedRanges.some(([s, e])=>idx >= s && idx < e || endIdx > s && endIdx <= e);
            if (!overlaps) {
                results.push({
                    term: text.slice(idx, endIdx),
                    startIndex: idx,
                    endIndex: endIdx,
                    isDictionaryTerm: true
                });
                usedRanges.push([
                    idx,
                    endIdx
                ]);
            }
            searchFrom = endIdx;
        }
    }
    // Then check single words
    const wordRegex = /\b[A-Za-z][a-zA-Z]*(?:'[a-z]+)?\b/g;
    let match;
    while((match = wordRegex.exec(text)) !== null){
        const word = match[0];
        const startIdx = match.index;
        const endIdx = startIdx + word.length;
        // Skip if already covered by a multi-word match
        const covered = usedRanges.some(([s, e])=>startIdx >= s && endIdx <= e);
        if (covered) continue;
        const key = word.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        const isInDictionary = key in MEDICAL_DICTIONARY;
        const looksMedical = isMedicalTerm(word);
        if (isInDictionary || looksMedical) {
            results.push({
                term: word,
                startIndex: startIdx,
                endIndex: endIdx,
                isDictionaryTerm: isInDictionary
            });
            usedRanges.push([
                startIdx,
                endIdx
            ]);
        }
    }
    // Sort by position in text
    results.sort((a, b)=>a.startIndex - b.startIndex);
    return results;
}
/* ═══════════════════════════════════════════════════════════════
   TTS API CALLS
   ═══════════════════════════════════════════════════════════════ */ /**
 * Fetch TTS audio for a single term. Returns a blob URL for the audio.
 */ async function fetchPronunciationAudio(term, speed = 0.8) {
    // Check cache first
    const cached = getCachedPronunciation(term);
    if (cached?.audioUrl) {
        // Verify the blob URL is still valid
        try {
            const response = await fetch(cached.audioUrl, {
                method: 'HEAD'
            });
            if (response.ok) return cached.audioUrl;
        } catch  {
        // Blob URL expired, need to re-fetch
        }
    }
    // Call the TTS API
    const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: term,
            voice: 'tongtong',
            speed
        })
    });
    if (!response.ok) {
        throw new Error(`TTS API failed: ${response.status}`);
    }
    const data = await response.json();
    const audioUrl = data.audioUrl;
    // Cache the result
    setCachedPronunciation({
        term: term.toLowerCase(),
        audioUrl,
        cachedAt: Date.now(),
        expiresAt: Date.now() + CACHE_DURATION_MS
    });
    return audioUrl;
}
/**
 * Batch pre-generate pronunciations for an array of terms.
 * Calls POST /api/tts/pronunciations and caches all results.
 */ async function batchPregeneratePronunciations(terms, speed = 0.8) {
    if (terms.length === 0) return [];
    // Filter out already-cached terms
    const uncachedTerms = terms.filter((t)=>!getCachedPronunciation(t));
    if (uncachedTerms.length === 0) {
        // All terms are cached — return cached results
        return terms.map((term)=>{
            const cached = getCachedPronunciation(term);
            return {
                term,
                audioUrl: cached?.audioUrl,
                phonetic: cached?.phonetic
            };
        });
    }
    try {
        const response = await fetch('/api/tts/pronunciations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                terms: uncachedTerms,
                speed
            })
        });
        if (!response.ok) {
            throw new Error(`Batch TTS API failed: ${response.status}`);
        }
        const data = await response.json();
        const results = data.results || [];
        // Cache all successful results
        for (const result of results){
            if (result.audioUrl) {
                setCachedPronunciation({
                    term: result.term.toLowerCase(),
                    audioUrl: result.audioUrl,
                    cachedAt: Date.now(),
                    expiresAt: Date.now() + CACHE_DURATION_MS,
                    phonetic: result.phonetic
                });
            }
        }
        // Merge with cached results
        return terms.map((term)=>{
            const fromBatch = results.find((r)=>r.term.toLowerCase() === term.toLowerCase());
            if (fromBatch) return fromBatch;
            const cached = getCachedPronunciation(term);
            return {
                term,
                audioUrl: cached?.audioUrl,
                phonetic: cached?.phonetic
            };
        });
    } catch (error) {
        console.error('Batch pronunciation pre-generation failed:', error);
        // Return cached results for whatever we have
        return terms.map((term)=>{
            const cached = getCachedPronunciation(term);
            return {
                term,
                audioUrl: cached?.audioUrl,
                phonetic: cached?.phonetic,
                error: 'Batch generation failed'
            };
        });
    }
}
/* ═══════════════════════════════════════════════════════════════
   AUDIO PLAYBACK
   ═══════════════════════════════════════════════════════════════ */ let currentAudio = null;
let currentPlaybackCallback = null;
/**
 * Play pronunciation audio for a term.
 * Handles fetching, caching, and playback.
 */ async function playPronunciation(term, speed = 0.8, onPlaybackStateChange) {
    // Stop any currently playing audio
    stopPronunciation();
    if (onPlaybackStateChange) {
        currentPlaybackCallback = onPlaybackStateChange;
        onPlaybackStateChange(true);
    }
    try {
        const audioUrl = await fetchPronunciationAudio(term, speed);
        const audio = new Audio(audioUrl);
        currentAudio = audio;
        audio.onended = ()=>{
            currentAudio = null;
            currentPlaybackCallback?.(false);
            currentPlaybackCallback = null;
        };
        audio.onerror = ()=>{
            currentAudio = null;
            currentPlaybackCallback?.(false);
            currentPlaybackCallback = null;
        };
        await audio.play();
    } catch (error) {
        console.error('Failed to play pronunciation:', error);
        currentAudio = null;
        currentPlaybackCallback?.(false);
        currentPlaybackCallback = null;
    }
}
/**
 * Stop the currently playing pronunciation audio.
 */ function stopPronunciation() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    if (currentPlaybackCallback) {
        currentPlaybackCallback(false);
        currentPlaybackCallback = null;
    }
}
/**
 * Check if audio is currently playing.
 */ function isPronunciationPlaying() {
    return currentAudio !== null && !currentAudio.paused;
}


/***/ }),

/***/ 34306:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Database)
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
    name: "database",
    size: 24,
    node: [
        [
            "ellipse",
            {
                cx: "12",
                cy: "5",
                rx: "9",
                ry: "3",
                key: "msslwz"
            }
        ],
        [
            "path",
            {
                d: "M3 5V19A9 3 0 0 0 21 19V5",
                key: "1wlel7"
            }
        ],
        [
            "path",
            {
                d: "M3 12A9 3 0 0 0 21 12",
                key: "mv7ke4"
            }
        ]
    ]
};
__iconData.node;
const Database = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=database.mjs.map


/***/ }),

/***/ 35484:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleAlert)
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
    name: "circle-alert",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12",
                y1: "8",
                y2: "12",
                key: "1pkeuh"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12.01",
                y1: "16",
                y2: "16",
                key: "4dfq90"
            }
        ]
    ],
    aliases: [
        "alert-circle"
    ]
};
__iconData.node;
const CircleAlert = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-alert.mjs.map


/***/ }),

/***/ 40382:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AddKeyDialog)
/* harmony export */ });
/* unused harmony export providerSignupUrl */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(50626);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1275);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(81499);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33807);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42763);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50694);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(96231);
/* __next_internal_client_entry_do_not_use__ default,providerSignupUrl auto */ 
/**
 * AddKeyDialog — FreeLLMAPI's 3-pane add-key pattern, MedQ-flavored.
 *
 * Panes (SegmentedControl):
 *   Provider : pick a known provider → paste key (+ optional baseUrl/label)
 *   Custom   : any OpenAI-compatible endpoint (baseUrl + optional key)
 *
 * After a successful provider-pane add, offers to discover models from the
 * endpoint's /models (the freellmapi "post-add scope picker" hand-off).
 */ 









function AddKeyDialog({ open, onClose, initialProvider, existingProviderIds, onAdded, saveKey }) {
    const [pane, setPane] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('provider');
    const [providerId, setProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [providerQuery, setProviderQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [providerListOpen, setProviderListOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [apiKey, setApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [showKey, setShowKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [baseUrl, setBaseUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [label, setLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [attempted, setAttempted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Custom pane: which registry provider to save the custom endpoint under.
    // "openai" is the generic OpenAI-compatible bucket; the baseUrl override
    // is what makes the row a custom endpoint.
    const [customProviderId, setCustomProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('openai');
    const provider = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>_lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_7__/* .BYOK_PROVIDERS */ .ln.find((p)=>p.id === providerId) ?? null, [
        providerId
    ]);
    // Reset on open; jump straight to a preselected provider when given.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (open) {
            setPane('provider');
            setProviderId(initialProvider?.id ?? '');
            setProviderQuery('');
            setProviderListOpen(false);
            setApiKey('');
            setShowKey(false);
            setBaseUrl(initialProvider?.defaultBaseUrl ?? '');
            setLabel('');
            setCustomProviderId('openai');
            setSaving(false);
            setAttempted(false);
        }
    }, [
        open,
        initialProvider
    ]);
    const filteredProviders = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const q = providerQuery.trim().toLowerCase();
        if (!q) return _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_7__/* .BYOK_PROVIDERS */ .ln;
        return _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_7__/* .BYOK_PROVIDERS */ .ln.filter((p)=>p.name.toLowerCase().includes(q) || p.id.includes(q));
    }, [
        providerQuery
    ]);
    const keyOptional = provider?.requiresKey === false;
    const submit = async (mode)=>{
        setAttempted(true);
        if (pane === 'provider' && !provider) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Pick a provider first');
            return;
        }
        // Both panes save under a REGISTRY provider id — the data model stores
        // custom endpoints as (providerId + baseUrl override) rows.
        const pid = pane === 'provider' ? provider.id : customProviderId;
        const keyRequired = pane === 'provider' && provider?.requiresKey === true;
        if (keyRequired && !apiKey.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Paste your API key first');
            return;
        }
        if (pane === 'custom' && !baseUrl.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Enter the endpoint base URL');
            return;
        }
        setSaving(true);
        try {
            const res = await saveKey({
                providerId: pid,
                apiKey: apiKey.trim() || undefined,
                baseUrl: baseUrl.trim() || null,
                label: label.trim() || null,
                ...mode === 'test' ? {
                    test: true
                } : {}
            });
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(res.error || 'Could not save the key');
                return;
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(mode === 'test' ? 'Key saved & verified' : 'Key saved');
            onAdded(pid, res.keyId);
            onClose();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Could not save the key');
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: (o)=>{
            if (!o) onClose();
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .DialogContent */ .Cf, {
            className: "max-w-lg bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pt-5 pb-3 space-y-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .DialogTitle */ .L3, {
                            className: "text-sm font-bold text-[#e8ecf4]",
                            children: "Add AI provider"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .DialogDescription */ .rr, {
                            className: "text-[10px] text-[#8b95a8] leading-relaxed",
                            children: "Keys are encrypted (AES-256-GCM) on the server and sync across your devices."
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_8__/* .SegmentedControl */ .Iz, {
                            options: [
                                {
                                    value: 'provider',
                                    label: 'Known provider'
                                },
                                {
                                    value: 'custom',
                                    label: 'Custom endpoint'
                                }
                            ],
                            value: pane,
                            onChange: setPane
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pb-5 space-y-3",
                    children: [
                        pane === 'provider' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                            className: "text-[10px] font-semibold text-[#8b95a8]",
                                            children: "Provider"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                    type: "button",
                                                    onClick: ()=>setProviderListOpen((o)=>!o),
                                                    className: "w-full flex items-center gap-2 h-9 rounded-lg border border-white/[0.08] bg-[#08090f] px-2.5 text-left hover:border-[#00e5a0]/30 transition-colors",
                                                    children: [
                                                        provider ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_8__/* .ProviderAvatar */ .$N, {
                                                                    provider: provider,
                                                                    size: "sm"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[11px] font-medium text-[#e8ecf4]",
                                                                    children: provider.name
                                                                }),
                                                                existingProviderIds.has(provider.id) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[9px] text-[#00e5a0]",
                                                                    children: "\xb7 added"
                                                                })
                                                            ]
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[11px] text-[#5a6478]",
                                                            children: "Select a provider…"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                            className: "size-3.5 text-[#5a6478] ml-auto"
                                                        })
                                                    ]
                                                }),
                                                providerListOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "absolute z-20 mt-1 w-full rounded-lg border border-white/[0.08] bg-[#0c0e14] shadow-xl overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-2 px-2.5 h-9 border-b border-white/[0.06]",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                                    className: "size-3.5 text-[#5a6478]"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                                    autoFocus: true,
                                                                    value: providerQuery,
                                                                    onChange: (e)=>setProviderQuery(e.target.value),
                                                                    placeholder: "Search providers…",
                                                                    className: "flex-1 bg-transparent text-[11px] text-[#e8ecf4] placeholder:text-[#5a6478] outline-none"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "max-h-56 overflow-y-auto py-1",
                                                            children: [
                                                                filteredProviders.map((p)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                        type: "button",
                                                                        onClick: ()=>{
                                                                            setProviderId(p.id);
                                                                            setBaseUrl(p.defaultBaseUrl);
                                                                            setProviderListOpen(false);
                                                                        },
                                                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__.cn)('w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-white/[0.04] text-left', providerId === p.id && 'bg-[#00e5a0]/[0.06]'),
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_8__/* .ProviderAvatar */ .$N, {
                                                                                provider: p,
                                                                                size: "sm"
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                className: "min-w-0 flex-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                        className: "block text-[11px] font-medium text-[#e8ecf4] truncate",
                                                                                        children: p.name
                                                                                    }),
                                                                                    !p.requiresKey && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                        className: "block text-[9px] text-[#5a6478]",
                                                                                        children: "keyless — just needs the URL"
                                                                                    })
                                                                                ]
                                                                            }),
                                                                            existingProviderIds.has(p.id) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-[8px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15 shrink-0",
                                                                                children: "added"
                                                                            })
                                                                        ]
                                                                    }, p.id)),
                                                                !filteredProviders.length && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "px-3 py-4 text-center text-[10px] text-[#5a6478]",
                                                                    children: "No match"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        attempted && !provider && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[9px] text-[#ff5757]",
                                            children: "Pick a provider to continue."
                                        })
                                    ]
                                }),
                                provider && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                            className: "text-[10px] font-semibold text-[#8b95a8]",
                                            children: [
                                                "API key ",
                                                keyOptional && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#5a6478] font-normal",
                                                    children: "(optional — keyless)"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                    type: showKey ? 'text' : 'password',
                                                    value: apiKey,
                                                    onChange: (e)=>setApiKey(e.target.value),
                                                    placeholder: provider.keyHint,
                                                    className: "h-9 pr-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowKey((s)=>!s),
                                                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#e8ecf4]",
                                                    "aria-label": showKey ? 'Hide key' : 'Show key',
                                                    children: showKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                        className: "size-3.5"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                        className: "size-3.5"
                                                    })
                                                })
                                            ]
                                        }),
                                        attempted && !keyOptional && !apiKey.trim() && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[9px] text-[#ff5757]",
                                            children: "The API key is required for this provider."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[9px] text-[#5a6478]",
                                            children: "The key never appears in browser storage — it is encrypted server-side."
                                        })
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: "Base URL"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6478]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                            value: baseUrl,
                                            onChange: (e)=>setBaseUrl(e.target.value),
                                            placeholder: "https://your-gateway.example.com/v1",
                                            className: "h-9 pl-8 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[9px] text-[#5a6478] leading-relaxed",
                                    children: [
                                        "Any OpenAI-compatible endpoint (vLLM, LM Studio, llama.cpp, a relay, FreeLLMAPI…). Save it as the ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "font-mono text-[#8b95a8]",
                                            children: "openai"
                                        }),
                                        " provider override below or as a custom provider id."
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-1.5 pt-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                            className: "text-[10px] font-semibold text-[#8b95a8]",
                                            children: [
                                                "API key ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#5a6478] font-normal",
                                                    children: "(optional)"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                    type: showKey ? 'text' : 'password',
                                                    value: apiKey,
                                                    onChange: (e)=>setApiKey(e.target.value),
                                                    placeholder: "sk-… (leave empty for keyless gateways)",
                                                    className: "h-9 pr-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowKey((s)=>!s),
                                                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#e8ecf4]",
                                                    children: showKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                        className: "size-3.5"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                        className: "size-3.5"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-1.5 pt-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                            className: "text-[10px] font-semibold text-[#8b95a8]",
                                            children: [
                                                "Save under provider ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#5a6478] font-normal",
                                                    children: "(how it talks to the endpoint)"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
                                            value: customProviderId,
                                            onChange: (e)=>setCustomProviderId(e.target.value),
                                            className: "h-9 w-full rounded-lg border border-white/[0.08] bg-[#08090f] px-2.5 text-[11px] text-[#e8ecf4] outline-none focus:border-[#00e5a0]/30",
                                            children: _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_7__/* .BYOK_PROVIDERS */ .ln.filter((p)=>p.id !== 'ollama' && p.id !== 'lemonade').map((p)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                    value: p.id,
                                                    className: "bg-[#0c0e14]",
                                                    children: p.name
                                                }, p.id))
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[9px] text-[#5a6478]",
                                            children: "Pick the API dialect the endpoint speaks — most gateways are OpenAI-compatible."
                                        })
                                    ]
                                })
                            ]
                        }),
                        pane === 'provider' && provider && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: [
                                        "Base URL ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#5a6478] font-normal",
                                            children: "(optional override)"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                    value: baseUrl,
                                    onChange: (e)=>setBaseUrl(e.target.value),
                                    placeholder: provider.defaultBaseUrl,
                                    className: "h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: [
                                        "Label ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#5a6478] font-normal",
                                            children: "(optional)"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                    value: label,
                                    onChange: (e)=>setLabel(e.target.value),
                                    placeholder: "Work key, Personal, Local Ollama…",
                                    className: "h-9 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
                                })
                            ]
                        }),
                        pane === 'provider' && provider && providerSignupUrl(provider.id) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            href: providerSignupUrl(provider.id),
                            target: "_blank",
                            rel: "noreferrer",
                            className: "inline-flex items-center gap-1 text-[9px] text-[#00e5a0] hover:underline",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "size-3"
                                }),
                                " Get an API key from ",
                                provider.name
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 pt-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    onClick: ()=>submit('test'),
                                    disabled: saving,
                                    className: "h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg",
                                    children: [
                                        saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "size-3.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_Globe_KeyRound_Loader2_Search_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        saving ? 'Saving…' : 'Add & test'
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    variant: "outline",
                                    onClick: ()=>submit('only'),
                                    disabled: saving,
                                    className: "h-8 px-3.5 text-[11px] border-white/[0.1] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-lg",
                                    children: "Add only"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: onClose,
                                    disabled: saving,
                                    className: "h-8 px-3 ml-auto text-[11px] text-[#5a6478] hover:text-[#e8ecf4] rounded-lg",
                                    children: "Cancel"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/** Signup-page URL per provider for the "Get API key" link. */ function providerSignupUrl(providerId) {
    const urls = {
        openai: 'https://platform.openai.com/api-keys',
        anthropic: 'https://console.anthropic.com/settings/keys',
        google: 'https://aistudio.google.com/app/apikey',
        deepseek: 'https://platform.deepseek.com/api_keys',
        glm: 'https://open.bigmodel.cn/usercenter/apikeys',
        qwen: 'https://dashscope.console.aliyun.com/apiKey',
        kimi: 'https://platform.moonshot.cn/console/api-keys',
        siliconflow: 'https://cloud.siliconflow.cn/account/ak',
        openrouter: 'https://openrouter.ai/settings/keys',
        grok: 'https://console.x.ai',
        minimax: 'https://platform.minimaxi.com/',
        doubao: 'https://console.volcengine.com/ark',
        xiaomi: 'https://xiaomimimo.com/',
        freellmapi: 'https://freellmapi.co'
    };
    return urls[providerId] ?? '';
}


/***/ }),

/***/ 44075:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ useInstallApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useInstallApp auto */ /**
 * useInstallApp — exposes a callable install() function so users can trigger
 * the PWA install flow on demand, not just when the browser fires
 * `beforeinstallprompt` (which only happens once and never again if the
 * user dismissed it).
 *
 * State machine:
 *   - platform: 'chromium' | 'ios' | 'installed' | 'other'
 *   - canPrompt: true when chromium has a captured beforeinstallprompt event
 *   - isInstalled: true when running in standalone mode
 *
 * install() returns:
 *   - { ok: true, method: 'native' }    — chromium native prompt shown
 *   - { ok: true, method: 'instructions' } — fallback instructions shown
 *                                            (caller should display a modal)
 *   - { ok: false, reason: 'unsupported' }
 *   - { ok: false, reason: 'installed' }
 *
 * The hook also exposes `instructions` — a structured object with platform-
 * specific step-by-step instructions, so callers can render their own UI
 * instead of using the default modal.
 */ 
let capturedPrompt = null;
const listeners = new Set();
function detectPlatform() {
    if (false) {}
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (standalone) return 'installed';
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || ua.includes('Mac') && 'ontouchend' in document;
    const isChromium = /Chrome|Edg|SamsungBrowser|Brave/.test(ua) && !/Firefox|Safari/.test(ua);
    if (isIOS) return 'ios';
    if (isChromium) return 'chromium';
    return 'other';
}
function buildInstructions(platform) {
    switch(platform){
        case 'ios':
            return {
                platform,
                heading: 'Install MedQ on iPhone',
                intro: "iOS Safari doesn't support one-tap install. Add MedQ to your Home Screen manually — it then runs full-screen like a native app, with offline access and push notifications.",
                menuLabel: 'Share button',
                steps: [
                    {
                        title: 'Tap the Share button',
                        detail: "It's at the bottom of Safari on iPhone, or in the top address bar on iPad."
                    },
                    {
                        title: 'Choose "Add to Home Screen"',
                        detail: 'Scroll down the share sheet and tap the option with the "+" icon.'
                    },
                    {
                        title: 'Tap "Add"',
                        detail: 'MedQ will appear on your Home Screen. Launch it from there to get the full-screen, app-like experience.'
                    }
                ]
            };
        case 'chromium':
            return {
                platform,
                heading: 'Install MedQ',
                intro: "If the Install button didn't work, you can still install MedQ from your browser's menu:",
                menuLabel: '⋮ menu',
                steps: [
                    {
                        title: 'Open the browser menu',
                        detail: 'Tap the ⋮ icon (top-right on Chrome Android, top-right on Chrome desktop).'
                    },
                    {
                        title: 'Select "Install MedQ" or "Add to Home Screen"',
                        detail: 'On desktop, look for "Install MedQ…" or "Install app". On Android, look for "Add to Home screen" or "Install app".'
                    },
                    {
                        title: 'Confirm the install',
                        detail: 'A dialog will appear — click Install / Add. MedQ will open in its own window.'
                    }
                ]
            };
        case 'installed':
            return {
                platform,
                heading: 'MedQ is already installed',
                intro: "You're running MedQ as an installed app right now. Look for the MedQ icon on your Home Screen or in your app drawer to launch it directly.",
                menuLabel: '',
                steps: []
            };
        case 'other':
        default:
            return {
                platform,
                heading: 'Install MedQ',
                intro: "Your browser doesn't support automatic PWA install. Try opening this page in Chrome, Edge, or Safari, then follow the manual install instructions below.",
                menuLabel: 'Browser menu',
                steps: [
                    {
                        title: 'Open your browser menu',
                        detail: 'Look for a menu icon (⋮, ≡, or "Share") in your browser.'
                    },
                    {
                        title: 'Choose "Add to Home Screen" or "Install"',
                        detail: 'The exact label varies by browser — try "Add to Home screen", "Install MedQ", "Save to Home Screen", or "Create Shortcut".'
                    },
                    {
                        title: 'Launch from your Home Screen',
                        detail: 'After install, MedQ appears alongside your other apps and opens in its own window.'
                    }
                ]
            };
    }
}
function useInstallApp() {
    const [platform, setPlatform] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('other');
    const [canPrompt, setCanPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [installing, setInstalling] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setPlatform(detectPlatform());
        // Listen for beforeinstallprompt (chromium only)
        const handler = (e)=>{
            e.preventDefault();
            capturedPrompt = e;
            setCanPrompt(true);
            listeners.forEach((l)=>l(capturedPrompt));
        };
        window.addEventListener('beforeinstallprompt', handler);
        // Listen for appinstalled
        const onInstalled = ()=>{
            capturedPrompt = null;
            setCanPrompt(false);
            setPlatform('installed');
        };
        window.addEventListener('appinstalled', onInstalled);
        return ()=>{
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', onInstalled);
        };
    }, []);
    const install = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        // Already installed
        if (platform === 'installed') {
            return {
                ok: false,
                reason: 'installed'
            };
        }
        // Chromium with captured prompt — call native install
        if (capturedPrompt) {
            setInstalling(true);
            try {
                await capturedPrompt.prompt();
                const choice = await capturedPrompt.userChoice;
                capturedPrompt = null;
                setCanPrompt(false);
                listeners.forEach((l)=>l(null));
                if (choice.outcome === 'accepted') {
                    return {
                        ok: true,
                        method: 'native'
                    };
                }
                return {
                    ok: false,
                    reason: 'dismissed',
                    instructions: buildInstructions(platform)
                };
            } finally{
                setInstalling(false);
            }
        }
        // No captured prompt — return instructions for fallback UI
        return {
            ok: true,
            method: 'instructions',
            instructions: buildInstructions(platform)
        };
    }, [
        platform
    ]);
    const instructions = buildInstructions(platform);
    const isInstalled = platform === 'installed';
    return {
        platform,
        canPrompt,
        isInstalled,
        installing,
        install,
        instructions
    };
}


/***/ }),

/***/ 48203:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ SquarePlus)
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
    name: "square-plus",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
                key: "afitv7"
            }
        ],
        [
            "path",
            {
                d: "M8 12h8",
                key: "1wcyev"
            }
        ],
        [
            "path",
            {
                d: "M12 8v8",
                key: "napkw2"
            }
        ]
    ],
    aliases: [
        "plus-square"
    ]
};
__iconData.node;
const SquarePlus = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=square-plus.mjs.map


/***/ }),

/***/ 48243:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ useAriaLabelledBy)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66652);
/* harmony import */ var _useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62955);
/* __next_internal_client_entry_do_not_use__ useAriaLabelledBy auto */ 


function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId, ariaLabel) {
    const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
    const generatedLabelId = (0,_useBaseUiId_mjs__WEBPACK_IMPORTED_MODULE_1__/* .useBaseUiId */ .e)(labelSourceId ? `${labelSourceId}-label` : undefined);
    // A non-blank `aria-label` wins over any associated label, as it does on native inputs.
    const hasAriaLabel = Boolean(ariaLabel?.trim());
    const implicitLabelId = hasAriaLabel ? undefined : labelId;
    const ariaLabelledBy = explicitAriaLabelledBy ?? implicitLabelId ?? fallbackAriaLabelledBy;
    // Fallback for <span> controls labelled by wrapping/sibling native <label>.
    // Run after every commit so DOM association changes (e.g. label mount/unmount)
    // are reflected even when props/state deps are unchanged.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0,_base_ui_utils_useIsoLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsoLayoutEffect */ .g)(()=>{
        const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || hasAriaLabel || !enableFallback ? undefined : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
        if (fallbackAriaLabelledBy !== nextAriaLabelledBy) {
            setFallbackAriaLabelledBy(nextAriaLabelledBy);
        }
    });
    return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
    const label = findAssociatedLabel(labelSource);
    if (!label) {
        return undefined;
    }
    if (!label.id && generatedLabelId) {
        label.id = generatedLabelId;
    }
    return label.id || undefined;
}
function findAssociatedLabel(labelSource) {
    if (!labelSource) {
        return undefined;
    }
    // Fast path before the expensive `.labels` read.
    const parent = labelSource.parentElement;
    if (parent && parent.tagName === 'LABEL') {
        return parent;
    }
    const controlId = labelSource.id;
    if (controlId) {
        const nextSibling = labelSource.nextElementSibling;
        if (nextSibling && nextSibling.htmlFor === controlId) {
            return nextSibling;
        }
    }
    const labels = labelSource.labels;
    return labels && labels[0];
}


/***/ }),

/***/ 48531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ OfflineAIManager)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _useOfflineAI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54311);
/* __next_internal_client_entry_do_not_use__ OfflineAIManager,default auto */ 
/**
 * OfflineAIManager — settings card for the on-device AI engine.
 *
 * Auto-detects WebGPU on mount. Shows GPU models (web-llm) when WebGPU is
 * available, otherwise falls back to CPU models (wllama). Both backends
 * share the same UI surface — only the model list and labels change.
 *
 * Surfaces:
 *   - Backend badge: "WebGPU (GPU)" or "CPU only (WASM)"
 *   - Online/offline status
 *   - Model picker (catalog adapts to detected backend)
 *   - Download button with progress bar
 *   - Live status text
 *   - Test-prompt input
 *   - "How this works" explainer
 */ 

// ── Sub-components ──────────────────────────────────────────────────────────
function StatusBadge({ online }) {
    const color = online ? 'bg-emerald-500' : 'bg-amber-500';
    const label = online ? 'Online' : 'Offline';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${color}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "h-1.5 w-1.5 rounded-full bg-white"
            }),
            label
        ]
    });
}
function BackendBadge({ backend }) {
    if (!backend) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600",
            children: "Detecting…"
        });
    }
    if (backend === 'gpu') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "inline-block rounded bg-gradient-to-r from-fuchsia-100 to-violet-100 px-2 py-0.5 text-xs font-semibold text-fuchsia-700",
            children: "⚡ WebGPU (GPU)"
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700",
        children: "\uD83D\uDC22 CPU only (WASM)"
    });
}
function TierBadge({ tier }) {
    const colors = {
        tiny: 'bg-blue-100 text-blue-700',
        small: 'bg-indigo-100 text-indigo-700',
        medium: 'bg-purple-100 text-purple-700'
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: `inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${colors[tier]}`,
        children: tier
    });
}
function DomainBadge({ domain }) {
    if (domain === 'medical') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700",
            children: "Medical"
        });
    }
    return null;
}
function DraftBadge({ hasDraft }) {
    if (!hasDraft) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        title: "Uses speculative decoding (draft model) for ~2\xd7 speed",
        className: "inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700",
        children: "⚡ Draft"
    });
}
function ModelRow({ id, name, description, sizeMb, tokPerSec, tier, domain, hasDraft, selected, disabled, onSelect }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        onClick: onSelect,
        disabled: disabled,
        className: `w-full text-left rounded-lg border p-3 transition-colors ${selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "font-medium text-slate-900",
                                children: name
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TierBadge, {
                                tier: tier
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DomainBadge, {
                                domain: domain
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DraftBadge, {
                                hasDraft: hasDraft
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-xs text-slate-500",
                        children: [
                            "~",
                            sizeMb,
                            " MB \xb7 ~",
                            tokPerSec,
                            " tok/s"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-1 text-xs text-slate-600",
                children: description
            })
        ]
    });
}
// ── Main component ──────────────────────────────────────────────────────────
function OfflineAIManager() {
    const { models, backend, selectedModel, isReady, status, downloadProgress, statusText, isOnline, selectModel, download, chat } = (0,_useOfflineAI__WEBPACK_IMPORTED_MODULE_2__/* .useOfflineAI */ .Rc)();
    const [testInput, setTestInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('What is the function of the mitral valve?');
    const [testOutput, setTestOutput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [testRunning, setTestRunning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // RAG index management state
    const [ragCount, setRagCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [ragIndexing, setRagIndexing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [ragProgress, setRagProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [ragStatus, setRagStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const refreshRagCount = async ()=>{
        try {
            const { countChunks } = await __webpack_require__.e(/* import() */ 53710).then(__webpack_require__.bind(__webpack_require__, 53710));
            const c = await countChunks();
            setRagCount(c);
        } catch  {
            setRagCount(null);
        }
    };
    // Refresh chunk count on mount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        refreshRagCount();
    }, []);
    const handleIndexQuestionBank = async ()=>{
        setRagIndexing(true);
        setRagStatus('Fetching question bank…');
        setRagProgress(null);
        try {
            const { indexChunks } = await __webpack_require__.e(/* import() */ 53710).then(__webpack_require__.bind(__webpack_require__, 53710));
            // Fetch the user's question bank (questions they've created or that are
            // shared with them). Limit to 500 chunks to keep the initial index
            // reasonable — the user can re-index later if needed.
            const res = await fetch('/api/bank?limit=500', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) throw new Error(`Failed to fetch qbank: ${res.status}`);
            const data = await res.json();
            const questions = data.questions || data || [];
            if (questions.length === 0) {
                setRagStatus('No questions found in your bank.');
                return;
            }
            setRagStatus(`Embedding ${questions.length} questions…`);
            const chunks = questions.map((q)=>{
                const stem = q.question || q.stem || '';
                const opts = q.options ? `\nOptions: ${q.options.join(' | ')}` : '';
                const expl = q.explanation ? `\nExplanation: ${q.explanation}` : '';
                const topic = q.topic || q.category || '';
                return {
                    id: `qbank:${q.id}`,
                    source: 'qbank',
                    text: `${stem}${opts}${expl}`,
                    title: topic ? `Question: ${topic}` : 'Question',
                    tags: topic ? [
                        topic
                    ] : undefined
                };
            });
            const result = await indexChunks(chunks, (done, total)=>{
                setRagProgress({
                    done,
                    total
                });
            });
            setRagStatus(`Indexed ${result.indexed} questions.`);
            await refreshRagCount();
        } catch (err) {
            setRagStatus(`Indexing failed: ${err instanceof Error ? err.message : 'unknown error'}`);
        } finally{
            setRagIndexing(false);
            setRagProgress(null);
        }
    };
    const handleClearRag = async ()=>{
        setRagIndexing(true);
        setRagStatus('Clearing RAG index…');
        try {
            const { clearAll } = await __webpack_require__.e(/* import() */ 53710).then(__webpack_require__.bind(__webpack_require__, 53710));
            await clearAll();
            setRagStatus('RAG index cleared.');
            await refreshRagCount();
        } catch (err) {
            setRagStatus(`Clear failed: ${err instanceof Error ? err.message : 'unknown error'}`);
        } finally{
            setRagIndexing(false);
        }
    };
    const handleTest = async ()=>{
        if (!isReady || !testInput.trim()) return;
        setTestRunning(true);
        setTestOutput('');
        try {
            await chat([
                {
                    role: 'system',
                    content: 'You are MedQ Offline, a study assistant for medical students. Be concise. Answer in 2-3 sentences.'
                },
                {
                    role: 'user',
                    content: testInput
                }
            ], {
                maxTokens: 200,
                onToken: (chunk)=>setTestOutput((prev)=>prev + chunk)
            });
        } catch (err) {
            setTestOutput(`Error: ${err instanceof Error ? err.message : 'unknown error'}`);
        } finally{
            setTestRunning(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start justify-between gap-3 mb-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-base font-semibold text-slate-900",
                                children: "Offline AI Engine"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-sm text-slate-600 mt-0.5",
                                children: 'Optional: install a small medical assistant model to keep AI features working when you\'re offline. Auto-detects GPU for 10–50\xd7 speedup. Nothing downloads until you pick a model and click "Download".'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col items-end gap-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatusBadge, {
                                online: isOnline
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BackendBadge, {
                                backend: backend
                            })
                        ]
                    })
                ]
            }),
            backend === 'gpu' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-4 rounded-md bg-fuchsia-50 border border-fuchsia-200 p-2.5 text-xs text-fuchsia-900",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                        children: "GPU detected."
                    }),
                    " Showing WebGPU-optimized models (web-llm). These run on your GPU and are 10–50\xd7 faster than CPU models of the same size."
                ]
            }),
            backend === 'cpu' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-4 rounded-md bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-700",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                        children: "No WebGPU detected."
                    }),
                    " Showing CPU models (wllama, WASM). These work on any device but are slower. To enable GPU acceleration, use a WebGPU-capable browser (Chrome 113+, Edge 113+, Safari 17+)."
                ]
            }),
            backend && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2 mb-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: "text-xs font-medium uppercase tracking-wide text-slate-500",
                        children: [
                            "Choose a model ",
                            backend === 'gpu' ? '(WebGPU)' : '(CPU/WASM)'
                        ]
                    }),
                    !selectedModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-md bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                children: "No model selected."
                            }),
                            ' Pick a model below, then click "Download" to install it. Models are 400 MB – 2.6 GB and are cached in your browser for offline use. Nothing is downloaded until you explicitly click the button.'
                        ]
                    }),
                    models.map((m)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModelRow, {
                            id: m.id,
                            name: m.name,
                            description: m.description,
                            sizeMb: m.sizeMb,
                            tokPerSec: m.tokPerSec,
                            tier: m.tier,
                            domain: m.domain,
                            hasDraft: !!m.draftModel,
                            selected: selectedModel?.id === m.id,
                            disabled: status === 'downloading' || status === 'loading',
                            onSelect: ()=>selectModel(m.id)
                        }, m.id))
                ]
            }),
            selectedModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-lg bg-slate-50 border border-slate-200 p-3 mb-4",
                children: [
                    status === 'idle' && !isReady && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>download(),
                        className: "w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700",
                        children: [
                            "Download ",
                            selectedModel.name,
                            " (~",
                            selectedModel.sizeMb,
                            " MB)"
                        ]
                    }),
                    (status === 'downloading' || status === 'loading') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between text-xs text-slate-600 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        children: statusText
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            Math.round(downloadProgress * 100),
                                            "%"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-2 rounded-full bg-slate-200 overflow-hidden",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-full bg-blue-600 transition-all",
                                    style: {
                                        width: `${Math.max(2, downloadProgress * 100)}%`
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "mt-1.5 text-[11px] text-slate-500",
                                children: status === 'downloading' ? 'Downloading model file… (cached for future use)' : backend === 'gpu' ? 'Compiling shaders + uploading to GPU memory…' : 'Loading model into memory…'
                            })
                        ]
                    }),
                    status === 'failed' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-sm text-red-700 mb-2",
                                children: statusText
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: ()=>download(),
                                className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50",
                                children: "Retry"
                            })
                        ]
                    }),
                    isReady && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 text-sm text-emerald-700",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "h-2 w-2 rounded-full bg-emerald-500"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "font-medium",
                                children: [
                                    selectedModel.name,
                                    " ready"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-slate-500 text-xs",
                                children: [
                                    "\xb7 ",
                                    backend === 'gpu' ? 'GPU' : 'CPU',
                                    " backend \xb7 ",
                                    isOnline ? 'Will work offline once disconnected' : 'Running offline now'
                                ]
                            })
                        ]
                    })
                ]
            }),
            isReady && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-lg border border-slate-200 p-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5 block",
                        children: "Test the model"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                        value: testInput,
                        onChange: (e)=>setTestInput(e.target.value),
                        disabled: testRunning,
                        rows: 2,
                        className: "w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: handleTest,
                        disabled: testRunning || !testInput.trim(),
                        className: "mt-2 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50",
                        children: testRunning ? 'Generating…' : 'Run test'
                    }),
                    testOutput && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-2 rounded-md bg-slate-50 p-2.5 text-sm text-slate-800 whitespace-pre-wrap",
                        children: testOutput
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-4 rounded-lg border border-slate-200 p-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium uppercase tracking-wide text-slate-500",
                                children: "Knowledge Base (RAG)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs text-slate-500",
                                children: ragCount !== null ? `${ragCount} chunks indexed` : 'Loading…'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-xs text-slate-600 mb-2.5 leading-relaxed",
                        children: [
                            "Build a local vector index of your question bank. When offline, the AI retrieves relevant chunks before answering — dramatically improving accuracy on medical Q&A. Uses",
                            ' ',
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                className: "bg-slate-100 px-1 rounded",
                                children: "all-MiniLM-L6-v2"
                            }),
                            ' ',
                            "(~23 MB, downloaded once)."
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: handleIndexQuestionBank,
                                disabled: ragIndexing,
                                className: "rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                                children: ragIndexing ? 'Indexing…' : 'Index Question Bank'
                            }),
                            ragCount !== null && ragCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: handleClearRag,
                                disabled: ragIndexing,
                                className: "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50",
                                children: "Clear Index"
                            })
                        ]
                    }),
                    ragProgress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-1.5 rounded-full bg-slate-200 overflow-hidden",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-full bg-blue-600 transition-all",
                                    style: {
                                        width: `${ragProgress.total > 0 ? ragProgress.done / ragProgress.total * 100 : 0}%`
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "mt-1 text-[11px] text-slate-500",
                                children: [
                                    ragProgress.done,
                                    " / ",
                                    ragProgress.total,
                                    " chunks embedded"
                                ]
                            })
                        ]
                    }),
                    ragStatus && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "mt-2 text-xs text-slate-700",
                        children: ragStatus
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("details", {
                className: "mt-4 text-xs text-slate-600",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("summary", {
                        className: "cursor-pointer font-medium text-slate-700",
                        children: "How this works"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-2 space-y-1.5 leading-relaxed",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        children: "Opt-in only."
                                    }),
                                    ' No model is downloaded until you pick one from the list above and click "Download". You can ignore this section entirely if you don\'t need offline AI.'
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                children: [
                                    "• The app probes for ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        children: "WebGPU"
                                    }),
                                    " on first load. If available (Chrome 113+, Edge 113+, Safari 17+), it uses",
                                    ' ',
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                        className: "bg-slate-100 px-1 rounded",
                                        children: "web-llm"
                                    }),
                                    " to run models on the GPU — 10–50\xd7 faster than CPU."
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                children: [
                                    "• If no GPU is available, it falls back to",
                                    ' ',
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                        className: "bg-slate-100 px-1 rounded",
                                        children: "wllama"
                                    }),
                                    " — a WebAssembly port of llama.cpp that runs on pure CPU."
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                children: "• The model file (400 MB – 2.6 GB depending on size) is downloaded once and cached in your browser for future offline use. You can switch models at any time — the old one is unloaded and the new one is downloaded on demand."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                children: '• When you go offline AND a model is loaded, the app automatically routes AI requests (chat, exam generation, term lookup, performance analysis) to this local model and shows a "less accurate" warning banner. If no model is loaded, AI features simply won\'t work offline.'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                children: [
                                    "• On GPU: try ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        children: "Llama 3.2 3B"
                                    }),
                                    " or",
                                    ' ',
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        children: "Qwen2.5 3B"
                                    }),
                                    " for best quality (~25–30 tok/s). On CPU: stick with ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        children: "Qwen2.5 0.5B"
                                    }),
                                    " (~8 tok/s)."
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (OfflineAIManager)));


/***/ }),

/***/ 49260:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Share)
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
    name: "share",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 2v13",
                key: "1km8f5"
            }
        ],
        [
            "path",
            {
                d: "m16 6-4-4-4 4",
                key: "13yo43"
            }
        ],
        [
            "path",
            {
                d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
                key: "1b2hhj"
            }
        ]
    ]
};
__iconData.node;
const Share = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=share.mjs.map


/***/ }),

/***/ 51128:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Link2)
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
    name: "link-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M9 17H7A5 5 0 0 1 7 7h2",
                key: "8i5ue5"
            }
        ],
        [
            "path",
            {
                d: "M15 7h2a5 5 0 1 1 0 10h-2",
                key: "1b9ql8"
            }
        ],
        [
            "line",
            {
                x1: "8",
                x2: "16",
                y1: "12",
                y2: "12",
                key: "1jonct"
            }
        ]
    ]
};
__iconData.node;
const Link2 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=link-2.mjs.map


/***/ }),

/***/ 53646:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowUpFromLine)
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
    name: "arrow-up-from-line",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m18 9-6-6-6 6",
                key: "kcunyi"
            }
        ],
        [
            "path",
            {
                d: "M12 3v14",
                key: "7cf3v8"
            }
        ],
        [
            "path",
            {
                d: "M5 21h14",
                key: "11awu3"
            }
        ]
    ]
};
__iconData.node;
const ArrowUpFromLine = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-up-from-line.mjs.map


/***/ }),

/***/ 54311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rc: () => (/* binding */ useOfflineAI)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _lib_offline_ai_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7626);
/* harmony import */ var _lib_offline_ai_gpu_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10463);
/* harmony import */ var _lib_offline_ai_dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10885);
/* __next_internal_client_entry_do_not_use__ useOfflineAI,DEFAULT_OFFLINE_MODEL_ID,DEFAULT_GPU_MODEL_ID auto */ /**
 * useOfflineAI — React hook for offline LLM inference.
 *
 * Auto-detects GPU capability on mount. If WebGPU is available, shows GPU
 * models (web-llm, MLC .bin files). Otherwise shows CPU models (wllama,
 * GGUF files). Both backends share the same chat interface.
 *
 * Exposes:
 *   - backend: 'gpu' | 'cpu' | null (null while detecting)
 *   - models: OfflineModel[] (GPU or CPU catalog based on detected backend)
 *   - status / downloadProgress / statusText
 *   - selectedModel / selectModel / download / chat
 *   - isOnline / shouldUseOfflineAI
 *
 * NO auto-download. The user must explicitly pick a model and click
 * "Download" in the settings UI. This respects users who don't want
 * offline AI or want to choose a different model than the default.
 * Previous selection is restored from localStorage on mount (without
 * downloading).
 */ 



const STORAGE_KEY = 'medq.offline-ai.model-id';
const BACKEND_STORAGE_KEY = 'medq.offline-ai.backend';
// ── Implementation ──────────────────────────────────────────────────────────
function useOfflineAI() {
    const [backend, setBackend] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [selectedModelId, setSelectedModelId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle');
    const [downloadProgress, setDownloadProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const [statusText, setStatusText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [isOnline, setIsOnline] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [engineReady, setEngineReady] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    // ── Detect backend on mount ──────────────────────────────────────────────
    // NOTE: We do NOT auto-select a default model. The user must explicitly
    // pick one from the catalog and click "Download". This avoids auto-
    // downloading a 400MB+ file on first visit.
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        let cancelled = false;
        (0,_lib_offline_ai_dispatcher__WEBPACK_IMPORTED_MODULE_3__/* .detectBackend */ .kS)().then((b)=>{
            if (cancelled) return;
            setBackend(b);
            // Persist backend so we can validate the stored model id is compatible.
            try {
                localStorage.setItem(BACKEND_STORAGE_KEY, b);
            } catch  {
            /* ignore */ }
            // Restore previously-selected model from localStorage (if any).
            // We do NOT auto-pick a default — the user must opt in.
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (!stored) {
                    // First visit: no model selected. UI will show the catalog with
                    // a "Choose a model to enable offline AI" prompt.
                    return;
                }
                // Validate stored model exists in the active backend's catalog.
                // If the backend changed (e.g. GPU plugged in), the stored CPU model
                // id won't be in the GPU catalog — in that case we clear the
                // selection rather than silently switching models.
                const isValid = b === 'gpu' && !!(0,_lib_offline_ai_gpu_models__WEBPACK_IMPORTED_MODULE_2__/* .getGpuModel */ .QV)(stored) || b === 'cpu' && !!(0,_lib_offline_ai_models__WEBPACK_IMPORTED_MODULE_1__/* .getOfflineModel */ .r0)(stored);
                if (isValid) {
                    setSelectedModelId(stored);
                }
            // else: leave selectedModelId null — user must pick a new model.
            } catch  {
            /* localStorage may be unavailable in private mode */ }
        });
        return ()=>{
            cancelled = true;
        };
    }, []);
    // ── Online / offline detection ──────────────────────────────────────────
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const update = ()=>setIsOnline(navigator.onLine);
        update();
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        return ()=>{
            window.removeEventListener('online', update);
            window.removeEventListener('offline', update);
        };
    }, []);
    // ── Sync engine status → React state (poll) ──────────────────────────────
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const tick = setInterval(()=>{
            const engStatus =  true && window.__offlineAIEngineStatus || 'idle';
            setEngineReady(engStatus === 'ready');
        }, 500);
        return ()=>clearInterval(tick);
    }, []);
    // NOTE: No auto-prefetch. The user must explicitly click "Download" in the
    // settings UI to fetch a model. This prevents auto-downloading a 400MB+
    // file on first visit, and respects users who don't want offline AI or
    // want to choose a different model than the default.
    const models = backend === 'gpu' ? _lib_offline_ai_gpu_models__WEBPACK_IMPORTED_MODULE_2__/* .GPU_MODELS */ .OG : backend === 'cpu' ? _lib_offline_ai_models__WEBPACK_IMPORTED_MODULE_1__/* .OFFLINE_MODELS */ .N$ : [];
    const selectedModel = selectedModelId ? (backend === 'gpu' ? (0,_lib_offline_ai_gpu_models__WEBPACK_IMPORTED_MODULE_2__/* .getGpuModel */ .QV)(selectedModelId) : (0,_lib_offline_ai_models__WEBPACK_IMPORTED_MODULE_1__/* .getOfflineModel */ .r0)(selectedModelId)) ?? null : null;
    // ── Actions ─────────────────────────────────────────────────────────────
    const selectModel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((modelId)=>{
        // Validate against whichever backend is active (or both if still detecting)
        const inCpu = !!(0,_lib_offline_ai_models__WEBPACK_IMPORTED_MODULE_1__/* .getOfflineModel */ .r0)(modelId);
        const inGpu = !!(0,_lib_offline_ai_gpu_models__WEBPACK_IMPORTED_MODULE_2__/* .getGpuModel */ .QV)(modelId);
        if (!inCpu && !inGpu) return;
        try {
            localStorage.setItem(STORAGE_KEY, modelId);
        } catch  {
        /* ignore */ }
        setSelectedModelId(modelId);
        // Reset download state — user must click "Download" again to fetch the
        // newly selected model. We do NOT auto-download on selection.
        setStatus('idle');
        setDownloadProgress(0);
        setEngineReady(false);
    }, []);
    const download = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        if (!selectedModel) {
            setStatusText('No model selected');
            return;
        }
        if ((0,_lib_offline_ai_dispatcher__WEBPACK_IMPORTED_MODULE_3__/* .isModelLoaded */ .R1)(selectedModel.id)) {
            setStatus('ready');
            setDownloadProgress(1);
            setStatusText(`${selectedModel.name} ready`);
            return;
        }
        setStatus('downloading');
        setStatusText(`Starting download for ${selectedModel.name}…`);
        try {
            await (0,_lib_offline_ai_dispatcher__WEBPACK_IMPORTED_MODULE_3__/* .loadModel */ .cm)(selectedModel, (p)=>{
                setDownloadProgress(p.downloadProgress);
                setStatusText(p.status);
                setStatus(p.stage === 'ready' ? 'ready' : p.stage === 'loading-model' ? 'loading' : 'downloading');
                if (true) {
                    window.__offlineAIEngineStatus = p.stage;
                }
            });
            setStatus('ready');
            setEngineReady(true);
            if (true) {
                window.__offlineAIEngineStatus = 'ready';
            }
        } catch (err) {
            console.error('[offline-ai] load failed:', err);
            setStatus('failed');
            setStatusText(err instanceof Error ? `Failed: ${err.message}` : 'Download failed');
            if (true) {
                window.__offlineAIEngineStatus = 'failed';
            }
        }
    }, [
        selectedModel
    ]);
    const chat = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (messages, opts)=>{
        if (!selectedModel) {
            throw new Error('No offline model selected');
        }
        if (!(0,_lib_offline_ai_dispatcher__WEBPACK_IMPORTED_MODULE_3__/* .isModelLoaded */ .R1)(selectedModel.id)) {
            throw new Error('Offline model not loaded');
        }
        return (0,_lib_offline_ai_dispatcher__WEBPACK_IMPORTED_MODULE_3__/* .chat */ .TE)(messages, {
            temperature: opts?.temperature ?? selectedModel.temperature,
            topP: opts?.topP ?? selectedModel.topP,
            maxTokens: opts?.maxTokens,
            onToken: opts?.onToken,
            signal: opts?.signal
        });
    }, [
        selectedModel
    ]);
    const shouldUseOfflineAI = !isOnline && engineReady;
    return {
        models,
        backend,
        selectedModel,
        isReady: engineReady,
        status,
        downloadProgress,
        statusText,
        isOnline,
        shouldUseOfflineAI,
        selectModel,
        download,
        chat
    };
}
// ── Convenience: default model ids for first-time users ─────────────────────



/***/ }),

/***/ 56395:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AudioWaveform)
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
    name: "audio-waveform",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",
                key: "57tc96"
            }
        ]
    ]
};
__iconData.node;
const AudioWaveform = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=audio-waveform.mjs.map


/***/ }),

/***/ 65342:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronsUpDown)
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
    name: "chevrons-up-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m7 15 5 5 5-5",
                key: "1hf1tw"
            }
        ],
        [
            "path",
            {
                d: "m7 9 5-5 5 5",
                key: "sgt6xg"
            }
        ]
    ]
};
__iconData.node;
const ChevronsUpDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=chevrons-up-down.mjs.map


/***/ }),

/***/ 70872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bc: () => (/* binding */ TooltipProvider),
/* harmony export */   ZI: () => (/* binding */ TooltipContent),
/* harmony export */   k$: () => (/* binding */ TooltipTrigger),
/* harmony export */   m_: () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3683);
/* harmony import */ var _base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97615);
/* harmony import */ var _base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33535);
/* harmony import */ var _base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15383);
/* harmony import */ var _base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93295);
/* harmony import */ var _base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57991);
/* harmony import */ var _base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(57353);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Tooltip,TooltipTrigger,TooltipContent,TooltipProvider auto */ 


function TooltipProvider({ delay = 0, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__/* .TooltipProvider */ .B, {
        "data-slot": "tooltip-provider",
        delay: delay,
        ...props
    });
}
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_2__/* .TooltipRoot */ .s, {
        "data-slot": "tooltip",
        ...props
    });
}
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_3__/* .TooltipTrigger */ .k, {
        "data-slot": "tooltip-trigger",
        ...props
    });
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipPortal */ .K, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipPositioner */ .o, {
            align: align,
            alignOffset: alignOffset,
            side: side,
            sideOffset: sideOffset,
            className: "isolate z-50",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_6__/* .TooltipPopup */ .o, {
                "data-slot": "tooltip-content",
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)("z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_8__/* .TooltipArrow */ .P, {
                        className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5"
                    })
                ]
            })
        })
    });
}



/***/ }),

/***/ 72943:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ModelEditDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92571);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66609);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33807);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21767);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42763);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * ModelEditDialog — add or edit one model entry in a provider's curated
 * catalog (freellmapi add-model-dialog pattern: id, name, capability
 * switches in bordered tiles, context window).
 *
 * This is where "the model I add" gets its metadata — and thanks to the
 * catalog fix, it immediately shows up in every ModelPicker.
 */ 







function ModelEditDialog({ open, onClose, model, providerName, existingIds, onSave }) {
    const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [vision, setVision] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [tools, setTools] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [streaming, setStreaming] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [contextWindow, setContextWindow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (open) {
            setId(model?.id ?? '');
            setName(model?.name ?? '');
            setVision(model?.capabilities?.vision ?? false);
            setTools(model?.capabilities?.tools ?? true);
            setStreaming(model?.capabilities?.streaming ?? true);
            setContextWindow(model?.contextWindow ? String(model.contextWindow) : '');
            setSaving(false);
        }
    }, [
        open,
        model
    ]);
    const idTaken = id.trim() && !model && existingIds.includes(id.trim());
    const save = ()=>{
        if (!id.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Model ID is required (e.g. gpt-4o, llama3.3:70b)');
            return;
        }
        if (idTaken) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('A model with this ID already exists on this provider');
            return;
        }
        setSaving(true);
        onSave({
            id: id.trim(),
            name: name.trim() || id.trim(),
            capabilities: {
                vision,
                tools,
                streaming
            },
            ...contextWindow.trim() && Number(contextWindow) > 0 ? {
                contextWindow: Number(contextWindow)
            } : {}
        });
        setSaving(false);
        onClose();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: (o)=>{
            if (!o) onClose();
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogContent */ .Cf, {
            className: "max-w-md bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pt-5 pb-3 space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogTitle */ .L3, {
                            className: "text-sm font-bold text-[#e8ecf4]",
                            children: [
                                model ? 'Edit model' : 'Add model',
                                " \xb7 ",
                                providerName
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogDescription */ .rr, {
                            className: "text-[10px] text-[#8b95a8] leading-relaxed",
                            children: "The model becomes available in every model picker across the app — question explanations, tutor, generation."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 pb-5 space-y-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: "Model ID"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                    value: id,
                                    onChange: (e)=>setId(e.target.value),
                                    disabled: !!model,
                                    placeholder: "meta-llama/llama-3.3-70b-instruct",
                                    className: "h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg disabled:opacity-60"
                                }),
                                idTaken && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[9px] text-[#ff5757]",
                                    children: "This ID is already on this provider."
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[9px] text-[#5a6478]",
                                    children: "Exactly as the API expects it in the `model` field."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: [
                                        "Display name ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#5a6478] font-normal",
                                            children: "(optional)"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    placeholder: "Llama 3.3 70B",
                                    className: "h-9 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                    className: "text-[10px] font-semibold text-[#8b95a8]",
                                    children: [
                                        "Context window ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#5a6478] font-normal",
                                            children: "(tokens, optional)"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                    value: contextWindow,
                                    onChange: (e)=>setContextWindow(e.target.value.replace(/[^0-9]/g, '')),
                                    placeholder: "128000",
                                    className: "h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid grid-cols-3 gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CapabilityTile, {
                                    label: "Vision",
                                    hint: "accepts images",
                                    checked: vision,
                                    onChange: setVision
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CapabilityTile, {
                                    label: "Tools",
                                    hint: "function calling",
                                    checked: tools,
                                    onChange: setTools
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CapabilityTile, {
                                    label: "Stream",
                                    hint: "token streaming",
                                    checked: streaming,
                                    onChange: setStreaming
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 pt-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    onClick: save,
                                    disabled: saving,
                                    className: "h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg",
                                    children: [
                                        saving && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                            className: "size-3.5 animate-spin"
                                        }),
                                        model ? 'Save model' : 'Add model'
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: onClose,
                                    className: "h-8 px-3 ml-auto text-[11px] text-[#5a6478] hover:text-[#e8ecf4] rounded-lg",
                                    children: "Cancel"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
function CapabilityTile({ label, hint, checked, onChange }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        className: "flex flex-col gap-1.5 rounded-xl border border-white/[0.06] bg-[#08090f]/60 p-2.5 cursor-pointer hover:border-white/[0.12] transition-colors",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] font-semibold text-[#e8ecf4]",
                        children: label
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_6__/* .Switch */ .d, {
                        checked: checked,
                        onCheckedChange: onChange,
                        className: "scale-[0.7]"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-[9px] text-[#5a6478]",
                children: hint
            })
        ]
    });
}


/***/ }),

/***/ 75632:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ InstallModal)
/* harmony export */ });
/* unused harmony export useInstallModal */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49260);
/* harmony import */ var _barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(48203);
/* harmony import */ var _barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(95000);
/* __next_internal_client_entry_do_not_use__ default,useInstallModal auto */ 


/**
 * InstallModal — full-screen modal that shows platform-specific install
 * instructions. Used by:
 *   - SettingsDialog → "Install App" button
 *   - InstallPrompt → iOS automatic prompt (3s after page load)
 *
 * The modal is self-contained — no external chunks, works even when most
 * of the app fails to load.
 */ function InstallModal({ open, onClose, instructions, installing }) {
    if (!open) return null;
    const isIOS = instructions.platform === 'ios';
    const isInstalled = instructions.platform === 'installed';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in",
        onClick: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-full sm:max-w-md bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-start justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                                    children: isInstalled ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                        className: "w-5 h-5 text-[#00e5a0]"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                        className: "w-5 h-5 text-[#00e5a0]"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                    className: "text-base font-bold text-[#e8ecf4]",
                                    children: instructions.heading
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onClose,
                            className: "text-[#3a4055] hover:text-[#8b95a8] transition-colors",
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-5 h-5"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-[#8b95a8] mb-5 leading-relaxed",
                    children: instructions.intro
                }),
                installing && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mb-4 p-3 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-4 h-4 border-2 border-[#00e5a0] border-t-transparent rounded-full animate-spin"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs text-[#00e5a0] font-medium",
                            children: "Waiting for you to confirm in the browser dialog…"
                        })
                    ]
                }),
                instructions.steps.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ol", {
                    className: "space-y-3 mb-5",
                    children: instructions.steps.map((step, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center mt-0.5",
                                    children: i + 1
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm text-[#e8ecf4] font-medium",
                                            children: step.title
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6478] mt-0.5 leading-relaxed",
                                            children: step.detail
                                        }),
                                        isIOS && i === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#00e5a0] mt-1.5"
                                        }),
                                        isIOS && i === 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#00e5a0] mt-1.5"
                                        })
                                    ]
                                })
                            ]
                        }, i))
                }),
                isInstalled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mb-5 p-4 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 mb-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Download_PlusSquare_Share_Smartphone_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#00e5a0]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-sm font-semibold text-[#00e5a0]",
                                    children: "Installed & Running"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs text-[#8b95a8]",
                            children: "You're using the installed PWA right now. Look for the MedQ icon on your Home Screen or app drawer to launch it directly next time."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                        !isInstalled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "/sw-debug",
                            className: "flex-1 px-4 py-2.5 rounded-xl border border-white/[0.06] text-[#8b95a8] text-xs font-medium hover:bg-white/[0.04] transition-colors text-center",
                            children: "Debug SW"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onClose,
                            className: "flex-1 px-4 py-2.5 rounded-xl bg-[#00e5a0] text-[#0c0e14] text-sm font-bold hover:bg-[#00e5a0]/90 transition-colors",
                            children: isInstalled ? 'Close' : 'Got it'
                        })
                    ]
                }),
                !isInstalled && instructions.platform === 'chromium' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-[10px] text-[#5a6478] mt-3 text-center leading-relaxed",
                    children: "Tip: If you dismissed the install prompt before, Chrome won't show it again automatically. Use the browser menu (⋮) → “Install MedQ”          instead."
                })
            ]
        })
    });
}
/** Convenience hook to drive the modal from a button */ function useInstallModal() {
    const [open, setOpen] = useState(false);
    return {
        open,
        openModal: ()=>setOpen(true),
        closeModal: ()=>setOpen(false)
    };
}


/***/ }),

/***/ 81951:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ usePushNotifications)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ usePushNotifications auto */ /**
 * usePushNotifications — manage Web Push subscription lifecycle.
 *
 * Responsibilities:
 *   1. Detect push support + permission state + embedding context
 *   2. Fetch the VAPID public key from /api/push/vapid-public
 *   3. Subscribe via serviceWorkerRegistration.pushManager.subscribe()
 *   4. POST the subscription to /api/push/subscribe
 *   5. On disable: unsubscribe the browser + POST to /api/push/unsubscribe
 *
 * Usage:
 *   const {
 *     supported,          // boolean — browser supports push + service workers
 *     unavailableReason,  // null | 'browser' | 'iframe'
 *     permission,         // 'default' | 'granted' | 'denied'
 *     subscribed,         // boolean — we have an active subscription
 *     enabled,            // boolean — user's intent (persisted in localStorage)
 *     enable,             // () => Promise<{ ok: boolean; error?: string }>
 *     disable,            // () => Promise<void>
 *   } = usePushNotifications();
 *
 * The hook is SSR-safe — it returns disabled states during SSR and
 * initializes on mount.
 *
 * ─── WHY THE EMBEDDING CONTEXT MATTERS (2026-10-22 fixes) ────────────────
 * (1) The "Working…" hang fix: this hook used to ignore the embedding
 * context — when a user in a no-SW context toggled "System Push
 * Notifications" ON, the flow awaited `navigator.serviceWorker.ready`, a
 * promise that NEVER resolves when no SW is registered on the origin, and
 * the Settings toggle spun forever (reported by the user in production).
 * detectUnavailableContext() now marks push unavailable up-front in no-SW
 * contexts (honest message, toggle disabled, enable() refuses immediately),
 * and withTimeout() races the two hangable promises (`serviceWorker.ready`,
 * `pushManager.subscribe`) so the spinner can never stick.
 *
 * (2) The preview-domain gate REMOVAL (sw.js v21): ServiceWorkerRegistrar
 * now REGISTERS the service worker at the top level of preview hostnames
 * (preview-chat-*.space-z.ai) — offline study there is the whole point of
 * the v21 port. The old hostname gate in this hook ("Not available on
 * preview domains") is therefore stale: the SW exists, `ready` resolves,
 * and `pushManager.subscribe` works over HTTPS. Only the IFRAME gate
 * remains — registration is genuinely skipped inside iframes, and
 * Notification.requestPermission in a cross-origin preview iframe without
 * a permissions policy is auto-denied by browsers anyway.
 */ 
const ENABLED_KEY = 'medq-push-enabled';
// `navigator.serviceWorker.ready` hangs forever when no SW is registered on
// the origin — never wait longer than this for it.
const SW_READY_TIMEOUT_MS = 15000;
// pushManager.subscribe can also stall (permission edge-cases, push service
// hiccup) without rejecting. Empirically measured: some push services take
// ~61s to acknowledge a subscribe (this repo's test Chrome talks to FCM
// "preprod", for example) even though the subscription works fine once
// created — so keep a generous cap. The busy spinner shows real work in
// progress; the point of the guard is that it ALWAYS settles, not that it
// settles fast.
const SUBSCRIBE_TIMEOUT_MS = 90000;
// base64url → Uint8Array (for applicationServerKey parameter).
// Typed as Uint8Array<ArrayBuffer> so it satisfies BufferSource under TS 5.7+
// (a plain `new Uint8Array(n)` infers ArrayBufferLike, which is not
// assignable to pushManager.subscribe's applicationServerKey).
function urlBase64ToUint8Array(base64Url) {
    const padding = '='.repeat((4 - base64Url.length % 4) % 4);
    const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = typeof atob !== 'undefined' ? atob(base64) : '';
    const bytes = new Uint8Array(new ArrayBuffer(raw.length));
    for(let i = 0; i < raw.length; i++)bytes[i] = raw.charCodeAt(i);
    return bytes;
}
/**
 * Detect embedding contexts where system push can never work because the
 * service worker is intentionally NOT registered (see ServiceWorkerRegistrar):
 *   - inside any iframe (e.g. the preview-chat-* wrapper used by the IM
 *     gateway)
 * Preview HOSTNAMES are no longer gated here — since sw.js v21 the
 * registrar registers the SW at the top level of preview domains too
 * (offline + push both work there over HTTPS).
 */ function detectUnavailableContext() {
    if (false) {}
    try {
        if (window.self !== window.top) return 'iframe';
    } catch  {
        // Cross-origin iframe — window.top access throws.
        return 'iframe';
    }
    return null;
}
function contextErrorMessage(reason) {
    switch(reason){
        case 'iframe':
            return 'System push is not available inside the preview frame — open the app in a standalone browser tab';
        default:
            return 'Push not supported in this browser';
    }
}
/** Race a promise against a timeout so a hung step rejects instead of blocking the UI forever. */ function withTimeout(promise, ms, label) {
    return Promise.race([
        promise,
        new Promise((_, reject)=>{
            setTimeout(()=>reject(new Error(`${label} timed out after ${Math.round(ms / 1000)}s`)), ms);
        })
    ]);
}
function usePushNotifications() {
    const [supported, setSupported] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [unavailableReason, setUnavailableReason] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [permission, setPermission] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('unknown');
    const [subscribed, setSubscribed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [enabled, setEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (false) {}
        // Embedding context first — in iframes / preview hostnames no service
        // worker will ever exist, so bail before touching pushManager at all.
        const ctx = detectUnavailableContext();
        if (ctx) {
            setSupported(false);
            setUnavailableReason(ctx);
            // Still surface the browser permission state so the Settings copy can
            // be honest if the user already granted/denied notifications.
            try {
                if ('Notification' in window) setPermission(Notification.permission);
            } catch  {}
            // Never claim an active subscription in a no-SW context, even if
            // localStorage carried a stale 'true' from another origin (it can't —
            // localStorage is per-origin — but belt-and-braces).
            try {
                localStorage.removeItem(ENABLED_KEY);
            } catch  {}
            return;
        }
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            setSupported(false);
            setUnavailableReason('browser');
            return;
        }
        setSupported(true);
        setUnavailableReason(null);
        setPermission(Notification.permission);
        // Load enabled flag from localStorage
        try {
            setEnabled(localStorage.getItem(ENABLED_KEY) === 'true');
        } catch  {
        // localStorage may be unavailable in private mode
        }
        // Check if we already have an active subscription
        (async ()=>{
            try {
                const reg = await withTimeout(navigator.serviceWorker.ready, SW_READY_TIMEOUT_MS, 'service worker startup');
                const existing = await reg.pushManager.getSubscription();
                setSubscribed(!!existing);
            } catch  {
            // SW not ready yet (or never) — leave subscribed=false
            }
        })();
        // Listen for SW messages (push-received → could update UI badge)
        const handleMessage = (event)=>{
            if (event.data?.type === 'medq:push-received') {
            // Could trigger a toast here; for now we just refresh the bell count
            // via the existing useNotificationStream hook.
            }
        };
        navigator.serviceWorker.addEventListener('message', handleMessage);
        return ()=>navigator.serviceWorker.removeEventListener('message', handleMessage);
    }, []);
    const enable = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        // Refuse immediately in contexts where no service worker can exist —
        // previously this flowed into `navigator.serviceWorker.ready` and hung
        // forever, leaving the Settings spinner stuck on "Working…".
        const ctx = detectUnavailableContext();
        if (ctx) {
            setSupported(false);
            setUnavailableReason(ctx);
            return {
                ok: false,
                error: contextErrorMessage(ctx)
            };
        }
        if (!supported) return {
            ok: false,
            error: 'Push not supported in this browser'
        };
        // 1. Request notification permission
        if (Notification.permission === 'default') {
            const perm = await Notification.requestPermission();
            setPermission(perm);
            if (perm !== 'granted') {
                return {
                    ok: false,
                    error: 'Notification permission denied'
                };
            }
        } else if (Notification.permission === 'denied') {
            setPermission('denied');
            return {
                ok: false,
                error: 'Notifications are blocked in browser settings'
            };
        }
        try {
            // 2. Fetch VAPID public key
            const vapidRes = await fetch('/api/push/vapid-public');
            if (!vapidRes.ok) {
                return {
                    ok: false,
                    error: 'Push not configured on server'
                };
            }
            const { publicKey, enabled: serverEnabled } = await vapidRes.json();
            if (!serverEnabled || !publicKey) {
                return {
                    ok: false,
                    error: 'Push not configured on server'
                };
            }
            // 3. Subscribe via pushManager (timeout-guarded — `ready` never
            //    resolves when no SW is registered on the origin)
            const reg = await withTimeout(navigator.serviceWorker.ready, SW_READY_TIMEOUT_MS, 'Service worker not ready — reload the page and try again');
            const sub = await withTimeout(reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            }), SUBSCRIBE_TIMEOUT_MS, 'Push subscription');
            // 4. Persist to server
            const subJSON = sub.toJSON();
            const subscribeRes = await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    endpoint: subJSON.endpoint,
                    keys: subJSON.keys,
                    userAgent: navigator.userAgent
                })
            });
            if (!subscribeRes.ok) {
                return {
                    ok: false,
                    error: 'Failed to register subscription with server'
                };
            }
            setSubscribed(true);
            setEnabled(true);
            try {
                localStorage.setItem(ENABLED_KEY, 'true');
            } catch  {}
            return {
                ok: true
            };
        } catch (err) {
            return {
                ok: false,
                error: err?.message || 'Failed to subscribe'
            };
        }
    }, [
        supported
    ]);
    const disable = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        const ctx = detectUnavailableContext();
        if (!ctx) {
            try {
                const reg = await withTimeout(navigator.serviceWorker.ready, SW_READY_TIMEOUT_MS, 'service worker startup');
                const sub = await reg.pushManager.getSubscription();
                if (sub) {
                    const endpoint = sub.endpoint;
                    await sub.unsubscribe();
                    // Best-effort server cleanup
                    await fetch('/api/push/unsubscribe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            endpoint
                        })
                    }).catch(()=>{});
                }
            } catch  {
            // ignore
            }
        }
        setSubscribed(false);
        setEnabled(false);
        try {
            localStorage.setItem(ENABLED_KEY, 'false');
        } catch  {}
    }, []);
    return {
        supported,
        unavailableReason,
        permission,
        subscribed,
        enabled,
        enable,
        disable
    };
}


/***/ }),

/***/ 82215:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ProviderList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(81499);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(19707);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(38158);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(19805);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(97804);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(18986);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(35484);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(50981);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(34018);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21767);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(70872);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50694);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(96231);
/* harmony import */ var _useByokData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(96682);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * ProviderList — the FreeLLMAPI-style provider/key management surface.
 *
 * Patterns ported from freellmapi's provider-list.tsx:
 *   - toolbar: search + status SegmentedControl + provider/key counts
 *   - provider cards grouped per provider, collapsible (auto-expand on
 *     search / issues / small groups, remembered per group)
 *   - key rows: status dot, masked key (mono), label, baseUrl, model-count
 *     badge, relative verified time, HOVER-revealed action cluster
 *     (test / discover / edit / delete with arm-then-fire confirm)
 *   - model chips sub-panel per provider (the models the user added),
 *     with capability chips and inline delete
 *   - empty + loading states
 */ 








function ProviderList(props) {
    const { keys, loading } = props;
    const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [statusFilter, setStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [collapsed, setCollapsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const groups = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_useByokData__WEBPACK_IMPORTED_MODULE_7__/* .groupKeysByProvider */ .a)(keys, _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_5__/* .BYOK_PROVIDERS */ .ln), [
        keys
    ]);
    const keyStatusOf = (k)=>{
        const t = props.testResults[k.id];
        return (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .keyStatus */ .c4)({
            enabled: k.enabled,
            lastVerifiedAt: k.lastVerifiedAt,
            lastTestError: t ? t.ok ? null : t.error || 'failed' : null
        });
    };
    const matchesSearch = (g, q)=>{
        if (!q) return true;
        const lq = q.toLowerCase();
        if (g.provider.name.toLowerCase().includes(lq) || g.provider.id.includes(lq)) return true;
        return g.keys.some((k)=>(k.label ?? '').toLowerCase().includes(lq) || k.maskedKey.toLowerCase().includes(lq) || (k.baseUrl ?? '').toLowerCase().includes(lq));
    };
    const groupPassesFilter = (g)=>{
        if (statusFilter === 'all') return true;
        return g.keys.some((k)=>{
            const s = keyStatusOf(k);
            if (statusFilter === 'healthy') return s === 'healthy';
            if (statusFilter === 'issues') return s === 'error' || s === 'stale';
            if (statusFilter === 'disabled') return s === 'disabled';
            return true;
        });
    };
    const visibleGroups = groups.filter((g)=>matchesSearch(g, search) && groupPassesFilter(g));
    const visibleKeyCount = visibleGroups.reduce((n, g)=>n + g.keys.length, 0);
    const isExpanded = (providerId, keyCount, hasIssues)=>{
        if (search) return true; // auto-expand matches while searching
        if (collapsed[providerId] != null) return !collapsed[providerId];
        return hasIssues || keyCount <= 3; // default: expand small/problem groups
    };
    if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "space-y-2.5",
            children: [
                0,
                1,
                2
            ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] h-16 animate-pulse"
                }, i))
        });
    }
    if (!keys.length) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center space-y-3",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "mx-auto size-10 rounded-full bg-[#00e5a0]/[0.06] border border-[#00e5a0]/15 flex items-center justify-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                        className: "size-4.5 text-[#00e5a0]"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs font-semibold text-[#e8ecf4]",
                            children: "No providers yet"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[10px] text-[#8b95a8] max-w-xs mx-auto leading-relaxed",
                            children: "Add an API key for any provider — OpenAI, Anthropic, Gemini, Ollama, or any OpenAI-compatible endpoint. Keys are encrypted (AES-256-GCM) and sync across devices."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    onClick: ()=>props.onAddKey(),
                    className: "inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] text-[11px] font-semibold transition-colors",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: "size-3.5"
                        }),
                        " Add your first key"
                    ]
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipProvider */ .Bc, {
        delay: 250,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-2 flex-wrap",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    className: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6478] pointer-events-none"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_2__/* .Input */ .p, {
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    placeholder: "Search providers, keys, URLs…",
                                    className: "h-8 w-56 pl-8 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .SegmentedControl */ .Iz, {
                            options: [
                                {
                                    value: 'all',
                                    label: 'All'
                                },
                                {
                                    value: 'healthy',
                                    label: 'Healthy'
                                },
                                {
                                    value: 'issues',
                                    label: 'Issues'
                                },
                                {
                                    value: 'disabled',
                                    label: 'Off'
                                }
                            ],
                            value: statusFilter,
                            onChange: setStatusFilter
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "text-[10px] text-[#5a6478] tabular-nums ml-auto",
                            children: [
                                visibleGroups.length,
                                " providers \xb7 ",
                                visibleKeyCount,
                                " keys"
                            ]
                        })
                    ]
                }),
                visibleGroups.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-8 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[11px] text-[#8b95a8]",
                            children: "No providers match the current filters."
                        }),
                        (search || statusFilter !== 'all') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: ()=>{
                                setSearch('');
                                setStatusFilter('all');
                            },
                            className: "mt-2 text-[10px] text-[#00e5a0] hover:underline",
                            children: "Clear filters"
                        })
                    ]
                }),
                visibleGroups.map((g)=>{
                    const models = g.keys.find((k)=>k.modelsConfig?.length)?.modelsConfig ?? null;
                    const statuses = g.keys.map(keyStatusOf);
                    const healthy = statuses.filter((s)=>s === 'healthy').length;
                    const issues = statuses.filter((s)=>s === 'error' || s === 'stale').length;
                    const hasIssues = issues > 0;
                    const expanded = isExpanded(g.provider.id, g.keys.length, hasIssues);
                    const anyEnabled = g.keys.some((k)=>k.enabled);
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl border border-white/[0.06] bg-[#0c0e14] overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2.5 px-3.5 h-12 border-b border-white/[0.04] hover:bg-white/[0.02]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .ProviderAvatar */ .$N, {
                                        provider: g.provider,
                                        size: "sm"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>setCollapsed((c)=>({
                                                    ...c,
                                                    [g.provider.id]: expanded
                                                })),
                                        className: "flex items-center gap-2 min-w-0 flex-1 text-left",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs font-semibold text-[#e8ecf4] truncate",
                                                children: g.provider.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[9px] rounded-full px-1.5 py-px bg-white/[0.06] text-[#8b95a8] border border-white/[0.06] tabular-nums shrink-0",
                                                children: [
                                                    g.keys.length,
                                                    " ",
                                                    g.keys.length === 1 ? 'key' : 'keys'
                                                ]
                                            }),
                                            models && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[9px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15 tabular-nums shrink-0 hidden sm:inline-flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                        className: "size-2.5"
                                                    }),
                                                    " ",
                                                    models.length
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "hidden sm:flex items-center gap-1 text-[9px] text-[#5a6478] shrink-0",
                                                children: [
                                                    healthy > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('size-1.5 rounded-full', _shared__WEBPACK_IMPORTED_MODULE_6__/* .statusDot */ .kg.healthy)
                                                            }),
                                                            healthy
                                                        ]
                                                    }),
                                                    issues > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-0.5 text-[#ff5757]/80",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('size-1.5 rounded-full', _shared__WEBPACK_IMPORTED_MODULE_6__/* .statusDot */ .kg.error)
                                                            }),
                                                            issues
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .Tooltip */ .m_, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipTrigger */ .k$, {
                                                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-1.5 shrink-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] text-[#5a6478] hidden sm:inline",
                                                            children: "use"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_3__/* .Switch */ .d, {
                                                            checked: anyEnabled,
                                                            onCheckedChange: (v)=>{
                                                                // Toggle every key to match the group switch.
                                                                for (const k of g.keys){
                                                                    if (k.enabled !== v) props.onToggle(k, v);
                                                                }
                                                            },
                                                            className: "scale-[0.85]"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipContent */ .ZI, {
                                                side: "top",
                                                className: "text-[10px]",
                                                children: anyEnabled ? 'Disable all endpoints' : 'Enable all endpoints'
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>setCollapsed((c)=>({
                                                    ...c,
                                                    [g.provider.id]: expanded
                                                })),
                                        className: "text-[#5a6478] hover:text-[#e8ecf4] shrink-0",
                                        "aria-label": expanded ? 'Collapse' : 'Expand',
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('size-4 transition-transform', !expanded && '-rotate-90')
                                        })
                                    })
                                ]
                            }),
                            expanded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "divide-y divide-white/[0.04]",
                                children: g.keys.map((k, idx)=>{
                                    const st = keyStatusOf(k);
                                    const busy = props.testingKeyId === k.id || props.discoveringKeyId === k.id;
                                    const lastTest = props.testResults[k.id];
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "group/krow px-3.5 py-2.5 hover:bg-white/[0.02] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .Tooltip */ .m_, {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipTrigger */ .k$, {
                                                                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    "aria-label": _shared__WEBPACK_IMPORTED_MODULE_6__/* .statusLabel */ .Rh[st],
                                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('size-2 rounded-full shrink-0', _shared__WEBPACK_IMPORTED_MODULE_6__/* .statusDot */ .kg[st])
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipContent */ .ZI, {
                                                                side: "top",
                                                                className: "text-[10px]",
                                                                children: [
                                                                    _shared__WEBPACK_IMPORTED_MODULE_6__/* .statusLabel */ .Rh[st],
                                                                    k.lastVerifiedAt ? ` · ${(0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .formatRelativeTime */ .fw)(k.lastVerifiedAt)}` : ''
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    g.keys.length > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex flex-col gap-px shrink-0",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                type: "button",
                                                                disabled: idx === 0,
                                                                onClick: ()=>props.onMove(k, 'up'),
                                                                className: "text-[#5a6478] hover:text-[#e8ecf4] disabled:opacity-0 disabled:pointer-events-none",
                                                                "aria-label": "Move up in failover order",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                                    className: "size-2.5"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                type: "button",
                                                                disabled: idx === g.keys.length - 1,
                                                                onClick: ()=>props.onMove(k, 'down'),
                                                                className: "text-[#5a6478] hover:text-[#e8ecf4] disabled:opacity-0 disabled:pointer-events-none",
                                                                "aria-label": "Move down in failover order",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                                    className: "size-2.5"
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                        className: "text-[10px] font-mono text-[#8b95a8] shrink-0 hidden sm:inline",
                                                        children: k.maskedKey
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        onClick: ()=>props.onEdit(k),
                                                        className: "text-[11px] text-[#e8ecf4]/80 hover:text-[#e8ecf4] hover:underline underline-offset-2 truncate min-w-0",
                                                        children: k.label || /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[#5a6478] italic",
                                                            children: "unlabeled"
                                                        })
                                                    }),
                                                    k.baseUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .Tooltip */ .m_, {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipTrigger */ .k$, {
                                                                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                                    className: "text-[9px] font-mono text-[#5a6478] bg-white/[0.03] border border-white/[0.05] rounded px-1.5 py-px max-w-40 truncate hidden md:inline-block",
                                                                    children: k.baseUrl.replace(/^https?:\/\//, '')
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .TooltipContent */ .ZI, {
                                                                side: "top",
                                                                className: "text-[10px] max-w-64 break-all",
                                                                children: k.baseUrl
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[9px] text-[#5a6478] ml-auto shrink-0 hidden lg:inline tabular-nums",
                                                        children: k.lastVerifiedAt ? (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .formatRelativeTime */ .fw)(k.lastVerifiedAt) : 'never checked'
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-0.5 shrink-0 opacity-0 group-hover/krow:opacity-100 focus-within:opacity-100 transition-opacity",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconButton, {
                                                                title: "Test key",
                                                                onClick: ()=>props.onTest(k),
                                                                disabled: busy,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('size-3', busy && props.testingKeyId === k.id && 'animate-pulse text-[#f5b73d]')
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconButton, {
                                                                title: "Discover models (/models)",
                                                                onClick: ()=>props.onDiscover(k),
                                                                disabled: busy,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('size-3', busy && props.discoveringKeyId === k.id && 'animate-pulse text-[#f5b73d]')
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconButton, {
                                                                title: "Edit endpoint",
                                                                onClick: ()=>props.onEdit(k),
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                                    className: "size-3"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconButton, {
                                                                title: "Add model by hand",
                                                                onClick: ()=>props.onAddModel(g.provider, k),
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                                    className: "size-3"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .ConfirmButton */ .ZF, {
                                                                onConfirm: ()=>props.onDelete(k),
                                                                confirmLabel: "Delete?",
                                                                title: "Delete endpoint",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                                    className: "size-3"
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            lastTest && !lastTest.ok && lastTest.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "mt-1.5 flex items-start gap-1.5 text-[9px] text-[#ff5757]/90 leading-relaxed pl-[4.4rem]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                        className: "size-3 shrink-0 mt-px"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "break-all line-clamp-2",
                                                        children: lastTest.error
                                                    })
                                                ]
                                            }),
                                            k.modelsConfig?.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mt-2 flex flex-wrap gap-1.5 pl-[1.1rem] sm:pl-[4.4rem]",
                                                children: k.modelsConfig.map((m)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "group/chip inline-flex items-center gap-1 text-[9px] rounded-full border border-white/[0.08] bg-white/[0.03] pl-2 pr-1 py-0.5 hover:border-white/[0.16] transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                type: "button",
                                                                onClick: ()=>props.onEditModel(g.provider, k, m),
                                                                className: "font-mono text-[#8b95a8] group-hover/chip:text-[#e8ecf4] transition-colors",
                                                                title: `Edit ${m.id}`,
                                                                children: m.id
                                                            }),
                                                            m.capabilities?.vision && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .CapabilityChip */ .lc, {
                                                                kind: "vision"
                                                            }),
                                                            m.capabilities?.tools && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .CapabilityChip */ .lc, {
                                                                kind: "tools"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared__WEBPACK_IMPORTED_MODULE_6__/* .ContextChip */ .Au, {
                                                                tokens: m.contextWindow
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                type: "button",
                                                                onClick: ()=>props.onDeleteModel(g.provider, k, m.id),
                                                                className: "text-[#5a6478] hover:text-[#ff5757] transition-colors",
                                                                title: `Remove ${m.id}`,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                                    className: "size-2.5"
                                                                })
                                                            })
                                                        ]
                                                    }, m.id))
                                            }) : null
                                        ]
                                    }, k.id);
                                })
                            }),
                            expanded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-3.5 py-2 border-t border-white/[0.04] bg-[#08090f]/60 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "flex items-center gap-1 text-[9px] text-[#5a6478]",
                                        children: anyEnabled ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                    className: "size-3 text-[#00e5a0]/70"
                                                }),
                                                " encrypted \xb7 round-robin failover"
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                    className: "size-3 text-[#5a6478]"
                                                }),
                                                " all endpoints disabled"
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>props.onAddKey(g.provider),
                                        className: "ml-auto inline-flex items-center gap-1 text-[9px] font-semibold text-[#00e5a0] hover:text-[#00d090]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_ChevronDown_CircleAlert_KeyRound_Layers_ListPlus_Pencil_Plus_Search_Shield_ShieldCheck_Trash2_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "size-2.5"
                                            }),
                                            " add endpoint"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, g.provider.id);
                })
            ]
        })
    });
}
function IconButton({ children, title, onClick, disabled }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        title: title,
        "aria-label": title,
        disabled: disabled,
        onClick: onClick,
        className: "inline-flex items-center justify-center size-6 rounded-md text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06] disabled:opacity-40 disabled:pointer-events-none transition-colors",
        children: children
    });
}


/***/ }),

/***/ 95301:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports MEDICAL_DICTIONARY, lookupTerm */
/**
 * Built-in medical term dictionary for interactive tooltips.
 * Maps lowercase terms to brief definitions.
 */ const MEDICAL_DICTIONARY = {
    // Cardiovascular
    'hypertension': 'Persistently elevated blood pressure (≥130/80 mmHg)',
    'angiotensin': 'Peptide hormone that causes vasoconstriction and raises blood pressure',
    'angiotensin ii': 'Potent vasoconstrictor octapeptide; key effector of RAAS',
    'ace': 'Angiotensin-Converting Enzyme; converts Ang I → Ang II',
    'ace inhibitor': 'Drug that blocks ACE → ↓Ang II + ↑bradykinin',
    'beta blocker': 'Drug that antagonizes β-adrenergic receptors → ↓HR, ↓BP',
    'myocardial infarction': 'Irreversible death of heart muscle due to prolonged ischemia',
    'st elevation': 'ECG finding indicating acute full-thickness myocardial injury',
    'atherosclerosis': 'Plaque buildup inside arteries, narrowing the lumen',
    'arrhythmia': 'Abnormal heart rhythm — too fast, too slow, or irregular',
    'heart failure': 'Heart cannot pump enough blood to meet body needs',
    'coronary artery': 'Blood vessel supplying the heart muscle; blockage → MI',
    'myocardium': 'Heart muscle tissue; contracts to pump blood',
    'endocardium': 'Inner lining of the heart chambers and valves',
    'pericardium': 'Double-layered sac surrounding the heart',
    'tachycardia': 'Heart rate >100 bpm; can be sinus, SVT, or ventricular',
    'bradycardia': 'Heart rate <60 bpm; can be normal in athletes or pathological',
    'fibrillation': 'Rapid, irregular contractions of heart muscle fibers',
    'atrial fibrillation': 'Irregular atrial activation → irregular ventricular response, risk of stroke',
    'ventricular fibrillation': 'Fatal arrhythmia; disorganized ventricular contraction → no cardiac output',
    'ecg': 'Electrocardiogram; records electrical activity of the heart',
    'stent': 'Mesh tube placed in artery to keep it open after angioplasty',
    'angioplasty': 'Procedure to widen narrowed arteries using a balloon catheter',
    'thrombosis': 'Formation of a blood clot inside a blood vessel',
    'embolism': 'Blockage of a vessel by a traveling clot, air, or fat',
    'pulmonary embolism': 'Blood clot in pulmonary arteries → dyspnea, pleuritic chest pain',
    'deep vein thrombosis': 'Clot in deep veins, usually legs → swelling, pain, PE risk',
    'dvt': 'Deep Vein Thrombosis; clot in deep veins → PE risk',
    'aorta': 'Largest artery; carries oxygenated blood from left ventricle to body',
    'aortic stenosis': 'Narrowing of aortic valve → ↑afterload, syncope, angina, heart failure',
    'mitral regurgitation': 'Backflow through mitral valve → LA enlargement, AF risk',
    'endocarditis': 'Infection of heart valves; fever, murmur, emboli',
    'pericarditis': 'Inflammation of pericardium; sharp chest pain, friction rub',
    'cardiomyopathy': 'Disease of heart muscle → dysfunction; dilated, hypertrophic, restrictive',
    'ef': 'Ejection Fraction; % of blood ejected per beat (normal ≥55%)',
    // Pharmacology
    'bradykinin': 'Vasodilator peptide; ACE inhibitors increase its levels → cough',
    'renin': 'Enzyme released by kidneys in response to ↓BP; cleaves angiotensinogen',
    'aldosterone': 'Mineralocorticoid: ↑Na⁺ reabsorption, ↑K⁺ excretion in kidneys',
    'vasoconstriction': 'Narrowing of blood vessels → ↑blood pressure',
    'vasodilation': 'Widening of blood vessels → ↓blood pressure',
    'sympathetic': 'Fight-or-flight nervous system: ↑HR, ↑BP, bronchodilation',
    'parasympathetic': 'Rest-and-digest nervous system: ↓HR, ↑digestion',
    'agonist': 'Drug that activates a receptor, mimicking the natural ligand',
    'antagonist': 'Drug that blocks a receptor, preventing the natural ligand action',
    'competitive antagonism': 'Reversible receptor blockade; can be overcome by higher agonist dose',
    'receptor': 'Protein that binds specific molecules, triggering a cellular response',
    'camp': 'Cyclic AMP; second messenger in GPCR signaling pathways',
    'gprotein': 'GTP-binding protein; mediates signal from GPCR to effector',
    'pharmacokinetics': 'How the body absorbs, distributes, metabolizes, and excretes drugs',
    'pharmacodynamics': 'How drugs affect the body; mechanism of action and effects',
    'bioavailability': 'Fraction of drug reaching systemic circulation unchanged',
    'half-life': 'Time for plasma drug concentration to decrease by 50%',
    'first-pass metabolism': 'Drug metabolism by liver before reaching systemic circulation',
    'therapeutic index': 'Ratio of toxic dose to therapeutic dose; higher = safer',
    'adverse effect': 'Unwanted harmful effect from a drug or treatment',
    'contraindication': 'Condition making a drug/treatment potentially harmful',
    'drug interaction': 'One drug alters the effect of another drug',
    'prodrug': 'Inactive compound metabolized into an active drug in the body',
    'tolerance': 'Decreased drug response with repeated use',
    'withdrawal': 'Symptoms when stopping a drug after dependence develops',
    'synergism': 'Combined drug effect greater than sum of individual effects',
    'potentiation': 'One drug enhances another\'s effect beyond additive',
    'bioequivalence': 'Two drugs with same rate and extent of absorption',
    'steady state': 'Drug intake = elimination; achieved after ~5 half-lives',
    'loading dose': 'Higher initial dose to rapidly reach therapeutic concentration',
    'maintenance dose': 'Dose to maintain steady-state drug concentration',
    'clearance': 'Volume of plasma cleared of drug per unit time',
    'volume of distribution': 'Theoretical volume needed to contain drug at plasma concentration',
    'heparin': 'Anticoagulant; enhances antithrombin III activity; monitored by aPTT',
    'warfarin': 'Oral anticoagulant; inhibits vitamin K-dependent clotting factors; monitored by INR',
    'aspirin': 'NSAID; irreversible COX-1 inhibition → ↓platelet aggregation',
    'clopidogrel': 'Antiplatelet drug; inhibits ADP P2Y12 receptor on platelets',
    'metformin': 'First-line oral antidiabetic; ↓hepatic glucose production, ↑insulin sensitivity',
    'insulin therapy': 'Exogenous insulin for Type 1 DM or uncontrolled Type 2 DM',
    'statin': 'HMG-CoA reductase inhibitor; ↓cholesterol synthesis, ↑LDL receptors',
    'diuretic': 'Drug increasing urine output; loop, thiazide, K-sparing types',
    'nsaid': 'Non-Steroidal Anti-Inflammatory Drug; inhibits COX → ↓prostaglandins',
    'corticosteroid': 'Anti-inflammatory drug mimicking cortisol; ↓immune response',
    'antibiotic': 'Drug that kills or inhibits bacterial growth',
    'broad-spectrum': 'Effective against wide range of bacteria (gram+ and gram−)',
    'narrow-spectrum': 'Effective against specific bacteria or limited group',
    'bactericidal': 'Kills bacteria directly',
    'bacteriostatic': 'Stops bacterial growth; immune system clears infection',
    'resistance': 'Bacteria survive drugs through mutation or gene acquisition',
    'methicillin': 'Penicillinase-resistant penicillin; MRSA is resistant to it',
    'mrsa': 'Methicillin-Resistant Staphylococcus Aureus; requires vancomycin',
    'vancomycin': 'Glycopeptide antibiotic; used for MRSA and severe gram+ infections',
    'penicillin': 'β-lactam antibiotic; inhibits cell wall synthesis; allergy common',
    'aminoglycoside': 'Antibiotic; inhibits 30S ribosome; nephrotoxic + ototoxic',
    'fluoroquinolone': 'Antibiotic; inhibits DNA gyrase; tendonitis risk',
    'macrolide': 'Antibiotic; inhibits 50S ribosome; e.g., azithromycin, erythromycin',
    'prophylaxis': 'Preventive treatment given before potential infection or event',
    // Neurology
    'stroke': 'Acute brain injury from ischemia or hemorrhage',
    'ischemic stroke': 'Stroke from artery blockage (~85% of strokes)',
    'hemorrhagic stroke': 'Stroke from blood vessel rupture in brain',
    'tia': 'Transient Ischemic Attack; stroke-like symptoms resolving <24 hours',
    'epilepsy': 'Chronic disorder with recurrent unprovoked seizures',
    'seizure': 'Abnormal excessive brain electrical activity; can cause convulsions',
    'parkinson': 'Neurodegenerative disease: ↓dopamine → tremor, rigidity, bradykinesia',
    'meningitis': 'Inflammation of the meninges; infectious or aseptic',
    'encephalitis': 'Inflammation of brain tissue; usually viral',
    'multiple sclerosis': 'Autoimmune demyelination of CNS; relapsing-remitting course',
    'neuropathy': 'Damage to peripheral nerves; sensory loss, weakness, pain',
    'dementia': 'Progressive cognitive decline affecting daily functioning',
    'alzheimer': 'Most common dementia; amyloid plaques + neurofibrillary tangles',
    'concussion': 'Mild traumatic brain injury; temporary neurologic dysfunction',
    'lumbar puncture': 'Spinal tap; CSF collection for diagnosis',
    'csf': 'Cerebrospinal Fluid; cushions brain and spinal cord',
    'blood-brain barrier': 'Selective barrier protecting brain from circulating substances',
    'levodopa': 'Dopamine precursor; main treatment for Parkinson disease',
    'dopamine': 'Neurotransmitter; motor control, reward, prolactin inhibition',
    // Endocrine
    'diabetes mellitus': 'Chronic hyperglycemia from insulin deficiency or resistance',
    'type 1 diabetes': 'Autoimmune β-cell destruction → absolute insulin deficiency',
    'type 2 diabetes': 'Insulin resistance + relative deficiency; most common type',
    'insulin': 'Hormone from β-cells; promotes glucose uptake and storage',
    'glucagon': 'Hormone from α-cells; ↑blood glucose via glycogenolysis, gluconeogenesis',
    'thyroid': 'Butterfly-shaped gland producing T3/T4; regulates metabolism',
    'hypothyroidism': 'Underactive thyroid → fatigue, weight gain, cold intolerance',
    'hyperthyroidism': 'Overactive thyroid → weight loss, tachycardia, heat intolerance',
    'cortisol': 'Glucocorticoid from adrenal cortex; stress hormone',
    'adrenal insufficiency': 'Deficient cortisol production; primary (Addison) or secondary',
    'addison disease': 'Primary adrenal insufficiency; ↓cortisol + ↓aldosterone',
    'cushing syndrome': 'Excess cortisol → moon face, buffalo hump, striae, hyperglycemia',
    'acromegaly': 'Excess GH in adults → enlarged hands, feet, facial features',
    'hba1c': 'Glycated hemoglobin; reflects average blood glucose over 2-3 months',
    'hyperglycemia': 'Elevated blood glucose; hallmark of diabetes',
    'hypoglycemia': 'Low blood glucose (<70 mg/dL); sweating, confusion, seizures',
    'dkc': 'Diabetic Ketoacidosis; ↓insulin → ketone production, metabolic acidosis',
    'diabetic ketoacidosis': 'Life-threatening complication of diabetes; ketones + acidosis + dehydration',
    'hhs': 'Hyperosmolar Hyperglycemic State; severe hyperglycemia without ketosis',
    'goiter': 'Enlarged thyroid gland; can be toxic or non-toxic',
    ' Graves disease': 'Autoimmune hyperthyroidism; TSH receptor stimulating antibodies',
    // Respiratory
    'copd': 'Chronic Obstructive Pulmonary Disease; irreversible airflow limitation',
    'asthma': 'Reversible airway obstruction with inflammation and hyperreactivity',
    'pneumonia': 'Infection of lung parenchyma; alveoli fill with fluid/pus',
    'pleural effusion': 'Fluid accumulation in pleural space; dyspnea, dullness to percussion',
    'pneumothorax': 'Air in pleural space → lung collapse; sudden dyspnea',
    'tuberculosis': 'Mycobacterium tuberculosis infection; granuloma formation',
    'bronchitis': 'Inflammation of bronchi; productive cough',
    'bronchiectasis': 'Permanent bronchial dilation; chronic cough with purulent sputum',
    'ards': 'Acute Respiratory Distress Syndrome; non-cardiogenic pulmonary edema',
    'pulmonary fibrosis': 'Progressive lung scarring; restrictive pattern on PFTs',
    'empyema': 'Pus in pleural space; complication of pneumonia',
    'spirometry': 'Lung function test measuring FEV1 and FVC',
    'fev1': 'Forced Expiratory Volume in 1 second; obstructive vs restrictive',
    'fvc': 'Forced Vital Capacity; total air forcefully exhaled',
    'oxygen saturation': '% of hemoglobin bound to oxygen; normal 95-100%',
    'hypoxia': 'Insufficient oxygen delivery to tissues',
    'hypercapnia': 'Elevated blood CO2; respiratory acidosis',
    'alveoli': 'Tiny air sacs where gas exchange occurs in lungs',
    // Renal
    'acute kidney injury': 'Sudden decrease in kidney function over hours to days',
    'chronic kidney disease': 'Progressive irreversible loss of kidney function over months/years',
    'glomerulonephritis': 'Inflammation of glomeruli; hematuria, proteinuria, ↓GFR',
    'nephrotic syndrome': 'Heavy proteinuria (>3.5g/day), edema, hypoalbuminemia, hyperlipidemia',
    'nephritic syndrome': 'Hematuria, hypertension, oliguria, mild proteinuria',
    'renal failure': 'Kidneys unable to filter waste; uremia, electrolyte imbalance',
    'dialysis': 'Artificial filtration of blood when kidneys fail; HD or PD',
    'gfr': 'Glomerular Filtration Rate; measure of kidney function (normal >90)',
    'creatinine': 'Waste product from muscle breakdown; marker of kidney function',
    'bun': 'Blood Urea Nitrogen; kidney function marker; elevated in renal failure',
    'proteinuria': 'Protein in urine; marker of kidney damage',
    'hematuria': 'Blood in urine; kidney or urinary tract pathology',
    'polycystic kidney': 'Genetic disorder with multiple cysts → kidney enlargement and failure',
    'rta': 'Renal Tubular Acidosis; impaired acid secretion → metabolic acidosis',
    // Hematology
    'anemia': '↓RBC count or hemoglobin; reduced oxygen-carrying capacity',
    'iron deficiency': 'Most common anemia; microcytic, hypochromic RBCs',
    'sickle cell': 'Genetic HbS → sickled RBCs; vaso-occlusive crises',
    'thalassemia': 'Genetic ↓globin chain synthesis; microcytic anemia',
    'coagulation': 'Blood clot formation; intrinsic and extrinsic pathways',
    'thrombocytopenia': '↓Platelet count; increased bleeding risk',
    'leukemia': 'Cancer of blood-forming tissue; abnormal WBC proliferation',
    'lymphoma': 'Cancer of lymphoid tissue; Hodgkin and Non-Hodgkin types',
    'hemophilia': 'Inherited bleeding disorder; deficient factor VIII or IX',
    'dic': 'Disseminated Intravascular Coagulation; widespread clotting + bleeding',
    'petechiae': 'Tiny red/purple spots from capillary bleeding',
    'ecchymosis': 'Bruise; larger area of bleeding under skin',
    'hematocrit': '% of blood volume occupied by RBCs',
    'hemoglobin': 'Oxygen-carrying protein in RBCs; normal 12-16 g/dL',
    'platelet': 'Cell fragment essential for clot formation; normal 150-400K/μL',
    'wbc': 'White Blood Cell; immune defense; normal 4-11K/μL',
    'neutrophil': 'Most common WBC; first responder to bacterial infection',
    'lymphocyte': 'WBC for adaptive immunity; T cells and B cells',
    'eosinophil': 'WBC involved in allergic reactions and parasitic infections',
    'monocyte': 'Large WBC; differentiates into macrophages in tissues',
    'inr': 'International Normalized Ratio; standardized PT for warfarin monitoring',
    'aptt': 'Activated Partial Thromboplastin Time; intrinsic pathway; heparin monitoring',
    'pt': 'Prothrombin Time; extrinsic pathway; warfarin monitoring',
    // Gastrointestinal
    'cirrhosis': 'End-stage liver fibrosis; nodular regeneration, portal hypertension',
    'hepatitis': 'Liver inflammation; viral (A, B, C, D, E), alcoholic, autoimmune',
    'pancreatitis': 'Pancreas inflammation; gallstones or alcohol most common causes',
    'cholecystitis': 'Gallbladder inflammation; usually from gallstones',
    'peptic ulcer': 'Erosion in stomach/duodenum; H. pylori or NSAIDs',
    'gerd': 'Gastroesophageal Reflux Disease; chronic acid reflux',
    'ibd': 'Inflammatory Bowel Disease; Crohn disease and ulcerative colitis',
    'crohn disease': 'Transmural inflammation; can affect any GI segment, skip lesions',
    'ulcerative colitis': 'Mucosal inflammation; rectum → colon, continuous',
    'ibs': 'Irritable Bowel Syndrome; functional GI disorder, no structural damage',
    'appendicitis': 'Appendix inflammation; RLQ pain, fever, nausea',
    'diverticulitis': 'Inflammation of colonic diverticula; LLQ pain, fever',
    'malabsorption': 'Impaired nutrient absorption; steatorrhea, weight loss',
    'ascites': 'Fluid in peritoneal cavity; portal hypertension, cirrhosis',
    'portal hypertension': '↑Pressure in portal venous system; varices, ascites',
    'varices': 'Dilated veins (esophageal, gastric); risk of hemorrhage',
    'hepatic encephalopathy': 'Brain dysfunction from liver failure; ammonia accumulation',
    'jaundice': 'Yellow skin/eyes from bilirubin accumulation',
    'bilirubin': 'Bile pigment from heme breakdown; ↑→ jaundice',
    'amylase': 'Enzyme; elevated in pancreatitis and mumps',
    'lipase': 'Enzyme; more specific than amylase for pancreatitis',
    // Musculoskeletal
    'osteoarthritis': 'Degenerative joint disease; cartilage loss, osteophytes',
    'rheumatoid arthritis': 'Autoimmune joint inflammation; symmetric, erosive',
    'osteoporosis': '↓Bone density → fracture risk; T-score ≤ -2.5',
    'gout': 'Uric acid crystal deposition; acute monoarthritis',
    'fracture': 'Break in bone continuity; open or closed',
    'osteomyelitis': 'Bone infection; usually Staphylococcus aureus',
    'lumbar disc': 'Intervertebral disc herniation; sciatica, radiculopathy',
    'scoliosis': 'Lateral spinal curvature; screened in adolescence',
    'tendonitis': 'Tendon inflammation; overuse injury',
    'bursitis': 'Bursa inflammation; pain and swelling near joints',
    'muscle spasm': 'Involuntary muscle contraction; cramping pain',
    // Dermatology
    'psoriasis': 'Autoimmune; silvery plaques on extensor surfaces',
    'eczema': 'Atopic dermatitis; itchy, dry, inflamed skin',
    'cellulitis': 'Bacterial skin infection; erythema, warmth, pain',
    'urticaria': 'Hives; wheals from allergic reaction',
    'melanoma': 'Most dangerous skin cancer; ABCDE criteria',
    'basal cell carcinoma': 'Most common skin cancer; pearly papule, slow-growing',
    'squamous cell carcinoma': 'Skin cancer from keratinocytes; scaling nodule',
    'impetigo': 'Bacterial skin infection; honey-colored crusts',
    'herpes zoster': 'Shingles; reactivation of VZV; painful vesicular rash in dermatome',
    // Infectious Disease
    'sepsis': 'Life-threatening organ dysfunction from dysregulated immune response to infection',
    'hiv': 'Human Immunodeficiency Virus; targets CD4+ T cells → AIDS',
    'aids': 'Acquired Immunodeficiency Syndrome; CD4 <200 or opportunistic infection',
    'malaria': 'Plasmodium infection; cyclical fever, chills, anemia',
    'covid': 'SARS-CoV-2 infection; respiratory illness ranging from mild to severe',
    'influenza': 'Viral respiratory infection; fever, myalgia, cough',
    'endotoxin': 'LPS from gram-negative bacteria → fever, septic shock',
    'exotoxin': 'Toxin secreted by bacteria; e.g., tetanus, botulinum, diphtheria',
    'opportunistic infection': 'Infection occurring in immunocompromised hosts',
    'fever of unknown origin': 'Fever ≥38.3°C for ≥3 weeks without diagnosis',
    // Oncology
    'carcinoma': 'Cancer of epithelial tissue; most common cancer type',
    'sarcoma': 'Cancer of connective tissue (bone, muscle, fat)',
    'metastasis': 'Cancer spread from primary site to distant locations',
    'tumor': 'Abnormal mass of tissue; benign or malignant',
    'benign': 'Non-cancerous; localized, does not metastasize',
    'malignant': 'Cancerous; invasive, can metastasize',
    'biopsy': 'Tissue sample for microscopic examination and diagnosis',
    'staging': 'Determining cancer extent; TNM system (Tumor, Node, Metastasis)',
    'chemotherapy': 'Drug treatment killing rapidly dividing cells (including cancer)',
    'radiation': 'Using ionizing radiation to kill cancer cells',
    'immunotherapy': 'Treatment enhancing immune system to fight cancer',
    'remission': 'Reduction or disappearance of cancer signs and symptoms',
    // General / Clinical
    'ischemia': 'Insufficient blood supply to tissue → oxygen deprivation',
    'necrosis': 'Uncontrolled cell death from injury; inflammation results',
    'apoptosis': 'Programmed cell death; controlled, no inflammation',
    'inflammation': 'Immune response to injury/infection: redness, heat, swelling, pain',
    'edema': 'Abnormal fluid accumulation in tissues',
    'pathology': 'Study of disease; structural and functional changes',
    'prognosis': 'Predicted course and outcome of a disease',
    'etiology': 'The cause or origin of a disease',
    'differential diagnosis': 'List of possible conditions that could explain symptoms',
    'sensitivity': '% of people WITH disease who test positive (true positive rate)',
    'specificity': '% of people WITHOUT disease who test negative (true negative rate)',
    'nnt': 'Number Needed to Treat; patients treated to prevent one bad outcome',
    'incidence': 'New cases of disease in a population over time',
    'prevalence': 'Total cases of disease in a population at a given time',
    'mortality': 'Death rate from a disease',
    'morbidity': 'Disease rate or complications in a population',
    'comorbidity': 'Co-existing medical condition alongside primary diagnosis',
    'palliative': 'Treatment relieving symptoms without curing the disease',
    'curative': 'Treatment aimed at curing the disease',
    'triage': 'Prioritizing patients based on severity of condition',
    'autosomal dominant': 'Genetic pattern: one copy of mutated gene → disease (50% inheritance)',
    'autosomal recessive': 'Genetic pattern: two copies needed → disease (25% inheritance)',
    'x-linked': 'Gene on X chromosome; males more affected',
    'penetrance': 'Proportion of people with a gene mutation who show the phenotype',
    'expressivity': 'Variation in severity of a genetic trait among affected individuals',
    'congenital': 'Present at birth; may be genetic or environmental',
    'acquired': 'Developed after birth; not inherited',
    'idiopathic': 'Disease of unknown cause',
    'iatrogenic': 'Caused by medical treatment or procedure',
    'nosocomial': 'Hospital-acquired infection',
    'syndrome': 'Group of symptoms consistently occurring together',
    'sign': 'Objective finding observed by clinician (e.g., fever, rash)',
    'symptom': 'Subjective experience reported by patient (e.g., pain, nausea)',
    'lesion': 'Area of abnormal tissue; can be benign or malignant',
    'incision': 'Surgical cut into tissue',
    'excision': 'Surgical removal of tissue or structure',
    'anastomosis': 'Surgical connection between two structures (vessels, bowel)',
    'laparoscopy': 'Minimally invasive surgery using camera through small incisions',
    'relapse': 'Return of disease after improvement or remission',
    'exacerbation': 'Worsening of a chronic condition',
    'chronic': 'Long-lasting condition (>3 months); persistent or recurrent',
    'acute': 'Sudden onset; short duration (hours to days)',
    'subacute': 'Between acute and chronic; days to weeks',
    'fulminant': 'Sudden, severe onset; potentially life-threatening',
    'latent': 'Dormant infection; can reactivate later',
    'carrier': 'Person harboring pathogen without symptoms; can transmit',
    'endemic': 'Disease consistently present in a population/area',
    'epidemic': 'Increase in disease cases above expected in a population',
    'pandemic': 'Epidemic spreading across multiple countries/continents',
    'screening': 'Testing asymptomatic people to detect disease early',
    'vaccination': 'Administration of antigen to induce protective immunity',
    'immunization': 'Process of becoming immune through vaccination or natural infection',
    'antibody': 'Protein produced by B cells; binds specific antigen',
    'antigen': 'Substance that triggers an immune response',
    'immunity': 'Protection against specific pathogens; active or passive',
    'autoimmune': 'Immune system attacks body\'s own tissues',
    'hypersensitivity': 'Exaggerated immune response; types I-IV',
    'anaphylaxis': 'Severe type I hypersensitivity; life-threatening allergic reaction',
    'allergy': 'Type I hypersensitivity to environmental allergen',
    'complement': 'Group of proteins enhancing immune response and inflammation',
    'immunosuppression': 'Weakened immune system; increased infection risk',
    'transplant rejection': 'Immune response against transplanted tissue; hyperacute, acute, chronic',
    'graft': 'Transplanted tissue or organ',
    'autograft': 'Tissue transplanted from one site to another in same person',
    'allograft': 'Transplant between genetically non-identical individuals',
    'xenograft': 'Transplant from different species to human',
    'analgesic': 'Pain-relieving medication',
    'antipyretic': 'Fever-reducing medication',
    'antiemetic': 'Medication preventing nausea and vomiting',
    'antihistamine': 'Drug blocking histamine receptors; allergies, motion sickness',
    'bronchodilator': 'Drug that widens airways; used in asthma and COPD',
    'antihypertensive': 'Drug lowering blood pressure',
    'anticoagulant': 'Drug preventing blood clot formation',
    'antiplatelet': 'Drug preventing platelet aggregation',
    'laxative': 'Medication promoting bowel movements',
    'antacid': 'Drug neutralizing stomach acid',
    'ppi': 'Proton Pump Inhibitor; potent acid suppression (omeprazole)',
    'h2 blocker': 'Histamine H2 receptor antagonist; ↓stomach acid (ranitidine)',
    'antiviral': 'Drug that inhibits viral replication',
    'antifungal': 'Drug that treats fungal infections',
    'antiparasitic': 'Drug that treats parasitic infections',
    'emetic': 'Substance causing vomiting',
    'hypnotic': 'Drug inducing sleep',
    'sedative': 'Drug calming nervous system; reduces anxiety and agitation',
    'anesthetic': 'Drug causing loss of sensation (local) or consciousness (general)',
    'parasympathomimetic': 'Drug mimicking parasympathetic effects; ↑secretions, ↓HR',
    'sympathomimetic': 'Drug mimicking sympathetic effects; ↑HR, ↑BP, bronchodilation',
    'inotrope': 'Drug affecting heart muscle contractility; positive ↑, negative ↓',
    'chronotrope': 'Drug affecting heart rate; positive ↑HR, negative ↓HR',
    'dromotrope': 'Drug affecting conduction velocity through the heart',
    'lipophilic': 'Fat-soluble; crosses cell membranes and blood-brain barrier easily',
    'hydrophilic': 'Water-soluble; does not cross membranes easily',
    'albumin': 'Most abundant plasma protein; drug binding, oncotic pressure',
    'glycoprotein': 'Protein with carbohydrate group; cell surface receptors, hormones',
    'enzyme': 'Biological catalyst; speeds up chemical reactions',
    'substrate': 'Molecule acted upon by an enzyme',
    'metabolite': 'Product of metabolism; active or inactive',
    'oxidation': 'Chemical reaction involving loss of electrons; Phase I metabolism',
    'conjugation': 'Attaching molecule to drug for excretion; Phase II metabolism',
    'excretion': 'Elimination of drug/metabolites from body; renal, biliary, pulmonary',
    'absorption': 'Drug entry into systemic circulation from site of administration',
    'distribution': 'Drug movement from blood to tissues throughout body',
    'metabolism': 'Chemical transformation of drug; mainly hepatic',
    'enteric coating': 'Special coating preventing drug dissolution in stomach acid',
    'sustained release': 'Drug formulation releasing active ingredient slowly over time',
    'sublingual': 'Under the tongue; rapid absorption, bypasses first-pass',
    'intravenous': 'Directly into vein; 100% bioavailability, immediate effect',
    'intramuscular': 'Into muscle; slower absorption than IV',
    'subcutaneous': 'Under the skin; slow, sustained absorption (e.g., insulin)',
    'topical': 'Applied to skin surface; local effect',
    'intrathecal': 'Into subarachnoid space; bypasses blood-brain barrier'
};
/**
 * Look up a medical term definition.
 * Tries exact match first, then case-insensitive, then partial match.
 */ function lookupTerm(term) {
    const normalized = term.trim().toLowerCase();
    // Exact match
    if (MEDICAL_DICTIONARY[normalized]) {
        return MEDICAL_DICTIONARY[normalized];
    }
    // Try removing common suffixes
    const suffixes = [
        'tion',
        'sion',
        'ment',
        'ness',
        'ing',
        'ous',
        'ive',
        'al',
        'ic',
        'ly'
    ];
    for (const suffix of suffixes){
        if (normalized.endsWith(suffix)) {
            const base = normalized.slice(0, -suffix.length);
            if (MEDICAL_DICTIONARY[base]) return MEDICAL_DICTIONARY[base];
        }
    }
    // Partial match - check if any dictionary key is contained in the term
    for (const [key, value] of Object.entries(MEDICAL_DICTIONARY)){
        if (normalized.includes(key) || key.includes(normalized)) {
            return value;
        }
    }
    return null;
}


/***/ }),

/***/ 96682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useByokData),
/* harmony export */   a: () => (/* binding */ groupKeysByProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84507);
/* __next_internal_client_entry_do_not_use__ useByokData,groupKeysByProvider auto */ /**
 * useByokData — the single data layer for the BYOK hub.
 *
 * Owns:
 *   - keys      : GET  /api/user/api-keys          (endpoints, masked keys)
 *   - catalog   : GET  /api/providers              (models visible to pickers)
 *   - mutations : save / delete / toggle / reorder / test / discover-merge
 *
 * Every mutation refreshes BOTH keys and catalog — the catalog embeds the
 * user's curated modelsConfig, so adding a model immediately makes it
 * visible to every model picker in the app (the original visibility bug).
 */ 

// ── Hook ──
function useByokData() {
    const { status: sessionStatus } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__/* .useSession */ .wV)();
    const [keys, setKeys] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [catalog, setCatalog] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [catalogLoading, setCatalogLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [loadError, setLoadError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    // Per-key last test outcome, keyed by row id — drives the status dot until
    // the next full reload.
    const [testResults, setTestResults] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    const sessionStatusRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(sessionStatus);
    sessionStatusRef.current = sessionStatus;
    const reloadKeys = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/user/api-keys', {
                cache: 'no-store'
            });
            if (res.status === 401) {
                setLoadError(sessionStatusRef.current === 'authenticated' ? '__session_expired__' : '__unauthenticated__');
                return;
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setKeys(data.keys ?? []);
            setLoadError(null);
        } catch (e) {
            setLoadError(e instanceof Error ? e.message : 'Failed to load API keys');
        } finally{
            setLoading(false);
        }
    }, []);
    const reloadCatalog = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/providers', {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setCatalog(await res.json());
        } catch  {
            // Catalog is a nice-to-have for the picker; keys list still works.
            setCatalog(null);
        } finally{
            setCatalogLoading(false);
        }
    }, []);
    const reload = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        await Promise.all([
            reloadKeys(),
            reloadCatalog()
        ]);
    }, [
        reloadKeys,
        reloadCatalog
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (sessionStatus === 'loading') return;
        const t = setTimeout(()=>void reload(), 0);
        return ()=>clearTimeout(t);
    }, [
        sessionStatus,
        reload
    ]);
    // ── Mutations (all refresh keys + catalog afterwards) ──
    const refreshAfter = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        await Promise.all([
            reloadKeys(),
            reloadCatalog()
        ]);
    }, [
        reloadKeys,
        reloadCatalog
    ]);
    /** Save an endpoint (create when no id, update in place when id given). */ const saveKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (params)=>{
        const res = await fetch('/api/user/api-keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        const data = await res.json().catch(()=>({}));
        if (!res.ok) return {
            ok: false,
            error: data.error || `HTTP ${res.status}`
        };
        await refreshAfter();
        return {
            ok: true,
            keyId: data.key?.id
        };
    }, [
        refreshAfter
    ]);
    /** Enable/disable one endpoint row. */ const toggleKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (keyId, providerId, enabled)=>{
        // Optimistic
        setKeys((ks)=>ks.map((k)=>k.id === keyId ? {
                    ...k,
                    enabled
                } : k));
        const res = await fetch(`/api/user/api-keys/${encodeURIComponent(providerId)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyId,
                enabled
            })
        });
        if (!res.ok) {
            setKeys((ks)=>ks.map((k)=>k.id === keyId ? {
                        ...k,
                        enabled: !enabled
                    } : k));
            const data = await res.json().catch(()=>({}));
            throw new Error(data.error || `HTTP ${res.status}`);
        }
        await refreshAfter();
    }, [
        refreshAfter
    ]);
    /** Delete one endpoint row. */ const deleteKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (keyId, providerId)=>{
        const res = await fetch(`/api/user/api-keys/${encodeURIComponent(providerId)}?keyId=${encodeURIComponent(keyId)}`, {
            method: 'DELETE'
        });
        const data = await res.json().catch(()=>({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        setTestResults((r)=>{
            const next = {
                ...r
            };
            delete next[keyId];
            return next;
        });
        await refreshAfter();
    }, [
        refreshAfter
    ]);
    /** Delete every endpoint of a provider. */ const deleteAllKeys = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (providerId)=>{
        const res = await fetch(`/api/user/api-keys/${encodeURIComponent(providerId)}`, {
            method: 'DELETE'
        });
        const data = await res.json().catch(()=>({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        await refreshAfter();
    }, [
        refreshAfter
    ]);
    /** Reorder an endpoint (move up/down in the failover order). */ const moveKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (keyId, providerId, move)=>{
        const res = await fetch(`/api/user/api-keys/${encodeURIComponent(providerId)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyId,
                move
            })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await reloadKeys();
    }, [
        reloadKeys
    ]);
    /**
   * Test one endpoint (saved row or ad-hoc). Returns the discovered model
   * list (when the provider exposes /models) and remembers the outcome for
   * the status dot. NOTE: the route requires providerId alongside keyId.
   */ const testKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (keyId, providerId, adhoc)=>{
        const res = await fetch('/api/user/api-keys/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(keyId && providerId ? {
                keyId,
                providerId
            } : adhoc && providerId ? {
                providerId,
                apiKey: adhoc.apiKey,
                baseUrl: adhoc.baseUrl
            } : {
                providerId,
                apiKey: adhoc?.apiKey,
                baseUrl: adhoc?.baseUrl
            })
        });
        const data = await res.json().catch(()=>({
                ok: false,
                error: `HTTP ${res.status}`
            }));
        if (keyId) setTestResults((r)=>({
                ...r,
                [keyId]: data
            }));
        // A successful test updates lastVerifiedAt server-side — refresh keys
        // (cheap) but not the whole catalog.
        if (data.ok) void reloadKeys();
        return data;
    }, [
        reloadKeys
    ]);
    /** Replace a provider's curated model catalog (the "models I add"). */ const saveModels = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (providerId, models)=>{
        const res = await fetch('/api/user/api-keys', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                providerId,
                modelsConfig: models
            })
        });
        const data = await res.json().catch(()=>({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        await refreshAfter();
    }, [
        refreshAfter
    ]);
    /**
   * Test an endpoint and merge its discovered model list into the provider's
   * modelsConfig (dedup by id). Returns the newly added models.
   */ const discoverModels = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (key)=>{
        const result = await testKey(key.id, key.providerId);
        if (!result.ok) {
            return {
                ok: false,
                error: result.error || 'Test failed',
                added: [],
                discovered: []
            };
        }
        const discovered = result.models ?? [];
        if (!discovered.length) {
            return {
                ok: true,
                added: [],
                discovered: []
            };
        }
        const existing = new Map((key.modelsConfig ?? []).map((m)=>[
                m.id,
                m
            ]));
        for (const id of discovered){
            if (!existing.has(id)) {
                existing.set(id, {
                    id,
                    name: id
                });
            }
        }
        const prev = key.modelsConfig ?? [];
        const next = [
            ...existing.values()
        ];
        await saveModels(key.providerId, next);
        return {
            ok: true,
            added: next.filter((m)=>!prev.some((p)=>p.id === m.id)),
            discovered
        };
    }, [
        testKey,
        saveModels
    ]);
    // Set the user's app-wide default model (persisted to User.defaultModel).
    const setDefaultModel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (model)=>{
        setCatalog((c)=>c ? {
                ...c,
                userDefault: model
            } : c);
        const res = await fetch('/api/user/default-model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                defaultModel: model
            })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
    }, []);
    return {
        keys,
        catalog,
        catalogLoading,
        loading,
        loadError,
        testResults,
        reload,
        reloadKeys,
        reloadCatalog,
        saveKey,
        toggleKey,
        deleteKey,
        deleteAllKeys,
        moveKey,
        testKey,
        saveModels,
        discoverModels,
        setDefaultModel
    };
}
// ── Derived helpers (pure — components import these directly) ──
/** Group keys by provider, preserving BYOK_PROVIDERS order then custom ids. */ function groupKeysByProvider(keys, providers) {
    const byProvider = new Map();
    for (const k of keys){
        const list = byProvider.get(k.providerId);
        if (list) list.push(k);
        else byProvider.set(k.providerId, [
            k
        ]);
    }
    const groups = [];
    for (const p of providers){
        const ks = byProvider.get(p.id);
        if (ks?.length) {
            groups.push({
                provider: p,
                keys: ks
            });
            byProvider.delete(p.id);
        }
    }
    // Providers outside the static registry (custom gateway ids) last.
    for (const [id, ks] of byProvider){
        groups.push({
            provider: {
                id,
                name: id,
                type: 'openai',
                defaultBaseUrl: '',
                icon: '',
                keyHint: '',
                requiresKey: true
            },
            keys: ks
        });
    }
    return groups;
}


/***/ }),

/***/ 97625:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Bookmark)
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
    name: "bookmark",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
                key: "oz39mx"
            }
        ]
    ]
};
__iconData.node;
const Bookmark = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=bookmark.mjs.map


/***/ }),

/***/ 97804:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ListPlus)
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
    name: "list-plus",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M16 5H3",
                key: "m91uny"
            }
        ],
        [
            "path",
            {
                d: "M11 12H3",
                key: "51ecnj"
            }
        ],
        [
            "path",
            {
                d: "M16 19H3",
                key: "zzsher"
            }
        ],
        [
            "path",
            {
                d: "M18 9v6",
                key: "1twb98"
            }
        ],
        [
            "path",
            {
                d: "M21 12h-6",
                key: "bt1uis"
            }
        ]
    ]
};
__iconData.node;
const ListPlus = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=list-plus.mjs.map


/***/ })

}]);