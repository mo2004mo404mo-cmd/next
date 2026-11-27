"use strict";
exports.id = 9818;
exports.ids = [9818];
exports.modules = {

/***/ 59818:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callLLM: () => (/* binding */ callLLM)
/* harmony export */ });
/* unused harmony export streamLLM */
/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(817698);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(154368);
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(990201);
/* harmony import */ var _thinking_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(464879);
/* harmony import */ var _model_metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(162098);
/* harmony import */ var _lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(300656);
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
    const result = thinkingContext.run(effectiveThinking, ()=>streamText(injectedParams));
    return result;
}


/***/ }),

/***/ 464879:
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


/***/ })

};
;