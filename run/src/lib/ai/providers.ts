/**
 * Unified AI Provider Configuration
 *
 * Supports multiple AI providers through Vercel AI SDK:
 * - OpenAI (native)
 * - Anthropic Claude (native)
 * - Google Gemini (native)
 * - MiniMax (Anthropic-compatible, recommended by official)
 * - OpenAI-compatible providers (DeepSeek, Qwen, Kimi, GLM, SiliconFlow, Doubao, Tencent, Xiaomi, Lemonade, etc.)
 *
 * Sources:
 * - https://platform.openai.com/docs/models
 * - https://platform.claude.com/docs/en/about-claude/models/overview
 * - https://ai.google.dev/gemini-api/docs/models
 * - https://api-docs.deepseek.com/quick_start/pricing
 * - https://platform.moonshot.cn/docs/pricing/chat
 * - https://platform.minimaxi.com/docs/guides/text-generation
 * - https://platform.minimaxi.com/docs/api-reference/text-anthropic-api
 * - https://docs.bigmodel.cn/cn/guide/start/model-overview
 * - https://help.aliyun.com/zh/model-studio/models (Qwen/DashScope)
 * - https://siliconflow.cn/models
 * - https://siliconflow.cn/pricing
 * - https://www.volcengine.com/docs/82379/1330310
 * - https://platform.xiaomimimo.com/static/docs/pricing.md
 * - https://platform.xiaomimimo.com/static/docs/tokenplan/quick-access.md
 */

import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';
import { wrapResponseWithReasoning } from './reasoning-sse';
import type { LanguageModel } from 'ai';
import type {
  ProviderId,
  ProviderConfig,
  ModelInfo,
  ModelConfig,
  ThinkingConfig,
} from '@/lib/types/provider';
import { getCatalogThinkingCapability } from './model-metadata';
import { getDefaultThinkingConfig, getThinkingMode, pickThinkingBudget } from './thinking-config';
import { createLogger } from '@/lib/logger';
// NOTE: Do NOT import thinking-context.ts here — it uses node:async_hooks
// which is server-only, and this file is also used on the client via
// settings.ts. The thinking context is read from globalThis instead
// (set by thinking-context.ts at module load time on the server).

const log = createLogger('AIProviders');

// Re-export types for backward compatibility
export type { ProviderId, ProviderConfig, ModelInfo, ModelConfig };

// 2026-11-04: the pure catalog (PROVIDERS, MONO_LOGO_PROVIDERS) moved to
// ./provider-catalog — a dependency-free module safe for browser chunks
// (this file pulls in the Vercel AI SDK, whose @ai-sdk/provider-utils
// imports node:dns — a browser-chunk panic under Turbopack). Re-exported
// here so server consumers keep working unchanged.
import { PROVIDERS, MONO_LOGO_PROVIDERS } from './provider-catalog';
export { PROVIDERS, MONO_LOGO_PROVIDERS } from './provider-catalog';
// (provider-catalog.ts runs applyModelMetadata(PROVIDERS) itself at load.)

/**
 * Get provider config (from built-in or unified config in localStorage)
 */
function getProviderConfig(providerId: ProviderId): ProviderConfig | null {
  // Check built-in providers first
  if (PROVIDERS[providerId]) {
    return PROVIDERS[providerId];
  }

  // Check unified providersConfig in localStorage (browser only)
  if (typeof window !== 'undefined') {
    try {
      const storedConfig = localStorage.getItem('providersConfig');
      if (storedConfig) {
        const config = JSON.parse(storedConfig);
        const providerSettings = config[providerId];
        if (providerSettings) {
          return {
            id: providerId,
            name: providerSettings.name,
            type: providerSettings.type,
            defaultBaseUrl: providerSettings.defaultBaseUrl,
            icon: providerSettings.icon,
            requiresApiKey: providerSettings.requiresApiKey,
            models: providerSettings.models,
          };
        }
      }
    } catch (e) {
      log.error('Failed to load provider config:', e);
    }
  }

  return null;
}

/**
 * Model instance with its configuration info
 */
export interface ModelWithInfo {
  model: LanguageModel;
  modelInfo: ModelInfo | null;
}

function getCompatThinkingBodyParams(
  providerId: ProviderId,
  modelId: string,
  config: ThinkingConfig,
): Record<string, unknown> | undefined {
  const capability = getCatalogThinkingCapability(providerId, modelId);
  if (!capability || capability.control === 'none') return undefined;

  const mode = getThinkingMode(config);
  const budget = pickThinkingBudget(capability, config);

  switch (capability.requestAdapter) {
    case 'kimi':
    case 'xiaomi':
      if (mode === 'disabled') return { thinking: { type: 'disabled' } };
      if (mode === 'enabled') return { thinking: { type: 'enabled' } };
      return undefined;

    case 'glm': {
      if (capability.control === 'effort') {
        if (mode === 'disabled' || config.effort === 'none') {
          return { thinking: { type: 'disabled' } };
        }

        const effort =
          config.effort && capability.effortValues?.includes(config.effort)
            ? config.effort
            : mode === 'enabled'
              ? capability.defaultEffort
              : undefined;
        const body: Record<string, unknown> = {};
        if (mode === 'enabled' || effort) body.thinking = { type: 'enabled' };
        if (effort) body.reasoning_effort = effort;
        return Object.keys(body).length > 0 ? body : undefined;
      }
      if (mode === 'disabled') return { thinking: { type: 'disabled' } };
      if (mode === 'enabled') return { thinking: { type: 'enabled' } };
      return undefined;
    }

    case 'deepseek': {
      if (mode === 'disabled' || config.effort === 'none') {
        return { thinking: { type: 'disabled' } };
      }

      const effort = config.effort === 'max' || config.effort === 'xhigh' ? 'max' : 'high';
      return {
        thinking: { type: 'enabled' },
        reasoning_effort: effort,
      };
    }

    case 'qwen': {
      if (mode === 'disabled') return { enable_thinking: false };
      const body: Record<string, unknown> = {};
      if (mode === 'enabled') body.enable_thinking = true;
      if (budget !== undefined) body.thinking_budget = budget;
      return Object.keys(body).length > 0 ? body : undefined;
    }

    case 'siliconflow': {
      const body: Record<string, unknown> = {};
      if (capability.control === 'toggle-budget') {
        if (mode === 'disabled') body.enable_thinking = false;
        if (mode === 'enabled') body.enable_thinking = true;
      }
      if (budget !== undefined) body.thinking_budget = budget;
      return Object.keys(body).length > 0 ? body : undefined;
    }

    case 'doubao': {
      if (capability.control === 'effort') {
        const effort =
          mode === 'disabled'
            ? 'minimal'
            : config.effort && capability.effortValues?.includes(config.effort)
              ? config.effort
              : mode === 'enabled'
                ? capability.defaultEffort
                : undefined;
        return effort ? { reasoning_effort: effort } : undefined;
      }
      if (mode === 'auto') return { thinking: { type: 'auto' } };
      if (mode === 'disabled') return { thinking: { type: 'disabled' } };
      if (mode === 'enabled') return { thinking: { type: 'enabled' } };
      return undefined;
    }

    case 'openrouter': {
      const reasoning: Record<string, unknown> = {};
      if (mode === 'disabled') reasoning.enabled = false;
      if (mode === 'enabled') reasoning.enabled = true;
      if (config.effort) reasoning.effort = config.effort;
      if (budget !== undefined) reasoning.max_tokens = budget;
      if (typeof config.excludeReasoningOutput === 'boolean') {
        reasoning.exclude = config.excludeReasoningOutput;
      }
      return Object.keys(reasoning).length > 0 ? { reasoning } : undefined;
    }

    case 'hunyuan': {
      let reasoningEffort: 'no_think' | 'low' | 'high' | undefined;
      if (mode === 'disabled' || config.effort === 'none') {
        reasoningEffort = 'no_think';
      } else if (config.effort === 'high' || config.effort === 'max' || config.effort === 'xhigh') {
        reasoningEffort = 'high';
      } else if (
        config.effort === 'low' ||
        config.effort === 'medium' ||
        config.effort === 'minimal'
      ) {
        reasoningEffort = 'low';
      } else if (mode === 'enabled') {
        reasoningEffort = capability.defaultEffort === 'high' ? 'high' : 'low';
      }
      return reasoningEffort
        ? { chat_template_kwargs: { reasoning_effort: reasoningEffort } }
        : undefined;
    }

    case 'lemonade': {
      const chatTemplateKwargs: Record<string, unknown> = {};
      if (mode === 'enabled') {
        chatTemplateKwargs.enable_thinking = true;
      } else {
        chatTemplateKwargs.enable_thinking = false;
      }
      if (mode === 'enabled' && budget !== undefined) {
        chatTemplateKwargs.thinking_budget = budget;
      }
      return { chat_template_kwargs: chatTemplateKwargs };
    }

    default:
      return undefined;
  }
}

function normalizeMiniMaxAnthropicBaseUrl(
  providerId: ProviderId,
  baseUrl?: string,
): string | undefined {
  if (providerId !== 'minimax' || !baseUrl) {
    return baseUrl;
  }

  const trimmed = baseUrl.replace(/\/$/, '');
  if (trimmed.endsWith('/anthropic/v1')) {
    return trimmed;
  }
  if (trimmed.endsWith('/anthropic')) {
    return `${trimmed}/v1`;
  }
  return `${trimmed}/anthropic/v1`;
}

function shouldUseOpenAIResponsesApi(providerId: ProviderId, modelId: string): boolean {
  if (providerId !== 'openai') return false;

  return (
    /^gpt-5\.\d+-pro(?:-|$)/.test(modelId) ||
    /^gpt-5\.5(?:-|$)/.test(modelId) ||
    /^gpt-5\.[3-9]-codex(?:-|$)/.test(modelId)
  );
}

/** Returns true if the provider requires an API key (defaults to true for unknown providers). */
export function isProviderKeyRequired(providerId: string): boolean {
  return getProviderConfig(providerId as ProviderId)?.requiresApiKey ?? true;
}

/**
 * Get a configured language model instance with its info
 * Accepts individual parameters for flexibility and security
 */
export function getModel(config: ModelConfig): ModelWithInfo {
  // providerType can come from client for custom providers; fall back to registry.
  let providerType = config.providerType;
  const provider = getProviderConfig(config.providerId);
  const requiresApiKey = provider?.requiresApiKey ?? true;

  if (!providerType) {
    if (provider) {
      providerType = provider.type;
    } else {
      throw new Error(`Unknown provider: ${config.providerId}. Please provide providerType.`);
    }
  }

  // Validate API key if required
  if (requiresApiKey && !config.apiKey) {
    throw new Error(`API key required for provider: ${config.providerId}`);
  }

  // Use provided API key, or empty string for providers that don't require one
  const effectiveApiKey = config.apiKey || '';

  // Resolve base URL: explicit > provider default > SDK default
  const effectiveBaseUrl = normalizeMiniMaxAnthropicBaseUrl(
    config.providerId,
    config.baseUrl || provider?.defaultBaseUrl || undefined,
  );

  let model: LanguageModel;

  switch (providerType) {
    case 'openai': {
      const openaiOptions: Parameters<typeof createOpenAI>[0] = {
        apiKey: effectiveApiKey,
        baseURL: effectiveBaseUrl,
      };

      // For OpenAI-compatible providers (not native OpenAI), add a fetch
      // wrapper that injects vendor-specific thinking params into the HTTP
      // body. The thinking config is read from AsyncLocalStorage, set by
      // callLLM / streamLLM at call time.
      if (config.providerId !== 'openai') {
        const providerId = config.providerId;
        const compatFetch = async (url: RequestInfo | URL, init?: RequestInit) => {
          // Read thinking config from globalThis (set by thinking-context.ts)
          const thinkingCtx = (globalThis as Record<string, unknown>).__thinkingContext as
            | { getStore?: () => unknown }
            | undefined;
          const thinkingFromContext = thinkingCtx?.getStore?.() as ThinkingConfig | undefined;
          const thinking =
            thinkingFromContext ??
            (providerId === 'lemonade'
              ? getDefaultThinkingConfig(getCatalogThinkingCapability(providerId, config.modelId))
              : undefined);
          if (thinking && init?.body && typeof init.body === 'string') {
            const extra = getCompatThinkingBodyParams(providerId, config.modelId, thinking);
            if (extra) {
              try {
                const body = JSON.parse(init.body);
                if (providerId === 'lemonade' && 'stream_options' in body) {
                  delete body.stream_options;
                }
                Object.assign(body, extra);
                init = { ...init, body: JSON.stringify(body) };
              } catch {
                /* leave body as-is */
              }
            }
          }
          const response = await globalThis.fetch(url, init);

          // Recover reasoning that @ai-sdk/openai's chat schema drops: rewrite
          // streamed `reasoning_content` deltas into an inline <think> block
          // (the model below is wrapped with extractReasoningMiddleware to split
          // it back into first-class reasoning parts). No-op when absent.
          const streamingReasoned = (() => {
            let streaming = false;
            if (init?.body && typeof init.body === 'string') {
              try {
                streaming = JSON.parse(init.body)?.stream === true;
              } catch {
                /* ignore request-body inspection failure */
              }
            }
            return streaming ? wrapResponseWithReasoning(response) : response;
          })();

          if (providerId !== 'lemonade') {
            return streamingReasoned;
          }

          const contentType = response.headers.get('content-type') || '';
          let isStreamingRequest = false;
          if (init?.body && typeof init.body === 'string') {
            try {
              const requestBody = JSON.parse(init.body);
              isStreamingRequest = requestBody?.stream === true;
            } catch {
              /* ignore request-body inspection failure */
            }
          }

          if (isStreamingRequest) {
            return response;
          }

          try {
            const cloned = response.clone();
            const text = await cloned.text();

            try {
              JSON.parse(text);
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              log.warn(
                `[Lemonade] Invalid JSON response from OpenAI-compatible path: status=${response.status}, contentType=${contentType || 'n/a'}, bodyLen=${text.length}, first=${JSON.stringify(text.slice(0, 500))}, last=${JSON.stringify(text.slice(Math.max(0, text.length - 500)))}, parseError=${message}`,
              );
            }
          } catch (error) {
            log.warn('[Lemonade] Failed to inspect JSON response body:', error);
          }

          return response;
        };
        openaiOptions.fetch = compatFetch as typeof globalThis.fetch;
      }

      const openai = createOpenAI(openaiOptions);
      model = shouldUseOpenAIResponsesApi(config.providerId, config.modelId)
        ? openai.responses(config.modelId)
        : openai.chat(config.modelId);
      // OpenAI-compatible providers (e.g. DeepSeek, Qwen) stream reasoning
      // either as a separate `reasoning_content` field (normalized to an inline
      // <think> block by compatFetch) or as native inline <think>.
      // Split it into first-class reasoning parts so the agent stream and UI can
      // show a thinking panel and the answer text stays clean. Native OpenAI
      // handles reasoning itself, so it is excluded.
      if (config.providerId !== 'openai') {
        model = wrapLanguageModel({
          model,
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        });
      }
      break;
    }

    case 'anthropic': {
      const anthropicOptions: Parameters<typeof createAnthropic>[0] = {
        baseURL: effectiveBaseUrl,
      };
      if (config.providerId === 'minimax' && effectiveApiKey.startsWith('sk-cp-')) {
        anthropicOptions.authToken = effectiveApiKey;
      } else {
        anthropicOptions.apiKey = effectiveApiKey;
      }
      if (config.providerId === 'minimax') {
        anthropicOptions.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
          const capability = getCatalogThinkingCapability(config.providerId, config.modelId);
          const thinkingCtx = (globalThis as Record<string, unknown>).__thinkingContext as
            | { getStore?: () => unknown }
            | undefined;
          const thinking = thinkingCtx?.getStore?.() as ThinkingConfig | undefined;

          if (
            capability?.requestAdapter === 'anthropic' &&
            capability.control !== 'none' &&
            getThinkingMode(thinking) === 'disabled' &&
            init?.body &&
            typeof init.body === 'string'
          ) {
            try {
              const body = JSON.parse(init.body);
              body.thinking = { type: 'disabled' };
              init = { ...init, body: JSON.stringify(body) };
            } catch {
              /* leave body as-is */
            }
          }

          return globalThis.fetch(url, init);
        }) as typeof globalThis.fetch;
      }

      const anthropic = createAnthropic(anthropicOptions);
      model = anthropic.chat(config.modelId);
      break;
    }

    case 'google': {
      const googleOptions: Parameters<typeof createGoogleGenerativeAI>[0] = {
        apiKey: effectiveApiKey,
        baseURL: effectiveBaseUrl,
      };
      if (config.proxy) {
        const proxy = config.proxy;
        let agent: unknown;
        googleOptions.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
          const { ProxyAgent, fetch: undiciFetch } = (await import(
            /* webpackIgnore: true */ 'undici'
          )) as {
            ProxyAgent: new (proxyUrl: string) => unknown;
            fetch: (
              input: string | URL | Request,
              init?: Record<string, unknown>,
            ) => Promise<unknown>;
          };
          agent ??= new ProxyAgent(proxy);
          const response = await undiciFetch(input, {
            ...(init as Record<string, unknown>),
            dispatcher: agent,
          });
          return response as Response;
        }) as typeof fetch;
      }
      const google = createGoogleGenerativeAI(googleOptions);
      model = google.chat(config.modelId);
      break;
    }

    default:
      throw new Error(`Unsupported provider type: ${providerType}`);
  }

  // Look up model info from the provider registry
  const modelInfo = provider?.models.find((m) => m.id === config.modelId) || null;

  return { model, modelInfo };
}

/**
 * Parse model string in format "providerId:modelId" or just "modelId" (defaults to ZAI)
 *
 * MedQ adaptation: OpenMAIC's original default was 'openai' for backward
 * compatibility. MedQ uses ZAI as its native LLM backend, so a bare model
 * string (e.g. 'auto' or 'glm-4.5') resolves to the ZAI provider. This keeps
 * `.z-ai-config`-only deployments working without an explicit `zai:` prefix.
 */
export function parseModelString(modelString: string): {
  providerId: ProviderId;
  modelId: string;
} {
  // Split only on the first colon to handle model IDs that contain colons
  const colonIndex = modelString.indexOf(':');

  if (colonIndex > 0) {
    return {
      providerId: modelString.slice(0, colonIndex) as ProviderId,
      modelId: modelString.slice(colonIndex + 1),
    };
  }

  // Default to ZAI (MedQ's native LLM backend)
  return {
    providerId: 'zai',
    modelId: modelString,
  };
}

/**
 * Get all available models grouped by provider
 */
export function getAllModels(): {
  provider: ProviderConfig;
  models: ModelInfo[];
}[] {
  return Object.values(PROVIDERS).map((provider) => ({
    provider,
    models: provider.models,
  }));
}

/**
 * Get provider by ID
 */
export function getProvider(providerId: ProviderId): ProviderConfig | undefined {
  return PROVIDERS[providerId];
}

/**
 * Get model info
 */
export function getModelInfo(providerId: ProviderId, modelId: string): ModelInfo | undefined {
  const provider = PROVIDERS[providerId];
  return provider?.models.find((m) => m.id === modelId);
}
