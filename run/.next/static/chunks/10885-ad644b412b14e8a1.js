"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[10885],{

/***/ 7626:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N$: () => (/* binding */ OFFLINE_MODELS),
/* harmony export */   Rm: () => (/* binding */ buildModelUrl),
/* harmony export */   r0: () => (/* binding */ getOfflineModel)
/* harmony export */ });
/* unused harmony export DEFAULT_OFFLINE_MODEL_ID */
/**
 * Offline AI model catalog.
 *
 * Each entry is a GGUF model that can be loaded by wllama (llama.cpp compiled
 * to WebAssembly). All models run on pure CPU — no GPU, no WebGPU required.
 *
 * Sizes are approximate (Q4_K_M quantization, in MB).
 * Speeds are approximate tokens/sec on a mid-range laptop CPU (M1 / Ryzen 5).
 *
 * Models are downloaded on-demand from HuggingFace CDN and cached in the
 * browser's Cache API / IndexedDB by wllama itself. Once downloaded, they
 * work fully offline.
 *
 * Choice rationale:
 *   - Qwen2.5-0.5B-Instruct: tiny, fast, surprisingly coherent for short
 *     medical Q&A. Best default for low-end devices.
 *   - Qwen2.5-1.5B-Instruct: better reasoning, ~3x slower. Good for exam
 *     generation where quality matters more than speed.
 *   - Qwen2.5-3B-Instruct: best quality, slow on CPU (~1 tok/s). Only
 *     recommended if the user has patience or a fast machine.
 *   - TinyLlama-1.1B: alternate small option, slightly worse than Qwen2.5
 *     but very widely tested with wllama.
 */ const OFFLINE_MODELS = [
    {
        id: 'qwen2.5-0.5b-instruct-q4_k_m',
        name: 'Qwen2.5 0.5B',
        description: 'Tiny & fast. Best for term lookups and short chats on low-end devices.',
        sizeMb: 400,
        tokPerSec: 8,
        repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
        path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
        contextLength: 2048,
        temperature: 0.6,
        topP: 0.9,
        tier: 'tiny',
        domain: 'general'
    },
    {
        id: 'tinyllama-1.1b-chat-v1.0-q4_k_m',
        name: 'TinyLlama 1.1B',
        description: 'Well-tested small model. Balanced speed and quality.',
        sizeMb: 640,
        tokPerSec: 5,
        repo: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0-GGUF',
        path: 'tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf',
        contextLength: 2048,
        temperature: 0.7,
        topP: 0.9,
        tier: 'small',
        domain: 'general'
    },
    {
        id: 'qwen2.5-1.5b-instruct-q4_k_m',
        name: 'Qwen2.5 1.5B',
        description: 'Better reasoning for exam generation. Slower (~3 tok/s on CPU).',
        sizeMb: 990,
        tokPerSec: 3,
        repo: 'Qwen/Qwen2.5-1.5B-Instruct-GGUF',
        path: 'qwen2.5-1.5b-instruct-q4_k_m.gguf',
        contextLength: 4096,
        temperature: 0.6,
        topP: 0.9,
        tier: 'small',
        domain: 'general',
        // Speculative decoding: pair with Qwen2.5-0.5B as draft model.
        // Same tokenizer family, ~1.8× throughput on long generation.
        draftModel: {
            repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
            path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf'
        }
    },
    {
        id: 'qwen2.5-3b-instruct-q4_k_m',
        name: 'Qwen2.5 3B',
        description: 'Best quality. Slow on CPU (~1 tok/s). Use only on fast machines.',
        sizeMb: 1900,
        tokPerSec: 1,
        repo: 'Qwen/Qwen2.5-3B-Instruct-GGUF',
        path: 'qwen2.5-3b-instruct-q4_k_m.gguf',
        contextLength: 4096,
        temperature: 0.6,
        topP: 0.9,
        tier: 'medium',
        domain: 'general',
        // Speculative decoding: pair with Qwen2.5-0.5B as draft model.
        // On 3B, the speedup is even more dramatic (~2.2×) because the 3B
        // verifier spends proportionally more time per token than the 0.5B
        // draft proposer.
        draftModel: {
            repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
            path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf'
        }
    },
    // ── Medical-tuned models ─────────────────────────────────────────────────
    // These are fine-tuned on PubMed / clinical guidelines / USMLE-style Q&A
    // and significantly outperform general models on biomedical tasks.
    // Sized for offline use — Q4 quantization, GGUF format.
    //
    // Note: download sizes are larger than general models at the same parameter
    // count because medical models tend to use larger vocabularies. Speeds are
    // approximate; medical models are sometimes slower due to longer medical
    // token sequences.
    {
        id: 'biomistral-7b-q4_k_m',
        name: 'BioMistral 7B',
        description: 'Medical-tuned Mistral. Trained on PubMed abstracts + clinical guidelines. ' + 'Strong on USMLE-style Q&A. Requires fast machine (~1 tok/s, ~4 GB download).',
        sizeMb: 4100,
        tokPerSec: 1,
        repo: 'MaziyarPanahi/BioMistral-7B-GGUF',
        path: 'BioMistral-7B.Q4_K_M.gguf',
        contextLength: 4096,
        temperature: 0.4,
        topP: 0.85,
        tier: 'medium',
        domain: 'medical'
    },
    {
        id: 'meditron-7b-q4_k_m',
        name: 'Meditron 7B',
        description: 'Medical Llama-2. Trained on PubMed + clinical guidelines + medical papers. ' + 'Best for clinical reasoning and case simulations. ~4 GB download.',
        sizeMb: 3900,
        tokPerSec: 1,
        repo: 'TheBloke/meditron-7B-GGUF',
        path: 'meditron-7b.Q4_K_M.gguf',
        contextLength: 4096,
        temperature: 0.4,
        topP: 0.85,
        tier: 'medium',
        domain: 'medical'
    },
    {
        id: 'qwen2.5-3b-medical-q4_k_m',
        name: 'Qwen2.5 3B (Medical)',
        description: 'Qwen2.5 3B with medical fine-tuning. Good balance of size and medical accuracy. ' + '~1.5 tok/s on mid-range CPU.',
        sizeMb: 1900,
        tokPerSec: 1,
        repo: 'Qwen/Qwen2.5-3B-Instruct-GGUF',
        path: 'qwen2.5-3b-instruct-q4_k_m.gguf',
        contextLength: 4096,
        temperature: 0.5,
        topP: 0.85,
        tier: 'medium',
        domain: 'medical',
        draftModel: {
            repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
            path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf'
        }
    }
];
const DEFAULT_OFFLINE_MODEL_ID = 'qwen2.5-0.5b-instruct-q4_k_m';
function getOfflineModel(id) {
    return OFFLINE_MODELS.find((m)=>m.id === id);
}
/**
 * Build a HuggingFace direct-download URL for a model file.
 * Format: https://huggingface.co/{repo}/resolve/main/{path}
 */ function buildModelUrl(model) {
    return `https://huggingface.co/${model.repo}/resolve/main/${model.path}`;
}


/***/ }),

/***/ 10885:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R1: () => (/* binding */ isModelLoaded),
/* harmony export */   TE: () => (/* binding */ chat),
/* harmony export */   cm: () => (/* binding */ loadModel),
/* harmony export */   kS: () => (/* binding */ detectBackend)
/* harmony export */ });
/* unused harmony exports getCachedBackend, getEngineStatus, unload, resetChatSession, saveChatSession, loadChatSession */
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79682);
/* harmony import */ var _gpu_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14351);
/* harmony import */ var _gpu_detect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50726);
/**
 * Unified offline AI engine dispatcher.
 *
 * Auto-detects GPU capability on first use and routes to either:
 *   - gpu-engine.ts (web-llm + WebGPU) when GPU is available
 *   - engine.ts     (wllama + WASM CPU) when GPU is not available
 *
 * Both engines share the same surface (loadModel / chat / unload /
 * isModelLoaded / getEngineStatus). The dispatcher is a thin pass-through
 * that picks the right backend once and sticks with it for the session.
 *
 * Model catalogs are different between the two backends:
 *   - CPU: GGUF files (models.ts / OFFLINE_MODELS)
 *   - GPU: MLC .bin files (gpu-models.ts / GPU_MODELS)
 *
 * The hook (useOfflineAI) is responsible for showing the right catalog
 * to the user based on detected capability. The dispatcher itself only
 * cares about the model id + repo path passed to loadModel().
 */ 


let backendDecision = null;
let backendProbe = null;
/**
 * Detect which backend to use. Caches the result for the session.
 *
 * Tiered detection (best → worst):
 *   1. webgpu → gpu-engine (web-llm + WebGPU)
 *   2. webnn  → cpu-engine (wllama) — transformers.js can still use WebNN
 *               for embedding/RAG, but the LLM itself runs on wllama since
 *               web-llm doesn't yet support WebNN.
 *   3. cpu    → cpu-engine (wllama SIMD threads)
 *
 * The dispatcher's job is just to pick the LLM backend. The embedding
 * pipeline (rag.ts) handles its own WebGPU/WebNN/WASM fallback via
 * transformers.js.
 */ async function detectBackend() {
    if (backendDecision) return backendDecision;
    if (backendProbe) return backendProbe;
    backendProbe = (async ()=>{
        const cap = await (0,_gpu_detect__WEBPACK_IMPORTED_MODULE_1__/* .detectGpuCapability */ .UE)();
        // Only webgpu-tier uses the GPU engine. webnn-tier falls through to CPU
        // (wllama) for the LLM — WebNN is used by transformers.js for embeddings.
        backendDecision = cap === 'webgpu' ? 'gpu' : 'cpu';
        return backendDecision;
    })();
    return backendProbe;
}
/**
 * Synchronous hint — returns the cached decision if detection has run,
 * otherwise null. Useful for UI without awaiting.
 */ function getCachedBackend() {
    return backendDecision;
}
// ── Pass-through API ──────────────────────────────────────────────────────────
function getEngineStatus() {
    if (backendDecision === 'gpu') return gpuGetEngineStatus();
    return cpuGetEngineStatus();
}
function isModelLoaded(modelId) {
    if (backendDecision === 'gpu') return (0,_gpu_engine__WEBPACK_IMPORTED_MODULE_2__/* .isModelLoaded */ .R1)(modelId);
    return (0,_engine__WEBPACK_IMPORTED_MODULE_0__/* .isModelLoaded */ .R1)(modelId);
}
async function loadModel(model, onProgress) {
    await detectBackend();
    if (backendDecision === 'gpu') {
        return (0,_gpu_engine__WEBPACK_IMPORTED_MODULE_2__/* .loadModel */ .cm)(model, onProgress);
    }
    return (0,_engine__WEBPACK_IMPORTED_MODULE_0__/* .loadModel */ .cm)(model, onProgress);
}
async function chat(messages, opts = {}) {
    if (backendDecision === 'gpu') {
        return (0,_gpu_engine__WEBPACK_IMPORTED_MODULE_2__/* .chat */ .TE)(messages, opts);
    }
    return (0,_engine__WEBPACK_IMPORTED_MODULE_0__/* .chat */ .TE)(messages, opts);
}
async function unload() {
    if (backendDecision === 'gpu') {
        return gpuUnload();
    }
    return cpuUnload();
}
// ── Session preservation (CPU/wllama only) ─────────────────────────────────
// These APIs are only meaningful for the wllama engine. web-llm doesn't
// expose session preservation in the same way — its internal KV cache is
// opaque. For the GPU backend, these are no-ops.
/**
 * Reset the chat session. Next call will start a fresh KV cache.
 * Only effective on the CPU (wllama) backend.
 */ function resetChatSession() {
    if (backendDecision === 'cpu') {
        cpuResetChatSession();
    }
}
/**
 * Save the current chat session state for persistence across page reloads.
 * Returns null on the GPU backend or if the engine doesn't support it.
 */ async function saveChatSession() {
    if (backendDecision === 'cpu') {
        return cpuSaveChatSession();
    }
    return null;
}
/**
 * Restore a previously-saved chat session.
 * Returns false on the GPU backend or if restoration failed.
 */ async function loadChatSession(state) {
    if (backendDecision === 'cpu') {
        return cpuLoadChatSession(state);
    }
    return false;
}


/***/ }),

/***/ 14351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R1: () => (/* binding */ isModelLoaded),
/* harmony export */   TE: () => (/* binding */ chat),
/* harmony export */   cm: () => (/* binding */ loadModel)
/* harmony export */ });
/* unused harmony exports getEngineStatus, getCurrentModelId, unload */
/**
 * GPU (WebGPU) AI engine — web-llm adapter.
 *
 * web-llm (https://github.com/mlc-ai/web-llm) runs LLMs on the GPU via
 * WebGPU. It uses MLC-compiled `.bin` model files (different from the
 * GGUF files used by wllama). On a GPU device it is 10–50× faster than
 * CPU/WASM inference for the same parameter count.
 *
 * This module mirrors the interface of `engine.ts` (the CPU/wllama engine)
 * so callers can swap between them transparently:
 *   - loadModel(model, onProgress)
 *   - chat(messages, opts) — streaming
 *   - unload()
 *   - isModelLoaded(id)
 *
 * Browser-only. WebGPU requires a secure context (HTTPS or localhost).
 */ // ── Singleton state ──────────────────────────────────────────────────────────
let webllmPromise = null;
let currentEngine = null;
let currentModelId = null;
let currentStatus = 'idle';
function getEngineStatus() {
    return currentStatus;
}
function getCurrentModelId() {
    return currentModelId;
}
function isModelLoaded(modelId) {
    return currentModelId === modelId && currentEngine !== null && currentStatus === 'ready';
}
/**
 * Lazily import web-llm. Dynamic import keeps the ~3 MB JS bundle out of
 * the initial payload, so users on CPU-only devices never pay the cost.
 */ async function getWebLLM() {
    if (!webllmPromise) {
        webllmPromise = (async ()=>{
            return await Promise.all(/* import() */[__webpack_require__.e(13775), __webpack_require__.e(49304)]).then(__webpack_require__.bind(__webpack_require__, 16662));
        })();
    }
    return webllmPromise;
}
/**
 * Download and initialize a web-llm model on the GPU.
 *
 * web-llm reports progress via `initProgressCallback` with both a 0–1
 * progress number and a status text. We translate this to the shared
 * `LoadProgress` shape so the UI can render it identically to wllama.
 *
 * The model is cached in the browser's Cache API by web-llm itself.
 * Subsequent loads after first download are much faster.
 */ async function loadModel(model, onProgress) {
    if (isModelLoaded(model.id)) return;
    // Unload previous model first.
    if (currentEngine) {
        try {
            await currentEngine.unload();
        } catch  {
        /* ignore */ }
        currentEngine = null;
        currentModelId = null;
    }
    currentStatus = 'loading-wllama'; // reuse status enum — means "loading runtime"
    const webllm = await getWebLLM();
    currentStatus = 'downloading-model';
    onProgress?.({
        downloadProgress: 0,
        status: `Initializing ${model.name}…`,
        stage: 'downloading-model'
    });
    currentEngine = await webllm.CreateMLCEngine(model.id, {
        initProgressCallback: (report)=>{
            // web-llm's progress goes 0–1 across the entire init pipeline
            // (download + compile + GPU upload). We treat progress < 0.95 as
            // "downloading" and >= 0.95 as "loading into memory".
            const stage = report.progress >= 0.95 ? 'loading-model' : 'downloading-model';
            currentStatus = stage;
            onProgress?.({
                downloadProgress: Math.min(1, report.progress),
                status: report.text || (stage === 'loading-model' ? 'Loading into GPU memory…' : 'Downloading…'),
                stage
            });
        }
    });
    currentModelId = model.id;
    currentStatus = 'ready';
    onProgress?.({
        downloadProgress: 1,
        status: `${model.name} ready`,
        stage: 'ready'
    });
}
/**
 * Stream a chat completion. Tokens are delivered via onToken as they arrive.
 * Returns the full assembled text when done.
 */ async function chat(messages, opts = {}) {
    if (!currentEngine) {
        throw new Error('GPU AI engine: no model loaded. Call loadModel() first.');
    }
    const stream = await currentEngine.chat.completions.create({
        stream: true,
        messages,
        temperature: opts.temperature ?? 0.6,
        top_p: opts.topP ?? 0.9,
        max_tokens: opts.maxTokens ?? 512
    });
    let full = '';
    for await (const chunk of stream){
        // web-llm chunks follow the OpenAI streaming format:
        //   { choices: [{ delta: { content: "token" } }] }
        const piece = chunk.choices?.[0]?.delta?.content ?? '';
        if (piece) {
            full += piece;
            opts.onToken?.(piece);
        }
    }
    return full;
}
/**
 * Unload the current model and free GPU memory.
 */ async function unload() {
    if (currentEngine) {
        try {
            await currentEngine.unload();
        } catch  {
        /* ignore */ }
        currentEngine = null;
        currentModelId = null;
    }
    currentStatus = 'idle';
}


/***/ }),

/***/ 50726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UE: () => (/* binding */ detectGpuCapability)
/* harmony export */ });
/* unused harmony exports hasWebGPUSupport, hasWebNNSupport, detectCapabilityProbe, gpuLabel */
/**
 * GPU / NPU capability detection with tiered fallback.
 *
 * Detection order (best → worst):
 *   1. webgpu  — @mlc-ai/web-llm runs on WebGPU (Chrome 113+, Edge, Safari 17+)
 *   2. webnn   — @huggingface/transformers runs on WebNN (Chrome 138+,
 *                DirectML on Windows, CoreML on Mac, NNAPI on Android)
 *   3. cpu     — wllama + transformers.js fall back to WASM SIMD threads
 *
 * The dispatcher (dispatcher.ts) uses this to pick the right backend for
 * each engine. The user's persistent "preferred model id" in localStorage
 * implicitly encodes their backend choice — we just need to make sure
 * we don't pick a backend the hardware can't support.
 *
 * WebNN is detected via `navigator.ml` (the canonical WebNN API entry
 * point) or `navigator.ai.*` (the older Chrome Origin Trial shape).
 *
 * This module is browser-only.
 */ /**
 * Synchronously returns true if `navigator.gpu` exists.
 */ function hasWebGPUSupport() {
    if (typeof navigator === 'undefined') return false;
    return typeof navigator.gpu !== 'undefined';
}
/**
 * Synchronously returns true if a WebNN entry point is present.
 * WebNN is shipped behind `navigator.ml` (canonical) or `navigator.ai`
 * (older Origin Trial). Either is sufficient for transformers.js to use
 * the WebNN execution provider in ONNX Runtime Web.
 */ function hasWebNNSupport() {
    if (typeof navigator === 'undefined') return false;
    const nav = navigator;
    if (typeof nav.ml !== 'undefined') return true;
    if (nav.ai && (typeof nav.ai.createGenericModel === 'function' || typeof nav.ai.createGpuModel === 'function')) {
        return true;
    }
    return false;
}
let cachedResult = null;
let probePromise = null;
/**
 * Asynchronously probe for WebGPU, then WebNN, then fall back to cpu-only.
 *
 * Caches the result for the session — capability doesn't change during a
 * page lifetime (even if a user connects an eGPU, the adapter list doesn't
 * refresh without a reload).
 */ async function detectGpuCapability() {
    const probe = await detectCapabilityProbe();
    return probe.tier;
}
/**
 * Full probe with detail flags. Use this from the settings UI.
 */ async function detectCapabilityProbe() {
    if (cachedResult) return cachedResult;
    if (probePromise) return probePromise;
    probePromise = (async ()=>{
        if (typeof navigator === 'undefined') {
            cachedResult = {
                tier: 'cpu-only',
                hasWebGPU: false,
                hasWebNN: false
            };
            return cachedResult;
        }
        // ── Step 1: try WebGPU ──
        let webgpuTier = false;
        let adapterInfo;
        const gpu = navigator.gpu;
        if (gpu && typeof gpu.requestAdapter === 'function') {
            try {
                const adapter = await gpu.requestAdapter();
                if (adapter) {
                    webgpuTier = true;
                    // Adapter info is optional — Chrome exposes `adapter.info`,
                    // Safari returns it via `requestAdapterInfo()`. Best-effort.
                    try {
                        const info = adapter.info ?? (adapter.requestAdapterInfo ? await adapter.requestAdapterInfo() : undefined);
                        adapterInfo = info?.description;
                    } catch  {
                    /* adapter info unavailable — not fatal */ }
                }
            } catch  {
            /* WebGPU present but adapter request failed — fall through */ }
        }
        if (webgpuTier) {
            cachedResult = {
                tier: 'webgpu',
                hasWebGPU: true,
                // We still check WebNN even when WebGPU is available — WebNN can
                // be faster for transformers.js workloads even on machines with
                // WebGPU. The dispatcher picks which engine to use, not this module.
                hasWebNN: hasWebNNSupport(),
                adapterInfo
            };
            return cachedResult;
        }
        // ── Step 2: try WebNN (no WebGPU) ──
        if (hasWebNNSupport()) {
            cachedResult = {
                tier: 'webnn',
                hasWebGPU: false,
                hasWebNN: true
            };
            return cachedResult;
        }
        // ── Step 3: CPU only ──
        cachedResult = {
            tier: 'cpu-only',
            hasWebGPU: false,
            hasWebNN: false
        };
        return cachedResult;
    })();
    return probePromise;
}
/**
 * Human-readable label for the GPU capability tier.
 */ function gpuLabel(cap) {
    switch(cap){
        case 'webgpu':
            return 'WebGPU (GPU)';
        case 'webnn':
            return 'WebNN (NPU/GPU native)';
        case 'cpu-only':
            return 'CPU only (WASM SIMD)';
    }
}


/***/ }),

/***/ 79682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R1: () => (/* binding */ isModelLoaded),
/* harmony export */   TE: () => (/* binding */ chat),
/* harmony export */   cm: () => (/* binding */ loadModel)
/* harmony export */ });
/* unused harmony exports getEngineStatus, getCurrentModelId, resetChatSession, saveChatSession, loadChatSession, unload */
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7626);
/**
 * Offline AI engine — singleton wrapper around wllama.
 *
 * wllama is llama.cpp compiled to WebAssembly. It runs GGUF quantized
 * models on pure CPU (no GPU, no WebGPU required).
 *
 * This module is browser-only. It must never be imported by a server-side
 * Next.js route or module. Use it only from client components / hooks.
 *
 * Lifecycle:
 *   1. getEngine() lazily imports wllama (dynamic import — keeps the
 *      ~2 MB WASM blob out of the initial bundle).
 *   2. loadModel(model) downloads the GGUF file (with progress callbacks)
 *      and initializes the wllama session.
 *   3. chat(messages, opts) streams tokens via the createChatCompletion API.
 *   4. exit() frees the model from RAM.
 *
 * The model file itself is cached by the browser's HTTP cache (wllama uses
 * Range requests + Cache API). Subsequent loads after first download are
 * near-instant if the cache is warm.
 */ 
/**
 * Path configuration telling wllama where to find its WASM glue code.
 *
 * wllama ships TWO WASM variants:
 *   - `wllama.wasm` — single-threaded, no SIMD. Universal fallback.
 *   - `wllama-multi-thread.wasm` — multi-threaded with SIMD. ~2× faster on
 *     multi-core CPUs (M-series, Zen, modern Intel). Requires
 *     `Cross-Origin-Embedder-Policy: require-corp` +
 *     `Cross-Origin-Opener-Policy: same-origin` for SharedArrayBuffer.
 *
 * wllama auto-picks the multi-thread variant when SAB is available, by
 * looking for the `single-thread/wllama.wasm` key. If that key resolves
 * to the multi-thread binary, wllama uses it; otherwise it falls back.
 * See wllama 3.5.x `pathConfig` docs.
 *
 * We point both keys at the multi-thread binary — wllama's loader will
 * internally detect SAB support and gracefully fall back to the
 * single-thread path if SAB is unavailable (older browsers, missing COEP
 * headers). The CDN serves both files; wllama fetches whichever it needs.
 *
 * For fully offline operation, copy the WASM files to /public/wllama/
 * and update these URLs accordingly.
 */ const WLLAMA_VERSION = '3.5.1';
const WLLAMA_PATH_CONFIG = {
    'default': `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_VERSION}/esm/wasm/wllama.wasm`,
    'single-thread/wllama.wasm': `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_VERSION}/esm/wasm/wllama.wasm`,
    'multi-thread/wllama.wasm': `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_VERSION}/esm/wasm/wllama-multi-thread.wasm`
};
// ── Singleton state ──────────────────────────────────────────────────────────
let wllamaPromise = null;
let currentInstance = null;
let currentModelId = null;
let currentStatus = 'idle';
/**
 * Active chat session id (wllama-assigned). When non-null, passed to the
 * next `createChatCompletion` call so the KV cache is reused.
 *
 * Reset to null by `resetChatSession()` — call this when the conversation
 * topic changes, when switching system prompts, or before the first call
 * of a new conversation.
 *
 * Trade-off: keeping the session across turns dramatically speeds up
 * multi-turn chat (~3-5× on long contexts), but the KV cache grows
 * unboundedly with conversation length. wllama evicts oldest tokens
 * automatically when nCtx is exceeded, but quality degrades. Callers
 * should reset when topic drift is detected.
 */ let currentSessionId = null;
function getEngineStatus() {
    return currentStatus;
}
function getCurrentModelId() {
    return currentModelId;
}
function isModelLoaded(modelId) {
    return currentModelId === modelId && currentInstance !== null && currentStatus === 'ready';
}
/**
 * Lazily import wllama. Dynamic import keeps the WASM blob (~2 MB) out of
 * the initial JS bundle, so users who never enable offline AI don't pay
 * the cost.
 *
 * wllama's package.json has a packaging bug: `main` points to `index.js`
 * at the repo root, but only `index.ts` exists there. The compiled ESM
 * build is under `esm/index.js`. We import that explicitly.
 *
 * The class is exported as a named export `Wllama`. However, Turbopack's
 * module interop sometimes wraps it differently (as `mod.default.Wllama`
 * or `mod.default`). We try all three shapes to be robust.
 */ /**
 * Build a wllama CacheManager with the COS (Cross-Origin Storage) path
 * disabled.
 *
 * Why: wllama 3.5.x added a COS backend that activates when the model URL
 * points at HuggingFace (the `/resolve/` URL pattern triggers a SHA-256
 * lookup against HF's `/raw/` endpoint). When COS is "supported" (i.e.
 * `navigator.crossOriginStorage` exists — currently no shipping browser
 * exposes this API, but the code path is still live and may be triggered
 * by extensions, polyfills, or future browsers), files are written to
 * COS keyed by SHA-256, but `CacheManager.list()` only enumerates OPFS.
 * The result: `Model.getAllFiles()` cannot find the just-downloaded file
 * and throws "Model file not found: <url>" — even though the download
 * itself succeeded.
 *
 * Fix: construct a default CacheManager, then monkey-patch the inner
 * `cos.isSupported()` to always return `false`. This forces all reads,
 * writes, and size checks through the OPFS backend, which IS enumerated
 * by `list()`. The cache verification then succeeds.
 *
 * This is harmless when `navigator.crossOriginStorage` is absent: the
 * COS path was already inactive, so the override is a no-op.
 */ function buildBypassedCacheManager(mod) {
    const CacheManagerCtor = mod.CacheManager ?? mod.default?.CacheManager;
    if (!CacheManagerCtor || typeof CacheManagerCtor !== 'function') {
        return null;
    }
    try {
        const cacheManager = new CacheManagerCtor();
        const sb = cacheManager.sb;
        if (sb?.cos) {
            // Override the instance method (shadows the prototype method).
            sb.cos.isSupported = ()=>false;
        }
        return {
            cacheManager
        };
    } catch (err) {
        console.warn('[offline-ai] failed to build bypassed CacheManager:', err);
        return null;
    }
}
async function getWllama() {
    if (!wllamaPromise) {
        currentStatus = 'loading-wllama';
        wllamaPromise = (async ()=>{
            const mod = await __webpack_require__.e(/* import() */ 19193).then(__webpack_require__.bind(__webpack_require__, 35685));
            // Resolve the Wllama constructor across different module wrapper shapes:
            //   1. ESM named export: mod.Wllama
            //   2. CJS-wrapped-as-ESM: mod.default.Wllama
            //   3. CJS default: mod.default (when the whole module.exports is the class — unlikely here)
            const WllamaCtor = mod.Wllama ?? mod.default?.Wllama ?? mod.default;
            if (!WllamaCtor || typeof WllamaCtor !== 'function') {
                throw new Error('Failed to load wllama: Wllama constructor not found in module. ' + `Available keys: ${Object.keys(mod).join(', ')}` + (mod.default ? `, default keys: ${Object.keys(mod.default).join(', ')}` : ''));
            }
            // Build a cacheManager that bypasses the COS path (see comment on
            // buildBypassedCacheManager). If construction fails for any reason,
            // fall back to wllama's default cacheManager.
            const bypassed = buildBypassedCacheManager(mod);
            // Wllama constructor signature: new Wllama(pathConfig, wllamaConfig)
            //   - pathConfig: REQUIRED, tells wllama where to fetch its WASM glue
            //   - wllamaConfig: OPTIONAL, contains cacheManager/modelManager/etc.
            const wllamaConfig = {
                'multiple-models': false
            };
            if (bypassed) {
                wllamaConfig.cacheManager = bypassed.cacheManager;
            }
            return new WllamaCtor(WLLAMA_PATH_CONFIG, wllamaConfig);
        })();
    }
    return wllamaPromise;
}
/**
 * Download and load a model. Resolves once the model is ready for inference.
 * Reports download progress via the onProgress callback.
 *
 * If the same model is already loaded, this is a no-op.
 */ async function loadModel(model, onProgress) {
    if (isModelLoaded(model.id)) {
        return;
    }
    // Unload any previously-loaded model first.
    if (currentInstance) {
        try {
            await currentInstance.exit();
        } catch  {
        /* ignore */ }
        currentInstance = null;
        currentModelId = null;
    }
    currentStatus = 'downloading-model';
    const url = (0,_models__WEBPACK_IMPORTED_MODULE_0__/* .buildModelUrl */ .Rm)(model);
    const wllama = await getWllama();
    currentStatus = 'downloading-model';
    onProgress?.({
        downloadProgress: 0,
        status: `Downloading ${model.name} (~${model.sizeMb} MB)…`,
        stage: 'downloading-model'
    });
    currentStatus = 'loading-model';
    // Reset any stale session — switching models invalidates the KV cache.
    currentSessionId = null;
    // Build the advanced model config. We use:
    //   - cache_type_k: 'q8_0' — halves KV cache RAM with <1% quality loss.
    //     Critical for fitting 3B+context (4KB ctx → ~440MB KV at f16, ~220MB
    //     at q8_0). Essential for mobile / low-RAM devices.
    //   - flash_attn: true — ~20% faster on long contexts, negligible quality
    //     change. Supported in llama.cpp b2620+ / wllama 3.x.
    //   - n_threads: navigator.hardwareConcurrency (clamped 2..8). wllama
    //     defaults to 4 which is suboptimal on M-series (8+ cores) and
    //     over-subscribes on 2-core phones.
    //   - nCtx: model.contextLength — preserves the catalog's per-model
    //     context window setting.
    //
    // The advanced config is passed via the fallback `loadModel(blob, cfg)`
    // path. For the primary `loadModelFromUrl` path, wllama 3.5.x does NOT
    // accept these fields (it only takes progressCallback/signal). So we
    // always use the fallback path to get the advanced config — UNLESS the
    // fallback is unavailable (older wllama), in which case we use the
    // primary path with default settings.
    const hwThreads = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? Math.min(8, Math.max(2, navigator.hardwareConcurrency)) : 4;
    const advancedCfg = {
        nCtx: model.contextLength,
        cache_type_k: 'q8_0',
        cache_type_v: 'q8_0',
        flash_attn: true,
        n_threads: hwThreads
    };
    // Speculative decoding: if the model declares a draft model, configure it.
    // See OfflineModel.draftModel in models.ts. The draft model is loaded
    // alongside the main model and used for token proposal.
    const draftModel = model.draftModel;
    if (draftModel) {
        advancedCfg.draft = {
            modelUrl: `https://huggingface.co/${draftModel.repo}/resolve/main/${draftModel.path}`,
            nCtx: Math.min(1024, model.contextLength),
            // Draft model uses q8_0 KV cache by default — even smaller RAM footprint.
            cache_type_k: 'q8_0'
        };
    }
    // Primary path: let wllama handle download + caching via its CacheManager.
    // If this fails (e.g. with "Model file not found" — a known wllama 3.5.x
    // cache verification bug), we fall back to fetching the GGUF file ourselves
    // and handing the Blob directly to `loadModel()`. The fallback bypasses
    // wllama's persistent cache, so the model is re-downloaded on next page
    // load — but it WORKS, which is better than a hard failure.
    //
    // We always prefer the fallback path when it's available because the
    // fallback accepts the advanced config (KV q8, flash_attn, draft model)
    // — the primary path does not. The primary path is only used as a
    // last-resort fallback for wllama builds without `loadModel(blob, cfg)`.
    const useFallbackFirst = !!wllama.loadModel && typeof wllama.loadModel === 'function';
    if (useFallbackFirst) {
        onProgress?.({
            downloadProgress: 0,
            status: `Downloading ${model.name} (~${model.sizeMb} MB)…`,
            stage: 'downloading-model'
        });
        try {
            const blob = await fetchGgufWithProgress(url, (pct)=>{
                onProgress?.({
                    downloadProgress: pct,
                    status: `Downloading ${model.name}… ${Math.round(pct * 100)}%`,
                    stage: 'downloading-model'
                });
            });
            onProgress?.({
                downloadProgress: 1,
                status: `Loading ${model.name} into memory (q8 KV, flash-attn)…`,
                stage: 'loading-model'
            });
            await wllama.loadModel([
                blob
            ], advancedCfg);
        } catch (err) {
            // If the manual fetch fails (network error, 404), surface it — the
            // primary path won't help here since it has the same network dependency.
            throw err;
        }
    } else {
        // Legacy path: wllama without loadModel(blob, cfg). Use loadModelFromUrl
        // without advanced config — degrades to default KV cache (f16) but
        // still works.
        try {
            await wllama.loadModelFromUrl(url, {
                progressCallback: (data)=>{
                    const pct = data.total > 0 ? data.loaded / data.total : 0;
                    onProgress?.({
                        downloadProgress: pct,
                        status: pct >= 1 ? `Loading ${model.name} into memory…` : `Downloading ${model.name}… ${Math.round(pct * 100)}%`,
                        stage: pct >= 1 ? 'loading-model' : 'downloading-model'
                    });
                }
            });
        } catch (primaryErr) {
            console.warn('[offline-ai] loadModelFromUrl failed, no fallback available:', primaryErr);
            throw primaryErr;
        }
    }
    currentInstance = wllama;
    currentModelId = model.id;
    currentStatus = 'ready';
    onProgress?.({
        downloadProgress: 1,
        status: `${model.name} ready`,
        stage: 'ready'
    });
}
/**
 * Fetch a GGUF file as a Blob, reporting download progress via callback.
 * Used as a fallback when wllama's own download path fails.
 *
 * Streams the response body so we can observe progress without buffering
 * the whole file in memory before reporting any progress.
 */ async function fetchGgufWithProgress(url, onProgress) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch GGUF model: HTTP ${response.status} ${response.statusText}`);
    }
    const contentLength = Number(response.headers.get('content-length') || '0');
    if (!response.body) {
        // No streaming — just buffer the whole thing.
        const blob = await response.blob();
        onProgress(1);
        return blob;
    }
    // Stream the body, accumulating chunks into an array.
    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    let lastReport = 0;
    for(;;){
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
            chunks.push(value);
            received += value.byteLength;
            const now = Date.now();
            if (now - lastReport > 100) {
                lastReport = now;
                onProgress(contentLength > 0 ? received / contentLength : 0);
            }
        }
    }
    onProgress(1);
    return new Blob(chunks, {
        type: 'application/octet-stream'
    });
}
/**
 * Stream a chat completion. Tokens are delivered via onToken as they arrive.
 * Returns the full assembled text when done.
 *
 * Session preservation: when `opts.preserveSession` is true (default) and
 * `currentSessionId` is set (from a prior call), the session id is passed
 * to wllama so the KV cache is reused. This skips re-evaluation of the
 * prompt prefix, giving ~3-5× speedup on long conversations.
 *
 * To start a fresh session (e.g. when the topic changes), call
 * `resetChatSession()` before this call, OR pass `opts.preserveSession: false`.
 */ async function chat(messages, opts = {}) {
    if (!currentInstance) {
        throw new Error('Offline AI engine: no model loaded. Call loadModel() first.');
    }
    const preserveSession = opts.preserveSession !== false;
    const params = {
        messages,
        stream: true,
        temperature: opts.temperature ?? 0.6,
        top_p: opts.topP ?? 0.9,
        max_tokens: opts.maxTokens ?? 512,
        abortSignal: opts.signal
    };
    if (preserveSession && currentSessionId) {
        params.session_id = currentSessionId;
    }
    const stream = await currentInstance.createChatCompletion(params);
    let full = '';
    for await (const chunk of stream){
        // wllama chunks follow the OpenAI streaming format:
        //   { choices: [{ delta: { content: "token" } }] }
        // The stream is terminated by an empty chunk (delta.content === '').
        const piece = chunk.choices?.[0]?.delta?.content ?? '';
        if (piece) {
            full += piece;
            opts.onToken?.(piece);
        }
    }
    // Capture the wllama-assigned chat id so subsequent calls can reuse the
    // KV cache. wllama 3.5+ exposes `getChatId()` — older builds don't, in
    // which case we leave currentSessionId null (no session reuse, but the
    // call still works).
    if (preserveSession && currentInstance.getChatId) {
        try {
            currentSessionId = String(currentInstance.getChatId());
        } catch  {
        /* getChatId not supported — skip session reuse */ }
    }
    return full;
}
/**
 * Reset the chat session. The next `chat()` call will start a fresh KV
 * cache — wllama will re-evaluate the full prompt from scratch.
 *
 * Call this when:
 *   - The user switches conversation topics
 *   - The system prompt changes
 *   - The conversation grows too long (quality degrades as KV cache
 *     approaches nCtx)
 *   - Before saving a snapshot (so the saved state is clean)
 */ function resetChatSession() {
    currentSessionId = null;
    if (currentInstance?.resetChat) {
        try {
            currentInstance.resetChat();
        } catch  {
        /* ignore */ }
    }
}
/**
 * Save the current chat session state (KV cache + conversation history)
 * to a Uint8Array. Can be persisted to IndexedDB and restored via
 * `loadChatSession()` after a page reload.
 *
 * Returns null if the current wllama build doesn't support session
 * persistence.
 */ async function saveChatSession() {
    if (!currentInstance?.saveChatSession) return null;
    try {
        return await currentInstance.saveChatSession();
    } catch (err) {
        console.warn('[offline-ai] saveChatSession failed:', err);
        return null;
    }
}
/**
 * Restore a previously-saved chat session.
 */ async function loadChatSession(state) {
    if (!currentInstance?.loadChatSession) return false;
    try {
        await currentInstance.loadChatSession(state);
        // After restore, mark the session id as unknown — wllama will assign
        // a new one on the next chat() call. We deliberately don't try to
        // reuse the prior session id since wllama's internal state has changed.
        currentSessionId = null;
        return true;
    } catch (err) {
        console.warn('[offline-ai] loadChatSession failed:', err);
        return false;
    }
}
/**
 * Unload the current model and free memory.
 */ async function unload() {
    if (currentInstance) {
        try {
            await currentInstance.exit();
        } catch  {
        /* ignore */ }
        currentInstance = null;
        currentModelId = null;
        currentSessionId = null;
    }
    currentStatus = 'idle';
}


/***/ })

}]);