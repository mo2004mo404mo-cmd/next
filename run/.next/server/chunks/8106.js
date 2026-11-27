"use strict";
exports.id = 8106;
exports.ids = [8106];
exports.modules = {

/***/ 668106:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOllamaLanguageModel: () => (/* binding */ createOllamaLanguageModel)
/* harmony export */ });
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(154368);
/**
 * Ollama LanguageModel Adapter (Native API + OpenAI-compat fallback)
 *
 * Bridges Ollama's NATIVE API (POST /api/chat, GET /api/tags) into the Vercel
 * AI SDK's `LanguageModelV3` interface. Per https://docs.ollama.com/api/introduction,
 * the native API is the source of truth — it supports features the OpenAI-compat
 * shim (/v1/chat/completions) does not:
 *   - `think` parameter (low/medium/high/max) for reasoning models
 *   - `keep_alive` to control model memory retention
 *   - `format` for structured outputs (JSON / JSON schema)
 *   - Native tool-calling format
 *
 * AUTO-DETECT: On first call, the adapter probes `GET {baseUrl}/api/tags`.
 *   - If it responds (200), native API is used for all subsequent calls.
 *   - If it fails (404 / connection refused), the adapter falls back to the
 *     OpenAI-compatible endpoint at `{baseUrl}/v1/chat/completions`.
 * This detection is cached for the process lifetime.
 *
 * The adapter is dispatched from `resolve-model.ts` when `providerId === 'ollama'`,
 * bypassing `getModel()` (which routes Ollama through `createOpenAI()` — the
 * compat-only path). This gives us native features while keeping the compat
 * fallback for older Ollama versions or proxied setups.
 */ 
const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_0__/* .createLogger */ .h)('OllamaLanguageModel');
/** Normalize an Ollama host while preserving a user-supplied chat endpoint. */ function normalizeBaseUrl(baseUrl) {
    if (!baseUrl) return {
        baseUrl: 'http://localhost:11434'
    };
    const url = baseUrl.trim().replace(/\/+$/, '');
    const compatMatch = url.match(/^(.*)\/(?:v1\/chat\/completions|api\/chat\/completions)$/);
    if (compatMatch) {
        return {
            baseUrl: compatMatch[1].replace(/\/v1$/, ''),
            compatChatUrl: url
        };
    }
    // Strip /v1 if present — we'll add the right path per-endpoint.
    return {
        baseUrl: url.replace(/\/v1$/, '')
    };
}
// ── Native API detection cache ───────────────────────────────────────────────
// Probe once per base URL, cache for the process lifetime.
const nativeApiCache = new Map();
/**
 * Probe whether the native /api/chat endpoint is available.
 * GET /api/tags is the cheapest native endpoint (just lists models).
 */ async function detectNativeApi(baseUrl) {
    if (nativeApiCache.has(baseUrl)) return nativeApiCache.get(baseUrl);
    let available = false;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(()=>controller.abort(), 3000);
        const res = await fetch(`${baseUrl}/api/tags`, {
            signal: controller.signal
        });
        clearTimeout(timeout);
        available = res.ok;
    } catch  {
        available = false;
        log.debug(`Native API probe failed for ${baseUrl} — will use /v1 compat fallback`);
    }
    nativeApiCache.set(baseUrl, available);
    log.info(`Ollama native API at ${baseUrl}/api/tags: ${available ? 'available' : 'unavailable (using /v1 fallback)'}`);
    return available;
}
/** Convert AI SDK prompt messages → Ollama native message format. */ function toOllamaMessages(prompt) {
    return prompt.map((m)=>{
        const role = m.role;
        if (typeof m.content === 'string') {
            return {
                role,
                content: m.content
            };
        }
        // Array content — extract text and images
        const textParts = [];
        const images = [];
        for (const part of m.content){
            if (part.type === 'text') {
                textParts.push(part.text);
            } else if (part.type === 'file') {
                // Ollama expects base64 image data (no data: prefix)
                if (part.data instanceof URL) {
                    // URL-based image — Ollama native API doesn't support URLs directly.
                    // Skip with a warning (vision via URL requires fetching first).
                    log.warn('Ollama native API does not support image URLs — provide base64 data instead');
                } else {
                    const data = typeof part.data === 'string' ? part.data : Buffer.from(part.data).toString('base64');
                    images.push(data);
                }
            }
        }
        const content = textParts.join('\n');
        if (images.length > 0) {
            return {
                role,
                content: [
                    {
                        type: 'text',
                        text: content
                    },
                    {
                        type: 'image_url',
                        images
                    }
                ]
            };
        }
        return {
            role,
            content
        };
    });
}
/** Convert AI SDK messages → OpenAI-compat format (for /v1 fallback). */ function toOpenAIMessages(prompt) {
    return prompt.map((m)=>{
        const role = m.role;
        if (typeof m.content === 'string') {
            return {
                role,
                content: m.content
            };
        }
        const parts = [];
        for (const part of m.content){
            if (part.type === 'text') {
                parts.push({
                    type: 'text',
                    text: part.text
                });
            } else if (part.type === 'file') {
                if (part.data instanceof URL) {
                    parts.push({
                        type: 'image_url',
                        image_url: {
                            url: part.data.toString()
                        }
                    });
                } else {
                    const data = typeof part.data === 'string' ? part.data : Buffer.from(part.data).toString('base64');
                    parts.push({
                        type: 'image_url',
                        image_url: {
                            url: `data:${part.mediaType};base64,${data}`
                        }
                    });
                }
            }
        }
        return {
            role,
            content: parts
        };
    });
}
/**
 * Create a `LanguageModelV3` backed by Ollama's native API, with automatic
 * fallback to the OpenAI-compatible endpoint for older Ollama versions.
 */ function createOllamaLanguageModel(options) {
    const modelId = options.modelId;
    const normalizedUrl = normalizeBaseUrl(options.baseUrl);
    const baseUrl = normalizedUrl.baseUrl;
    const compatChatUrl = normalizedUrl.compatChatUrl || `${baseUrl}/v1/chat/completions`;
    const thinkingEnabled = options.thinkingEnabled ?? false;
    const apiKey = options.apiKey || '';
    const contextLength = Number(process.env.OLLAMA_NUM_CTX || 0);
    /** Build the native /api/chat request body from AI SDK call options. */ function buildNativeBody(opts, stream) {
        const messages = toOllamaMessages(opts.prompt);
        const body = {
            model: modelId,
            messages,
            stream,
            options: {}
        };
        if (opts.temperature != null) body.options.temperature = opts.temperature;
        if (opts.topP != null) body.options.top_p = opts.topP;
        if (opts.maxOutputTokens) body.options.num_predict = opts.maxOutputTokens;
        if (contextLength > 0) body.options.num_ctx = contextLength;
        if (opts.stopSequences?.length) body.options.stop = opts.stopSequences;
        // Enable thinking for reasoning models (deepseek-r1, etc.) if requested
        if (thinkingEnabled) {
            body.think = true;
        }
        // Keep models loaded for 5 minutes between requests (Ollama default)
        body.keep_alive = '5m';
        return body;
    }
    /** Build the OpenAI-compat /v1/chat/completions request body (fallback). */ function buildOpenAIBody(opts, stream) {
        const messages = toOpenAIMessages(opts.prompt);
        const body = {
            model: modelId,
            messages,
            stream
        };
        if (opts.temperature != null) body.temperature = opts.temperature;
        if (opts.topP != null) body.top_p = opts.topP;
        if (opts.maxOutputTokens) body.max_tokens = opts.maxOutputTokens;
        if (opts.stopSequences?.length) body.stop = opts.stopSequences;
        return body;
    }
    /** Common auth headers (empty for Ollama, but support proxies that require a key). */ const headers = {
        'Content-Type': 'application/json'
    };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
    return {
        specificationVersion: 'v3',
        provider: 'ollama',
        modelId,
        supportedUrls: {},
        async doGenerate (opts) {
            const useNative = await detectNativeApi(baseUrl);
            if (useNative) {
                try {
                    const body = buildNativeBody(opts, false);
                    const res = await fetch(`${baseUrl}/api/chat`, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify(body)
                    });
                    if (!res.ok) {
                        const text = await res.text().catch(()=>'');
                        throw new Error(`Ollama /api/chat returned ${res.status}: ${text.slice(0, 200)}`);
                    }
                    const data = await res.json();
                    const text = data.message?.content ?? '';
                    const content = text ? [
                        {
                            type: 'text',
                            text
                        }
                    ] : [];
                    return {
                        content,
                        finishReason: {
                            unified: data.done_reason === 'length' ? 'length' : 'stop',
                            raw: data.done_reason || 'stop'
                        },
                        usage: {
                            inputTokens: {
                                total: data.prompt_eval_count,
                                noCache: data.prompt_eval_count,
                                cacheRead: undefined,
                                cacheWrite: undefined
                            },
                            outputTokens: {
                                total: data.eval_count,
                                noCache: data.eval_count,
                                cacheRead: undefined,
                                cacheWrite: undefined
                            },
                            total: (data.prompt_eval_count ?? 0) + (data.eval_count ?? 0) || undefined
                        },
                        warnings: []
                    };
                } catch (err) {
                    // If native fails, try the compat fallback before giving up
                    log.warn(`Native /api/chat failed, trying /v1 compat fallback: ${err instanceof Error ? err.message : err}`);
                }
            }
            // ── OpenAI-compat fallback (/v1/chat/completions) ──
            const body = buildOpenAIBody(opts, false);
            const res = await fetch(compatChatUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const text = await res.text().catch(()=>'');
                throw new Error(`Ollama /v1/chat/completions returned ${res.status}: ${text.slice(0, 200)}`);
            }
            const data = await res.json();
            const text = data.choices?.[0]?.message?.content ?? '';
            const content = text ? [
                {
                    type: 'text',
                    text
                }
            ] : [];
            return {
                content,
                finishReason: {
                    unified: data.choices?.[0]?.finish_reason === 'length' ? 'length' : 'stop',
                    raw: data.choices?.[0]?.finish_reason || 'stop'
                },
                usage: {
                    inputTokens: {
                        total: data.usage?.prompt_tokens,
                        noCache: data.usage?.prompt_tokens,
                        cacheRead: undefined,
                        cacheWrite: undefined
                    },
                    outputTokens: {
                        total: data.usage?.completion_tokens,
                        noCache: data.usage?.completion_tokens,
                        cacheRead: undefined,
                        cacheWrite: undefined
                    },
                    total: data.usage?.total_tokens
                },
                warnings: []
            };
        },
        async doStream (opts) {
            const useNative = await detectNativeApi(baseUrl);
            const stream = new ReadableStream({
                async start (controller) {
                    const textId = `ollama-${Date.now()}`;
                    controller.enqueue({
                        type: 'stream-start',
                        warnings: []
                    });
                    controller.enqueue({
                        type: 'text-start',
                        id: textId
                    });
                    try {
                        if (useNative) {
                            // ── Native streaming: NDJSON (one JSON object per line) ──
                            const body = buildNativeBody(opts, true);
                            const res = await fetch(`${baseUrl}/api/chat`, {
                                method: 'POST',
                                headers,
                                body: JSON.stringify(body)
                            });
                            if (!res.ok || !res.body) {
                                const text = await res.text().catch(()=>'');
                                throw new Error(`Ollama /api/chat stream returned ${res.status}: ${text.slice(0, 200)}`);
                            }
                            const reader = res.body.getReader();
                            const decoder = new TextDecoder();
                            let buffer = '';
                            let finishRaw = 'stop';
                            let inputTokens;
                            let outputTokens;
                            const handleLine = (line)=>{
                                line = line.trim();
                                if (!line) return;
                                let chunk;
                                try {
                                    chunk = JSON.parse(line);
                                } catch  {
                                    return; // partial JSON — skip
                                }
                                const delta = chunk.message?.content ?? '';
                                if (delta) {
                                    controller.enqueue({
                                        type: 'text-delta',
                                        id: textId,
                                        delta
                                    });
                                }
                                if (chunk.done) {
                                    if (chunk.done_reason) finishRaw = chunk.done_reason;
                                    inputTokens = chunk.prompt_eval_count;
                                    outputTokens = chunk.eval_count;
                                }
                            };
                            while(true){
                                const { done, value } = await reader.read();
                                if (done) break;
                                buffer += decoder.decode(value, {
                                    stream: true
                                });
                                // NDJSON: split on newlines
                                let nlIdx;
                                while((nlIdx = buffer.indexOf('\n')) !== -1){
                                    const line = buffer.slice(0, nlIdx);
                                    buffer = buffer.slice(nlIdx + 1);
                                    handleLine(line);
                                }
                            }
                            // Flush trailing line
                            if (buffer.trim()) handleLine(buffer);
                            controller.enqueue({
                                type: 'text-end',
                                id: textId
                            });
                            controller.enqueue({
                                type: 'finish',
                                finishReason: {
                                    unified: finishRaw === 'length' ? 'length' : 'stop',
                                    raw: finishRaw
                                },
                                usage: {
                                    inputTokens: {
                                        total: inputTokens,
                                        noCache: inputTokens,
                                        cacheRead: undefined,
                                        cacheWrite: undefined
                                    },
                                    outputTokens: {
                                        total: outputTokens,
                                        noCache: outputTokens,
                                        cacheRead: undefined,
                                        cacheWrite: undefined
                                    },
                                    total: (inputTokens ?? 0) + (outputTokens ?? 0) || undefined
                                }
                            });
                            controller.close();
                            return;
                        }
                        // ── OpenAI-compat streaming: SSE (data: {...}\n\ndata: [DONE]) ──
                        const body = buildOpenAIBody(opts, true);
                        const res = await fetch(compatChatUrl, {
                            method: 'POST',
                            headers,
                            body: JSON.stringify(body)
                        });
                        if (!res.ok || !res.body) {
                            const text = await res.text().catch(()=>'');
                            throw new Error(`Ollama /v1 stream returned ${res.status}: ${text.slice(0, 200)}`);
                        }
                        const reader = res.body.getReader();
                        const decoder = new TextDecoder();
                        let buffer = '';
                        let finishRaw = 'stop';
                        let inputTokens;
                        let outputTokens;
                        let totalTokens;
                        const handleEvent = (data)=>{
                            if (!data || data === '[DONE]') return;
                            let chunk;
                            try {
                                chunk = JSON.parse(data);
                            } catch  {
                                return;
                            }
                            const delta = chunk.choices?.[0]?.delta?.content ?? '';
                            if (delta) {
                                controller.enqueue({
                                    type: 'text-delta',
                                    id: textId,
                                    delta
                                });
                            }
                            if (chunk.choices?.[0]?.finish_reason) {
                                finishRaw = chunk.choices[0].finish_reason;
                            }
                            if (chunk.usage) {
                                inputTokens = chunk.usage.prompt_tokens;
                                outputTokens = chunk.usage.completion_tokens;
                                totalTokens = chunk.usage.total_tokens;
                            }
                        };
                        while(true){
                            const { done, value } = await reader.read();
                            if (done) break;
                            buffer += decoder.decode(value, {
                                stream: true
                            });
                            let sepIdx;
                            while((sepIdx = buffer.indexOf('\n\n')) !== -1){
                                const rawEvent = buffer.slice(0, sepIdx);
                                buffer = buffer.slice(sepIdx + 2);
                                for (const line of rawEvent.split('\n')){
                                    const trimmed = line.trim();
                                    if (trimmed.startsWith('data:')) {
                                        handleEvent(trimmed.slice(5).trim());
                                    }
                                }
                            }
                        }
                        // Flush trailing
                        buffer = buffer.trim();
                        if (buffer) {
                            for (const line of buffer.split('\n')){
                                const trimmed = line.trim();
                                if (trimmed.startsWith('data:')) {
                                    handleEvent(trimmed.slice(5).trim());
                                }
                            }
                        }
                        controller.enqueue({
                            type: 'text-end',
                            id: textId
                        });
                        controller.enqueue({
                            type: 'finish',
                            finishReason: {
                                unified: finishRaw === 'length' ? 'length' : 'stop',
                                raw: finishRaw
                            },
                            usage: {
                                inputTokens: {
                                    total: inputTokens,
                                    noCache: inputTokens,
                                    cacheRead: undefined,
                                    cacheWrite: undefined
                                },
                                outputTokens: {
                                    total: outputTokens,
                                    noCache: outputTokens,
                                    cacheRead: undefined,
                                    cacheWrite: undefined
                                },
                                total: totalTokens
                            }
                        });
                        controller.close();
                    } catch (err) {
                        log.error('Ollama doStream failed:', err);
                        controller.error(err);
                    }
                }
            });
            return {
                stream
            };
        }
    };
}


/***/ })

};
;