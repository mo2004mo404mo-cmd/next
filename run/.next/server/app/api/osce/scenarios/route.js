"use strict";
(() => {
var exports = {};
exports.id = 3088;
exports.ids = [3088];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 55591:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 71553:
/***/ ((module) => {

module.exports = require("node:dns/promises");

/***/ }),

/***/ 74075:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 79748:
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ 79868:
/***/ ((module) => {

module.exports = require("node:sqlite");

/***/ }),

/***/ 87997:
/***/ ((module) => {

module.exports = require("node:timers");

/***/ }),

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 134589:
/***/ ((module) => {

module.exports = require("node:assert");

/***/ }),

/***/ 134631:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 157075:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 164939:
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ 173136:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 173566:
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ 176760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 200261:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 226849:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 257975:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 300643:
/***/ ((module) => {

module.exports = require("node:perf_hooks");

/***/ }),

/***/ 321820:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 337540:
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ 344708:
/***/ ((module) => {

module.exports = require("node:https");

/***/ }),

/***/ 353053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 362768:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FB: () => (/* binding */ withErrorHandler),
/* harmony export */   RK: () => (/* binding */ apiHandler)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth_helpers__WEBPACK_IMPORTED_MODULE_2__]);
_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// ─────────────────────────────────────────────────────────────────────────
// api-handler.ts — composable wrappers for App Router Route Handlers.
//
// This module builds on `withAuth` from auth-helpers.ts and adds:
//
//   1. withErrorHandler()  — try/catch around any handler, logs to the
//      shared logger, returns a clean 500 response on uncaught errors.
//
//   2. apiHandler()        — composes withAuth + withErrorHandler in one
//      call. This is the recommended wrapper for any new route handler
//      that needs authenticated access.
//



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('api');
// ─────────────────────────────────────────────────────────────────────────
// withErrorHandler — wraps any route handler with try/catch + structured log
// ─────────────────────────────────────────────────────────────────────────
function withErrorHandler(handler) {
    return async (req, context)=>{
        // Next.js 16 passes the second arg as { params: Promise<...> }.
        // Older / no-param routes call with just (req) — context is undefined.
        // Resolve to a plain TParams object in all cases.
        let params;
        if (context === undefined) {
            params = {};
        } else if (context instanceof Promise) {
            // Defensive: shouldn't happen with Next.js 16, but covers edge cases.
            params = await context;
        } else if (typeof context === 'object' && context !== null && 'params' in context) {
            // Next.js 16 shape: { params: Promise<TParams> }
            const rawParams = context.params;
            params = rawParams instanceof Promise ? await rawParams : rawParams;
        } else {
            // Already-resolved params object (Next.js 15 or earlier).
            params = context;
        }
        try {
            return await handler(req, {
                params
            });
        } catch (error) {
            // Pull a route tag from the request URL so logs identify the failing route.
            const url = (()=>{
                try {
                    return new URL(req.url).pathname;
                } catch  {
                    return 'unknown';
                }
            })();
            const message = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            log.error(`uncaught error in ${url}: ${message}`, stack ?? '');
            // Don't leak internal error details in production.
            const isProd = "production" === 'production';
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Internal server error',
                ...isProd ? {} : {
                    detail: message
                }
            }, {
                status: 500
            });
        }
    };
}
// ─────────────────────────────────────────────────────────────────────────
// apiHandler — composes withAuth + withErrorHandler
//
//   export const GET = apiHandler(async (req, ctx) => {
//     return NextResponse.json({ id: ctx.userId });
//   }, { requiredRole: 'admin' });
// ─────────────────────────────────────────────────────────────────────────
function apiHandler(handler, options = {}) {
    return withErrorHandler(async (req, ctx)=>{
        // Delegate auth to withAuth-style logic, but inlined so we can preserve
        // the params shape from withErrorHandler.
        // We reuse the existing withAuth impl by calling it and forwarding.
        const wrapped = (0,_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .withAuth */ .ru)(handler, options);
        return wrapped(req, {
            params: ctx.params
        });
    });
}
// Re-export the response helpers from auth-helpers for convenience.


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 368875:
/***/ ((module) => {

module.exports = import("langchain");;

/***/ }),

/***/ 378608:
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),

/***/ 379551:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 399253:
/***/ ((module) => {

module.exports = import("@huggingface/transformers");;

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 478474:
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ 491645:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 517393:
/***/ ((module) => {

module.exports = require("mammoth");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 530714:
/***/ ((module) => {

module.exports = require("node:vm");

/***/ }),

/***/ 541692:
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ 541792:
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ 579646:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 583997:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 594735:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 633925:
/***/ ((module) => {

module.exports = import("unpdf");;

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 673429:
/***/ ((module) => {

module.exports = require("node:util/types");

/***/ }),

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 719771:
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ 731421:
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 775919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 777030:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 781630:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 842482:
/***/ ((module) => {

module.exports = import("sharp");;

/***/ }),

/***/ 848161:
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ 887960:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(362768);
/* harmony import */ var _lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(142564);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__, _lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_3__, _lib_db__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_2__, _lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_3__, _lib_db__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * /api/osce/scenarios — OSCE standardized-patient scenario catalog.
 *
 * GET /api/osce/scenarios
 *   → { scenarios: [{ id, title, system, difficulty, caseType, description }] }
 *
 * POST /api/osce/scenarios
 *   body: { system?, difficulty?, customBrief? }
 *   → { scenario } — generates a NEW scenario via the MedQ AI router:
 *     persona (age, sex, affect, chief complaint), hidden profile (real dx,
 *     key positives the student must elicit, red flags), and a coverage
 *     checklist for scoring. The hidden profile is stored server-side and
 *     NEVER sent to the student client — only /api/osce/turn and /debrief
 *     read it.
 *
 * POST { action: 'start', scenarioId } — clones a catalog scenario into a
 *   new OsceSession row and returns { sessionId, opening } (the patient's
 *   first line, in character).
 */ 




const runtime = 'nodejs';
const maxDuration = 90;
/** Seeded starter catalog (used verbatim when no AI provider is configured). */ const SEED_SCENARIOS = [
    {
        title: 'Chest pain in a 55-year-old smoker',
        system: 'cardiology',
        caseType: 'history',
        difficulty: 'Medium',
        persona: {
            name: 'Mr. Roberts',
            age: 55,
            sex: 'male',
            affect: 'anxious, mildly short of breath',
            chiefComplaint: 'Chest pain for the last 2 hours',
            openingStatement: "Doctor, I've got this crushing pain in my chest… it started about two hours ago while I was watching TV. It goes into my left arm. I feel sick to my stomach."
        },
        hiddenProfile: {
            diagnosis: 'Acute coronary syndrome (STEMI)',
            keyFindings: [
                'Substernal crushing pain radiating to left arm/jaw',
                'Associated diaphoresis and nausea',
                'Exertional angina for the past 2 weeks (prodrome)',
                'Risk factors: 30 pack-years, hypertension, hyperlipidemia'
            ],
            redFlags: [
                'Ongoing pain at rest > 20 min',
                'Diaphoresis',
                'Dyspnea'
            ],
            distractors: [
                'GERD',
                'Costochondritis',
                'Panic attack',
                'Aortic dissection'
            ]
        },
        checklist: [
            'Onset, character, radiation, severity of pain (OPQRST)',
            'Cardiac risk factors (smoking, HTN, lipids, family history)',
            'Screen for dissection red flags (tearing pain, syncope)',
            'Immediate management: ECG within 10 min, aspirin, call for help'
        ]
    },
    {
        title: 'Weight gain and fatigue in a young woman',
        system: 'endocrinology',
        caseType: 'diagnostic',
        difficulty: 'Easy',
        persona: {
            name: 'Ms. Chen',
            age: 28,
            sex: 'female',
            affect: 'tired, a bit down',
            chiefComplaint: 'Gained 8 kg over 6 months, always cold and tired',
            openingStatement: "I've gained a lot of weight even though I eat the same, I'm freezing all the time, and my periods are irregular. I just feel so sluggish."
        },
        hiddenProfile: {
            diagnosis: 'Hypothyroidism (Hashimoto thyroiditis)',
            keyFindings: [
                'Cold intolerance + weight gain + fatigue triad',
                'Irregular menses / menorrhagia',
                'Family history of autoimmune disease (mother: vitiligo)',
                'Dry skin, bradycardia on exam'
            ],
            redFlags: [
                'Pregnancy must be ruled out',
                'Periorbital puffiness / myxedema signs'
            ],
            distractors: [
                'Depression',
                'PCOS',
                'Cushing syndrome'
            ]
        },
        checklist: [
            'Thyroid symptom cluster (cold intolerance, constipation, hair changes)',
            'Menstrual history + pregnancy screen',
            'Autoimmune family history',
            'First-line workup: TSH + free T4, thyroid antibodies'
        ]
    },
    {
        title: 'Fever and stiff neck in a college student',
        system: 'neurology',
        caseType: 'emergency',
        difficulty: 'Hard',
        persona: {
            name: 'Alex',
            age: 21,
            sex: 'male',
            affect: 'confused, photophobic, in pain',
            chiefComplaint: 'Severe headache and fever since last night',
            openingStatement: "My head is killing me — the worst headache of my life. The light hurts my eyes and I threw up twice. I feel burning hot."
        },
        hiddenProfile: {
            diagnosis: 'Bacterial meningitis',
            keyFindings: [
                'Sudden severe headache + fever + vomiting',
                'Photophobia and neck stiffness',
                'Living in a dorm (close-contact exposure)',
                'Cannot flex neck to chest'
            ],
            redFlags: [
                'Altered mental status',
                'Petechial rash (sepsis)',
                'Kernig/Brudzinski signs'
            ],
            distractors: [
                'Migraine',
                'Viral syndrome',
                'Subarachnoid hemorrhage'
            ]
        },
        checklist: [
            'Meningism screen (neck stiffness, photophobia, vomiting)',
            'Mental status assessment',
            'Skin check for petechiae',
            'Urgency: blood cultures + empiric antibiotics BEFORE CT/LP if no focal signs'
        ]
    }
];
/** Catalog GET — scenarios already started as sessions also count. */ const GET = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .withErrorHandler */ .FB)(async ()=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .resolveUserId */ .n$)();
    if (!userId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .unauthorized */ .nc)();
    // List seeded + AI-generated catalog (stored as ClinicalCase rows with
    // caseType osce-*), filtered to what the student can see (no hiddenProfile).
    const aiCases = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.clinicalCase.findMany({
        where: {
            caseType: {
                startsWith: 'osce-'
            }
        },
        select: {
            id: true,
            title: true,
            system: true,
            difficulty: true,
            caseType: true
        },
        take: 20,
        orderBy: {
            createdAt: 'desc'
        }
    }).catch(()=>[]);
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        scenarios: [
            ...SEED_SCENARIOS.map((s, i)=>({
                    id: `seed-${i}`,
                    title: s.title,
                    system: s.system,
                    difficulty: s.difficulty,
                    caseType: s.caseType,
                    description: s.persona.openingStatement.slice(0, 140)
                })),
            ...aiCases.map((c)=>({
                    id: c.id,
                    title: c.title,
                    system: c.system,
                    difficulty: c.difficulty,
                    caseType: c.caseType.replace('osce-', ''),
                    description: ''
                }))
        ]
    });
});
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .resolveUserId */ .n$)();
    if (!userId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .unauthorized */ .nc)();
    const body = await req.json().catch(()=>({}));
    // ── Start a session from a catalog scenario ──
    if (body.action === 'start') {
        const id = body.scenarioId || '';
        let scenario;
        if (id.startsWith('seed-')) {
            scenario = SEED_SCENARIOS[Number(id.slice(5))] ?? SEED_SCENARIOS[0];
        } else {
            const row = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.clinicalCase.findUnique({
                where: {
                    id
                }
            }).catch(()=>null);
            if (!row) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('scenario not found');
            try {
                scenario = JSON.parse(row.stages)[0];
            } catch  {
                return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_1__/* .badRequest */ .li)('scenario data corrupted');
            }
        }
        const session = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.osceSession.create({
            data: {
                userId,
                scenario: JSON.stringify(scenario),
                status: 'active'
            }
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            sessionId: session.id,
            scenario: {
                // Student-visible subset only — hiddenProfile + checklist stay server-side.
                title: scenario.title,
                system: scenario.system,
                caseType: scenario.caseType,
                difficulty: scenario.difficulty,
                persona: scenario.persona
            },
            opening: scenario.persona.openingStatement
        });
    }
    // ── Generate a NEW scenario ──
    const system = typeof body.system === 'string' && body.system.trim() ? body.system.trim().slice(0, 60) : 'general medicine';
    const difficulty = [
        'Easy',
        'Medium',
        'Hard'
    ].includes(String(body.difficulty)) ? String(body.difficulty) : 'Medium';
    const brief = typeof body.customBrief === 'string' ? body.customBrief.trim().slice(0, 500) : '';
    const config = (0,_lib_agent_deep_agent_runtime__WEBPACK_IMPORTED_MODULE_3__/* .resolveMedQAgentConfig */ .b$)();
    if (!config.apiKey) {
        // No provider → fall back to a random seed scenario (still a usable trainer).
        const scenario = SEED_SCENARIOS[Math.floor(Math.random() * SEED_SCENARIOS.length)];
        const session = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.osceSession.create({
            data: {
                userId,
                scenario: JSON.stringify(scenario),
                status: 'active'
            }
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            sessionId: session.id,
            scenario: {
                title: scenario.title,
                system: scenario.system,
                caseType: scenario.caseType,
                difficulty: scenario.difficulty,
                persona: scenario.persona
            },
            opening: scenario.persona.openingStatement,
            generated: false
        });
    }
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), 75000);
    const res = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: config.model,
            temperature: 0.7,
            max_tokens: 1600,
            messages: [
                {
                    role: 'system',
                    content: 'You output only valid JSON.'
                },
                {
                    role: 'user',
                    content: `Design an OSCE standardized-patient scenario for medical students.
System: ${system}. Difficulty: ${difficulty}.${brief ? ` Custom brief: ${brief}` : ''}
Return ONLY:
{"title":"...","system":"...","caseType":"history|diagnostic|counseling|emergency","difficulty":"${difficulty}",
 "persona":{"name":"...","age":0,"sex":"male|female","affect":"...","chiefComplaint":"...","openingStatement":"patient's first line, in character, <= 60 words"},
 "hiddenProfile":{"diagnosis":"...","keyFindings":["..."],"redFlags":["..."],"distractors":["..."]},
 "checklist":["coverage items a strong student must hit, 4-8 items"]}
Clinically realistic; keyFindings are what good questions elicit; redFlags must not be missed; distractors are plausible wrong diagnoses.`
                }
            ]
        }),
        signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: `Scenario LLM failed (${res.status})`
    }, {
        status: 502
    });
    let content = (await res.json().catch(()=>({}))).choices?.[0]?.message?.content || '';
    content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
    let parsed;
    try {
        parsed = JSON.parse(content);
    } catch  {
        parsed = JSON.parse(content.replace(/,\s*([}\]])/g, '$1'));
    }
    const scenario = {
        title: String(parsed.title || `${system} case`).slice(0, 160),
        system: String(parsed.system || system).slice(0, 60),
        caseType: String(parsed.caseType || 'history').slice(0, 30),
        difficulty: String(parsed.difficulty || difficulty).slice(0, 10),
        persona: {
            name: String(parsed.persona?.name || 'Patient').slice(0, 80),
            age: Number(parsed.persona?.age) || 45,
            sex: String(parsed.persona?.sex || 'female').slice(0, 10),
            affect: String(parsed.persona?.affect || 'calm').slice(0, 120),
            chiefComplaint: String(parsed.persona?.chiefComplaint || 'presenting complaint').slice(0, 200),
            openingStatement: String(parsed.persona?.openingStatement || 'Hello, doctor.').slice(0, 400)
        },
        hiddenProfile: {
            diagnosis: String(parsed.hiddenProfile?.diagnosis || 'Undetermined').slice(0, 200),
            keyFindings: (parsed.hiddenProfile?.keyFindings ?? []).slice(0, 8).map(String),
            redFlags: (parsed.hiddenProfile?.redFlags ?? []).slice(0, 6).map(String),
            distractors: (parsed.hiddenProfile?.distractors ?? []).slice(0, 5).map(String)
        },
        checklist: (parsed.checklist ?? []).slice(0, 10).map(String)
    };
    const session = await _lib_db__WEBPACK_IMPORTED_MODULE_4__.db.osceSession.create({
        data: {
            userId,
            scenario: JSON.stringify(scenario),
            status: 'active'
        }
    });
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        sessionId: session.id,
        scenario: {
            title: scenario.title,
            system: scenario.system,
            caseType: scenario.caseType,
            difficulty: scenario.difficulty,
            persona: scenario.persona
        },
        opening: scenario.persona.openingStatement,
        generated: true
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 902381:
/***/ ((module) => {

module.exports = import("z-ai-web-dev-sdk");;

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 912412:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 912680:
/***/ ((module) => {

module.exports = import("@langchain/quickjs");;

/***/ }),

/***/ 927910:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 930963:
/***/ ((module) => {

module.exports = import("langchain/chat_models/universal");;

/***/ }),

/***/ 932467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 936310:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),
/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319225);
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(684006);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8317);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(799373);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(434775);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(524235);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(200261);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(754365);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(590771);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(473461);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(767798);
/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(192280);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(662018);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(445696);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(347929);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(986439);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(137527);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__);

















// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/osce/scenarios/route",
        pathname: "/api/osce/scenarios",
        filename: "route",
        bundlePath: "app/api/osce/scenarios/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/osce/scenarios/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(887960),
    // In Turbopack dev mode, also provide a synchronous per-request getter so
    // server HMR updates are picked up without re-executing the entry chunk.
    // Using require() (synchronous) avoids adding async overhead that would be
    // incorrectly attributed to application-code time in devRequestTiming.
    ... false ? 0 : {}
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        workAsyncStorage,
        workUnitAsyncStorage
    });
}

async function handler(req, res, ctx) {
    if (ctx.requestMeta) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.setRequestMeta)(req, ctx.requestMeta);
    }
    if (routeModule.isDev) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.addRequestMeta)(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());
    }
    let srcPage = "/api/osce/scenarios/route";
    // turbopack doesn't normalize `/index` in the page name
    // so we need to to process dynamic routes properly
    // TODO: fix turbopack providing differing value from webpack
    if (false) {} else if (srcPage === '/index') {
        // we always normalize /index specifically
        srcPage = '/';
    }
    const multiZoneDraftMode = false;
    const prepareResult = await routeModule.prepare(req, res, {
        srcPage,
        multiZoneDraftMode
    });
    if (!prepareResult) {
        res.statusCode = 400;
        res.end('Bad Request');
        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());
        return null;
    }
    const { buildId, deploymentId, params, nextConfig, parsedUrl, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname, clientReferenceManifest, serverActionsManifest } = prepareResult;
    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__.normalizeAppPath)(srcPage);
    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);
    const render404 = async ()=>{
        // TODO: should route-module itself handle rendering the 404
        if (routerServerContext == null ? void 0 : routerServerContext.render404) {
            await routerServerContext.render404(req, res, parsedUrl, false);
        } else {
            res.end('This page could not be found');
        }
        return null;
    };
    if (isIsr && !isDraftMode) {
        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);
        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];
        if (prerenderInfo) {
            if (prerenderInfo.fallback === false && !isPrerendered) {
                if (nextConfig.adapterPath) {
                    return await render404();
                }
                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError();
            }
        }
    }
    let cacheKey = null;
    if (isIsr && !routeModule.isDev && !isDraftMode) {
        cacheKey = resolvedPathname;
        // ensure /index and / is normalized to one key
        cacheKey = cacheKey === '/index' ? '/' : cacheKey;
    }
    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML
    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports
    // dynamic HTML.
    !isIsr;
    // This is a revalidation request if the request is for a static
    // page and it is not being resumed from a postponed render and
    // it is not a dynamic RSC request then it is a revalidation
    // request.
    const isStaticGeneration = isIsr && !supportsDynamicResponse;
    // Before rendering (which initializes component tree modules), we have to
    // set the reference manifests to our global store so Server Action's
    // encryption util can access to them at the top level of the page module.
    if (serverActionsManifest && clientReferenceManifest) {
        (0,next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__.setManifestsSingleton)({
            page: srcPage,
            clientReferenceManifest,
            serverActionsManifest
        });
    }
    const method = req.method || 'GET';
    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();
    const activeSpan = tracer.getActiveScopeSpan();
    const isWrappedByNextServer = Boolean(routerServerContext == null ? void 0 : routerServerContext.isWrappedByNextServer);
    const isMinimalMode = Boolean((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode'));
    const incrementalCache = (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache') || await routeModule.getIncrementalCache(req, nextConfig, prerenderManifest, isMinimalMode);
    incrementalCache == null ? void 0 : incrementalCache.resetRequestCache();
    globalThis.__incrementalCache = incrementalCache;
    const context = {
        params,
        previewProps: prerenderManifest.preview,
        renderOpts: {
            experimental: {
                authInterrupts: Boolean(nextConfig.experimental.authInterrupts),
                useCacheTimeout: nextConfig.experimental.useCacheTimeout
            },
            cacheComponents: Boolean(nextConfig.cacheComponents),
            validationLevel: nextConfig.experimental.instantInsights.validationLevel,
            supportsDynamicResponse,
            incrementalCache,
            hmrRefreshHash: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'hmrRefreshHash'),
            cacheLifeProfiles: nextConfig.cacheLife,
            staticPageGenerationTimeout: nextConfig.staticPageGenerationTimeout,
            waitUntil: ctx.waitUntil,
            onClose: (cb)=>{
                res.on('close', cb);
            },
            onAfterTaskError: undefined,
            onInstrumentationRequestError: (error, _request, errorContext, silenceLog)=>routeModule.onRequestError(req, error, errorContext, silenceLog, routerServerContext)
        },
        sharedContext: {
            buildId,
            deploymentId
        }
    };
    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextRequest(req);
    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextResponse(res);
    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.signalFromNodeResponse)(res));
    const responseGenerator = async ({ previousCacheEntry })=>{
        try {
            if (!isMinimalMode && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {
                res.statusCode = 404;
                // on-demand revalidate always sets this header
                res.setHeader('x-nextjs-cache', 'REVALIDATED');
                res.end('This page could not be found');
                return null;
            }
            const response = await routeModule.handle(nextReq, context);
            req.fetchMetrics = context.renderOpts.fetchMetrics;
            let pendingWaitUntil = context.renderOpts.pendingWaitUntil;
            // Attempt using provided waitUntil if available
            // if it's not we fallback to sendResponse's handling
            if (pendingWaitUntil) {
                if (ctx.waitUntil) {
                    ctx.waitUntil(pendingWaitUntil);
                    pendingWaitUntil = undefined;
                }
            }
            const cacheTags = context.renderOpts.collectedTags;
            // If the request is for a static response, we can cache it so long
            // as it's not edge.
            if (isIsr) {
                const blob = await response.blob();
                // Copy the headers from the response.
                const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.toNodeOutgoingHttpHeaders)(response.headers);
                if (cacheTags) {
                    headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER] = cacheTags;
                }
                if (!headers['content-type'] && blob.type) {
                    headers['content-type'] = blob.type;
                }
                const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;
                const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? // route has a numeric `revalidate` but didn't declare an
                // explicit `expire` (e.g. via `cacheLife`). This mirrors the
                // build-time fallback in `build/index.ts` so cache entries
                // and the response Cache-Control header agree on the route's
                // effective expire. Routes that opt out of revalidation
                // (`revalidate: false`) or that are dynamic (`revalidate: 0`)
                // keep `expire: undefined`.
                revalidate !== false && revalidate > 0 ? nextConfig.expireTime : undefined : context.renderOpts.collectedExpire;
                // Create the cache entry for the response.
                const cacheEntry = {
                    value: {
                        kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE,
                        status: response.status,
                        body: Buffer.from(await blob.arrayBuffer()),
                        headers
                    },
                    cacheControl: {
                        revalidate,
                        expire
                    }
                };
                return cacheEntry;
            } else {
                // send response without caching if not ISR
                await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, response, pendingWaitUntil);
                return null;
            }
        } catch (err) {
            // if this is a background revalidate we need to report
            // the request error here as it won't be bubbled
            if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: srcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            throw err;
        }
    };
    const handleResponse = async (currentSpan, parentSpan)=>{
        try {
            var _cacheEntry_value;
            const cacheEntry = await routeModule.handleResponse({
                req,
                nextConfig,
                cacheKey,
                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
                isFallback: false,
                prerenderManifest,
                isRoutePPREnabled: false,
                isOnDemandRevalidate,
                revalidateOnlyGenerated,
                responseGenerator,
                waitUntil: ctx.waitUntil,
                isMinimalMode
            });
            // we don't create a cacheEntry for ISR
            if (!isIsr) {
                return;
            }
            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE) {
                var _cacheEntry_value1;
                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), "__NEXT_ERROR_CODE", {
                    value: "E701",
                    enumerable: false,
                    configurable: true
                });
            }
            if (!isMinimalMode) {
                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');
            }
            // Draft mode should never be cached
            if (isDraftMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);
            if (!(isMinimalMode && isIsr)) {
                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER);
            }
            // If cache control is already set on the response we don't
            // override it to allow users to customize it via next.config
            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {
                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__.getCacheControlHeader)(cacheEntry.cacheControl));
            }
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, // @ts-expect-error - Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit | null | undefined'.
            new Response(cacheEntry.value.body, {
                headers,
                status: cacheEntry.value.status || 200
            }));
            return;
        } catch (err) {
            if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError)) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: normalizedSrcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            // rethrow so that we can handle serving error page
            // If this is during static generation, throw the error again.
            if (isIsr) throw err;
            // Otherwise, send a 500 response.
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, new Response(null, {
                status: 500
            }));
            return;
        } finally{
            ;
            (()=>{
                if (!currentSpan) {
                    return;
                }
                let statusCode = res.statusCode;
                currentSpan.setAttributes({
                    'http.status_code': statusCode,
                    'next.rsc': false
                });
                if (statusCode && statusCode >= 500) {
                    // For 5xx status codes: SHOULD be set to 'Error' span status.
                    // x-ref: https://opentelemetry.io/docs/specs/semconv/http/http-spans/#status
                    currentSpan.setStatus({
                        code: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanStatusCode.ERROR
                    });
                    // For span status 'Error', SHOULD set 'error.type' attribute.
                    currentSpan.setAttribute('error.type', statusCode.toString());
                }
                const rootSpanAttributes = tracer.getRootSpanAttributes();
                // We were unable to get attributes, probably OTEL is not enabled
                if (!rootSpanAttributes) {
                    return;
                }
                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest) {
                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                    return;
                }
                const route = rootSpanAttributes.get('next.route') || normalizedSrcPage;
                const name = `${method} ${route}`;
                currentSpan.setAttributes({
                    'next.route': route,
                    'http.route': route,
                    'next.span_name': name
                });
                currentSpan.updateName(name);
                // Propagate http.route to the parent span if one exists (e.g.
                // a platform-created HTTP span in adapter deployments).
                if (parentSpan && parentSpan !== currentSpan) {
                    parentSpan.setAttribute('http.route', route);
                    parentSpan.updateName(name);
                }
            })();
        }
    };
    // TODO: activeSpan code path is for when wrapped by
    // next-server can be removed when this is no longer used
    if (isWrappedByNextServer && activeSpan) {
        await handleResponse(activeSpan, undefined);
    } else {
        let parentSpan = tracer.getActiveScopeSpan();
        await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest, {
                spanName: `${method} ${srcPage}`,
                kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,
                attributes: {
                    'http.method': method,
                    'http.target': req.url
                }
            }, (span)=>handleResponse(span, parentSpan)), undefined, !isWrappedByNextServer);
    }
}

//# sourceMappingURL=app-route.js.map


/***/ }),

/***/ 937067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 977598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 979428:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,1890,9611,8093,8713,859,2035,4007,7909,5566,8262,2901,2538,9985,5556,1229,2504,5554,5095], () => (__webpack_exec__(936310)));
module.exports = __webpack_exports__;

})();