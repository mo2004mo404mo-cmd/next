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

import {
  isModelLoaded,
  chat as engineChat,
  detectBackend,
} from './dispatcher';
import { OFFLINE_CHAT_SYSTEM, OFFLINE_TERM_SYSTEM, OFFLINE_ANALYSIS_SYSTEM, OFFLINE_EXAM_SYSTEM } from './prompts';
import type { OfflineChatMessage } from './prompts';
import { retrieveContext, wireIdleWarmup as warmupRagEmbedder } from './rag';

const STORAGE_KEY = 'medq.offline-ai.model-id';

export interface OfflineRunOptions {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  onToken?: (chunk: string) => void;
  signal?: AbortSignal;
  /**
   * Whether to reuse the wllama KV cache from the prior call. Default true.
   * Set to false when the conversation topic changes.
   */
  preserveSession?: boolean;
  /**
   * Whether to use RAG retrieval to augment the prompt with locally-indexed
   * context. Default true for chat/term lookups, false for exam generation
   * (which needs creative generation, not retrieval).
   */
  useRAG?: boolean;
  /**
   * Restrict RAG retrieval to these source namespaces (e.g. ['qbank', 'drugs']).
   * Default undefined = search all sources.
   */
  ragSources?: string[];
}

/**
 * Returns true if the device is currently offline AND a model is loaded
 * in the engine (either GPU or CPU backend). Callers should check this
 * before attempting a cloud fetch.
 */
export function shouldUseOfflineAI(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (navigator.onLine) return false;

  let modelId: string | null = null;
  try {
    modelId = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* localStorage unavailable */
  }
  if (!modelId) return false;
  return isModelLoaded(modelId);
}

/**
 * Trigger backend detection early (e.g. on app boot) so that the GPU
 * probe runs in the background and is cached by the time the user
 * opens the settings UI. Safe to call multiple times.
 *
 * Also warms up the RAG embedder (transformers.js pipeline) on idle so
 * the first RAG-augmented chat has no 5-8s cold start.
 */
export async function prewarmBackend(): Promise<'gpu' | 'cpu'> {
  // Fire-and-forget the RAG embedder warmup. We deliberately don't await
  // it — the backend probe should not block on the 23MB embedder download.
  // The warmup runs on idle and is silent on failure.
  try {
    warmupRagEmbedder();
  } catch {
    /* ignore — embedder warmup is best-effort */
  }
  return detectBackend();
}

/**
 * Run an offline chat completion. Returns the full text.
 * Throws if no model is loaded.
 *
 * When `opts.useRAG` is true (default), retrieves relevant chunks from
 * the local vector store and injects them as an extra system message
 * before generation. The retrieval is best-effort — if the embedder
 * fails or the store is empty, the call proceeds without RAG.
 */
export async function runOfflineChat(
  messages: OfflineChatMessage[],
  opts: OfflineRunOptions = {},
): Promise<string> {
  const useRAG = opts.useRAG !== false;
  let finalMessages = messages;

  if (useRAG) {
    // Find the user's last message to use as the retrieval query.
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUser) {
      try {
        const { context } = await retrieveContext(lastUser.content, {
          sources: opts.ragSources,
          topK: 4,
          minScore: 0.20,
        });
        if (context) {
          // Inject retrieved context as a system message right before the
          // user's question. Keep the original system prompt first so the
          // model retains its role/persona.
          const ragMsg: OfflineChatMessage = {
            role: 'system',
            content:
              `Relevant context from the user's local knowledge base (MedQ RAG):\n${context}\n\n` +
              `Use this context to ground your answer. Cite by [1], [2] etc. when quoting. ` +
              `If the context conflicts with your knowledge, prefer the context.`,
          };
          // Insert after the original system prompt (which is typically messages[0]).
          const sysIdx = messages.findIndex((m) => m.role === 'system');
          if (sysIdx >= 0) {
            finalMessages = [
              ...messages.slice(0, sysIdx + 1),
              ragMsg,
              ...messages.slice(sysIdx + 1),
            ];
          } else {
            finalMessages = [ragMsg, ...messages];
          }
        }
      } catch (err) {
        console.warn('[offline-ai] RAG retrieval failed, proceeding without context:', err);
      }
    }
  }

  return engineChat(finalMessages, opts);
}

// ── Convenience wrappers for each AI mode ───────────────────────────────────

export async function offlineChatAnswer(
  userPrompt: string,
  history: OfflineChatMessage[] = [],
  opts?: OfflineRunOptions,
): Promise<string> {
  return runOfflineChat(
    [
      { role: 'system', content: OFFLINE_CHAT_SYSTEM },
      ...history.slice(-4),
      { role: 'user', content: userPrompt },
    ],
    // RAG defaults to true for chat — most useful for medical Q&A.
    { maxTokens: 384, useRAG: true, ...opts },
  );
}

export async function offlineTermLookup(
  term: string,
  opts?: OfflineRunOptions,
): Promise<string> {
  return runOfflineChat(
    [
      { role: 'system', content: OFFLINE_TERM_SYSTEM },
      { role: 'user', content: term },
    ],
    // Term lookups benefit hugely from RAG — the local medical dictionary
    // is more authoritative than a small model's parametric memory.
    { maxTokens: 120, useRAG: true, ...opts },
  );
}

export async function offlineExamQuestion(
  topicPrompt: string,
  opts?: OfflineRunOptions,
): Promise<string> {
  return runOfflineChat(
    [
      { role: 'system', content: OFFLINE_EXAM_SYSTEM },
      { role: 'user', content: topicPrompt },
    ],
    // Exam generation needs creative generation, not retrieval — RAG would
    // just copy existing questions from the qbank. Default useRAG: false.
    { maxTokens: 256, useRAG: false, ...opts },
  );
}

export async function offlinePerformanceAnalysis(
  performanceSummary: string,
  opts?: OfflineRunOptions,
): Promise<string> {
  return runOfflineChat(
    [
      { role: 'system', content: OFFLINE_ANALYSIS_SYSTEM },
      { role: 'user', content: performanceSummary },
    ],
    // Performance analysis doesn't benefit from RAG — it's about the user's
    // own quiz data, not the medical knowledge base.
    { maxTokens: 200, useRAG: false, ...opts },
  );
}

export { OFFLINE_CHAT_SYSTEM, OFFLINE_TERM_SYSTEM, OFFLINE_ANALYSIS_SYSTEM, OFFLINE_EXAM_SYSTEM };
