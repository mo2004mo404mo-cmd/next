"use strict";
exports.id = 8262;
exports.ids = [8262];
exports.modules = {

/***/ 228262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E1: () => (/* binding */ getModel),
/* harmony export */   PROVIDERS: () => (/* reexport safe */ _provider_catalog__WEBPACK_IMPORTED_MODULE_2__.x),
/* harmony export */   UT: () => (/* binding */ parseModelString)
/* harmony export */ });
/* unused harmony exports isProviderKeyRequired, getAllModels, getProvider, getModelInfo */
/* harmony import */ var _ai_sdk_openai__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(531795);
/* harmony import */ var _ai_sdk_anthropic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(609877);
/* harmony import */ var _ai_sdk_google__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(339080);
/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(762939);
/* harmony import */ var _reasoning_sse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(984380);
/* harmony import */ var _model_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(826295);
/* harmony import */ var _thinking_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(716533);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _provider_catalog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(815969);
/**
 * Unified AI Provider Configuration
 *
 * Supports multiple AI providers through Vercel AI SDK:
 * - OpenAI (native)
 * - Anthropic Claude (native)
 * - Google Gemini (native)
 * - MiniMax (Anthropic-compatible, recommended by official)
 * - OpenAI-compatible providers (DeepSeek, Qwen, Kimi, GLM, SiliconFlow, Doubao, Tencent, Xiaomi, Lemonade, etc.)
 *
 * Sources:
 * - https://platform.openai.com/docs/models
 * - https://platform.claude.com/docs/en/about-claude/models/overview
 * - https://ai.google.dev/gemini-api/docs/models
 * - https://api-docs.deepseek.com/quick_start/pricing
 * - https://platform.moonshot.cn/docs/pricing/chat
 * - https://platform.minimaxi.com/docs/guides/text-generation
 * - https://platform.minimaxi.com/docs/api-reference/text-anthropic-api
 * - https://docs.bigmodel.cn/cn/guide/start/model-overview
 * - https://help.aliyun.com/zh/model-studio/models (Qwen/DashScope)
 * - https://siliconflow.cn/models
 * - https://siliconflow.cn/pricing
 * - https://www.volcengine.com/docs/82379/1330310
 * - https://platform.xiaomimimo.com/static/docs/pricing.md
 * - https://platform.xiaomimimo.com/static/docs/tokenplan/quick-access.md
 */ 







// NOTE: Do NOT import thinking-context.ts here — it uses node:async_hooks
// which is server-only, and this file is also used on the client via
// settings.ts. The thinking context is read from globalThis instead
// (set by thinking-context.ts at module load time on the server).
const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AIProviders');
// 2026-11-04: the pure catalog (PROVIDERS, MONO_LOGO_PROVIDERS) moved to
// ./provider-catalog — a dependency-free module safe for browser chunks
// (this file pulls in the Vercel AI SDK, whose @ai-sdk/provider-utils
// imports node:dns — a browser-chunk panic under Turbopack). Re-exported
// here so server consumers keep working unchanged.


// (provider-catalog.ts runs applyModelMetadata(PROVIDERS) itself at load.)
/**
 * Get provider config (from built-in or unified config in localStorage)
 */ function getProviderConfig(providerId) {
    // Check built-in providers first
    if (_provider_catalog__WEBPACK_IMPORTED_MODULE_2__/* .PROVIDERS */ .x[providerId]) {
        return _provider_catalog__WEBPACK_IMPORTED_MODULE_2__/* .PROVIDERS */ .x[providerId];
    }
    // Check unified providersConfig in localStorage (browser only)
    if (false) {}
    return null;
}
function getCompatThinkingBodyParams(providerId, modelId, config) {
    const capability = (0,_model_metadata__WEBPACK_IMPORTED_MODULE_0__/* .getCatalogThinkingCapability */ .uY)(providerId, modelId);
    if (!capability || capability.control === 'none') return undefined;
    const mode = (0,_thinking_config__WEBPACK_IMPORTED_MODULE_3__/* .getThinkingMode */ .QL)(config);
    const budget = (0,_thinking_config__WEBPACK_IMPORTED_MODULE_3__/* .pickThinkingBudget */ .hg)(capability, config);
    switch(capability.requestAdapter){
        case 'kimi':
        case 'xiaomi':
            if (mode === 'disabled') return {
                thinking: {
                    type: 'disabled'
                }
            };
            if (mode === 'enabled') return {
                thinking: {
                    type: 'enabled'
                }
            };
            return undefined;
        case 'glm':
            {
                if (capability.control === 'effort') {
                    if (mode === 'disabled' || config.effort === 'none') {
                        return {
                            thinking: {
                                type: 'disabled'
                            }
                        };
                    }
                    const effort = config.effort && capability.effortValues?.includes(config.effort) ? config.effort : mode === 'enabled' ? capability.defaultEffort : undefined;
                    const body = {};
                    if (mode === 'enabled' || effort) body.thinking = {
                        type: 'enabled'
                    };
                    if (effort) body.reasoning_effort = effort;
                    return Object.keys(body).length > 0 ? body : undefined;
                }
                if (mode === 'disabled') return {
                    thinking: {
                        type: 'disabled'
                    }
                };
                if (mode === 'enabled') return {
                    thinking: {
                        type: 'enabled'
                    }
                };
                return undefined;
            }
        case 'deepseek':
            {
                if (mode === 'disabled' || config.effort === 'none') {
                    return {
                        thinking: {
                            type: 'disabled'
                        }
                    };
                }
                const effort = config.effort === 'max' || config.effort === 'xhigh' ? 'max' : 'high';
                return {
                    thinking: {
                        type: 'enabled'
                    },
                    reasoning_effort: effort
                };
            }
        case 'qwen':
            {
                if (mode === 'disabled') return {
                    enable_thinking: false
                };
                const body = {};
                if (mode === 'enabled') body.enable_thinking = true;
                if (budget !== undefined) body.thinking_budget = budget;
                return Object.keys(body).length > 0 ? body : undefined;
            }
        case 'siliconflow':
            {
                const body = {};
                if (capability.control === 'toggle-budget') {
                    if (mode === 'disabled') body.enable_thinking = false;
                    if (mode === 'enabled') body.enable_thinking = true;
                }
                if (budget !== undefined) body.thinking_budget = budget;
                return Object.keys(body).length > 0 ? body : undefined;
            }
        case 'doubao':
            {
                if (capability.control === 'effort') {
                    const effort = mode === 'disabled' ? 'minimal' : config.effort && capability.effortValues?.includes(config.effort) ? config.effort : mode === 'enabled' ? capability.defaultEffort : undefined;
                    return effort ? {
                        reasoning_effort: effort
                    } : undefined;
                }
                if (mode === 'auto') return {
                    thinking: {
                        type: 'auto'
                    }
                };
                if (mode === 'disabled') return {
                    thinking: {
                        type: 'disabled'
                    }
                };
                if (mode === 'enabled') return {
                    thinking: {
                        type: 'enabled'
                    }
                };
                return undefined;
            }
        case 'openrouter':
            {
                const reasoning = {};
                if (mode === 'disabled') reasoning.enabled = false;
                if (mode === 'enabled') reasoning.enabled = true;
                if (config.effort) reasoning.effort = config.effort;
                if (budget !== undefined) reasoning.max_tokens = budget;
                if (typeof config.excludeReasoningOutput === 'boolean') {
                    reasoning.exclude = config.excludeReasoningOutput;
                }
                return Object.keys(reasoning).length > 0 ? {
                    reasoning
                } : undefined;
            }
        case 'hunyuan':
            {
                let reasoningEffort;
                if (mode === 'disabled' || config.effort === 'none') {
                    reasoningEffort = 'no_think';
                } else if (config.effort === 'high' || config.effort === 'max' || config.effort === 'xhigh') {
                    reasoningEffort = 'high';
                } else if (config.effort === 'low' || config.effort === 'medium' || config.effort === 'minimal') {
                    reasoningEffort = 'low';
                } else if (mode === 'enabled') {
                    reasoningEffort = capability.defaultEffort === 'high' ? 'high' : 'low';
                }
                return reasoningEffort ? {
                    chat_template_kwargs: {
                        reasoning_effort: reasoningEffort
                    }
                } : undefined;
            }
        case 'lemonade':
            {
                const chatTemplateKwargs = {};
                if (mode === 'enabled') {
                    chatTemplateKwargs.enable_thinking = true;
                } else {
                    chatTemplateKwargs.enable_thinking = false;
                }
                if (mode === 'enabled' && budget !== undefined) {
                    chatTemplateKwargs.thinking_budget = budget;
                }
                return {
                    chat_template_kwargs: chatTemplateKwargs
                };
            }
        default:
            return undefined;
    }
}
function normalizeMiniMaxAnthropicBaseUrl(providerId, baseUrl) {
    if (providerId !== 'minimax' || !baseUrl) {
        return baseUrl;
    }
    const trimmed = baseUrl.replace(/\/$/, '');
    if (trimmed.endsWith('/anthropic/v1')) {
        return trimmed;
    }
    if (trimmed.endsWith('/anthropic')) {
        return `${trimmed}/v1`;
    }
    return `${trimmed}/anthropic/v1`;
}
function shouldUseOpenAIResponsesApi(providerId, modelId) {
    if (providerId !== 'openai') return false;
    return /^gpt-5\.\d+-pro(?:-|$)/.test(modelId) || /^gpt-5\.5(?:-|$)/.test(modelId) || /^gpt-5\.[3-9]-codex(?:-|$)/.test(modelId);
}
/** Returns true if the provider requires an API key (defaults to true for unknown providers). */ function isProviderKeyRequired(providerId) {
    return getProviderConfig(providerId)?.requiresApiKey ?? true;
}
/**
 * Get a configured language model instance with its info
 * Accepts individual parameters for flexibility and security
 */ function getModel(config) {
    // providerType can come from client for custom providers; fall back to registry.
    let providerType = config.providerType;
    const provider = getProviderConfig(config.providerId);
    const requiresApiKey = provider?.requiresApiKey ?? true;
    if (!providerType) {
        if (provider) {
            providerType = provider.type;
        } else {
            throw new Error(`Unknown provider: ${config.providerId}. Please provide providerType.`);
        }
    }
    // Validate API key if required
    if (requiresApiKey && !config.apiKey) {
        throw new Error(`API key required for provider: ${config.providerId}`);
    }
    // Use provided API key, or empty string for providers that don't require one
    const effectiveApiKey = config.apiKey || '';
    // Resolve base URL: explicit > provider default > SDK default
    const effectiveBaseUrl = normalizeMiniMaxAnthropicBaseUrl(config.providerId, config.baseUrl || provider?.defaultBaseUrl || undefined);
    let model;
    switch(providerType){
        case 'openai':
            {
                const openaiOptions = {
                    apiKey: effectiveApiKey,
                    baseURL: effectiveBaseUrl
                };
                // For OpenAI-compatible providers (not native OpenAI), add a fetch
                // wrapper that injects vendor-specific thinking params into the HTTP
                // body. The thinking config is read from AsyncLocalStorage, set by
                // callLLM / streamLLM at call time.
                if (config.providerId !== 'openai') {
                    const providerId = config.providerId;
                    const compatFetch = async (url, init)=>{
                        // Read thinking config from globalThis (set by thinking-context.ts)
                        const thinkingCtx = globalThis.__thinkingContext;
                        const thinkingFromContext = thinkingCtx?.getStore?.();
                        const thinking = thinkingFromContext ?? (providerId === 'lemonade' ? (0,_thinking_config__WEBPACK_IMPORTED_MODULE_3__/* .getDefaultThinkingConfig */ .oY)((0,_model_metadata__WEBPACK_IMPORTED_MODULE_0__/* .getCatalogThinkingCapability */ .uY)(providerId, config.modelId)) : undefined);
                        if (thinking && init?.body && typeof init.body === 'string') {
                            const extra = getCompatThinkingBodyParams(providerId, config.modelId, thinking);
                            if (extra) {
                                try {
                                    const body = JSON.parse(init.body);
                                    if (providerId === 'lemonade' && 'stream_options' in body) {
                                        delete body.stream_options;
                                    }
                                    Object.assign(body, extra);
                                    init = {
                                        ...init,
                                        body: JSON.stringify(body)
                                    };
                                } catch  {
                                /* leave body as-is */ }
                            }
                        }
                        const response = await globalThis.fetch(url, init);
                        // Recover reasoning that @ai-sdk/openai's chat schema drops: rewrite
                        // streamed `reasoning_content` deltas into an inline <think> block
                        // (the model below is wrapped with extractReasoningMiddleware to split
                        // it back into first-class reasoning parts). No-op when absent.
                        const streamingReasoned = (()=>{
                            let streaming = false;
                            if (init?.body && typeof init.body === 'string') {
                                try {
                                    streaming = JSON.parse(init.body)?.stream === true;
                                } catch  {
                                /* ignore request-body inspection failure */ }
                            }
                            return streaming ? (0,_reasoning_sse__WEBPACK_IMPORTED_MODULE_4__/* .wrapResponseWithReasoning */ .e)(response) : response;
                        })();
                        if (providerId !== 'lemonade') {
                            return streamingReasoned;
                        }
                        const contentType = response.headers.get('content-type') || '';
                        let isStreamingRequest = false;
                        if (init?.body && typeof init.body === 'string') {
                            try {
                                const requestBody = JSON.parse(init.body);
                                isStreamingRequest = requestBody?.stream === true;
                            } catch  {
                            /* ignore request-body inspection failure */ }
                        }
                        if (isStreamingRequest) {
                            return response;
                        }
                        try {
                            const cloned = response.clone();
                            const text = await cloned.text();
                            try {
                                JSON.parse(text);
                            } catch (error) {
                                const message = error instanceof Error ? error.message : String(error);
                                log.warn(`[Lemonade] Invalid JSON response from OpenAI-compatible path: status=${response.status}, contentType=${contentType || 'n/a'}, bodyLen=${text.length}, first=${JSON.stringify(text.slice(0, 500))}, last=${JSON.stringify(text.slice(Math.max(0, text.length - 500)))}, parseError=${message}`);
                            }
                        } catch (error) {
                            log.warn('[Lemonade] Failed to inspect JSON response body:', error);
                        }
                        return response;
                    };
                    openaiOptions.fetch = compatFetch;
                }
                const openai = (0,_ai_sdk_openai__WEBPACK_IMPORTED_MODULE_5__/* .createOpenAI */ .ry)(openaiOptions);
                model = shouldUseOpenAIResponsesApi(config.providerId, config.modelId) ? openai.responses(config.modelId) : openai.chat(config.modelId);
                // OpenAI-compatible providers (e.g. DeepSeek, Qwen) stream reasoning
                // either as a separate `reasoning_content` field (normalized to an inline
                // <think> block by compatFetch) or as native inline <think>.
                // Split it into first-class reasoning parts so the agent stream and UI can
                // show a thinking panel and the answer text stays clean. Native OpenAI
                // handles reasoning itself, so it is excluded.
                if (config.providerId !== 'openai') {
                    model = (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .wrapLanguageModel */ .aew)({
                        model,
                        middleware: (0,ai__WEBPACK_IMPORTED_MODULE_6__/* .extractReasoningMiddleware */ .Ol)({
                            tagName: 'think'
                        })
                    });
                }
                break;
            }
        case 'anthropic':
            {
                const anthropicOptions = {
                    baseURL: effectiveBaseUrl
                };
                if (config.providerId === 'minimax' && effectiveApiKey.startsWith('sk-cp-')) {
                    anthropicOptions.authToken = effectiveApiKey;
                } else {
                    anthropicOptions.apiKey = effectiveApiKey;
                }
                if (config.providerId === 'minimax') {
                    anthropicOptions.fetch = async (url, init)=>{
                        const capability = (0,_model_metadata__WEBPACK_IMPORTED_MODULE_0__/* .getCatalogThinkingCapability */ .uY)(config.providerId, config.modelId);
                        const thinkingCtx = globalThis.__thinkingContext;
                        const thinking = thinkingCtx?.getStore?.();
                        if (capability?.requestAdapter === 'anthropic' && capability.control !== 'none' && (0,_thinking_config__WEBPACK_IMPORTED_MODULE_3__/* .getThinkingMode */ .QL)(thinking) === 'disabled' && init?.body && typeof init.body === 'string') {
                            try {
                                const body = JSON.parse(init.body);
                                body.thinking = {
                                    type: 'disabled'
                                };
                                init = {
                                    ...init,
                                    body: JSON.stringify(body)
                                };
                            } catch  {
                            /* leave body as-is */ }
                        }
                        return globalThis.fetch(url, init);
                    };
                }
                const anthropic = (0,_ai_sdk_anthropic__WEBPACK_IMPORTED_MODULE_7__/* .createAnthropic */ .nM)(anthropicOptions);
                model = anthropic.chat(config.modelId);
                break;
            }
        case 'google':
            {
                const googleOptions = {
                    apiKey: effectiveApiKey,
                    baseURL: effectiveBaseUrl
                };
                if (config.proxy) {
                    const proxy = config.proxy;
                    let agent;
                    googleOptions.fetch = async (input, init)=>{
                        const { ProxyAgent, fetch: undiciFetch } = await import(/* webpackIgnore: true */ 'undici');
                        agent ??= new ProxyAgent(proxy);
                        const response = await undiciFetch(input, {
                            ...init,
                            dispatcher: agent
                        });
                        return response;
                    };
                }
                const google = (0,_ai_sdk_google__WEBPACK_IMPORTED_MODULE_8__/* .createGoogleGenerativeAI */ .sw)(googleOptions);
                model = google.chat(config.modelId);
                break;
            }
        default:
            throw new Error(`Unsupported provider type: ${providerType}`);
    }
    // Look up model info from the provider registry
    const modelInfo = provider?.models.find((m)=>m.id === config.modelId) || null;
    return {
        model,
        modelInfo
    };
}
/**
 * Parse model string in format "providerId:modelId" or just "modelId" (defaults to ZAI)
 *
 * MedQ adaptation: OpenMAIC's original default was 'openai' for backward
 * compatibility. MedQ uses ZAI as its native LLM backend, so a bare model
 * string (e.g. 'auto' or 'glm-4.5') resolves to the ZAI provider. This keeps
 * `.z-ai-config`-only deployments working without an explicit `zai:` prefix.
 */ function parseModelString(modelString) {
    // Split only on the first colon to handle model IDs that contain colons
    const colonIndex = modelString.indexOf(':');
    if (colonIndex > 0) {
        return {
            providerId: modelString.slice(0, colonIndex),
            modelId: modelString.slice(colonIndex + 1)
        };
    }
    // Default to ZAI (MedQ's native LLM backend)
    return {
        providerId: 'zai',
        modelId: modelString
    };
}
/**
 * Get all available models grouped by provider
 */ function getAllModels() {
    return Object.values(PROVIDERS).map((provider)=>({
            provider,
            models: provider.models
        }));
}
/**
 * Get provider by ID
 */ function getProvider(providerId) {
    return PROVIDERS[providerId];
}
/**
 * Get model info
 */ function getModelInfo(providerId, modelId) {
    const provider = PROVIDERS[providerId];
    return provider?.models.find((m)=>m.id === modelId);
}


/***/ }),

/***/ 984380:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ wrapResponseWithReasoning)
/* harmony export */ });
/* unused harmony export createReasoningContentRewriter */
/**
 * Reasoning-channel normalization for OpenAI-compatible providers.
 *
 * DeepSeek-style models stream their chain-of-thought in a separate
 * `delta.reasoning_content` field. `@ai-sdk/openai`
 * speaks the standard chat-completions schema, whose delta has no such field, so
 * it silently DROPS reasoning — it never reaches the agent stream or the UI.
 *
 * To recover it without a bespoke provider, we rewrite the wire so reasoning
 * arrives inline as a `<think>…</think>` block in `content`. The model instance is
 * then wrapped with the AI SDK's `extractReasoningMiddleware({ tagName: 'think' })`,
 * which splits that block back out into first-class `reasoning` stream parts while
 * leaving the answer text clean. (This also subsumes models that already emit
 * inline `<think>` natively, e.g. MiniMax-M3.)
 *
 * The rewriter is a small state machine over the streamed chunks: it opens the
 * tag on the first reasoning delta and closes it at the first non-reasoning
 * signal (real content, a tool call, or finish) — including the case where
 * reasoning is followed directly by a tool call with no content in between.
 */ /**
 * Create a stateful rewriter for one streamed response. Call it on each parsed
 * `chat.completion.chunk`; it mutates and returns the same object with
 * `reasoning_content` folded into a `<think>…</think>` block in `content`.
 */ function createReasoningContentRewriter() {
    let open = false; // a <think> tag has been emitted
    let closed = false; // a matching </think> has been emitted
    return function rewrite(chunk) {
        const choice = chunk.choices?.[0];
        const delta = choice?.delta;
        if (!delta) return chunk;
        const rc = delta.reasoning_content;
        const reasoning = typeof rc === 'string' ? rc : '';
        if (reasoning !== '' && !closed) {
            // Reasoning delta: open the block on the first one (prefix `<think>`), then
            // append raw. If the SAME chunk also carries real answer `content`, close
            // the block BEFORE it so the answer isn't absorbed into the reasoning
            // (some providers send the reasoning→answer transition in one delta).
            const origContent = typeof delta.content === 'string' ? delta.content : '';
            const prefix = open ? '' : '<think>';
            open = true;
            if (origContent !== '') {
                delta.content = prefix + reasoning + '</think>' + origContent;
                closed = true;
            } else {
                delta.content = prefix + reasoning;
            }
            delete delta.reasoning_content;
            return chunk;
        }
        if ('reasoning_content' in delta) delete delta.reasoning_content;
        if (open && !closed) {
            const hasContent = typeof delta.content === 'string' && delta.content !== '';
            const hasToolCall = Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0;
            const finishing = choice?.finish_reason != null;
            if (hasContent || hasToolCall || finishing) {
                delta.content = '</think>' + (typeof delta.content === 'string' ? delta.content : '');
                closed = true;
            }
        }
        return chunk;
    };
}
/**
 * Wrap a streaming chat-completions `Response` so each SSE `data:` chunk passes
 * through {@link createReasoningContentRewriter}. Non-data lines (comments,
 * `[DONE]`, blank separators) and unparseable payloads pass through verbatim.
 * Buffers across read boundaries so a `data:` line split mid-JSON is handled.
 */ function wrapResponseWithReasoning(response) {
    if (!response.body) return response;
    const rewrite = createReasoningContentRewriter();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = '';
    const rewriteLine = (line)=>{
        if (!line.startsWith('data:')) return line;
        const payload = line.slice(5).trim();
        if (payload === '' || payload === '[DONE]') return line;
        try {
            const obj = rewrite(JSON.parse(payload));
            return 'data: ' + JSON.stringify(obj);
        } catch  {
            return line; // keep-alive / non-JSON / partial — leave as-is
        }
    };
    const transform = new TransformStream({
        transform (chunk, controller) {
            buffer += decoder.decode(chunk, {
                stream: true
            });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? ''; // last (possibly partial) line stays buffered
            for (const line of lines)controller.enqueue(encoder.encode(rewriteLine(line) + '\n'));
        },
        flush (controller) {
            if (buffer) controller.enqueue(encoder.encode(rewriteLine(buffer)));
        }
    });
    return new Response(response.body.pipeThrough(transform), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    });
}


/***/ })

};
;