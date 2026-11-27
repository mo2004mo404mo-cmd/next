(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[14037,23652],{

/***/ 1284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ GenerationToolbar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(90710);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(15561);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(16005);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(64577);
/* harmony import */ var _components_ui_popover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17414);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29991);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(70872);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(40980);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(75748);
/* harmony import */ var _lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(56988);
/* harmony import */ var _lib_pdf_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17329);
/* harmony import */ var _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(50672);
/* harmony import */ var _lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13395);
/* harmony import */ var _components_openmaic_generation_media_popover__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(73460);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/generation/generation-toolbar.tsx
 *
 * Verbatim port. Import paths adjusted:
 *   @/components/generation/media-popover -> @/components/openmaic/generation/media-popover
 */ /* __next_internal_client_entry_do_not_use__ GenerationToolbar auto */ 














// ─── Constants ───────────────────────────────────────────────
const MAX_PDF_SIZE_MB = 50;
const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;
// ─── Component ───────────────────────────────────────────────
function GenerationToolbar({ webSearch, onWebSearchChange, onSettingsOpen, pdfFile, onPdfFileChange, onPdfError }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const currentProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.providerId);
    const currentModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.modelId);
    const providersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.providersConfig);
    const setModel = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.setModel);
    const thinkingConfigs = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.thinkingConfigs);
    const setThinkingConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.setThinkingConfig);
    const pdfProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.pdfProviderId);
    const pdfProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.pdfProvidersConfig);
    const setPDFProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.setPDFProvider);
    const webSearchProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.webSearchProviderId);
    const webSearchProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.webSearchProvidersConfig);
    const setWebSearchProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((s)=>s.setWebSearchProvider);
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Check web search availability. Keyless providers such as Brave should keep
    // the toolbar reachable even when the current API-key provider is not ready.
    const webSearchProvider = _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_9__/* .WEB_SEARCH_PROVIDERS */ .Vf[webSearchProviderId];
    const webSearchConfig = webSearchProvidersConfig[webSearchProviderId];
    const selectedWebSearchAvailable = webSearchProvider ? !webSearchProvider.requiresApiKey || !!webSearchConfig?.apiKey || !!webSearchConfig?.isServerConfigured : false;
    const webSearchAvailable = Object.values(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_9__/* .WEB_SEARCH_PROVIDERS */ .Vf).some((provider)=>{
        const cfg = webSearchProvidersConfig[provider.id];
        return !provider.requiresApiKey || !!cfg?.apiKey || !!cfg?.isServerConfigured;
    });
    // Configured LLM providers (only those with valid credentials + models + endpoint)
    const configuredProviders = providersConfig ? Object.entries(providersConfig).filter(([, config])=>(0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_11__/* .isLLMProviderConfigured */ .zT)(config)).map(([id, config])=>({
            id: id,
            name: config.name,
            icon: config.icon,
            isServerConfigured: config.isServerConfigured,
            models: config.isServerConfigured && !config.apiKey && config.serverModels?.length ? config.models.filter((m)=>new Set(config.serverModels).has(m.id)) : config.models
        })) : [];
    const currentProviderConfig = providersConfig?.[currentProviderId];
    const currentModel = currentProviderConfig?.models.find((model)=>model.id === currentModelId);
    const currentThinkingConfig = thinkingConfigs[(0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_12__/* .getThinkingConfigKey */ .UL)(currentProviderId, currentModelId)];
    // PDF handler
    const handleFileSelect = (file)=>{
        if (file.type !== 'application/pdf') return;
        if (file.size > MAX_PDF_SIZE_BYTES) {
            onPdfError(t('upload.fileTooLarge'));
            return;
        }
        onPdfError(null);
        onPdfFileChange(file);
    };
    // ─── Pill button helper ─────────────────────────────
    const pillCls = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap border';
    const pillMuted = `${pillCls} border-border/50 text-muted-foreground/70 hover:text-foreground hover:bg-muted/60`;
    const pillActive = `${pillCls} border-violet-200/60 dark:border-violet-700/50 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300`;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-1 flex-wrap",
        children: [
            configuredProviders.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModelSettingsPopover, {
                configuredProviders: configuredProviders,
                currentProviderId: currentProviderId,
                currentModelId: currentModelId,
                currentProviderConfig: currentProviderConfig,
                currentModel: currentModel,
                setModel: setModel,
                thinkingConfig: currentThinkingConfig,
                onThinkingChange: (config)=>setThinkingConfig(currentProviderId, currentModelId, config),
                t: t
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .Tooltip */ .m_, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipTrigger */ .k$, {
                        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>onSettingsOpen('providers'),
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)(pillCls, 'text-amber-600 dark:text-amber-400 animate-pulse', 'bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50')
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    children: t('toolbar.configureProvider')
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipContent */ .ZI, {
                        children: t('toolbar.configureProviderHint')
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex min-w-0 items-center gap-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-px h-4 bg-border/60 mx-1"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .Popover */ .AM, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverTrigger */ .Wv, {
                                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    className: pdfFile ? pillActive : pillMuted
                                }),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        pdfFile && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "max-w-[100px] truncate",
                                                    children: pdfFile.name
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    role: "button",
                                                    className: "size-4 rounded-full inline-flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        onPdfFileChange(null);
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                        className: "size-2.5"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverContent */ .hl, {
                                align: "start",
                                className: "w-72 p-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2 px-3 pt-3 pb-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs font-medium text-muted-foreground shrink-0",
                                                children: t('toolbar.pdfParser')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .Select */ .l6, {
                                                value: pdfProviderId,
                                                onValueChange: (v)=>setPDFProvider(v),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectTrigger */ .bq, {
                                                        className: "h-7 text-xs flex-1 min-w-0",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectValue */ .yv, {})
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectContent */ .gC, {
                                                        children: Object.values(_lib_pdf_constants__WEBPACK_IMPORTED_MODULE_8__/* .PDF_PROVIDERS */ .sP).map((provider)=>{
                                                            const cfg = pdfProvidersConfig[provider.id];
                                                            const available = !provider.requiresApiKey || !!cfg?.apiKey || !!cfg?.isServerConfigured;
                                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                                                value: provider.id,
                                                                disabled: !available,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('flex items-center gap-1.5', !available && 'opacity-50'),
                                                                    children: [
                                                                        provider.icon && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                                            src: provider.icon,
                                                                            alt: provider.name,
                                                                            className: "w-3.5 h-3.5"
                                                                        }),
                                                                        provider.name,
                                                                        cfg?.isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "text-[9px] px-1 py-0 rounded border text-muted-foreground",
                                                                            children: t('settings.serverConfigured')
                                                                        })
                                                                    ]
                                                                })
                                                            }, provider.id);
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-3 pb-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "file",
                                                ref: fileInputRef,
                                                className: "hidden",
                                                accept: ".pdf",
                                                onChange: (e)=>{
                                                    const f = e.target.files?.[0];
                                                    if (f) handleFileSelect(f);
                                                    e.target.value = '';
                                                }
                                            }),
                                            pdfFile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "size-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                    className: "size-4 text-violet-600 dark:text-violet-400"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "min-w-0 flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "text-sm font-medium truncate",
                                                                        children: pdfFile.name
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                        className: "text-xs text-muted-foreground",
                                                                        children: [
                                                                            (pdfFile.size / 1024 / 1024).toFixed(2),
                                                                            " MB"
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        onClick: ()=>onPdfFileChange(null),
                                                        className: "w-full text-xs text-destructive hover:underline text-left",
                                                        children: t('toolbar.removePdf')
                                                    })
                                                ]
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors cursor-pointer', isDragging ? 'border-violet-400 bg-violet-50 dark:bg-violet-950/20' : 'border-muted-foreground/20 hover:border-violet-300'),
                                                onClick: ()=>fileInputRef.current?.click(),
                                                onDragOver: (e)=>{
                                                    e.preventDefault();
                                                    setIsDragging(true);
                                                },
                                                onDragLeave: ()=>setIsDragging(false),
                                                onDrop: (e)=>{
                                                    e.preventDefault();
                                                    setIsDragging(false);
                                                    const f = e.dataTransfer.files?.[0];
                                                    if (f) handleFileSelect(f);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                        className: "size-5 text-muted-foreground/50 mb-1.5"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-medium",
                                                        children: t('toolbar.pdfUpload')
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[10px] text-muted-foreground/60 mt-0.5",
                                                        children: t('upload.pdfSizeLimit')
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    webSearchAvailable ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .Popover */ .AM, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverTrigger */ .Wv, {
                                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    className: webSearch ? pillActive : pillMuted
                                }),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('size-3.5', webSearch && 'animate-pulse')
                                        }),
                                        webSearch && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_9__/* .WEB_SEARCH_PROVIDERS */ .Vf[webSearchProviderId] ? (0,_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_9__/* .getWebSearchProviderDisplayName */ .$C)(webSearchProviderId, t) : 'Search'
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverContent */ .hl, {
                                align: "start",
                                className: "w-64 p-3 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>{
                                            if (!selectedWebSearchAvailable) return;
                                            onWebSearchChange(!webSearch);
                                        },
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('w-full flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all', webSearch ? 'bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800' : 'border-border hover:bg-muted/50', !selectedWebSearchAvailable && 'opacity-60'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('size-4 shrink-0', webSearch ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-medium",
                                                        children: webSearch ? t('toolbar.webSearchOn') : t('toolbar.webSearchOff')
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[10px] text-muted-foreground/70 mt-0.5",
                                                        children: t('toolbar.webSearchDesc')
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs font-medium text-muted-foreground shrink-0",
                                                children: t('toolbar.webSearchProvider')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .Select */ .l6, {
                                                value: webSearchProviderId,
                                                onValueChange: (v)=>setWebSearchProvider(v),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectTrigger */ .bq, {
                                                        className: "h-7 text-xs flex-1 min-w-0",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectValue */ .yv, {})
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectContent */ .gC, {
                                                        children: Object.values(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_9__/* .WEB_SEARCH_PROVIDERS */ .Vf).map((provider)=>{
                                                            const cfg = webSearchProvidersConfig[provider.id];
                                                            const available = !provider.requiresApiKey || !!cfg?.apiKey || !!cfg?.isServerConfigured;
                                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                                                value: provider.id,
                                                                disabled: !available,
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('flex items-center gap-1.5', !available && 'opacity-50'),
                                                                    children: [
                                                                        (0,_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_9__/* .getWebSearchProviderDisplayName */ .$C)(provider.id, t),
                                                                        cfg?.isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "text-[9px] px-1 py-0 rounded border text-muted-foreground",
                                                                            children: t('settings.serverConfigured')
                                                                        })
                                                                    ]
                                                                })
                                                            }, provider.id);
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .Tooltip */ .m_, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipTrigger */ .k$, {
                                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)(pillCls, 'text-muted-foreground/40 cursor-not-allowed'),
                                    disabled: true
                                }),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                        className: "size-3.5"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipContent */ .ZI, {
                                children: t('toolbar.webSearchNoProvider')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-px h-4 bg-border/60 mx-1"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_generation_media_popover__WEBPACK_IMPORTED_MODULE_10__/* .MediaPopover */ .Q, {
                        onSettingsOpen: onSettingsOpen
                    })
                ]
            })
        ]
    });
}
function formatThinkingValue(value, t) {
    if (!value) return '';
    if (value === 'none') return t ? t('toolbar.off') : 'off';
    if (t && (value === 'dynamic' || value === 'on' || value === 'off' || value === 'auto')) {
        return t(`toolbar.${value}`);
    }
    return value === 'xhigh' ? 'x-high' : value;
}
function formatCompactThinkingValue(value, t) {
    if (!value) return '';
    const numericValue = Number(value);
    if (Number.isFinite(numericValue) && value.trim() !== '') {
        return numericValue >= 10000 ? `${Math.round(numericValue / 1000)}k` : `${numericValue}`;
    }
    return formatThinkingValue(value, t);
}
function InlineThinkingControl({ model, config, onChange, t }) {
    const thinking = model?.capabilities?.thinking;
    if (!(0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_12__/* .supportsConfigurableThinking */ .yW)(thinking)) return null;
    const effective = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_12__/* .normalizeThinkingConfig */ .SZ)(thinking, config) ?? (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_12__/* .getDefaultThinkingConfig */ .oY)(thinking);
    const applyConfig = (next)=>{
        onChange((0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_12__/* .normalizeThinkingConfig */ .SZ)(thinking, next));
    };
    const applyBudget = (value)=>{
        applyConfig({
            ...effective,
            mode: effective?.mode ?? 'enabled',
            budgetTokens: value
        });
    };
    const defaultEnabledBudget = typeof thinking.defaultBudgetTokens === 'number' && thinking.defaultBudgetTokens > 0 ? thinking.defaultBudgetTokens : thinking.budgetRange?.step ?? thinking.budgetRange?.min;
    const applyAutoBudget = ()=>{
        applyConfig({
            ...effective,
            mode: 'auto',
            enabled: undefined,
            budgetTokens: -1
        });
    };
    const applyBudgetMode = (mode)=>{
        if (mode === 'auto') {
            applyAutoBudget();
            return;
        }
        applyConfig({
            ...effective,
            mode,
            enabled: mode === 'enabled',
            budgetTokens: mode === 'enabled' && effective?.budgetTokens === -1 ? defaultEnabledBudget : effective?.budgetTokens
        });
    };
    const applySimpleMode = (mode)=>{
        applyConfig({
            ...effective,
            mode,
            enabled: mode === 'enabled' ? true : mode === 'disabled' ? false : undefined
        });
    };
    const selectTriggerCls = 'h-6 min-w-[84px] rounded-full border-0 bg-violet-100 px-2 py-0 !text-[10px] font-medium leading-none text-violet-700 shadow-none focus-visible:ring-0 data-[size=sm]:h-6 dark:bg-violet-900/40 dark:text-violet-200 [&_svg]:size-3';
    const selectItemCls = 'py-1 text-xs';
    const hasAutoBudget = (thinking.control === 'toggle-budget' || thinking.control === 'budget-only') && !!thinking.budgetRange?.allowDynamic;
    const autoBudgetMode = effective?.budgetTokens === -1 && thinking.budgetRange?.allowDynamic ? 'auto' : effective?.mode === 'disabled' ? 'disabled' : 'enabled';
    const simpleMode = thinking.control === 'mode' && effective?.mode === 'auto' ? 'auto' : effective?.mode === 'disabled' ? 'disabled' : 'enabled';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex min-w-0 shrink-0 items-center gap-1",
        onClick: (event)=>event.stopPropagation(),
        onMouseDown: (event)=>event.stopPropagation(),
        onPointerDown: (event)=>event.stopPropagation(),
        onKeyDown: (event)=>event.stopPropagation(),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                className: "size-3.5 shrink-0 text-violet-500"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex min-w-0 items-center gap-0.5 rounded-full border border-violet-200/70 bg-white/65 p-0.5 dark:border-violet-800/70 dark:bg-violet-950/25",
                children: [
                    hasAutoBudget && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .Select */ .l6, {
                        value: autoBudgetMode,
                        onValueChange: (mode)=>applyBudgetMode(mode),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectTrigger */ .bq, {
                                size: "sm",
                                className: "h-6 min-w-[76px] rounded-full border-0 bg-violet-100 px-2 py-0 !text-[10px] font-medium leading-none text-violet-700 shadow-none focus-visible:ring-0 data-[size=sm]:h-6 dark:bg-violet-900/40 dark:text-violet-200 [&_svg]:size-3",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectValue */ .yv, {})
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectContent */ .gC, {
                                align: "end",
                                className: "min-w-[96px]",
                                children: [
                                    thinking.control === 'toggle-budget' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: "disabled",
                                        className: selectItemCls,
                                        children: t('toolbar.off')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: "enabled",
                                        className: selectItemCls,
                                        children: t('toolbar.on')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: "auto",
                                        className: selectItemCls,
                                        children: t('toolbar.auto')
                                    })
                                ]
                            })
                        ]
                    }),
                    (thinking.control === 'toggle' || thinking.control === 'toggle-budget' && !hasAutoBudget || thinking.control === 'mode') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .Select */ .l6, {
                        value: simpleMode,
                        onValueChange: (mode)=>applySimpleMode(mode),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectTrigger */ .bq, {
                                size: "sm",
                                className: "h-6 min-w-[76px] rounded-full border-0 bg-violet-100 px-2 py-0 !text-[10px] font-medium leading-none text-violet-700 shadow-none focus-visible:ring-0 data-[size=sm]:h-6 dark:bg-violet-900/40 dark:text-violet-200 [&_svg]:size-3",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectValue */ .yv, {})
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectContent */ .gC, {
                                align: "end",
                                className: "min-w-[96px]",
                                children: [
                                    thinking.control === 'mode' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: "auto",
                                        className: selectItemCls,
                                        children: t('toolbar.auto')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: "disabled",
                                        className: selectItemCls,
                                        children: t('toolbar.off')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: "enabled",
                                        className: selectItemCls,
                                        children: t('toolbar.on')
                                    })
                                ]
                            })
                        ]
                    }),
                    thinking.control === 'level' && !!thinking.levelValues?.length && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .Select */ .l6, {
                        value: effective?.level ?? thinking.defaultLevel ?? thinking.levelValues[0],
                        onValueChange: (level)=>applyConfig({
                                ...effective,
                                mode: 'enabled',
                                level: level
                            }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectTrigger */ .bq, {
                                size: "sm",
                                className: selectTriggerCls,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectValue */ .yv, {})
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectContent */ .gC, {
                                align: "end",
                                className: "min-w-[96px]",
                                children: thinking.levelValues.map((level)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: level,
                                        className: selectItemCls,
                                        children: level
                                    }, level))
                            })
                        ]
                    }),
                    thinking.control === 'effort' && !!thinking.effortValues?.length && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .Select */ .l6, {
                        value: effective?.effort ?? thinking.defaultEffort ?? thinking.effortValues[0],
                        onValueChange: (effort)=>applyConfig({
                                ...effective,
                                mode: effort === 'none' ? 'disabled' : 'enabled',
                                effort: effort
                            }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectTrigger */ .bq, {
                                size: "sm",
                                className: selectTriggerCls,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectValue */ .yv, {})
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectContent */ .gC, {
                                align: "end",
                                className: "min-w-[104px]",
                                children: thinking.effortValues.map((effort)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                        value: effort,
                                        className: selectItemCls,
                                        children: formatThinkingValue(effort, t)
                                    }, effort))
                            })
                        ]
                    }),
                    (thinking.control === 'toggle-budget' || thinking.control === 'budget-only') && thinking.budgetRange && (!hasAutoBudget || autoBudgetMode === 'enabled') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: "ml-0.5 grid h-6 shrink-0 grid-cols-[auto_60px] items-stretch overflow-hidden rounded-full border border-violet-200/70 bg-background dark:border-violet-800/70",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "grid h-[22px] shrink-0 place-items-center border-r border-violet-200/70 bg-muted/30 px-2 font-sans text-[11px] font-medium leading-[22px] text-muted-foreground dark:border-violet-800/70",
                                children: t('toolbar.thinkingBudget')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "text",
                                inputMode: "numeric",
                                "aria-label": t('toolbar.thinkingBudget'),
                                disabled: effective?.mode === 'disabled',
                                value: typeof effective?.budgetTokens === 'number' && effective.budgetTokens !== -1 ? effective.budgetTokens : '',
                                placeholder: `${thinking.budgetRange.min}-${thinking.budgetRange.max}`,
                                title: `${thinking.budgetRange.min}-${thinking.budgetRange.max} tokens`,
                                onChange: (event)=>{
                                    const rawValue = event.target.value.trim();
                                    if (!/^\d*$/.test(rawValue)) return;
                                    const value = rawValue ? Number(rawValue) : undefined;
                                    applyBudget(value);
                                },
                                className: "block h-[22px] w-[60px] border-0 bg-transparent px-1 py-0 text-center font-sans text-[11px] font-medium leading-[22px] tabular-nums outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function ModelSettingsPopover({ configuredProviders, currentProviderId, currentModelId, currentProviderConfig, currentModel, setModel, thinkingConfig, onThinkingChange, t }) {
    const [popoverOpen, setPopoverOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [activeProviderId, setActiveProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(currentProviderId);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const currentProvider = configuredProviders.find((provider)=>provider.id === currentProviderId);
    const searchTerm = searchQuery.trim().toLowerCase();
    const isSearching = searchTerm.length > 0;
    const providerEntries = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const matchesSearch = (model)=>!searchTerm || model.name.toLowerCase().includes(searchTerm) || model.id.toLowerCase().includes(searchTerm);
        return configuredProviders.map((provider)=>({
                provider,
                matchingModels: provider.models.filter(matchesSearch)
            })).filter((entry)=>!isSearching || entry.matchingModels.length > 0);
    }, [
        configuredProviders,
        isSearching,
        searchTerm
    ]);
    const activeProviderVisible = providerEntries.some((entry)=>entry.provider.id === activeProviderId);
    const firstVisibleProviderId = providerEntries[0]?.provider.id;
    const resolvedActiveProviderId = isSearching && !activeProviderVisible ? firstVisibleProviderId : activeProviderId;
    const activeProviderEntry = providerEntries.find((entry)=>entry.provider.id === resolvedActiveProviderId) ?? providerEntries[0];
    const activeProvider = activeProviderEntry?.provider;
    const visibleModelEntries = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!activeProviderEntry) return [];
        const { provider, matchingModels } = activeProviderEntry;
        return matchingModels.map((model)=>({
                provider,
                model
            }));
    }, [
        activeProviderEntry
    ]);
    const currentProviderName = currentProvider?.name ?? currentProviderConfig?.name ?? currentProviderId;
    const currentProviderIcon = currentProvider?.icon ?? currentProviderConfig?.icon;
    // Under the #580 invariant this popover only renders when a usable provider
    // exists, which guarantees a concrete model — so the label is always
    // provider / model (no "Select Model" fallback state).
    const currentModelLabel = currentModel?.name || currentModelId;
    const currentThinkingValue = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_12__/* .getThinkingDisplayValue */ .e)(currentModel?.capabilities?.thinking, thinkingConfig);
    const currentThinkingLabel = formatCompactThinkingValue(currentThinkingValue, t);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .Popover */ .AM, {
        open: popoverOpen,
        onOpenChange: (nextOpen)=>{
            setPopoverOpen(nextOpen);
            if (nextOpen) {
                setActiveProviderId(currentProviderId);
                setSearchQuery('');
            }
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .Tooltip */ .m_, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipTrigger */ .k$, {
                        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverTrigger */ .Wv, {
                            render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                "aria-label": `${currentProviderName} / ${currentModelLabel}`,
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('inline-flex h-8 min-w-0 items-center gap-1.5 rounded-full border px-2 text-xs font-medium transition-all', 'border-violet-200/70 bg-violet-50 text-violet-700 hover:bg-violet-100 dark:border-violet-800/70 dark:bg-violet-950/30 dark:text-violet-300', currentModelId && 'shadow-[0_0_0_1px_rgba(124,58,237,0.12)] dark:shadow-[0_0_0_1px_rgba(167,139,250,0.16)]')
                            })
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                currentProviderIcon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                    src: currentProviderIcon,
                                    alt: currentProviderName,
                                    className: "size-4 shrink-0 rounded-sm"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "size-3.5 shrink-0"
                                }),
                                currentThinkingLabel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "shrink-0 rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-violet-700 ring-1 ring-violet-200/70 dark:bg-violet-950/50 dark:text-violet-200 dark:ring-violet-800/70",
                                    children: currentThinkingLabel
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .TooltipContent */ .ZI, {
                        children: `${currentProviderConfig?.name || currentProviderId} / ${currentModelId}`
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverContent */ .hl, {
                align: "start",
                side: "top",
                sideOffset: 8,
                collisionPadding: 12,
                className: "w-[640px] max-w-[calc(100vw-2rem)] overflow-hidden p-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "grid h-[430px] grid-cols-[128px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)]",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "min-h-0 border-r bg-muted/20",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "px-3 py-2 text-[10px] font-semibold uppercase text-muted-foreground",
                                    children: t('toolbar.selectProvider')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-[calc(100%-28px)] overflow-y-auto px-2 pb-2 pt-1",
                                    children: providerEntries.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "px-2 py-4 text-[11px] text-muted-foreground",
                                        children: t('settings.noModelsFound')
                                    }) : providerEntries.map(({ provider, matchingModels })=>{
                                        const isActive = activeProvider?.id === provider.id;
                                        const isCurrent = currentProviderId === provider.id;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>setActiveProviderId(provider.id),
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('mb-1 flex h-10 w-full items-center gap-2 rounded-md px-2 text-left transition-colors', isActive ? 'bg-background text-foreground shadow-sm ring-1 ring-border/70' : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'),
                                            children: [
                                                provider.icon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                    src: provider.icon,
                                                    alt: provider.name,
                                                    className: "size-4 shrink-0 rounded-sm"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                    className: "size-4 shrink-0"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "truncate text-xs font-medium",
                                                            children: provider.name
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "text-[10px] text-muted-foreground",
                                                            children: [
                                                                isSearching ? `${matchingModels.length}/` : '',
                                                                provider.models.length
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                isCurrent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "size-1.5 rounded-full bg-violet-500"
                                                })
                                            ]
                                        }, provider.id);
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex min-h-0 min-w-0 flex-col overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "border-b p-3",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex flex-col gap-2 sm:flex-row sm:items-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative min-w-0 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                    className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                    value: searchQuery,
                                                    onChange: (event)=>{
                                                        const nextSearch = event.target.value;
                                                        setSearchQuery(nextSearch);
                                                        if (!nextSearch.trim()) setActiveProviderId(currentProviderId);
                                                    },
                                                    placeholder: t('settings.searchModels'),
                                                    className: "h-8 pl-8 text-xs"
                                                })
                                            ]
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "min-h-0 flex-1 overflow-y-auto p-2",
                                    children: visibleModelEntries.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "px-3 py-8 text-center text-xs text-muted-foreground",
                                        children: searchQuery ? t('settings.noModelsFound') : t('settings.noModelsAvailable')
                                    }) : visibleModelEntries.map(({ provider, model })=>{
                                        const isSelected = currentProviderId === provider.id && currentModelId === model.id;
                                        const selectModel = ()=>{
                                            setActiveProviderId(provider.id);
                                            setModel(provider.id, model.id);
                                        };
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            role: "button",
                                            tabIndex: 0,
                                            onClick: selectModel,
                                            onKeyDown: (event)=>{
                                                if (event.key !== 'Enter' && event.key !== ' ') return;
                                                event.preventDefault();
                                                selectModel();
                                            },
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('mb-1 flex min-h-11 w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors', isSelected ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-950/25 dark:text-violet-300 dark:ring-violet-800' : 'hover:bg-muted/60'),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "truncate font-mono text-xs font-medium",
                                                            children: model.name
                                                        }),
                                                        model.id !== model.name && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "truncate font-mono text-[10px] text-muted-foreground",
                                                            children: model.id
                                                        })
                                                    ]
                                                }),
                                                isSelected && currentModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InlineThinkingControl, {
                                                    model: currentModel,
                                                    config: thinkingConfig,
                                                    onChange: onThinkingChange,
                                                    t: t
                                                }),
                                                isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_Brain_Check_FileText_Globe2_Paperclip_Search_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                    className: "size-3.5 shrink-0 text-violet-600 dark:text-violet-400"
                                                })
                                            ]
                                        }, `${provider.id}:${model.id}`);
                                    })
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

/***/ 1728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);



function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: type,
        "data-slot": "input",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props
    });
}



/***/ }),

/***/ 2136:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ AgentBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5772);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(78235);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(15696);
/* harmony import */ var _components_ui_checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9192);
/* harmony import */ var _components_ui_popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17414);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(40980);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75748);
/* harmony import */ var _lib_orchestration_registry_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66604);
/* harmony import */ var _lib_audio_voice_resolver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(35595);
/* harmony import */ var _lib_audio_browser_tts_preview__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(67917);
/* harmony import */ var _lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(29455);
/* harmony import */ var _lib_audio_agent_voice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(58390);
/* harmony import */ var _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(28769);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(28980);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(73246);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(94088);
/* harmony import */ var _barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(86272);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(70872);
/* harmony import */ var _lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(18615);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/agent/agent-bar.tsx
 *
 * Verbatim port — all OpenMAIC-internal imports already exist in medq:
 *   @/lib/store/settings
 *   @/lib/orchestration/registry/store
 *   @/lib/audio/{voice-resolver,browser-tts-preview,voxcpm-voices,agent-voice,voxcpm}
 *   @/lib/hooks/use-i18n
 *   @/components/ui/{checkbox,popover,tooltip}
 */ /* __next_internal_client_entry_do_not_use__ AgentBar auto */ 

















/**
 * Render an agent avatar image.
 *
 * Always renders a real <Image> — if the `avatar` value is a bare emoji (which
 * the LLM sometimes returns despite being told to pick from the avatar list),
 * `sanitizeAvatar` replaces it with a deterministic fallback from
 * AGENT_DEFAULT_AVATARS. This guarantees every agent always shows a real
 * illustration, even for classrooms generated before the server-side avatar
 * validation was added.
 *
 * The consumer's `className` (e.g. "size-8 rounded-full") is applied to a
 * wrapper <div> that supplies explicit sizing + relative positioning, and the
 * <Image> uses `fill` mode to absolutely fill that wrapper. This preserves the
 * original <img className={className}> contract (where className controlled
 * both size and clipping) while satisfying next/image's positioning
 * requirement.
 */ function AgentAvatarImg({ avatar, alt, className, emojiClassName: _emojiClassName }) {
    const src = (0,_lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_13__/* .sanitizeAvatar */ .NZ)(avatar);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('relative overflow-hidden', className),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
            src: src,
            alt: alt ?? '',
            fill: true,
            className: "object-cover",
            sizes: "(max-width: 768px) 32px, 40px"
        })
    });
}
function matchesVoiceQuery(value, query) {
    return !!value?.toLowerCase().includes(query);
}
function getFilteredModelGroups(provider, query, autoVoiceLabel) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return provider.modelGroups;
    return provider.modelGroups.map((group)=>{
        const groupMatches = matchesVoiceQuery(provider.providerName, normalizedQuery) || matchesVoiceQuery(provider.providerId, normalizedQuery) || matchesVoiceQuery(group.modelName, normalizedQuery) || matchesVoiceQuery(group.modelId, normalizedQuery);
        const voices = group.voices.filter((voice)=>groupMatches || matchesVoiceQuery(voice.name, normalizedQuery) || matchesVoiceQuery(voice.id, normalizedQuery) || matchesVoiceQuery(voice.language, normalizedQuery) || // Auto Voice is shown by its localized label, not voice.name — match it too.
            voice.id === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__/* .VOXCPM_AUTO_VOICE_ID */ .p0 && matchesVoiceQuery(autoVoiceLabel, normalizedQuery));
        return {
            ...group,
            voices
        };
    }).filter((group)=>group.voices.length > 0);
}
function isNonPreviewableVoice(providerId, voiceId) {
    return providerId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__/* .VOXCPM_TTS_PROVIDER_ID */ .i3 && voiceId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__/* .VOXCPM_AUTO_VOICE_ID */ .p0;
}
function AgentVoicePill({ agent, agentIndex, availableProviders, disabled }) {
    const { t, locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__/* .useI18n */ .s)();
    const ttsProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.ttsProvidersConfig);
    const agentVoiceOverrides = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.agentVoiceOverrides);
    const setAgentVoiceOverride = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setAgentVoiceOverride);
    const resolved = (0,_lib_audio_voice_resolver__WEBPACK_IMPORTED_MODULE_8__/* .resolveAgentVoice */ .kM)(agent, agentIndex, availableProviders, agentVoiceOverrides);
    const [popoverOpen, setPopoverOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [voiceQuery, setVoiceQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [previewingId, setPreviewingId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const previewCancelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const previewAudioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const previewAbortRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const visibleProviderGroups = availableProviders.map((provider)=>({
            provider,
            groups: getFilteredModelGroups(provider, voiceQuery, t('settings.voxcpmAutoVoice'))
        })).filter(({ groups })=>groups.length > 0);
    const displayName = (()=>{
        if (!resolved) return t('agentBar.noVoice');
        for (const p of availableProviders){
            if (p.providerId === resolved.providerId) {
                const v = p.voices.find((voice)=>voice.id === resolved.voiceId);
                if (v) return v.id === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__/* .VOXCPM_AUTO_VOICE_ID */ .p0 ? t('settings.voxcpmAutoVoice') : v.name;
            }
        }
        return resolved.voiceId;
    })();
    const stopPreview = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        previewCancelRef.current?.();
        previewCancelRef.current = null;
        previewAbortRef.current?.abort();
        previewAbortRef.current = null;
        if (previewAudioRef.current) {
            previewAudioRef.current.pause();
            previewAudioRef.current.src = '';
            previewAudioRef.current = null;
        }
        setPreviewingId(null);
    }, []);
    const handlePreview = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (providerId, voiceId, modelId)=>{
        const key = `${providerId}::${voiceId}`;
        if (previewingId === key) {
            stopPreview();
            return;
        }
        stopPreview();
        setPreviewingId(key);
        const previewText = t('settings.ttsTestTextDefault');
        if (providerId === 'browser-native-tts') {
            const { promise, cancel } = (0,_lib_audio_browser_tts_preview__WEBPACK_IMPORTED_MODULE_15__/* .playBrowserTTSPreview */ ._d)({
                text: previewText,
                voice: voiceId
            });
            previewCancelRef.current = cancel;
            try {
                await promise;
            } catch  {
            // ignore abort
            }
            setPreviewingId(null);
            return;
        }
        // Server TTS
        try {
            const controller = new AbortController();
            previewAbortRef.current = controller;
            const providerConfig = ttsProvidersConfig[providerId];
            const providerOptions = await (0,_lib_audio_agent_voice__WEBPACK_IMPORTED_MODULE_10__/* .resolveAgentVoiceOptions */ .wz)(agent, {
                providerId,
                providerConfig: {
                    ...providerConfig,
                    modelId: modelId || providerConfig?.modelId
                },
                voiceId,
                language: locale
            });
            const res = await fetch('/api/generate/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: previewText,
                    audioId: 'voice-preview',
                    ttsProviderId: providerId,
                    ttsModelId: modelId || providerConfig?.modelId,
                    ttsVoice: voiceId,
                    ttsSpeed: 1,
                    ttsApiKey: providerConfig?.apiKey,
                    // Managed providers resolve their base URL server-side; only send
                    // the client's own base URL (custom providers).
                    ttsBaseUrl: providerConfig?.baseUrl || providerConfig?.customDefaultBaseUrl,
                    ttsProviderOptions: providerOptions
                }),
                signal: controller.signal
            });
            if (!res.ok) throw new Error('TTS error');
            const data = await res.json();
            if (!data.base64) throw new Error('No audio');
            const audio = new Audio(`data:audio/${data.format || 'mp3'};base64,${data.base64}`);
            previewAudioRef.current = audio;
            audio.addEventListener('ended', ()=>setPreviewingId(null));
            audio.addEventListener('error', ()=>setPreviewingId(null));
            await audio.play();
        } catch  {
            setPreviewingId(null);
        }
    }, [
        agent.name,
        agent.persona,
        agent.role,
        locale,
        previewingId,
        stopPreview,
        t,
        ttsProvidersConfig
    ]);
    // Cleanup on unmount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>stopPreview(), [
        stopPreview
    ]);
    // Disabled (TTS off) OR no enabled provider ⇒ render the same muted,
    // non-interactive pill — don't silently hide the control (#665).
    if (disabled) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            onClick: (e)=>e.stopPropagation(),
            onPointerDown: (e)=>e.stopPropagation(),
            className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-muted/40 px-2.5 text-[11px] text-muted-foreground/30 shrink-0 cursor-not-allowed",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                    className: "size-3 shrink-0"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "truncate flex-1 text-left",
                    children: displayName
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__/* .Popover */ .AM, {
        open: popoverOpen,
        onOpenChange: (open)=>{
            setPopoverOpen(open);
            if (!open) {
                setVoiceQuery('');
                stopPreview();
            }
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__/* .PopoverTrigger */ .Wv, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    onClick: (e)=>e.stopPropagation(),
                    onPointerDown: (e)=>e.stopPropagation(),
                    className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-primary/10 hover:bg-primary/20 dark:bg-primary/25 dark:hover:bg-primary/35 px-2.5 text-[11px] text-primary/80 hover:text-primary dark:text-primary/90 transition-colors shrink-0 cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                            className: "size-3 shrink-0"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "truncate flex-1 text-left",
                            children: displayName
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                            className: "size-3 shrink-0 opacity-50"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__/* .PopoverContent */ .hl, {
                side: "bottom",
                align: "end",
                sideOffset: 4,
                className: "w-80 p-0 sm:w-96",
                onClick: (e)=>e.stopPropagation(),
                onPointerDown: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "border-b border-border/50 p-2",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                    className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    value: voiceQuery,
                                    onChange: (e)=>setVoiceQuery(e.target.value),
                                    autoFocus: true,
                                    "aria-label": t('agentBar.searchVoice'),
                                    placeholder: t('agentBar.searchVoice'),
                                    className: "h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "max-h-80 overflow-y-auto p-1",
                        children: [
                            visibleProviderGroups.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "px-3 py-6 text-center text-sm text-muted-foreground/60",
                                children: t('agentBar.noMatchingVoices')
                            }),
                            visibleProviderGroups.map(({ provider, groups })=>groups.map((group)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "sticky top-0 bg-popover px-2 py-1 text-[11px] font-medium text-muted-foreground/60",
                                                children: group.modelId ? `${provider.providerName} · ${group.modelName}` : provider.providerName
                                            }),
                                            group.voices.map((voice)=>{
                                                const isActive = resolved?.providerId === provider.providerId && resolved?.voiceId === voice.id && (resolved?.modelId || '') === (group.modelId || '');
                                                const previewKey = `${provider.providerId}::${voice.id}`;
                                                const isPreviewing = previewingId === previewKey;
                                                const canPreview = !isNonPreviewableVoice(provider.providerId, voice.id);
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex items-center gap-1.5 rounded-sm transition-colors', isActive ? 'bg-primary/10' : 'hover:bg-muted'),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                // Persisted in settings, not on the registry record:
                                                                // default agent records are reset from code on every
                                                                // load and would drop the pick.
                                                                setAgentVoiceOverride(agent.id, {
                                                                    providerId: provider.providerId,
                                                                    modelId: group.modelId || undefined,
                                                                    voiceId: voice.id
                                                                });
                                                                setPopoverOpen(false);
                                                            },
                                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex-1 text-left text-[13px] px-2 py-1.5 min-w-0 truncate', isActive ? 'text-primary font-medium' : 'text-foreground'),
                                                            children: voice.id === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__/* .VOXCPM_AUTO_VOICE_ID */ .p0 ? t('settings.voxcpmAutoVoice') : voice.name
                                                        }),
                                                        canPreview && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                handlePreview(provider.providerId, voice.id, group.modelId);
                                                            },
                                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors', isPreviewing ? 'text-primary' : 'text-muted-foreground/40 hover:text-muted-foreground'),
                                                            children: isPreviewing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                                className: "size-3.5 animate-spin"
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                className: "size-3.5"
                                                            })
                                                        })
                                                    ]
                                                }, previewKey);
                                            })
                                        ]
                                    }, `${provider.providerId}::${group.modelId}`)))
                        ]
                    })
                ]
            })
        ]
    });
}
/**
 * Teacher voice pill — reads/writes global ttsProviderId + ttsVoice (single source of truth).
 * This ensures lecture and discussion use the same voice for the teacher.
 */ function TeacherVoicePill({ availableProviders, disabled }) {
    const { t, locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__/* .useI18n */ .s)();
    const ttsProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.ttsProviderId);
    const ttsVoice = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.ttsVoice);
    const setTTSProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setTTSProvider);
    const setTTSVoice = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setTTSVoice);
    const setTTSProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setTTSProviderConfig);
    const ttsProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.ttsProvidersConfig);
    const [popoverOpen, setPopoverOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [voiceQuery, setVoiceQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [previewingId, setPreviewingId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const previewCancelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const previewAudioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const previewAbortRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const visibleProviderGroups = availableProviders.map((provider)=>({
            provider,
            groups: getFilteredModelGroups(provider, voiceQuery, t('settings.voxcpmAutoVoice'))
        })).filter(({ groups })=>groups.length > 0);
    const displayName = (()=>{
        // No enabled provider ⇒ no valid voice; show the placeholder, not a stale
        // voice name from a now-disabled provider (#665).
        if (availableProviders.length === 0) return t('agentBar.noVoice');
        for (const p of availableProviders){
            if (p.providerId === ttsProviderId) {
                const v = p.voices.find((voice)=>voice.id === ttsVoice);
                if (v) return v.id === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__/* .VOXCPM_AUTO_VOICE_ID */ .p0 ? t('settings.voxcpmAutoVoice') : v.name;
            }
        }
        return ttsVoice || 'default';
    })();
    const stopPreview = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        previewCancelRef.current?.();
        previewCancelRef.current = null;
        previewAbortRef.current?.abort();
        previewAbortRef.current = null;
        if (previewAudioRef.current) {
            previewAudioRef.current.pause();
            previewAudioRef.current.src = '';
            previewAudioRef.current = null;
        }
        setPreviewingId(null);
    }, []);
    const handlePreview = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (providerId, voiceId, modelId)=>{
        const key = `${providerId}::${voiceId}`;
        if (previewingId === key) {
            stopPreview();
            return;
        }
        stopPreview();
        setPreviewingId(key);
        const previewText = t('settings.ttsTestTextDefault');
        if (providerId === 'browser-native-tts') {
            const { promise, cancel } = (0,_lib_audio_browser_tts_preview__WEBPACK_IMPORTED_MODULE_15__/* .playBrowserTTSPreview */ ._d)({
                text: previewText,
                voice: voiceId
            });
            previewCancelRef.current = cancel;
            try {
                await promise;
            } catch  {
            // ignore abort
            }
            setPreviewingId(null);
            return;
        }
        try {
            const controller = new AbortController();
            previewAbortRef.current = controller;
            const providerConfig = ttsProvidersConfig[providerId];
            const providerOptions = await (0,_lib_audio_agent_voice__WEBPACK_IMPORTED_MODULE_10__/* .resolveAgentVoiceOptions */ .wz)(undefined, {
                providerId,
                providerConfig: {
                    ...providerConfig,
                    modelId: modelId || providerConfig?.modelId
                },
                voiceId,
                language: locale
            });
            const res = await fetch('/api/generate/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: previewText,
                    audioId: 'voice-preview',
                    ttsProviderId: providerId,
                    ttsModelId: modelId || providerConfig?.modelId,
                    ttsVoice: voiceId,
                    ttsSpeed: 1,
                    ttsApiKey: providerConfig?.apiKey,
                    // Managed providers resolve their base URL server-side; only send
                    // the client's own base URL (custom providers).
                    ttsBaseUrl: providerConfig?.baseUrl || providerConfig?.customDefaultBaseUrl,
                    ttsProviderOptions: providerOptions
                }),
                signal: controller.signal
            });
            if (!res.ok) throw new Error('TTS error');
            const data = await res.json();
            if (!data.base64) throw new Error('No audio');
            const audio = new Audio(`data:audio/${data.format || 'mp3'};base64,${data.base64}`);
            previewAudioRef.current = audio;
            audio.addEventListener('ended', ()=>setPreviewingId(null));
            audio.addEventListener('error', ()=>setPreviewingId(null));
            await audio.play();
        } catch  {
            setPreviewingId(null);
        }
    }, [
        locale,
        previewingId,
        stopPreview,
        t,
        ttsProvidersConfig
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>stopPreview(), [
        stopPreview
    ]);
    // Disabled (TTS off) OR no enabled provider ⇒ render the same muted,
    // non-interactive pill — don't silently hide the control (#665).
    if (disabled) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            onClick: (e)=>e.stopPropagation(),
            onPointerDown: (e)=>e.stopPropagation(),
            className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-muted/40 px-2.5 text-[11px] text-muted-foreground/30 shrink-0 cursor-not-allowed",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                    className: "size-3 shrink-0"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "truncate flex-1 text-left",
                    children: displayName
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__/* .Popover */ .AM, {
        open: popoverOpen,
        onOpenChange: (open)=>{
            setPopoverOpen(open);
            if (!open) {
                setVoiceQuery('');
                stopPreview();
            }
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__/* .PopoverTrigger */ .Wv, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    onClick: (e)=>e.stopPropagation(),
                    onPointerDown: (e)=>e.stopPropagation(),
                    className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-primary/10 hover:bg-primary/20 dark:bg-primary/25 dark:hover:bg-primary/35 px-2.5 text-[11px] text-primary/80 hover:text-primary dark:text-primary/90 transition-colors shrink-0 cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                            className: "size-3 shrink-0"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "truncate flex-1 text-left",
                            children: displayName
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                            className: "size-3 shrink-0 opacity-50"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_4__/* .PopoverContent */ .hl, {
                side: "bottom",
                align: "end",
                sideOffset: 4,
                className: "w-80 p-0 sm:w-96",
                onClick: (e)=>e.stopPropagation(),
                onPointerDown: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "border-b border-border/50 p-2",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                    className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    value: voiceQuery,
                                    onChange: (e)=>setVoiceQuery(e.target.value),
                                    autoFocus: true,
                                    "aria-label": t('agentBar.searchVoice'),
                                    placeholder: t('agentBar.searchVoice'),
                                    className: "h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "max-h-80 overflow-y-auto p-1",
                        children: [
                            visibleProviderGroups.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "px-3 py-6 text-center text-sm text-muted-foreground/60",
                                children: t('agentBar.noMatchingVoices')
                            }),
                            visibleProviderGroups.map(({ provider, groups })=>groups.map((group)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "sticky top-0 bg-popover px-2 py-1 text-[11px] font-medium text-muted-foreground/60",
                                                children: group.modelId ? `${provider.providerName} · ${group.modelName}` : provider.providerName
                                            }),
                                            group.voices.map((voice)=>{
                                                const currentModelId = ttsProvidersConfig[ttsProviderId]?.modelId || '';
                                                const isActive = ttsProviderId === provider.providerId && ttsVoice === voice.id && currentModelId === (group.modelId || '');
                                                const previewKey = `${provider.providerId}::${voice.id}`;
                                                const isPreviewing = previewingId === previewKey;
                                                const canPreview = !isNonPreviewableVoice(provider.providerId, voice.id);
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex items-center gap-1.5 rounded-sm transition-colors', isActive ? 'bg-primary/10' : 'hover:bg-muted'),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                setTTSProvider(provider.providerId);
                                                                setTTSVoice(voice.id);
                                                                if (group.modelId) {
                                                                    setTTSProviderConfig(provider.providerId, {
                                                                        modelId: group.modelId
                                                                    });
                                                                }
                                                                setPopoverOpen(false);
                                                            },
                                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex-1 text-left text-[13px] px-2 py-1.5 min-w-0 truncate', isActive ? 'text-primary font-medium' : 'text-foreground'),
                                                            children: voice.id === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_11__/* .VOXCPM_AUTO_VOICE_ID */ .p0 ? t('settings.voxcpmAutoVoice') : voice.name
                                                        }),
                                                        canPreview && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                handlePreview(provider.providerId, voice.id, group.modelId);
                                                            },
                                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors', isPreviewing ? 'text-primary' : 'text-muted-foreground/40 hover:text-muted-foreground'),
                                                            children: isPreviewing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                                className: "size-3.5 animate-spin"
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                className: "size-3.5"
                                                            })
                                                        })
                                                    ]
                                                }, previewKey);
                                            })
                                        ]
                                    }, `${provider.providerId}::${group.modelId}`)))
                        ]
                    })
                ]
            })
        ]
    });
}
function AgentBar() {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__/* .useI18n */ .s)();
    const { listAgents } = (0,_lib_orchestration_registry_store__WEBPACK_IMPORTED_MODULE_7__/* .useAgentRegistry */ .E_)();
    const selectedAgentIds = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.selectedAgentIds);
    const setSelectedAgentIds = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setSelectedAgentIds);
    const agentMode = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.agentMode);
    const setAgentMode = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setAgentMode);
    const setAgentSelectionIsUserSet = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setAgentSelectionIsUserSet);
    const ttsProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.ttsProvidersConfig);
    const ttsEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.ttsEnabled);
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [browserVoices, setBrowserVoices] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { profiles: voxcpmProfiles } = (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_9__/* .useVoxCPMVoiceProfiles */ .tD)();
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Load browser native TTS voices
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if ( false || !window.speechSynthesis) return;
        const loadVoices = ()=>setBrowserVoices(speechSynthesis.getVoices());
        loadVoices();
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
        return ()=>speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    }, []);
    const allAgents = listAgents();
    const agents = allAgents.filter((a)=>!a.isGenerated);
    const teacherAgent = agents.find((a)=>a.role === 'teacher');
    const selectedAgents = agents.filter((a)=>selectedAgentIds.includes(a.id));
    const nonTeacherSelected = selectedAgents.filter((a)=>a.role !== 'teacher');
    // Single source of truth for selectable provider+voice options (enabled
    // providers + opt-in browser-native), shared with discussion TTS (#665).
    const availableProviders = (0,_lib_audio_voice_resolver__WEBPACK_IMPORTED_MODULE_8__/* .getSelectableProvidersWithVoices */ .CW)(ttsProvidersConfig, voxcpmProfiles, browserVoices);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        const handler = (e)=>{
            const target = e.target;
            if (containerRef.current && containerRef.current.contains(target)) return;
            // Don't close if clicking inside a Radix portal (Popover, Select, etc.)
            if (target.closest?.('[data-radix-popper-content-wrapper]')) return;
            setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return ()=>document.removeEventListener('mousedown', handler);
    }, [
        open
    ]);
    const handleModeChange = (mode)=>{
        // Clicking the already-active tab is a visual no-op; it must not convert
        // stage-derived defaults into a "user choice".
        if (mode === agentMode) return;
        // An explicit choice — restoreAgentSelection keeps it across classrooms.
        setAgentSelectionIsUserSet(true);
        setAgentMode(mode);
        if (mode === 'preset') {
            // Remove stale auto-generated agent IDs that may linger from a previous auto classroom
            const presetIds = selectedAgentIds.filter((id)=>agents.some((a)=>a.id === id));
            const hasTeacher = presetIds.some((id)=>{
                const a = agents.find((agent)=>agent.id === id);
                return a?.role === 'teacher';
            });
            if (!hasTeacher && teacherAgent) {
                presetIds.unshift(teacherAgent.id);
            }
            setSelectedAgentIds(presetIds.length > 0 ? presetIds : [
                'default-1',
                'default-2',
                'default-3'
            ]);
        } else {
            // Auto mode plays the current classroom's generated agents — leaving the
            // preset ids selected would desync playback from the toggle (UI says
            // Auto, discussion still uses preset agents) and persist an auto
            // selection that can never validate on restore. When no classroom's
            // agents are loaded (fresh home), an empty selection falls back to the
            // stage-derived defaults on the next classroom load.
            setSelectedAgentIds(allAgents.filter((a)=>a.isGenerated).map((a)=>a.id));
        }
    };
    const toggleAgent = (agentId)=>{
        const agent = agents.find((a)=>a.id === agentId);
        if (agent?.role === 'teacher') return;
        setAgentSelectionIsUserSet(true);
        if (selectedAgentIds.includes(agentId)) {
            setSelectedAgentIds(selectedAgentIds.filter((id)=>id !== agentId));
        } else {
            setSelectedAgentIds([
                ...selectedAgentIds,
                agentId
            ]);
        }
    };
    const getAgentName = (agent)=>{
        const key = `settings.agentNames.${agent.id}`;
        const translated = t(key);
        return translated !== key ? translated : agent.name;
    };
    const getAgentRole = (agent)=>{
        const key = `settings.agentRoles.${agent.role}`;
        const translated = t(key);
        return translated !== key ? translated : agent.role;
    };
    const avatarRow = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-1.5 shrink-0",
        children: [
            teacherAgent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "size-8 rounded-full overflow-hidden ring-2 ring-blue-400/40 dark:ring-blue-500/30 shrink-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AgentAvatarImg, {
                    avatar: teacherAgent.avatar,
                    alt: getAgentName(teacherAgent),
                    className: "size-full object-cover",
                    emojiClassName: "text-lg"
                })
            }),
            agentMode === 'auto' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex -space-x-2",
                        children: agents.find((a)=>a.role === 'assistant') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "size-6 rounded-full overflow-hidden ring-[1.5px] ring-background",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AgentAvatarImg, {
                                avatar: agents.find((a)=>a.role === 'assistant').avatar,
                                alt: "",
                                className: "size-full object-cover",
                                emojiClassName: "text-sm"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                        className: "size-4 text-violet-400 dark:text-violet-500"
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: nonTeacherSelected.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex -space-x-2",
                    children: [
                        nonTeacherSelected.slice(0, 4).map((agent)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "size-6 rounded-full overflow-hidden ring-[1.5px] ring-background",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AgentAvatarImg, {
                                    avatar: agent.avatar,
                                    alt: getAgentName(agent),
                                    className: "size-full object-cover",
                                    emojiClassName: "text-sm"
                                })
                            }, agent.id)),
                        nonTeacherSelected.length > 4 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "size-6 rounded-full bg-muted ring-[1.5px] ring-background flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[9px] font-bold text-muted-foreground",
                                children: [
                                    "+",
                                    nonTeacherSelected.length - 4
                                ]
                            })
                        })
                    ]
                })
            }),
            ttsEnabled ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                className: "size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors"
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                className: "size-3.5 text-muted-foreground/30"
            })
        ]
    });
    const renderAgentRow = (agent, agentIndex, isTeacher)=>{
        const isSelected = isTeacher || selectedAgentIds.includes(agent.id);
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            onClick: isTeacher ? undefined : ()=>toggleAgent(agent.id),
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors', isTeacher ? 'bg-primary/5' : 'cursor-pointer', !isTeacher && isSelected && 'bg-primary/5', !isTeacher && !isSelected && 'hover:bg-muted/50'),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_checkbox__WEBPACK_IMPORTED_MODULE_3__/* .Checkbox */ .S, {
                    checked: isSelected,
                    disabled: isTeacher,
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('pointer-events-none', isTeacher && 'opacity-50')
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "size-7 rounded-full overflow-hidden shrink-0 ring-1 ring-border/40",
                    style: {
                        boxShadow: isSelected ? `0 0 0 2px ${agent.color}30` : undefined
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AgentAvatarImg, {
                        avatar: agent.avatar,
                        alt: getAgentName(agent),
                        className: "size-full object-cover",
                        emojiClassName: "text-base"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-[13px] font-medium truncate min-w-0 flex-1",
                    children: getAgentName(agent)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-[10px] text-muted-foreground/50 shrink-0 w-[52px] text-right",
                    children: getAgentRole(agent)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AgentVoicePill, {
                    agent: agent,
                    agentIndex: agentIndex,
                    availableProviders: availableProviders,
                    disabled: !ttsEnabled || availableProviders.length === 0
                })
            ]
        }, agent.id);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: containerRef,
        className: "relative w-96",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .Tooltip */ .m_, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .TooltipTrigger */ .k$, {
                        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('group flex items-center gap-2 cursor-pointer rounded-full px-2.5 py-2 transition-all w-full', 'border border-border/50 text-muted-foreground/70 hover:text-foreground hover:bg-muted/60'),
                            onClick: ()=>setOpen(!open)
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors hidden sm:block font-medium flex-1 text-left truncate",
                                    children: open ? t('agentBar.expandedTitle') : t('agentBar.readyToLearn')
                                }),
                                avatarRow,
                                open ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                    className: "size-3 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                    className: "size-3 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors"
                                })
                            ]
                        })
                    }),
                    !open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .TooltipContent */ .ZI, {
                        side: "bottom",
                        sideOffset: 4,
                        children: t('agentBar.configTooltip')
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_23__/* .AnimatePresence */ .N, {
                children: open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_24__/* .motion */ .PY1.div, {
                    initial: {
                        opacity: 0,
                        y: -4,
                        scale: 0.97
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: -4,
                        scale: 0.97
                    },
                    transition: {
                        duration: 0.2,
                        ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                        ]
                    },
                    className: "absolute right-0 top-full mt-1 z-50 w-96",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] shadow-[0_1px_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_8px_-2px_rgba(0,0,0,0.3)] px-2 py-1.5",
                        children: [
                            teacherAgent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-primary/5 mb-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "size-7 rounded-full overflow-hidden shrink-0 ring-1 ring-border/40",
                                        style: {
                                            boxShadow: `0 0 0 2px ${teacherAgent.color}30`
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AgentAvatarImg, {
                                            avatar: teacherAgent.avatar,
                                            alt: getAgentName(teacherAgent),
                                            className: "size-full object-cover",
                                            emojiClassName: "text-base"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[13px] font-medium truncate min-w-0 flex-1",
                                        children: getAgentName(teacherAgent)
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TeacherVoicePill, {
                                        availableProviders: availableProviders,
                                        disabled: !ttsEnabled || availableProviders.length === 0
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex rounded-lg border bg-muted/30 p-0.5 mb-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>handleModeChange('preset'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex-1 py-1.5 text-xs font-medium rounded-md transition-all text-center', agentMode === 'preset' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'),
                                        children: t('settings.agentModePreset')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>handleModeChange('auto'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_14__.cn)('flex-1 py-1.5 text-xs font-medium rounded-md transition-all text-center flex items-center justify-center gap-1', agentMode === 'auto' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                className: "h-3 w-3"
                                            }),
                                            t('settings.agentModeAuto')
                                        ]
                                    })
                                ]
                            }),
                            agentMode === 'preset' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "max-h-56 overflow-y-auto -mx-0.5",
                                children: agents.filter((a)=>a.role !== 'teacher').map((agent, idx)=>renderAgentRow(agent, idx + 1, false))
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col items-center pt-6 pb-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "absolute size-10 rounded-full bg-violet-400/10 dark:bg-violet-400/15 animate-ping [animation-duration:3s]"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "absolute size-12 rounded-full bg-violet-400/5 dark:bg-violet-400/10 animate-pulse [animation-duration:2.5s]"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronDown_ChevronUp_Loader2_Search_Shuffle_Sparkles_Volume2_VolumeX_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                className: "relative size-5 text-violet-400 dark:text-violet-500"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex-1"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "text-center space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[11px] text-muted-foreground/60",
                                                children: t('settings.agentModeAutoDesc')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] text-muted-foreground/40",
                                                children: t('agentBar.voiceAutoAssign')
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 2234:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ ProviderConfigPanel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65891);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34018);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(46844);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1275);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(57990);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(9383);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(66763);
/* harmony import */ var _barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(25879);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71442);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(41120);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(40980);
/* harmony import */ var _lib_utils_app_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(57434);
/* __next_internal_client_entry_do_not_use__ ProviderConfigPanel auto */ 










function ProviderConfigPanel({ provider, initialApiKey, initialBaseUrl, initialRequiresApiKey, providersConfig, onConfigChange, onSave, onEditModel, onDeleteModel, onAddModel, onResetToDefault, isBuiltIn }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    // Local state for this provider
    const [apiKey, setApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialApiKey);
    const [baseUrl, setBaseUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialBaseUrl);
    const [requiresApiKey, setRequiresApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialRequiresApiKey);
    const [showApiKey, setShowApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [testStatus, setTestStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [testMessage, setTestMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [showResetDialog, setShowResetDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Update local state when provider changes or initial values change
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync local state from props on provider change
        setApiKey(initialApiKey);
        setBaseUrl(initialBaseUrl);
        setRequiresApiKey(initialRequiresApiKey);
        setTestStatus('idle');
        setTestMessage('');
    }, [
        provider.id,
        initialApiKey,
        initialBaseUrl,
        initialRequiresApiKey
    ]);
    // Notify parent of changes
    const handleApiKeyChange = (key)=>{
        setApiKey(key);
        onConfigChange(key, baseUrl, requiresApiKey);
    };
    const handleBaseUrlChange = (url)=>{
        setBaseUrl(url);
        onConfigChange(apiKey, url, requiresApiKey);
    };
    const handleRequiresApiKeyChange = (requires)=>{
        setRequiresApiKey(requires);
        onConfigChange(apiKey, baseUrl, requires);
    };
    const handleTestApi = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setTestStatus('testing');
        setTestMessage('');
        const availableModels = providersConfig[provider.id]?.models || [];
        if (availableModels.length === 0) {
            setTestStatus('error');
            setTestMessage(t('settings.noModelsAvailable') || 'No models available for testing');
            return;
        }
        const testModelId = availableModels[0].id;
        try {
            const response = await fetch('/api/verify-model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify((0,_utils__WEBPACK_IMPORTED_MODULE_8__/* .createVerifyModelRequest */ .sS)({
                    providerId: provider.id,
                    modelId: testModelId,
                    apiKey,
                    baseUrl,
                    providerType: provider.type,
                    requiresApiKey
                }))
            });
            const data = await response.json();
            if (data.success) {
                setTestStatus('success');
                setTestMessage(t('settings.connectionSuccess'));
            } else {
                setTestStatus('error');
                setTestMessage(data.error || t('settings.connectionFailed'));
            }
        } catch (_error) {
            setTestStatus('error');
            setTestMessage(t('settings.connectionFailed'));
        }
    }, [
        apiKey,
        baseUrl,
        provider.id,
        provider.type,
        requiresApiKey,
        providersConfig,
        t
    ]);
    const models = providersConfig[provider.id]?.models || [];
    const isServerConfigured = providersConfig[provider.id]?.isServerConfigured;
    // When the operator pins an allowed model list (MODELS env/yaml), the model
    // catalog is admin-managed too — view-only, no add/edit/delete. Without a
    // pinned list the server manages only credentials and the user curates models.
    const modelsLocked = !!providersConfig[provider.id]?.serverModels?.length;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6 max-w-3xl",
        children: [
            isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300",
                children: t('settings.serverConfiguredNotice')
            }),
            !isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-950/30 p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "h-4 w-4 mt-0.5 text-amber-600 dark:text-amber-400 shrink-0"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-sm font-medium text-amber-900 dark:text-amber-200 flex items-center gap-1.5",
                                                children: t('settings.byokRedirectTitle')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs text-amber-800 dark:text-amber-300/90 mt-1 leading-relaxed",
                                                children: t('settings.byokRedirectBody')
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                type: "button",
                                size: "sm",
                                variant: "outline",
                                className: "gap-1.5 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/40",
                                onClick: ()=>(0,_lib_utils_app_events__WEBPACK_IMPORTED_MODULE_7__/* .openAppSettings */ .vx)('ai-providers'),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    t('settings.byokRedirectButton'),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "h-3 w-3 opacity-70"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                children: t('settings.apiHost')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                name: `llm-base-url-${provider.id}`,
                                type: "url",
                                autoComplete: "off",
                                autoCapitalize: "none",
                                autoCorrect: "off",
                                spellCheck: false,
                                placeholder: provider.defaultBaseUrl || 'https://api.example.com/v1',
                                value: baseUrl,
                                onChange: (e)=>handleBaseUrlChange(e.target.value),
                                onBlur: onSave,
                                className: "h-8"
                            }),
                            provider.alternateBaseUrls && provider.alternateBaseUrls.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex flex-wrap items-center gap-1.5",
                                children: provider.alternateBaseUrls.map((alt)=>{
                                    const active = (baseUrl || provider.defaultBaseUrl) === alt.url;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            handleBaseUrlChange(alt.url);
                                            onSave();
                                        },
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('px-2 py-0.5 text-xs rounded-md border transition-colors', active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border hover:bg-muted'),
                                        children: t(alt.label)
                                    }, alt.url);
                                })
                            }),
                            (()=>{
                                const effectiveBaseUrl = baseUrl || provider.defaultBaseUrl || '';
                                if (!effectiveBaseUrl) return null;
                                // Generate endpoint path based on provider type
                                let endpointPath = '';
                                switch(provider.type){
                                    case 'openai':
                                        endpointPath = '/chat/completions';
                                        break;
                                    case 'anthropic':
                                        endpointPath = '/messages';
                                        break;
                                    case 'google':
                                        endpointPath = '/models/[model]';
                                        break;
                                    default:
                                        endpointPath = '';
                                }
                                const fullUrl = effectiveBaseUrl + endpointPath;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-xs text-muted-foreground break-all",
                                    children: [
                                        t('settings.requestUrl'),
                                        ": ",
                                        fullUrl
                                    ]
                                });
                            })()
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_4__/* .Label */ .J, {
                                        className: "text-base",
                                        children: t('settings.models')
                                    }),
                                    modelsLocked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] px-1 py-0 h-4 leading-4 rounded bg-muted text-muted-foreground",
                                        children: t('settings.serverConfigured')
                                    })
                                ]
                            }),
                            !modelsLocked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 flex-wrap",
                                children: [
                                    isBuiltIn && onResetToDefault && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>setShowResetDialog(true),
                                        className: "gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "h-3.5 w-3.5"
                                            }),
                                            t('settings.reset')
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: onAddModel,
                                        className: "gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                className: "h-3.5 w-3.5"
                                            }),
                                            t('settings.addNewModel')
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-1.5",
                        children: models.map((model, index)=>{
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "font-mono text-sm font-medium mb-1.5",
                                                children: model.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 text-xs text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            model.capabilities?.vision && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                title: t('settings.capabilities.vision'),
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                                    className: "h-3 w-3"
                                                                })
                                                            }),
                                                            model.capabilities?.tools && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                title: t('settings.capabilities.tools'),
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                                    className: "h-3 w-3"
                                                                })
                                                            }),
                                                            model.capabilities?.streaming && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                title: t('settings.capabilities.streaming'),
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                                    className: "h-3 w-3"
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    model.contextWindow && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                                className: "h-3 w-3"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[10px]",
                                                                children: (0,_utils__WEBPACK_IMPORTED_MODULE_8__/* .formatContextWindow */ .FO)(model.contextWindow)
                                                            })
                                                        ]
                                                    }),
                                                    model.outputWindow && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                                className: "h-3 w-3"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[10px]",
                                                                children: (0,_utils__WEBPACK_IMPORTED_MODULE_8__/* .formatContextWindow */ .FO)(model.outputWindow)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    !modelsLocked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                                variant: "outline",
                                                size: "sm",
                                                className: "h-8 px-2",
                                                onClick: ()=>onEditModel(index),
                                                title: t('settings.editModel'),
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                                                variant: "outline",
                                                size: "sm",
                                                className: "h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                                                onClick: ()=>onDeleteModel(index),
                                                title: t('settings.deleteModel'),
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_FileText_Key_Plus_RotateCcw_Send_Settings2_Shield_Sparkles_Trash2_Wrench_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }, model.id);
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialog */ .Lt, {
                open: showResetDialog,
                onOpenChange: setShowResetDialog,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogContent */ .EO, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogTitle */ .r7, {
                                    children: t('settings.resetToDefault')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogDescription */ .$v, {
                                    children: t('settings.resetConfirmDescription')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogCancel */ .Zr, {
                                    children: t('settings.cancelEdit')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogAction */ .Rx, {
                                    onClick: ()=>{
                                        setShowResetDialog(false);
                                        onResetToDefault?.();
                                    },
                                    children: t('settings.confirmReset')
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

/***/ 4522:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ VideoSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28276);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(75748);
/* harmony import */ var _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2119);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(66763);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(25879);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ VideoSettings auto */ 










function VideoSettings({ selectedProviderId }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const videoModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.videoModelId);
    const videoProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.videoProvidersConfig);
    const setVideoProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.setVideoProviderConfig);
    const [showApiKey, setShowApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [testLoading, setTestLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [testStatus, setTestStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [testMessage, setTestMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Model dialog state
    const [showModelDialog, setShowModelDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editingModelIndex, setEditingModelIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [modelForm, setModelForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        id: '',
        name: ''
    });
    // Reset test state when provider changes (derived state pattern)
    const [prevSelectedProviderId, setPrevSelectedProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(selectedProviderId);
    if (selectedProviderId !== prevSelectedProviderId) {
        setPrevSelectedProviderId(selectedProviderId);
        setTestStatus('idle');
        setTestMessage('');
    }
    const currentConfig = videoProvidersConfig[selectedProviderId];
    const currentProvider = _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_8__/* .VIDEO_PROVIDERS */ .l[selectedProviderId];
    const builtInModels = currentProvider?.models || [];
    const customModels = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>currentConfig?.customModels || [], [
        currentConfig?.customModels
    ]);
    const isServerConfigured = !!currentConfig?.isServerConfigured;
    const handleApiKeyChange = (apiKey)=>{
        setVideoProviderConfig(selectedProviderId, {
            apiKey
        });
    };
    const handleBaseUrlChange = (baseUrl)=>{
        setVideoProviderConfig(selectedProviderId, {
            baseUrl
        });
    };
    const handleTest = async ()=>{
        setTestLoading(true);
        setTestStatus('idle');
        setTestMessage('');
        try {
            const response = await fetch('/api/verify-video-provider', {
                method: 'POST',
                headers: {
                    'x-video-provider': selectedProviderId,
                    'x-video-model': videoModelId || '',
                    'x-api-key': currentConfig?.apiKey || '',
                    'x-base-url': currentConfig?.baseUrl || ''
                }
            });
            const data = await response.json();
            if (data.success) {
                setTestStatus('success');
                setTestMessage(t('settings.videoConnectivitySuccess'));
            } else {
                setTestStatus('error');
                setTestMessage(`${t('settings.videoConnectivityFailed')}: ${data.message}`);
            }
        } catch (err) {
            setTestStatus('error');
            setTestMessage(`${t('settings.videoConnectivityFailed')}: ${err}`);
        } finally{
            setTestLoading(false);
        }
    };
    // Model CRUD
    const handleOpenAddModel = ()=>{
        setEditingModelIndex(null);
        setModelForm({
            id: '',
            name: ''
        });
        setShowModelDialog(true);
    };
    const handleOpenEditModel = (index)=>{
        setEditingModelIndex(index);
        setModelForm({
            ...customModels[index]
        });
        setShowModelDialog(true);
    };
    const handleSaveModel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!modelForm.id.trim()) return;
        const newCustomModels = [
            ...customModels
        ];
        if (editingModelIndex !== null) {
            newCustomModels[editingModelIndex] = {
                id: modelForm.id.trim(),
                name: modelForm.name.trim() || modelForm.id.trim()
            };
        } else {
            newCustomModels.push({
                id: modelForm.id.trim(),
                name: modelForm.name.trim() || modelForm.id.trim()
            });
        }
        setVideoProviderConfig(selectedProviderId, {
            customModels: newCustomModels
        });
        setShowModelDialog(false);
    }, [
        modelForm,
        editingModelIndex,
        customModels,
        selectedProviderId,
        setVideoProviderConfig
    ]);
    const handleDeleteModel = (index)=>{
        const newCustomModels = customModels.filter((_, i)=>i !== index);
        setVideoProviderConfig(selectedProviderId, {
            customModels: newCustomModels
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6 max-w-3xl",
        children: [
            isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300",
                children: t('settings.serverConfiguredNotice')
            }),
            !isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                children: "API Key"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative flex-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                name: `video-api-key-${selectedProviderId}`,
                                                type: showApiKey ? 'text' : 'password',
                                                autoComplete: "new-password",
                                                autoCapitalize: "none",
                                                autoCorrect: "off",
                                                spellCheck: false,
                                                placeholder: selectedProviderId === 'kling' ? 'accessKey:secretKey' : t('settings.enterApiKey'),
                                                value: currentConfig?.apiKey || '',
                                                onChange: (e)=>handleApiKeyChange(e.target.value),
                                                className: "h-8 pr-8"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setShowApiKey(!showApiKey),
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: handleTest,
                                        disabled: testLoading || !currentConfig?.apiKey,
                                        className: "gap-1.5",
                                        children: testLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                            className: "h-3.5 w-3.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5"
                                                }),
                                                t('settings.testConnection')
                                            ]
                                        })
                                    })
                                ]
                            }),
                            testMessage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('rounded-lg p-3 text-sm overflow-hidden', testStatus === 'success' && 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800', testStatus === 'error' && 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800'),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-2 min-w-0",
                                    children: [
                                        testStatus === 'success' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                            className: "h-4 w-4 mt-0.5 shrink-0"
                                        }),
                                        testStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "h-4 w-4 mt-0.5 shrink-0"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "flex-1 min-w-0 break-all",
                                            children: testMessage
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                children: "Base URL"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                name: `video-base-url-${selectedProviderId}`,
                                type: "url",
                                autoComplete: "off",
                                autoCapitalize: "none",
                                autoCorrect: "off",
                                spellCheck: false,
                                value: currentConfig?.baseUrl || '',
                                onChange: (e)=>handleBaseUrlChange(e.target.value),
                                placeholder: currentProvider?.defaultBaseUrl || t('settings.enterCustomBaseUrl'),
                                className: "h-8"
                            }),
                            (()=>{
                                const effectiveBaseUrl = currentConfig?.baseUrl || currentProvider?.defaultBaseUrl || '';
                                if (!effectiveBaseUrl) return null;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-xs text-muted-foreground break-all",
                                    children: [
                                        t('settings.requestUrl'),
                                        ": ",
                                        effectiveBaseUrl
                                    ]
                                });
                            })()
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                className: "text-base",
                                children: t('settings.models')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                variant: "outline",
                                size: "sm",
                                onClick: handleOpenAddModel,
                                className: "gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    t('settings.addNewModel')
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            builtInModels.map((model)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "font-mono text-sm font-medium",
                                                children: model.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-xs text-muted-foreground font-mono mt-0.5",
                                                children: model.id
                                            })
                                        ]
                                    })
                                }, model.id)),
                            customModels.map((model, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "font-mono text-sm font-medium",
                                                    children: model.name
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-xs text-muted-foreground font-mono mt-0.5",
                                                    children: model.id
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "h-8 px-2",
                                                    onClick: ()=>handleOpenEditModel(index),
                                                    title: t('settings.editModel'),
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                        className: "h-3.5 w-3.5"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                                                    onClick: ()=>handleDeleteModel(index),
                                                    title: t('settings.deleteModel'),
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                        className: "h-3.5 w-3.5"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }, `custom-${index}`))
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .Dialog */ .lG, {
                open: showModelDialog,
                onOpenChange: setShowModelDialog,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogTitle */ .L3, {
                            children: editingModelIndex !== null ? t('settings.editModel') : t('settings.addNewModel')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogDescription */ .rr, {
                            className: "sr-only",
                            children: editingModelIndex !== null ? t('settings.editModel') : t('settings.addNewModel')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 pt-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                            children: t('settings.modelId')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                            value: modelForm.id,
                                            onChange: (e)=>setModelForm((prev)=>({
                                                        ...prev,
                                                        id: e.target.value
                                                    })),
                                            placeholder: "e.g. my-custom-model-v1",
                                            className: "h-8 font-mono text-sm"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                            children: t('settings.modelName')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                            value: modelForm.name,
                                            onChange: (e)=>setModelForm((prev)=>({
                                                        ...prev,
                                                        name: e.target.value
                                                    })),
                                            placeholder: "e.g. My Custom Model",
                                            className: "h-8 text-sm"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-end gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: ()=>setShowModelDialog(false),
                                            children: t('settings.cancelEdit')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                            size: "sm",
                                            onClick: handleSaveModel,
                                            disabled: !modelForm.id.trim(),
                                            children: t('settings.saveModel')
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

/***/ 9805:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ ProviderList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27388);
/* harmony import */ var _barrel_optimize_names_Box_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29450);
/* harmony import */ var _barrel_optimize_names_Box_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2125);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40980);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71442);
/* harmony import */ var _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56497);
/* __next_internal_client_entry_do_not_use__ ProviderList auto */ 





function ProviderList({ providers, selectedProviderId, onSelect, onAddProvider, width }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    // Helper function to get translated provider name
    const getProviderDisplayName = (provider)=>{
        const translationKey = `settings.providerNames.${provider.id}`;
        const translated = t(translationKey);
        // If translation exists (not equal to key), use it; otherwise fallback to provider.name
        return translated !== translationKey ? translated : provider.name;
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-shrink-0 bg-background flex flex-col",
        style: {
            width: width ?? 192
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto p-3 space-y-1.5",
                children: providers.map((provider)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>onSelect(provider.id),
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all border text-left', selectedProviderId === provider.id ? 'bg-primary/5 border-primary/50 shadow-sm' : 'border-transparent hover:bg-muted/50'),
                        children: [
                            provider.icon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: provider.icon,
                                alt: getProviderDisplayName(provider),
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('w-5 h-5 rounded', _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_3__/* .MONO_LOGO_PROVIDERS */ .P.has(provider.id) && 'dark:invert'),
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "h-5 w-5 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "font-medium text-sm flex-1 truncate",
                                children: getProviderDisplayName(provider)
                            }),
                            provider.isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[10px] px-1 py-0 h-4 leading-4 rounded shrink-0 bg-muted text-muted-foreground",
                                children: t('settings.serverConfigured')
                            })
                        ]
                    }, provider.id))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "p-3 border-t",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_1__/* .Button */ .$, {
                    variant: "outline",
                    size: "sm",
                    className: "w-full gap-1.5",
                    onClick: onAddProvider,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "h-3.5 w-3.5"
                        }),
                        t('settings.addProviderButton')
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 11096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenMAICClassroomTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71442);
/* harmony import */ var _lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43385);
/* harmony import */ var _components_openmaic_access_code_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43221);
/* harmony import */ var _components_openmaic_home_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(73634);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * OpenMAIC Classroom Tab — mounts the real ported OpenMAIC HomePage inside
 * the MedQ app shell.
 *
 * The previous "AI Classroom" tab (`AIChatroomTab.tsx`) was a self-contained
 * stub that simulated lesson generation with setTimeout and fake data, while
 * the actual OpenMAIC UI (topic input → /openmaic-generation-preview →
 * /classroom/[id]) sat unused in `src/components/openmaic/*`.
 *
 * This wrapper restores the real OpenMAIC UX by mounting `<OpenMAICHomePage>`
 * with the two context providers it requires:
 *   • `<I18nProvider>`  — OpenMAIC UI strings (useI18n)
 *   • `<ThemeProvider>` — dark/light/-system theme (useTheme)
 *
 * Both providers are isolated to this tab so they don't affect the rest of
 * MedQ's i18n/theme stack (matches the layout strategy used by the
 * `/openmaic-generation-preview` and `/classroom/[id]` routes).
 *
 * The `<AccessCodeGuard>` is also mounted so the access-code flow (if the
 * `ACCESS_CODE` env var is set) is consistent with the standalone OpenMAIC
 * routes. When `ACCESS_CODE` is unset (default), the guard is a no-op.
 */ 



function OpenMAICClassroomTab() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_1__.I18nProvider, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_access_code_guard__WEBPACK_IMPORTED_MODULE_3__/* .AccessCodeGuard */ .X, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_home_page__WEBPACK_IMPORTED_MODULE_4__/* .OpenMAICHomePage */ .X, {})
            })
        })
    });
}


/***/ }),

/***/ 11808:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ isMediaPlaceholder),
/* harmony export */   z: () => (/* binding */ useMediaGenerationStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41535);
/* harmony import */ var _lib_utils_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29732);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7603);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/store/media-generation.ts
 *
 * Verbatim port — adaptation limited to `@/lib/utils/database` being a
 * MedQ subset port of the Dexie schema (only the `mediaFiles` table is
 * declared in medq, which is all this store reads).
 */ /**
 * Media Generation Store
 *
 * Tracks per-element media generation status (pending → generating → done/failed).
 * Drives skeleton loading in slide renderer components.
 * Persistence is handled by IndexedDB (mediaFiles table), not Zustand middleware.
 */ 


const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('MediaGenerationStore');
// ==================== Helper ====================
/** Check if a src string is a generated media placeholder ID */ function isMediaPlaceholder(src) {
    return /^gen_(img|vid)_[\w-]+$/i.test(src);
}
// ==================== Store ====================
const useMediaGenerationStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__/* .create */ .v)()((set, get)=>({
        tasks: {},
        enqueueTasks: (stageId, requests)=>{
            const newTasks = {};
            for (const req of requests){
                // Skip if already tracked
                if (get().tasks[req.elementId]) continue;
                newTasks[req.elementId] = {
                    elementId: req.elementId,
                    type: req.type,
                    status: 'pending',
                    prompt: req.prompt,
                    params: {
                        aspectRatio: req.aspectRatio,
                        style: req.style
                    },
                    retryCount: 0,
                    stageId
                };
            }
            if (Object.keys(newTasks).length > 0) {
                set((s)=>({
                        tasks: {
                            ...s.tasks,
                            ...newTasks
                        }
                    }));
            }
        },
        markGenerating: (elementId)=>set((s)=>{
                const task = s.tasks[elementId];
                if (!task) return s;
                return {
                    tasks: {
                        ...s.tasks,
                        [elementId]: {
                            ...task,
                            status: 'generating'
                        }
                    }
                };
            }),
        markDone: (elementId, objectUrl, poster)=>set((s)=>{
                const task = s.tasks[elementId];
                if (!task) return s;
                return {
                    tasks: {
                        ...s.tasks,
                        [elementId]: {
                            ...task,
                            status: 'done',
                            objectUrl,
                            poster,
                            error: undefined
                        }
                    }
                };
            }),
        markFailed: (elementId, error, errorCode)=>set((s)=>{
                const task = s.tasks[elementId];
                if (!task) return s;
                return {
                    tasks: {
                        ...s.tasks,
                        [elementId]: {
                            ...task,
                            status: 'failed',
                            error,
                            errorCode
                        }
                    }
                };
            }),
        markPendingForRetry: (elementId)=>set((s)=>{
                const task = s.tasks[elementId];
                if (!task) return s;
                return {
                    tasks: {
                        ...s.tasks,
                        [elementId]: {
                            ...task,
                            status: 'pending',
                            error: undefined,
                            errorCode: undefined,
                            retryCount: task.retryCount + 1
                        }
                    }
                };
            }),
        getTask: (elementId)=>get().tasks[elementId],
        isReady: (elementId)=>get().tasks[elementId]?.status === 'done',
        restoreFromDB: async (stageId)=>{
            try {
                const records = await _lib_utils_database__WEBPACK_IMPORTED_MODULE_0__.db.mediaFiles.where('stageId').equals(stageId).toArray();
                const restored = {};
                for (const rec of records){
                    // Extract elementId from compound key (stageId:elementId)
                    const elementId = rec.id.includes(':') ? rec.id.split(':').slice(1).join(':') : rec.id;
                    const params = JSON.parse(rec.params || '{}');
                    if (rec.error) {
                        // Restore as failed task (persisted non-retryable error)
                        restored[elementId] = {
                            elementId,
                            type: rec.type,
                            status: 'failed',
                            prompt: rec.prompt,
                            params,
                            error: rec.error,
                            errorCode: rec.errorCode,
                            retryCount: 0,
                            stageId
                        };
                    } else {
                        // Re-wrap blob with stored mimeType — IndexedDB may drop Blob.type
                        const blob = rec.blob.type ? rec.blob : new Blob([
                            rec.blob
                        ], {
                            type: rec.mimeType
                        });
                        const objectUrl = URL.createObjectURL(blob);
                        const poster = rec.poster ? URL.createObjectURL(rec.poster) : undefined;
                        restored[elementId] = {
                            elementId,
                            type: rec.type,
                            status: 'done',
                            prompt: rec.prompt,
                            params,
                            objectUrl,
                            poster,
                            retryCount: 0,
                            stageId
                        };
                    }
                }
                if (Object.keys(restored).length > 0) {
                    set((s)=>({
                            tasks: {
                                ...s.tasks,
                                ...restored
                            }
                        }));
                }
            } catch (err) {
                log.error('Failed to restore from DB:', err);
            }
        },
        clearStage: (stageId)=>set((s)=>{
                const remaining = {};
                for (const [id, task] of Object.entries(s.tasks)){
                    if (task.stageId !== stageId) {
                        remaining[id] = task;
                    } else if (task.objectUrl) {
                        URL.revokeObjectURL(task.objectUrl);
                        if (task.poster) URL.revokeObjectURL(task.poster);
                    }
                }
                return {
                    tasks: remaining
                };
            }),
        revokeObjectUrls: ()=>{
            const tasks = get().tasks;
            for (const task of Object.values(tasks)){
                if (task.objectUrl) URL.revokeObjectURL(task.objectUrl);
                if (task.poster) URL.revokeObjectURL(task.poster);
            }
        }
    }));


/***/ }),

/***/ 14037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cv: () => (/* binding */ listStages),
/* harmony export */   UI: () => (/* binding */ getFirstSlideByStages),
/* harmony export */   cl: () => (/* binding */ deleteStageData),
/* harmony export */   kz: () => (/* binding */ revokeThumbnailSlideMediaUrls),
/* harmony export */   loadStageData: () => (/* binding */ loadStageData),
/* harmony export */   p1: () => (/* binding */ renameStage),
/* harmony export */   saveStageData: () => (/* binding */ saveStageData)
/* harmony export */ });
/* unused harmony export stageExists */
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29732);
/* harmony import */ var _chat_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36955);
/* harmony import */ var _playback_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92940);
/* harmony import */ var _lib_quiz_persistence__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79358);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7603);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/stage-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is the real Dexie-backed port, and
 * `@/lib/quiz/persistence` is now ported (pure localStorage). The only path
 * adapted: `@openmaic/dsl` → `@/lib/dsl`.
 */ 




const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('StageStorage');
/**
 * Save stage data to IndexedDB
 */ async function saveStageData(stageId, data) {
    try {
        const now = Date.now();
        // Save to stages table
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.put({
            id: stageId,
            name: data.stage.name || 'Untitled Stage',
            description: data.stage.description,
            createdAt: data.stage.createdAt || now,
            updatedAt: now,
            languageDirective: data.stage.languageDirective,
            style: data.stage.style,
            currentSceneId: data.currentSceneId || undefined,
            agentIds: data.stage.agentIds,
            videoManifest: data.stage.videoManifest,
            interactiveMode: data.stage.interactiveMode,
            taskEngineMode: data.stage.taskEngineMode
        });
        // Delete old scenes first to avoid orphaned data
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).delete();
        // Save new scenes
        if (data.scenes && data.scenes.length > 0) {
            await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.bulkPut(data.scenes.map((scene, index)=>({
                    ...scene,
                    stageId,
                    order: scene.order ?? index,
                    createdAt: scene.createdAt || now,
                    updatedAt: scene.updatedAt || now
                })));
        }
        // Save chat sessions to independent table
        if (data.chats) {
            await (0,_chat_storage__WEBPACK_IMPORTED_MODULE_1__/* .saveChatSessions */ .bm)(stageId, data.chats);
        }
        log.info(`Saved stage: ${stageId}`);
    } catch (error) {
        log.error('Failed to save stage:', error);
        throw error;
    }
}
/**
 * Load stage data from IndexedDB
 */ async function loadStageData(stageId) {
    try {
        // Load stage
        const stage = await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.get(stageId);
        if (!stage) {
            log.info(`Stage not found: ${stageId}`);
            return null;
        }
        // Load scenes
        const scenes = await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).sortBy('order');
        // Load chat sessions from independent table
        const chats = await (0,_chat_storage__WEBPACK_IMPORTED_MODULE_1__/* .loadChatSessions */ .CX)(stageId);
        log.info(`Loaded stage: ${stageId}, scenes: ${scenes.length}, chats: ${chats.length}`);
        return {
            stage,
            scenes,
            currentSceneId: stage.currentSceneId || scenes[0]?.id || null,
            chats
        };
    } catch (error) {
        log.error('Failed to load stage:', error);
        return null;
    }
}
/**
 * Delete stage and all related data
 */ async function deleteStageData(stageId) {
    try {
        // Collect scene ids before deletion so we can sweep per-scene localStorage
        // keys (quiz draft / submitted answers / graded results).
        const sceneIds = (await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).toArray()).map((s)=>s.id);
        // Delete stage
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.delete(stageId);
        // Delete scenes
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).delete();
        // Delete chat sessions and playback state
        await (0,_chat_storage__WEBPACK_IMPORTED_MODULE_1__/* .deleteChatSessions */ .Fs)(stageId);
        await (0,_playback_storage__WEBPACK_IMPORTED_MODULE_2__/* .clearPlaybackState */ .m6)(stageId);
        // Sweep quiz persistence keys for each deleted scene.
        for (const sceneId of sceneIds){
            (0,_lib_quiz_persistence__WEBPACK_IMPORTED_MODULE_4__/* .clearAllForScene */ .sN)(sceneId);
        }
        log.info(`Deleted stage: ${stageId}`);
    } catch (error) {
        log.error('Failed to delete stage:', error);
        throw error;
    }
}
/**
 * List all stages
 */ async function listStages() {
    try {
        const stages = await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.orderBy('updatedAt').reverse().toArray();
        const stageList = await Promise.all(stages.map(async (stage)=>{
            const sceneCount = await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stage.id).count();
            return {
                id: stage.id,
                name: stage.name,
                description: stage.description,
                sceneCount,
                createdAt: stage.createdAt,
                updatedAt: stage.updatedAt,
                interactiveMode: stage.interactiveMode,
                taskEngineMode: stage.taskEngineMode
            };
        }));
        return stageList;
    } catch (error) {
        log.error('Failed to list stages:', error);
        return [];
    }
}
function isGeneratedMediaRef(value) {
    return typeof value === 'string' && /^gen_(img|vid)_[\w-]+$/i.test(value);
}
function isLegacySequentialVideoRef(value) {
    return typeof value === 'string' && /^gen_vid_\d+$/i.test(value);
}
function getThumbnailMediaRef(element) {
    if (element.type === 'image' && isGeneratedMediaRef(element.src)) {
        return element.src;
    }
    if (element.type === 'video') {
        if (isGeneratedMediaRef(element.mediaRef)) return element.mediaRef;
        if (isGeneratedMediaRef(element.src)) return element.src;
    }
    return undefined;
}
function getMediaRecordElementId(recordId) {
    return recordId.includes(':') ? recordId.split(':').slice(1).join(':') : recordId;
}
function blobWithType(blob, mimeType) {
    return blob.type ? blob : new Blob([
        blob
    ], {
        type: mimeType
    });
}
function revokeObjectUrl(url) {
    if (url?.startsWith('blob:')) {
        URL.revokeObjectURL(url);
    }
}
function revokeThumbnailSlideMediaUrls(slides) {
    for (const slide of Object.values(slides)){
        for (const element of slide.elements){
            if (element.type === 'image' || element.type === 'video') {
                revokeObjectUrl(element.src);
            }
            if (element.type === 'video') {
                revokeObjectUrl(element.poster);
            }
        }
    }
}
/**
 * Get first slide scene's canvas data for each stage (for thumbnail preview).
 * Also resolves generated image/video refs from mediaFiles so thumbnails show real media.
 * Returns a map of stageId -> Slide (canvas data with resolved media)
 */ async function getFirstSlideByStages(stageIds) {
    const result = {};
    try {
        await Promise.all(stageIds.map(async (stageId)=>{
            const scenes = await _database__WEBPACK_IMPORTED_MODULE_0__.db.scenes.where('stageId').equals(stageId).sortBy('order');
            const firstSlide = scenes.find((s)=>s.content?.type === 'slide');
            if (firstSlide && firstSlide.content.type === 'slide') {
                const slide = structuredClone(firstSlide.content.canvas);
                const mediaElements = slide.elements.filter((el)=>getThumbnailMediaRef(el));
                if (mediaElements.length > 0) {
                    const mediaRecords = await _database__WEBPACK_IMPORTED_MODULE_0__.db.mediaFiles.where('stageId').equals(stageId).toArray();
                    const videoRecords = mediaRecords.filter((record)=>!record.error && record.type === 'video');
                    const mediaMap = new Map(mediaRecords.map((record)=>[
                            getMediaRecordElementId(record.id),
                            record
                        ]));
                    for (const el of mediaElements){
                        const mediaRef = getThumbnailMediaRef(el);
                        const exactRecord = mediaRef ? mediaMap.get(mediaRef) : undefined;
                        const usableExactRecord = exactRecord && !exactRecord.error ? exactRecord : undefined;
                        const legacyRecord = !exactRecord && el.type === 'video' && isLegacySequentialVideoRef(mediaRef) && videoRecords.length === 1 ? videoRecords[0] : undefined;
                        const record = usableExactRecord ?? legacyRecord;
                        if (!mediaRef || !record) {
                            if (el.type === 'image') {
                                // Clear unresolved placeholder so BaseImageElement won't subscribe
                                // to the global media store (which may have stale data from another course)
                                el.src = '';
                            }
                            continue;
                        }
                        if (el.type === 'image' && record.type === 'image') {
                            el.src = URL.createObjectURL(blobWithType(record.blob, record.mimeType));
                        } else if (el.type === 'video' && record.type === 'video') {
                            el.src = URL.createObjectURL(blobWithType(record.blob, record.mimeType));
                            if (record.poster) {
                                el.poster = URL.createObjectURL(blobWithType(record.poster, 'image/jpeg'));
                            }
                        } else if (el.type === 'image') {
                            el.src = '';
                        }
                    }
                }
                result[stageId] = slide;
            }
        }));
    } catch (error) {
        log.error('Failed to load thumbnails:', error);
    }
    return result;
}
/**
 * Rename a stage (updates only the name field in IndexedDB)
 */ async function renameStage(stageId, newName) {
    try {
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.stages.update(stageId, {
            name: newName,
            updatedAt: Date.now()
        });
        log.info(`Renamed stage ${stageId} to "${newName}"`);
    } catch (error) {
        log.error('Failed to rename stage:', error);
        throw error;
    }
}
/**
 * Check if stage exists
 */ async function stageExists(stageId) {
    try {
        const stage = await db.stages.get(stageId);
        return !!stage;
    } catch (error) {
        log.error('Failed to check stage existence:', error);
        return false;
    }
}


/***/ }),

/***/ 15804:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bq: () => (/* binding */ SelectTrigger),
/* harmony export */   eb: () => (/* binding */ SelectItem),
/* harmony export */   gC: () => (/* binding */ SelectContent),
/* harmony export */   l6: () => (/* binding */ Select),
/* harmony export */   yv: () => (/* binding */ SelectValue)
/* harmony export */ });
/* unused harmony exports SelectGroup, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2342);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94088);
/* __next_internal_client_entry_do_not_use__ Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectScrollDownButton,SelectScrollUpButton,SelectSeparator,SelectTrigger,SelectValue auto */ 




function Select({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL, {
        "data-slot": "select",
        ...props
    });
}
function SelectGroup({ className, ...props }) {
    return /*#__PURE__*/ _jsx(SelectPrimitive.Group, {
        "data-slot": "select-group",
        className: cn('scroll-my-1 p-1', className),
        ...props
    });
}
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Value */ .WT, {
        "data-slot": "select-value",
        ...props
    });
}
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .l9, {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("border-input data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Icon */ .In, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                    className: "text-muted-foreground size-4 pointer-events-none"
                })
            })
        ]
    });
}
function SelectContent({ className, children, position = 'item-aligned', align = 'center', ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .ZL, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .UC, {
            "data-slot": "select-content",
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-md shadow-md ring-1 duration-100 relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
            position: position,
            align: align,
            ...props,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollUpButton, {}),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Viewport */ .LM, {
                    "data-position": position,
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('data-[position=popper]:h-[var(--radix-select-trigger-height)] data-[position=popper]:w-full data-[position=popper]:min-w-[var(--radix-select-trigger-width)]', position === 'popper' && ''),
                    children: children
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectScrollDownButton, {})
            ]
        })
    });
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ _jsx(SelectPrimitive.Label, {
        "data-slot": "select-label",
        className: cn('text-muted-foreground px-2 py-1.5 text-xs', className),
        ...props
    });
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Item */ .q7, {
        "data-slot": "select-item",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
        ...props,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .ItemIndicator */ .VF, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                        className: "pointer-events-none"
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .ItemText */ .p4, {
                children: children
            })
        ]
    });
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ _jsx(SelectPrimitive.Separator, {
        "data-slot": "select-separator",
        className: cn('bg-border -mx-1 my-1 h-px pointer-events-none', className),
        ...props
    });
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .ScrollUpButton */ .PP, {
        "data-slot": "select-scroll-up-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {})
    });
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .ScrollDownButton */ .wn, {
        "data-slot": "select-scroll-down-button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_ChevronDownIcon_ChevronUpIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {})
    });
}



/***/ }),

/***/ 17477:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ useMediaStageId)
/* harmony export */ });
/* unused harmony export MediaStageProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/** Ported from OpenMAIC. Original: lib/contexts/media-stage-context.tsx */ /* __next_internal_client_entry_do_not_use__ MediaStageProvider,useMediaStageId auto */ 
/**
 * Provides the current stageId to media-aware components (BaseImageElement, BaseVideoElement).
 *
 * When set, these components subscribe to the media generation store and only use
 * tasks whose stageId matches (preventing cross-course contamination).
 * When undefined (e.g. homepage thumbnails), store subscription is skipped entirely.
 */ const MediaStageContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
const MediaStageProvider = MediaStageContext.Provider;
function useMediaStageId() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MediaStageContext);
}


/***/ }),

/***/ 21084:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ Switch)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8678);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Switch auto */ 



const Switch = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL, {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input', className),
        ...props,
        ref: ref,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__/* .Thumb */ .zi, {
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0')
        })
    }));
Switch.displayName = _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL.displayName;



/***/ }),

/***/ 21767:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ Switch)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39857);
/* harmony import */ var _base_ui_react_switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89455);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Switch auto */ 


function Switch({ className, size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_switch__WEBPACK_IMPORTED_MODULE_1__/* .SwitchRoot */ .l, {
        "data-slot": "switch",
        "data-size": size,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_switch__WEBPACK_IMPORTED_MODULE_3__/* .SwitchThumb */ .p, {
            "data-slot": "switch-thumb",
            className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
        })
    });
}



/***/ }),

/***/ 28276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cf: () => (/* binding */ DialogContent),
/* harmony export */   L3: () => (/* binding */ DialogTitle),
/* harmony export */   lG: () => (/* binding */ Dialog),
/* harmony export */   rr: () => (/* binding */ DialogDescription)
/* harmony export */ });
/* unused harmony exports DialogClose, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43146);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40980);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27388);
/* harmony import */ var _barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9005);
/* __next_internal_client_entry_do_not_use__ Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogOverlay,DialogPortal,DialogTitle,DialogTrigger auto */ 





function Dialog({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .bL, {
        "data-slot": "dialog",
        ...props
    });
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ _jsx(DialogPrimitive.Trigger, {
        "data-slot": "dialog-trigger",
        ...props
    });
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Portal */ .ZL, {
        "data-slot": "dialog-portal",
        ...props
    });
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ _jsx(DialogPrimitive.Close, {
        "data-slot": "dialog-close",
        ...props
    });
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Overlay */ .hJ, {
        "data-slot": "dialog-overlay",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50', className),
        ...props
    });
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Content */ .UC, {
                "data-slot": "dialog-content",
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-3/4 gap-6 rounded-xl p-6 text-sm ring-1 duration-100 fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2', className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Close */ .bm, {
                        "data-slot": "dialog-close",
                        asChild: true,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                            variant: "ghost",
                            className: "absolute top-4 right-4",
                            size: "icon-sm",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {}),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "sr-only",
                                    children: "Close"
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "dialog-header",
        className: cn('gap-2 flex flex-col', className),
        ...props
    });
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
    return /*#__PURE__*/ _jsxs("div", {
        "data-slot": "dialog-footer",
        className: cn('gap-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props,
        children: [
            children,
            showCloseButton && /*#__PURE__*/ _jsx(DialogPrimitive.Close, {
                asChild: true,
                children: /*#__PURE__*/ _jsx(Button, {
                    variant: "outline",
                    children: "Close"
                })
            })
        ]
    });
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Title */ .hE, {
        "data-slot": "dialog-title",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('leading-none font-medium', className),
        ...props
    });
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .VY, {
        "data-slot": "dialog-description",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3', className),
        ...props
    });
}



/***/ }),

/***/ 28614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useTTSPreview)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _lib_audio_browser_tts_preview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67917);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/use-tts-preview.ts
 *
 * Verbatim port — React hook + fetch + SpeechSynthesis, no external deps.
 */ /* __next_internal_client_entry_do_not_use__ useTTSPreview auto */ 

/**
 * Shared hook for TTS preview playback (browser-native and API-based).
 *
 * - `previewing`: true while a preview is active (including audio playback)
 * - `startPreview(opts)`: start a preview; rejects with non-abort errors
 * - `stopPreview()`: cancel any active preview and reset state
 */ function useTTSPreview() {
    const [previewing, setPreviewing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const cancelRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const requestIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const audioUrlRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    /** Cancel in-flight work and release resources (no state update). */ const cleanup = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        requestIdRef.current += 1;
        cancelRef.current?.();
        cancelRef.current = null;
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
            audioUrlRef.current = null;
        }
    }, []);
    /** Cancel any active preview and reset the previewing flag. */ const stopPreview = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        cleanup();
        setPreviewing(false);
    }, [
        cleanup
    ]);
    // Cleanup on unmount (skip state update to avoid React warnings).
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>cleanup, [
        cleanup
    ]);
    /**
   * Start a TTS preview.
   * Abort errors are swallowed; all other errors are re-thrown for the caller.
   */ const startPreview = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (options)=>{
        cleanup();
        const requestId = ++requestIdRef.current;
        const isStale = ()=>requestIdRef.current !== requestId;
        setPreviewing(true);
        try {
            if (options.providerId === 'browser-native-tts') {
                if ( false || !window.speechSynthesis) {
                    throw new Error('Browser does not support Speech Synthesis API');
                }
                const voices = await (0,_lib_audio_browser_tts_preview__WEBPACK_IMPORTED_MODULE_1__/* .ensureVoicesLoaded */ .Fq)();
                if (isStale()) return;
                if (voices.length === 0) {
                    throw new Error('No browser TTS voices available');
                }
                const controller = (0,_lib_audio_browser_tts_preview__WEBPACK_IMPORTED_MODULE_1__/* .playBrowserTTSPreview */ ._d)({
                    text: options.text,
                    voice: options.voice,
                    rate: options.speed,
                    voices
                });
                cancelRef.current = controller.cancel;
                await controller.promise;
                if (!isStale()) {
                    cancelRef.current = null;
                    setPreviewing(false);
                }
                return;
            }
            // API-based TTS
            const body = {
                text: options.text,
                audioId: 'preview',
                ttsProviderId: options.providerId,
                ttsModelId: options.modelId,
                ttsVoice: options.voice,
                ttsSpeed: options.speed
            };
            if (options.apiKey?.trim()) body.ttsApiKey = options.apiKey;
            if (options.baseUrl?.trim()) body.ttsBaseUrl = options.baseUrl;
            if (options.providerOptions) body.ttsProviderOptions = options.providerOptions;
            const res = await fetch('/api/generate/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (isStale()) return;
            const data = await res.json().catch(()=>({
                    error: res.statusText
                }));
            if (isStale()) return;
            if (!res.ok || !data.base64) {
                throw new Error(data.error || 'TTS preview failed');
            }
            // Decode base64 → Blob → Object URL
            const binaryStr = atob(data.base64);
            const bytes = new Uint8Array(binaryStr.length);
            for(let i = 0; i < binaryStr.length; i++)bytes[i] = binaryStr.charCodeAt(i);
            const blob = new Blob([
                bytes
            ], {
                type: `audio/${data.format || 'mp3'}`
            });
            if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
            const url = URL.createObjectURL(blob);
            audioUrlRef.current = url;
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.onended = ()=>{
                if (!isStale()) {
                    audioRef.current = null;
                    setPreviewing(false);
                }
            };
            audio.onerror = ()=>{
                if (!isStale()) {
                    audioRef.current = null;
                    setPreviewing(false);
                }
            };
            await audio.play();
        } catch (error) {
            if (!isStale()) {
                cancelRef.current = null;
                setPreviewing(false);
            }
            if (!(0,_lib_audio_browser_tts_preview__WEBPACK_IMPORTED_MODULE_1__/* .isBrowserTTSAbortError */ .gt)(error)) {
                throw error;
            }
        }
    }, [
        cleanup
    ]);
    return {
        previewing,
        startPreview,
        stopPreview
    };
}


/***/ }),

/***/ 28670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ Label)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29486);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Label auto */ 



function Label({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .b, {
        "data-slot": "label",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed', className),
        ...props
    });
}



/***/ }),

/***/ 29466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $I: () => (/* binding */ normalizeASRUploadAudio)
/* harmony export */ });
/* unused harmony exports isWavBlob, audioBlobToWav */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/wav-utils.ts
 *
 * Verbatim port — pure browser AudioContext/WebAudio, no external deps.
 */ /* __next_internal_client_entry_do_not_use__ isWavBlob,audioBlobToWav,normalizeASRUploadAudio auto */ function writeAscii(view, offset, value) {
    for(let i = 0; i < value.length; i++){
        view.setUint8(offset + i, value.charCodeAt(i));
    }
}
function audioBufferToMonoWav(audioBuffer) {
    const sampleRate = audioBuffer.sampleRate;
    const sampleCount = audioBuffer.length;
    const dataSize = sampleCount * 2;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    writeAscii(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeAscii(view, 8, 'WAVE');
    writeAscii(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeAscii(view, 36, 'data');
    view.setUint32(40, dataSize, true);
    const channels = Array.from({
        length: audioBuffer.numberOfChannels
    }, (_, index)=>audioBuffer.getChannelData(index));
    let offset = 44;
    for(let i = 0; i < sampleCount; i++){
        let mixed = 0;
        for (const channel of channels)mixed += channel[i];
        const sample = Math.max(-1, Math.min(1, mixed / channels.length));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
    }
    return buffer;
}
function isWavBlob(blob, fileName) {
    return blob.type.includes('audio/wav') || blob.type.includes('audio/x-wav') || /\.wav$/i.test(fileName || '');
}
async function audioBlobToWav(blob) {
    if (isWavBlob(blob)) return blob;
    if (false) {}
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) {
        throw new Error('This browser does not support audio conversion');
    }
    const audioContext = new AudioContextConstructor();
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
        return new Blob([
            audioBufferToMonoWav(audioBuffer)
        ], {
            type: 'audio/wav'
        });
    } finally{
        await audioContext.close().catch(()=>undefined);
    }
}
async function normalizeASRUploadAudio(providerId, audioBlob) {
    if (providerId !== 'lemonade-asr') {
        return {
            blob: audioBlob,
            fileName: 'recording.webm'
        };
    }
    return {
        blob: await audioBlobToWav(audioBlob),
        fileName: 'recording.wav'
    };
}


/***/ }),

/***/ 29739:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ LanguageSwitcher)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71442);
/* harmony import */ var _lib_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95280);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72264);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/language-switcher.tsx
 *
 * Verbatim port. Uses medq's existing ui/dropdown-menu primitive.
 */ /* __next_internal_client_entry_do_not_use__ LanguageSwitcher auto */ 




function LanguageSwitcher({ onOpen }) {
    const { locale, setLocale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_1__/* .useI18n */ .s)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenu */ .rI, {
        modal: false,
        onOpenChange: (open)=>{
            if (open) onOpen?.();
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuTrigger */ .ty, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    className: "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all"
                }),
                children: _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .supportedLocales */ .O4.find((l)=>l.code === locale)?.shortLabel ?? locale
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuContent */ .SQ, {
                align: "end",
                sideOffset: 8,
                className: "min-w-[120px]",
                children: _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .supportedLocales */ .O4.map((l)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__/* .DropdownMenuItem */ ._2, {
                        onSelect: ()=>setLocale(l.code),
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('cursor-pointer', locale === l.code && 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'),
                        children: l.label
                    }, l.code))
            })
        ]
    });
}


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

/***/ 30884:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ SlideThumbnail)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Play_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36619);
/* harmony import */ var _lib_store_media_generation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11808);
/* harmony import */ var _lib_contexts_media_stage_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17477);
/* harmony import */ var _lib_media_video_manifest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37013);
/* harmony import */ var _openmaic_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7015);
/* __next_internal_client_entry_do_not_use__ SlideThumbnail auto */ 






/**
 * Media-generation task key for an element, matching what the full-size canvas
 * subscribes to: images are keyed by their `gen_img_*` placeholder src
 * (`useResolvedImageSrc`); videos are keyed by `mediaRef ?? gen_vid_* src`
 * (`getVideoMediaRefForElement`, as in `BaseVideoElement`) — a mediaRef-keyed
 * video may carry no placeholder src at all.
 */ function mediaTaskKeyFor(el) {
    if (el.type === 'video') return (0,_lib_media_video_manifest__WEBPACK_IMPORTED_MODULE_5__/* .getVideoMediaRefForElement */ .i7)(el);
    if (el.type === 'image' && el.src && (0,_lib_store_media_generation__WEBPACK_IMPORTED_MODULE_2__/* .isMediaPlaceholder */ .e)(el.src)) return el.src;
    return undefined;
}
/**
 * Resolve a slide's generated-media refs against the media-generation store so
 * the thumbnail stays in sync as generation (and retries) complete.
 *
 * `@openmaic/renderer` is a pure package: it renders `element.src` as-is and knows
 * nothing about this app's async media generation. The store never mutates the
 * slide's elements (it keeps the `gen_*`/`mediaRef` key and tracks the
 * generated `objectUrl` in a task), so a static render would show the raw
 * placeholder forever — broken on first paint, and crucially NOT updating when
 * a retry finally succeeds. We bridge that here, reactively:
 *
 * - Done task → swap `src` to the generated `objectUrl` (and video `poster`).
 * - Pending/failed with a placeholder src → blank the `src` so the package
 *   renders nothing instead of a broken `<img>`/`<video>` for the raw ref.
 *   (A mediaRef-keyed video whose src is a real URL keeps it.)
 * - No stage context (e.g. home recent-course cards) → render raw, matching
 *   the legacy thumbnail's "skip the store off-classroom" behavior.
 */ function useResolvedSlide(slide) {
    const stageId = (0,_lib_contexts_media_stage_context__WEBPACK_IMPORTED_MODULE_3__/* .useMediaStageId */ .t)();
    // Subscribe via a primitive signature of just the resolutions THIS slide
    // cares about (task key → done objectUrl), not the whole tasks map. Strings
    // compare by value, so unrelated task churn (other slides' media
    // generating/retrying) doesn't re-render this thumbnail, and the memo below
    // re-runs only when one of our own refs actually resolves.
    const signature = (0,_lib_store_media_generation__WEBPACK_IMPORTED_MODULE_2__/* .useMediaGenerationStore */ .z)((s)=>{
        if (!stageId) return '';
        let sig = '';
        for (const el of slide.elements){
            const key = mediaTaskKeyFor(el);
            if (!key) continue;
            const task = s.tasks[key];
            const url = task && task.stageId === stageId && task.status === 'done' && task.objectUrl ? task.objectUrl : '';
            sig += `${key}|${url}|`;
        }
        return sig;
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!stageId || !signature) return slide;
        const { tasks } = _lib_store_media_generation__WEBPACK_IMPORTED_MODULE_2__/* .useMediaGenerationStore */ .z.getState();
        const elements = slide.elements.map((el)=>{
            const key = mediaTaskKeyFor(el);
            if (!key) return el;
            const task = tasks[key];
            if (task && task.stageId === stageId && task.status === 'done' && task.objectUrl) {
                return el.type === 'video' ? {
                    ...el,
                    src: task.objectUrl,
                    poster: task.poster ?? el.poster
                } : {
                    ...el,
                    src: task.objectUrl
                };
            }
            // Unresolved: blank a placeholder src so the renderer paints nothing
            // rather than a broken-media icon. A real (non-placeholder) src — e.g. a
            // mediaRef-keyed video that already carries a playable URL — is kept.
            if ((el.type === 'image' || el.type === 'video') && el.src && (0,_lib_store_media_generation__WEBPACK_IMPORTED_MODULE_2__/* .isMediaPlaceholder */ .e)(el.src)) return {
                ...el,
                src: ''
            };
            return el;
        });
        return {
            ...slide,
            elements
        };
    }, [
        slide,
        stageId,
        signature
    ]);
}
/**
 * Read-only thumbnail rendering for a video element. Replaces `@openmaic/renderer`'s
 * default `<video controls>` with a muted, play-badged treatment suited to
 * thumbnails. `BaseVideoElement` already supplies the absolutely-positioned,
 * rotated wrapper, so this only paints the inner content. The `src` it receives
 * is already media-store-resolved by `useResolvedSlide`.
 *
 * The play-badge (`thumbnail-video-indicator`) always shows; the `<video>` only
 * renders for a real (resolved, non-placeholder) src so unresolved media falls
 * through to the badge-only frame instead of an empty `<video>`.
 */ function renderThumbnailVideo(element) {
    const src = element.src && !(0,_lib_store_media_generation__WEBPACK_IMPORTED_MODULE_2__/* .isMediaPlaceholder */ .e)(element.src) ? element.src : undefined;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            src ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("video", {
                className: "w-full h-full",
                style: {
                    objectFit: 'contain'
                },
                src: src,
                poster: element.poster,
                preload: "metadata",
                muted: true,
                playsInline: true
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-full h-full bg-black/10 rounded"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                "data-testid": "thumbnail-video-indicator",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex size-28 items-center justify-center rounded-full bg-black/45 shadow-lg ring-2 ring-white/85",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Play_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                        className: "ml-1 size-14 fill-white text-white"
                    })
                })
            })
        ]
    });
}
/**
 * Read-only slide thumbnail rendered via the extracted `@openmaic/renderer`
 * package (`SlideCanvas`) instead of the in-app `ThumbnailSlide`/element
 * renderers. `SlideCanvas` fills its parent and auto-fits the slide, so this
 * wrapper owns the outer box sizing (explicit `size` vs parent-filling), the
 * lazy-load placeholder, the thumbnail video treatment (via the renderer's
 * `renderVideo` slot), and the media-store resolution (via `useResolvedSlide`,
 * so generated images/videos appear once their task — or a later retry —
 * completes).
 *
 * Scope note: this covers all read-only slide-thumbnail surfaces — the playback
 * scene sidebar, the home-page recent-course cards, and the editor nav rail
 * (which renders through `SceneThumbnailContent`). The full-size editing canvas
 * is intentionally untouched (`@openmaic/renderer` v1 is read-only; editing is v2).
 */ function SlideThumbnail({ slide, size, viewportRatio, visible = true }) {
    const resolvedSlide = useResolvedSlide(slide);
    const autoSize = size === undefined;
    const containerClass = autoSize ? 'thumbnail-slide relative bg-white overflow-hidden select-none pointer-events-none w-full h-full' : 'thumbnail-slide relative bg-white overflow-hidden select-none pointer-events-none';
    const containerStyle = autoSize ? undefined : {
        width: `${size}px`,
        height: `${size * viewportRatio}px`
    };
    if (!visible) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: containerClass,
            style: containerStyle,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "placeholder w-full h-full flex justify-center items-center text-gray-400 text-sm",
                children: "加载中 ..."
            })
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: containerClass,
        style: containerStyle,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_openmaic_renderer__WEBPACK_IMPORTED_MODULE_4__/* .SlideCanvas */ .YY, {
            slide: resolvedSlide,
            chrome: false,
            renderVideo: renderThumbnailVideo
        })
    });
}


/***/ }),

/***/ 31903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ useAudioRecorder)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33157);
/* harmony import */ var _lib_audio_wav_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29466);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7603);




const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_2__/* .createLogger */ .h)('AudioRecorder');
function useAudioRecorder(options = {}) {
    const { onTranscription, onError } = options;
    const [isRecording, setIsRecording] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isProcessing, setIsProcessing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [recordingTime, setRecordingTime] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const mediaRecorderRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const audioChunksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Web Speech API not typed
    const speechRecognitionRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    // Synchronous lock to prevent rapid re-entry (React state updates are async)
    const busyRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    // Send audio to server for transcription
    const transcribeAudio = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (audioBlob)=>{
        setIsProcessing(true);
        try {
            const formData = new FormData();
            // Get current ASR configuration from settings store
            // Note: This requires importing useSettingsStore in browser context
            if (true) {
                const { useSettingsStore } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 75748));
                const { asrProviderId, asrLanguage, asrProvidersConfig } = useSettingsStore.getState();
                const uploadAudio = await (0,_lib_audio_wav_utils__WEBPACK_IMPORTED_MODULE_3__/* .normalizeASRUploadAudio */ .$I)(asrProviderId, audioBlob);
                formData.append('audio', uploadAudio.blob, uploadAudio.fileName);
                formData.append('providerId', asrProviderId);
                formData.append('modelId', asrProvidersConfig?.[asrProviderId]?.modelId || _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .ASR_PROVIDERS */ .Co[asrProviderId]?.defaultModelId || '');
                formData.append('language', asrLanguage);
                // Append API key and base URL if configured
                const providerConfig = asrProvidersConfig?.[asrProviderId];
                if (providerConfig?.apiKey?.trim()) {
                    formData.append('apiKey', providerConfig.apiKey);
                }
                const effectiveBaseUrl = providerConfig?.baseUrl?.trim() || providerConfig?.customDefaultBaseUrl || '';
                if (effectiveBaseUrl) {
                    formData.append('baseUrl', effectiveBaseUrl);
                }
            } else {}
            const response = await fetch('/api/transcription', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Transcription failed');
            }
            const result = await response.json();
            onTranscription?.(result.text);
        } catch (error) {
            log.error('Transcription error:', error);
            onError?.(error instanceof Error ? error.message : '语音识别失败，请重试');
        } finally{
            setIsProcessing(false);
            setRecordingTime(0);
        }
    }, [
        onTranscription,
        onError
    ]);
    // Start recording
    const startRecording = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        // Synchronous lock — React state is async so isRecording may be stale
        if (busyRef.current) return;
        busyRef.current = true;
        try {
            // Get current ASR configuration
            if (true) {
                const { useSettingsStore } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 75748));
                const { asrProviderId, asrLanguage } = useSettingsStore.getState();
                // Use browser native ASR if configured
                if (asrProviderId === 'browser-native') {
                    // Check if Speech Recognition is supported
                    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
                        onError?.('您的浏览器不支持语音识别功能');
                        return;
                    }
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    const recognition = new SpeechRecognition();
                    recognition.lang = asrLanguage || 'zh-CN';
                    recognition.continuous = false;
                    recognition.interimResults = false;
                    recognition.onstart = ()=>{
                        setIsRecording(true);
                        setRecordingTime(0);
                        // Start timer
                        timerRef.current = setInterval(()=>{
                            setRecordingTime((prev)=>prev + 1);
                        }, 1000);
                    };
                    recognition.onresult = (event)=>{
                        const transcript = event.results[0][0].transcript;
                        onTranscription?.(transcript);
                    };
                    recognition.onerror = (event)=>{
                        log.error('Speech recognition error:', event.error);
                        let errorMessage = '语音识别失败';
                        switch(event.error){
                            case 'aborted':
                                // Non-fatal: caused by our own cancel/stop logic or rapid toggle
                                busyRef.current = false;
                                setIsRecording(false);
                                setRecordingTime(0);
                                if (timerRef.current) {
                                    clearInterval(timerRef.current);
                                    timerRef.current = null;
                                }
                                return;
                            case 'no-speech':
                                errorMessage = '未检测到语音输入';
                                break;
                            case 'audio-capture':
                                errorMessage = '无法访问麦克风';
                                break;
                            case 'not-allowed':
                                errorMessage = '麦克风权限被拒绝';
                                break;
                            case 'network':
                                errorMessage = '网络错误';
                                break;
                            default:
                                errorMessage = `语音识别错误: ${event.error}`;
                        }
                        onError?.(errorMessage);
                        busyRef.current = false;
                        setIsRecording(false);
                        setRecordingTime(0);
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                    };
                    recognition.onend = ()=>{
                        busyRef.current = false;
                        setIsRecording(false);
                        setRecordingTime(0);
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                    };
                    recognition.start();
                    speechRecognitionRef.current = recognition;
                    return;
                }
            }
            // Use MediaRecorder for server-side ASR
            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            // Create MediaRecorder
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm'
            });
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            mediaRecorder.ondataavailable = (event)=>{
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            mediaRecorder.onstop = async ()=>{
                // Stop all audio tracks
                stream.getTracks().forEach((track)=>track.stop());
                // Merge audio chunks
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: 'audio/webm'
                });
                // Send to server for transcription
                await transcribeAudio(audioBlob);
                busyRef.current = false;
            };
            // Start recording
            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            // Start timer
            timerRef.current = setInterval(()=>{
                setRecordingTime((prev)=>prev + 1);
            }, 1000);
        } catch (error) {
            busyRef.current = false;
            log.error('Failed to start recording:', error);
            onError?.('无法访问麦克风，请检查权限设置');
        }
    }, [
        onTranscription,
        onError,
        transcribeAudio
    ]);
    // Stop recording
    const stopRecording = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        // Stop Speech Recognition if active
        if (speechRecognitionRef.current) {
            speechRecognitionRef.current.stop();
            speechRecognitionRef.current = null;
            busyRef.current = false;
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }
        // Stop MediaRecorder if active
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            busyRef.current = false;
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    }, [
        isRecording
    ]);
    // Cancel recording
    const cancelRecording = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        // Cancel Speech Recognition if active
        if (speechRecognitionRef.current) {
            speechRecognitionRef.current.onresult = null; // Prevent transcription callback
            speechRecognitionRef.current.onerror = null; // Suppress browser abort error events
            speechRecognitionRef.current.stop();
            speechRecognitionRef.current = null;
            busyRef.current = false;
            setIsRecording(false);
            setRecordingTime(0);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }
        // Cancel MediaRecorder if active
        if (mediaRecorderRef.current && isRecording) {
            // Stop recording without transcription
            mediaRecorderRef.current.ondataavailable = null;
            mediaRecorderRef.current.onstop = null;
            mediaRecorderRef.current.stop();
            // Stop all audio tracks
            if (mediaRecorderRef.current.stream) {
                mediaRecorderRef.current.stream.getTracks().forEach((track)=>track.stop());
            }
            busyRef.current = false;
            setIsRecording(false);
            setRecordingTime(0);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            audioChunksRef.current = [];
        }
    }, [
        isRecording
    ]);
    return {
        isRecording,
        isProcessing,
        recordingTime,
        startRecording,
        stopRecording,
        cancelRecording
    };
}


/***/ }),

/***/ 36896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Xi: () => (/* binding */ TabsTrigger),
/* harmony export */   av: () => (/* binding */ TabsContent),
/* harmony export */   j7: () => (/* binding */ TabsList),
/* harmony export */   tU: () => (/* binding */ Tabs)
/* harmony export */ });
/* unused harmony export tabsListVariants */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18460);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57518);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Tabs,TabsList,TabsTrigger,TabsContent,tabsListVariants auto */ 




function Tabs({ className, orientation = 'horizontal', ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL, {
        "data-slot": "tabs",
        "data-orientation": orientation,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('gap-2 group/tabs flex data-[orientation=horizontal]:flex-col', className),
        ...props
    });
}
const tabsListVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_4__/* .cva */ .F)('rounded-lg p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col', {
    variants: {
        variant: {
            default: 'bg-muted',
            line: 'gap-1 bg-transparent'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function TabsList({ className, variant = 'default', ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .List */ .B8, {
        "data-slot": "tabs-list",
        "data-variant": variant,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(tabsListVariants({
            variant
        }), className),
        ...props
    });
}
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .l9, {
        "data-slot": "tabs-trigger",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", 'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent', 'data-active:bg-background dark:data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 data-active:text-foreground', 'after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100', className),
        ...props
    });
}
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .UC, {
        "data-slot": "tabs-content",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('text-sm flex-1 outline-none', className),
        ...props
    });
}



/***/ }),

/***/ 36955:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CX: () => (/* binding */ loadChatSessions),
/* harmony export */   Fs: () => (/* binding */ deleteChatSessions),
/* harmony export */   bm: () => (/* binding */ saveChatSessions)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29732);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/chat-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is now the real port (Dexie-backed),
 * so chat session persistence is fully functional.
 */ 
/** Maximum messages per session to avoid IndexedDB bloat */ const MAX_MESSAGES_PER_SESSION = 200;
/**
 * Save chat sessions for a stage to IndexedDB.
 * - Active sessions are saved as 'interrupted' (streaming context lost on refresh)
 * - pendingToolCalls are cleared (runtime-only state)
 * - Messages are truncated to MAX_MESSAGES_PER_SESSION
 */ async function saveChatSessions(stageId, sessions) {
    if (!sessions || sessions.length === 0) {
        // Delete all sessions for this stage if empty
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).delete();
        return;
    }
    const records = sessions.map((session)=>({
            id: session.id,
            stageId,
            type: session.type,
            title: session.title,
            // Mark active sessions as interrupted (streaming context lost on refresh)
            status: session.status === 'active' ? 'interrupted' : session.status,
            // Truncate messages and strip non-serializable data
            messages: session.messages.slice(-MAX_MESSAGES_PER_SESSION) ?? [],
            config: session.config,
            toolCalls: session.toolCalls ?? [],
            pendingToolCalls: [],
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            sceneId: session.sceneId,
            lastActionIndex: session.lastActionIndex
        }));
    await _database__WEBPACK_IMPORTED_MODULE_0__.db.transaction('rw', _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions, async ()=>{
        // Delete old sessions for this stage, then bulk insert new ones
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).delete();
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.bulkPut(records);
    });
}
/**
 * Load chat sessions for a stage from IndexedDB.
 * Returns sessions sorted by createdAt.
 */ async function loadChatSessions(stageId) {
    const records = await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).sortBy('createdAt');
    return records.map((record)=>({
            id: record.id,
            type: record.type,
            title: record.title,
            status: record.status,
            messages: record.messages,
            config: record.config,
            toolCalls: record.toolCalls,
            pendingToolCalls: record.pendingToolCalls,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            sceneId: record.sceneId,
            lastActionIndex: record.lastActionIndex
        }));
}
/**
 * Delete all chat sessions for a stage.
 */ async function deleteChatSessions(stageId) {
    await _database__WEBPACK_IMPORTED_MODULE_0__.db.chatSessions.where('stageId').equals(stageId).delete();
}


/***/ }),

/***/ 37932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ ModelEditDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28276);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94775);
/* harmony import */ var _barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(57990);
/* harmony import */ var _barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(57983);
/* harmony import */ var _barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(94890);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(40980);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(41120);
/* __next_internal_client_entry_do_not_use__ ModelEditDialog auto */ 










function ModelEditDialog({ open, onOpenChange, editingModel, setEditingModel, onSave, onAutoSave, providerId, apiKey, baseUrl, providerType, requiresApiKey, isServerConfigured }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__/* .useI18n */ .s)();
    const [testStatus, setTestStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [testMessage, setTestMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Reset test status when dialog closes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Reset state when dialog closes
            setTestStatus('idle');
            setTestMessage('');
        }
    }, [
        open
    ]);
    const handleClose = ()=>{
        onOpenChange(false);
        setEditingModel(null);
    };
    const handleTestModel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!editingModel) {
            return;
        }
        setTestStatus('testing');
        setTestMessage('');
        try {
            const response = await fetch('/api/verify-model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify((0,_utils__WEBPACK_IMPORTED_MODULE_8__/* .createVerifyModelRequest */ .sS)({
                    providerId,
                    modelId: editingModel.model.id,
                    apiKey,
                    baseUrl,
                    providerType,
                    requiresApiKey
                }))
            });
            const data = await response.json();
            if (data.success) {
                setTestStatus('success');
                setTestMessage(t('settings.connectionSuccess'));
            } else {
                setTestStatus('error');
                setTestMessage(data.error || t('settings.connectionFailed'));
            }
        } catch (_error) {
            setTestStatus('error');
            setTestMessage(t('settings.connectionFailed'));
        }
    }, [
        editingModel,
        apiKey,
        baseUrl,
        providerId,
        providerType,
        requiresApiKey,
        t
    ]);
    if (!editingModel) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
            className: "sm:max-w-[500px]",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                    className: "sr-only",
                    children: editingModel.modelIndex === null ? t('settings.addNewModel') : t('settings.editModel')
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogDescription */ .rr, {
                    className: "sr-only",
                    children: editingModel.modelIndex === null ? t('settings.addNewModelDescription') : t('settings.editModelDescription')
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "pb-3 border-b",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: editingModel.modelIndex === null ? t('settings.addNewModel') : t('settings.editModel')
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.modelId')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    placeholder: t('settings.modelIdPlaceholder'),
                                    value: editingModel.model.id,
                                    onChange: (e)=>{
                                        const newId = e.target.value;
                                        const currentName = editingModel.model.name;
                                        const currentId = editingModel.model.id;
                                        // Auto-sync name if it's empty or matches the old ID
                                        const shouldSyncName = !currentName || currentName === currentId;
                                        setEditingModel({
                                            ...editingModel,
                                            model: {
                                                ...editingModel.model,
                                                id: newId,
                                                name: shouldSyncName ? newId : currentName
                                            }
                                        });
                                        // Reset test status when model ID changes
                                        setTestStatus('idle');
                                        setTestMessage('');
                                    },
                                    onBlur: ()=>onAutoSave?.()
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.modelName')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    placeholder: t('settings.modelNamePlaceholder'),
                                    value: editingModel.model.name,
                                    onChange: (e)=>setEditingModel({
                                            ...editingModel,
                                            model: {
                                                ...editingModel.model,
                                                name: e.target.value
                                            }
                                        }),
                                    onBlur: ()=>onAutoSave?.()
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.modelCapabilities')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__/* .Checkbox */ .S, {
                                                    id: "cap-vision",
                                                    checked: editingModel.model.capabilities?.vision || false,
                                                    onCheckedChange: (checked)=>{
                                                        setEditingModel({
                                                            ...editingModel,
                                                            model: {
                                                                ...editingModel.model,
                                                                capabilities: {
                                                                    ...editingModel.model.capabilities,
                                                                    vision: checked
                                                                }
                                                            }
                                                        });
                                                        onAutoSave?.();
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                    htmlFor: "cap-vision",
                                                    className: "text-sm flex items-center gap-1.5 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        }),
                                                        t('settings.capabilities.vision')
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__/* .Checkbox */ .S, {
                                                    id: "cap-tools",
                                                    checked: editingModel.model.capabilities?.tools || false,
                                                    onCheckedChange: (checked)=>{
                                                        setEditingModel({
                                                            ...editingModel,
                                                            model: {
                                                                ...editingModel.model,
                                                                capabilities: {
                                                                    ...editingModel.model.capabilities,
                                                                    tools: checked
                                                                }
                                                            }
                                                        });
                                                        onAutoSave?.();
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                    htmlFor: "cap-tools",
                                                    className: "text-sm flex items-center gap-1.5 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        }),
                                                        t('settings.capabilities.tools')
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__/* .Checkbox */ .S, {
                                                    id: "cap-streaming",
                                                    checked: editingModel.model.capabilities?.streaming || false,
                                                    onCheckedChange: (checked)=>{
                                                        setEditingModel({
                                                            ...editingModel,
                                                            model: {
                                                                ...editingModel.model,
                                                                capabilities: {
                                                                    ...editingModel.model.capabilities,
                                                                    streaming: checked
                                                                }
                                                            }
                                                        });
                                                        onAutoSave?.();
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                    htmlFor: "cap-streaming",
                                                    className: "text-sm flex items-center gap-1.5 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        }),
                                                        t('settings.capabilities.streaming')
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3 pt-3 border-t",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    className: "text-base",
                                    children: t('settings.advancedSettings')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                                    className: "text-sm",
                                                    children: t('settings.contextWindowLabel')
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                    type: "number",
                                                    placeholder: t('settings.contextWindowPlaceholder'),
                                                    value: editingModel.model.contextWindow || '',
                                                    onChange: (e)=>setEditingModel({
                                                            ...editingModel,
                                                            model: {
                                                                ...editingModel.model,
                                                                contextWindow: e.target.value ? parseInt(e.target.value) : undefined
                                                            }
                                                        }),
                                                    onBlur: ()=>onAutoSave?.()
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                                    className: "text-sm",
                                                    children: t('settings.outputWindowLabel')
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                    type: "number",
                                                    placeholder: t('settings.outputWindowPlaceholder'),
                                                    value: editingModel.model.outputWindow || '',
                                                    onChange: (e)=>setEditingModel({
                                                            ...editingModel,
                                                            model: {
                                                                ...editingModel.model,
                                                                outputWindow: e.target.value ? parseInt(e.target.value) : undefined
                                                            }
                                                        }),
                                                    onBlur: ()=>onAutoSave?.()
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3 pt-3 border-t",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                            className: "text-base",
                                            children: t('settings.testModel')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: handleTestModel,
                                            disabled: !editingModel.model.id || testStatus === 'testing' || requiresApiKey && !apiKey && !isServerConfigured,
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)(testStatus === 'success' && 'border-green-600 text-green-600 hover:bg-green-50', testStatus === 'error' && 'border-red-600 text-red-600 hover:bg-red-50'),
                                            children: [
                                                testStatus === 'testing' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                    className: "mr-2 h-4 w-4 animate-spin"
                                                }),
                                                testStatus === 'success' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                    className: "mr-2 h-4 w-4"
                                                }),
                                                testStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                    className: "mr-2 h-4 w-4"
                                                }),
                                                testStatus === 'testing' ? t('settings.testing') : t('settings.testConnection')
                                            ]
                                        })
                                    ]
                                }),
                                testMessage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('rounded-lg p-3 text-sm', testStatus === 'success' && 'bg-green-50 text-green-700 border border-green-200', testStatus === 'error' && 'bg-red-50 text-red-700 border border-red-200'),
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-start gap-2 flex-wrap",
                                        children: [
                                            testStatus === 'success' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                className: "h-4 w-4 mt-0.5 shrink-0"
                                            }),
                                            testStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle_Loader2_Sparkles_Wrench_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "h-4 w-4 mt-0.5 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "flex-1 break-words",
                                                children: testMessage
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-end gap-2 pt-3 border-t",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: handleClose,
                                    children: t('settings.cancelEdit')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    size: "sm",
                                    onClick: onSave,
                                    children: t('settings.saveModel')
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

/***/ 41120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FO: () => (/* binding */ formatContextWindow),
/* harmony export */   iA: () => (/* binding */ getProviderTypeLabel),
/* harmony export */   os: () => (/* binding */ createCustomProviderSettings),
/* harmony export */   sS: () => (/* binding */ createVerifyModelRequest)
/* harmony export */ });
function formatContextWindow(size) {
    if (!size) return '-';
    // For M: prefer decimal (use decimal for exact thousands)
    if (size >= 1000000) {
        if (size % 1000000 === 0) {
            return `${size / 1000000}M`;
        }
        return `${(size / 1000000).toFixed(1)}M`;
    }
    // For K: prefer decimal if divisible by 1000, otherwise use binary
    if (size >= 1000) {
        if (size % 1000 === 0) {
            return `${size / 1000}K`;
        }
        return `${Math.floor(size / 1024)}K`;
    }
    return size.toString();
}
function getProviderTypeLabel(type, t) {
    const translationKey = `settings.providerTypes.${type}`;
    const translated = t(translationKey);
    // If translation exists (not equal to key), use it; otherwise fallback to type
    return translated !== translationKey ? translated : type;
}
function createCustomProviderSettings(providerData) {
    return {
        apiKey: '',
        baseUrl: providerData.baseUrl || '',
        models: [],
        name: providerData.name,
        type: providerData.type,
        defaultBaseUrl: providerData.baseUrl || undefined,
        icon: providerData.icon || undefined,
        requiresApiKey: providerData.requiresApiKey,
        isBuiltIn: false
    };
}
function createVerifyModelRequest(config) {
    return {
        apiKey: config.apiKey || '',
        baseUrl: config.baseUrl || '',
        model: `${config.providerId}:${config.modelId}`,
        providerType: config.providerType,
        requiresApiKey: config.requiresApiKey
    };
}


/***/ }),

/***/ 42678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DV: () => (/* binding */ useShouldShowWhatsNew),
/* harmony export */   ZT: () => (/* binding */ AnnouncementBar),
/* harmony export */   _V: () => (/* binding */ DiscoverTabs),
/* harmony export */   fk: () => (/* binding */ WhatsNewModal),
/* harmony export */   ol: () => (/* binding */ FEATURED_TOPICS),
/* harmony export */   uu: () => (/* binding */ FeaturedTopicCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(78235);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(15696);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36338);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62593);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(50248);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22545);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(39075);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(69426);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(78780);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(61491);
/* harmony import */ var _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(86272);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(40980);
/**
 * Home Extras — UI additions that exist on the live open.maic.chat site but
 * were never released to the open-source GitHub repo.
 *
 * These three components are built from scratch (not ported) based on the
 * live-site audit. They are opt-in UI layers that sit above the existing
 * OpenMAIC home page:
 *
 *   1. <AnnouncementBar />  — rotating banner carousel above the prompt input.
 *   2. <WhatsNewModal />    — first-visit modal showing the v0.2.2 changelog.
 *   3. <DiscoverTabs>       — wraps the existing "Recent Classrooms" section
 *                             with a My-Courses / Discover tab switcher.
 *
 * Design philosophy:
 *   - "Discover" does NOT fake community view/like counts. Instead it shows
 *     curated medical-education topic cards (medq's domain) that pre-fill the
 *     prompt textarea when clicked — honest, useful, domain-appropriate.
 *   - All dismiss/state is persisted to localStorage so the UI stays calm on
 *     repeat visits.
 *   - All copy is bilingual (English + Chinese) inline, keyed off the current
 *     i18n locale — no new translation files needed (keeps the surface area
 *     small; the existing locale JSONs already have 500+ keys each).
 *
 * Standalone file: home-page.tsx imports these via a single import line,
 * keeping the verbatim-port boundary clean.
 */ /* __next_internal_client_entry_do_not_use__ AnnouncementBar,WhatsNewModal,useShouldShowWhatsNew,DiscoverTabs,FeaturedTopicCard,FEATURED_TOPICS auto */ 





// ============================================================================
// Shared constants
// ============================================================================
const WHATS_NEW_VERSION = '0.2.2';
const WHATS_NEW_STORAGE_KEY = `openmaic_whats_new_dismissed_v${WHATS_NEW_VERSION}`;
const ANNOUNCEMENT_DISMISS_KEY = `openmaic_announcement_dismissed_v${WHATS_NEW_VERSION}`;
const ANNOUNCEMENT_ADVANCE_MS = 6000;
const FEATURED_TOPICS = [
    {
        id: 'dka',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A,
        category: {
            'en-US': 'Endocrinology',
            'zh-CN': '内分泌科'
        },
        title: {
            'en-US': 'Pathophysiology of Diabetic Ketoacidosis',
            'zh-CN': '糖尿病酮症酸中毒的病理生理学'
        },
        prompt: {
            'en-US': 'Explain the pathophysiology of diabetic ketoacidosis, including the role of insulin deficiency, counter-regulatory hormones, and ketone body formation.',
            'zh-CN': '讲解糖尿病酮症酸中毒的病理生理学，包括胰岛素缺乏、对抗调节激素和酮体生成的作用。'
        },
        accent: 'from-rose-500/15 to-orange-500/15 dark:from-rose-500/10 dark:to-orange-500/10'
    },
    {
        id: 'ecg',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
        category: {
            'en-US': 'Cardiology',
            'zh-CN': '心内科'
        },
        title: {
            'en-US': 'ECG Interpretation: Myocardial Infarction',
            'zh-CN': '心电图解读：心肌梗死'
        },
        prompt: {
            'en-US': 'Teach me how to identify acute myocardial infarction on a 12-lead ECG, including ST elevation, reciprocal changes, and the territory each lead monitors.',
            'zh-CN': '教我如何在12导联心电图上识别急性心肌梗死，包括ST段抬高、对应导联改变，以及每个导联监测的心脏部位。'
        },
        accent: 'from-red-500/15 to-pink-500/15 dark:from-red-500/10 dark:to-pink-500/10'
    },
    {
        id: 'neuro',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
        category: {
            'en-US': 'Neurology',
            'zh-CN': '神经科'
        },
        title: {
            'en-US': 'Stroke: Ischemic vs Hemorrhagic',
            'zh-CN': '脑卒中：缺血性 vs 出血性'
        },
        prompt: {
            'en-US': 'Compare ischemic and hemorrhagic stroke — pathophysiology, clinical presentation, CT findings, and acute management including the tPA time window.',
            'zh-CN': '比较缺血性和出血性脑卒中——病理生理、临床表现、CT影像特点，以及包括tPA时间窗在内的急性期管理。'
        },
        accent: 'from-violet-500/15 to-indigo-500/15 dark:from-violet-500/10 dark:to-indigo-500/10'
    },
    {
        id: 'abx',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
        category: {
            'en-US': 'Pharmacology',
            'zh-CN': '药理学'
        },
        title: {
            'en-US': 'Antibiotic Classes and Mechanisms',
            'zh-CN': '抗生素分类与作用机制'
        },
        prompt: {
            'en-US': 'Explain the major antibiotic classes (beta-lactams, macrolides, fluoroquinolones, aminoglycosides, tetracyclines) — mechanism of action, spectrum, and key side effects.',
            'zh-CN': '讲解主要抗生素类别（β-内酰胺类、大环内酯类、氟喹诺酮类、氨基糖苷类、四环素类）——作用机制、抗菌谱和主要副作用。'
        },
        accent: 'from-emerald-500/15 to-teal-500/15 dark:from-emerald-500/10 dark:to-teal-500/10'
    },
    {
        id: 'renal',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A,
        category: {
            'en-US': 'Nephrology',
            'zh-CN': '肾内科'
        },
        title: {
            'en-US': 'Acute Kidney Injury: RIFLE Criteria',
            'zh-CN': '急性肾损伤：RIFLE标准'
        },
        prompt: {
            'en-US': 'Walk me through the RIFLE criteria for acute kidney injury — Risk, Injury, Failure, Loss, ESRD — and the pre-renal vs intrinsic vs post-renal differential.',
            'zh-CN': '带我理解急性肾损伤的RIFLE标准——Risk、Injury、Failure、Loss、ESRD——以及肾前性、肾性、肾后性鉴别诊断。'
        },
        accent: 'from-amber-500/15 to-yellow-500/15 dark:from-amber-500/10 dark:to-yellow-500/10'
    },
    {
        id: 'anatomy',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A,
        category: {
            'en-US': 'Anatomy',
            'zh-CN': '解剖学'
        },
        title: {
            'en-US': 'Brachial Plexus: A Complete Walkthrough',
            'zh-CN': '臂丛神经：完整讲解'
        },
        prompt: {
            'en-US': 'Teach me the brachial plexus — roots, trunks, divisions, cords, branches — with the major nerves and the clinical relevance of each level.',
            'zh-CN': '讲解臂丛神经——根、干、股、束、支——包括主要神经和每一层的临床意义。'
        },
        accent: 'from-sky-500/15 to-cyan-500/15 dark:from-sky-500/10 dark:to-cyan-500/10'
    },
    {
        id: 'pharm',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A,
        category: {
            'en-US': 'Biochemistry',
            'zh-CN': '生物化学'
        },
        title: {
            'en-US': 'Glycolysis: All 10 Steps Explained',
            'zh-CN': '糖酵解：10步反应详解'
        },
        prompt: {
            'en-US': 'Walk me through all 10 steps of glycolysis — enzymes, substrates, products, ATP/NADH yield, and the rate-limiting step. Use the whiteboard to draw the pathway.',
            'zh-CN': '讲解糖酵解的全部10步反应——酶、底物、产物、ATP/NADH生成，以及限速步骤。请在白板上画出通路。'
        },
        accent: 'from-fuchsia-500/15 to-purple-500/15 dark:from-fuchsia-500/10 dark:to-purple-500/10'
    },
    {
        id: 'physical',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A,
        category: {
            'en-US': 'Clinical Skills',
            'zh-CN': '临床技能'
        },
        title: {
            'en-US': 'Cardiac Auscultation: Heart Sounds',
            'zh-CN': '心脏听诊：心音'
        },
        prompt: {
            'en-US': 'Teach me cardiac auscultation — S1, S2, S3, S4, murmurs (systolic vs diastolic), and how to distinguish aortic stenosis from mitral regurgitation at the bedside.',
            'zh-CN': '教我心心脏听诊——S1、S2、S3、S4、杂音（收缩期vs舒张期），以及床旁如何区分主动脉瓣狭窄与二尖瓣关闭不全。'
        },
        accent: 'from-lime-500/15 to-green-500/15 dark:from-lime-500/10 dark:to-green-500/10'
    },
    {
        id: 'ophthal',
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A,
        category: {
            'en-US': 'Ophthalmology',
            'zh-CN': '眼科'
        },
        title: {
            'en-US': 'Glaucoma: Open-Angle vs Angle-Closure',
            'zh-CN': '青光眼：开角型 vs 闭角型'
        },
        prompt: {
            'en-US': 'Compare open-angle and angle-closure glaucoma — anatomy, pathophysiology, clinical presentation, IOP findings, and treatment including the mechanism of pilocarpine.',
            'zh-CN': '比较开角型和闭角型青光眼——解剖、病理生理、临床表现、眼压特点，以及包括毛果芸香碱机制在内的治疗。'
        },
        accent: 'from-blue-500/15 to-indigo-500/15 dark:from-blue-500/10 dark:to-indigo-500/10'
    }
];
const BANNERS = [
    {
        id: 'v022-pro-mode',
        badge: 'v0.2.2',
        badgeColor: 'bg-violet-500/90 text-white',
        text: {
            'en-US': 'Pro Mode: lightly edit generated slides — text, elements, and layout — directly in the classroom.',
            'zh-CN': 'Pro Mode 上线：直接在课堂中轻量编辑已生成的幻灯片——文字、元素、布局。'
        },
        cta: {
            'en-US': 'See what\u2019s new',
            'zh-CN': '查看新功能'
        },
        ctaAction: 'openWhatsNew',
        gradient: 'from-violet-500/10 via-fuchsia-500/5 to-transparent dark:from-violet-500/15 dark:via-fuchsia-500/10'
    },
    {
        id: 'v020-interactive',
        badge: 'v0.2.0',
        badgeColor: 'bg-cyan-500/90 text-white',
        text: {
            'en-US': 'Interactive Mode: 3D models, simulations, drag-and-drop games, and code playgrounds embedded right in the lesson.',
            'zh-CN': 'Interactive Mode：3D模型、仿真实验、拖拽小游戏和代码沙盒，全部嵌入课程中。'
        },
        gradient: 'from-cyan-500/10 via-sky-500/5 to-transparent dark:from-cyan-500/15 dark:via-sky-500/10'
    },
    {
        id: 'medical-focus',
        badge: 'MedQ',
        badgeColor: 'bg-emerald-500/90 text-white',
        text: {
            'en-US': 'Curated for medical education — DKA, ECG interpretation, antibiotic mechanisms, and 6 more ready-to-run lessons in Discover.',
            'zh-CN': '专为医学教育定制——DKA、心电图解读、抗生素机制等9节现成课程，见 Discover 标签。'
        },
        gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-500/15 dark:via-teal-500/10'
    }
];
function AnnouncementBar({ onOpenWhatsNew }) {
    const { locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const [dismissed, setDismissed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [index, setIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            if (localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY) === 'true') {
                setDismissed(true);
            }
        } catch  {
        /* ignore */ }
    }, []);
    const startTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(()=>{
            setIndex((prev)=>(prev + 1) % BANNERS.length);
        }, ANNOUNCEMENT_ADVANCE_MS);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (dismissed) return;
        startTimer();
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [
        dismissed,
        startTimer
    ]);
    const dismiss = ()=>{
        setDismissed(true);
        try {
            localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, 'true');
        } catch  {
        /* ignore */ }
    };
    if (dismissed) return null;
    const banner = BANNERS[index];
    const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('relative w-full max-w-[800px] mb-4 rounded-2xl border border-border/40 overflow-hidden', 'bg-gradient-to-r', banner.gradient),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3 px-4 py-2.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_13__/* .AnimatePresence */ .N, {
                        mode: "wait",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_14__/* .motion */ .PY1.div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: -20
                            },
                            transition: {
                                duration: 0.3
                            },
                            className: "flex items-center gap-2.5 flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider', banner.badgeColor),
                                    children: banner.badge
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[12.5px] text-foreground/80 truncate",
                                    children: banner.text[locKey]
                                }),
                                banner.cta && banner.ctaAction === 'openWhatsNew' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: onOpenWhatsNew,
                                    className: "shrink-0 text-[11px] font-medium text-violet-600 dark:text-violet-400 hover:underline",
                                    children: [
                                        banner.cta[locKey],
                                        " →"
                                    ]
                                })
                            ]
                        }, banner.id)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "shrink-0 flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    setIndex((prev)=>(prev - 1 + BANNERS.length) % BANNERS.length);
                                    startTimer();
                                },
                                "aria-label": "Previous banner",
                                className: "size-5 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    setIndex((prev)=>(prev + 1) % BANNERS.length);
                                    startTimer();
                                },
                                "aria-label": "Next banner",
                                className: "size-5 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-px h-3 bg-border/40 mx-0.5"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: dismiss,
                                "aria-label": "Dismiss announcement",
                                className: "size-5 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                    className: "size-3.5"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-0.5",
                children: BANNERS.map((b, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: ()=>{
                            setIndex(i);
                            startTimer();
                        },
                        "aria-label": `Go to banner ${i + 1}`,
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('h-0.5 rounded-full transition-all', i === index ? 'w-4 bg-foreground/60' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40')
                    }, b.id))
            })
        ]
    });
}
const CHANGELOG = [
    {
        title: {
            'en-US': 'Pro Mode',
            'zh-CN': 'Pro 模式'
        },
        description: {
            'en-US': 'Lightly edit generated slides — text, elements, and layout — directly in the classroom, without regenerating.',
            'zh-CN': '直接在课堂中轻量编辑已生成的幻灯片——文字、元素、布局——无需重新生成。'
        },
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A,
        color: 'text-violet-500'
    },
    {
        title: {
            'en-US': 'Editable Outline',
            'zh-CN': '可编辑大纲'
        },
        description: {
            'en-US': 'Review, add, remove, and reorder scenes in the outline before generation. Fix the AI\u2019s plan before it builds the slides.',
            'zh-CN': '生成前可在大纲中查看、新增、删除、重排场景。在 AI 开始构建幻灯片之前修正其计划。'
        },
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A,
        color: 'text-cyan-500'
    },
    {
        title: {
            'en-US': 'Offline Interactive Export',
            'zh-CN': '离线交互式导出'
        },
        description: {
            'en-US': 'Export classrooms as standalone HTML with all external resources inlined. Open offline, share by email, no server required.',
            'zh-CN': '将课堂导出为独立 HTML，所有外部资源已内联。可离线打开、邮件分享，无需服务器。'
        },
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A,
        color: 'text-emerald-500'
    },
    {
        title: {
            'en-US': 'Multi-Agent Classroom',
            'zh-CN': '多智能体课堂'
        },
        description: {
            'en-US': 'AI Teacher, Quiz Master, Challenger, and Summarizer — four agents voice each slide, draw on the whiteboard, and discuss with you.',
            'zh-CN': 'AI 老师、测验官、挑战者、总结官——四位智能体为每张幻灯片配音、在白板上书写、与你讨论。'
        },
        icon: _barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
        color: 'text-rose-500'
    }
];
function WhatsNewModal({ open, onOpenChange }) {
    const { locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';
    const dismiss = ()=>{
        try {
            localStorage.setItem(WHATS_NEW_STORAGE_KEY, 'true');
        } catch  {
        /* ignore */ }
        onOpenChange(false);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_13__/* .AnimatePresence */ .N, {
        children: open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_14__/* .motion */ .PY1.div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.2
            },
            className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm",
            onClick: dismiss,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_14__/* .motion */ .PY1.div, {
                initial: {
                    scale: 0.95,
                    y: 10
                },
                animate: {
                    scale: 1,
                    y: 0
                },
                exit: {
                    scale: 0.95,
                    y: 10
                },
                transition: {
                    duration: 0.25,
                    ease: [
                        0.25,
                        0.1,
                        0.25,
                        1
                    ]
                },
                onClick: (e)=>e.stopPropagation(),
                className: "relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-border/60 shadow-2xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent dark:from-violet-500/30 dark:via-fuchsia-500/20"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: dismiss,
                        "aria-label": "Close",
                        className: "absolute top-3 right-3 size-7 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors z-10",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                            className: "size-4"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative px-6 pt-8 pb-5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-bold uppercase tracking-wider mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                        className: "size-3"
                                    }),
                                    "v",
                                    WHATS_NEW_VERSION
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-xl font-bold mb-1",
                                children: locKey === 'zh-CN' ? 'OpenMAIC 有更新' : 'What\u2019s New in OpenMAIC'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[13px] text-muted-foreground mb-5",
                                children: locKey === 'zh-CN' ? '本次更新带来了以下新功能与改进：' : 'Here\u2019s what shipped in this release:'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-3.5",
                                children: CHANGELOG.map((item)=>{
                                    const Icon = item.icon;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('shrink-0 size-8 rounded-lg bg-foreground/5 dark:bg-foreground/10 flex items-center justify-center', item.color),
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                                    className: "size-4"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "text-[13px] font-semibold",
                                                        children: item.title[locKey]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "text-[12px] text-muted-foreground leading-relaxed",
                                                        children: item.description[locKey]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, item.title['en-US']);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "px-6 pb-5 pt-1 flex justify-end gap-2 border-t border-border/40",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: dismiss,
                            className: "px-4 py-1.5 text-[12px] font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors",
                            children: locKey === 'zh-CN' ? '我知道了' : 'Got it'
                        })
                    })
                ]
            })
        })
    });
}
/** Hook: returns whether the What's-New modal should auto-open on first visit. */ function useShouldShowWhatsNew() {
    const [shouldShow, setShouldShow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            if (localStorage.getItem(WHATS_NEW_STORAGE_KEY) !== 'true') {
                // Small delay so it doesn't compete with the page's initial animation
                const t = setTimeout(()=>setShouldShow(true), 800);
                return ()=>clearTimeout(t);
            }
        } catch  {
        /* ignore */ }
    }, []);
    const markSeen = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        try {
            localStorage.setItem(WHATS_NEW_STORAGE_KEY, 'true');
        } catch  {
        /* ignore */ }
        setShouldShow(false);
    }, []);
    return [
        shouldShow,
        markSeen
    ];
}
function DiscoverTabs({ activeTab, onTabChange, myCoursesCount, discoverCount }) {
    const { locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';
    const tabs = [
        {
            id: 'my-courses',
            label: locKey === 'zh-CN' ? '我的课程' : 'My Courses',
            count: myCoursesCount
        },
        {
            id: 'discover',
            label: locKey === 'zh-CN' ? '发现' : 'Discover',
            count: discoverCount
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex items-center gap-1 p-0.5 rounded-full bg-foreground/5 dark:bg-foreground/10",
        children: tabs.map((tab)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: ()=>onTabChange(tab.id),
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('relative px-3.5 py-1 text-[12px] font-medium rounded-full transition-colors', activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground/70 hover:text-foreground/80'),
                children: [
                    activeTab === tab.id && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_14__/* .motion */ .PY1.div, {
                        layoutId: "discover-tab-pill",
                        className: "absolute inset-0 rounded-full bg-white dark:bg-slate-800 shadow-sm",
                        transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 30
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "relative z-10 flex items-center gap-1.5",
                        children: [
                            tab.label,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('text-[10px] tabular-nums', activeTab === tab.id ? 'text-violet-500' : 'text-muted-foreground/50'),
                                children: tab.count
                            })
                        ]
                    })
                ]
            }, tab.id))
    });
}
function FeaturedTopicCard({ topic, onClick }) {
    const { locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';
    const Icon = topic.icon;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_14__/* .motion */ .PY1.button, {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        whileHover: {
            y: -2
        },
        transition: {
            duration: 0.2
        },
        onClick: ()=>onClick(topic.prompt[locKey]),
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__.cn)('group relative w-full text-left rounded-2xl border border-border/50 overflow-hidden', 'bg-gradient-to-br', topic.accent, 'hover:border-border hover:shadow-md transition-all', 'p-4'),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "shrink-0 size-9 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm flex items-center justify-center shadow-sm",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                            className: "size-4.5 text-foreground/80"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-0.5",
                                children: topic.category[locKey]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "text-[13px] font-semibold leading-snug line-clamp-2",
                                children: topic.title[locKey]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-2.5 flex items-center gap-1 text-[11px] text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bone_Brain_ChevronLeft_ChevronRight_Dna_Eye_HeartPulse_Microscope_Pill_Sparkles_Stethoscope_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                        className: "size-3"
                    }),
                    locKey === 'zh-CN' ? '点击生成此课程' : 'Click to generate this lesson'
                ]
            })
        ]
    });
}



/***/ }),

/***/ 43221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ AccessCodeGuard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_access_code_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92425);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/access-code-guard.tsx
 *
 * Verbatim port.
 */ /* __next_internal_client_entry_do_not_use__ AccessCodeGuard auto */ 


function AccessCodeGuard({ children }) {
    const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        enabled: false,
        authenticated: false,
        loading: true
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let cancelled = false;
        fetch('/api/access-code/status').then((res)=>res.json()).then((data)=>{
            if (!cancelled) {
                setStatus({
                    enabled: data.enabled,
                    authenticated: data.authenticated,
                    loading: false
                });
            }
        }).catch(()=>{
            if (!cancelled) {
                setStatus({
                    enabled: true,
                    authenticated: false,
                    loading: false
                });
            }
        });
        return ()=>{
            cancelled = true;
        };
    }, []);
    const needsAuth = !status.loading && status.enabled && !status.authenticated;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            needsAuth && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_access_code_modal__WEBPACK_IMPORTED_MODULE_2__/* .AccessCodeModal */ .t, {
                open: true,
                onSuccess: ()=>setStatus((s)=>({
                            ...s,
                            authenticated: true
                        }))
            }),
            children
        ]
    });
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

/***/ 44374:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ Textarea)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);



function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
        "data-slot": "textarea",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props
    });
}



/***/ }),

/***/ 48263:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C1: () => (/* binding */ rewriteAudioRefsToIds)
/* harmony export */ });
/* unused harmony exports collectAudioFiles, collectMediaFiles, actionsToManifest */
/* harmony import */ var _lib_utils_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29732);
/** Ported from OpenMAIC. Original: lib/export/classroom-zip-utils.ts */ 
async function collectAudioFiles(scenes) {
    const audioIds = new Set();
    for (const scene of scenes){
        for (const action of scene.actions ?? []){
            if (action.type === 'speech' && action.audioId) {
                audioIds.add(action.audioId);
            }
        }
    }
    const collected = [];
    for (const audioId of audioIds){
        const record = await db.audioFiles.get(audioId);
        if (record) {
            const ext = record.format || 'mp3';
            collected.push({
                zipPath: `audio/${audioId}.${ext}`,
                record
            });
        }
    }
    return collected;
}
async function collectMediaFiles(stageId) {
    const records = await db.mediaFiles.where('stageId').equals(stageId).toArray();
    const collected = [];
    for (const record of records){
        const elementId = record.id.includes(':') ? record.id.split(':').slice(1).join(':') : record.id;
        const ext = record.mimeType?.split('/')[1] || 'jpg';
        collected.push({
            zipPath: `media/${elementId}.${ext}`,
            record,
            elementId
        });
    }
    return collected;
}
// ─── Export: Action Serialization ──────────────────────────────
function actionsToManifest(actions, audioIdToPath, agentIdToIndex = new Map()) {
    return actions.map((action)=>{
        if (action.type === 'speech') {
            const speech = action;
            const { audioId, ...rest } = speech;
            const audioRef = audioId ? audioIdToPath.get(audioId) : undefined;
            return {
                ...rest,
                ...audioRef ? {
                    audioRef
                } : {},
                ...speech.audioUrl ? {
                    audioUrl: speech.audioUrl
                } : {}
            };
        }
        if (action.type === 'discussion') {
            const discussion = action;
            const { agentId, ...rest } = discussion;
            const agentIndex = agentId ? agentIdToIndex.get(agentId) : undefined;
            return {
                ...rest,
                ...agentIndex !== undefined ? {
                    agentIndex
                } : agentId ? {
                    agentId
                } : {}
            };
        }
        return action;
    });
}
function rewriteAudioRefsToIds(actions, audioRefMap, options = {}) {
    return actions.map((action)=>{
        if (action.type === 'speech' && 'audioRef' in action) {
            const { audioRef, ...rest } = action;
            const audioId = audioRef ? audioRefMap[audioRef] : undefined;
            return {
                ...rest,
                ...audioId ? {
                    audioId
                } : {}
            };
        }
        if (action.type === 'discussion') {
            const { agentIndex, agentId: legacyAgentId, ...rest } = action;
            const indexedAgentId = typeof agentIndex === 'number' ? options.agentIds?.[agentIndex] : undefined;
            const preservedLegacyAgentId = legacyAgentId && (!options.agentIds?.length || options.agentIds.includes(legacyAgentId)) ? legacyAgentId : undefined;
            const fallbackAgentId = typeof options.fallbackDiscussionAgentIndex === 'number' ? options.agentIds?.[options.fallbackDiscussionAgentIndex] : undefined;
            return {
                ...rest,
                ...indexedAgentId || preservedLegacyAgentId || fallbackAgentId ? {
                    agentId: indexedAgentId || preservedLegacyAgentId || fallbackAgentId
                } : {}
            };
        }
        return action;
    });
}


/***/ }),

/***/ 54899:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ ASRSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65891);
/* harmony import */ var _components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15804);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(75748);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33157);
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3945);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(48272);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(15688);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(2125);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(40980);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(66609);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7603);
/* harmony import */ var _lib_audio_wav_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(29466);
/* __next_internal_client_entry_do_not_use__ ASRSettings auto */ 















const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_11__/* .createLogger */ .h)('ASRSettings');
function ASRSettings({ selectedProviderId }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__/* .useI18n */ .s)();
    const asrLanguage = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore)((state)=>state.asrLanguage);
    const asrProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore)((state)=>state.asrProvidersConfig);
    const setASRProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore)((state)=>state.setASRProviderConfig);
    const removeCustomASRProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_8__.useSettingsStore)((state)=>state.removeCustomASRProvider);
    const asrProvider = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_9__/* .ASR_PROVIDERS */ .Co[selectedProviderId];
    const isCustom = (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_12__/* .isCustomASRProvider */ .v)(selectedProviderId);
    const providerConfig = asrProvidersConfig[selectedProviderId];
    const isServerConfigured = !!providerConfig?.isServerConfigured;
    const requiresApiKey = isCustom ? !!providerConfig?.requiresApiKey : !!asrProvider?.requiresApiKey;
    const isKeylessLocalProvider = !isCustom && !requiresApiKey && !!asrProvider?.defaultBaseUrl;
    const [showApiKey, setShowApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isRecording, setIsRecording] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isProcessing, setIsProcessing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [asrResult, setASRResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [testStatus, setTestStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [testMessage, setTestMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const mediaRecorderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Reset state when provider changes (derived state pattern)
    const [prevProviderId, setPrevProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(selectedProviderId);
    if (selectedProviderId !== prevProviderId) {
        setPrevProviderId(selectedProviderId);
        setShowApiKey(false);
        setTestStatus('idle');
        setTestMessage('');
        setASRResult('');
    }
    const handleToggleASRRecording = async ()=>{
        if (isRecording) {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            setIsRecording(false);
        } else {
            setASRResult('');
            setTestStatus('testing');
            setTestMessage('');
            if (selectedProviderId === 'browser-native') {
                const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (!SpeechRecognitionCtor) {
                    setTestStatus('error');
                    setTestMessage(t('settings.asrNotSupported'));
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Vendor-prefixed API without standard typings
                const recognition = new SpeechRecognitionCtor();
                recognition.lang = asrLanguage || 'zh-CN';
                recognition.onresult = (event)=>{
                    const transcript = event.results[0][0].transcript;
                    setASRResult(transcript);
                    setTestStatus('success');
                    setTestMessage(t('settings.asrTestSuccess'));
                };
                recognition.onerror = (event)=>{
                    setTestStatus('error');
                    setTestMessage(t('settings.asrTestFailed') + ': ' + event.error);
                };
                recognition.onend = ()=>{
                    setIsRecording(false);
                };
                recognition.start();
                setIsRecording(true);
            } else {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: true
                    });
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorderRef.current = mediaRecorder;
                    const audioChunks = [];
                    mediaRecorder.ondataavailable = (event)=>{
                        audioChunks.push(event.data);
                    };
                    mediaRecorder.onstop = async ()=>{
                        stream.getTracks().forEach((track)=>track.stop());
                        setIsProcessing(true);
                        try {
                            const audioBlob = new Blob(audioChunks, {
                                type: 'audio/webm'
                            });
                            const uploadAudio = await (0,_lib_audio_wav_utils__WEBPACK_IMPORTED_MODULE_13__/* .normalizeASRUploadAudio */ .$I)(selectedProviderId, audioBlob);
                            const formData = new FormData();
                            formData.append('audio', uploadAudio.blob, uploadAudio.fileName);
                            formData.append('providerId', selectedProviderId);
                            formData.append('modelId', asrProvidersConfig[selectedProviderId]?.modelId || asrProvider?.defaultModelId || '');
                            formData.append('language', asrLanguage);
                            const apiKeyValue = asrProvidersConfig[selectedProviderId]?.apiKey;
                            if (apiKeyValue?.trim()) formData.append('apiKey', apiKeyValue);
                            const baseUrlValue = asrProvidersConfig[selectedProviderId]?.baseUrl || providerConfig?.customDefaultBaseUrl || '';
                            if (baseUrlValue?.trim()) formData.append('baseUrl', baseUrlValue);
                            const response = await fetch('/api/transcription', {
                                method: 'POST',
                                body: formData
                            });
                            if (response.ok) {
                                const data = await response.json();
                                if (data.text?.trim()) {
                                    setASRResult(data.text);
                                    setTestStatus('success');
                                    setTestMessage(t('settings.asrTestSuccess'));
                                } else {
                                    setTestStatus('error');
                                    setTestMessage(data.error || t('settings.asrNoTranscription'));
                                }
                            } else {
                                setTestStatus('error');
                                const errorData = await response.json().catch(()=>({
                                        error: response.statusText
                                    }));
                                setTestMessage(errorData.details || errorData.error || t('settings.asrTestFailed'));
                            }
                        } catch (error) {
                            log.error('ASR test failed:', error);
                            setTestStatus('error');
                            setTestMessage(error instanceof Error && error.message ? `${t('settings.asrTestFailed')}: ${error.message}` : t('settings.asrTestFailed'));
                        } finally{
                            setIsProcessing(false);
                        }
                    };
                    mediaRecorder.start();
                    setIsRecording(true);
                } catch (error) {
                    log.error('Failed to access microphone:', error);
                    setTestStatus('error');
                    setTestMessage(t('settings.microphoneAccessFailed'));
                }
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6 max-w-3xl",
        children: [
            isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300",
                children: t('settings.serverConfiguredNotice')
            }),
            isCustom && (providerConfig?.customModels || []).length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-3 text-sm text-amber-700 dark:text-amber-300",
                children: t('settings.noModelsWarning')
            }),
            !isServerConfigured && (requiresApiKey || isCustom || isKeylessLocalProvider) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: t('settings.asrApiKey')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                name: `asr-api-key-${selectedProviderId}`,
                                                type: showApiKey ? 'text' : 'password',
                                                autoComplete: "new-password",
                                                autoCapitalize: "none",
                                                autoCorrect: "off",
                                                spellCheck: false,
                                                placeholder: t('settings.enterApiKey'),
                                                value: asrProvidersConfig[selectedProviderId]?.apiKey || '',
                                                onChange: (e)=>setASRProviderConfig(selectedProviderId, {
                                                        apiKey: e.target.value
                                                    }),
                                                className: "font-mono text-sm pr-10"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setShowApiKey(!showApiKey),
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: t('settings.asrBaseUrl')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                        name: `asr-base-url-${selectedProviderId}`,
                                        autoComplete: "off",
                                        autoCapitalize: "none",
                                        autoCorrect: "off",
                                        spellCheck: false,
                                        placeholder: isCustom ? providerConfig?.customDefaultBaseUrl || 'http://localhost:8000/v1' : asrProvider?.defaultBaseUrl || t('settings.enterCustomBaseUrl'),
                                        value: asrProvidersConfig[selectedProviderId]?.baseUrl || '',
                                        onChange: (e)=>setASRProviderConfig(selectedProviderId, {
                                                baseUrl: e.target.value
                                            }),
                                        className: "text-sm"
                                    })
                                ]
                            })
                        ]
                    }),
                    (()=>{
                        const effectiveBaseUrl = asrProvidersConfig[selectedProviderId]?.baseUrl || (isCustom ? providerConfig?.customDefaultBaseUrl : asrProvider?.defaultBaseUrl) || '';
                        if (!effectiveBaseUrl) return null;
                        let endpointPath = '';
                        if (isCustom) {
                            endpointPath = '/audio/transcriptions';
                        } else {
                            switch(selectedProviderId){
                                case 'openai-whisper':
                                case 'lemonade-asr':
                                    endpointPath = '/audio/transcriptions';
                                    break;
                                case 'qwen-asr':
                                    endpointPath = '/services/aigc/multimodal-generation/generation';
                                    break;
                            }
                        }
                        if (!endpointPath) return null;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-xs text-muted-foreground break-all",
                            children: [
                                t('settings.requestUrl'),
                                ": ",
                                effectiveBaseUrl + endpointPath
                            ]
                        });
                    })()
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                        className: "text-sm",
                        children: t('settings.testASR')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                value: asrResult,
                                readOnly: true,
                                placeholder: t('settings.asrResultPlaceholder'),
                                className: "flex-1 bg-muted/50"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                onClick: handleToggleASRRecording,
                                disabled: isProcessing || requiresApiKey && !asrProvidersConfig[selectedProviderId]?.apiKey?.trim() && !isServerConfigured,
                                className: "gap-2 w-[140px]",
                                children: isProcessing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "h-4 w-4 animate-spin"
                                        }),
                                        t('settings.asrProcessing')
                                    ]
                                }) : isRecording ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                            className: "h-4 w-4"
                                        }),
                                        t('settings.stopRecording')
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                            className: "h-4 w-4"
                                        }),
                                        t('settings.startRecording')
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            testMessage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__.cn)('rounded-lg p-3 text-sm overflow-hidden', testStatus === 'success' && 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800', testStatus === 'error' && 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800'),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-start gap-2 min-w-0",
                    children: [
                        testStatus === 'success' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                            className: "h-4 w-4 mt-0.5 shrink-0"
                        }),
                        testStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                            className: "h-4 w-4 mt-0.5 shrink-0"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "flex-1 min-w-0 break-all",
                            children: testMessage
                        })
                    ]
                })
            }),
            !isCustom && asrProvider?.models?.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                        className: "text-sm",
                        children: t('settings.defaultModel')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                        value: asrProvidersConfig[selectedProviderId]?.modelId || asrProvider?.defaultModelId,
                        onValueChange: (value)=>setASRProviderConfig(selectedProviderId, {
                                modelId: value
                            }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                children: asrProvider?.models.map((model)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                        value: model.id,
                                        children: model.name
                                    }, model.id))
                            })
                        ]
                    })
                ]
            }),
            isCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                        className: "text-sm",
                        children: t('settings.availableModels')
                    }),
                    (()=>{
                        const customModels = providerConfig?.customModels || [];
                        const activeModelId = asrProvidersConfig[selectedProviderId]?.modelId || customModels[0]?.id || '';
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                customModels.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-lg border border-border/60 overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "grid grid-cols-[20px_1fr_1fr_36px] gap-0 bg-muted/40 px-3 py-1.5 border-b border-border/40",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {}),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wider",
                                                    children: "ID"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wider",
                                                    children: t('settings.modelNamePlaceholder')
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {})
                                            ]
                                        }),
                                        customModels.map((model, index)=>{
                                            const isActive = model.id === activeModelId;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                onClick: ()=>setASRProviderConfig(selectedProviderId, {
                                                        modelId: model.id
                                                    }),
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__.cn)('grid grid-cols-[20px_1fr_1fr_36px] gap-0 items-center px-3 py-2 group cursor-pointer transition-colors', isActive ? 'bg-primary/5' : 'hover:bg-muted/20', index > 0 && 'border-t border-border/30'),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "flex items-center -ml-1",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__.cn)('size-4 rounded-full border-2 flex items-center justify-center transition-colors', isActive ? 'border-primary' : 'border-muted-foreground/30 group-hover:border-muted-foreground/50'),
                                                            children: isActive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "size-2 rounded-full bg-primary"
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-sm font-mono text-foreground/80 truncate pr-3",
                                                        children: model.id
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-sm text-foreground/60 truncate pr-3",
                                                        children: model.name
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "icon",
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            const models = [
                                                                ...customModels
                                                            ];
                                                            models.splice(index, 1);
                                                            const newModelId = isActive ? models[0]?.id || '' : activeModelId;
                                                            setASRProviderConfig(selectedProviderId, {
                                                                customModels: models,
                                                                modelId: newModelId
                                                            });
                                                        },
                                                        className: "h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        })
                                                    })
                                                ]
                                            }, model.id);
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-sm text-muted-foreground/50 italic",
                                    children: t('settings.noModelsAdded')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AddModelRow, {
                                    existingIds: customModels.map((m)=>m.id),
                                    onAdd: (modelId, modelName)=>{
                                        const models = [
                                            ...customModels,
                                            {
                                                id: modelId,
                                                name: modelName
                                            }
                                        ];
                                        setASRProviderConfig(selectedProviderId, {
                                            customModels: models,
                                            modelId: models[0].id
                                        });
                                    }
                                })
                            ]
                        });
                    })()
                ]
            }),
            isCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "pt-4 border-t",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                    variant: "destructive",
                    size: "sm",
                    onClick: ()=>setShowDeleteConfirm(true),
                    children: t('settings.deleteProvider')
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialog */ .Lt, {
                open: showDeleteConfirm,
                onOpenChange: (open)=>!open && setShowDeleteConfirm(false),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogContent */ .EO, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogTitle */ .r7, {
                                    children: t('settings.deleteProvider')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogDescription */ .$v, {
                                    children: t('settings.deleteProviderConfirm')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogCancel */ .Zr, {
                                    children: t('settings.cancelEdit')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogAction */ .Rx, {
                                    onClick: ()=>{
                                        removeCustomASRProvider(selectedProviderId);
                                        setShowDeleteConfirm(false);
                                    },
                                    children: t('settings.deleteProvider')
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
function AddModelRow({ onAdd, existingIds }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__/* .useI18n */ .s)();
    const [modelId, setModelId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [modelName, setModelName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const handleAdd = ()=>{
        if (!modelId.trim()) return;
        if (existingIds.includes(modelId.trim())) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Duplicate ID');
            return;
        }
        onAdd(modelId.trim(), modelName.trim() || modelId.trim());
        setModelId('');
        setModelName('');
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-[1fr_1fr_auto] gap-2 items-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                value: modelId,
                onChange: (e)=>setModelId(e.target.value),
                onKeyDown: (e)=>e.key === 'Enter' && handleAdd(),
                className: "text-sm font-mono",
                placeholder: t('settings.modelIdPlaceholder')
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                value: modelName,
                onChange: (e)=>setModelName(e.target.value),
                onKeyDown: (e)=>e.key === 'Enter' && handleAdd(),
                className: "text-sm",
                placeholder: t('settings.modelNamePlaceholder')
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                variant: "outline",
                size: "sm",
                onClick: handleAdd,
                disabled: !modelId.trim(),
                className: "shrink-0 gap-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Mic_MicOff_Plus_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                        className: "h-3.5 w-3.5"
                    }),
                    t('settings.addModel')
                ]
            })
        ]
    });
}


/***/ }),

/***/ 55278:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ik: () => (/* binding */ InputGroupButton),
/* harmony export */   MG: () => (/* binding */ InputGroup),
/* harmony export */   iV: () => (/* binding */ InputGroupInput)
/* harmony export */ });
/* unused harmony exports InputGroupAddon, InputGroupText, InputGroupTextarea */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18460);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40980);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_textarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44374);
/* __next_internal_client_entry_do_not_use__ InputGroup,InputGroupAddon,InputGroupButton,InputGroupText,InputGroupInput,InputGroupTextarea auto */ 






function InputGroup({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "input-group",
        role: "group",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.cn)('border-input dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 h-9 rounded-md border shadow-xs transition-[color,box-shadow] has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot][aria-invalid=true]]:ring-[3px] has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 [[data-slot=combobox-content]_&]:focus-within:border-inherit [[data-slot=combobox-content]_&]:focus-within:ring-0 group/input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto', className),
        ...props
    });
}
const inputGroupAddonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_6__/* .cva */ .F)("text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none", {
    variants: {
        align: {
            'inline-start': 'pl-2 has-[>button]:ml-[-0.25rem] has-[>kbd]:ml-[-0.15rem] order-first',
            'inline-end': 'pr-2 has-[>button]:mr-[-0.25rem] has-[>kbd]:mr-[-0.15rem] order-last',
            'block-start': 'px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start',
            'block-end': 'px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start'
        }
    },
    defaultVariants: {
        align: 'inline-start'
    }
});
function InputGroupAddon({ className, align = 'inline-start', ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": align,
        className: cn(inputGroupAddonVariants({
            align
        }), className),
        onClick: (e)=>{
            if (e.target.closest('button')) {
                return;
            }
            e.currentTarget.parentElement?.querySelector('input')?.focus();
        },
        ...props
    });
}
const inputGroupButtonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_6__/* .cva */ .F)('gap-2 text-sm shadow-none flex items-center', {
    variants: {
        size: {
            xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
            sm: '',
            'icon-xs': 'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
            'icon-sm': 'size-8 p-0 has-[>svg]:p-0'
        }
    },
    defaultVariants: {
        size: 'xs'
    }
});
function InputGroupButton({ className, type = 'button', variant = 'ghost', size = 'xs', ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        type: type,
        "data-size": size,
        variant: variant,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.cn)(inputGroupButtonVariants({
            size
        }), className),
        ...props
    });
}
function InputGroupText({ className, ...props }) {
    return /*#__PURE__*/ _jsx("span", {
        className: cn("text-muted-foreground gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none", className),
        ...props
    });
}
function InputGroupInput({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
        "data-slot": "input-group-control",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.cn)('rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1', className),
        ...props
    });
}
function InputGroupTextarea({ className, ...props }) {
    return /*#__PURE__*/ _jsx(Textarea, {
        "data-slot": "input-group-control",
        className: cn('rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1 resize-none', className),
        ...props
    });
}



/***/ }),

/***/ 57434:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TR: () => (/* binding */ useAppSettingsOpener),
/* harmony export */   eK: () => (/* binding */ openAuthModal),
/* harmony export */   vx: () => (/* binding */ openAppSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93714);
/**
 * App-level UI event bus.
 *
 * Decouples deeply-nested children (e.g. the OpenMAIC SettingsDialog rendered
 * inside the AI Classroom tab) from the top-level MedQ page state that owns
 * the app-wide SettingsDialog. Without this bus, a child would need to climb
 * ~6 component layers to ask the page to open Settings → BYOK.
 *
 * Use `useAppEvents()` in the top-level page to subscribe, and
 * `openAppSettings()` / `openAppByok()` from anywhere to dispatch.
 */ 

const emitter = (0,mitt__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)();
/** Dispatch from anywhere in the app. */ function openAppSettings(section) {
    emitter.emit('OPEN_APP_SETTINGS', {
        section
    });
}
/**
 * Open the app-wide AuthModal from anywhere in the app.
 *
 * This mirrors the same window-event pattern the AI agent uses
 * (`medq-agent-open-dialog` with `dialogId: 'auth-modal'`), which is
 * handled by MedQAppShell. Use this when a child component needs to
 * prompt sign-in (e.g. BYOK settings when the user is unauthenticated)
 * without prop-drilling the setShowAuthModal setter.
 */ function openAuthModal(tab) {
    if (false) {}
    window.dispatchEvent(new CustomEvent('medq-agent-open-dialog', {
        detail: {
            dialogId: 'auth-modal',
            data: {
                tab
            }
        }
    }));
}
/** Subscribe in a top-level component (e.g. src/app/page.tsx). */ function useAppSettingsOpener(onOpen) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handler = (payload)=>{
            onOpen(payload?.section);
        };
        emitter.on('OPEN_APP_SETTINGS', handler);
        return ()=>{
            emitter.off('OPEN_APP_SETTINGS', handler);
        };
    }, [
        onOpen
    ]);
}


/***/ }),

/***/ 57501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ SettingsDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28276);
/* harmony import */ var _components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65891);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27388);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(29450);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(15688);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(39979);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(88074);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(94890);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75748);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66609);
/* harmony import */ var _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(56497);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(40980);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(41120);
/* harmony import */ var _provider_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9805);
/* harmony import */ var _provider_config_panel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2234);
/* harmony import */ var _pdf_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(61391);
/* harmony import */ var _lib_pdf_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(17329);
/* harmony import */ var _image_settings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(88364);
/* harmony import */ var _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(81301);
/* harmony import */ var _video_settings__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4522);
/* harmony import */ var _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2119);
/* harmony import */ var _tts_settings__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(61860);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(33157);
/* harmony import */ var _asr_settings__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(54899);
/* harmony import */ var _web_search_settings__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(85734);
/* harmony import */ var _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(50672);
/* harmony import */ var _general_settings__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(77461);
/* harmony import */ var _model_edit_dialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(37932);
/* harmony import */ var _add_provider_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(96899);
/* harmony import */ var _add_audio_provider_dialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(97782);
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(3945);
/* __next_internal_client_entry_do_not_use__ SettingsDialog auto */ 






























// ─── Provider List Column (reusable) ───
function ProviderListColumn({ providers, configs, selectedId, onSelect, width, t, onAdd }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-shrink-0 bg-background flex flex-col",
        style: {
            width
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-1 overflow-y-auto p-3 space-y-1.5",
                children: providers.map((provider)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>onSelect(provider.id),
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all border text-left', selectedId === provider.id ? 'bg-primary/5 border-primary/50 shadow-sm' : 'border-transparent hover:bg-muted/50'),
                        children: [
                            provider.icon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: provider.icon,
                                alt: provider.name,
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-5 h-5 rounded', _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_8__/* .MONO_LOGO_PROVIDERS */ .P.has(provider.id) && 'dark:invert'),
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "h-5 w-5 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "font-medium text-sm flex-1 truncate",
                                children: provider.name
                            }),
                            configs[provider.id]?.isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[10px] px-1 py-0 h-4 leading-4 rounded shrink-0 bg-muted text-muted-foreground",
                                children: t('settings.serverConfigured')
                            })
                        ]
                    }, provider.id))
            }),
            onAdd && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "p-3 border-t",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                    variant: "outline",
                    size: "sm",
                    className: "w-full gap-1.5",
                    onClick: onAdd,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                            className: "h-3.5 w-3.5"
                        }),
                        t('settings.addProviderButton')
                    ]
                })
            })
        ]
    });
}
// ─── Helper: get TTS/ASR provider display name ───
function getTTSProviderName(providerId, t) {
    if ((0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_29__/* .isCustomTTSProvider */ .S)(providerId)) {
        const cfg = _lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore.getState().ttsProvidersConfig[providerId];
        return cfg?.customName || providerId;
    }
    const names = {
        'openai-tts': t('settings.providerOpenAITTS'),
        'azure-tts': t('settings.providerAzureTTS'),
        'glm-tts': t('settings.providerGLMTTS'),
        'qwen-tts': t('settings.providerQwenTTS'),
        'voxcpm-tts': t('settings.providerVoxCPMTTS'),
        'doubao-tts': t('settings.providerDoubaoTTS'),
        'elevenlabs-tts': t('settings.providerElevenLabsTTS'),
        'minimax-tts': t('settings.providerMiniMaxTTS'),
        'lemonade-tts': t('settings.providerLemonadeTTS'),
        'browser-native-tts': t('settings.providerBrowserNativeTTS')
    };
    return names[providerId] || providerId;
}
function getASRProviderName(providerId, t) {
    if ((0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_29__/* .isCustomASRProvider */ .v)(providerId)) {
        const cfg = _lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore.getState().asrProvidersConfig[providerId];
        return cfg?.customName || providerId;
    }
    const names = {
        'openai-whisper': t('settings.providerOpenAIWhisper'),
        'browser-native': t('settings.providerBrowserNative'),
        'qwen-asr': t('settings.providerQwenASR'),
        'azure-asr': t('settings.providerAzureASR'),
        'lemonade-asr': t('settings.providerLemonadeASR')
    };
    return names[providerId] || providerId;
}
// ─── Image/Video provider name helpers ───
const IMAGE_PROVIDER_NAMES = {
    seedream: 'providerSeedream',
    'openai-image': 'providerOpenAIImage',
    'qwen-image': 'providerQwenImage',
    'nano-banana': 'providerNanoBanana',
    'minimax-image': 'providerMiniMaxImage',
    'grok-image': 'providerGrokImage',
    lemonade: 'providerLemonadeImage'
};
const IMAGE_PROVIDER_ICONS = {
    seedream: '/logos/doubao.svg',
    'openai-image': '/logos/openai.svg',
    'qwen-image': '/logos/bailian.svg',
    'nano-banana': '/logos/gemini.svg',
    'minimax-image': '/logos/minimax.svg',
    'grok-image': '/logos/grok.svg',
    lemonade: '/logos/lemonade.svg'
};
const VIDEO_PROVIDER_NAMES = {
    seedance: 'providerSeedance',
    kling: 'providerKling',
    veo: 'providerVeo',
    sora: 'providerSora',
    'minimax-video': 'providerMiniMaxVideo',
    'grok-video': 'providerGrokVideo',
    happyhorse: 'providerHappyHorse'
};
const VIDEO_PROVIDER_ICONS = {
    seedance: '/logos/doubao.svg',
    kling: '/logos/kling.svg',
    veo: '/logos/gemini.svg',
    sora: '/logos/openai.svg',
    'minimax-video': '/logos/minimax.svg',
    'grok-video': '/logos/grok.svg',
    happyhorse: '/logos/qwen.svg'
};
function SettingsDialog({ open, onOpenChange, initialSection }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__/* .useI18n */ .s)();
    // Get settings from store
    const providerId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.providerId);
    const _modelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.modelId);
    const providersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.providersConfig);
    const pdfProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.pdfProviderId);
    const pdfProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.pdfProvidersConfig);
    const webSearchProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.webSearchProviderId);
    const webSearchProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.webSearchProvidersConfig);
    const imageProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.imageProviderId);
    const imageProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.imageProvidersConfig);
    const videoProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.videoProviderId);
    const videoProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.videoProvidersConfig);
    const ttsProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.ttsProviderId);
    const ttsProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.ttsProvidersConfig);
    const asrProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.asrProviderId);
    const asrProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.asrProvidersConfig);
    // Store actions
    const setProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.setProviderConfig);
    const setProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.setProvidersConfig);
    const setTTSProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.setTTSProvider);
    const setASRProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.setASRProvider);
    // Navigation
    const [activeSection, setActiveSection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('providers');
    const [selectedProviderId, setSelectedProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(providerId);
    const [selectedPdfProviderId, setSelectedPdfProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(pdfProviderId);
    const [selectedWebSearchProviderId, setSelectedWebSearchProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(webSearchProviderId);
    const [selectedImageProviderId, setSelectedImageProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(imageProviderId);
    const [selectedVideoProviderId, setSelectedVideoProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(videoProviderId);
    // Navigate to initialSection when dialog opens
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (open && initialSection) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync section from prop when dialog opens
            setActiveSection(initialSection);
        }
    }, [
        open,
        initialSection
    ]);
    // Model editing state
    const [editingModel, setEditingModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showModelDialog, setShowModelDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Provider deletion confirmation
    const [providerToDelete, setProviderToDelete] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Add provider dialog
    const [showAddProviderDialog, setShowAddProviderDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showAddTTSProviderDialog, setShowAddTTSProviderDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showAddASRProviderDialog, setShowAddASRProviderDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const addCustomTTSProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.addCustomTTSProvider);
    const addCustomASRProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.addCustomASRProvider);
    const handleAddTTSProvider = (data)=>{
        const id = `custom-tts-${Date.now()}`;
        addCustomTTSProvider(id, data.name, data.baseUrl, data.requiresApiKey, data.defaultModel);
    };
    const handleAddASRProvider = (data)=>{
        const id = `custom-asr-${Date.now()}`;
        addCustomASRProvider(id, data.name, data.baseUrl, data.requiresApiKey);
    };
    // Save status indicator
    const [saveStatus, setSaveStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    // Resizable column widths
    const [sidebarWidth, setSidebarWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(192);
    const [providerListWidth, setProviderListWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(192);
    const [isResizing, setIsResizing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const resizeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleResizeStart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e, target)=>{
        e.preventDefault();
        const startWidth = target === 'sidebar' ? sidebarWidth : providerListWidth;
        resizeRef.current = {
            target,
            startX: e.clientX,
            startWidth
        };
        setIsResizing(true);
    }, [
        sidebarWidth,
        providerListWidth
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isResizing) return;
        const handleMouseMove = (e)=>{
            if (!resizeRef.current) return;
            const { target, startX, startWidth } = resizeRef.current;
            const delta = e.clientX - startX;
            const newWidth = Math.max(120, Math.min(360, startWidth + delta));
            if (target === 'sidebar') {
                setSidebarWidth(newWidth);
            } else {
                setProviderListWidth(newWidth);
            }
        };
        const handleMouseUp = ()=>{
            resizeRef.current = null;
            setIsResizing(false);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        return ()=>{
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [
        isResizing
    ]);
    const handleSave = ()=>{
        onOpenChange(false);
    };
    const handleProviderSelect = (pid)=>{
        setSelectedProviderId(pid);
    };
    const handleProviderConfigChange = (pid, apiKey, baseUrl, requiresApiKey)=>{
        setProviderConfig(pid, {
            apiKey,
            baseUrl,
            requiresApiKey
        });
    };
    const handleProviderConfigSave = ()=>{
        setSaveStatus('saved');
        setTimeout(()=>setSaveStatus('idle'), 2000);
    };
    const selectedProvider = providersConfig[selectedProviderId] ? {
        id: selectedProviderId,
        name: providersConfig[selectedProviderId].name,
        type: providersConfig[selectedProviderId].type,
        defaultBaseUrl: providersConfig[selectedProviderId].defaultBaseUrl,
        alternateBaseUrls: _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_8__/* .PROVIDERS */ .x[selectedProviderId]?.alternateBaseUrls,
        icon: providersConfig[selectedProviderId].icon,
        requiresApiKey: providersConfig[selectedProviderId].requiresApiKey,
        models: providersConfig[selectedProviderId].models
    } : undefined;
    // Handle model editing
    const handleEditModel = (pid, modelIndex)=>{
        const allModels = providersConfig[pid]?.models || [];
        setEditingModel({
            providerId: pid,
            modelIndex,
            model: {
                ...allModels[modelIndex]
            }
        });
        setShowModelDialog(true);
    };
    const handleAddModel = ()=>{
        setEditingModel({
            providerId: selectedProviderId,
            modelIndex: null,
            model: {
                id: '',
                name: '',
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            }
        });
        setShowModelDialog(true);
    };
    const handleDeleteModel = (pid, modelIndex)=>{
        const currentModels = providersConfig[pid]?.models || [];
        const newModels = currentModels.filter((_, i)=>i !== modelIndex);
        setProviderConfig(pid, {
            models: newModels
        });
    };
    const handleAutoSaveModel = ()=>{
        if (!editingModel) return;
        const { providerId: pid, modelIndex, model } = editingModel;
        if (!model.id.trim()) return;
        const currentModels = providersConfig[pid]?.models || [];
        let newModels;
        let newModelIndex = modelIndex;
        if (modelIndex === null) {
            const existingIndex = currentModels.findIndex((m)=>m.id === model.id);
            if (existingIndex >= 0) {
                newModels = [
                    ...currentModels
                ];
                newModels[existingIndex] = model;
                newModelIndex = existingIndex;
            } else {
                newModels = [
                    ...currentModels,
                    model
                ];
                newModelIndex = newModels.length - 1;
            }
            setProviderConfig(pid, {
                models: newModels
            });
            setEditingModel({
                ...editingModel,
                modelIndex: newModelIndex
            });
        } else {
            newModels = [
                ...currentModels
            ];
            newModels[modelIndex] = model;
            setProviderConfig(pid, {
                models: newModels
            });
        }
    };
    const handleSaveModel = ()=>{
        if (!editingModel) return;
        const { providerId: pid, modelIndex, model } = editingModel;
        if (!model.id.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.error(t('settings.modelIdRequired'));
            return;
        }
        const currentModels = providersConfig[pid]?.models || [];
        let newModels;
        if (modelIndex === null) {
            newModels = [
                ...currentModels,
                model
            ];
        } else {
            newModels = [
                ...currentModels
            ];
            newModels[modelIndex] = model;
        }
        setProviderConfig(pid, {
            models: newModels
        });
        setShowModelDialog(false);
        setEditingModel(null);
    };
    // Handle provider management
    const handleAddProvider = (providerData)=>{
        if (!providerData.name.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.error(t('settings.providerNameRequired'));
            return;
        }
        const newProviderId = `custom-${Date.now()}`;
        const updatedConfig = {
            ...providersConfig,
            [newProviderId]: (0,_utils__WEBPACK_IMPORTED_MODULE_30__/* .createCustomProviderSettings */ .os)(providerData)
        };
        setProvidersConfig(updatedConfig);
        setShowAddProviderDialog(false);
        setSelectedProviderId(newProviderId);
    };
    const handleDeleteProvider = (pid)=>{
        if (providersConfig[pid]?.isBuiltIn) {
            sonner__WEBPACK_IMPORTED_MODULE_7__.toast.error(t('settings.cannotDeleteBuiltIn'));
            return;
        }
        setProviderToDelete(pid);
    };
    const confirmDeleteProvider = ()=>{
        if (!providerToDelete) return;
        const pid = providerToDelete;
        const updatedConfig = {
            ...providersConfig
        };
        delete updatedConfig[pid];
        // setProvidersConfig re-resolves the global (providerId, modelId)
        // selection at the source (#580 invariant) — keep a still-usable
        // provider, fall back to another usable one, or go to State A. No
        // hand-rolled "pick the first config key" here: that ignored usability
        // and could re-select an invalid/unusable provider.
        setProvidersConfig(updatedConfig);
        if (selectedProviderId === pid) {
            // Settings-panel tab only (local UI), independent of model selection.
            const firstRemainingPid = Object.keys(updatedConfig)[0];
            setSelectedProviderId(firstRemainingPid || 'openai');
        }
        setProviderToDelete(null);
    };
    const handleResetProvider = (pid)=>{
        const provider = _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_8__/* .PROVIDERS */ .x[pid];
        if (!provider) return;
        setProviderConfig(pid, {
            models: [
                ...provider.models
            ]
        });
        sonner__WEBPACK_IMPORTED_MODULE_7__.toast.success(t('settings.resetSuccess'));
    };
    // Get all providers from providersConfig
    const allProviders = Object.entries(providersConfig).map(([id, config])=>({
            id: id,
            name: config.name,
            type: config.type,
            defaultBaseUrl: config.defaultBaseUrl,
            icon: config.icon,
            requiresApiKey: config.requiresApiKey,
            models: config.models,
            isServerConfigured: config.isServerConfigured
        }));
    // Sections that show a provider list column
    const _hasProviderList = [
        'providers',
        'pdf',
        'web-search',
        'image',
        'video',
        'tts',
        'asr'
    ].includes(activeSection);
    // Get header content based on section
    const getHeaderContent = ()=>{
        switch(activeSection){
            case 'general':
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                    className: "text-lg font-semibold",
                    children: t('settings.systemSettings')
                });
            case 'providers':
                if (selectedProvider) {
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            selectedProvider.icon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: selectedProvider.icon,
                                alt: selectedProvider.name,
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-8 h-8 rounded', _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_8__/* .MONO_LOGO_PROVIDERS */ .P.has(selectedProvider.id) && 'dark:invert'),
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "h-8 w-8 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-semibold",
                                        children: t(`settings.providerNames.${selectedProvider.id}`) !== `settings.providerNames.${selectedProvider.id}` ? t(`settings.providerNames.${selectedProvider.id}`) : selectedProvider.name
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: (0,_utils__WEBPACK_IMPORTED_MODULE_30__/* .getProviderTypeLabel */ .iA)(selectedProvider.type, t)
                                    })
                                ]
                            })
                        ]
                    });
                }
                return null;
            case 'pdf':
                {
                    const pdfProvider = _lib_pdf_constants__WEBPACK_IMPORTED_MODULE_12__/* .PDF_PROVIDERS */ .sP[selectedPdfProviderId];
                    if (!pdfProvider) return null;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            pdfProvider.icon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: pdfProvider.icon,
                                alt: pdfProvider.name,
                                className: "w-8 h-8 rounded",
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "h-8 w-8 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: pdfProvider.name
                            })
                        ]
                    });
                }
            case 'web-search':
                {
                    const wsProvider = _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_21__/* .WEB_SEARCH_PROVIDERS */ .Vf[selectedWebSearchProviderId];
                    if (!wsProvider) return null;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            wsProvider.icon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: wsProvider.icon,
                                alt: wsProvider.name,
                                className: "w-8 h-8 rounded",
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "h-8 w-8 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: (0,_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_21__/* .getWebSearchProviderDisplayName */ .$C)(wsProvider.id, t)
                            })
                        ]
                    });
                }
            case 'image':
                {
                    const imgProvider = _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_14__/* .IMAGE_PROVIDERS */ .D[selectedImageProviderId];
                    const imgIcon = IMAGE_PROVIDER_ICONS[selectedImageProviderId];
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            imgIcon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: imgIcon,
                                alt: imgProvider?.name,
                                className: "w-8 h-8 rounded",
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "h-8 w-8 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: t(`settings.${IMAGE_PROVIDER_NAMES[selectedImageProviderId]}`) || imgProvider?.name
                            })
                        ]
                    });
                }
            case 'video':
                {
                    const vidProvider = _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_16__/* .VIDEO_PROVIDERS */ .l[selectedVideoProviderId];
                    const vidIcon = VIDEO_PROVIDER_ICONS[selectedVideoProviderId];
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            vidIcon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: vidIcon,
                                alt: vidProvider?.name,
                                className: "w-8 h-8 rounded",
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "h-8 w-8 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: t(`settings.${VIDEO_PROVIDER_NAMES[selectedVideoProviderId]}`) || vidProvider?.name
                            })
                        ]
                    });
                }
            case 'tts':
                {
                    const ttsIcon = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_18__/* .TTS_PROVIDERS */ .JF[ttsProviderId]?.icon;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            ttsIcon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: ttsIcon,
                                alt: "",
                                className: "w-8 h-8 rounded",
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                className: "h-6 w-6 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: getTTSProviderName(ttsProviderId, t)
                            })
                        ]
                    });
                }
            case 'asr':
                {
                    const asrIcon = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_18__/* .ASR_PROVIDERS */ .Co[asrProviderId]?.icon;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            asrIcon ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                src: asrIcon,
                                alt: "",
                                className: "w-8 h-8 rounded",
                                onError: (e)=>{
                                    e.target.style.display = 'none';
                                }
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                className: "h-6 w-6 text-muted-foreground"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: getASRProviderName(asrProviderId, t)
                            })
                        ]
                    });
                }
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: onOpenChange,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
                className: "h-[85vh] p-0 gap-0 block",
                showCloseButton: false,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                        className: "sr-only",
                        children: t('settings.title')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogDescription */ .rr, {
                        className: "sr-only",
                        children: t('settings.description')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex h-full overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex-shrink-0 bg-muted/30 p-3 space-y-1",
                                style: {
                                    width: sidebarWidth
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('providers'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'providers' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.providers')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('image'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'image' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.imageSettings')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('video'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'video' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.videoSettings')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('tts'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'tts' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.ttsSettings')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('asr'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'asr' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.asrSettings')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('pdf'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'pdf' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.pdfSettings')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('web-search'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'web-search' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.webSearchSettings')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveSection('general'),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_26__.cn)('w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0', activeSection === 'general' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                className: "h-4 w-4 shrink-0"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "truncate",
                                                children: t('settings.systemSettings')
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                onMouseDown: (e)=>handleResizeStart(e, 'sidebar'),
                                className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                })
                            }),
                            activeSection === 'providers' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_provider_list__WEBPACK_IMPORTED_MODULE_9__/* .ProviderList */ .c, {
                                        providers: allProviders,
                                        selectedProviderId: selectedProviderId,
                                        onSelect: handleProviderSelect,
                                        onAddProvider: ()=>setShowAddProviderDialog(true),
                                        width: providerListWidth
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        onMouseDown: (e)=>handleResizeStart(e, 'providerList'),
                                        className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                        })
                                    })
                                ]
                            }),
                            activeSection === 'pdf' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProviderListColumn, {
                                        providers: Object.values(_lib_pdf_constants__WEBPACK_IMPORTED_MODULE_12__/* .PDF_PROVIDERS */ .sP),
                                        configs: pdfProvidersConfig,
                                        selectedId: selectedPdfProviderId,
                                        onSelect: setSelectedPdfProviderId,
                                        width: providerListWidth,
                                        t: t
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        onMouseDown: (e)=>handleResizeStart(e, 'providerList'),
                                        className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                        })
                                    })
                                ]
                            }),
                            activeSection === 'web-search' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProviderListColumn, {
                                        providers: Object.values(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_21__/* .WEB_SEARCH_PROVIDERS */ .Vf).map((provider)=>({
                                                ...provider,
                                                name: (0,_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_21__/* .getWebSearchProviderDisplayName */ .$C)(provider.id, t)
                                            })),
                                        configs: webSearchProvidersConfig,
                                        selectedId: selectedWebSearchProviderId,
                                        onSelect: setSelectedWebSearchProviderId,
                                        width: providerListWidth,
                                        t: t
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        onMouseDown: (e)=>handleResizeStart(e, 'providerList'),
                                        className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                        })
                                    })
                                ]
                            }),
                            activeSection === 'image' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProviderListColumn, {
                                        providers: Object.values(_lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_14__/* .IMAGE_PROVIDERS */ .D).map((p)=>({
                                                id: p.id,
                                                name: t(`settings.${IMAGE_PROVIDER_NAMES[p.id]}`) || p.name,
                                                icon: IMAGE_PROVIDER_ICONS[p.id]
                                            })),
                                        configs: imageProvidersConfig,
                                        selectedId: selectedImageProviderId,
                                        onSelect: setSelectedImageProviderId,
                                        width: providerListWidth,
                                        t: t
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        onMouseDown: (e)=>handleResizeStart(e, 'providerList'),
                                        className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                        })
                                    })
                                ]
                            }),
                            activeSection === 'video' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProviderListColumn, {
                                        providers: Object.values(_lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_16__/* .VIDEO_PROVIDERS */ .l).map((p)=>({
                                                id: p.id,
                                                name: t(`settings.${VIDEO_PROVIDER_NAMES[p.id]}`) || p.name,
                                                icon: VIDEO_PROVIDER_ICONS[p.id]
                                            })),
                                        configs: videoProvidersConfig,
                                        selectedId: selectedVideoProviderId,
                                        onSelect: setSelectedVideoProviderId,
                                        width: providerListWidth,
                                        t: t
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        onMouseDown: (e)=>handleResizeStart(e, 'providerList'),
                                        className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                        })
                                    })
                                ]
                            }),
                            activeSection === 'tts' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProviderListColumn, {
                                        providers: [
                                            ...Object.values(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_18__/* .TTS_PROVIDERS */ .JF).map((p)=>({
                                                    id: p.id,
                                                    name: getTTSProviderName(p.id, t),
                                                    icon: p.icon
                                                })),
                                            ...Object.entries(ttsProvidersConfig).filter(([id])=>(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_29__/* .isCustomTTSProvider */ .S)(id)).map(([id, cfg])=>({
                                                    id: id,
                                                    name: cfg.customName || id,
                                                    icon: undefined
                                                }))
                                        ],
                                        configs: ttsProvidersConfig,
                                        selectedId: ttsProviderId,
                                        onSelect: setTTSProvider,
                                        width: providerListWidth,
                                        t: t,
                                        onAdd: ()=>setShowAddTTSProviderDialog(true)
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        onMouseDown: (e)=>handleResizeStart(e, 'providerList'),
                                        className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                        })
                                    })
                                ]
                            }),
                            activeSection === 'asr' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProviderListColumn, {
                                        providers: [
                                            ...Object.values(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_18__/* .ASR_PROVIDERS */ .Co).map((p)=>({
                                                    id: p.id,
                                                    name: getASRProviderName(p.id, t),
                                                    icon: p.icon
                                                })),
                                            ...Object.entries(asrProvidersConfig).filter(([id])=>(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_29__/* .isCustomASRProvider */ .v)(id)).map(([id, cfg])=>({
                                                    id: id,
                                                    name: cfg.customName || id,
                                                    icon: undefined
                                                }))
                                        ],
                                        configs: asrProvidersConfig,
                                        selectedId: asrProviderId,
                                        onSelect: setASRProvider,
                                        width: providerListWidth,
                                        t: t,
                                        onAdd: ()=>setShowAddASRProviderDialog(true)
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        onMouseDown: (e)=>handleResizeStart(e, 'providerList'),
                                        className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex-1 flex flex-col overflow-hidden min-w-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between p-5 border-b",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex items-center gap-3",
                                                children: getHeaderContent()
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    activeSection === 'providers' && !providersConfig[selectedProviderId]?.isBuiltIn && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        className: "h-7 px-2 text-destructive hover:text-destructive",
                                                        onClick: ()=>handleDeleteProvider(selectedProviderId),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "icon",
                                                        onClick: ()=>onOpenChange(false),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 overflow-y-auto p-5",
                                        children: [
                                            activeSection === 'general' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_general_settings__WEBPACK_IMPORTED_MODULE_22__/* .GeneralSettings */ .I, {}),
                                            activeSection === 'providers' && selectedProvider && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_provider_config_panel__WEBPACK_IMPORTED_MODULE_10__/* .ProviderConfigPanel */ .U, {
                                                provider: selectedProvider,
                                                initialApiKey: providersConfig[selectedProviderId]?.apiKey || '',
                                                initialBaseUrl: providersConfig[selectedProviderId]?.baseUrl || '',
                                                initialRequiresApiKey: providersConfig[selectedProviderId]?.requiresApiKey ?? true,
                                                providersConfig: providersConfig,
                                                onConfigChange: (apiKey, baseUrl, requiresApiKey)=>handleProviderConfigChange(selectedProviderId, apiKey, baseUrl, requiresApiKey),
                                                onSave: handleProviderConfigSave,
                                                onEditModel: (index)=>handleEditModel(selectedProviderId, index),
                                                onDeleteModel: (index)=>handleDeleteModel(selectedProviderId, index),
                                                onAddModel: handleAddModel,
                                                onResetToDefault: ()=>handleResetProvider(selectedProviderId),
                                                isBuiltIn: providersConfig[selectedProviderId]?.isBuiltIn ?? true
                                            }),
                                            activeSection === 'pdf' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pdf_settings__WEBPACK_IMPORTED_MODULE_11__/* .PDFSettings */ .c, {
                                                selectedProviderId: selectedPdfProviderId
                                            }),
                                            activeSection === 'web-search' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_web_search_settings__WEBPACK_IMPORTED_MODULE_20__/* .WebSearchSettings */ .e, {
                                                selectedProviderId: selectedWebSearchProviderId
                                            }),
                                            activeSection === 'image' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_image_settings__WEBPACK_IMPORTED_MODULE_13__/* .ImageSettings */ .J, {
                                                selectedProviderId: selectedImageProviderId
                                            }),
                                            activeSection === 'video' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_video_settings__WEBPACK_IMPORTED_MODULE_15__/* .VideoSettings */ .x, {
                                                selectedProviderId: selectedVideoProviderId
                                            }),
                                            activeSection === 'tts' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tts_settings__WEBPACK_IMPORTED_MODULE_17__/* .TTSSettings */ .R, {
                                                selectedProviderId: ttsProviderId
                                            }),
                                            activeSection === 'asr' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_asr_settings__WEBPACK_IMPORTED_MODULE_19__/* .ASRSettings */ .Y, {
                                                selectedProviderId: asrProviderId
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-end gap-3 px-5 py-3 border-t bg-muted/30",
                                        children: [
                                            saveStatus === 'saved' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-1.5 text-sm text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                                        className: "h-4 w-4"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        children: t('settings.saveSuccess')
                                                    })
                                                ]
                                            }),
                                            saveStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-1.5 text-sm text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_CheckCircle2_FileText_Film_Image_Mic_Plus_Search_Settings_Trash2_Volume2_X_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                                        className: "h-4 w-4"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        children: t('settings.saveFailed')
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                variant: "outline",
                                                size: "sm",
                                                onClick: ()=>onOpenChange(false),
                                                children: t('settings.close')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                size: "sm",
                                                onClick: handleSave,
                                                children: t('settings.save')
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_model_edit_dialog__WEBPACK_IMPORTED_MODULE_23__/* .ModelEditDialog */ .G, {
                open: showModelDialog,
                onOpenChange: setShowModelDialog,
                editingModel: editingModel,
                setEditingModel: setEditingModel,
                onSave: handleSaveModel,
                onAutoSave: handleAutoSaveModel,
                providerId: selectedProviderId,
                apiKey: providersConfig[selectedProviderId]?.apiKey || '',
                baseUrl: providersConfig[selectedProviderId]?.baseUrl,
                providerType: providersConfig[selectedProviderId]?.type,
                requiresApiKey: providersConfig[selectedProviderId]?.requiresApiKey,
                isServerConfigured: providersConfig[selectedProviderId]?.isServerConfigured
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_add_provider_dialog__WEBPACK_IMPORTED_MODULE_24__/* .AddProviderDialog */ .x, {
                open: showAddProviderDialog,
                onOpenChange: setShowAddProviderDialog,
                onAdd: handleAddProvider
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_add_audio_provider_dialog__WEBPACK_IMPORTED_MODULE_25__/* .AddAudioProviderDialog */ .D, {
                open: showAddTTSProviderDialog,
                onOpenChange: setShowAddTTSProviderDialog,
                onAdd: handleAddTTSProvider,
                type: "tts"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_add_audio_provider_dialog__WEBPACK_IMPORTED_MODULE_25__/* .AddAudioProviderDialog */ .D, {
                open: showAddASRProviderDialog,
                onOpenChange: setShowAddASRProviderDialog,
                onAdd: handleAddASRProvider,
                type: "asr"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialog */ .Lt, {
                open: providerToDelete !== null,
                onOpenChange: (open)=>!open && setProviderToDelete(null),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogContent */ .EO, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogTitle */ .r7, {
                                    children: t('settings.deleteProvider')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogDescription */ .$v, {
                                    children: t('settings.deleteProviderConfirm')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogCancel */ .Zr, {
                                    children: t('settings.cancelEdit')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogAction */ .Rx, {
                                    onClick: confirmDeleteProvider,
                                    children: t('settings.deleteProvider')
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

/***/ 57813:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Badge)
/* harmony export */ });
/* unused harmony export badgeVariants */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18460);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42442);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40980);





const badgeVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .F)('h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden group/badge', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
            secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
            destructive: 'bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20',
            outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
            ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
            link: 'text-primary underline-offset-4 hover:underline'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant = 'default', asChild = false, ...props }) {
    const Comp = asChild ? radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .bL : 'span';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp, {
        "data-slot": "badge",
        "data-variant": variant,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(badgeVariants({
            variant
        }), className),
        ...props
    });
}



/***/ }),

/***/ 60073:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 11096));


/***/ }),

/***/ 60529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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



/***/ }),

/***/ 61391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ PDFSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57813);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27388);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(75748);
/* harmony import */ var _lib_pdf_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17329);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(94890);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ PDFSettings auto */ 










/**
 * Get display label for feature
 */ function getFeatureLabel(feature, t) {
    const labels = {
        text: t('settings.featureText'),
        images: t('settings.featureImages'),
        tables: t('settings.featureTables'),
        formulas: t('settings.featureFormulas'),
        'layout-analysis': t('settings.featureLayoutAnalysis'),
        metadata: t('settings.featureMetadata')
    };
    return labels[feature] || feature;
}
function PDFSettings({ selectedProviderId }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const [showApiKey, setShowApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [testStatus, setTestStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [testMessage, setTestMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const pdfProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.pdfProvidersConfig);
    const setPDFProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.setPDFProviderConfig);
    const pdfProvider = _lib_pdf_constants__WEBPACK_IMPORTED_MODULE_8__/* .PDF_PROVIDERS */ .sP[selectedProviderId];
    const isServerConfigured = !!pdfProvidersConfig[selectedProviderId]?.isServerConfigured;
    const providerConfig = pdfProvidersConfig[selectedProviderId];
    const hasApiKey = !!providerConfig?.apiKey;
    const hasBaseUrl = !!providerConfig?.baseUrl;
    const isCloud = selectedProviderId === 'mineru-cloud';
    const isSelfHosted = selectedProviderId === 'mineru';
    const needsRemoteConfig = isSelfHosted || isCloud;
    // For cloud: test requires API key (user-entered or server-configured); for self-hosted: test requires base URL
    const canTest = isCloud ? hasApiKey || isServerConfigured : hasBaseUrl || isServerConfigured;
    // Reset state when provider changes
    const [prevSelectedProviderId, setPrevSelectedProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(selectedProviderId);
    if (selectedProviderId !== prevSelectedProviderId) {
        setPrevSelectedProviderId(selectedProviderId);
        setShowApiKey(false);
        setTestStatus('idle');
        setTestMessage('');
    }
    const handleTestConnection = async ()=>{
        setTestStatus('testing');
        setTestMessage('');
        try {
            const response = await fetch('/api/verify-pdf-provider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    providerId: selectedProviderId,
                    apiKey: providerConfig?.apiKey || '',
                    baseUrl: providerConfig?.baseUrl || ''
                })
            });
            const data = await response.json();
            if (data.success) {
                setTestStatus('success');
                setTestMessage(t('settings.connectionSuccess'));
            } else {
                setTestStatus('error');
                setTestMessage(`${t('settings.connectionFailed')}: ${data.error}`);
            }
        } catch (err) {
            setTestStatus('error');
            const message = err instanceof Error ? err.message : String(err);
            setTestMessage(`${t('settings.connectionFailed')}: ${message}`);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6 max-w-3xl",
        children: [
            isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300",
                children: t('settings.serverConfiguredNotice')
            }),
            !isServerConfigured && needsRemoteConfig && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            isCloud && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: t('settings.pdfApiKey')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                        name: `pdf-api-key-${selectedProviderId}`,
                                                        type: showApiKey ? 'text' : 'password',
                                                        autoComplete: "new-password",
                                                        autoCapitalize: "none",
                                                        autoCorrect: "off",
                                                        spellCheck: false,
                                                        placeholder: t('settings.mineruCloudApiKeyPlaceholder'),
                                                        value: providerConfig?.apiKey || '',
                                                        onChange: (e)=>setPDFProviderConfig(selectedProviderId, {
                                                                apiKey: e.target.value
                                                            }),
                                                        className: "font-mono text-sm pr-10"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        onClick: ()=>setShowApiKey(!showApiKey),
                                                        className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                        children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                                variant: "outline",
                                                size: "sm",
                                                onClick: handleTestConnection,
                                                disabled: testStatus === 'testing' || !canTest,
                                                className: "gap-1.5 shrink-0",
                                                children: testStatus === 'testing' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5 animate-spin"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        }),
                                                        t('settings.testConnection')
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (isSelfHosted || isCloud) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: [
                                            t('settings.pdfBaseUrl'),
                                            isCloud && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-muted-foreground ml-1 font-normal",
                                                children: [
                                                    "(",
                                                    t('settings.optional'),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                name: `pdf-base-url-${selectedProviderId}`,
                                                autoComplete: "off",
                                                autoCapitalize: "none",
                                                autoCorrect: "off",
                                                spellCheck: false,
                                                placeholder: isCloud ? 'https://mineru.net/api/v4' : 'http://localhost:8080',
                                                value: providerConfig?.baseUrl || '',
                                                onChange: (e)=>setPDFProviderConfig(selectedProviderId, {
                                                        baseUrl: e.target.value
                                                    }),
                                                className: "text-sm"
                                            }),
                                            isSelfHosted && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .$, {
                                                variant: "outline",
                                                size: "sm",
                                                onClick: handleTestConnection,
                                                disabled: testStatus === 'testing' || !canTest,
                                                className: "gap-1.5 shrink-0",
                                                children: testStatus === 'testing' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5 animate-spin"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        }),
                                                        t('settings.testConnection')
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            isSelfHosted && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: [
                                            t('settings.pdfApiKey'),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-muted-foreground ml-1 font-normal",
                                                children: [
                                                    "(",
                                                    t('settings.optional'),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                name: `pdf-api-key-${selectedProviderId}`,
                                                type: showApiKey ? 'text' : 'password',
                                                autoComplete: "new-password",
                                                autoCapitalize: "none",
                                                autoCorrect: "off",
                                                spellCheck: false,
                                                placeholder: t('settings.enterApiKey'),
                                                value: providerConfig?.apiKey || '',
                                                onChange: (e)=>setPDFProviderConfig(selectedProviderId, {
                                                        apiKey: e.target.value
                                                    }),
                                                className: "font-mono text-sm pr-10"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setShowApiKey(!showApiKey),
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    testMessage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('rounded-lg p-3 text-sm', testStatus === 'success' && 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800', testStatus === 'error' && 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800'),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                testStatus === 'success' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "h-4 w-4 shrink-0"
                                }),
                                testStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                    className: "h-4 w-4 shrink-0"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "break-all",
                                    children: testMessage
                                })
                            ]
                        })
                    }),
                    (()=>{
                        if (isCloud) {
                            const base = providerConfig?.baseUrl || 'https://mineru.net/api/v4';
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs text-muted-foreground break-all",
                                children: [
                                    t('settings.requestUrl'),
                                    ": ",
                                    base,
                                    "/file-urls/batch"
                                ]
                            });
                        }
                        const effectiveBaseUrl = providerConfig?.baseUrl || '';
                        if (!effectiveBaseUrl) return null;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-xs text-muted-foreground break-all",
                            children: [
                                t('settings.requestUrl'),
                                ": ",
                                effectiveBaseUrl,
                                "/file_parse"
                            ]
                        });
                    })()
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                        className: "text-sm",
                        children: t('settings.pdfFeatures')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex flex-wrap gap-2",
                        children: pdfProvider.features.map((feature)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_badge__WEBPACK_IMPORTED_MODULE_4__/* .Badge */ .E, {
                                variant: "secondary",
                                className: "font-normal",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                        className: "h-3 w-3 mr-1"
                                    }),
                                    getFeatureLabel(feature, t)
                                ]
                            }, feature))
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 61860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ TTSSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_textarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44374);
/* harmony import */ var _components_openmaic_ui_switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21084);
/* harmony import */ var _components_openmaic_ui_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(36896);
/* harmony import */ var _components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15804);
/* harmony import */ var _components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(65891);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(75748);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(33157);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(22200);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(94910);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(61491);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(99414);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(68562);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(40852);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(15688);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(25879);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(40980);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(66609);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7603);
/* harmony import */ var _lib_audio_use_tts_preview__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28614);
/* harmony import */ var _lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(14755);
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(3945);
/* harmony import */ var _lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(29455);
/* harmony import */ var _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(28769);
/* __next_internal_client_entry_do_not_use__ TTSSettings auto */ 





















const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_14__/* .createLogger */ .h)('TTSSettings');
function TTSSettings({ selectedProviderId }) {
    const { t, locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_10__/* .useI18n */ .s)();
    const ttsVoice = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.ttsVoice);
    const ttsSpeed = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.ttsSpeed);
    const ttsProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.ttsProvidersConfig);
    const setTTSProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.setTTSProviderConfig);
    const activeProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.ttsProviderId);
    const setTTSVoice = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.setTTSVoice);
    const removeCustomTTSProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.removeCustomTTSProvider);
    const ttsProvider = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_12__/* .TTS_PROVIDERS */ .JF[selectedProviderId];
    const isCustom = (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_19__/* .isCustomTTSProvider */ .S)(selectedProviderId);
    const providerConfig = ttsProvidersConfig[selectedProviderId];
    const isServerConfigured = !!providerConfig?.isServerConfigured;
    // Per-provider enablement (#665): the toggle is meaningful only for an
    // AVAILABLE provider (configured / server-managed). An unconfigured provider
    // can't be "enabled" into the picker, so its toggle is disabled. Server
    // force-disable also locks it. `checked` reflects the true effective state.
    const providerServerDisabled = !!providerConfig?.serverDisabled;
    const providerConfigured = (0,_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_16__/* .isTTSProviderConfigured */ .V9)(selectedProviderId, providerConfig);
    const providerEnableLocked = providerServerDisabled || !providerConfigured;
    const providerEnabled = (0,_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_16__/* .isTTSProviderEnabled */ .mO)(selectedProviderId, providerConfig);
    const isVoxCPM = selectedProviderId === 'voxcpm-tts';
    const voxcpmBackend = (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .normalizeVoxCPMBackend */ .H_)(providerConfig?.providerOptions?.backend);
    const requiresApiKey = isCustom ? !!providerConfig?.requiresApiKey : !!ttsProvider?.requiresApiKey;
    const isKeylessLocalProvider = !isCustom && !requiresApiKey && !!ttsProvider?.defaultBaseUrl;
    // When testing a non-active provider, use that provider's default voice
    // instead of the active provider's voice (which may be incompatible).
    const effectiveVoice = selectedProviderId === activeProviderId ? ttsVoice : (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_19__/* .isCustomTTSProvider */ .S)(selectedProviderId) ? (providerConfig?.customVoices || [])[0]?.id || 'default' : _lib_audio_constants__WEBPACK_IMPORTED_MODULE_12__/* .DEFAULT_TTS_VOICES */ .S5[selectedProviderId] || 'default';
    const [showApiKey, setShowApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [testText, setTestText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(t('settings.ttsTestTextDefault'));
    const [testStatus, setTestStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [testMessage, setTestMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { previewing: testingTTS, startPreview, stopPreview } = (0,_lib_audio_use_tts_preview__WEBPACK_IMPORTED_MODULE_15__/* .useTTSPreview */ .l)();
    // Doubao TTS uses compound "appId:accessKey" — split for separate UI fields
    const isDoubao = selectedProviderId === 'doubao-tts';
    const rawApiKey = ttsProvidersConfig[selectedProviderId]?.apiKey || '';
    const doubaoColonIdx = rawApiKey.indexOf(':');
    const doubaoAppId = isDoubao && doubaoColonIdx > 0 ? rawApiKey.slice(0, doubaoColonIdx) : '';
    const doubaoAccessKey = isDoubao && doubaoColonIdx > 0 ? rawApiKey.slice(doubaoColonIdx + 1) : isDoubao ? rawApiKey : '';
    const setDoubaoCompoundKey = (appId, accessKey)=>{
        const combined = appId && accessKey ? `${appId}:${accessKey}` : appId || accessKey;
        setTTSProviderConfig(selectedProviderId, {
            apiKey: combined
        });
    };
    // Keep the sample text in sync with locale changes.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setTestText(t('settings.ttsTestTextDefault'));
    }, [
        t
    ]);
    // Reset transient UI state when switching providers.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        stopPreview();
        setShowApiKey(false);
        setTestStatus('idle');
        setTestMessage('');
    }, [
        selectedProviderId,
        stopPreview
    ]);
    const handleTestTTS = async ()=>{
        if (!testText.trim()) return;
        setTestStatus('testing');
        setTestMessage('');
        try {
            const providerOptions = selectedProviderId === 'voxcpm-tts' ? {
                ...ttsProvidersConfig[selectedProviderId]?.providerOptions || {},
                ...await (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_17__/* .getVoxCPMProviderOptions */ .pX)(effectiveVoice, {
                    role: 'teacher',
                    locale
                })
            } : undefined;
            await startPreview({
                text: testText,
                providerId: selectedProviderId,
                modelId: ttsProvidersConfig[selectedProviderId]?.modelId || ttsProvider?.defaultModelId || '',
                voice: effectiveVoice,
                speed: ttsSpeed,
                apiKey: ttsProvidersConfig[selectedProviderId]?.apiKey,
                // Managed providers resolve their base URL server-side; only send the
                // client's own base URL (custom providers).
                baseUrl: ttsProvidersConfig[selectedProviderId]?.baseUrl || providerConfig?.customDefaultBaseUrl || '',
                providerOptions
            });
            setTestStatus('success');
            setTestMessage(t('settings.ttsTestSuccess'));
        } catch (error) {
            log.error('TTS test failed:', error);
            setTestStatus('error');
            setTestMessage(error instanceof Error && error.message ? `${t('settings.ttsTestFailed')}: ${error.message}` : t('settings.ttsTestFailed'));
        }
    };
    const effectiveBaseUrl = ttsProvidersConfig[selectedProviderId]?.baseUrl || (isCustom ? providerConfig?.customDefaultBaseUrl : ttsProvider?.defaultBaseUrl) || '';
    const endpointPath = (()=>{
        if (isCustom) return '/audio/speech';
        switch(selectedProviderId){
            case 'openai-tts':
            case 'glm-tts':
            case 'lemonade-tts':
                return '/audio/speech';
            case 'azure-tts':
                return '/cognitiveservices/v1';
            case 'qwen-tts':
                return '/services/aigc/multimodal-generation/generation';
            case 'voxcpm-tts':
                return (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .getVoxCPMBackendEndpoint */ .Lu)(voxcpmBackend);
            case 'elevenlabs-tts':
                return '/text-to-speech';
            case 'doubao-tts':
                return '/unidirectional';
            default:
                return '';
        }
    })();
    const requestUrl = effectiveBaseUrl && endpointPath ? selectedProviderId === 'voxcpm-tts' ? (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .buildVoxCPMBackendUrl */ .f0)(effectiveBaseUrl, voxcpmBackend) : effectiveBaseUrl + endpointPath : '';
    const isVoxCPMVLLMOmni = voxcpmBackend === 'vllm-omni';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_20__.cn)('space-y-6', isVoxCPM ? 'max-w-5xl' : 'max-w-3xl'),
        children: [
            selectedProviderId === 'browser-native-tts' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300",
                children: t('settings.ttsBrowserNativeTimelineNotice')
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0 pr-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-sm font-medium",
                                children: t('settings.ttsProviderEnabledLabel')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[11px] text-muted-foreground",
                                children: providerServerDisabled ? t('settings.ttsProviderDisabledByAdmin') : !providerConfigured ? t('settings.ttsProviderUnavailableHint') : t('settings.ttsProviderEnabledHint')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_switch__WEBPACK_IMPORTED_MODULE_6__/* .Switch */ .d, {
                        checked: providerEnabled,
                        disabled: providerEnableLocked,
                        onCheckedChange: (checked)=>setTTSProviderConfig(selectedProviderId, {
                                enabled: checked
                            })
                    })
                ]
            }),
            isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300",
                children: t('settings.serverConfiguredNotice')
            }),
            !isServerConfigured && (requiresApiKey || isCustom || isVoxCPM || isKeylessLocalProvider) && (isVoxCPM ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-lg border border-border/60 bg-background px-3 py-2.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-2 md:flex-row md:items-end",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0 md:w-[150px] md:shrink-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "mb-1 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                className: "h-3 w-3"
                                            }),
                                            t('settings.voxcpmBackend')
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_8__/* .Select */ .l6, {
                                        value: voxcpmBackend,
                                        onValueChange: (backend)=>setTTSProviderConfig(selectedProviderId, {
                                                providerOptions: {
                                                    ...providerConfig?.providerOptions || {},
                                                    backend
                                                }
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_8__/* .SelectTrigger */ .bq, {
                                                size: "sm",
                                                className: "w-full rounded-md text-sm shadow-none",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_8__/* .SelectValue */ .yv, {})
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_8__/* .SelectContent */ .gC, {
                                                children: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .VOXCPM_BACKENDS */ .yw.map((backend)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_select__WEBPACK_IMPORTED_MODULE_8__/* .SelectItem */ .eb, {
                                                        value: backend.id,
                                                        children: backend.name
                                                    }, backend.id))
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0 md:flex-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "mb-1 block text-[11px] font-medium text-muted-foreground",
                                        children: t('settings.ttsBaseUrl')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                        name: `tts-base-url-${selectedProviderId}`,
                                        autoComplete: "off",
                                        autoCapitalize: "none",
                                        autoCorrect: "off",
                                        spellCheck: false,
                                        placeholder: ttsProvider?.defaultBaseUrl || t('settings.enterCustomBaseUrl'),
                                        value: ttsProvidersConfig[selectedProviderId]?.baseUrl || '',
                                        onChange: (e)=>setTTSProviderConfig(selectedProviderId, {
                                                baseUrl: e.target.value
                                            }),
                                        className: "h-8 min-w-0 rounded-md font-mono text-sm shadow-none"
                                    })
                                ]
                            }),
                            isVoxCPMVLLMOmni && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0 md:w-[130px] md:shrink-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "mb-1 block text-[11px] font-medium text-muted-foreground",
                                        children: t('media.model')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                        name: `tts-model-${selectedProviderId}`,
                                        autoComplete: "off",
                                        autoCapitalize: "none",
                                        autoCorrect: "off",
                                        spellCheck: false,
                                        placeholder: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .VOXCPM_VLLM_MODEL_ID */ .Cn,
                                        value: ttsProvidersConfig[selectedProviderId]?.modelId || '',
                                        onChange: (e)=>setTTSProviderConfig(selectedProviderId, {
                                                modelId: e.target.value
                                            }),
                                        className: "h-8 min-w-0 rounded-md font-mono text-sm shadow-none"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-2 flex min-w-0 items-center gap-2 rounded-md bg-muted/25 px-2.5 py-1.5 text-[11px] text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "inline-flex shrink-0 items-center gap-1.5 font-medium",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                        className: "h-3 w-3"
                                    }),
                                    t('settings.requestUrl')
                                ]
                            }),
                            requestUrl ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                className: "min-w-0 flex-1 truncate font-mono text-foreground/80",
                                title: requestUrl,
                                children: requestUrl
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "min-w-0 flex-1 truncate",
                                children: t('settings.voxcpmBaseUrlPending')
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_20__.cn)('grid gap-4', isDoubao ? 'grid-cols-3' : 'grid-cols-2'),
                        children: [
                            isDoubao ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                                className: "text-sm",
                                                children: t('settings.doubaoAppId')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                        name: `tts-app-id-${selectedProviderId}`,
                                                        type: showApiKey ? 'text' : 'password',
                                                        autoComplete: "new-password",
                                                        autoCapitalize: "none",
                                                        autoCorrect: "off",
                                                        spellCheck: false,
                                                        placeholder: t('settings.enterApiKey'),
                                                        value: doubaoAppId,
                                                        onChange: (e)=>setDoubaoCompoundKey(e.target.value, doubaoAccessKey),
                                                        className: "font-mono text-sm pr-10"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        onClick: ()=>setShowApiKey(!showApiKey),
                                                        className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                        children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                                className: "text-sm",
                                                children: t('settings.doubaoAccessKey')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                        name: `tts-access-key-${selectedProviderId}`,
                                                        type: showApiKey ? 'text' : 'password',
                                                        autoComplete: "new-password",
                                                        autoCapitalize: "none",
                                                        autoCorrect: "off",
                                                        spellCheck: false,
                                                        placeholder: t('settings.enterApiKey'),
                                                        value: doubaoAccessKey,
                                                        onChange: (e)=>setDoubaoCompoundKey(doubaoAppId, e.target.value),
                                                        className: "font-mono text-sm pr-10"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        onClick: ()=>setShowApiKey(!showApiKey),
                                                        className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                        children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                            className: "h-4 w-4"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: t('settings.ttsApiKey')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                name: `tts-api-key-${selectedProviderId}`,
                                                type: showApiKey ? 'text' : 'password',
                                                autoComplete: "new-password",
                                                autoCapitalize: "none",
                                                autoCorrect: "off",
                                                spellCheck: false,
                                                placeholder: t('settings.enterApiKey'),
                                                value: ttsProvidersConfig[selectedProviderId]?.apiKey || '',
                                                onChange: (e)=>setTTSProviderConfig(selectedProviderId, {
                                                        apiKey: e.target.value
                                                    }),
                                                className: "font-mono text-sm pr-10"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setShowApiKey(!showApiKey),
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: t('settings.ttsBaseUrl')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                        name: `tts-base-url-${selectedProviderId}`,
                                        autoComplete: "off",
                                        autoCapitalize: "none",
                                        autoCorrect: "off",
                                        spellCheck: false,
                                        placeholder: isCustom ? providerConfig?.customDefaultBaseUrl || 'http://localhost:8000/v1' : ttsProvider?.defaultBaseUrl || t('settings.enterCustomBaseUrl'),
                                        value: ttsProvidersConfig[selectedProviderId]?.baseUrl || '',
                                        onChange: (e)=>setTTSProviderConfig(selectedProviderId, {
                                                baseUrl: e.target.value
                                            }),
                                        className: "text-sm"
                                    })
                                ]
                            })
                        ]
                    }),
                    requestUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "break-all text-xs text-muted-foreground",
                        children: [
                            t('settings.requestUrl'),
                            ": ",
                            requestUrl
                        ]
                    })
                ]
            })),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                        className: "text-sm",
                        children: t('settings.testTTS')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                placeholder: t('settings.ttsTestTextPlaceholder'),
                                value: testText,
                                onChange: (e)=>setTestText(e.target.value),
                                className: "flex-1"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                onClick: handleTestTTS,
                                disabled: testingTTS || !testText.trim() || requiresApiKey && !ttsProvidersConfig[selectedProviderId]?.apiKey?.trim() && !isServerConfigured,
                                size: "default",
                                className: "gap-2 w-32",
                                children: [
                                    testingTTS ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                        className: "h-4 w-4 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                        className: "h-4 w-4"
                                    }),
                                    t('settings.testTTS')
                                ]
                            })
                        ]
                    })
                ]
            }),
            testMessage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_20__.cn)('rounded-lg p-3 text-sm overflow-hidden', testStatus === 'success' && 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800', testStatus === 'error' && 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800'),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-start gap-2 min-w-0",
                    children: [
                        testStatus === 'success' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                            className: "h-4 w-4 mt-0.5 shrink-0"
                        }),
                        testStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                            className: "h-4 w-4 mt-0.5 shrink-0"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "flex-1 min-w-0 break-all",
                            children: testMessage
                        })
                    ]
                })
            }),
            ttsProvider?.models?.length > 0 && !isVoxCPM && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                        className: "text-sm text-muted-foreground",
                        children: t('settings.availableModels')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex flex-wrap gap-2",
                        children: ttsProvider.models.map((model)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border/40 text-xs font-mono text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "size-1.5 rounded-full bg-emerald-500/70"
                                    }),
                                    model.name
                                ]
                            }, model.id))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[11px] text-muted-foreground/60",
                        children: t('settings.modelSelectedViaVoice')
                    })
                ]
            }),
            selectedProviderId === 'voxcpm-tts' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VoxCPMVoiceManager, {}),
            isCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                        className: "text-sm",
                        children: t('settings.customVoices')
                    }),
                    providerConfig?.customVoices?.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-lg border border-border/60 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "grid grid-cols-[1fr_1fr_36px] gap-0 bg-muted/40 px-3 py-1.5 border-b border-border/40",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wider",
                                        children: "ID"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[11px] font-medium text-muted-foreground uppercase tracking-wider",
                                        children: t('settings.voiceNamePlaceholder')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {})
                                ]
                            }),
                            (providerConfig?.customVoices).map((voice, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_20__.cn)('grid grid-cols-[1fr_1fr_36px] gap-0 items-center px-3 py-2 group hover:bg-muted/20 transition-colors', index > 0 && 'border-t border-border/30'),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-mono text-foreground/80 truncate pr-3",
                                            children: voice.id
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm text-foreground/60 truncate pr-3",
                                            children: voice.name
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ()=>{
                                                const voices = [
                                                    ...providerConfig?.customVoices
                                                ];
                                                voices.splice(index, 1);
                                                setTTSProviderConfig(selectedProviderId, {
                                                    customVoices: voices
                                                });
                                            },
                                            className: "h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "h-3.5 w-3.5"
                                            })
                                        })
                                    ]
                                }, voice.id))
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-muted-foreground/50 italic",
                        children: t('settings.noVoicesAdded')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AddVoiceRow, {
                        existingIds: (providerConfig?.customVoices || []).map((v)=>v.id),
                        onAdd: (voiceId, voiceName)=>{
                            const voices = [
                                ...providerConfig?.customVoices || [],
                                {
                                    id: voiceId,
                                    name: voiceName
                                }
                            ];
                            setTTSProviderConfig(selectedProviderId, {
                                customVoices: voices
                            });
                            // Auto-select the first voice if current voice is 'default'
                            if (ttsVoice === 'default' && selectedProviderId === activeProviderId) {
                                setTTSVoice(voiceId);
                            }
                        }
                    })
                ]
            }),
            isCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "pt-4 border-t",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                    variant: "destructive",
                    size: "sm",
                    onClick: ()=>setShowDeleteConfirm(true),
                    children: t('settings.deleteProvider')
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialog */ .Lt, {
                open: showDeleteConfirm,
                onOpenChange: (open)=>!open && setShowDeleteConfirm(false),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogContent */ .EO, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogTitle */ .r7, {
                                    children: t('settings.deleteProvider')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogDescription */ .$v, {
                                    children: t('settings.deleteProviderConfirm')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogCancel */ .Zr, {
                                    children: t('settings.cancelEdit')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .AlertDialogAction */ .Rx, {
                                    onClick: ()=>{
                                        removeCustomTTSProvider(selectedProviderId);
                                        setShowDeleteConfirm(false);
                                    },
                                    children: t('settings.deleteProvider')
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
function VoxCPMVoiceManager() {
    const { t, locale } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_10__/* .useI18n */ .s)();
    const { profiles, addPromptVoice, addCloneVoice, deleteVoice } = (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_17__/* .useVoxCPMVoiceProfiles */ .tD)();
    const ttsSpeed = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.ttsSpeed);
    const ttsProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_11__.useSettingsStore)((state)=>state.ttsProvidersConfig);
    const { previewing, startPreview, stopPreview } = (0,_lib_audio_use_tts_preview__WEBPACK_IMPORTED_MODULE_15__/* .useTTSPreview */ .l)();
    const voxcpmBackend = (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .normalizeVoxCPMBackend */ .H_)(ttsProvidersConfig[_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .VOXCPM_TTS_PROVIDER_ID */ .i3]?.providerOptions?.backend);
    const supportsReferenceAudio = (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .voxCPMBackendSupportsReferenceAudio */ .f3)(voxcpmBackend);
    const [createMode, setCreateMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('prompt');
    const [promptName, setPromptName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [voicePrompt, setVoicePrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [cloneName, setCloneName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [clonePromptText, setClonePromptText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [cloneVoicePrompt, setCloneVoicePrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [cloneFile, setCloneFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isRecordingReference, setIsRecordingReference] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [recordingSeconds, setRecordingSeconds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [previewingVoiceId, setPreviewingVoiceId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const mediaRecorderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const recordingChunksRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const recordingStreamRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const recordingTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const stopRecordingTimer = ()=>{
        if (recordingTimerRef.current) {
            clearInterval(recordingTimerRef.current);
            recordingTimerRef.current = null;
        }
    };
    const stopRecordingStream = ()=>{
        recordingStreamRef.current?.getTracks().forEach((track)=>track.stop());
        recordingStreamRef.current = null;
    };
    const startReferenceRecording = async ()=>{
        if (isRecordingReference) return;
        if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(t('settings.voxcpmRecordingUnsupported'));
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : undefined;
            const mediaRecorder = new MediaRecorder(stream, mimeType ? {
                mimeType
            } : undefined);
            recordingChunksRef.current = [];
            recordingStreamRef.current = stream;
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (event)=>{
                if (event.data.size > 0) recordingChunksRef.current.push(event.data);
            };
            mediaRecorder.onstop = ()=>{
                void (async ()=>{
                    const type = mediaRecorder.mimeType || 'audio/webm';
                    const blob = new Blob(recordingChunksRef.current, {
                        type
                    });
                    if (blob.size > 0) {
                        try {
                            const referenceAudio = await (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_17__/* .normalizeVoxCPMReferenceAudio */ .S8)(blob, `voxcpm-reference-${Date.now()}.webm`);
                            const file = new File([
                                referenceAudio.blob
                            ], referenceAudio.name, {
                                type: referenceAudio.mimeType
                            });
                            setCloneFile(file);
                            if (!cloneName.trim()) setCloneName(t('settings.voxcpmRecordedVoiceName'));
                        } catch (error) {
                            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(error instanceof Error ? error.message : t('settings.voxcpmRecordingFailed'));
                        }
                    }
                    recordingChunksRef.current = [];
                    setIsRecordingReference(false);
                    setRecordingSeconds(0);
                    stopRecordingTimer();
                    stopRecordingStream();
                })();
            };
            mediaRecorder.start();
            setIsRecordingReference(true);
            setRecordingSeconds(0);
            recordingTimerRef.current = setInterval(()=>{
                setRecordingSeconds((seconds)=>{
                    const nextSeconds = seconds + 1;
                    if (nextSeconds >= _lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_17__/* .VOXCPM_REFERENCE_AUDIO_MAX_SECONDS */ .qU) {
                        stopReferenceRecording();
                    }
                    return nextSeconds;
                });
            }, 1000);
        } catch (error) {
            setIsRecordingReference(false);
            stopRecordingTimer();
            stopRecordingStream();
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(error instanceof Error ? error.message : t('settings.voxcpmRecordingStartFailed'));
        }
    };
    const stopReferenceRecording = ()=>{
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            stopRecordingTimer();
            if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            stopRecordingStream();
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!previewing) setPreviewingVoiceId(null);
    }, [
        previewing
    ]);
    const handlePreviewVoice = async (voiceId)=>{
        if (previewingVoiceId === voiceId) {
            stopPreview();
            setPreviewingVoiceId(null);
            return;
        }
        const providerConfig = ttsProvidersConfig[_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .VOXCPM_TTS_PROVIDER_ID */ .i3];
        // Managed providers resolve their base URL server-side, so only the client's
        // own base URL is sent; a managed VoxCPM is reachable without a local URL.
        const baseUrl = providerConfig?.baseUrl || providerConfig?.customDefaultBaseUrl || '';
        if (!providerConfig?.isServerConfigured && !baseUrl.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(t('settings.voxcpmBaseUrlRequired'));
            return;
        }
        setPreviewingVoiceId(voiceId);
        try {
            const providerOptions = await (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_17__/* .getVoxCPMProviderOptions */ .pX)(voiceId, {
                role: 'teacher',
                locale
            });
            await startPreview({
                text: t('settings.ttsTestTextDefault'),
                providerId: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .VOXCPM_TTS_PROVIDER_ID */ .i3,
                modelId: providerConfig?.modelId || _lib_audio_constants__WEBPACK_IMPORTED_MODULE_12__/* .TTS_PROVIDERS */ .JF[_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .VOXCPM_TTS_PROVIDER_ID */ .i3]?.defaultModelId || '',
                voice: voiceId,
                speed: ttsSpeed,
                apiKey: providerConfig?.apiKey,
                baseUrl,
                providerOptions: {
                    ...providerConfig?.providerOptions || {},
                    ...providerOptions
                }
            });
        } catch (error) {
            setPreviewingVoiceId(null);
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(error instanceof Error ? error.message : t('settings.voxcpmPreviewFailed'));
        }
    };
    const handleAddPromptVoice = async ()=>{
        if (!promptName.trim() || !voicePrompt.trim()) return;
        setSaving('prompt');
        try {
            await addPromptVoice({
                name: promptName,
                voicePrompt
            });
            setPromptName('');
            setVoicePrompt('');
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.success(t('settings.voxcpmVoiceSaved'));
        } catch (error) {
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(error instanceof Error ? error.message : t('settings.voxcpmVoiceSaveFailed'));
        } finally{
            setSaving(null);
        }
    };
    const handleCloneFileChange = async (file)=>{
        if (!file) {
            setCloneFile(null);
            return;
        }
        try {
            await (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_17__/* .validateVoxCPMReferenceAudio */ .Tc)(file);
            setCloneFile(file);
        } catch (error) {
            setCloneFile(null);
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(error instanceof Error ? error.message : t('settings.voxcpmReferenceAudioInvalid'));
        }
    };
    const handleAddCloneVoice = async ()=>{
        if (!cloneName.trim() || !cloneFile) return;
        setSaving('clone');
        try {
            await addCloneVoice({
                name: cloneName,
                referenceAudio: cloneFile,
                referenceAudioName: cloneFile.name,
                referenceAudioMimeType: cloneFile.type,
                promptText: clonePromptText,
                voicePrompt: cloneVoicePrompt
            });
            setCloneName('');
            setClonePromptText('');
            setCloneVoicePrompt('');
            setCloneFile(null);
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.success(t('settings.voxcpmCloneSaved'));
        } catch (error) {
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error(error instanceof Error ? error.message : t('settings.voxcpmCloneSaveFailed'));
        } finally{
            setSaving(null);
        }
    };
    const promptCount = profiles.filter((profile)=>profile.kind !== 'clone').length;
    const cloneCount = profiles.filter((profile)=>profile.kind === 'clone').length;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                className: "text-base font-semibold",
                                children: t('settings.voxcpmVoicesTitle')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "mt-1 text-xs text-muted-foreground",
                                children: t('settings.voxcpmVoicesDescription')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "mt-1 text-xs text-muted-foreground/70",
                                children: t('settings.voxcpmAutoVoicePrivacyNote')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1.5 text-xs text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "rounded-md border border-border/60 px-2 py-1",
                                children: t('settings.voxcpmPromptCount', {
                                    count: promptCount + 1
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "rounded-md border border-border/60 px-2 py-1",
                                children: t('settings.voxcpmCloneCount', {
                                    count: cloneCount
                                })
                            }),
                            !supportsReferenceAudio && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-300",
                                children: t('settings.voxcpmCloneUnsupported')
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "overflow-hidden rounded-lg border border-border/70 bg-background",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "grid lg:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.15fr)]",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                            className: "border-b border-border/60 lg:border-b-0 lg:border-r",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex h-12 items-center justify-between border-b border-border/60 px-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-medium",
                                            children: t('settings.voxcpmVoicePool')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: t('settings.voxcpmVoiceCount', {
                                                count: profiles.length + 1
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "max-h-[420px] overflow-y-auto",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VoiceProfileRow, {
                                            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                className: "h-4 w-4"
                                            }),
                                            title: t('settings.voxcpmAutoVoice'),
                                            badge: t('toolbar.default'),
                                            badgeTone: "default",
                                            detail: t('settings.voxcpmAutoVoiceDescription'),
                                            kind: "auto"
                                        }),
                                        profiles.length > 0 ? profiles.map((profile)=>{
                                            const voiceId = (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_18__/* .getVoxCPMProfileVoiceId */ .wy)(profile.id);
                                            const canPreview = profile.kind !== 'clone' || supportsReferenceAudio;
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VoiceProfileRow, {
                                                icon: profile.kind === 'clone' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }),
                                                title: profile.name,
                                                badge: profile.kind === 'clone' && !supportsReferenceAudio ? t('settings.voxcpmUnavailable') : profile.kind === 'clone' ? t('settings.voxcpmClone') : 'Prompt',
                                                badgeTone: profile.kind === 'clone' && !supportsReferenceAudio ? 'warning' : 'neutral',
                                                detail: profile.kind === 'clone' && !supportsReferenceAudio ? t('settings.voxcpmCloneUnsupportedDetail') : profile.kind === 'clone' ? profile.referenceAudioName || 'reference audio' : profile.voicePrompt || '',
                                                kind: profile.kind === 'clone' ? 'clone' : 'prompt',
                                                muted: profile.kind === 'clone' && !supportsReferenceAudio,
                                                previewing: canPreview && previewingVoiceId === voiceId,
                                                onPreview: canPreview ? ()=>handlePreviewVoice(voiceId) : undefined,
                                                onDelete: async ()=>{
                                                    await deleteVoice(profile.id);
                                                }
                                            }, profile.id);
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "px-4 py-8 text-center text-sm text-muted-foreground/60",
                                            children: t('settings.voxcpmNoCustomVoices')
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                            className: "p-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tabs__WEBPACK_IMPORTED_MODULE_7__/* .Tabs */ .tU, {
                                value: createMode,
                                onValueChange: (value)=>setCreateMode(value),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tabs__WEBPACK_IMPORTED_MODULE_7__/* .TabsList */ .j7, {
                                                className: "h-9 rounded-md bg-muted p-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tabs__WEBPACK_IMPORTED_MODULE_7__/* .TabsTrigger */ .Xi, {
                                                        value: "prompt",
                                                        className: "gap-1.5 rounded-sm px-3 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                                className: "h-3.5 w-3.5"
                                                            }),
                                                            "Prompt"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tabs__WEBPACK_IMPORTED_MODULE_7__/* .TabsTrigger */ .Xi, {
                                                        value: "clone",
                                                        className: "gap-1.5 rounded-sm px-3 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                                className: "h-3.5 w-3.5"
                                                            }),
                                                            t('settings.voxcpmClone')
                                                        ]
                                                    })
                                                ]
                                            }),
                                            createMode === 'clone' && !supportsReferenceAudio && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-300",
                                                children: t('settings.voxcpmCloneSaveOnly')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tabs__WEBPACK_IMPORTED_MODULE_7__/* .TabsContent */ .av, {
                                        value: "prompt",
                                        className: "mt-4 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                value: promptName,
                                                onChange: (e)=>setPromptName(e.target.value),
                                                placeholder: t('settings.voxcpmVoiceNamePlaceholder'),
                                                className: "h-10 rounded-md text-sm"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_textarea__WEBPACK_IMPORTED_MODULE_5__/* .Textarea */ .T, {
                                                value: voicePrompt,
                                                onChange: (e)=>setVoicePrompt(e.target.value),
                                                placeholder: t('settings.voxcpmPromptPlaceholder'),
                                                className: "min-h-28 resize-none rounded-md text-sm"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex justify-end",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                    size: "sm",
                                                    onClick: handleAddPromptVoice,
                                                    disabled: saving === 'prompt' || !promptName.trim() || !voicePrompt.trim(),
                                                    className: "h-9 gap-1.5 rounded-md",
                                                    children: [
                                                        saving === 'prompt' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        }),
                                                        t('settings.voxcpmAddVoice')
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tabs__WEBPACK_IMPORTED_MODULE_7__/* .TabsContent */ .av, {
                                        value: "clone",
                                        className: "mt-4 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                        value: cloneName,
                                                        onChange: (e)=>setCloneName(e.target.value),
                                                        placeholder: t('settings.voxcpmCloneVoiceNamePlaceholder'),
                                                        className: "h-10 rounded-md text-sm"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                        className: "inline-flex h-10 min-w-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm hover:bg-accent hover:text-accent-foreground",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                                className: "h-3.5 w-3.5 shrink-0"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "max-w-[180px] truncate",
                                                                children: cloneFile ? cloneFile.name : t('settings.voxcpmUploadReferenceAudio')
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                                type: "file",
                                                                accept: "audio/*",
                                                                className: "hidden",
                                                                onChange: (e)=>{
                                                                    void handleCloneFileChange(e.target.files?.[0] || null);
                                                                    e.target.value = '';
                                                                }
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                        type: "button",
                                                        variant: isRecordingReference ? 'destructive' : 'outline',
                                                        size: "sm",
                                                        onClick: isRecordingReference ? stopReferenceRecording : startReferenceRecording,
                                                        className: "h-10 gap-2 rounded-md",
                                                        children: isRecordingReference ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                                    className: "h-3.5 w-3.5"
                                                                }),
                                                                formatRecordingTime(recordingSeconds)
                                                            ]
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                                    className: "h-3.5 w-3.5"
                                                                }),
                                                                t('settings.voxcpmRecord')
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs text-muted-foreground/70",
                                                children: t('settings.voxcpmReferenceAudioLimitHint')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_textarea__WEBPACK_IMPORTED_MODULE_5__/* .Textarea */ .T, {
                                                value: clonePromptText,
                                                onChange: (e)=>setClonePromptText(e.target.value),
                                                placeholder: t('settings.voxcpmReferenceTextPlaceholder'),
                                                className: "min-h-20 resize-none rounded-md text-sm"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                value: cloneVoicePrompt,
                                                onChange: (e)=>setCloneVoicePrompt(e.target.value),
                                                placeholder: t('settings.voxcpmVoiceDescriptionPlaceholder'),
                                                className: "h-10 rounded-md text-sm"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex justify-end",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                    size: "sm",
                                                    onClick: handleAddCloneVoice,
                                                    disabled: saving === 'clone' || !cloneName.trim() || !cloneFile,
                                                    className: "h-9 gap-1.5 rounded-md",
                                                    children: [
                                                        saving === 'clone' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                            className: "h-3.5 w-3.5"
                                                        }),
                                                        t('settings.voxcpmAddClone')
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
}
function formatRecordingTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
function VoiceProfileRow({ icon, title, badge, badgeTone = 'neutral', detail, kind = 'prompt', muted, previewing, onPreview, onDelete }) {
    const iconClassName = kind === 'auto' ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300' : kind === 'clone' ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' : 'bg-muted text-muted-foreground';
    const badgeClassName = badgeTone === 'default' ? 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/70 dark:bg-violet-950/40 dark:text-violet-300' : badgeTone === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/70 dark:bg-amber-950/40 dark:text-amber-300' : 'border-border/70 bg-background text-muted-foreground';
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_10__/* .useI18n */ .s)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_20__.cn)('group relative flex min-h-16 items-center gap-3 border-t border-border/50 px-4 py-3 first:border-t-0', muted ? 'opacity-60' : 'hover:bg-muted/35'),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_20__.cn)('flex h-9 w-9 shrink-0 items-center justify-center rounded-md', iconClassName),
                children: icon
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "truncate text-sm font-medium",
                                children: title
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_20__.cn)('rounded-md border px-1.5 py-0.5 text-[10px] leading-none', badgeClassName),
                                children: badge
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "mt-1 truncate text-xs text-muted-foreground",
                        children: detail
                    })
                ]
            }),
            onPreview && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                variant: "ghost",
                size: "icon",
                onClick: ()=>onPreview(),
                "aria-label": previewing ? t('settings.voxcpmStopPreview') : t('settings.voxcpmPreviewVoice'),
                className: "h-8 w-8 text-muted-foreground opacity-70 hover:text-foreground group-hover:opacity-100",
                children: previewing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                    className: "h-3.5 w-3.5 animate-spin"
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                    className: "h-3.5 w-3.5"
                })
            }),
            onDelete && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                variant: "ghost",
                size: "icon",
                onClick: ()=>void onDelete(),
                "aria-label": t('settings.voxcpmDeleteVoice'),
                className: "h-8 w-8 text-muted-foreground opacity-70 hover:text-destructive group-hover:opacity-100",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                    className: "h-3.5 w-3.5"
                })
            })
        ]
    });
}
function AddVoiceRow({ onAdd, existingIds }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_10__/* .useI18n */ .s)();
    const [voiceId, setVoiceId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [voiceName, setVoiceName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const handleAdd = ()=>{
        if (!voiceId.trim()) return;
        if (existingIds.includes(voiceId.trim())) {
            sonner__WEBPACK_IMPORTED_MODULE_13__.toast.error('Duplicate ID');
            return;
        }
        onAdd(voiceId.trim(), voiceName.trim() || voiceId.trim());
        setVoiceId('');
        setVoiceName('');
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-[1fr_1fr_auto] gap-2 items-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                value: voiceId,
                onChange: (e)=>setVoiceId(e.target.value),
                onKeyDown: (e)=>e.key === 'Enter' && handleAdd(),
                className: "text-sm font-mono",
                placeholder: t('settings.voiceIdPlaceholder')
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                value: voiceName,
                onChange: (e)=>setVoiceName(e.target.value),
                onKeyDown: (e)=>e.key === 'Enter' && handleAdd(),
                className: "text-sm",
                placeholder: t('settings.voiceNamePlaceholder')
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                variant: "outline",
                size: "sm",
                onClick: handleAdd,
                disabled: !voiceId.trim(),
                className: "shrink-0 gap-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_FileAudio_Loader2_Mic_Plus_Route_Server_Square_Trash2_Upload_Volume2_Wand2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                        className: "h-3.5 w-3.5"
                    }),
                    t('settings.addVoice')
                ]
            })
        ]
    });
}


/***/ }),

/***/ 65891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $v: () => (/* binding */ AlertDialogDescription),
/* harmony export */   EO: () => (/* binding */ AlertDialogContent),
/* harmony export */   Lt: () => (/* binding */ AlertDialog),
/* harmony export */   Rx: () => (/* binding */ AlertDialogAction),
/* harmony export */   Zr: () => (/* binding */ AlertDialogCancel),
/* harmony export */   ck: () => (/* binding */ AlertDialogFooter),
/* harmony export */   r7: () => (/* binding */ AlertDialogTitle),
/* harmony export */   wd: () => (/* binding */ AlertDialogHeader)
/* harmony export */ });
/* unused harmony exports AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86835);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40980);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27388);
/* __next_internal_client_entry_do_not_use__ AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogMedia,AlertDialogOverlay,AlertDialogPortal,AlertDialogTitle,AlertDialogTrigger auto */ 




function AlertDialog({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .bL, {
        "data-slot": "alert-dialog",
        ...props
    });
}
function AlertDialogTrigger({ ...props }) {
    return /*#__PURE__*/ _jsx(AlertDialogPrimitive.Trigger, {
        "data-slot": "alert-dialog-trigger",
        ...props
    });
}
function AlertDialogPortal({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Portal */ .ZL, {
        "data-slot": "alert-dialog-portal",
        ...props
    });
}
function AlertDialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Overlay */ .hJ, {
        "data-slot": "alert-dialog-overlay",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50', className),
        ...props
    });
}
function AlertDialogContent({ className, size = 'default', container, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(AlertDialogPortal, {
        container: container,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AlertDialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Content */ .UC, {
                "data-slot": "alert-dialog-content",
                "data-size": size,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 gap-6 rounded-xl p-6 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none', className),
                ...props
            })
        ]
    });
}
function AlertDialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "alert-dialog-header",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]', className),
        ...props
    });
}
function AlertDialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "alert-dialog-footer",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end', className),
        ...props
    });
}
function AlertDialogMedia({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "alert-dialog-media",
        className: cn("bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8", className),
        ...props
    });
}
function AlertDialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Title */ .hE, {
        "data-slot": "alert-dialog-title",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2', className),
        ...props
    });
}
function AlertDialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Description */ .VY, {
        "data-slot": "alert-dialog-description",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)('text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3', className),
        ...props
    });
}
function AlertDialogAction({ className, variant = 'default', size = 'default', ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        variant: variant,
        size: size,
        asChild: true,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Action */ .rc, {
            "data-slot": "alert-dialog-action",
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(className),
            ...props
        })
    });
}
function AlertDialogCancel({ className, variant = 'outline', size = 'default', ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        variant: variant,
        size: size,
        asChild: true,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Cancel */ .ZD, {
            "data-slot": "alert-dialog-cancel",
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(className),
            ...props
        })
    });
}



/***/ }),

/***/ 67620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ useDraftCache)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/hooks/use-draft-cache.ts
 *
 * Verbatim port — pure localStorage-backed debounce cache. No external deps.
 */ /* __next_internal_client_entry_do_not_use__ useDraftCache auto */ 
function useDraftCache({ key, debounceMs = 500 }) {
    const [cachedValue, setCachedValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const pendingValueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(undefined);
    const keyRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(key);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        keyRef.current = key;
        try {
            const raw = localStorage.getItem(key);
            if (raw !== null) {
                setCachedValue(JSON.parse(raw));
            } else {
                setCachedValue(undefined);
            }
        } catch  {
        /* ignore parse errors */ }
    }, [
        key
    ]);
    const flushPending = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (pendingValueRef.current !== undefined) {
            try {
                localStorage.setItem(keyRef.current, JSON.stringify(pendingValueRef.current));
            } catch  {
            /* ignore quota errors */ }
            pendingValueRef.current = undefined;
        }
    }, []);
    const updateCache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((value)=>{
        pendingValueRef.current = value;
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(()=>{
            timerRef.current = null;
            try {
                localStorage.setItem(keyRef.current, JSON.stringify(value));
            } catch  {
            /* ignore quota errors */ }
            pendingValueRef.current = undefined;
        }, debounceMs);
    }, [
        debounceMs
    ]);
    const clearCache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        pendingValueRef.current = undefined;
        try {
            localStorage.removeItem(keyRef.current);
        } catch  {
        /* ignore */ }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        return ()=>{
            flushPending();
        };
    }, [
        flushPending
    ]);
    return {
        cachedValue,
        updateCache,
        clearCache
    };
}


/***/ }),

/***/ 67917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fq: () => (/* binding */ ensureVoicesLoaded),
/* harmony export */   _d: () => (/* binding */ playBrowserTTSPreview),
/* harmony export */   gt: () => (/* binding */ isBrowserTTSAbortError)
/* harmony export */ });
/* unused harmony export resolveBrowserVoice */
/* harmony import */ var _lib_audio_tts_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93315);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/browser-tts-preview.ts
 *
 * Verbatim port — pure browser SpeechSynthesis, no external deps.
 */ /* __next_internal_client_entry_do_not_use__ isBrowserTTSAbortError,ensureVoicesLoaded,resolveBrowserVoice,playBrowserTTSPreview auto */ 
const VOICES_LOAD_TIMEOUT_MS = 2000;
const PREVIEW_TIMEOUT_MS = 30000;
const CJK_LANG_THRESHOLD = 0.3;
function createAbortError() {
    const error = new Error('Browser TTS preview canceled');
    error.name = 'AbortError';
    return error;
}
function inferPreviewLang(text) {
    const cjkCount = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
    const ratio = text.length > 0 ? cjkCount / text.length : 0;
    return ratio > CJK_LANG_THRESHOLD ? 'zh-CN' : 'en-US';
}
function isBrowserTTSAbortError(error) {
    return error instanceof Error && error.name === 'AbortError';
}
/** Wait for browser voices to load, with a 2s timeout fallback. */ async function ensureVoicesLoaded() {
    if ( false || !window.speechSynthesis) {
        return [];
    }
    const initialVoices = window.speechSynthesis.getVoices();
    if (initialVoices.length > 0) {
        return initialVoices;
    }
    return new Promise((resolve)=>{
        let settled = false;
        let timeoutId = null;
        const cleanup = ()=>{
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
        const finish = ()=>{
            if (settled) return;
            settled = true;
            cleanup();
            resolve(window.speechSynthesis.getVoices());
        };
        const handleVoicesChanged = ()=>{
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                finish();
            }
        };
        window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
        timeoutId = window.setTimeout(finish, VOICES_LOAD_TIMEOUT_MS);
    });
}
/** Resolve a browser voice by voiceURI, name, or lang, with language fallback by text. */ function resolveBrowserVoice(voices, voiceNameOrLang, text) {
    const target = voiceNameOrLang.trim();
    const matchedVoice = target && target !== 'default' ? voices.find((voice)=>voice.voiceURI === target || voice.name === target || voice.lang === target) || null : null;
    return {
        voice: matchedVoice,
        lang: matchedVoice?.lang || inferPreviewLang(text)
    };
}
/**
 * Play a short browser-native TTS preview.
 */ function playBrowserTTSPreview(options) {
    const synth =  true ? window.speechSynthesis : 0;
    if (!synth) {
        return {
            promise: Promise.reject(new Error('Browser does not support Speech Synthesis API')),
            cancel: ()=>{}
        };
    }
    let settled = false;
    let started = false;
    let canceled = false;
    let timeoutId = null;
    let rejectPromise = null;
    const settleResolve = (resolve)=>{
        if (settled) return;
        settled = true;
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }
        resolve();
    };
    const settleReject = (reject, reason)=>{
        if (settled) return;
        settled = true;
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }
        reject(reason);
    };
    const promise = new Promise((resolve, reject)=>{
        rejectPromise = reject;
        const startPlayback = async ()=>{
            try {
                // Preview text may be markdown (narration lines) — strip markers so
                // the preview matches what synthesis actually speaks.
                const speakable = (0,_lib_audio_tts_text__WEBPACK_IMPORTED_MODULE_0__/* .stripMarkdownForTTS */ .A)(options.text ?? '');
                if (!speakable.trim()) {
                    settleReject(reject, new Error('Preview text contains no speakable content'));
                    return;
                }
                const voices = options.voices ?? await ensureVoicesLoaded();
                if (canceled) {
                    settleReject(reject, createAbortError());
                    return;
                }
                if (voices.length === 0) {
                    settleReject(reject, new Error('No browser TTS voices available'));
                    return;
                }
                const utterance = new SpeechSynthesisUtterance(speakable);
                utterance.rate = options.rate ?? 1;
                const { voice, lang } = resolveBrowserVoice(voices, options.voice ?? '', speakable);
                if (voice) {
                    utterance.voice = voice;
                }
                utterance.lang = lang;
                utterance.onstart = ()=>{
                    started = true;
                };
                utterance.onend = ()=>{
                    if (!started) {
                        settleReject(reject, new Error('Browser TTS preview ended before playback started'));
                        return;
                    }
                    settleResolve(resolve);
                };
                utterance.onerror = (event)=>{
                    if (canceled || event.error === 'canceled' || event.error === 'interrupted') {
                        settleReject(reject, createAbortError());
                        return;
                    }
                    settleReject(reject, new Error(event.error));
                };
                timeoutId = window.setTimeout(()=>{
                    synth.cancel();
                    settleReject(reject, new Error('Browser TTS preview timed out'));
                }, PREVIEW_TIMEOUT_MS);
                synth.cancel();
                if (canceled) {
                    settleReject(reject, createAbortError());
                    return;
                }
                synth.speak(utterance);
            } catch (error) {
                settleReject(reject, error);
            }
        };
        void startPlayback();
    });
    const cancel = ()=>{
        if (settled || canceled) return;
        canceled = true;
        synth.cancel();
        if (rejectPromise) {
            settleReject(rejectPromise, createAbortError());
        }
    };
    return {
        promise,
        cancel
    };
}


/***/ }),

/***/ 69859:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ useImportPptx)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66609);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71442);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7603);
/* __next_internal_client_entry_do_not_use__ useImportPptx auto */ 



const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('ImportPptx');
/**
 * PPTX import flow: parse + convert + (optionally) upload media, all inside
 * the bundled `maic-importer` dist that we load by URL to bypass
 * Turbopack's hard rejection of pdfjs-dist's dynamic require.
 */ function useImportPptx(options = {}) {
    const [importing, setImporting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const { upload, onImported } = options;
    const triggerFileSelect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        fileInputRef.current?.click();
    }, []);
    const handleFileChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        e.target.value = '';
        setImporting(true);
        const toastId = sonner__WEBPACK_IMPORTED_MODULE_1__.toast.loading(t('import.parsingPptx'));
        try {
            // Static URL → bundler never sees the import target.
            // `scripts/sync-maic-importer.mjs` copies the prebuilt dist into
            // `public/vendor/` after every `pnpm install`.
            const url = '/vendor/maic-importer/index.js';
            // Runtime guard: the bundle is a gitignored artifact synced into
            // public/vendor during postinstall. If a deploy skipped that step the
            // URL 404s and `import()` fails with an opaque SyntaxError (404 HTML
            // parsed as JS). Probe first so we can report a clear, actionable error.
            let probe;
            try {
                probe = await fetch(url, {
                    method: 'HEAD'
                });
            } catch  {
            // Network/HEAD unsupported — don't block; let import() report instead.
            }
            if (probe && !probe.ok) {
                throw new Error(`PARSER_NOT_DEPLOYED: ${url} → HTTP ${probe.status}`);
            }
            const mod = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ /* @vite-ignore */ url);
            const slides = await mod.importPptx(file, {
                upload
            });
            log.info('pptx imported', {
                slideCount: slides.length
            });
            onImported?.(slides);
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.success(t('import.pptxSuccess', {
                count: slides.length
            }), {
                id: toastId
            });
        } catch (error) {
            log.error('PPTX import failed:', error);
            const notDeployed = error instanceof Error && error.message.startsWith('PARSER_NOT_DEPLOYED');
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(t(notDeployed ? 'import.error.parserUnavailable' : 'import.error.invalidPptx'), {
                id: toastId
            });
        } finally{
            setImporting(false);
        }
    }, [
        t,
        upload,
        onImported
    ]);
    return {
        importing,
        fileInputRef,
        triggerFileSelect,
        handleFileChange
    };
}


/***/ }),

/***/ 70872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 73460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ MediaPopover)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12980);
/* harmony import */ var _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(15688);
/* harmony import */ var _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(80846);
/* harmony import */ var _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(76721);
/* harmony import */ var _components_ui_popover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17414);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29991);
/* harmony import */ var _components_ui_switch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21767);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(40980);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75748);
/* harmony import */ var _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81301);
/* harmony import */ var _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2119);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33157);
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3945);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/generation/media-popover.tsx
 *
 * Verbatim port — all imports already exist in medq.
 */ /* __next_internal_client_entry_do_not_use__ MediaPopover auto */ 













// ─── Provider icon maps ───
const IMAGE_PROVIDER_ICONS = {
    seedream: '/logos/doubao.svg',
    'openai-image': '/logos/openai.svg',
    'qwen-image': '/logos/bailian.svg',
    'nano-banana': '/logos/gemini.svg',
    'grok-image': '/logos/grok.svg'
};
const VIDEO_PROVIDER_ICONS = {
    seedance: '/logos/doubao.svg',
    kling: '/logos/kling.svg',
    veo: '/logos/gemini.svg',
    sora: '/logos/openai.svg',
    'grok-video': '/logos/grok.svg'
};
const TABS = [
    {
        id: 'image',
        icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A,
        label: 'Image'
    },
    {
        id: 'video',
        icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A,
        label: 'Video'
    },
    {
        id: 'tts',
        icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A,
        label: 'TTS'
    },
    {
        id: 'asr',
        icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
        label: 'ASR'
    }
];
function MediaPopover({ onSettingsOpen }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__/* .useI18n */ .s)();
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('image');
    // ─── Store ───
    const imageGenerationEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.imageGenerationEnabled);
    const videoGenerationEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.videoGenerationEnabled);
    const ttsEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.ttsEnabled);
    const asrEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.asrEnabled);
    const setImageGenerationEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setImageGenerationEnabled);
    const setVideoGenerationEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setVideoGenerationEnabled);
    const setTTSEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setTTSEnabled);
    const setASREnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setASREnabled);
    const imageProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.imageProviderId);
    const imageModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.imageModelId);
    const imageProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.imageProvidersConfig);
    const setImageProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setImageProvider);
    const setImageModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setImageModelId);
    const videoProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.videoProviderId);
    const videoModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.videoModelId);
    const videoProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.videoProvidersConfig);
    const setVideoProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setVideoProvider);
    const setVideoModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setVideoModelId);
    const asrProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.asrProviderId);
    const asrLanguage = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.asrLanguage);
    const asrProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.asrProvidersConfig);
    const setASRProvider = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setASRProvider);
    const setASRLanguage = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((s)=>s.setASRLanguage);
    const enabledMap = {
        image: imageGenerationEnabled,
        video: videoGenerationEnabled,
        tts: ttsEnabled,
        asr: asrEnabled
    };
    const enabledCount = [
        imageGenerationEnabled,
        videoGenerationEnabled,
        ttsEnabled,
        asrEnabled
    ].filter(Boolean).length;
    const cfgOk = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((configs, id, needsKey)=>!needsKey || !!configs[id]?.apiKey || !!configs[id]?.isServerConfigured, []);
    // ─── Grouped select data ───
    // All providers stay listed so custom models remain visible even before an
    // API key is configured; unconfigured groups render grayed-out (available:
    // false → SelectItem disabled) instead of vanishing from the dropdown.
    const imageGroups = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>Object.values(_lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_7__/* .IMAGE_PROVIDERS */ .D).map((p)=>({
                groupId: p.id,
                groupName: p.name,
                groupIcon: IMAGE_PROVIDER_ICONS[p.id],
                available: cfgOk(imageProvidersConfig, p.id, p.requiresApiKey),
                items: [
                    ...p.models,
                    ...imageProvidersConfig[p.id]?.customModels || []
                ].map((m)=>({
                        id: m.id,
                        name: m.name
                    }))
            })), [
        cfgOk,
        imageProvidersConfig
    ]);
    const videoGroups = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>Object.values(_lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_8__/* .VIDEO_PROVIDERS */ .l).map((p)=>({
                groupId: p.id,
                groupName: p.name,
                groupIcon: VIDEO_PROVIDER_ICONS[p.id],
                available: cfgOk(videoProvidersConfig, p.id, p.requiresApiKey),
                items: [
                    ...p.models,
                    ...videoProvidersConfig[p.id]?.customModels || []
                ].map((m)=>({
                        id: m.id,
                        name: m.name
                    }))
            })), [
        cfgOk,
        videoProvidersConfig
    ]);
    // ASR: built-in + custom providers
    const asrGroups = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const groups = [];
        // Built-in providers
        for (const p of Object.values(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_9__/* .ASR_PROVIDERS */ .Co)){
            if (!cfgOk(asrProvidersConfig, p.id, p.requiresApiKey)) continue;
            groups.push({
                groupId: p.id,
                groupName: p.name,
                groupIcon: p.icon,
                available: true,
                items: (0,_lib_audio_constants__WEBPACK_IMPORTED_MODULE_9__/* .getASRSupportedLanguages */ .Wl)(p.id).map((l)=>({
                        id: l,
                        name: l
                    }))
            });
        }
        // Custom providers — only show if at least one model is configured
        for (const [id, cfg] of Object.entries(asrProvidersConfig)){
            if (!(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_14__/* .isCustomASRProvider */ .v)(id)) continue;
            const customModels = cfg.customModels || [];
            if (customModels.length === 0) continue;
            const providerName = cfg.customName || id;
            groups.push({
                groupId: id,
                groupName: providerName,
                available: true,
                items: _lib_audio_constants__WEBPACK_IMPORTED_MODULE_9__/* .CUSTOM_ASR_DEFAULT_LANGUAGES */ .D$.map((l)=>({
                        id: l,
                        name: l
                    }))
            });
        }
        return groups;
    }, [
        asrProvidersConfig,
        cfgOk
    ]);
    // Auto-select first enabled tab on open
    const handleOpenChange = (isOpen)=>{
        setOpen(isOpen);
        if (isOpen) {
            const first = [
                'image',
                'video',
                'tts',
                'asr'
            ].find((id)=>enabledMap[id]);
            setActiveTab(first || 'image');
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .Popover */ .AM, {
        open: open,
        onOpenChange: handleOpenChange,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverTrigger */ .Wv, {
                type: "button",
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_15__.cn)('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap border', enabledCount > 0 ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200/60 dark:border-violet-700/50' : 'text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 border-border/50'),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                        className: "size-3.5"
                    }),
                    imageGenerationEnabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                        className: "size-3.5"
                    }),
                    videoGenerationEnabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                        className: "size-3.5"
                    }),
                    ttsEnabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                        className: "size-3.5"
                    }),
                    asrEnabled && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                        className: "size-3.5"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverContent */ .hl, {
                align: "start",
                side: "bottom",
                className: "w-80 p-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "p-2 pb-0",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex gap-0.5 p-0.5 bg-muted/60 rounded-lg",
                            children: TABS.map((tab)=>{
                                const isActive = activeTab === tab.id;
                                const isEnabled = enabledMap[tab.id];
                                const Icon = tab.icon;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: ()=>setActiveTab(tab.id),
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_15__.cn)('flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-medium transition-all relative', isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground/80'),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                            className: "size-3.5"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "hidden sm:inline",
                                            children: tab.label
                                        }),
                                        isEnabled && !isActive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "absolute top-1 right-1 size-1.5 rounded-full bg-violet-500"
                                        })
                                    ]
                                }, tab.id);
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-3 pt-2.5",
                        children: [
                            activeTab === 'image' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabPanel, {
                                icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A,
                                label: t('media.imageCapability'),
                                enabled: imageGenerationEnabled,
                                onToggle: setImageGenerationEnabled,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GroupedSelect, {
                                    groups: imageGroups,
                                    selectedGroupId: imageProviderId,
                                    selectedItemId: imageModelId,
                                    onSelect: (gid, iid)=>{
                                        setImageProvider(gid);
                                        setImageModelId(iid);
                                    }
                                })
                            }),
                            activeTab === 'video' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabPanel, {
                                icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A,
                                label: t('media.videoCapability'),
                                enabled: videoGenerationEnabled,
                                onToggle: setVideoGenerationEnabled,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GroupedSelect, {
                                    groups: videoGroups,
                                    selectedGroupId: videoProviderId,
                                    selectedItemId: videoModelId,
                                    onSelect: (gid, iid)=>{
                                        setVideoProvider(gid);
                                        setVideoModelId(iid);
                                    }
                                })
                            }),
                            activeTab === 'tts' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabPanel, {
                                icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A,
                                label: t('media.ttsCapability'),
                                enabled: ttsEnabled,
                                onToggle: setTTSEnabled
                            }),
                            activeTab === 'asr' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabPanel, {
                                icon: _barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
                                label: t('media.asrCapability'),
                                enabled: asrEnabled,
                                onToggle: setASREnabled,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GroupedSelect, {
                                    groups: asrGroups,
                                    selectedGroupId: asrProviderId,
                                    selectedItemId: asrLanguage,
                                    onSelect: (gid, iid)=>{
                                        setASRProvider(gid);
                                        setASRLanguage(iid);
                                    }
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "border-t border-border/40",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>{
                                setOpen(false);
                                onSettingsOpen(activeTab);
                            },
                            className: "w-full flex items-center justify-between px-3.5 py-2.5 text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    children: t('toolbar.advancedSettings')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronRight_Image_Mic_SlidersHorizontal_Video_Volume2_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                    className: "size-3"
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}
// ─── Tab panel: header (label + switch) + optional body ───
function TabPanel({ icon: Icon, label, enabled, onToggle, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-2.5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_15__.cn)('size-4 shrink-0 transition-colors', enabled ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground/50')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_15__.cn)('flex-1 text-sm font-medium transition-colors', !enabled && 'text-muted-foreground'),
                        children: label
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_4__/* .Switch */ .d, {
                        checked: enabled,
                        onCheckedChange: onToggle,
                        className: "scale-[0.85] origin-right"
                    })
                ]
            }),
            enabled && children
        ]
    });
}
function GroupedSelect({ groups, selectedGroupId, selectedItemId, onSelect }) {
    const composite = `${selectedGroupId}::${selectedItemId}`;
    // When multiple groups share the same groupId (e.g. browser-native-tts split by language),
    // find the sub-group that actually contains the selected item.
    const selectedGroup = groups.find((g)=>g.groupId === selectedGroupId && g.items.some((item)=>item.id === selectedItemId)) || groups.find((g)=>g.groupId === selectedGroupId);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .Select */ .l6, {
        value: composite,
        onValueChange: (v)=>{
            if (v === null) return;
            const sep = v.indexOf('::');
            if (sep === -1) return;
            onSelect(v.slice(0, sep), v.slice(sep + 2));
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectTrigger */ .bq, {
                className: "h-8 w-full rounded-lg border-border/40 bg-background/80 hover:bg-muted/40 shadow-none text-xs focus:ring-1 focus:ring-ring/30 px-2.5",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: "flex items-center gap-2 min-w-0 flex-1 overflow-hidden",
                    children: [
                        selectedGroup?.groupIcon && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                            src: selectedGroup.groupIcon,
                            alt: "",
                            className: "size-4 rounded-sm shrink-0"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "font-medium truncate",
                            children: selectedGroup?.groupName
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-muted-foreground/40",
                            children: "/"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-muted-foreground truncate",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectValue */ .yv, {})
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectContent */ .gC, {
                children: groups.map((group, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                        children: [
                            i > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectSeparator */ .mi, {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectGroup */ .s3, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectLabel */ .TR, {
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_15__.cn)('flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider', !group.available && 'opacity-50'),
                                        children: [
                                            group.groupIcon && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                src: group.groupIcon,
                                                alt: "",
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_15__.cn)('size-3.5 rounded-sm', !group.available && 'opacity-40')
                                            }),
                                            group.groupName,
                                            !group.available && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "font-normal normal-case tracking-normal text-muted-foreground",
                                                children: "\xb7 API key needed"
                                            })
                                        ]
                                    }),
                                    group.items.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_3__/* .SelectItem */ .eb, {
                                            value: `${group.groupId}::${item.id}`,
                                            disabled: !group.available,
                                            className: "text-xs",
                                            children: item.name
                                        }, `${group.groupId}::${item.id}`))
                                ]
                            })
                        ]
                    }, `${group.groupId}-${i}`))
            })
        ]
    });
}


/***/ }),

/***/ 73634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ OpenMAICHomePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73321);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5772);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(15696);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(78235);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(47603);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(78890);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(70299);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(88074);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(57538);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(38158);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(68562);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(8117);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(18986);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(94088);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(24161);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(99314);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71442);
/* harmony import */ var _components_openmaic_language_switcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29739);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7603);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_input_group__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(55278);
/* harmony import */ var _components_openmaic_ui_textarea__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(44374);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(40980);
/* harmony import */ var _components_openmaic_settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(57501);
/* harmony import */ var _components_openmaic_generation_generation_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1284);
/* harmony import */ var _components_openmaic_agent_agent_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2136);
/* harmony import */ var _lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(43385);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(46821);
/* harmony import */ var _lib_utils_image_storage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(65066);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(75748);
/* harmony import */ var _lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(56988);
/* harmony import */ var _lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(28458);
/* harmony import */ var _lib_utils_stage_storage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(14037);
/* harmony import */ var _components_openmaic_slide_renderer_SlideThumbnail__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(30884);
/* harmony import */ var _lib_store_media_generation__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(11808);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(66609);
/* harmony import */ var _components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(19205);
/* harmony import */ var _lib_hooks_use_draft_cache__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(67620);
/* harmony import */ var _components_openmaic_audio_speech_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(98065);
/* harmony import */ var _lib_import_use_import_classroom__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(76382);
/* harmony import */ var _lib_config_feature_flags__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(87204);
/* harmony import */ var _lib_import_use_import_pptx__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(69859);
/* harmony import */ var _components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(42678);
/* provided dependency */ var process = __webpack_require__(41463);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: app/page.tsx (https://github.com/THU-MAIC/OpenMAIC/blob/main/app/page.tsx)
 *
 * Verbatim port of OpenMAIC's real home page — the topic-input form +
 * "Recent Classrooms" grid + agent bar + settings dialog + theme switcher
 * + language switcher + user profile pill — embedded as a reusable
 * component so MedQ's "AI Classroom" tab can mount the real OpenMAIC UI
 * directly (instead of the previous custom medq-styled form).
 *
 * Adaptations from the original:
 *  • Import paths point to MedQ's ported `@/components/openmaic/...` tree
 *    (OpenMAIC's `@/components/...` paths are remapped).
 *  • Submit flow routes to `/openmaic-generation-preview` (MedQ's
 *    integrated preview route) instead of OpenMAIC's `/generation-preview`.
 *  • Classroom-card click → `/classroom/${id}` (MedQ's integrated classroom
 *    route) — unchanged from OpenMAIC's path because MedQ's rewrites already
 *    align.
 *  • "Back" from preview still navigates to `/` (MedQ home dashboard).
 *
 * No behavioral edits — the file is a 1:1 port so the UI matches
 * open.maic.chat exactly, per user request.
 */ /* __next_internal_client_entry_do_not_use__ OpenMAICHomePage,default auto */ 
































const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_6__/* .createLogger */ .h)('OpenMAICHomePage');
const WEB_SEARCH_STORAGE_KEY = 'webSearchEnabled';
const RECENT_OPEN_STORAGE_KEY = 'recentClassroomsOpen';
const INTERACTIVE_MODE_STORAGE_KEY = 'interactiveModeEnabled';
const PPTX_IMPORT_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PPTX_IMPORT === 'true';
const initialFormState = {
    pdfFile: null,
    requirement: '',
    webSearch: false,
    interactiveMode: false,
    vocationalTestMode: false
};
function OpenMAICHomePage() {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_4__/* .useI18n */ .s)();
    const { theme, setTheme } = (0,_lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_13__/* .useTheme */ .D)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const showVocationalTestUi = (0,_lib_config_feature_flags__WEBPACK_IMPORTED_MODULE_25__/* .shouldShowVocationalTestUi */ .vF)();
    const [form, setForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialFormState);
    const [settingsOpen, setSettingsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [settingsSection, setSettingsSection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const { cachedValue: cachedRequirement, updateCache: updateRequirementCache } = (0,_lib_hooks_use_draft_cache__WEBPACK_IMPORTED_MODULE_22__/* .useDraftCache */ .b)({
        key: 'requirementDraft'
    });
    const providersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_15__.useSettingsStore)((s)=>s.providersConfig);
    const hasUsableProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_28__/* .hasUsableLLMProvider */ .ns)(providersConfig);
    const [recentOpen, setRecentOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const persistRecentOpen = (next)=>{
        setRecentOpen(next);
        try {
            localStorage.setItem(RECENT_OPEN_STORAGE_KEY, String(next));
        } catch  {
        /* ignore */ }
    };
    /* eslint-disable react-hooks/set-state-in-effect */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            const saved = localStorage.getItem(RECENT_OPEN_STORAGE_KEY);
            if (saved !== null) setRecentOpen(saved !== 'false');
        } catch  {
        /* localStorage unavailable */ }
        try {
            const savedWebSearch = localStorage.getItem(WEB_SEARCH_STORAGE_KEY);
            const savedInteractiveMode = localStorage.getItem(INTERACTIVE_MODE_STORAGE_KEY);
            const updates = {};
            if (savedWebSearch === 'true') updates.webSearch = true;
            if (savedInteractiveMode === 'true') updates.interactiveMode = true;
            if (Object.keys(updates).length > 0) {
                setForm((prev)=>({
                        ...prev,
                        ...updates
                    }));
            }
        } catch  {
        /* localStorage unavailable */ }
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */ const draftRestoredRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    /* eslint-disable react-hooks/set-state-in-effect */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (draftRestoredRef.current) return;
        if (!cachedRequirement) return;
        draftRestoredRef.current = true;
        setForm((prev)=>prev.requirement ? prev : {
                ...prev,
                requirement: cachedRequirement
            });
    }, [
        cachedRequirement
    ]);
    /* eslint-enable react-hooks/set-state-in-effect */ const [themeOpen, setThemeOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [classrooms, setClassrooms] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [thumbnails, setThumbnails] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [pendingDeleteId, setPendingDeleteId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [searchOpen, setSearchOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const searchInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const searchButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const toolbarRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const textareaRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const thumbnailsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    // Home-extras state: What's-New modal + Discover/My-Courses tab switcher.
    // The What's-New modal auto-opens on first visit (or when the version bumps)
    // and is dismissed by the user clicking "Got it" or the backdrop.
    const [whatsNewOpen, setWhatsNewOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [shouldShowWhatsNew, markWhatsNewSeen] = (0,_components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__/* .useShouldShowWhatsNew */ .DV)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (shouldShowWhatsNew) setWhatsNewOpen(true);
    }, [
        shouldShowWhatsNew
    ]);
    const handleWhatsNewOpenChange = (open)=>{
        setWhatsNewOpen(open);
        if (!open) markWhatsNewSeen();
    };
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('my-courses');
    /**
   * Featured-topic click handler: pre-fills the prompt textarea with the
   * selected medical topic and scrolls the textarea into view. The user can
   * then tweak the prompt and click "Enter Classroom" to generate the lesson.
   */ const handleFeaturedTopicClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((prompt)=>{
        setForm((prev)=>({
                ...prev,
                requirement: prompt
            }));
        // Scroll the textarea into view and focus it.
        requestAnimationFrame(()=>{
            textareaRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            textareaRef.current?.focus();
        });
    }, []);
    const replaceThumbnails = (slides)=>{
        const previous = thumbnailsRef.current;
        thumbnailsRef.current = slides;
        setThumbnails(slides);
        window.setTimeout(()=>(0,_lib_utils_stage_storage__WEBPACK_IMPORTED_MODULE_17__/* .revokeThumbnailSlideMediaUrls */ .kz)(previous), 0);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!themeOpen) return;
        const handleClickOutside = (e)=>{
            if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
                setThemeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [
        themeOpen
    ]);
    const loadClassrooms = async ()=>{
        try {
            const list = await (0,_lib_utils_stage_storage__WEBPACK_IMPORTED_MODULE_17__/* .listStages */ .Cv)();
            setClassrooms(list);
            if (list.length > 0) {
                const slides = await (0,_lib_utils_stage_storage__WEBPACK_IMPORTED_MODULE_17__/* .getFirstSlideByStages */ .UI)(list.map((c)=>c.id));
                replaceThumbnails(slides);
            } else {
                replaceThumbnails({});
            }
        } catch (err) {
            log.error('Failed to load classrooms:', err);
        }
    };
    const { importing, fileInputRef, triggerFileSelect, handleFileChange } = (0,_lib_import_use_import_classroom__WEBPACK_IMPORTED_MODULE_24__/* .useImportClassroom */ .K)(()=>{
        loadClassrooms();
    });
    const { importing: pptxImporting, fileInputRef: pptxFileInputRef, triggerFileSelect: triggerPptxFileSelect, handleFileChange: handlePptxFileChange } = (0,_lib_import_use_import_pptx__WEBPACK_IMPORTED_MODULE_26__/* .useImportPptx */ .t)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        _lib_store_media_generation__WEBPACK_IMPORTED_MODULE_19__/* .useMediaGenerationStore */ .z.getState().revokeObjectUrls();
        _lib_store_media_generation__WEBPACK_IMPORTED_MODULE_19__/* .useMediaGenerationStore */ .z.setState({
            tasks: {}
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadClassrooms();
        return ()=>{
            (0,_lib_utils_stage_storage__WEBPACK_IMPORTED_MODULE_17__/* .revokeThumbnailSlideMediaUrls */ .kz)(thumbnailsRef.current);
            thumbnailsRef.current = {};
        };
    }, []);
    const handleDelete = (id, e)=>{
        e.stopPropagation();
        setPendingDeleteId(id);
    };
    const confirmDelete = async (id)=>{
        setPendingDeleteId(null);
        try {
            await (0,_lib_utils_stage_storage__WEBPACK_IMPORTED_MODULE_17__/* .deleteStageData */ .cl)(id);
            await loadClassrooms();
        } catch (err) {
            log.error('Failed to delete classroom:', err);
            sonner__WEBPACK_IMPORTED_MODULE_20__.toast.error('Failed to delete classroom');
        }
    };
    const handleRename = async (id, newName)=>{
        try {
            await (0,_lib_utils_stage_storage__WEBPACK_IMPORTED_MODULE_17__/* .renameStage */ .p1)(id, newName);
            setClassrooms((prev)=>prev.map((c)=>c.id === id ? {
                        ...c,
                        name: newName
                    } : c));
        } catch (err) {
            log.error('Failed to rename classroom:', err);
            sonner__WEBPACK_IMPORTED_MODULE_20__.toast.error(t('classroom.renameFailed'));
        }
    };
    const deferredSearchQuery = (0,react__WEBPACK_IMPORTED_MODULE_1__.useDeferredValue)(searchQuery);
    const filteredClassrooms = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const q = deferredSearchQuery.trim().toLowerCase();
        if (!q) return classrooms;
        return classrooms.filter((c)=>{
            const name = c.name?.toLowerCase() ?? '';
            const desc = c.description?.toLowerCase() ?? '';
            return name.includes(q) || desc.includes(q);
        });
    }, [
        classrooms,
        deferredSearchQuery
    ]);
    const updateForm = (field, value)=>{
        setForm((prev)=>({
                ...prev,
                [field]: value
            }));
        try {
            if (field === 'webSearch') localStorage.setItem(WEB_SEARCH_STORAGE_KEY, String(value));
            if (field === 'interactiveMode') localStorage.setItem(INTERACTIVE_MODE_STORAGE_KEY, String(value));
            if (field === 'requirement') updateRequirementCache(value);
        } catch  {
        /* ignore */ }
    };
    const handleGenerate = async ()=>{
        if (!form.requirement.trim()) {
            setError(t('upload.requirementRequired'));
            return;
        }
        setError(null);
        try {
            const userProfile = _lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .useUserProfileStore */ .n.getState();
            const requirements = {
                requirement: form.requirement,
                userNickname: userProfile.nickname || undefined,
                userBio: userProfile.bio || undefined,
                webSearch: form.webSearch || undefined,
                interactiveMode: form.vocationalTestMode ? true : form.interactiveMode,
                ...form.vocationalTestMode ? {
                    taskEngineMode: true
                } : {}
            };
            let pdfStorageKey;
            let pdfFileName;
            let pdfProviderId;
            let pdfProviderConfig;
            if (form.pdfFile) {
                pdfStorageKey = await (0,_lib_utils_image_storage__WEBPACK_IMPORTED_MODULE_14__/* .storePdfBlob */ .xT)(form.pdfFile);
                pdfFileName = form.pdfFile.name;
                const settings = _lib_store_settings__WEBPACK_IMPORTED_MODULE_15__.useSettingsStore.getState();
                pdfProviderId = settings.pdfProviderId;
                const providerCfg = settings.pdfProvidersConfig?.[settings.pdfProviderId];
                if (providerCfg) {
                    pdfProviderConfig = {
                        apiKey: providerCfg.apiKey,
                        baseUrl: providerCfg.baseUrl
                    };
                }
            }
            const sessionState = {
                sessionId: (0,nanoid__WEBPACK_IMPORTED_MODULE_29__/* .nanoid */ .Ak)(),
                requirements,
                pdfText: '',
                pdfImages: [],
                imageStorageIds: [],
                pdfStorageKey,
                pdfFileName,
                pdfProviderId,
                pdfProviderConfig,
                sceneOutlines: null,
                currentStep: 'generating'
            };
            sessionStorage.setItem('generationSession', JSON.stringify(sessionState));
            // MedQ adaptation: route to the integrated preview page (not OpenMAIC's
            // `/generation-preview`).
            router.push('/openmaic-generation-preview');
        } catch (err) {
            log.error('Error preparing generation:', err);
            setError(err instanceof Error ? err.message : t('upload.generateFailed'));
        }
    };
    const formatDate = (timestamp)=>{
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return t('classroom.today');
        if (diffDays === 1) return t('classroom.yesterday');
        if (diffDays < 7) return `${diffDays} ${t('classroom.daysAgo')}`;
        return date.toLocaleDateString();
    };
    const canGenerate = !!form.requirement.trim() && hasUsableProvider;
    const handleKeyDown = (e)=>{
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            if (canGenerate) handleGenerate();
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative min-h-[calc(100dvh-4rem)] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center p-4 pt-4 md:p-8 md:pt-6 overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                ref: fileInputRef,
                type: "file",
                accept: ".zip",
                onChange: handleFileChange,
                className: "hidden"
            }),
            PPTX_IMPORT_ENABLED && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                ref: pptxFileInputRef,
                type: "file",
                accept: ".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                onChange: handlePptxFileChange,
                className: "hidden"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                ref: toolbarRef,
                className: "absolute top-3 right-3 z-50 flex items-center gap-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-100/50 dark:border-gray-700/50 shadow-sm",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_language_switcher__WEBPACK_IMPORTED_MODULE_5__/* .LanguageSwitcher */ .c, {
                        onOpen: ()=>setThemeOpen(false)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>{
                                    setThemeOpen(!themeOpen);
                                },
                                className: "p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all",
                                children: [
                                    theme === 'light' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    theme === 'dark' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    theme === 'system' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    })
                                ]
                            }),
                            themeOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>{
                                            setTheme('light');
                                            setThemeOpen(false);
                                        },
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2', theme === 'light' && 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }),
                                            t('settings.themeOptions.light')
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>{
                                            setTheme('dark');
                                            setThemeOpen(false);
                                        },
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2', theme === 'dark' && 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }),
                                            t('settings.themeOptions.dark')
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>{
                                            setTheme('system');
                                            setThemeOpen(false);
                                        },
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2', theme === 'system' && 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }),
                                            t('settings.themeOptions.system')
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "relative",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>setSettingsOpen(true),
                            className: "p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all group",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                className: "w-4 h-4 group-hover:rotate-90 transition-transform duration-500"
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_settings__WEBPACK_IMPORTED_MODULE_10__/* .SettingsDialog */ .g, {
                open: settingsOpen,
                onOpenChange: (open)=>{
                    setSettingsOpen(open);
                    if (!open) setSettingsSection(undefined);
                },
                initialSection: settingsSection
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse",
                        style: {
                            animationDuration: '4s'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse",
                        style: {
                            animationDuration: '6s'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.6,
                    ease: 'easeOut'
                },
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('relative z-20 w-full max-w-[800px] flex flex-col items-center mt-[6vh]'),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            delay: 0.1,
                            type: 'spring',
                            stiffness: 200,
                            damping: 20
                        },
                        className: "h-12 md:h-16 mb-2 -ml-2 md:-ml-3 relative",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
                            src: "/logo-horizontal.png",
                            alt: "OpenMAIC",
                            fill: true,
                            className: "object-contain object-left",
                            sizes: "(max-width: 768px) 240px, 320px",
                            priority: true
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.p, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.25
                        },
                        className: "text-sm text-muted-foreground/60 mb-4",
                        children: t('home.slogan')
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__/* .AnnouncementBar */ .ZT, {
                        onOpenWhatsNew: ()=>setWhatsNewOpen(true)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                        initial: {
                            opacity: 0,
                            scale: 0.97
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            delay: 0.35
                        },
                        className: "w-full",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "w-full rounded-2xl border border-border/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-black/[0.03] dark:shadow-black/20 transition-shadow focus-within:shadow-2xl focus-within:shadow-violet-500/[0.06]",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative z-20 flex items-start justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(GreetingBar, {}),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "pr-3 pt-3.5 shrink-0",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_agent_agent_bar__WEBPACK_IMPORTED_MODULE_12__/* .AgentBar */ .t, {})
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                    ref: textareaRef,
                                    placeholder: t('upload.requirementPlaceholder'),
                                    className: "w-full resize-none border-0 bg-transparent px-4 pt-1 pb-2 text-[13px] leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none min-h-[140px] max-h-[300px]",
                                    value: form.requirement,
                                    onChange: (e)=>updateForm('requirement', e.target.value),
                                    onKeyDown: handleKeyDown,
                                    rows: 4
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "px-3 pb-3 flex items-end gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex-1 min-w-0",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_generation_generation_toolbar__WEBPACK_IMPORTED_MODULE_11__/* .GenerationToolbar */ .w, {
                                                webSearch: form.webSearch,
                                                onWebSearchChange: (v)=>updateForm('webSearch', v),
                                                onSettingsOpen: (section)=>{
                                                    setSettingsSection(section);
                                                    setSettingsOpen(true);
                                                },
                                                pdfFile: form.pdfFile,
                                                onPdfFileChange: (f)=>updateForm('pdfFile', f),
                                                onPdfError: setError
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .Tooltip */ .m_, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipTrigger */ .k$, {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.button, {
                                                        whileTap: {
                                                            scale: 0.95
                                                        },
                                                        transition: {
                                                            type: 'spring',
                                                            stiffness: 400,
                                                            damping: 17
                                                        },
                                                        onClick: ()=>updateForm('interactiveMode', !form.interactiveMode),
                                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap border shrink-0 h-8', form.interactiveMode ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.35)] dark:shadow-[0_0_12px_rgba(6,182,212,0.25)]' : 'border-cyan-300/60 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20'),
                                                        children: [
                                                            form.interactiveMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "absolute inset-[-4px] rounded-full border border-cyan-400/40 dark:border-cyan-400/25",
                                                                style: {
                                                                    animation: 'interactive-mode-breathe 2s ease-in-out infinite'
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                className: "size-3.5 relative z-10 animate-[spin_3s_linear_infinite]"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "relative z-10",
                                                                children: t('toolbar.interactiveModeLabel')
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipContent */ .ZI, {
                                                    side: "top",
                                                    className: "text-xs",
                                                    children: t('toolbar.interactiveModeHint')
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_audio_speech_button__WEBPACK_IMPORTED_MODULE_23__/* .SpeechButton */ .p, {
                                            size: "md",
                                            onTranscription: (text)=>{
                                                setForm((prev)=>{
                                                    const next = prev.requirement + (prev.requirement ? ' ' : '') + text;
                                                    updateRequirementCache(next);
                                                    return {
                                                        ...prev,
                                                        requirement: next
                                                    };
                                                });
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: handleGenerate,
                                            disabled: !canGenerate,
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('shrink-0 h-8 rounded-lg flex items-center justify-center gap-1.5 transition-all px-3', canGenerate ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm cursor-pointer' : 'bg-muted text-muted-foreground/40 cursor-not-allowed'),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-xs font-medium",
                                                    children: t('toolbar.enterClassroom')
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                    className: "size-3.5"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    showVocationalTestUi && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                        initial: {
                            opacity: 0,
                            y: -4
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.4
                        },
                        className: "mt-2 flex w-full justify-start px-1",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .Tooltip */ .m_, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipTrigger */ .k$, {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        role: "switch",
                                        "aria-checked": form.vocationalTestMode,
                                        onClick: ()=>updateForm('vocationalTestMode', !form.vocationalTestMode),
                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('inline-flex h-7 items-center gap-2 rounded-full border px-2.5 text-[11px] font-medium transition-colors', form.vocationalTestMode ? 'border-cyan-400/70 bg-cyan-50 text-cyan-700 shadow-[0_0_10px_rgba(6,182,212,0.16)] dark:bg-cyan-950/40 dark:text-cyan-300' : 'border-border/70 bg-background/70 text-muted-foreground hover:border-cyan-300/60 hover:text-cyan-700 dark:hover:text-cyan-300'),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "rounded-full bg-cyan-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-normal text-cyan-700 dark:bg-cyan-900/45 dark:text-cyan-300",
                                                children: "测试功能"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                className: "size-3.5"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                children: "职教任务"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('relative h-3.5 w-6 rounded-full transition-colors', form.vocationalTestMode ? 'bg-cyan-500' : 'bg-muted-foreground/25'),
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('absolute top-0.5 size-2.5 rounded-full bg-white transition-transform', form.vocationalTestMode ? 'translate-x-3' : 'translate-x-0.5')
                                                })
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipContent */ .ZI, {
                                    side: "bottom",
                                    className: "text-xs",
                                    children: "从当前输入框提交职教实操训练测试"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                        children: error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                            initial: {
                                opacity: 0,
                                height: 0
                            },
                            animate: {
                                opacity: 1,
                                height: 'auto'
                            },
                            exit: {
                                opacity: 0,
                                height: 0
                            },
                            className: "mt-3 w-full p-3 bg-destructive/10 border border-destructive/20 rounded-lg",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-sm text-destructive",
                                children: error
                            })
                        })
                    }),
                    classrooms.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative z-10 mt-4 flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: triggerFileSelect,
                                disabled: importing,
                                className: "flex items-center gap-1.5 text-[12px] text-muted-foreground/40 hover:text-foreground/60 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                        className: "size-3.5"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        children: t('import.classroom')
                                    })
                                ]
                            }),
                            PPTX_IMPORT_ENABLED && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: triggerPptxFileSelect,
                                disabled: pptxImporting,
                                className: "flex items-center gap-1.5 text-[12px] text-muted-foreground/40 hover:text-foreground/60 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                        className: "size-3.5"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        children: t('import.pptx')
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.5
                },
                className: "relative z-10 mt-10 w-full max-w-6xl flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "group w-full flex items-center gap-4 py-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex-1 h-px bg-border/40 group-hover:bg-border/70 transition-colors"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "shrink-0 flex items-center gap-3 text-[13px] text-muted-foreground/60 select-none",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__/* .DiscoverTabs */ ._V, {
                                        activeTab: activeTab,
                                        onTabChange: setActiveTab,
                                        myCoursesCount: classrooms.length,
                                        discoverCount: _components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__/* .FEATURED_TOPICS */ .ol.length
                                    }),
                                    activeTab === 'my-courses' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                                                initial: false,
                                                children: !searchOpen ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.button, {
                                                    ref: searchButtonRef,
                                                    type: "button",
                                                    "aria-label": t('classroom.searchAriaLabel'),
                                                    onClick: ()=>{
                                                        setSearchOpen(true);
                                                        if (!recentOpen) persistRecentOpen(true);
                                                        requestAnimationFrame(()=>searchInputRef.current?.focus());
                                                    },
                                                    initial: {
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        opacity: 1
                                                    },
                                                    exit: {
                                                        opacity: 0
                                                    },
                                                    transition: {
                                                        duration: 0.12,
                                                        ease: 'easeOut'
                                                    },
                                                    className: "flex items-center justify-center size-6 rounded-full text-muted-foreground/50 hover:text-foreground/70 hover:bg-muted/50 transition-colors cursor-pointer",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                                        className: "size-3.5"
                                                    })
                                                }, "search-icon") : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                                                    initial: {
                                                        opacity: 0,
                                                        width: 0
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        width: 200
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        width: 0
                                                    },
                                                    transition: {
                                                        duration: 0.18,
                                                        ease: [
                                                            0.25,
                                                            0.1,
                                                            0.25,
                                                            1
                                                        ]
                                                    },
                                                    className: "overflow-hidden",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_input_group__WEBPACK_IMPORTED_MODULE_8__/* .InputGroup */ .MG, {
                                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('h-7 text-[12px] rounded-full bg-muted/40 border-transparent shadow-none', 'transition-colors', 'hover:bg-muted/60', 'has-[[data-slot=input-group-control]:focus-visible]:bg-muted/60', 'has-[[data-slot=input-group-control]:focus-visible]:border-transparent', 'has-[[data-slot=input-group-control]:focus-visible]:ring-0'),
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input_group__WEBPACK_IMPORTED_MODULE_8__/* .InputGroupInput */ .iV, {
                                                                ref: searchInputRef,
                                                                value: searchQuery,
                                                                onChange: (e)=>setSearchQuery(e.target.value),
                                                                onKeyDown: (e)=>{
                                                                    if (e.key === 'Escape') {
                                                                        e.preventDefault();
                                                                        if (searchQuery) {
                                                                            setSearchQuery('');
                                                                        } else {
                                                                            setSearchOpen(false);
                                                                            requestAnimationFrame(()=>searchButtonRef.current?.focus());
                                                                        }
                                                                    }
                                                                },
                                                                onBlur: ()=>{
                                                                    if (!searchQuery) {
                                                                        setSearchOpen(false);
                                                                    }
                                                                },
                                                                placeholder: t('classroom.searchPlaceholder'),
                                                                "aria-label": t('classroom.searchAriaLabel'),
                                                                className: "h-7 pl-3 placeholder:text-muted-foreground/50"
                                                            }),
                                                            searchQuery && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input_group__WEBPACK_IMPORTED_MODULE_8__/* .InputGroupButton */ .Ik, {
                                                                size: "icon-xs",
                                                                "aria-label": t('classroom.clearSearch'),
                                                                onMouseDown: (e)=>e.preventDefault(),
                                                                onClick: ()=>{
                                                                    setSearchQuery('');
                                                                    searchInputRef.current?.focus();
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {})
                                                            })
                                                        ]
                                                    })
                                                }, "search-input")
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: triggerFileSelect,
                                                disabled: importing,
                                                className: "group/import grid grid-cols-[auto_0fr] hover:grid-cols-[auto_1fr] items-center gap-1 rounded-full px-1.5 py-0.5 text-[12px] text-muted-foreground/35 hover:text-muted-foreground/70 hover:bg-muted/50 transition-all duration-200 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                                        className: "size-3"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "overflow-hidden opacity-0 group-hover/import:opacity-100 transition-opacity duration-200 whitespace-nowrap",
                                                        children: t('import.classroom')
                                                    })
                                                ]
                                            }),
                                            PPTX_IMPORT_ENABLED && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: triggerPptxFileSelect,
                                                disabled: pptxImporting,
                                                className: "group/import-pptx grid grid-cols-[auto_0fr] hover:grid-cols-[auto_1fr] items-center gap-1 rounded-full px-1.5 py-0.5 text-[12px] text-muted-foreground/35 hover:text-muted-foreground/70 hover:bg-muted/50 transition-all duration-200 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                                        className: "size-3"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "overflow-hidden opacity-0 group-hover/import-pptx:opacity-100 transition-opacity duration-200 whitespace-nowrap",
                                                        children: t('import.pptx')
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>persistRecentOpen(!recentOpen),
                                                className: "flex items-center justify-center size-6 rounded-full text-muted-foreground/50 hover:text-foreground/70 hover:bg-muted/50 transition-colors cursor-pointer",
                                                "aria-label": recentOpen ? 'Collapse' : 'Expand',
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                                                    animate: {
                                                        rotate: recentOpen ? 180 : 0
                                                    },
                                                    transition: {
                                                        duration: 0.3,
                                                        ease: 'easeInOut'
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                                        className: "size-3.5"
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex-1 h-px bg-border/40 group-hover:bg-border/70 transition-colors"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                        children: activeTab === 'my-courses' && recentOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                            initial: {
                                height: 0,
                                opacity: 0
                            },
                            animate: {
                                height: 'auto',
                                opacity: 1
                            },
                            exit: {
                                height: 0,
                                opacity: 0
                            },
                            transition: {
                                duration: 0.4,
                                ease: [
                                    0.25,
                                    0.1,
                                    0.25,
                                    1
                                ]
                            },
                            className: "w-full overflow-hidden",
                            children: classrooms.length === 0 ? /* Empty-state: no classrooms yet — nudge the user toward
                     Discover or the prompt textarea above. */ /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "pt-8 pb-4 flex flex-col items-center text-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "size-12 rounded-full bg-muted/40 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                            className: "size-5 text-muted-foreground/50"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "text-[13px] text-muted-foreground/70 max-w-sm",
                                        children: t('classroom.searchEmpty')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setActiveTab('discover'),
                                        className: "text-[12px] font-medium text-violet-600 dark:text-violet-400 hover:underline",
                                        children: [
                                            t('home.slogan'),
                                            " →"
                                        ]
                                    })
                                ]
                            }) : searchQuery.trim() && filteredClassrooms.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "pt-8 pb-2 text-center text-[13px] text-muted-foreground/60",
                                children: t('classroom.searchEmpty')
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "pt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8",
                                children: filteredClassrooms.map((classroom, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 16
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: i * 0.04,
                                            duration: 0.35,
                                            ease: 'easeOut'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ClassroomCard, {
                                            classroom: classroom,
                                            slide: thumbnails[classroom.id],
                                            formatDate: formatDate,
                                            onDelete: handleDelete,
                                            onRename: handleRename,
                                            confirmingDelete: pendingDeleteId === classroom.id,
                                            onConfirmDelete: ()=>confirmDelete(classroom.id),
                                            onCancelDelete: ()=>setPendingDeleteId(null),
                                            onClick: ()=>router.push(`/classroom/${classroom.id}`)
                                        })
                                    }, classroom.id))
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                        children: activeTab === 'discover' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                            initial: {
                                height: 0,
                                opacity: 0
                            },
                            animate: {
                                height: 'auto',
                                opacity: 1
                            },
                            exit: {
                                height: 0,
                                opacity: 0
                            },
                            transition: {
                                duration: 0.4,
                                ease: [
                                    0.25,
                                    0.1,
                                    0.25,
                                    1
                                ]
                            },
                            className: "w-full overflow-hidden",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "pt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5",
                                children: _components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__/* .FEATURED_TOPICS */ .ol.map((topic)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__/* .FeaturedTopicCard */ .uu, {
                                        topic: topic,
                                        onClick: handleFeaturedTopicClick
                                    }, topic.id))
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_home_extras__WEBPACK_IMPORTED_MODULE_27__/* .WhatsNewModal */ .fk, {
                open: whatsNewOpen,
                onOpenChange: handleWhatsNewOpenChange
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-auto pt-12 pb-4 text-center text-xs text-muted-foreground/40",
                children: "OpenMAIC Open Source Project"
            })
        ]
    });
}
// ─── Greeting Bar — avatar + "Hi, Name", click to edit in-place ────
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
function isCustomAvatar(src) {
    return src.startsWith('data:');
}
function GreetingBar() {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_4__/* .useI18n */ .s)();
    const avatar = (0,_lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .useUserProfileStore */ .n)((s)=>s.avatar);
    const nickname = (0,_lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .useUserProfileStore */ .n)((s)=>s.nickname);
    const bio = (0,_lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .useUserProfileStore */ .n)((s)=>s.bio);
    const setAvatar = (0,_lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .useUserProfileStore */ .n)((s)=>s.setAvatar);
    const setNickname = (0,_lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .useUserProfileStore */ .n)((s)=>s.setNickname);
    const setBio = (0,_lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .useUserProfileStore */ .n)((s)=>s.setBio);
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editingName, setEditingName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [nameDraft, setNameDraft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [avatarPickerOpen, setAvatarPickerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const nameInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const avatarInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const displayName = nickname || t('profile.defaultNickname');
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        const handler = (e)=>{
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
                setEditingName(false);
                setAvatarPickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return ()=>document.removeEventListener('mousedown', handler);
    }, [
        open
    ]);
    const startEditName = ()=>{
        setNameDraft(nickname);
        setEditingName(true);
        setTimeout(()=>nameInputRef.current?.focus(), 50);
    };
    const commitName = ()=>{
        setNickname(nameDraft.trim());
        setEditingName(false);
    };
    const handleAvatarUpload = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_AVATAR_SIZE) {
            sonner__WEBPACK_IMPORTED_MODULE_20__.toast.error(t('profile.fileTooLarge'));
            return;
        }
        if (!file.type.startsWith('image/')) {
            sonner__WEBPACK_IMPORTED_MODULE_20__.toast.error(t('profile.invalidFileType'));
            return;
        }
        const reader = new FileReader();
        reader.onload = ()=>{
            const img = new window.Image();
            img.onload = ()=>{
                const canvas = document.createElement('canvas');
                canvas.width = 128;
                canvas.height = 128;
                const ctx = canvas.getContext('2d');
                const scale = Math.max(128 / img.width, 128 / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                ctx.drawImage(img, (128 - w) / 2, (128 - h) / 2, w, h);
                setAvatar(canvas.toDataURL('image/jpeg', 0.85));
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: containerRef,
        className: "relative pl-4 pr-2 pt-3.5 pb-1 w-auto",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                ref: avatarInputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleAvatarUpload
            }),
            !open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2.5 cursor-pointer transition-all duration-200 group rounded-full px-2.5 py-1.5 border border-border/50 text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 active:scale-[0.97]",
                onClick: ()=>setOpen(true),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "shrink-0 relative",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "relative size-8 rounded-full overflow-hidden ring-[1.5px] ring-border/30 group-hover:ring-violet-400/60 dark:group-hover:ring-violet-400/40 transition-all duration-300",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
                                    src: avatar,
                                    alt: "",
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "32px"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-white dark:bg-slate-800 border border-border/40 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                    className: "size-[7px] text-muted-foreground/70"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex-1 min-w-0",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .Tooltip */ .m_, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipTrigger */ .k$, {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "leading-none select-none flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[13px] font-semibold text-foreground/85 group-hover:text-foreground transition-colors",
                                                children: t('home.greetingWithName', {
                                                    name: displayName
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                                className: "size-3 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors shrink-0"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipContent */ .ZI, {
                                    side: "bottom",
                                    sideOffset: 4,
                                    children: t('profile.editTooltip')
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                children: open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                    initial: {
                        opacity: 0,
                        y: -4,
                        scale: 0.97
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: -4,
                        scale: 0.97
                    },
                    transition: {
                        duration: 0.2,
                        ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                        ]
                    },
                    className: "absolute left-4 top-3.5 z-50 w-64",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] shadow-[0_1px_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_8px_-2px_rgba(0,0,0,0.3)] px-2.5 py-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2.5 cursor-pointer transition-all duration-200",
                                onClick: ()=>{
                                    setOpen(false);
                                    setEditingName(false);
                                    setAvatarPickerOpen(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "shrink-0 relative cursor-pointer",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            setAvatarPickerOpen(!avatarPickerOpen);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "relative size-8 rounded-full overflow-hidden ring-[1.5px] ring-violet-300/70 dark:ring-violet-500/40 transition-all duration-300",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
                                                    src: avatar,
                                                    alt: "",
                                                    fill: true,
                                                    className: "object-cover",
                                                    sizes: "32px"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                                                initial: {
                                                    scale: 0
                                                },
                                                animate: {
                                                    scale: 1
                                                },
                                                className: "absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-white dark:bg-slate-800 border border-border/60 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('size-2 text-muted-foreground/70 transition-transform duration-200', avatarPickerOpen && 'rotate-180')
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex-1 min-w-0",
                                        children: editingName ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-1.5",
                                            onClick: (e)=>e.stopPropagation(),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    ref: nameInputRef,
                                                    value: nameDraft,
                                                    onChange: (e)=>setNameDraft(e.target.value),
                                                    onKeyDown: (e)=>{
                                                        if (e.key === 'Enter') commitName();
                                                        if (e.key === 'Escape') {
                                                            setEditingName(false);
                                                        }
                                                    },
                                                    onBlur: commitName,
                                                    maxLength: 20,
                                                    placeholder: t('profile.defaultNickname'),
                                                    className: "flex-1 min-w-0 h-6 bg-transparent border-b border-border/80 text-[13px] font-semibold text-foreground outline-none placeholder:text-muted-foreground/40"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: commitName,
                                                    className: "shrink-0 size-5 rounded flex items-center justify-center text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__/* ["default"] */ .A, {
                                                        className: "size-3"
                                                    })
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                startEditName();
                                            },
                                            className: "group/name inline-flex items-center gap-1 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[13px] font-semibold text-foreground/85 group-hover/name:text-foreground transition-colors",
                                                    children: displayName
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                                    className: "size-2.5 text-muted-foreground/30 opacity-0 group-hover/name:opacity-100 transition-opacity"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                                        initial: {
                                            opacity: 0,
                                            y: -2
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        className: "shrink-0 size-6 rounded-full flex items-center justify-center hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                                            className: "size-3.5 text-muted-foreground/50"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "pt-2",
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                                        children: avatarPickerOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                                            initial: {
                                                height: 0,
                                                opacity: 0
                                            },
                                            animate: {
                                                height: 'auto',
                                                opacity: 1
                                            },
                                            exit: {
                                                height: 0,
                                                opacity: 0
                                            },
                                            transition: {
                                                duration: 0.15,
                                                ease: 'easeInOut'
                                            },
                                            className: "overflow-hidden",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "p-1 pb-2.5 flex items-center gap-1.5 flex-wrap",
                                                children: [
                                                    _lib_store_user_profile__WEBPACK_IMPORTED_MODULE_16__/* .AVATAR_OPTIONS */ .B.map((url)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>setAvatar(url),
                                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('size-7 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-800 cursor-pointer transition-all duration-150', 'hover:scale-110 active:scale-95', avatar === url ? 'ring-2 ring-violet-400 dark:ring-violet-500 ring-offset-0' : 'hover:ring-1 hover:ring-muted-foreground/30'),
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "relative size-full",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
                                                                    src: url,
                                                                    alt: "",
                                                                    fill: true,
                                                                    className: "object-cover",
                                                                    sizes: "28px"
                                                                })
                                                            })
                                                        }, url)),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('size-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 border border-dashed', 'hover:scale-110 active:scale-95', isCustomAvatar(avatar) ? 'ring-2 ring-violet-400 dark:ring-violet-500 ring-offset-0 border-violet-300 dark:border-violet-600 bg-violet-50 dark:bg-violet-900/30' : 'border-muted-foreground/30 text-muted-foreground/50 hover:border-muted-foreground/50'),
                                                        onClick: ()=>avatarInputRef.current?.click(),
                                                        title: t('profile.uploadAvatar'),
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_48__/* ["default"] */ .A, {
                                                            className: "size-3"
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_textarea__WEBPACK_IMPORTED_MODULE_9__/* .Textarea */ .T, {
                                        value: bio,
                                        onChange: (e)=>setBio(e.target.value),
                                        placeholder: t('profile.bioPlaceholder'),
                                        maxLength: 200,
                                        rows: 2,
                                        className: "resize-none border-border/40 bg-transparent min-h-[72px] !text-[13px] !leading-relaxed placeholder:!text-[11px] placeholder:!leading-relaxed focus-visible:ring-1 focus-visible:ring-border/60"
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
// ─── Classroom Card — clean, minimal style ──────────────────────
function ClassroomCard({ classroom, slide, formatDate, onDelete, onRename, confirmingDelete, onConfirmDelete, onCancelDelete, onClick }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_4__/* .useI18n */ .s)();
    const thumbRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [thumbWidth, setThumbWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [editing, setEditing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [nameDraft, setNameDraft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const nameInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const el = thumbRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry])=>{
            setThumbWidth(Math.round(entry.contentRect.width));
        });
        ro.observe(el);
        return ()=>ro.disconnect();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (editing) nameInputRef.current?.focus();
    }, [
        editing
    ]);
    const isTaskEngineMode = classroom.taskEngineMode === true;
    const showModeBadge = classroom.interactiveMode || isTaskEngineMode;
    const ModeBadgeIcon = isTaskEngineMode ? _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A : _barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A;
    const modeBadgeLabel = isTaskEngineMode ? 'Vocational Mode' : t('toolbar.interactiveModeLabel');
    const startRename = (e)=>{
        e.stopPropagation();
        setNameDraft(classroom.name);
        setEditing(true);
    };
    const commitRename = ()=>{
        if (!editing) return;
        const trimmed = nameDraft.trim();
        if (trimmed && trimmed !== classroom.name) {
            onRename(classroom.id, trimmed);
        }
        setEditing(false);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "group cursor-pointer",
        onClick: confirmingDelete ? undefined : onClick,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                ref: thumbRef,
                className: "relative w-full aspect-[16/9] rounded-2xl bg-slate-100 dark:bg-slate-800/80 overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]",
                children: [
                    slide && thumbWidth > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_slide_renderer_SlideThumbnail__WEBPACK_IMPORTED_MODULE_18__/* .SlideThumbnail */ .o, {
                        slide: slide,
                        size: thumbWidth,
                        viewportSize: slide.viewportSize ?? 1000,
                        viewportRatio: slide.viewportRatio ?? 0.5625
                    }) : !slide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "size-12 rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/30 dark:to-blue-900/30 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_49__/* ["default"] */ .A, {
                                className: "size-5 text-violet-500/60 dark:text-violet-300/60"
                            })
                        })
                    }) : null,
                    showModeBadge && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .Tooltip */ .m_, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipTrigger */ .k$, {
                                asChild: true,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    "aria-label": modeBadgeLabel,
                                    onClick: (e)=>e.stopPropagation(),
                                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__.cn)('absolute bottom-2 left-2 inline-flex items-center justify-center size-5 rounded-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm z-10', isTaskEngineMode ? 'text-amber-600 dark:text-amber-300 ring-1 ring-amber-500/35' : 'text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/30'),
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModeBadgeIcon, {
                                        className: "size-3"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipContent */ .ZI, {
                                side: "top",
                                align: "start",
                                sideOffset: -4,
                                collisionPadding: 0,
                                className: "text-xs",
                                children: modeBadgeLabel
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                        children: !confirmingDelete && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: 0.15
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                                    size: "icon",
                                    variant: "ghost",
                                    className: "absolute top-2 right-2 size-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-destructive/80 text-white hover:text-white backdrop-blur-sm rounded-full",
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        onDelete(classroom.id, e);
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                        className: "size-3.5"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .$, {
                                    size: "icon",
                                    variant: "ghost",
                                    className: "absolute top-2 right-11 size-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white hover:text-white backdrop-blur-sm rounded-full",
                                    onClick: startRename,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                        className: "size-3.5"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_39__/* .AnimatePresence */ .N, {
                        children: confirmingDelete && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_35__/* .motion */ .PY1.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: 0.15
                            },
                            className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-[6px]",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-[13px] font-medium text-white/90",
                                    children: [
                                        t('classroom.deleteConfirmTitle'),
                                        "?"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            className: "px-3.5 py-1 rounded-lg text-[12px] font-medium bg-white/15 text-white/80 hover:bg-white/25 backdrop-blur-sm transition-colors",
                                            onClick: onCancelDelete,
                                            children: t('common.cancel')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            className: "px-3.5 py-1 rounded-lg text-[12px] font-medium bg-red-500/90 text-white hover:bg-red-500 transition-colors",
                                            onClick: onConfirmDelete,
                                            children: t('classroom.delete')
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-2.5 px-1 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "shrink-0 inline-flex items-center rounded-full bg-violet-100 dark:bg-violet-900/30 px-2 py-0.5 text-[11px] font-medium text-violet-600 dark:text-violet-400",
                        children: [
                            classroom.sceneCount,
                            " ",
                            t('classroom.slides'),
                            " \xb7 ",
                            formatDate(classroom.updatedAt)
                        ]
                    }),
                    editing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex-1 min-w-0",
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                            ref: nameInputRef,
                            value: nameDraft,
                            onChange: (e)=>setNameDraft(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') commitRename();
                                if (e.key === 'Escape') setEditing(false);
                            },
                            onBlur: commitRename,
                            maxLength: 100,
                            placeholder: t('classroom.renamePlaceholder'),
                            className: "w-full bg-transparent border-b border-violet-400/60 text-[15px] font-medium text-foreground/90 outline-none placeholder:text-muted-foreground/40"
                        })
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .Tooltip */ .m_, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipTrigger */ .k$, {
                                asChild: true,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "font-medium text-[15px] truncate text-foreground/90 min-w-0 cursor-text",
                                    onDoubleClick: startRename,
                                    children: classroom.name
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_21__/* .TooltipContent */ .ZI, {
                                side: "bottom",
                                sideOffset: 4,
                                className: "!max-w-[min(90vw,32rem)] break-words whitespace-normal",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "break-all",
                                            children: classroom.name
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            className: "shrink-0 p-0.5 rounded hover:bg-foreground/10 transition-colors",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                navigator.clipboard.writeText(classroom.name);
                                                sonner__WEBPACK_IMPORTED_MODULE_20__.toast.success(t('classroom.nameCopied'));
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowUp_Atom_Check_ChevronDown_ChevronUp_Copy_FileText_ImagePlus_Monitor_Moon_Pencil_Presentation_Search_Settings_Sparkles_Sun_Trash2_Upload_X_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                className: "size-3 opacity-60"
                                            })
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (OpenMAICHomePage)));


/***/ }),

/***/ 76382:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ useImportClassroom)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(46821);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66609);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29732);
/* harmony import */ var _lib_export_classroom_zip_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48263);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7603);
/** Ported from OpenMAIC. Original: lib/import/use-import-classroom.ts */ /* __next_internal_client_entry_do_not_use__ useImportClassroom auto */ 






const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_5__/* .createLogger */ .h)('ImportClassroom');
function useImportClassroom(onSuccess) {
    const [importing, setImporting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle');
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const triggerFileSelect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        fileInputRef.current?.click();
    }, []);
    const handleFileChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        // Reset input so same file can be re-selected
        e.target.value = '';
        setImporting(true);
        setPhase('parsing');
        const toastId = sonner__WEBPACK_IMPORTED_MODULE_1__.toast.loading(t('import.parsing'));
        try {
            // 0. Size check — warn for files over 200MB
            const MAX_SAFE_SIZE = 200 * 1024 * 1024;
            if (file.size > MAX_SAFE_SIZE) {
                log.warn(`Large ZIP file: ${(file.size / 1024 / 1024).toFixed(0)}MB`);
            }
            // 1. Parse ZIP
            const JSZip = (await Promise.all(/* import() */[__webpack_require__.e(49304), __webpack_require__.e(54453)]).then(__webpack_require__.t.bind(__webpack_require__, 54453, 23))).default;
            const zip = await JSZip.loadAsync(file);
            const manifestFile = zip.file('manifest.json');
            if (!manifestFile) {
                sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(t('import.error.invalidManifest'), {
                    id: toastId
                });
                return;
            }
            // 2. Validate
            setPhase('validating');
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.loading(t('import.validating'), {
                id: toastId
            });
            const manifestText = await manifestFile.async('text');
            let manifest;
            try {
                manifest = JSON.parse(manifestText);
            } catch  {
                sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(t('import.error.invalidManifest'), {
                    id: toastId
                });
                return;
            }
            if (!manifest.stage || !manifest.scenes || !Array.isArray(manifest.scenes)) {
                sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(t('import.error.missingData'), {
                    id: toastId
                });
                return;
            }
            // 3. Generate new IDs
            const newStageId = (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)();
            const now = Date.now();
            // Agent ID mapping: index → new ID
            const newAgentIds = (manifest.agents ?? []).map(()=>(0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)());
            const studentAgentIndex = manifest.agents?.findIndex((agent)=>agent.role === 'student') ?? -1;
            const nonTeacherAgentIndex = manifest.agents?.findIndex((agent)=>agent.role !== 'teacher') ?? -1;
            const fallbackDiscussionAgentIndex = studentAgentIndex >= 0 ? studentAgentIndex : nonTeacherAgentIndex >= 0 ? nonTeacherAgentIndex : undefined;
            // Audio ref → new ID mapping
            const audioRefToNewId = {};
            for (const [zipPath, entry] of Object.entries(manifest.mediaIndex ?? {})){
                if (entry.type === 'audio' && !entry.missing) {
                    audioRefToNewId[zipPath] = (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)();
                }
            }
            // Media ref → new ID mapping
            const mediaRefToNewId = {};
            for (const [zipPath, entry] of Object.entries(manifest.mediaIndex ?? {})){
                if ((entry.type === 'generated' || entry.type === 'image') && !entry.missing) {
                    const filename = zipPath.split('/').pop() ?? '';
                    const elementId = filename.replace(/\.\w+$/, '');
                    mediaRefToNewId[zipPath] = (0,_lib_utils_database__WEBPACK_IMPORTED_MODULE_3__.mediaFileKey)(newStageId, elementId);
                }
            }
            // 4. Write media to IndexedDB
            setPhase('writingMedia');
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.loading(t('import.writingMedia'), {
                id: toastId
            });
            // Write audio files one at a time
            for (const [zipPath, newId] of Object.entries(audioRefToNewId)){
                const zipEntry = zip.file(zipPath);
                if (!zipEntry) continue;
                const blob = await zipEntry.async('blob');
                const meta = manifest.mediaIndex[zipPath];
                const record = {
                    id: newId,
                    blob,
                    format: meta.format || 'mp3',
                    duration: meta.duration,
                    voice: meta.voice,
                    createdAt: now
                };
                await _lib_utils_database__WEBPACK_IMPORTED_MODULE_3__.db.audioFiles.put(record);
            }
            // Write generated media files one at a time
            for (const [zipPath, newId] of Object.entries(mediaRefToNewId)){
                const zipEntry = zip.file(zipPath);
                if (!zipEntry) continue;
                const blob = await zipEntry.async('blob');
                const meta = manifest.mediaIndex[zipPath];
                const record = {
                    id: newId,
                    stageId: newStageId,
                    type: meta.mimeType?.startsWith('video/') ? 'video' : 'image',
                    blob,
                    mimeType: meta.mimeType || 'image/jpeg',
                    size: meta.size || blob.size,
                    prompt: meta.prompt || '',
                    params: '',
                    createdAt: now
                };
                // Check for poster before writing to avoid redundant put
                const posterPath = zipPath.replace(/\.\w+$/, '.poster.jpg');
                const posterEntry = zip.file(posterPath);
                if (posterEntry) {
                    record.poster = await posterEntry.async('blob');
                }
                await _lib_utils_database__WEBPACK_IMPORTED_MODULE_3__.db.mediaFiles.put(record);
            }
            // 5. Write course data
            setPhase('writingCourse');
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.loading(t('import.writingCourse'), {
                id: toastId
            });
            // Write stage
            await _lib_utils_database__WEBPACK_IMPORTED_MODULE_3__.db.stages.put({
                id: newStageId,
                name: manifest.stage.name || 'Imported Classroom',
                description: manifest.stage.description,
                languageDirective: manifest.stage.language,
                style: manifest.stage.style,
                createdAt: manifest.stage.createdAt || now,
                updatedAt: now,
                agentIds: newAgentIds.length > 0 ? newAgentIds : undefined
            });
            // Write agents
            if (manifest.agents?.length) {
                const agentRecords = manifest.agents.map((a, i)=>({
                        id: newAgentIds[i],
                        stageId: newStageId,
                        name: a.name,
                        role: a.role,
                        persona: a.persona,
                        avatar: a.avatar,
                        color: a.color,
                        priority: a.priority,
                        createdAt: now
                    }));
                await _lib_utils_database__WEBPACK_IMPORTED_MODULE_3__.db.generatedAgents.bulkPut(agentRecords);
            }
            // Write scenes with rewritten references
            const sceneRecords = manifest.scenes.map((mScene, index)=>{
                const newSceneId = (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)();
                const actions = mScene.actions ? (0,_lib_export_classroom_zip_utils__WEBPACK_IMPORTED_MODULE_4__/* .rewriteAudioRefsToIds */ .C1)(mScene.actions, audioRefToNewId, {
                    agentIds: newAgentIds,
                    fallbackDiscussionAgentIndex
                }) : undefined;
                let multiAgent = undefined;
                if (mScene.multiAgent?.enabled) {
                    multiAgent = {
                        enabled: true,
                        agentIds: (mScene.multiAgent.agentIndices ?? []).map((idx)=>newAgentIds[idx]).filter(Boolean),
                        directorPrompt: mScene.multiAgent.directorPrompt
                    };
                }
                return {
                    id: newSceneId,
                    stageId: newStageId,
                    type: mScene.type,
                    title: mScene.title,
                    order: mScene.order ?? index,
                    content: mScene.content,
                    actions,
                    whiteboard: mScene.whiteboards,
                    multiAgent,
                    createdAt: now,
                    updatedAt: now
                };
            });
            await _lib_utils_database__WEBPACK_IMPORTED_MODULE_3__.db.scenes.bulkPut(sceneRecords);
            // 6. Done
            setPhase('done');
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.success(t('import.success'), {
                id: toastId
            });
            onSuccess?.();
        } catch (error) {
            log.error('Classroom ZIP import failed:', error);
            const isQuotaError = error instanceof DOMException && error.name === 'QuotaExceededError';
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(isQuotaError ? t('import.error.storageFull') : t('import.error.invalidZip'), {
                id: toastId
            });
        } finally{
            setImporting(false);
            setPhase('idle');
        }
    }, [
        t,
        onSuccess
    ]);
    return {
        importing,
        phase,
        fileInputRef,
        triggerFileSelect,
        handleFileChange
    };
}


/***/ }),

/***/ 77461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ GeneralSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65891);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(92571);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils_database__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29732);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(66609);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7603);
/* __next_internal_client_entry_do_not_use__ GeneralSettings auto */ 










const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_9__/* .createLogger */ .h)('GeneralSettings');
function GeneralSettings() {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    // Clear cache state
    const [showClearDialog, setShowClearDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [confirmInput, setConfirmInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [clearing, setClearing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const confirmPhrase = t('settings.clearCacheConfirmPhrase');
    const isConfirmValid = confirmInput === confirmPhrase;
    const handleClearCache = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!isConfirmValid) return;
        setClearing(true);
        try {
            // 1. Clear IndexedDB
            await (0,_lib_utils_database__WEBPACK_IMPORTED_MODULE_7__.clearDatabase)();
            // 2. Clear localStorage
            localStorage.clear();
            // 3. Clear sessionStorage
            sessionStorage.clear();
            sonner__WEBPACK_IMPORTED_MODULE_8__.toast.success(t('settings.clearCacheSuccess'));
            // Reload page after a short delay
            setTimeout(()=>{
                window.location.reload();
            }, 1000);
        } catch (error) {
            log.error('Failed to clear cache:', error);
            sonner__WEBPACK_IMPORTED_MODULE_8__.toast.error(t('settings.clearCacheFailed'));
            setClearing(false);
        }
    }, [
        isConfirmValid,
        t
    ]);
    const clearCacheItems = t('settings.clearCacheConfirmItems').split('、').length > 1 ? t('settings.clearCacheConfirmItems').split('、') : t('settings.clearCacheConfirmItems').split(', ');
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-8",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative rounded-xl border border-destructive/30 bg-destructive/[0.03] dark:bg-destructive/[0.06] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none",
                        style: {
                            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              currentColor 10px,
              currentColor 11px
            )`
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative p-4 space-y-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "p-1.5 rounded-md bg-destructive/10 text-destructive",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-sm font-semibold text-destructive",
                                        children: t('settings.dangerZone')
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-sm font-medium",
                                                children: t('settings.clearCache')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs text-muted-foreground mt-0.5 leading-relaxed",
                                                children: t('settings.clearCacheDescription')
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                        variant: "destructive",
                                        size: "sm",
                                        className: "shrink-0",
                                        onClick: ()=>{
                                            setConfirmInput('');
                                            setShowClearDialog(true);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            t('settings.clearCache')
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialog */ .Lt, {
                open: showClearDialog,
                onOpenChange: (open)=>{
                    if (!clearing) {
                        setShowClearDialog(open);
                        if (!open) setConfirmInput('');
                    }
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogContent */ .EO, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogTitle */ .r7, {
                                    className: "flex items-center gap-2 text-destructive",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            className: "w-5 h-5"
                                        }),
                                        t('settings.clearCacheConfirmTitle')
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogDescription */ .$v, {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                children: t('settings.clearCacheConfirmDescription')
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
                                                className: "space-y-1.5 ml-1",
                                                children: clearCacheItems.map((item, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                        className: "flex items-center gap-2 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0"
                                                            }),
                                                            item.trim()
                                                        ]
                                                    }, i))
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "pt-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                                        className: "text-xs font-medium text-foreground",
                                                        children: t('settings.clearCacheConfirmInput')
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                        className: "mt-1.5 h-9 text-sm",
                                                        placeholder: confirmPhrase,
                                                        value: confirmInput,
                                                        onChange: (e)=>setConfirmInput(e.target.value),
                                                        onKeyDown: (e)=>{
                                                            if (e.key === 'Enter' && isConfirmValid) {
                                                                handleClearCache();
                                                            }
                                                        },
                                                        autoFocus: true
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogCancel */ .Zr, {
                                    disabled: clearing,
                                    children: t('common.cancel')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                    variant: "destructive",
                                    disabled: !isConfirmValid || clearing,
                                    onClick: handleClearCache,
                                    children: [
                                        clearing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-4 h-4 mr-1.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Loader2_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                            className: "w-4 h-4 mr-1.5"
                                        }),
                                        t('settings.clearCacheButton')
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

/***/ 79358:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sN: () => (/* binding */ clearAllForScene)
/* harmony export */ });
/* unused harmony exports DRAFT_KEY_PREFIX, ANSWERS_KEY_PREFIX, RESULTS_KEY_PREFIX, draftKey, readSubmittedState, readAnswersForSummary, writeSubmittedAnswers, writeSubmittedResults, clearSubmitted */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/quiz/persistence.ts
 *
 * Verbatim port — pure localStorage helpers, no external deps.
 */ const DRAFT_KEY_PREFIX = 'quizDraft:';
const ANSWERS_KEY_PREFIX = 'quizAnswers:';
const RESULTS_KEY_PREFIX = 'quizResults:';
const draftKey = (sceneId)=>DRAFT_KEY_PREFIX + sceneId;
function safeGet(key) {
    if (false) {}
    try {
        return localStorage.getItem(key);
    } catch  {
        return null;
    }
}
function safeSet(key, value) {
    if (false) {}
    try {
        localStorage.setItem(key, value);
    } catch  {
    /* ignore */ }
}
function safeRemove(key) {
    if (false) {}
    try {
        localStorage.removeItem(key);
    } catch  {
    /* ignore */ }
}
function readSubmittedState(sceneId) {
    const rawA = safeGet(ANSWERS_KEY_PREFIX + sceneId);
    if (!rawA) return null;
    try {
        const answers = JSON.parse(rawA);
        const rawR = safeGet(RESULTS_KEY_PREFIX + sceneId);
        if (rawR) {
            const results = JSON.parse(rawR);
            if (Array.isArray(results) && results.length > 0) {
                return {
                    kind: 'reviewing',
                    answers,
                    results
                };
            }
        }
        return {
            kind: 'answering',
            answers
        };
    } catch  {
        return null;
    }
}
function readAnswersForSummary(sceneId) {
    const rawA = safeGet(ANSWERS_KEY_PREFIX + sceneId);
    if (rawA) {
        try {
            return JSON.parse(rawA);
        } catch  {
        /* fall through */ }
    }
    const rawD = safeGet(DRAFT_KEY_PREFIX + sceneId);
    if (rawD) {
        try {
            return JSON.parse(rawD);
        } catch  {
        /* fall through */ }
    }
    return {};
}
function writeSubmittedAnswers(sceneId, answers) {
    safeSet(ANSWERS_KEY_PREFIX + sceneId, JSON.stringify(answers));
}
function writeSubmittedResults(sceneId, results) {
    safeSet(RESULTS_KEY_PREFIX + sceneId, JSON.stringify(results));
}
function clearSubmitted(sceneId) {
    safeRemove(ANSWERS_KEY_PREFIX + sceneId);
    safeRemove(RESULTS_KEY_PREFIX + sceneId);
}
function clearAllForScene(sceneId) {
    safeRemove(DRAFT_KEY_PREFIX + sceneId);
    safeRemove(ANSWERS_KEY_PREFIX + sceneId);
    safeRemove(RESULTS_KEY_PREFIX + sceneId);
}


/***/ }),

/***/ 84744:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useASRAvailable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75748);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33157);
/* __next_internal_client_entry_do_not_use__ useASRAvailable auto */ 


// Web Speech API support is constant per environment, so subscribing is a no-op.
const subscribe = ()=>()=>{};
const getBrowserSpeechSupported = ()=>!!(window.SpeechRecognition || window.webkitSpeechRecognition);
/**
 * Single source of truth for "can the user use ASR right now".
 *
 * Combines the three things that gate speech input:
 * - the global on/off toggle (`asrEnabled`),
 * - whether the selected provider is actually usable (keyless, has a client
 *   key, or is server-managed — mirrors the `cfgOk` check in media-popover),
 * - and, for `browser-native`, whether the browser supports the Web Speech API.
 *
 * Consumed by `SpeechButton` so every call site is gated uniformly instead of
 * each one having to remember to wire the toggle through a `disabled` prop.
 */ function useASRAvailable() {
    const asrEnabled = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_1__.useSettingsStore)((s)=>s.asrEnabled);
    const asrProviderId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_1__.useSettingsStore)((s)=>s.asrProviderId);
    const providerConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_1__.useSettingsStore)((s)=>s.asrProvidersConfig[s.asrProviderId]);
    // SSR-safe Web Speech support check: the server snapshot assumes supported so
    // the button is never falsely disabled before hydration.
    const browserSpeechSupported = (0,react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore)(subscribe, getBrowserSpeechSupported, ()=>true);
    const builtIn = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_2__/* .ASR_PROVIDERS */ .Co[asrProviderId];
    const requiresKey = builtIn ? builtIn.requiresApiKey : providerConfig?.requiresApiKey ?? true;
    // Trim to match what the recorder actually sends — a whitespace-only key is
    // dropped at request time, so it must not count as configured here.
    const keyOk = !requiresKey || !!providerConfig?.apiKey?.trim() || !!providerConfig?.isServerConfigured;
    // Custom providers are unusable until at least one model is configured
    // (mirrors the media-popover listing rule that hides model-less customs).
    const modelOk = !!builtIn || (providerConfig?.customModels?.length ?? 0) > 0;
    const browserOk = asrProviderId !== 'browser-native' || browserSpeechSupported;
    return asrEnabled && keyOk && modelOk && browserOk;
}


/***/ }),

/***/ 85734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ WebSearchSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_switch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21084);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75748);
/* harmony import */ var _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50672);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_ExternalLink_Eye_EyeOff_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1275);
/* __next_internal_client_entry_do_not_use__ WebSearchSettings auto */ 








function WebSearchSettings({ selectedProviderId }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__/* .useI18n */ .s)();
    const [showApiKey, setShowApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const webSearchProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.webSearchProvidersConfig);
    const setWebSearchProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.setWebSearchProviderConfig);
    const baiduSubSources = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.baiduSubSources);
    const setBaiduSubSources = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_6__.useSettingsStore)((state)=>state.setBaiduSubSources);
    const provider = _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_7__/* .WEB_SEARCH_PROVIDERS */ .Vf[selectedProviderId];
    const isServerConfigured = !!webSearchProvidersConfig[selectedProviderId]?.isServerConfigured;
    // Managed providers are admin-owned: hide the key/base-URL override inputs.
    const showCredentialFields = !isServerConfigured;
    const buildRequestUrl = (baseUrl)=>{
        const trimmed = baseUrl.replace(/\/$/, '');
        if (!provider.endpointPath) return trimmed;
        if (trimmed.endsWith(provider.endpointPath)) return trimmed;
        return `${trimmed}${provider.endpointPath}`;
    };
    // Reset showApiKey when provider changes (derived state pattern)
    const [prevSelectedProviderId, setPrevSelectedProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(selectedProviderId);
    if (selectedProviderId !== prevSelectedProviderId) {
        setPrevSelectedProviderId(selectedProviderId);
        setShowApiKey(false);
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6 max-w-3xl",
        children: [
            isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300",
                children: t('settings.serverConfiguredNotice')
            }),
            !provider.requiresApiKey && !isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-3 text-sm text-amber-700 dark:text-amber-300",
                children: t('settings.webSearchApiKeyOptional')
            }),
            showCredentialFields && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: t('settings.webSearchApiKey')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                name: `web-search-api-key-${selectedProviderId}`,
                                                type: showApiKey ? 'text' : 'password',
                                                autoComplete: "new-password",
                                                autoCapitalize: "none",
                                                autoCorrect: "off",
                                                spellCheck: false,
                                                placeholder: !provider.requiresApiKey ? t('settings.optionalOverride') : t('settings.enterApiKey'),
                                                value: webSearchProvidersConfig[selectedProviderId]?.apiKey || '',
                                                onChange: (e)=>setWebSearchProviderConfig(selectedProviderId, {
                                                        apiKey: e.target.value
                                                    }),
                                                className: "font-mono text-sm pr-10"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setShowApiKey(!showApiKey),
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: t('settings.webSearchApiKeyHint')
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                        className: "text-sm",
                                        children: t('settings.webSearchBaseUrl')
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                        name: `web-search-base-url-${selectedProviderId}`,
                                        autoComplete: "off",
                                        autoCapitalize: "none",
                                        autoCorrect: "off",
                                        spellCheck: false,
                                        placeholder: provider.defaultBaseUrl || '',
                                        value: webSearchProvidersConfig[selectedProviderId]?.baseUrl || '',
                                        onChange: (e)=>setWebSearchProviderConfig(selectedProviderId, {
                                                baseUrl: e.target.value
                                            }),
                                        className: "text-sm"
                                    })
                                ]
                            })
                        ]
                    }),
                    (()=>{
                        const effectiveBaseUrl = webSearchProvidersConfig[selectedProviderId]?.baseUrl || provider.defaultBaseUrl || '';
                        if (!effectiveBaseUrl) return null;
                        const fullUrl = buildRequestUrl(effectiveBaseUrl);
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-xs text-muted-foreground break-all",
                            children: [
                                t('settings.requestUrl'),
                                ": ",
                                fullUrl
                            ]
                        });
                    })()
                ]
            }),
            selectedProviderId === 'baidu' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                className: "text-sm",
                                children: t('settings.baiduSubSources')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: t('settings.baiduSubSourcesDescription')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-2",
                        children: Object.entries(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_7__/* .BAIDU_SUB_SOURCES */ ._m).map(([key, meta])=>{
                            const enabled = baiduSubSources[key];
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between gap-4 rounded-md border px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "min-w-0 space-y-0.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-sm font-medium",
                                                children: t(meta.labelKey)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-xs text-muted-foreground",
                                                children: [
                                                    t(meta.descriptionKey),
                                                    meta.docsUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                        href: meta.docsUrl,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "inline-flex items-center gap-0.5 ml-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline",
                                                        children: [
                                                            t('settings.viewDocs'),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ExternalLink_Eye_EyeOff_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                                className: "h-3 w-3"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_switch__WEBPACK_IMPORTED_MODULE_4__/* .Switch */ .d, {
                                        checked: enabled,
                                        onCheckedChange: (checked)=>setBaiduSubSources({
                                                [key]: checked
                                            }),
                                        "aria-label": t(meta.labelKey)
                                    })
                                ]
                            }, key);
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 87204:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   vF: () => (/* binding */ shouldShowVocationalTestUi)
/* harmony export */ });
/* unused harmony exports isMaicEditorEnabled, isVocationalTaskEngineEnabled, resolveVocationalActive */
/* provided dependency */ var process = __webpack_require__(41463);
/**
 * Feature flags. Public flags come from `NEXT_PUBLIC_*` env vars, which
 * Next.js inlines at build time so they are safe to read from client
 * components. Server-only flags must not use the `NEXT_PUBLIC_` prefix.
 *
 * Truthy values: `'true'` or `'1'`. Anything else (including unset) is
 * treated as disabled.
 */ function readBoolean(envValue) {
    return envValue === 'true' || envValue === '1';
}
/**
 * MAIC Editor (Pro mode) gate. Default OFF — gates only the Pro toggle
 * affordance in `Header`. The `StageMode` type union is unaffected so
 * existing code paths typecheck identically with the flag in either
 * state.
 */ function isMaicEditorEnabled() {
    return readBoolean(process.env.NEXT_PUBLIC_MAIC_EDITOR_ENABLED);
}
/**
 * Server-authoritative gate for the vocational task-engine generation path.
 * Default OFF. When disabled, requests that include taskEngineMode must
 * silently fall back to the ordinary standard / interactive generation paths.
 */ function isVocationalTaskEngineEnabled() {
    return readBoolean(process.env.OPENMAIC_ENABLE_VOCATIONAL);
}
function resolveVocationalActive(requirements) {
    return Boolean(requirements?.taskEngineMode) && isVocationalTaskEngineEnabled();
}
/**
 * Optional client-only affordance for exposing the experimental vocational
 * test toggle. This is not a security or routing gate.
 */ function shouldShowVocationalTestUi() {
    return readBoolean(process.env.NEXT_PUBLIC_SHOW_VOCATIONAL_TEST_UI);
}


/***/ }),

/***/ 88364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ ImageSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28276);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(71442);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(75748);
/* harmony import */ var _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(81301);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(66763);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(25879);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ ImageSettings auto */ 










function ImageSettings({ selectedProviderId }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_6__/* .useI18n */ .s)();
    const imageModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.imageModelId);
    const imageProvidersConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.imageProvidersConfig);
    const _setImageModelId = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.setImageModelId);
    const setImageProviderConfig = (0,_lib_store_settings__WEBPACK_IMPORTED_MODULE_7__.useSettingsStore)((state)=>state.setImageProviderConfig);
    const [showApiKey, setShowApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [testLoading, setTestLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [testStatus, setTestStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [testMessage, setTestMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Model dialog state
    const [showModelDialog, setShowModelDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editingModelIndex, setEditingModelIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [modelForm, setModelForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        id: '',
        name: ''
    });
    // Reset test state when provider changes (derived state pattern)
    const [prevSelectedProviderId, setPrevSelectedProviderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(selectedProviderId);
    if (selectedProviderId !== prevSelectedProviderId) {
        setPrevSelectedProviderId(selectedProviderId);
        setTestStatus('idle');
        setTestMessage('');
    }
    const currentConfig = imageProvidersConfig[selectedProviderId];
    const currentProvider = _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_8__/* .IMAGE_PROVIDERS */ .D[selectedProviderId];
    const builtInModels = currentProvider?.models || [];
    const customModels = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>currentConfig?.customModels || [], [
        currentConfig?.customModels
    ]);
    const isServerConfigured = !!currentConfig?.isServerConfigured;
    const requiresApiKey = currentProvider?.requiresApiKey ?? true;
    const handleApiKeyChange = (apiKey)=>{
        setImageProviderConfig(selectedProviderId, {
            apiKey
        });
    };
    const handleBaseUrlChange = (baseUrl)=>{
        setImageProviderConfig(selectedProviderId, {
            baseUrl
        });
    };
    const handleTest = async ()=>{
        setTestLoading(true);
        setTestStatus('idle');
        setTestMessage('');
        try {
            const response = await fetch('/api/verify-image-provider', {
                method: 'POST',
                headers: {
                    'x-image-provider': selectedProviderId,
                    'x-image-model': imageModelId || '',
                    'x-api-key': currentConfig?.apiKey || '',
                    'x-base-url': currentConfig?.baseUrl || ''
                }
            });
            const data = await response.json();
            if (data.success) {
                setTestStatus('success');
                setTestMessage(t('settings.imageConnectivitySuccess'));
            } else {
                setTestStatus('error');
                setTestMessage(`${t('settings.imageConnectivityFailed')}: ${data.message}`);
            }
        } catch (err) {
            setTestStatus('error');
            setTestMessage(`${t('settings.imageConnectivityFailed')}: ${err}`);
        } finally{
            setTestLoading(false);
        }
    };
    // Model CRUD
    const handleOpenAddModel = ()=>{
        setEditingModelIndex(null);
        setModelForm({
            id: '',
            name: ''
        });
        setShowModelDialog(true);
    };
    const handleOpenEditModel = (index)=>{
        setEditingModelIndex(index);
        setModelForm({
            ...customModels[index]
        });
        setShowModelDialog(true);
    };
    const handleSaveModel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!modelForm.id.trim()) return;
        const newCustomModels = [
            ...customModels
        ];
        if (editingModelIndex !== null) {
            newCustomModels[editingModelIndex] = {
                id: modelForm.id.trim(),
                name: modelForm.name.trim() || modelForm.id.trim()
            };
        } else {
            newCustomModels.push({
                id: modelForm.id.trim(),
                name: modelForm.name.trim() || modelForm.id.trim()
            });
        }
        setImageProviderConfig(selectedProviderId, {
            customModels: newCustomModels
        });
        setShowModelDialog(false);
    }, [
        modelForm,
        editingModelIndex,
        customModels,
        selectedProviderId,
        setImageProviderConfig
    ]);
    const handleDeleteModel = (index)=>{
        const newCustomModels = customModels.filter((_, i)=>i !== index);
        setImageProviderConfig(selectedProviderId, {
            customModels: newCustomModels
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6 max-w-3xl",
        children: [
            isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300",
                children: t('settings.serverConfiguredNotice')
            }),
            !isServerConfigured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                children: "API Key"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative flex-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                                name: `image-api-key-${selectedProviderId}`,
                                                type: showApiKey ? 'text' : 'password',
                                                autoComplete: "new-password",
                                                autoCapitalize: "none",
                                                autoCorrect: "off",
                                                spellCheck: false,
                                                placeholder: t('settings.enterApiKey'),
                                                value: currentConfig?.apiKey || '',
                                                onChange: (e)=>handleApiKeyChange(e.target.value),
                                                className: "h-8 pr-8"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setShowApiKey(!showApiKey),
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                                children: showApiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: handleTest,
                                        disabled: testLoading || requiresApiKey && !currentConfig?.apiKey,
                                        className: "gap-1.5",
                                        children: testLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                            className: "h-3.5 w-3.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5"
                                                }),
                                                t('settings.testConnection')
                                            ]
                                        })
                                    })
                                ]
                            }),
                            testMessage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_13__.cn)('rounded-lg p-3 text-sm overflow-hidden', testStatus === 'success' && 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800', testStatus === 'error' && 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800'),
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-2 min-w-0",
                                    children: [
                                        testStatus === 'success' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                            className: "h-4 w-4 mt-0.5 shrink-0"
                                        }),
                                        testStatus === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "h-4 w-4 mt-0.5 shrink-0"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "flex-1 min-w-0 break-all",
                                            children: testMessage
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                children: "Base URL"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                name: `image-base-url-${selectedProviderId}`,
                                type: "url",
                                autoComplete: "off",
                                autoCapitalize: "none",
                                autoCorrect: "off",
                                spellCheck: false,
                                value: currentConfig?.baseUrl || '',
                                onChange: (e)=>handleBaseUrlChange(e.target.value),
                                placeholder: currentProvider?.defaultBaseUrl || t('settings.enterCustomBaseUrl'),
                                className: "h-8"
                            }),
                            (()=>{
                                const effectiveBaseUrl = currentConfig?.baseUrl || currentProvider?.defaultBaseUrl || '';
                                if (!effectiveBaseUrl) return null;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-xs text-muted-foreground break-all",
                                    children: [
                                        t('settings.requestUrl'),
                                        ": ",
                                        effectiveBaseUrl
                                    ]
                                });
                            })()
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                className: "text-base",
                                children: t('settings.models')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                variant: "outline",
                                size: "sm",
                                onClick: handleOpenAddModel,
                                className: "gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    t('settings.addNewModel')
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                            builtInModels.map((model)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "font-mono text-sm font-medium",
                                                children: model.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "text-xs text-muted-foreground font-mono mt-0.5",
                                                children: model.id
                                            })
                                        ]
                                    })
                                }, model.id)),
                            customModels.map((model, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "font-mono text-sm font-medium",
                                                    children: model.name
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-xs text-muted-foreground font-mono mt-0.5",
                                                    children: model.id
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "h-8 px-2",
                                                    onClick: ()=>handleOpenEditModel(index),
                                                    title: t('settings.editModel'),
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                        className: "h-3.5 w-3.5"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                                                    onClick: ()=>handleDeleteModel(index),
                                                    title: t('settings.deleteModel'),
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Eye_EyeOff_Loader2_Plus_Settings2_Trash2_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                        className: "h-3.5 w-3.5"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }, `custom-${index}`))
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .Dialog */ .lG, {
                open: showModelDialog,
                onOpenChange: setShowModelDialog,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogTitle */ .L3, {
                            children: editingModelIndex !== null ? t('settings.editModel') : t('settings.addNewModel')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogDescription */ .rr, {
                            className: "sr-only",
                            children: editingModelIndex !== null ? t('settings.editModel') : t('settings.addNewModel')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 pt-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                            children: t('settings.modelId')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                            value: modelForm.id,
                                            onChange: (e)=>setModelForm((prev)=>({
                                                        ...prev,
                                                        id: e.target.value
                                                    })),
                                            placeholder: "e.g. my-custom-model-v1",
                                            className: "h-8 font-mono text-sm"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .J, {
                                            children: t('settings.modelName')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_3__/* .Input */ .p, {
                                            value: modelForm.name,
                                            onChange: (e)=>setModelForm((prev)=>({
                                                        ...prev,
                                                        name: e.target.value
                                                    })),
                                            placeholder: "e.g. My Custom Model",
                                            className: "h-8 text-sm"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-end gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: ()=>setShowModelDialog(false),
                                            children: t('settings.cancelEdit')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .$, {
                                            size: "sm",
                                            onClick: handleSaveModel,
                                            disabled: !modelForm.id.trim(),
                                            children: t('settings.saveModel')
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

/***/ 92425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ AccessCodeModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78235);
/* harmony import */ var motion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15696);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71442);
/* harmony import */ var _barrel_optimize_names_ArrowRight_LoaderCircle_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50981);
/* harmony import */ var _barrel_optimize_names_ArrowRight_LoaderCircle_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ArrowRight_LoaderCircle_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(90467);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/access-code-modal.tsx
 *
 * Verbatim port.
 */ /* __next_internal_client_entry_do_not_use__ AccessCodeModal auto */ 




function AccessCodeModal({ open, onSuccess }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_2__/* .useI18n */ .s)();
    const [code, setCode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [
        open
    ]);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!code || loading) return;
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/access-code/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code
                })
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(onSuccess, 600);
            } else {
                setError(t('accessCode.error'));
                setCode('');
                inputRef.current?.focus();
            }
        } catch  {
            setError(t('accessCode.error'));
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .AnimatePresence */ .N, {
        children: open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
            className: "fixed inset-0 z-[200] flex items-center justify-center overflow-hidden",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "absolute inset-0 bg-background",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "absolute inset-0 opacity-30 dark:opacity-20",
                            style: {
                                backgroundImage: `
                  radial-gradient(ellipse 80% 60% at 20% 40%, var(--primary) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 80% at 80% 20%, oklch(0.6 0.15 280) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 50% at 60% 80%, oklch(0.5 0.12 300) 0%, transparent 50%)
                `
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "absolute inset-0 opacity-[0.03] dark:opacity-[0.05]",
                            style: {
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                backgroundSize: '128px 128px'
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
                    className: "relative z-10 w-full max-w-sm mx-4",
                    initial: {
                        opacity: 0,
                        y: 20,
                        scale: 0.96
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: -20,
                        scale: 0.96
                    },
                    transition: {
                        duration: 0.4,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl border border-border/50 bg-card/80 p-8 shadow-xl shadow-black/5 backdrop-blur-xl dark:bg-card/60 dark:shadow-black/20",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
                                className: "mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10",
                                initial: {
                                    scale: 0.5,
                                    opacity: 0
                                },
                                animate: {
                                    scale: 1,
                                    opacity: 1
                                },
                                transition: {
                                    delay: 0.15,
                                    duration: 0.4,
                                    ease: [
                                        0.16,
                                        1,
                                        0.3,
                                        1
                                    ]
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_LoaderCircle_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                    className: "h-7 w-7 text-primary",
                                    strokeWidth: 1.5
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.h1, {
                                className: "mb-1 text-center text-lg font-semibold tracking-tight text-foreground",
                                initial: {
                                    opacity: 0,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.2,
                                    duration: 0.4
                                },
                                children: t('accessCode.title')
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.p, {
                                className: "mb-6 text-center text-sm text-muted-foreground",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 0.25,
                                    duration: 0.4
                                },
                                children: "OpenMAIC"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.form, {
                                onSubmit: handleSubmit,
                                className: "space-y-4",
                                initial: {
                                    opacity: 0,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.3,
                                    duration: 0.4
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                ref: inputRef,
                                                type: "password",
                                                placeholder: t('accessCode.placeholder'),
                                                value: code,
                                                onChange: (e)=>{
                                                    setCode(e.target.value);
                                                    if (error) setError('');
                                                },
                                                className: `
                      w-full rounded-xl border bg-background/60 px-4 py-3 pr-12 text-sm
                      outline-none transition-all duration-200
                      placeholder:text-muted-foreground/50
                      focus:border-primary/40 focus:ring-2 focus:ring-primary/10
                      ${error ? 'border-destructive/50 focus:border-destructive/50 focus:ring-destructive/10' : 'border-border/60'}
                    `,
                                                disabled: loading || success,
                                                autoComplete: "off"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "submit",
                                                disabled: !code || loading || success,
                                                className: `
                      absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center
                      justify-center rounded-lg transition-all duration-200
                      ${code && !loading && !success ? 'bg-primary text-primary-foreground hover:opacity-90 cursor-pointer' : 'text-muted-foreground/30 cursor-default'}
                    `,
                                                children: loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_LoaderCircle_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                    className: "h-4 w-4 animate-spin"
                                                }) : success ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.div, {
                                                    initial: {
                                                        scale: 0
                                                    },
                                                    animate: {
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        type: 'spring',
                                                        stiffness: 300,
                                                        damping: 20
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_LoaderCircle_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                        className: "h-4 w-4 text-emerald-500"
                                                    })
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_LoaderCircle_ShieldCheck_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                    className: "h-4 w-4"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_3__/* .AnimatePresence */ .N, {
                                        mode: "wait",
                                        children: error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_4__/* .motion */ .PY1.p, {
                                            className: "text-center text-sm text-destructive",
                                            initial: {
                                                opacity: 0,
                                                y: -4,
                                                height: 0
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0,
                                                height: 'auto'
                                            },
                                            exit: {
                                                opacity: 0,
                                                y: -4,
                                                height: 0
                                            },
                                            transition: {
                                                duration: 0.2
                                            },
                                            children: error
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 92940:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m6: () => (/* binding */ clearPlaybackState)
/* harmony export */ });
/* unused harmony exports savePlaybackState, loadPlaybackState */
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29732);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/playback-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is now the real port (Dexie-backed),
 * so playback-state persistence is fully functional.
 */ 
/**
 * Save playback state for a stage.
 */ async function savePlaybackState(stageId, snapshot) {
    const record = {
        stageId,
        sceneIndex: snapshot.sceneIndex,
        actionIndex: snapshot.actionIndex,
        consumedDiscussions: snapshot.consumedDiscussions,
        updatedAt: Date.now()
    };
    await db.playbackState.put(record);
}
/**
 * Load playback state for a stage.
 */ async function loadPlaybackState(stageId) {
    const record = await db.playbackState.get(stageId);
    if (!record) return null;
    return {
        sceneIndex: record.sceneIndex,
        actionIndex: record.actionIndex,
        consumedDiscussions: record.consumedDiscussions ?? []
    };
}
/**
 * Clear playback state for a stage.
 */ async function clearPlaybackState(stageId) {
    await _database__WEBPACK_IMPORTED_MODULE_0__.db.playbackState.delete(stageId);
}


/***/ }),

/***/ 93315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ stripMarkdownForTTS)
/* harmony export */ });
/**
 * Markdown → plain-speech text sanitizer for TTS.
 *
 * Problem (Task 51): LLM-generated narration/discussion text is markdown
 * (`**bold**`, `# headings`, `- bullets`, links, tables...). Every TTS entry
 * point used to pass that text through verbatim, so the narrator audibly read
 * the syntax ("asterisk asterisk ... hash hash ...").
 *
 * This module converts markdown narration to clean speakable text. It is a
 * PURE isomorphic function (no client/server imports) so it can be applied at
 * every choke point:
 *   - server:  `generateTTS()` in tts-providers.ts (all providers, all routes)
 *   - browser: use-browser-tts.speak(), playBrowserTTSPreview(), useAgentVoice
 *   - client→server bodies: stage-tts-client.synthesizeStageTTS()
 *
 * Design notes:
 *  - Idempotent: output contains no markdown markers, so re-running is a no-op
 *    (double-sanitize across client + server is safe).
 *  - Conservative: emphasis pairs require whitespace/punctuation boundaries so
 *    legitimate text like `5 * 3` or `snake_case` is never eaten.
 *  - Ordered: structural constructs (fences, links, images, headings) are
 *    removed before inline emphasis so markers inside them don't leak.
 *  - Ordered-list markers ("1.") are KEPT (they carry meaning when spoken);
 *    bullet markers ("- ", "* ") are stripped (TTS reads them as "dash").
 */ /** Remove HTML comments (multi-line safe). */ function stripHtmlComments(text) {
    return text.replace(/<!--[\s\S]*?-->/g, '');
}
/**
 * Strip fenced code blocks, keeping the inner code as speakable text.
 * Two-step (order matters):
 *   1. drop bare fence-marker lines (`` ``` `` alone on a line — i.e. closers
 *      and bare openers);
 *   2. drop opener lines including their language tag ("```python\n").
 * Content between them is kept so code narration still speaks the code.
 */ function stripCodeFences(text) {
    return text.replace(/^[ \t]*(`{3,}|~{3,})[ \t]*$/gm, '').replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n/gm, '');
}
/** Headings: leading ATX marker(s) and trailing closers. "## T ##" → "T". */ function stripHeadingMarkers(text) {
    return text.split('\n').map((line)=>line.replace(/^[ \t]{0,3}#{1,6}[ \t]+/, '').replace(/[ \t]+#{1,6}[ \t]*$/, '')).join('\n');
}
/** Remove setext heading underlines ("===" / "---" lines). */ function stripSetextUnderlines(text) {
    return text.replace(/^[ \t]*(-{3,}|={3,})[ \t]*$/gm, '');
}
/** Remove horizontal rules (already partially covered by setext pass). */ function stripHorizontalRules(text) {
    return text.replace(/^[ \t]{0,3}([-*_])[ \t]*\1[ \t]*\1[\s\S]*?$/gm, '');
}
/**
 * Inline: images → removed, links → keep label only, reference definitions →
 * removed, footnotes → removed.
 */ function stripLinksAndImages(text) {
    return text// images ![alt](url) — never speak the alt or the URL
    .replace(/!\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '')// links [label](url) → label
    .replace(/\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '$1')// reference-style link definitions at line start → drop the whole line
    .replace(/^[ \t]*\[([^\]]+)\]:[ \t]*\S+.*$/gm, '')// footnotes [^1] (inline refs and definitions)
    .replace(/\[\^[^\]]+\]/g, '')// leftover empty link labels `[](url)` were handled above; bare `[]`
    // pairs left by image removal inside links → drop
    .replace(/^\[\]$/gm, '');
}
/**
 * Inline emphasis: `**bold**`, `__bold__`, `*italic*`, `_italic_`, `~~strike~~`,
 * and inline code backticks. Single-char markers require non-word boundaries on
 * both sides so `5 * 3`, `snake_case`, `a_b` survive untouched.
 */ function stripInlineEmphasisAndCode(text) {
    return text// double-backtick inline code first (``x``)
    .replace(/``([^`]+)``/g, '$1')// single-backtick inline code
    .replace(/`([^`\n]+)`/g, '$1')// strikethrough
    .replace(/~~([^~\n]+)~~/g, '$1')// bold ** ** (allow intraword — real narration bold is word-level)
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')// bold __ __ — CommonMark semantics: "Run __init__ first" IS strong
    // emphasis (space-flanked); dunders only survive inside code spans.
    .replace(/(^|[^\w\\])__([^_\n]+)__(?!\w)/g, '$1$2')// italic * * — boundaries required (protects "5 * 3", "a*b*c" math)
    .replace(/(^|[^\w\\*])\*(?=\S)([^*\n]*[^\s\*])\*(?![\w*])/g, '$1$2')// italic _ _ — boundaries required (protects snake_case)
    .replace(/(^|[^\w\\])_(?=\S)([^_\n]*[^\s_])_(?![\w])/g, '$1$2');
}
/**
 * Blockquotes: strip the leading ">" markers (handles nested ">>" — one or
 * more markers per line). NOTE: exactly ONE ">" in the pattern after the
 * optional space — a second ">" would require nested quotes to match.
 */ function stripBlockquotes(text) {
    return text.replace(/^[ \t]{0,3}(?:>[ \t]?)+/gm, '');
}
/** Bullets: "- ", "* ", "+ " at line start → drop the marker (keep the text). */ function stripBulletMarkers(text) {
    return text.replace(/^([ \t]*)[-*+][ \t]+/gm, '$1');
}
/**
 * Tables: drop separator rows (|---|---|) together with their newline, then
 * per line trim the edge pipes and turn inner pipes into comma pauses so
 * cell content still reads naturally.
 */ function stripTables(text) {
    const withoutSeparators = text.replace(/^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?[ \t]*(?:\r?\n|$)/gm, '');
    return withoutSeparators.split('\n').map((line)=>line.replace(/^[ \t]*\|[ \t]*/, '').replace(/[ \t]*\|[ \t]*$/, '').replace(/[ \t]*\|[ \t]*/g, ', ').replace(/,[ \t]*,[ \t]*/g, ', ')).join('\n');
}
/** Remove HTML tags (narration occasionally carries <b>, <br>, <sub>...). */ function stripHtmlTags(text) {
    return text.replace(/<\/?[a-zA-Z][^>]*>/g, '');
}
/** Backslash escapes: `\*` → `*` (the literal char is the speakable form). */ function unescapeBackslashes(text) {
    return text.replace(/\\([\\`*_{}[\]()#+\-.!>~|])/g, '$1');
}
/** Collapse 3+ blank lines to one; trim each line; trim overall. */ function normalizeWhitespace(text) {
    return text.split('\n').map((line)=>line.replace(/[ \t]{2,}/g, ' ').trimEnd()).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
/**
 * Convert markdown narration text to clean, speakable plain text.
 * Idempotent and order-stable; safe for CJK and Latin content alike.
 */ function stripMarkdownForTTS(text) {
    if (!text) return text;
    let out = text;
    out = stripHtmlComments(out);
    out = stripCodeFences(out);
    out = stripLinksAndImages(out);
    out = stripHeadingMarkers(out);
    out = stripSetextUnderlines(out);
    out = stripHorizontalRules(out);
    out = stripBlockquotes(out);
    out = stripBulletMarkers(out);
    out = stripTables(out);
    out = stripInlineEmphasisAndCode(out);
    out = stripHtmlTags(out);
    out = unescapeBackslashes(out);
    out = normalizeWhitespace(out);
    return out;
}


/***/ }),

/***/ 94775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47279);
/* harmony import */ var _barrel_optimize_names_Check_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64577);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Checkbox auto */ 




const Checkbox = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__/* .Indicator */ .C1, {
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('flex items-center justify-center text-current'),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "h-4 w-4"
            })
        })
    }));
Checkbox.displayName = _radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL.displayName;



/***/ }),

/***/ 96899:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ AddProviderDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28276);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94775);
/* harmony import */ var _barrel_optimize_names_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2125);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ AddProviderDialog auto */ 









function AddProviderDialog({ open, onOpenChange, onAdd }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__/* .useI18n */ .s)();
    // Internal state
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [type, setType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('openai');
    const [baseUrl, setBaseUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [icon, setIcon] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [requiresApiKey, setRequiresApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // Reset form when dialog closes (derived state pattern)
    const [prevOpen, setPrevOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(open);
    if (open !== prevOpen) {
        setPrevOpen(open);
        if (!open) {
            setName('');
            setType('openai');
            setBaseUrl('');
            setIcon('');
            setRequiresApiKey(true);
        }
    }
    const handleClose = ()=>{
        onOpenChange(false);
    };
    const handleAdd = ()=>{
        onAdd({
            name,
            type,
            baseUrl,
            icon,
            requiresApiKey
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
            className: "sm:max-w-[450px]",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                    className: "sr-only",
                    children: t('settings.addProviderDialog')
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogDescription */ .rr, {
                    className: "sr-only",
                    children: t('settings.addProviderDescription')
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "pb-3 border-b",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-semibold",
                                children: t('settings.addProviderDialog')
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.providerName')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    placeholder: t('settings.providerNamePlaceholder'),
                                    value: name,
                                    onChange: (e)=>setName(e.target.value)
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.providerApiMode')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-3 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: ()=>setType('openai'),
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('p-2 rounded-lg border text-left text-sm transition-colors', type === 'openai' ? 'bg-primary/5 border-primary/50' : 'hover:bg-muted/50 border-transparent'),
                                            children: t('settings.apiModeOpenAI')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: ()=>setType('anthropic'),
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('p-2 rounded-lg border text-left text-sm transition-colors', type === 'anthropic' ? 'bg-primary/5 border-primary/50' : 'hover:bg-muted/50 border-transparent'),
                                            children: t('settings.apiModeAnthropic')
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: ()=>setType('google'),
                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('p-2 rounded-lg border text-left text-sm transition-colors', type === 'google' ? 'bg-primary/5 border-primary/50' : 'hover:bg-muted/50 border-transparent'),
                                            children: t('settings.apiModeGoogle')
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.defaultBaseUrl')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    type: "url",
                                    placeholder: "https://api.example.com/v1",
                                    value: baseUrl,
                                    onChange: (e)=>setBaseUrl(e.target.value)
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.providerIcon')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    type: "url",
                                    placeholder: "https://example.com/icon.svg",
                                    value: icon,
                                    onChange: (e)=>setIcon(e.target.value)
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__/* .Checkbox */ .S, {
                                    id: "requires-api-key",
                                    checked: requiresApiKey,
                                    onCheckedChange: (checked)=>setRequiresApiKey(checked)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    htmlFor: "requires-api-key",
                                    className: "text-sm cursor-pointer",
                                    children: t('settings.requiresApiKey')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-end gap-2 pt-3 border-t",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: handleClose,
                                    children: t('settings.cancelEdit')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    size: "sm",
                                    onClick: handleAdd,
                                    className: "gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                            className: "h-3.5 w-3.5"
                                        }),
                                        t('settings.addProviderButton')
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

/***/ 97782:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ AddAudioProviderDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28276);
/* harmony import */ var _components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27388);
/* harmony import */ var _components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1728);
/* harmony import */ var _components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28670);
/* harmony import */ var _components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94775);
/* harmony import */ var _barrel_optimize_names_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2125);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(71442);
/* __next_internal_client_entry_do_not_use__ AddAudioProviderDialog auto */ 








function AddAudioProviderDialog({ open, onOpenChange, onAdd, type }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_7__/* .useI18n */ .s)();
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [baseUrl, setBaseUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [defaultModel, setDefaultModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [requiresApiKey, setRequiresApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Reset form when dialog closes
    const [prevOpen, setPrevOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(open);
    if (open !== prevOpen) {
        setPrevOpen(open);
        if (!open) {
            setName('');
            setBaseUrl('');
            setDefaultModel('');
            setRequiresApiKey(false);
        }
    }
    const handleAdd = ()=>{
        if (!name.trim() || !baseUrl.trim()) return;
        onAdd({
            name: name.trim(),
            baseUrl: baseUrl.trim(),
            defaultModel: defaultModel.trim(),
            requiresApiKey
        });
        onOpenChange(false);
    };
    const titleKey = type === 'tts' ? 'settings.addCustomTTSProvider' : 'settings.addCustomASRProvider';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
            className: "sm:max-w-[450px]",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                    className: "sr-only",
                    children: t(titleKey)
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogDescription */ .rr, {
                    className: "sr-only",
                    children: t('settings.addCustomAudioProviderDescription')
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "pb-3 border-b",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-lg font-semibold",
                                    children: t(titleKey)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-muted-foreground mt-1",
                                    children: t('settings.addCustomAudioProviderDescription')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.providerName')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    placeholder: type === 'tts' ? 'My Local TTS' : 'My Local ASR',
                                    value: name,
                                    onChange: (e)=>setName(e.target.value)
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.defaultBaseUrl')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    type: "url",
                                    placeholder: "http://localhost:8000/v1",
                                    value: baseUrl,
                                    onChange: (e)=>setBaseUrl(e.target.value)
                                })
                            ]
                        }),
                        type === 'tts' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_label__WEBPACK_IMPORTED_MODULE_5__/* .Label */ .J, {
                                    children: t('settings.defaultModel')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                    placeholder: "tts-1",
                                    value: defaultModel,
                                    onChange: (e)=>setDefaultModel(e.target.value)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: t('settings.defaultModelHint')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_checkbox__WEBPACK_IMPORTED_MODULE_6__/* .Checkbox */ .S, {
                                    id: "audio-requires-api-key",
                                    checked: requiresApiKey,
                                    onCheckedChange: (checked)=>setRequiresApiKey(checked)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    htmlFor: "audio-requires-api-key",
                                    className: "text-sm cursor-pointer",
                                    children: t('settings.requiresApiKey')
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-end gap-2 pt-3 border-t",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: ()=>onOpenChange(false),
                                    children: t('settings.cancelEdit')
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    size: "sm",
                                    onClick: handleAdd,
                                    disabled: !name.trim() || !baseUrl.trim(),
                                    className: "gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Plus_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                            className: "h-3.5 w-3.5"
                                        }),
                                        t('settings.addProviderButton')
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

/***/ 98065:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ SpeechButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39092);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Loader2_Mic_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Loader2_Mic_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15688);
/* harmony import */ var _lib_hooks_use_audio_recorder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31903);
/* harmony import */ var _lib_hooks_use_asr_available__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84744);
/* harmony import */ var _lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71442);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40980);
/* harmony import */ var _components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19205);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66609);
/* __next_internal_client_entry_do_not_use__ SpeechButton auto */ 









function SpeechButton({ onTranscription, className, disabled, size = 'sm' }) {
    const { t } = (0,_lib_hooks_use_i18n__WEBPACK_IMPORTED_MODULE_5__/* .useI18n */ .s)();
    // Ref to always call the latest onTranscription, avoiding stale closures
    const onTranscriptionRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(onTranscription);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        onTranscriptionRef.current = onTranscription;
    }, [
        onTranscription
    ]);
    const stableOnTranscription = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((text)=>{
        onTranscriptionRef.current(text);
    }, []);
    const handleError = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((error)=>{
        sonner__WEBPACK_IMPORTED_MODULE_7__.toast.error(error);
    }, []);
    const { isRecording, isProcessing, startRecording, stopRecording } = (0,_lib_hooks_use_audio_recorder__WEBPACK_IMPORTED_MODULE_3__/* .useAudioRecorder */ .C)({
        onTranscription: stableOnTranscription,
        onError: handleError
    });
    const active = isRecording || isProcessing;
    // Gate on ASR availability (toggle + provider configured + browser support)
    // so every call site is disabled uniformly when ASR is off/unusable — but
    // never while actively recording/processing, so the user can always click to
    // stop (the recorder has no auto-stop and would otherwise leave the mic open).
    const asrAvailable = (0,_lib_hooks_use_asr_available__WEBPACK_IMPORTED_MODULE_4__/* .useASRAvailable */ .H)();
    const isDisabled = (disabled || !asrAvailable) && !active;
    const handleClick = ()=>{
        if (isRecording) {
            stopRecording();
        } else if (!isProcessing) {
            startRecording();
        }
    };
    const isMd = size === 'md';
    const sizeClasses = isMd ? 'h-8 w-8' : 'h-6 w-6';
    const iconSize = isMd ? 'w-4 h-4' : 'w-3.5 h-3.5';
    const barH = isMd ? 14 : 10;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_6__/* .Tooltip */ .m_, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_6__/* .TooltipTrigger */ .k$, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    disabled: isDisabled || isProcessing,
                    onClick: handleClick,
                    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default().dynamic([
                        [
                            "a9c0aaf9979cdea0",
                            [
                                barH
                            ]
                        ]
                    ]) + " " + ((0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)('relative flex items-center justify-center rounded-lg transition-all duration-200 shrink-0 cursor-pointer', sizeClasses, active ? 'bg-violet-500/90 dark:bg-violet-600/80 text-white shadow-[0_0_12px_rgba(139,92,246,0.45)] dark:shadow-[0_0_12px_rgba(139,92,246,0.3)]' : 'text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/80', isDisabled && 'opacity-40 pointer-events-none', className) || ""),
                    children: [
                        isRecording && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            style: {
                                animation: 'speech-ring 2s ease-in-out infinite'
                            },
                            className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default().dynamic([
                                [
                                    "a9c0aaf9979cdea0",
                                    [
                                        barH
                                    ]
                                ]
                            ]) + " " + "absolute inset-[-4px] rounded-[10px] border border-violet-400/40 dark:border-violet-400/25"
                        }),
                        isProcessing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)(iconSize, 'animate-spin')
                        }) : isRecording ? /* Mini equalizer bars */ /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default().dynamic([
                                [
                                    "a9c0aaf9979cdea0",
                                    [
                                        barH
                                    ]
                                ]
                            ]) + " " + "flex items-center gap-[2.5px] relative z-10",
                            children: [
                                0,
                                1,
                                2
                            ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    style: {
                                        width: isMd ? 2.5 : 2,
                                        animation: `speech-bar ${0.4 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
                                        height: 3
                                    },
                                    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default().dynamic([
                                        [
                                            "a9c0aaf9979cdea0",
                                            [
                                                barH
                                            ]
                                        ]
                                    ]) + " " + "rounded-full bg-white"
                                }, i))
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__.cn)(iconSize, 'relative z-10')
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default()), {
                            id: "a9c0aaf9979cdea0",
                            dynamic: [
                                barH
                            ],
                            children: `@keyframes speech-bar{0%{height:3px}100%{height:${barH}px}}@keyframes speech-ring{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.7;transform:scale(1.08)}}`
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_openmaic_ui_tooltip__WEBPACK_IMPORTED_MODULE_6__/* .TooltipContent */ .ZI, {
                side: "top",
                className: "text-xs",
                children: isProcessing ? t('roundtable.processing') : isRecording ? t('voice.stopListening') : t('voice.startListening')
            })
        ]
    });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [37190,97330,18409,68298,27173,33697,2595,31573,53686,57932,52968,40379,99519,2040,77492,11199,59644,4075,61890,79264,38499,28441,93794,77358], () => (__webpack_exec__(60073)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);