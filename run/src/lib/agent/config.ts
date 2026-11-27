import { ChatOpenAI } from '@langchain/openai';
import { readConfig as readZaiConfig } from '../zai';
import { resolveModel } from '../server/resolve-model';
import { createLogger } from '../logger';
import type { AgentChatConfig } from './types';

export type { AgentChatConfig };

const log = createLogger('AgentConfig');

/**
 * Model resolution & routing for the MedQ Agent.
 *
 * Priority chain (mirrors the "fallback chain" pattern from the reference
 * deep-agent platforms — explicit operator config, then the user's picker
 * choice, then the managed ZAI provider):
 *
 *   1. MEDQ_AGENT_* / OPENAI_* env vars (operator-configured agent provider)
 *   2. The model string the user picked in the chat UI ("providerId:modelId"),
 *      resolved through the shared resolver (server config, env keys, BYOK)
 *   3. ZAI managed provider (`.z-ai-config`) — works out of the box on ZAI
 *      deployments with zero additional configuration
 */

/** Extra headers the ZAI gateway requires beyond standard Bearer auth. */
function zaiHeaders(cfg: { token?: string; chatId?: string; userId?: string }): Record<string, string> {
  const headers: Record<string, string> = { 'X-Z-AI-From': 'Z' };
  if (cfg.token) headers['X-Token'] = cfg.token;
  if (cfg.chatId) headers['X-Chat-Id'] = cfg.chatId;
  if (cfg.userId) headers['X-User-Id'] = cfg.userId;
  return headers;
}

export async function resolveAgentChatConfig(
  requestedModel?: string,
  userId?: string | null,
): Promise<AgentChatConfig> {
  // 1. Operator-configured agent provider wins (explicit deployment intent)
  const envApiKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY;
  if (envApiKey) {
    const envBaseUrl = (
      process.env.MEDQ_AGENT_BASE_URL ||
      process.env.OPENAI_BASE_URL ||
      'https://api.openai.com/v1'
    ).replace(/\/$/, '');
    return {
      baseUrl: envBaseUrl,
      apiKey: envApiKey,
      model: process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
      source: 'env',
    };
  }

  // 2. User-selected model from the chat ModelPicker
  if (requestedModel && requestedModel !== 'auto') {
    try {
      const resolved = await resolveModel({ modelString: requestedModel, userId: userId ?? undefined });
      if (resolved.providerId === 'zai') {
        const zai = readZaiConfig();
        if (zai?.apiKey) {
          return {
            baseUrl: zai.baseUrl,
            apiKey: zai.apiKey,
            model: resolved.modelId,
            defaultHeaders: zaiHeaders(zai),
            source: 'zai',
          };
        }
      } else if (resolved.apiKey && resolved.baseUrl) {
        // OpenAI-compatible providers (openai, deepseek, qwen, kimi, …)
        return {
          baseUrl: resolved.baseUrl,
          apiKey: resolved.apiKey,
          model: resolved.modelId,
          source: resolved.providerId,
        };
      }
    } catch (error) {
      log.warn?.(`Requested model "${requestedModel}" could not be resolved, falling back:`, error);
    }
  }

  // 3. ZAI managed fallback (.z-ai-config) — default out of the box
  const zai = readZaiConfig();
  if (zai?.apiKey) {
    return {
      baseUrl: zai.baseUrl,
      apiKey: zai.apiKey,
      model: process.env.MEDQ_AGENT_MODEL || 'glm-4.5',
      defaultHeaders: zaiHeaders(zai),
      source: 'zai-default',
    };
  }

  throw new Error(
    'No LLM provider is available for the agent. Set MEDQ_AGENT_API_KEY / OPENAI_API_KEY, ' +
      'pick a configured model in the picker, or configure .z-ai-config (ZAI).',
  );
}

/**
 * Build a LangChain ChatOpenAI model from a resolved config.
 * ZAI's endpoint is OpenAI-compatible; gateway headers ride along via
 * `defaultHeaders`.
 */
export function createChatModelFromConfig(config: AgentChatConfig, temperature = 0.4): ChatOpenAI {
  return new ChatOpenAI({
    apiKey: config.apiKey,
    model: config.model,
    temperature,
    configuration: {
      baseURL: config.baseUrl,
      ...(config.defaultHeaders ? { defaultHeaders: config.defaultHeaders } : {}),
    },
    // Retry through short z.ai-gateway 429/5xx storms (see deep-agent-runtime).
    maxRetries: 4,
  });
}
