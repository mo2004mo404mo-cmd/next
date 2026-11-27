"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[4136],{

/***/ 4136:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SmartQuizDialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28258);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42763);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45160);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5045);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17494);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(94890);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(36083);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(93954);
/* __next_internal_client_entry_do_not_use__ default auto */ 






/* ── Component ── */ function SmartQuizDialog({ open, onClose }) {
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('config');
    const [questionCount, setQuestionCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10);
    const [focus, setFocus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('weak');
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [answers, setAnswers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selectedAnswer, setSelectedAnswer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [revealed, setRevealed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [questionStartTime, setQuestionStartTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [adaptiveMeta, setAdaptiveMeta] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [submitting, setSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [summaryData, setSummaryData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const currentQuestion = questions[currentIndex] || null;
    /* ── Start quiz ── */ const startQuiz = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setPhase('loading');
        setAnswers([]);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setRevealed(false);
        setSummaryData(null);
        try {
            const res = await fetch(`/api/smart-quiz?count=${questionCount}&focus=${focus}`);
            if (!res.ok) throw new Error('Failed to generate quiz');
            const data = await res.json();
            setQuestions(data.questions || []);
            setAdaptiveMeta(data.metadata || {});
            setQuestionStartTime(Date.now());
            setPhase('active');
        } catch (err) {
            console.error('Smart quiz error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to generate smart quiz');
            setPhase('config');
        }
    }, [
        questionCount,
        focus
    ]);
    /* ── Handle answer selection ── */ const handleAnswer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((answer)=>{
        if (revealed) return;
        setSelectedAnswer(answer);
        setRevealed(true);
    }, [
        revealed
    ]);
    /* ── Check if answer is correct ── */ const isCorrectAnswer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((answer, question)=>{
        const normAns = answer.replace(/<[^>]*>/g, '').trim().toLowerCase();
        const normCorrect = question.answer.replace(/<[^>]*>/g, '').trim().toLowerCase();
        if (normAns === normCorrect) return true;
        // Check if answer matches option letter
        if ([
            'a',
            'b',
            'c',
            'd'
        ].includes(normCorrect)) {
            const idx = normCorrect.charCodeAt(0) - 97;
            if (question.options[idx]) {
                const optNorm = question.options[idx].replace(/<[^>]*>/g, '').trim().toLowerCase();
                if (optNorm === normAns) return true;
            }
        }
        // Check if answer is contained in options
        return question.options.some((opt)=>opt.replace(/<[^>]*>/g, '').trim().toLowerCase() === normAns && normAns === normCorrect);
    }, []);
    /* ── Next question ── */ const nextQuestion = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!currentQuestion || !selectedAnswer) return;
        const timeTaken = Date.now() - questionStartTime;
        const correct = isCorrectAnswer(selectedAnswer, currentQuestion);
        const newAnswer = {
            questionId: currentQuestion.id,
            correct,
            timeTaken,
            difficulty: currentQuestion.difficulty,
            system: currentQuestion.system
        };
        const newAnswers = [
            ...answers,
            newAnswer
        ];
        setAnswers(newAnswers);
        // Check if quiz is done
        if (currentIndex >= questions.length - 1) {
            // Submit results
            submitResults(newAnswers);
        } else {
            // Next question
            setCurrentIndex((prev)=>prev + 1);
            setSelectedAnswer(null);
            setRevealed(false);
            setQuestionStartTime(Date.now());
        }
    }, [
        currentQuestion,
        selectedAnswer,
        questionStartTime,
        isCorrectAnswer,
        answers,
        currentIndex,
        questions.length
    ]);
    /* ── Submit results ── */ const submitResults = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (finalAnswers)=>{
        setSubmitting(true);
        try {
            const res = await fetch('/api/smart-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: `sq_${Date.now()}`,
                    answers: finalAnswers.map((a)=>({
                            questionId: a.questionId,
                            correct: a.correct,
                            timeTaken: a.timeTaken
                        }))
                })
            });
            if (!res.ok) throw new Error('Failed to submit results');
            const data = await res.json();
            setSummaryData(data.results);
            setPhase('summary');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Smart Quiz complete! ${data.results.accuracy}% accuracy`);
        } catch (err) {
            console.error('Submit error:', err);
            // Still show summary with local data
            const correct = finalAnswers.filter((a)=>a.correct).length;
            const totalTime = finalAnswers.reduce((s, a)=>s + a.timeTaken, 0) / 1000;
            const systemBreakdown = {};
            for (const a of finalAnswers){
                if (!systemBreakdown[a.system]) systemBreakdown[a.system] = {
                    correct: 0,
                    total: 0
                };
                systemBreakdown[a.system].total++;
                if (a.correct) systemBreakdown[a.system].correct++;
            }
            setSummaryData({
                totalQuestions: finalAnswers.length,
                correctAnswers: correct,
                accuracy: Math.round(correct / finalAnswers.length * 100),
                totalTime: Math.round(totalTime),
                xpEarned: correct * 7,
                systemBreakdown,
                recommendation: 'Keep practicing to improve your accuracy!'
            });
            setPhase('summary');
        } finally{
            setSubmitting(false);
        }
    }, []);
    /* ── Close handler ── */ const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (phase === 'active') {
            // Confirm before closing active quiz
            if (!window.confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) return;
        }
        setPhase('config');
        setQuestions([]);
        setAnswers([]);
        onClose();
    }, [
        phase,
        onClose
    ]);
    /* ── Difficulty progression for summary ── */ const difficultyProgression = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return answers.map((a, i)=>({
                index: i + 1,
                correct: a.correct ? 1 : 0,
                difficulty: a.difficulty
            }));
    }, [
        answers
    ]);
    /* ── Render ── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: (v)=>!v && handleClose(),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogContent */ .Cf, {
            className: "bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-2xl max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogHeader */ .c7, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogTitle */ .L3, {
                        className: "flex items-center gap-2 text-[#e8ecf4]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "w-5 h-5 text-[#00e5a0]"
                            }),
                            "Smart Quiz"
                        ]
                    })
                }),
                phase === 'config' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-6 py-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-3 block",
                                    children: "Number of Questions"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex gap-3",
                                    children: [
                                        5,
                                        10,
                                        20
                                    ].map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setQuestionCount(n),
                                            className: `flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${questionCount === n ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30 text-[#00e5a0]' : 'bg-[#1a1e2b] border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15]'}`,
                                            children: [
                                                n,
                                                " Q"
                                            ]
                                        }, n))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-3 block",
                                    children: "Focus Mode"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "space-y-2",
                                    children: [
                                        {
                                            value: 'weak',
                                            label: 'Weak Areas',
                                            desc: 'Focus on systems where you struggle',
                                            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            })
                                        },
                                        {
                                            value: 'mixed',
                                            label: 'Mixed',
                                            desc: 'Balanced mix across all systems',
                                            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            })
                                        },
                                        {
                                            value: 'untested',
                                            label: 'Untested Topics',
                                            desc: 'Explore topics you haven\'t studied yet',
                                            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            })
                                        }
                                    ].map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setFocus(opt.value),
                                            className: `w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${focus === opt.value ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30' : 'bg-[#1a1e2b] border-white/[0.08] hover:border-white/[0.15]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: `w-8 h-8 rounded-lg flex items-center justify-center ${focus === opt.value ? 'text-[#00e5a0] bg-[#00e5a0]/15' : 'text-[#5a6178] bg-white/[0.04]'}`,
                                                    children: opt.icon
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: `text-sm font-semibold ${focus === opt.value ? 'text-[#00e5a0]' : 'text-[#e8ecf4]'}`,
                                                            children: opt.label
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[10px] text-[#5a6178]",
                                                            children: opt.desc
                                                        })
                                                    ]
                                                }),
                                                focus === opt.value && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                    className: "w-5 h-5 text-[#00e5a0]"
                                                })
                                            ]
                                        }, opt.value))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            onClick: startQuiz,
                            className: "w-full py-3.5 rounded-xl text-sm font-bold bg-[#00e5a0] text-[#0c0e14] hover:bg-[#00e5a0]/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                "Start Smart Quiz"
                            ]
                        })
                    ]
                }),
                phase === 'loading' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col items-center justify-center py-16",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-16 h-16 rounded-2xl bg-[#00e5a0]/10 flex items-center justify-center mb-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "w-8 h-8 text-[#00e5a0] animate-pulse"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm font-semibold text-[#e8ecf4] mb-2",
                            children: "Analyzing your performance..."
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs text-[#5a6178]",
                            children: "Selecting questions based on your strengths & weaknesses"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                            className: "w-5 h-5 text-[#00e5a0] animate-spin mt-4"
                        })
                    ]
                }),
                phase === 'active' && currentQuestion && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-xs font-bold text-[#8b95a8]",
                                    children: [
                                        currentIndex + 1,
                                        "/",
                                        questions.length
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "h-full rounded-full bg-[#00e5a0] transition-all duration-500",
                                        style: {
                                            width: `${(currentIndex + 1) / questions.length * 100}%`
                                        }
                                    })
                                }),
                                currentQuestion.adaptiveMetadata && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_5__/* .Badge */ .E, {
                                    variant: "secondary",
                                    className: "text-[9px] font-semibold border-0 px-2 py-0.5 bg-[#8b5cf6]/10 text-[#8b5cf6]",
                                    children: currentQuestion.adaptiveMetadata.reason
                                })
                            ]
                        }),
                        currentQuestion.adaptiveMetadata && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-[#8b5cf6]/[0.06] border border-[#8b5cf6]/10",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5 text-[#8b5cf6]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-[10px] text-[#8b5cf6]",
                                    children: [
                                        "Weight: ",
                                        currentQuestion.adaptiveMetadata.systemWeight,
                                        "x",
                                        adaptiveMeta.difficultyTarget && ` • Target: ${adaptiveMeta.difficultyTarget}`
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "bg-[#1a1e2b] border border-white/[0.06] rounded-2xl overflow-hidden",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                question: currentQuestion,
                                index: currentIndex,
                                noAutoReveal: true,
                                forceRevealed: revealed
                            })
                        }),
                        revealed && selectedAnswer && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `flex items-center gap-2 px-4 py-3 rounded-xl border ${isCorrectAnswer(selectedAnswer, currentQuestion) ? 'bg-[#00e5a0]/10 border-[#00e5a0]/20' : 'bg-[#ff5757]/10 border-[#ff5757]/20'}`,
                            children: [
                                isCorrectAnswer(selectedAnswer, currentQuestion) ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                            className: "w-5 h-5 text-[#00e5a0]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-semibold text-[#00e5a0]",
                                            children: "Correct!"
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-5 h-5 text-[#ff5757]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-sm font-semibold text-[#ff5757]",
                                            children: "Incorrect"
                                        })
                                    ]
                                }),
                                answers.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "ml-auto text-[10px] text-[#5a6178]",
                                    children: isCorrectAnswer(selectedAnswer, currentQuestion) ? '↑ Difficulty may increase' : '↓ Difficulty may decrease'
                                })
                            ]
                        }),
                        revealed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: nextQuestion,
                            disabled: submitting,
                            className: "w-full py-3 rounded-xl text-sm font-bold bg-[#00e5a0] text-[#0c0e14] hover:bg-[#00e5a0]/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50",
                            children: submitting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }),
                                    "Submitting..."
                                ]
                            }) : currentIndex >= questions.length - 1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    "View Results"
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    "Next Question",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    })
                                ]
                            })
                        })
                    ]
                }),
                phase === 'summary' && summaryData && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-5 py-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-center gap-6 py-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `text-4xl font-black ${summaryData.accuracy >= 80 ? 'text-[#00e5a0]' : summaryData.accuracy >= 50 ? 'text-[#f59e0b]' : 'text-[#ff5757]'}`,
                                            children: [
                                                summaryData.accuracy,
                                                "%"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6178] mt-1",
                                            children: "Accuracy"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-12 bg-white/[0.08]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "text-2xl font-bold text-[#e8ecf4]",
                                            children: [
                                                summaryData.correctAnswers,
                                                "/",
                                                summaryData.totalQuestions
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6178] mt-1",
                                            children: "Correct"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-12 bg-white/[0.08]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "text-2xl font-bold text-[#8b5cf6]",
                                            children: [
                                                "+",
                                                summaryData.xpEarned
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#5a6178] mt-1",
                                            children: "XP Earned"
                                        })
                                    ]
                                })
                            ]
                        }),
                        difficultyProgression.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "rounded-xl p-4 bg-[#1a1e2b] border border-white/[0.06]",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#8b5cf6]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs font-semibold text-[#e8ecf4]",
                                            children: "Difficulty Progression"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-end gap-1.5 h-16",
                                    children: difficultyProgression.map((dp, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 flex flex-col items-center gap-0.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-full rounded-t transition-all",
                                                    style: {
                                                        height: `${dp.difficulty === 'Hard' ? 100 : dp.difficulty === 'Medium' ? 65 : 35}%`,
                                                        background: dp.correct ? dp.difficulty === 'Hard' ? '#00e5a0' : dp.difficulty === 'Medium' ? 'rgba(0,229,160,0.6)' : 'rgba(0,229,160,0.3)' : dp.difficulty === 'Hard' ? '#ff5757' : dp.difficulty === 'Medium' ? 'rgba(255,87,87,0.6)' : 'rgba(255,87,87,0.3)',
                                                        minHeight: '4px'
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[7px] text-[#3a4055]",
                                                    children: dp.difficulty[0]
                                                })
                                            ]
                                        }, i))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3 mt-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1 text-[8px] text-[#5a6178]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "w-2 h-2 rounded-sm bg-[#00e5a0]"
                                                }),
                                                " Correct"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1 text-[8px] text-[#5a6178]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "w-2 h-2 rounded-sm bg-[#ff5757]"
                                                }),
                                                " Wrong"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        Object.keys(summaryData.systemBreakdown).length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "rounded-xl p-4 bg-[#1a1e2b] border border-white/[0.06]",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#22d3ee]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs font-semibold text-[#e8ecf4]",
                                            children: "Performance by System"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "space-y-2 max-h-40 overflow-y-auto",
                                    children: Object.entries(summaryData.systemBreakdown).map(([system, data])=>{
                                        const pct = data.total > 0 ? Math.round(data.correct / data.total * 100) : 0;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center justify-between mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[11px] font-medium text-[#c8cdd8] truncate",
                                                            children: system
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: `text-[10px] font-bold ${pct >= 80 ? 'text-[#00e5a0]' : pct >= 50 ? 'text-[#f59e0b]' : 'text-[#ff5757]'}`,
                                                            children: [
                                                                pct,
                                                                "% (",
                                                                data.correct,
                                                                "/",
                                                                data.total,
                                                                ")"
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-1.5 rounded-full bg-white/[0.06] overflow-hidden",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "h-full rounded-full transition-all duration-700",
                                                        style: {
                                                            width: `${Math.max(pct, 2)}%`,
                                                            background: pct >= 80 ? '#00e5a0' : pct >= 50 ? '#f59e0b' : '#ff5757'
                                                        }
                                                    })
                                                })
                                            ]
                                        }, system);
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "rounded-xl p-4 bg-[#00e5a0]/[0.06] border border-[#00e5a0]/10",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BarChart3_Brain_CheckCircle2_ChevronRight_Loader2_Sparkles_Target_TrendingUp_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#00e5a0] mt-0.5 flex-shrink-0"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs font-semibold text-[#00e5a0] mb-1",
                                                children: "Adaptive Recommendation"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[11px] text-[#8b95a8] leading-relaxed",
                                                children: summaryData.recommendation
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setPhase('config');
                                        setQuestions([]);
                                    },
                                    className: "flex-1 py-3 rounded-xl text-sm font-bold bg-[#1a1e2b] border border-white/[0.08] text-[#e8ecf4] hover:border-white/[0.15] transition-all",
                                    children: "New Quiz"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: handleClose,
                                    className: "flex-1 py-3 rounded-xl text-sm font-bold bg-[#00e5a0] text-[#0c0e14] hover:bg-[#00e5a0]/90 transition-all",
                                    children: "Done"
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

/***/ 45160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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