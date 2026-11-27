"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[87197],{

/***/ 17356:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CircleQuestionMark)
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
    name: "circle-question-mark",
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
            "path",
            {
                d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
                key: "1u773s"
            }
        ],
        [
            "path",
            {
                d: "M12 17h.01",
                key: "p32p05"
            }
        ]
    ],
    aliases: [
        "help-circle",
        "circle-help"
    ]
};
__iconData.node;
const CircleQuestionMark = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=circle-question-mark.mjs.map


/***/ }),

/***/ 87197:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkdownRenderer: () => (/* binding */ MarkdownRenderer),
/* harmony export */   "default": () => (/* binding */ GroupAIAssistant)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3301);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17356);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34000);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9383);
/* harmony import */ var _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(93744);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* __next_internal_client_entry_do_not_use__ default,MarkdownRenderer auto */ 
/**
 * GroupAIAssistant — Slide-over AI study assistant for study groups.
 *
 * Reuses the ZAI-backed /api/groups/[id]/ai-assistant endpoint. Supports
 * four modes:
 *   - Tutor     : free-form medical Q&A (with optional lecture context)
 *   - Summarize : condense a lecture into study notes
 *   - Quiz Me   : generate 3 practice MCQs from lecture content
 *   - Explain   : deep-dive on a specific question's answer
 *
 * The component is a self-contained slide-over panel. Parent renders it
 * conditionally and passes optional `lectureId` / `questionId` context
 * (e.g. when launched from inside the lecture viewer or a question card).
 *
 * Chat history is kept in component state (not persisted) — closing the
 * panel clears it. Each mode keeps its own history so switching tabs
 * doesn't lose context.
 */ 



const MODES = [
    {
        id: 'tutor',
        label: 'Tutor',
        icon: _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
        color: '#00e5a0',
        description: 'Ask any question about the lecture material',
        placeholder: 'e.g. Explain the renin-angiotensin-aldosterone system…',
        needsContext: 'optional'
    },
    {
        id: 'summarize',
        label: 'Summarize',
        icon: _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A,
        color: '#4fc3f7',
        description: 'Get a structured study summary of this lecture',
        placeholder: 'Optional: focus on a specific aspect (e.g. "focus on pharmacology")',
        needsContext: 'lecture'
    },
    {
        id: 'quiz',
        label: 'Quiz Me',
        icon: _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
        color: '#f59e0b',
        description: 'Generate 3 practice MCQs from this lecture',
        placeholder: 'Optional: focus on a specific topic or difficulty',
        needsContext: 'lecture'
    },
    {
        id: 'explain',
        label: 'Explain',
        icon: _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A,
        color: '#8b5cf6',
        description: 'Get a deeper explanation of a question',
        placeholder: 'What specifically would you like explained?',
        needsContext: 'question'
    }
];
function GroupAIAssistant({ groupId, lectureId, lectureTitle, questionId, questionText, onClose }) {
    const { authHeaders } = (0,_components_medq_useCurrentUser__WEBPACK_IMPORTED_MODULE_2__/* .useCurrentUser */ .i)();
    const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>{
        // Auto-pick the most relevant mode based on provided context
        if (questionId) return 'explain';
        if (lectureId) return 'tutor';
        return 'tutor';
    });
    const [histories, setHistories] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        tutor: [],
        summarize: [],
        quiz: [],
        explain: []
    });
    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [busy, setBusy] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const scrollRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const currentMode = MODES.find((m)=>m.id === mode);
    const messages = histories[mode];
    // Auto-scroll to bottom on new message
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [
        messages,
        busy
    ]);
    // Auto-focus input on mount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        inputRef.current?.focus();
    }, []);
    // Warn if mode requires context that wasn't provided
    const contextMissing = currentMode.needsContext === 'lecture' && !lectureId || currentMode.needsContext === 'question' && !questionId;
    const send = async ()=>{
        if (busy) return;
        if (contextMissing) return;
        // 'summarize' and 'quiz' can send without an explicit user message
        if (mode !== 'summarize' && mode !== 'quiz' && !input.trim()) return;
        const userMsg = {
            role: 'user',
            content: input.trim() || (mode === 'summarize' ? 'Summarize this lecture.' : 'Generate quiz questions.')
        };
        const newHistory = [
            ...messages,
            userMsg
        ];
        setHistories((h)=>({
                ...h,
                [mode]: newHistory
            }));
        setInput('');
        setBusy(true);
        try {
            const res = await fetch(`/api/groups/${groupId}/ai-assistant`, {
                method: 'POST',
                headers: {
                    ...authHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMsg.content,
                    mode,
                    history: newHistory.slice(-10).map((m)=>({
                            role: m.role,
                            content: m.content
                        })),
                    lectureId,
                    questionId
                })
            });
            const d = await res.json();
            if (res.ok) {
                const assistantMsg = {
                    role: 'assistant',
                    content: d.response
                };
                setHistories((h)=>({
                        ...h,
                        [mode]: [
                            ...h[mode],
                            assistantMsg
                        ]
                    }));
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(d.error || 'AI request failed');
                // Roll back the user message so they can retry
                setHistories((h)=>({
                        ...h,
                        [mode]: h[mode].slice(0, -1)
                    }));
            }
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Network error — please try again');
            setHistories((h)=>({
                    ...h,
                    [mode]: h[mode].slice(0, -1)
                }));
        } finally{
            setBusy(false);
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };
    const clearHistory = ()=>{
        setHistories((h)=>({
                ...h,
                [mode]: []
            }));
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-50 flex flex-col",
        style: {
            background: 'rgba(8, 10, 14, 0.98)',
            backdropFilter: 'blur(12px)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 border-b",
                style: {
                    borderColor: 'rgba(255,255,255,0.06)',
                    background: 'rgba(21,24,33,0.6)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2.5 min-w-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                                style: {
                                    background: 'linear-gradient(135deg, rgba(0,229,160,0.18) 0%, rgba(79,195,247,0.12) 100%)',
                                    border: '1px solid rgba(0,229,160,0.25)'
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                    className: "w-4 h-4",
                                    style: {
                                        color: '#00e5a0'
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                        className: "text-sm font-bold text-white flex items-center gap-1.5",
                                        children: [
                                            "AI Study Assistant",
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] px-1.5 py-0.5 rounded-full font-semibold",
                                                style: {
                                                    background: 'rgba(0,229,160,0.12)',
                                                    color: '#00e5a0'
                                                },
                                                children: "ZAI"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] text-[#5a6478] truncate",
                                        children: lectureTitle ? `Lecture: ${lectureTitle}` : questionText ? `Q: ${questionText.slice(0, 60)}${questionText.length > 60 ? '…' : ''}` : 'General tutor'
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: onClose,
                        className: "p-1.5 rounded-lg hover:bg-white/5 flex items-center gap-1 text-xs text-[#8b95a8]",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "px-4 py-3 border-b flex items-center gap-1 overflow-x-auto",
                style: {
                    borderColor: 'rgba(255,255,255,0.06)'
                },
                children: MODES.map((m)=>{
                    const Icon = m.icon;
                    const active = mode === m.id;
                    const disabled = m.needsContext === 'lecture' && !lectureId || m.needsContext === 'question' && !questionId;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>!disabled && setMode(m.id),
                        disabled: disabled,
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                        style: {
                            background: active ? `${m.color}18` : 'rgba(255,255,255,0.03)',
                            color: active ? m.color : '#8b95a8',
                            border: `1px solid ${active ? `${m.color}30` : 'rgba(255,255,255,0.05)'}`
                        },
                        title: disabled ? `Requires ${m.needsContext} context` : m.description,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                className: "w-3 h-3"
                            }),
                            " ",
                            m.label
                        ]
                    }, m.id);
                })
            }),
            contextMissing && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 py-3 text-[11px] text-[#f59e0b] flex items-center gap-2",
                style: {
                    background: 'rgba(245,158,11,0.06)',
                    borderBottom: '1px solid rgba(245,158,11,0.15)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5 flex-shrink-0"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        children: currentMode.needsContext === 'lecture' ? 'Open a lecture first to use this mode — the AI needs lecture content as context.' : 'Open a question first to use this mode — the AI needs the question + correct answer as context.'
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                ref: scrollRef,
                className: "flex-1 overflow-y-auto chat-scrollbar",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "max-w-3xl mx-auto px-4 py-5",
                    children: messages.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChat, {
                        mode: currentMode,
                        lectureTitle: lectureTitle,
                        questionText: questionText
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                            messages.map((m, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MessageBubble, {
                                    message: m,
                                    mode: mode
                                }, i)),
                            busy && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TypingIndicator, {})
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "px-4 py-3 border-t",
                style: {
                    borderColor: 'rgba(255,255,255,0.06)',
                    background: 'rgba(21,24,33,0.6)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-3xl mx-auto",
                    children: [
                        messages.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-between mb-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-[10px] text-[#5a6478]",
                                    children: [
                                        messages.length,
                                        " message",
                                        messages.length === 1 ? '' : 's',
                                        " in ",
                                        currentMode.label
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: clearHistory,
                                    className: "text-[10px] flex items-center gap-1 text-[#5a6478] hover:text-[#8b95a8] transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }),
                                        " Clear"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-end gap-2 p-2 rounded-2xl",
                            style: {
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                    ref: inputRef,
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    onKeyDown: handleKeyDown,
                                    placeholder: contextMissing ? 'Select a different mode or open content first…' : currentMode.placeholder,
                                    disabled: contextMissing || busy,
                                    rows: 1,
                                    className: "flex-1 bg-transparent text-sm text-white placeholder:text-[#5a6478] focus:outline-none resize-none px-2 py-1.5 disabled:opacity-50",
                                    style: {
                                        minHeight: '36px',
                                        maxHeight: '120px'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: send,
                                    disabled: busy || contextMissing || mode !== 'summarize' && mode !== 'quiz' && !input.trim(),
                                    className: "w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0",
                                    style: {
                                        background: currentMode.color,
                                        color: '#0c0e14'
                                    },
                                    children: busy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[9px] text-[#3a4055] mt-1.5 text-center",
                            children: "AI responses are educational aids — verify against authoritative sources. Press Enter to send, Shift+Enter for newline."
                        })
                    ]
                })
            })
        ]
    });
}
/* ───────── Empty Chat State ───────── */ function EmptyChat({ mode, lectureTitle, questionText }) {
    const Icon = mode.icon;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "text-center py-10 px-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4",
                style: {
                    background: `${mode.color}12`,
                    border: `1px solid ${mode.color}25`
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                    className: "w-8 h-8",
                    style: {
                        color: mode.color
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                className: "text-base font-bold text-white mb-1.5",
                children: [
                    mode.label,
                    " Mode"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs text-[#8b95a8] max-w-sm mx-auto mb-5 leading-relaxed",
                children: mode.description
            }),
            (lectureTitle || questionText) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "inline-block text-left rounded-xl p-3 max-w-md mb-5",
                style: {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] uppercase tracking-wider text-[#5a6478] font-semibold mb-1",
                        children: "Context"
                    }),
                    lectureTitle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-xs text-white",
                        children: [
                            "\uD83D\uDCD6 ",
                            lectureTitle
                        ]
                    }),
                    questionText && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-xs text-white mt-1",
                        children: [
                            "❓ ",
                            questionText.slice(0, 200),
                            questionText.length > 200 ? '…' : ''
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "inline-block text-left rounded-xl p-3 max-w-md",
                style: {
                    background: 'rgba(0,229,160,0.04)',
                    border: '1px solid rgba(0,229,160,0.12)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-[10px] uppercase tracking-wider text-[#00e5a0] font-bold mb-1.5 flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            }),
                            " Try asking"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                        className: "space-y-1",
                        children: [
                            mode.id === 'tutor' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• "Explain the pathophysiology in simple terms"'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• "What are the high-yield exam points here?"'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• "Give me a mnemonic for the symptoms"'
                                    })
                                ]
                            }),
                            mode.id === 'summarize' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: "• Just hit Send for a full summary"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• Or focus: "pharmacology only"'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• Or "key differential diagnoses"'
                                    })
                                ]
                            }),
                            mode.id === 'quiz' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: "• Just hit Send to get 3 MCQs"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• Or specify: "clinical vignette style"'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• Or "focus on side effects"'
                                    })
                                ]
                            }),
                            mode.id === 'explain' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• "Why is option B wrong?"'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• "What\'s the underlying mechanism?"'
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        className: "text-[11px] text-[#8b95a8]",
                                        children: '• "Give me a clinical pearl about this"'
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
/* ───────── Message Bubble ───────── */ function MessageBubble({ message, mode }) {
    const isUser = message.role === 'user';
    const Icon = isUser ? _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A : _barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A;
    const modeColor = MODES.find((m)=>m.id === mode)?.color || '#00e5a0';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                style: {
                    background: isUser ? 'rgba(255,255,255,0.06)' : `${modeColor}18`,
                    border: `1px solid ${isUser ? 'rgba(255,255,255,0.08)' : `${modeColor}30`}`
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                    className: "w-3.5 h-3.5",
                    style: {
                        color: isUser ? '#8b95a8' : modeColor
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: `flex-1 min-w-0 max-w-[85%] ${isUser ? 'text-right' : 'text-left'}`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "inline-block rounded-2xl px-3.5 py-2.5 text-left",
                    style: {
                        background: isUser ? 'rgba(79,195,247,0.08)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isUser ? 'rgba(79,195,247,0.15)' : 'rgba(255,255,255,0.06)'}`
                    },
                    children: isUser ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-white whitespace-pre-wrap leading-relaxed",
                        children: message.content
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MarkdownRenderer, {
                        content: message.content
                    })
                })
            })
        ]
    });
}
/* ───────── Tiny Markdown renderer ───────── */ /* Renders a small subset of Markdown (headings, bold, italic, lists, code,
 * paragraphs) sufficient for AI tutor responses. Avoids pulling in a full
 * markdown library to keep the bundle small.
 *
 * Exported so the inline lecture AI (LectureInlineAI.tsx) can reuse the
 * same renderer without duplicating the parser. */ function MarkdownRenderer({ content }) {
    const blocks = parseMarkdown(content);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "text-sm text-[#e8ecf4] leading-relaxed space-y-2",
        children: blocks.map((b, i)=>{
            switch(b.type){
                case 'h1':
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                        className: "text-base font-bold text-white mt-2",
                        children: b.text
                    }, i);
                case 'h2':
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-sm font-bold text-white mt-2",
                        children: b.text
                    }, i);
                case 'h3':
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                        className: "text-[13px] font-bold text-white mt-1.5",
                        children: b.text
                    }, i);
                case 'ul':
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
                        className: "space-y-1 ml-4",
                        children: b.items?.map((item, j)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "text-[13px] flex gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[#00e5a0] flex-shrink-0",
                                        children: "•"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        dangerouslySetInnerHTML: {
                                            __html: inlineFormat(item)
                                        }
                                    })
                                ]
                            }, j))
                    }, i);
                case 'ol':
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ol", {
                        className: "space-y-1 ml-4",
                        children: b.items?.map((item, j)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "text-[13px] flex gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[#00e5a0] flex-shrink-0 font-bold",
                                        children: [
                                            j + 1,
                                            "."
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        dangerouslySetInnerHTML: {
                                            __html: inlineFormat(item)
                                        }
                                    })
                                ]
                            }, j))
                    }, i);
                case 'code':
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                        className: "rounded-lg p-2.5 text-[11px] overflow-x-auto",
                        style: {
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.06)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                            className: "text-[#00e5a0]",
                            children: b.text
                        })
                    }, i);
                case 'json':
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                        className: "rounded-lg p-2.5 text-[11px] overflow-x-auto",
                        style: {
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.06)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                            className: "text-[#4fc3f7]",
                            children: b.text
                        })
                    }, i);
                default:
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[13px]",
                        dangerouslySetInnerHTML: {
                            __html: inlineFormat(b.text)
                        }
                    }, i);
            }
        })
    });
}
function parseMarkdown(src) {
    const lines = src.replace(/\r\n/g, '\n').split('\n');
    const blocks = [];
    let i = 0;
    while(i < lines.length){
        const line = lines[i];
        // Code fence
        if (line.trim().startsWith('```')) {
            const lang = line.trim().slice(3).trim();
            const buf = [];
            i++;
            while(i < lines.length && !lines[i].trim().startsWith('```')){
                buf.push(lines[i]);
                i++;
            }
            i++; // skip closing fence
            blocks.push({
                type: lang === 'json' ? 'json' : 'code',
                text: buf.join('\n')
            });
            continue;
        }
        // Headings
        if (/^###\s+/.test(line)) {
            blocks.push({
                type: 'h3',
                text: line.replace(/^###\s+/, '').trim()
            });
            i++;
            continue;
        }
        if (/^##\s+/.test(line)) {
            blocks.push({
                type: 'h2',
                text: line.replace(/^##\s+/, '').trim()
            });
            i++;
            continue;
        }
        if (/^#\s+/.test(line)) {
            blocks.push({
                type: 'h1',
                text: line.replace(/^#\s+/, '').trim()
            });
            i++;
            continue;
        }
        // Unordered list
        if (/^\s*[-*]\s+/.test(line)) {
            const items = [];
            while(i < lines.length && /^\s*[-*]\s+/.test(lines[i])){
                items.push(lines[i].replace(/^\s*[-*]\s+/, '').trim());
                i++;
            }
            blocks.push({
                type: 'ul',
                items
            });
            continue;
        }
        // Ordered list
        if (/^\s*\d+\.\s+/.test(line)) {
            const items = [];
            while(i < lines.length && /^\s*\d+\.\s+/.test(lines[i])){
                items.push(lines[i].replace(/^\s*\d+\.\s+/, '').trim());
                i++;
            }
            blocks.push({
                type: 'ol',
                items
            });
            continue;
        }
        // Blank line
        if (!line.trim()) {
            i++;
            continue;
        }
        // Paragraph (consume until blank line / heading / list)
        const buf = [
            line
        ];
        i++;
        while(i < lines.length && lines[i].trim() && !/^#{1,3}\s+/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i]) && !lines[i].trim().startsWith('```')){
            buf.push(lines[i]);
            i++;
        }
        blocks.push({
            type: 'p',
            text: buf.join('\n').trim()
        });
    }
    return blocks;
}
/** Inline formatting: **bold**, *italic*, `code`, [link](url) */ function inlineFormat(text) {
    // Escape HTML first to avoid XSS from AI output
    let s = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Bold
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#fff;font-weight:700">$1</strong>');
    // Italic
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em style="color:#8b95a8">$2</em>');
    // Inline code
    s = s.replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.4);padding:1px 4px;border-radius:3px;color:#00e5a0;font-size:11px">$1</code>');
    // Links
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" style="color:#4fc3f7;text-decoration:underline">$1</a>');
    return s;
}
/* ───────── Typing Indicator ───────── */ function TypingIndicator() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex gap-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                style: {
                    background: 'rgba(0,229,160,0.18)',
                    border: '1px solid rgba(0,229,160,0.3)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Brain_FileText_HelpCircle_Lightbulb_Loader2_RotateCcw_Send_Sparkles_User_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5",
                    style: {
                        color: '#00e5a0'
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "inline-block rounded-2xl px-4 py-3",
                style: {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)'
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '0ms'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '150ms'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce",
                            style: {
                                animationDelay: '300ms'
                            }
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 92298:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RotateCcw)
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
    name: "rotate-ccw",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
                key: "1357e3"
            }
        ],
        [
            "path",
            {
                d: "M3 3v5h5",
                key: "1xhq8a"
            }
        ]
    ]
};
__iconData.node;
const RotateCcw = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=rotate-ccw.mjs.map


/***/ }),

/***/ 93744:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ User)
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
    name: "user",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
                key: "975kel"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "7",
                r: "4",
                key: "17ys0d"
            }
        ]
    ]
};
__iconData.node;
const User = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=user.mjs.map


/***/ })

}]);