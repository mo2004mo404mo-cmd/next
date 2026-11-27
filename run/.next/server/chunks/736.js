"use strict";
exports.id = 736;
exports.ids = [736,5351,8953];
exports.modules = {

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

/***/ 148953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autoDetectDefaultModel: () => (/* binding */ autoDetectDefaultModel)
/* harmony export */ });
/* unused harmony export clearAutoDetectCache */
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(653165);
/**
 * Auto-Detect Default Provider
 *
 * When no model is explicitly configured (no DEFAULT_MODEL env var, no stage
 * route, no client x-model), this module picks a sensible default by probing
 * what's available on the current machine:
 *
 *   1. Is Ollama running? → use the first installed model
 *   2. Are there provider API keys in env vars? → use the first one found
 *   3. Is ZAI configured (.z-ai-config)? → use zai:auto
 *   4. Nothing found → throw with a helpful setup guide
 *
 * The detection result is cached for 60 seconds so we don't probe Ollama on
 * every request. The cache can be cleared via `clearAutoDetectCache()`.
 */ 
const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('AutoDetectModel');
let cached = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 60000; // 1 minute
/** Clear the auto-detect cache (useful after config changes). */ function clearAutoDetectCache() {
    cached = null;
    cacheExpiry = 0;
}
/**
 * Probe whether Ollama is running and return the first installed model.
 * Returns null if Ollama is not available or has no models.
 */ async function probeOllama() {
    const baseUrl = (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/v1\/?$/, '').replace(/\/+$/, '');
    try {
        const controller = new AbortController();
        const timeout = setTimeout(()=>controller.abort(), 3000);
        const res = await fetch(`${baseUrl}/api/tags`, {
            signal: controller.signal
        });
        clearTimeout(timeout);
        if (!res.ok) return null;
        const data = await res.json();
        const models = data.models || [];
        if (models.length === 0) return null;
        // Prefer common models if available, else use the first
        const preferred = [
            'llama3.3',
            'llama3.2',
            'gemma3',
            'deepseek-r1',
            'qwen2.5'
        ];
        for (const pref of preferred){
            const match = models.find((m)=>m.name.startsWith(pref) || m.model.startsWith(pref));
            if (match) return {
                modelId: match.name
            };
        }
        return {
            modelId: models[0].name
        };
    } catch  {
        return null;
    }
}
/**
 * Check for provider API keys in environment variables, in priority order.
 * Returns the first provider that has a key configured.
 */ function probeEnvKeys() {
    // Priority order — cheapest/most common first
    const envProviders = [
        {
            envVar: 'OPENAI_API_KEY',
            providerId: 'openai',
            modelId: 'gpt-4o-mini'
        },
        {
            envVar: 'ANTHROPIC_API_KEY',
            providerId: 'anthropic',
            modelId: 'claude-haiku-4-0'
        },
        {
            envVar: 'GOOGLE_GENERATIVE_AI_API_KEY',
            providerId: 'google',
            modelId: 'gemini-2.5-flash'
        },
        {
            envVar: 'DEEPSEEK_API_KEY',
            providerId: 'deepseek',
            modelId: 'deepseek-chat'
        },
        {
            envVar: 'OPENROUTER_API_KEY',
            providerId: 'openrouter',
            modelId: 'meta-llama/llama-3.3-70b-instruct'
        },
        {
            envVar: 'GLM_API_KEY',
            providerId: 'glm',
            modelId: 'glm-4-flash'
        },
        {
            envVar: 'QWEN_API_KEY',
            providerId: 'qwen',
            modelId: 'qwen-turbo'
        },
        {
            envVar: 'KIMI_API_KEY',
            providerId: 'kimi',
            modelId: 'moonshot-v1-8k'
        },
        {
            envVar: 'MINIMAX_API_KEY',
            providerId: 'minimax',
            modelId: 'MiniMax-Text-01'
        },
        {
            envVar: 'SILICONFLOW_API_KEY',
            providerId: 'siliconflow',
            modelId: 'deepseek-ai/DeepSeek-V3'
        },
        {
            envVar: 'GROK_API_KEY',
            providerId: 'grok',
            modelId: 'grok-3-mini'
        }
    ];
    for (const { envVar, providerId, modelId } of envProviders){
        const key = process.env[envVar];
        if (key && key.trim().length > 0) {
            return {
                providerId,
                modelId,
                source: 'env'
            };
        }
    }
    return null;
}
/**
 * Auto-detect the best available default model.
 *
 * Resolution order:
 *   1. Ollama running locally (keyless, free)
 *   2. First provider API key found in env vars
 *   3. Error with setup instructions
 */ async function autoDetectDefaultModel() {
    // Return cached result if still valid
    const now = Date.now();
    if (cached && now < cacheExpiry) return cached;
    // 1. Try Ollama
    const ollama = await probeOllama();
    if (ollama) {
        cached = {
            providerId: 'ollama',
            modelId: ollama.modelId,
            source: 'ollama'
        };
        cacheExpiry = now + CACHE_TTL_MS;
        log.info(`Auto-detected: Ollama with model "${ollama.modelId}"`);
        return cached;
    }
    // 2. Try env vars
    const envResult = probeEnvKeys();
    if (envResult) {
        cached = envResult;
        cacheExpiry = now + CACHE_TTL_MS;
        log.info(`Auto-detected: ${envResult.providerId} (from ${envResult.providerId.toUpperCase()}_API_KEY env var)`);
        return cached;
    }
    // 3. Nothing found — throw with instructions
    throw new Error('No AI provider is configured. To fix this, do ONE of the following:\n' + '\n' + '  1. Install and run Ollama locally (https://ollama.com) — the app will auto-detect it.\n' + '     Run: ollama pull llama3.3\n' + '\n' + '  2. Set an API key in your .env file:\n' + '     OPENAI_API_KEY=sk-...\n' + '     (or ANTHROPIC_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, DEEPSEEK_API_KEY, OPENROUTER_API_KEY)\n' + '\n' + '  3. Set DEFAULT_MODEL in .env to explicitly choose a provider:model:\n' + '     DEFAULT_MODEL=ollama:llama3.3\n' + '     DEFAULT_MODEL=openai:gpt-4o-mini\n' + '\n' + '  4. Configure providers in server-providers.yml (see server-providers.example.yml)\n' + '\n' + 'See SETUP_PROVIDERS.md for detailed instructions.');
}


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

/***/ 960736:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ez: () => (/* binding */ resolveDefaultModelString),
/* harmony export */   callChat: () => (/* binding */ callChat)
/* harmony export */ });
/* unused harmony exports streamChat, callChatMessages */
/* harmony import */ var _lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(592901);
/* harmony import */ var _lib_ai_llm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(525351);
/* harmony import */ var _lib_ai_auto_detect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(148953);
/* harmony import */ var _lib_ai_providers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(228262);
/* harmony import */ var _lib_server_ai_call_log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(965955);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(122035);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_0__, _lib_server_ai_call_log__WEBPACK_IMPORTED_MODULE_4__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__]);
([_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_0__, _lib_server_ai_call_log__WEBPACK_IMPORTED_MODULE_4__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Unified LLM Helper — the single entry point for API routes.
 *
 * This module wraps `resolveModelFromRequest` + `callLLM`/`streamLLM` into
 * simple one-call APIs so individual route files don't need to import
 * resolve-model, llm, provider-config, thinking-context, etc.
 *
 * Migration pattern for routes that previously used ZAI directly:
 *
 *   // BEFORE (ZAI, sandbox-only):
 *   const ZAI = (await import('z-ai-web-dev-sdk')).default;
 *   const zai = await ZAI.create();
 *   const completion = await zai.chat.completions.create({
 *     messages: [{ role: 'system', content: SYS }, { role: 'user', content: prompt }],
 *   });
 *   const text = completion.choices[0]?.message?.content || '';
 *
 *   // AFTER (provider-agnostic, works with any configured provider):
 *   import { callChat } from '@/lib/ai/unified-llm';
 *   const text = await callChat(req, { system: SYS, prompt, stage: 'chat-adapter' });
 *
 * The resolved provider respects: stage routes (MODEL_ROUTES) > x-model header >
 * DEFAULT_MODEL env > auto-detect (Ollama → env keys → ZAI).
 *
 * ── MULTI-ENDPOINT BYOK FAILOVER (callChat only) ──
 * When the resolved model came from one of the user's saved endpoints
 * (UserApiKey rows — e.g. a remote Ollama + a local Ollama, or two OpenAI
 * keys) and the call FAILS, callChat transparently re-resolves the model on
 * the user's NEXT endpoint and retries — up to one attempt per endpoint.
 * The user's endpoints are tried round-robin as the STARTING point, so load
 * also spreads across keys over time. Streaming (streamChat) resolves a
 * single endpoint per stream — failover is not possible once bytes have
 * started flowing, so it is deliberately not attempted there.
 */ 






const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_6__/* .createLogger */ .h)('UnifiedLLM');
/** Resolve the model for a call — same logic for first attempt and failover
 *  attempts (the slot pins WHICH user endpoint provides key/baseUrl). */ async function resolveForCall(req, body, stage, byokSlot) {
    let resolved = await (0,_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_0__/* .resolveModelFromRequest */ .V2)(req, body, stage, byokSlot);
    // If resolution fails because no model is configured, try auto-detect
    if (!resolved && !process.env.DEFAULT_MODEL) {
        const auto = await (0,_lib_ai_auto_detect__WEBPACK_IMPORTED_MODULE_2__.autoDetectDefaultModel)();
        resolved = await (0,_lib_server_resolve_model__WEBPACK_IMPORTED_MODULE_0__.resolveModel)({
            modelString: `${auto.providerId}:${auto.modelId}`,
            stage,
            _req: req,
            ...byokSlot != null ? {
                byokSlot
            } : {}
        });
    }
    return resolved;
}
/**
 * Call the LLM with a chat completion and return the text response.
 *
 * This is the primary replacement for `zai.chat.completions.create()`.
 * On a failed call, if the model was resolved from one of the user's
 * multiple saved endpoints, the remaining endpoints are tried in order
 * before the error surfaces (transparent failover).
 *
 * @param req The NextRequest (used to read x-model, x-api-key headers + auth)
 * @param options Chat parameters (system, prompt, stage, etc.)
 * @returns The generated text (empty string if no content)
 */ async function callChat(req, options) {
    const body = options.messages ? {
        thinkingConfig: undefined
    } : {};
    const messages = options.messages || [
        ...options.prompt ? [
            {
                role: 'user',
                content: options.prompt
            }
        ] : []
    ];
    if (messages.length === 0 && !options.system) {
        throw new Error('callChat requires either `prompt`, `messages`, or `system`+`prompt`');
    }
    // ── Analytics attribution ──
    // Resolve the requesting user once so telemetry rows can be attributed even
    // when the call runs on server-managed keys (where resolve-model never looks
    // up the user). Best-effort: never blocks or fails the call.
    const attributionUserId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_5__/* .getAuthenticatedUserId */ .At)(req).catch(()=>null);
    // ── Multi-endpoint failover ──
    // Covers BOTH failure points: model RESOLUTION (bad/SSRF-rejected endpoint
    // URL throws inside resolveForCall) and the CALL itself (transport/5xx).
    // Optimistic ceiling until a successful resolution tells us the real count.
    const OPTIMISTIC_ENDPOINT_CEILING = 6;
    let endpointCount = OPTIMISTIC_ENDPOINT_CEILING;
    let startSlot = null;
    let lastErr = undefined;
    for(let attempt = 0; attempt < endpointCount; attempt++){
        let attemptResolved;
        // Pin the slot once we know it (post-first-success) so failover walks the
        // endpoint list deterministically; before that, resolution round-robins.
        const pinSlot = startSlot != null ? (startSlot + attempt) % endpointCount : undefined;
        try {
            const r = await resolveForCall(req, body, options.stage, pinSlot);
            if (!r) throw new Error('Model resolution returned nothing');
            attemptResolved = r;
            if (attemptResolved.byok) {
                endpointCount = attemptResolved.byok.endpointCount;
                startSlot = attemptResolved.byok.slot;
                // Clamp the loop if the count shrank (endpoint deleted mid-flight).
                if (attempt >= endpointCount) break;
            }
        } catch (e) {
            lastErr = e;
            const canFailOver = endpointCount > 1 && attempt < endpointCount - 1 && !(options.abortSignal?.aborted === true);
            if (!canFailOver) throw e;
            log.warn(`[callChat] model resolution failed on endpoint attempt ${attempt + 1}` + ` (${e instanceof Error ? e.message : e}) — trying the next endpoint`);
            continue;
        }
        if (attempt > 0) {
            log.info(`[callChat] failing over to ${attemptResolved.providerId}:${attemptResolved.modelId}` + ` endpoint ${(attemptResolved.byok?.slot ?? 0) + 1}/${endpointCount}` + `${attemptResolved.baseUrl ? ` (${attemptResolved.baseUrl})` : ''}`);
        }
        try {
            const callStartedAt = Date.now();
            const result = await (0,_lib_ai_llm__WEBPACK_IMPORTED_MODULE_1__.callLLM)({
                model: attemptResolved.model,
                ...options.system ? {
                    system: options.system
                } : {},
                messages,
                ...options.maxOutputTokens ? {
                    maxOutputTokens: options.maxOutputTokens
                } : {},
                ...options.temperature != null ? {
                    temperature: options.temperature
                } : {},
                ...options.topP != null ? {
                    topP: options.topP
                } : {},
                ...options.stopSequences?.length ? {
                    stopSequences: options.stopSequences
                } : {},
                ...options.maxRetries != null ? {
                    maxRetries: options.maxRetries
                } : {},
                ...options.abortSignal ? {
                    abortSignal: options.abortSignal
                } : {}
            }, options.stage || 'chat-adapter', options.retries != null ? {
                retries: options.retries,
                validate: options.validate
            } : undefined, attemptResolved.thinkingConfig);
            // ── Analytics: success telemetry (fire-and-forget) ──
            const usage = (0,_lib_server_ai_call_log__WEBPACK_IMPORTED_MODULE_4__/* .extractUsage */ .f)(result);
            (0,_lib_server_ai_call_log__WEBPACK_IMPORTED_MODULE_4__/* .logAiCall */ .l)({
                userId: attemptResolved.byok?.userId ?? attributionUserId,
                providerId: attemptResolved.providerId,
                modelId: attemptResolved.modelId,
                stage: options.stage || null,
                status: 'success',
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                latencyMs: Date.now() - callStartedAt,
                endpointRowId: attemptResolved.byok?.rowId ?? null
            });
            return result.text || '';
        } catch (err) {
            lastErr = err;
            // ── Analytics: error telemetry for THIS endpoint attempt ──
            (0,_lib_server_ai_call_log__WEBPACK_IMPORTED_MODULE_4__/* .logAiCall */ .l)({
                userId: attemptResolved.byok?.userId ?? attributionUserId,
                providerId: attemptResolved.providerId,
                modelId: attemptResolved.modelId,
                stage: options.stage || null,
                status: 'error',
                latencyMs: null,
                error: err instanceof Error ? err.message : String(err),
                endpointRowId: attemptResolved.byok?.rowId ?? null
            });
            const canFailOver = endpointCount > 1 && attempt < endpointCount - 1 && !(options.abortSignal?.aborted === true);
            if (!canFailOver) throw err;
            log.warn(`[callChat] endpoint ${startSlot != null ? startSlot + 1 : attempt + 1}/${endpointCount} failed` + ` (${err instanceof Error ? err.message : err}) — trying the next endpoint`);
        // Loop continues with the next slot.
        }
    }
    throw lastErr instanceof Error ? lastErr : new Error('callChat failed on every endpoint');
}
/**
 * Stream the LLM response. Returns a Vercel AI SDK StreamTextResult.
 *
 * Use this for streaming chat UIs (e.g. tutor chat, performance coach).
 * NOTE: single endpoint per stream — no failover once the stream opens
 * (see the module header).
 *
 * @param req The NextRequest
 * @param options Chat options
 */ function streamChat(req, options) {
    // Note: streamChat is synchronous in its return but async in setup.
    // We resolve the model first, then return the stream.
    return (async ()=>{
        const body = options.messages ? {
            thinkingConfig: undefined
        } : {};
        let resolved = await resolveModelFromRequest(req, body, options.stage);
        if (!resolved && !process.env.DEFAULT_MODEL) {
            const auto = await autoDetectDefaultModel();
            resolved = await resolveModel({
                modelString: `${auto.providerId}:${auto.modelId}`,
                stage: options.stage,
                _req: req
            });
        }
        const messages = options.messages || [
            ...options.prompt ? [
                {
                    role: 'user',
                    content: options.prompt
                }
            ] : []
        ];
        return streamLLM({
            model: resolved.model,
            ...options.system ? {
                system: options.system
            } : {},
            messages,
            ...options.maxOutputTokens ? {
                maxOutputTokens: options.maxOutputTokens
            } : {},
            ...options.temperature != null ? {
                temperature: options.temperature
            } : {},
            ...options.topP != null ? {
                topP: options.topP
            } : {},
            ...options.stopSequences?.length ? {
                stopSequences: options.stopSequences
            } : {}
        }, options.stage || 'chat-adapter', resolved.thinkingConfig);
    })();
}
/**
 * Call the LLM with explicit messages (for multi-turn conversations).
 *
 * Alias for `callChat(req, { messages, ... })`.
 */ async function callChatMessages(req, messages, options = {}) {
    return callChat(req, {
        ...options,
        messages
    });
}
/**
 * Resolve the default model string for a stage, using auto-detect if needed.
 * Useful for routes that need to know the provider before calling.
 */ async function resolveDefaultModelString(stage) {
    // Check if a stage route is configured
    if (stage) {
        const { getStageRoute } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 598603));
        const route = getStageRoute(stage);
        if (route?.model) return route.model;
    }
    // Check DEFAULT_MODEL env
    if (process.env.DEFAULT_MODEL) return process.env.DEFAULT_MODEL;
    // Auto-detect
    const auto = await (0,_lib_ai_auto_detect__WEBPACK_IMPORTED_MODULE_2__.autoDetectDefaultModel)();
    return `${auto.providerId}:${auto.modelId}`;
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 965955:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ extractUsage),
/* harmony export */   l: () => (/* binding */ logAiCall)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * AI call telemetry — server-only.
 *
 * Fire-and-forget writes to the AiCallLog table, one row per completed LLM
 * call (success or error). Powers the BYOK Analytics tab. This module is
 * STRICTLY non-blocking and non-throwing:
 *   - logAiCall() returns immediately; the DB insert runs detached.
 *   - Every failure path is swallowed (logged at debug level at most).
 * Telemetry must never break the feature it observes.
 */ 
/** Persist one call log row. Fire-and-forget — never rejects. */ function logAiCall(entry) {
    void (async ()=>{
        try {
            await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.aiCallLog.create({
                data: {
                    ...entry.userId ? {
                        userId: entry.userId
                    } : {},
                    providerId: entry.providerId,
                    modelId: entry.modelId.slice(0, 200),
                    ...entry.stage ? {
                        stage: entry.stage.slice(0, 60)
                    } : {},
                    status: entry.status,
                    inputTokens: Math.max(0, Math.min(entry.inputTokens ?? 0, 2000000000)),
                    outputTokens: Math.max(0, Math.min(entry.outputTokens ?? 0, 2000000000)),
                    ...entry.latencyMs != null ? {
                        latencyMs: Math.max(0, Math.min(Math.round(entry.latencyMs), 2000000000))
                    } : {},
                    ...entry.error ? {
                        error: entry.error.slice(0, 500)
                    } : {},
                    ...entry.endpointRowId ? {
                        endpointRowId: entry.endpointRowId
                    } : {}
                }
            });
        } catch  {
        // Swallowed by design: analytics must never surface as a user-facing
        // error. (Table missing in dev before `prisma db push`, DB hiccup, …)
        }
    })();
}
/** Extract token usage from an AI SDK GenerateTextResult-like object. */ function extractUsage(result) {
    const usage = result?.usage;
    const num = (v)=>typeof v === 'number' && Number.isFinite(v) ? v : 0;
    return {
        inputTokens: num(usage?.inputTokens),
        outputTokens: num(usage?.outputTokens)
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;