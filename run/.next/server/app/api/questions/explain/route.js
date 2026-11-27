"use strict";
(() => {
var exports = {};
exports.id = 1529;
exports.ids = [1529];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 67888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K5: () => (/* binding */ parseExplanationsJson),
/* harmony export */   O0: () => (/* binding */ pendingBatchIdxs),
/* harmony export */   P9: () => (/* binding */ markdownToSafeHtml),
/* harmony export */   hX: () => (/* binding */ EXPLAIN_MAX_QUESTION_IDS),
/* harmony export */   lX: () => (/* binding */ explainSystemPrompt),
/* harmony export */   ms: () => (/* binding */ buildExplainPrompt),
/* harmony export */   un: () => (/* binding */ planBatches)
/* harmony export */ });
/* unused harmony exports EXPLAIN_BATCH_SIZE, MIN_EXPLANATION_CHARS, MIN_DISTRACTOR_CHARS */
/**
 * Explanation generation planning — pure functions, no DB / no request.
 *
 * Shared by /api/questions/explain (the batch generator). Everything here is
 * deterministic so a resumable job can re-derive its batch plan at any time
 * from the frozen question-id list and trust that batch #k is the SAME
 * slice it was before a pause/restart.
 *
 * ── QUALITY CONTRACT (the anti-"too simple" spec) ──
 * A generated explanation must be a TEACHING artifact, not a one-liner:
 *   1. Why the keyed answer is correct — mechanism / pathophysiology /
 *      pharmacology reasoning, 3-5 sentences.
 *   2. Why every other option is wrong — one bullet per distractor.
 *   3. Key pearls — 2-3 high-yield exam takeaways.
 *   4. One-line takeaway — the sentence to remember in the exam hall.
 * Explanations are requested as MARKDOWN (models are far more reliable at
 * markdown than raw HTML) and converted to sanitized HTML before storage —
 * QuestionCard renders the field via .medq-html-preview, which styles
 * p / strong / em / ul / li natively.
 *
 * The minimum length floor (MIN_EXPLANATION_CHARS) is a hard validation
 * gate: anything thinner is treated as a FAILED generation for that
 * question (not written, retried later) — the generator may never persist
 * a shallow wall of text again.
 */ // ── Tuning constants ──
/** Questions per LLM call. Explanations are LONG (≈500 words each) — a big
 *  batch would blow the provider's output-token limit and get truncated
 *  mid-JSON, silently losing questions. 3 rich explanations ≈ 1.5k words
 *  of JSON, comfortably inside limits. */ const EXPLAIN_BATCH_SIZE = 3;
/** Hard cap on the frozen target list (memory + sanity). */ const EXPLAIN_MAX_QUESTION_IDS = 2000;
/** Minimum explanation length (markdown source, before HTML conversion).
 *  A real "why correct + why others wrong + pearls + takeaway" explanation
 *  cannot be shorter than this — the floor exists to REJECT thin output,
 *  not to invite it. */ const MIN_EXPLANATION_CHARS = 400;
/** Same floor for the distractor analysis (per-question total). */ const MIN_DISTRACTOR_CHARS = 120;
// ── Batch planning (deterministic) ──
/** Deterministic batch plan: batch #k = ids.slice(k*B, (k+1)*B). */ function planBatches(ids) {
    const batches = [];
    for(let i = 0; i < ids.length; i += EXPLAIN_BATCH_SIZE){
        batches.push(ids.slice(i, i + EXPLAIN_BATCH_SIZE));
    }
    return batches;
}
/** Indices of batches that have NOT settled yet (chunkResults[i] === null). */ function pendingBatchIdxs(results) {
    const pending = [];
    for(let i = 0; i < results.length; i++){
        if (results[i] == null) pending.push(i);
    }
    return pending;
}
// ── Prompts (the quality spec lives here) ──
function explainSystemPrompt() {
    return [
        'You are a senior medical educator who writes board-exam teaching explanations for medical students.',
        'You are given questions WITH their correct answers; your job is to write the kind of rich, structured explanation a top-rated lecturer would give after a student asks "why is that the answer?".',
        '',
        'STRICT OUTPUT CONTRACT: respond with ONLY a JSON array — one object per question, no markdown fences, no commentary before or after. Each object has EXACTLY these keys:',
        '{"id": string (copy the id EXACTLY as given), "explanation": string, "distractorAnalysis": string, "clinicalPearl": string, "mnemonic": string}',
        '',
        'The "explanation" field MUST be markdown with EXACTLY this structure:',
        '1. A paragraph beginning with the bold label **Why {answer} is correct:** followed by 3-5 sentences of genuine mechanistic reasoning — the pathophysiology, pharmacology, or clinical logic that makes this answer RIGHT. Name the specific mechanism, receptor, pathway, organism, or diagnostic step; never just restate the answer.',
        '2. A section beginning with the bold label **Why the other options are wrong:** containing one bullet per remaining option (format: "- **{option text}:** reason it is wrong"). Each bullet gives the specific reason — the wrong mechanism, the wrong clinical scenario, or the classic trap — in 1-2 sentences.',
        '3. A section beginning with the bold label **Key pearls:** with 2-3 bullets of high-yield, exam-relevant takeaways (associations, thresholds, classic presentations, discriminating features).',
        '4. A final paragraph beginning with the bold label **One-line takeaway:** containing ONE memorable sentence that would let a student answer this question (and its variants) correctly forever.',
        '',
        'The "distractorAnalysis" field: a shorter markdown bullet list, one bullet per wrong option ("- **{option}:** one-sentence reason it is wrong") — a quick-scan version of section 2.',
        'The "clinicalPearl" field: 1-2 sentences of memorable clinical wisdom about the underlying topic (not the question).',
        'The "mnemonic" field: a genuinely useful mnemonic ONLY if one naturally fits; otherwise exactly "".',
        '',
        'QUALITY RULES:',
        '- Total explanation length: 350-600 words. Never write a thin or generic explanation.',
        '- Be specific: drug mechanisms, receptor subtypes, enzyme names, diagnostic criteria, lab values, classic associations.',
        '- The labels **Why {answer} is correct:**, **Why the other options are wrong:**, **Key pearls:** and **One-line takeaway:** must appear literally (bolded with **) in every explanation.',
        '- For true/false and short-answer questions: skip section 2\'s per-option bullets; instead include a paragraph labeled **Why the other answer would be wrong:** arguing the incorrect side.',
        '- Never invent facts that contradict the question. Never change the answer.',
        '- Every id in your output array must match one of the given question ids exactly.'
    ].join('\n');
}
function buildExplainPrompt(questions) {
    const blocks = questions.map((q, i)=>{
        const optionLines = q.type === 'mcq' && q.options.length > 0 ? q.options.map((o, k)=>`   ${String.fromCharCode(65 + k)}. ${o}`).join('\n') : '   (no options)';
        return [
            `QUESTION ${i + 1} (id: ${q.id})`,
            `Type: ${q.type}`,
            `Stem: ${q.text}`,
            `Options:`,
            optionLines,
            `Correct answer: ${q.answer}`
        ].join('\n');
    });
    return [
        'Write complete teaching explanations for each of the following questions. The correct answer is given — do not change it; explain it.',
        '',
        ...blocks,
        '',
        `Respond with ONLY the JSON array (${questions.length} object${questions.length === 1 ? '' : 's'}), each object shaped exactly as the system prompt requires. Copy each "id" verbatim.`
    ].join('\n');
}
// ── Markdown → sanitized HTML ──
/**
 * Convert the model's markdown explanation to SAFE HTML for storage.
 *
 * The QuestionCard renders the explanation field via
 * dangerouslySetInnerHTML + .medq-html-preview — so the stored HTML must be
 * fully sanitized: every raw <, >, & is escaped FIRST, then a strict
 * whitelist of tags is re-introduced from markdown syntax. The model is
 * never trusted to emit HTML directly.
 *
 * Supported markdown: **bold**, *italic* / _italic_, `code`,
 * "- " / "* " bullets, "1. " numbered lists, "#### heading" → bold
 * paragraph, blank-line paragraphs, single newlines → <br>.
 */ function markdownToSafeHtml(md) {
    const escaped = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const lines = escaped.split(/\r?\n/);
    const out = [];
    let listType = null;
    const closeList = ()=>{
        if (listType) {
            out.push(`</${listType}>`);
            listType = null;
        }
    };
    const inline = (s)=>s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>').replace(/(^|[\s(])_([^_\n]+)_/g, '$1<em>$2</em>').replace(/`([^`\n]+)`/g, '<code>$1</code>');
    for (const rawLine of lines){
        const line = rawLine.trim();
        if (line === '') {
            closeList();
            continue;
        }
        // Headings → bold paragraph (styled by .medq-html-preview)
        const heading = line.match(/^#{1,6}\s+(.*)$/);
        if (heading) {
            closeList();
            out.push(`<p><strong>${inline(heading[1])}</strong></p>`);
            continue;
        }
        // Bulleted list item
        const bullet = line.match(/^[-*•]\s+(.*)$/);
        if (bullet) {
            if (listType !== 'ul') {
                closeList();
                out.push('<ul>');
                listType = 'ul';
            }
            out.push(`<li>${inline(bullet[1])}</li>`);
            continue;
        }
        // Numbered list item
        const numbered = line.match(/^\d+[.)]\s+(.*)$/);
        if (numbered) {
            if (listType !== 'ol') {
                closeList();
                out.push('<ol>');
                listType = 'ol';
            }
            out.push(`<li>${inline(numbered[1])}</li>`);
            continue;
        }
        // Paragraph line
        closeList();
        out.push(`<p>${inline(line)}</p>`);
    }
    closeList();
    return out.join('\n');
}
// ── Response parsing (tolerant of LLM quirks) ──
function stripFences(raw) {
    let s = raw.trim();
    const fence = s.match(/```(?:json|JSON)?\s*([\s\S]*?)```/);
    if (fence) s = fence[1].trim();
    const firstBracket = s.indexOf('[');
    const lastBracket = s.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket > firstBracket) {
        s = s.slice(firstBracket, lastBracket + 1);
    }
    return s;
}
/**
 * Salvage complete objects out of a TRUNCATED JSON array: scan for top-level
 * `{...}` objects (brace-depth + string-aware) and parse each individually.
 * A response cut mid-array by an output-token limit still yields every
 * COMPLETE object before the cut — questions are never lost to truncation.
 */ function salvageObjects(cleaned) {
    const items = [];
    let depth = 0;
    let start = -1;
    let inString = false;
    let escape = false;
    for(let i = 0; i < cleaned.length; i++){
        const ch = cleaned[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (ch === '\\') {
            escape = true;
            continue;
        }
        if (ch === '"') {
            inString = !inString;
            continue;
        }
        if (inString) continue;
        if (ch === '{') {
            if (depth === 0) start = i;
            depth++;
        } else if (ch === '}') {
            if (depth > 0) {
                depth--;
                if (depth === 0 && start >= 0) {
                    const candidate = cleaned.slice(start, i + 1);
                    try {
                        items.push(JSON.parse(candidate));
                    } catch  {
                        try {
                            // repair quirks inside the single object (trailing commas)
                            const fixed = candidate.replace(/,\s*([}\]])/g, '$1');
                            items.push(JSON.parse(fixed));
                        } catch  {}
                    }
                }
            }
        }
    }
    return items;
}
/** Heuristic: a string of the same character repeated (LLM degeneration). */ function isGarbage(s) {
    if (!s) return true;
    const stripped = s.replace(/\s+/g, '');
    if (stripped.length === 0) return true;
    const first = stripped[0];
    return stripped.split('').every((c)=>c === first) && stripped.length >= 20;
}
/** Substance length: markdown stripped of formatting noise. */ function substanceLength(s) {
    return s.replace(/[*_`#>-]/g, '').replace(/\s+/g, ' ').trim().length;
}
function normalizeExplanationItem(item, requestedIds) {
    if (!item || typeof item !== 'object') return null;
    const q = item;
    const id = typeof q.id === 'string' ? q.id.trim() : '';
    if (!id || !requestedIds.has(id)) return null;
    const explanation = typeof q.explanation === 'string' ? q.explanation.trim() : '';
    if (explanation.length < MIN_EXPLANATION_CHARS || substanceLength(explanation) < Math.floor(MIN_EXPLANATION_CHARS * 0.7) || isGarbage(explanation)) {
        // Too thin / degenerate — treat as "not generated" so the batch can retry.
        return null;
    }
    const distractorAnalysis = typeof q.distractorAnalysis === 'string' ? q.distractorAnalysis.trim() : '';
    const clinicalPearl = typeof q.clinicalPearl === 'string' ? q.clinicalPearl.trim() : '';
    const mnemonic = typeof q.mnemonic === 'string' ? q.mnemonic.trim() : '';
    return {
        id,
        explanation,
        distractorAnalysis: distractorAnalysis.length >= MIN_DISTRACTOR_CHARS && !isGarbage(distractorAnalysis) ? distractorAnalysis : '',
        clinicalPearl: clinicalPearl && !isGarbage(clinicalPearl) ? clinicalPearl : '',
        mnemonic: mnemonic && !isGarbage(mnemonic) ? mnemonic : ''
    };
}
/**
 * Parse the model's explanation JSON — tolerant of fences, prose, trailing
 * commas and mid-array truncation. Items whose id wasn't requested, or whose
 * explanation fails the QUALITY FLOOR, are dropped (the batch retries them).
 */ async function parseExplanationsJson(raw, requestedIds) {
    const cleaned = stripFences(raw);
    const allowed = new Set(requestedIds);
    let candidates = [];
    if (cleaned) {
        try {
            const parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed)) candidates = parsed;
        } catch  {
            try {
                const { jsonrepair } = await Promise.all(/* import() */[__webpack_require__.e(3381), __webpack_require__.e(8899)]).then(__webpack_require__.bind(__webpack_require__, 298899));
                const repaired = await jsonrepair(cleaned);
                const parsed = JSON.parse(repaired);
                if (Array.isArray(parsed)) candidates = parsed;
            } catch  {
                candidates = salvageObjects(cleaned);
            }
        }
    }
    // First-seen id wins; quality floor enforced per item.
    const byId = new Map();
    for (const candidate of candidates){
        const item = normalizeExplanationItem(candidate, allowed);
        if (item && !byId.has(item.id)) byId.set(item.id, item);
    }
    return {
        items: [
            ...byId.values()
        ],
        parseFail: cleaned.length > 0 && byId.size === 0
    };
}


/***/ }),

/***/ 79868:
/***/ ((module) => {

module.exports = require("node:sqlite");

/***/ }),

/***/ 87997:
/***/ ((module) => {

module.exports = require("node:timers");

/***/ }),

/***/ 105868:
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
        page: "/api/questions/explain/route",
        pathname: "/api/questions/explain",
        filename: "route",
        bundlePath: "app/api/questions/explain/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/questions/explain/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(601773),
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
    let srcPage = "/api/questions/explain/route";
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

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 134589:
/***/ ((module) => {

module.exports = require("node:assert");

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

/***/ 176760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 192280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "I", ({
    enumerable: true,
    get: function() {
        return sendResponse;
    }
}));
const _helpers = __webpack_require__(228208);
const _pipereadable = __webpack_require__(447617);
const _utils = __webpack_require__(662018);
async function sendResponse(req, res, response, waitUntil) {
    if (// The type check here ensures that `req` is correctly typed, and the
    // environment variable check provides dead code elimination.
     true && (0, _helpers.isNodeNextResponse)(res)) {
        var // Copy over the response headers.
        _response_headers;
        // Copy over the response status.
        res.statusCode = response.status;
        res.statusMessage = response.statusText;
        // TODO: this is not spec-compliant behavior and we should not restrict
        // headers that are allowed to appear many times.
        //
        // See:
        // https://github.com/vercel/next.js/pull/70127
        const headersWithMultipleValuesAllowed = [
            // can add more headers to this list if needed
            'set-cookie',
            'www-authenticate',
            'proxy-authenticate',
            'vary'
        ];
        (_response_headers = response.headers) == null ? void 0 : _response_headers.forEach((value, name)=>{
            // `x-middleware-set-cookie` is an internal header not needed for the response
            if (name.toLowerCase() === 'x-middleware-set-cookie') {
                return;
            }
            // The append handling is special cased for `set-cookie`.
            if (name.toLowerCase() === 'set-cookie') {
                // TODO: (wyattjoh) replace with native response iteration when we can upgrade undici
                for (const cookie of (0, _utils.splitCookiesString)(value)){
                    res.appendHeader(name, cookie);
                }
            } else {
                // only append the header if it is either not present in the outbound response
                // or if the header supports multiple values
                const isHeaderPresent = typeof res.getHeader(name) !== 'undefined';
                if (headersWithMultipleValuesAllowed.includes(name.toLowerCase()) || !isHeaderPresent) {
                    res.appendHeader(name, value);
                }
            }
        });
        /**
     * The response can't be directly piped to the underlying response. The
     * following is duplicated from the edge runtime handler.
     *
     * See packages/next/server/next-server.ts
     */ const { originalResponse } = res;
        // A response body must not be sent for HEAD requests. See https://httpwg.org/specs/rfc9110.html#HEAD
        if (response.body && req.method !== 'HEAD') {
            await (0, _pipereadable.pipeToNodeResponse)(response.body, originalResponse, waitUntil);
        } else {
            originalResponse.end();
        }
    }
}

//# sourceMappingURL=send-response.js.map

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

/***/ 319225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (false) {} else {
    if (false) {} else {
        if (false) {} else {
            if (false) {} else {
                module.exports = __webpack_require__(744870);
            }
        }
    }
}

//# sourceMappingURL=module.compiled.js.map

/***/ }),

/***/ 321820:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 337540:
/***/ ((module) => {

module.exports = require("node:console");

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

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

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

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 541692:
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ 541792:
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ 601773:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DELETE: () => (/* binding */ DELETE),
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(960736);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(362768);
/* harmony import */ var _lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(67888);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






/**
 * POST   /api/questions/explain  → { jobId, total }   (background job)
 * GET    /api/questions/explain?jobId=…               (poll / fast-resume)
 * GET    /api/questions/explain                       ({missing,total} — confirm-step data)
 * DELETE /api/questions/explain?jobId=…               (discard finished job)
 *
 * Batch AI explanation generator — writes RICH, structured teaching
 * explanations (see src/lib/explanation-plan.ts for the quality contract)
 * onto Question rows that lack them (or regenerate them with overwrite).
 *
 * ── RESUMABLE MULTI-PASS (the architecture that never loses work) ──
 * The target question-id list is FROZEN in the job row at creation. Batches
 * are deterministic slices of that list. As each batch settles, its result
 * ({explained: [ids]}) is persisted into the row's chunkResults — so:
 *   • every write is durable the moment it happens (partial progress is
 *     real progress — refreshing the bank shows explained questions mid-job)
 *   • a job interrupted by rate limits, a server restart, or the pass
 *     deadline PAUSES instead of failing: status stays "processing", the
 *     heartbeat stops, and the next GET poll (after FAST_RESUME_MS) claims
 *     the row at the DB level and re-kicks a NEW PASS over only the
 *     still-pending batches
 *   • after MAX_PASSES the job settles HONESTLY from the live database
 *     (written / failed counted from the Question rows themselves, never
 *     from in-memory counters)
 *
 * ── PROVIDER STACK ──
 * Primary AND fallback: both go through callChat forced via x-model
 * = medq-router:auto, which routes through the in-process FreeLLM API
 * (the MedQ AI Router) — same surface the MedQ assistant uses. BYOK
 * multi-endpoint failover is included (see lib/ai/unified-llm.ts). The
 * fallback is gated by a global admission gate (`__qExplainRouterGate`)
 * so concurrent batches share one budget and don't manufacture a 429
 * storm against the upstream provider. A circuit breaker skips a
 * repeatedly-failing primary for the rest of a pass; a cross-pass latch
 * marks it dead for the job.
 */ // ── Tuning constants ──
const PRIMARY_TIMEOUT_MS = 120000;
const FALLBACK_TIMEOUT_MS = 180000;
/** Two batches in flight — explanations are long outputs; more parallelism
 *  multiplies rate-limit pressure for little wall-time gain. */ const BATCH_CONCURRENCY = 2;
/** After this many CONSECUTIVE primary failures, the rest of the pass goes
 *  straight to the router fallback. */ const PRIMARY_BREAKER_THRESHOLD = 2;
/** Total primary failures across passes that latches primaryDead for the
 *  whole job (it's not coming back — stop burning 2-minute timeouts). */ const PRIMARY_LATCH_FAILURES = 4;
const ZAI_MAX_ATTEMPTS = 5;
const ZAI_RETRY_BASE_MS = 6000;
/** A settled-but-paused job (no heartbeat) is re-kicked by the next poll
 *  after this long — fast enough to feel automatic, slow enough to give a
 *  rate-limited gateway a real cool-down. */ const FAST_RESUME_MS = 90000;
/** Heartbeat while running (bumps updatedAt so the resume check leaves
 *  LIVE jobs alone). */ const HEARTBEAT_MS = 30000;
/** Finished rows stay retrievable this long, then POST-side cleanup drops them. */ const JOB_TTL_MS = 24 * 60 * 60000;
/** ONE explanation job on the whole server at a time (shared AI budget). */ const MAX_RUNNING_GLOBAL = 1;
/** Memory guard. */ const MAX_TOTAL_JOBS = 20;
/** Passes before honest settlement (each pass = one sweep + retry round). */ const MAX_PASSES = 6;
/** A job whose startedAt predates this AND isn't live has survived too many
 *  failed resumes — fail it honestly instead of resume-looping forever. */ const ZOMBIE_FAIL_MS = 60 * 60000;
/** Live runners in THIS process (globalThis so dev HMR keeps it). */ const LIVE = globalThis.__qExplainLive ?? (globalThis.__qExplainLive = new Set());
/** Serialized chunkResults persistence per job — two workers settling
 *  batches concurrently must not read-modify-write the row out of order. */ const CHAINS = globalThis.__qExplainChains ?? (globalThis.__qExplainChains = new Map());
function sleep(ms) {
    return new Promise((r)=>setTimeout(r, ms));
}
function isRateLimitError(err) {
    const msg = err instanceof Error ? err.message : String(err);
    return /\b429\b|too many requests|rate.?limit/i.test(msg);
}
function isNoProviderError(err) {
    const msg = err instanceof Error ? err.message : String(err);
    return /no model could be resolved|no provider|setup_providers/i.test(msg);
}
// ── FreeLLM AI Router fallback ──
//
// The fallback uses callChat forced through the MedQ AI Router
// (medq-router:auto) so it goes through the in-process FreeLLM API —
// matching the MedQ assistant. We build a synthetic NextRequest with an
// x-model header so resolveModelFromRequest picks medq-router:auto
// regardless of the user's configured default. The original primary call
// above already routes through callChat (so BYOK / DEFAULT_MODEL users
// hit FreeLLM when their default is medq-router:auto), but the fallback
// is the safety net when the primary returns thin/garbage output, so it
// must ALSO use FreeLLM — not the bare ZAI SDK — to keep behavior
// consistent with the rest of the app.
/** The model id forced on the fallback. Override via env if needed. */ const FALLBACK_MODEL = process.env.EXPLAIN_FALLBACK_MODEL || 'medq-router:auto';
const ROUTER_MAX_IN_FLIGHT = 2;
const ROUTER_SPACING_FLOOR_MS = 1200;
const ROUTER_SPACING_CEIL_MS = 30000;
const routerGate = globalThis.__qExplainRouterGate ?? (globalThis.__qExplainRouterGate = {
    active: 0,
    spacingMs: ROUTER_SPACING_FLOOR_MS,
    lastStart: 0,
    waiters: []
});
function routerAcquire() {
    return new Promise((resolveReady)=>{
        const start = ()=>{
            routerGate.active++;
            const wait = routerGate.lastStart + routerGate.spacingMs - Date.now();
            const go = ()=>{
                routerGate.lastStart = Date.now();
                resolveReady((success)=>{
                    routerGate.active--;
                    routerGate.spacingMs = success ? Math.max(routerGate.spacingMs * 0.7, ROUTER_SPACING_FLOOR_MS) : Math.min(routerGate.spacingMs * 2, ROUTER_SPACING_CEIL_MS);
                    const next = routerGate.waiters.shift();
                    if (next) next();
                });
            };
            if (wait > 0) sleep(wait).then(go);
            else go();
        };
        if (routerGate.active < ROUTER_MAX_IN_FLIGHT) start();
        else routerGate.waiters.push(start);
    });
}
function withTimeout(p, ms, label) {
    let timer;
    const timeoutP = new Promise((_, reject)=>{
        timer = setTimeout(()=>reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    });
    return Promise.race([
        p,
        timeoutP
    ]).finally(()=>{
        if (timer) clearTimeout(timer);
    });
}
/**
 * Build a synthetic NextRequest with x-model = FALLBACK_MODEL so that
 * resolveModelFromRequest() (called inside callChat) routes the request
 * through the MedQ AI Router regardless of the original request's headers
 * or the user's saved default model. The original request's auth context
 * (cookies) is preserved so BYOK endpoint lookup still works — the
 * medq-router endpoint is a UserApiKey row owned by the signed-in user.
 */ function buildRouterRequest(req) {
    const url = new URL(req.url);
    const init = {
        method: req.method,
        headers: {
            'x-model': FALLBACK_MODEL
        }
    };
    // Forward auth + content-type so user context survives.
    const forwardHeaders = [
        'cookie',
        'authorization',
        'content-type',
        'x-api-key',
        'x-base-url',
        'x-provider-type'
    ];
    for (const h of forwardHeaders){
        const v = req.headers.get(h);
        if (v) init.headers[h] = v;
    }
    return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextRequest(url, init);
}
async function routerExplainOnce(routerReq, system, prompt) {
    const release = await routerAcquire();
    try {
        const text = await (0,_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__.callChat)(routerReq, {
            system,
            prompt,
            stage: 'explain',
            maxOutputTokens: 6000,
            temperature: 0.3,
            maxRetries: 0
        });
        release(true);
        return text || '';
    } catch (err) {
        release(!isRateLimitError(err));
        throw err;
    }
}
async function routerExplain(routerReq, system, prompt) {
    for(let attempt = 1;; attempt++){
        try {
            return await withTimeout(routerExplainOnce(routerReq, system, prompt), FALLBACK_TIMEOUT_MS, `Router fallback (attempt ${attempt})`);
        } catch (err) {
            if (attempt >= ZAI_MAX_ATTEMPTS || !isRateLimitError(err)) throw err;
            const backoff = ZAI_RETRY_BASE_MS * 2 ** (attempt - 1) + Math.floor(Math.random() * 2000);
            console.warn(`[Question Explain] router rate-limited (attempt ${attempt}/${ZAI_MAX_ATTEMPTS}, gate spacing ${Math.round(routerGate.spacingMs / 1000)}s) — retrying in ${Math.round(backoff / 1000)}s`);
            await sleep(backoff);
        }
    }
}
function parseChunkResults(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((entry)=>{
            if (entry && typeof entry === 'object' && Array.isArray(entry.explained)) {
                const ids = entry.explained.filter((id)=>typeof id === 'string');
                return {
                    explained: ids
                };
            }
            return null;
        });
    } catch  {
        return [];
    }
}
/** Persist one batch settlement through the job's serialized write chain. */ function persistBatch(jobId, batchIdx, settled) {
    const run = (async ()=>{
        const row = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.findUnique({
            where: {
                id: jobId
            },
            select: {
                chunkResults: true
            }
        });
        if (!row) return;
        const results = parseChunkResults(row.chunkResults);
        while(results.length <= batchIdx)results.push(null);
        results[batchIdx] = settled;
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
            where: {
                id: jobId
            },
            data: {
                chunkResults: JSON.stringify(results)
            }
        });
    })();
    const prev = CHAINS.get(jobId) ?? Promise.resolve();
    const next = prev.then(()=>run, ()=>run);
    CHAINS.set(jobId, next.catch(()=>{}));
    return next;
}
function bumpProgress(jobId, done, total) {
    return _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
        where: {
            id: jobId
        },
        data: {
            progressDone: done,
            progressTotal: total
        }
    }).catch(()=>{});
}
// ── The batch worker ──
/** Load the still-explainable questions for a batch (resume-safe: deleted
 *  questions and — without overwrite — already-explained ones are skipped). */ async function loadBatchQuestions(ids, overwrite) {
    const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.findMany({
        where: {
            id: {
                in: ids
            }
        },
        select: {
            id: true,
            text: true,
            type: true,
            options: true,
            answer: true,
            explanation: true
        }
    });
    const byId = new Map(rows.map((r)=>[
            r.id,
            r
        ]));
    const out = [];
    for (const id of ids){
        const row = byId.get(id);
        if (!row) continue; // deleted since the plan froze — skip honestly
        if (!overwrite && row.explanation && row.explanation.trim() !== '') continue; // explained meanwhile
        let options = [];
        try {
            const parsed = JSON.parse(row.options ?? '[]');
            if (Array.isArray(parsed)) options = parsed.map(String);
        } catch  {}
        out.push({
            id: row.id,
            text: row.text,
            type: row.type,
            options,
            answer: row.answer
        });
    }
    return out;
}
/** Write one explanation item. Idempotent unless the job runs overwrite. */ async function writeExplanation(item, overwrite) {
    const data = {
        explanation: (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .markdownToSafeHtml */ .P9)(item.explanation),
        ...item.distractorAnalysis ? {
            distractorAnalysis: (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .markdownToSafeHtml */ .P9)(item.distractorAnalysis)
        } : {},
        ...item.clinicalPearl ? {
            clinicalPearl: (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .markdownToSafeHtml */ .P9)(item.clinicalPearl)
        } : {},
        ...item.mnemonic ? {
            mnemonic: (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .markdownToSafeHtml */ .P9)(item.mnemonic)
        } : {}
    };
    // Never clobber an existing explanation unless the job explicitly regenerates.
    // (`explanation` is non-nullable with default '' — empty string = missing.)
    const where = overwrite ? {
        id: item.id
    } : {
        id: item.id,
        explanation: ''
    };
    const res = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.updateMany({
        where,
        data
    });
    return res.count > 0;
}
/**
 * Explain ONE batch: primary callChat → quality-validate → write; on
 * failure (or zero valid items) the ZAI fallback gets a shot. Returns the
 * ids actually written, or null when the batch remains unexplained (retry
 * round / next pass).
 */ async function explainBatch(req, ids, overwrite, breaker, forceFallback) {
    const questions = await loadBatchQuestions(ids, overwrite);
    if (questions.length === 0) return {
        explained: []
    }; // nothing to do — settled
    const system = (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .explainSystemPrompt */ .lX)();
    const prompt = (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .buildExplainPrompt */ .ms)(questions);
    const requestedIds = questions.map((q)=>q.id);
    let raw = '';
    let usedPrimary = false;
    if (forceFallback || breaker.skipPrimary()) {
    // skip — straight to fallback
    } else {
        const abort = new AbortController();
        const timer = setTimeout(()=>abort.abort(), PRIMARY_TIMEOUT_MS);
        // Use the router-forced request so the primary ALSO goes through the
        // MedQ AI Router (in-process FreeLLM API), matching the MedQ assistant.
        // This makes every explain call — primary or fallback — hit FreeLLM
        // and show up in the [Proxy] log, regardless of the user's saved
        // default model.
        const routerReq = buildRouterRequest(req);
        try {
            raw = await withTimeout((0,_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_2__.callChat)(routerReq, {
                system,
                prompt,
                stage: 'explain',
                maxOutputTokens: 6000,
                temperature: 0.3,
                maxRetries: 0,
                abortSignal: abort.signal
            }), PRIMARY_TIMEOUT_MS, 'Explanation primary');
            usedPrimary = true;
        } catch (err) {
            breaker.onPrimaryFail();
            console.warn('[Question Explain] primary failed:', err instanceof Error ? err.message : err);
        } finally{
            clearTimeout(timer);
        }
    }
    let parsed = await (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .parseExplanationsJson */ .K5)(raw, requestedIds);
    // Zero valid items (thin/garbage/truncated) → one fallback attempt via
    // the MedQ AI Router (in-process FreeLLM API). Same behavior as the
    // MedQ assistant: route through medq-router:auto so BYOK endpoints
    // (round-robin + failover) get used, and the call shows up in the
    // [Proxy] log. The synthetic request forces x-model=medq-router:auto
    // regardless of the user's configured default model.
    if (parsed.items.length === 0) {
        const routerReq = buildRouterRequest(req);
        console.warn(`[Question Explain] primary produced ${parsed.items.length} valid explanations (${questions.length} asked) — trying router fallback (${FALLBACK_MODEL})`);
        try {
            raw = await routerExplain(routerReq, system, prompt);
            parsed = await (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .parseExplanationsJson */ .K5)(raw, requestedIds);
        } catch (err) {
            console.warn('[Question Explain] router fallback failed:', err instanceof Error ? err.message : err);
        }
    }
    if (usedPrimary && parsed.items.length > 0) breaker.onPrimarySuccess();
    if (parsed.items.length === 0) return null; // batch remains pending
    const written = [];
    for (const item of parsed.items){
        try {
            const ok = await writeExplanation(item, overwrite);
            if (ok) written.push(item.id);
        } catch (err) {
            console.error(`[Question Explain] write failed for ${item.id}:`, err);
        }
    }
    return {
        explained: written
    };
}
function parseMeta(raw) {
    if (!raw) return {};
    try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch  {
        return {};
    }
}
async function runJob(jobId, req) {
    if (LIVE.has(jobId)) return;
    LIVE.add(jobId);
    const row0 = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.findUnique({
        where: {
            id: jobId
        }
    });
    if (!row0 || row0.status === 'done' || row0.status === 'error') {
        LIVE.delete(jobId);
        return;
    }
    const meta = parseMeta(row0.metaJson);
    const overwrite = row0.overwrite;
    let progressDone = 0;
    const heartbeat = setInterval(()=>{
        void _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
            where: {
                id: jobId
            },
            data: {
                progressDone
            }
        }).catch(()=>{});
    }, HEARTBEAT_MS);
    try {
        const frozenIds = (()=>{
            try {
                const parsed = JSON.parse(row0.questionIds);
                return Array.isArray(parsed) ? parsed.filter((id)=>typeof id === 'string') : [];
            } catch  {
                return [];
            }
        })();
        const batches = (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .planBatches */ .un)(frozenIds);
        const chunkResults = parseChunkResults(row0.chunkResults);
        while(chunkResults.length < batches.length)chunkResults.push(null);
        // Each (re)start of the runner = a new PASS with a fresh deadline clock.
        const passNo = (meta.passNo ?? 0) + 1;
        meta.passNo = passNo;
        const wallStart = Date.now();
        const PASS_DEADLINE_MS = 20 * 60000;
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
            where: {
                id: jobId
            },
            data: {
                status: 'processing',
                startedAt: new Date(),
                passCount: passNo,
                progressTotal: batches.length,
                progressDone: chunkResults.filter((r)=>r !== null).length,
                metaJson: JSON.stringify(meta)
            }
        });
        progressDone = chunkResults.filter((r)=>r !== null).length;
        // Round 1 uses the primary (unless the breaker is open); the retry round
        // below flips forceAllFallback to skip the primary entirely (minimum
        // rate-limit pressure).
        let forceAllFallback = false;
        const breaker = {
            skipPrimary: ()=>forceAllFallback || meta.primaryDead === true || (meta.primaryFailures ?? 0) >= PRIMARY_BREAKER_THRESHOLD,
            onPrimaryFail: ()=>{
                meta.primaryFailures = (meta.primaryFailures ?? 0) + 1;
                if ((meta.primaryFailures ?? 0) >= PRIMARY_LATCH_FAILURES) meta.primaryDead = true;
            },
            onPrimarySuccess: ()=>{
                meta.primaryFailures = 0;
            }
        };
        const pending = (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .pendingBatchIdxs */ .O0)(chunkResults);
        console.log(`[Question Explain] job ${jobId}: pass ${passNo}/${MAX_PASSES} — ${pending.length} of ${batches.length} batch(es) pending (${row0.total} questions, overwrite=${overwrite})`);
        // ── Round 1: worker pool over pending batches ──
        let next = 0;
        const worker = async ()=>{
            for(;;){
                const i = pending[next++];
                if (i === undefined) return;
                if (Date.now() - wallStart > PASS_DEADLINE_MS) return; // pause, don't drop
                try {
                    const settled = await explainBatch(req, batches[i], overwrite, breaker, forceAllFallback);
                    if (settled) chunkResults[i] = settled;
                    await persistBatch(jobId, i, settled);
                } catch (err) {
                    console.error(`[Question Explain] batch ${i + 1}/${batches.length} failed:`, err);
                    // No-provider fast fail — the whole job cannot proceed.
                    if (isNoProviderError(err)) throw err;
                } finally{
                    progressDone++;
                    void bumpProgress(jobId, progressDone, batches.length);
                }
            }
        };
        await Promise.all(Array.from({
            length: Math.min(BATCH_CONCURRENCY, Math.max(pending.length, 1))
        }, ()=>worker()));
        // ── Round 2: sequential retry (skip the primary — minimum pressure) ──
        const retryIdx = (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .pendingBatchIdxs */ .O0)(chunkResults);
        if (retryIdx.length > 0) {
            console.warn(`[Question Explain] pass ${passNo} retry round: ${retryIdx.length} batch(es) sequentially`);
            forceAllFallback = true;
            for (const i of retryIdx){
                if (Date.now() - wallStart > PASS_DEADLINE_MS) break;
                try {
                    const settled = await explainBatch(req, batches[i], overwrite, breaker, true);
                    if (settled) chunkResults[i] = settled;
                    await persistBatch(jobId, i, settled);
                } catch (err) {
                    if (isNoProviderError(err)) throw err;
                    console.error(`[Question Explain] retry batch ${i + 1}/${batches.length} failed:`, err);
                }
            }
        }
        // ── Still pending? PAUSE (resumable) or settle ──
        const stillPending = (0,_lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .pendingBatchIdxs */ .O0)(chunkResults);
        if (stillPending.length > 0 && passNo < MAX_PASSES) {
            console.warn(`[Question Explain] job ${jobId} PAUSING after pass ${passNo} — ${stillPending.length} batch(es) pending; resumable on the next poll`);
            await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
                where: {
                    id: jobId
                },
                data: {
                    metaJson: JSON.stringify(meta),
                    progressDone,
                    progressTotal: batches.length
                }
            });
            return; // row stays "processing"; no heartbeat → stale → resume
        }
        // ── Settle honestly from the live DB ──
        const settled = await settleJob(jobId, frozenIds);
        console.log(`[Question Explain] job ${jobId} settled: written=${settled.written} failed=${settled.failed}` + `${stillPending.length > 0 ? ` (${stillPending.length} batch(es) never completed)` : ''}`);
    } catch (err) {
        console.error('[Question Explain] job crashed:', err);
        const message = isNoProviderError(err) ? 'No AI provider is configured. Add your API key under Settings → AI Providers (or set DEFAULT_MODEL / run a local Ollama), then try again.' : 'Explanation generation failed unexpectedly. Please try again — already-written explanations are kept.';
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
            where: {
                id: jobId
            },
            data: {
                status: 'error',
                error: message,
                finishedAt: new Date()
            }
        }).catch(()=>{});
    } finally{
        clearInterval(heartbeat);
        LIVE.delete(jobId);
        CHAINS.delete(jobId);
    }
}
/** Final settlement — counted from what THIS job actually wrote (the
 *  persisted chunkResults), never from in-memory counters. */ async function settleJob(jobId, frozenIds) {
    const row = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.findUnique({
        where: {
            id: jobId
        },
        select: {
            chunkResults: true
        }
    });
    const chunkResults = parseChunkResults(row?.chunkResults);
    const writtenIds = new Set();
    for (const settled of chunkResults){
        for (const id of settled?.explained ?? [])writtenIds.add(id);
    }
    // Cross-check against the live DB: a written id must still exist with a
    // non-empty explanation (guards against a later manual wipe).
    const confirmed = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.count({
        where: {
            id: {
                in: [
                    ...writtenIds
                ]
            },
            explanation: {
                not: ''
            }
        }
    });
    const written = confirmed;
    const failed = Math.max(frozenIds.length - written, 0);
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
        where: {
            id: jobId
        },
        data: {
            status: 'done',
            written,
            failed,
            finishedAt: new Date()
        }
    });
    return {
        written,
        failed
    };
}
// ── HTTP surface ──
async function cleanupJobs() {
    const cutoff = new Date(Date.now() - JOB_TTL_MS);
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.deleteMany({
        where: {
            createdAt: {
                lt: cutoff
            }
        }
    }).catch(()=>{});
}
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__/* .resolveUserId */ .n$)();
    if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'User not found'
    }, {
        status: 401
    });
    const body = await req.json().catch(()=>null);
    if (!body || typeof body !== 'object') {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Invalid body'
        }, {
            status: 400
        });
    }
    const bodyRec = body;
    const overwrite = bodyRec.overwrite === true;
    let questionIds = null;
    if (Array.isArray(bodyRec.questionIds)) {
        questionIds = bodyRec.questionIds.filter((id)=>typeof id === 'string' && id.trim() !== '').map((id)=>id.trim()).slice(0, _lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .EXPLAIN_MAX_QUESTION_IDS */ .hX);
        if (questionIds.length === 0) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'questionIds must be a non-empty array'
            }, {
                status: 400
            });
        }
    }
    await cleanupJobs();
    // Zombie sweep: paused jobs whose owner stopped polling get this long
    // before another POST kills them (a paused job could still resume).
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.updateMany({
        where: {
            status: {
                in: [
                    'pending',
                    'processing'
                ]
            },
            updatedAt: {
                lt: new Date(Date.now() - ZOMBIE_FAIL_MS)
            }
        },
        data: {
            status: 'error',
            error: 'Explanation generation was interrupted and never resumed. Please try again — already-written explanations are kept.',
            finishedAt: new Date()
        }
    }).catch(()=>{});
    const running = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.count({
        where: {
            status: {
                in: [
                    'pending',
                    'processing'
                ]
            },
            createdAt: {
                gt: new Date(Date.now() - JOB_TTL_MS)
            }
        }
    });
    if (running >= MAX_RUNNING_GLOBAL) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Another explanation job is still running — wait for it to finish or resume, then try again.'
        }, {
            status: 429
        });
    }
    const total = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.count();
    if (total >= MAX_TOTAL_JOBS) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Too many explanation jobs. Please retry later.'
        }, {
            status: 503
        });
    }
    // ── Freeze the target list ──
    let frozenIds;
    let scope;
    if (questionIds) {
        // Selected mode: only ids that exist AND (without overwrite) still lack
        // an explanation. (explanation is non-nullable, default '' = missing.)
        const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.findMany({
            where: {
                id: {
                    in: questionIds
                },
                ...overwrite ? {} : {
                    explanation: ''
                }
            },
            select: {
                id: true
            }
        });
        const byId = new Set(rows.map((r)=>r.id));
        frozenIds = questionIds.filter((id)=>byId.has(id));
        scope = 'selected';
    } else {
        // Whole-bank mode: every question lacking an explanation (the Question
        // table is a shared pool — jobs are user-scoped, questions are not).
        const rows = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.findMany({
            where: {
                explanation: ''
            },
            select: {
                id: true
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: _lib_explanation_plan__WEBPACK_IMPORTED_MODULE_5__/* .EXPLAIN_MAX_QUESTION_IDS */ .hX
        });
        frozenIds = rows.map((r)=>r.id);
        scope = 'missing';
    }
    if (frozenIds.length === 0) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: overwrite ? 'None of the selected questions exist.' : 'No questions need explanations — every question already has one. 🎉'
        }, {
            status: 400
        });
    }
    const job = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.create({
        data: {
            userId,
            status: 'pending',
            scope,
            overwrite,
            questionIds: JSON.stringify(frozenIds),
            total: frozenIds.length
        }
    });
    void runJob(job.id, req).catch(()=>{});
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        jobId: job.id,
        total: frozenIds.length
    }, {
        status: 202
    });
});
const GET = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__/* .resolveUserId */ .n$)();
    if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'User not found'
    }, {
        status: 401
    });
    const jobId = new URL(req.url).searchParams.get('jobId');
    if (!jobId) {
        // Confirm-step data: how many questions lack an explanation.
        const [missing, total] = await Promise.all([
            _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.count({
                where: {
                    explanation: ''
                }
            }),
            _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.count()
        ]);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            missing,
            total
        });
    }
    let job = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job || job.userId !== userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Explanation job not found — it may have expired.'
        }, {
            status: 404
        });
    }
    if (job.status === 'pending' || job.status === 'processing') {
        // Zombie: started long ago, not live here, and even resumes haven't saved it.
        if (job.startedAt.getTime() < Date.now() - ZOMBIE_FAIL_MS && !LIVE.has(jobId)) {
            await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.update({
                where: {
                    id: jobId
                },
                data: {
                    status: 'error',
                    error: 'This explanation job could not complete — the AI service was unavailable for too long. Already-written explanations are kept; please try again.',
                    finishedAt: new Date()
                }
            }).catch(()=>{});
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                status: 'error',
                error: 'This explanation job could not complete — the AI service was unavailable for too long. Already-written explanations are kept; please try again.'
            });
        }
        // Fast resume: a paused (or restarted) job with no heartbeat gets
        // claimed at the DB level and re-kicked into a new pass.
        const staleBefore = new Date(Date.now() - FAST_RESUME_MS);
        if (job.updatedAt < staleBefore && !LIVE.has(jobId)) {
            const claimed = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.updateMany({
                where: {
                    id: jobId,
                    updatedAt: {
                        lt: staleBefore
                    },
                    status: {
                        in: [
                            'pending',
                            'processing'
                        ]
                    }
                },
                data: {
                    status: 'processing'
                }
            });
            if (claimed.count === 1) {
                console.log(`[Question Explain] resuming paused job ${jobId} into a new pass`);
                void runJob(jobId, req).catch(()=>{});
                job = {
                    ...job,
                    status: 'processing',
                    updatedAt: new Date()
                };
            }
        }
    }
    if (job.status === 'pending' || job.status === 'processing') {
        const chunkResults = parseChunkResults(job.chunkResults);
        const settledBatches = chunkResults.filter((r)=>r !== null).length;
        const writtenSoFar = chunkResults.reduce((acc, r)=>acc + (r ? r.explained.length : 0), 0);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            status: 'running',
            startedAt: job.startedAt.getTime(),
            progress: {
                done: settledBatches,
                total: chunkResults.length || job.progressTotal
            },
            written: writtenSoFar,
            totalQuestions: job.total,
            pass: job.passCount || 1,
            serverUpdatedAt: job.updatedAt.getTime()
        });
    }
    if (job.status === 'done') {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            status: 'done',
            written: job.written ?? 0,
            failed: job.failed ?? 0,
            totalQuestions: job.total
        });
    }
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        status: 'error',
        error: job.error || 'Explanation generation failed'
    });
});
const DELETE = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_3__/* .resolveUserId */ .n$)();
    if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'User not found'
    }, {
        status: 401
    });
    const jobId = new URL(req.url).searchParams.get('jobId');
    if (!jobId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: 'Missing jobId'
    }, {
        status: 400
    });
    const job = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job || job.userId !== userId) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Explanation job not found'
        }, {
            status: 404
        });
    }
    if (job.status === 'pending' || job.status === 'processing') {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Cannot delete a running explanation job — it will pause and resume automatically; let it finish or expire.'
        }, {
            status: 409
        });
    }
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.explanationJob.delete({
        where: {
            id: jobId
        }
    });
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        deleted: true
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ createLogger)
/* harmony export */ });
/**
 * Shared logger used across the app for request tracing and diagnostics.
 *
 * It centralizes log formatting, log-level filtering, and console emission so
 * routes and services can record operational events consistently without
 * duplicating configuration or message formatting logic.
 */ const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
function getMinLevel() {
    const env = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
    return env in LOG_LEVELS ? env : 'info';
}
function isJsonFormat() {
    return process.env.LOG_FORMAT === 'json';
}
function formatLine(level, tag, args) {
    const timestamp = new Date().toISOString();
    const upperLevel = level.toUpperCase();
    const msg = args.map((a)=>a instanceof Error ? a.stack ?? a.message : typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
    if (isJsonFormat()) {
        return JSON.stringify({
            timestamp,
            level: upperLevel,
            tag,
            message: msg
        });
    }
    return `[${timestamp}] [${upperLevel}] [${tag}] ${msg}`;
}
function createLogger(tag) {
    const emit = (level, args)=>{
        if (LOG_LEVELS[level] < LOG_LEVELS[getMinLevel()]) return;
        const line = formatLine(level, tag, args);
        // Console output
        const fn = level === 'debug' ? console.debug : level === 'warn' ? console.warn : level === 'error' ? console.error : console.log;
        fn(line);
    };
    return {
        debug: (...args)=>emit('debug', args),
        info: (...args)=>emit('info', args),
        warn: (...args)=>emit('warn', args),
        error: (...args)=>emit('error', args)
    };
}


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

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 932467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 937067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 977598:
/***/ ((module) => {

module.exports = require("node:crypto");

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
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,859,2035,4007,7909,5566,8262,2901,736], () => (__webpack_exec__(105868)));
module.exports = __webpack_exports__;

})();