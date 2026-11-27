/**
 * knowledge/llm.ts — best-effort LLM helper for the knowledge/RAG subsystem.
 *
 * Unlike question-agent (which always has a NextRequest), the knowledge
 * pipeline is called from three contexts:
 *   1. API routes (have a request — x-model / BYOK resolution available)
 *   2. Background ingestion jobs (no request)
 *   3. Deep-agent tools (no request)
 *
 * Resolution order:
 *   request present → callChat (full provider chain: MODEL_ROUTES > x-model >
 *   DEFAULT_MODEL > BYOK > auto-detect)
 *   no request      → auto-detect a provider (env keys / Ollama) once, cache
 *                     the resolved model on globalThis, then callLLM.
 *
 * Every failure degrades to `null` — retrieval enrichment and reranking are
 * accuracy BOOSTERS, never hard dependencies: the pipeline must stay
 * functional with zero LLM access (pure BM25 + local-hash embeddings).
 */

import type { NextRequest } from 'next/server';
import { createLogger } from '../../logger';

const log = createLogger('KnowledgeLLM');

export interface KnowledgeLLMOptions {
  request?: NextRequest;
  system?: string;
  prompt: string;
  maxOutputTokens?: number;
  temperature?: number;
  /** 15s budget — enrichment/rerank calls must never stall a route. */
  timeoutMs?: number;
}

export interface KnowledgeLLMContext {
  /** true once a providerless (auto-detect) call has succeeded — lets UI show which mode RAG ran in. */
  available: boolean;
}

const runtime = globalThis as typeof globalThis & {
  __medqKnowledgeModel?: { model: unknown; modelString: string } | null;
};

async function resolveAutoModel(): Promise<{ model: unknown; modelString: string } | null> {
  if (runtime.__medqKnowledgeModel !== undefined) {
    return runtime.__medqKnowledgeModel ?? null;
  }
  try {
    const { resolveModel } = await import('../../server/resolve-model');
    const { autoDetectDefaultModel } = await import('../../ai/auto-detect');
    const auto = await autoDetectDefaultModel();
    const modelString = `${auto.providerId}:${auto.modelId}`;
    const resolved = await resolveModel({ modelString, stage: 'chat-adapter' });
    runtime.__medqKnowledgeModel = { model: resolved.model, modelString };
    return runtime.__medqKnowledgeModel;
  } catch (error) {
    runtime.__medqKnowledgeModel = null;
    log.warn?.(`knowledge LLM auto-detect failed: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

/**
 * Call an LLM for a knowledge-pipeline task. Returns null on ANY failure —
 * callers must treat LLM enrichment as optional.
 *
 * Chain: request → callChat · no request → auto-detect + callLLM ·
 * final fallback → z-ai-web-dev-sdk chat (managed sandbox provider).
 */
export async function knowledgeLLM(options: KnowledgeLLMOptions): Promise<string | null> {
  const { request, system, prompt, maxOutputTokens, temperature } = options;
  const timeoutMs = options.timeoutMs ?? 15_000;

  const race = <T,>(p: Promise<T>): Promise<T> =>
    Promise.race([
      p,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('knowledge LLM timeout')), timeoutMs),
      ),
    ]);

  try {
    if (request) {
      const { callChat } = await import('../../ai/unified-llm');
      const text = await race(
        callChat(request, { system, prompt, stage: 'chat-adapter', maxOutputTokens, temperature }),
      );
      if (text && text.trim()) return text;
      return null;
    }

    const resolved = await resolveAutoModel();
    if (resolved) {
      const { callLLM } = await import('../../ai/llm');
      const result = await race(
        callLLM(
          {
            model: resolved.model as Parameters<typeof callLLM>[0]['model'],
            ...(system ? { system } : {}),
            messages: [{ role: 'user' as const, content: prompt }],
            ...(maxOutputTokens ? { maxOutputTokens } : {}),
            ...(temperature != null ? { temperature } : {}),
          },
          'knowledge-rag',
        ),
      );
      const text = result?.text || '';
      if (text.trim()) return text;
    }

    // Final fallback: managed ZAI SDK (works out-of-the-box on this platform).
    return await zaiSdkChat(system, prompt, timeoutMs);
  } catch (error) {
    log.warn?.(`knowledge LLM call failed: ${error instanceof Error ? error.message : error}`);
    // Even on provider errors, try the SDK once before giving up.
    try {
      return await zaiSdkChat(system, prompt, Math.min(timeoutMs, 12_000));
    } catch {
      return null;
    }
  }
}

const sdkZai = globalThis as typeof globalThis & { __medqZaiChat?: Promise<unknown> };

/** Direct z-ai-web-dev-sdk chat call — the always-available managed provider.
 *  Retries once after a short backoff: the sandbox gateway occasionally
 *  burst-429s (observed in live E2E), and a 1.5s later attempt usually
 *  passes — turning a failed rerank/enrichment into a delayed success. */
async function zaiSdkChat(system: string | undefined, prompt: string, timeoutMs: number): Promise<string | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      if (attempt > 0) await new Promise((r) => setTimeout(r, 1500));
      if (!sdkZai.__medqZaiChat) {
        sdkZai.__medqZaiChat = import('z-ai-web-dev-sdk').then((mod) => {
          const ZAI = (mod as { default?: { create: () => Promise<unknown> } }).default;
          if (!ZAI?.create) throw new Error('z-ai-web-dev-sdk unavailable');
          return ZAI.create();
        });
        sdkZai.__medqZaiChat.catch(() => {
          sdkZai.__medqZaiChat = undefined; // allow retry on next call
        });
      }
      const zai = (await sdkZai.__medqZaiChat) as {
        chat: { completions: { create: (body: Record<string, unknown>) => Promise<{ choices?: Array<{ message?: { content?: string } }> }> } };
      };
      const completion = await Promise.race([
        zai.chat.completions.create({
          messages: [
            ...(system ? [{ role: 'system' as const, content: system }] : []),
            { role: 'user' as const, content: prompt },
          ],
          thinking: { type: 'disabled' },
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('SDK chat timeout')), timeoutMs)),
      ]);
      const content = completion.choices?.[0]?.message?.content || '';
      if (content.trim()) return content;
      return null;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const retryable = /429|too many|rate|timeout|econn/i.test(msg);
      if (attempt === 0 && retryable) continue;
      return null;
    }
  }
  return null;
}

/** Probe whether the knowledge LLM is usable (auto-detect or SDK path). */
export async function knowledgeLLMAvailable(): Promise<boolean> {
  const model = await resolveAutoModel();
  if (model) return true;
  const probe = await zaiSdkChat(undefined, 'Reply with the word OK.', 8000);
  return probe !== null;
}
