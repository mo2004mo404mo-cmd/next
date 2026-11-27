"use strict";
(() => {
var exports = {};
exports.id = 6164;
exports.ids = [5351,6164];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 69284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ thinkingContext)
/* harmony export */ });
/* harmony import */ var node_async_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16698);
/* harmony import */ var node_async_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_async_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Async-context carrier for per-request ThinkingConfig.
 *
 * callLLM / streamLLM wrap each AI SDK call in thinkingContext.run()
 * so that the custom fetch wrapper in providers.ts can read the
 * current thinking preference and inject vendor-specific body params.
 *
 * IMPORTANT: This module uses node:async_hooks which is server-only.
 * providers.ts must NOT import this module directly (it's also used
 * on the client via settings.ts). Instead, providers.ts reads the
 * context via globalThis.__thinkingContext, which is set here at
 * module load time and guaranteed to be available before any fetch
 * wrapper runs.
 */ 
const thinkingContext = new node_async_hooks__WEBPACK_IMPORTED_MODULE_0__.AsyncLocalStorage();
// Expose on globalThis so providers.ts can access the store without
// importing this module (which would pull node:async_hooks into the
// client bundle via the settings.ts → providers.ts import chain).
globalThis.__thinkingContext = thinkingContext;


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

/***/ 282995:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  '57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9'


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

/***/ 525351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ streamLLM),
/* harmony export */   callLLM: () => (/* binding */ callLLM)
/* harmony export */ });
/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(762939);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(228262);
/* harmony import */ var _thinking_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69284);
/* harmony import */ var _model_metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(826295);
/* harmony import */ var _lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(716533);
/**
 * Unified LLM Call Layer
 *
 * All LLM interactions should go through callLLM / streamLLM.
 */ 





const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('LLM');
function _extractRequestInfo(params) {
    const tools = params.tools ? Object.keys(params.tools) : undefined;
    const p = params;
    return {
        system: p.system,
        prompt: p.prompt,
        messages: p.messages,
        tools,
        maxOutputTokens: p.maxOutputTokens
    };
}
function getModelId(params) {
    const m = params.model;
    if (typeof m === 'string') return m;
    if (m && typeof m === 'object' && 'modelId' in m) return m.modelId;
    return 'unknown';
}
/** Provider/model → thinking capability (built once at module load) */ const MODEL_THINKING_MAP = (()=>{
    const map = new Map();
    for (const provider of Object.values(_providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS)){
        for (const model of provider.models){
            map.set((0,_model_metadata__WEBPACK_IMPORTED_MODULE_3__/* .getModelMetadataKey */ .yi)(provider.id, model.id), {
                thinking: model.capabilities?.thinking
            });
        }
    }
    return map;
})();
/** Model ID → thinking capability for IDs that are unique across providers. */ const UNIQUE_MODEL_THINKING_MAP = (()=>{
    const counts = new Map();
    for (const provider of Object.values(_providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS)){
        for (const model of provider.models){
            counts.set(model.id, (counts.get(model.id) ?? 0) + 1);
        }
    }
    const map = new Map();
    for (const provider of Object.values(_providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS)){
        for (const model of provider.models){
            if (counts.get(model.id) === 1) {
                map.set(model.id, {
                    thinking: model.capabilities?.thinking
                });
            }
        }
    }
    return map;
})();
/** Global thinking override from environment variable */ function getGlobalThinkingConfig() {
    if (process.env.LLM_THINKING_DISABLED === 'true') {
        return {
            mode: 'disabled',
            enabled: false
        };
    }
    return undefined;
}
function getAnthropicEffort(thinking, config) {
    const effort = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingEffort */ .IG)(thinking, config);
    if (!effort || effort === 'none' || effort === 'minimal') return undefined;
    return effort;
}
function getModelProviderId(params) {
    const m = params.model;
    if (!m || typeof m !== 'object' || !('provider' in m)) return undefined;
    const provider = m.provider;
    if (!provider) return undefined;
    const modelId = 'modelId' in m ? m.modelId : undefined;
    if (provider === 'anthropic.messages' && modelId?.startsWith('MiniMax-')) return 'minimax';
    if (provider in _providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS) return provider;
    const prefix = provider.split('.')[0];
    return prefix in _providers__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS ? prefix : undefined;
}
/**
 * Map a unified ThinkingConfig to provider-specific providerOptions.
 */ function buildThinkingProviderOptions(providerId, modelId, config) {
    const info = providerId ? MODEL_THINKING_MAP.get((0,_model_metadata__WEBPACK_IMPORTED_MODULE_3__/* .getModelMetadataKey */ .yi)(providerId, modelId)) : UNIQUE_MODEL_THINKING_MAP.get(modelId);
    if (!info?.thinking) return undefined; // model has no thinking capability
    const thinking = info.thinking;
    if (thinking.control === 'none') return undefined;
    const mode = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .getThinkingMode */ .QL)(config);
    switch(thinking.requestAdapter){
        case 'openai':
            {
                const effort = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingEffort */ .IG)(thinking, config);
                return effort ? {
                    openai: {
                        reasoningEffort: effort
                    }
                } : undefined;
            }
        case 'anthropic':
            {
                const buildAnthropicOptions = (options)=>({
                        anthropic: options
                    });
                if (mode === 'disabled') return buildAnthropicOptions({
                    thinking: {
                        type: 'disabled'
                    }
                });
                if (thinking.control === 'toggle-budget' || thinking.control === 'budget-only') {
                    const budget = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingBudget */ .hg)(thinking, config);
                    return budget === undefined ? undefined : buildAnthropicOptions({
                        thinking: {
                            type: 'enabled',
                            budgetTokens: budget
                        }
                    });
                }
                const effort = getAnthropicEffort(thinking, config);
                if (!effort) return undefined;
                if (thinking.anthropicThinking?.type === 'adaptive') {
                    return buildAnthropicOptions({
                        thinking: {
                            type: 'adaptive'
                        },
                        effort
                    });
                }
                const manualEffort = effort === 'xhigh' ? 'max' : effort;
                const budget = thinking.anthropicThinking?.budgetByEffort?.[manualEffort];
                if (!budget) return undefined;
                return buildAnthropicOptions({
                    thinking: {
                        type: 'enabled',
                        budgetTokens: budget
                    },
                    effort: manualEffort
                });
            }
        case 'google':
            {
                if (thinking.control === 'level') {
                    const level = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingLevel */ .Aq)(thinking, config);
                    return level ? {
                        google: {
                            thinkingConfig: {
                                thinkingLevel: level
                            }
                        }
                    } : undefined;
                }
                const budget = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__/* .pickThinkingBudget */ .hg)(thinking, config);
                if (budget === undefined) return undefined;
                return {
                    google: {
                        thinkingConfig: {
                            thinkingBudget: budget
                        }
                    }
                };
            }
        default:
            // OpenAI-compatible providers are injected in providers.ts fetch wrapper.
            return undefined;
    }
}
/**
 * Inject provider-specific thinking options into LLM call params.
 *
 * For native providers (OpenAI/Anthropic/Google), this sets providerOptions.
 * For OpenAI-compatible providers, providerOptions won't work (stripped by
 * zod schema) — those are handled by the custom fetch wrapper via thinkingContext.
 *
 * Priority: caller's providerOptions > ThinkingConfig
 */ function injectProviderOptions(params, thinking) {
    if (params.providerOptions) return params; // caller explicitly set providerOptions
    const modelId = getModelId(params);
    const providerId = getModelProviderId(params);
    if (thinking) {
        const opts = buildThinkingProviderOptions(providerId, modelId, thinking);
        if (opts) return {
            ...params,
            providerOptions: opts
        };
    }
    return params;
}
const DEFAULT_VALIDATE = (text)=>text.trim().length > 0;
/**
 * Unified wrapper around `generateText`.
 *
 * @param params - Same parameters as AI SDK's `generateText`
 * @param source - A short label for log grouping (e.g. 'scene-stream', 'pbl-chat')
 * @param retryOptions - Optional retry-on-validation-failure settings
 * @param thinking - Optional per-call thinking config (overrides global LLM_THINKING_DISABLED)
 */ async function callLLM(params, source, retryOptions, thinking) {
    const maxAttempts = (retryOptions?.retries ?? 0) + 1;
    const validate = retryOptions?.validate ?? (maxAttempts > 1 ? DEFAULT_VALIDATE : undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lastResult;
    let lastError;
    for(let attempt = 1; attempt <= maxAttempts; attempt++){
        try {
            // Resolve effective thinking config: per-call > global env > undefined
            const effectiveThinking = thinking ?? getGlobalThinkingConfig();
            const injectedParams = injectProviderOptions(params, effectiveThinking);
            // Wrap in thinkingContext so the custom fetch wrapper in providers.ts
            // can read the config and inject vendor-specific body params for
            // OpenAI-compatible providers.
            const result = await _thinking_context__WEBPACK_IMPORTED_MODULE_2__/* .thinkingContext */ .E.run(effectiveThinking, ()=>(0,ai__WEBPACK_IMPORTED_MODULE_5__/* .generateText */ .Df5)(injectedParams));
            // Validate result (only when retries are configured)
            if (validate && !validate(result.text)) {
                log.warn(`[${source}] Validation failed (attempt ${attempt}/${maxAttempts}), ${attempt < maxAttempts ? 'retrying...' : 'giving up'}`);
                lastResult = result;
                continue;
            }
            return result;
        } catch (error) {
            lastError = error;
            if (attempt < maxAttempts) {
                log.warn(`[${source}] Call failed (attempt ${attempt}/${maxAttempts}), retrying...`, error);
                continue;
            }
        }
    }
    // All attempts exhausted — return last result or throw last error
    if (lastResult) return lastResult;
    throw lastError;
}
/**
 * Unified wrapper around `streamText`.
 *
 * Returns the same StreamTextResult.
 *
 * @param params - Same parameters as AI SDK's `streamText`
 * @param source - A short label for log grouping
 * @param thinking - Optional per-call thinking config (overrides global LLM_THINKING_DISABLED)
 */ function streamLLM(params, source, thinking) {
    // Resolve effective thinking config and wrap in thinkingContext
    const effectiveThinking = thinking ?? getGlobalThinkingConfig();
    const injectedParams = injectProviderOptions(params, effectiveThinking);
    const result = _thinking_context__WEBPACK_IMPORTED_MODULE_2__/* .thinkingContext */ .E.run(effectiveThinking, ()=>(0,ai__WEBPACK_IMPORTED_MODULE_5__/* .streamText */ .gM3)(injectedParams));
    return result;
}


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

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 648825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   kU: () => (/* binding */ apiSuccess),
/* harmony export */   pb: () => (/* binding */ apiError)
/* harmony export */ });
/* unused harmony export API_ERROR_CODES */
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/api-response.ts
 *
 * Utility helpers for Next.js API routes — ported verbatim.
 */ 
const API_ERROR_CODES = {
    MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
    MISSING_API_KEY: 'MISSING_API_KEY',
    INVALID_REQUEST: 'INVALID_REQUEST',
    PROVIDER_DISABLED: 'PROVIDER_DISABLED',
    VOXCPM_AUTO_VOICE_REQUIRES_CONTEXT: 'VOXCPM_AUTO_VOICE_REQUIRES_CONTEXT',
    INVALID_URL: 'INVALID_URL',
    REDIRECT_NOT_ALLOWED: 'REDIRECT_NOT_ALLOWED',
    TOO_MANY_REDIRECTS: 'TOO_MANY_REDIRECTS',
    CONTENT_SENSITIVE: 'CONTENT_SENSITIVE',
    UPSTREAM_ERROR: 'UPSTREAM_ERROR',
    RATE_LIMITED: 'RATE_LIMITED',
    GENERATION_FAILED: 'GENERATION_FAILED',
    TRANSCRIPTION_FAILED: 'TRANSCRIPTION_FAILED',
    PARSE_FAILED: 'PARSE_FAILED',
    INTERNAL_ERROR: 'INTERNAL_ERROR'
};
function apiError(code, status, error, details) {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        success: false,
        errorCode: code,
        error,
        ...details ? {
            details
        } : {}
    }, {
        status
    });
}
function apiSuccess(data, status = 200) {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        success: true,
        ...data
    }, {
        status
    });
}


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

/***/ 661427:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ak: () => (/* binding */ nanoid)
/* harmony export */ });
/* unused harmony exports random, customRandom, customAlphabet */
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282995);




const GET_RANDOM_LIMIT = 65536

function fillRandom(buffer) {
  let from = 0
  while (from < buffer.length) {
    let to = Math.min(from + GET_RANDOM_LIMIT, buffer.length)
    crypto.getRandomValues(buffer.subarray(from, to))
    from = to
  }
}

function random(bytes) {
  bytes |= 0
  if (bytes < 0) throw new RangeError('Wrong ID size')
  let buffer = Buffer.allocUnsafe(bytes)
  fillRandom(buffer)
  return buffer
}

function customRandom(alphabet, defaultSize, getRandom) {
  let safeByteCutoff = 256 - (256 % alphabet.length)

  if (safeByteCutoff === 256) {
    let mask = alphabet.length - 1

    return (size = defaultSize) => {
      if (!size) return ''
      let id = ''
      while (true) {
        let bytes = getRandom(size)
        let i = (size |= 0)
        while (i--) {
          id += alphabet[bytes[i] & mask]
          if (id.length >= size) return id
        }
      }
    }
  }

  return (size = defaultSize) => {
    if (!size) return ''
    let id = ''
    let step = Math.ceil((1.6 * 256 * size) / safeByteCutoff)
    while (true) {
      let bytes = getRandom(step)
      let i = step
      while (i--) {
        if (bytes[i] < safeByteCutoff) {
          id += alphabet[bytes[i] % alphabet.length]
          if (id.length >= size) return id
        }
      }
    }
  }
}


const POOL_MAX = GET_RANDOM_LIMIT / 2

function customAlphabet(alphabet, defaultSize = 21) {
  if (
    typeof alphabet !== 'string' ||
    !alphabet ||
    alphabet.length > 256
  ) {
    return customRandom(alphabet, defaultSize, random)
  }
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet.charCodeAt(i) > 255) {
      return customRandom(alphabet, defaultSize, random)
    }
  }

  let charCodes = Uint8Array.from(alphabet, str => {
    return str.charCodeAt(0)
  })
  let alphabetLen = alphabet.length
  let mask = (2 << (31 - Math.clz32((alphabetLen - 1) | 1))) - 1

  let pool = ''
  let poolOffset = 0
  let poolNext = 0

  return (size = defaultSize) => {
    size |= 0
    if (size < 0) throw new RangeError('Wrong ID size')
    if (size === 0) return ''
    if (poolOffset + size > pool.length) {
      let target = Math.max(poolNext, size)
      poolNext = Math.min(target * 16, POOL_MAX)
      let buffer = Buffer.allocUnsafe(target)
      if (mask === alphabetLen - 1) {
        fillRandom(buffer)
        for (let i = 0; i < target; i++) {
          buffer[i] = charCodes[buffer[i] & mask]
        }
      } else {
        let randomBytes = Buffer.allocUnsafe(
          Math.ceil((1.6 * (mask + 1) * target) / alphabetLen)
        )
        let accepted = 0
        while (accepted < target) {
          fillRandom(randomBytes)
          for (let i = 0; i < randomBytes.length; i++) {
            let index = randomBytes[i] & mask
            if (index < alphabetLen) {
              buffer[accepted++] = charCodes[index]
              if (accepted === target) break
            }
          }
        }
      }
      pool = buffer.toString('latin1')
      poolOffset = 0
    }
    poolOffset += size
    return pool.substring(poolOffset - size, poolOffset)
  }
}

const nanoid = customAlphabet(_url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__/* .urlAlphabet */ .x)


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

/***/ 826797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cr: () => (/* binding */ AGENT_COLOR_PALETTE)
/* harmony export */ });
/* unused harmony exports AGENT_DEFAULT_AVATARS, isAvatarUrl, sanitizeAvatar */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/constants/agent-defaults.ts
 */ /**
 * Shared constants for agent profile generation.
 *
 * Used by both the client-side agent-profiles API route and the
 * server-side classroom-generation pipeline to keep colors / avatars in sync.
 */ /** Color palette cycled for generated agents */ const AGENT_COLOR_PALETTE = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ec4899',
    '#06b6d4',
    '#8b5cf6',
    '#f97316',
    '#14b8a6',
    '#e11d48',
    '#6366f1',
    '#84cc16',
    '#a855f7'
];
/**
 * Default avatar paths cycled for generated agents.
 *
 * Every entry MUST correspond to a file that exists under `public/avatars/`.
 */ const AGENT_DEFAULT_AVATARS = (/* unused pure expression or super */ null && ([
    '/avatars/teacher.png',
    '/avatars/assist.png',
    '/avatars/curious.png',
    '/avatars/thinker.png',
    '/avatars/note-taker.png',
    '/avatars/teacher-2.png',
    '/avatars/assist-2.png',
    '/avatars/curious-2.png',
    '/avatars/thinker-2.png',
    '/avatars/note-taker-2.png'
]));
/**
 * Returns true if the given avatar string is a usable image source — i.e. an
 * HTTP URL, a root-relative path, or a data URL. Returns false for bare emoji
 * strings (e.g. "🎓", "👩‍🏫") or any other non-URL value the LLM might have
 * returned despite being told to pick from the avatar list.
 */ function isAvatarUrl(avatar) {
    return !!avatar && (avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:'));
}
/**
 * Sanitize an agent avatar value for UI rendering.
 *
 * If `avatar` is a usable image URL/path, it is returned unchanged. Otherwise
 * (emoji, garbage, empty), a deterministic fallback from AGENT_DEFAULT_AVATARS
 * is returned. The optional `index` seeds the fallback so that multiple agents
 * in the same classroom get distinct avatars; if omitted, a hash of the input
 * string is used so the same bad value always maps to the same fallback.
 *
 * Use this anywhere an agent avatar is rendered as an <img> to guarantee a
 * real illustration is always shown — even for classrooms generated before
 * the server-side avatar validation was added.
 */ function sanitizeAvatar(avatar, index) {
    if (isAvatarUrl(avatar)) return avatar;
    const fallbackIndex = typeof index === 'number' && Number.isFinite(index) ? index : // same fallback avatar (stable across re-renders).
    Math.abs((avatar ?? '').split('').reduce((acc, ch)=>acc * 31 + ch.charCodeAt(0) | 0, 0));
    return AGENT_DEFAULT_AVATARS[fallbackIndex % AGENT_DEFAULT_AVATARS.length];
}


/***/ }),

/***/ 836357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VR: () => (/* binding */ buildVoiceDesignPrompt),
/* harmony export */   _M: () => (/* binding */ normalizeVoiceDesign)
/* harmony export */ });
/* unused harmony exports AUTO_VOICE_ID_PREFIX, getDeterministicVoiceId */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/voice-design.ts
 *
 * Verbatim port — pure TypeScript + WebCrypto, no deps.
 */ /**
 * Provider-neutral per-agent voice design.
 *
 * A `VoiceDesign` describes an agent's vocal identity (not personality) as a
 * 3-layer recipe. It is consumed by any TTS provider: as an inline voice
 * prompt where supported, or as the seed for a registered/cloned voice
 * (see `voice-registration.ts`). Nothing here is VoxCPM-specific.
 */ const VOICE_DESIGN_PROMPT_MAX_CHARS = 200;
/** Prefix for deterministic auto-voice ids (provider-neutral, backend-name-safe). */ const AUTO_VOICE_ID_PREFIX = 'auto-';
function sanitizeVoiceDesignPart(value) {
    return (value || '').replace(/[\p{C}]+/gu, ' ')// Strip parentheses: VoxCPM uses `(prompt)text` delimiters, so a paren in the
    // descriptor/persona would corrupt the bootstrap synthesis prompt.
    .replace(/[()（）]/gu, ' ').replace(/\s+/gu, ' ').trim().slice(0, VOICE_DESIGN_PROMPT_MAX_CHARS).trim();
}
/** Compose the 3 layers into one comma-joined prompt, dropping blank layers. */ function buildVoiceDesignPrompt(design) {
    return [
        design.identity,
        design.texture,
        design.delivery
    ].map((part)=>sanitizeVoiceDesignPart(part)).filter(Boolean).join(', ');
}
/** Coerce an arbitrary (LLM-produced) value into a VoiceDesign, or undefined. */ function normalizeVoiceDesign(raw) {
    if (!raw || typeof raw !== 'object') return undefined;
    const record = raw;
    const pick = (value)=>typeof value === 'string' ? value.trim() : '';
    const design = {
        identity: pick(record.identity),
        texture: pick(record.texture),
        delivery: pick(record.delivery)
    };
    if (!design.identity && !design.texture && !design.delivery) return undefined;
    return design;
}
/**
 * Deterministic voice id derived from the descriptor (+ provider + model).
 * Stable across re-synthesis, recomputable anywhere from the descriptor on the
 * agent, and namespaced by provider so a shared registry can't collide.
 *
 * Note: language is intentionally NOT part of the id — the descriptor text is
 * already written in the course language, and language only selects the one-time
 * bootstrap sample sentence (which affects neither output language nor timbre).
 * Keeping it out means every TTS path (narration passes a directive, discussion
 * passes a locale) resolves to the SAME id for the same agent.
 */ async function getDeterministicVoiceId(design, opts = {}) {
    const seed = [
        opts.providerId || '',
        design.identity,
        design.texture,
        design.delivery,
        opts.model || ''
    ].join('|');
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed));
    const hex = Array.from(new Uint8Array(digest)).map((byte)=>byte.toString(16).padStart(2, '0')).join('');
    return `${AUTO_VOICE_ID_PREFIX}${hex.slice(0, 16)}`;
}


/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 848972:
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
        page: "/api/generate/agent-profiles/route",
        pathname: "/api/generate/agent-profiles",
        filename: "route",
        bundlePath: "app/api/generate/agent-profiles/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/generate/agent-profiles/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(959982),
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
    let srcPage = "/api/generate/agent-profiles/route";
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

/***/ 959982:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(661427);
/* harmony import */ var _lib_ai_llm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(525351);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(648825);
/* harmony import */ var _lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(592901);
/* harmony import */ var _lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(826797);
/* harmony import */ var _lib_audio_voice_design__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(836357);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_3__]);
_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Agent Profiles Generation API
 *
 * Generates agent profiles (teacher, assistant, student) for a course stage
 * based on stage info and scene outlines.
 */ 






const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('Agent Profiles API');
const maxDuration = 120;
function stripCodeFences(text) {
    let cleaned = text.trim();
    // Remove markdown code fences (```json ... ``` or ``` ... ```)
    if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }
    return cleaned.trim();
}
async function POST(req) {
    let stageName;
    let modelString;
    try {
        const body = await req.json();
        const { stageInfo, sceneOutlines, languageDirective, availableAvatars, avatarDescriptions, availableVoices } = body;
        stageName = stageInfo?.name;
        // ── Validate required fields ──
        if (!stageInfo?.name) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiError */ .pb)('MISSING_REQUIRED_FIELD', 400, 'stageInfo.name is required');
        }
        if (!languageDirective) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiError */ .pb)('MISSING_REQUIRED_FIELD', 400, 'languageDirective is required');
        }
        if (!availableAvatars || availableAvatars.length === 0) {
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiError */ .pb)('MISSING_REQUIRED_FIELD', 400, 'availableAvatars is required and must not be empty');
        }
        // ── Model resolution from request headers/body ──
        const { model: languageModel, modelString: _modelString, thinkingConfig } = await (0,_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_3__/* .resolveModelFromRequest */ .V2)(req, body, 'agent-profiles');
        modelString = _modelString;
        // ── Build prompt ──
        const sceneSummary = sceneOutlines?.length ? sceneOutlines.map((s, i)=>`${i + 1}. ${s.title}${s.description ? ` — ${s.description}` : ''}`).join('\n') : null;
        const systemPrompt = `You are an expert instructional designer. Generate agent profiles for a multi-agent classroom simulation. Decide the appropriate number of agents (typically 3-5) based on the course content and complexity. Return ONLY valid JSON, no markdown or explanation.`;
        // Build voice list for prompt (if available)
        const voiceListStr = availableVoices && availableVoices.length > 0 ? JSON.stringify(availableVoices.map((v)=>({
                id: `${v.providerId}::${v.voiceId}`,
                name: v.voiceName,
                language: v.voiceLanguage || 'unknown'
            }))) : '';
        const voicePrompt = voiceListStr ? `- Each agent should be assigned a voice that matches their persona from this list: ${voiceListStr}
  - Prefer a voice whose language matches the course language directive
  - Pick a voice that suits the agent's personality and role (e.g. authoritative voice for teacher, lively voice for energetic student)
  - Try to use different voices for each agent` : '';
        const voiceJsonField = voiceListStr ? ',\n      "voice": "string (voice id from available list, e.g. \'qwen-tts::Cherry\')"' : '';
        const userPrompt = `Generate agent profiles for the following course:

Course name: ${stageInfo.name}
${stageInfo.description ? `Course description: ${stageInfo.description}` : ''}
${sceneSummary ? `\nScene outlines:\n${sceneSummary}\n` : ''}
Requirements:
- Decide the appropriate number of agents based on the course content (typically 3-5)
- Exactly 1 agent must have role "teacher", the rest can be "assistant" or "student"
- Priority values: teacher=10 (highest), assistant=7, student=4-6
- Each agent needs: name, role, persona (2-3 sentences describing personality and teaching/learning style)
- Language directive for this course: ${languageDirective}
  Agent names and personas must follow this language directive.
- Each agent must be assigned one avatar from this list: ${JSON.stringify(avatarDescriptions && avatarDescriptions.length > 0 ? avatarDescriptions.map((a)=>({
                path: a.path,
                description: a.desc
            })) : availableAvatars)}
  - Pick an avatar that visually matches the agent's personality and role
  - Try to use different avatars for each agent
  - Use the "path" value as the avatar field in the output
- Each agent must be assigned one color from this list: ${JSON.stringify(_lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_4__/* .AGENT_COLOR_PALETTE */ .Cr)}
  - Each agent must have a different color
- Each agent needs a "voiceDesign" object describing their VOCAL identity (not personality), written following the language directive and consistent with the persona, as three short comma-free phrases:
  - "identity": gender + age + role (e.g. "middle-aged male teacher")
  - "texture": pitch + vocal quality (e.g. "warm low-pitched slightly husky")
  - "delivery": emotion + pace (e.g. "calm measured encouraging")
${voicePrompt}

Return a JSON object with this exact structure:
{
  "agents": [
    {
      "name": "string",
      "role": "teacher" | "assistant" | "student",
      "persona": "string (2-3 sentences)",
      "voiceDesign": { "identity": "string", "texture": "string", "delivery": "string" },
      "avatar": "string (from available list)",
      "color": "string (hex color from palette)",
      "priority": number (10 for teacher, 7 for assistant, 4-6 for student)${voiceJsonField}
    }
  ]
}`;
        log.info(`Generating agent profiles for "${stageInfo.name}" [model=${modelString}]`);
        const rawResult = (await (0,_lib_ai_llm__WEBPACK_IMPORTED_MODULE_0__.callLLM)({
            model: languageModel,
            system: systemPrompt,
            prompt: userPrompt
        }, 'agent-profiles', undefined, thinkingConfig)).text;
        // ── Parse LLM response ──
        const rawText = stripCodeFences(rawResult);
        let parsed;
        try {
            parsed = JSON.parse(rawText);
        } catch  {
            log.error('Failed to parse LLM response as JSON:', rawText.substring(0, 500));
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiError */ .pb)('PARSE_FAILED', 500, 'Failed to parse agent profiles from LLM response');
        }
        // ── Validate parsed structure ──
        if (!parsed.agents || !Array.isArray(parsed.agents) || parsed.agents.length < 2) {
            log.error(`Expected at least 2 agents, got ${parsed.agents?.length ?? 0}`);
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiError */ .pb)('GENERATION_FAILED', 500, `Expected at least 2 agents but LLM returned ${parsed.agents?.length ?? 0}`);
        }
        const teacherCount = parsed.agents.filter((a)=>a.role === 'teacher').length;
        if (teacherCount !== 1) {
            log.error(`Expected exactly 1 teacher, got ${teacherCount}`);
            return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiError */ .pb)('GENERATION_FAILED', 500, `Expected exactly 1 teacher but LLM returned ${teacherCount}`);
        }
        // ── Build output with IDs ──
        //
        // Avatar validation: the LLM is instructed to pick an avatar from the
        // `availableAvatars` list (paths like "/avatars/teacher.png"), but it
        // sometimes ignores that and returns a bare emoji (e.g. "🎓", "👩‍🏫").
        // An emoji is not a usable avatar URL — it would either 404 or render
        // as text inside the avatar circle. So we treat any value that isn't
        // in the availableAvatars list as "missing" and fall back to a real
        // PNG path cycled by index. This guarantees every generated agent
        // always gets a real avatar image.
        const availableAvatarSet = new Set(availableAvatars);
        const isRealAvatarPath = (value)=>!!value && availableAvatarSet.has(value);
        const agents = parsed.agents.map((agent, index)=>{
            // Parse voice "providerId::voiceId" format
            let voiceConfig;
            if (agent.voice && agent.voice.includes('::')) {
                const [providerId, voiceId] = agent.voice.split('::');
                if (providerId && voiceId) {
                    voiceConfig = {
                        providerId,
                        voiceId
                    };
                }
            }
            const voiceDesign = (0,_lib_audio_voice_design__WEBPACK_IMPORTED_MODULE_5__/* .normalizeVoiceDesign */ ._M)(agent.voiceDesign);
            // Same defensive validation for color: must be a value from the palette.
            const color = _lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_4__/* .AGENT_COLOR_PALETTE */ .Cr.includes(agent.color) ? agent.color : _lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_4__/* .AGENT_COLOR_PALETTE */ .Cr[index % _lib_constants_agent_defaults__WEBPACK_IMPORTED_MODULE_4__/* .AGENT_COLOR_PALETTE */ .Cr.length];
            return {
                id: `gen-${(0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(8)}`,
                name: agent.name,
                role: agent.role,
                persona: agent.persona,
                avatar: isRealAvatarPath(agent.avatar) ? agent.avatar : availableAvatars[index % availableAvatars.length],
                color,
                priority: agent.priority ?? (agent.role === 'teacher' ? 10 : agent.role === 'assistant' ? 7 : 5),
                ...voiceConfig ? {
                    voiceConfig
                } : {},
                ...voiceDesign ? {
                    voiceDesign
                } : {}
            };
        });
        log.info(`Successfully generated ${agents.length} agent profiles for "${stageInfo.name}"`);
        return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiSuccess */ .kU)({
            agents
        });
    } catch (error) {
        log.error(`Agent profiles generation failed [stage="${stageName ?? 'unknown'}", model=${modelString ?? 'unknown'}]:`, error);
        return (0,_lib_server_api_response__WEBPACK_IMPORTED_MODULE_2__/* .apiError */ .pb)('INTERNAL_ERROR', 500, error instanceof Error ? error.message : String(error));
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,7774,1545,9567,859,2035,4007,7909,5566,8262,2901], () => (__webpack_exec__(848972)));
module.exports = __webpack_exports__;

})();