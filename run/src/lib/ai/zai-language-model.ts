/**
 * ZAI LanguageModel Adapter
 *
 * Bridges the `z-ai-web-dev-sdk` (MedQ's only LLM backend, configured via
 * `.z-ai-config`) into the Vercel AI SDK's `LanguageModelV3` interface, so
 * OpenMAIC's real source code (`@/lib/ai/llm.ts` → `callLLM` →
 * `generateText`/`streamText` from `ai`) can drive the classroom generation
 * pipeline unchanged.
 *
 * This adapter is registered as the `zai` provider in
 * `@/lib/ai/providers.ts → PROVIDERS` and is dispatched from `getModel()` in
 * the same file (case `'zai'`). The wider OpenMAIC source (resolve-model.ts,
 * classroom-generation.ts, scene-generator.ts, …) is therefore imported
 * verbatim — no ZAI-specific branches anywhere else.
 *
 * Implementation notes:
 *  - `doGenerate` calls `zai.chat.completions.create({ stream: false })` and
 *    flattens the choice into a single `text` content part.
 *  - `doStream` calls the same endpoint with `stream: true` and emits the
 *    standard `stream-start` → `text-delta`* → `text-end` → `finish` events.
 *  - Tool calls, reasoning, and structured outputs are NOT supported — the
 *    ZAI chat-completions surface returns plain text. Callers that need
 *    tool-calling should route to a different provider.
 *  - Images in the prompt are passed to ZAI's content-part format (vision
 *    is supported when the underlying ZAI model exposes it).
 */

import type {
  LanguageModelV3,
  LanguageModelV3CallOptions,
  LanguageModelV3Content,
  LanguageModelV3GenerateResult,
  LanguageModelV3StreamPart,
  LanguageModelV3Message,
} from '@ai-sdk/provider';
import { createZAI, readConfig } from '@/lib/zai';
import { createLogger } from '@/lib/logger';
const log = createLogger('ZaiLanguageModel');

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

/** Lazy singleton ZAI client (created on first call). */
let _zaiPromise: Promise<ZaiClientLike> | null = null;
async function getZai(): Promise<ZaiClientLike> {
  if (!_zaiPromise) {
    const token = readConfig()?.token;
    _zaiPromise = (async () => {
      const sdk = await loadZaiSdk();
      if (!sdk) {
        throw new Error('This project is set up for the BYOK/provider flow and does not include the missing ZAI SDK.');
      }
      return sdk;
    })();
  }
  return _zaiPromise;
}

/** Convert AI SDK prompt messages → ZAI chat-completions messages. */
function toZaiMessages(
  prompt: LanguageModelV3Message[],
): Array<Record<string, unknown>> {
  return prompt.map((m) => {
    const role = m.role;
    // ZAI's chat-completions schema accepts either a string `content` or an
    // array of content parts. Flatten the AI SDK's typed content parts into
    // the OpenAI-style shape ZAI expects.
    const content = Array.isArray(m.content)
      ? m.content.map((part) => {
          if (part.type === 'text') return { type: 'text', text: part.text };
          if (part.type === 'file' && part.data instanceof URL) {
            return { type: 'image_url', image_url: { url: part.data.toString() } };
          }
          if (part.type === 'file') {
            // Inline base64 image
            const data =
              typeof part.data === 'string' ? part.data : Buffer.from(part.data).toString('base64');
            const url = `data:${part.mediaType};base64,${data}`;
            return { type: 'image_url', image_url: { url } };
          }
          // Tool calls / reasoning / sources are not supported in the ZAI adapter.
          return { type: 'text', text: '' };
        })
      : '';
    return { role, content };
  });
}

export interface CreateZaiLanguageModelOptions {
  /** ZAI model id (e.g. 'auto', 'glm-4.5', 'glm-4.5-air'). Defaults to 'auto'. */
  modelId?: string;
  /**
   * Optional override for the ZAI token (read from `.z-ai-config` if omitted).
   * Useful for tests and for per-request token rotation.
   */
  token?: string;
  /**
   * Per-call thinking configuration. When `enabled` is true, ZAI's
   * `thinking: { type: 'enabled' }` is sent on every request.
   */
  thinkingEnabled?: boolean;
}

/**
 * Create a `LanguageModelV3` backed by the ZAI SDK.
 *
 * The returned object satisfies `@ai-sdk/provider`'s `LanguageModelV3`
 * interface and is accepted by Vercel AI SDK's `generateText`/`streamText`.
 */
export function createZaiLanguageModel(
  options: CreateZaiLanguageModelOptions = {},
): LanguageModelV3 {
  const modelId = options.modelId || 'auto';
  const thinkingEnabled = options.thinkingEnabled ?? false;

  return {
    specificationVersion: 'v3',
    provider: 'zai',
    modelId,
    supportedUrls: {} as Record<string, RegExp[]>,
    async doGenerate(
      opts: LanguageModelV3CallOptions,
    ): Promise<LanguageModelV3GenerateResult> {
      const zai = await getZai();
      const messages = toZaiMessages(opts.prompt);
      try {
        const completion = (await zai.chat.completions.create({
          model: modelId,
          messages,
          thinking: { type: thinkingEnabled ? 'enabled' : 'disabled' },
          ...(opts.maxOutputTokens ? { max_tokens: opts.maxOutputTokens } : {}),
          ...(opts.temperature != null ? { temperature: opts.temperature } : {}),
          ...(opts.topP != null ? { top_p: opts.topP } : {}),
          ...(opts.stopSequences?.length ? { stop: opts.stopSequences } : {}),
        } as Parameters<typeof zai.chat.completions.create>[0])) as {
          choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
          usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
        };

        const text = completion.choices?.[0]?.message?.content ?? '';
        const content: LanguageModelV3Content[] = text
          ? [{ type: 'text', text }]
          : [];

        return {
          content,
          finishReason: {
            unified: 'stop',
            raw: completion.choices?.[0]?.finish_reason ?? 'stop',
          },
          usage: {
            inputTokens: {
              total: completion.usage?.prompt_tokens,
              noCache: completion.usage?.prompt_tokens,
              cacheRead: undefined,
              cacheWrite: undefined,
            },
            outputTokens: {
              total: completion.usage?.completion_tokens,
              noCache: completion.usage?.completion_tokens,
              cacheRead: undefined,
              cacheWrite: undefined,
            },
            total: completion.usage?.total_tokens,
          },
          warnings: [],
        };
      } catch (err) {
        log.error('ZAI doGenerate failed:', err);
        throw err;
      }
    },
    async doStream(
      opts: LanguageModelV3CallOptions,
    ): Promise<{ stream: ReadableStream<LanguageModelV3StreamPart> }> {
      const zai = await getZai();
      const messages = toZaiMessages(opts.prompt);

      const stream = new ReadableStream<LanguageModelV3StreamPart>({
        async start(controller) {
          try {
            // The z-ai-web-dev-sdk returns `response.body` (a raw
            // ReadableStream<Uint8Array>) when `stream: true` is set — it does
            // NOT parse the SSE frames. We must read the bytes ourselves,
            // split on "\n\n" to get SSE events, and parse each `data:` line
            // as JSON. The stream terminates with `data: [DONE]`.
            const rawStream = (await zai.chat.completions.create({
              model: modelId,
              messages,
              stream: true,
              thinking: { type: thinkingEnabled ? 'enabled' : 'disabled' },
              ...(opts.maxOutputTokens ? { max_tokens: opts.maxOutputTokens } : {}),
              ...(opts.temperature != null ? { temperature: opts.temperature } : {}),
              ...(opts.topP != null ? { top_p: opts.topP } : {}),
              ...(opts.stopSequences?.length ? { stop: opts.stopSequences } : {}),
            } as Parameters<typeof zai.chat.completions.create>[0])) as ReadableStream<Uint8Array>;

            const textId = `zai-${Date.now()}`;
            controller.enqueue({
              type: 'stream-start',
              warnings: [],
            });
            controller.enqueue({
              type: 'text-start',
              id: textId,
            });

            let inputTokens: number | undefined;
            let outputTokens: number | undefined;
            let totalTokens: number | undefined;
            let finishRaw = 'stop';

            const reader = rawStream.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            const handleEvent = (data: string) => {
              if (!data || data === '[DONE]') return;
              let chunk: {
                choices?: Array<{
                  delta?: { content?: string };
                  finish_reason?: string;
                }>;
                usage?: {
                  prompt_tokens?: number;
                  completion_tokens?: number;
                  total_tokens?: number;
                };
              };
              try {
                chunk = JSON.parse(data);
              } catch {
                // Partial JSON or heartbeat — skip silently.
                return;
              }
              const delta = chunk.choices?.[0]?.delta?.content ?? '';
              if (delta) {
                controller.enqueue({
                  type: 'text-delta',
                  id: textId,
                  delta,
                });
              }
              if (chunk.choices?.[0]?.finish_reason) {
                finishRaw = chunk.choices[0].finish_reason;
              }
              if (chunk.usage) {
                inputTokens = chunk.usage.prompt_tokens;
                outputTokens = chunk.usage.completion_tokens;
                totalTokens = chunk.usage.total_tokens;
              }
            };

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });

              // SSE events are separated by a blank line ("\n\n").
              let sepIdx: number;
              while ((sepIdx = buffer.indexOf('\n\n')) !== -1) {
                const rawEvent = buffer.slice(0, sepIdx);
                buffer = buffer.slice(sepIdx + 2);

                // Each event may have multiple lines; we only care about
                // lines that start with "data:".
                for (const line of rawEvent.split('\n')) {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('data:')) {
                    handleEvent(trimmed.slice(5).trim());
                  }
                }
              }
            }

            // Flush any trailing event (some gateways don't terminate with \n\n).
            buffer = buffer.trim();
            if (buffer) {
              for (const line of buffer.split('\n')) {
                const trimmed = line.trim();
                if (trimmed.startsWith('data:')) {
                  handleEvent(trimmed.slice(5).trim());
                }
              }
            }

            controller.enqueue({
              type: 'text-end',
              id: textId,
            });
            controller.enqueue({
              type: 'finish',
              finishReason: {
                unified: finishRaw === 'length' ? 'length' : 'stop',
                raw: finishRaw,
              },
              usage: {
                inputTokens: {
                  total: inputTokens,
                  noCache: inputTokens,
                  cacheRead: undefined,
                  cacheWrite: undefined,
                },
                outputTokens: {
                  total: outputTokens,
                  noCache: outputTokens,
                  cacheRead: undefined,
                  cacheWrite: undefined,
                },
                total: totalTokens,
              },
            });
            controller.close();
          } catch (err) {
            log.error('ZAI doStream failed:', err);
            controller.error(err);
          }
        },
      });

      return { stream };
    },
  };
}
