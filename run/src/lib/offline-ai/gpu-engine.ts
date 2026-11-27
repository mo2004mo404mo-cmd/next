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
 */

import type { OfflineModel } from './models';
import type { OfflineChatMessage } from './prompts';
import type { EngineStatus, LoadProgress, ChatOptions } from './engine';

// Re-export shared types for convenience
export type { EngineStatus, LoadProgress, ChatOptions };

// ── web-llm type shims ───────────────────────────────────────────────────────

/**
 * web-llm's `MLCEngine` exposes a `chat` namespace with a `completions`
 * sub-object — the call is `engine.chat.completions.create({...})`, mirroring
 * the OpenAI client. The streaming variant returns
 * `AsyncIterable<ChatCompletionChunk>` where each chunk has
 * `choices[0].delta.content`.
 *
 * See @mlc-ai/web-llm lib/openai_api_protocols/chat_completion.d.ts.
 */
interface WebLlmChatChunk {
  choices?: Array<{ delta?: { content?: string } }>;
}

interface WebLlmEngine {
  chat: {
    completions: {
      create(opts: {
        stream: true;
        messages: OfflineChatMessage[];
        temperature?: number;
        top_p?: number;
        max_tokens?: number;
      }): Promise<AsyncIterable<WebLlmChatChunk>>;
    };
  };
  resetChat: () => Promise<void>;
  unload: () => Promise<void>;
}

interface WebLlmModule {
  CreateMLCEngine: (
    modelId: string,
    opts: {
      initProgressCallback?: (report: { progress: number; text: string }) => void;
    },
  ) => Promise<WebLlmEngine>;
  hasModelInCache: (modelId: string) => Promise<boolean>;
  deleteModelAllInfoInCache: (modelId: string) => Promise<void>;
}

// ── Singleton state ──────────────────────────────────────────────────────────

let webllmPromise: Promise<WebLlmModule> | null = null;
let currentEngine: WebLlmEngine | null = null;
let currentModelId: string | null = null;
let currentStatus: EngineStatus = 'idle';

export function getEngineStatus(): EngineStatus {
  return currentStatus;
}

export function getCurrentModelId(): string | null {
  return currentModelId;
}

export function isModelLoaded(modelId: string): boolean {
  return currentModelId === modelId && currentEngine !== null && currentStatus === 'ready';
}

/**
 * Lazily import web-llm. Dynamic import keeps the ~3 MB JS bundle out of
 * the initial payload, so users on CPU-only devices never pay the cost.
 */
async function getWebLLM(): Promise<WebLlmModule> {
  if (!webllmPromise) {
    webllmPromise = (async () => {
      return (await import('@mlc-ai/web-llm')) as unknown as WebLlmModule;
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
 */
export async function loadModel(
  model: OfflineModel,
  onProgress?: (p: LoadProgress) => void,
): Promise<void> {
  if (isModelLoaded(model.id)) return;

  // Unload previous model first.
  if (currentEngine) {
    try {
      await currentEngine.unload();
    } catch {
      /* ignore */
    }
    currentEngine = null;
    currentModelId = null;
  }

  currentStatus = 'loading-wllama'; // reuse status enum — means "loading runtime"
  const webllm = await getWebLLM();

  currentStatus = 'downloading-model';
  onProgress?.({
    downloadProgress: 0,
    status: `Initializing ${model.name}…`,
    stage: 'downloading-model',
  });

  currentEngine = await webllm.CreateMLCEngine(model.id, {
    initProgressCallback: (report) => {
      // web-llm's progress goes 0–1 across the entire init pipeline
      // (download + compile + GPU upload). We treat progress < 0.95 as
      // "downloading" and >= 0.95 as "loading into memory".
      const stage: EngineStatus = report.progress >= 0.95 ? 'loading-model' : 'downloading-model';
      currentStatus = stage;
      onProgress?.({
        downloadProgress: Math.min(1, report.progress),
        status: report.text || (stage === 'loading-model' ? 'Loading into GPU memory…' : 'Downloading…'),
        stage,
      });
    },
  });

  currentModelId = model.id;
  currentStatus = 'ready';
  onProgress?.({
    downloadProgress: 1,
    status: `${model.name} ready`,
    stage: 'ready',
  });
}

/**
 * Stream a chat completion. Tokens are delivered via onToken as they arrive.
 * Returns the full assembled text when done.
 */
export async function chat(
  messages: OfflineChatMessage[],
  opts: ChatOptions = {},
): Promise<string> {
  if (!currentEngine) {
    throw new Error('GPU AI engine: no model loaded. Call loadModel() first.');
  }

  const stream = await currentEngine.chat.completions.create({
    stream: true,
    messages,
    temperature: opts.temperature ?? 0.6,
    top_p: opts.topP ?? 0.9,
    max_tokens: opts.maxTokens ?? 512,
  });

  let full = '';
  for await (const chunk of stream) {
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
 */
export async function unload(): Promise<void> {
  if (currentEngine) {
    try {
      await currentEngine.unload();
    } catch {
      /* ignore */
    }
    currentEngine = null;
    currentModelId = null;
  }
  currentStatus = 'idle';
}
