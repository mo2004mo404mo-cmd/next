'use client';

/**
 * useOfflineAI — React hook for offline LLM inference.
 *
 * Auto-detects GPU capability on mount. If WebGPU is available, shows GPU
 * models (web-llm, MLC .bin files). Otherwise shows CPU models (wllama,
 * GGUF files). Both backends share the same chat interface.
 *
 * Exposes:
 *   - backend: 'gpu' | 'cpu' | null (null while detecting)
 *   - models: OfflineModel[] (GPU or CPU catalog based on detected backend)
 *   - status / downloadProgress / statusText
 *   - selectedModel / selectModel / download / chat
 *   - isOnline / shouldUseOfflineAI
 *
 * NO auto-download. The user must explicitly pick a model and click
 * "Download" in the settings UI. This respects users who don't want
 * offline AI or want to choose a different model than the default.
 * Previous selection is restored from localStorage on mount (without
 * downloading).
 */

import { useCallback, useEffect, useState } from 'react';
import {
  OFFLINE_MODELS,
  DEFAULT_OFFLINE_MODEL_ID,
  getOfflineModel,
  type OfflineModel,
} from '@/lib/offline-ai/models';
import {
  GPU_MODELS,
  DEFAULT_GPU_MODEL_ID,
  getGpuModel,
} from '@/lib/offline-ai/gpu-models';
import {
  chat as dispatcherChat,
  loadModel as dispatcherLoad,
  isModelLoaded as dispatcherIsLoaded,
  detectBackend,
  type EngineStatus,
  type Backend,
} from '@/lib/offline-ai/dispatcher';
import type { OfflineChatMessage } from '@/lib/offline-ai/prompts';

const STORAGE_KEY = 'medq.offline-ai.model-id';
const BACKEND_STORAGE_KEY = 'medq.offline-ai.backend';

// ── Types ────────────────────────────────────────────────────────────────────

export type OfflineAIHookStatus =
  | 'idle'
  | 'downloading'
  | 'loading'
  | 'ready'
  | 'failed';

export interface UseOfflineAIReturn {
  /** All available models for the picker UI (GPU catalog if GPU, else CPU). */
  models: OfflineModel[];
  /** 'gpu' | 'cpu' | null (null while detecting on first mount). */
  backend: Backend | null;
  /** Currently selected model (from localStorage). */
  selectedModel: OfflineModel | null;
  /** Whether the engine has finished loading the selected model. */
  isReady: boolean;
  /** React-state mirror of engine status. */
  status: OfflineAIHookStatus;
  /** 0–1 download progress. */
  downloadProgress: number;
  /** Human-readable status line. */
  statusText: string;
  /** True if navigator.onLine === false. */
  isOnline: boolean;
  /** True when offline AND model is ready. Drives UI fallback. */
  shouldUseOfflineAI: boolean;

  /** Persist a model choice in localStorage. Does NOT download. */
  selectModel: (modelId: string) => void;
  /** Begin downloading + loading the selected model. */
  download: () => Promise<void>;
  /** Streaming chat completion. Returns full text. */
  chat: (
    messages: OfflineChatMessage[],
    opts?: {
      temperature?: number;
      topP?: number;
      maxTokens?: number;
      onToken?: (chunk: string) => void;
      signal?: AbortSignal;
    },
  ) => Promise<string>;
}

// ── Implementation ──────────────────────────────────────────────────────────

export function useOfflineAI(): UseOfflineAIReturn {
  const [backend, setBackend] = useState<Backend | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [status, setStatus] = useState<OfflineAIHookStatus>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [engineReady, setEngineReady] = useState(false);

  // ── Detect backend on mount ──────────────────────────────────────────────
  // NOTE: We do NOT auto-select a default model. The user must explicitly
  // pick one from the catalog and click "Download". This avoids auto-
  // downloading a 400MB+ file on first visit.
  useEffect(() => {
    let cancelled = false;
    detectBackend().then((b) => {
      if (cancelled) return;
      setBackend(b);

      // Persist backend so we can validate the stored model id is compatible.
      try {
        localStorage.setItem(BACKEND_STORAGE_KEY, b);
      } catch {
        /* ignore */
      }

      // Restore previously-selected model from localStorage (if any).
      // We do NOT auto-pick a default — the user must opt in.
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          // First visit: no model selected. UI will show the catalog with
          // a "Choose a model to enable offline AI" prompt.
          return;
        }
        // Validate stored model exists in the active backend's catalog.
        // If the backend changed (e.g. GPU plugged in), the stored CPU model
        // id won't be in the GPU catalog — in that case we clear the
        // selection rather than silently switching models.
        const isValid =
          (b === 'gpu' && !!getGpuModel(stored)) ||
          (b === 'cpu' && !!getOfflineModel(stored));
        if (isValid) {
          setSelectedModelId(stored);
        }
        // else: leave selectedModelId null — user must pick a new model.
      } catch {
        /* localStorage may be unavailable in private mode */
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Online / offline detection ──────────────────────────────────────────
  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  // ── Sync engine status → React state (poll) ──────────────────────────────
  useEffect(() => {
    const tick = setInterval(() => {
      const engStatus: EngineStatus =
        (typeof window !== 'undefined' &&
          (window as unknown as { __offlineAIEngineStatus?: EngineStatus })
            .__offlineAIEngineStatus) ||
        'idle';
      setEngineReady(engStatus === 'ready');
    }, 500);
    return () => clearInterval(tick);
  }, []);

  // NOTE: No auto-prefetch. The user must explicitly click "Download" in the
  // settings UI to fetch a model. This prevents auto-downloading a 400MB+
  // file on first visit, and respects users who don't want offline AI or
  // want to choose a different model than the default.

  const models = backend === 'gpu' ? GPU_MODELS : backend === 'cpu' ? OFFLINE_MODELS : [];
  const selectedModel = selectedModelId
    ? (backend === 'gpu' ? getGpuModel(selectedModelId) : getOfflineModel(selectedModelId)) ?? null
    : null;

  // ── Actions ─────────────────────────────────────────────────────────────
  const selectModel = useCallback((modelId: string) => {
    // Validate against whichever backend is active (or both if still detecting)
    const inCpu = !!getOfflineModel(modelId);
    const inGpu = !!getGpuModel(modelId);
    if (!inCpu && !inGpu) return;
    try {
      localStorage.setItem(STORAGE_KEY, modelId);
    } catch {
      /* ignore */
    }
    setSelectedModelId(modelId);
    // Reset download state — user must click "Download" again to fetch the
    // newly selected model. We do NOT auto-download on selection.
    setStatus('idle');
    setDownloadProgress(0);
    setEngineReady(false);
  }, []);

  const download = useCallback(async () => {
    if (!selectedModel) {
      setStatusText('No model selected');
      return;
    }
    if (dispatcherIsLoaded(selectedModel.id)) {
      setStatus('ready');
      setDownloadProgress(1);
      setStatusText(`${selectedModel.name} ready`);
      return;
    }

    setStatus('downloading');
    setStatusText(`Starting download for ${selectedModel.name}…`);

    try {
      await dispatcherLoad(selectedModel, (p) => {
        setDownloadProgress(p.downloadProgress);
        setStatusText(p.status);
        setStatus(p.stage === 'ready' ? 'ready' : p.stage === 'loading-model' ? 'loading' : 'downloading');
        if (typeof window !== 'undefined') {
          (window as unknown as { __offlineAIEngineStatus?: EngineStatus }).__offlineAIEngineStatus = p.stage;
        }
      });
      setStatus('ready');
      setEngineReady(true);
      if (typeof window !== 'undefined') {
        (window as unknown as { __offlineAIEngineStatus?: EngineStatus }).__offlineAIEngineStatus = 'ready';
      }
    } catch (err) {
      console.error('[offline-ai] load failed:', err);
      setStatus('failed');
      setStatusText(
        err instanceof Error ? `Failed: ${err.message}` : 'Download failed',
      );
      if (typeof window !== 'undefined') {
        (window as unknown as { __offlineAIEngineStatus?: EngineStatus }).__offlineAIEngineStatus = 'failed';
      }
    }
  }, [selectedModel]);

  const chat = useCallback(
    async (
      messages: OfflineChatMessage[],
      opts?: {
        temperature?: number;
        topP?: number;
        maxTokens?: number;
        onToken?: (chunk: string) => void;
        signal?: AbortSignal;
      },
    ): Promise<string> => {
      if (!selectedModel) {
        throw new Error('No offline model selected');
      }
      if (!dispatcherIsLoaded(selectedModel.id)) {
        throw new Error('Offline model not loaded');
      }
      return dispatcherChat(messages, {
        temperature: opts?.temperature ?? selectedModel.temperature,
        topP: opts?.topP ?? selectedModel.topP,
        maxTokens: opts?.maxTokens,
        onToken: opts?.onToken,
        signal: opts?.signal,
      });
    },
    [selectedModel],
  );

  const shouldUseOfflineAI = !isOnline && engineReady;

  return {
    models,
    backend,
    selectedModel,
    isReady: engineReady,
    status,
    downloadProgress,
    statusText,
    isOnline,
    shouldUseOfflineAI,
    selectModel,
    download,
    chat,
  };
}

// ── Convenience: default model ids for first-time users ─────────────────────

export { DEFAULT_OFFLINE_MODEL_ID, DEFAULT_GPU_MODEL_ID };
