"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[90172],{

/***/ 5928:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FL: () => (/* binding */ InlineLoader),
/* harmony export */   Iz: () => (/* binding */ SegmentedControl),
/* harmony export */   Ke: () => (/* binding */ FlStatusDot),
/* harmony export */   ZF: () => (/* binding */ ConfirmButton),
/* harmony export */   Zk: () => (/* binding */ Panel),
/* harmony export */   aO: () => (/* binding */ PanelHeader),
/* harmony export */   hI: () => (/* binding */ StatCard),
/* harmony export */   i8: () => (/* binding */ CopyButton),
/* harmony export */   pG: () => (/* binding */ platformColor),
/* harmony export */   pp: () => (/* binding */ EmptyState),
/* harmony export */   zJ: () => (/* binding */ ErrorNote)
/* harmony export */ });
/* unused harmony exports FL_STATUS_DOT, FL_STATUS_LABEL, PLATFORM_COLORS */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(99314);
/* harmony import */ var _barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11012);
/* harmony import */ var _barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(92571);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ FL_STATUS_DOT,FL_STATUS_LABEL,FlStatusDot,PLATFORM_COLORS,platformColor,Panel,PanelHeader,StatCard,SegmentedControl,ConfirmButton,CopyButton,ErrorNote,InlineLoader,EmptyState auto */ 
/**
 * Shared UX primitives for the MedQ AI Router tab — freellmapi's dashboard
 * idioms, restyled native in MedQ's design language (bg #0c0e14, accent
 * #00e5a0, muted #8b95a8). No iframe, no external CSS: everything renders
 * with the same Tailwind tokens as the rest of MedQ.
 *
 * Ported patterns (from github.com/tashfeenahmed/freellmapi):
 *   - statusDot       : per-key health vocabulary (healthy / rate-limited / …)
 *   - ConfirmButton   : arm-then-fire destructive actions
 *   - SegmentedControl: pill tab bar (views, ranges)
 *   - StatCard        : dashboard stat tiles
 *   - platformColor   : one accent per provider
 */ 


const FL_STATUS_DOT = {
    healthy: 'bg-[#00e5a0] shadow-[0_0_6px_rgba(0,229,160,0.7)]',
    'rate-limited': 'bg-[#f5b73d] shadow-[0_0_6px_rgba(245,183,61,0.6)]',
    invalid: 'bg-[#ff5757]',
    error: 'bg-[#ff5757]',
    unknown: 'bg-white/25',
    disabled: 'bg-white/15'
};
const FL_STATUS_LABEL = {
    healthy: 'Healthy',
    'rate-limited': 'Rate-limited',
    invalid: 'Invalid key',
    error: 'Error',
    unknown: 'Unknown',
    disabled: 'Disabled'
};
function FlStatusDot({ status, className }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        title: FL_STATUS_LABEL[status] ?? status,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('inline-block h-2 w-2 shrink-0 rounded-full', FL_STATUS_DOT[status] ?? 'bg-white/25', className)
    });
}
// ── Provider colors ─────────────────────────────────────────────────────────
const PLATFORM_COLORS = {
    openai: '#10a37f',
    anthropic: '#d97757',
    google: '#4285f4',
    deepseek: '#4d6bfe',
    glm: '#38bdf8',
    zhipu: '#38bdf8',
    qwen: '#615ced',
    kimi: '#8b5cf6',
    moonshot: '#8b5cf6',
    minimax: '#f97316',
    siliconflow: '#7c3aed',
    doubao: '#0ea5e9',
    openrouter: '#64748b',
    grok: '#e2e8f0',
    xiaomi: '#fd5e5e',
    mistral: '#ff7000',
    cohere: '#39594d',
    groq: '#f55036',
    cerebras: '#f86fa2',
    together: '#0f6fff',
    fireworks: '#8b5cf6',
    ollama: '#a3a3a3',
    custom: '#00e5a0',
    zai: '#00e5a0',
    freellmapi: '#22c55e'
};
function platformColor(platform) {
    return PLATFORM_COLORS[platform] ?? '#5a6478';
}
// ── Panel / stat tiles ──────────────────────────────────────────────────────
function Panel({ className, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('rounded-xl border border-white/[0.06] bg-white/[0.02]', className),
        children: children
    });
}
function PanelHeader({ title, hint, right }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-4 py-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-sm font-semibold text-white/90",
                        children: title
                    }),
                    hint ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-0.5 text-xs text-[#8b95a8]",
                        children: hint
                    }) : null
                ]
            }),
            right ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "ml-auto flex items-center gap-2",
                children: right
            }) : null
        ]
    });
}
function StatCard({ label, value, sub, accent }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "text-[11px] font-medium uppercase tracking-wide text-[#8b95a8]",
                children: label
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-1.5 text-2xl font-semibold tabular-nums",
                style: {
                    color: accent ?? '#e8ecf4'
                },
                children: value
            }),
            sub ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "mt-1 text-xs text-[#8b95a8]",
                children: sub
            }) : null
        ]
    });
}
// ── Segmented control (pill tabs) ───────────────────────────────────────────
function SegmentedControl({ value, onChange, options, size = 'md' }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "inline-flex items-center gap-0.5 rounded-lg border border-white/[0.06] bg-black/30 p-0.5",
        children: options.map((opt)=>{
            const active = opt.value === value;
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: ()=>onChange(opt.value),
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('rounded-md font-medium transition-colors', size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs', active ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b95a8] hover:bg-white/[0.05] hover:text-white/80'),
                children: opt.label
            }, opt.value);
        })
    });
}
// ── Arm-then-fire destructive button ────────────────────────────────────────
function ConfirmButton({ onConfirm, children, confirmLabel = 'Confirm', timeoutMs = 3000, className, title }) {
    const [armed, setArmed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const timer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>{
            if (timer.current) clearTimeout(timer.current);
        }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        title: title,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('rounded-md px-2 py-1 text-xs font-medium transition-colors', armed ? 'bg-[#ff5757]/15 text-[#ff5757]' : 'text-[#8b95a8] hover:bg-white/[0.06] hover:text-[#ff5757]', className),
        onClick: ()=>{
            if (!armed) {
                setArmed(true);
                timer.current = setTimeout(()=>setArmed(false), timeoutMs);
                return;
            }
            if (timer.current) clearTimeout(timer.current);
            setArmed(false);
            onConfirm();
        },
        children: armed ? confirmLabel : children
    });
}
// ── Copy button ─────────────────────────────────────────────────────────────
function CopyButton({ text, className, label }) {
    const [copied, setCopied] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        title: label ?? 'Copy',
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)('inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white/90', className),
        onClick: async ()=>{
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(()=>setCopied(false), 1500);
            } catch  {}
        },
        children: [
            copied ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                className: "h-3.5 w-3.5 text-[#00e5a0]"
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "h-3.5 w-3.5"
            }),
            label ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                children: copied ? 'Copied' : label
            }) : null
        ]
    });
}
// ── Misc states ─────────────────────────────────────────────────────────────
function ErrorNote({ children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-start gap-2 rounded-lg border border-[#ff5757]/20 bg-[#ff5757]/[0.06] px-3 py-2 text-xs text-[#ffb0b0]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "mt-0.5 h-3.5 w-3.5 shrink-0"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "min-w-0 break-words",
                children: children
            })
        ]
    });
}
function InlineLoader({ children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-center gap-2 py-10 text-sm text-[#8b95a8]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_Copy_Loader2_TriangleAlert_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "h-4 w-4 animate-spin text-[#00e5a0]"
            }),
            children
        ]
    });
}
function EmptyState({ title, hint }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center gap-1.5 py-12 text-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "text-sm font-medium text-white/70",
                children: title
            }),
            hint ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "max-w-md text-xs text-[#8b95a8]",
                children: hint
            }) : null
        ]
    });
}


/***/ }),

/***/ 14104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $b: () => (/* binding */ isMedicalModel),
/* harmony export */   YL: () => (/* binding */ formatLatency),
/* harmony export */   ZV: () => (/* binding */ formatNumber),
/* harmony export */   fw: () => (/* binding */ formatRelativeTime),
/* harmony export */   rM: () => (/* binding */ useFreellmSession)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ useFreellmSession,isMedicalModel,formatRelativeTime,formatNumber,formatLatency auto */ /**
 * Client data layer for the MedQ AI Router tab (native port of freellmapi).
 *
 * The AI Router is embedded IN the MedQ server process (#MEDQ-embedded —
 * see src/lib/freellmapi-embedded.ts) and is reached through the
 * /freellmapi/* Next.js proxy; every admin call needs a Bearer dashboard
 * token minted by the MedQ auth bridge (/api/freellmapi-bridge). The token
 * lives in sessionStorage — tab switches reuse it, closing the browser drops
 * it, and a session 401 triggers exactly one silent re-bridge.
 */ 
// ── Session (bridge) ────────────────────────────────────────────────────────
const TOKEN_KEY = 'medq:freellm:token';
function useFreellmSession() {
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        phase: 'boot'
    });
    const tokenRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const bridgingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const bridge = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        if (bridgingRef.current) return;
        bridgingRef.current = true;
        setPhase((p)=>p.phase === 'ready' ? p : {
                phase: 'boot'
            });
        try {
            // Cheap liveness first so the offline state is instant.
            try {
                const livez = await fetch('/freellmapi/livez', {
                    cache: 'no-store'
                });
                if (!livez.ok) throw new Error('unhealthy');
            } catch  {
                setPhase({
                    phase: 'offline',
                    error: 'The AI Router (embedded in this app — it starts together with MedQ) is not responding. Check the server startup logs, then retry.'
                });
                return;
            }
            // Reuse a still-valid sessionStorage token when we have one.
            const stored = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null;
            if (stored) {
                const me = await fetch('/freellmapi/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${stored}`
                    },
                    cache: 'no-store'
                });
                if (me.ok) {
                    const body = await me.json();
                    tokenRef.current = stored;
                    setPhase({
                        phase: 'ready',
                        token: stored,
                        email: body.email
                    });
                    return;
                }
                sessionStorage.removeItem(TOKEN_KEY);
            }
            const res = await fetch('/api/freellmapi-bridge', {
                method: 'POST',
                cache: 'no-store'
            });
            if (res.status === 401) {
                setPhase({
                    phase: 'signin'
                });
                return;
            }
            const body = await res.json();
            if (!body.ok || !body.token || !body.email) {
                setPhase({
                    phase: 'error',
                    error: body.error ?? 'Bridge failed.',
                    code: body.code ?? 'unknown'
                });
                return;
            }
            tokenRef.current = body.token;
            try {
                sessionStorage.setItem(TOKEN_KEY, body.token);
            } catch  {}
            setPhase({
                phase: 'ready',
                token: body.token,
                email: body.email
            });
        } finally{
            bridgingRef.current = false;
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        void bridge();
    }, [
        bridge
    ]);
    const flFetch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (path, init)=>{
        const token = tokenRef.current;
        if (!token) throw new Error('AI Router session not ready');
        const headers = new Headers(init?.headers);
        if (!headers.has('Content-Type') && init?.body) headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${token}`);
        const res = await fetch(`/freellmapi${path}`, {
            ...init,
            headers,
            cache: 'no-store'
        });
        if (res.status === 401) {
            // Session expired — drop it, re-bridge, retry once.
            tokenRef.current = null;
            try {
                sessionStorage.removeItem(TOKEN_KEY);
            } catch  {}
            const retry = await fetch('/api/freellmapi-bridge', {
                method: 'POST',
                cache: 'no-store'
            });
            if (retry.ok) {
                const body = await retry.json();
                tokenRef.current = body.token;
                try {
                    sessionStorage.setItem(TOKEN_KEY, body.token);
                } catch  {}
                setPhase({
                    phase: 'ready',
                    token: body.token,
                    email: body.email
                });
                const headers2 = new Headers(init?.headers);
                if (!headers2.has('Content-Type') && init?.body) headers2.set('Content-Type', 'application/json');
                headers2.set('Authorization', `Bearer ${body.token}`);
                const res2 = await fetch(`/freellmapi${path}`, {
                    ...init,
                    headers: headers2,
                    cache: 'no-store'
                });
                if (!res2.ok) throw await flError(res2, path);
                return await res2.json();
            }
            setPhase({
                phase: 'signin'
            });
            throw new Error('MedQ sign-in required');
        }
        if (!res.ok) throw await flError(res, path);
        if (res.status === 204) return undefined;
        return await res.json();
    }, []);
    return {
        phase,
        flFetch,
        rebridge: ()=>void bridge()
    };
}
async function flError(res, path) {
    const body = await res.json().catch(()=>null);
    return new Error(body?.error?.message ?? `${path} failed (HTTP ${res.status})`);
}
// ── Small shared helpers ────────────────────────────────────────────────────
/** Models that are actually aimed at medical/clinical work. */ const MEDICAL_MODEL_RE = /(medgemma|med-?gemma|biogpt|bio.?bert|pubmed|medllama|biomistral|openbiollm|clinical|med42|haike|diagno|eus?cape?)/i;
function isMedicalModel(modelId) {
    return MEDICAL_MODEL_RE.test(modelId);
}
function formatRelativeTime(iso) {
    if (!iso) return '—';
    const t = Date.parse(iso.includes('T') ? iso : iso.replace(' ', 'T') + 'Z');
    if (Number.isNaN(t)) return '—';
    const diff = Date.now() - t;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
}
function formatNumber(n) {
    if (n == null) return '—';
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}
function formatLatency(ms) {
    if (ms == null) return '—';
    if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`;
    return `${Math.round(ms)}ms`;
}


/***/ }),

/***/ 45837:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Playground)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18931);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90710);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40852);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(46405);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(93744);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9383);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14104);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5928);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AI Router · Playground — streaming chat against any enabled model or the
 * auto-router, natively in MedQ (no iframe). Streams token-by-token through
 * the same OpenAI-compatible /v1 the router exposes to the outside world,
 * with the unified key as credentials.
 *
 * MedQ customization: the default system prompt is MedQ Tutor — a board-style
 * medical educator — and the starter prompts are clinical teaching scenarios.
 */ 




const MEDQ_TUTOR_PROMPT = 'You are MedQ Tutor, an expert medical educator. Answer with clinical precision ' + 'and a teaching mindset: lead with the key point, explain the mechanism, flag the ' + 'classic exam trap, and keep it concise. Use plain language a medical student can follow.';
const STARTERS = [
    'Explain the difference between cushingoid and addisonian lab findings.',
    'A 58-year-old with crushing chest pain radiating to the jaw — walk me through the first 10 minutes.',
    'Why does hypokalemia cause U waves, and when should I worry?',
    'Top 5 differentials for a unilateral pounding headache.'
];
function Playground({ session }) {
    const { flFetch } = session;
    const [models, setModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [apiKey, setApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('auto');
    const [modelQuery, setModelQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [pickerOpen, setPickerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [systemPrompt, setSystemPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(MEDQ_TUTOR_PROMPT);
    const [showSystem, setShowSystem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [temperature, setTemperature] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0.7);
    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [streaming, setStreaming] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const abortRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const scrollRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void (async ()=>{
            try {
                const [m, k] = await Promise.all([
                    flFetch('/api/models'),
                    flFetch('/api/settings/api-key')
                ]);
                setModels(m.filter((x)=>x.enabled));
                setApiKey(k.apiKey);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            }
        })();
    }, [
        flFetch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight
        });
    }, [
        messages
    ]);
    const enabled = models ?? [];
    const filteredModels = modelQuery.trim() ? enabled.filter((m)=>m.displayName.toLowerCase().includes(modelQuery.toLowerCase()) || m.modelId.toLowerCase().includes(modelQuery.toLowerCase())) : enabled;
    const selectedLabel = selected === 'auto' ? 'Auto — router picks the best model' : enabled.find((m)=>m.modelId === selected)?.displayName ?? selected;
    const send = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (text)=>{
        const prompt = text.trim();
        if (!prompt || streaming) return;
        if (!apiKey) {
            setError('Router API key not loaded yet — try again in a moment.');
            return;
        }
        setError(null);
        setInput('');
        const userMsg = {
            role: 'user',
            content: prompt
        };
        const baseMessages = [
            ...messages,
            userMsg
        ];
        setMessages([
            ...baseMessages,
            {
                role: 'assistant',
                content: ''
            }
        ]);
        setStreaming(true);
        const controller = new AbortController();
        abortRef.current = controller;
        const start = Date.now();
        try {
            const res = await fetch('/freellmapi/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    messages: [
                        ...systemPrompt.trim() ? [
                            {
                                role: 'system',
                                content: systemPrompt.trim()
                            }
                        ] : [],
                        ...baseMessages.map((m)=>({
                                role: m.role,
                                content: m.content
                            }))
                    ],
                    ...selected !== 'auto' ? {
                        model: selected
                    } : {},
                    stream: true,
                    temperature
                }),
                signal: controller.signal
            });
            if (!res.ok) {
                const body = await res.json().catch(()=>null);
                throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
            }
            const routedVia = res.headers.get('X-Routed-Via');
            const contentType = res.headers.get('Content-Type') ?? '';
            if (contentType.includes('text/event-stream') && res.body) {
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';
                for(;;){
                    const { done, value } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, {
                        stream: true
                    });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() ?? '';
                    for (const line of lines){
                        const trimmed = line.trim();
                        if (!trimmed.startsWith('data:')) continue;
                        const payload = trimmed.slice(5).trim();
                        if (payload === '[DONE]') continue;
                        try {
                            const chunk = JSON.parse(payload);
                            const delta = chunk.choices?.[0]?.delta?.content;
                            if (delta) {
                                setMessages((prev)=>{
                                    const next = [
                                        ...prev
                                    ];
                                    const last = next[next.length - 1];
                                    if (last && last.role === 'assistant') next[next.length - 1] = {
                                        ...last,
                                        content: last.content + delta
                                    };
                                    return next;
                                });
                            }
                        } catch  {}
                    }
                }
                setMessages((prev)=>{
                    const next = [
                        ...prev
                    ];
                    const last = next[next.length - 1];
                    if (last && last.role === 'assistant') {
                        next[next.length - 1] = {
                            ...last,
                            via: routedVia ?? (selected === 'auto' ? 'auto-router' : selected),
                            latencyMs: Date.now() - start
                        };
                    }
                    return next;
                });
            } else {
                const data = await res.json();
                const content = data.choices?.[0]?.message?.content ?? '';
                setMessages((prev)=>{
                    const next = [
                        ...prev
                    ];
                    const last = next[next.length - 1];
                    if (last && last.role === 'assistant') {
                        next[next.length - 1] = {
                            ...last,
                            content,
                            via: routedVia ?? selected,
                            latencyMs: Date.now() - start
                        };
                    }
                    return next;
                });
            }
        } catch (e) {
            const aborted = e instanceof DOMException && e.name === 'AbortError';
            setMessages((prev)=>{
                const next = [
                    ...prev
                ];
                const last = next[next.length - 1];
                if (last && last.role === 'assistant') {
                    next[next.length - 1] = {
                        ...last,
                        content: last.content || (aborted ? '_Stopped._' : ''),
                        isError: !aborted && !last.content,
                        ...!aborted && !last.content ? {
                            content: e instanceof Error ? e.message : String(e)
                        } : {}
                    };
                }
                return next;
            });
            if (!aborted) setError(e instanceof Error ? e.message : String(e));
        } finally{
            setStreaming(false);
            abortRef.current = null;
        }
    }, [
        apiKey,
        messages,
        selected,
        streaming,
        systemPrompt,
        temperature
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex h-full min-h-0 flex-col gap-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>setPickerOpen((v)=>!v),
                                className: "inline-flex h-9 max-w-72 items-center gap-2 rounded-lg border border-white/[0.08] bg-black/30 px-3 text-xs text-white/90 transition-colors hover:border-[#00e5a0]/30",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5 shrink-0 text-[#00e5a0]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "truncate",
                                        children: selectedLabel
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5 shrink-0 text-[#8b95a8]"
                                    })
                                ]
                            }),
                            pickerOpen ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "fixed inset-0 z-30",
                                        onClick: ()=>setPickerOpen(false)
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "absolute left-0 top-10 z-40 w-80 overflow-hidden rounded-xl border border-white/[0.1] bg-[#10131b] shadow-2xl",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "border-b border-white/[0.06] p-2",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    autoFocus: true,
                                                    value: modelQuery,
                                                    onChange: (e)=>setModelQuery(e.target.value),
                                                    placeholder: "Search enabled models…",
                                                    className: "h-8 w-full rounded-md border border-white/[0.06] bg-black/40 px-2.5 text-xs text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "max-h-72 overflow-y-auto",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setSelected('auto');
                                                            setPickerOpen(false);
                                                        },
                                                        className: `flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${selected === 'auto' ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-white/85 hover:bg-white/[0.05]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SparklesInline, {}),
                                                            " Auto — router decides and fails over"
                                                        ]
                                                    }),
                                                    filteredModels.slice(0, 80).map((m)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                setSelected(m.modelId);
                                                                setPickerOpen(false);
                                                            },
                                                            className: `flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${selected === m.modelId ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-white/85 hover:bg-white/[0.05]'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "h-1.5 w-1.5 shrink-0 rounded-full",
                                                                    style: {
                                                                        backgroundColor: (0,_ui__WEBPACK_IMPORTED_MODULE_3__/* .platformColor */ .pG)(m.platform)
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "min-w-0 flex-1 truncate",
                                                                    children: m.displayName
                                                                }),
                                                                (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .isMedicalModel */ .$b)(m.modelId) ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                                    className: "h-3 w-3 shrink-0 text-[#00e5a0]"
                                                                }) : null
                                                            ]
                                                        }, m.id)),
                                                    filteredModels.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "px-3 py-4 text-center text-[11px] text-[#8b95a8]",
                                                        children: "No enabled models match — enable some in Models."
                                                    }) : null
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }) : null
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setShowSystem((v)=>!v),
                        className: `inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs transition-colors ${showSystem ? 'border-[#00e5a0]/30 bg-[#00e5a0]/10 text-[#00e5a0]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " MedQ Tutor prompt"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: "flex h-9 items-center gap-2 rounded-lg border border-white/[0.06] px-3 text-xs text-[#8b95a8]",
                        children: [
                            "temp",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "range",
                                min: 0,
                                max: 2,
                                step: 0.1,
                                value: temperature,
                                onChange: (e)=>setTemperature(Number(e.target.value)),
                                className: "h-1 w-20 accent-[#00e5a0]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "tabular-nums text-white/80",
                                children: temperature.toFixed(1)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ml-auto flex items-center gap-1.5",
                        children: [
                            streaming ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>abortRef.current?.abort(),
                                className: "inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#ff5757]/30 px-3 text-xs font-medium text-[#ff5757] transition-colors hover:bg-[#ff5757]/10",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    " Stop"
                                ]
                            }) : null,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>{
                                    setMessages([]);
                                    setError(null);
                                },
                                className: "inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.06] px-3 text-xs text-[#8b95a8] transition-colors hover:text-white/85",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    " Clear"
                                ]
                            })
                        ]
                    })
                ]
            }),
            showSystem ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                value: systemPrompt,
                onChange: (e)=>setSystemPrompt(e.target.value),
                rows: 3,
                className: "w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-xs leading-relaxed text-white/85 focus:border-[#00e5a0]/40 focus:outline-none"
            }) : null,
            error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .ErrorNote */ .zJ, {
                children: error
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                ref: scrollRef,
                className: "min-h-0 flex-1 overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.015]",
                children: messages.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex h-full flex-col items-center justify-center gap-4 px-6 py-10 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex h-11 w-11 items-center justify-center rounded-xl bg-[#00e5a0]/10",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "h-5 w-5 text-[#00e5a0]"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-sm font-semibold text-white/90",
                                    children: "Clinical playground"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "mt-1 text-xs text-[#8b95a8]",
                                    children: "Ask anything medical — streamed through your own keys with automatic failover."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex max-w-xl flex-wrap justify-center gap-2",
                            children: STARTERS.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>void send(s),
                                    className: "rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-left text-[11px] text-[#9aa4b8] transition-colors hover:border-[#00e5a0]/30 hover:text-white/90",
                                    children: s
                                }, s))
                        })
                    ]
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "space-y-4 px-4 py-4",
                    children: messages.map((m, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: `mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${m.role === 'user' ? 'bg-white/[0.06]' : 'bg-[#00e5a0]/10'}`,
                                    children: m.role === 'user' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5 text-white/70"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5 text-[#00e5a0]"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `text-sm leading-relaxed ${m.isError ? 'text-[#ff9d9d]' : m.role === 'user' ? 'text-white/90' : 'text-white/85'}`,
                                            children: m.role === 'assistant' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "prose-invert max-w-none break-words text-[13px] leading-relaxed [&_p]:mb-2 [&_ul]:mb-2 [&_li]:mb-0.5 [&_code]:rounded [&_code]:bg-black/40 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[11px] [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:p-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_markdown__WEBPACK_IMPORTED_MODULE_10__/* .Markdown */ .oz, {
                                                        children: m.content || (streaming && i === messages.length - 1 ? '' : '')
                                                    }),
                                                    streaming && i === messages.length - 1 && !m.content ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                        className: "h-3.5 w-3.5 animate-spin text-[#00e5a0]"
                                                    }) : null
                                                ]
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "whitespace-pre-wrap",
                                                children: m.content
                                            })
                                        }),
                                        m.via ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mt-1.5 flex items-center gap-2 text-[10px] text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded bg-white/[0.05] px-1.5 py-0.5 font-mono",
                                                    children: m.via
                                                }),
                                                m.latencyMs ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        (m.latencyMs / 1000).toFixed(1),
                                                        "s"
                                                    ]
                                                }) : null
                                            ]
                                        }) : null
                                    ]
                                })
                            ]
                        }, i))
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-end gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                void send(input);
                            }
                        },
                        rows: 1,
                        placeholder: "Ask a clinical question… (Enter to send, Shift+Enter for a new line)",
                        className: "max-h-32 min-h-10 w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 px-3.5 py-2.5 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        disabled: streaming || !input.trim(),
                        onClick: ()=>void send(input),
                        className: "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-[#00e5a0] px-4 text-sm font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85 disabled:opacity-40",
                        children: streaming ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                            className: "h-4 w-4 animate-spin"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bot_ChevronDown_Eraser_Loader2_Send_Square_Stethoscope_User_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                            className: "h-4 w-4"
                        })
                    })
                ]
            })
        ]
    });
}
function SparklesInline() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "text-[#00e5a0]",
        children: "✦"
    });
}


/***/ }),

/***/ 48281:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AnalyticsView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14104);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5928);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AI Router · Analytics — usage telemetry, natively in MedQ.
 *
 * Ported from freellmapi's AnalyticsPage: range selector, summary stat
 * cards, a zero-padded daily timeline (CSS bars — no chart lib needed at
 * this size), per-model usage table and the recent-requests log with
 * routing attribution.
 */ 


function AnalyticsView({ session }) {
    const { flFetch } = session;
    const [range, setRange] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('7d');
    const [summary, setSummary] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [timeline, setTimeline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [byModel, setByModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [requests, setRequests] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setError(null);
        try {
            const [s, t, m, r] = await Promise.all([
                flFetch(`/api/analytics/summary?range=${range}`),
                flFetch(`/api/analytics/timeline?range=${range}`),
                flFetch(`/api/analytics/by-model?range=${range}`),
                flFetch(`/api/analytics/requests?limit=25&range=${range}`)
            ]);
            setSummary(s);
            setTimeline(t);
            setByModel(m);
            setRequests(r.rows);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, [
        flFetch,
        range
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void load();
    }, [
        load
    ]);
    const maxReq = Math.max(1, ...(timeline ?? []).map((p)=>p.requests));
    const totalTokens = (summary?.totalInputTokens ?? 0) + (summary?.totalOutputTokens ?? 0);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .SegmentedControl */ .Iz, {
                        value: range,
                        onChange: setRange,
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
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs text-[#8b95a8]",
                        children: summary ? `${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary.totalRequests)} requests · ${summary.successRate.toFixed(0)}% success` : '…'
                    })
                ]
            }),
            error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .ErrorNote */ .zJ, {
                children: error
            }) : null,
            !summary && !error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .InlineLoader */ .FL, {
                children: "Loading analytics…"
            }) : null,
            summary ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                                label: "Requests",
                                value: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary.totalRequests),
                                sub: `${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary.lifetimeTotalRequests)} lifetime`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                                label: "Success",
                                value: `${summary.successRate.toFixed(0)}%`,
                                accent: summary.successRate >= 90 ? '#00e5a0' : summary.successRate >= 60 ? '#f5b73d' : '#ff5757'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                                label: "Tokens",
                                value: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(totalTokens),
                                sub: `${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary.totalInputTokens)} in · ${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary.totalOutputTokens)} out`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                                label: "Avg latency",
                                value: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(summary.avgLatencyMs),
                                sub: `ttfb ${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(summary.avgTtfbMs)}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                                label: "p50 / p95",
                                value: `${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(summary.p50LatencyMs)} / ${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(summary.p95LatencyMs)}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                                label: "Saved*",
                                value: `$${summary.estimatedCostSavings.toFixed(2)}`,
                                sub: "vs paid-tier list price"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .PanelHeader */ .aO, {
                                title: "Requests over time",
                                hint: `Success (teal) vs failure (red) · ${range}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "px-4 py-4",
                                children: timeline && timeline.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex h-28 items-end gap-[3px]",
                                    children: timeline.map((p)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "group relative flex min-w-1.5 flex-1 flex-col justify-end",
                                            title: `${p.timestamp}: ${p.requests} requests · ${p.successCount} ok · ${p.failureCount} failed`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex h-24 w-full flex-col justify-end overflow-hidden rounded-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-full bg-[#ff5757]/70",
                                                            style: {
                                                                height: `${p.failureCount / maxReq * 96}px`
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-full bg-[#00e5a0]/70 transition-colors group-hover:bg-[#00e5a0]",
                                                            style: {
                                                                height: `${p.successCount / maxReq * 96}px`
                                                            }
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-[10px] text-white/90 group-hover:block",
                                                    children: [
                                                        p.timestamp.slice(5),
                                                        " \xb7 ",
                                                        p.requests,
                                                        " req \xb7 ",
                                                        (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(p.inputTokens + p.outputTokens),
                                                        " tok"
                                                    ]
                                                })
                                            ]
                                        }, p.timestamp))
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "py-6 text-center text-sm text-[#8b95a8]",
                                    children: "No traffic in this range yet."
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid gap-4 lg:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .PanelHeader */ .aO, {
                                        title: "By model",
                                        hint: "Top models by request volume"
                                    }),
                                    byModel && byModel.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "max-h-72 overflow-y-auto",
                                        children: byModel.slice(0, 12).map((m)=>{
                                            const max = Math.max(1, byModel[0].requests);
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "border-b border-white/[0.04] px-4 py-2 last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-2 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "min-w-0 flex-1 truncate text-white/85",
                                                                children: m.displayName
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "tabular-nums text-xs text-[#8b95a8]",
                                                                children: [
                                                                    m.requests,
                                                                    " req"
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: `tabular-nums text-xs ${m.successRate >= 90 ? 'text-[#00e5a0]' : m.successRate >= 60 ? 'text-[#f5b73d]' : 'text-[#ff5757]'}`,
                                                                children: [
                                                                    m.successRate.toFixed(0),
                                                                    "%"
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "mt-1 h-1 overflow-hidden rounded-full bg-white/[0.05]",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "h-full rounded-full bg-[#00e5a0]/50",
                                                            style: {
                                                                width: `${m.requests / max * 100}%`
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "mt-0.5 flex gap-3 text-[10px] text-[#8b95a8]",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                children: [
                                                                    (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(m.avgLatencyMs),
                                                                    " avg"
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                children: [
                                                                    (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(m.totalInputTokens + m.totalOutputTokens),
                                                                    " tok"
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, `${m.platform}/${m.modelId}`);
                                        })
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "py-8 text-center text-sm text-[#8b95a8]",
                                        children: "No model usage yet."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .PanelHeader */ .aO, {
                                        title: "Recent requests",
                                        hint: "Latest 25 routed calls"
                                    }),
                                    requests && requests.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "max-h-72 overflow-y-auto",
                                        children: requests.map((r)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2.5 border-b border-white/[0.04] px-4 py-2 text-xs last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: `h-1.5 w-1.5 shrink-0 rounded-full ${r.status === 'success' ? 'bg-[#00e5a0]' : 'bg-[#ff5757]'}`
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "min-w-0 flex-1 truncate font-mono text-white/80",
                                                        title: `${r.requestedModel} → ${r.modelId}`,
                                                        children: r.requestedModel || r.modelId
                                                    }),
                                                    r.requestedModel && r.requestedModel !== r.modelId ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "shrink-0 text-[10px] text-[#f5b73d]",
                                                        title: `Router redirected ${r.requestedModel} → ${r.modelId}`,
                                                        children: [
                                                            "↳ ",
                                                            r.modelId
                                                        ]
                                                    }) : null,
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "shrink-0 tabular-nums text-[#8b95a8]",
                                                        children: [
                                                            (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(r.inputTokens + r.outputTokens),
                                                            " tok"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "shrink-0 tabular-nums text-[#8b95a8]",
                                                        children: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(r.latencyMs)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "shrink-0 text-[10px] text-[#8b95a8]",
                                                        children: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatRelativeTime */ .fw)(r.createdAt)
                                                    })
                                                ]
                                            }, r.id))
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "py-8 text-center text-sm text-[#8b95a8]",
                                        children: "No requests yet — try the Playground."
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }) : null
        ]
    });
}


/***/ }),

/***/ 54543:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Overview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49804);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(81499);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(51128);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1275);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(65472);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14104);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5928);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AI Router · Overview — the tab's landing view.
 *
 * Native port of freellmapi's dashboard hero, customized for MedQ: usage
 * stats from the sidecar's analytics plane, key health, the OpenAI-compatible
 * endpoint credentials, and the piece of MedQ-specific wiring that makes the
 * router a first-class citizen of the app — "link with MedQ generation",
 * which registers the router as an OpenAI-compatible endpoint in the user's
 * MedQ BYOK store so its models show up in every model picker (question
 * generation, explanations, tutor …).
 */ 



const ROUTER_LABEL = 'MedQ AI Router';
/** Dedicated BYOK provider id — its own entry in the catalog means its
 *  models never mix with a real OpenAI key's round-robin slot, so requests
 *  for `medq-router:<model>` always land on the router endpoint. */ const ROUTER_PROVIDER_ID = 'medq-router';
function Overview({ session, onNavigate }) {
    const { flFetch } = session;
    const [summary, setSummary] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [healthKeys, setHealthKeys] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [models, setModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [apiKey, setApiKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setError(null);
        try {
            const [s, h, m, k] = await Promise.all([
                flFetch('/api/analytics/summary?range=7d'),
                flFetch('/api/health'),
                flFetch('/api/models'),
                flFetch('/api/settings/api-key')
            ]);
            setSummary(s);
            setHealthKeys(h.keys);
            setModels(m);
            setApiKey(k.apiKey);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, [
        flFetch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void load();
    }, [
        load,
        refreshKey
    ]);
    const enabledChat = (models ?? []).filter((m)=>m.enabled);
    const healthyKeys = (healthKeys ?? []).filter((k)=>k.enabled && (k.status === 'healthy' || k.status === 'unknown'));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                        label: "Requests \xb7 7d",
                        value: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary?.totalRequests ?? 0),
                        sub: `${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary?.lifetimeTotalRequests ?? 0)} lifetime`
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                        label: "Success rate",
                        value: `${(summary?.successRate ?? 0).toFixed(0)}%`,
                        accent: (summary?.successRate ?? 0) >= 90 ? '#00e5a0' : (summary?.successRate ?? 0) >= 60 ? '#f5b73d' : '#ff5757'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                        label: "Tokens \xb7 7d",
                        value: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)((summary?.totalInputTokens ?? 0) + (summary?.totalOutputTokens ?? 0)),
                        sub: `${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary?.totalInputTokens ?? 0)} in · ${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .ZV)(summary?.totalOutputTokens ?? 0)} out`
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                        label: "Avg latency",
                        value: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(summary?.avgLatencyMs),
                        sub: `p95 ${(0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatLatency */ .YL)(summary?.p95LatencyMs)}`
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                        label: "Healthy keys",
                        value: `${healthyKeys.length}/${healthKeys?.length ?? 0}`,
                        accent: "#00e5a0"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .StatCard */ .hI, {
                        label: "Models enabled",
                        value: enabledChat.length,
                        sub: `${models?.length ?? 0} available`
                    })
                ]
            }),
            error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .ErrorNote */ .zJ, {
                children: error
            }) : null,
            !summary && !error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .InlineLoader */ .FL, {
                children: "Loading router telemetry…"
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid gap-4 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .PanelHeader */ .aO, {
                                title: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                            className: "h-4 w-4 text-[#00e5a0]"
                                        }),
                                        " Use it anywhere"
                                    ]
                                }),
                                hint: "OpenAI-compatible endpoint at MedQ's own origin — works in curl, CLIs and coding agents."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-3 px-4 py-3.5 text-sm",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-[#8b95a8]",
                                                children: "Base URL"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                        className: "min-w-0 flex-1 truncate rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-1.5 font-mono text-xs text-[#00e5a0]",
                                                        children:  true ? `${window.location.origin}/v1` : 0
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .CopyButton */ .i8, {
                                                        text: `${ true ? window.location.origin : 0}/v1`,
                                                        label: "Copy"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-[#8b95a8]",
                                                children: "API key (unified)"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                        className: "min-w-0 flex-1 truncate rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-1.5 font-mono text-xs text-white/80",
                                                        children: apiKey ? `${apiKey.slice(0, 10)}••••••••${apiKey.slice(-6)}` : '—'
                                                    }),
                                                    apiKey ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .CopyButton */ .i8, {
                                                        text: apiKey,
                                                        label: "Copy"
                                                    }) : null
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "mt-1.5 text-xs text-[#8b95a8]",
                                                children: "One key for every model you enable below — the router picks the best available and fails over automatically."
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MedqLinkCard, {
                        models: models,
                        apiKey: apiKey
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .PanelHeader */ .aO, {
                                title: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "h-4 w-4 text-[#00e5a0]"
                                        }),
                                        " Provider keys"
                                    ]
                                }),
                                hint: "Health is probed automatically; rate-limited keys cool down on their own.",
                                right: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>setRefreshKey((k)=>k + 1),
                                    className: "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white/90",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                            className: "h-3.5 w-3.5"
                                        }),
                                        " Refresh"
                                    ]
                                })
                            }),
                            healthKeys && healthKeys.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "max-h-64 overflow-y-auto px-4 py-2",
                                children: healthKeys.map((k)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-3 border-b border-white/[0.04] py-2 text-sm last:border-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .FlStatusDot */ .Ke, {
                                                status: k.enabled ? k.status : 'disabled'
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "min-w-0 flex-1 truncate text-white/85",
                                                children: k.label || k.platform
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs uppercase tracking-wide text-[#8b95a8]",
                                                children: k.platform
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "hidden text-xs text-[#8b95a8] sm:inline",
                                                children: k.lastCheckedAt ? new Date(k.lastCheckedAt.replace(' ', 'T') + 'Z').toLocaleString() : 'never checked'
                                            })
                                        ]
                                    }, k.id))
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-4 py-6 text-center text-sm text-[#8b95a8]",
                                children: [
                                    "No provider keys yet —",
                                    ' ',
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        className: "text-[#00e5a0] underline underline-offset-2",
                                        onClick: ()=>onNavigate('keys'),
                                        children: "add your first key"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .PanelHeader */ .aO, {
                                title: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                            className: "h-4 w-4 text-[#00e5a0]"
                                        }),
                                        " Getting started in MedQ"
                                    ]
                                }),
                                hint: "From zero to board-style question generation with your own keys."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ol", {
                                className: "space-y-2.5 px-4 py-4 text-sm text-white/80",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StepN, {
                                                n: 1
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "font-medium text-white",
                                                        children: "Add a free provider key."
                                                    }),
                                                    ' ',
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        className: "text-[#00e5a0] underline underline-offset-2",
                                                        onClick: ()=>onNavigate('keys'),
                                                        children: "Keys"
                                                    }),
                                                    ' ',
                                                    "→ Add key: 70+ free-tier providers (Google, GLM, Groq, Mistral…) or your own OpenAI-compatible endpoint."
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StepN, {
                                                n: 2
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "font-medium text-white",
                                                        children: "Enable the models you like."
                                                    }),
                                                    ' ',
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        className: "text-[#00e5a0] underline underline-offset-2",
                                                        onClick: ()=>onNavigate('models'),
                                                        children: "Models"
                                                    }),
                                                    ' ',
                                                    "— the synced catalog has free limits baked in; look for the ",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "rounded bg-[#00e5a0]/10 px-1.5 py-0.5 text-xs text-[#00e5a0]",
                                                        children: "medical"
                                                    }),
                                                    " badge (MedGemma and friends)."
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StepN, {
                                                n: 3
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "font-medium text-white",
                                                        children: "Link it to MedQ generation."
                                                    }),
                                                    " Use the ",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "inline h-3.5 w-3.5 text-[#00e5a0]"
                                                    }),
                                                    " card above — router models then appear in every MedQ model picker (question generation, explanations, tutor)."
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StepN, {
                                                n: 4
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "font-medium text-white",
                                                        children: "Try it in the Playground."
                                                    }),
                                                    ' ',
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        className: "text-[#00e5a0] underline underline-offset-2",
                                                        onClick: ()=>onNavigate('playground'),
                                                        children: "Ask a clinical question"
                                                    }),
                                                    ' ',
                                                    "and watch the router stream the answer with per-model attribution."
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
    });
}
function StepN({ n }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00e5a0]/15 text-[11px] font-semibold text-[#00e5a0]",
        children: n
    });
}
// ── MedQ generation link ────────────────────────────────────────────────────
function MedqLinkCard({ models, apiKey }) {
    const [medqKeys, setMedqKeys] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [busy, setBusy] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [msg, setMsg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const loadMedq = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/user/api-keys', {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Could not read MedQ endpoints');
            const body = await res.json();
            setMedqKeys(body.keys);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void loadMedq();
    }, [
        loadMedq
    ]);
    const router = (medqKeys ?? []).find((k)=>k.providerId === ROUTER_PROVIDER_ID || k.label === ROUTER_LABEL);
    const linkedCount = router?.modelsConfig?.length ?? 0;
    const link = async ()=>{
        setBusy(true);
        setError(null);
        setMsg(null);
        try {
            const enabled = (models ?? []).filter((m)=>m.enabled);
            const picked = enabled.slice(0, 40).map((m)=>({
                    id: m.modelId,
                    name: m.displayName,
                    contextWindow: m.contextWindow ?? undefined
                }));
            if (!apiKey) throw new Error('Router API key not loaded yet — retry in a moment.');
            const res = await fetch('/api/user/api-keys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...router ? {
                        id: router.id
                    } : {},
                    providerId: ROUTER_PROVIDER_ID,
                    apiKey,
                    baseUrl: `${window.location.origin}/v1`,
                    label: ROUTER_LABEL,
                    modelsConfig: picked.length > 0 ? picked : null
                })
            });
            if (!res.ok) {
                const body = await res.json().catch(()=>null);
                throw new Error(body?.error ?? `HTTP ${res.status}`);
            }
            await loadMedq();
            setMsg(`Linked — ${picked.length} router models now available in MedQ model pickers.`);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusy(false);
        }
    };
    const unlink = async ()=>{
        if (!router) return;
        setBusy(true);
        setError(null);
        setMsg(null);
        try {
            const res = await fetch(`/api/user/api-keys/${encodeURIComponent(router.providerId)}?keyId=${encodeURIComponent(router.id)}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                const body = await res.json().catch(()=>null);
                throw new Error(body?.error ?? `HTTP ${res.status}`);
            }
            await loadMedq();
            setMsg('Unlinked — the router endpoint was removed from MedQ.');
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .PanelHeader */ .aO, {
                title: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "h-4 w-4 text-[#00e5a0]"
                        }),
                        " Link with MedQ generation"
                    ]
                }),
                hint: "Register the router as a MedQ endpoint — its models appear in every model picker.",
                right: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                    className: "h-3.5 w-3.5 text-[#8b95a8]",
                    title: "Uses MedQ's BYOK store"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3 px-4 py-3.5",
                children: [
                    router ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 rounded-lg border border-[#00e5a0]/20 bg-[#00e5a0]/[0.05] px-3 py-2 text-sm text-[#9ef2d8]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "h-4 w-4 text-[#00e5a0]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    "Linked as ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "font-medium",
                                        children: ROUTER_LABEL
                                    }),
                                    " — ",
                                    linkedCount,
                                    " models available to question generation, explanations and the tutor."
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#8b95a8]",
                        children: "The router exposes one OpenAI-compatible endpoint. Link it and MedQ routes generation through your keys — with automatic failover across every model you enable."
                    }),
                    msg ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs text-[#00e5a0]",
                        children: msg
                    }) : null,
                    error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .ErrorNote */ .zJ, {
                        children: error
                    }) : null,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                disabled: busy || !models || !apiKey,
                                onClick: link,
                                className: "inline-flex items-center gap-1.5 rounded-lg bg-[#00e5a0] px-3 py-1.5 text-xs font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85 disabled:opacity-50",
                                children: [
                                    busy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    router ? 'Refresh linked models' : 'Link router to MedQ'
                                ]
                            }),
                            router ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                disabled: busy,
                                onClick: unlink,
                                className: "inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[#8b95a8] transition-colors hover:border-[#ff5757]/30 hover:text-[#ff5757] disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ExternalLink_KeyRound_Link2_Link2Off_Loader2_RefreshCw_Stethoscope_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    " Unlink"
                                ]
                            }) : null
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 82623:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ModelsView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(57990);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(44236);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(38158);
/* harmony import */ var _barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(19805);
/* harmony import */ var _components_ui_switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21767);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14104);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5928);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AI Router · Models — the synced free-model catalog, natively in MedQ.
 *
 * Ported from freellmapi's models table: search, provider + status filters,
 * per-model enable/disable (this is the model-switching core), capability
 * chips, medical-model highlighting (MedQ customization), the routing-chain
 * order (↑/↓ over the authoritative /api/fallback chain) and the one-click
 * Smartest/Fastest sort presets.
 */ 




const PAGE = 60;
function ModelsView({ session }) {
    const { flFetch } = session;
    const [models, setModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [chain, setChain] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [routing, setRouting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [platform, setPlatform] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [statusFilter, setStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('enabled');
    const [visionOnly, setVisionOnly] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [toolsOnly, setToolsOnly] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [limit, setLimit] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(PAGE);
    const [busyId, setBusyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setError(null);
        try {
            const [m, c, r] = await Promise.all([
                flFetch('/api/models'),
                flFetch('/api/fallback'),
                flFetch('/api/fallback/routing')
            ]);
            setModels(m);
            setChain(c);
            setRouting(r);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, [
        flFetch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void load();
    }, [
        load,
        refreshKey
    ]);
    const chainRank = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const map = new Map();
        (chain ?? []).forEach((row, i)=>map.set(row.modelDbId, i + 1));
        return map;
    }, [
        chain
    ]);
    const platforms = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const counts = new Map();
        (models ?? []).forEach((m)=>counts.set(m.platform, (counts.get(m.platform) ?? 0) + 1));
        return Array.from(counts.entries()).sort((a, b)=>b[1] - a[1]);
    }, [
        models
    ]);
    const filtered = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let list = models ?? [];
        if (statusFilter === 'enabled') list = list.filter((m)=>m.enabled);
        if (statusFilter === 'medical') list = list.filter((m)=>(0,_api__WEBPACK_IMPORTED_MODULE_3__/* .isMedicalModel */ .$b)(m.modelId));
        if (statusFilter === 'chain') list = list.filter((m)=>chainRank.has(m.id));
        if (platform !== 'all') list = list.filter((m)=>m.platform === platform);
        if (visionOnly) list = list.filter((m)=>m.supportsVision);
        if (toolsOnly) list = list.filter((m)=>m.supportsTools);
        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter((m)=>m.displayName.toLowerCase().includes(q) || m.modelId.toLowerCase().includes(q) || m.platform.includes(q));
        }
        return list;
    }, [
        models,
        statusFilter,
        platform,
        visionOnly,
        toolsOnly,
        query,
        chainRank
    ]);
    const toggleModel = async (m, enabled)=>{
        setBusyId(m.id);
        setError(null);
        try {
            await flFetch(`/api/models/${m.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    enabled
                })
            });
            setModels((prev)=>(prev ?? []).map((x)=>x.id === m.id ? {
                        ...x,
                        enabled
                    } : x));
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusyId(null);
        }
    };
    /** Move a chained model up/down: swap with its neighbour, renumber, PUT. */ const move = async (m, dir)=>{
        const rows = chain ?? [];
        const idx = rows.findIndex((r)=>r.modelDbId === m.id);
        if (idx < 0) return;
        const swapWith = idx + dir;
        if (swapWith < 0 || swapWith >= rows.length) return;
        const next = [
            ...rows
        ];
        [next[idx], next[swapWith]] = [
            next[swapWith],
            next[idx]
        ];
        setBusyId(m.id);
        setError(null);
        try {
            await flFetch('/api/fallback', {
                method: 'PUT',
                body: JSON.stringify(next.map((r, i)=>({
                        modelDbId: r.modelDbId,
                        priority: i + 1,
                        enabled: r.enabled
                    })))
            });
            setChain(next);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusyId(null);
        }
    };
    const sortPreset = async (preset)=>{
        setBusyId(-1);
        setError(null);
        try {
            await flFetch(`/api/fallback/sort/${preset}`, {
                method: 'POST'
            });
            await load();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusyId(null);
        }
    };
    const enabledCount = (models ?? []).filter((m)=>m.enabled).length;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative min-w-52 flex-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a8]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: query,
                                onChange: (e)=>{
                                    setQuery(e.target.value);
                                    setLimit(PAGE);
                                },
                                placeholder: `Search ${models?.length ?? '…'} models…`,
                                className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 pl-8 pr-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                        value: platform,
                        onChange: (e)=>{
                            setPlatform(e.target.value);
                            setLimit(PAGE);
                        },
                        className: "h-9 rounded-lg border border-white/[0.06] bg-black/30 px-2.5 text-xs text-white/85 focus:border-[#00e5a0]/40 focus:outline-none",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                value: "all",
                                children: "All providers"
                            }),
                            platforms.map(([p, n])=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                                    value: p,
                                    children: [
                                        p,
                                        " (",
                                        n,
                                        ")"
                                    ]
                                }, p))
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .SegmentedControl */ .Iz, {
                        value: statusFilter,
                        onChange: (v)=>{
                            setStatusFilter(v);
                            setLimit(PAGE);
                        },
                        size: "sm",
                        options: [
                            {
                                value: 'enabled',
                                label: `Enabled ${enabledCount || ''}`
                            },
                            {
                                value: 'all',
                                label: 'All'
                            },
                            {
                                value: 'medical',
                                label: 'Medical'
                            },
                            {
                                value: 'chain',
                                label: 'Router order'
                            }
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setVisionOnly((v)=>!v),
                        className: `inline-flex h-8 items-center gap-1 rounded-lg border px-2.5 text-xs transition-colors ${visionOnly ? 'border-[#22d3ee]/40 bg-[#22d3ee]/10 text-[#22d3ee]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " Vision"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setToolsOnly((v)=>!v),
                        className: `inline-flex h-8 items-center gap-1 rounded-lg border px-2.5 text-xs transition-colors ${toolsOnly ? 'border-[#a78bfa]/40 bg-[#a78bfa]/10 text-[#a78bfa]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " Tools"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: ()=>setRefreshKey((k)=>k + 1),
                        className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white/90",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "h-3.5 w-3.5"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2 text-xs text-[#8b95a8]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                        className: "h-3.5 w-3.5 text-[#00e5a0]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        children: [
                            "Strategy: ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-white/85",
                                children: routing?.strategy ?? '…'
                            }),
                            " \xb7 order applies when it is ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-white/85",
                                children: "priority"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "mx-1 text-white/15",
                        children: "|"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        disabled: busyId === -1,
                        onClick: ()=>sortPreset('intelligence'),
                        className: "inline-flex items-center gap-1 rounded-md border border-white/[0.06] px-2 py-1 text-[11px] text-[#8b95a8] transition-colors hover:border-[#00e5a0]/30 hover:text-[#00e5a0] disabled:opacity-40",
                        children: [
                            busyId === -1 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "h-3 w-3 animate-spin"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "h-3 w-3"
                            }),
                            " Sort chain: smartest first"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>sortPreset('speed'),
                        className: "inline-flex items-center gap-1 rounded-md border border-white/[0.06] px-2 py-1 text-[11px] text-[#8b95a8] transition-colors hover:border-[#00e5a0]/30 hover:text-[#00e5a0]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "h-3 w-3"
                            }),
                            " fastest first"
                        ]
                    })
                ]
            }),
            error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .ErrorNote */ .zJ, {
                children: error
            }) : null,
            models === null && !error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .InlineLoader */ .FL, {
                children: "Loading catalog…"
            }) : null,
            models !== null && filtered.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .Panel */ .Zk, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .EmptyState */ .pp, {
                    title: "No models match",
                    hint: "Try clearing filters — or add a key so the catalog's provider models become usable."
                })
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-1.5",
                children: [
                    filtered.slice(0, limit).map((m)=>{
                        const rank = chainRank.get(m.id);
                        const med = (0,_api__WEBPACK_IMPORTED_MODULE_3__/* .isMedicalModel */ .$b)(m.modelId);
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border px-3.5 py-2.5 transition-colors ${m.enabled ? 'border-white/[0.08] bg-white/[0.025]' : 'border-white/[0.04] bg-transparent'}`,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_2__/* .Switch */ .d, {
                                    checked: m.enabled,
                                    onCheckedChange: (v)=>void toggleModel(m, v),
                                    "aria-label": `Enable ${m.displayName}`
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-44 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex flex-wrap items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: `truncate text-sm font-medium ${m.enabled ? 'text-white/92' : 'text-white/45'}`,
                                                    children: m.displayName
                                                }),
                                                med ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "inline-flex items-center gap-1 rounded bg-[#00e5a0]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#00e5a0]",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                            className: "h-2.5 w-2.5"
                                                        }),
                                                        " medical"
                                                    ]
                                                }) : null,
                                                m.supportsVision ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded bg-[#22d3ee]/10 px-1.5 py-0.5 text-[10px] text-[#22d3ee]",
                                                    children: "vision"
                                                }) : null,
                                                m.supportsTools ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded bg-[#a78bfa]/10 px-1.5 py-0.5 text-[10px] text-[#a78bfa]",
                                                    children: "tools"
                                                }) : null,
                                                m.source === 'custom' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[#8b95a8]",
                                                    children: "yours"
                                                }) : null
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mt-0.5 flex flex-wrap items-center gap-x-3 text-[11px] text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                                    style: {
                                                        backgroundColor: `${(0,_ui__WEBPACK_IMPORTED_MODULE_4__/* .platformColor */ .pG)(m.platform)}1f`,
                                                        color: (0,_ui__WEBPACK_IMPORTED_MODULE_4__/* .platformColor */ .pG)(m.platform)
                                                    },
                                                    children: m.platform
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-mono",
                                                    children: m.modelId
                                                }),
                                                m.intelligenceRank ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    title: "Intelligence rank",
                                                    children: [
                                                        "intel ",
                                                        m.intelligenceRank
                                                    ]
                                                }) : null,
                                                m.speedRank ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    title: "Speed rank",
                                                    children: [
                                                        "speed ",
                                                        m.speedRank
                                                    ]
                                                }) : null,
                                                m.contextWindow ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        Math.round(m.contextWindow / 1024),
                                                        "k ctx"
                                                    ]
                                                }) : null,
                                                m.rpdLimit ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        m.rpdLimit,
                                                        "/day"
                                                    ]
                                                }) : m.rpmLimit ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        m.rpmLimit,
                                                        "/min"
                                                    ]
                                                }) : null,
                                                m.monthlyTokenBudget ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        m.monthlyTokenBudget,
                                                        "/mo"
                                                    ]
                                                }) : null
                                            ]
                                        })
                                    ]
                                }),
                                rank ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] tabular-nums text-[#8b95a8]",
                                            title: "Position in the routing chain",
                                            children: [
                                                "#",
                                                rank
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            title: "Higher routing priority",
                                            disabled: busyId === m.id,
                                            onClick: ()=>void move(m, -1),
                                            className: "rounded-md px-1.5 py-1 text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-[#00e5a0] disabled:opacity-40",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "h-3.5 w-3.5"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            title: "Lower routing priority",
                                            disabled: busyId === m.id,
                                            onClick: ()=>void move(m, 1),
                                            className: "rounded-md px-1.5 py-1 text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-[#00e5a0] disabled:opacity-40",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                className: "h-3.5 w-3.5"
                                            })
                                        })
                                    ]
                                }) : null,
                                busyId === m.id ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowDown_ArrowUp_Eye_Gauge_Loader2_RefreshCw_Search_Sparkles_Stethoscope_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    className: "h-3.5 w-3.5 animate-spin text-[#00e5a0]"
                                }) : null
                            ]
                        }, m.id);
                    }),
                    filtered.length > limit ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setLimit((l)=>l + PAGE),
                        className: "w-full rounded-xl border border-white/[0.06] py-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.04] hover:text-white/90",
                        children: [
                            "Show ",
                            Math.min(PAGE, filtered.length - limit),
                            " more of ",
                            filtered.length
                        ]
                    }) : null
                ]
            })
        ]
    });
}


/***/ }),

/***/ 89996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LogsView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_RefreshCw_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_RefreshCw_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25879);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14104);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5928);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AI Router · Logs — the sidecar's operational log, natively in MedQ.
 *
 * Ported from freellmapi's LogsPage: level-coloured entries, auto-refresh,
 * manual refresh and the arm-then-fire "clear" for wiping the ring buffer.
 */ 



const LEVEL_STYLE = {
    debug: 'text-[#8b95a8]',
    info: 'text-[#7dd3fc]',
    warn: 'text-[#f5b73d]',
    error: 'text-[#ff9d9d]'
};
const LEVEL_BG = {
    debug: 'bg-white/[0.05] text-[#8b95a8]',
    info: 'bg-[#7dd3fc]/10 text-[#7dd3fc]',
    warn: 'bg-[#f5b73d]/10 text-[#f5b73d]',
    error: 'bg-[#ff5757]/10 text-[#ff5757]'
};
function LogsView({ session }) {
    const { flFetch } = session;
    const [entries, setEntries] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [levelFilter, setLevelFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [auto, setAuto] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const timer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const body = await flFetch('/api/logs?limit=200');
            setEntries(body.entries);
            setError(null);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, [
        flFetch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void load();
    }, [
        load,
        refreshKey
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (timer.current) clearInterval(timer.current);
        if (auto) timer.current = setInterval(()=>void load(), 5000);
        return ()=>{
            if (timer.current) clearInterval(timer.current);
        };
    }, [
        auto,
        load
    ]);
    const filtered = (entries ?? []).filter((e)=>{
        if (levelFilter === 'all') return true;
        if (levelFilter === 'info') return e.level === 'info' || e.level === 'debug';
        return e.level === levelFilter;
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .SegmentedControl */ .Iz, {
                        value: levelFilter,
                        onChange: setLevelFilter,
                        size: "sm",
                        options: [
                            {
                                value: 'all',
                                label: `All ${entries?.length ?? ''}`
                            },
                            {
                                value: 'info',
                                label: 'Info'
                            },
                            {
                                value: 'warn',
                                label: 'Warnings'
                            },
                            {
                                value: 'error',
                                label: 'Errors'
                            }
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setAuto((v)=>!v),
                        className: `inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs transition-colors ${auto ? 'border-[#00e5a0]/30 bg-[#00e5a0]/10 text-[#00e5a0]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: `h-1.5 w-1.5 rounded-full ${auto ? 'animate-pulse bg-[#00e5a0]' : 'bg-white/25'}`
                            }),
                            "Live"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setRefreshKey((k)=>k + 1),
                        className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white/90",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " Refresh"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .ConfirmButton */ .ZF, {
                        onConfirm: async ()=>{
                            try {
                                await flFetch('/api/logs/clear', {
                                    method: 'POST'
                                });
                                await load();
                            } catch (e) {
                                setError(e instanceof Error ? e.message : String(e));
                            }
                        },
                        className: "ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5",
                        confirmLabel: "Wipe the log?",
                        title: "Clear the log buffer",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_RefreshCw_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " Clear"
                        ]
                    })
                ]
            }),
            error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .ErrorNote */ .zJ, {
                children: error
            }) : null,
            entries === null && !error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .InlineLoader */ .FL, {
                children: "Loading log…"
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .Panel */ .Zk, {
                children: filtered.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__/* .EmptyState */ .pp, {
                    title: entries?.length ? 'No entries at this level' : 'Log is empty',
                    hint: "Router activity — health checks, routing decisions, cooldowns — lands here."
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "max-h-[calc(100vh-320px)] min-h-64 overflow-y-auto px-3 py-2 font-mono text-[11px] leading-relaxed",
                    children: filtered.map((e)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex gap-2 border-b border-white/[0.03] py-1.5 last:border-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "w-16 shrink-0 text-[#8b95a8]/70",
                                    children: (0,_api__WEBPACK_IMPORTED_MODULE_2__/* .formatRelativeTime */ .fw)(e.ts)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: `w-12 shrink-0 rounded px-1 text-center text-[10px] font-semibold uppercase ${LEVEL_BG[e.level] ?? LEVEL_BG.debug}`,
                                    children: e.level
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: `min-w-0 flex-1 break-words ${LEVEL_STYLE[e.level] ?? LEVEL_STYLE.debug}`,
                                    children: [
                                        e.source ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-white/50",
                                            children: [
                                                "[",
                                                e.source,
                                                "] "
                                            ]
                                        }) : null,
                                        e.message
                                    ]
                                })
                            ]
                        }, e.id))
                })
            })
        ]
    });
}


/***/ }),

/***/ 90172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FreeLLMTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(49960);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(81499);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(90710);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(36338);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(20270);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1275);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(96339);
/* harmony import */ var _components_medq_freellm_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14104);
/* harmony import */ var _components_medq_freellm_Overview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54543);
/* harmony import */ var _components_medq_freellm_KeysView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(99709);
/* harmony import */ var _components_medq_freellm_ModelsView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(82623);
/* harmony import */ var _components_medq_freellm_Playground__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(45837);
/* harmony import */ var _components_medq_freellm_AnalyticsView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(48281);
/* harmony import */ var _components_medq_freellm_LogsView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(89996);
/* harmony import */ var _components_medq_AiModelsGuide__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(58600);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * MedQ AI Router — the freellmapi BYOK suite as a REAL MedQ tab.
 *
 * This is a native re-implementation (not an iframe) of the freellmapi
 * dashboard (github.com/tashfeenahmed/freellmapi), customized for MedQ:
 *
 *   • Linked with MedQ — the /api/freellmapi-bridge route mints a sidecar
 *     session for the signed-in MedQ user, so there is no second login;
 *     the router can also be registered as a MedQ generation endpoint
 *     (Overview → "Link with MedQ generation").
 *   • MedQ design language — same dark theme, teal accent and component
 *     vocabulary as the rest of the app.
 *   • Medical context — MedQ Tutor playground prompt, clinical starter
 *     prompts, medical-model badges across the catalog.
 *
 * The router itself (complete clone at ./freellmapi, Express + SQLite) runs
 * EMBEDDED in the MedQ server process (#MEDQ-embedded — booted by
 * instrumentation on an internal ephemeral port) and remains the data plane:
 * encrypted key storage, the synced 70+ provider catalog, routing/failover
 * engine and analytics. All calls flow through the /freellmapi/* in-app
 * proxy. The standalone advanced dashboard (Fusion, Embeddings, Agents,
 * media…) stays reachable via the "Advanced" link for power features this
 * tab does not re-implement.
 */ 









const NAV = [
    {
        id: 'overview',
        label: 'Overview',
        icon: _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A,
        hint: 'Health, usage, MedQ link'
    },
    {
        id: 'keys',
        label: 'Keys',
        icon: _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A,
        hint: 'BYOK provider keys'
    },
    {
        id: 'models',
        label: 'Models',
        icon: _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A,
        hint: 'Catalog & switching'
    },
    {
        id: 'playground',
        label: 'Playground',
        icon: _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
        hint: 'Streaming clinical chat'
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A,
        hint: 'Usage & latency'
    },
    {
        id: 'logs',
        label: 'Logs',
        icon: _barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A,
        hint: 'Operational log'
    }
];
function FreeLLMTab() {
    const session = (0,_components_medq_freellm_api__WEBPACK_IMPORTED_MODULE_2__/* .useFreellmSession */ .rM)();
    const [view, setView] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('overview');
    const { phase } = session;
    // Keep the sidecar liveness dot fresh.
    const [, setTick] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const t = setInterval(()=>setTick((x)=>x + 1), 30000);
        return ()=>clearInterval(t);
    }, []);
    const navigate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((v)=>setView(v), []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0e14]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "flex h-7 w-7 items-center justify-center rounded-lg bg-[#00e5a0]/10",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                    className: "h-4 w-4 text-[#00e5a0]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "leading-tight",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2 text-sm font-semibold text-white/95",
                                        children: [
                                            "MedQ AI Router",
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "hidden rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-[#8b95a8] sm:inline",
                                                children: "BYOK"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "hidden text-[11px] text-[#8b95a8] md:block",
                                        children: "Your keys \xb7 70+ free providers \xb7 automatic failover \xb7 analytics"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ml-auto flex items-center gap-2",
                        children: [
                            phase.phase === 'ready' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "hidden items-center gap-1.5 text-[11px] text-[#8b95a8] lg:inline-flex",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "inline-block h-2 w-2 rounded-full bg-[#00e5a0] shadow-[0_0_6px_rgba(0,229,160,0.8)]"
                                    }),
                                    "sidecar online",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "mx-1 text-white/15",
                                        children: "\xb7"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "max-w-40 truncate",
                                        children: phase.email
                                    })
                                ]
                            }) : null,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_AiModelsGuide__WEBPACK_IMPORTED_MODULE_9__/* .AiModelsGuideButton */ .z, {
                                variant: "icon"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                href: "/freellmapi/",
                                target: "_blank",
                                rel: "noopener",
                                className: "inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white",
                                title: "Open the full freellmapi dashboard (Fusion, Embeddings, Agents, media…)",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                        className: "h-3.5 w-3.5"
                                    }),
                                    "Advanced"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                type: "button",
                                onClick: session.rebridge,
                                className: "inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white",
                                title: "Re-connect the MedQ bridge",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                    className: "h-3.5 w-3.5"
                                })
                            })
                        ]
                    })
                ]
            }),
            phase.phase === 'boot' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(GateShell, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                        className: "h-7 w-7 animate-spin text-[#00e5a0]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-white/60",
                        children: "Connecting the AI Router to your MedQ session…"
                    })
                ]
            }) : null,
            phase.phase === 'offline' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(GateShell, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                        className: "h-8 w-8 text-[#ff5757]/80"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "max-w-md text-sm text-white/70",
                        children: phase.error
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: session.rebridge,
                        className: "mt-1 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs text-white/85 transition-colors hover:bg-white/[0.06]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " Retry"
                        ]
                    })
                ]
            }) : null,
            phase.phase === 'signin' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(GateShell, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                        className: "h-8 w-8 text-[#00e5a0]/80"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "max-w-md text-sm text-white/70",
                        children: "The AI Router is linked to your MedQ account — sign in to MedQ to manage keys, models and analytics."
                    })
                ]
            }) : null,
            phase.phase === 'error' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(GateShell, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                        className: "h-8 w-8 text-[#f5b73d]/80"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "max-w-md text-sm text-white/70",
                        children: phase.error
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: session.rebridge,
                        className: "mt-1 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs text-white/85 transition-colors hover:bg-white/[0.06]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Bot_ExternalLink_KeyRound_LayoutDashboard_Loader2_LogIn_RefreshCw_ServerCrash_Stethoscope_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " Retry"
                        ]
                    })
                ]
            }) : null,
            phase.phase === 'ready' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex min-h-0 flex-1 flex-col md:flex-row",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                        className: "flex shrink-0 gap-1 overflow-x-auto border-b border-white/[0.06] bg-white/[0.015] px-2 py-2 md:w-44 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r md:py-3",
                        children: [
                            NAV.map((item)=>{
                                const active = view === item.id;
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: ()=>navigate(item.id),
                                    title: item.hint,
                                    className: `flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors ${active ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-[#8b95a8] hover:bg-white/[0.04] hover:text-white/90'}`,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                                            className: "h-4 w-4 shrink-0"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "whitespace-nowrap",
                                            children: item.label
                                        })
                                    ]
                                }, item.id);
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mt-auto hidden px-3 pb-1 pt-4 text-[10px] leading-relaxed text-[#8b95a8]/60 md:block",
                                children: "freellmapi v0.16 \xb7 cloned in full at ./freellmapi \xb7 keys encrypted at rest"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-h-0 flex-1 overflow-y-auto p-4",
                        children: [
                            view === 'overview' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_freellm_Overview__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                session: session,
                                onNavigate: navigate
                            }) : null,
                            view === 'keys' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_freellm_KeysView__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                session: session
                            }) : null,
                            view === 'models' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_freellm_ModelsView__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                session: session
                            }) : null,
                            view === 'playground' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-full min-h-[420px]",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_freellm_Playground__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                    session: session
                                })
                            }) : null,
                            view === 'analytics' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_freellm_AnalyticsView__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                session: session
                            }) : null,
                            view === 'logs' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_freellm_LogsView__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                session: session
                            }) : null
                        ]
                    })
                ]
            }) : null
        ]
    });
}
function GateShell({ children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex min-h-64 flex-1 flex-col items-center justify-center gap-3 px-6 text-center",
        children: children
    });
}


/***/ }),

/***/ 99709:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ KeysView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(82749);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2125);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(81499);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12363);
/* harmony import */ var _barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22200);
/* harmony import */ var _components_ui_switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21767);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14104);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5928);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AI Router · Keys — BYOK provider key management, natively in MedQ.
 *
 * Ported from freellmapi's KeysPage: grouped key list with health dots and
 * hover actions, add-key for the 70+ catalog providers, and the custom
 * OpenAI-compatible endpoint flow with live model discovery + bulk
 * registration ("the models I added are finally visible" — the flow that
 * started this whole integration).
 */ 




function KeysView({ session }) {
    const { flFetch } = session;
    const [keys, setKeys] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [providers, setProviders] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [statusFilter, setStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [busyId, setBusyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [addOpen, setAddOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const load = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setError(null);
        try {
            const [k, p] = await Promise.all([
                flFetch('/api/keys'),
                flFetch('/api/keys/providers')
            ]);
            setKeys(k);
            setProviders(p.providers);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }, [
        flFetch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void load();
    }, [
        load,
        refreshKey
    ]);
    const filtered = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let list = keys ?? [];
        if (statusFilter === 'healthy') list = list.filter((k)=>k.enabled && k.status === 'healthy');
        if (statusFilter === 'issues') list = list.filter((k)=>!k.enabled || k.status !== 'healthy' && k.status !== 'unknown');
        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter((k)=>(k.label ?? '').toLowerCase().includes(q) || k.platform.toLowerCase().includes(q) || (k.baseUrl ?? '').toLowerCase().includes(q) || k.models.some((m)=>m.modelId.toLowerCase().includes(q)));
        }
        return list;
    }, [
        keys,
        query,
        statusFilter
    ]);
    const act = async (id, fn)=>{
        setBusyId(id);
        setError(null);
        try {
            await fn();
            await load();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusyId(null);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative min-w-52 flex-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a8]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                placeholder: "Search keys, providers, models…",
                                className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 pl-8 pr-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .SegmentedControl */ .Iz, {
                        value: statusFilter,
                        onChange: setStatusFilter,
                        size: "sm",
                        options: [
                            {
                                value: 'all',
                                label: `All ${keys?.length ?? ''}`
                            },
                            {
                                value: 'healthy',
                                label: 'Healthy'
                            },
                            {
                                value: 'issues',
                                label: 'Issues'
                            }
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: ()=>setRefreshKey((k)=>k + 1),
                        className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white/90",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "h-3.5 w-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>setAddOpen(true),
                        className: "inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#00e5a0] px-3 text-xs font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "h-3.5 w-3.5"
                            }),
                            " Add key"
                        ]
                    })
                ]
            }),
            error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .ErrorNote */ .zJ, {
                children: error
            }) : null,
            keys === null && !error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .InlineLoader */ .FL, {
                children: "Loading keys…"
            }) : null,
            keys !== null && filtered.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .Panel */ .Zk, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .EmptyState */ .pp, {
                    title: keys.length === 0 ? 'No provider keys yet' : 'Nothing matches this filter',
                    hint: keys.length === 0 ? 'Add a free-tier provider key (Google, GLM, Groq…) or point the router at any OpenAI-compatible endpoint — your local Ollama included.' : 'Clear the search or switch the status filter to see the rest.'
                })
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-2",
                children: filtered.map((k)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .Panel */ .Zk, {
                        className: "group transition-colors hover:border-white/[0.1]",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-wrap items-center gap-3 px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .FlStatusDot */ .Ke, {
                                    status: k.enabled ? k.status : 'disabled'
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                                    style: {
                                        backgroundColor: `${(0,_ui__WEBPACK_IMPORTED_MODULE_4__/* .platformColor */ .pG)(k.platform)}1f`,
                                        color: (0,_ui__WEBPACK_IMPORTED_MODULE_4__/* .platformColor */ .pG)(k.platform)
                                    },
                                    children: k.platform
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "truncate text-sm font-medium text-white/90",
                                            children: [
                                                k.label || k.baseUrl || 'Unnamed key',
                                                busyId === k.id ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "ml-2 inline h-3.5 w-3.5 animate-spin text-[#00e5a0]"
                                                }) : null
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#8b95a8]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "font-mono",
                                                    children: k.maskedKey
                                                }),
                                                k.baseUrl ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "truncate font-mono",
                                                    children: k.baseUrl
                                                }) : null,
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        "checked ",
                                                        (0,_api__WEBPACK_IMPORTED_MODULE_3__/* .formatRelativeTime */ .fw)(k.lastCheckedAt)
                                                    ]
                                                }),
                                                k.monthlyUsage && k.monthlyUsage.requests > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        k.monthlyUsage.requests,
                                                        " req \xb7 ",
                                                        k.monthlyUsage.tokens.toLocaleString(),
                                                        " tok this month"
                                                    ]
                                                }) : null
                                            ]
                                        }),
                                        k.lastHealthError ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "mt-1 max-w-2xl truncate text-[11px] text-[#ff9d9d]/80",
                                            title: k.lastHealthError,
                                            children: k.lastHealthError
                                        }) : null
                                    ]
                                }),
                                k.models.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "hidden max-w-56 flex-wrap gap-1 md:flex",
                                    children: [
                                        k.models.slice(0, 3).map((m)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-white/70",
                                                children: m.modelId
                                            }, m.id)),
                                        k.models.length > 3 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-[#8b95a8]",
                                            children: [
                                                "+",
                                                k.models.length - 3
                                            ]
                                        }) : null
                                    ]
                                }) : null,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_switch__WEBPACK_IMPORTED_MODULE_2__/* .Switch */ .d, {
                                            checked: k.enabled,
                                            onCheckedChange: (v)=>void act(k.id, ()=>flFetch(`/api/keys/${k.id}`, {
                                                        method: 'PATCH',
                                                        body: JSON.stringify({
                                                            enabled: v
                                                        })
                                                    })),
                                            "aria-label": "Enable key"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            title: "Run a health check now",
                                            onClick: ()=>void act(k.id, ()=>flFetch(`/api/health/check/${k.id}`, {
                                                        method: 'POST'
                                                    })),
                                            className: "rounded-md px-2 py-1 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-[#00e5a0]",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                className: "h-3.5 w-3.5"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .ConfirmButton */ .ZF, {
                                            title: "Delete key",
                                            onConfirm: ()=>void act(k.id, ()=>flFetch(`/api/keys/${k.id}`, {
                                                        method: 'DELETE'
                                                    })),
                                            confirmLabel: "Delete?",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "h-3.5 w-3.5"
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    }, k.id))
            }),
            addOpen ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AddKeyDialog, {
                session: session,
                providers: providers ?? [],
                onClose: ()=>setAddOpen(false),
                onAdded: ()=>{
                    setAddOpen(false);
                    setRefreshKey((k)=>k + 1);
                }
            }) : null
        ]
    });
}
function AddKeyDialog({ session, providers, onClose, onAdded }) {
    const { flFetch } = session;
    const [pane, setPane] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('catalog');
    const [busy, setBusy] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [notice, setNotice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // catalog pane state
    const [providerQuery, setProviderQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [keyValue, setKeyValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [label, setLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // custom pane state
    const [baseUrl, setBaseUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [customKey, setCustomKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [customLabel, setCustomLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [discovered, setDiscovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [picked, setPicked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [discovering, setDiscovering] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const filteredProviders = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const q = providerQuery.trim().toLowerCase();
        const list = q ? providers.filter((p)=>p.name.toLowerCase().includes(q) || p.platform.includes(q)) : providers;
        return [
            ...list
        ].sort((a, b)=>Number(b.configured) - Number(a.configured) || a.name.localeCompare(b.name));
    }, [
        providers,
        providerQuery
    ]);
    const submitCatalog = async ()=>{
        if (!selected) return;
        setBusy(true);
        setError(null);
        setNotice(null);
        try {
            const res = await flFetch('/api/keys', {
                method: 'POST',
                body: JSON.stringify({
                    platform: selected.platform,
                    ...keyValue.trim() ? {
                        key: keyValue.trim()
                    } : {},
                    ...label.trim() ? {
                        label: label.trim()
                    } : {}
                })
            });
            if (res.notice) setNotice(res.notice);
            onAdded();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
            setBusy(false);
        }
    };
    const discover = async ()=>{
        if (!baseUrl.trim()) return [];
        setDiscovering(true);
        setError(null);
        try {
            const res = await flFetch('/api/keys/custom/discover-models', {
                method: 'POST',
                body: JSON.stringify({
                    baseUrl: baseUrl.trim(),
                    ...customKey.trim() ? {
                        apiKey: customKey.trim()
                    } : {}
                })
            });
            setDiscovered(res.models);
            setPicked(new Set(res.models.filter((m)=>!m.registered).map((m)=>m.id)));
            return res.models;
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
            return [];
        } finally{
            setDiscovering(false);
        }
    };
    const submitCustom = async ()=>{
        setBusy(true);
        setError(null);
        try {
            // Auto-discover when the user didn't — registering an endpoint without
            // models is only valid for a key add on an existing endpoint.
            let models;
            if (discovered && picked.size > 0) {
                models = Array.from(picked);
            } else if (!discovered) {
                const found = await discover();
                if (found.length > 0) models = found.filter((m)=>!m.registered).map((m)=>m.id);
            }
            await flFetch('/api/keys/custom', {
                method: 'POST',
                body: JSON.stringify({
                    baseUrl: baseUrl.trim(),
                    ...customKey.trim() ? {
                        apiKey: customKey.trim()
                    } : {},
                    ...customLabel.trim() ? {
                        label: customLabel.trim()
                    } : {},
                    ...models && models.length > 0 ? {
                        models
                    } : {}
                })
            });
            onAdded();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4",
        role: "dialog",
        "aria-modal": "true",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e14] shadow-2xl",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-3 border-b border-white/[0.06] px-5 py-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                            className: "h-4 w-4 text-[#00e5a0]"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-sm font-semibold text-white/90",
                                    children: "Add a provider key"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-xs text-[#8b95a8]",
                                    children: "Bring your own key — it is stored encrypted and never leaves this machine."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: onClose,
                            className: "rounded-md px-2 py-1 text-sm text-[#8b95a8] hover:bg-white/[0.06] hover:text-white",
                            children: "✕"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "border-b border-white/[0.06] px-5 pt-3",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .SegmentedControl */ .Iz, {
                        value: pane,
                        onChange: (p)=>{
                            setPane(p);
                            setError(null);
                        },
                        options: [
                            {
                                value: 'catalog',
                                label: 'Known provider'
                            },
                            {
                                value: 'custom',
                                label: 'Custom endpoint'
                            }
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "min-h-0 flex-1 overflow-y-auto px-5 py-4",
                    children: [
                        pane === 'catalog' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                            className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a8]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            value: providerQuery,
                                            onChange: (e)=>setProviderQuery(e.target.value),
                                            placeholder: `Search ${providers.length} providers…`,
                                            className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 pl-8 pr-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "max-h-56 overflow-y-auto rounded-lg border border-white/[0.06]",
                                    children: filteredProviders.slice(0, 60).map((p)=>{
                                        const active = selected?.platform === p.platform;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setSelected(p),
                                            className: `flex w-full items-center gap-2 border-b border-white/[0.04] px-3 py-2 text-left text-sm last:border-0 transition-colors ${active ? 'bg-[#00e5a0]/10' : 'hover:bg-white/[0.04]'}`,
                                            children: [
                                                active ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5 text-[#00e5a0]"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5 -rotate-90 text-[#8b95a8]/50"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "flex-1 truncate",
                                                    style: {
                                                        color: active ? '#00e5a0' : undefined
                                                    },
                                                    children: p.name
                                                }),
                                                p.configured ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded bg-[#00e5a0]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#00e5a0]",
                                                    children: "added"
                                                }) : null,
                                                p.keyless ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[#8b95a8]",
                                                    children: "keyless"
                                                }) : null
                                            ]
                                        }, p.platform);
                                    })
                                }),
                                selected ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                selected.name,
                                                selected.keyless ? ' — works without a key; add one anyway if you have a higher tier.' : ' — paste the API key from its console.'
                                            ]
                                        }),
                                        !selected.keyless ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "password",
                                            value: keyValue,
                                            onChange: (e)=>setKeyValue(e.target.value),
                                            placeholder: "API key",
                                            className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 font-mono text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                                        }) : null,
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            value: label,
                                            onChange: (e)=>setLabel(e.target.value),
                                            placeholder: "Label (optional) — e.g. Study account",
                                            className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                                        })
                                    ]
                                }) : null
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-[#8b95a8]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00e5a0]"
                                        }),
                                        "Any OpenAI-compatible endpoint: local Ollama (",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "font-mono",
                                            children: "http://127.0.0.1:11434/v1"
                                        }),
                                        "), vLLM, LM Studio, a relay…"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    value: baseUrl,
                                    onChange: (e)=>{
                                        setBaseUrl(e.target.value);
                                        setDiscovered(null);
                                    },
                                    placeholder: "Base URL — https://host/v1",
                                    className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 font-mono text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    type: "password",
                                    value: customKey,
                                    onChange: (e)=>setCustomKey(e.target.value),
                                    placeholder: "API key (optional for local endpoints)",
                                    className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 font-mono text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    value: customLabel,
                                    onChange: (e)=>setCustomLabel(e.target.value),
                                    placeholder: "Label — e.g. Local Ollama",
                                    className: "h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            disabled: !baseUrl.trim() || discovering,
                                            onClick: discover,
                                            className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#00e5a0]/30 px-3 text-xs font-medium text-[#00e5a0] transition-colors hover:bg-[#00e5a0]/10 disabled:opacity-40",
                                            children: [
                                                discovering ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5 animate-spin"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "h-3.5 w-3.5"
                                                }),
                                                "Discover models"
                                            ]
                                        }),
                                        discovered ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#8b95a8]",
                                            children: [
                                                picked.size,
                                                " of ",
                                                discovered.length,
                                                " selected"
                                            ]
                                        }) : null
                                    ]
                                }),
                                discovered ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "max-h-52 overflow-y-auto rounded-lg border border-white/[0.06]",
                                    children: discovered.map((m)=>{
                                        const on = picked.has(m.id);
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>setPicked((prev)=>{
                                                    const next = new Set(prev);
                                                    if (next.has(m.id)) next.delete(m.id);
                                                    else next.add(m.id);
                                                    return next;
                                                }),
                                            className: `flex w-full items-center gap-2 border-b border-white/[0.04] px-3 py-1.5 text-left text-xs last:border-0 ${on ? 'bg-[#00e5a0]/[0.07]' : 'hover:bg-white/[0.04]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: `flex h-3.5 w-3.5 items-center justify-center rounded border ${on ? 'border-[#00e5a0] bg-[#00e5a0]/20' : 'border-white/20'}`,
                                                    children: on ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                        className: "h-2.5 w-2.5 text-[#00e5a0]"
                                                    }) : null
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "flex-1 truncate font-mono text-white/85",
                                                    children: m.id
                                                }),
                                                m.registered ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[#8b95a8]",
                                                    children: "already added"
                                                }) : null
                                            ]
                                        }, m.id);
                                    })
                                }) : null
                            ]
                        }),
                        error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "mt-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__/* .ErrorNote */ .zJ, {
                                children: error
                            })
                        }) : null,
                        notice ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "mt-3 text-xs text-[#00e5a0]",
                            children: notice
                        }) : null
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-end gap-2 border-t border-white/[0.06] px-5 py-3.5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: onClose,
                            className: "rounded-lg px-3 py-1.5 text-xs text-[#8b95a8] hover:bg-white/[0.06] hover:text-white",
                            children: "Cancel"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            disabled: busy || (pane === 'catalog' ? !selected : !baseUrl.trim()),
                            onClick: pane === 'catalog' ? submitCatalog : submitCustom,
                            className: "inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#00e5a0] px-4 text-xs font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85 disabled:opacity-40",
                            children: [
                                busy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Check_ChevronDown_KeyRound_Loader2_Plus_RefreshCw_Search_Server_Trash2_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                    className: "h-3.5 w-3.5 animate-spin"
                                }) : null,
                                pane === 'catalog' ? 'Add key' : 'Register endpoint'
                            ]
                        })
                    ]
                })
            ]
        })
    });
}


/***/ })

}]);