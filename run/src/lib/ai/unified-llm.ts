/**
 * Unified LLM Helper — the single entry point for API routes.
 *
 * This module wraps `resolveModelFromRequest` + `callLLM`/`streamLLM` into
 * simple one-call APIs so individual route files don't need to import
 * resolve-model, llm, provider-config, thinking-context, etc.
 *
 * Migration pattern for routes that previously used ZAI directly:
 *
 *   // BEFORE (ZAI, sandbox-only):
 *   const ZAI = (await import('z-ai-web-dev-sdk')).default;
 *   const zai = await ZAI.create();
 *   const completion = await zai.chat.completions.create({
 *     messages: [{ role: 'system', content: SYS }, { role: 'user', content: prompt }],
 *   });
 *   const text = completion.choices[0]?.message?.content || '';
 *
 *   // AFTER (provider-agnostic, works with any configured provider):
 *   import { callChat } from '@/lib/ai/unified-llm';
 *   const text = await callChat(req, { system: SYS, prompt, stage: 'chat-adapter' });
 *
 * The resolved provider respects: stage routes (MODEL_ROUTES) > x-model header >
 * DEFAULT_MODEL env > auto-detect (Ollama → env keys → ZAI).
 *
 * ── MULTI-ENDPOINT BYOK FAILOVER (callChat only) ──
 * When the resolved model came from one of the user's saved endpoints
 * (UserApiKey rows — e.g. a remote Ollama + a local Ollama, or two OpenAI
 * keys) and the call FAILS, callChat transparently re-resolves the model on
 * the user's NEXT endpoint and retries — up to one attempt per endpoint.
 * The user's endpoints are tried round-robin as the STARTING point, so load
 * also spreads across keys over time. Streaming (streamChat) resolves a
 * single endpoint per stream — failover is not possible once bytes have
 * started flowing, so it is deliberately not attempted there.
 */

import type { NextRequest } from 'next/server';
import { resolveModelFromRequest, resolveModel } from '@/lib/server/resolve-model';
import { callLLM, streamLLM } from '@/lib/ai/llm';
import { autoDetectDefaultModel } from '@/lib/ai/auto-detect';
import { parseModelString } from '@/lib/ai/providers';
import type { LlmStage } from '@/lib/server/model-routes';
import { logAiCall, extractUsage } from '@/lib/server/ai-call-log';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { createLogger } from '@/lib/logger';

const log = createLogger('UnifiedLLM');

export interface ChatOptions {
  /** System prompt (role: system). */
  system?: string;
  /** User prompt (role: user). If provided, takes precedence over `messages`. */
  prompt?: string;
  /** Full message array (alternative to system+prompt). */
  messages?: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  /** Generation stage — used for MODEL_ROUTES routing. */
  stage?: LlmStage;
  /** Max output tokens. */
  maxOutputTokens?: number;
  /** Temperature (0-2). */
  temperature?: number;
  /** Top-p. */
  topP?: number;
  /** Stop sequences. */
  stopSequences?: string[];
  /** Retry options for validation failures. */
  retries?: number;
  validate?: (text: string) => boolean;
  /**
   * Max NETWORK-level retries for the AI SDK (default: 2 → 3 attempts).
   * Set 0 to fail fast — important on routes that must answer before the
   * preview proxy's ~60s gateway timeout, otherwise one backend hiccup
   * becomes a multi-minute retry crawl and the user sees a bare 502.
   */
  maxRetries?: number;
  /** Abort signal forwarded to the provider fetch (route-level time budget). */
  abortSignal?: AbortSignal;
}

/** Resolve the model for a call — same logic for first attempt and failover
 *  attempts (the slot pins WHICH user endpoint provides key/baseUrl). */
async function resolveForCall(
  req: NextRequest,
  body: unknown,
  stage: LlmStage | undefined,
  byokSlot?: number,
) {
  let resolved = await resolveModelFromRequest(req, body, stage, byokSlot);
  // If resolution fails because no model is configured, try auto-detect
  if (!resolved && !process.env.DEFAULT_MODEL) {
    const auto = await autoDetectDefaultModel();
    resolved = await resolveModel({
      modelString: `${auto.providerId}:${auto.modelId}`,
      stage,
      _req: req,
      ...(byokSlot != null ? { byokSlot } : {}),
    });
  }
  return resolved;
}

/**
 * Call the LLM with a chat completion and return the text response.
 *
 * This is the primary replacement for `zai.chat.completions.create()`.
 * On a failed call, if the model was resolved from one of the user's
 * multiple saved endpoints, the remaining endpoints are tried in order
 * before the error surfaces (transparent failover).
 *
 * @param req The NextRequest (used to read x-model, x-api-key headers + auth)
 * @param options Chat parameters (system, prompt, stage, etc.)
 * @returns The generated text (empty string if no content)
 */
export async function callChat(
  req: NextRequest,
  options: ChatOptions,
): Promise<string> {
  const body = options.messages ? { thinkingConfig: undefined } : {};

  const messages = options.messages || [
    ...(options.prompt ? [{ role: 'user' as const, content: options.prompt }] : []),
  ];

  if (messages.length === 0 && !options.system) {
    throw new Error('callChat requires either `prompt`, `messages`, or `system`+`prompt`');
  }

  // ── Analytics attribution ──
  // Resolve the requesting user once so telemetry rows can be attributed even
  // when the call runs on server-managed keys (where resolve-model never looks
  // up the user). Best-effort: never blocks or fails the call.
  const attributionUserId = await getAuthenticatedUserId(req).catch(() => null);

  // ── Multi-endpoint failover ──
  // Covers BOTH failure points: model RESOLUTION (bad/SSRF-rejected endpoint
  // URL throws inside resolveForCall) and the CALL itself (transport/5xx).
  // Optimistic ceiling until a successful resolution tells us the real count.
  const OPTIMISTIC_ENDPOINT_CEILING = 6;
  let endpointCount = OPTIMISTIC_ENDPOINT_CEILING;
  let startSlot: number | null = null;
  let lastErr: unknown = undefined;

  for (let attempt = 0; attempt < endpointCount; attempt++) {
    let attemptResolved: NonNullable<Awaited<ReturnType<typeof resolveForCall>>>;

    // Pin the slot once we know it (post-first-success) so failover walks the
    // endpoint list deterministically; before that, resolution round-robins.
    const pinSlot = startSlot != null ? (startSlot + attempt) % endpointCount : undefined;
    try {
      const r = await resolveForCall(req, body, options.stage, pinSlot);
      if (!r) throw new Error('Model resolution returned nothing');
      attemptResolved = r;
      if (attemptResolved.byok) {
        endpointCount = attemptResolved.byok.endpointCount;
        startSlot = attemptResolved.byok.slot;
        // Clamp the loop if the count shrank (endpoint deleted mid-flight).
        if (attempt >= endpointCount) break;
      }
    } catch (e) {
      lastErr = e;
      const canFailOver =
        endpointCount > 1 && attempt < endpointCount - 1 && !(options.abortSignal?.aborted === true);
      if (!canFailOver) throw e;
      log.warn(
        `[callChat] model resolution failed on endpoint attempt ${attempt + 1}` +
        ` (${e instanceof Error ? e.message : e}) — trying the next endpoint`,
      );
      continue;
    }

    if (attempt > 0) {
      log.info(
        `[callChat] failing over to ${attemptResolved.providerId}:${attemptResolved.modelId}` +
        ` endpoint ${((attemptResolved.byok?.slot ?? 0) + 1)}/${endpointCount}` +
        `${attemptResolved.baseUrl ? ` (${attemptResolved.baseUrl})` : ''}`,
      );
    }

    try {
      const callStartedAt = Date.now();
      const result = await callLLM(
        {
          model: attemptResolved.model,
          ...(options.system ? { system: options.system } : {}),
          messages,
          ...(options.maxOutputTokens ? { maxOutputTokens: options.maxOutputTokens } : {}),
          ...(options.temperature != null ? { temperature: options.temperature } : {}),
          ...(options.topP != null ? { topP: options.topP } : {}),
          ...(options.stopSequences?.length ? { stopSequences: options.stopSequences } : {}),
          ...(options.maxRetries != null ? { maxRetries: options.maxRetries } : {}),
          ...(options.abortSignal ? { abortSignal: options.abortSignal } : {}),
        },
        options.stage || 'chat-adapter',
        options.retries != null
          ? { retries: options.retries, validate: options.validate }
          : undefined,
        attemptResolved.thinkingConfig,
      );
      // ── Analytics: success telemetry (fire-and-forget) ──
      const usage = extractUsage(result);
      logAiCall({
        userId: attemptResolved.byok?.userId ?? attributionUserId,
        providerId: attemptResolved.providerId,
        modelId: attemptResolved.modelId,
        stage: options.stage || null,
        status: 'success',
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        latencyMs: Date.now() - callStartedAt,
        endpointRowId: attemptResolved.byok?.rowId ?? null,
      });
      return result.text || '';
    } catch (err) {
      lastErr = err;
      // ── Analytics: error telemetry for THIS endpoint attempt ──
      logAiCall({
        userId: attemptResolved.byok?.userId ?? attributionUserId,
        providerId: attemptResolved.providerId,
        modelId: attemptResolved.modelId,
        stage: options.stage || null,
        status: 'error',
        latencyMs: null,
        error: err instanceof Error ? err.message : String(err),
        endpointRowId: attemptResolved.byok?.rowId ?? null,
      });
      const canFailOver =
        endpointCount > 1 &&
        attempt < endpointCount - 1 &&
        !(options.abortSignal?.aborted === true);
      if (!canFailOver) throw err;
      log.warn(
        `[callChat] endpoint ${startSlot != null ? startSlot + 1 : attempt + 1}/${endpointCount} failed` +
        ` (${err instanceof Error ? err.message : err}) — trying the next endpoint`,
      );
      // Loop continues with the next slot.
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('callChat failed on every endpoint');
}

/**
 * Stream the LLM response. Returns a Vercel AI SDK StreamTextResult.
 *
 * Use this for streaming chat UIs (e.g. tutor chat, performance coach).
 * NOTE: single endpoint per stream — no failover once the stream opens
 * (see the module header).
 *
 * @param req The NextRequest
 * @param options Chat options
 */
export function streamChat(
  req: NextRequest,
  options: ChatOptions,
) {
  // Note: streamChat is synchronous in its return but async in setup.
  // We resolve the model first, then return the stream.
  return (async () => {
    const body = options.messages ? { thinkingConfig: undefined } : {};
    let resolved = await resolveModelFromRequest(req, body, options.stage);

    if (!resolved && !process.env.DEFAULT_MODEL) {
      const auto = await autoDetectDefaultModel();
      resolved = await resolveModel({
        modelString: `${auto.providerId}:${auto.modelId}`,
        stage: options.stage,
        _req: req,
      });
    }

    const messages = options.messages || [
      ...(options.prompt ? [{ role: 'user' as const, content: options.prompt }] : []),
    ];

    return streamLLM(
      {
        model: resolved.model,
        ...(options.system ? { system: options.system } : {}),
        messages,
        ...(options.maxOutputTokens ? { maxOutputTokens: options.maxOutputTokens } : {}),
        ...(options.temperature != null ? { temperature: options.temperature } : {}),
        ...(options.topP != null ? { topP: options.topP } : {}),
        ...(options.stopSequences?.length ? { stopSequences: options.stopSequences } : {}),
      },
      options.stage || 'chat-adapter',
      resolved.thinkingConfig,
    );
  })();
}

/**
 * Call the LLM with explicit messages (for multi-turn conversations).
 *
 * Alias for `callChat(req, { messages, ... })`.
 */
export async function callChatMessages(
  req: NextRequest,
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options: Omit<ChatOptions, 'messages' | 'system' | 'prompt'> = {},
): Promise<string> {
  return callChat(req, { ...options, messages });
}

/**
 * Resolve the default model string for a stage, using auto-detect if needed.
 * Useful for routes that need to know the provider before calling.
 */
export async function resolveDefaultModelString(stage?: LlmStage): Promise<string> {
  // Check if a stage route is configured
  if (stage) {
    const { getStageRoute } = await import('@/lib/server/model-routes');
    const route = getStageRoute(stage);
    if (route?.model) return route.model;
  }
  // Check DEFAULT_MODEL env
  if (process.env.DEFAULT_MODEL) return process.env.DEFAULT_MODEL;
  // Auto-detect
  const auto = await autoDetectDefaultModel();
  return `${auto.providerId}:${auto.modelId}`;
}

export { parseModelString };
export type { LlmStage };
