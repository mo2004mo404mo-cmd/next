"use strict";
exports.id = 7396;
exports.ids = [7396];
exports.modules = {

/***/ 377396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autoDetectDefaultModel: () => (/* binding */ autoDetectDefaultModel)
/* harmony export */ });
/* unused harmony export clearAutoDetectCache */
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(154368);
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


/***/ })

};
;