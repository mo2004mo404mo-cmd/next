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

import type { OfflineModel } from './models';
import { buildModelUrl } from './models';
import type { OfflineChatMessage } from './prompts';

// ── Types ────────────────────────────────────────────────────────────────────

export type EngineStatus =
  | 'idle'
  | 'loading-wllama'
  | 'downloading-model'
  | 'loading-model'
  | 'ready'
  | 'failed';

export interface LoadProgress {
  /** 0–1, model download progress. */
  downloadProgress: number;
  /** Human-readable status line. */
  status: string;
  /** Current stage. */
  stage: EngineStatus;
}

export interface ChatOptions {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  /** Called for each new token chunk. */
  onToken?: (chunk: string) => void;
  /** AbortSignal to cancel generation. */
  signal?: AbortSignal;
  /**
   * Whether to reuse the wllama KV cache from the prior call. Default true.
   * Set to false to start a fresh session (e.g. when the conversation topic
   * changes). See `resetChatSession()` for the persistent variant.
   */
  preserveSession?: boolean;
}

// ── Wllama type shims (the package ships loose .d.ts files) ─────────────────

/**
 * wllama's `loadModelFromUrl` accepts `progressCallback` (NOT `progress` —
 * see @wllama/wllama 3.5.1 esm/cache-manager.d.ts `DownloadOptions`).
 * The callback receives `{ loaded, total }` in bytes.
 */
interface WllamaModelConfig {
  progressCallback?: (data: { loaded: number; total: number }) => void;
  /** Abort signal passed through to fetch. */
  signal?: AbortSignal;
}

/**
 * Extended model-load config for advanced wllama features.
 * See llama.cpp `common_params` for the underlying field meanings.
 *
 *  - `cache_type_k` / `cache_type_v`: KV-cache quantization. 'q8_0' halves
 *    RAM usage with <1% quality loss — critical for fitting 3B+context on
 *    phones. Default is 'f16' (uncompressed).
 *  - `flash_attn`: enables FlashAttention. ~20% faster on long contexts,
 *    negligible quality change. Supported in llama.cpp b2620+ / wllama 3.x.
 *  - `n_threads`: explicit thread count. Default = navigator.hardwareConcurrency.
 *  - `n_gpu_layers`: 0 on CPU-only paths. wllama ignores this on CPU builds.
 *  - `rope_scaling`: 'linear' or 'ya' for extending context beyond training.
 *  - `draft`: draft-model config for speculative decoding. See comment on
 *    SpeculativeDecodingConfig below.
 */
interface WllamaAdvancedModelConfig extends WllamaModelConfig {
  nCtx?: number;
  cache_type_k?: 'f16' | 'q8_0';
  cache_type_v?: 'f16' | 'q8_0';
  flash_attn?: boolean;
  n_threads?: number;
  n_gpu_layers?: number;
  rope_scaling?: 'linear' | 'ya';
  seed?: number;
  /**
   * Draft model for speculative decoding. When set, wllama loads a small
   * draft model alongside the main model; the draft proposes tokens and
   * the main model verifies in parallel, giving ~1.8–2.2× throughput on CPU.
   *
   * The draft model must share the tokenizer with the main model — typically
   * a smaller variant of the same family (e.g. Qwen2.5-0.5B as draft for
   * Qwen2.5-3B).
   */
  draft?: {
    modelUrl: string;
    nCtx?: number;
    nMax?: number;
    /** Override KV cache type for the draft model (default 'q8_0' to save RAM). */
    cache_type_k?: 'f16' | 'q8_0';
  };
}

/**
 * Shape of a streaming chat completion chunk returned by wllama's
 * `createChatCompletion({ stream: true })`. Mirrors the OpenAI format.
 */
interface WllamaChatChunk {
  choices?: Array<{ delta?: { content?: string } }>;
}

/**
 * Parameters for `createChatCompletion`. Field names follow the OpenAI
 * chat completion API (temperature, top_p, max_tokens, etc.) — NOT the
 * legacy wllama `formatChatCompletion` names (nCtx/nPredict/temp/topP).
 */
interface WllamaChatCompletionParams {
  messages: OfflineChatMessage[];
  stream: true;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  abortSignal?: AbortSignal;
  /**
   * Session preservation: pass the session id returned by a prior call.
   * wllama retains the KV cache for that session and only processes the
   * NEW messages, dramatically reducing token cost on multi-turn chat.
   * See `currentSessionId` and the session-management comment below.
   */
  session_id?: string;
}

interface WllamaModule {
  Wllama?: new (pathConfig: unknown, cfg: WllamaConfig) => WllamaInstance;
  CacheManager?: new (backends?: unknown[]) => { sb: COSBackendLike };
  default?: {
    Wllama?: new (pathConfig: unknown, cfg: WllamaConfig) => WllamaInstance;
    CacheManager?: new (backends?: unknown[]) => { sb: COSBackendLike };
  };
}

/**
 * Wllama accepts a `cacheManager` field in its constructor config. We use
 * this to inject a customized CacheManager that bypasses the COS (Cross-
 * Origin Storage) path — see comment on `buildBypassedCacheManager`.
 */
interface WllamaConfig {
  'multiple-models'?: boolean;
  cacheManager?: unknown;
  [key: string]: unknown;
}

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
 */
const WLLAMA_VERSION = '3.5.1';
const WLLAMA_PATH_CONFIG = {
  'default': `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_VERSION}/esm/wasm/wllama.wasm`,
  'single-thread/wllama.wasm': `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_VERSION}/esm/wasm/wllama.wasm`,
  'multi-thread/wllama.wasm': `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_VERSION}/esm/wasm/wllama-multi-thread.wasm`,
} as const;

/**
 * Shape of the internal COSBackend. We only need to touch `cos` and `priv`
 * (the two storage backends) to disable the COS path. These fields are
 * created via `__publicField` in the compiled class, so they're regular
 * own properties on the instance.
 */
interface COSBackendLike {
  cos: { isSupported: () => boolean };
  priv: { isSupported: () => boolean };
}

interface WllamaInstance {
  loadModelFromUrl(url: string, cfg: WllamaModelConfig): Promise<void>;
  /**
   * Load a model directly from in-memory Blobs. Used as a fallback when
   * `loadModelFromUrl` fails due to wllama's cache verification bug.
   *
   * Accepts the extended WllamaAdvancedModelConfig so callers can pass
   * `cache_type_k`, `flash_attn`, `draft`, etc. via the fallback path too.
   */
  loadModel?(blobs: Blob[], cfg: WllamaAdvancedModelConfig & Record<string, unknown>): Promise<void>;
  /**
   * OAI-compatible streaming chat completion. Returns an async iterable
   * of chunks with `choices[0].delta.content` payloads.
   */
  createChatCompletion(
    params: WllamaChatCompletionParams,
  ): Promise<AsyncIterable<WllamaChatChunk>>;
  /**
   * Tear down the wllama instance and free WASM memory.
   * (wllama 3.5.1 renamed `unload()` to `exit()`.)
   */
  exit(): Promise<void>;
  cudaDetect?: () => boolean;
  /**
   * Session preservation — wllama 3.5+ exposes a session API so the KV
   * cache can be retained across calls within the same logical conversation.
   * This avoids re-computing the prompt prefix on every turn.
   *
   * The pattern is:
   *   1. First call: omit session_id. wllama assigns one, returns it via
   *      the `chat_id` field in the first stream chunk (or `getChatId()`
   *      after the call completes).
   *   2. Subsequent calls: pass `session_id` in the params. wllama reuses
   *      the cached KV state for all messages up to the new tail.
   *
   * Not all wllama builds expose these methods — guard with `?.`.
   */
  getChatId?(): number;
  /**
   * Save the current chat session state (KV cache + conversation) to a
   * binary blob. Can be persisted to IndexedDB and restored later.
   */
  saveChatSession?(): Promise<Uint8Array>;
  /**
   * Restore a previously-saved chat session.
   */
  loadChatSession?(state: Uint8Array): Promise<void>;
  /**
   * Discard the current chat session's KV cache. Use when the conversation
   * topic changes (so the old prefix is no longer relevant) or before
   * switching to a different system prompt.
   */
  resetChat?(): void;
}

// ── Singleton state ──────────────────────────────────────────────────────────

let wllamaPromise: Promise<WllamaInstance> | null = null;
let currentInstance: WllamaInstance | null = null;
let currentModelId: string | null = null;
let currentStatus: EngineStatus = 'idle';

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
 */
let currentSessionId: string | null = null;

export function getEngineStatus(): EngineStatus {
  return currentStatus;
}

export function getCurrentModelId(): string | null {
  return currentModelId;
}

export function isModelLoaded(modelId: string): boolean {
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
 */
/**
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
 */
function buildBypassedCacheManager(
  mod: WllamaModule,
): { cacheManager: unknown } | null {
  const CacheManagerCtor = mod.CacheManager ?? mod.default?.CacheManager;
  if (!CacheManagerCtor || typeof CacheManagerCtor !== 'function') {
    return null;
  }
  try {
    const cacheManager = new CacheManagerCtor();
    const sb = (cacheManager as { sb?: COSBackendLike }).sb;
    if (sb?.cos) {
      // Override the instance method (shadows the prototype method).
      sb.cos.isSupported = () => false;
    }
    return { cacheManager };
  } catch (err) {
    console.warn('[offline-ai] failed to build bypassed CacheManager:', err);
    return null;
  }
}

async function getWllama(): Promise<WllamaInstance> {
  if (!wllamaPromise) {
    currentStatus = 'loading-wllama';
    wllamaPromise = (async () => {
      const mod = (await import('@wllama/wllama/esm/index.js')) as unknown as WllamaModule;

      // Resolve the Wllama constructor across different module wrapper shapes:
      //   1. ESM named export: mod.Wllama
      //   2. CJS-wrapped-as-ESM: mod.default.Wllama
      //   3. CJS default: mod.default (when the whole module.exports is the class — unlikely here)
      const WllamaCtor =
        mod.Wllama ??
        mod.default?.Wllama ??
        (mod.default as unknown as new (pathConfig: unknown, cfg: WllamaConfig) => WllamaInstance | undefined);

      if (!WllamaCtor || typeof WllamaCtor !== 'function') {
        throw new Error(
          'Failed to load wllama: Wllama constructor not found in module. ' +
            `Available keys: ${Object.keys(mod).join(', ')}` +
            (mod.default ? `, default keys: ${Object.keys(mod.default).join(', ')}` : ''),
        );
      }

      // Build a cacheManager that bypasses the COS path (see comment on
      // buildBypassedCacheManager). If construction fails for any reason,
      // fall back to wllama's default cacheManager.
      const bypassed = buildBypassedCacheManager(mod);

      // Wllama constructor signature: new Wllama(pathConfig, wllamaConfig)
      //   - pathConfig: REQUIRED, tells wllama where to fetch its WASM glue
      //   - wllamaConfig: OPTIONAL, contains cacheManager/modelManager/etc.
      const wllamaConfig: WllamaConfig = { 'multiple-models': false };
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
 */
export async function loadModel(
  model: OfflineModel,
  onProgress?: (p: LoadProgress) => void,
): Promise<void> {
  if (isModelLoaded(model.id)) {
    return;
  }

  // Unload any previously-loaded model first.
  if (currentInstance) {
    try {
      await currentInstance.exit();
    } catch {
      /* ignore */
    }
    currentInstance = null;
    currentModelId = null;
  }

  currentStatus = 'downloading-model';
  const url = buildModelUrl(model);

  const wllama = await getWllama();

  currentStatus = 'downloading-model';
  onProgress?.({
    downloadProgress: 0,
    status: `Downloading ${model.name} (~${model.sizeMb} MB)…`,
    stage: 'downloading-model',
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
  const hwThreads = typeof navigator !== 'undefined' && navigator.hardwareConcurrency
    ? Math.min(8, Math.max(2, navigator.hardwareConcurrency))
    : 4;

  const advancedCfg: WllamaAdvancedModelConfig = {
    nCtx: model.contextLength,
    cache_type_k: 'q8_0',
    cache_type_v: 'q8_0',
    flash_attn: true,
    n_threads: hwThreads,
  };

  // Speculative decoding: if the model declares a draft model, configure it.
  // See OfflineModel.draftModel in models.ts. The draft model is loaded
  // alongside the main model and used for token proposal.
  const draftModel = (model as OfflineModel & { draftModel?: { repo: string; path: string } }).draftModel;
  if (draftModel) {
    advancedCfg.draft = {
      modelUrl: `https://huggingface.co/${draftModel.repo}/resolve/main/${draftModel.path}`,
      nCtx: Math.min(1024, model.contextLength),
      // Draft model uses q8_0 KV cache by default — even smaller RAM footprint.
      cache_type_k: 'q8_0',
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
      stage: 'downloading-model',
    });
    try {
      const blob = await fetchGgufWithProgress(url, (pct) => {
        onProgress?.({
          downloadProgress: pct,
          status: `Downloading ${model.name}… ${Math.round(pct * 100)}%`,
          stage: 'downloading-model',
        });
      });
      onProgress?.({
        downloadProgress: 1,
        status: `Loading ${model.name} into memory (q8 KV, flash-attn)…`,
        stage: 'loading-model',
      });
      await wllama.loadModel([blob], advancedCfg);
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
        progressCallback: (data) => {
          const pct = data.total > 0 ? data.loaded / data.total : 0;
          onProgress?.({
            downloadProgress: pct,
            status: pct >= 1
              ? `Loading ${model.name} into memory…`
              : `Downloading ${model.name}… ${Math.round(pct * 100)}%`,
            stage: pct >= 1 ? 'loading-model' : 'downloading-model',
          });
        },
      });
    } catch (primaryErr) {
      console.warn(
        '[offline-ai] loadModelFromUrl failed, no fallback available:',
        primaryErr,
      );
      throw primaryErr;
    }
  }

  currentInstance = wllama;
  currentModelId = model.id;
  currentStatus = 'ready';
  onProgress?.({
    downloadProgress: 1,
    status: `${model.name} ready`,
    stage: 'ready',
  });
}

/**
 * Fetch a GGUF file as a Blob, reporting download progress via callback.
 * Used as a fallback when wllama's own download path fails.
 *
 * Streams the response body so we can observe progress without buffering
 * the whole file in memory before reporting any progress.
 */
async function fetchGgufWithProgress(
  url: string,
  onProgress: (pct: number) => void,
): Promise<Blob> {
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
  const chunks: Uint8Array[] = [];
  let received = 0;
  let lastReport = 0;
  for (;;) {
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
  return new Blob(chunks, { type: 'application/octet-stream' });
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
 */
export async function chat(
  messages: OfflineChatMessage[],
  opts: ChatOptions = {},
): Promise<string> {
  if (!currentInstance) {
    throw new Error('Offline AI engine: no model loaded. Call loadModel() first.');
  }

  const preserveSession = opts.preserveSession !== false;
  const params: WllamaChatCompletionParams = {
    messages,
    stream: true,
    temperature: opts.temperature ?? 0.6,
    top_p: opts.topP ?? 0.9,
    max_tokens: opts.maxTokens ?? 512,
    abortSignal: opts.signal,
  };
  if (preserveSession && currentSessionId) {
    params.session_id = currentSessionId;
  }

  const stream = await currentInstance.createChatCompletion(params);

  let full = '';
  for await (const chunk of stream) {
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
    } catch {
      /* getChatId not supported — skip session reuse */
    }
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
 */
export function resetChatSession(): void {
  currentSessionId = null;
  if (currentInstance?.resetChat) {
    try {
      currentInstance.resetChat();
    } catch {
      /* ignore */
    }
  }
}

/**
 * Save the current chat session state (KV cache + conversation history)
 * to a Uint8Array. Can be persisted to IndexedDB and restored via
 * `loadChatSession()` after a page reload.
 *
 * Returns null if the current wllama build doesn't support session
 * persistence.
 */
export async function saveChatSession(): Promise<Uint8Array | null> {
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
 */
export async function loadChatSession(state: Uint8Array): Promise<boolean> {
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
 */
export async function unload(): Promise<void> {
  if (currentInstance) {
    try {
      await currentInstance.exit();
    } catch {
      /* ignore */
    }
    currentInstance = null;
    currentModelId = null;
    currentSessionId = null;
  }
  currentStatus = 'idle';
}
