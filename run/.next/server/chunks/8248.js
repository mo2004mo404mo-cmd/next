"use strict";
exports.id = 8248;
exports.ids = [8248];
exports.modules = {

/***/ 88248:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExamSimulatorTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(304870);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(346633);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(244412);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(857762);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(862842);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(120759);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(537663);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(334644);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(715828);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(77014);
/* harmony import */ var _components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(910576);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(148874);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(890707);
/* harmony import */ var _components_medq_exam_sim_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(337023);
/* harmony import */ var _components_medq_exam_sim_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(247798);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * ExamSimulatorTab — timed USMLE-style question blocks with score reports.
 *
 * Tab adaptation of the standalone /exam-sim page: identical exam flow
 * (backend /api/exam-sim/*), but mounted inside the MedQ app shell as the
 * 'take-exam' tab instead of a separate route. Mounted inside the shell,
 * so this component does NOT render its own <html>/<body>/<main> wrapper —
 * the shell provides those.
 *
 *   Setup   → configure block size / duration / system focus, optionally
 *             pick specific questions, toggle Voice mode + Show-answer mode.
 *   Running → one question at a time, countdown timer, navigation grid, flags.
 *             Voice mode: TTS reads questions, mic captures spoken answers.
 *             Show-answer mode: instant feedback after each answer.
 *   Report  → score + pass band, per-organ-system / per-task breakdown,
 *             per-question review with full explanations.
 *
 * Props from the shell (`take-exam` tab): examId is intentionally unused — the
 * simulator creates its own Exam records through /api/exam-sim/start. onBack
 * (when provided) shows a back button in the setup phase.
 */ 






function fmtClock(totalSeconds) {
    const s = Math.max(0, totalSeconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const sec = s % 60;
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}` : `${m}:${sec.toString().padStart(2, '0')}`;
}
const BAND_COLORS = {
    'High performance': '#00e5a0',
    'Passing': '#4fc3f7',
    'Below passing': '#ff5757'
};
function ExamSimulatorTab({ onBack }) {
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('setup');
    // ── Setup ──
    const [blockSize, setBlockSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(40);
    const [durationMinutes, setDurationMinutes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(60);
    const [systemFocus, setSystemFocus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [starting, setStarting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [history, setHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [historyLoaded, setHistoryLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // New setup options
    const [voiceMode, setVoiceMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [answerMode, setAnswerMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('mcq');
    const [instantFeedback, setInstantFeedback] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [useCustomQuestions, setUseCustomQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const picker = (0,_components_medq_exam_sim_shared__WEBPACK_IMPORTED_MODULE_5__/* .useQuestionPicker */ .oi)();
    // ── Voice settings ──
    const { settings: voiceSettings, setSettings: setVoiceSettings, voices } = (0,_components_medq_exam_sim_shared__WEBPACK_IMPORTED_MODULE_5__/* .useVoiceSettings */ .Jf)();
    // ── Running ──
    const [examId, setExamId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [answers, setAnswers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const answersRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    const [transcripts, setTranscripts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [currentIdx, setCurrentIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [flagged, setFlagged] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [secondsLeft, setSecondsLeft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [submitting, setSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showConfirmEnd, setShowConfirmEnd] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const submittedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const [spokenText, setSpokenText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // ── Report ──
    const [report, setReport] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [reviewOpen, setReviewOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    // ── Instant feedback ──
    const instantFb = (0,_components_medq_exam_sim_shared__WEBPACK_IMPORTED_MODULE_5__/* .useInstantFeedback */ .Yg)(examId);
    // Load history on setup phase
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (phase !== 'setup' || historyLoaded) return;
        let cancelled = false;
        (async ()=>{
            try {
                const res = await fetch('/api/exam-sim/history');
                if (res.ok) {
                    const data = await res.json();
                    if (!cancelled) setHistory(data.attempts || []);
                }
            } catch  {}
            if (!cancelled) setHistoryLoaded(true);
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        phase,
        historyLoaded
    ]);
    const startExam = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setStarting(true);
        try {
            const payload = {
                count: blockSize,
                durationMinutes,
                system: systemFocus
            };
            if (useCustomQuestions && picker.selectedCount >= 5) {
                payload.questionIds = picker.selectedIds();
            }
            const res = await fetch('/api/exam-sim/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error(data.error || 'Could not start the exam');
                return;
            }
            setExamId(data.examId);
            setQuestions((data.questions || []).map((q)=>({
                    ...q,
                    options: typeof q.options === 'string' ? safeParse(q.options) : q.options,
                    tags: typeof q.tags === 'string' ? safeParse(q.tags) : Array.isArray(q.tags) ? q.tags : [],
                    sources: typeof q.sources === 'string' ? safeParse(q.sources) : Array.isArray(q.sources) ? q.sources : [],
                    answer: '',
                    explanation: '',
                    mnemonic: '',
                    clinicalPearl: '',
                    distractorAnalysis: ''
                })));
            setAnswers({});
            answersRef.current = {};
            setTranscripts({});
            setCurrentIdx(0);
            setFlagged(new Set());
            setSecondsLeft(data.durationMinutes * 60);
            submittedRef.current = false;
            setSpokenText('');
            instantFb.clear();
            setPhase('running');
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.success(`${data.count}-question simulation started — good luck!`);
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Could not start the exam — check your connection');
        } finally{
            setStarting(false);
        }
    }, [
        blockSize,
        durationMinutes,
        systemFocus,
        useCustomQuestions,
        picker
    ]);
    const submitExam = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (auto)=>{
        if (submittedRef.current || !examId) return;
        submittedRef.current = true;
        setSubmitting(true);
        try {
            const res = await fetch(`/api/exam-sim/${examId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answers: answersRef.current,
                    autoSubmitted: auto
                })
            });
            const data = await res.json();
            if (!res.ok) {
                submittedRef.current = false;
                sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error(data.error || 'Submit failed');
                return;
            }
            // Merge voice transcripts into report
            const merged = {
                ...data,
                results: (data.results || []).map((r)=>({
                        ...r,
                        selectedAnswer: transcripts[r.questionId] || r.selectedAnswer
                    }))
            };
            setReport(merged);
            setReviewOpen({});
            setPhase('report');
            if (auto) sonner__WEBPACK_IMPORTED_MODULE_4__.toast.info('Time is up — the exam was submitted automatically');
        } catch  {
            submittedRef.current = false;
            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Submit failed — check your connection');
        } finally{
            setSubmitting(false);
        }
    }, [
        examId,
        transcripts
    ]);
    // Countdown timer + auto-submit at zero
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (phase !== 'running') return;
        const interval = setInterval(()=>{
            setSecondsLeft((s)=>{
                if (s <= 1) {
                    clearInterval(interval);
                    submitExam(true);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        return ()=>clearInterval(interval);
    }, [
        phase,
        submitExam
    ]);
    const onSelectAnswer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((questionId, value)=>{
        const next = {
            ...answersRef.current
        };
        if (value) next[questionId] = value;
        else delete next[questionId];
        answersRef.current = next;
        setAnswers(next);
        // Trigger instant feedback if enabled
        if (instantFeedback && examId && value) {
            instantFb.check(questionId, value);
        }
    }, [
        instantFeedback,
        examId,
        instantFb
    ]);
    const toggleFlag = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((questionId)=>{
        setFlagged((prev)=>{
            const next = new Set(prev);
            if (next.has(questionId)) next.delete(questionId);
            else next.add(questionId);
            return next;
        });
    }, []);
    // Reset spoken text when navigating
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (phase !== 'running') return;
        const q = questions[currentIdx];
        if (q) {
            setSpokenText(transcripts[q.id] || '');
        }
    }, [
        currentIdx,
        phase,
        questions,
        transcripts
    ]);
    const answeredCount = Object.keys(answers).length;
    // ───────────────────────────────────────────────────────────────────────────
    // SETUP PHASE
    // ───────────────────────────────────────────────────────────────────────────
    if (phase === 'setup') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-2xl mx-auto px-4 py-6 pb-10",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 mb-2",
                    children: [
                        onBack && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: onBack,
                            className: "w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-[#8b95a8] hover:text-[#e8ecf4] transition-colors",
                            "aria-label": "Back",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-12 h-12 rounded-2xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center justify-center",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-6 h-6 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                    className: "text-2xl font-bold",
                                    children: "Exam Simulator"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-sm text-[#8b95a8]",
                                    children: "Timed USMLE-style blocks \xb7 voice mode \xb7 instant feedback"
                                })
                            ]
                        })
                    ]
                }),
                voiceMode && !_components_medq_exam_sim_shared__WEBPACK_IMPORTED_MODULE_5__/* .TTS_SUPPORTED */ .dz && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs",
                    children: "⚠ Your browser doesn't support text-to-speech. Use Chrome, Edge, or Safari for voice mode."
                }),
                voiceMode && !_components_medq_exam_sim_shared__WEBPACK_IMPORTED_MODULE_5__/* .ASR_SUPPORTED */ .uq && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs",
                    children: "⚠ Your browser doesn't support speech recognition. Use Chrome, Edge, or Safari to answer by voice."
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6 space-y-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-xs font-bold text-[#8b95a8] uppercase tracking-wider",
                                    children: "Block size"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex gap-2 mt-2",
                                    children: [
                                        20,
                                        40,
                                        60
                                    ].map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setBlockSize(n);
                                                setDurationMinutes(Math.round(n * 1.5));
                                            },
                                            disabled: useCustomQuestions,
                                            className: `flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${blockSize === n ? 'bg-[#00e5a0]/[0.12] border-[#00e5a0]/40 text-[#00e5a0]' : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478] hover:text-[#e8ecf4]'}`,
                                            children: [
                                                n,
                                                " questions"
                                            ]
                                        }, n))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[10px] text-[#5a6478] mt-1.5",
                                    children: useCustomQuestions ? 'Block size ignored — using your picked questions' : 'USMLE pace: ~1.5 minutes per question'
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-bold text-[#8b95a8] uppercase tracking-wider",
                                            children: "Time limit (min)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "number",
                                            min: 10,
                                            max: 240,
                                            value: durationMinutes,
                                            onChange: (e)=>setDurationMinutes(Math.min(240, Math.max(10, Number(e.target.value) || 60))),
                                            className: "w-full mt-2 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#e8ecf4] focus:outline-none focus:border-[#00e5a0]/40"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-bold text-[#8b95a8] uppercase tracking-wider",
                                            children: "System focus"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                            value: systemFocus,
                                            onChange: (e)=>setSystemFocus(e.target.value),
                                            disabled: useCustomQuestions,
                                            className: "w-full mt-2 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#e8ecf4] focus:outline-none focus:border-[#00e5a0]/40 disabled:opacity-40",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                    value: "all",
                                                    children: "All systems (balanced)"
                                                }),
                                                _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                        value: s,
                                                        children: s
                                                    }, s))
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "grid grid-cols-1 gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setVoiceMode((v)=>!v),
                                    className: `w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${voiceMode ? 'bg-[#4fc3f7]/[0.08] border-[#4fc3f7]/40' : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `w-9 h-9 rounded-lg flex items-center justify-center ${voiceMode ? 'bg-[#4fc3f7] text-[#0a0e1a]' : 'bg-white/5 text-[#5a6478]'}`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-sm font-bold text-[#e8ecf4]",
                                                    children: "Voice mode"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[10px] text-[#8b95a8]",
                                                    children: "Read questions aloud \xb7 answer with your voice"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `w-10 h-5 rounded-full p-0.5 transition-all ${voiceMode ? 'bg-[#4fc3f7]' : 'bg-white/10'}`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: `w-4 h-4 rounded-full bg-white transition-transform ${voiceMode ? 'translate-x-5' : ''}`
                                            })
                                        })
                                    ]
                                }),
                                voiceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "ml-12 grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setAnswerMode('mcq'),
                                            className: `p-2 rounded-lg border text-left text-xs ${answerMode === 'mcq' ? 'bg-[#4fc3f7]/15 border-[#4fc3f7]/40 text-[#4fc3f7]' : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "font-bold",
                                                    children: "MCQ voice"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[10px]",
                                                    children: 'Say "B" / "option C" — auto-graded'
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setAnswerMode('open'),
                                            className: `p-2 rounded-lg border text-left text-xs ${answerMode === 'open' ? 'bg-[#4fc3f7]/15 border-[#4fc3f7]/40 text-[#4fc3f7]' : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "font-bold",
                                                    children: "Open voice"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[10px]",
                                                    children: "Speak naturally — self-review"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setInstantFeedback((v)=>!v),
                                    className: `w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${instantFeedback ? 'bg-[#f59e0b]/[0.08] border-[#f59e0b]/40' : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `w-9 h-9 rounded-lg flex items-center justify-center ${instantFeedback ? 'bg-[#f59e0b] text-[#0a0e1a]' : 'bg-white/5 text-[#5a6478]'}`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-sm font-bold text-[#e8ecf4]",
                                                    children: "Show answer after answering"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[10px] text-[#8b95a8]",
                                                    children: "Instant feedback: see correct answer + explanation right after each question"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `w-10 h-5 rounded-full p-0.5 transition-all ${instantFeedback ? 'bg-[#f59e0b]' : 'bg-white/10'}`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: `w-4 h-4 rounded-full bg-white transition-transform ${instantFeedback ? 'translate-x-5' : ''}`
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setUseCustomQuestions((v)=>!v),
                                    className: `w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${useCustomQuestions ? 'bg-[#a78bfa]/[0.08] border-[#a78bfa]/40' : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `w-9 h-9 rounded-lg flex items-center justify-center ${useCustomQuestions ? 'bg-[#a78bfa] text-[#0a0e1a]' : 'bg-white/5 text-[#5a6478]'}`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-sm font-bold text-[#e8ecf4]",
                                                    children: "Pick specific questions"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[10px] text-[#8b95a8]",
                                                    children: "Search the question bank and choose exactly which questions to include"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `w-10 h-5 rounded-full p-0.5 transition-all ${useCustomQuestions ? 'bg-[#a78bfa]' : 'bg-white/10'}`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: `w-4 h-4 rounded-full bg-white transition-transform ${useCustomQuestions ? 'translate-x-5' : ''}`
                                            })
                                        })
                                    ]
                                }),
                                useCustomQuestions && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "ml-0",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_exam_sim_components__WEBPACK_IMPORTED_MODULE_6__/* .QuestionPicker */ .xX, {
                                            picker: picker
                                        }),
                                        picker.selectedCount > 0 && picker.selectedCount < 5 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "mt-2 text-[10px] text-[#ff8a8a]",
                                            children: [
                                                "Pick at least 5 questions to use custom selection (currently ",
                                                picker.selectedCount,
                                                ")."
                                            ]
                                        }),
                                        picker.selectedCount >= 5 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "mt-2 text-[10px] text-[#00e5a0]",
                                            children: [
                                                "✓ ",
                                                picker.selectedCount,
                                                " questions selected — exam will use these."
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            onClick: startExam,
                            disabled: starting || useCustomQuestions && picker.selectedCount < 5,
                            className: "w-full py-3.5 rounded-xl text-sm font-bold bg-[#00e5a0]/[0.12] text-[#00e5a0] border border-[#00e5a0]/30 hover:bg-[#00e5a0]/[0.2] transition-all disabled:opacity-50 flex items-center justify-center gap-2",
                            children: [
                                starting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                    className: "w-4 h-4 animate-spin"
                                }) : voiceMode ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                starting ? 'Building your exam…' : useCustomQuestions && picker.selectedCount >= 5 ? `Start exam with ${picker.selectedCount} picked questions` : `Start ${blockSize}-question simulation${voiceMode ? ' (voice)' : ''}${instantFeedback ? ' (instant feedback)' : ''}`
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-[10px] text-[#5a6478] text-center",
                            children: [
                                useCustomQuestions ? 'Custom selection · preserves your order' : 'Questions balanced across organ systems · medically-reviewed preferred',
                                !instantFeedback && ' · answers graded at submit'
                            ]
                        })
                    ]
                }),
                historyLoaded && history.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#f59e0b]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "text-sm font-bold",
                                    children: "Past simulations"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2",
                            children: history.slice(0, 5).map((h)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-lg font-bold tabular-nums w-14 text-right",
                                            style: {
                                                color: h.percentage >= 70 ? '#00e5a0' : h.percentage >= 55 ? '#4fc3f7' : '#ff5757'
                                            },
                                            children: [
                                                h.percentage.toFixed(0),
                                                "%"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs font-semibold truncate",
                                                    children: h.title
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] text-[#5a6478]",
                                                    children: [
                                                        h.score,
                                                        "/",
                                                        h.totalQuestions,
                                                        " correct \xb7 ",
                                                        new Date(h.completedAt).toLocaleString()
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, h.id))
                        })
                    ]
                })
            ]
        });
    }
    // ───────────────────────────────────────────────────────────────────────────
    // RUNNING PHASE
    // ───────────────────────────────────────────────────────────────────────────
    if (phase === 'running') {
        const q = questions[currentIdx];
        const lowTime = secondsLeft < 300;
        if (!q) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-8 text-center text-[#5a6478]",
            children: "No questions."
        });
        const opts = typeof q.options === 'string' ? safeParse(q.options) : q.options || [];
        const selectedLetter = answers[q.id];
        const fb = instantFb.feedback[q.id];
        const isChecking = instantFb.checking.has(q.id);
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "text-[#e8ecf4]",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "sticky top-0 z-40 bg-[#0b0e15]/95 backdrop-blur border-b border-white/[0.06]",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "max-w-3xl mx-auto px-4 py-3 flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: `flex items-center gap-2 font-mono text-xl font-bold tabular-nums ${lowTime ? 'text-[#ff5757] animate-pulse' : 'text-[#e8ecf4]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                            className: "w-5 h-5"
                                        }),
                                        fmtClock(secondsLeft)
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1 text-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-xs font-bold",
                                            children: [
                                                "Q",
                                                currentIdx + 1,
                                                " / ",
                                                questions.length
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-[10px] text-[#5a6478]",
                                            children: [
                                                answeredCount,
                                                " answered \xb7 ",
                                                questions.length - answeredCount,
                                                " blank",
                                                voiceMode && ' · 🎤 voice',
                                                instantFeedback && ' · instant'
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>setShowConfirmEnd(true),
                                    disabled: submitting,
                                    className: "px-4 py-2 rounded-xl text-xs font-bold bg-[#ff5757]/[0.1] text-[#ff8a8a] border border-[#ff5757]/25 hover:bg-[#ff5757]/[0.18] transition-all",
                                    children: "End & Submit"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-0.5 bg-white/[0.05]",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-full bg-[#00e5a0]/60 transition-all",
                                style: {
                                    width: `${answeredCount / questions.length * 100}%`
                                }
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "max-w-3xl mx-auto px-4 py-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>toggleFlag(q.id),
                                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${flagged.has(q.id) ? 'bg-[#f59e0b]/[0.12] border-[#f59e0b]/40 text-[#f59e0b]' : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478] hover:text-[#f59e0b]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        flagged.has(q.id) ? 'Flagged' : 'Flag for review'
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] text-[#5a6478] ml-auto",
                                    children: instantFeedback ? 'instant feedback ON' : 'no feedback until submit — like the real thing'
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                            question: q,
                            index: currentIdx,
                            noAutoReveal: true,
                            attemptMode: "exam-sim",
                            initialSelected: answers[q.id] ?? null,
                            onSelectedChange: (value)=>onSelectAnswer(q.id, value)
                        }, q.id),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_exam_sim_components__WEBPACK_IMPORTED_MODULE_6__/* .VoicePanel */ .LP, {
                            voiceMode: voiceMode,
                            voiceSettings: voiceSettings,
                            setVoiceSettings: setVoiceSettings,
                            voices: voices,
                            questionText: q.text,
                            options: opts,
                            selectedLetter: selectedLetter,
                            onLetterSelected: (letter)=>onSelectAnswer(q.id, letter),
                            onTranscript: (t)=>setTranscripts((prev)=>({
                                        ...prev,
                                        [q.id]: t
                                    })),
                            answerMode: answerMode,
                            spokenText: spokenText,
                            setSpokenText: setSpokenText,
                            onOpenAnswerChange: (text)=>onSelectAnswer(q.id, text)
                        }),
                        instantFeedback && (fb || isChecking) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_exam_sim_components__WEBPACK_IMPORTED_MODULE_6__/* .InstantFeedbackPanel */ .zd, {
                            feedback: fb,
                            checking: isChecking,
                            onNext: ()=>{
                                if (currentIdx < questions.length - 1) setCurrentIdx((i)=>i + 1);
                                else submitExam(false);
                            },
                            isLast: currentIdx === questions.length - 1
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mt-6 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentIdx((i)=>Math.max(0, i - 1)),
                                    disabled: currentIdx === 0,
                                    className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/[0.08] text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        }),
                                        " Previous"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentIdx((i)=>Math.min(questions.length - 1, i + 1)),
                                    disabled: currentIdx === questions.length - 1,
                                    className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00e5a0]/[0.12] border border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/[0.2] disabled:opacity-30 disabled:cursor-not-allowed",
                                    children: [
                                        "Next ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                            className: "w-4 h-4"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[10px] text-[#5a6478] mb-2 flex items-center gap-1.5 uppercase tracking-wider",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }),
                                        " question navigator"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex flex-wrap gap-1.5",
                                    children: questions.map((qq, i)=>{
                                        const isAnswered = Boolean(answers[qq.id]);
                                        const isFlagged = flagged.has(qq.id);
                                        const isCurrent = i === currentIdx;
                                        const hasFb = instantFb.feedback[qq.id];
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: ()=>setCurrentIdx(i),
                                            className: `w-8 h-8 rounded-lg text-[11px] font-bold border transition-all ${isCurrent ? 'bg-[#4fc3f7] border-[#4fc3f7] text-[#0a1a24]' : hasFb ? hasFb.correct ? 'bg-[#00e5a0]/[0.15] border-[#00e5a0]/40 text-[#00e5a0]' : 'bg-[#ff5757]/[0.15] border-[#ff5757]/40 text-[#ff8a8a]' : isAnswered ? 'bg-[#00e5a0]/[0.15] border-[#00e5a0]/40 text-[#00e5a0]' : 'bg-white/[0.03] border-white/[0.08] text-[#5a6478] hover:text-[#e8ecf4]'} ${isFlagged && !isCurrent ? 'ring-1 ring-[#f59e0b]/60' : ''}`,
                                            children: i + 1
                                        }, qq.id);
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "mt-4 text-center text-[10px] text-[#3a4055]",
                            children: "⚠️ Answers live in this tab — do not refresh. The exam auto-submits when time runs out."
                        })
                    ]
                }),
                showConfirmEnd && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "max-w-md w-full rounded-2xl border border-white/[0.08] bg-[#151821] p-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                        className: "w-5 h-5 text-[#f59e0b]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-base font-bold",
                                        children: "Submit the exam?"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-sm text-[#8b95a8] mb-2",
                                children: [
                                    "You answered ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "font-bold text-[#00e5a0]",
                                        children: answeredCount
                                    }),
                                    " of ",
                                    questions.length,
                                    " questions."
                                ]
                            }),
                            questions.length - answeredCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs text-[#ff8a8a] mb-4",
                                children: [
                                    questions.length - answeredCount,
                                    " unanswered question",
                                    questions.length - answeredCount > 1 ? 's' : '',
                                    " will be graded as incorrect."
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-3 mt-5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>setShowConfirmEnd(false),
                                        className: "flex-1 py-2.5 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/[0.08] text-[#e8ecf4] hover:bg-white/[0.08]",
                                        children: "Keep working"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setShowConfirmEnd(false);
                                            submitExam(false);
                                        },
                                        disabled: submitting,
                                        className: "flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#ff5757]/[0.12] border border-[#ff5757]/30 text-[#ff8a8a] hover:bg-[#ff5757]/[0.2] disabled:opacity-50",
                                        children: submitting ? 'Submitting…' : 'Submit now'
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        });
    }
    // ───────────────────────────────────────────────────────────────────────────
    // REPORT PHASE
    // ───────────────────────────────────────────────────────────────────────────
    if (phase === 'report' && report) {
        const bandColor = BAND_COLORS[report.band] || '#8b95a8';
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-3xl mx-auto px-4 py-6 pb-10 text-[#e8ecf4]",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-2xl border border-white/[0.06] bg-[#151821] p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                            className: "w-10 h-10 mx-auto mb-3",
                            style: {
                                color: bandColor
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-5xl font-bold tabular-nums",
                            style: {
                                color: bandColor
                            },
                            children: [
                                report.percentage.toFixed(1),
                                "%"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-sm text-[#8b95a8] mt-1",
                            children: [
                                report.score,
                                " / ",
                                report.total,
                                " correct \xb7 ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "font-bold",
                                    style: {
                                        color: bandColor
                                    },
                                    children: report.band
                                })
                            ]
                        }),
                        report.autoSubmitted && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[11px] text-[#f59e0b] mt-2",
                            children: "⏰ Time expired — submitted automatically"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            onClick: ()=>{
                                setPhase('setup');
                                setHistoryLoaded(false);
                            },
                            className: "mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00e5a0]/[0.12] text-[#00e5a0] border border-[#00e5a0]/30 hover:bg-[#00e5a0]/[0.2] transition-all",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                " New simulation"
                            ]
                        })
                    ]
                }),
                report.perOrgan.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                            className: "text-sm font-bold mb-4",
                            children: [
                                "Performance by organ system ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[#5a6478] font-normal text-[10px]",
                                    children: "(weakest first)"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-3",
                            children: report.perOrgan.map((row)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex justify-between text-[11px] mb-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-semibold",
                                                    children: row.system
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[#8b95a8] tabular-nums",
                                                    children: [
                                                        row.correct,
                                                        "/",
                                                        row.total,
                                                        " \xb7 ",
                                                        row.pct,
                                                        "%"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-2 rounded-full bg-white/[0.05] overflow-hidden",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-full rounded-full transition-all",
                                                style: {
                                                    width: `${row.pct}%`,
                                                    background: row.pct >= 70 ? '#00e5a0' : row.pct >= 55 ? '#4fc3f7' : '#ff5757'
                                                }
                                            })
                                        })
                                    ]
                                }, row.system))
                        })
                    ]
                }),
                report.perTask.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                            className: "text-sm font-bold mb-4",
                            children: [
                                "Performance by task ",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[#5a6478] font-normal text-[10px]",
                                    children: "(USMLE-style competency)"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-3",
                            children: report.perTask.map((row)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex justify-between text-[11px] mb-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-semibold",
                                                    children: row.task
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[#8b95a8] tabular-nums",
                                                    children: [
                                                        row.correct,
                                                        "/",
                                                        row.total,
                                                        " \xb7 ",
                                                        row.pct,
                                                        "%"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-2 rounded-full bg-white/[0.05] overflow-hidden",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-full rounded-full transition-all",
                                                style: {
                                                    width: `${row.pct}%`,
                                                    background: row.pct >= 70 ? '#00e5a0' : row.pct >= 55 ? '#4fc3f7' : '#ff5757'
                                                }
                                            })
                                        })
                                    ]
                                }, row.task))
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                            className: "text-sm font-bold mb-4",
                            children: "Question review"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2",
                            children: report.results.map((row, i)=>{
                                const open = reviewOpen[row.questionId];
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-xl border border-white/[0.06] overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setReviewOpen((prev)=>({
                                                        ...prev,
                                                        [row.questionId]: !open
                                                    })),
                                            className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] text-left",
                                            children: [
                                                row.correct ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 text-[#00e5a0] flex-shrink-0"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 text-[#ff5757] flex-shrink-0"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-xs font-bold",
                                                    children: [
                                                        "Q",
                                                        i + 1
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "flex-1 text-[11px] text-[#8b95a8] truncate",
                                                    children: row.blank ? '(left blank)' : row.question ? plainPreview(row.question.text) : ''
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: `text-[10px] font-bold px-2 py-0.5 rounded-md ${row.correct ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'bg-[#ff5757]/10 text-[#ff8a8a]'}`,
                                                    children: row.correct ? 'CORRECT' : row.blank ? 'BLANK' : 'WRONG'
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_ArrowLeft_CheckCircle2_ChevronLeft_ChevronRight_Clock_Flag_Headphones_LayoutGrid_Mic_Play_RotateCcw_Settings_Trophy_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                    className: `w-4 h-4 text-[#5a6478] transition-transform ${open ? 'rotate-90' : ''}`
                                                })
                                            ]
                                        }),
                                        open && row.question && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "px-4 pb-4",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mb-3 text-[11px]",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[#5a6478]",
                                                            children: "Your answer: "
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: row.correct ? 'text-[#00e5a0] font-bold' : 'text-[#ff8a8a] font-bold',
                                                            children: row.blank ? '—' : row.selectedAnswer
                                                        }),
                                                        !row.correct && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[#5a6478]",
                                                                    children: " \xb7 Correct: "
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[#00e5a0] font-bold",
                                                                    children: row.correctAnswer
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                                    question: row.question,
                                                    index: i,
                                                    forceRevealed: true
                                                })
                                            ]
                                        })
                                    ]
                                }, row.questionId);
                            })
                        })
                    ]
                })
            ]
        });
    }
    return null;
}
function safeParse(raw) {
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch  {
        return [];
    }
}
function plainPreview(html) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90);
}


/***/ }),

/***/ 304870:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrowLeft)
/* harmony export */ });
/* unused harmony export __iconData */
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165667);
/**
 * @license lucide-react v1.64.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const __iconData = {
    name: "arrow-left",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m12 19-7-7 7-7",
                key: "1l729n"
            }
        ],
        [
            "path",
            {
                d: "M19 12H5",
                key: "x3x0zl"
            }
        ]
    ]
};
__iconData.node;
const ArrowLeft = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=arrow-left.mjs.map


/***/ })

};
;