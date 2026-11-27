/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/classroom-generation.ts (AICallFn implementation)
 *
 * ZAI-backed `AICallFn` factory.
 *
 * OpenMAIC's `classroom-generation.ts` constructs an `AICallFn` inline by
 * calling `callLLM` from `@/lib/ai/llm` (which wraps Vercel AI SDK's
 * `generateText` for OpenAI/Anthropic/Google/…). MedQ has no `@/lib/ai/llm`
 * and uses the ZAI SDK exclusively (`z-ai-web-dev-sdk`). This module
 * implements the same `AICallFn` contract — `(systemPrompt, userPrompt,
 * images?) => Promise<string>` — by wrapping `zai.chat.completions.create`.
 *
 * The factory is a thin function so callers can pass per-request options
 * (model id, thinking config) without re-reading `.z-ai-config` on every
 * call. The ZAI client is created lazily on first invocation.
 */

import { createZAI, readConfig } from '@/lib/zai';
import type { AICallFn } from '@/lib/generation/pipeline-types';
import type { ThinkingConfig } from '@/lib/types/provider';
import { createLogger } from '@/lib/logger';

const log = createLogger('ZaiAICall');

type ZaiClientLike = {
  chat: {
    completions: {
      create: (body: Record<string, unknown>) => Promise<any>;
    };
  };
};

async function loadZaiSdk(): Promise<ZaiClientLike | null> {
  try {
    const loader = new Function('return import("z-ai-web-dev-sdk")') as () => Promise<{
      default?: (new () => ZaiClientLike) & { create?: () => Promise<ZaiClientLike> };
    }>;
    const mod = await loader();
    const ZaiClass = mod?.default ?? mod ?? null;
    if (!ZaiClass) return null;
    // The SDK exports the ZAI class; obtain an instance via its static
    // create() factory (reads .z-ai-config itself). Older builds exported a
    // ready-made instance — support both shapes.
    const instance =
      typeof (ZaiClass as { create?: () => Promise<ZaiClientLike> }).create === 'function'
        ? await (ZaiClass as unknown as { create: () => Promise<ZaiClientLike> }).create()
        : (ZaiClass as unknown as ZaiClientLike);
    if (!instance || !instance.chat || !instance.chat.completions || typeof instance.chat.completions.create !== 'function') {
      return null;
    }
    return instance as ZaiClientLike;
  } catch {
    return null;
  }
}

export interface CreateZaiAICallFnOptions {
  /**
   * Model id to pass to ZAI's `chat.completions.create`. Defaults to `'auto'`
   * (ZAI's router picks the best model).
   */
  model?: string;
  /**
   * Optional per-call thinking config. MedQ's ZAI adapter only reads
   * `enabled` (and translates it to `thinking: { type: 'enabled' | 'disabled' }`).
   * Default is `{ enabled: false }` (low-latency chat).
   */
  thinking?: ThinkingConfig;
  /**
   * Optional override for the ZAI token. If omitted, the factory reads the
   * token from `.z-ai-config` (see `@/lib/zai.ts`).
   */
  token?: string;
  /**
   * Optional signal for aborting the request. Forwarded to ZAI's underlying
   * fetch call. (Note: `z-ai-web-dev-sdk` does not officially document
   * `signal` support; passing it is a no-op if the SDK ignores it.)
   */
  signal?: AbortSignal;
}

/**
 * Build an `AICallFn` backed by ZAI's chat completions API.
 *
 * The returned function:
 *   1. Lazily creates a ZAI client (cached across calls within the same
 *      factory instance — one client per `createZaiAICallFn` call).
 *   2. Calls `zai.chat.completions.create({ model, messages, thinking })`.
 *   3. Returns the assistant message's `content` string.
 *
 * Images (the optional third `AICallFn` argument) are currently ignored:
 * MedQ's ZAI adapter does not yet wire ZAI's vision API into the AICallFn
 * path. The ported generation pipeline degrades gracefully when vision is
 * unavailable — outline-generator and scene-generator fall back to text-only
 * descriptions.
 */
export function createZaiAICallFn(
  options: CreateZaiAICallFnOptions = {},
): AICallFn {
  const model = options.model || 'auto';
  const thinkingEnabled = options.thinking?.enabled ?? false;

  // Lazily-created ZAI client — shared across all calls made by this factory.
  let zaiPromise: Promise<ZaiClientLike> | null = null;
  const getZai = (): Promise<ZaiClientLike> => {
    if (!zaiPromise) {
      const token = options.token ?? readConfig()?.token;
      zaiPromise = (async () => {
        const sdk = await loadZaiSdk();
        if (!sdk) {
          throw new Error('This project is set up for the BYOK/provider flow and does not include the missing ZAI SDK.');
        }
        return sdk;
      })();
    }
    return zaiPromise;
  };

  const aiCall: AICallFn = async (
    systemPrompt,
    userPrompt,
    _images,
  ): Promise<string> => {
    const zai = await getZai();

    const completion = await zai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      thinking: { type: thinkingEnabled ? 'enabled' : 'disabled' },
      // The SDK does not officially document `signal`, but forwarding it is
      // harmless and unlocks abort support if/when the SDK adds it.
      ...(options.signal ? { signal: options.signal } : {}),
    } as Parameters<typeof zai.chat.completions.create>[0]);

    const content = completion.choices?.[0]?.message?.content || '';
    if (!content) {
      log.warn('ZAI returned an empty response', {
        model,
        systemPromptLength: systemPrompt.length,
        userPromptLength: userPrompt.length,
      });
    }
    return content;
  };

  return aiCall;
}

/**
 * Default ZAI-backed AICallFn. Created lazily on first call (so server-side
 * import never triggers a config-file read or network call). Use this when
 * you don't need per-request options — e.g. a one-off generation pipeline
 * invocation. For routes that want to control the model or thinking config,
 * call `createZaiAICallFn({ model, thinking })` instead.
 */
let _defaultAiCall: AICallFn | null = null;
export function getDefaultZaiAICallFn(): AICallFn {
  if (!_defaultAiCall) {
    _defaultAiCall = createZaiAICallFn();
  }
  return _defaultAiCall;
}

// ===========================================================================
// Streaming variant — `OrchestrationAICallFn` shape used by the chat route
// ===========================================================================

import type { OrchestrationAICallFn } from '@/lib/orchestration/director-graph';
import type { StreamChunk } from '@/lib/orchestration/ai-sdk-adapter';

export interface CreateZaiStreamFnOptions {
  /** Model id passed to ZAI's `chat.completions.create`. Defaults to `'auto'`. */
  model?: string;
  /** Per-call thinking config. Only `enabled` is honored by ZAI. */
  thinking?: ThinkingConfig;
  /** Override token (otherwise read from `.z-ai-config`). */
  token?: string;
}

/**
 * Build a streaming `OrchestrationAICallFn` backed by ZAI's chat completions
 * API.
 *
 * The returned function accepts a full message list (system / user /
 * assistant turns) and yields `StreamChunk` events:
 *   - `{ type: 'delta', content }` for each streamed text chunk
 *   - `{ type: 'done', content }` once with the full concatenated text
 *   - `{ type: 'error', message }` (NOT a `StreamChunk` variant — emitted
 *     via `log.error` and re-thrown) if ZAI fails
 *
 * This is the shape consumed by the ported `statelessGenerate` orchestration
 * loop (via `AISdkLangGraphAdapter`), so the chat route can pass it directly
 * as the `aiCallFn` argument and skip the (absent) `LanguageModel` path.
 *
 * Implementation note: `z-ai-web-dev-sdk`'s `chat.completions.create` returns
 * the raw `ReadableStream<Uint8Array>` (OpenAI-compatible SSE bytes) when the
 * request body carries `stream: true` AND the response content-type is
 * `text/event-stream` or `text/plain`. We parse the SSE stream incrementally:
 *
 *   1. Read bytes from the stream into a TextDecoder (streaming mode).
 *   2. Split on `\n\n` to extract SSE events.
 *   3. For each event, parse `data:` lines as JSON (OpenAI ChatCompletionChunk
 *      shape: `choices[0].delta.content` is the incremental text). The
 *      sentinel `data: [DONE]` marks end-of-stream.
 *   4. Yield each non-empty `delta.content` as `{ type: 'delta', content }`.
 *   5. Yield the full concatenated text as `{ type: 'done', content }` at end.
 *
 * If `stream: true` is rejected (HTTP non-ok or non-SSE content-type), we
 * fall back to a single non-streaming request and yield one delta + done —
 * matching the original (pre-streaming) behavior.
 *
 * Errors are logged via the `ZaiAICall` logger and re-thrown so the
 * ported `statelessGenerate` orchestration loop can surface them in the SSE
 * error event. The chat route's outer try/catch converts the thrown error
 * into a `{ type: 'error' }` SSE event.
 */
export function createZaiStreamFn(
  options: CreateZaiStreamFnOptions = {},
): OrchestrationAICallFn {
  const model = options.model || 'auto';
  const thinkingEnabled = options.thinking?.enabled ?? false;

  let zaiPromise: Promise<ZaiClientLike> | null = null;
  const getZai = (): Promise<ZaiClientLike> => {
    if (!zaiPromise) {
      const token = options.token ?? readConfig()?.token;
      zaiPromise = (async () => {
        const sdk = await loadZaiSdk();
        if (!sdk) {
          throw new Error('This project is set up for the BYOK/provider flow and does not include the missing ZAI SDK.');
        }
        return sdk;
      })();
    }
    return zaiPromise;
  };

  const streamFn: OrchestrationAICallFn = async function* (
    messages,
    callOptions,
  ): AsyncGenerator<StreamChunk> {
    const zai = await getZai();

    // The ZAI SDK type signature only declares `create(body) => Promise<any>`,
    // but the runtime implementation returns a `ReadableStream<Uint8Array>`
    // when `body.stream === true` and the server responds with an SSE content
    // type. The cast through `unknown` lets us accept either shape.
    const response: unknown = await zai.chat.completions.create({
      model,
      messages,
      stream: true,
      thinking: { type: thinkingEnabled ? 'enabled' : 'disabled' },
      ...(callOptions?.signal ? { signal: callOptions.signal } : {}),
    } as Parameters<typeof zai.chat.completions.create>[0]);

    // Streaming path: `response` is a `ReadableStream<Uint8Array>` (browser /
    // Node 18 web streams). The SDK only returns this shape when the server
    // responded with `text/event-stream` or `text/plain` to a `stream:true`
    // request; otherwise it returns a parsed JSON object.
    if (response && typeof (response as ReadableStream<Uint8Array>).getReader === 'function') {
      let fullText = '';
      try {
        for await (const chunk of sseDeltaIterator(
          response as ReadableStream<Uint8Array>,
          callOptions?.signal,
        )) {
          if (chunk) {
            fullText += chunk;
            yield { type: 'delta', content: chunk };
          }
        }
      } catch (error) {
        log.error('ZAI stream interrupted:', error);
        // Yield whatever we accumulated so the consumer can salvage partial
        // output, then re-throw so the orchestration loop surfaces the error.
        if (fullText) {
          // We already streamed deltas; do NOT yield a duplicate delta here.
        }
        throw error;
      }
      yield { type: 'done', content: fullText };
      return;
    }

    // Fallback path: server returned a regular JSON object (either `stream:
    // false` was ignored or the endpoint doesn't support SSE). This mirrors
    // the original non-streaming behavior.
    log.warn(
      'ZAI did not return a ReadableStream — falling back to non-streaming path',
    );
    const completion = response as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = completion.choices?.[0]?.message?.content || '';
    if (content) {
      yield { type: 'delta', content };
    }
    yield { type: 'done', content };
  };

  return streamFn;
}

/**
 * Iterate over an SSE-encoded `ReadableStream<Uint8Array>` and yield
 * incremental text deltas (parsed from OpenAI-compatible
 * `ChatCompletionChunk.choices[0].delta.content`).
 *
 * Handles:
 *   - partial chunks split across stream reads (the SSE parser buffers
 *     incomplete events until the next `\n\n` boundary)
 *   - the `data: [DONE]` sentinel
 *   - comment lines (`: heartbeat` etc.) — ignored
 *   - abort via the optional `signal` (re-throws `AbortError`)
 */
async function* sseDeltaIterator(
  stream: ReadableStream<Uint8Array>,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      if (signal?.aborted) {
        await reader.cancel().catch(() => undefined);
        throw new DOMException('Aborted', 'AbortError');
      }
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // SSE events are separated by a blank line. Process all complete
      // events in the buffer; leave the trailing partial in `buffer`.
      let sepIndex: number;
      while ((sepIndex = buffer.indexOf('\n\n')) !== -1) {
        const rawEvent = buffer.slice(0, sepIndex);
        buffer = buffer.slice(sepIndex + 2);
        const delta = parseSseEventForDelta(rawEvent);
        if (delta !== null) yield delta;
      }
    }
    // Flush any remaining buffered event (some servers omit the trailing
    // `\n\n` after `[DONE]`).
    if (buffer.trim()) {
      const delta = parseSseEventForDelta(buffer);
      if (delta !== null) yield delta;
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      /* already released */
    }
  }
}

/**
 * Parse a single SSE event (already split on `\n\n`) into the incremental
 * text delta. Returns `null` for:
 *   - comment lines (starting with `:`)
 *   - events without a `data:` line
 *   - the `[DONE]` sentinel
 *   - non-delta JSON shapes (e.g. role-only chunks, tool_calls chunks)
 */
function parseSseEventForDelta(rawEvent: string): string | null {
  const lines = rawEvent.split('\n');
  const dataLines: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(':')) continue;
    if (trimmed.startsWith('data:')) {
      dataLines.push(trimmed.slice(5).trimStart());
    }
    // Other SSE fields (`event:`, `id:`, `retry:`) are ignored.
  }
  if (dataLines.length === 0) return null;
  const dataStr = dataLines.join('\n');
  if (dataStr === '[DONE]') return null;
  try {
    const parsed = JSON.parse(dataStr) as {
      choices?: Array<{
        delta?: { content?: string | null; role?: string };
        finish_reason?: string | null;
      }>;
    };
    const delta = parsed.choices?.[0]?.delta?.content;
    return typeof delta === 'string' && delta.length > 0 ? delta : null;
  } catch {
    // Some servers send keep-alive pings as non-JSON `data:` payloads —
    // silently ignore them rather than crashing the stream.
    return null;
  }
}

// ===========================================================================
// Connectivity verifier — used by the verify-model route
// ===========================================================================

export interface VerifyZaiConnectivityResult {
  ok: boolean;
  responseText: string;
  error?: string;
}

/**
 * Send a minimal "Say OK" prompt to ZAI's chat completions API to verify
 * that the configured credentials work end-to-end. Used by the ported
 * `/api/openmaic/verify-model` route in place of OpenMAIC's `callLLM`-based
 * connectivity test.
 */
export async function verifyZaiConnectivity(
  options: { model?: string; token?: string } = {},
): Promise<VerifyZaiConnectivityResult> {
  try {
    const token = options.token ?? readConfig()?.token;
    const zai = await createZAI(token);
    const completion = await zai.chat.completions.create({
      model: options.model || 'auto',
      messages: [
        { role: 'user', content: 'Say "OK" if you can hear me.' },
      ],
      thinking: { type: 'disabled' },
    });
    const text = completion.choices?.[0]?.message?.content || '';
    return { ok: true, responseText: text };
  } catch (error) {
    return {
      ok: false,
      responseText: '',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
