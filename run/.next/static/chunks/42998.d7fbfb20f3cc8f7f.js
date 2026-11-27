"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[42998],{

/***/ 21767:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 42763:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cf: () => (/* binding */ DialogContent),
/* harmony export */   Es: () => (/* binding */ DialogFooter),
/* harmony export */   L3: () => (/* binding */ DialogTitle),
/* harmony export */   c7: () => (/* binding */ DialogHeader),
/* harmony export */   lG: () => (/* binding */ Dialog),
/* harmony export */   rr: () => (/* binding */ DialogDescription)
/* harmony export */ });
/* unused harmony exports DialogClose, DialogOverlay, DialogPortal, DialogTrigger */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82741);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32949);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45477);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49387);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(52579);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11975);
/* harmony import */ var _base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(31799);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89239);
/* harmony import */ var _barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9005);
/* __next_internal_client_entry_do_not_use__ Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogOverlay,DialogPortal,DialogTitle,DialogTrigger auto */ 





function Dialog({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_3__/* .DialogRoot */ .D, {
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
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogPortal */ .Z, {
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
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogBackdrop */ .X, {
        "data-slot": "dialog-overlay",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
        ...props
    });
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogPopup */ .h, {
                "data-slot": "dialog-content",
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogClose */ .H, {
                        "data-slot": "dialog-close",
                        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                            variant: "ghost",
                            className: "absolute top-2 right-2",
                            size: "icon-sm"
                        }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_XIcon_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "sr-only",
                                children: "Close"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "dialog-header",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("flex flex-col gap-2", className),
        ...props
    });
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        "data-slot": "dialog-footer",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className),
        ...props,
        children: [
            children,
            showCloseButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogClose */ .H, {
                render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
                    variant: "outline"
                }),
                children: "Close"
            })
        ]
    });
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogTitle */ .L, {
        "data-slot": "dialog-title",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("font-heading text-base leading-none font-medium", className),
        ...props
    });
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_dialog__WEBPACK_IMPORTED_MODULE_11__/* .DialogDescription */ .r, {
        "data-slot": "dialog-description",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
        ...props
    });
}



/***/ }),

/***/ 58600:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ AiModelsGuideButton)
/* harmony export */ });
/* unused harmony export AiModelsGuideDialog */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17356);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81499);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90710);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22200);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(57990);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34000);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(90467);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(51128);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42763);
/* __next_internal_client_entry_do_not_use__ AiModelsGuideButton,AiModelsGuideDialog auto */ 
/**
 * AiModelsGuide — the "how models & providers work" explainer.
 *
 * WHY THIS EXISTS: MedQ has TWO places to add AI capacity, and both have
 * providers, custom endpoints, models and custom models — which reads as
 * four overlapping concepts unless the two layers are told apart first:
 *
 *   1. AI Providers (Settings → AI Providers)  — your DIRECT keys.
 *      One key/endpoint, one provider, MedQ calls it straight.
 *   2. MedQ AI Router (sidebar tab)            — a POOL of many provider
 *      keys + custom endpoints behind one unified key, with routing and
 *      failover. "Link with MedQ" makes its whole model list appear in
 *      every MedQ picker as  medq-router:<model>.
 *
 * This dialog gives: the mental model, a "where do I add what" decision
 * list, the glossary of the four words, and the not-visible troubleshooting
 * path. Mounted from BOTH entry points (AI Providers hub header, AI Router
 * tab header) so the same explanation lives everywhere.
 */ 


function AiModelsGuideButton({ variant = 'chip', label = 'Guide' }) {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            variant === 'chip' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                type: "button",
                onClick: ()=>setOpen(true),
                className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-[11px] font-medium text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white",
                title: "How providers, models and the AI Router work",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "size-3.5"
                    }),
                    label
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: ()=>setOpen(true),
                className: "inline-flex h-7 w-7 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white",
                title: "How providers, models and the AI Router work",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "h-4 w-4"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AiModelsGuideDialog, {
                open: open,
                onOpenChange: setOpen
            })
        ]
    });
}
function AiModelsGuideDialog({ open, onOpenChange }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
            className: "max-w-3xl bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "border-b border-white/[0.06] px-5 py-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                            className: "flex items-center gap-2 text-sm font-bold text-[#e8ecf4]",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                    className: "size-4 text-[#00e5a0]"
                                }),
                                "How models & providers work"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogDescription */ .rr, {
                            className: "mt-1 text-xs leading-relaxed text-[#8b95a8]",
                            children: [
                                "Two places to add AI power — ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-white/80",
                                    children: "AI Providers"
                                }),
                                " for your direct keys, the ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-white/80",
                                    children: "AI Router"
                                }),
                                " for a pooled, failover-protected key hub. Both feed the same model pickers everywhere in MedQ."
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-h-[calc(85vh-5.5rem)] overflow-y-auto px-5 py-4",
                    style: {
                        scrollbarWidth: 'thin'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Section, {
                            n: 1,
                            title: "The mental model — two layers, one picker",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "rounded-xl border border-white/[0.06] bg-black/30 p-4",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FlowDiagram, {})
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-3 grid gap-2.5 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LayerCard, {
                                            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                className: "size-3.5 text-[#4fc3f7]"
                                            }),
                                            title: "AI Providers \xb7 direct keys",
                                            body: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    "You paste ",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                                        children: "a key"
                                                    }),
                                                    " for a provider (OpenAI, Claude, Gemini, DeepSeek…) or point MedQ at ",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                                        children: "any OpenAI-compatible URL"
                                                    }),
                                                    ". MedQ calls that endpoint directly. Best when: you have one key and want the simplest path."
                                                ]
                                            }),
                                            where: "Settings → AI Providers"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LayerCard, {
                                            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                className: "size-3.5 text-[#00e5a0]"
                                            }),
                                            title: "MedQ AI Router \xb7 pooled keys",
                                            body: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    "A separate key hub (70+ free-tier providers + your custom endpoints) behind",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                                        children: " one unified key"
                                                    }),
                                                    ", with automatic routing and failover. Link it once and its whole model list appears in MedQ as ",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "font-mono text-[#00e5a0]",
                                                        children: "medq-router:"
                                                    }),
                                                    " models."
                                                ]
                                            }),
                                            where: "Sidebar → AI Router tab"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Section, {
                            n: 2,
                            title: "Where do I add what?",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "mb-3 text-[11px] leading-relaxed text-[#8b95a8]",
                                    children: "Find your situation on the left; the right side is the exact click path."
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Case, {
                                            situation: "I have an API key from OpenAI / Claude / Gemini / DeepSeek…",
                                            path: [
                                                'Settings',
                                                'AI Providers',
                                                'Add key',
                                                'Known provider pane'
                                            ],
                                            note: "Pick the provider, paste the key. Discover models after adding, or use its built-in list."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Case, {
                                            situation: "I want free models and don't have any keys",
                                            path: [
                                                'Sidebar',
                                                'AI Router',
                                                'Keys',
                                                'Add key'
                                            ],
                                            note: "Add free-tier provider keys (Google, GLM, Groq…). Then Overview → Link with MedQ generation."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Case, {
                                            situation: "I run my own models — Ollama, vLLM, LM Studio, or a gateway URL",
                                            path: [
                                                'Either place',
                                                'Add key',
                                                'Custom endpoint pane'
                                            ],
                                            note: "AI Providers = MedQ calls it directly (simplest). AI Router = it joins the routing pool with failover + analytics. Both accept a Base URL like http://127.0.0.1:11434/v1."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Case, {
                                            situation: "I want one endpoint that serves many models",
                                            path: [
                                                'Sidebar',
                                                'AI Router',
                                                'Keys',
                                                'Add key',
                                                'Custom endpoint'
                                            ],
                                            note: "Discover models pulls the live list from the endpoint — pick the ones you want, they register in bulk."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Case, {
                                            situation: "The model exists on the server but isn't in my model picker",
                                            path: [
                                                'Discover models',
                                                'or',
                                                'Add model by hand'
                                            ],
                                            note: "Model pickers only show models you registered on an endpoint (or the provider's known list). Discover = fetched from the endpoint; Add model = typed by you."
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Section, {
                            n: 3,
                            title: "The four words",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Term, {
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        term: "Provider",
                                        def: "A known AI company in the registry (OpenAI, Google, Groq…). Known providers come with presets: base URL, key format, icon, default model list."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Term, {
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        term: "Custom provider / custom endpoint",
                                        def: "Any OpenAI-compatible server URL you bring — local Ollama, vLLM, LM Studio, a relay. It works exactly like a provider; you just supply the Base URL (and optionally a key + label)."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Term, {
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        term: "Model",
                                        def: "The thing you actually call — e.g. gpt-4o-mini or zai-llm. Model pickers show provider:model. Known providers ship a catalog; everything else you add per endpoint."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Term, {
                                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        term: "Custom model",
                                        def: "A model id you register on an endpoint. Either discovered (fetched live from the endpoint's /models list) or added by hand (you type the id). Both behave identically afterwards."
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Section, {
                            n: 4,
                            title: "Added a model but don't see it?",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ol", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Checklist, {
                                        item: "The key/endpoint is enabled (toggle is on) and healthy — run Test/Check on it."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Checklist, {
                                        item: "The model is registered on that endpoint — Discover models, or Add model by hand."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Checklist, {
                                        item: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Router models: the ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                                    children: "Link with MedQ generation"
                                                }),
                                                " card on the AI Router Overview shows linked (click it once after adding models — it refreshes the model list)."
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Checklist, {
                                        item: "Reopen the model picker — it re-reads the catalog on open; set your default in AI Providers → Default model."
                                    })
                                ]
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "border-t border-white/[0.06] px-5 py-3",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "flex items-start gap-2 text-[11px] leading-relaxed text-[#8b95a8]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "mt-0.5 size-3.5 shrink-0 text-[#f5b73d]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    "Rule of thumb: ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                        className: "text-white/80",
                                        children: "one key, one job → AI Providers."
                                    }),
                                    ' ',
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                                        className: "text-white/80",
                                        children: "Many keys, routing and analytics → AI Router."
                                    }),
                                    " Keys in both places are encrypted at rest and never leave the server unencrypted."
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
}
/* ── Pieces ─────────────────────────────────────────────────────────────── */ function Section({ n, title, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: n > 1 ? 'mt-6 border-t border-white/[0.05] pt-5' : undefined,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                className: "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e8ecf4]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "flex size-5 items-center justify-center rounded-md bg-[#00e5a0]/10 font-mono text-[10px] text-[#00e5a0]",
                        children: n
                    }),
                    title
                ]
            }),
            children
        ]
    });
}
function LayerCard({ icon, title, body, where }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 text-[12px] font-semibold text-[#e8ecf4]",
                children: [
                    icon,
                    title
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-1.5 text-[11px] leading-relaxed text-[#8b95a8]",
                children: body
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-2 inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-[#5a6478]",
                children: where
            })
        ]
    });
}
function Case({ situation, path, note }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl border border-white/[0.06] bg-black/25 p-3.5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "text-[12px] font-medium text-[#e8ecf4]",
                children: situation
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-2 flex flex-wrap items-center gap-1.5",
                children: path.map((p, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "flex items-center gap-1.5",
                        children: [
                            i > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "size-3 text-[#5a6478]"
                            }) : null,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: `rounded-md px-2 py-0.5 text-[10px] font-medium ${i === path.length - 1 || p === 'or' ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'bg-white/[0.06] text-white/80'}`,
                                children: p
                            })
                        ]
                    }, `${p}-${i}`))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-2 text-[11px] leading-relaxed text-[#8b95a8]",
                children: note
            })
        ]
    });
}
function Term({ icon, term, def }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#00e5a0]/10 text-[#00e5a0]",
                children: icon
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-[12px] font-semibold text-[#e8ecf4]",
                        children: term
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "mt-0.5 text-[11px] leading-relaxed text-[#8b95a8]",
                        children: def
                    })
                ]
            })
        ]
    });
}
function Checklist({ item }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
        className: "flex items-start gap-2 text-[11px] leading-relaxed text-[#8b95a8]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#00e5a0]/10",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                    className: "size-2.5 text-[#00e5a0]"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                children: item
            })
        ]
    });
}
function FlowDiagram() {
    const box = 'rounded-lg border px-2.5 py-1.5 text-center text-[10px] font-medium';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-stretch gap-2 text-white/85",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `${box} mx-auto w-64 border-[#4fc3f7]/30 bg-[#4fc3f7]/10 text-[#4fc3f7]`,
                children: [
                    "Every MedQ model picker",
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-0.5 font-mono text-[9px] text-[#4fc3f7]/70",
                        children: "generation \xb7 tutor \xb7 chat \xb7 explain"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ArrowDown, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid gap-2 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: `${box} border-white/[0.1] bg-white/[0.04]`,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                className: "size-3 text-[#4fc3f7]"
                                            }),
                                            " AI Providers"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mt-0.5 font-mono text-[9px] text-[#8b95a8]",
                                        children: "provider : model"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: `${box} border-dashed border-white/[0.08] bg-black/20 text-[#8b95a8]`,
                                children: "your direct keys & custom endpoints"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: `${box} border-[#00e5a0]/30 bg-[#00e5a0]/10 text-[#00e5a0]`,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                className: "size-3"
                                            }),
                                            " MedQ AI Router"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mt-0.5 font-mono text-[9px] text-[#00e5a0]/70",
                                        children: "medq-router : model"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: `${box} border-dashed border-[#00e5a0]/20 bg-black/20 text-[#8b95a8]`,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "inline-flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Bot_Check_HelpCircle_KeyRound_Lightbulb_Link2_Search_Server_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "size-3"
                                            }),
                                            " linked once via unified key"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mt-0.5 text-[9px]",
                                        children: "70+ provider keys \xb7 custom endpoints \xb7 failover"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function ArrowDown() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex justify-center",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
            width: "14",
            height: "10",
            viewBox: "0 0 14 10",
            className: "text-[#5a6478]",
            "aria-hidden": true,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                d: "M7 0v6M7 6l-3-3M7 6l3-3",
                stroke: "currentColor",
                strokeWidth: "1.4",
                fill: "none",
                strokeLinecap: "round"
            })
        })
    });
}


/***/ }),

/***/ 89239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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



/***/ })

}]);