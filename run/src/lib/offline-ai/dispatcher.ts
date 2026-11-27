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

import type { OfflineModel } from './models';
import type { OfflineChatMessage } from './prompts';
import type { EngineStatus, LoadProgress, ChatOptions } from './engine';
import {
  loadModel as cpuLoadModel,
  chat as cpuChat,
  unload as cpuUnload,
  isModelLoaded as cpuIsModelLoaded,
  getEngineStatus as cpuGetEngineStatus,
  resetChatSession as cpuResetChatSession,
  saveChatSession as cpuSaveChatSession,
  loadChatSession as cpuLoadChatSession,
} from './engine';
import {
  loadModel as gpuLoadModel,
  chat as gpuChat,
  unload as gpuUnload,
  isModelLoaded as gpuIsModelLoaded,
  getEngineStatus as gpuGetEngineStatus,
} from './gpu-engine';
import { detectGpuCapability, type GpuCapability } from './gpu-detect';

export type { EngineStatus, LoadProgress, ChatOptions };
export type { OfflineModel, OfflineChatMessage };

export type Backend = 'gpu' | 'cpu';

let backendDecision: Backend | null = null;
let backendProbe: Promise<Backend> | null = null;

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
 */
export async function detectBackend(): Promise<Backend> {
  if (backendDecision) return backendDecision;
  if (backendProbe) return backendProbe;

  backendProbe = (async () => {
    const cap: GpuCapability = await detectGpuCapability();
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
 */
export function getCachedBackend(): Backend | null {
  return backendDecision;
}

// ── Pass-through API ──────────────────────────────────────────────────────────

export function getEngineStatus(): EngineStatus {
  if (backendDecision === 'gpu') return gpuGetEngineStatus();
  return cpuGetEngineStatus();
}

export function isModelLoaded(modelId: string): boolean {
  if (backendDecision === 'gpu') return gpuIsModelLoaded(modelId);
  return cpuIsModelLoaded(modelId);
}

export async function loadModel(
  model: OfflineModel,
  onProgress?: (p: LoadProgress) => void,
): Promise<void> {
  await detectBackend();
  if (backendDecision === 'gpu') {
    return gpuLoadModel(model, onProgress);
  }
  return cpuLoadModel(model, onProgress);
}

export async function chat(
  messages: OfflineChatMessage[],
  opts: ChatOptions = {},
): Promise<string> {
  if (backendDecision === 'gpu') {
    return gpuChat(messages, opts);
  }
  return cpuChat(messages, opts);
}

export async function unload(): Promise<void> {
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
 */
export function resetChatSession(): void {
  if (backendDecision === 'cpu') {
    cpuResetChatSession();
  }
}

/**
 * Save the current chat session state for persistence across page reloads.
 * Returns null on the GPU backend or if the engine doesn't support it.
 */
export async function saveChatSession(): Promise<Uint8Array | null> {
  if (backendDecision === 'cpu') {
    return cpuSaveChatSession();
  }
  return null;
}

/**
 * Restore a previously-saved chat session.
 * Returns false on the GPU backend or if restoration failed.
 */
export async function loadChatSession(state: Uint8Array): Promise<boolean> {
  if (backendDecision === 'cpu') {
    return cpuLoadChatSession(state);
  }
  return false;
}
