"use strict";
exports.id = 7895;
exports.ids = [7895];
exports.modules = {

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

/***/ 387079:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ knowledgeLLM)
/* harmony export */ });
/* unused harmony export knowledgeLLMAvailable */
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/**
 * knowledge/llm.ts — best-effort LLM helper for the knowledge/RAG subsystem.
 *
 * Unlike question-agent (which always has a NextRequest), the knowledge
 * pipeline is called from three contexts:
 *   1. API routes (have a request — x-model / BYOK resolution available)
 *   2. Background ingestion jobs (no request)
 *   3. Deep-agent tools (no request)
 *
 * Resolution order:
 *   request present → callChat (full provider chain: MODEL_ROUTES > x-model >
 *   DEFAULT_MODEL > BYOK > auto-detect)
 *   no request      → auto-detect a provider (env keys / Ollama) once, cache
 *                     the resolved model on globalThis, then callLLM.
 *
 * Every failure degrades to `null` — retrieval enrichment and reranking are
 * accuracy BOOSTERS, never hard dependencies: the pipeline must stay
 * functional with zero LLM access (pure BM25 + local-hash embeddings).
 */ 
const log = (0,_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('KnowledgeLLM');
const runtime = globalThis;
async function resolveAutoModel() {
    if (runtime.__medqKnowledgeModel !== undefined) {
        return runtime.__medqKnowledgeModel ?? null;
    }
    try {
        const { resolveModel } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(426), __webpack_require__.e(7774), __webpack_require__.e(1545), __webpack_require__.e(9567), __webpack_require__.e(4007), __webpack_require__.e(7909), __webpack_require__.e(5566), __webpack_require__.e(8262), __webpack_require__.e(2901)]).then(__webpack_require__.bind(__webpack_require__, 592901));
        const { autoDetectDefaultModel } = await __webpack_require__.e(/* import() */ 8953).then(__webpack_require__.bind(__webpack_require__, 148953));
        const auto = await autoDetectDefaultModel();
        const modelString = `${auto.providerId}:${auto.modelId}`;
        const resolved = await resolveModel({
            modelString,
            stage: 'chat-adapter'
        });
        runtime.__medqKnowledgeModel = {
            model: resolved.model,
            modelString
        };
        return runtime.__medqKnowledgeModel;
    } catch (error) {
        runtime.__medqKnowledgeModel = null;
        log.warn?.(`knowledge LLM auto-detect failed: ${error instanceof Error ? error.message : error}`);
        return null;
    }
}
/**
 * Call an LLM for a knowledge-pipeline task. Returns null on ANY failure —
 * callers must treat LLM enrichment as optional.
 *
 * Chain: request → callChat · no request → auto-detect + callLLM ·
 * final fallback → z-ai-web-dev-sdk chat (managed sandbox provider).
 */ async function knowledgeLLM(options) {
    const { request, system, prompt, maxOutputTokens, temperature } = options;
    const timeoutMs = options.timeoutMs ?? 15000;
    const race = (p)=>Promise.race([
            p,
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('knowledge LLM timeout')), timeoutMs))
        ]);
    try {
        if (request) {
            const { callChat } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(426), __webpack_require__.e(7774), __webpack_require__.e(1545), __webpack_require__.e(9567), __webpack_require__.e(4007), __webpack_require__.e(7909), __webpack_require__.e(5566), __webpack_require__.e(8262), __webpack_require__.e(2901), __webpack_require__.e(736)]).then(__webpack_require__.bind(__webpack_require__, 960736));
            const text = await race(callChat(request, {
                system,
                prompt,
                stage: 'chat-adapter',
                maxOutputTokens,
                temperature
            }));
            if (text && text.trim()) return text;
            return null;
        }
        const resolved = await resolveAutoModel();
        if (resolved) {
            const { callLLM } = await Promise.all(/* import() */[__webpack_require__.e(2393), __webpack_require__.e(8963), __webpack_require__.e(1545), __webpack_require__.e(9567), __webpack_require__.e(7909), __webpack_require__.e(8262), __webpack_require__.e(5351)]).then(__webpack_require__.bind(__webpack_require__, 525351));
            const result = await race(callLLM({
                model: resolved.model,
                ...system ? {
                    system
                } : {},
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                ...maxOutputTokens ? {
                    maxOutputTokens
                } : {},
                ...temperature != null ? {
                    temperature
                } : {}
            }, 'knowledge-rag'));
            const text = result?.text || '';
            if (text.trim()) return text;
        }
        // Final fallback: managed ZAI SDK (works out-of-the-box on this platform).
        return await zaiSdkChat(system, prompt, timeoutMs);
    } catch (error) {
        log.warn?.(`knowledge LLM call failed: ${error instanceof Error ? error.message : error}`);
        // Even on provider errors, try the SDK once before giving up.
        try {
            return await zaiSdkChat(system, prompt, Math.min(timeoutMs, 12000));
        } catch  {
            return null;
        }
    }
}
const sdkZai = globalThis;
/** Direct z-ai-web-dev-sdk chat call — the always-available managed provider.
 *  Retries once after a short backoff: the sandbox gateway occasionally
 *  burst-429s (observed in live E2E), and a 1.5s later attempt usually
 *  passes — turning a failed rerank/enrichment into a delayed success. */ async function zaiSdkChat(system, prompt, timeoutMs) {
    for(let attempt = 0; attempt < 2; attempt++){
        try {
            if (attempt > 0) await new Promise((r)=>setTimeout(r, 1500));
            if (!sdkZai.__medqZaiChat) {
                sdkZai.__medqZaiChat = Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 902381)).then((mod)=>{
                    const ZAI = mod.default;
                    if (!ZAI?.create) throw new Error('z-ai-web-dev-sdk unavailable');
                    return ZAI.create();
                });
                sdkZai.__medqZaiChat.catch(()=>{
                    sdkZai.__medqZaiChat = undefined; // allow retry on next call
                });
            }
            const zai = await sdkZai.__medqZaiChat;
            const completion = await Promise.race([
                zai.chat.completions.create({
                    messages: [
                        ...system ? [
                            {
                                role: 'system',
                                content: system
                            }
                        ] : [],
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    thinking: {
                        type: 'disabled'
                    }
                }),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error('SDK chat timeout')), timeoutMs))
            ]);
            const content = completion.choices?.[0]?.message?.content || '';
            if (content.trim()) return content;
            return null;
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            const retryable = /429|too many|rate|timeout|econn/i.test(msg);
            if (attempt === 0 && retryable) continue;
            return null;
        }
    }
    return null;
}
/** Probe whether the knowledge LLM is usable (auto-detect or SDK path). */ async function knowledgeLLMAvailable() {
    const model = await resolveAutoModel();
    if (model) return true;
    const probe = await zaiSdkChat(undefined, 'Reply with the word OK.', 8000);
    return probe !== null;
}


/***/ }),

/***/ 421946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ emitJobUpdate)
/* harmony export */ });
/**
 * Emit job progress updates to the socket.io service.
 * Called by API routes after updateJob() to push real-time updates to the browser.
 * This is fire-and-forget — errors are logged but don't affect the job.
 */ const SOCKET_SERVICE_URL = (process.env.SOCKET_PROGRESS_URL || '').replace(/\/$/, '');
/**
 * Emit a job update event to the socket service.
 * The socket service will broadcast to connected clients.
 */ function emitJobUpdate(job) {
    if (!SOCKET_SERVICE_URL) return;
    // Fire-and-forget POST to socket service
    const event = job.status === 'completed' ? 'job:completed' : job.status === 'failed' ? 'job:failed' : 'job:progress';
    fetch(`${SOCKET_SERVICE_URL}/emit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event,
            data: job
        })
    }).catch((err)=>{
        // Log but don't throw — socket notification is best-effort
        console.warn('[socket-emit] Failed to emit job update:', err);
    });
}


/***/ }),

/***/ 476149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 561571:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lG: () => (/* binding */ runAgentQuestionGeneration)
/* harmony export */ });
/* unused harmony exports looksLikeRadiologyQuery, toolSearchRadiologyImage, toolFindSound, toolFindModel */
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579646);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(328354);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(960736);
/* harmony import */ var _lib_audio_tts_text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(476149);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(520903);
/* harmony import */ var _ecg_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(643750);
/* harmony import */ var _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(492504);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(122035);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_4__, _lib_db__WEBPACK_IMPORTED_MODULE_5__, _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_7__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_8__]);
([_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_4__, _lib_db__WEBPACK_IMPORTED_MODULE_5__, _knowledge_hybrid__WEBPACK_IMPORTED_MODULE_7__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Agent-Based Question Generation Pipeline
 *
 * Replaces the single-shot /api/generate flow with a multi-agent pipeline
 * where each part of the question is created SEPARATELY:
 *
 *   Stage 1  Plan        — planner agent decides concept + media plan
 *   Stage 2  Research    — media agent searches for real assets (video, web images, radiology) + renders ECG strips
 *   Stage 3  Stem        — stem agent writes vignette + options + answer
 *   Stage 4  Review      — medical accuracy reviewer (2nd LLM) audits + corrects the answer key
 *   Stage 5  Explain     — explanation agent writes explanation/mnemonic/pearl/sources (for the reviewed key)
 *   Stage 6  Create      — media agent creates assets (AI image, TTS audio) + assemble
 *
 * Media capabilities (server-side only):
 *   - image: AI-generated (z-ai-web-dev-sdk) OR searched from the web (z-ai CLI image-search)
 *   - audio: TTS narration (z-ai-web-dev-sdk) — "listen to the patient" questions
 *   - video: real educational video (web search → YouTube embed) — "watch and answer" questions
 *   - sound: REAL clinical sound recordings (heart murmurs, wheezes, crackles, stridor, bowel
 *     sounds) — searched on Wikimedia Commons → Merck Manuals → auscultation sites, downloaded,
 *     validated (magic bytes) and transcoded to mp3 (ffmpeg) — "auscultate and answer" questions
 *   - model: interactive 3D anatomy models (Sketchfab search API → iframe embed) — "explore the
 *     3D model and answer" questions
 *
 * LLM strategy: try the app's unified provider system first (respects user's
 * configured models / BYOK keys); if it is unavailable, fall back to the
 * sandbox's built-in z-ai-web-dev-sdk chat completions.
 */ 









const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
// ---------------------------------------------------------------------------
// LLM helper — unified provider first, sandbox SDK fallback
// ---------------------------------------------------------------------------
const CALLED_TIMEOUT_MS = 25000; // first-call probe timeout for the app provider system
let zaiPromise = null;
async function getZAI() {
    if (!zaiPromise) {
        zaiPromise = (async ()=>{
            const mod = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 902381));
            const ZAI = mod.default;
            return ZAI.create();
        })();
    }
    return zaiPromise;
}
/**
 * Call the LLM. Prefers the app's provider-agnostic `callChat` (respects
 * x-model header / MODEL_ROUTES / BYOK keys). Falls back to the sandbox
 * z-ai-web-dev-sdk when no provider is reachable.
 */ async function agentLLM(ctx, system, prompt) {
    if (!ctx.useSdkDirect) {
        try {
            const text = await Promise.race([
                (0,_lib_ai_unified_llm__WEBPACK_IMPORTED_MODULE_4__.callChat)(ctx.request, {
                    stage: 'chat-adapter',
                    system,
                    prompt
                }),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error('unified provider timeout')), CALLED_TIMEOUT_MS))
            ]);
            if (text && text.trim()) return text;
            throw new Error('empty response');
        } catch  {
            // Provider system unavailable — remember and use the SDK for the rest of the job.
            ctx.useSdkDirect = true;
        }
    }
    const zai = await getZAI();
    const completion = await zai.chat.completions.create({
        messages: [
            {
                role: 'assistant',
                content: system
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        thinking: {
            type: 'disabled'
        }
    });
    const content = completion.choices?.[0]?.message?.content || '';
    if (!content.trim()) throw new Error('LLM returned empty response');
    return content;
}
// ---------------------------------------------------------------------------
// Robust JSON parsing
// ---------------------------------------------------------------------------
/** Preload jsonrepair once (async dynamic import, cached at module scope). */ let jsonrepairFn = null;
const jsonrepairReady = (async ()=>{
    try {
        const mod = await Promise.all(/* import() */[__webpack_require__.e(3381), __webpack_require__.e(8899)]).then(__webpack_require__.bind(__webpack_require__, 298899));
        jsonrepairFn = mod.jsonrepair;
    } catch  {
        jsonrepairFn = null;
    }
})();
async function parseAgentJson(raw) {
    let text = (raw || '').trim();
    // Strip markdown fences
    const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fence) text = fence[1].trim();
    try {
        return JSON.parse(text);
    } catch  {}
    // Strip to outermost braces
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first >= 0 && last > first) {
        const inner = text.substring(first, last + 1);
        try {
            return JSON.parse(inner);
        } catch  {}
        // Repair common issues: trailing commas, double-quoted HTML attributes
        const repaired = inner.replace(/,\s*([}\]])/g, '$1').replace(/([\w-]+)=(")([^"]*?)\2/g, "$1='$3'");
        try {
            return JSON.parse(repaired);
        } catch  {}
    }
    // Last resort: jsonrepair library
    await jsonrepairReady;
    if (jsonrepairFn) {
        try {
            return JSON.parse(jsonrepairFn(text));
        } catch  {}
    }
    throw new Error('Agent returned unparseable JSON');
}
// ---------------------------------------------------------------------------
// RAG grounding — hybrid retrieval scoped to the user's library
// ---------------------------------------------------------------------------
/**
 * Retrieve source passages for a generation query. Tenant-scoped hybrid
 * retrieval (dense + BM25 + RRF + LLM rerank). Returns [] when no sources
 * are configured or retrieval fails — generation then falls back to the
 * model's general knowledge (never hard-fails).
 */ async function retrieveSourceChunks(ctx, query, sourceIds, topK = 8) {
    if (!sourceIds.length) return [];
    ctx.ragCache ??= new Map();
    const cacheKey = `${sourceIds.slice().sort().join(',')}::${query}`;
    const cached = ctx.ragCache.get(cacheKey);
    if (cached) return cached;
    let userId = ctx.userId;
    if (!userId) {
        try {
            userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_8__/* .resolveUserId */ .n$)();
        } catch  {
            userId = undefined;
        }
    }
    if (!userId) return [];
    try {
        const { chunks } = await (0,_knowledge_hybrid__WEBPACK_IMPORTED_MODULE_7__/* .retrieveKnowledgeHybrid */ .L$)(userId, query, {
            sourceIds,
            topK,
            request: ctx.request
        });
        ctx.ragCache.set(cacheKey, chunks);
        return chunks;
    } catch (error) {
        console.warn('[agent] RAG retrieval failed:', error instanceof Error ? error.message : error);
        return [];
    }
}
// ---------------------------------------------------------------------------
// Media tools
// ---------------------------------------------------------------------------
function randId(len = 8) {
    return Math.random().toString(36).slice(2, 2 + len);
}
const MEDIA_DIR = path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'public', 'generated', 'agent');
// ---------------------------------------------------------------------------
// Self-healing media search cache (Prisma-backed, survives restarts)
//
// Searching real clinical sounds / 3D models takes up to ~2 minutes (Commons
// rate limits, multi-site fallbacks). Successful results are cached by query
// for 7 days; known-misses are cached for 6 hours so repeat topics skip the
// whole chain. Local sound files are re-verified on disk before reuse.
// ---------------------------------------------------------------------------
const CACHE_TTL_SUCCESS_MS = 7 * 24 * 60 * 60 * 1000;
const CACHE_TTL_MISS_MS = 6 * 60 * 60 * 1000;
function mediaCacheKey(kind, query) {
    const norm = (query || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 120);
    return `${kind}:${norm}`;
}
async function mediaCacheGet(kind, query, revive) {
    try {
        const row = await _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.mediaSearchCache.findUnique({
            where: {
                cacheKey: mediaCacheKey(kind, query)
            }
        });
        if (!row) return undefined; // no entry — caller should do a live search
        if (new Date(row.expiresAt).getTime() < Date.now()) return undefined; // stale
        const parsed = JSON.parse(row.resultJson);
        if (parsed.value === null) return null; // cached known-miss
        const revived = revive ? revive(parsed.value) : parsed.value;
        if (revived === null) return undefined; // asset gone (e.g. local file deleted) — search again
        // Count the hit lazily (fire-and-forget)
        _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.mediaSearchCache.update({
            where: {
                id: row.id
            },
            data: {
                hits: {
                    increment: 1
                }
            }
        }).catch(()=>{});
        return revived;
    } catch  {
        return undefined; // cache table unavailable — degrade to live search
    }
}
async function mediaCachePut(kind, query, value) {
    try {
        const ttl = value === null ? CACHE_TTL_MISS_MS : CACHE_TTL_SUCCESS_MS;
        const entry = {
            value,
            fetchedAt: Date.now()
        };
        await _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.mediaSearchCache.upsert({
            where: {
                cacheKey: mediaCacheKey(kind, query)
            },
            update: {
                resultJson: JSON.stringify(entry),
                expiresAt: new Date(Date.now() + ttl)
            },
            create: {
                cacheKey: mediaCacheKey(kind, query),
                kind,
                resultJson: JSON.stringify(entry),
                expiresAt: new Date(Date.now() + ttl)
            }
        });
    } catch  {
    /* cache write failures must never break generation */ }
}
/** AI-generate an educational image → save to public/generated/agent/images → return URL. */ async function toolGenerateImage(prompt) {
    try {
        const zai = await getZAI();
        const response = await zai.images.generations.create({
            prompt,
            size: '1344x768'
        });
        const b64 = response?.data?.[0]?.base64;
        if (!b64) return null;
        const dir = path__WEBPACK_IMPORTED_MODULE_3___default().join(MEDIA_DIR, 'images');
        fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(dir, {
            recursive: true
        });
        const id = `img_${Date.now()}_${randId()}`;
        fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, `${id}.png`), Buffer.from(b64, 'base64'));
        return `/generated/agent/images/${id}.png`;
    } catch (err) {
        console.error('[agent] image generation failed:', err instanceof Error ? err.message : err);
        return null;
    }
}
/** Search real web images via the z-ai CLI image-search service. */ async function toolSearchImage(query) {
    const outFile = path__WEBPACK_IMPORTED_MODULE_3___default().join(MEDIA_DIR, `search_${Date.now()}_${randId()}.json`);
    const bins = [
        'z-ai',
        '/usr/local/bin/z-ai'
    ];
    for (const bin of bins){
        try {
            fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(MEDIA_DIR, {
                recursive: true
            });
            await execFileAsync(bin, [
                'image-search',
                '-q',
                query,
                '-c',
                '3',
                '--gl',
                'us',
                '--no-rank',
                '-o',
                outFile
            ], {
                timeout: 120000
            });
            if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(outFile)) continue;
            const data = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(outFile, 'utf-8'));
            if (data.success && Array.isArray(data.results)) {
                const best = data.results.find((r)=>r.original_url);
                if (best?.original_url) {
                    return {
                        url: best.original_url,
                        caption: best.caption || ''
                    };
                }
            }
            return null; // service responded but no results — don't retry other binaries
        } catch  {
        // Try the next binary path / give up
        } finally{
            try {
                fs__WEBPACK_IMPORTED_MODULE_2___default().unlinkSync(outFile);
            } catch  {}
        }
    }
    return null;
}
/** Modality words that mark a query (or planner concept) as radiology. */ const RADIOLOGY_QUERY_TERMS = [
    'x-ray',
    'xray',
    'radiograph',
    'radiography',
    'cxr',
    'ct ',
    ' ct',
    'cat scan',
    'computed tomography',
    'mri',
    'magnetic resonance',
    'ultrasound',
    'sonograph',
    'echocardiogram',
    'angiograph',
    'mammograph',
    'imaging',
    'film'
];
/** Filename patterns that mark a Commons file as an actual radiologic study. */ const RADIOLOGY_FILE_PATTERNS = [
    /x-?ray/i,
    /radiograph/i,
    /\bct\b/i,
    /computed tomograph/i,
    /\bmri\b/i,
    /magnetic resonance/i,
    /ultrasound/i,
    /sonograph/i,
    /\bcxr\b/i,
    /tomograph/i,
    /pyelogram/i,
    /angiograph/i,
    /myelogram/i,
    /mammograph/i,
    /ventriculograph/i,
    /\bmr\b/i,
    /k UB/i,
    /kub/i,
    /\bskiagram\b/i,
    /\bskia\b/i,
    /echo/i
];
/** Filename patterns that mark a Commons file as NON-radiology. */ const NON_RADIOLOGY_PATTERNS = [
    /screenshot/i,
    /logo/i,
    /diagram/i,
    /drawing/i,
    /illustrat/i,
    /poster/i,
    /painting/i,
    /sculpture/i,
    /\bcoat of arms\b/i,
    /flag of/i,
    /map of/i,
    /\bchart\b/i,
    /\bgraph\b/i,
    /\bschema/i,
    /\bpainting\b/i,
    /textbook page/i
];
/** Detect whether a query/concept should use the radiology search path. */ function looksLikeRadiologyQuery(text) {
    const t = ` ${(text || '').toLowerCase()} `;
    return RADIOLOGY_QUERY_TERMS.some((term)=>t.includes(term));
}
/** Search the Wikimedia Commons API for bitmap files matching the query. */ async function searchCommonsImages(query) {
    const formulations = [
        `${query} filetype:bitmap`,
        `${query} radiology filetype:bitmap`
    ];
    const seen = new Set();
    const all = [];
    for (const q of formulations){
        try {
            const apiUrl = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' + `&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=15` + '&prop=imageinfo&iiprop=url%7Cmime%7Csize%7Cextmetadata';
            const res = await httpGet(apiUrl, {
                'User-Agent': HTTP_UA_COMPUTED,
                Accept: 'application/json'
            });
            if (!res.ok) continue;
            const data = JSON.parse(res.buffer.toString('utf-8'));
            for (const page of Object.values(data.query?.pages || {})){
                const ii = page.imageinfo?.[0];
                if (!ii?.url || !page.title) continue;
                if (seen.has(page.title)) continue;
                seen.add(page.title);
                all.push({
                    title: page.title.replace(/^File:/, ''),
                    url: ii.url,
                    mime: ii.mime || '',
                    size: ii.size || 0,
                    width: ii.width || 0,
                    height: ii.height || 0,
                    license: ii.extmetadata?.LicenseShortName?.value || '',
                    artist: ii.extmetadata?.Artist?.value?.replace(/<[^>]*>/g, '').trim() || ''
                });
            }
        } catch  {
        // try next formulation
        }
    }
    return all;
}
/** Commons hosts only free licenses; blacklist anything odd and PREFER PD/CC0/CC-BY. */ const LICENSE_BLACKLIST = [
    /fair use/i,
    /^none$/i,
    /unknown/i
];
function licenseScore(license) {
    if (!license) return 0;
    if (LICENSE_BLACKLIST.some((rx)=>rx.test(license))) return -100;
    if (/cc0|public domain|\bpd\b|no restrictions/i.test(license)) return 3;
    if (/cc by(?!-sa)/i.test(license)) return 2;
    if (/cc by-sa/i.test(license)) return 1.5;
    if (/cc by/i.test(license)) return 1;
    return 0.5; // other free licenses (GFDL, Art Libre...)
}
/**
 * Score a Commons file as a radiology candidate for the query.
 * Hard gates return 0 (not radiology / wrong type / bad license / out of bounds);
 * otherwise the score blends license quality, query-token overlap and dimensions.
 */ function radiologyCandidateScore(c, query) {
    // Hard gates: must be a photo-style bitmap of sane size, must LOOK like a radiologic study
    if (!/^image\/(jpeg|png)$/.test(c.mime)) return 0;
    if (NON_RADIOLOGY_PATTERNS.some((rx)=>rx.test(c.title))) return 0;
    if (!RADIOLOGY_FILE_PATTERNS.some((rx)=>rx.test(c.title))) return 0;
    if (c.width < 320 || c.width > 4000) return 0;
    if (c.size < 20000 || c.size > 15000000) return 0;
    if (licenseScore(c.license) < 0) return 0; // license filter
    let score = licenseScore(c.license) * 2;
    // Anatomy/finding token overlap with the query
    const titleLower = c.title.toLowerCase();
    for (const tok of query.toLowerCase().split(/[^a-z0-9]+/).filter((t)=>t.length > 2)){
        if (titleLower.includes(tok)) score += 1.5;
    }
    // Prefer frontal chest-style dimensions (landscape/square) over extreme strips
    const ratio = c.width / Math.max(1, c.height);
    if (ratio > 0.6 && ratio < 2.2) score += 0.5;
    return score;
}
function imageMagicOk(buf) {
    if (buf.length < 12) return false;
    if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true; // JPEG
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true; // PNG
    return false;
}
/**
 * Resolve a render-size thumbnail URL for a Commons file via the REST API
 * (api.wikimedia.org → thumb.wikimedia.org). These domains sit in a DIFFERENT
 * rate-limit pool than upload.wikimedia.org, so this works as a fallback when
 * the direct original download is throttled. Returns null when unavailable.
 */ async function commonsThumbnailUrl(fileTitle) {
    try {
        const restUrl = `https://api.wikimedia.org/core/v1/commons/file/${encodeURIComponent(`File:${fileTitle.replace(/^File:/, '')}`)}`;
        const res = await httpGet(restUrl, {
            'User-Agent': HTTP_UA_COMPUTED,
            Accept: 'application/json'
        }, 15000);
        if (!res.ok) return null;
        const data = JSON.parse(res.buffer.toString('utf-8'));
        const url = data.preferred?.url;
        if (!url || !/^https:\/\/thumb\.wikimedia\.org\//.test(url)) return null;
        return url.split('?')[0];
    } catch  {
        return null;
    }
}
async function findRadiologyLive(q) {
    try {
        const candidates = await searchCommonsImages(q);
        if (process.env.RADIOLOGY_DEBUG) console.log('[radiology-debug] candidates:', candidates.length);
        // Try the two best-ranked candidates — covers a candidate that fails to download
        const ranked = candidates.map((c)=>({
                c,
                score: radiologyCandidateScore(c, q)
            })).filter((x)=>x.score > 0).sort((a, b)=>b.score - a.score).slice(0, 2);
        for (const { c: best } of ranked){
            // Commons imageinfo URLs can carry utm params that break direct download
            const cleanUrl = best.url.split('?')[0];
            // Download chain: original (upload.wikimedia.org) → REST-API thumbnail
            // (thumb.wikimedia.org, a separate rate-limit pool) → retry with backoff.
            // upload.wikimedia.org rate-limits transiently (429); alternating the UA
            // between attempts also helps (bot vs browser fingerprint).
            let res = null;
            for(let attempt = 0; attempt < 3 && !res; attempt++){
                if (attempt > 0) await new Promise((r)=>setTimeout(r, 1500 * attempt));
                const ua = attempt % 2 === 0 ? HTTP_UA_COMPUTED : HTTP_UA_BROWSER;
                res = await httpGet(cleanUrl, {
                    'User-Agent': ua,
                    Accept: 'image/*,*/*'
                }, 25000);
                if (res.ok && imageMagicOk(res.buffer)) break;
                res = null;
            }
            // Fallback: REST API thumbnail (different domain, separate rate limits)
            if (!res) {
                const thumbUrl = await commonsThumbnailUrl(best.title);
                if (thumbUrl) {
                    const thumbRes = await httpGet(thumbUrl, {
                        'User-Agent': HTTP_UA_COMPUTED,
                        Accept: 'image/*,*/*'
                    }, 25000);
                    if (thumbRes.ok && imageMagicOk(thumbRes.buffer)) res = thumbRes;
                }
            }
            if (process.env.RADIOLOGY_DEBUG) console.log('[radiology-debug] download:', best.title, res ? `${res.buffer.length} bytes` : 'FAILED');
            if (!res) continue; // try the next candidate
            const dir = path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'public', 'generated', 'agent', 'images', 'radiology');
            fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(dir, {
                recursive: true
            });
            const id = `rad_${Date.now()}_${randId()}`;
            const ext = /^image\/png/.test(best.mime) ? 'png' : 'jpg';
            fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, `${id}.${ext}`), res.buffer);
            const credit = `Wikimedia Commons — ${best.license || 'free license'}${best.artist ? `, ${best.artist.slice(0, 60)}` : ''}`;
            return {
                url: `/generated/agent/images/radiology/${id}.${ext}`,
                title: best.title.replace(/\.(jpe?g|png|tiff?)$/i, '').replace(/_/g, ' ').trim(),
                credit
            };
        }
        return null;
    } catch (err) {
        console.error('[agent] radiology search failed:', err instanceof Error ? err.message : err);
        return null;
    }
}
/** Search a real radiology image (X-ray/CT/MRI/US) with license filtering. Cached. */ async function toolSearchRadiologyImage(query) {
    const q = (query || '').trim();
    if (!q) return null;
    const cached = await mediaCacheGet('radiology', q, (v)=>{
        try {
            return fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'public', v.url.replace(/^\//, ''))) ? v : null;
        } catch  {
            return null;
        }
    });
    if (cached !== undefined) return cached;
    const found = await findRadiologyLive(q);
    await mediaCachePut('radiology', q, found);
    return found;
}
/** Synthesize narration audio with TTS → save to public/generated/agent/audio → return URL. */ async function toolTTS(script, voice = 'jam') {
    try {
        // The LLM's narration script often carries markdown (**bold**, # headings,
        // bullets). Strip it so the narrator never SPEAKS the syntax markers,
        // then collapse whitespace and enforce the safe length bound.
        const text = (0,_lib_audio_tts_text__WEBPACK_IMPORTED_MODULE_9__/* .stripMarkdownForTTS */ .A)(script || '').replace(/\s+/g, ' ').trim().slice(0, 950);
        if (!text) return null;
        const zai = await getZAI();
        const response = await zai.audio.tts.create({
            input: text,
            voice,
            speed: 1.0,
            response_format: 'wav',
            stream: false
        });
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(new Uint8Array(arrayBuffer));
        if (!buffer.length) return null;
        const dir = path__WEBPACK_IMPORTED_MODULE_3___default().join(MEDIA_DIR, 'audio');
        fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(dir, {
            recursive: true
        });
        const id = `tts_${Date.now()}_${randId()}`;
        fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, `${id}.wav`), buffer);
        return `/generated/agent/audio/${id}.wav`;
    } catch (err) {
        console.error('[agent] TTS failed:', err instanceof Error ? err.message : err);
        return null;
    }
}
/** Find a real educational video (web search → YouTube embed URL). */ async function toolFindVideo(query) {
    try {
        const zai = await getZAI();
        const results = await zai.functions.invoke('web_search', {
            query: `${query} medical education video`,
            num: 8
        });
        for (const r of results || []){
            const url = String(r.url || '');
            const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{6,})/);
            if (m) {
                const rawTitle = String(r.name || 'Educational video');
                return {
                    embedUrl: `https://www.youtube.com/embed/${m[1]}`,
                    title: rawTitle.replace(/\s*[-|·]\s*YouTube\s*$/i, '').trim() || 'Educational video',
                    sourceUrl: url
                };
            }
        }
        return null;
    } catch (err) {
        console.error('[agent] video search failed:', err instanceof Error ? err.message : err);
        return null;
    }
}
const HTTP_UA_COMPUTED = 'MedQ-Education-Agent/1.0 (medical education question generator; Next.js server)';
const HTTP_UA_BROWSER = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
/**
 * HTTP GET with a curl fallback. Wikimedia's CDN applies aggressive per-IP
 * rate limits that can transiently block JS-runtime fetch (undici/bun) while
 * still serving curl — so on 403/429/network errors we retry the exact same
 * URL through the curl binary if it is available.
 */ async function httpGet(url, headers, timeoutMs = 20000) {
    const tryFetch = async ()=>{
        try {
            const res = await fetch(url, {
                headers,
                redirect: 'follow',
                signal: AbortSignal.timeout(timeoutMs)
            });
            const buffer = Buffer.from(await res.arrayBuffer());
            if (res.status === 403 || res.status === 429) return null; // retry via curl
            return {
                ok: res.ok,
                status: res.status,
                buffer
            };
        } catch  {
            return null;
        }
    };
    const direct = await tryFetch();
    if (direct) return direct;
    // Fallback: curl (different client fingerprint, often not rate-limited)
    try {
        const args = [
            '-s',
            '--max-time',
            String(Math.ceil(timeoutMs / 1000)),
            '-L',
            '-w',
            '\n%{http_code}'
        ];
        for (const [key, value] of Object.entries(headers)){
            args.push('-H', `${key}: ${value}`);
        }
        args.push(url);
        const { stdout } = await execFileAsync('curl', args, {
            timeout: timeoutMs + 5000,
            maxBuffer: 60 * 1024 * 1024,
            encoding: 'buffer'
        });
        const buf = stdout;
        const idx = buf.lastIndexOf(10); // trailing "\n{status}" appended by -w
        if (idx > 0) {
            const status = parseInt(buf.subarray(idx + 1).toString('ascii').trim(), 10);
            if (!Number.isNaN(status)) {
                const body = buf.subarray(0, idx);
                return {
                    ok: status >= 200 && status < 300,
                    status,
                    buffer: body
                };
            }
        }
    } catch  {
    // curl missing or failed — give up below
    }
    return {
        ok: false,
        status: 0,
        buffer: Buffer.alloc(0)
    };
}
/** Clinical keywords that boost a Commons file's relevance score. */ const CLINICAL_SOUND_TERMS = [
    'murmur',
    'heart',
    'cardiac',
    'wheeze',
    'crackl',
    'stridor',
    'bowel',
    'lung',
    'breath',
    'ausculta',
    'systol',
    'diastol',
    'gallop',
    'rub',
    'mitral',
    'aortic',
    'still',
    'vsd',
    'prolapse',
    'pneumonia',
    'sbo',
    'copd',
    'asthma',
    'korotkoff',
    'bruit',
    'pleural',
    'bronch',
    'tricuspid',
    'pulmonic',
    'regurgitat',
    'stenos'
];
/** Patterns that mark a Commons audio file as NON-clinical (pronunciation, music, noise). */ const NON_CLINICAL_SOUND_PATTERNS = [
    /^ll-q/i,
    /^en-us-/i,
    /^nl-/i,
    /^en-au/i,
    /^fr\)/i,
    /spectrogram/i,
    /chocolate/i,
    /mr smith/i,
    /dragon/i,
    /puff/i,
    /beast/i,
    /insomnia/i,
    /\bethon\b/i,
    /song/i,
    /music/i,
    /dodo/i,
    /\bdog\b/i,
    /\bcat\b/i,
    /bust/i,
    /\baction\b/i,
    /\bether\b/i,
    /crépit/i,
    /pronunciation/i
];
/** Search the Wikimedia Commons API for audio files matching the query. */ async function searchCommonsAudio(query) {
    const formulations = [
        `${query} filetype:audio`,
        `${query} sound filetype:audio`,
        `${query} auscultation filetype:audio`
    ];
    const seen = new Set();
    const all = [];
    for (const q of formulations){
        try {
            const apiUrl = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' + `&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=10` + '&prop=imageinfo&iiprop=url%7Cmime%7Csize%7Cextmetadata';
            const res = await httpGet(apiUrl, {
                'User-Agent': HTTP_UA_COMPUTED,
                Accept: 'application/json'
            });
            if (!res.ok) continue;
            const data = JSON.parse(res.buffer.toString('utf-8'));
            for (const page of Object.values(data.query?.pages || {})){
                const ii = page.imageinfo?.[0];
                if (!ii?.url || !page.title) continue;
                if (seen.has(page.title)) continue;
                seen.add(page.title);
                all.push({
                    title: page.title.replace(/^File:/, ''),
                    // Wikimedia's imageinfo appends utm query params that break direct downloads
                    url: ii.url.split('?')[0],
                    mime: ii.mime || '',
                    size: ii.size || 0,
                    license: ii.extmetadata?.LicenseShortName?.value || '',
                    artist: stripHtml(ii.extmetadata?.Artist?.value || '')
                });
            }
        } catch  {
        // Try the next query formulation
        }
    }
    return all;
}
/** Pick the clinically-most-relevant Commons audio candidate for the query. */ function pickBestCommonsSound(candidates, query) {
    const tokens = query.toLowerCase().split(/[^a-z0-9]+/).filter((t)=>t.length > 2);
    if (tokens.length === 0) return null;
    let best = null;
    let bestScore = 0;
    for (const c of candidates){
        const t = c.title.toLowerCase();
        if (!(c.mime.startsWith('audio/') || c.mime === 'application/ogg')) continue;
        if (c.size < 20000 || c.size > 30 * 1024 * 1024) continue;
        if (NON_CLINICAL_SOUND_PATTERNS.some((re)=>re.test(t))) continue;
        let matched = 0;
        for (const tok of tokens)if (t.includes(tok)) matched += 1;
        // Require at least half the query tokens so e.g. "aortic stenosis murmur"
        // never silently degrades to a generic/unrelated murmur recording.
        if (matched < Math.max(1, Math.ceil(tokens.length / 2))) continue;
        let score = matched * 3;
        if (CLINICAL_SOUND_TERMS.some((k)=>t.includes(k))) score += 2;
        if (c.mime === 'audio/wav') score += 1;
        if (/cc|public domain|\bpd\b/i.test(c.license)) score += 1;
        if (score > bestScore) {
            bestScore = score;
            best = c;
        }
    }
    return bestScore >= 3 ? best : null;
}
/** Download a remote audio file and validate it by magic bytes (wav/ogg/mp3). */ async function downloadAudioFile(url, referer) {
    try {
        const res = await httpGet(url, {
            'User-Agent': HTTP_UA_COMPUTED,
            Accept: 'audio/*,*/*',
            ...referer ? {
                Referer: referer
            } : {}
        }, 45000);
        if (!res.ok) return null;
        const buf = res.buffer;
        if (buf.length < 10000 || buf.length > 30 * 1024 * 1024) return null;
        const head = buf.subarray(0, 4).toString('latin1');
        const isWav = head === 'RIFF';
        const isOgg = head === 'OggS';
        const isMp3 = buf.subarray(0, 3).toString('latin1') === 'ID3' || buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0;
        if (!isWav && !isOgg && !isMp3) return null;
        return buf;
    } catch  {
        return null;
    }
}
/** Transcode any audio buffer to a normalized, duration-capped mp3 (universal browser support). */ async function transcodeToMp3(input) {
    const inPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(MEDIA_DIR, `snd_in_${Date.now()}_${randId()}.tmp`);
    const dir = path__WEBPACK_IMPORTED_MODULE_3___default().join(MEDIA_DIR, 'sounds');
    try {
        fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(dir, {
            recursive: true
        });
        fs__WEBPACK_IMPORTED_MODULE_2___default().writeFileSync(inPath, input);
        const id = `snd_${Date.now()}_${randId()}`;
        const outPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, `${id}.mp3`);
        await execFileAsync('ffmpeg', [
            '-y',
            '-loglevel',
            'error',
            '-i',
            inPath,
            '-t',
            '90',
            '-codec:a',
            'libmp3lame',
            '-b:a',
            '128k',
            outPath
        ], {
            timeout: 60000
        });
        if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(outPath) || fs__WEBPACK_IMPORTED_MODULE_2___default().statSync(outPath).size < 8000) return null;
        return `/generated/agent/sounds/${id}.mp3`;
    } catch  {
        return null;
    } finally{
        try {
            fs__WEBPACK_IMPORTED_MODULE_2___default().unlinkSync(inPath);
        } catch  {}
    }
}
/** Generic words stripped when checking whether a result page is actually ABOUT the queried sound. */ const SOUND_STOPWORDS = new Set([
    'sound',
    'sounds',
    'audio',
    'recording',
    'recordings',
    'lesson',
    'lessons',
    'heart',
    'lung',
    'lungs',
    'cardiac',
    'chest',
    'auscultation',
    'listen',
    'best',
    'heard',
    'patient',
    'physical',
    'exam',
    'examination',
    'murmur',
    'finding'
]);
/** Specific (non-generic) tokens of a sound query, with e-stripped match variants. */ function specificSoundTokens(query) {
    const tokens = query.toLowerCase().split(/[^a-z0-9]+/).filter((t)=>t.length > 2 && !SOUND_STOPWORDS.has(t));
    return tokens;
}
/** True when the given text mentions at least one specific token of the query (fuzzy e/s endings). */ function mentionsSpecificSoundToken(text, tokens) {
    if (tokens.length === 0) return true; // nothing specific to check — accept
    const t = text.toLowerCase();
    return tokens.some((tok)=>t.includes(tok) || t.includes(tok.replace(/e$/, '')) || t.includes(tok.replace(/s$/, '')));
}
/** Merck Manuals hosts a large library of heart/lung sound audio pages with direct CDN mp3s. */ async function findMerckSound(query) {
    const specific = specificSoundTokens(query);
    try {
        const zai = await getZAI();
        const results = await zai.functions.invoke('web_search', {
            query: `${query} audio merck manuals`,
            num: 6
        });
        for (const r of results || []){
            const url = String(r.url || '');
            if (!/(merck|msd)manuals\.com\/.*\/multimedia\/audio\//i.test(url)) continue;
            const title = String(r.name || 'Clinical sound recording').replace(/\s*[-|·]\s*(Merck|MSD) Manuals.*$/i, '').trim();
            // Reject pages that are not actually about the queried sound (title/slug relevance)
            if (!mentionsSpecificSoundToken(`${title} ${url}`, specific)) continue;
            try {
                const page = await fetch(url, {
                    headers: {
                        'User-Agent': HTTP_UA_BROWSER
                    },
                    signal: AbortSignal.timeout(20000)
                });
                if (!page.ok) continue;
                const html = await page.text();
                const m = html.match(/https?:\/\/[^"'\s\\]+\.mp3/i);
                if (m) return {
                    url: m[0],
                    title: title || 'Clinical sound recording',
                    pageUrl: url
                };
            } catch  {
            // next result
            }
        }
        return null;
    } catch  {
        return null;
    }
}
/** Auscultation training sites (easyauscultation / practicalclinicalskills) expose CDN mp3s. */ async function findAuscultationSiteSound(query) {
    const specific = specificSoundTokens(query);
    try {
        const zai = await getZAI();
        const results = await zai.functions.invoke('web_search', {
            query: `${query} audio`,
            num: 8
        });
        for (const r of results || []){
            const url = String(r.url || '');
            if (!/(easyauscultation|practicalclinicalskills)\.com/i.test(url)) continue;
            const title = String(r.name || 'Clinical sound recording');
            // Reject pages that are not actually about the queried sound (e.g. a lung
            // sounds page for a bowel sounds query) — check title AND page url slug.
            if (!mentionsSpecificSoundToken(`${title} ${url}`, specific)) continue;
            try {
                const page = await fetch(url, {
                    headers: {
                        'User-Agent': HTTP_UA_BROWSER,
                        Referer: 'https://www.easyauscultation.com/'
                    },
                    signal: AbortSignal.timeout(20000)
                });
                if (!page.ok) continue;
                const html = await page.text();
                // Collect every mp3 on the page, then pick the one whose FILENAME best
                // matches the queried sound (pages list many unrelated sound files).
                const mp3s = [
                    ...html.matchAll(/https?:\/\/[^"'\s\\]+\.mp3/gi)
                ].map((m)=>m[0]).slice(0, 8);
                if (mp3s.length === 0) continue;
                let bestMp3 = null;
                let bestScore = -1;
                for (const mp3 of mp3s){
                    const fname = decodeURIComponent(mp3.toLowerCase());
                    let score = /mededu\.azureedge\.net/.test(mp3) ? 1 : 0;
                    for (const tok of specific.length ? specific : query.toLowerCase().split(/\s+/)){
                        if (fname.includes(tok) || fname.includes(tok.replace(/e$/, ''))) score += 2;
                    }
                    if (score > bestScore) {
                        bestScore = score;
                        bestMp3 = mp3;
                    }
                }
                if (bestMp3 && bestScore > 0) {
                    return {
                        url: bestMp3,
                        title: title.replace(/\s*[-|·#].*$/, '').trim() || 'Clinical sound recording',
                        pageUrl: url
                    };
                }
            } catch  {
            // next result
            }
        }
        return null;
    } catch  {
        return null;
    }
}
/** Download + serve + attribute a remote clinical sound, or null if unusable. */ async function importRemoteSound(candidate, credit) {
    const buf = await downloadAudioFile(candidate.url, candidate.pageUrl);
    if (!buf) return null;
    const local = await transcodeToMp3(buf);
    if (!local) return null;
    return {
        url: local,
        title: candidate.title,
        sourceUrl: candidate.pageUrl,
        credit
    };
}
/**
 * Search for a REAL clinical sound recording (heart murmur, wheeze, crackles,
 * stridor, bowel sounds...). Tries free-licensed sources first, then medical
 * reference sites. Returns a locally-served mp3 + attribution, or null.
 */ async function toolFindSound(query) {
    const q = (query || '').trim();
    if (!q) return null;
    // Cache first — repeat topics skip the (slow) search chain entirely
    const cached = await mediaCacheGet('sound', q, (v)=>{
        // Re-verify the local mp3 still exists on disk
        try {
            return fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'public', v.url.replace(/^\//, ''))) ? v : null;
        } catch  {
            return null;
        }
    });
    if (cached !== undefined) return cached;
    const found = await findSoundLive(q);
    await mediaCachePut('sound', q, found);
    return found;
}
async function findSoundLive(q) {
    if (!q) return null;
    // 1. Wikimedia Commons — free-licensed clinical recordings
    try {
        const candidates = await searchCommonsAudio(q);
        const best = pickBestCommonsSound(candidates, q);
        if (best) {
            const buf = await downloadAudioFile(best.url);
            if (buf) {
                const local = await transcodeToMp3(buf);
                if (local) {
                    return {
                        url: local,
                        title: best.title.replace(/\.(wav|ogg|mp3|flac)$/i, '').replace(/_/g, ' ').trim(),
                        sourceUrl: best.url,
                        credit: `Wikimedia Commons${best.license ? ` — ${best.license}${best.artist ? `, ${best.artist.slice(0, 60)}` : ''}` : ''}`
                    };
                }
            }
        }
    } catch (err) {
        console.error('[agent] Commons sound search failed:', err instanceof Error ? err.message : err);
    }
    // 2. Merck Manuals audio library (direct CDN mp3s)
    try {
        const merck = await findMerckSound(q);
        if (merck) {
            const imported = await importRemoteSound(merck, 'Merck Manuals');
            if (imported) return imported;
        }
    } catch  {}
    // 3. Auscultation training sites
    try {
        const ausc = await findAuscultationSiteSound(q);
        if (ausc) {
            const imported = await importRemoteSound(ausc, ausc.pageUrl.includes('easyauscultation') ? 'Easy Auscultation' : 'Practical Clinical Skills');
            if (imported) return imported;
        }
    } catch  {}
    return null;
}
/** Model names that are clearly not HUMAN-anatomy teaching models. */ const NON_ANATOMIC_MODEL_PATTERNS = [
    /canine|feline|equine|bovine|porcine|ovine|murine|veterinar/i,
    /dodo/i,
    /\bdog\b/i,
    /\bcat\b/i,
    /fritzchen/i,
    /\bbust\b/i,
    /statue/i,
    /dinosaur/i,
    /monster/i,
    /character/i,
    /\bgame\b/i,
    /weapon/i,
    /spaceship/i
];
/** Word variants so "anatomy" matches "anatomical", "nerves" matches "nerve", etc. */ function tokenVariants(token) {
    const v = [
        token
    ];
    if (token.endsWith('y')) v.push(token.slice(0, -1)); // anatomy → anatom
    if (token.endsWith('ical')) v.push(token.slice(0, -4)); // anatomical → anatom
    if (token.endsWith('s')) v.push(token.slice(0, -1)); // nerves → nerve
    if (token.endsWith('e')) v.push(token.slice(0, -1)); // spine → spin (matches spinal)
    return v;
}
/** Generic words that carry little information for model matching (scored low). */ const GENERIC_MODEL_TOKENS = new Set([
    'human',
    'anatomy',
    'anatomical',
    'anatomic',
    'body',
    'model',
    '3d',
    'animated',
    'animation',
    'realistic',
    'full',
    'complete',
    'with',
    'the',
    'system',
    'male',
    'female',
    // stopwords & filler words that dilute Sketchfab search relevance
    'and',
    'for',
    'from',
    'this',
    'that',
    'are',
    'was',
    'identify',
    'identifying',
    'spatial',
    'structure',
    'structural',
    'relationship',
    'relationships',
    'approach',
    'surface',
    'regions',
    'between',
    'relative',
    'where',
    'what',
    'which',
    'about'
]);
/**
 * Find an interactive 3D anatomy model (Sketchfab search API → embed URL).
 * Verbose queries (e.g. whole topic sentences) are compacted to their specific
 * anatomical terms first — Sketchfab search relevance degrades badly with long
 * queries. Falls back to a web search for sketchfab.com model links.
 */ async function toolFindModel(query) {
    const q = (query || '').trim();
    if (!q) return null;
    // Cache first — repeat topics skip the Sketchfab search entirely
    const cached = await mediaCacheGet('model', q, (v)=>v && v.embedUrl ? v : null);
    if (cached !== undefined) return cached;
    const found = await findModelLive(q);
    await mediaCachePut('model', q, found);
    return found;
}
async function findModelLive(q) {
    // Compact the query: drop generic/filler words, keep the specific anatomical
    // terms ("spatial anatomy of the chambers and valves of the heart" → "chambers valves heart")
    const rawTokens = q.toLowerCase().split(/[^a-z0-9]+/).filter((t)=>t.length > 2);
    const specificTokens = rawTokens.filter((t)=>!GENERIC_MODEL_TOKENS.has(t));
    const effectiveQuery = specificTokens.length >= 2 ? specificTokens.slice(0, 5).join(' ') : q;
    const tokens = effectiveQuery.split(' ');
    try {
        const res = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(effectiveQuery)}&count=12&sort_by=-likeCount`, {
            headers: {
                'User-Agent': HTTP_UA_BROWSER
            },
            signal: AbortSignal.timeout(20000)
        });
        if (res.ok) {
            const data = await res.json();
            let best = null;
            let bestScore = -1;
            for (const r of data.results || []){
                if (!r.uid || !r.name) continue;
                const name = r.name.toLowerCase();
                if (NON_ANATOMIC_MODEL_PATTERNS.some((re)=>re.test(name))) continue;
                // likeCount is a weak quality signal — cap it so token relevance dominates.
                // Specific anatomical terms (heart, skull, brachial...) are weighted far
                // above generic words (human, anatomy, model...) so "human heart anatomy"
                // picks a HEART model, not a full-body anatomy model.
                let score = r.likeCount ? Math.min(1.5, Math.log10(r.likeCount + 1)) : 0;
                let specificMatches = 0;
                for (const tok of tokens){
                    if (tokenVariants(tok).some((variant)=>variant.length > 3 && name.includes(variant))) {
                        score += GENERIC_MODEL_TOKENS.has(tok) ? 0.5 : 3;
                        if (!GENERIC_MODEL_TOKENS.has(tok)) specificMatches += 1;
                    }
                }
                if (/anatom|skull|skeleton|brain|heart|organ|muscle|nerve|vertebr|joint/.test(name)) score += 1;
                // Require at least one SPECIFIC term match (e.g. "heart") — otherwise the
                // query topic isn't represented in this result set and we should try the
                // web-search fallback instead of embedding a generic model.
                if (specificMatches === 0) continue;
                if (score > bestScore) {
                    bestScore = score;
                    best = {
                        uid: r.uid,
                        name: r.name,
                        likeCount: r.likeCount || 0
                    };
                }
            }
            if (best && bestScore > 0) return makeSketchfabModel(best.uid, best.name);
        }
    } catch (err) {
        console.error('[agent] Sketchfab search failed:', err instanceof Error ? err.message : err);
    }
    // Fallback: web search → sketchfab.com model links
    try {
        const zai = await getZAI();
        const results = await zai.functions.invoke('web_search', {
            query: `${effectiveQuery} 3d model sketchfab`,
            num: 8
        });
        for (const r of results || []){
            const url = String(r.url || '');
            const m = url.match(/sketchfab\.com\/3d-models\/[^/]+\/([a-f0-9]{20,})/i) || url.match(/sketchfab\.com\/models\/([a-f0-9]{20,})/i);
            if (m) {
                const title = String(r.name || 'Interactive 3D model').replace(/\s*[-|·]\s*Sketchfab\s*$/i, '').trim();
                return makeSketchfabModel(m[1], title);
            }
        }
    } catch  {}
    return null;
}
function makeSketchfabModel(uid, title) {
    return {
        embedUrl: `https://sketchfab.com/models/${uid}/embed?autospin=0.3&autostart=0&ui_theme=dark&ui_infos=0&ui_controls=1&ui_hint=2&preload=1&transparent=0`,
        title: title || 'Interactive 3D model',
        sourceUrl: `https://sketchfab.com/models/${uid}`,
        credit: 'Sketchfab'
    };
}
// ---------------------------------------------------------------------------
// Stage prompts (each stage is SMALL and FOCUSED — no giant one-shot prompt)
// ---------------------------------------------------------------------------
const PLANNER_SYSTEM = `You are the PLANNER AGENT of a medical question generation team. Your job is to design a question blueprint — NOT to write the question itself.

You decide:
1. The single best testable concept for this request (specific, exam-relevant, clinically rich).
2. A clinical scenario idea (vignette concept).
3. A MEDIA PLAN — whether the question should include an image, audio, video, ECG, or 3D model.
4. USMLE-style BLUEPRINT TAGS (organ system + task).

BLUEPRINT TAGS (always provide):
- "blueprintOrgan": one of: Cardiovascular, Respiratory, Renal/Urinary, Gastrointestinal, Endocrine, Hematology, Neurology, Psychiatry, Musculoskeletal, Dermatology, Immunology, Infectious Disease, Oncology, Reproductive, Pediatrics, Genetics, Pharmacology, Biochemistry, Public Health, Anatomy, Physiology, Pathology, Behavior.
- "blueprintTask": one of: Diagnosis, Mechanism of Disease, Pharmacologic Management, Next Step in Management, Diagnostic Testing, Physiology, Pathophysiology, Anatomy Identification, Embryology, Biostatistics, Ethics/Communication, Emergency Management, Monitoring/Side-Effects.

MEDIA PLAN RULES (0-3 items max):
- kind "image" + source "generate": for anatomy, histology-style findings, rash/lesion appearance, instrument identification, procedure positions, cell/tissue morphology, imaging-style illustrations (when an AI-generated educational illustration works).
  Provide "imagePrompt": a DETAILED description of the educational content to draw (subject, view/perspective, what to label/highlight). Describe content, not art style.
- kind "image" + source "search": when a REAL image is pedagogically better: radiographs (X-ray/CT/MRI/ultrasound — searched with LICENSE FILTERING from free-licensed medical collections and credited), clinical photographs, real histology slides, dermoscopy.
  Provide "searchQuery": a natural-language description of the image to find (for radiology include the modality, e.g. "chest x-ray pneumothorax", "CT head subdural hematoma").
  The pipeline detects radiology queries automatically and searches license-filtered collections — a failed radiology search falls back to an AI-generated illustration.
- kind "ecg": PREFER this for ECG rhythm recognition questions (atrial fibrillation, VT, SVT, AV blocks, sinus tach/brady, flutter, asystole, VF, LBBB, hyperkalemia, STEMI patterns). A clean, precise, locally-rendered rhythm strip is generated from a template — always available, always legible, printable. For rhythm/rate/interval/wave-morphology questions choose "ecg" OVER "image".
  Provide "ecgRhythm": one of: ${_ecg_generator__WEBPACK_IMPORTED_MODULE_6__/* .SUPPORTED_ECG_RHYTHMS */ .xU.join(', ')} (or a close alias).
  Provide "ecgRate" (bpm) when meaningful, and "ecgFindings": 1-3 short visible findings (e.g. ["irregularly irregular", "absent P waves"]).
  Set "ecgClick": true ONLY for wave-identification questions where the options ARE ECG waves/segments ("Which wave is absent?" → options: P wave, QRS complex, T wave...). The strip becomes an interactive click-to-answer diagram.
- kind "audio" (role "stem"): when LISTENING is the skill being tested or enhances realism — a narrated patient presentation, verbal handover.
  Provide "audioScript": the EXACT narration text (100-800 characters, spoken style). MANDATORY: an audio item without a non-empty audioScript is invalid.
- kind "video" (role "stem"): PREFER this over image for any HANDS-ON PROCEDURE, technique, or demonstrated protocol — CPR steps, lumbar puncture, suturing, ECG electrode placement, airway maneuvers. A video of the technique being performed is pedagogically far better than a static image.
  Provide "videoQuery": the topic of a real educational video to find on the web.
- kind "sound" (role "stem"): PREFER this over plain "audio" whenever the skill being tested is RECOGNIZING A REAL CLINICAL SOUND — heart murmurs (aortic stenosis, mitral regurgitation, mitral valve prolapse...), S3/S4 gallop, wheezes, crackles, stridor, bowel sounds. The agent will find, download and embed an actual recorded sound.
  Provide "soundQuery": a short specific phrase for the sound (e.g. "aortic stenosis murmur", "crackles pneumonia").
  ALSO provide "soundDescription": a 1-2 sentence clinical description of the sound's acoustic character (timing in the cardiac cycle, pitch, quality, radiation) — used as narration fallback if no real recording can be found.
- kind "model" (role "stem"): PREFER this over image for ANATOMY STRUCTURE IDENTIFICATION and SPATIAL/STRUCTURAL understanding — identifying structures on a rotatable interactive 3D model, spatial relationships, approach anatomy.
  Provide "modelQuery": a short specific phrase for the model to find (e.g. "human heart anatomy", "skull anatomy", "brachial plexus").
- COMPOSITE MEDIA CASES (advanced integration): for a single rich cardiology/pulmonary vignette you MAY combine up to 3 stem media items when each adds distinct information — e.g. sound + model ("auscultate the murmur, then locate the diseased valve in 3D"), ecg + sound (ECG plus an accompanying gallop), image + model (imaging plus 3D correlation). Use composites sparingly — only when the CONCEPT genuinely spans multiple modalities (e.g. "correlate the auscultatory finding with the valve morphology").
- Include media ONLY when it genuinely helps test the concept. Plain text questions are fine for many topics (pharmacology mechanisms, biochemistry pathways).
- NEVER plan explanation-role audio; audio and sounds are for the question stem only.

MEDICAL ACCURACY: choose only well-established, verifiable concepts (guidelines, textbook facts).

OUTPUT — return ONLY valid JSON (no markdown, no commentary):
{
  "concept": "one specific testable concept",
  "stemIdea": "2-3 sentence description of the clinical scenario",
  "learningObjective": "what the student should be able to do after this question",
  "difficulty": "Easy|Basic|Moderate|Hard|Expert",
  "blueprintOrgan": "...",
  "blueprintTask": "...",
  "mediaPlan": [ { "kind": "image|audio|video|sound|model|ecg", "role": "stem", "source": "generate|search", "imagePrompt": "...", "searchQuery": "...", "audioScript": "...", "videoQuery": "...", "soundQuery": "...", "soundDescription": "...", "modelQuery": "...", "ecgRhythm": "...", "ecgRate": 0, "ecgFindings": [], "ecgClick": false, "reason": "why this media helps" } ]
}
All mediaPlan item fields not applicable to the kind should be omitted.`;
function buildPlannerPrompt(params, sourceContext = '') {
    const lines = [];
    lines.push(`Plan ONE medical question:`);
    lines.push('');
    lines.push(`Topic: ${params.topic}`);
    lines.push(`Medical System: ${params.system || 'General'}`);
    lines.push(`Question Types allowed: ${(params.types && params.types.length ? params.types : [
        'mcq'
    ]).join(', ')}`);
    lines.push(`Difficulty: ${(params.difficulties && params.difficulties.length ? params.difficulties : [
        'Medium'
    ]).join(', ')}`);
    if (sourceContext) {
        lines.push('');
        lines.push('SOURCE-GROUNDED MODE — the question MUST test content that appears in the SOURCE MATERIAL excerpts below. Pick the concept and the specific facts from them (a lecture, the student\'s notes, or their study document). Do NOT invent facts that contradict them.');
        lines.push('');
        lines.push(sourceContext);
    }
    if (params.weakTopics && params.weakTopics.length) {
        lines.push('');
        lines.push('WEAKNESS-TARGETED MODE — this question is generated because the student is weak in these topics:');
        for (const w of params.weakTopics.slice(0, 6))lines.push(`- ${w}`);
        lines.push('Focus the concept on one of these weak areas (or a closely related fundamental that unlocks them). Prefer discriminating concepts that students typically confuse.');
    }
    if (params.focusHint) {
        lines.push('');
        lines.push(`Additional focus guidance: ${params.focusHint}`);
    }
    lines.push('');
    lines.push('Choose the concept, scenario idea, difficulty, blueprint tags, and media plan. Return ONLY the JSON object.');
    return lines.join('\n');
}
const STEM_SYSTEM = `You are the STEM WRITER AGENT — a world-class USMLE/PLAB exam writer. You write ONLY the question stem (vignette), the options, and the answer. Another agent writes the explanation later — do NOT write any explanation.

MEDICAL ACCURACY IS PARAMOUNT:
- Use ONLY verified, current medical facts (guidelines, textbooks).
- When SOURCE MATERIAL is provided, it is AUTHORITATIVE: base the tested fact, values and numbers on it, and do not contradict it.
- Include specific data when relevant: dosages (mg/kg), half-lives, sensitivity/specificity, lab reference ranges.
- Use proper nomenclature: receptor subtypes (β₁ not beta-1), INN drug names.

FORMATTING (HTML allowed in "text" ONLY):
- Valid CSS classes you may use: q-hl, q-hl-red, q-hl-green, q-hl-amber, q-hl-purple (inline highlights).
- Use SINGLE QUOTES for all HTML attributes: class='q-hl-red' NOT class="q-hl-red".
- "options" and "answer" MUST be PLAIN TEXT — no HTML tags.

MEDIA INTEGRATION (follow the MEDIA CONTEXT given in the user message):
- If audio is available: write the vignette as a listening exercise — the patient presentation is delivered as AUDIO. Reference it naturally (e.g. "🔊 Listen to the audio presentation. Which of the following is the most likely diagnosis?"). Include the 🔊 emoji exactly once.
- If a real clinical SOUND is available: write the question as an AUSCULTATION exercise — the student must identify or interpret the recorded finding by ear (e.g. "🔊 Listen to the heart sound above. Which finding is most likely?"). Include the 🔊 emoji exactly once. Do NOT describe the sound's character in the stem — the student must hear it, not read it.
- If a real clinical SOUND is available AND you are asked for phonocardiogram timing: ALSO provide "pcgTiming": {"phase": "systolic"|"diastolic"|"holosystolic"|"continuous", "shape": "crescendo-decrescendo"|"plateau"|"decrescendo"|"musical", "s1": true, "s2": true, "bestHeard": "cardiac apex"} — the timing of the murmur in the cardiac cycle, rendered as a synchronized phonocardiogram under the audio player. s1/s2 indicate whether the normal heart sounds are audible/discernible. bestHeard is where the murmur is loudest.
- If an image is available: reference it naturally ("Examine the image above and identify the abnormality...").
- If an ECG strip is available: write the question as an ECG interpretation exercise — the student must READ the rhythm strip shown above (rate, rhythm, intervals, wave morphology). Reference "the ECG above" naturally. Do NOT spell out the rhythm diagnosis in the stem — the student must interpret the strip. If ECG CLICK mode is active (interactive wave identification), the options MUST be exactly the wave/segment names given in the media context (e.g. "P wave", "QRS complex", "T wave", "ST segment", "PR interval") and the stem asks e.g. "Click on the wave that is absent in this rhythm."
- If a video is available: reference watching it ("After watching the video above on {video topic}, which of the following...").
- If a 3D model is available: write the question so the student must EXPLORE the model (rotate, zoom) to answer — reference "the 3D model above" naturally. If structure tags are requested, ALSO provide "structureTags": [{"letter":"A","name":"..."}, ...] with 4-6 structures actually visible on the model — these render as clickable chips beside the model; one of them MUST be the correct answer string. Distractor structures must be plausible neighbors (wrong valve, wrong chamber, wrong nerve...).
- If NO media is available: write a standard text vignette with no media references.

LAB PANELS (optional output): when the vignette involves laboratory data (DKA, electrolytes, anemia workup, LFTs, thyroid panel, sepsis workup...), ALSO provide "labPanel": [{"name": "Panel name", "rows": [{"test": "Glucose", "value": "448", "unit": "mg/dL", "flag": "H"}, ...]}]. flag is "H" (high), "L" (low) or "" (normal). 2-3 panels max, 4-8 rows each, clinically consistent values. The panel renders as a styled table above the question — do NOT duplicate the values as raw text in the stem (mention the panel, e.g. "her initial labs are shown").

IMAGE HOTSPOTS (optional output): ONLY when the media context says hotspots are supported for this image: provide "hotspots": [{"label": "structure name", "x": 50, "y": 30}, ...] where x/y are PERCENTAGE positions on the image (0-100, x=0 left edge, y=0 top edge) and each label EXACTLY matches one option. The student can click a pin on the image to answer. Use for identify-the-structure questions on diagrams. Positions should be approximate but anatomically sensible for the image description given.

MCQ RULES: 4-5 options, exactly ONE correct, plausible distractors each testing a specific misconception. The answer string must EXACTLY match one option.
TF questions: options are ["True","False"].

OUTPUT — return ONLY valid JSON:
{
  "text": "vignette HTML (single-quoted attributes)",
  "options": ["plain text A", "plain text B", "plain text C", "plain text D"],
  "answer": "plain text — must exactly match one option",
  "type": "mcq|tf|short",
  "labPanel": [{"name": "...", "rows": [{"test": "...", "value": "...", "unit": "...", "flag": "H"}]}],
  "pcgTiming": {"phase": "systolic", "shape": "crescendo-decrescendo", "s1": true, "s2": true, "bestHeard": "..."},
  "structureTags": [{"letter": "A", "name": "..."}],
  "hotspots": [{"label": "...", "x": 50, "y": 30}]
}
(labPanel / pcgTiming / structureTags / hotspots are optional — omit when not applicable.)`;
function buildStemPrompt(params, plan, mediaContext, sourceContext = '') {
    const lines = [];
    lines.push(`Write the question stem for this blueprint:`);
    lines.push(`- Concept: ${plan.concept}`);
    lines.push(`- Scenario idea: ${plan.stemIdea}`);
    lines.push(`- Difficulty: ${plan.difficulty || params.difficulties?.[0] || 'Medium'}`);
    lines.push(`- Topic: ${params.topic} | System: ${params.system || 'General'}`);
    lines.push('');
    if (sourceContext) {
        lines.push('SOURCE MATERIAL (AUTHORITATIVE — from the student\'s own library):');
        lines.push(sourceContext);
        lines.push('');
        lines.push('SOURCE RULES:');
        lines.push('- The tested fact, numbers, lab values, drug names/doses and findings MUST come from these passages when they cover the tested concept — do NOT substitute your own values for theirs.');
        lines.push('- If a passage contradicts your general knowledge, the passage wins (it is the student\'s authoritative material).');
        lines.push('- Do not COPY whole sentences into the stem (the student should not recognize the verbatim answer from their notes); transform the fact into a fresh clinical vignette.');
        lines.push('- Passages may carry [mm:ss] timestamps from lecture recordings — usable as scenario detail, not required.');
        lines.push('');
    }
    lines.push('MEDIA CONTEXT (assets already prepared for this question):');
    if (mediaContext.sound) {
        lines.push(`- REAL clinical sound recording: AVAILABLE — "${mediaContext.soundTitle || mediaContext.soundQueryPreview || 'the recorded finding'}" plays above the question with a synchronized phonocardiogram.`);
        lines.push('  Write the question as an AUSCULTATION exercise: the student must LISTEN and identify/interpret the finding by ear. Include the 🔊 emoji once. Do NOT spell out the sound\'s acoustic character in the stem — that would give the answer away.');
        lines.push('  ALSO provide "pcgTiming" (murmur timing in the cardiac cycle: phase + shape + s1/s2 + bestHeard) so the phonocardiogram under the player is drawn correctly. Derive it from the CLINICAL DIAGNOSIS being tested (e.g. aortic stenosis → systolic, crescendo-decrescendo, right sternal border). Do NOT reveal the diagnosis in the stem.');
    } else if (mediaContext.audio) {
        lines.push(`- Audio narration: AVAILABLE — plays above the question. Script summary: "${(mediaContext.audioScriptPreview || '').slice(0, 300)}"`);
        lines.push('  Write the question so the audio delivers the clinical presentation (listening exercise). Include the 🔊 emoji once when referencing it.');
    }
    if (mediaContext.image === 'ecg') {
        lines.push(`- ECG rhythm strip: AVAILABLE (lead II, rendered above the question on standard grid paper). Depicts: "${(mediaContext.imagePromptPreview || '').slice(0, 300)}"`);
        if (mediaContext.ecgClick) {
            lines.push(`  ECG CLICK MODE (interactive): the strip has clickable wave/segment pins. The options MUST be EXACTLY these labels (choose 4-5): ${_ecg_generator__WEBPACK_IMPORTED_MODULE_6__/* .ECG_REGION_LABELS */ .lZ.join(', ')}. Ask e.g. "Click on the wave that is absent in this rhythm." The answer must be one of these labels.`);
        } else {
            lines.push('  Write the question as an ECG INTERPRETATION exercise: the student must read the strip (rate/rhythm/intervals/morphology). Reference "the ECG above" naturally. Do NOT state the rhythm diagnosis in the stem.');
        }
    } else if (mediaContext.image !== 'none') {
        lines.push(`- Image: AVAILABLE (${mediaContext.image === 'searched' ? 'a real clinical image found on the web' : 'an AI-generated medical illustration'}) — shown above the question. Depicts: "${(mediaContext.imagePromptPreview || '').slice(0, 300)}"`);
        lines.push('  Reference "the image above" naturally.');
        if (mediaContext.hotspotsSupported && mediaContext.image === 'generated') {
            lines.push('  HOTSPOT MODE supported: if this is an identify-the-structure question, you may provide "hotspots" [{label, x, y}] — percentage pins on the image; each label must exactly match an option. Only do this when the image description clearly places structures at predictable positions (schematic diagrams, labeled anatomy).');
        }
    }
    if (mediaContext.video) {
        lines.push(`- Video: AVAILABLE — "${mediaContext.video.title}" (embedded above the question).`);
        lines.push('  Write the question about what the video demonstrates — reference "the video above" naturally.');
    }
    if (mediaContext.model) {
        lines.push(`- Interactive 3D model: AVAILABLE — "${mediaContext.model.title}" (embedded above the question, rotatable in the browser).`);
        lines.push('  Write the question so the student must EXPLORE the model (rotate, zoom) to answer — reference "the 3D model above" naturally.');
        lines.push('  ALSO provide "structureTags": 4-6 [{letter, name}] structures actually visible on this model. The correct answer MUST be one of the structure names (exactly matching an option); the others are plausible neighboring structures (distractors). The chips render as clickable answers beside the model.');
    }
    const hasAnyMedia = mediaContext.audio || mediaContext.sound || mediaContext.image !== 'none' || mediaContext.video || mediaContext.model;
    if (!hasAnyMedia) {
        lines.push('- NONE — write a standard text-only vignette. Do NOT reference any image, audio, video, sound or 3D model.');
        lines.push('  If the scenario involves laboratory data, provide a "labPanel" (styled table) instead of in-text numbers.');
    } else {
        lines.push('  If the scenario ALSO involves laboratory data, provide a "labPanel" (styled table above the question) instead of listing the values as raw text.');
    }
    lines.push('');
    lines.push('Return ONLY the JSON object.');
    return lines.join('\n');
}
const EXPLANATION_SYSTEM = `You are the EXPLANATION AGENT — a medical educator who writes the teaching content for an already-written question. You do NOT rewrite the stem.

MEDICAL ACCURACY: specific numbers, guideline names, mechanisms — never fabricate statistics.

Each field uses limited HTML with these VALID CSS classes (SINGLE-QUOTED attributes only):
- Highlights: q-hl, q-hl-red, q-hl-green, q-hl-amber, q-hl-purple
- Callouts: q-callout, q-callout-blue, q-callout-green, q-callout-red, q-callout-amber, q-callout-purple
- Lists: q-list
- Tables: q-table (with <tr>, <th>, <td>)
- Timeline: q-timeline with q-timeline-item (add " green"/" amber"/" red" modifier classes on items)
- Mnemonic: q-mnemo with q-letter blocks + q-letter-text
- Grids: q-grid q-grid-2, q-grid q-grid-3; Cards: q-card, q-card-correct

FIELD REQUIREMENTS:
- "explanation": rich HTML — key concept callout, mechanism, why the answer is correct, inline citations [1], [2]. Include ONE visual: a q-table (comparisons), a q-timeline (protocols/progression), or a q-flow list. 150-300 words.
- "mnemonic": a topic-relevant acronym using q-mnemo letter blocks — letters MUST spell a TOPIC-RELEVANT word. Each letter = one exam-testable fact. Follow with a red callout.
- "clinicalPearl": an amber callout with a high-yield pearl (💎).
- "distractorAnalysis": q-grid q-grid-2 cards — one ✅ q-card-correct for the right answer, ❌ q-card-red cards explaining each distractor's misconception.
- "sources": 2-3 REAL references ({"type":"guideline"|"paper"|"review","title":"..."}) matching the [1],[2] citations.
- "diagramSpec": OPTIONAL — include ONLY for pathway/cascade/mechanism concepts: { "title": "...", "layout": "horizontal|vertical", "nodes": [{"id","label","type":"enzyme|substrate|product|receptor|effect|outcome|organ|drug|hormone","subtitle","annotation"}], "edges": [{"from","to","label","type":"normal|activation|inhibition|conversion|feedback"}] } with ≥5 nodes and ≥4 descriptive edges. Otherwise null.
- "illustrationDescription": 1-2 sentence description of what illustration would help visualize this (even if the question already has media).

OUTPUT — return ONLY valid JSON (single-quoted HTML attributes):
{
  "explanation": "HTML",
  "mnemonic": "HTML",
  "clinicalPearl": "HTML",
  "distractorAnalysis": "HTML",
  "sources": [{"type":"guideline","title":"..."}],
  "diagramSpec": null,
  "illustrationDescription": "..."
}`;
function buildExplanationPrompt(params, plan, stemText, answer, options, sourceContext = '') {
    const plainStem = stemText.replace(/<[^>]*>/g, '').slice(0, 600);
    const lines = [];
    lines.push(`Write the teaching content for this question:`);
    lines.push('');
    lines.push(`Concept: ${plan.concept}`);
    lines.push(`Topic: ${params.topic} | System: ${params.system || 'General'} | Difficulty: ${plan.difficulty || 'Medium'}`);
    lines.push('');
    lines.push(`Question stem (plain text preview): ${plainStem}`);
    lines.push('');
    lines.push(`Options: ${options.join(' | ')}`);
    lines.push(`Correct answer: ${answer}`);
    if (sourceContext) {
        lines.push('');
        lines.push('SOURCE MATERIAL (AUTHORITATIVE — passages retrieved from the student\'s library that ground this question):');
        lines.push(sourceContext);
        lines.push('');
        lines.push('SOURCE RULES: base the key teaching facts on these passages where they apply, and cite them inline as [1], [2]… matching their [K1], [K2] tags (the passage list becomes the question\'s "sources" array verbatim, so numbering matches). If a passage\'s fact differs from your general knowledge, teach the passage\'s version and note the discrepancy in one short sentence.');
    }
    lines.push('');
    lines.push('Include inline citations [1], [2] in the explanation matching the sources array. Return ONLY the JSON object.');
    return lines.join('\n');
}
// ---------------------------------------------------------------------------
// Medical accuracy review pass — a SECOND, independent LLM call that audits
// the finished question BEFORE it is shown to students. Catches wrong answer
// keys, answer-not-in-options, leaky stems, and factual errors. Can repair
// the answer key when the reviewer confidently identifies the correct option.
// ---------------------------------------------------------------------------
const REVIEWER_SYSTEM = `You are the MEDICAL ACCURACY REVIEWER — a meticulous medical school exam committee member. You audit an already-written multiple-choice question for correctness BEFORE it reaches students. You are skeptical: your job is to find errors, not to praise.

IMPORTANT — MEDIA QUESTIONS: questions are RENDERED in an app that displays attached media above the stem (ECG rhythm strips, clinical images, audio recordings, 3D models). When the prompt's MEDIA CONTEXT lists attached assets, references like "the ECG above", "the image above", "listen to the audio" are CORRECT BY DESIGN — never flag them as missing or unanswerable. Your job for media questions is to audit the answer key, the distractors and the facts, NOT the media delivery.

AUSCULTATION / ECG-READING / IMAGE-READING QUESTIONS ARE VALID EXAM FORMATS: for questions testing recognition of a heart murmur, breath sound, ECG rhythm or radiographic finding, the stem INTENTIONALLY does not describe the finding — the student must identify it by listening / reading the strip / examining the image. The absence of a textual description of the media finding is NOT a flaw and NOT "irreparable": verify such questions by checking that (a) the answer key names the finding a clinician would actually identify from that media type, and (b) each distractor is a plausible competing finding of the SAME modality (other murmurs, other rhythms, other imaging findings). A well-formed auscultation question with a correct key and plausible distractors should be APPROVED.

CHECK, IN ORDER:
1. STRUCTURE: is the stated answer EXACTLY one of the options (plain-text match)? Are there 4-5 options with exactly one defensibly correct?
2. ANSWER KEY CORRECTNESS: is the designated answer the one a current guideline/textbook would give? Work through the clinical reasoning yourself. If a DIFFERENT option is more defensibly correct, say so and name it.
3. STEM SAFETY: does the stem leak the answer (describing a sound/ECG/image finding that IS the answer)? For auscultation/ECG/media questions the stem must NOT spell out the finding.
4. FACTS: dosages, lab values, mechanisms, guideline names — flag anything wrong or outdated.
5. DISTRACTORS: are the distractors plausible (each testing a real misconception)? Flag nonsensical options.

VERDICT RULES:
- "verdict": "approved" when the question is sound (minor style notes are fine).
- "verdict": "fix" when something is wrong. If the answer key is wrong and you are CONFIDENT which option is correct, set "correctedAnswer" to the exact option string. Also provide a one-line "correctedExplanation" summary to append to the explanation.
- "verdict": "flag" ONLY for irreparable flaws: an answer key you cannot confidently correct, two defensibly correct options, or fabricated facts. NEVER flag merely because the stem references attached media.

OUTPUT — return ONLY valid JSON:
{
  "verdict": "approved|fix|flag",
  "issues": ["short, specific issue descriptions"],
  "correctedAnswer": "exact option string — only when verdict is fix and you are confident",
  "correctedExplanation": "1-2 sentence corrected reasoning to append — only when correcting",
  "confidence": 0.0
}
"confidence" is your 0-1 confidence in this verdict.`;
function buildReviewerPrompt(plan, stemText, options, answer, mediaNote = '', evidenceContext = '') {
    const plainStem = stemText.replace(/<[^>]*>/g, '').slice(0, 1400);
    const evidenceBlock = evidenceContext ? `\nGROUND TRUTH — passages from the student's OWN study material that ground this question. When they cover the tested fact, treat them as AUTHORITATIVE evidence: verify the answer key against them FIRST (values, drug choices, doses, definitions). If the answer key contradicts these passages, that is a "fix" (name the passage-supported option). If the passages do not cover the tested concept, audit from standard knowledge instead.\n${evidenceContext}\n` : '';
    return `Audit this question for medical accuracy:

Concept: ${plan.concept}
Blueprint: ${plan.blueprintOrgan || 'unspecified'} / ${plan.blueprintTask || 'unspecified'}
${mediaNote ? `\nMEDIA CONTEXT: ${mediaNote}\n` : ''}${evidenceBlock}
STEM: ${plainStem}

OPTIONS: ${options.map((o, i)=>`${String.fromCharCode(65 + i)}) ${o}`).join('  ')}
DESIGNATED ANSWER: ${answer}

Verify the answer key, check the stem does not leak the finding, and audit the facts${evidenceContext ? ' (against the GROUND TRUTH passages above when applicable)' : ''}. Return ONLY the JSON verdict.`;
}
async function reviewQuestion(ctx, plan, stemText, options, answer, mediaNote = '', evidenceContext = '') {
    try {
        const verdict = await parseAgentJson(await agentLLM(ctx, REVIEWER_SYSTEM, buildReviewerPrompt(plan, stemText, options, answer, mediaNote, evidenceContext)));
        if (verdict && verdict.verdict && verdict.verdict !== 'approved') {
            console.log(`[agent] review verdict: ${verdict.verdict} — ${String(verdict.issues || verdict.explanation || '').slice(0, 200)}`);
        }
        if (!verdict || !verdict.verdict) return {
            status: 'error',
            notes: null,
            correctedAnswer: null,
            correctedExplanation: null
        };
        let correctedAnswer = null;
        if (verdict.verdict === 'fix' && verdict.correctedAnswer) {
            const candidate = stripHtml(String(verdict.correctedAnswer));
            const matches = options.filter((o)=>o.trim().toLowerCase() === candidate.trim().toLowerCase());
            // Trust the correction only when the reviewer is confident AND the
            // corrected answer cleanly matches exactly one option.
            if ((verdict.confidence ?? 0) >= 0.6 && matches.length === 1) {
                correctedAnswer = matches[0];
            }
        }
        return {
            status: verdict.verdict,
            notes: verdict,
            correctedAnswer,
            correctedExplanation: verdict.correctedExplanation ? stripHtml(String(verdict.correctedExplanation)) : null
        };
    } catch  {
        return {
            status: 'error',
            notes: null,
            correctedAnswer: null,
            correctedExplanation: null
        };
    }
}
// ---------------------------------------------------------------------------
// Assembly + persistence
// ---------------------------------------------------------------------------
function stripHtml(html) {
    return (html || '').replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim();
}
/** Fix AI HTML to only valid classes (defensive — mirrors generate route behavior). */ function fixHtmlClasses(html) {
    return (html || '').replace(/q-node-yellow/g, 'q-node-orange').replace(/q-node-(?!red|green|blue|purple|orange|yellow|amber|teal|blocked)[a-z]+/g, 'q-node');
}
/** Media cue block appended to the stem when the asset actually exists. */ function mediaCue(kind, title) {
    if (kind === 'audio') {
        return `<div class='q-callout q-callout-blue'>🔊 <strong>Listen:</strong> play the audio above — the clinical presentation is delivered as sound. Answer based on what you hear.</div>`;
    }
    if (kind === 'sound') {
        return `<div class='q-callout q-callout-blue'>🔊 <strong>Auscultate:</strong> play the recorded clinical sound above and identify the finding by ear. Answer based on what you hear, not what you read.</div>`;
    }
    if (kind === 'video') {
        return `<div class='q-callout q-callout-blue'>📺 <strong>Watch:</strong> ${title ? `${title} — ` : ''}the video above demonstrates the concept tested in this question.</div>`;
    }
    if (kind === 'model') {
        return `<div class='q-callout q-callout-blue'>🧩 <strong>Explore:</strong> ${title ? `“${title}” — ` : ''}rotate and zoom the interactive 3D model above, then answer.</div>`;
    }
    if (kind === 'ecg') {
        return `<div class='q-callout q-callout-blue'>🫀 <strong>Read the ECG:</strong> interpret the rhythm strip above (rate, rhythm, intervals, wave morphology) — the diagnosis is NOT stated in the stem.</div>`;
    }
    return `<div class='q-callout q-callout-blue'>🖼️ <strong>Examine:</strong> study the image above before answering.</div>`;
}
async function saveAgentQuestion(q, params, plan) {
    const tags = [
        params.topic,
        params.system || 'General',
        'agent',
        plan.concept
    ].filter(Boolean).map((t)=>String(t).slice(0, 60));
    let diagramSpec = '';
    if (q.diagramSpec && q.diagramSpec.trim()) {
        // Validate it parses before storing
        try {
            const parsed = JSON.parse(q.diagramSpec);
            if (parsed && Array.isArray(parsed.nodes) && parsed.nodes.length >= 2) {
                diagramSpec = JSON.stringify(parsed);
            }
        } catch  {}
    }
    let sourcesJson = '[]';
    try {
        sourcesJson = q.sources && q.sources.trim() ? JSON.stringify(typeof q.sources === 'string' ? JSON.parse(q.sources) : q.sources) : '[]';
    } catch  {
        sourcesJson = '[]';
    }
    const saved = await _lib_db__WEBPACK_IMPORTED_MODULE_5__.db.question.create({
        data: {
            type: q.type || 'mcq',
            text: fixHtmlClasses(q.text || ''),
            options: JSON.stringify(q.options || []),
            answer: stripHtml(q.answer || ''),
            explanation: fixHtmlClasses(q.explanation || ''),
            mnemonic: fixHtmlClasses(q.mnemonic || ''),
            clinicalPearl: fixHtmlClasses(q.clinicalPearl || ''),
            distractorAnalysis: fixHtmlClasses(q.distractorAnalysis || ''),
            difficulty: q.difficulty || plan.difficulty || 'Medium',
            system: params.system || 'General',
            topic: params.topic,
            tags: JSON.stringify(tags),
            isAIGenerated: true,
            illustrationDescription: q.illustrationDescription || '',
            diagramSpec,
            sources: sourcesJson,
            imageUrl: q.imageUrl || '',
            audioUrl: q.audioUrl || '',
            videoUrl: q.videoUrl || '',
            modelUrl: q.modelUrl || '',
            labPanel: q.labPanel || '[]',
            pcgSpec: q.pcgSpec || '',
            hotspots: q.hotspots || '[]',
            structureTags: q.structureTags || '[]',
            blueprintOrgan: q.blueprintOrgan || '',
            blueprintTask: q.blueprintTask || '',
            reviewStatus: q.reviewStatus || 'pending',
            reviewNotes: q.reviewNotes || ''
        }
    });
    return {
        ...saved,
        options: JSON.parse(saved.options),
        tags: JSON.parse(saved.tags),
        sources: sourcesJson !== '[]' ? JSON.parse(sourcesJson) : [],
        distractorAnalysis: saved.distractorAnalysis || undefined,
        illustrationDescription: saved.illustrationDescription || undefined,
        diagramSpec: diagramSpec || undefined,
        mediaGeneratedBy: 'agent'
    };
}
/**
 * Generate ONE question through the full agent pipeline.
 * Each stage reports progress so the client sees the agent working step-by-step.
 */ async function generateOneQuestion(ctx, params, questionNum, total, report, isRetry = false) {
    const prefix = `[Q${questionNum}/${total}${isRetry ? ' · retry' : ''}`;
    // ── Stage 0: RAG retrieval (library grounding) ──
    // Batch-level planner grounding: topic query, retrieved once per job.
    const sourceIds = params.knowledgeSourceIds ?? [];
    let plannerContext = '';
    if (sourceIds.length) {
        if (ctx.plannerChunks === undefined) {
            report('plan', `${prefix} · 0/5 Library] 📚 Retrieving passages from your knowledge library…`);
            const plannerQuery = [
                params.topic,
                params.system && params.system !== 'General' ? params.system : '',
                ...params.weakTopics || []
            ].filter(Boolean).join(' ');
            ctx.plannerChunks = await retrieveSourceChunks(ctx, plannerQuery, sourceIds, 6);
        }
        if (ctx.plannerChunks && ctx.plannerChunks.length) {
            plannerContext = (0,_knowledge_hybrid__WEBPACK_IMPORTED_MODULE_7__/* .formatHybridContext */ .zG)(ctx.plannerChunks);
            report('plan', `${prefix} · 0/5 Library] 📚 ${ctx.plannerChunks.length} passages grounded (${ctx.plannerChunks[0].documentTitle}${ctx.plannerChunks.length > 1 ? ` +${ctx.plannerChunks.length - 1} more` : ''})`);
        } else {
            report('plan', `${prefix} · 0/5 Library] 📚 No matching passages found — generating from the model's knowledge`);
        }
    }
    // ── Stage 1: Plan ──
    report('plan', `${prefix} · 1/5 Plan] 🧠 Planner agent is designing the question blueprint…`);
    const plan = await parseAgentJson(await agentLLM(ctx, PLANNER_SYSTEM, buildPlannerPrompt(params, plannerContext)));
    if (!plan || !plan.concept) throw new Error('planner returned no concept');
    // Per-question retrieval: concept-focused query for stem/reviewer/explanation.
    let sourceChunks = [];
    let sourceContext = '';
    if (sourceIds.length) {
        const conceptQuery = `${params.topic} — ${plan.concept}: ${plan.stemIdea || plan.learningObjective || ''}`.slice(0, 400);
        sourceChunks = await retrieveSourceChunks(ctx, conceptQuery, sourceIds, 8);
        if (!sourceChunks.length && ctx.plannerChunks?.length) sourceChunks = ctx.plannerChunks;
        if (sourceChunks.length) {
            sourceContext = (0,_knowledge_hybrid__WEBPACK_IMPORTED_MODULE_7__/* .formatHybridContext */ .zG)(sourceChunks);
            report('stem', `${prefix} · Library] 📚 Grounded on ${sourceChunks.length} passages from "${sourceChunks[0].documentTitle}"`);
        }
    }
    const mediaPlan = Array.isArray(plan.mediaPlan) ? plan.mediaPlan.slice(0, 3) : [];
    console.log('[agent] plan:', JSON.stringify({
        concept: plan.concept,
        difficulty: plan.difficulty,
        blueprint: `${plan.blueprintOrgan || '?'}/${plan.blueprintTask || '?'}`,
        media: mediaPlan.map((m)=>({
                kind: m.kind,
                role: m.role,
                source: m.source,
                hasScript: Boolean(m.audioScript),
                hasPrompt: Boolean(m.imagePrompt),
                ecg: m.ecgRhythm || undefined,
                ecgClick: m.ecgClick || undefined
            }))
    }));
    const audioItem = mediaPlan.find((m)=>m.kind === 'audio' && m.role === 'stem');
    const soundItem = mediaPlan.find((m)=>m.kind === 'sound' && m.role === 'stem');
    const imageItem = mediaPlan.find((m)=>m.kind === 'image');
    const videoItem = mediaPlan.find((m)=>m.kind === 'video');
    const modelItem = mediaPlan.find((m)=>m.kind === 'model');
    const ecgItem = mediaPlan.find((m)=>m.kind === 'ecg');
    // ── Stage 2: Research real media (web search + local ECG render) ──
    const researchParts = [];
    report('research', `${prefix} · 2/5 Research] 🔎 Media agent is searching for real assets…`);
    // ECG strips are rendered LOCALLY from a rhythm template — always available.
    let ecg = null;
    if (ecgItem) {
        ecg = (0,_ecg_generator__WEBPACK_IMPORTED_MODULE_6__/* .saveEcgSvg */ .Hf)({
            rhythm: ecgItem.ecgRhythm || 'normal-sinus',
            rate: ecgItem.ecgRate,
            findings: ecgItem.ecgFindings
        });
    }
    const [video, searchedImage, sound, model] = await Promise.all([
        videoItem ? toolFindVideo(videoItem.videoQuery || videoItem.searchQuery || `${params.topic} ${plan.concept}`) : Promise.resolve(null),
        imageItem && imageItem.source === 'search' && !ecg ? (async ()=>{
            const imgQuery = imageItem.searchQuery || `${params.topic} medical image`;
            // Radiology (X-ray / CT / MRI / ultrasound) → license-filtered Commons search
            if (looksLikeRadiologyQuery(`${imgQuery} ${plan.concept}`)) {
                const rad = await toolSearchRadiologyImage(imgQuery);
                if (rad) return {
                    url: rad.url,
                    caption: rad.title,
                    credit: rad.credit
                };
            }
            const web = await toolSearchImage(imgQuery);
            return web ? {
                url: web.url,
                caption: web.caption
            } : null;
        })() : Promise.resolve(null),
        soundItem ? toolFindSound(soundItem.soundQuery || `${params.topic} sound`) : Promise.resolve(null),
        modelItem ? toolFindModel(modelItem.modelQuery || `${params.topic} 3d anatomy model`) : Promise.resolve(null)
    ]);
    if (videoItem) {
        researchParts.push(video ? `📺 video found: ${video.title}` : '📺 video not found — question will be text-only');
    }
    if (imageItem && imageItem.source === 'search') {
        researchParts.push(searchedImage ? searchedImage.credit ? `🩻 real radiology image found — ${searchedImage.credit}` : '🖼️ real image found' : '🖼️ image search unavailable — will generate an illustration instead');
    }
    if (soundItem) {
        researchParts.push(sound ? `🎧 real sound found: ${sound.title} (${sound.credit})` : '🎧 no real recording found — will narrate a description of the sound instead');
    }
    if (modelItem) {
        researchParts.push(model ? `🧩 3D model found: ${model.title}` : '🧩 3D model not found — question will be text-only');
    }
    if (ecgItem) {
        researchParts.push(`🫀 ECG strip will be rendered (${ecgItem.ecgRhythm || 'sinus rhythm'}${ecgItem.ecgClick ? ' — interactive click mode' : ''})`);
    }
    if (researchParts.length === 0) researchParts.push('text-only question');
    report('research', `${prefix} · 2/5 Research] 🔎 ${researchParts.join(' · ')}`);
    // ── Stage 3: Stem ──
    report('stem', `${prefix} · 3/5 Stem] ✍️ Stem agent is writing the clinical vignette and options…`);
    const stem = await parseAgentJson(await agentLLM(ctx, STEM_SYSTEM, buildStemPrompt(params, plan, {
        audio: Boolean(audioItem),
        sound: Boolean(sound),
        soundTitle: sound?.title,
        soundQueryPreview: soundItem?.soundQuery,
        image: ecg ? 'ecg' : searchedImage ? 'searched' : imageItem ? 'generated' : 'none',
        ecgClick: ecgItem?.ecgClick || false,
        ecgRegions: ecg?.regions.map((r)=>r.label),
        video,
        model,
        audioScriptPreview: audioItem?.audioScript,
        imagePromptPreview: ecg ? `${ecg.caption}${(ecgItem?.ecgFindings || []).length ? ` — ${(ecgItem?.ecgFindings || []).join('; ')}` : ''}` : imageItem?.imagePrompt || (searchedImage ? searchedImage.caption : '')
    }, sourceContext)));
    let options = Array.isArray(stem.options) ? stem.options.map((o)=>stripHtml(String(o))) : [];
    const answer = stripHtml(String(stem.answer || ''));
    const qType = stem.type === 'tf' || stem.type === 'short' ? stem.type : 'mcq';
    if (qType === 'tf' && options.length === 0) options = [
        'True',
        'False'
    ];
    if (!stem.text || !answer) throw new Error('stem agent returned incomplete question');
    // ── Stage 4: Medical accuracy review — a SECOND, independent LLM audits the
    //    question BEFORE the explanation is written, so a corrected answer key
    //    also gets a correct explanation. Catches wrong answer keys; confident
    //    corrections are applied, irreparable questions flagged. ──
    report('review', `${prefix} · Review] 🔍 Medical accuracy reviewer is auditing the question…`);
    // Media context: tell the reviewer which assets the question legitimately
    // references, so "the image above" / "listen to the audio" are not false-flagged.
    const mediaParts = [];
    if (ecg) mediaParts.push('an ECG rhythm strip (rendered above the stem)');
    else if (searchedImage?.url) mediaParts.push(searchedImage.credit ? 'a real radiology image with license attribution' : 'a real clinical image');
    else if (imageItem) mediaParts.push('an educational medical illustration (AI-generated, shown above the stem)');
    if (sound?.url) mediaParts.push('a real recorded clinical sound (plays above the stem)');
    else if (audioItem?.audioScript) mediaParts.push('audio narration of the clinical presentation (plays above the stem)');
    else if (soundItem && (soundItem.soundDescription || soundItem.audioScript)) mediaParts.push("an audio narration of the sound's acoustic character (synthesized and played above the stem)");
    if (video) mediaParts.push('an embedded educational video');
    if (model) mediaParts.push('an interactive 3D anatomy model');
    const mediaNote = mediaParts.length ? `This question ATTACHES the following media that the stem may legitimately reference ("the image above", "listen to the audio", "the ECG above"…). Do NOT flag references to them as missing: ${mediaParts.join('; ')}.` : '';
    let finalAnswer = answer;
    const review = await reviewQuestion(ctx, plan, String(stem.text), options, answer, mediaNote, sourceContext);
    let reviewFixNote = '';
    if (review.status === 'fix' && review.correctedAnswer) {
        finalAnswer = review.correctedAnswer;
        if (review.correctedExplanation) {
            reviewFixNote = stripHtml(review.correctedExplanation).slice(0, 300);
        }
        report('review', `${prefix} · Review] 🔧 Reviewer corrected the answer key`);
    } else if (review.status === 'flag') {
        report('error', `${prefix} · Review] 🚩 Question failed the medical accuracy review — regenerating is safer than teaching it wrong`);
        throw new Error('flagged by medical accuracy review');
    } else if (review.status === 'approved') {
        report('review', `${prefix} · Review] ✅ Passed the medical accuracy review`);
    }
    // ── Stage 5: Explanation (written for the REVIEWED answer key) ──
    report('explanation', `${prefix} · 4/5 Explain] 📚 Explanation agent is writing the teaching content…`);
    const explanation = await parseAgentJson(await agentLLM(ctx, EXPLANATION_SYSTEM, buildExplanationPrompt(params, plan, stem.text, finalAnswer, options, sourceContext)));
    let finalExplanation = String(explanation.explanation || '');
    if (reviewFixNote) {
        finalExplanation = `${finalExplanation}<div class='q-callout q-callout-amber'><b>🔧 Answer key corrected after medical review:</b> ${reviewFixNote}</div>`;
    }
    // ── Stage 6: Create generative media + assemble ──
    const creationParts = [];
    report('media', `${prefix} · 5/5 Media] 🎨 Media agent is creating the assets…`);
    const [imageUrl, audioUrl] = await Promise.all([
        (async ()=>{
            if (ecg) return ecg.url; // the locally-rendered ECG strip IS the question's image
            if (searchedImage?.url) return searchedImage.url; // real image already found
            if (!imageItem) return null;
            const url = await toolGenerateImage(imageItem.imagePrompt || `Medical illustration for medical education: ${plan.concept} — ${plan.stemIdea}`);
            creationParts.push(url ? '🖼️ illustration generated' : '🖼️ image generation failed (text-only)');
            return url;
        })(),
        (async ()=>{
            // A real recorded sound REPLACES narrated audio — don't synthesize both.
            if (sound?.url) return null;
            if (!audioItem?.audioScript) return null;
            const url = await toolTTS(audioItem.audioScript);
            creationParts.push(url ? '🔊 narration synthesized' : '🔊 audio failed');
            return url;
        })()
    ]);
    // ── Resolve the question's audio: real recorded sound first, TTS narration second,
    //    planner's acoustic description as a narrated fallback third. ──
    let finalAudioUrl = null;
    let audioIsSound = false;
    if (sound?.url) {
        finalAudioUrl = sound.url;
        audioIsSound = true;
        creationParts.push(`🎧 real clinical sound embedded (${sound.credit})`);
    } else if (audioUrl) {
        finalAudioUrl = audioUrl;
    } else if (soundItem && (soundItem.soundDescription || soundItem.audioScript)) {
        // Self-heal: a real sound was planned but none was found → narrate the planner's
        // description of its acoustic character so the 🔊 reference is never broken.
        const healedUrl = await toolTTS(soundItem.soundDescription || soundItem.audioScript || '');
        if (healedUrl) {
            finalAudioUrl = healedUrl;
            creationParts.push('🎧 sound not found — narrated its acoustic description (fallback)');
        }
    }
    if (creationParts.length === 0 && !searchedImage) creationParts.push('no media planned');
    if (model) creationParts.push('🧩 3D model embedded');
    report('media', `${prefix} · 5/5 Media] 🎨 ${creationParts.join(' · ')}`);
    // ── Assemble: append media cues to the stem for the assets that actually exist ──
    let stemHtml = fixHtmlClasses(String(stem.text));
    if (model) stemHtml = `${mediaCue('model', model.title)}${stemHtml}`;
    if (video) stemHtml = `${mediaCue('video', video.title)}${stemHtml}`;
    if (ecg) {
        stemHtml = `${mediaCue('ecg', ecg.caption)}${stemHtml}`;
    } else if (imageUrl) {
        stemHtml = `${mediaCue('image')}${stemHtml}`;
    }
    if (finalAudioUrl && !/🔊/.test(stemHtml)) {
        stemHtml = `${mediaCue(audioIsSound ? 'sound' : 'audio')}${stemHtml}`;
    }
    // Self-heal: the stem references audio but none was synthesized (e.g. the
    // planner omitted the script) → narrate the stem text itself so the
    // listening reference is never broken.
    if (!finalAudioUrl && /🔊|listen to the audio/i.test(stemHtml)) {
        const fallbackScript = stripHtml(stemHtml).slice(0, 900);
        const healedUrl = await toolTTS(fallbackScript);
        if (healedUrl) {
            finalAudioUrl = healedUrl;
            report('media', `${prefix} · 5/5 Media] 🔊 audio narration synthesized from the stem (self-heal)`);
        }
    }
    // Explanation audio (only when no stem audio uses the field) — narrate a compact summary
    if (!finalAudioUrl) {
        const explanationAudioItem = mediaPlan.find((m)=>m.kind === 'audio' && m.role === 'explanation');
        if (explanationAudioItem?.audioScript) {
            const url = await toolTTS(explanationAudioItem.audioScript);
            if (url) finalAudioUrl = url;
        }
    }
    report('saved', `${prefix} · 5/5 Save] 💾 Assembling and saving the question…`);
    // Media attribution sources — real sounds / models / radiology credit their source.
    const mediaSources = [];
    if (sourceChunks.length) {
        mediaSources.push(...(0,_knowledge_hybrid__WEBPACK_IMPORTED_MODULE_7__/* .hybridCitations */ .ll)(sourceChunks));
    }
    if (sound) {
        mediaSources.push({
            type: 'audio',
            title: `Recorded clinical sound: ${sound.title} — ${sound.credit}`
        });
    }
    if (model) {
        mediaSources.push({
            type: 'model',
            title: `Interactive 3D model: ${model.title} — ${model.credit}`
        });
    }
    if (searchedImage?.credit) {
        mediaSources.push({
            type: 'image',
            title: `Radiology image: ${searchedImage.caption || 'medical image'} — ${searchedImage.credit}`
        });
    }
    let parsedSources = [];
    try {
        parsedSources = typeof explanation.sources === 'string' ? JSON.parse(explanation.sources) : Array.isArray(explanation.sources) ? explanation.sources : [];
    } catch  {
        parsedSources = [];
    }
    // ── Stem extras: lab panel / phonocardiogram / structure tags / hotspots ──
    const normLabel = (s)=>stripHtml(String(s || '')).replace(/\s+/g, ' ').trim().toLowerCase();
    const optionNorms = new Set(options.map(normLabel));
    let labPanelJson = '[]';
    if (Array.isArray(stem.labPanel) && stem.labPanel.length) {
        const panels = stem.labPanel.filter((p)=>p && p.name && Array.isArray(p.rows) && p.rows.length).slice(0, 3).map((p)=>({
                name: String(p.name).slice(0, 80),
                rows: p.rows.filter((r)=>r && r.test).slice(0, 10).map((r)=>({
                        test: String(r.test).slice(0, 60),
                        value: String(r.value ?? '').slice(0, 20),
                        unit: String(r.unit ?? '').slice(0, 20),
                        flag: [
                            'H',
                            'L',
                            ''
                        ].includes(String(r.flag || '')) ? String(r.flag || '') : ''
                    }))
            })).filter((p)=>p.rows.length >= 2);
        if (panels.length) labPanelJson = JSON.stringify(panels);
    }
    // Phonocardiogram spec — only meaningful when the question actually has audio
    let pcgSpecJson = '';
    if (finalAudioUrl && audioIsSound && stem.pcgTiming && stem.pcgTiming.phase) {
        const phase = [
            'systolic',
            'diastolic',
            'holosystolic',
            'continuous'
        ].includes(String(stem.pcgTiming.phase)) ? String(stem.pcgTiming.phase) : 'systolic';
        pcgSpecJson = JSON.stringify({
            phase,
            shape: String(stem.pcgTiming.shape || 'crescendo-decrescendo'),
            s1: stem.pcgTiming.s1 !== false,
            s2: stem.pcgTiming.s2 !== false,
            bestHeard: String(stem.pcgTiming.bestHeard || '').slice(0, 80)
        });
    }
    // 3D structure tags — the chips act as answers, so the correct answer must be among them
    let structureTagsJson = '[]';
    if (model && Array.isArray(stem.structureTags) && stem.structureTags.length) {
        const tags = stem.structureTags.filter((t)=>t && t.name && normLabel(t.name) && (t.letter || t.name)).slice(0, 6).map((t, i)=>({
                letter: String(t.letter || String.fromCharCode(65 + i)).slice(0, 2),
                name: stripHtml(String(t.name)).slice(0, 80)
            }));
        const answerTagged = tags.some((t)=>normLabel(t.name) === normLabel(finalAnswer));
        const optionsTagged = tags.filter((t)=>optionNorms.has(normLabel(t.name))).length;
        if (tags.length >= 3 && answerTagged && optionsTagged >= 2) {
            structureTagsJson = JSON.stringify(tags);
        }
    }
    // Image hotspots — ECG click mode uses the generated wave-region pins;
    // generated images use the stem agent's percentage pins (labels must match options)
    let hotspotsJson = '[]';
    if (ecg && ecgItem?.ecgClick && ecg.regions.length) {
        const validRegions = ecg.regions.filter((r)=>optionNorms.has(normLabel(r.label)));
        if (validRegions.length >= 3) hotspotsJson = JSON.stringify(validRegions);
    } else if (imageUrl && !ecg && Array.isArray(stem.hotspots) && stem.hotspots.length) {
        const valid = stem.hotspots.filter((h)=>h && h.label && optionNorms.has(normLabel(h.label)) && Number.isFinite(Number(h.x)) && Number.isFinite(Number(h.y))).slice(0, 6).map((h)=>({
                label: stripHtml(String(h.label)).slice(0, 80),
                x: Math.max(2, Math.min(98, Number(h.x))),
                y: Math.max(2, Math.min(98, Number(h.y)))
            }));
        if (valid.length >= 3) hotspotsJson = JSON.stringify(valid);
    }
    const assembled = {
        type: qType,
        text: stemHtml,
        options,
        answer: finalAnswer,
        explanation: finalExplanation,
        mnemonic: String(explanation.mnemonic || ''),
        clinicalPearl: String(explanation.clinicalPearl || ''),
        distractorAnalysis: String(explanation.distractorAnalysis || ''),
        difficulty: plan.difficulty || params.difficulties?.[0] || 'Medium',
        diagramSpec: explanation.diagramSpec ? String(explanation.diagramSpec) : '',
        sources: JSON.stringify([
            ...parsedSources,
            ...mediaSources
        ]),
        illustrationDescription: String(explanation.illustrationDescription || ''),
        imageUrl: imageUrl || '',
        audioUrl: finalAudioUrl || '',
        videoUrl: video?.embedUrl || '',
        modelUrl: model?.embedUrl || '',
        labPanel: labPanelJson,
        pcgSpec: pcgSpecJson,
        hotspots: hotspotsJson,
        structureTags: structureTagsJson,
        blueprintOrgan: plan.blueprintOrgan || '',
        blueprintTask: plan.blueprintTask || '',
        reviewStatus: review.status === 'approved' || review.status === 'fix' ? 'approved' : 'pending',
        reviewNotes: review.notes ? JSON.stringify(review.notes) : ''
    };
    try {
        return await saveAgentQuestion(assembled, params, plan);
    } catch (saveErr) {
        // DB write failed — return without persisting so the user still gets the question
        console.error('[agent] failed to save question to DB:', saveErr instanceof Error ? saveErr.message : saveErr);
        return {
            id: `agent-${Date.now()}-${randId()}`,
            ...assembled,
            tags: [
                params.topic,
                params.system || 'General',
                'agent'
            ],
            isAIGenerated: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
}
/**
 * Run the agent pipeline for N questions. Questions are generated sequentially;
 * a failure on one question does not abort the batch. Questions FLAGGED by the
 * medical accuracy reviewer get ONE automatic regeneration attempt (the flag
 * is the pipeline's fault, not the user's) within a retry budget of count+2.
 */ async function runAgentQuestionGeneration(request, params, report) {
    const ctx = {
        request,
        useSdkDirect: false
    };
    // Resolve the user once for tenant-scoped RAG retrieval (best-effort —
    // retrieval silently degrades to [] when auth is unavailable).
    if (params.knowledgeSourceIds?.length) {
        // resolveUserId matches the knowledge APIs' ownership model (session
        // user OR the guest singleton) — getAuthenticatedUserId has no guest
        // fallback, which silently skipped RAG grounding for guest users.
        try {
            ctx.userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_8__/* .resolveUserId */ .n$)();
        } catch  {
            ctx.userId = undefined;
        }
    }
    const saved = [];
    const count = Math.min(Math.max(params.count || 1, 1), 5);
    const maxAttempts = count + 2; // retry budget for flagged/failed questions
    let attempts = 0;
    while(saved.length < count && attempts < maxAttempts){
        attempts++;
        const questionNum = saved.length + 1;
        const isRetry = attempts > questionNum;
        try {
            const q = await generateOneQuestion(ctx, params, questionNum, count, report, isRetry);
            if (q) {
                saved.push(q);
                report('saved', `✅ Question ${saved.length}/${count} ready`, q);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`[agent] question attempt ${attempts} failed:`, message);
            const retryLeft = saved.length < count && attempts < maxAttempts;
            report('error', `⚠️ Question ${questionNum} ${message.includes('flagged') ? 'was flagged by the medical reviewer' : `failed (${message.slice(0, 100)})`}${retryLeft ? ' — regenerating…' : ' — continuing…'}`);
        }
    }
    return saved;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 603630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _S: () => (/* binding */ createJob),
/* harmony export */   ax: () => (/* binding */ getJob),
/* harmony export */   lh: () => (/* binding */ updateJob)
/* harmony export */ });
/* unused harmony export deleteJob */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/**
 * File-backed job store for async generation tasks.
 * Persists jobs to .job-store.json so they survive server restarts (HMR, crash, etc.).
 * Uses batched (debounced) writes to avoid excessive disk I/O.
 * Auto-cleans completed/failed jobs after 10 minutes.
 * On startup, marks any jobs stuck in "processing" for >10 minutes as "failed".
 */ 

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------
const STORE_PATH = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), '.job-store.json');
const JOB_TTL_MS = 10 * 60 * 1000; // 10 minutes
const STALE_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes — only mark processing jobs older than this as failed
/** Strip large fields (e.g. imageBase64) from results before writing to disk. */ function sanitizeForDisk(job) {
    if (!job.result || !Array.isArray(job.result)) return job;
    const sanitizedResult = job.result.map((item)=>{
        if (item && typeof item === 'object') {
            const clone = {
                ...item
            };
            if ('imageBase64' in clone) {
                delete clone.imageBase64;
            }
            return clone;
        }
        return item;
    });
    return {
        ...job,
        result: sanitizedResult
    };
}
// ---------------------------------------------------------------------------
// Load from disk on module init
// ---------------------------------------------------------------------------
const jobs = new Map();
let jobCounter = 0;
let writeScheduled = false;
try {
    if ((0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(STORE_PATH)) {
        const raw = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)(STORE_PATH, 'utf-8');
        const data = JSON.parse(raw);
        const now = Date.now();
        for (const job of data.jobs){
            // Stale processing detection: only mark as failed if processing for >10 min
            if (job.status === 'processing' && now - job.updatedAt > STALE_THRESHOLD_MS) {
                job.status = 'failed';
                job.error = 'Job was interrupted by a server restart. Please try again.';
                job.updatedAt = now;
            }
            jobs.set(job.id, job);
        }
        // Restore jobCounter so new IDs don't collide
        if (typeof data.jobCounter === 'number') {
            jobCounter = data.jobCounter;
        }
        // Persist the cleaned-up state immediately
        flushToDisk();
    }
} catch (err) {
    // If we can't read/parse the file, start fresh — don't crash the server
    console.warn('[job-store] Failed to load persisted jobs, starting fresh:', err);
}
// ---------------------------------------------------------------------------
// Batched (debounced) writes
// ---------------------------------------------------------------------------
function flushToDisk() {
    try {
        const allJobs = Array.from(jobs.values()).map(sanitizeForDisk);
        (0,fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync)(STORE_PATH, JSON.stringify({
            jobs: allJobs,
            jobCounter
        }), 'utf-8');
    } catch (err) {
        console.error('[job-store] Failed to flush jobs to disk:', err);
    }
    writeScheduled = false;
}
function scheduleWrite() {
    if (writeScheduled) return; // already scheduled
    writeScheduled = true;
    // Use a microtask-style short delay (setImmediate in Node, fallback to setTimeout)
    // This batches multiple updateJob calls in the same tick / near-future
    const schedule = typeof setImmediate === 'function' ? setImmediate : (fn)=>setTimeout(fn, 0);
    schedule(flushToDisk);
}
// ---------------------------------------------------------------------------
// Auto-cleanup: remove completed/failed jobs older than TTL
// ---------------------------------------------------------------------------
setInterval(()=>{
    const now = Date.now();
    let changed = false;
    for (const [id, job] of jobs){
        if ((job.status === 'completed' || job.status === 'failed') && now - job.updatedAt > JOB_TTL_MS) {
            jobs.delete(id);
            changed = true;
        }
    }
    if (changed) {
        scheduleWrite();
    }
}, 5 * 60 * 1000);
// ---------------------------------------------------------------------------
// Public API (same signatures as before)
// ---------------------------------------------------------------------------
/**
 * Create a new job and return its ID
 */ function createJob() {
    jobCounter++;
    const id = `job_${Date.now()}_${jobCounter}`;
    const now = Date.now();
    jobs.set(id, {
        id,
        status: 'pending',
        progress: 'Starting...',
        attempt: 0,
        result: null,
        partialResult: null,
        error: null,
        createdAt: now,
        updatedAt: now
    });
    scheduleWrite();
    return id;
}
/**
 * Update a job's status
 */ function updateJob(id, updates) {
    const job = jobs.get(id);
    if (!job) return;
    Object.assign(job, updates, {
        updatedAt: Date.now()
    });
    scheduleWrite();
}
/**
 * Get a job's data
 */ function getJob(id) {
    return jobs.get(id) || null;
}
/**
 * Delete a job
 */ function deleteJob(id) {
    jobs.delete(id);
    scheduleWrite();
}


/***/ }),

/***/ 643750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hf: () => (/* binding */ saveEcgSvg),
/* harmony export */   lZ: () => (/* binding */ ECG_REGION_LABELS),
/* harmony export */   xU: () => (/* binding */ SUPPORTED_ECG_RHYTHMS)
/* harmony export */ });
/* unused harmony export renderEcgStrip */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/**
 * ECG Rhythm Strip Generator
 *
 * Renders clinically-accurate ECG rhythm strips as SVG (standard ECG paper:
 * 25 mm/s, 10 mm/mV, pink minor / red major grid) so the agent pipeline can
 * embed crisp, printable, license-free ECGs in questions.
 *
 * Supported rhythms: normal sinus, sinus tachy/brady, atrial fibrillation,
 * atrial flutter, AV block 1° / Mobitz-I / Mobitz-II / complete (3°), SVT,
 * VT, VF, asystole, LBBB, hyperkalemia, STEMI (ST elevation), sinus w/ ST
 * depression. The beat morphology is parameterized (P/PR/QRS/ST/T) and RR
 * intervals can be irregular (AF) or patterned (blocks).
 *
 * Also emits REGION metadata (P wave / QRS / T wave / ST segment / PR
 * interval) as percentage coordinates — used by QuestionCard to render
 * interactive "click on the wave" hotspots that map to answer options.
 */ 

// ---------------------------------------------------------------------------
// Geometry constants (half-scale paper: 1s = 125px, 1mV = 50px)
// ---------------------------------------------------------------------------
const PX_PER_MS = 0.125; // 125 px per second
const PX_PER_MV = 50;
const SECONDS_PER_ROW = 8;
const ROWS = 2;
const W = SECONDS_PER_ROW * 1000 * PX_PER_MS; // 1000 px per row
const VIEW_W = W;
const ROW_H = 3 * PX_PER_MV; // 3 mV per row
const VIEW_H = ROWS * ROW_H + 46; // + caption strip
const BASELINE_MV = 0.0; // lead II baseline
const NORMAL_BEAT = {
    pAmp: 0.15,
    prMs: 160,
    qAmp: 0.08,
    qrsMs: 80,
    rAmp: 1.0,
    sAmp: 0.2,
    stShift: 0,
    tAmp: 0.3,
    tMs: 160
};
function mulberry(seed) {
    let a = seed >>> 0;
    return ()=>{
        a |= 0;
        a = a + 0x6d2b79f5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
const RHYTHMS = {
    'normal-sinus': {
        label: 'Sinus rhythm',
        defaults: {}
    },
    'sinus-tachycardia': {
        label: 'Sinus tachycardia',
        defaults: {}
    },
    'sinus-bradycardia': {
        label: 'Sinus bradycardia',
        defaults: {}
    },
    'sinus-st-depression': {
        label: 'Sinus rhythm with ST depression',
        defaults: {
            stShift: -0.15
        }
    },
    'atrial-fibrillation': {
        label: 'Atrial fibrillation',
        defaults: {
            pAmp: 0
        },
        noP: true,
        rr: (_i, _rate, seed)=>{
            const rnd = mulberry(seed + _i * 31)();
            return 360 + rnd * 520; // irregularly irregular 60-160 effective
        },
        baseline: (xMs, seed)=>{
            const rnd = mulberry(seed + Math.floor(xMs / 40))();
            return (rnd - 0.5) * 3.2; // fine fibrillatory oscillation
        }
    },
    'atrial-flutter': {
        label: 'Atrial flutter',
        defaults: {
            pAmp: 0
        },
        noP: true,
        rr: (i)=>i % 2 === 0 ? 400 : 400,
        baseline: (xMs)=>{
            // sawtooth flutter waves ~300/min (200 ms period)
            const phase = xMs % 200 / 200;
            return phase < 0.7 ? phase * 4 : (1 - phase) * 9.3;
        }
    },
    'av-block-1': {
        label: 'First-degree AV block',
        defaults: {
            prMs: 280
        }
    },
    'av-block-2-mobitz1': {
        label: 'Second-degree AV block (Mobitz I / Wenckebach)',
        defaults: {},
        rr: (i)=>i % 4 === 3 ? null : 1
    },
    'av-block-2-mobitz2': {
        label: 'Second-degree AV block (Mobitz II)',
        defaults: {},
        rr: (i)=>i % 3 === 2 ? null : 800
    },
    'av-block-3-complete': {
        label: 'Complete (third-degree) AV block',
        defaults: {
            qrsMs: 140,
            rAmp: 0.9,
            sAmp: 0.25,
            pAmp: 0.12
        },
        rr: ()=>1500,
        baseline: (xMs, seed)=>{
            // independent marching P waves at ~75
            const pPhase = xMs % 800 / 800;
            const rnd = mulberry(seed)();
            if (pPhase > 0.86) return -6 * (1 - rnd * 0.2);
            return 0;
        }
    },
    svt: {
        label: 'Supraventricular tachycardia',
        defaults: {
            pAmp: 0,
            tAmp: 0.2,
            prMs: 70
        },
        fixedRate: 185
    },
    vt: {
        label: 'Ventricular tachycardia',
        defaults: {
            pAmp: 0,
            prMs: 30,
            qrsMs: 160,
            rAmp: 1.1,
            sAmp: 0.9,
            tAmp: 0
        },
        fixedRate: 165
    },
    vf: {
        label: 'Ventricular fibrillation',
        defaults: {
            pAmp: 0,
            rAmp: 0,
            tAmp: 0,
            qAmp: 0,
            sAmp: 0
        }
    },
    asystole: {
        label: 'Asystole',
        defaults: {
            pAmp: 0,
            qAmp: 0,
            rAmp: 0,
            sAmp: 0,
            tAmp: 0
        }
    },
    lbbb: {
        label: 'Left bundle branch block',
        defaults: {
            qAmp: 0,
            qrsMs: 140,
            sAmp: 0.05,
            slurMs: 60,
            tAmp: -0.25
        }
    },
    hyperkalemia: {
        label: 'Hyperkalemia changes',
        defaults: {
            pAmp: 0.05,
            qrsMs: 130,
            tAmp: 0.85,
            tMs: 130,
            slurMs: 40,
            sAmp: 0.3
        }
    },
    stemi: {
        label: 'ST-elevation (STEMI pattern)',
        defaults: {
            stShift: 0.35,
            tAmp: 0.55,
            qAmp: 0.04,
            sAmp: 0.12
        }
    }
};
const RHYTHM_ALIASES = {
    sinus: 'normal-sinus',
    'sinus-rhythm': 'normal-sinus',
    nsr: 'normal-sinus',
    'sinus-tach': 'sinus-tachycardia',
    tachycardia: 'sinus-tachycardia',
    'sinus-brady': 'sinus-bradycardia',
    bradycardia: 'sinus-bradycardia',
    af: 'atrial-fibrillation',
    afib: 'atrial-fibrillation',
    'atrial-fib': 'atrial-fibrillation',
    flutter: 'atrial-flutter',
    'a-flutter': 'atrial-flutter',
    'first-degree-av-block': 'av-block-1',
    '1st-degree': 'av-block-1',
    'av-block-1-degree': 'av-block-1',
    'wenckebach': 'av-block-2-mobitz1',
    mobitz1: 'av-block-2-mobitz1',
    'mobitz-i': 'av-block-2-mobitz1',
    mobitz2: 'av-block-2-mobitz2',
    'mobitz-ii': 'av-block-2-mobitz2',
    'complete-heart-block': 'av-block-3-complete',
    chb: 'av-block-3-complete',
    'third-degree': 'av-block-3-complete',
    '3rd-degree': 'av-block-3-complete',
    'svt': 'svt',
    'supraventricular': 'svt',
    'vtach': 'vt',
    'ventricular-tachycardia': 'vt',
    'vfib': 'vf',
    'ventricular-fibrillation': 'vf',
    'v-fib': 'vf',
    'flat-line': 'asystole',
    'flatline': 'asystole',
    'stemmi': 'stemi',
    'st-elevation': 'stemi',
    'st-elev': 'stemi',
    'st-depression': 'sinus-st-depression',
    'lbbb': 'lbbb',
    'left-bundle-branch-block': 'lbbb',
    'bundle-branch': 'lbbb',
    'hyperkalemia': 'hyperkalemia',
    'peaked-t': 'hyperkalemia',
    'peaked-t-waves': 'hyperkalemia'
};
function resolveRhythm(rhythm) {
    const key = (rhythm || '').trim().toLowerCase().replace(/\s+/g, '-');
    if (RHYTHMS[key]) return key;
    if (RHYTHM_ALIASES[key]) return RHYTHM_ALIASES[key];
    // Fuzzy: contains match
    for (const alias of Object.keys(RHYTHM_ALIASES)){
        if (key.includes(alias) || alias.includes(key)) return RHYTHM_ALIASES[alias];
    }
    for (const name of Object.keys(RHYTHMS)){
        if (key.includes(name) || name.includes(key)) return name;
    }
    return 'normal-sinus';
}
function beatPoints(morph, startMs, dropQrs) {
    const pts = [];
    const x = (ms)=>(startMs + ms) * PX_PER_MS;
    const mV = (v)=>-v * PX_PER_MV; // SVG y grows downward
    const { pAmp, prMs, qAmp, qrsMs, rAmp, sAmp, stShift, tAmp, tMs, slurMs = 0 } = morph;
    // P wave (or PR flat when absent)
    if (pAmp > 0.005) {
        const pStart = 0;
        const pDur = 90;
        for(let t = 0; t <= pDur; t += 10){
            const s = t / pDur;
            pts.push({
                x: x(pStart + t),
                y: mV(BASELINE_MV + pAmp * Math.sin(Math.PI * s))
            });
        }
        pts.push({
            x: x(pDur),
            y: mV(BASELINE_MV)
        });
    }
    const qStart = prMs;
    if (dropQrs) {
        // Dropped beat: only P + flat baseline (blocks)
        pts.push({
            x: x(qStart + 260),
            y: mV(BASELINE_MV)
        });
        return {
            pts,
            waveMs: qStart + 260
        };
    }
    // QRS complex
    const ptsMv = [];
    // Q dip
    if (qAmp > 0.005) ptsMv.push([
        qStart,
        -qAmp
    ]);
    else ptsMv.push([
        qStart,
        0
    ]);
    // R upstroke
    const rPeak = qStart + qrsMs * 0.4;
    ptsMv.push([
        rPeak,
        rAmp
    ]);
    // S downstroke (with slur for BBB-style wide complexes)
    const sEnd = qStart + qrsMs + (slurMs || 0);
    ptsMv.push([
        sEnd,
        -sAmp
    ]);
    for (const [ms, mv] of ptsMv)pts.push({
        x: x(ms),
        y: mV(BASELINE_MV + mv)
    });
    // ST segment (shifted)
    const stStart = sEnd + 8;
    const tStart = stStart + 70;
    pts.push({
        x: x(stStart),
        y: mV(BASELINE_MV + stShift)
    });
    pts.push({
        x: x(tStart),
        y: mV(BASELINE_MV + stShift)
    });
    // T wave
    if (Math.abs(tAmp) > 0.005) {
        for(let t = 0; t <= tMs; t += 10){
            const s = t / tMs;
            const sin = Math.sin(Math.PI * s);
            pts.push({
                x: x(tStart + t),
                y: mV(BASELINE_MV + stShift + tAmp * sin)
            });
        }
    }
    const tEnd = tStart + tMs + 40;
    pts.push({
        x: x(tEnd),
        y: mV(BASELINE_MV)
    });
    return {
        pts,
        waveMs: tEnd
    };
}
function flatPoints(fromMs, toMs, baselineFn, seed = 7) {
    const pts = [];
    for(let t = fromMs; t < toMs; t += 12){
        const wobble = baselineFn ? baselineFn(t, seed) : 0;
        // Gentle respiration-style baseline wander for realism
        const wander = 1.8 * Math.sin(t / 1700 + seed);
        pts.push({
            x: t * PX_PER_MS,
            y: -(wobble + wander)
        });
    }
    return pts;
}
// ---------------------------------------------------------------------------
// SVG assembly
// ---------------------------------------------------------------------------
function gridDefs() {
    return `
  <defs>
    <pattern id="small" width="5" height="5" patternUnits="userSpaceOnUse">
      <rect width="5" height="5" fill="#ffffff"/>
      <path d="M5 0 L0 0 0 5" fill="none" stroke="#f6c8c8" stroke-width="0.6"/>
    </pattern>
    <pattern id="big" width="25" height="25" patternUnits="userSpaceOnUse">
      <rect width="25" height="25" fill="url(#small)"/>
      <path d="M25 0 L0 0 0 25" fill="none" stroke="#e48b8b" stroke-width="1.1"/>
    </pattern>
  </defs>`;
}
function escapeXml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function renderEcgStrip(spec) {
    const key = resolveRhythm(spec.rhythm);
    const tpl = RHYTHMS[key];
    const seed = 41;
    let rate = spec.rate && spec.rate >= 20 && spec.rate <= 300 ? spec.rate : 75;
    if (tpl.fixedRate) rate = tpl.fixedRate;
    if (key === 'sinus-tachycardia' && (!spec.rate || spec.rate < 100)) rate = 125;
    if (key === 'sinus-bradycardia' && (!spec.rate || spec.rate > 60)) rate = 50;
    if (key === 'sinus-st-depression' && !spec.rate) rate = 88;
    const morph = {
        ...NORMAL_BEAT,
        ...tpl.defaults
    };
    const totalMs = ROWS * SECONDS_PER_ROW * 1000;
    const tracePts = [];
    const beatMarkers = [];
    // VF: full-chaos trace, no beats
    if (key === 'vf') {
        const rnd = mulberry(seed);
        let y = 0;
        for(let t = 0; t < totalMs; t += 8){
            y += (rnd() - 0.5) * 14;
            y = Math.max(-44, Math.min(44, y));
            tracePts.push({
                x: t * PX_PER_MS,
                y: y - 0
            });
        }
    } else if (key === 'asystole') {
        // Flat line across both rows — dense points so the row-splitting logic
        // keeps a full polyline segment per row (a single 2-point line would be
        // split at the row boundary and both halves dropped).
        for(let t = 0; t <= totalMs; t += 100){
            tracePts.push({
                x: t * PX_PER_MS,
                y: 0
            });
        }
    } else {
        let t = 200; // small initial offset
        let beatIndex = 0;
        let wenckebachPr = 160;
        while(t < totalMs - 600){
            const rrRaw = tpl.rr ? tpl.rr(beatIndex, rate, seed) : 60000 / rate;
            if (rrRaw === null) {
                // Dropped QRS: emit P + flat, then continue
                const beatMorph = {
                    ...morph
                };
                if (key === 'av-block-2-mobitz1') {}
                const { pts, waveMs } = beatPoints(beatMorph, t, true);
                for (const p of pts)tracePts.push(shift(p, 0, 0));
                const nextT = t + waveMs + 420;
                for (const p of flatPoints(t + waveMs, nextT, tpl.baseline, seed + beatIndex))tracePts.push(p);
                t = nextT;
                beatIndex++;
                continue;
            }
            const rr = Math.max(240, rrRaw);
            const beatMorph = {
                ...morph
            };
            if (key === 'av-block-2-mobitz1') {
                // Progressive PR lengthening: 160 → 200 → 250 → 310 → drop
                const cycle = beatIndex % 4;
                wenckebachPr = 160 + cycle * 55;
                beatMorph.prMs = wenckebachPr;
            }
            if (tpl.baseline) {
                // pre-beat baseline with flutter/fib waves
                for (const p of flatPoints(t - Math.min(rr, 420) + 200, t, tpl.baseline, seed + beatIndex))tracePts.push(p);
            }
            const { pts, waveMs } = beatPoints(beatMorph, t, false);
            for (const p of pts)tracePts.push(p);
            beatMarkers.push({
                beatStartMs: t,
                qrsMs: t + beatMorph.prMs,
                morph: beatMorph
            });
            const nextT = t + waveMs + (rr - waveMs > 0 ? rr - waveMs : 40);
            for (const p of flatPoints(t + waveMs, nextT, tpl.baseline, seed + beatIndex)){
                tracePts.push(p);
            }
            t = nextT;
            beatIndex++;
        }
    }
    // Split the trace into PER-ROW polylines so the row wrap never draws a
    // connecting line across the strip (diagonal artifact).
    const rowsPolys = [];
    {
        let current = [];
        let currentRow = 0;
        const flush = ()=>{
            if (current.length > 1) {
                rowsPolys.push(current.map((p)=>`${p.x.toFixed(1)},${(p.y + ROW_H * 0.62).toFixed(1)}`).join(' '));
            }
            current = [];
        };
        for (const p of tracePts){
            const row = Math.floor(p.x / W);
            const x = p.x - row * W;
            const y = p.y + row * ROW_H;
            if (row !== currentRow || x < (current.length ? current[current.length - 1].x - 1 : -1)) {
                flush();
                currentRow = row;
            }
            current.push({
                x,
                y
            });
        }
        flush();
    }
    const findings = (spec.findings || []).slice(0, 4);
    const caption = spec.caption || `${tpl.label}${rate && !tpl.fixedRate && key !== 'vf' && key !== 'asystole' && key !== 'av-block-3-complete' ? ` (~${Math.round(rate)} bpm)` : ''}`;
    const captionLine = [
        caption,
        ...findings
    ].join('  ·  ');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" font-family="ui-sans-serif, system-ui, sans-serif">
${gridDefs()}
  <rect x="0" y="0" width="${W}" height="${ROWS * ROW_H}" fill="url(#big)"/>
  ${rowsPolys.map((pts)=>`<polyline points="${pts}" fill="none" stroke="#0b1220" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/>`).join('\n  ')}
  <text x="8" y="18" font-size="13" font-weight="700" fill="#0b1220">II</text>
  <text x="30" y="18" font-size="11" fill="#6b7280">25 mm/s · 10 mm/mV · continuous rhythm strip</text>
  <rect x="0" y="${ROWS * ROW_H}" width="${VIEW_W}" height="40" fill="#ffffff"/>
  <line x1="0" y1="${ROWS * ROW_H}" x2="${VIEW_W}" y2="${ROWS * ROW_H}" stroke="#e5e7eb" stroke-width="1"/>
  <text x="10" y="${ROWS * ROW_H + 26}" font-size="14" font-weight="700" fill="#111827">${escapeXml(captionLine.slice(0, 120))}</text>
</svg>`;
    // Hotspot regions from a clean mid trace beat (use beat 2 when present)
    const regions = [];
    if (key !== 'vf' && key !== 'asystole' && beatMarkers.length >= 2) {
        const b = beatMarkers[1];
        const mk = (label, ms)=>{
            const row = Math.floor(ms * PX_PER_MS / W);
            const xPct = ms * PX_PER_MS % W / (W / 100);
            const yPct = (row * ROW_H + ROW_H * 0.62 - 30) / VIEW_H * 100;
            return {
                label,
                x: Math.max(3, Math.min(97, xPct)),
                y: Math.max(6, Math.min(88, yPct))
            };
        };
        regions.push(mk('P wave', b.beatStartMs + 45));
        regions.push(mk('PR interval', b.beatStartMs + b.morph.prMs * 0.55));
        regions.push(mk('QRS complex', b.qrsMs + b.morph.qrsMs * 0.5));
        regions.push(mk('ST segment', b.qrsMs + b.morph.qrsMs + 45));
        regions.push(mk('T wave', b.qrsMs + b.morph.qrsMs + 140));
    }
    return {
        svg,
        regions
    };
}
function shift(p, dx, dy) {
    return {
        x: p.x + dx,
        y: p.y + dy
    };
}
// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------
const ECG_DIR = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'public', 'generated', 'agent', 'ecg');
function saveEcgSvg(spec) {
    try {
        const { svg, regions } = renderEcgStrip(spec);
        fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(ECG_DIR, {
            recursive: true
        });
        const id = `ecg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
        const file = path__WEBPACK_IMPORTED_MODULE_1___default().join(ECG_DIR, `${id}.svg`);
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(file, svg, 'utf-8');
        const tpl = RHYTHMS[resolveRhythm(spec.rhythm)];
        return {
            url: `/generated/agent/ecg/${id}.svg`,
            regions,
            caption: tpl.label
        };
    } catch (err) {
        console.error('[ecg-generator] failed:', err instanceof Error ? err.message : err);
        return null;
    }
}
const ECG_REGION_LABELS = [
    'P wave',
    'PR interval',
    'QRS complex',
    'ST segment',
    'T wave'
];
const SUPPORTED_ECG_RHYTHMS = Object.values(RHYTHMS).map((r)=>r.label);


/***/ })

};
;