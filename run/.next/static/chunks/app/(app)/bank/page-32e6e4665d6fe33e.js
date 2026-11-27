(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[32266],{

/***/ 13276:
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
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58546);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32949);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45477);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(49387);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11975);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31799);
/* harmony import */ var _base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(52579);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40980);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89239);
/* __next_internal_client_entry_do_not_use__ AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogMedia,AlertDialogOverlay,AlertDialogPortal,AlertDialogTitle,AlertDialogTrigger auto */ 




function AlertDialog({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_3__/* .AlertDialogRoot */ .V, {
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
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_4__/* .DialogPortal */ .Z, {
        "data-slot": "alert-dialog-portal",
        ...props
    });
}
function AlertDialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogBackdrop */ .X, {
        "data-slot": "alert-dialog-overlay",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
        ...props
    });
}
function AlertDialogContent({ className, size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(AlertDialogPortal, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AlertDialogOverlay, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_7__/* .DialogPopup */ .h, {
                "data-slot": "alert-dialog-content",
                "data-size": size,
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props
            })
        ]
    });
}
function AlertDialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "alert-dialog-header",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
        ...props
    });
}
function AlertDialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "alert-dialog-footer",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
        ...props
    });
}
function AlertDialogMedia({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "alert-dialog-media",
        className: cn("mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6", className),
        ...props
    });
}
function AlertDialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_8__/* .DialogTitle */ .L, {
        "data-slot": "alert-dialog-title",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
        ...props
    });
}
function AlertDialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_9__/* .DialogDescription */ .r, {
        "data-slot": "alert-dialog-description",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
        ...props
    });
}
function AlertDialogAction({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        "data-slot": "alert-dialog-action",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)(className),
        ...props
    });
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_alert_dialog__WEBPACK_IMPORTED_MODULE_10__/* .DialogClose */ .H, {
        "data-slot": "alert-dialog-cancel",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)(className),
        render: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
            variant: variant,
            size: size
        }),
        ...props
    });
}



/***/ }),

/***/ 17414:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AM: () => (/* binding */ Popover),
/* harmony export */   Wv: () => (/* binding */ PopoverTrigger),
/* harmony export */   hl: () => (/* binding */ PopoverContent)
/* harmony export */ });
/* unused harmony exports PopoverDescription, PopoverHeader, PopoverTitle */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52195);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(78211);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(99447);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(91763);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(89279);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52968);
/* __next_internal_client_entry_do_not_use__ Popover,PopoverContent,PopoverDescription,PopoverHeader,PopoverTitle,PopoverTrigger auto */ 



function Popover({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverRoot */ .y, {
        "data-slot": "popover",
        ...props
    });
}
function PopoverTrigger({ asChild, children, ...props }) {
    if (asChild && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(children)) {
        // base-ui has no Slot: clone the child and chain its handlers with the
        // trigger's own. Casts keep the polyfill generic over the child element.
        const child = children;
        const childProps = child.props;
        const chain = (name, own)=>(event)=>{
                childProps[name]?.(event);
                own?.(event);
            };
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(child, {
            ...props,
            ...childProps,
            'data-slot': 'popover-trigger',
            onClick: chain('onClick', props.onClick),
            onPointerDown: chain('onPointerDown', props.onPointerDown),
            onKeyDown: chain('onKeyDown', props.onKeyDown),
            onMouseDown: chain('onMouseDown', props.onMouseDown),
            onFocus: chain('onFocus', props.onFocus),
            onBlur: chain('onBlur', props.onBlur),
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)(childProps.className, props.className)
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_4__/* .PopoverTrigger */ .W, {
        "data-slot": "popover-trigger",
        ...props,
        children: children
    });
}
function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, collisionPadding, positionerClassName, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverPortal */ .i, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__/* .PopoverPositioner */ .U, {
            align: align,
            alignOffset: alignOffset,
            side: side,
            sideOffset: sideOffset,
            collisionPadding: collisionPadding,
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)("isolate", positionerClassName || "z-50"),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_7__/* .PopoverPopup */ .i, {
                "data-slot": "popover-content",
                className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)("z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props
            })
        })
    });
}
function PopoverHeader({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "popover-header",
        className: cn("flex flex-col gap-0.5 text-sm", className),
        ...props
    });
}
function PopoverTitle({ className, ...props }) {
    return /*#__PURE__*/ _jsx(PopoverPrimitive.Title, {
        "data-slot": "popover-title",
        className: cn("font-medium", className),
        ...props
    });
}
function PopoverDescription({ className, ...props }) {
    return /*#__PURE__*/ _jsx(PopoverPrimitive.Description, {
        "data-slot": "popover-description",
        className: cn("text-muted-foreground", className),
        ...props
    });
}



/***/ }),

/***/ 20283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ExplainQuestionsModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42763);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34000);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9005);
/* harmony import */ var _components_medq_byok_ModelPicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12561);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * ExplainQuestionsModal — batch AI explanation generator UI.
 *
 * Flow:
 *   1. CONFIRM — shows how many questions lack explanations (whole bank) or
 *      the selected count; when launched from a selection, a "replace
 *      existing explanations" toggle enables REGENERATION (overwrite).
 *   2. RUNNING — polls the server-side job. The job is resumable: a
 *      rate-limited pass pauses server-side and auto-resumes on the next
 *      poll (shown as "Pass N"); each batch's writes are durable, so the
 *      written counter climbs in real time. "Run in background" keeps a
 *      localStorage pointer and closes the modal — reopening re-attaches.
 *   3. DONE / ERROR — summary (written / failed) with a bank refresh.
 *
 * Explanations are generated as rich structured teaching notes (why the
 * answer is correct → why each other option is wrong → key pearls →
 * one-line takeaway) and stored as styled HTML the question card renders.
 */ 



/** localStorage pointer to a running explanation job (Knowledge-Library
 *  pattern — the job lives server-side in Postgres). */ const EXPLAIN_JOB_KEY = 'medq:explain-job';
const EXPLAIN_JOB_MAX_AGE_MS = 24 * 60 * 60000;
/** No progress for this long while "running" → treat as stalled. */ const EXPLAIN_STALL_MS = 60 * 60000;
const POLL_MIN_MS = 2500;
const POLL_MAX_MS = 10000;
function formatElapsed(ms) {
    const s = Math.floor(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ${s % 60}s`;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
}
function ExplainQuestionsModal({ open, onOpenChange, selectedIds, onCompleted }) {
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('confirm');
    const [missing, setMissing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [bankTotal, setBankTotal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [overwrite, setOverwrite] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [starting, setStarting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [jobId, setJobId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        done: 0,
        total: 0
    });
    const [written, setWritten] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [failed, setFailed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [totalQuestions, setTotalQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [pass, setPass] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [errorMsg, setErrorMsg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [startedAtMs, setStartedAtMs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Date.now());
    const [elapsed, setElapsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const pollTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const lastServerUpdate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const completedNotified = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    // ── Model selection (drives x-model on the start request) ──
    // undefined = not loaded yet; null = Auto; string = "providerId:modelId".
    // Initialized from the user's saved default so the picker reflects what
    // the server would use anyway; the user can override per run.
    const [userDefault, setUserDefault] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [model, setModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const isSelectionMode = Array.isArray(selectedIds) && selectedIds.length > 0;
    // ── Confirm-step data (whole-bank mode): how many questions lack explanations ──
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open || phase !== 'confirm') return;
        let cancelled = false;
        (async ()=>{
            // Best-effort parallel: missing-count (whole-bank mode) + default model.
            const modelPromise = fetch('/api/providers', {
                cache: 'no-store'
            }).then((r)=>r.ok ? r.json() : null).then((d)=>cancelled ? undefined : (setUserDefault(d?.userDefault ?? null), d?.userDefault ?? null)).catch(()=>undefined);
            if (isSelectionMode) {
                void modelPromise;
                return;
            }
            try {
                const res = await fetch('/api/questions/explain', {
                    cache: 'no-store'
                });
                if (!res.ok) return;
                const data = await res.json();
                if (!cancelled) {
                    setMissing(typeof data.missing === 'number' ? data.missing : null);
                    setBankTotal(typeof data.total === 'number' ? data.total : null);
                }
            } catch  {
            /* confirm data is best-effort */ }
        })();
        return ()=>{
            cancelled = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        open,
        phase,
        isSelectionMode
    ]);
    // ── Re-attach to a running background job when the modal opens ──
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        try {
            const raw = localStorage.getItem(EXPLAIN_JOB_KEY);
            if (!raw) return;
            const ptr = JSON.parse(raw);
            if (!ptr?.jobId || Date.now() - ptr.startedAt > EXPLAIN_JOB_MAX_AGE_MS) {
                localStorage.removeItem(EXPLAIN_JOB_KEY);
                return;
            }
            setJobId(ptr.jobId);
            setStartedAtMs(ptr.startedAt);
            setPhase('running');
        } catch  {
            localStorage.removeItem(EXPLAIN_JOB_KEY);
        }
    }, [
        open
    ]);
    // ── Elapsed ticker while running ──
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (phase !== 'running') return;
        const t = setInterval(()=>setElapsed(Date.now() - startedAtMs), 1000);
        return ()=>clearInterval(t);
    }, [
        phase,
        startedAtMs
    ]);
    const finishJob = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((data)=>{
        setFailed(typeof data.failed === 'number' ? data.failed : 0);
        setPhase('done');
        localStorage.removeItem(EXPLAIN_JOB_KEY);
        if (!completedNotified.current) {
            completedNotified.current = true;
            onCompleted?.();
        }
    }, [
        onCompleted
    ]);
    // ── The polling loop ──
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (phase !== 'running' || !jobId) return;
        let cancelled = false;
        let delay = POLL_MIN_MS;
        const poll = async ()=>{
            try {
                const res = await fetch(`/api/questions/explain?jobId=${encodeURIComponent(jobId)}`, {
                    cache: 'no-store'
                });
                const data = await res.json().catch(()=>({}));
                if (cancelled) return;
                if (data.status === 'running') {
                    if (data.serverUpdatedAt && data.serverUpdatedAt !== lastServerUpdate.current) {
                        lastServerUpdate.current = data.serverUpdatedAt;
                        delay = POLL_MIN_MS; // server is alive — poll fast
                    } else {
                        delay = Math.min(delay * 1.6, POLL_MAX_MS); // quiet — back off
                    }
                    setProgress(data.progress ?? {
                        done: 0,
                        total: 0
                    });
                    setWritten(typeof data.written === 'number' ? data.written : 0);
                    setTotalQuestions(typeof data.totalQuestions === 'number' ? data.totalQuestions : 0);
                    setPass(typeof data.pass === 'number' ? data.pass : 1);
                    // Stalled: no server update for a very long time and not done.
                    if (lastServerUpdate.current && Date.now() - lastServerUpdate.current > EXPLAIN_STALL_MS) {
                        setPhase('error');
                        setErrorMsg('The job appears stalled (no server activity for a long time). Already-written explanations are kept — you can safely start again for the remaining ones.');
                        localStorage.removeItem(EXPLAIN_JOB_KEY);
                        return;
                    }
                    pollTimer.current = setTimeout(poll, delay);
                    return;
                }
                if (data.status === 'done') {
                    setWritten(typeof data.written === 'number' ? data.written : 0);
                    finishJob(data);
                    return;
                }
                // error / unknown
                setPhase('error');
                setErrorMsg(data.error || 'Explanation generation failed.');
                localStorage.removeItem(EXPLAIN_JOB_KEY);
            } catch  {
                if (cancelled) return;
                // Network hiccup — keep trying with backoff.
                delay = Math.min(delay * 1.6, POLL_MAX_MS);
                pollTimer.current = setTimeout(poll, delay);
            }
        };
        pollTimer.current = setTimeout(poll, POLL_MIN_MS);
        return ()=>{
            cancelled = true;
            if (pollTimer.current) clearTimeout(pollTimer.current);
        };
    }, [
        phase,
        jobId,
        finishJob
    ]);
    // ── Start ──
    const handleStart = async ()=>{
        setStarting(true);
        setErrorMsg('');
        // Effective model: explicit per-run choice > saved default. null = Auto.
        const effectiveModel = model === undefined ? userDefault : model;
        try {
            const res = await fetch('/api/questions/explain', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    ...effectiveModel ? {
                        'x-model': effectiveModel
                    } : {}
                },
                body: JSON.stringify({
                    ...isSelectionMode ? {
                        questionIds: selectedIds
                    } : {},
                    overwrite: isSelectionMode ? overwrite : undefined
                })
            });
            const data = await res.json().catch(()=>({}));
            if (!res.ok) {
                setPhase('error');
                setErrorMsg(data.error || `Failed to start (HTTP ${res.status})`);
                return;
            }
            completedNotified.current = false;
            setJobId(data.jobId);
            setStartedAtMs(Date.now());
            setElapsed(0);
            setProgress({
                done: 0,
                total: 0
            });
            setWritten(0);
            setFailed(0);
            setTotalQuestions(data.total ?? 0);
            setPass(1);
            setPhase('running');
            localStorage.setItem(EXPLAIN_JOB_KEY, JSON.stringify({
                jobId: data.jobId,
                startedAt: Date.now()
            }));
        } catch (e) {
            setPhase('error');
            setErrorMsg(e?.message || 'Network error while starting the job');
        } finally{
            setStarting(false);
        }
    };
    const handleReset = ()=>{
        localStorage.removeItem(EXPLAIN_JOB_KEY);
        setJobId(null);
        setPhase('confirm');
        setErrorMsg('');
        setMissing(null);
    };
    const targetCount = isSelectionMode ? selectedIds.length : missing ?? 0;
    const pct = progress.total > 0 ? Math.min(100, Math.round(progress.done / progress.total * 100)) : 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: (next)=>{
            if (!next && phase === 'running') {
                // Closing mid-run = run in background (the pointer stays).
                onOpenChange(false);
                return;
            }
            onOpenChange(next);
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
            className: "bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-lg max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogHeader */ .c7, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                        className: "text-[#e8ecf4] flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#f59e0b]"
                            }),
                            "AI Explanations"
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                        phase === 'confirm' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "p-3 rounded-lg bg-[#f59e0b]/[0.06] border border-[#f59e0b]/15",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs leading-relaxed text-[#8b95a8]",
                                        children: isSelectionMode ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Generate rich, structured teaching explanations for",
                                                ' ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[#e8ecf4] font-semibold",
                                                    children: [
                                                        selectedIds.length,
                                                        " selected question",
                                                        selectedIds.length === 1 ? '' : 's'
                                                    ]
                                                }),
                                                "."
                                            ]
                                        }) : missing === null ? 'Checking how many questions lack explanations…' : missing === 0 ? 'Every question in your bank already has an explanation. 🎉' : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#e8ecf4] font-semibold",
                                                    children: missing
                                                }),
                                                " of",
                                                ' ',
                                                bankTotal ?? '—',
                                                " questions have no explanation. The generator writes",
                                                ' ',
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#e8ecf4] font-semibold",
                                                    children: "board-style teaching notes"
                                                }),
                                                ": why the answer is correct, why each other option is wrong, key pearls, and a one-line takeaway."
                                            ]
                                        })
                                    })
                                }),
                                (missing !== 0 || isSelectionMode) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] font-semibold uppercase tracking-wider text-[#5a6478]",
                                            children: "Generate with"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_byok_ModelPicker__WEBPACK_IMPORTED_MODULE_3__/* .ModelPicker */ .Y, {
                                            value: model === undefined ? userDefault : model,
                                            onChange: (m)=>setModel(m),
                                            placeholder: "Auto (your default or server model)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[9px] text-[#5a6478] leading-relaxed",
                                            children: "Every provider and model you added in Settings → AI Providers is listed here — including models you registered by hand or discovered from an endpoint."
                                        })
                                    ]
                                }),
                                isSelectionMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "checkbox",
                                            checked: overwrite,
                                            onChange: (e)=>setOverwrite(e.target.checked),
                                            className: "mt-0.5 accent-[#00e5a0]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[11px] leading-relaxed text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#e8ecf4] font-semibold",
                                                    children: "Replace existing explanations."
                                                }),
                                                ' ',
                                                "Regenerate even for questions that already have one (recommended after switching AI models — turns thin one-liners into full teaching notes)."
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                    className: "space-y-1.5 text-[10px] text-[#5a6478] leading-relaxed",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                            children: "• Explanations are written as they're generated — partial progress is kept even if the AI service hiccups."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                            children: '• Rate-limited jobs pause and auto-resume (shown as "Pass 2", "Pass 3"…).'
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                            children: [
                                                "• Existing explanations are never overwritten",
                                                isSelectionMode ? ' unless you tick the replace option above' : '',
                                                "."
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                            children: "• You can close this dialog — the job keeps running on the server and re-attaches when you return."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: handleStart,
                                    disabled: starting || (isSelectionMode ? selectedIds.length === 0 : missing === 0),
                                    className: "w-full h-10 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] disabled:opacity-40 text-[#0c0e14] font-bold text-xs flex items-center justify-center gap-2 transition-colors",
                                    children: starting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 animate-spin"
                                            }),
                                            " Starting…"
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }),
                                            " Generate explanations",
                                            targetCount > 0 ? ` for ${targetCount} question${targetCount === 1 ? '' : 's'}` : ''
                                        ]
                                    })
                                })
                            ]
                        }),
                        phase === 'running' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 animate-spin text-[#00e5a0]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#e8ecf4] font-semibold",
                                            children: "Generating explanations…"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "ml-auto text-[#5a6478] font-mono text-[10px]",
                                            children: formatElapsed(elapsed)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex justify-between text-[10px] text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        "Batch ",
                                                        Math.min(progress.done + 1, progress.total || 1),
                                                        " of ",
                                                        progress.total || '…'
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        pct,
                                                        "%"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-2 rounded-full bg-white/[0.06] overflow-hidden",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-full bg-gradient-to-r from-[#00e5a0] to-[#00c988] transition-all duration-500",
                                                style: {
                                                    width: `${pct}%`
                                                }
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex justify-between text-[10px]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[#00e5a0]",
                                                    children: [
                                                        written,
                                                        " explained",
                                                        totalQuestions > 0 ? ` / ${totalQuestions}` : ''
                                                    ]
                                                }),
                                                pass >= 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[#f59e0b]",
                                                    children: [
                                                        "Pass ",
                                                        pass,
                                                        " — auto-resumed after a pause"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] text-[#5a6478] leading-relaxed",
                                        children: "Each batch of 3 questions is written the moment it completes. If the AI service rate-limits us, the job pauses and resumes automatically — your progress is never lost."
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>onOpenChange(false),
                                    className: "w-full h-9 rounded-lg border border-white/[0.08] bg-transparent hover:bg-white/[0.04] text-[#8b95a8] hover:text-[#e8ecf4] text-[11px] flex items-center justify-center gap-2 transition-colors",
                                    children: "Run in background"
                                })
                            ]
                        }),
                        phase === 'done' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2 p-3 rounded-lg bg-[#00e5a0]/[0.08] border border-[#00e5a0]/20",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#00e5a0] flex-shrink-0"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-xs text-[#e8ecf4]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-semibold",
                                                    children: written
                                                }),
                                                " explanation",
                                                written === 1 ? '' : 's',
                                                " written",
                                                failed > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        ' ',
                                                        "\xb7 ",
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[#f59e0b] font-semibold",
                                                            children: failed
                                                        }),
                                                        ' ',
                                                        "couldn't be generated (the AI service refused or rate-limited them — try again for just those)"
                                                    ]
                                                }) : ' — done!'
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] text-[#5a6478] leading-relaxed",
                                        children: "Explanations include: why the correct answer is right (mechanism), why every other option is wrong, key pearls, and a one-line takeaway — rendered as formatted notes on each question card."
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>{
                                        onOpenChange(false);
                                        handleReset();
                                    },
                                    className: "w-full h-10 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs transition-colors",
                                    children: "Done"
                                })
                            ]
                        }),
                        phase === 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-2 p-3 rounded-lg bg-[#ff5757]/[0.06] border border-[#ff5757]/15",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#ff5757] flex-shrink-0 mt-0.5"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-xs text-[#e8ecf4] leading-relaxed break-words",
                                            children: errorMsg
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: handleReset,
                                            className: "flex-1 h-10 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs flex items-center justify-center gap-2 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                " Try again"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: ()=>onOpenChange(false),
                                            className: "h-10 px-4 rounded-lg border border-white/[0.08] text-[#8b95a8] hover:text-[#e8ecf4] text-xs transition-colors",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_Lightbulb_Loader2_RefreshCw_Sparkles_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            })
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

/***/ 24066:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BankTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98500);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75478);
/* harmony import */ var _components_medq_DifficultyIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(96982);
/* harmony import */ var _components_medq_RichTextEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(59075);
/* harmony import */ var _components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(28258);
/* harmony import */ var _lib_download_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1907);
/* harmony import */ var _components_medq_ImportQuestionsModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(64745);
/* harmony import */ var _components_medq_ExplainQuestionsModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(20283);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(66609);
/* harmony import */ var _lib_offline_response__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(59766);
/* harmony import */ var _lib_offline_ai_helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(88321);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(42763);
/* harmony import */ var _components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13276);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(33807);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(45160);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(29991);
/* harmony import */ var _components_ui_separator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(97916);
/* harmony import */ var _components_ui_popover__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(17414);
/* harmony import */ var _lib_offline_queue__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(69776);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(70233);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(27502);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(34000);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(67998);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(40852);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(62866);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(97625);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(51128);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(90710);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(82879);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(18986);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(874);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(40557);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(78780);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(86272);
/* __next_internal_client_entry_do_not_use__ default auto */ 























/* ── helpers ── */ const TYPE_OPTIONS = [
    'mcq',
    'tf',
    'short'
];
const SOURCE_OPTIONS = (/* unused pure expression or super */ null && ([
    'all',
    'ai',
    'manual'
]));
const LETTERS = [
    'A',
    'B',
    'C',
    'D'
];
function stripHtml(html) {
    if (typeof document === 'undefined') return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
}
const emptyEditForm = {
    text: '',
    explanation: '',
    mnemonic: '',
    clinicalPearl: '',
    distractorAnalysis: '',
    options: [
        '',
        '',
        '',
        ''
    ],
    answer: '',
    type: 'mcq',
    difficulty: 'Moderate',
    system: '',
    topic: '',
    tags: []
};
/* ── Component ── */ function BankTab() {
    /* Real routing: question detail is a native <Link href="/bank/<id>">
     below — the (.)bank/[id] intercepting route renders it as a modal over
     this list (soft nav); a direct URL load renders the full detail page. */ // Data state
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [total, setTotal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [totalPages, setTotalPages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // True when the last fetch returned a 503 offline response (no cached
    // data available). Drives a dedicated "You're offline" empty state.
    const [offlineEmpty, setOfflineEmpty] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Filter state
    const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [systemFilter, setSystemFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [difficultyFilter, setDifficultyFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [typeFilter, setTypeFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [sourceFilter, setSourceFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    /** Citation-status filter — server-side on /api/questions?citation=
   * (all | cited | uncited | verified). 'verified' = ≥1 citation whose
   * answer-support judge scored ≥ 8/10. */ const [citationFilter, setCitationFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const limit = 10;
    // View state
    const [expandedId, setExpandedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /* ── Citation deep link consumer — /bank?q=<questionId>&cite=<i> pins the
     linked question at the top (already revealed) and auto-opens its i-th
     citation in the source viewer, so the link lands directly on the cited
     passage in the original file. Links are produced by the citation chips
     and the source viewer's Link button. ── */ const [pinnedQuestion, setPinnedQuestion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [pinnedCite, setPinnedCite] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [pinnedLoading, setPinnedLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const params = new URLSearchParams(window.location.search);
        const qid = params.get('q');
        if (!qid) return;
        const citeRaw = Number(params.get('cite'));
        const cite = Number.isFinite(citeRaw) && citeRaw >= 0 ? Math.floor(citeRaw) : null;
        // Strip the deep-link params so they don't interfere with filters/pagination
        // (refresh re-pins only if the URL is shared/kept explicitly elsewhere).
        window.history.replaceState({}, '', window.location.pathname);
        let alive = true;
        (async ()=>{
            setPinnedLoading(true);
            try {
                const res = await fetch(`/api/questions/${encodeURIComponent(qid)}`);
                if (!res.ok) return;
                const q = await res.json();
                if (alive) {
                    setPinnedQuestion(q);
                    setPinnedCite(cite);
                }
            } catch  {
            /* ignore — the link is best-effort */ } finally{
                if (alive) setPinnedLoading(false);
            }
        })();
        return ()=>{
            alive = false;
        };
    }, []);
    // Edit dialog state
    const [editOpen, setEditOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editForm, setEditForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(emptyEditForm);
    const [editingId, setEditingId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // AI assist loading state
    const [aiLoading, setAiLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    // Delete dialog state
    const [deleteOpen, setDeleteOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [deletingId, setDeletingId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deletingQuestion, setDeletingQuestion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Selection & download state
    const [selectedIds, setSelectedIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    // Download state
    const [downloading, setDownloading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Import dialog state — auto-opens on mount if a previous extraction
    // job is still resumable (localStorage pointer set by ImportQuestionsModal).
    // Without this, a page reload closes the modal and the re-attach logic
    // inside it never fires — the user thinks their upload is "gone".
    const [importOpen, setImportOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>{
        if (false) {}
        try {
            const raw = window.localStorage.getItem('medq:extract-job');
            if (!raw) return false;
            const entry = JSON.parse(raw);
            // 24-hour window matches EXTRACT_JOB_MAX_AGE_MS in the modal
            if (!entry?.at || Date.now() - entry.at > 24 * 60 * 60 * 1000) return false;
            if (!entry?.jobId) return false;
            return true; // auto-open so re-attach fires
        } catch  {
            return false;
        }
    });
    const [generatingAudio, setGeneratingAudio] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // AI explanation generator state (bank-wide or selected-questions mode)
    const [explainOpen, setExplainOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [explainSelectedIds, setExplainSelectedIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Bulk delete dialog state
    const [bulkDeleteOpen, setBulkDeleteOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [bulkDeleting, setBulkDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Bookmark & Notes state
    const [bookmarkedIds, setBookmarkedIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [bookmarkFilterOn, setBookmarkFilterOn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [bookmarkLoading, setBookmarkLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [notesMap, setNotesMap] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [activeNoteId, setActiveNoteId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [noteText, setNoteText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [noteSaving, setNoteSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const noteSaveTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* ── Load bookmarks on mount ── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchBookmarks = async ()=>{
            try {
                const res = await fetch('/api/bookmarks');
                if (!res.ok) return;
                const data = await res.json();
                const ids = new Set(data.bookmarks.map((b)=>b.questionId));
                setBookmarkedIds(ids);
            } catch (err) {
                console.error('Fetch bookmarks error:', err);
            }
        };
        fetchBookmarks();
    }, []);
    /* ── Offline queue: refetch bookmarks when a queued bookmark POST/DELETE
       is successfully replayed by the service worker. ── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const refetchBookmarks = async ()=>{
            try {
                const res = await fetch('/api/bookmarks');
                if (!res.ok) return;
                const data = await res.json();
                const ids = new Set(data.bookmarks.map((b)=>b.questionId));
                setBookmarkedIds(ids);
            } catch  {}
        };
        return (0,_lib_offline_queue__WEBPACK_IMPORTED_MODULE_21__/* .subscribeToReplayForPath */ .J1)('/api/bookmarks', refetchBookmarks);
    }, []);
    /* ── Bookmark toggle handler ── */ const toggleBookmark = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (questionId, e)=>{
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        setBookmarkLoading((prev)=>({
                ...prev,
                [questionId]: true
            }));
        const isBookmarked = bookmarkedIds.has(questionId);
        try {
            const res = await fetch('/api/bookmarks', {
                method: isBookmarked ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId
                })
            });
            if (!res.ok) throw new Error('Failed to toggle bookmark');
            setBookmarkedIds((prev)=>{
                const next = new Set(prev);
                if (isBookmarked) next.delete(questionId);
                else next.add(questionId);
                return next;
            });
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(isBookmarked ? 'Bookmark removed' : 'Question bookmarked');
        } catch (err) {
            console.error('Bookmark toggle error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed to toggle bookmark');
        } finally{
            setBookmarkLoading((prev)=>({
                    ...prev,
                    [questionId]: false
                }));
        }
    }, [
        bookmarkedIds
    ]);
    /* ── Notes handlers ── */ const openNotePopover = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (questionId, e)=>{
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        setActiveNoteId(questionId);
        // Load existing note if not in map
        if (!(questionId in notesMap)) {
            try {
                const res = await fetch(`/api/notes?questionId=${questionId}`);
                if (res.ok) {
                    const data = await res.json();
                    const existing = data.note?.note || '';
                    setNotesMap((prev)=>({
                            ...prev,
                            [questionId]: existing
                        }));
                    setNoteText(existing);
                } else {
                    setNoteText('');
                }
            } catch  {
                setNoteText('');
            }
        } else {
            setNoteText(notesMap[questionId] || '');
        }
    }, [
        notesMap
    ]);
    const saveNote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (questionId, text)=>{
        setNoteSaving(true);
        try {
            if (text.trim()) {
                const res = await fetch('/api/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        questionId,
                        note: text
                    })
                });
                if (!res.ok) throw new Error('Failed to save note');
            } else {
                const res = await fetch('/api/notes', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        questionId
                    })
                });
                if (!res.ok && res.status !== 404) throw new Error('Failed to delete note');
            }
            setNotesMap((prev)=>({
                    ...prev,
                    [questionId]: text
                }));
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(text.trim() ? 'Note saved' : 'Note deleted');
        } catch (err) {
            console.error('Save note error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed to save note');
        } finally{
            setNoteSaving(false);
        }
    }, []);
    const handleNoteBlur = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!activeNoteId) return;
        if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
        noteSaveTimer.current = setTimeout(()=>{
            saveNote(activeNoteId, noteText);
        }, 500);
    }, [
        activeNoteId,
        noteText,
        saveNote
    ]);
    const handleNoteSaveClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!activeNoteId) return;
        if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
        saveNote(activeNoteId, noteText);
    }, [
        activeNoteId,
        noteText,
        saveNote
    ]);
    // Filter questions by bookmark if filter is on
    const displayQuestions = bookmarkFilterOn ? questions.filter((q)=>bookmarkedIds.has(q.id)) : questions;
    /* ── Fetch questions ── */ const fetchQuestions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(limit)
            });
            if (systemFilter && systemFilter !== 'all') params.set('system', systemFilter);
            if (difficultyFilter && difficultyFilter !== 'all') params.set('difficulty', difficultyFilter);
            if (typeFilter && typeFilter !== 'all') params.set('type', typeFilter);
            if (search.trim()) params.set('search', search.trim());
            if (citationFilter !== 'all') params.set('citation', citationFilter);
            // Source filter (AI/Manual) handled client-side after fetch
            const res = await fetch(`/api/questions?${params.toString()}`);
            if (!res.ok) {
                // Distinguish "offline + no cache" from a real server error so we
                // can show a helpful empty state instead of a misleading toast.
                const errBody = await res.json().catch(()=>null);
                if ((0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_22__/* .isOfflineError */ .ej)(res, errBody)) {
                    setQuestions([]);
                    setTotal(0);
                    setTotalPages(1);
                    setOfflineEmpty(true);
                } else {
                    throw new Error('Failed to fetch questions');
                }
            } else {
                const data = await res.json();
                let filtered = data.questions;
                if (sourceFilter === 'ai') {
                    filtered = filtered.filter((q)=>q.isAIGenerated);
                } else if (sourceFilter === 'manual') {
                    filtered = filtered.filter((q)=>!q.isAIGenerated);
                }
                setQuestions(filtered);
                setTotal(sourceFilter !== 'all' ? filtered.length : data.total);
                setTotalPages(sourceFilter !== 'all' ? Math.max(1, Math.ceil(filtered.length / limit)) : data.totalPages);
                setOfflineEmpty(false);
            }
        } catch (err) {
            console.error('Fetch questions error:', err);
            // Only show the error toast if this was NOT an offline response —
            // offline responses are handled by the `offlineEmpty` state above
            // which renders a dedicated "You're offline" empty state.
            if (!(0,_lib_offline_response__WEBPACK_IMPORTED_MODULE_22__/* .browserIsOffline */ .Ey)()) {
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed to load questions');
            }
        } finally{
            setLoading(false);
        }
    }, [
        page,
        systemFilter,
        difficultyFilter,
        typeFilter,
        sourceFilter,
        search,
        citationFilter
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchQuestions();
    }, [
        fetchQuestions
    ]);
    // Refresh when this tab becomes visible (user navigated back)
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handler = (e)=>{
            if (e.detail === 'bank') fetchQuestions();
        };
        window.addEventListener('medq-tab-visible', handler);
        return ()=>window.removeEventListener('medq-tab-visible', handler);
    }, [
        fetchQuestions
    ]);
    // Reset page and selection when filters change
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setPage(1);
        setSelectedIds(new Set());
    }, [
        systemFilter,
        difficultyFilter,
        typeFilter,
        sourceFilter,
        search,
        citationFilter
    ]);
    // Toggle selection for a question
    const toggleSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        setSelectedIds((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);
    // Select / deselect all visible
    const toggleSelectAll = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setSelectedIds((prev)=>{
            if (prev.size === questions.length) {
                return new Set();
            }
            return new Set(questions.map((q)=>q.id));
        });
    }, [
        questions
    ]);
    // Generate audio for selected questions
    const handleGenerateAudio = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const ids = Array.from(selectedIds);
        if (ids.length === 0) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('No questions selected');
            return;
        }
        setGeneratingAudio(true);
        try {
            const res = await fetch('/api/generate-media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionIds: ids,
                    generateImage: false,
                    generateAudio: true
                })
            });
            if (!res.ok) {
                const errData = await res.json().catch(()=>({}));
                throw new Error(errData.error || 'Failed to generate audio');
            }
            const data = await res.json();
            if (data.results) {
                let successCount = 0;
                for (const result of data.results){
                    if (result.audioUrl) successCount++;
                }
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Audio generated for ${successCount} question${successCount !== 1 ? 's' : ''}`);
                fetchQuestions();
            }
        } catch (err) {
            console.error('Bulk audio generation error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(err instanceof Error ? err.message : 'Failed to generate audio');
        } finally{
            setGeneratingAudio(false);
        }
    }, [
        selectedIds,
        fetchQuestions
    ]);
    // Download selected questions
    const handleDownloadSelected = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (format)=>{
        const selected = questions.filter((q)=>selectedIds.has(q.id));
        if (selected.length === 0) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('No questions selected');
            return;
        }
        setDownloading(format);
        try {
            if (format === 'json') {
                await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_7__/* .downloadAsJSON */ .ni)(selected);
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Downloaded ${selected.length} question${selected.length > 1 ? 's' : ''} as JSON`);
            } else if (format === 'pdf') {
                await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_7__/* .downloadAsPDF */ .pQ)(selected);
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Downloaded ${selected.length} question${selected.length > 1 ? 's' : ''} as PDF`);
            } else if (format === 'refsheet') {
                await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_7__/* .downloadReferenceSheet */ .hk)(selected);
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Generated reference sheet with ${selected.length} question${selected.length > 1 ? 's' : ''}`);
            }
        } catch (err) {
            console.error(`[MedQ] ${format} download error:`, err);
            const formatLabel = format === 'refsheet' ? 'Reference Sheet' : format.toUpperCase();
            const msg = err instanceof Error ? err.message : `Failed to download as ${formatLabel}. The question data may contain unsupported characters.`;
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(msg);
        } finally{
            setDownloading(null);
        }
    }, [
        questions,
        selectedIds
    ]);
    /* ── Bulk delete handler ── */ const handleBulkDeleteConfirm = async ()=>{
        if (selectedIds.size === 0) return;
        setBulkDeleting(true);
        try {
            const res = await fetch('/api/questions', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ids: Array.from(selectedIds)
                })
            });
            if (!res.ok) throw new Error('Failed to delete questions');
            const data = await res.json();
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`${data.deleted} question${data.deleted > 1 ? 's' : ''} deleted`);
            setBulkDeleteOpen(false);
            setSelectedIds(new Set());
            fetchQuestions();
        } catch (err) {
            console.error('Bulk delete error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed to delete selected questions');
        } finally{
            setBulkDeleting(false);
        }
    };
    /* ── Edit handlers ── */ const handleEdit = (question)=>{
        setEditingId(question.id);
        setEditForm({
            text: question.text,
            explanation: question.explanation,
            mnemonic: question.mnemonic,
            clinicalPearl: question.clinicalPearl,
            distractorAnalysis: question.distractorAnalysis,
            options: question.options.length >= 4 ? question.options.slice(0, 4) : [
                ...question.options,
                ...Array(4 - question.options.length).fill('')
            ],
            answer: question.answer,
            type: question.type,
            difficulty: question.difficulty,
            system: question.system,
            topic: question.topic,
            tags: question.tags
        });
        setEditOpen(true);
    };
    const handleSave = async ()=>{
        if (!editingId) return;
        setSaving(true);
        try {
            const payload = {
                text: editForm.text,
                explanation: editForm.explanation,
                mnemonic: editForm.mnemonic,
                clinicalPearl: editForm.clinicalPearl,
                distractorAnalysis: editForm.distractorAnalysis,
                answer: editForm.answer,
                type: editForm.type,
                difficulty: editForm.difficulty,
                system: editForm.system,
                topic: editForm.topic,
                tags: editForm.tags
            };
            if (editForm.type === 'mcq') {
                payload.options = editForm.options;
            }
            const res = await fetch(`/api/questions/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Failed to update question');
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('Question updated');
            setEditOpen(false);
            setEditingId(null);
            fetchQuestions();
        } catch (err) {
            console.error('Save error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed to save question');
        } finally{
            setSaving(false);
        }
    };
    /* ── Delete handlers ── */ const handleDeleteClick = (question)=>{
        setDeletingId(question.id);
        setDeletingQuestion(question);
        setDeleteOpen(true);
    };
    const handleDeleteConfirm = async ()=>{
        if (!deletingId) return;
        try {
            const res = await fetch(`/api/questions/${deletingId}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete question');
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('Question deleted');
            setDeleteOpen(false);
            setDeletingId(null);
            setDeletingQuestion(null);
            fetchQuestions();
        } catch (err) {
            console.error('Delete error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed to delete question');
        }
    };
    /* ── AI Assist ── */ const callAiAssist = async (type, field)=>{
        if (!editingId) return;
        setAiLoading((prev)=>({
                ...prev,
                [field]: true
            }));
        try {
            const questionSnapshot = {
                text: editForm.text,
                type: editForm.type,
                options: editForm.type === 'mcq' ? editForm.options : undefined,
                answer: editForm.answer,
                difficulty: editForm.difficulty,
                system: editForm.system,
                topic: editForm.topic
            };
            // ── Offline path: use on-device LLM if model is loaded ──
            if ((0,_lib_offline_ai_helpers__WEBPACK_IMPORTED_MODULE_11__.shouldUseOfflineAI)()) {
                try {
                    const promptMap = {
                        improve: `Improve this medical question. Return the improved question text only.\n\nQuestion: ${editForm.text}\nTopic: ${editForm.topic}\nSystem: ${editForm.system}`,
                        explain: `Explain the answer to this medical question in 2-3 sentences.\n\nQuestion: ${editForm.text}\nAnswer: ${editForm.answer}`,
                        mnemonic: `Create a short mnemonic to help remember the answer to: ${editForm.text} (Answer: ${editForm.answer}). Return only the mnemonic.`,
                        distractors: `For this MCQ, explain why each wrong option is wrong.\n\nQuestion: ${editForm.text}\nOptions: ${editForm.options.join(' | ')}\nCorrect: ${editForm.answer}`,
                        clinicalPearl: `Write a clinical pearl (1-2 sentences) for: ${editForm.topic} (${editForm.system}).`
                    };
                    const result = await (0,_lib_offline_ai_helpers__WEBPACK_IMPORTED_MODULE_11__.offlineChatAnswer)(promptMap[type], [], {
                        maxTokens: 200
                    });
                    const content = `⚠️ Offline answer (small model, may be less accurate):\n\n${result.trim()}`;
                    setEditForm((prev)=>({
                            ...prev,
                            [field]: content
                        }));
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`AI generated ${field} (offline)`);
                } catch (err) {
                    console.error('offline ai-assist error:', err);
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Offline AI failed — model may not be loaded');
                } finally{
                    setAiLoading((prev)=>({
                            ...prev,
                            [field]: false
                        }));
                }
                return;
            }
            const res = await fetch('/api/ai-assist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type,
                    question: questionSnapshot,
                    topic: editForm.topic,
                    system: editForm.system
                })
            });
            if (!res.ok) throw new Error('AI assist failed');
            const data = await res.json();
            if (type === 'improve' && typeof data.content === 'object' && data.content !== null) {
                const improved = data.content;
                setEditForm((prev)=>({
                        ...prev,
                        text: typeof improved.text === 'string' ? improved.text : prev.text,
                        explanation: typeof improved.explanation === 'string' ? improved.explanation : prev.explanation,
                        mnemonic: typeof improved.mnemonic === 'string' ? improved.mnemonic : prev.mnemonic,
                        clinicalPearl: typeof improved.clinicalPearl === 'string' ? improved.clinicalPearl : prev.clinicalPearl,
                        distractorAnalysis: typeof improved.distractorAnalysis === 'string' ? improved.distractorAnalysis : prev.distractorAnalysis,
                        options: Array.isArray(improved.options) ? improved.options.map(String) : prev.options,
                        answer: typeof improved.answer === 'string' ? improved.answer : prev.answer
                    }));
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('AI improved the question');
            } else if (typeof data.content === 'string') {
                setEditForm((prev)=>({
                        ...prev,
                        [field]: data.content
                    }));
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`AI generated ${field}`);
            }
        } catch (err) {
            console.error('AI assist error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('AI assistance failed');
        } finally{
            setAiLoading((prev)=>({
                    ...prev,
                    [field]: false
                }));
        }
    };
    /* ── Update edit form helpers ── */ const updateOption = (index, value)=>{
        setEditForm((prev)=>{
            const newOptions = [
                ...prev.options
            ];
            newOptions[index] = value;
            return {
                ...prev,
                options: newOptions
            };
        });
    };
    const updateTags = (value)=>{
        setEditForm((prev)=>({
                ...prev,
                tags: value.split(',').map((t)=>t.trim()).filter(Boolean)
            }));
    };
    /* ── Render ── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[#00e5a0]/[0.1] flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#00e5a0]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: "Question Bank"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xs text-[#8b95a8] tabular-nums",
                                        children: [
                                            total,
                                            " question",
                                            total === 1 ? '' : 's'
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    questions.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>setImportOpen(true),
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#00e5a0] hover:bg-[#00e5a0]/10 bg-[#00e5a0]/[0.08] border border-[#00e5a0]/25 hover:border-[#00e5a0]/40 transition-all",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Import"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>{
                                    setExplainSelectedIds(null); // bank-wide: every question missing an explanation
                                    setExplainOpen(true);
                                },
                                title: "Generate rich AI teaching explanations for questions that lack one",
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#f59e0b] hover:bg-[#f59e0b]/10 bg-[#f59e0b]/[0.08] border border-[#f59e0b]/25 hover:border-[#f59e0b]/40 transition-all",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "AI Explanations"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: toggleSelectAll,
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8b95a8] hover:text-[#e8ecf4] bg-[#1a1e2b] border border-white/[0.08] hover:border-white/[0.15] transition-all",
                                children: [
                                    selectedIds.size === questions.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 text-[#00e5a0]"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    selectedIds.size === questions.length ? 'Deselect All' : 'Select All'
                                ]
                            })
                        ]
                    }),
                    questions.length === 0 && !loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setImportOpen(true),
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#00e5a0] hover:bg-[#00e5a0]/10 bg-[#00e5a0]/[0.08] border border-[#00e5a0]/25 hover:border-[#00e5a0]/40 transition-all",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Import"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative mb-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b95a8]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "text",
                        placeholder: "Search by topic, text, or system…",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        className: "w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3 pl-11 text-[#e8ecf4] placeholder:text-[#6b7590] text-sm focus:outline-none focus:border-[#00e5a0]/60 focus:ring-2 focus:ring-[#00e5a0] transition-all"
                    }),
                    search && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: ()=>setSearch(''),
                        "aria-label": "Clear search",
                        className: "absolute right-1.5 top-1/2 -translate-y-1/2 flex min-h-[44px] min-w-[44px] items-center justify-center text-[#8b95a8] hover:text-[#e8ecf4] transition-colors",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                        value: systemFilter,
                        onValueChange: (value)=>setSystemFilter(value ?? 'all'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                "aria-label": "Filter by system",
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {
                                    placeholder: "System"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "all",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "All Systems"
                                    }),
                                    _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                            value: s,
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: s
                                        }, s))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-wrap items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_DifficultyIndicator__WEBPACK_IMPORTED_MODULE_4__/* .DifficultyChip */ .mR, {
                                level: 0,
                                label: "All",
                                active: difficultyFilter === 'all',
                                onClick: ()=>setDifficultyFilter('all')
                            }),
                            _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .DIFFICULTY_OPTIONS */ .rX.map((d, i)=>{
                                const level = i + 1;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_DifficultyIndicator__WEBPACK_IMPORTED_MODULE_4__/* .DifficultyChip */ .mR, {
                                    level: level,
                                    label: d,
                                    active: difficultyFilter === d,
                                    onClick: ()=>setDifficultyFilter(difficultyFilter === d ? 'all' : d)
                                }, d);
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                        value: typeFilter,
                        onValueChange: (value)=>setTypeFilter(value ?? 'all'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                "aria-label": "Filter by question type",
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[120px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {
                                    placeholder: "Type"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "all",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "All Types"
                                    }),
                                    TYPE_OPTIONS.map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                            value: t,
                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                            children: t === 'mcq' ? 'MCQ' : t === 'tf' ? 'True/False' : 'Short Answer'
                                        }, t))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                        value: sourceFilter,
                        onValueChange: (value)=>setSourceFilter(value ?? 'all'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                "aria-label": "Filter by source",
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[120px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {
                                    placeholder: "Source"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "all",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "All Sources"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "ai",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "AI Generated"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "manual",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "Manual"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                        value: citationFilter,
                        onValueChange: (value)=>setCitationFilter(value ?? 'all'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                "aria-label": "Filter by evidence level",
                                className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[150px] hover:border-white/[0.15] transition-colors text-xs",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {
                                    placeholder: "Evidence"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                className: "bg-[#1a1e2b] border-white/[0.08]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "all",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "All Evidence"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "verified",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "✅ Verified (judge ≥ 8/10)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "cited",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "\uD83D\uDD17 Cited (any strength)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                        value: "uncited",
                                        className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                        children: "⚪ Without citations"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setBookmarkFilterOn((prev)=>!prev),
                        className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${bookmarkFilterOn ? 'bg-[#00e5a0]/10 border-[#00e5a0]/25 text-[#00e5a0]' : 'bg-[#1a1e2b] border-white/[0.08] text-[#8b95a8] hover:text-[#e8ecf4] hover:border-white/[0.15]'}`,
                        children: [
                            bookmarkFilterOn ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Bookmarked"
                        ]
                    }),
                    (systemFilter !== 'all' || difficultyFilter !== 'all' || typeFilter !== 'all' || sourceFilter !== 'all' || citationFilter !== 'all' || bookmarkFilterOn) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                        variant: "ghost",
                        size: "sm",
                        onClick: ()=>{
                            setSystemFilter('all');
                            setDifficultyFilter('all');
                            setTypeFilter('all');
                            setSourceFilter('all');
                            setCitationFilter('all');
                            setBookmarkFilterOn(false);
                        },
                        className: "text-[#5a6178] hover:text-[#e8ecf4] text-xs h-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                className: "w-3 h-3 mr-1"
                            }),
                            "Clear filters"
                        ]
                    })
                ]
            }),
            (pinnedQuestion || pinnedLoading) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-6 rounded-2xl border border-[#4fc3f7]/25 bg-[#4fc3f7]/[0.03] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 px-4 py-2.5 border-b border-[#4fc3f7]/15",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 text-[#4fc3f7] shrink-0"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[11px] font-semibold text-[#4fc3f7]",
                                children: "Opened from citation link"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[10px] text-[#5a6178] hidden sm:inline",
                                children: "— lands directly on the cited passage"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: ()=>{
                                    setPinnedQuestion(null);
                                    setPinnedCite(null);
                                },
                                className: "ml-auto text-[#5a6178] hover:text-[#e8ecf4] transition-colors p-1",
                                "aria-label": "Dismiss pinned question",
                                title: "Dismiss",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5"
                                })
                            })
                        ]
                    }),
                    pinnedQuestion ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                        question: pinnedQuestion,
                        forceRevealed: true,
                        initialCitationIndex: pinnedCite ?? undefined,
                        attemptMode: "bank"
                    }, `pinned-${pinnedQuestion.id}`) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 px-4 py-6 text-xs text-[#5a6178]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 animate-spin text-[#4fc3f7]"
                            }),
                            "Loading linked question…"
                        ]
                    })
                ]
            }),
            loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-3",
                role: "status",
                "aria-label": "Loading questions",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "sr-only",
                        children: "Loading questions…"
                    }),
                    Array.from({
                        length: 6
                    }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "bg-[#1a1e2b] border border-white/[0.06] rounded-xl px-4 py-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "medq-skeleton w-5 h-5 rounded"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "medq-skeleton h-3 w-28 rounded-full"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "medq-skeleton h-4 w-3/4 rounded-full"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "medq-skeleton w-16 h-8 rounded-lg"
                                    })
                                ]
                            })
                        }, i))
                ]
            }) : offlineEmpty && questions.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-20",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-16 h-16 rounded-2xl bg-[#ffb347]/10 border border-[#ffb347]/20 flex items-center justify-center mb-4",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                            width: "28",
                            height: "28",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "#ffb347",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                                    x1: "1",
                                    y1: "1",
                                    x2: "23",
                                    y2: "23"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M10.71 5.05A16 16 0 0 1 22.58 9"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M8.53 16.11a6 6 0 0 1 6.95 0"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", {
                                    x1: "12",
                                    y1: "20",
                                    x2: "12.01",
                                    y2: "20"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[#ffb347] text-sm font-semibold",
                        children: "You're offline"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[#5a6178] text-xs mt-1 text-center max-w-xs",
                        children: "The question bank hasn't been cached yet. Open this tab while online once, and your questions will be available offline afterwards."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                        variant: "outline",
                        size: "sm",
                        className: "mt-4",
                        onClick: ()=>fetchQuestions(),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                className: "w-3 h-3 mr-1"
                            }),
                            " Retry"
                        ]
                    })
                ]
            }) : questions.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col items-center justify-center py-20",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                            className: "w-7 h-7 text-[#8b95a8]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[#8b95a8] text-sm",
                        children: "No questions found"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[#8b95a8] text-xs mt-1",
                        children: "Try adjusting your search or filters"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                        variant: "outline",
                        size: "sm",
                        className: "mt-4",
                        onClick: ()=>{
                            setSearch('');
                            setSystemFilter('all');
                            setDifficultyFilter('all');
                            setTypeFilter('all');
                            setSourceFilter('all');
                            setCitationFilter('all');
                            setBookmarkFilterOn(false);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                className: "w-3 h-3 mr-1"
                            }),
                            " Clear all filters"
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex flex-col gap-3",
                children: displayQuestions.map((question, idx)=>{
                    const isExpanded = expandedId === question.id;
                    const plainText = stripHtml(question.text);
                    const isBookmarked = bookmarkedIds.has(question.id);
                    const hasNote = question.id in notesMap && notesMap[question.id]?.trim().length > 0;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `bg-[#1a1e2b] border rounded-xl overflow-hidden transition-all hover:border-white/[0.1] ${selectedIds.has(question.id) ? 'border-[#00e5a0]/25 bg-[#00e5a0]/[0.02]' : 'border-white/[0.06]'}`,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-3 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>toggleSelect(question.id),
                                        className: `flex-shrink-0 transition-colors ${selectedIds.has(question.id) ? 'text-[#00e5a0]' : 'text-[#8b95a8] hover:text-[#e8ecf4]'}`,
                                        children: selectedIds.has(question.id) ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                            className: "w-4.5 h-4.5"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                            className: "w-4.5 h-4.5"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 mb-1 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_17__/* .Badge */ .E, {
                                                        variant: "secondary",
                                                        className: `text-[10px] font-semibold ${question.type === 'mcq' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' : question.type === 'tf' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#b79bff]/10 text-[#b79bff]'} border-0 px-2 py-0.5`,
                                                        children: question.type === 'mcq' ? 'MCQ' : question.type === 'tf' ? 'TF' : 'Short'
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_DifficultyIndicator__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay, {
                                                        difficulty: question.difficulty,
                                                        variant: "badge",
                                                        size: "sm",
                                                        showLabel: true
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_17__/* .Badge */ .E, {
                                                        variant: "secondary",
                                                        className: "text-[10px] font-semibold bg-white/[0.05] text-[#8b92a8] border-0 px-2 py-0.5",
                                                        children: question.system
                                                    }),
                                                    question.isAIGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_17__/* .Badge */ .E, {
                                                        variant: "secondary",
                                                        className: "text-[10px] font-semibold bg-[#b388ff]/10 text-[#b388ff] border-0 px-2 py-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                                className: "w-2.5 h-2.5 mr-0.5"
                                                            }),
                                                            "AI"
                                                        ]
                                                    }),
                                                    question.imageUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_17__/* .Badge */ .E, {
                                                        variant: "secondary",
                                                        className: "text-[10px] font-semibold bg-[#f472b6]/10 text-[#f472b6] border-0 px-2 py-0.5",
                                                        title: "This question has an attached image",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                                className: "w-2.5 h-2.5 mr-0.5"
                                                            }),
                                                            "Image"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    question.imageUrl && // Small thumbnail so users can see at a glance which
                                                    // collapsed rows have images (the QuestionCard itself
                                                    // shows the full image when the row is expanded).
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                        src: question.imageUrl,
                                                        alt: "",
                                                        className: "w-10 h-10 rounded-md object-cover border border-white/[0.08] flex-shrink-0 bg-[#0f1118]/50",
                                                        loading: "lazy"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: `/bank/${question.id}`,
                                                        className: "text-sm text-[#c8cdd8] truncate flex-1 min-w-0 cursor-pointer hover:text-[#e8ecf4] transition-colors",
                                                        title: "Open question detail",
                                                        children: [
                                                            plainText.slice(0, 120),
                                                            plainText.length > 120 ? '…' : ''
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-0.5 flex-shrink-0 mr-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: (e)=>toggleBookmark(question.id, e),
                                                disabled: bookmarkLoading[question.id],
                                                className: `h-8 w-8 flex items-center justify-center rounded-lg transition-all ${isBookmarked ? 'text-[#00e5a0] bg-[#00e5a0]/10 hover:bg-[#00e5a0]/20' : 'text-[#3a4055] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10'} disabled:opacity-50`,
                                                title: isBookmarked ? 'Remove bookmark' : 'Bookmark this question',
                                                children: bookmarkLoading[question.id] ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 animate-spin"
                                                }) : isBookmarked ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_20__/* .Popover */ .AM, {
                                                open: activeNoteId === question.id,
                                                onOpenChange: (open)=>{
                                                    if (!open) {
                                                        handleNoteBlur();
                                                        setActiveNoteId(null);
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_20__/* .PopoverTrigger */ .Wv, {
                                                        type: "button",
                                                        onClick: (e)=>openNotePopover(question.id, e),
                                                        className: `h-8 w-8 flex items-center justify-center rounded-lg transition-all ${hasNote ? 'text-[#f59e0b] bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20' : 'text-[#3a4055] hover:text-[#f59e0b] hover:bg-[#f59e0b]/10'}`,
                                                        title: hasNote ? 'Edit note' : 'Add note',
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                            className: "w-4 h-4"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_popover__WEBPACK_IMPORTED_MODULE_20__/* .PopoverContent */ .hl, {
                                                        className: "bg-[#1a1e2b] border-white/[0.1] w-72 p-0 shadow-xl",
                                                        align: "end",
                                                        side: "bottom",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "p-3",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-center justify-between mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "text-xs font-semibold text-[#e8ecf4] flex items-center gap-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5 text-[#f59e0b]"
                                                                                }),
                                                                                "Quick Note"
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                            type: "button",
                                                                            onClick: handleNoteSaveClick,
                                                                            disabled: noteSaving,
                                                                            className: "text-[10px] font-semibold text-[#00e5a0] hover:text-[#00e5a0]/80 disabled:opacity-50 transition-colors",
                                                                            children: noteSaving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                                                className: "w-3 h-3 animate-spin"
                                                                            }) : 'Save'
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                                                    value: noteText,
                                                                    onChange: (e)=>setNoteText(e.target.value),
                                                                    onBlur: handleNoteBlur,
                                                                    placeholder: "Add a note for this question…",
                                                                    rows: 4,
                                                                    className: "w-full bg-[#0c0e14] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-[#e8ecf4] placeholder-[#3a4055] resize-none focus:outline-none focus:border-[#f59e0b]/30 focus:ring-1 focus:ring-[#f59e0b]/20 transition-all"
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1 flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                href: `/bank/${question.id}`,
                                                title: "View question detail",
                                                "aria-label": "View question detail",
                                                className: "inline-flex items-center justify-center h-8 w-8 rounded-lg text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-colors",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                                variant: "ghost",
                                                size: "icon",
                                                className: "h-8 w-8 text-[#5a6178] hover:text-[#f59e0b] hover:bg-[#f59e0b]/10",
                                                onClick: ()=>handleEdit(question),
                                                title: "Edit",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                                variant: "ghost",
                                                size: "icon",
                                                className: "h-8 w-8 text-[#5a6178] hover:text-[#ef4444] hover:bg-[#ef4444]/10",
                                                onClick: ()=>handleDeleteClick(question),
                                                title: "Delete",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            isExpanded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "border-t border-white/[0.06]",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    question: question,
                                    index: idx
                                }, question.id)
                            })
                        ]
                    }, question.id);
                })
            }),
            selectedIds.size > 0 && !loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "sticky bottom-0 mt-4 p-4 bg-[#1a1e2b]/95 backdrop-blur-xl border border-[#00e5a0]/20 rounded-xl flex items-center justify-between gap-4 transition-all",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-8 h-8 rounded-lg bg-[#00e5a0]/10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#00e5a0]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-sm font-semibold text-[#e8ecf4]",
                                children: [
                                    selectedIds.size,
                                    " question",
                                    selectedIds.size > 1 ? 's' : '',
                                    " selected"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>handleDownloadSelected('json'),
                                disabled: downloading !== null,
                                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    downloading === 'json' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "JSON"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>handleDownloadSelected('pdf'),
                                disabled: downloading !== null,
                                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    downloading === 'pdf' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "PDF"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>handleDownloadSelected('refsheet'),
                                disabled: downloading !== null,
                                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#b79bff]/10 border border-[#b79bff]/25 text-[#b79bff] hover:bg-[#b79bff]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    downloading === 'refsheet' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Ref Sheet"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: handleGenerateAudio,
                                disabled: generatingAudio,
                                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    generatingAudio ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Audio"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>{
                                    setExplainSelectedIds([
                                        ...selectedIds
                                    ]);
                                    setExplainOpen(true);
                                },
                                title: "Generate rich AI teaching explanations for the selected questions",
                                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-all",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Explain (",
                                    selectedIds.size,
                                    ")"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>setBulkDeleteOpen(true),
                                disabled: bulkDeleting,
                                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#ff5757]/10 border border-[#ff5757]/25 text-[#ff5757] hover:bg-[#ff5757]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    bulkDeleting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Delete (",
                                    selectedIds.size,
                                    ")"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: ()=>setSelectedIds(new Set()),
                                className: "p-2 rounded-lg text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-all",
                                title: "Clear selection",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            })
                        ]
                    })
                ]
            }),
            !loading && questions.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-xs text-[#5a6178]",
                        children: [
                            "Page ",
                            page,
                            " of ",
                            totalPages,
                            " \xb7 ",
                            total,
                            " total"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                disabled: page <= 1,
                                onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                className: "h-8 text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06] disabled:opacity-30",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                        className: "w-4 h-4 mr-1"
                                    }),
                                    "Prev"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                disabled: page >= totalPages,
                                onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),
                                className: "h-8 text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06] disabled:opacity-30",
                                children: [
                                    "Next",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__/* ["default"] */ .A, {
                                        className: "w-4 h-4 ml-1"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_12__/* .Dialog */ .lG, {
                open: editOpen,
                onOpenChange: setEditOpen,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_12__/* .DialogContent */ .Cf, {
                    className: "bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-3xl max-h-[90vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_12__/* .DialogHeader */ .c7, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_12__/* .DialogTitle */ .L3, {
                                className: "text-[#e8ecf4] flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#f59e0b]"
                                    }),
                                    "Edit Question"
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-5 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs mb-1.5 block",
                                                    children: "Type"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                                                    value: editForm.type,
                                                    onValueChange: (v)=>setEditForm((prev)=>({
                                                                ...prev,
                                                                type: v,
                                                                answer: v === 'tf' ? prev.answer === 'True' || prev.answer === 'False' ? prev.answer : 'True' : prev.answer
                                                            })),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {})
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08]",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                                    value: "mcq",
                                                                    className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                                    children: "MCQ"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                                    value: "tf",
                                                                    className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                                    children: "True/False"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                                    value: "short",
                                                                    className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                                    children: "Short Answer"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs mb-1.5 block",
                                                    children: "Difficulty"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                                                    value: (0,_lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .normalizeDifficulty */ .hy)(editForm.difficulty),
                                                    onValueChange: (v)=>setEditForm((prev)=>({
                                                                ...prev,
                                                                difficulty: v
                                                            })),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {})
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08]",
                                                            children: _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .DIFFICULTY_OPTIONS */ .rX.map((d, i)=>{
                                                                const level = i + 1;
                                                                const color = _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .DIFFICULTY_COLORS */ .Fc[level];
                                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                                    value: d,
                                                                    className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "w-2 h-2 rounded-full",
                                                                                style: {
                                                                                    background: color
                                                                                }
                                                                            }),
                                                                            d,
                                                                            " (Level ",
                                                                            level,
                                                                            ")"
                                                                        ]
                                                                    })
                                                                }, d);
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs mb-1.5 block",
                                                    children: "System"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                                                    value: editForm.system,
                                                    onValueChange: (v)=>setEditForm((prev)=>({
                                                                ...prev,
                                                                system: v ?? ''
                                                            })),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {
                                                                placeholder: "Select system"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08]",
                                                            children: _lib_medq_types__WEBPACK_IMPORTED_MODULE_3__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                                    value: s,
                                                                    className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                                    children: s
                                                                }, s))
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs mb-1.5 block",
                                                    children: "Topic"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_15__/* .Input */ .p, {
                                                    value: editForm.topic,
                                                    onChange: (e)=>setEditForm((prev)=>({
                                                                ...prev,
                                                                topic: e.target.value
                                                            })),
                                                    className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-9",
                                                    placeholder: "e.g. Hypertension"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                            className: "text-[#8b92a8] text-xs mb-1.5 block",
                                            children: "Tags (comma-separated)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_15__/* .Input */ .p, {
                                            value: editForm.tags.join(', '),
                                            onChange: (e)=>updateTags(e.target.value),
                                            className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-9",
                                            placeholder: "e.g. cardiology, pharmacology"
                                        }),
                                        editForm.tags.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex flex-wrap gap-1 mt-2",
                                            children: editForm.tags.map((tag)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_17__/* .Badge */ .E, {
                                                    variant: "secondary",
                                                    className: "text-[10px] bg-white/[0.05] text-[#8b92a8] border-0 px-2 py-0.5",
                                                    children: tag
                                                }, tag))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_separator__WEBPACK_IMPORTED_MODULE_19__/* .Separator */ .w, {
                                    className: "bg-white/[0.06]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs",
                                                    children: "Question Text"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "h-6 text-[10px] text-[#b388ff] hover:text-[#b388ff] hover:bg-[#b388ff]/10 px-2",
                                                    onClick: ()=>callAiAssist('improve', 'text'),
                                                    disabled: aiLoading.text,
                                                    children: [
                                                        aiLoading.text ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1"
                                                        }),
                                                        "AI Improve"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#3a4055] mb-1",
                                            children: "Tip: Select text to see formatting options"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_RichTextEditor__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            value: editForm.text,
                                            onChange: (v)=>setEditForm((prev)=>({
                                                        ...prev,
                                                        text: v
                                                    })),
                                            placeholder: "Enter question text…",
                                            minHeight: "80px"
                                        })
                                    ]
                                }),
                                editForm.type === 'mcq' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                            className: "text-[#8b92a8] text-xs mb-2 block",
                                            children: "Options"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "space-y-2",
                                            children: editForm.options.map((opt, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-xs font-bold text-[#3a4055] w-5 text-center",
                                                            children: LETTERS[i]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_15__/* .Input */ .p, {
                                                            value: opt,
                                                            onChange: (e)=>updateOption(i, e.target.value),
                                                            className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-8 flex-1",
                                                            placeholder: `Option ${LETTERS[i]}`
                                                        })
                                                    ]
                                                }, i))
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mt-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs mb-1.5 block",
                                                    children: "Correct Answer"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                                                    value: editForm.answer,
                                                    onValueChange: (v)=>setEditForm((prev)=>({
                                                                ...prev,
                                                                answer: v ?? ''
                                                            })),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {
                                                                placeholder: "Select correct answer"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                                            className: "bg-[#1a1e2b] border-white/[0.08]",
                                                            children: editForm.options.map((opt, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                                    value: opt,
                                                                    className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                                    children: [
                                                                        LETTERS[i],
                                                                        ". ",
                                                                        opt || `Option ${LETTERS[i]}`
                                                                    ]
                                                                }, i))
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                editForm.type === 'tf' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                            className: "text-[#8b92a8] text-xs mb-1.5 block",
                                            children: "Correct Answer"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .Select */ .l6, {
                                            value: editForm.answer,
                                            onValueChange: (v)=>setEditForm((prev)=>({
                                                        ...prev,
                                                        answer: v ?? '' ?? ''
                                                    })),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectTrigger */ .bq, {
                                                    className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectValue */ .yv, {
                                                        placeholder: "Select answer"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectContent */ .gC, {
                                                    className: "bg-[#1a1e2b] border-white/[0.08]",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                            value: "True",
                                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                            children: "True"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_18__/* .SelectItem */ .eb, {
                                                            value: "False",
                                                            className: "text-[#e8ecf4] text-xs focus:bg-white/[0.06]",
                                                            children: "False"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                editForm.type === 'short' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                            className: "text-[#8b92a8] text-xs mb-1.5 block",
                                            children: "Answer"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_15__/* .Input */ .p, {
                                            value: editForm.answer,
                                            onChange: (e)=>setEditForm((prev)=>({
                                                        ...prev,
                                                        answer: e.target.value
                                                    })),
                                            className: "bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] text-xs h-9",
                                            placeholder: "Enter correct answer"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_separator__WEBPACK_IMPORTED_MODULE_19__/* .Separator */ .w, {
                                    className: "bg-white/[0.06]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs",
                                                    children: "Explanation"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "h-6 text-[10px] text-[#3b82f6] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 px-2",
                                                    onClick: ()=>callAiAssist('explain', 'explanation'),
                                                    disabled: aiLoading.explanation,
                                                    children: [
                                                        aiLoading.explanation ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1"
                                                        }),
                                                        "Generate Explanation"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#3a4055] mb-1",
                                            children: "Tip: Select text to see formatting options"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_RichTextEditor__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            value: editForm.explanation,
                                            onChange: (v)=>setEditForm((prev)=>({
                                                        ...prev,
                                                        explanation: v
                                                    })),
                                            placeholder: "Enter explanation…",
                                            minHeight: "80px"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs",
                                                    children: "Mnemonic"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "h-6 text-[10px] text-[#8b5cf6] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/10 px-2",
                                                    onClick: ()=>callAiAssist('mnemonic', 'mnemonic'),
                                                    disabled: aiLoading.mnemonic,
                                                    children: [
                                                        aiLoading.mnemonic ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1"
                                                        }),
                                                        "Generate Mnemonic"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#3a4055] mb-1",
                                            children: "Tip: Select text to see formatting options"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_RichTextEditor__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            value: editForm.mnemonic,
                                            onChange: (v)=>setEditForm((prev)=>({
                                                        ...prev,
                                                        mnemonic: v
                                                    })),
                                            placeholder: "Enter mnemonic…",
                                            minHeight: "60px"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs",
                                                    children: "Clinical Pearl"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "h-6 text-[10px] text-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10 px-2",
                                                    onClick: ()=>callAiAssist('clinicalPearl', 'clinicalPearl'),
                                                    disabled: aiLoading.clinicalPearl,
                                                    children: [
                                                        aiLoading.clinicalPearl ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1"
                                                        }),
                                                        "Generate Pearl"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#3a4055] mb-1",
                                            children: "Tip: Select text to see formatting options"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_RichTextEditor__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            value: editForm.clinicalPearl,
                                            onChange: (v)=>setEditForm((prev)=>({
                                                        ...prev,
                                                        clinicalPearl: v
                                                    })),
                                            placeholder: "Enter clinical pearl…",
                                            minHeight: "60px"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_label__WEBPACK_IMPORTED_MODULE_16__/* .Label */ .J, {
                                                    className: "text-[#8b92a8] text-xs",
                                                    children: "Distractor Analysis"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "h-6 text-[10px] text-[#f59e0b] hover:text-[#f59e0b] hover:bg-[#f59e0b]/10 px-2",
                                                    onClick: ()=>callAiAssist('distractors', 'distractorAnalysis'),
                                                    disabled: aiLoading.distractorAnalysis,
                                                    children: [
                                                        aiLoading.distractorAnalysis ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 mr-1"
                                                        }),
                                                        "Generate Distractors"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#3a4055] mb-1",
                                            children: "Tip: Select text to see formatting options"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_RichTextEditor__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            value: editForm.distractorAnalysis,
                                            onChange: (v)=>setEditForm((prev)=>({
                                                        ...prev,
                                                        distractorAnalysis: v
                                                    })),
                                            placeholder: "Enter distractor analysis…",
                                            minHeight: "60px"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_12__/* .DialogFooter */ .Es, {
                            className: "mt-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditOpen(false),
                                    className: "text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.06]",
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__/* .Button */ .$, {
                                    onClick: handleSave,
                                    disabled: saving,
                                    className: "bg-[#00e5a0] text-[#0d1117] hover:bg-[#00e5a0]/90 font-semibold",
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                className: "w-4 h-4 mr-1 animate-spin"
                                            }),
                                            "Saving…"
                                        ]
                                    }) : 'Save Changes'
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialog */ .Lt, {
                open: deleteOpen,
                onOpenChange: setDeleteOpen,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogContent */ .EO, {
                    className: "bg-[#151821] border-white/[0.08] text-[#e8ecf4]",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogTitle */ .r7, {
                                    className: "text-[#e8ecf4] flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#ef4444]"
                                        }),
                                        "Delete Question"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogDescription */ .$v, {
                                    className: "text-[#5a6178]",
                                    children: deletingQuestion && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            "Are you sure you want to delete this question? This action cannot be undone.",
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mt-3 p-3 bg-[#1a1e2b] rounded-lg border border-white/[0.06]",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[#8b92a8] text-xs",
                                                    children: [
                                                        stripHtml(deletingQuestion.text).slice(0, 150),
                                                        stripHtml(deletingQuestion.text).length > 150 ? '…' : ''
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogCancel */ .Zr, {
                                    className: "bg-transparent border-white/[0.08] text-[#8b92a8] hover:bg-white/[0.06] hover:text-[#e8ecf4]",
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDeleteConfirm,
                                    className: "bg-[#ef4444] text-white hover:bg-[#ef4444]/90",
                                    children: "Delete"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialog */ .Lt, {
                open: bulkDeleteOpen,
                onOpenChange: setBulkDeleteOpen,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogContent */ .EO, {
                    className: "bg-[#151821] border-white/[0.08] text-[#e8ecf4]",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogTitle */ .r7, {
                                    className: "text-[#e8ecf4] flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_BookOpen_Bookmark_BookmarkCheck_Bot_CheckSquare_ChevronLeft_ChevronRight_Download_Eye_FileJson_FileText_Filter_Image_Lightbulb_Link2_Loader2_Pencil_Search_Sparkles_Square_StickyNote_Trash2_UploadCloud_Volume2_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#ff5757]"
                                        }),
                                        "Delete Selected Questions"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogDescription */ .$v, {
                                    className: "text-[#5a6178]",
                                    children: [
                                        "Are you sure you want to delete ",
                                        selectedIds.size,
                                        " question",
                                        selectedIds.size > 1 ? 's' : '',
                                        "? This action cannot be undone."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogCancel */ .Zr, {
                                    className: "bg-transparent border-white/[0.08] text-[#8b92a8] hover:bg-white/[0.06] hover:text-[#e8ecf4]",
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_13__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleBulkDeleteConfirm,
                                    className: "bg-[#ff5757] text-white hover:bg-[#ff5757]/90",
                                    children: [
                                        "Delete ",
                                        selectedIds.size,
                                        " Question",
                                        selectedIds.size > 1 ? 's' : ''
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ImportQuestionsModal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                open: importOpen,
                onOpenChange: setImportOpen,
                onImported: ()=>{
                    // Refresh the bank list to show the new questions
                    setPage(1);
                    fetchQuestions();
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ExplainQuestionsModal__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                open: explainOpen,
                onOpenChange: setExplainOpen,
                selectedIds: explainSelectedIds,
                onCompleted: ()=>{
                    // Explanations were written — refresh so cards show them immediately.
                    fetchQuestions();
                }
            })
        ]
    });
}


/***/ }),

/***/ 24771:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 24066));


/***/ }),

/***/ 42763:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 50694:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $S: () => (/* binding */ BYOK_MONO_LOGO_IDS),
/* harmony export */   Uy: () => (/* binding */ BYOK_PROVIDER_BY_ID),
/* harmony export */   ln: () => (/* binding */ BYOK_PROVIDERS)
/* harmony export */ });
/**
 * BYOK provider metadata for the app-wide Settings UI.
 *
 * Lightweight, client-safe subset of the full PROVIDERS registry in
 * src/lib/ai/providers.ts. We don't import that file directly because it
 * pulls in @ai-sdk/* packages (heavy, server-leaning) and the BYOK UI is
 * a client component mounted inside the SettingsDialog.
 *
 * Fields:
 *   id           — provider ID, matches PROVIDERS keys
 *   name         — display name
 *   type         — provider type, drives the test endpoint strategy
 *   defaultBaseUrl — used to pre-fill the Base URL field in the UI
 *   icon         — logo path under /public/openmaic/logos/
 *   keyHint      — placeholder shown in the API key input
 *   requiresKey  — false for keyless providers like Ollama
 */ const L = '/openmaic/logos';
const BYOK_PROVIDERS = [
    {
        id: 'openai',
        name: 'OpenAI',
        type: 'openai',
        defaultBaseUrl: 'https://api.openai.com/v1',
        icon: `${L}/openai.svg`,
        keyHint: 'sk-proj-...',
        requiresKey: true
    },
    {
        id: 'anthropic',
        name: 'Anthropic (Claude)',
        type: 'anthropic',
        defaultBaseUrl: 'https://api.anthropic.com',
        icon: `${L}/claude.svg`,
        keyHint: 'sk-ant-...',
        requiresKey: true
    },
    {
        id: 'google',
        name: 'Google Gemini',
        type: 'google',
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        icon: `${L}/gemini.svg`,
        keyHint: 'AIza...',
        requiresKey: true
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        type: 'openai',
        defaultBaseUrl: 'https://api.deepseek.com/v1',
        icon: `${L}/deepseek.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'glm',
        name: 'GLM (Zhipu)',
        type: 'openai',
        defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
        icon: `${L}/glm.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'qwen',
        name: 'Qwen (DashScope)',
        type: 'openai',
        defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        icon: `${L}/qwen.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'kimi',
        name: 'Kimi (Moonshot)',
        type: 'openai',
        defaultBaseUrl: 'https://api.moonshot.cn/v1',
        icon: `${L}/kimi.png`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'minimax',
        name: 'MiniMax',
        type: 'anthropic',
        defaultBaseUrl: 'https://api.minimaxi.com/anthropic/v1',
        icon: `${L}/minimax.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'siliconflow',
        name: 'SiliconFlow',
        type: 'openai',
        defaultBaseUrl: 'https://api.siliconflow.cn/v1',
        icon: `${L}/siliconflow.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'doubao',
        name: 'Doubao (Volcengine Ark)',
        type: 'openai',
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
        icon: `${L}/doubao.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'openrouter',
        name: 'OpenRouter',
        type: 'openai',
        defaultBaseUrl: 'https://openrouter.ai/api/v1',
        icon: `${L}/openrouter.svg`,
        keyHint: 'sk-or-...',
        requiresKey: true
    },
    {
        id: 'grok',
        name: 'Grok (xAI)',
        type: 'openai',
        defaultBaseUrl: 'https://api.x.ai/v1',
        icon: `${L}/grok.svg`,
        keyHint: 'xai-...',
        requiresKey: true
    },
    {
        id: 'xiaomi',
        name: 'Xiaomi MiMo',
        type: 'openai',
        defaultBaseUrl: 'https://api.xiaomimimo.com/v1',
        icon: `${L}/xiaomi.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'ollama',
        name: 'Ollama (local)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:11434',
        icon: `${L}/ollama.svg`,
        keyHint: '(no key needed — local only)',
        requiresKey: false
    },
    {
        id: 'freellmapi',
        name: 'FreeLLMAPI (free-tier router)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:3001/v1',
        icon: `${L}/freellmapi.svg`,
        keyHint: 'freellmapi-… (unified key from its dashboard)',
        requiresKey: true
    },
    {
        id: 'medq-router',
        name: 'MedQ AI Router (this app)',
        type: 'openai',
        // Same-origin wire surface — the AI Router tab links this automatically,
        // so the default is only a prefill for manual adds.
        defaultBaseUrl: '/v1',
        icon: `${L}/freellmapi.svg`,
        keyHint: 'freellm… (unified key from the AI Router tab)',
        requiresKey: true
    },
    {
        id: 'lemonade',
        name: 'Lemonade (local)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:13305/v1',
        icon: `${L}/lemonade.svg`,
        keyHint: '(no key needed — local only)',
        requiresKey: false
    }
];
const BYOK_PROVIDER_BY_ID = Object.fromEntries(BYOK_PROVIDERS.map((p)=>[
        p.id,
        p
    ]));
/** Monochrome SVG logos that need a dark background to render correctly. */ const BYOK_MONO_LOGO_IDS = new Set([
    'openai',
    'openrouter',
    'ollama',
    'siliconflow'
]);


/***/ }),

/***/ 59075:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RichTextEditor)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47650);
/* harmony import */ var _tiptap_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(71319);
/* harmony import */ var _tiptap_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(82159);
/* harmony import */ var _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12564);
/* harmony import */ var _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(83694);
/* harmony import */ var _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55987);
/* harmony import */ var _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12157);
/* harmony import */ var _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(58646);
/* harmony import */ var _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13850);
/* harmony import */ var _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(27337);
/* harmony import */ var _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(60475);
/* harmony import */ var _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(14198);
/* harmony import */ var _tiptap_extension_placeholder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(43561);
/* harmony import */ var _tiptap_extension_character_count__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(76905);
/* harmony import */ var _tiptap_extension_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(30574);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(93748);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(67357);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(50109);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(26636);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(38332);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(1275);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(15330);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(60976);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(58309);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(5497);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(52920);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(91161);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(59680);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(65408);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(8962);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(2075);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(29165);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(93670);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(10175);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(55646);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(19061);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(89853);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(93989);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(31935);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(32827);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(68588);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(243);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(71485);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(28786);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(36565);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(22189);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(73342);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(96609);
/* harmony import */ var _barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(14929);
/* __next_internal_client_entry_do_not_use__ default auto */ 


















/* ═══════════════════════════════════════════════════════════════
   CUSTOM TIPTAP EXTENSIONS
   ═══════════════════════════════════════════════════════════════ */ /**
 * ColoredMark — Recognizes <span class="q-hl-*"> elements so that
 * insertContent() preserves them instead of stripping unknown spans.
 */ const ColoredMark = _tiptap_core__WEBPACK_IMPORTED_MODULE_15__/* .Mark */ .CU.create({
    name: 'coloredMark',
    parseHTML () {
        return [
            {
                tag: 'span.q-hl'
            },
            {
                tag: 'span.q-hl-red'
            },
            {
                tag: 'span.q-hl-green'
            },
            {
                tag: 'span.q-hl-amber'
            },
            {
                tag: 'span.q-hl-purple'
            }
        ];
    },
    renderHTML ({ HTMLAttributes }) {
        return [
            'span',
            (0,_tiptap_core__WEBPACK_IMPORTED_MODULE_15__/* .mergeAttributes */ .KV)(HTMLAttributes),
            0
        ];
    },
    addAttributes () {
        return {
            class: {
                default: null
            },
            style: {
                default: null
            }
        };
    }
});
/**
 * RawHtmlBlock — An atomic block node that stores raw HTML content
 * and renders it via a React NodeView with dangerouslySetInnerHTML.
 */ function RawHtmlBlockView({ node }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tiptap_react__WEBPACK_IMPORTED_MODULE_16__/* .NodeViewWrapper */ .VRb, {
        as: "div",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: node.attrs.className || '',
            dangerouslySetInnerHTML: {
                __html: node.attrs.rawHtml || ''
            },
            contentEditable: false,
            style: {
                cursor: 'default',
                userSelect: 'none'
            }
        })
    });
}
const RawHtmlBlock = _tiptap_core__WEBPACK_IMPORTED_MODULE_15__/* .Node */ .bP.create({
    name: 'rawHtmlBlock',
    group: 'block',
    atom: true,
    draggable: true,
    selectable: true,
    addAttributes () {
        return {
            rawHtml: {
                default: ''
            },
            className: {
                default: ''
            }
        };
    },
    parseHTML () {
        return [
            {
                tag: 'div[data-raw-block]',
                getAttrs: (el)=>({
                        rawHtml: el.getAttribute('data-raw-html') || '',
                        className: el.getAttribute('data-class') || ''
                    })
            },
            {
                tag: 'div.q-callout',
                getAttrs: (el)=>({
                        rawHtml: el.innerHTML || '',
                        className: el.className || ''
                    })
            },
            {
                tag: 'div.q-flow',
                getAttrs: (el)=>({
                        rawHtml: el.innerHTML || '',
                        className: el.className || ''
                    })
            },
            {
                tag: 'div.q-mnemo',
                getAttrs: (el)=>({
                        rawHtml: el.innerHTML || '',
                        className: el.className || ''
                    })
            },
            {
                tag: 'div.q-grid',
                getAttrs: (el)=>({
                        rawHtml: el.innerHTML || '',
                        className: el.className || ''
                    })
            }
        ];
    },
    renderHTML ({ node }) {
        return [
            'div',
            {
                'data-raw-block': '',
                'data-raw-html': node.attrs.rawHtml,
                'data-class': node.attrs.className,
                class: node.attrs.className
            }
        ];
    },
    addNodeView () {
        return (0,_tiptap_react__WEBPACK_IMPORTED_MODULE_16__/* .ReactNodeViewRenderer */ .gu3)(RawHtmlBlockView);
    }
});
/**
 * Post-process editor HTML output to convert data-raw-block divs
 * back to their original HTML form for display outside the editor.
 */ function processEditorHtml(html) {
    if (typeof document === 'undefined') return html;
    if (!html.includes('data-raw-block')) return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    div.querySelectorAll('[data-raw-block]').forEach((el)=>{
        const rawHtml = el.getAttribute('data-raw-html') || '';
        const className = el.getAttribute('data-class') || '';
        const newDiv = document.createElement('div');
        newDiv.className = className;
        newDiv.innerHTML = rawHtml;
        el.replaceWith(newDiv);
    });
    return div.innerHTML;
}
const QUICK_INSERT_BUTTONS = [
    {
        label: 'Highlight',
        emoji: '🟢',
        color: 'text-[#00e5a0]',
        bgHover: 'hover:bg-[#00e5a0]/10',
        borderColor: 'border-[#00e5a0]/20',
        kind: 'inline',
        className: 'q-hl',
        insert: (t)=>`<span class="q-hl">${t || 'highlighted text'}</span>`
    },
    {
        label: 'Pathology',
        emoji: '🔴',
        color: 'text-[#ff5757]',
        bgHover: 'hover:bg-[#ff5757]/10',
        borderColor: 'border-[#ff5757]/20',
        kind: 'inline',
        className: 'q-hl-red',
        insert: (t)=>`<span class="q-hl-red">${t || 'pathology text'}</span>`
    },
    {
        label: 'Caution',
        emoji: '🟡',
        color: 'text-[#ffb347]',
        bgHover: 'hover:bg-[#ffb347]/10',
        borderColor: 'border-[#ffb347]/20',
        kind: 'inline',
        className: 'q-hl-amber',
        insert: (t)=>`<span class="q-hl-amber">${t || 'caution text'}</span>`
    },
    {
        label: 'Classify',
        emoji: '🟣',
        color: 'text-[#b388ff]',
        bgHover: 'hover:bg-[#b388ff]/10',
        borderColor: 'border-[#b388ff]/20',
        kind: 'inline',
        className: 'q-hl-purple',
        insert: (t)=>`<span class="q-hl-purple">${t || 'classify text'}</span>`
    },
    {
        label: 'Callout',
        emoji: '💡',
        color: 'text-[#4fc3f7]',
        bgHover: 'hover:bg-[#4fc3f7]/10',
        borderColor: 'border-[#4fc3f7]/20',
        kind: 'block',
        className: 'q-callout q-callout-blue',
        insert: (t)=>`💡 <strong>Title:</strong> ${t || 'Content'}`
    },
    {
        label: 'Flow',
        emoji: '➡️',
        color: 'text-[#8b95a8]',
        bgHover: 'hover:bg-white/5',
        borderColor: 'border-white/10',
        kind: 'block',
        className: 'q-flow',
        insert: (t)=>`<span class="q-node q-node-red">Step 1</span><span class="q-arrow">→</span><span class="q-node q-node-green">Step 2</span>`
    },
    {
        label: 'Mnemonic',
        emoji: '🧠',
        color: 'text-[#ff5757]',
        bgHover: 'hover:bg-[#ff5757]/10',
        borderColor: 'border-[#ff5757]/20',
        kind: 'block',
        className: 'q-mnemo',
        insert: (t)=>`<div><div class="q-letter" style="background:linear-gradient(135deg,#ef4444,#dc2626)">L</div><div class="q-letter-text">Letter meaning</div></div>`
    },
    {
        label: 'Pearl',
        emoji: '💎',
        color: 'text-[#ffb347]',
        bgHover: 'hover:bg-[#ffb347]/10',
        borderColor: 'border-[#ffb347]/20',
        kind: 'block',
        className: 'q-callout q-callout-amber',
        insert: (t)=>`💎 <strong>Clinical Pearl:</strong> ${t || 'Content'}`
    },
    {
        label: 'Cards',
        emoji: '📋',
        color: 'text-[#22c55e]',
        bgHover: 'hover:bg-[#22c55e]/10',
        borderColor: 'border-[#22c55e]/20',
        kind: 'block',
        className: 'q-grid q-grid-2',
        insert: (t)=>`<div class="q-card q-card-correct">✅ Correct</div><div class="q-card q-card-red">❌ Wrong</div>`
    }
];
/* ═══════════════════════════════════════════════════════════════
   PRESET COLORS
   ═══════════════════════════════════════════════════════════════ */ const TEXT_COLORS = [
    '#e8ecf4',
    '#00e5a0',
    '#ff5757',
    '#ffb347',
    '#4fc3f7',
    '#b388ff',
    '#22c55e',
    '#f472b6',
    '#8b95a8',
    '#ffffff'
];
const HIGHLIGHT_COLORS = [
    '#00e5a0',
    '#ff5757',
    '#ffb347',
    '#4fc3f7',
    '#b388ff',
    '#22c55e',
    '#f472b6',
    '#fef08a',
    '#e8ecf4'
];
function ToolbarBtn({ onClick, isActive, disabled, title, children, size = 'md' }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        onClick: onClick,
        disabled: disabled,
        title: title,
        className: `
        ${size === 'sm' ? 'p-1' : 'p-1.5'} rounded-lg transition-all duration-150 flex items-center justify-center flex-shrink-0
        ${isActive ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
      `,
        children: children
    });
}
function ToolbarDivider() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "w-px h-5 bg-white/[0.08] mx-0.5 flex-shrink-0"
    });
}
function DropdownItem({ onClick, isActive, children, shortcut }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        onClick: onClick,
        className: `w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 transition-colors ${isActive ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-[#c8d0e0] hover:bg-white/[0.06] hover:text-[#e8ecf4]'}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "flex-1 flex items-center gap-2",
                children: children
            }),
            shortcut && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-[10px] text-[#4a5068] ml-auto font-mono",
                children: shortcut
            })
        ]
    });
}
function DropdownPanel({ isOpen, onClose, triggerRef, children, align = 'left', panelMinWidth = 160 }) {
    const panelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const posRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
        x: 0,
        y: 0
    });
    // Use refs for stable scroll handler — avoids React re-render delays during scroll
    const isOpenRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(isOpen);
    const alignRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(align);
    const panelMinWidthRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(panelMinWidth);
    // Keep refs in sync with props (inside effect to satisfy react-hooks/refs rule)
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        isOpenRef.current = isOpen;
        alignRef.current = align;
        panelMinWidthRef.current = panelMinWidth;
    });
    // Synchronous DOM-only position update — no React state, no re-renders
    const updatePosition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!isOpenRef.current || !triggerRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const y = triggerRect.bottom + 4;
        let x = alignRef.current === 'right' ? triggerRect.right - panelMinWidthRef.current : triggerRect.left;
        // Clamp to viewport
        if (x + panelMinWidthRef.current > window.innerWidth - 8) {
            x = window.innerWidth - panelMinWidthRef.current - 8;
        }
        if (x < 8) x = 8;
        posRef.current = {
            x,
            y
        };
        if (panelRef.current) {
            panelRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
    }, [
        triggerRef
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        updatePosition();
    }, [
        isOpen,
        updatePosition
    ]);
    // Track scroll and resize — handler is stable (ref-based), no delay
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
        return ()=>{
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [
        isOpen,
        updatePosition
    ]);
    // Close on outside click
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        function handleClick(e) {
            if (panelRef.current && panelRef.current.contains(e.target)) return;
            if (triggerRef.current && triggerRef.current.contains(e.target)) return;
            onClose();
        }
        const timer = setTimeout(()=>{
            document.addEventListener('mousedown', handleClick);
            document.addEventListener('touchstart', handleClick);
        }, 0);
        return ()=>{
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [
        isOpen,
        onClose,
        triggerRef
    ]);
    // Close on Escape
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKey);
        return ()=>document.removeEventListener('keydown', handleKey);
    }, [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        ref: panelRef,
        "data-dropdown-panel": true,
        className: "py-1.5 bg-[#1a1e2b] border border-white/[0.1] rounded-xl shadow-2xl overflow-y-auto min-w-[160px] animate-in fade-in slide-in-from-top-1 duration-150",
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            transform: 'translate(0px, 0px)',
            zIndex: 9999,
            maxHeight: '280px',
            WebkitOverflowScrolling: 'touch',
            minWidth: `${panelMinWidth}px`
        },
        children: children
    }), document.body);
}
function ColorPicker({ isOpen, onClose, colors, isHighlight, onSelect, onReset, resetLabel, triggerRef }) {
    const pickerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const posRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
        x: 0,
        y: 0
    });
    const pickerWidth = 210;
    // Use refs for stable scroll handler — avoids React re-render delays during scroll
    const isOpenRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(isOpen);
    // Keep ref in sync with prop (inside effect to satisfy react-hooks/refs rule)
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        isOpenRef.current = isOpen;
    });
    // Synchronous DOM-only position update — no React state, no re-renders
    const updatePosition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!isOpenRef.current || !triggerRef?.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const y = triggerRect.bottom + 8;
        let x = triggerRect.left + triggerRect.width / 2 - pickerWidth / 2;
        if (x < 8) x = 8;
        if (x + pickerWidth > window.innerWidth - 8) {
            x = window.innerWidth - pickerWidth - 8;
        }
        posRef.current = {
            x,
            y
        };
        if (pickerRef.current) {
            pickerRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
    }, [
        triggerRef
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        updatePosition();
    }, [
        isOpen,
        updatePosition
    ]);
    // Track scroll and resize — handler is stable (ref-based), no delay
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
        return ()=>{
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [
        isOpen,
        updatePosition
    ]);
    // Close on outside click
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        function handleClick(e) {
            if (pickerRef.current && pickerRef.current.contains(e.target)) return;
            if (triggerRef?.current && triggerRef.current.contains(e.target)) return;
            onClose();
        }
        const timer = setTimeout(()=>{
            document.addEventListener('mousedown', handleClick);
        }, 50);
        return ()=>{
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClick);
        };
    }, [
        isOpen,
        onClose,
        triggerRef
    ]);
    // Close on Escape
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKey);
        return ()=>document.removeEventListener('keydown', handleKey);
    }, [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: pickerRef,
        "data-dropdown-panel": true,
        className: "p-3 bg-[#1a1e2b] border border-white/[0.12] rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150",
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            transform: 'translate(0px, 0px)',
            zIndex: 9999
        },
        onMouseDown: (e)=>e.preventDefault(),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-5 gap-2",
                children: colors.map((color)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: ()=>{
                            onSelect(color);
                            onClose();
                        },
                        className: "w-8 h-8 rounded-lg border border-white/[0.12] hover:scale-110 transition-transform cursor-pointer hover:border-white/[0.3]",
                        style: {
                            backgroundColor: isHighlight ? color + '40' : color
                        },
                        title: color
                    }, color))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: ()=>{
                    onReset();
                    onClose();
                },
                className: "w-full mt-2 text-[11px] text-[#8b95a8] hover:text-[#e8ecf4] px-2 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer",
                children: resetLabel
            })
        ]
    }), document.body);
}
function FloatingSelectionToolbar({ editor, wrapperRef }) {
    const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [position, setPosition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        top: 0,
        left: 0
    });
    const toolbarRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!editor) return;
        const updatePosition = ()=>{
            const { from, to } = editor.state.selection;
            if (from === to) {
                setVisible(false);
                return;
            }
            // Check if selection has text
            const text = editor.state.doc.textBetween(from, to, '');
            if (!text.trim()) {
                setVisible(false);
                return;
            }
            // We need the wrapper to position relative to it
            const wrapper = wrapperRef.current;
            if (!wrapper) return;
            // Get selection coordinates (viewport-relative)
            const coords = editor.view.coordsAtPos(from);
            const wrapperRect = wrapper.getBoundingClientRect();
            // Convert viewport coords to wrapper-relative coords
            let left = coords.left - wrapperRect.left - 30;
            // Clamp to wrapper bounds
            const estimatedWidth = 220;
            if (left + estimatedWidth > wrapperRect.width - 10) {
                left = wrapperRect.width - estimatedWidth - 10;
            }
            if (left < 10) left = 10;
            // Position above the selection
            const toolbarHeight = 44;
            const isMobile = window.innerWidth < 768;
            const topOffset = isMobile ? toolbarHeight + 16 : 52;
            let top = coords.top - wrapperRect.top - topOffset;
            // If toolbar would go above the wrapper, place below selection instead
            if (top < 4) {
                const endCoords = editor.view.coordsAtPos(to);
                top = endCoords.bottom - wrapperRect.top + 8;
            }
            // Check if the selection is even visible within the wrapper
            const contentArea = wrapper.querySelector('.medq-editor-content');
            if (contentArea) {
                const contentRect = contentArea.getBoundingClientRect();
                // If selection is above or below the visible content area, hide
                if (coords.top < contentRect.top - 10 || coords.top > contentRect.bottom + 10) {
                    setVisible(false);
                    return;
                }
            }
            setPosition({
                top,
                left
            });
            setVisible(true);
        };
        // Listen for Tiptap selection updates
        editor.on('selectionUpdate', updatePosition);
        // Track native selection changes (for mobile touch selection)
        const handleSelectionChange = ()=>{
            if (!editor.view.hasFocus()) return;
            updatePosition();
        };
        document.addEventListener('selectionchange', handleSelectionChange);
        // Update on scroll — capture phase catches scrolls in nested scrollable containers
        const handleScroll = ()=>{
            requestAnimationFrame(updatePosition);
        };
        window.addEventListener('scroll', handleScroll, true);
        // Also listen for scroll on the editor content area specifically
        let contentArea = null;
        const setupContentScrollListener = ()=>{
            contentArea = wrapperRef.current?.querySelector('.medq-editor-content') || null;
            if (contentArea) {
                contentArea.addEventListener('scroll', handleScroll);
            }
        };
        setupContentScrollListener();
        // Delayed blur handling — on mobile, blur fires before toolbar tap registers
        let blurTimeout;
        const handleBlur = ()=>{
            blurTimeout = setTimeout(()=>setVisible(false), 200);
        };
        const handleFocus = ()=>{
            clearTimeout(blurTimeout);
        };
        editor.on('blur', handleBlur);
        editor.on('focus', handleFocus);
        return ()=>{
            editor.off('selectionUpdate', updatePosition);
            editor.off('blur', handleBlur);
            editor.off('focus', handleFocus);
            document.removeEventListener('selectionchange', handleSelectionChange);
            window.removeEventListener('scroll', handleScroll, true);
            if (contentArea) {
                contentArea.removeEventListener('scroll', handleScroll);
            }
            clearTimeout(blurTimeout);
        };
    }, [
        editor,
        wrapperRef
    ]);
    if (!visible) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: toolbarRef,
        className: "absolute z-[60] flex items-center gap-0.5 p-1.5 bg-[#1a1e2b]/95 backdrop-blur-sm border border-white/[0.12] rounded-xl shadow-2xl animate-in fade-in duration-100",
        style: {
            top: position.top,
            left: position.left
        },
        onMouseDown: (e)=>e.preventDefault(),
        onTouchStart: (e)=>e.preventDefault(),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onMouseDown: (e)=>e.preventDefault(),
                onClick: ()=>editor.chain().focus().toggleBold().run(),
                className: `p-1.5 rounded-lg transition-all cursor-pointer ${editor.isActive('bold') ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                title: "Bold",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onMouseDown: (e)=>e.preventDefault(),
                onClick: ()=>editor.chain().focus().toggleItalic().run(),
                className: `p-1.5 rounded-lg transition-all cursor-pointer ${editor.isActive('italic') ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                title: "Italic",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onMouseDown: (e)=>e.preventDefault(),
                onClick: ()=>editor.chain().focus().toggleUnderline().run(),
                className: `p-1.5 rounded-lg transition-all cursor-pointer ${editor.isActive('underline') ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                title: "Underline",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-px h-4 bg-white/[0.08] mx-0.5"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onMouseDown: (e)=>e.preventDefault(),
                onClick: ()=>editor.chain().focus().toggleHighlight({
                        color: '#00e5a0'
                    }).run(),
                className: `p-1.5 rounded-lg transition-all cursor-pointer ${editor.isActive('highlight') ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                title: "Highlight",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onMouseDown: (e)=>e.preventDefault(),
                onClick: ()=>editor.chain().focus().toggleStrike().run(),
                className: `p-1.5 rounded-lg transition-all cursor-pointer ${editor.isActive('strike') ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                title: "Strikethrough",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5"
                })
            })
        ]
    });
}
function InlineDialog({ isOpen, onClose, title, placeholder, initialValue = '', onConfirm, containerRef }) {
    // When isOpen changes from false→true the parent remounts this component
    // (because it returns null when !isOpen), so useState initializes correctly.
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValue);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isOpen) {
            // Focus the input after a short delay for animation
            setTimeout(()=>inputRef.current?.focus(), 100);
        }
    }, [
        isOpen
    ]);
    // Close on outside click
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        function handleClick(e) {
            const panel = containerRef?.current?.querySelector('[data-inline-dialog]');
            if (panel && panel.contains(e.target)) return;
            onClose();
        }
        const timer = setTimeout(()=>{
            document.addEventListener('mousedown', handleClick);
        }, 100);
        return ()=>{
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClick);
        };
    }, [
        isOpen,
        onClose,
        containerRef
    ]);
    // Handle Escape key
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen) return;
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKey);
        return ()=>document.removeEventListener('keydown', handleKey);
    }, [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    const handleConfirm = ()=>{
        if (value.trim()) {
            onConfirm(value.trim());
        }
        onClose();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        "data-inline-dialog": true,
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[320px] max-w-[90%] bg-[#1a1e2b] border border-white/[0.12] rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150",
        onMouseDown: (e)=>e.preventDefault(),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                        className: "text-sm font-semibold text-[#e8ecf4]",
                        children: title
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: onClose,
                        className: "p-1 rounded-lg text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-colors cursor-pointer",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex-1 relative",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a5068]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                ref: inputRef,
                                type: "text",
                                value: value,
                                onChange: (e)=>setValue(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter') handleConfirm();
                                },
                                placeholder: placeholder,
                                className: "w-full bg-[#0c0e14] border border-white/[0.08] rounded-lg px-3 py-2 pl-8 text-sm text-[#e8ecf4] placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-1 focus:ring-[#00e5a0]/20 transition-all"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: handleConfirm,
                        disabled: !value.trim(),
                        className: "px-3 py-2 bg-[#00e5a0]/15 text-[#00e5a0] rounded-lg text-sm font-semibold hover:bg-[#00e5a0]/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    })
                ]
            })
        ]
    });
}
function RichTextEditor({ value, onChange, placeholder = 'Start typing... Use the toolbar above to format text.', minHeight = '100px', className = '' }) {
    const [sourceMode, setSourceMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [sourceValue, setSourceValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(value);
    const [fullscreen, setFullscreen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showColorPicker, setShowColorPicker] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showHighlightPicker, setShowHighlightPicker] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showHeadingMenu, setShowHeadingMenu] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showMoreMenu, setShowMoreMenu] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showLinkDialog, setShowLinkDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showImageDialog, setShowImageDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Ref to the editor wrapper — used for absolute positioning of dropdowns & floating toolbar
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Refs for all trigger buttons that open dropdown panels
    const headingTriggerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const moreTriggerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const colorPickerTriggerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const highlightPickerTriggerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Track whether the current change originated from the editor itself
    const isEditorUpdate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const editor = (0,_tiptap_react__WEBPACK_IMPORTED_MODULE_16__/* .useEditor */ .hGv)({
        extensions: [
            _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.configure({
                heading: {
                    levels: [
                        1,
                        2,
                        3
                    ]
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'ql-syntax'
                    }
                }
            }),
            _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
            _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.configure({
                types: [
                    'heading',
                    'paragraph'
                ]
            }),
            _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
            _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A,
            _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Ay.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'editor-link'
                }
            }),
            _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Ay.configure({
                HTMLAttributes: {
                    class: 'editor-image'
                }
            }),
            _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_10__/* .TextStyle */ .xJ,
            _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_10__/* .Color */ .Q1,
            _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Ay.configure({
                multicolor: true,
                HTMLAttributes: {
                    class: 'q-hl'
                }
            }),
            _tiptap_extension_placeholder__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A.configure({
                placeholder
            }),
            _tiptap_extension_character_count__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
            ColoredMark,
            RawHtmlBlock,
            _tiptap_extension_table__WEBPACK_IMPORTED_MODULE_14__/* .Table */ .XI.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'medq-editor-table'
                }
            }),
            _tiptap_extension_table__WEBPACK_IMPORTED_MODULE_14__/* .TableRow */ .Hj,
            _tiptap_extension_table__WEBPACK_IMPORTED_MODULE_14__/* .TableCell */ .nA,
            _tiptap_extension_table__WEBPACK_IMPORTED_MODULE_14__/* .TableHeader */ .A0
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: 'medq-tiptap-editor'
            }
        },
        onUpdate: ({ editor: ed })=>{
            isEditorUpdate.current = true;
            const html = ed.getHTML();
            const text = ed.getText();
            const processedHtml = processEditorHtml(html);
            if (!text.trim() && !html.includes('<img') && !html.includes('<div')) {
                onChange('');
            } else {
                onChange(processedHtml);
            }
        },
        immediatelyRender: false
    });
    // Sync external value changes to editor
    const isInternalUpdate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!editor) return;
        if (isInternalUpdate.current) {
            isInternalUpdate.current = false;
            return;
        }
        if (isEditorUpdate.current) {
            isEditorUpdate.current = false;
            return;
        }
        const currentHTML = editor.getHTML();
        const normalizedCurrent = currentHTML === '<p></p>' ? '' : currentHTML;
        const normalizedValue = value || '';
        if (normalizedValue !== normalizedCurrent) {
            editor.commands.setContent(normalizedValue || '<p></p>');
        }
    }, [
        value,
        editor
    ]);
    /* ─── Close all menus ─── */ const closeAllMenus = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setShowHeadingMenu(false);
        setShowMoreMenu(false);
        setShowColorPicker(false);
        setShowHighlightPicker(false);
    }, []);
    // Ctrl+K shortcut for link dialog
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!editor || sourceMode) return;
        function handleKeyDown(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                closeAllMenus();
                setShowLinkDialog(true);
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        editor,
        sourceMode,
        closeAllMenus
    ]);
    // Global Escape handler to close any open dropdown
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                closeAllMenus();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        closeAllMenus
    ]);
    /* ─── Handle quick-insert button click ─── */ const handleQuickInsert = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((btn)=>{
        if (!editor) return;
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, '');
        if (btn.kind === 'inline') {
            const text = selectedText || btn.insert('').replace(/<[^>]*>/g, '');
            const cssClass = btn.className || '';
            if (selectedText) {
                editor.chain().focus().deleteSelection().insertContent({
                    type: 'text',
                    text,
                    marks: cssClass ? [
                        {
                            type: 'coloredMark',
                            attrs: {
                                class: cssClass
                            }
                        }
                    ] : []
                }).run();
            } else {
                editor.chain().focus().insertContent({
                    type: 'text',
                    text,
                    marks: cssClass ? [
                        {
                            type: 'coloredMark',
                            attrs: {
                                class: cssClass
                            }
                        }
                    ] : []
                }).run();
            }
        } else {
            const innerHtml = btn.insert(selectedText);
            editor.commands.insertContent({
                type: 'rawHtmlBlock',
                attrs: {
                    rawHtml: innerHtml,
                    className: btn.className || ''
                }
            });
            editor.commands.insertContent('<p></p>');
        }
    }, [
        editor
    ]);
    /* ─── Toggle source mode ─── */ const handleToggleSource = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!sourceMode) {
            setSourceValue(editor ? editor.getHTML() : value);
            setSourceMode(true);
        } else {
            if (editor) {
                isInternalUpdate.current = true;
                editor.commands.setContent(sourceValue);
                onChange(sourceValue);
            }
            setSourceMode(false);
        }
    }, [
        sourceMode,
        editor,
        value,
        sourceValue,
        onChange
    ]);
    /* ─── Handle link insertion via dialog ─── */ const handleLinkConfirm = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((url)=>{
        if (!editor) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        // Ensure URL has a protocol
        let href = url;
        if (!/^https?:\/\//i.test(href) && !/^mailto:/i.test(href) && !/^tel:/i.test(href)) {
            href = 'https://' + href;
        }
        editor.chain().focus().extendMarkRange('link').setLink({
            href
        }).run();
    }, [
        editor
    ]);
    /* ─── Handle image insertion via dialog ─── */ const handleImageConfirm = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((url)=>{
        if (!editor) return;
        if (url) {
            editor.chain().focus().setImage({
                src: url
            }).run();
        }
    }, [
        editor
    ]);
    /* ─── Fullscreen toggle ─── */ const toggleFullscreen = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setFullscreen((prev)=>!prev);
    }, []);
    /* ─── Open a single dropdown, closing all others ─── */ const openMenu = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((setter)=>{
        closeAllMenus();
        setter(true);
    }, [
        closeAllMenus
    ]);
    if (!editor) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: `medq-editor-wrapper rounded-xl border border-white/[0.08] bg-[#1a1e2b] ${className}`,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-full h-28 animate-pulse flex items-center justify-center",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-[#3a4055] text-sm",
                    children: "Loading editor..."
                })
            })
        });
    }
    const charCount = editor.storage.characterCount;
    const characters = charCount ? charCount.characters() : 0;
    const words = charCount ? charCount.words() : 0;
    // Determine current heading level for display
    const currentHeading = editor.isActive('heading', {
        level: 1
    }) ? 'H1' : editor.isActive('heading', {
        level: 2
    }) ? 'H2' : editor.isActive('heading', {
        level: 3
    }) ? 'H3' : 'P';
    // Get initial link URL for the dialog
    const currentLinkUrl = editor.getAttributes('link').href || '';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: wrapperRef,
        className: `medq-editor-wrapper rounded-xl border border-white/[0.08] bg-[#1a1e2b] flex flex-col relative ${fullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''} ${className}`,
        children: [
            !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "medq-toolbar border-b border-white/[0.06] bg-[#1a1e2b] flex-shrink-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "medq-toolbar-inner flex items-center gap-0.5 px-2 py-1.5 overflow-x-auto scrollbar-thin",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().undo().run(),
                            disabled: !editor.can().undo(),
                            title: "Undo (Ctrl+Z)",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().redo().run(),
                            disabled: !editor.can().redo(),
                            title: "Redo (Ctrl+Shift+Z)",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarDivider, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().toggleBold().run(),
                            isActive: editor.isActive('bold'),
                            title: "Bold (Ctrl+B)",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().toggleItalic().run(),
                            isActive: editor.isActive('italic'),
                            title: "Italic (Ctrl+I)",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().toggleUnderline().run(),
                            isActive: editor.isActive('underline'),
                            title: "Underline (Ctrl+U)",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarDivider, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            ref: headingTriggerRef,
                            type: "button",
                            onClick: ()=>{
                                if (showHeadingMenu) {
                                    setShowHeadingMenu(false);
                                } else {
                                    openMenu(setShowHeadingMenu);
                                }
                            },
                            className: `p-1.5 rounded-lg transition-all duration-150 flex items-center gap-1 cursor-pointer flex-shrink-0 ${editor.isActive('heading') || showHeadingMenu ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                            title: "Headings",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[11px] font-bold leading-none",
                                    children: currentHeading
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                    className: "w-3 h-3 opacity-60"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarDivider, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().toggleBulletList().run(),
                            isActive: editor.isActive('bulletList'),
                            title: "Bullet List",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().toggleOrderedList().run(),
                            isActive: editor.isActive('orderedList'),
                            title: "Ordered List",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarDivider, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            ref: colorPickerTriggerRef,
                            type: "button",
                            onClick: ()=>{
                                if (showColorPicker) {
                                    setShowColorPicker(false);
                                } else {
                                    openMenu(setShowColorPicker);
                                }
                            },
                            title: "Text Color",
                            className: `p-1 rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer flex-shrink-0 ${showColorPicker ? 'bg-[#4fc3f7]/15 text-[#4fc3f7]' : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            ref: highlightPickerTriggerRef,
                            type: "button",
                            onClick: ()=>{
                                if (showHighlightPicker) {
                                    setShowHighlightPicker(false);
                                } else {
                                    openMenu(setShowHighlightPicker);
                                }
                            },
                            title: "Highlight Color",
                            className: `p-1 rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer flex-shrink-0 ${showHighlightPicker ? 'bg-[#ffb347]/15 text-[#ffb347]' : editor.isActive('highlight') ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarDivider, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>editor.chain().focus().toggleStrike().run(),
                            isActive: editor.isActive('strike'),
                            title: "Strikethrough",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: ()=>{
                                closeAllMenus();
                                setShowLinkDialog(true);
                            },
                            isActive: editor.isActive('link'),
                            title: "Insert Link (Ctrl+K)",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarDivider, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            ref: moreTriggerRef,
                            type: "button",
                            onClick: ()=>{
                                if (showMoreMenu) {
                                    setShowMoreMenu(false);
                                } else {
                                    openMenu(setShowMoreMenu);
                                }
                            },
                            className: `p-1.5 rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer flex-shrink-0 ${showMoreMenu ? 'bg-white/[0.08] text-[#e8ecf4]' : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'}`,
                            title: "More Options",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex-1 min-w-[8px]"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolbarBtn, {
                            onClick: toggleFullscreen,
                            title: fullscreen ? 'Exit Fullscreen' : 'Fullscreen',
                            children: fullscreen ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        })
                    ]
                })
            }),
            !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownPanel, {
                isOpen: showHeadingMenu,
                onClose: ()=>setShowHeadingMenu(false),
                triggerRef: headingTriggerRef,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().setParagraph().run();
                            setShowHeadingMenu(false);
                        },
                        isActive: editor.isActive('paragraph') && !editor.isActive('heading'),
                        shortcut: "Ctrl+Alt+0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Normal Text"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().toggleHeading({
                                level: 1
                            }).run();
                            setShowHeadingMenu(false);
                        },
                        isActive: editor.isActive('heading', {
                            level: 1
                        }),
                        shortcut: "Ctrl+Alt+1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Heading 1"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().toggleHeading({
                                level: 2
                            }).run();
                            setShowHeadingMenu(false);
                        },
                        isActive: editor.isActive('heading', {
                            level: 2
                        }),
                        shortcut: "Ctrl+Alt+2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Heading 2"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().toggleHeading({
                                level: 3
                            }).run();
                            setShowHeadingMenu(false);
                        },
                        isActive: editor.isActive('heading', {
                            level: 3
                        }),
                        shortcut: "Ctrl+Alt+3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Heading 3"
                        ]
                    })
                ]
            }),
            !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownPanel, {
                isOpen: showMoreMenu,
                onClose: ()=>setShowMoreMenu(false),
                triggerRef: moreTriggerRef,
                align: "right",
                panelMinWidth: 180,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().toggleSubscript().run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive('subscript'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Subscript"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().toggleSuperscript().run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive('superscript'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Superscript"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "my-1 border-t border-white/[0.06]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().sinkListItem('listItem').run();
                            setShowMoreMenu(false);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Indent"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().liftListItem('listItem').run();
                            setShowMoreMenu(false);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Outdent"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "my-1 border-t border-white/[0.06]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().setTextAlign('left').run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive({
                            textAlign: 'left'
                        }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Align Left"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().setTextAlign('center').run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive({
                            textAlign: 'center'
                        }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Center"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().setTextAlign('right').run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive({
                            textAlign: 'right'
                        }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Align Right"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().setTextAlign('justify').run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive({
                            textAlign: 'justify'
                        }),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Justify"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "my-1 border-t border-white/[0.06]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().toggleBlockquote().run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive('blockquote'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Blockquote"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().toggleCodeBlock().run();
                            setShowMoreMenu(false);
                        },
                        isActive: editor.isActive('codeBlock'),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_48__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Code Block"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().setHorizontalRule().run();
                            setShowMoreMenu(false);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_49__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Horizontal Rule"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            setShowMoreMenu(false);
                            setShowImageDialog(true);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Insert Image"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "my-1 border-t border-white/[0.06]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().insertTable({
                                rows: 3,
                                cols: 3,
                                withHeaderRow: true
                            }).run();
                            setShowMoreMenu(false);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Insert Table"
                        ]
                    }),
                    editor.isActive('table') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().addRowBefore().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Add Row Before"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().addRowAfter().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Add Row After"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().addColumnBefore().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Add Column Before"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().addColumnAfter().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Add Column After"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().deleteRow().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Delete Row"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().deleteColumn().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Delete Column"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().deleteTable().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Delete Table"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().mergeCells().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Merge Cells"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                                onClick: ()=>{
                                    editor.chain().focus().splitCell().run();
                                    setShowMoreMenu(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    "Split Cell"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "my-1 border-t border-white/[0.06]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DropdownItem, {
                        onClick: ()=>{
                            editor.chain().focus().clearNodes().unsetAllMarks().run();
                            setShowMoreMenu(false);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_53__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Clear Formatting"
                        ]
                    })
                ]
            }),
            !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPicker, {
                isOpen: showColorPicker,
                onClose: ()=>setShowColorPicker(false),
                colors: TEXT_COLORS,
                onSelect: (color)=>editor.chain().focus().setColor(color).run(),
                onReset: ()=>editor.chain().focus().unsetColor().run(),
                resetLabel: "Reset Color",
                triggerRef: colorPickerTriggerRef
            }),
            !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPicker, {
                isOpen: showHighlightPicker,
                onClose: ()=>setShowHighlightPicker(false),
                colors: HIGHLIGHT_COLORS,
                isHighlight: true,
                onSelect: (color)=>editor.chain().focus().toggleHighlight({
                        color
                    }).run(),
                onReset: ()=>editor.chain().focus().unsetHighlight().run(),
                resetLabel: "Remove Highlight",
                triggerRef: highlightPickerTriggerRef
            }),
            !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FloatingSelectionToolbar, {
                editor: editor,
                wrapperRef: wrapperRef
            }),
            !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "medq-editor-content flex-1 overflow-y-auto",
                style: {
                    minHeight: fullscreen ? 'calc(100vh - 140px)' : minHeight
                },
                onContextMenu: (e)=>e.preventDefault(),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tiptap_react__WEBPACK_IMPORTED_MODULE_16__/* .EditorContent */ .$Z$, {
                    editor: editor
                })
            }),
            sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                value: sourceValue,
                onChange: (e)=>setSourceValue(e.target.value),
                className: "w-full bg-[#0c0e14] text-[#e8ecf4] text-sm font-mono p-4 outline-none resize-y border-none flex-1",
                style: {
                    minHeight: fullscreen ? 'calc(100vh - 100px)' : `calc(${minHeight} + 80px)`
                },
                spellCheck: false,
                placeholder: "<p>Raw HTML here...</p>"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "medq-quick-insert-row border-t border-white/[0.06] bg-[#161a26] flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin",
                        children: [
                            QUICK_INSERT_BUTTONS.map((btn)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>handleQuickInsert(btn),
                                    disabled: sourceMode,
                                    className: `medq-qi-btn ${btn.color} ${btn.bgHover} border ${btn.borderColor} ${sourceMode ? 'opacity-40 cursor-not-allowed' : ''}`,
                                    title: btn.label,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "medq-qi-emoji",
                                            children: btn.emoji
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "medq-qi-label",
                                            children: btn.label
                                        })
                                    ]
                                }, btn.label)),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: handleToggleSource,
                                className: `medq-qi-btn border font-semibold ${sourceMode ? 'text-[#00e5a0] border-[#00e5a0]/30 bg-[#00e5a0]/10' : 'text-[#5a6478] border-white/10 hover:bg-white/5 hover:text-[#00e5a0]'}`,
                                title: sourceMode ? 'Back to rich text' : 'Edit HTML source',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "medq-qi-emoji",
                                        children: "</>"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "medq-qi-label",
                                        children: "Source"
                                    })
                                ]
                            }),
                            sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: toggleFullscreen,
                                className: "medq-qi-btn border font-semibold text-[#5a6478] border-white/10 hover:bg-white/5 hover:text-[#00e5a0]",
                                title: fullscreen ? 'Exit Fullscreen' : 'Fullscreen',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "medq-qi-emoji",
                                        children: fullscreen ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "medq-qi-label",
                                        children: fullscreen ? 'Exit' : 'Full'
                                    })
                                ]
                            })
                        ]
                    }),
                    !sourceMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3 pt-1.5 text-[10px] text-[#3a4055]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlignCenter_AlignJustify_AlignLeft_AlignRight_Bold_Check_ChevronDown_Code_ExternalLink_Heading1_Heading2_Heading3_Highlighter_ImageIcon_IndentDecrease_IndentIncrease_Italic_Link_List_ListOrdered_Maximize2_Minimize2_Minus_MoreHorizontal_Palette_Pilcrow_Quote_Redo2_RemoveFormatting_Strikethrough_Subscript_Superscript_Table_TableCellsMerge_Type_Underline_Undo2_X_lucide_react__WEBPACK_IMPORTED_MODULE_54__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    characters,
                                    " chars"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    words,
                                    " words"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InlineDialog, {
                isOpen: showLinkDialog,
                onClose: ()=>setShowLinkDialog(false),
                title: "Insert Link",
                placeholder: "https://example.com",
                initialValue: currentLinkUrl,
                onConfirm: handleLinkConfirm,
                containerRef: wrapperRef
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InlineDialog, {
                isOpen: showImageDialog,
                onClose: ()=>setShowImageDialog(false),
                title: "Insert Image",
                placeholder: "https://example.com/image.png",
                onConfirm: handleImageConfirm,
                containerRef: wrapperRef
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

/***/ 64745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ImportQuestionsModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42763);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27502);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(64962);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(94421);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(48246);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(40852);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(39421);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(874);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(31458);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(18986);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(76721);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(11012);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * ImportQuestionsModal — import questions from a file into the Question Bank.
 *
 * Flow:
 *   1. User uploads a file (JSON / CSV / TXT / MD / DOCX / PDF) or pastes text
 *   2. Structured files (JSON/CSV) are parsed directly in the browser
 *   3. Unstructured files (TXT/MD/DOCX/PDF) and pasted text go through
 *      POST /api/questions/import/extract — AI pulls out every question
 *   4. Parsed questions are previewed — each can be included/excluded
 *      and edited inline (pencil button) before import
 *   5. Import posts the final selection to POST /api/questions/import
 */ 



/** localStorage pointer to a running/finished extraction job, so the user
 *  can close the page mid-extraction and re-attach on return (the job itself
 *  lives server-side in the DB — Knowledge-Library pattern). */ const EXTRACT_JOB_KEY = 'medq:extract-job';
/** Pending file content (text + images) persisted during the gap between
 *  file upload and the server POST that creates a jobId. If the user
 *  reloads during client-side extraction, this is restored so the upload
 *  isn't lost. Cleared once the server job is created (EXTRACT_JOB_KEY
 *  takes over as the resume pointer). */ const PENDING_FILE_KEY = 'medq:extract-pending-file';
/** Mirrors the server's MAX_INPUT_CHARS — checked client-side so the user
 *  gets an immediate, friendly message instead of a 413 round-trip. */ const MAX_EXTRACT_CHARS = 1500000;
const EXTRACT_JOB_MAX_AGE_MS = 24 * 60 * 60000;
/** Rough live estimate of how many questions sit in the pasted text, so the
 *  user sees up front what the AI is about to work on (question-mark count is
 *  a solid floor for most banks; numbered lines catch statement-style stems). */ function estimateQuestionCount(text) {
    const qmarks = (text.match(/\?/g) || []).length;
    const numbered = (text.match(/(^|\n)\s*(?:\d{1,3}[.)\]:\-]\s|Q\s?\d{1,3}[.)\]:\-]\s)/g) || []).length;
    // Multi-signal, mirroring the server: inline option markers ("a. x b. y …"),
    // "Answer:" lines, and short-line density — single signals each miss real
    // formats (a bank whose stems have no "?" and "9-" numbering looked ~40%
    // sparser than reality to the old qmark-only check).
    const optionMarkers = (text.match(/(?:^|[\s(])[A-Ea-e][.)]\s+\S/g) || []).length;
    const answerLines = (text.match(/(^|\n)\s*(?:ans(?:wer)?|correct(?:\s+answer)?)\s*[:.\-)]/gi) || []).length;
    const shortLines = text.split('\n').filter((l)=>{
        const n = l.trim().length;
        return n > 0 && n <= 90;
    }).length;
    const est = Math.max(qmarks, numbered, Math.floor(optionMarkers / 4), answerLines, Math.floor(shortLines / 6));
    return Math.min(est, Math.floor(text.length / 80));
}
const DIFF_COLORS = {
    Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    Basic: 'text-green-400 bg-green-400/10 border-green-400/25',
    Moderate: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
    Hard: 'text-orange-400 bg-orange-400/10 border-orange-400/25',
    Expert: 'text-red-400 bg-red-400/10 border-red-400/25'
};
const TYPE_LABELS = {
    mcq: 'MCQ',
    tf: 'True/False',
    short: 'Short Answer'
};
const DIFFICULTIES = [
    'Easy',
    'Basic',
    'Moderate',
    'Hard',
    'Expert'
];
/** Build an editable draft from an extracted question (best-effort answer→option matching). */ function draftFromQuestion(q) {
    let answer = String(q.answer ?? '');
    if (q.type === 'tf') {
        answer = answer.trim().toLowerCase().startsWith('f') ? 'False' : 'True';
    }
    let correctIdx = -1;
    const options = q.options.map((o)=>String(o ?? ''));
    if (q.type === 'mcq') {
        const norm = answer.trim().toLowerCase();
        correctIdx = options.findIndex((o)=>o.trim().toLowerCase() === norm);
        if (correctIdx === -1 && norm) {
            // letter answers like "A" or "b)"
            const letter = norm.match(/^[a-f](?![a-z])/);
            if (letter) correctIdx = letter[0].charCodeAt(0) - 97;
            if (correctIdx === -1 || correctIdx >= options.length) {
                // partial text match (answer contained in an option or vice versa)
                correctIdx = options.findIndex((o)=>o.trim() && (o.toLowerCase().includes(norm) || norm.includes(o.trim().toLowerCase())));
            }
        }
        if (correctIdx !== -1 && (correctIdx < 0 || correctIdx >= options.length)) correctIdx = -1;
    }
    return {
        text: String(q.text ?? ''),
        type: q.type,
        options: q.type === 'mcq' ? options : [],
        correctIdx,
        answer,
        explanation: String(q.explanation ?? ''),
        difficulty: DIFFICULTIES.includes(q.difficulty) ? q.difficulty : 'Moderate',
        system: String(q.system ?? 'General') || 'General',
        topic: String(q.topic ?? 'General') || 'General',
        tagsInput: (q.tags ?? []).join(', ')
    };
}
function parseCSVClient(text) {
    const lines = text.split('\n').filter((l)=>l.trim());
    return lines.map((line)=>{
        const cells = [];
        let current = '';
        let inQuotes = false;
        for (const char of line){
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                cells.push(current.trim());
                current = '';
            } else current += char;
        }
        cells.push(current.trim());
        return cells;
    });
}
/** Parse CSV rows into the ParsedQuestion shape (mirrors the API's mapping). */ function csvToQuestions(csv) {
    const parsed = parseCSVClient(csv);
    const errors = [];
    const questions = [];
    if (parsed.length < 2) return {
        questions,
        errors: [
            'CSV needs a header row and at least one data row'
        ]
    };
    const headers = parsed[0].map((h)=>h.trim());
    for(let i = 1; i < parsed.length; i++){
        const row = {};
        headers.forEach((h, idx)=>{
            row[h] = (parsed[i][idx] || '').trim();
        });
        const text = row.text || row.question || '';
        const answer = row.answer || row.correctAnswer || '';
        if (!text || !answer) {
            errors.push(`Row ${i}: missing ${!text ? 'question text' : 'answer'}`);
            continue;
        }
        const rawType = (row.type || 'mcq').toLowerCase();
        const type = [
            'tf',
            'true_false',
            'truefalse',
            'boolean'
        ].includes(rawType) ? 'tf' : rawType === 'short' ? 'short' : 'mcq';
        const validDifficulty = [
            'Easy',
            'Basic',
            'Moderate',
            'Hard',
            'Expert'
        ];
        questions.push({
            text,
            type,
            options: row.options ? row.options.split('|').map((o)=>o.trim()).filter(Boolean) : [],
            answer,
            explanation: row.explanation || '',
            mnemonic: row.mnemonic || '',
            clinicalPearl: row.clinicalPearl || '',
            difficulty: validDifficulty.includes(row.difficulty) ? row.difficulty : 'Moderate',
            system: row.system || 'General',
            topic: row.topic || 'General',
            tags: row.tags ? row.tags.split(',').map((t)=>t.trim()).filter(Boolean) : []
        });
    }
    return {
        questions,
        errors
    };
}
/** Read a File object as text in the browser. */ function readFileText(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(reader.result);
        reader.onerror = ()=>reject(new Error('Could not read the file'));
        reader.readAsText(file);
    });
}
/** Persist the pending file content (text + images) to sessionStorage so a
 *  reload during client-side extraction doesn't lose the upload. Cleared
 *  once the server job is created. */ function savePendingFile(text, fileName, images) {
    try {
        window.sessionStorage.setItem(PENDING_FILE_KEY, JSON.stringify({
            text,
            fileName,
            images: images ?? [],
            at: Date.now()
        }));
    } catch  {}
}
function clearPendingFile() {
    try {
        window.sessionStorage.removeItem(PENDING_FILE_KEY);
    } catch  {}
}
function loadPendingFile() {
    try {
        const raw = window.sessionStorage.getItem(PENDING_FILE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.text || !parsed?.fileName) return null;
        // 1-hour window for the pending state (longer than typical
        // client-side extraction, shorter than the job resume window).
        if (Date.now() - (parsed.at || 0) > 60 * 60 * 1000) {
            window.sessionStorage.removeItem(PENDING_FILE_KEY);
            return null;
        }
        return parsed;
    } catch  {
        return null;
    }
}
/* ── Inline edit form shown inside a preview card ── */ function QuestionEditForm({ draft, onChange, onSave, onCancel }) {
    const inputCls = 'w-full rounded-lg border border-white/[0.1] bg-[#1a1e2b] px-3 py-2 text-xs text-[#e8ecf4] placeholder:text-[#5a6178]/60 focus:outline-none focus:border-[#00e5a0]/40 focus:ring-1 focus:ring-[#00e5a0]/25';
    const labelCls = 'block text-[10px] font-semibold uppercase tracking-wide text-[#5a6178] mb-1.5';
    const changeType = (t)=>{
        if (t === draft.type) return;
        const patch = {
            type: t
        };
        if (t === 'mcq') {
            if (draft.options.length < 2) patch.options = [
                '',
                '',
                '',
                ''
            ];
            patch.correctIdx = -1;
        } else if (t === 'tf') {
            patch.answer = draft.answer.trim().toLowerCase().startsWith('f') ? 'False' : 'True';
        } else {
            patch.answer = draft.answer === 'True' || draft.answer === 'False' ? '' : draft.answer;
        }
        onChange(patch);
    };
    const setOption = (oi, val)=>{
        const next = [
            ...draft.options
        ];
        next[oi] = val;
        onChange({
            options: next
        });
    };
    const removeOption = (oi)=>{
        if (draft.options.length <= 2) return;
        const next = draft.options.filter((_, k)=>k !== oi);
        let correctIdx = draft.correctIdx;
        if (correctIdx === oi) correctIdx = -1;
        else if (correctIdx > oi) correctIdx -= 1;
        onChange({
            options: next,
            correctIdx
        });
    };
    const addOption = ()=>{
        if (draft.options.length >= 6) return;
        onChange({
            options: [
                ...draft.options,
                ''
            ]
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "px-3 pb-3 pt-1 border-t border-white/[0.05] space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: labelCls,
                        children: "Question"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                        value: draft.text,
                        onChange: (e)=>onChange({
                                text: e.target.value
                            }),
                        rows: 3,
                        placeholder: "Question text",
                        className: `${inputCls} leading-relaxed resize-y`
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: labelCls,
                                children: "Type"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex gap-1",
                                children: [
                                    'mcq',
                                    'tf',
                                    'short'
                                ].map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>changeType(t),
                                        className: `flex-1 px-2 py-1.5 rounded-md text-[10px] font-bold border transition-all ${draft.type === t ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30' : 'text-[#8b92a8] border-white/[0.08] hover:border-white/[0.2]'}`,
                                        children: TYPE_LABELS[t]
                                    }, t))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: labelCls,
                                children: "Difficulty"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex flex-wrap gap-1",
                                children: DIFFICULTIES.map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>onChange({
                                                difficulty: d
                                            }),
                                        className: `px-2 py-1 rounded text-[10px] font-bold border transition-all ${draft.difficulty === d ? DIFF_COLORS[d] || DIFF_COLORS.Moderate : 'text-[#8b92a8] border-white/[0.08] hover:border-white/[0.2]'}`,
                                        children: d
                                    }, d))
                            })
                        ]
                    })
                ]
            }),
            draft.type === 'mcq' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: labelCls,
                        children: "Options — mark the correct one"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-1.5",
                        children: draft.options.map((opt, oi)=>{
                            const isCorrect = draft.correctIdx === oi;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: `flex items-center gap-2 rounded-md border px-2 py-1.5 transition-all ${isCorrect ? 'border-[#00e5a0]/30 bg-[#00e5a0]/[0.07]' : 'border-white/[0.06] bg-white/[0.02]'}`,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>onChange({
                                                correctIdx: isCorrect ? -1 : oi
                                            }),
                                        title: isCorrect ? 'Unmark as correct' : 'Mark as correct answer',
                                        className: `w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isCorrect ? 'border-[#00e5a0]/50 bg-[#00e5a0]/15 text-[#00e5a0]' : 'border-white/[0.15] text-transparent hover:border-[#00e5a0]/40'}`,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[11px] font-bold text-[#5a6178] shrink-0",
                                        children: String.fromCharCode(65 + oi)
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        value: opt,
                                        onChange: (e)=>setOption(oi, e.target.value),
                                        placeholder: `Option ${String.fromCharCode(65 + oi)}`,
                                        className: "flex-1 min-w-0 bg-transparent text-[11px] text-[#e8ecf4] placeholder:text-[#5a6178]/60 focus:outline-none"
                                    }),
                                    draft.options.length > 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>removeOption(oi),
                                        title: "Remove option",
                                        className: "text-[#5a6178] hover:text-[#ff5757] transition-colors shrink-0",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    })
                                ]
                            }, oi);
                        })
                    }),
                    draft.correctIdx === -1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] text-[#f59e0b] mt-1.5",
                        children: "Click the check icon next to the correct option"
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: addOption,
                        disabled: draft.options.length >= 6,
                        className: "mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-[#00e5a0]/80 hover:text-[#00e5a0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            }),
                            " Add option"
                        ]
                    })
                ]
            }),
            draft.type === 'tf' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: labelCls,
                        children: "Correct answer"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex gap-1",
                        children: [
                            'True',
                            'False'
                        ].map((v)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: ()=>onChange({
                                        answer: v
                                    }),
                                className: `px-4 py-1.5 rounded-md text-[11px] font-bold border transition-all ${draft.answer === v ? 'text-[#00e5a0] bg-[#00e5a0]/10 border-[#00e5a0]/40' : 'text-[#8b92a8] border-white/[0.1] hover:border-white/[0.25]'}`,
                                children: v
                            }, v))
                    })
                ]
            }),
            draft.type === 'short' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: labelCls,
                        children: "Correct answer"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        value: draft.answer,
                        onChange: (e)=>onChange({
                                answer: e.target.value
                            }),
                        placeholder: "Expected answer",
                        className: inputCls
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: labelCls,
                        children: "Explanation"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                        value: draft.explanation,
                        onChange: (e)=>onChange({
                                explanation: e.target.value
                            }),
                        rows: 2,
                        placeholder: "Why this answer is correct (optional)",
                        className: `${inputCls} leading-relaxed resize-y`
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-3 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: labelCls,
                                children: "System"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: draft.system,
                                onChange: (e)=>onChange({
                                        system: e.target.value
                                    }),
                                placeholder: "e.g. Cardiovascular",
                                className: inputCls
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: labelCls,
                                children: "Topic"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: draft.topic,
                                onChange: (e)=>onChange({
                                        topic: e.target.value
                                    }),
                                placeholder: "e.g. Heart failure",
                                className: inputCls
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: labelCls,
                                children: "Tags"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: draft.tagsInput,
                                onChange: (e)=>onChange({
                                        tagsInput: e.target.value
                                    }),
                                placeholder: "comma, separated",
                                className: inputCls
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-end gap-2 pt-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: onCancel,
                        className: "px-3.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors",
                        children: "Cancel"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: onSave,
                        className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-semibold bg-[#00e5a0]/15 border border-[#00e5a0]/35 text-[#00e5a0] hover:bg-[#00e5a0]/25 transition-all",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Save changes"
                        ]
                    })
                ]
            })
        ]
    });
}
function ImportQuestionsModal({ open, onOpenChange, onImported }) {
    const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('upload');
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [statusMsg, setStatusMsg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [fileName, setFileName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    /** Detector's independent count of question-like blocks in the source text
   *  — surfaced in the preview so the user sees "found N of ~M detected"
   *  when extraction fell short (0 = not measured). */ const [detectedCount, setDetectedCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [pastedText, setPastedText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [excluded, setExcluded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editing, setEditing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [draft, setDraft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [edited, setEdited] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [dragOver, setDragOver] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [sourceKind, setSourceKind] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('file-structured');
    const [csvText, setCsvText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    /** Extraction job behind the current preview (for server-side cleanup). */ const [extractJobId, setExtractJobId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /* ── Live progress state for the extracting phase ── */ /** Latest poll snapshot — drives the rich progress UI (per-stage status,
   *  ETA, image thumbnails, pass counter). Reset to null when extraction
   *  settles so the next run starts fresh. */ const [livePoll, setLivePoll] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /** Wall-clock when the current extraction started — for the elapsed-time
   *  readout in the progress UI. */ const [extractStartedAt, setExtractStartedAt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /** Set when the user clicked "Stop extraction" — disables the button and
   *  shows a "Stopping…" state while the in-flight LLM call finishes. */ const [cancelling, setCancelling] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const busy = phase === 'reading' || phase === 'extracting' || phase === 'importing';
    const reset = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setPhase('idle');
        setStatusMsg('');
        setFileName('');
        setQuestions([]);
        setDetectedCount(0);
        setExcluded(new Set());
        setResult(null);
        setExpanded(null);
        setEditing(null);
        setDraft(null);
        setEdited(new Set());
        setCsvText('');
        setLivePoll(null);
        setExtractStartedAt(null);
        setCancelling(false);
        setPastedText('');
        setSourceKind('file-structured');
        setExtractJobId(null);
    }, []);
    const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((next)=>{
        if (busy) return; // block closing mid-flight
        if (!next) reset();
        onOpenChange(next);
    }, [
        busy,
        onOpenChange,
        reset
    ]);
    /* ── AI extraction (background job, Knowledge-Library pattern) ──
     The POST returns a jobId instantly; the job lives in the DATABASE, so it
     survives server restarts (auto-resumed server-side) and the browser can
     be closed — the localStorage pointer re-attaches on the next open. */ /** Poll a running extraction job until it settles. Returns the questions
   *  (or null when the AI found none) plus the detector's independent count
   *  of question-like blocks in the source text; throws on hard errors. */ const pollExtraction = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (jobId)=>{
        // Large files are extracted in parallel parts and can take a few minutes —
        // keep polling while progress keeps moving, and only give up when the job
        // STALLS (no part completed for several minutes) or hits a generous cap.
        const startedAt = Date.now();
        const hardDeadline = startedAt + 30 * 60000;
        const STALL_TIMEOUT_MS = 10 * 60000; // ≥ worst-case one silent slow part (429 backoffs can take minutes)
        // ADAPTIVE cadence: poll every 2.5 s while parts are completing, back off
        // toward 10 s while idle — a poll during a quiet phase is pure waste on
        // both server (auth + DB read per hit) and client (network + wakeups).
        const POLL_MIN_MS = 2500;
        const POLL_MAX_MS = 10000;
        let pollDelay = POLL_MIN_MS;
        let lastDone = -1;
        let lastProgressAt = Date.now();
        let data = null;
        for(;;){
            await new Promise((r)=>setTimeout(r, pollDelay));
            const poll = await fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(jobId)}`).catch(()=>null);
            if (!poll) throw new Error('Lost connection to the server — please retry.');
            if (poll.status === 404) throw new Error('Extraction job not found — it may have expired. Please try again.');
            data = await poll.json().catch(()=>null);
            if (!data) throw new Error('Unexpected server response — please retry.');
            // Mirror to state so the rich progress UI can render live counters,
            // ETA, image thumbnails, pass counter, etc. (the simple statusMsg is
            // kept as a fallback for accessibility / older render paths).
            setLivePoll(data);
            if (data.status === 'error') {
                // The server returns 'cancelled' jobs as status='error' with the
                // "Cancelled by the user." message — detect that and exit quietly
                // (no error toast) so the cancel button's own handler closes the UI.
                if (data.error && /cancel/i.test(data.error)) {
                    throw new Error('__CANCELLED__');
                }
                throw new Error(data.error || 'AI extraction failed');
            }
            if (data.status === 'running') {
                const p = data.progress;
                if (p && p.done !== lastDone) {
                    lastDone = p.done;
                    lastProgressAt = Date.now();
                    pollDelay = POLL_MIN_MS; // progress moving — poll fast
                } else {
                    pollDelay = Math.min(pollDelay + 1500, POLL_MAX_MS); // idle — back off
                }
                if (Date.now() - lastProgressAt > STALL_TIMEOUT_MS) {
                    throw new Error('Extraction appears stalled — the AI service may be unreachable right now. The job keeps running in the background; reopen this dialog to re-attach, or import a JSON/CSV file instead (direct import, no AI needed).');
                }
                // StatusMsg kept as a fallback for the simple-progress render path.
                // The rich progress UI reads livePoll directly.
                const elapsed = Math.round((Date.now() - startedAt) / 1000);
                if (data.vlm && data.vlm.images > 0) {
                    setStatusMsg(`Analyzing image ${data.vlm.done}/${data.vlm.images}… (${elapsed}s)`);
                } else if (p && p.total > 1) {
                    setStatusMsg(`AI is extracting questions… ${p.done}/${p.total} parts done (${elapsed}s)`);
                } else {
                    setStatusMsg(`AI is extracting questions… ${elapsed}s`);
                }
            }
            if (data.status === 'done') {
                if (data.droppedChunks && data.droppedChunks > 0) {
                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.warning(`${data.droppedChunks} part${data.droppedChunks > 1 ? 's' : ''} of the file could not be read`, {
                        description: 'The extracted list below may be incomplete — try importing those parts again separately.'
                    });
                }
                break;
            }
            if (Date.now() > hardDeadline) {
                throw new Error('Extraction is taking too long (>30 min). It keeps running in the background — reopen this dialog later to pick up the result, or import a JSON/CSV instead.');
            }
        }
        const parsed = Array.isArray(data.questions) ? data.questions : [];
        const estimatedCount = typeof data.estimatedCount === 'number' ? data.estimatedCount : 0;
        return parsed.length ? {
            questions: parsed,
            estimatedCount
        } : null;
    }, []);
    /** Cancel the running extraction — fires a DELETE to mark the job as
   *  'cancelled'. The runner picks up the flag at the next chunk boundary
   *  (5–15 s for in-flight LLM calls) and exits. The poll loop then sees
   *  status='error' with "Cancelled by the user." and throws '__CANCELLED__'
   *  which we silently swallow (no error toast).
   *
   *  If called before the POST has returned a jobId (null), just resets the
   *  UI to idle — the user hasn't actually started anything on the server
   *  yet, so there's nothing to cancel server-side. */ const cancelExtraction = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (jobId)=>{
        if (!jobId) {
            // Pre-POST window: the fetch to start the job is still in flight, or
            // the job was never created. Just reset the UI so the user can try
            // again. No server-side cleanup needed.
            setPhase('idle');
            setStatusMsg('');
            setLivePoll(null);
            setExtractStartedAt(null);
            setExtractJobId(null);
            setCancelling(false);
            try {
                window.localStorage.removeItem(EXTRACT_JOB_KEY);
            } catch  {}
            return;
        }
        setCancelling(true);
        try {
            await fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(jobId)}`, {
                method: 'DELETE'
            }).catch(()=>{});
        } finally{
        // Keep `cancelling` true until pollExtraction notices and throws;
        // the runAiExtraction catch block resets it.
        }
    }, []);
    const runAiExtraction = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (text, label, kind, images)=>{
        if (text.length > MAX_EXTRACT_CHARS) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Content is too large to extract in one go', {
                description: `${Math.round(text.length / 1000)}k characters — the limit is ${Math.round(MAX_EXTRACT_CHARS / 1000)}k. Split it into two or three parts and import them one by one; duplicates are skipped automatically.`
            });
            return;
        }
        setSourceKind(kind);
        setPhase('extracting');
        setExtractStartedAt(Date.now());
        setLivePoll(null);
        setCancelling(false);
        setStatusMsg(images && images.length > 0 ? `AI is reading your content and analyzing ${images.length} image${images.length > 1 ? 's' : ''}…` : 'AI is reading your content and extracting questions…');
        try {
            // Persist the file content NOW so a reload during the POST/poll
            // doesn't lose it. Cleared once the job is created below.
            savePendingFile(text, label, images);
            const res = await fetch('/api/questions/import/extract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    fileName: label,
                    images
                })
            });
            // The app returns { jobId } on success or { error } on failure. The z.ai
            // preview gateway, when it rejects a request itself (e.g. EntityTooLarge
            // for bodies > 32 MiB, or 502 HTML on upstream reset), returns JSON
            // shaped as { Code, Message, RequestId } — or a non-JSON HTML error page.
            // Surface whichever field exists so the user sees the real reason
            // instead of the generic "Could not start extraction" fallback.
            const start = await res.json().catch(()=>({}));
            if (!res.ok || !start.jobId) {
                const reason = start.error || start.Message || (res.status === 502 ? 'The preview gateway could not reach the app (502 Bad Gateway). Try a smaller file or retry in a moment.' : 'Could not start extraction');
                throw new Error(reason);
            }
            // Job created — clear the pending-file pointer; the job pointer
            // (EXTRACT_JOB_KEY) takes over as the resume mechanism.
            clearPendingFile();
            setExtractJobId(start.jobId);
            try {
                window.localStorage.setItem(EXTRACT_JOB_KEY, JSON.stringify({
                    jobId: start.jobId,
                    fileName: label,
                    kind,
                    at: Date.now()
                }));
            } catch  {}
            const polled = await pollExtraction(start.jobId);
            try {
                window.localStorage.removeItem(EXTRACT_JOB_KEY);
            } catch  {}
            clearPendingFile();
            if (!polled) {
                setPhase('idle');
                setStatusMsg('');
                setLivePoll(null);
                setExtractStartedAt(null);
                setCancelling(false);
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('No questions found', {
                    description: 'The AI could not find any complete questions (with answers) in this content.'
                });
                return;
            }
            setFileName(label);
            setQuestions(polled.questions);
            setDetectedCount(polled.estimatedCount);
            setPhase('preview');
            setLivePoll(null);
            setExtractStartedAt(null);
            setCancelling(false);
        } catch (err) {
            // User-cancelled jobs throw a sentinel '__CANCELLED__' — silently
            // return to the input state, no error toast.
            if (err instanceof Error && err.message === '__CANCELLED__') {
                setPhase('idle');
                setStatusMsg('');
                setLivePoll(null);
                setExtractStartedAt(null);
                setExtractJobId(null);
                setCancelling(false);
                try {
                    window.localStorage.removeItem(EXTRACT_JOB_KEY);
                } catch  {}
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info('Extraction cancelled', {
                    description: 'You can start a new extraction any time.'
                });
                return;
            }
            // Definitive errors discard the pointer; on stalls/timeouts it stays so
            // reopening this dialog can re-attach to the still-running background job.
            if (!(err instanceof Error) || !/stalled|taking too long|Lost connection/.test(err.message)) {
                try {
                    window.localStorage.removeItem(EXTRACT_JOB_KEY);
                } catch  {}
                clearPendingFile();
            }
            setPhase('idle');
            setStatusMsg('');
            setLivePoll(null);
            setExtractStartedAt(null);
            setCancelling(false);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err instanceof Error ? err.message : 'AI extraction failed');
        }
    }, [
        pollExtraction
    ]);
    /* ── Re-attach on open: if the page was closed during an extraction, the
     job kept running server-side — resume polling or load the finished
     result straight into the preview. Runs at most once per mount. ── */ const resumeChecked = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open || resumeChecked.current) return;
        resumeChecked.current = true;
        // ── Pending file re-attach: the user uploaded a file but the server
        //  POST hadn't completed when they reloaded. Restore the extracted
        //  text + images and auto-start the server extraction. ──
        const pending = loadPendingFile();
        if (pending && !window.localStorage.getItem(EXTRACT_JOB_KEY)) {
            console.log('[Import] re-attaching pending file:', pending.fileName);
            setFileName(pending.fileName);
            // Re-run the server extraction with the restored content. The
            // text + images were already extracted client-side before the
            // reload — no need to re-parse the original file.
            void runAiExtraction(pending.text, pending.fileName, 'file-ai', pending.images);
            return;
        }
        // Clear stale pending file if a server job pointer exists (the job
        // is the authoritative resume mechanism).
        if (pending) clearPendingFile();
        let entry = null;
        try {
            const raw = window.localStorage.getItem(EXTRACT_JOB_KEY);
            if (raw) entry = JSON.parse(raw);
        } catch  {
            return;
        }
        if (!entry?.jobId || !entry.at || Date.now() - entry.at > EXTRACT_JOB_MAX_AGE_MS) {
            try {
                window.localStorage.removeItem(EXTRACT_JOB_KEY);
            } catch  {}
            return;
        }
        const label = entry.fileName || 'pasted text';
        const kind = entry.kind === 'paste-ai' ? 'paste-ai' : 'file-ai';
        const jobId = entry.jobId;
        const clearPointer = ()=>{
            try {
                window.localStorage.removeItem(EXTRACT_JOB_KEY);
            } catch  {}
        };
        (async ()=>{
            try {
                const peek = await fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(jobId)}`).catch(()=>null);
                if (!peek || peek.status === 404) {
                    clearPointer();
                    return;
                }
                const data = await peek.json().catch(()=>null);
                if (!data || data.status !== 'running' && data.status !== 'done') {
                    clearPointer();
                    if (data?.error) sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info('Your previous extraction failed', {
                        description: data.error
                    });
                    return;
                }
                setSourceKind(kind);
                setFileName(label);
                if (data.status === 'done') {
                    const parsed = Array.isArray(data.questions) ? data.questions : [];
                    clearPointer();
                    if (!parsed.length) return;
                    setExtractJobId(jobId);
                    setQuestions(parsed);
                    setDetectedCount(typeof data.estimatedCount === 'number' ? data.estimatedCount : 0);
                    setPhase('preview');
                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Resumed your previous extraction — ${parsed.length} question${parsed.length > 1 ? 's' : ''} ready`, {
                        description: 'It kept running in the background while you were away.'
                    });
                    return;
                }
                // Still running — re-attach and keep waiting.
                setPhase('extracting');
                setExtractJobId(jobId);
                setExtractStartedAt(Date.now());
                setLivePoll(null);
                setCancelling(false);
                setStatusMsg('Resuming your extraction…');
                const parsed = await pollExtraction(jobId);
                clearPointer();
                if (!parsed) {
                    setPhase('idle');
                    setStatusMsg('');
                    setExtractJobId(null);
                    setExtractStartedAt(null);
                    return;
                }
                setQuestions(parsed.questions);
                setDetectedCount(parsed.estimatedCount);
                setPhase('preview');
                setLivePoll(null);
                setExtractStartedAt(null);
                setCancelling(false);
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Extraction finished — ${parsed.questions.length} question${parsed.questions.length > 1 ? 's' : ''} ready`);
            } catch  {
                clearPointer();
            }
        })();
    }, [
        open,
        pollExtraction
    ]);
    /* ── File intake ── */ const handleFile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (file)=>{
        if (busy) return;
        reset();
        setFileName(file.name);
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        setPhase('reading');
        setStatusMsg(`Reading ${file.name}…`);
        try {
            // JSON — direct structured import
            if (ext === 'json') {
                const text = await readFileText(file);
                let parsed;
                try {
                    parsed = JSON.parse(text);
                } catch  {
                    throw new Error('Invalid JSON file');
                }
                const arr = Array.isArray(parsed) ? parsed : [
                    parsed
                ];
                const qs = [];
                for (const item of arr){
                    if (item && typeof item === 'object') {
                        const q = item;
                        const text2 = typeof q.text === 'string' ? q.text : typeof q.question === 'string' ? q.question : '';
                        const ans = typeof q.answer === 'string' ? q.answer : '';
                        if (text2 && ans) {
                            const iu = typeof q.imageUrl === 'string' && q.imageUrl || typeof q.image_url === 'string' && q.image_url || '';
                            qs.push({
                                text: text2,
                                type: q.type === 'tf' || q.type === 'short' ? q.type : 'mcq',
                                options: Array.isArray(q.options) ? q.options.map(String) : [],
                                answer: ans,
                                explanation: typeof q.explanation === 'string' ? q.explanation : '',
                                mnemonic: typeof q.mnemonic === 'string' ? q.mnemonic : '',
                                clinicalPearl: typeof q.clinicalPearl === 'string' ? q.clinicalPearl : '',
                                difficulty: typeof q.difficulty === 'string' ? q.difficulty : 'Moderate',
                                system: typeof q.system === 'string' && q.system ? q.system : 'General',
                                topic: typeof q.topic === 'string' && q.topic ? q.topic : 'General',
                                tags: Array.isArray(q.tags) ? q.tags.map(String) : [],
                                ...iu.startsWith('/generated/agent/imported/') ? {
                                    imageUrl: iu
                                } : {}
                            });
                        }
                    }
                }
                if (qs.length === 0) throw new Error('No valid questions found — each needs at least "text" and "answer"');
                setSourceKind('file-structured');
                setQuestions(qs);
                setPhase('preview');
                return;
            }
            // CSV — direct structured import
            if (ext === 'csv' || ext === 'tsv') {
                const text = await readFileText(file);
                const { questions: qs, errors } = csvToQuestions(text);
                if (qs.length === 0) {
                    throw new Error(errors[0] || 'No valid questions found in the CSV');
                }
                if (errors.length > 0) {
                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.warning(`${errors.length} row${errors.length > 1 ? 's' : ''} skipped`, {
                        description: errors.slice(0, 3).join(' · ') + (errors.length > 3 ? ' …' : '')
                    });
                }
                setSourceKind('file-structured');
                setCsvText(text);
                setQuestions(qs);
                setPhase('preview');
                return;
            }
            // TXT / MD — try JSON first, then AI extraction
            if (ext === 'txt' || ext === 'md') {
                const text = await readFileText(file);
                const trimmed = text.trim();
                if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
                    try {
                        const parsed = JSON.parse(trimmed);
                        const arr = Array.isArray(parsed) ? parsed : [
                            parsed
                        ];
                        const withAnswer = arr.filter((x)=>x && typeof x === 'object' && (x.text || x.question) && x.answer);
                        if (withAnswer.length > 0) {
                            setSourceKind('file-structured');
                            const qs = withAnswer.map((item)=>{
                                const q = item;
                                const iu = typeof q.imageUrl === 'string' && q.imageUrl || typeof q.image_url === 'string' && q.image_url || '';
                                return {
                                    text: String(q.text ?? q.question ?? ''),
                                    type: q.type === 'tf' || q.type === 'short' ? q.type : 'mcq',
                                    options: Array.isArray(q.options) ? q.options.map(String) : [],
                                    answer: String(q.answer ?? ''),
                                    explanation: typeof q.explanation === 'string' ? q.explanation : '',
                                    mnemonic: typeof q.mnemonic === 'string' ? q.mnemonic : '',
                                    clinicalPearl: typeof q.clinicalPearl === 'string' ? q.clinicalPearl : '',
                                    difficulty: typeof q.difficulty === 'string' ? q.difficulty : 'Moderate',
                                    system: typeof q.system === 'string' && q.system ? q.system : 'General',
                                    topic: typeof q.topic === 'string' && q.topic ? q.topic : 'General',
                                    tags: Array.isArray(q.tags) ? q.tags.map(String) : [],
                                    ...iu.startsWith('/generated/agent/imported/') ? {
                                        imageUrl: iu
                                    } : {}
                                };
                            });
                            setQuestions(qs);
                            setPhase('preview');
                            return;
                        }
                    } catch  {}
                }
                await runAiExtraction(text, file.name, 'file-ai');
                return;
            }
            // DOCX / PDF / PPTX / images — SERVER-SIDE extraction (more reliable:
            // no browser OOM, no pdfjs worker mismatch, no reload loss).
            // Upload the raw file as multipart/form-data; the server parses it
            // with extractFromFileServer() and starts the AI job in one step.
            setSourceKind('file-ai');
            setStatusMsg(`Uploading ${file.name} for server-side extraction…`);
            await runAiExtractionFromFile(file);
        } catch (err) {
            setPhase('idle');
            setStatusMsg('');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err instanceof Error ? err.message : 'Failed to read the file');
        }
    }, [
        busy,
        reset,
        runAiExtraction
    ]);
    /* ── File upload → server-side extraction ──
   * Uploads the raw File as multipart/form-data to the extract route.
   * The server parses it (extractFromFileServer) and starts the AI job
   * in one step — no client-side FileReader/pdfjs/mammoth. More reliable:
   * no browser OOM, no worker mismatch, no reload loss (the server creates
   * the job immediately, before any polling starts). */ const runAiExtractionFromFile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (file)=>{
        if (busy) return;
        // Preview-gateway cap (32 MiB hard limit at the z.ai proxy). Reject
        // BEFORE the fetch so the user gets an inline toast instead of a raw
        // 502/400 EntityTooLarge from the gateway after a long upload attempt.
        const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
        if (file.size > MAX_UPLOAD_BYTES) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(`File is too large (${Math.round(file.size / 1024 / 1024)} MB — the limit is 30 MB through the preview gateway).`, {
                description: 'Split it into smaller files and import them one by one — duplicate questions are skipped automatically.'
            });
            return;
        }
        setPhase('extracting');
        setExtractStartedAt(Date.now());
        setLivePoll(null);
        setCancelling(false);
        setStatusMsg(`Uploading ${file.name}…`);
        try {
            const formData = new FormData();
            formData.append('file', file);
            // Persist a pointer so reload re-attaches (the job pointer takes
            // over once the server returns a jobId below).
            savePendingFile('', file.name);
            const res = await fetch('/api/questions/import/extract', {
                method: 'POST',
                body: formData
            });
            // The app returns { jobId } on success or { error } on failure. The z.ai
            // preview gateway, when it rejects a request itself (e.g. EntityTooLarge
            // for bodies > 32 MiB, or 502 HTML on upstream reset), returns JSON
            // shaped as { Code, Message, RequestId } — or a non-JSON HTML error page.
            // Surface whichever field exists so the user sees the real reason
            // instead of the generic "Could not start extraction" fallback.
            const start = await res.json().catch(()=>({}));
            if (!res.ok || !start.jobId) {
                const reason = start.error || start.Message || (res.status === 502 ? 'The preview gateway could not reach the app (502 Bad Gateway). Try a smaller file or retry in a moment.' : 'Could not start extraction');
                throw new Error(reason);
            }
            // Job created — clear the pending pointer; the job pointer takes over.
            clearPendingFile();
            setExtractJobId(start.jobId);
            setFileName(file.name);
            try {
                window.localStorage.setItem(EXTRACT_JOB_KEY, JSON.stringify({
                    jobId: start.jobId,
                    fileName: file.name,
                    kind: 'file-ai',
                    at: Date.now()
                }));
            } catch  {}
            setStatusMsg('AI is reading your content and extracting questions…');
            const polled = await pollExtraction(start.jobId);
            try {
                window.localStorage.removeItem(EXTRACT_JOB_KEY);
            } catch  {}
            clearPendingFile();
            if (!polled) {
                setPhase('idle');
                setStatusMsg('');
                setLivePoll(null);
                setExtractStartedAt(null);
                setCancelling(false);
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('No questions found', {
                    description: 'The AI could not find any complete questions (with answers) in this content.'
                });
                return;
            }
            setQuestions(polled.questions);
            setDetectedCount(polled.estimatedCount);
            setPhase('preview');
            setLivePoll(null);
            setExtractStartedAt(null);
            setCancelling(false);
        } catch (err) {
            clearPendingFile();
            if (err instanceof Error && err.message === '__CANCELLED__') {
                setPhase('idle');
                setStatusMsg('');
                setLivePoll(null);
                setExtractStartedAt(null);
                setExtractJobId(null);
                setCancelling(false);
                try {
                    window.localStorage.removeItem(EXTRACT_JOB_KEY);
                } catch  {}
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info('Extraction cancelled', {
                    description: 'You can start a new extraction any time.'
                });
                return;
            }
            setPhase('idle');
            setStatusMsg('');
            setLivePoll(null);
            setExtractStartedAt(null);
            setCancelling(false);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err instanceof Error ? err.message : 'AI extraction failed');
        }
    }, [
        busy,
        pollExtraction
    ]);
    /* ── Paste intake ── */ const handleExtractPasted = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!pastedText.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Paste some questions first');
            return;
        }
        reset();
        setFileName('Pasted text');
        await runAiExtraction(pastedText, 'pasted text', 'paste-ai');
    }, [
        pastedText,
        reset,
        runAiExtraction
    ]);
    /* ── Final import ── */ const handleImport = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const selected = questions.filter((_, i)=>!excluded.has(i));
        if (selected.length === 0) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('No questions selected');
            return;
        }
        setPhase('importing');
        setStatusMsg(`Importing ${selected.length} question${selected.length > 1 ? 's' : ''}…`);
        try {
            let res;
            if (sourceKind === 'file-structured' && fileName.toLowerCase().endsWith('.csv') && edited.size === 0) {
                // send raw CSV so the server applies the same mapping
                // (once anything is edited we always send the edited JSON instead)
                res = await fetch('/api/questions/import', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        format: 'csv',
                        data: csvText
                    })
                });
            } else {
                res = await fetch('/api/questions/import', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        format: 'json',
                        data: JSON.stringify(selected)
                    })
                });
            }
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Import failed');
            // Clean up the finished extraction job server-side (rows also TTL
            // out after 24 h, but this keeps the table tidy right away).
            if (extractJobId) {
                const doneId = extractJobId;
                setExtractJobId(null);
                void fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(doneId)}`, {
                    method: 'DELETE'
                }).catch(()=>{});
            }
            setResult(data);
            setPhase('done');
            if (data.imported > 0) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Imported ${data.imported} question${data.imported > 1 ? 's' : ''} into the bank`);
                onImported?.(data.imported);
                if (data.duplicates > 0) {
                    sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info(`${data.duplicates} duplicate${data.duplicates > 1 ? 's' : ''} skipped`, {
                        description: 'Questions already in the bank (same text) are never imported twice.'
                    });
                }
            } else if ((data.duplicates ?? 0) > 0) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info(`All ${data.duplicates} questions already exist in the bank — nothing new to import`, {
                    description: 'Duplicates are skipped automatically, so re-importing a file never creates doubles.'
                });
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('No questions were imported', {
                    description: data.errors?.[0]?.message || 'Check that each question has text and an answer'
                });
            }
        } catch (err) {
            setPhase('preview');
            setStatusMsg('');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err instanceof Error ? err.message : 'Import failed');
        }
    }, [
        questions,
        excluded,
        sourceKind,
        fileName,
        csvText,
        edited,
        onImported,
        extractJobId
    ]);
    /* ── Templates ── */ const downloadTemplate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (kind)=>{
        try {
            const res = await fetch('/api/questions/import');
            const data = await res.json();
            const content = kind === 'csv' ? data.csvTemplate : JSON.stringify(data.jsonTemplate, null, 2);
            const blob = new Blob([
                content
            ], {
                type: kind === 'csv' ? 'text/csv' : 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `question-import-template.${kind}`;
            a.click();
            URL.revokeObjectURL(url);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`${kind.toUpperCase()} template downloaded`);
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Could not download the template');
        }
    }, []);
    const toggleExcluded = (i)=>{
        setExcluded((prev)=>{
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });
    };
    /* ── Inline editing handlers ── */ const patchDraft = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((patch)=>{
        setDraft((prev)=>prev ? {
                ...prev,
                ...patch
            } : prev);
    }, []);
    const startEdit = (i)=>{
        setEditing(i);
        setDraft(draftFromQuestion(questions[i]));
        setExpanded(i);
    };
    const cancelEdit = ()=>{
        setEditing(null);
        setDraft(null);
    };
    const saveEdit = ()=>{
        if (editing === null || !draft) return;
        const text = draft.text.trim();
        if (!text) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Question text is required');
            return;
        }
        let options = [];
        let answer = '';
        if (draft.type === 'mcq') {
            options = draft.options.map((o)=>o.trim()).filter(Boolean);
            const chosen = draft.correctIdx >= 0 ? draft.options[draft.correctIdx]?.trim() : '';
            if (options.length < 2) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('An MCQ needs at least 2 non-empty options');
                return;
            }
            if (!chosen || !options.includes(chosen)) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Mark which option is the correct answer');
                return;
            }
            answer = chosen;
        } else if (draft.type === 'tf') {
            answer = draft.answer === 'False' ? 'False' : 'True';
        } else {
            answer = draft.answer.trim();
            if (!answer) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Enter the expected answer');
                return;
            }
        }
        const idx = editing;
        setQuestions((prev)=>prev.map((q, k)=>k === idx ? {
                    ...q,
                    text,
                    type: draft.type,
                    options,
                    answer,
                    explanation: draft.explanation.trim(),
                    difficulty: DIFFICULTIES.includes(draft.difficulty) ? draft.difficulty : 'Moderate',
                    system: draft.system.trim() || 'General',
                    topic: draft.topic.trim() || 'General',
                    tags: draft.tagsInput.split(',').map((t)=>t.trim()).filter(Boolean)
                } : q));
        setEdited((prev)=>new Set(prev).add(idx));
        setEditing(null);
        setDraft(null);
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Question updated', {
            description: 'Your edited version will be imported.'
        });
    };
    const includedCount = questions.length - excluded.size;
    /* ── Render ── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .Dialog */ .lG, {
        open: open,
        onOpenChange: handleClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogContent */ .Cf, {
            className: "bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-3xl max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogHeader */ .c7, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_2__/* .DialogTitle */ .L3, {
                        className: "text-[#e8ecf4] flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#00e5a0]"
                            }),
                            "Import Questions"
                        ]
                    })
                }),
                phase === 'done' && result && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "py-4 space-y-4",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col items-center gap-3 py-6 text-center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-14 h-14 rounded-2xl bg-[#00e5a0]/10 border border-[#00e5a0]/25 flex items-center justify-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                    className: "w-7 h-7 text-[#00e5a0]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-lg font-bold text-[#e8ecf4]",
                                        children: [
                                            result.imported,
                                            " of ",
                                            result.total,
                                            " question",
                                            result.total > 1 ? 's' : '',
                                            " imported"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xs text-[#5a6178] mt-1",
                                        children: [
                                            "Your questions are now in the Question Bank database",
                                            result.errorsCount > 0 ? ` · ${result.errorsCount} row(s) had errors` : ''
                                        ]
                                    })
                                ]
                            }),
                            result.errorsCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-full max-h-32 overflow-y-auto rounded-lg border border-[#f59e0b]/25 bg-[#f59e0b]/[0.06] p-3 text-left",
                                children: result.errors.map((e, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xs text-[#f59e0b]",
                                        children: [
                                            "Row ",
                                            e.row,
                                            ": ",
                                            e.message
                                        ]
                                    }, i))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            reset();
                                            setMode('upload');
                                        },
                                        className: "px-4 py-2 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all",
                                        children: "Import Another File"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>handleClose(false),
                                        className: "px-4 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 transition-all",
                                        children: "Done"
                                    })
                                ]
                            })
                        ]
                    })
                }),
                (phase === 'reading' || phase === 'extracting' || phase === 'importing') && (()=>{
                    // Live elapsed-time readout from extractStartedAt (or fall back
                    // to the statusMsg that the polling loop updates).
                    const elapsedSec = extractStartedAt ? Math.round((Date.now() - extractStartedAt) / 1000) : null;
                    const p = livePoll?.progress;
                    const vlm = livePoll?.vlm;
                    const imageCount = livePoll?.imageCount ?? 0;
                    const pass = livePoll?.pass ?? 1;
                    const total = p?.total ?? 0;
                    const done = p?.done ?? 0;
                    const pct = total > 0 ? Math.min(100, Math.round(done / total * 100)) : 0;
                    const vlmPct = vlm && vlm.images > 0 ? Math.min(100, Math.round(vlm.done / vlm.images * 100)) : 0;
                    // ETA: simple linear extrapolation from elapsed × (remaining / done).
                    // Only show once we have ≥1 done chunk AND ≥5 s elapsed (otherwise
                    // the estimate is wildly noisy).
                    const showEta = elapsedSec !== null && elapsedSec >= 5 && done > 0 && total > 0 && done < total;
                    const etaSec = showEta ? Math.round(elapsedSec / done * (total - done)) : null;
                    // Stage progression: VLM image analysis → text extraction → done.
                    // The VLM stage runs first (pass 1, before any chunks settle).
                    const inVlmStage = !!vlm && vlm.images > 0 && total === 0;
                    const inExtractStage = total > 0;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "py-8 px-6 flex flex-col items-center gap-5 text-center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "w-12 h-12 animate-spin text-[#00e5a0]"
                                    }),
                                    cancelling && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#ff5757]/20 border border-[#ff5757]/40 text-[9px] font-bold text-[#ff5757] uppercase tracking-wider",
                                        children: "Stopping"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-sm font-semibold text-[#e8ecf4]",
                                        children: [
                                            phase === 'reading' && `Reading ${fileName || 'your file'}…`,
                                            phase === 'extracting' && (cancelling ? 'Stopping extraction…' : inVlmStage ? `Analyzing ${vlm.images} image${vlm.images > 1 ? 's' : ''} with AI vision…` : inExtractStage ? `Extracting questions with AI…` : 'Extracting questions with AI…'),
                                            phase === 'importing' && 'Saving to the Question Bank…'
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-xs text-[#5a6178] mt-1.5 max-w-sm",
                                        children: [
                                            phase === 'extracting' && pass >= 2 && !cancelling && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[#fbbf24]",
                                                children: [
                                                    "Resumed after a rate-limit pause (pass ",
                                                    pass,
                                                    "). "
                                                ]
                                            }),
                                            statusMsg || (phase === 'extracting' ? 'This can take up to a minute for long documents.' : '')
                                        ]
                                    })
                                ]
                            }),
                            phase === 'extracting' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-full max-w-md flex flex-col gap-3 mt-1",
                                children: [
                                    imageCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: `rounded-lg border p-3 text-left transition-all ${inVlmStage ? 'border-[#f472b6]/30 bg-[#f472b6]/[0.04]' : vlm && vlm.images > 0 ? 'border-[#00e5a0]/20 bg-[#00e5a0]/[0.03]' : 'border-white/[0.06] bg-[#1a1e2b]/40'}`,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 mb-1.5",
                                                children: [
                                                    inVlmStage ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "w-3.5 h-3.5 animate-spin text-[#f472b6]"
                                                    }) : vlm && vlm.images > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                        className: "w-3.5 h-3.5 text-[#00e5a0]"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                        className: "w-3.5 h-3.5 text-[#5a6178]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-xs font-semibold text-[#e8ecf4]",
                                                        children: [
                                                            "Image analysis ",
                                                            inVlmStage ? '(running)' : vlm && vlm.images > 0 ? '(done)' : ''
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "ml-auto text-[10px] text-[#5a6178]",
                                                        children: vlm && vlm.images > 0 ? `${vlm.done}/${vlm.images}` : `${imageCount} pending`
                                                    })
                                                ]
                                            }),
                                            inVlmStage && vlm && vlm.images > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-1 rounded-full bg-[#1a1e2b] overflow-hidden",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-full bg-gradient-to-r from-[#f472b6] to-[#ec4899] transition-all duration-500",
                                                    style: {
                                                        width: `${vlmPct}%`
                                                    }
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: `rounded-lg border p-3 text-left transition-all ${inExtractStage ? 'border-[#00e5a0]/30 bg-[#00e5a0]/[0.04]' : inVlmStage ? 'border-white/[0.06] bg-[#1a1e2b]/40 opacity-60' : 'border-white/[0.06] bg-[#1a1e2b]/40'}`,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 mb-1.5",
                                                children: [
                                                    inExtractStage ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "w-3.5 h-3.5 animate-spin text-[#00e5a0]"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                        className: "w-3.5 h-3.5 text-[#5a6178]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-xs font-semibold text-[#e8ecf4]",
                                                        children: [
                                                            "Question extraction ",
                                                            inExtractStage ? '(running)' : '(queued)'
                                                        ]
                                                    }),
                                                    total > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "ml-auto text-[10px] text-[#5a6178]",
                                                        children: [
                                                            done,
                                                            "/",
                                                            total,
                                                            " parts"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            inExtractStage && total > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "h-1 rounded-full bg-[#1a1e2b] overflow-hidden mb-1.5",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "h-full bg-gradient-to-r from-[#00e5a0] to-[#10b981] transition-all duration-500",
                                                            style: {
                                                                width: `${pct}%`
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center justify-between text-[10px] text-[#5a6178]",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                                        className: "w-2.5 h-2.5"
                                                                    }),
                                                                    elapsedSec !== null ? `${elapsedSec}s elapsed` : '—'
                                                                ]
                                                            }),
                                                            showEta && etaSec !== null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                children: [
                                                                    "~",
                                                                    etaSec,
                                                                    "s remaining"
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    !cancelling ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>cancelExtraction(extractJobId),
                                        className: "mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[#ff5757]/30 bg-[#ff5757]/10 text-[#ff5757] hover:bg-[#ff5757]/20 hover:border-[#ff5757]/50 transition-all",
                                        title: "Cancel this extraction and return to the input",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "w-3 h-3 fill-current"
                                            }),
                                            "Stop extraction"
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[#ff5757]/30 bg-[#ff5757]/10 text-[#ff5757]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }),
                                            "Stopping — finishing current AI call…"
                                        ]
                                    })
                                ]
                            }),
                            phase === 'reading' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#5a6178] max-w-sm",
                                children: "Extracting text and embedded images from the file before sending to the AI…"
                            })
                        ]
                    });
                })(),
                (phase === 'idle' || phase === 'preview') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        phase === 'idle' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex items-center gap-1 p-1 rounded-lg bg-[#1a1e2b] border border-white/[0.06] w-fit mb-4",
                            children: [
                                {
                                    id: 'upload',
                                    label: 'Upload File',
                                    icon: _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A
                                },
                                {
                                    id: 'paste',
                                    label: 'Paste Text',
                                    icon: _barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A
                                }
                            ].map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setMode(t.id),
                                    className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${mode === t.id ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b92a8] hover:text-[#e8ecf4]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(t.icon, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        t.label
                                    ]
                                }, t.id))
                        }),
                        phase === 'idle' && mode === 'upload' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    role: "button",
                                    tabIndex: 0,
                                    onClick: ()=>inputRef.current?.click(),
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
                                    },
                                    onDragOver: (e)=>{
                                        e.preventDefault();
                                        setDragOver(true);
                                    },
                                    onDragLeave: ()=>setDragOver(false),
                                    onDrop: (e)=>{
                                        e.preventDefault();
                                        setDragOver(false);
                                        const f = e.dataTransfer.files?.[0];
                                        if (f) handleFile(f);
                                    },
                                    className: `flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all ${dragOver ? 'border-[#00e5a0]/60 bg-[#00e5a0]/[0.06]' : 'border-white/[0.12] hover:border-[#00e5a0]/35 hover:bg-white/[0.02]'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-12 h-12 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/25 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                className: "w-6 h-6 text-[#00e5a0]"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-sm font-semibold text-[#e8ecf4]",
                                                    children: "Drop a question file here, or click to browse"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs text-[#5a6178] mt-1",
                                                    children: "JSON / CSV import directly \xb7 TXT / MD / DOCX / PDF / PPTX are parsed with AI"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            ref: inputRef,
                                            type: "file",
                                            accept: ".json,.csv,.tsv,.txt,.md,.docx,.pdf,.pptx",
                                            className: "hidden",
                                            onChange: (e)=>{
                                                const f = e.target.files?.[0];
                                                if (f) handleFile(f);
                                                e.target.value = '';
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#5a6178]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                " JSON"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                " CSV"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                " TXT / MD"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                " DOCX / PDF / PPTX"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#1a1e2b] px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-start gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 text-[#8b92a8] mt-0.5"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs font-semibold text-[#8b92a8]",
                                                            children: "Need a template?"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[11px] text-[#5a6178]",
                                                            children: "Download the exact column / field format"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>downloadTemplate('csv'),
                                                    className: "px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] transition-all",
                                                    children: "CSV"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>downloadTemplate('json'),
                                                    className: "px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] transition-all",
                                                    children: "JSON"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        phase === 'idle' && mode === 'paste' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                    value: pastedText,
                                    onChange: (e)=>setPastedText(e.target.value),
                                    placeholder: `Paste your questions here, in any layout. Examples:\n\n1. What is the most common cause of community-acquired pneumonia?\nA) Streptococcus pneumoniae  B) Haemophilus influenzae  C) Mycoplasma  D) Klebsiella\nAnswer: A — S. pneumoniae is the #1 cause of CAP.\n\n2. The left lung has three lobes. (True/False)\nAnswer: False — the left lung has two lobes.`,
                                    rows: 10,
                                    className: "w-full rounded-lg border border-white/[0.1] bg-[#1a1e2b] px-3.5 py-3 text-sm text-[#e8ecf4] placeholder:text-[#5a6178]/70 focus:outline-none focus:border-[#00e5a0]/40 focus:ring-1 focus:ring-[#00e5a0]/25 font-mono leading-relaxed"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-[11px] text-[#5a6178] flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 text-[#00e5a0]/70"
                                                }),
                                                pastedText.trim() ? `${pastedText.length.toLocaleString()} characters ≈ ${estimateQuestionCount(pastedText)} questions — AI will find them all` : 'AI will find the questions, options and answers in your text'
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: handleExtractPasted,
                                            disabled: !pastedText.trim(),
                                            className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                }),
                                                "Extract Questions"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        phase === 'preview' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#1a1e2b] px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3 min-w-0",
                                            children: [
                                                sourceKind === 'file-structured' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 text-[#00e5a0] shrink-0"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 text-[#00e5a0] shrink-0"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs font-semibold text-[#e8ecf4] truncate",
                                                            children: fileName
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "text-[11px] text-[#5a6178]",
                                                            children: [
                                                                questions.length,
                                                                " question",
                                                                questions.length > 1 ? 's' : '',
                                                                " found",
                                                                sourceKind !== 'file-structured' ? ' (AI-extracted — review before import)' : '',
                                                                ' · ',
                                                                includedCount,
                                                                " selected for import"
                                                            ]
                                                        }),
                                                        sourceKind !== 'file-structured' && detectedCount > questions.length * 1.15 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "text-[11px] text-[#e8b45a] mt-0.5",
                                                            children: [
                                                                "The text detector saw ~",
                                                                detectedCount,
                                                                " question-like blocks — ",
                                                                detectedCount - questions.length,
                                                                " more than the AI found. Some may be duplicates or partial questions, but if your file should have more, try re-importing it (duplicates are skipped automatically)."
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setExcluded(new Set());
                                                    },
                                                    className: "text-[11px] font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors",
                                                    children: "Select all"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>reset(),
                                                    className: "p-1.5 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all",
                                                    title: "Start over",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                        className: "w-3.5 h-3.5"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "max-h-[42vh] overflow-y-auto space-y-2 pr-1",
                                    children: questions.map((q, i)=>{
                                        const isExcluded = excluded.has(i);
                                        const isExpanded = expanded === i;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `rounded-lg border transition-all ${isExcluded ? 'border-white/[0.04] bg-[#1a1e2b]/40 opacity-50' : 'border-white/[0.08] bg-[#1a1e2b] hover:border-white/[0.14]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-start gap-3 p-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>toggleExcluded(i),
                                                            className: `mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isExcluded ? 'border-white/[0.15] text-transparent' : 'border-[#00e5a0]/50 bg-[#00e5a0]/15 text-[#00e5a0]'}`,
                                                            title: isExcluded ? 'Include this question' : 'Exclude this question',
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                                className: "w-3 h-3"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                            type: "button",
                                                            onClick: ()=>setExpanded(isExpanded ? null : i),
                                                            className: "flex-1 text-left min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                    className: "text-xs text-[#e8ecf4] leading-relaxed line-clamp-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "text-[#5a6178] mr-1.5",
                                                                            children: [
                                                                                i + 1,
                                                                                "."
                                                                            ]
                                                                        }),
                                                                        q.text
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex flex-wrap items-center gap-1.5 mt-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: `px-1.5 py-0.5 rounded text-[10px] font-bold border ${q.type === 'mcq' ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/25' : q.type === 'tf' ? 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/25' : 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/25'}`,
                                                                            children: TYPE_LABELS[q.type] || q.type
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: `px-1.5 py-0.5 rounded text-[10px] font-bold border ${DIFF_COLORS[q.difficulty] || DIFF_COLORS.Moderate}`,
                                                                            children: q.difficulty
                                                                        }),
                                                                        q.imageUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border text-[#f472b6] bg-[#f472b6]/10 border-[#f472b6]/25",
                                                                            title: "Question extracted from this image",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                                                    className: "w-2.5 h-2.5"
                                                                                }),
                                                                                " Image"
                                                                            ]
                                                                        }),
                                                                        edited.has(i) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border text-[#00e5a0] bg-[#00e5a0]/10 border-[#00e5a0]/25",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                                                    className: "w-2.5 h-2.5"
                                                                                }),
                                                                                " Edited"
                                                                            ]
                                                                        }),
                                                                        q.system && q.system !== 'General' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/[0.05] border border-white/[0.08] text-[#8b92a8]",
                                                                            children: q.system
                                                                        }),
                                                                        q.options.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "text-[10px] text-[#5a6178]",
                                                                            children: [
                                                                                q.options.length,
                                                                                " options"
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>editing === i ? cancelEdit() : startEdit(i),
                                                            className: `mt-0.5 p-1.5 rounded-lg transition-all shrink-0 ${editing === i ? 'text-[#00e5a0] bg-[#00e5a0]/10' : edited.has(i) ? 'text-[#00e5a0] hover:bg-[#00e5a0]/10' : 'text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.05]'}`,
                                                            title: editing === i ? 'Cancel editing' : 'Edit this question',
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>setExpanded(isExpanded ? null : i),
                                                            className: "mt-0.5 text-[#5a6178] hover:text-[#e8ecf4] transition-colors shrink-0",
                                                            children: isExpanded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                                className: "w-4 h-4"
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                                className: "w-4 h-4"
                                                            })
                                                        })
                                                    ]
                                                }),
                                                isExpanded && (editing === i && draft ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(QuestionEditForm, {
                                                    draft: draft,
                                                    onChange: patchDraft,
                                                    onSave: saveEdit,
                                                    onCancel: cancelEdit
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "px-3 pb-3 pt-1 border-t border-white/[0.05] space-y-2.5",
                                                    children: [
                                                        q.options.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "space-y-1",
                                                            children: q.options.map((opt, oi)=>{
                                                                const isCorrect = opt.trim().toLowerCase() === q.answer.trim().toLowerCase();
                                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: `flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] ${isCorrect ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0]' : 'bg-white/[0.03] border border-transparent text-[#8b92a8]'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "font-bold opacity-70",
                                                                            children: String.fromCharCode(65 + oi)
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "flex-1",
                                                                            children: opt
                                                                        }),
                                                                        isCorrect && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                                            className: "w-3 h-3"
                                                                        })
                                                                    ]
                                                                }, oi);
                                                            })
                                                        }),
                                                        q.type === 'tf' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "px-2.5 py-1.5 rounded-md text-[11px] bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] inline-block font-semibold",
                                                            children: [
                                                                "Answer: ",
                                                                q.answer
                                                            ]
                                                        }),
                                                        q.type === 'short' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "px-2.5 py-1.5 rounded-md text-[11px] bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0]",
                                                            children: [
                                                                "Answer: ",
                                                                q.answer
                                                            ]
                                                        }),
                                                        q.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "text-[11px] text-[#8b92a8] leading-relaxed",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "font-semibold text-[#5a6178]",
                                                                    children: "Explanation: "
                                                                }),
                                                                q.explanation
                                                            ]
                                                        }),
                                                        (q.topic || q.tags?.length > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex flex-wrap gap-1.5",
                                                            children: [
                                                                q.topic && q.topic !== 'General' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "px-1.5 py-0.5 rounded text-[10px] bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8]",
                                                                    children: q.topic
                                                                }),
                                                                q.tags.slice(0, 5).map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                        className: "px-1.5 py-0.5 rounded text-[10px] bg-white/[0.05] border border-white/[0.08] text-[#8b92a8]",
                                                                        children: [
                                                                            "#",
                                                                            t
                                                                        ]
                                                                    }, t))
                                                            ]
                                                        })
                                                    ]
                                                }))
                                            ]
                                        }, i);
                                    })
                                }),
                                sourceKind !== 'file-structured' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-2 rounded-lg border border-[#f59e0b]/20 bg-[#f59e0b]/[0.05] px-3.5 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[11px] text-[#8b92a8] leading-relaxed",
                                            children: "These questions were extracted by AI — verify the highlighted answers look right. Use the pencil icon on any question to fix its text, options or answer before importing."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between gap-3 pt-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                reset();
                                            },
                                            className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors",
                                            children: "← Back"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>handleClose(false),
                                                    className: "px-4 py-2 rounded-lg text-xs font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors",
                                                    children: "Cancel"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                    type: "button",
                                                    onClick: handleImport,
                                                    disabled: includedCount === 0,
                                                    className: "inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/15 border border-[#00e5a0]/35 text-[#00e5a0] hover:bg-[#00e5a0]/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Check_CheckCircle2_ChevronDown_ChevronRight_ClipboardPaste_Clock_Download_FileJson_FileSearch_FileSpreadsheet_FileText_Image_Loader2_Pencil_Plus_ScanSearch_Sparkles_Square_Trash2_UploadCloud_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5"
                                                        }),
                                                        "Import ",
                                                        includedCount,
                                                        " Question",
                                                        includedCount > 1 ? 's' : ''
                                                    ]
                                                })
                                            ]
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

/***/ 69776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J1: () => (/* binding */ subscribeToReplayForPath),
/* harmony export */   Rs: () => (/* binding */ initOfflineQueue),
/* harmony export */   aU: () => (/* binding */ subscribeToReplaySuccess),
/* harmony export */   fY: () => (/* binding */ subscribeToQueueStatus)
/* harmony export */ });
/* unused harmony exports triggerReplay, getPendingCount, isOnline */
/* __next_internal_client_entry_do_not_use__ initOfflineQueue,subscribeToQueueStatus,subscribeToReplaySuccess,subscribeToReplayForPath,triggerReplay,getPendingCount,isOnline auto */ const statusListeners = new Set();
const replayListeners = new Set();
let currentPending = 0;
let initialized = false;
function handleServiceWorkerMessage(event) {
    const data = event.data || {};
    if (data.type === 'medq:queue-status') {
        currentPending = typeof data.pending === 'number' ? data.pending : 0;
        statusListeners.forEach((fn)=>{
            try {
                fn(currentPending);
            } catch (e) {}
        });
    } else if (data.type === 'medq:queue-replay-success') {
        replayListeners.forEach((fn)=>{
            try {
                fn({
                    url: data.url,
                    method: data.method,
                    status: data.status,
                    body: data.body || ''
                });
            } catch (e) {}
        });
    }
}
function handleOnline() {
    // Browser is back online — ask the SW to:
    //   1. Reset its _lastFetchFailAt flag (so it stops assuming the network
    //      is down and starts trying fetches again)
    //   2. Replay the queued outbox
    // This is the fallback path for browsers without Background Sync.
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration)=>{
            registration.active?.postMessage({
                type: 'medq:client-online'
            });
            registration.active?.postMessage({
                type: 'medq:replay-now'
            });
        }).catch(()=>{});
    }
}
function handleOffline() {
    // Browser reports offline — notify the SW so its _onlineClientCount
    // stays accurate. The SW uses this count to decide whether to try the
    // network or short-circuit to cache/503.
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration)=>{
            registration.active?.postMessage({
                type: 'medq:client-offline'
            });
        }).catch(()=>{});
    }
}
/**
 * Initialize the offline-queue listener. Safe to call multiple times —
 * subsequent calls are no-ops.
 */ function initOfflineQueue() {
    if (initialized) return;
    if (false) {}
    if (!('serviceWorker' in navigator)) return;
    initialized = true;
    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // Request an initial status broadcast from the SW
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'medq:get-queue-status'
        });
        // Also report our current online/offline state so the SW's
        // _onlineClientCount is accurate from the start
        if (typeof navigator !== 'undefined') {
            navigator.serviceWorker.controller.postMessage({
                type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline'
            });
        }
    } else {
        // The SW might not have taken control yet — try again on controllerchange
        navigator.serviceWorker.addEventListener('controllerchange', ()=>{
            navigator.serviceWorker.controller?.postMessage({
                type: 'medq:get-queue-status'
            });
            if (typeof navigator !== 'undefined') {
                navigator.serviceWorker.controller?.postMessage({
                    type: navigator.onLine ? 'medq:client-online' : 'medq:client-offline'
                });
            }
        });
    }
}
/**
 * Subscribe to pending-queue-count changes.
 * Returns an unsubscribe function.
 */ function subscribeToQueueStatus(listener) {
    statusListeners.add(listener);
    // Immediately invoke with the current value
    try {
        listener(currentPending);
    } catch (e) {}
    return ()=>{
        statusListeners.delete(listener);
    };
}
/**
 * Subscribe to "queued write replayed successfully" events.
 * Chat components use this to refetch messages/rooms after a reconnect.
 * Returns an unsubscribe function.
 */ function subscribeToReplaySuccess(listener) {
    replayListeners.add(listener);
    return ()=>{
        replayListeners.delete(listener);
    };
}
/**
 * Subscribe to replay-success events filtered by URL substring.
 *
 * Convenience wrapper around `subscribeToReplaySuccess` for components
 * that only care about a specific API path (e.g. `/api/notes`,
 * `/api/bookmarks`, `/api/quick-notes`, `/api/study-streaks/check-in`).
 *
 * Example:
 *   useEffect(() => subscribeToReplayForPath('/api/notes', () => refetchNotes()), []);
 */ function subscribeToReplayForPath(pathSubstring, listener) {
    const wrapped = (info)=>{
        if (info.url.includes(pathSubstring)) {
            try {
                listener();
            } catch (e) {}
        }
    };
    replayListeners.add(wrapped);
    return ()=>{
        replayListeners.delete(wrapped);
    };
}
/**
 * Manually trigger a queue replay (e.g. from a "Retry now" button).
 */ function triggerReplay() {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then((registration)=>{
        registration.active?.postMessage({
            type: 'medq:replay-now'
        });
    }).catch(()=>{});
}
/**
 * Current pending count (read-only snapshot).
 */ function getPendingCount() {
    return currentPending;
}
/**
 * Returns true if the browser is currently offline.
 */ function isOnline() {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
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

/***/ 96231:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $N: () => (/* binding */ ProviderAvatar),
/* harmony export */   Au: () => (/* binding */ ContextChip),
/* harmony export */   DL: () => (/* binding */ PlatformDot),
/* harmony export */   Iz: () => (/* binding */ SegmentedControl),
/* harmony export */   Rh: () => (/* binding */ statusLabel),
/* harmony export */   YL: () => (/* binding */ formatLatency),
/* harmony export */   ZF: () => (/* binding */ ConfirmButton),
/* harmony export */   _y: () => (/* binding */ formatTokens),
/* harmony export */   c4: () => (/* binding */ keyStatus),
/* harmony export */   fw: () => (/* binding */ formatRelativeTime),
/* harmony export */   kg: () => (/* binding */ statusDot),
/* harmony export */   lc: () => (/* binding */ CapabilityChip),
/* harmony export */   pG: () => (/* binding */ platformColor)
/* harmony export */ });
/* unused harmony export PLATFORM_COLORS */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50694);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ statusDot,statusLabel,keyStatus,PLATFORM_COLORS,platformColor,PlatformDot,ProviderAvatar,ConfirmButton,SegmentedControl,CapabilityChip,ContextChip,formatRelativeTime,formatTokens,formatLatency auto */ 
/**
 * Shared UX primitives for the BYOK hub — FreeLLMAPI-inspired idioms,
 * restyled in MedQ's design language (bg #0c0e14, text #e8ecf4, accent
 * #00e5a0, muted #8b95a8).
 *
 * Ported patterns (from github.com/tashfeenahmed/freellmapi):
 *   - statusDot            : colored per-key health dot
 *   - PLATFORM_COLORS      : one color source of truth per provider
 *   - ConfirmButton        : arm-then-fire destructive pattern
 *   - SegmentedControl     : pill tab bar
 *   - CapabilityChip       : vision (cyan) / tools (violet) mini chips
 *   - hover-revealed action clusters on rows
 *   - formatRelativeTime   : "3m ago" readouts
 */ 


const statusDot = {
    healthy: 'bg-[#00e5a0]',
    stale: 'bg-[#f5b73d]',
    error: 'bg-[#ff5757]',
    disabled: 'bg-[#5a6478]',
    unknown: 'bg-[#5a6478]/50'
};
const statusLabel = {
    healthy: 'Verified',
    stale: 'Not verified recently',
    error: 'Failed check',
    disabled: 'Disabled',
    unknown: 'Never checked'
};
/** Derive key health. `forceError` marks the last test result as failed. */ function keyStatus(key) {
    if (!key.enabled) return 'disabled';
    if (key.lastTestError) return 'error';
    if (!key.lastVerifiedAt) return 'unknown';
    const age = Date.now() - new Date(key.lastVerifiedAt).getTime();
    // 24h freshness window — freellmapi polls health every 30s, MedQ verifies
    // on demand, so "verified within a day" reads as healthy.
    return age < 24 * 60 * 60 * 1000 ? 'healthy' : 'stale';
}
// ── Provider colors (brand-tinted dots, bars, avatars across the hub) ──
const PLATFORM_COLORS = {
    openai: '#10a37f',
    anthropic: '#d97757',
    google: '#4285f4',
    deepseek: '#4d6bfe',
    glm: '#38bdf8',
    qwen: '#615ced',
    kimi: '#8b5cf6',
    minimax: '#f97316',
    siliconflow: '#7c3aed',
    doubao: '#0ea5e9',
    openrouter: '#64748b',
    grok: '#e2e8f0',
    xiaomi: '#fd5e5e',
    ollama: '#a3a3a3',
    freellmapi: '#22c55e',
    lemonade: '#84cc16',
    zai: '#00e5a0'
};
function platformColor(providerId) {
    return PLATFORM_COLORS[providerId] ?? '#5a6478';
}
/** Small colored dot for a provider (timeline legends, tables). */ function PlatformDot({ providerId, className }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        "aria-hidden": true,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('inline-block size-2 rounded-full shrink-0', className),
        style: {
            backgroundColor: platformColor(providerId)
        }
    });
}
/** Provider avatar: logo image on a brand-tinted tile. */ function ProviderAvatar({ provider, size = 'md', className }) {
    const dim = size === 'xs' ? 'size-4' : size === 'sm' ? 'size-7' : size === 'lg' ? 'size-10' : 'size-8';
    const mono = _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_2__/* .BYOK_MONO_LOGO_IDS */ .$S.has(provider.id);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        title: provider.name,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('inline-flex items-center justify-center overflow-hidden shrink-0', 'border border-white/[0.06]', size === 'xs' ? 'rounded-[4px]' : 'rounded-lg', dim, mono ? 'bg-[#161923]' : 'bg-white/[0.06]', className),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
            src: provider.icon,
            alt: "",
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('size-[62%] object-contain', mono && 'invert'),
            onError: (e)=>{
                // Logo missing → first letter chip instead of a broken image icon.
                const el = e.currentTarget;
                el.style.display = 'none';
                if (el.parentElement) {
                    el.parentElement.dataset.fallback = provider.name.slice(0, 1).toUpperCase();
                    el.parentElement.style.fontWeight = '700';
                }
            }
        })
    });
}
// ── ConfirmButton: arm-then-fire destructive pattern ──
function ConfirmButton({ onConfirm, children, confirmLabel, className, timeoutMs = 3000, title }) {
    const [armed, setArmed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const t = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>{
            if (t.current) clearTimeout(t.current);
        }, []);
    const arm = ()=>{
        setArmed(true);
        t.current = setTimeout(()=>setArmed(false), timeoutMs);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        title: title ?? (armed ? confirmLabel : undefined),
        onClick: (e)=>{
            e.stopPropagation();
            if (armed) {
                if (t.current) clearTimeout(t.current);
                setArmed(false);
                onConfirm();
            } else {
                arm();
            }
        },
        onPointerLeave: ()=>{
            if (armed && t.current) {
                clearTimeout(t.current);
                setArmed(false);
            }
        },
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('inline-flex items-center gap-1 rounded-md text-[10px] font-semibold h-6 px-2 transition-colors', armed ? 'bg-[#ff5757] text-[#0c0e14]' : 'text-[#ff5757] hover:bg-[#ff5757]/10 border border-transparent hover:border-[#ff5757]/20', className),
        children: armed ? confirmLabel : children
    });
}
// ── SegmentedControl: pill tab bar ──
function SegmentedControl({ options, value, onChange, className }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        role: "tablist",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('inline-flex items-center gap-0.5 rounded-lg bg-[#08090f] border border-white/[0.06] p-0.5', className),
        children: options.map((o)=>{
            const active = o.value === value;
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                role: "tab",
                "aria-selected": active,
                type: "button",
                onClick: ()=>onChange(o.value),
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('rounded-md px-2.5 h-7 text-[10px] font-semibold transition-colors whitespace-nowrap', active ? 'bg-[#00e5a0] text-[#0c0e14]' : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04]'),
                children: [
                    o.label,
                    o.count != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('ml-1 tabular-nums', active ? 'text-[#0c0e14]/70' : 'text-[#5a6478]'),
                        children: o.count
                    })
                ]
            }, o.value);
        })
    });
}
// ── Capability chips (the FreeLLMAPI metadata vocabulary) ──
function CapabilityChip({ kind }) {
    const styles = {
        vision: {
            cls: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
            label: 'vision'
        },
        tools: {
            cls: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
            label: 'tools'
        },
        streaming: {
            cls: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
            label: 'stream'
        },
        thinking: {
            cls: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
            label: 'thinking'
        }
    };
    const s = styles[kind];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('text-[9px] font-semibold rounded-full px-1.5 py-px border', s.cls),
        children: s.label
    });
}
/** Context-window chip ("128K"). */ function ContextChip({ tokens }) {
    if (!tokens) return null;
    const label = tokens >= 1000000 ? `${Math.round(tokens / 1000000)}M` : tokens >= 1000 ? `${Math.round(tokens / 1000)}K` : `${tokens}`;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "text-[9px] font-medium rounded-full px-1.5 py-px border border-white/[0.08] text-[#8b95a8] tabular-nums",
        children: label
    });
}
// ── Formatting helpers ──
function formatRelativeTime(iso) {
    if (!iso) return 'never';
    const ms = Date.now() - new Date(iso).getTime();
    const s = Math.floor(ms / 1000);
    if (s < 45) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}d ago`;
    return new Date(iso).toLocaleDateString();
}
function formatTokens(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
}
function formatLatency(ms) {
    if (ms == null) return '—';
    if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
    return `${ms}ms`;
}


/***/ }),

/***/ 96982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ DifficultyIndicator),
/* harmony export */   mR: () => (/* binding */ DifficultyChip)
/* harmony export */ });
/* unused harmony export DifficultyMiniBar */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75478);
/* harmony import */ var _barrel_optimize_names_Hammer_Star_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14283);
/* harmony import */ var _barrel_optimize_names_Hammer_Star_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95697);
/* __next_internal_client_entry_do_not_use__ default,DifficultyChip,DifficultyMiniBar auto */ 


/* ─── Size Map ─── */ const SIZE_MAP = {
    sm: {
        icon: 3,
        gap: 'gap-0',
        text: 'text-[9px]',
        hammerW: 2.5,
        hammerH: 2.5
    },
    md: {
        icon: 3.5,
        gap: 'gap-0.5',
        text: 'text-[10px]',
        hammerW: 3,
        hammerH: 3
    },
    lg: {
        icon: 4,
        gap: 'gap-1',
        text: 'text-xs',
        hammerW: 3.5,
        hammerH: 3.5
    }
};
/* ─── Component ─── */ function DifficultyIndicator({ difficulty, variant = 'icons', size = 'md', showLabel = true, className = '' }) {
    const normalized = (0,_lib_medq_types__WEBPACK_IMPORTED_MODULE_1__/* .normalizeDifficulty */ .hy)(difficulty);
    const level = _lib_medq_types__WEBPACK_IMPORTED_MODULE_1__/* .DIFFICULTY_LEVELS */ .Yg[normalized] ?? 3;
    const color = _lib_medq_types__WEBPACK_IMPORTED_MODULE_1__/* .DIFFICULTY_COLORS */ .Fc[level] ?? '#f59e0b';
    const label = _lib_medq_types__WEBPACK_IMPORTED_MODULE_1__/* .DIFFICULTY_LABELS */ .My[level] ?? 'Moderate';
    const s = SIZE_MAP[size];
    /* ─── Icons variant: 5 hammer icons, filled up to level ─── */ if (variant === 'icons') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: `inline-flex items-center ${s.gap} ${className}`,
            children: [
                Array.from({
                    length: 5
                }, (_, i)=>{
                    const isActive = i < level;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Hammer_Star_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                        className: "transition-all",
                        style: {
                            width: s.hammerW * 4,
                            height: s.hammerH * 4,
                            color: isActive ? color : 'rgba(255,255,255,0.08)',
                            filter: isActive ? `drop-shadow(0 0 3px ${color}40)` : 'none',
                            transform: isActive ? 'rotate(-45deg)' : 'rotate(-45deg)'
                        }
                    }, i);
                }),
                showLabel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: `${s.text} font-semibold ml-1`,
                    style: {
                        color
                    },
                    children: label
                })
            ]
        });
    }
    /* ─── Badge variant: single colored badge with star ─── */ if (variant === 'badge') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${s.text} font-semibold border-0 ${className}`,
            style: {
                background: `${color}15`,
                color
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Hammer_Star_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                    className: "fill-current",
                    style: {
                        width: s.hammerW * 3,
                        height: s.hammerH * 3
                    }
                }),
                showLabel ? label : `L${level}`
            ]
        });
    }
    /* ─── Compact variant: just the level number with color dot ─── */ if (variant === 'compact') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: `inline-flex items-center gap-1 ${s.text} font-semibold ${className}`,
            style: {
                color
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "rounded-full",
                    style: {
                        width: size === 'sm' ? 6 : 8,
                        height: size === 'sm' ? 6 : 8,
                        background: color,
                        boxShadow: `0 0 6px ${color}50`
                    }
                }),
                showLabel ? label : `Lv${level}`
            ]
        });
    }
    /* ─── Full variant: hammer icons + label + level number ─── */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `inline-flex items-center gap-1.5 ${className}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: `inline-flex items-center ${s.gap}`,
                children: Array.from({
                    length: 5
                }, (_, i)=>{
                    const isActive = i < level;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Hammer_Star_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                        style: {
                            width: s.hammerW * 4,
                            height: s.hammerH * 4,
                            color: isActive ? color : 'rgba(255,255,255,0.08)',
                            transform: 'rotate(-45deg)',
                            filter: isActive ? `drop-shadow(0 0 3px ${color}40)` : 'none'
                        }
                    }, i);
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: `${s.text} font-bold`,
                style: {
                    color
                },
                children: label
            }),
            showLabel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "text-[9px] px-1.5 py-0.5 rounded font-medium",
                style: {
                    background: `${color}12`,
                    color: `${color}cc`
                },
                children: [
                    "Level ",
                    level
                ]
            })
        ]
    });
}
function DifficultyChip({ level, label, active, count, onClick }) {
    // Level 0 is the "All" chip, uses a neutral color
    const color = level === 0 ? '#8b95a8' : _lib_medq_types__WEBPACK_IMPORTED_MODULE_1__/* .DIFFICULTY_COLORS */ .Fc[level] ?? '#f59e0b';
    const isAll = level === 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        onClick: onClick,
        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
        style: {
            background: active ? `${color}15` : '#1a1e2b',
            borderColor: active ? `${color}30` : 'rgba(255,255,255,0.08)',
            color: active ? color : '#8b95a8',
            boxShadow: active ? `0 0 8px ${color}15` : 'none'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Hammer_Star_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                className: "transition-all",
                style: {
                    width: 12,
                    height: 12,
                    color: active ? color : 'rgba(255,255,255,0.15)',
                    transform: 'rotate(-45deg)'
                }
            }),
            label,
            count !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "ml-0.5 text-[9px] px-1 py-0 rounded-full font-medium",
                style: {
                    background: active ? `${color}20` : 'rgba(255,255,255,0.06)',
                    color: active ? `${color}cc` : '#5a6178'
                },
                children: count
            })
        ]
    });
}
function DifficultyMiniBar({ level, value, maxValue = 100, label, showValue = true }) {
    const color = DIFFICULTY_COLORS[level] ?? '#f59e0b';
    const pct = Math.min(value / maxValue * 100, 100);
    return /*#__PURE__*/ _jsxs("div", {
        className: "flex items-center gap-2",
        children: [
            label && /*#__PURE__*/ _jsx("span", {
                className: "text-[10px] font-medium w-14 truncate",
                style: {
                    color: '#8b95a8'
                },
                children: label
            }),
            /*#__PURE__*/ _jsx("div", {
                className: "flex-1 h-1.5 rounded-full overflow-hidden",
                style: {
                    background: 'rgba(255,255,255,0.06)'
                },
                children: /*#__PURE__*/ _jsx("div", {
                    className: "h-full rounded-full transition-all duration-700",
                    style: {
                        width: `${Math.max(pct, 2)}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`
                    }
                })
            }),
            showValue && /*#__PURE__*/ _jsxs("span", {
                className: "text-[10px] font-bold w-8 text-right",
                style: {
                    color
                },
                children: [
                    value,
                    "%"
                ]
            })
        ]
    });
}


/***/ }),

/***/ 97916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ Separator)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_separator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30030);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52968);
/* __next_internal_client_entry_do_not_use__ Separator auto */ 


function Separator({ className, orientation = "horizontal", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_separator__WEBPACK_IMPORTED_MODULE_1__/* .Separator */ .w, {
        "data-slot": "separator",
        orientation: orientation,
        className: (0,cn__WEBPACK_IMPORTED_MODULE_2__.cn)("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
        ...props
    });
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [75004,60277,18409,68298,27173,33697,2595,31573,53686,98500,57932,52968,43342,81147,40379,99519,48822,59299,13706,28258,10885,33257,88321,28441,93794,77358], () => (__webpack_exec__(24771)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);