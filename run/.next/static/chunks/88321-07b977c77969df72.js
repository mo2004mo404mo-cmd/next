"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[53710,88321],{

/***/ 53710:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearAll: () => (/* binding */ clearAll),
/* harmony export */   countChunks: () => (/* binding */ countChunks),
/* harmony export */   i1: () => (/* binding */ wireIdleWarmup),
/* harmony export */   indexChunks: () => (/* binding */ indexChunks),
/* harmony export */   qO: () => (/* binding */ retrieveContext)
/* harmony export */ });
/* unused harmony exports warmupEmbedder, embedText, embedBatch, putChunks, deleteChunk, deleteSource, search, buildRAGMessages, indexDocument */
/**
 * Offline embedding pipeline + vector store for Retrieval-Augmented Generation.
 *
 * Uses @huggingface/transformers (the maintained successor to @xenova/transformers)
 * to run all-MiniLM-L6-v2 (~23 MB ONNX) in-browser via ONNX Runtime Web, with
 * automatic WebGPU → WebNN → WASM fallback handled by transformers.js.
 *
 * Embeddings are stored in IndexedDB via a tiny hand-rolled vector store
 * (cosine similarity over Float32Arrays). This keeps the implementation
 * dependency-free — no need for vectra/hnswlib-wasm — and is fast enough
 * for ~10k chunks (linear scan at ~0.1ms per chunk on M1).
 *
 * For larger corpora (>50k chunks), consider swapping the in-house store
 * for hnswlib-wasm or vectra. The `VectorStore` interface below is the
 * only contract that would need to be re-implemented.
 *
 * Browser-only.
 */ // ── Embedding pipeline ──────────────────────────────────────────────────────
const EMBEDDING_MODEL_ID = 'Xenova/all-MiniLM-L6-v2';
const EMBEDDING_DIM = 384;
let pipelinePromise = null;
let warmupPromise = null;
/**
 * Lazily import @huggingface/transformers and build the feature-extraction
 * pipeline. Dynamic import keeps the ONNX runtime (~5 MB) out of the
 * initial bundle. The pipeline itself is cached for the session.
 *
 * The pipeline is configured with:
 *   - dtype: 'fp32' — fp16 sometimes fails on Windows WebGL; q8 quantized
 *     embeddings lose ~3-5% retrieval quality for a 60% size reduction.
 *     Pick fp32 for safety; advanced users can override via env.
 *   - device: auto — transformers.js probes WebGPU → WebNN → WASM in order
 *     and picks the first that works. No manual tier logic needed here.
 */ async function getExtractor() {
    if (!pipelinePromise) {
        pipelinePromise = (async ()=>{
            const mod = await Promise.all(/* import() */[__webpack_require__.e(54803), __webpack_require__.e(37954)]).then(__webpack_require__.bind(__webpack_require__, 49868));
            if (!mod.pipeline) {
                throw new Error('transformers.js: pipeline() not exported');
            }
            // Allow loading from HF Hub (default) but also use the browser cache
            // so we don't re-download the 23MB model on every session.
            if (mod.env) {
                mod.env.allowLocalModels = false;
                mod.env.useBrowserCache = true;
            }
            return mod.pipeline('feature-extraction', EMBEDDING_MODEL_ID, {
                dtype: 'fp32'
            });
        })();
    }
    return pipelinePromise;
}
/**
 * Pre-compile the ONNX model + load weights into memory so the first
 * embedding call has no 5-8s cold start. Safe to call multiple times.
 *
 * Wire this into `requestIdleCallback` on app boot — see wireIdleWarmup().
 */ async function warmupEmbedder() {
    if (warmupPromise) return warmupPromise;
    warmupPromise = (async ()=>{
        try {
            const extractor = await getExtractor();
            // Run a trivial embedding to force model load + WASM/ WebGPU init.
            await extractor([
                'warmup'
            ], {
                pooling: 'mean',
                normalize: true
            });
        } catch (err) {
            console.warn('[rag] warmup failed:', err);
            // Reset so a future call can retry.
            warmupPromise = null;
            throw err;
        }
    })();
    return warmupPromise;
}
/**
 * Embed a single text. Returns a 384-dim L2-normalized Float32Array.
 */ async function embedText(text) {
    const extractor = await getExtractor();
    const out = await extractor([
        text.slice(0, 8000)
    ], {
        pooling: 'mean',
        normalize: true
    });
    return toArray(out);
}
/**
 * Embed multiple texts in one call (batched). Returns one Float32Array per
 * input text, in the same order. Batching is more efficient than calling
 * embedText() in a loop because the ONNX forward pass amortizes overhead.
 *
 * Batch size is capped at 32 — transformers.js handles internal chunking,
 * but very large batches can OOM on low-end devices.
 */ async function embedBatch(texts, onProgress) {
    if (texts.length === 0) return [];
    const extractor = await getExtractor();
    const BATCH = 32;
    const results = [];
    for(let i = 0; i < texts.length; i += BATCH){
        const slice = texts.slice(i, i + BATCH).map((t)=>t.slice(0, 8000));
        const out = await extractor(slice, {
            pooling: 'mean',
            normalize: true
        });
        results.push(...toArrayOfArrays(out, slice.length));
        onProgress?.(Math.min(i + BATCH, texts.length), texts.length);
    }
    return results;
}
function toArray(out) {
    if (out.data instanceof Float32Array) return out.data;
    if (Array.isArray(out.data) && out.data.length > 0 && out.data[0] instanceof Float32Array) {
        // Some versions return Float32Array[] even for single input.
        return out.data[0];
    }
    if (Array.isArray(out.data) && typeof out.data[0] === 'number') {
        return new Float32Array(out.data);
    }
    // Array of arrays of numbers
    const flat = out.data.flat();
    return new Float32Array(flat);
}
function toArrayOfArrays(out, expected) {
    if (out.data instanceof Float32Array) {
        // Single result despite batch — split assuming EMBEDDING_DIM width.
        const dim = EMBEDDING_DIM;
        const count = Math.floor(out.data.length / dim);
        const result = [];
        for(let i = 0; i < count; i++){
            result.push(out.data.subarray(i * dim, (i + 1) * dim));
        }
        return result;
    }
    if (Array.isArray(out.data) && out.data.length > 0 && out.data[0] instanceof Float32Array) {
        return out.data;
    }
    if (Array.isArray(out.data) && typeof out.data[0] === 'number') {
        // Flatten trick
        return [
            new Float32Array(out.data)
        ];
    }
    // Array of arrays of numbers
    return out.data.map((arr)=>new Float32Array(arr));
}
// ── Vector store (IndexedDB) ────────────────────────────────────────────────
const DB_NAME = 'medq-rag';
const DB_VERSION = 1;
const STORE_CHUNKS = 'chunks';
const STORE_VECS = 'vectors';
let dbPromise = null;
function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject)=>{
        if (typeof indexedDB === 'undefined') {
            reject(new Error('IndexedDB unavailable — RAG disabled'));
            return;
        }
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = ()=>{
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_CHUNKS)) {
                const store = db.createObjectStore(STORE_CHUNKS, {
                    keyPath: 'id'
                });
                store.createIndex('source', 'source', {
                    unique: false
                });
            }
            if (!db.objectStoreNames.contains(STORE_VECS)) {
                db.createObjectStore(STORE_VECS, {
                    keyPath: 'id'
                });
            }
        };
        req.onsuccess = ()=>resolve(req.result);
        req.onerror = ()=>reject(req.error);
    });
    return dbPromise;
}
function tx(db, store, mode, fn) {
    return new Promise((resolve, reject)=>{
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = ()=>resolve(req.result);
        req.onerror = ()=>reject(req.error);
    });
}
/**
 * Insert (or replace) chunks + their embeddings. Idempotent on chunk.id.
 */ async function putChunks(chunks, vectors) {
    if (chunks.length !== vectors.length) {
        throw new Error(`putChunks: chunks (${chunks.length}) and vectors (${vectors.length}) length mismatch`);
    }
    if (chunks.length === 0) return;
    const db = await openDB();
    const t = db.transaction([
        STORE_CHUNKS,
        STORE_VECS
    ], 'readwrite');
    const chunksStore = t.objectStore(STORE_CHUNKS);
    const vecsStore = t.objectStore(STORE_VECS);
    for(let i = 0; i < chunks.length; i++){
        const c = chunks[i];
        const stored = {
            id: c.id,
            source: c.source,
            text: c.text,
            title: c.title,
            url: c.url,
            tags: c.tags,
            embeddedAt: c.embeddedAt
        };
        chunksStore.put(stored);
        vecsStore.put({
            id: c.id,
            vec: vectors[i].buffer.slice(0)
        });
    }
    return new Promise((resolve, reject)=>{
        t.oncomplete = ()=>resolve();
        t.onerror = ()=>reject(t.error);
    });
}
async function deleteChunk(id) {
    const db = await openDB();
    await tx(db, STORE_CHUNKS, 'readwrite', (s)=>s.delete(id));
    await tx(db, STORE_VECS, 'readwrite', (s)=>s.delete(id));
}
async function deleteSource(source) {
    const db = await openDB();
    const ids = await new Promise((resolve, reject)=>{
        const idx = db.transaction(STORE_CHUNKS, 'readonly').objectStore(STORE_CHUNKS).index('source');
        const req = idx.getAllKeys(source);
        req.onsuccess = ()=>resolve(req.result);
        req.onerror = ()=>reject(req.error);
    });
    if (ids.length === 0) return;
    const t = db.transaction([
        STORE_CHUNKS,
        STORE_VECS
    ], 'readwrite');
    const cs = t.objectStore(STORE_CHUNKS);
    const vs = t.objectStore(STORE_VECS);
    for (const id of ids){
        cs.delete(id);
        vs.delete(id);
    }
    return new Promise((resolve, reject)=>{
        t.oncomplete = ()=>resolve();
        t.onerror = ()=>reject(t.error);
    });
}
async function countChunks(source) {
    const db = await openDB();
    if (source) {
        return tx(db, STORE_CHUNKS, 'readonly', (s)=>s.index('source').count(source));
    }
    return tx(db, STORE_CHUNKS, 'readonly', (s)=>s.count());
}
/**
 * Load all chunks for the given sources (or all chunks if no sources given).
 * Returns both chunks and their deserialized vectors in one pass.
 */ async function loadAll(sources) {
    const db = await openDB();
    const chunks = await tx(db, STORE_CHUNKS, 'readonly', (s)=>s.getAll());
    const filtered = sources && sources.length > 0 ? chunks.filter((c)=>sources.includes(c.source)) : chunks;
    const ids = filtered.map((c)=>c.id);
    const vectors = new Map();
    // Fetch vectors one by one — getAll() on the vector store would load
    // all of them, but we only want the filtered subset.
    for (const id of ids){
        const v = await tx(db, STORE_VECS, 'readonly', (s)=>s.get(id));
        if (v) {
            vectors.set(id, new Float32Array(v.vec));
        }
    }
    return {
        chunks: filtered,
        vectors
    };
}
/**
 * Search the vector store for chunks most similar to `queryVec`.
 * Returns top-K results above `minScore`, restricted to `sources` if given.
 *
 * This is a linear scan — O(n) over all stored vectors. For ~10k chunks
 * this takes ~1-2ms on M1 and ~5-10ms on mid-range phones. Acceptable for
 * offline RAG where the corpus is the user's local knowledge base.
 *
 * For >50k chunks, swap this for hnswlib-wasm. The function signature
 * stays the same.
 */ async function search(queryVec, opts = {}) {
    const topK = opts.topK ?? 4;
    const minScore = opts.minScore ?? 0.20;
    const { chunks, vectors } = await loadAll(opts.sources);
    const scored = [];
    for (const c of chunks){
        const v = vectors.get(c.id);
        if (!v) continue;
        const score = cosine(queryVec, v);
        if (score >= minScore) {
            scored.push({
                chunk: {
                    id: c.id,
                    source: c.source,
                    text: c.text,
                    title: c.title,
                    url: c.url,
                    tags: c.tags,
                    embeddedAt: c.embeddedAt
                },
                score
            });
        }
    }
    scored.sort((a, b)=>b.score - a.score);
    return scored.slice(0, topK);
}
function cosine(a, b) {
    // Vectors are already L2-normalized (embedText does this), so cosine =
    // dot product. Still works if they aren't normalized — divides by the
    // product of magnitudes.
    const n = Math.min(a.length, b.length);
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for(let i = 0; i < n; i++){
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / Math.sqrt(normA * normB);
}
// ── High-level retrieval + formatting ──────────────────────────────────────
/**
 * Run a RAG retrieval: embed the query, search the store, return formatted
 * context string suitable for injection into a chat prompt.
 *
 * Returns '' if no chunks above threshold — caller should still proceed
 * with non-RAG generation.
 */ async function retrieveContext(query, opts = {}) {
    try {
        const qv = await embedText(query);
        const hits = await search(qv, opts);
        if (hits.length === 0) return {
            context: '',
            chunks: []
        };
        const context = hits.map((h, i)=>{
            const title = h.chunk.title ? ` [${h.chunk.title}]` : '';
            return `[${i + 1}]${title} ${h.chunk.text}`;
        }).join('\n\n');
        return {
            context,
            chunks: hits
        };
    } catch (err) {
        console.warn('[rag] retrieveContext failed:', err);
        return {
            context: '',
            chunks: []
        };
    }
}
/**
 * Build a RAG-augmented message list for the offline chat pipeline.
 * Injects retrieved context as an additional system message BEFORE the
 * user's question, formatted so a small model can understand it.
 */ async function buildRAGMessages(systemPrompt, userPrompt, history = [], opts = {}) {
    const { context, chunks } = await retrieveContext(userPrompt, opts);
    const messages = [
        {
            role: 'system',
            content: systemPrompt
        }
    ];
    if (context) {
        messages.push({
            role: 'system',
            content: `Relevant context from the user's local knowledge base (MedQ RAG):\n${context}\n\n` + `Use this context to ground your answer. Cite by [1], [2] etc. when quoting. ` + `If the context conflicts with your knowledge, prefer the context.`
        });
    }
    messages.push(...history.slice(-4), {
        role: 'user',
        content: userPrompt
    });
    return {
        messages,
        citations: chunks
    };
}
// ── Indexing helpers ────────────────────────────────────────────────────────
/**
 * Index a batch of texts. Each chunk gets a stable id (caller-supplied).
 * Idempotent — re-indexing the same chunks overwrites by id.
 *
 * On progress: `onProgress(done, total)` fires per batch of 32.
 */ async function indexChunks(chunks, onProgress) {
    if (chunks.length === 0) return {
        indexed: 0,
        skipped: 0
    };
    const texts = chunks.map((c)=>c.text);
    const vectors = await embedBatch(texts, onProgress);
    const fullChunks = chunks.map((c)=>({
            ...c,
            embeddedAt: Date.now()
        }));
    await putChunks(fullChunks, vectors);
    return {
        indexed: chunks.length,
        skipped: 0
    };
}
/**
 * Index a long document by splitting it into ~512-token chunks (approximated
 * as ~2000 chars with overlap). Each chunk is embedded and stored.
 */ async function indexDocument(source, docId, text, title, url, onProgress) {
    const CHUNK_SIZE = 2000;
    const OVERLAP = 200;
    const chunks = [];
    for(let i = 0; i < text.length; i += CHUNK_SIZE - OVERLAP){
        const slice = text.slice(i, i + CHUNK_SIZE);
        if (slice.trim().length === 0) break;
        chunks.push({
            id: `${source}:${docId}:${i}`,
            source,
            text: slice,
            title,
            url
        });
        if (i + CHUNK_SIZE >= text.length) break;
    }
    if (chunks.length === 0) return 0;
    await indexChunks(chunks, onProgress);
    return chunks.length;
}
/**
 * Wipe the entire RAG store. Used when the user clears offline data.
 */ async function clearAll() {
    const db = await openDB();
    const t = db.transaction([
        STORE_CHUNKS,
        STORE_VECS
    ], 'readwrite');
    t.objectStore(STORE_CHUNKS).clear();
    t.objectStore(STORE_VECS).clear();
    return new Promise((resolve, reject)=>{
        t.oncomplete = ()=>resolve();
        t.onerror = ()=>reject(t.error);
    });
}
// ── Idle warm-up wiring ─────────────────────────────────────────────────────
/**
 * Schedule embedder warm-up on idle. Safe to call multiple times — only
 * the first call schedules the actual work.
 *
 * Uses `requestIdleCallback` when available (Chrome/Firefox/Safari 17+),
 * falls back to `setTimeout(2000)` elsewhere.
 */ function wireIdleWarmup() {
    if (false) {}
    const schedule = ()=>{
        try {
            warmupEmbedder().catch(()=>{
            /* silent — logged inside warmupEmbedder */ });
        } catch  {
        /* ignore */ }
    };
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(schedule, {
            timeout: 4000
        });
    } else {
        setTimeout(schedule, 2000);
    }
}


/***/ }),

/***/ 79127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O3: () => (/* binding */ OFFLINE_EXAM_SYSTEM),
/* harmony export */   Vq: () => (/* binding */ OFFLINE_CHAT_SYSTEM),
/* harmony export */   tg: () => (/* binding */ OFFLINE_ANALYSIS_SYSTEM),
/* harmony export */   x2: () => (/* binding */ OFFLINE_TERM_SYSTEM)
/* harmony export */ });
/* unused harmony export buildOfflineMessages */
/**
 * System prompts for offline AI inference.
 *
 * Tuned for small CPU-bound models (0.5B–3B params). These prompts are
 * intentionally shorter than the cloud-AI equivalents because:
 *   1. Small models lose coherence with very long system prompts.
 *   2. Smaller context window (2K–4K tokens) — must conserve space for
 *      user input and the model's response.
 *
 * Each prompt also embeds an explicit "you are running offline on a small
 * model" hint so the model stays humble and avoids hallucinating citations
 * or web links.
 */ const OFFLINE_CHAT_SYSTEM = `You are MedQ Offline, a study assistant for medical students.
You are running locally on the user's device, offline, on a small model.
Be concise. Give accurate medical information. If unsure, say so.
Use plain language. Avoid claiming citations or sources you don't have.`;
const OFFLINE_EXAM_SYSTEM = `You are a medical exam question generator running offline on a small model.
Generate ONE multiple-choice question in JSON.
Schema: {"stem":"question text","options":["A","B","C","D"],"answer":0,"explanation":"why"}
The "answer" field is the 0-indexed position of the correct option.
Make the question clinically relevant. Keep options concise.
Output ONLY the JSON object, no markdown fences, no commentary.`;
const OFFLINE_ANALYSIS_SYSTEM = `You are a study-performance advisor running offline on a small model.
The user will paste a summary of their recent quiz performance.
Respond with 2-3 short bullet points: their weakest topic, a focused study suggestion, and an encouragement.
Keep total response under 100 words. No citations.`;
const OFFLINE_TERM_SYSTEM = `You are a medical dictionary running offline on a small model.
Define the user's term in 1-2 sentences. Be precise. No fluff.
If the term is not medical, still define it briefly.`;
function buildOfflineMessages(systemPrompt, userPrompt, history = []) {
    return [
        {
            role: 'system',
            content: systemPrompt
        },
        ...history.slice(-4),
        {
            role: 'user',
            content: userPrompt
        }
    ];
}


/***/ }),

/***/ 88321:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OFFLINE_ANALYSIS_SYSTEM: () => (/* reexport safe */ _prompts__WEBPACK_IMPORTED_MODULE_2__.tg),
/* harmony export */   OFFLINE_CHAT_SYSTEM: () => (/* reexport safe */ _prompts__WEBPACK_IMPORTED_MODULE_2__.Vq),
/* harmony export */   OFFLINE_EXAM_SYSTEM: () => (/* reexport safe */ _prompts__WEBPACK_IMPORTED_MODULE_2__.O3),
/* harmony export */   OFFLINE_TERM_SYSTEM: () => (/* reexport safe */ _prompts__WEBPACK_IMPORTED_MODULE_2__.x2),
/* harmony export */   offlineChatAnswer: () => (/* binding */ offlineChatAnswer),
/* harmony export */   offlineExamQuestion: () => (/* binding */ offlineExamQuestion),
/* harmony export */   offlinePerformanceAnalysis: () => (/* binding */ offlinePerformanceAnalysis),
/* harmony export */   offlineTermLookup: () => (/* binding */ offlineTermLookup),
/* harmony export */   prewarmBackend: () => (/* binding */ prewarmBackend),
/* harmony export */   runOfflineChat: () => (/* binding */ runOfflineChat),
/* harmony export */   shouldUseOfflineAI: () => (/* binding */ shouldUseOfflineAI)
/* harmony export */ });
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10885);
/* harmony import */ var _prompts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79127);
/* harmony import */ var _rag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53710);
/**
 * Non-React helper for offline AI inference.
 *
 * Use this from Zustand stores, vanilla TS modules, or anywhere that can't
 * use the useOfflineAI hook (which requires a React component context).
 *
 * Behavior:
 *   - If navigator is offline AND a model is loaded in the engine, runs
 *     the chat completion via the local engine and returns the result.
 *   - Otherwise returns null — caller should fall back to cloud fetch.
 *
 * RAG integration: when `useRAG: true` is passed in opts (default true for
 * chat/term lookups), the helper embeds the user's prompt and retrieves
 * relevant chunks from the local vector store before generation. The
 * retrieved context is injected as an extra system message.
 *
 * Always non-throwing on the offline-check; only throws if the engine
 * itself errors during inference (caller should catch).
 */ 


const STORAGE_KEY = 'medq.offline-ai.model-id';
/**
 * Returns true if the device is currently offline AND a model is loaded
 * in the engine (either GPU or CPU backend). Callers should check this
 * before attempting a cloud fetch.
 */ function shouldUseOfflineAI() {
    if (typeof navigator === 'undefined') return false;
    if (navigator.onLine) return false;
    let modelId = null;
    try {
        modelId = localStorage.getItem(STORAGE_KEY);
    } catch  {
    /* localStorage unavailable */ }
    if (!modelId) return false;
    return (0,_dispatcher__WEBPACK_IMPORTED_MODULE_0__/* .isModelLoaded */ .R1)(modelId);
}
/**
 * Trigger backend detection early (e.g. on app boot) so that the GPU
 * probe runs in the background and is cached by the time the user
 * opens the settings UI. Safe to call multiple times.
 *
 * Also warms up the RAG embedder (transformers.js pipeline) on idle so
 * the first RAG-augmented chat has no 5-8s cold start.
 */ async function prewarmBackend() {
    // Fire-and-forget the RAG embedder warmup. We deliberately don't await
    // it — the backend probe should not block on the 23MB embedder download.
    // The warmup runs on idle and is silent on failure.
    try {
        (0,_rag__WEBPACK_IMPORTED_MODULE_1__/* .wireIdleWarmup */ .i1)();
    } catch  {
    /* ignore — embedder warmup is best-effort */ }
    return (0,_dispatcher__WEBPACK_IMPORTED_MODULE_0__/* .detectBackend */ .kS)();
}
/**
 * Run an offline chat completion. Returns the full text.
 * Throws if no model is loaded.
 *
 * When `opts.useRAG` is true (default), retrieves relevant chunks from
 * the local vector store and injects them as an extra system message
 * before generation. The retrieval is best-effort — if the embedder
 * fails or the store is empty, the call proceeds without RAG.
 */ async function runOfflineChat(messages, opts = {}) {
    const useRAG = opts.useRAG !== false;
    let finalMessages = messages;
    if (useRAG) {
        // Find the user's last message to use as the retrieval query.
        const lastUser = [
            ...messages
        ].reverse().find((m)=>m.role === 'user');
        if (lastUser) {
            try {
                const { context } = await (0,_rag__WEBPACK_IMPORTED_MODULE_1__/* .retrieveContext */ .qO)(lastUser.content, {
                    sources: opts.ragSources,
                    topK: 4,
                    minScore: 0.20
                });
                if (context) {
                    // Inject retrieved context as a system message right before the
                    // user's question. Keep the original system prompt first so the
                    // model retains its role/persona.
                    const ragMsg = {
                        role: 'system',
                        content: `Relevant context from the user's local knowledge base (MedQ RAG):\n${context}\n\n` + `Use this context to ground your answer. Cite by [1], [2] etc. when quoting. ` + `If the context conflicts with your knowledge, prefer the context.`
                    };
                    // Insert after the original system prompt (which is typically messages[0]).
                    const sysIdx = messages.findIndex((m)=>m.role === 'system');
                    if (sysIdx >= 0) {
                        finalMessages = [
                            ...messages.slice(0, sysIdx + 1),
                            ragMsg,
                            ...messages.slice(sysIdx + 1)
                        ];
                    } else {
                        finalMessages = [
                            ragMsg,
                            ...messages
                        ];
                    }
                }
            } catch (err) {
                console.warn('[offline-ai] RAG retrieval failed, proceeding without context:', err);
            }
        }
    }
    return (0,_dispatcher__WEBPACK_IMPORTED_MODULE_0__/* .chat */ .TE)(finalMessages, opts);
}
// ── Convenience wrappers for each AI mode ───────────────────────────────────
async function offlineChatAnswer(userPrompt, history = [], opts) {
    return runOfflineChat([
        {
            role: 'system',
            content: _prompts__WEBPACK_IMPORTED_MODULE_2__/* .OFFLINE_CHAT_SYSTEM */ .Vq
        },
        ...history.slice(-4),
        {
            role: 'user',
            content: userPrompt
        }
    ], // RAG defaults to true for chat — most useful for medical Q&A.
    {
        maxTokens: 384,
        useRAG: true,
        ...opts
    });
}
async function offlineTermLookup(term, opts) {
    return runOfflineChat([
        {
            role: 'system',
            content: _prompts__WEBPACK_IMPORTED_MODULE_2__/* .OFFLINE_TERM_SYSTEM */ .x2
        },
        {
            role: 'user',
            content: term
        }
    ], // Term lookups benefit hugely from RAG — the local medical dictionary
    // is more authoritative than a small model's parametric memory.
    {
        maxTokens: 120,
        useRAG: true,
        ...opts
    });
}
async function offlineExamQuestion(topicPrompt, opts) {
    return runOfflineChat([
        {
            role: 'system',
            content: _prompts__WEBPACK_IMPORTED_MODULE_2__/* .OFFLINE_EXAM_SYSTEM */ .O3
        },
        {
            role: 'user',
            content: topicPrompt
        }
    ], // Exam generation needs creative generation, not retrieval — RAG would
    // just copy existing questions from the qbank. Default useRAG: false.
    {
        maxTokens: 256,
        useRAG: false,
        ...opts
    });
}
async function offlinePerformanceAnalysis(performanceSummary, opts) {
    return runOfflineChat([
        {
            role: 'system',
            content: _prompts__WEBPACK_IMPORTED_MODULE_2__/* .OFFLINE_ANALYSIS_SYSTEM */ .tg
        },
        {
            role: 'user',
            content: performanceSummary
        }
    ], // Performance analysis doesn't benefit from RAG — it's about the user's
    // own quiz data, not the medical knowledge base.
    {
        maxTokens: 200,
        useRAG: false,
        ...opts
    });
}



/***/ })

}]);