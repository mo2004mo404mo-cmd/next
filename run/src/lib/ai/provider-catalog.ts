/**
 * Pure AI provider CATALOG — client-safe provider/mode data.
 *
 * This module is the dependency-free half of src/lib/ai/providers.ts: the
 * PROVIDERS registry (ids, names, base URLs, logos, model catalogs) and
 * MONO_LOGO_PROVIDERS, plus the shared provider types. It deliberately has
 * ZERO npm runtime imports so browser chunks can use it safely.
 *
 * Why the split exists (2026-11-04): providers.ts imports the Vercel AI SDK
 * ('ai' + the @ai-sdk/* provider packages) for server-side model factories,
 * and @ai-sdk/provider-utils (reached via 'ai') imports node:dns in its
 * safe-node-fetch.ts. OpenMAIC's client settings panels need the provider
 * CATALOG, and importing it from providers.ts dragged the whole SDK — and its
 * node:dns — into the browser chunk graph, which Turbopack refuses to write
 * ("chunking context does not support external modules (request: node:dns)")
 * → GET /ai-classroom panicked with a 500. Client code MUST import from
 * './provider-catalog', never from './providers'; server code can use either
 * (providers.ts re-exports this catalog for backward compatibility).
 */

import type { ProviderId, ProviderConfig, ModelInfo, ModelConfig } from '@/lib/types/provider';
import { applyModelMetadata } from './model-metadata';

// Re-export types for backward compatibility
export type { ProviderId, ProviderConfig, ModelInfo, ModelConfig };

export const MONO_LOGO_PROVIDERS: ReadonlySet<string> = new Set(['openai', 'openrouter', 'ollama']);

/**
 * Provider registry
 */
export const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai',
    defaultBaseUrl: 'https://api.openai.com/v1',
    requiresApiKey: true,
    icon: '/logos/openai.svg',
    models: [
      {
        id: 'gpt-5.5',
        name: 'GPT-5.5',
        contextWindow: 1050000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'gpt-5.4-pro',
        name: 'GPT-5.4 Pro',
        contextWindow: 1050000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'gpt-5.4',
        name: 'GPT-5.4',
        contextWindow: 1050000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'gpt-5.4-mini',
        name: 'GPT-5.4 Mini',
        contextWindow: 400000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'gpt-5.4-nano',
        name: 'GPT-5.4 Nano',
        contextWindow: 400000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
    ],
  },

  anthropic: {
    id: 'anthropic',
    name: 'Claude',
    type: 'anthropic',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.anthropic.com/v1',
    icon: '/logos/claude.svg',
    models: [
      {
        id: 'claude-opus-4-8',
        name: 'Claude Opus 4.8',
        contextWindow: 1000000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'claude-opus-4-7',
        name: 'Claude Opus 4.7',
        contextWindow: 1000000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'claude-opus-4-6',
        name: 'Claude Opus 4.6',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'claude-sonnet-4-6',
        name: 'Claude Sonnet 4.6',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'claude-sonnet-4-5',
        name: 'Claude Sonnet 4.5',
        contextWindow: 200000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'claude-haiku-4-5',
        name: 'Claude Haiku 4.5',
        contextWindow: 200000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
    ],
  },

  google: {
    id: 'google',
    name: 'Gemini',
    type: 'google',
    requiresApiKey: true,
    defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    icon: '/logos/gemini.svg',
    models: [
      {
        id: 'gemini-3.5-flash',
        name: 'Gemini 3.5 Flash',
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'gemini-3.1-pro-preview',
        name: 'Gemini 3.1 Pro Preview',
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'gemini-3-flash-preview',
        name: 'Gemini 3 Flash Preview',
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'gemini-2.5-flash-lite',
        name: 'Gemini 2.5 Flash Lite',
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
    ],
  },

  glm: {
    id: 'glm',
    name: 'GLM',
    type: 'openai',
    defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    alternateBaseUrls: [
      { label: 'settings.baseUrlRegion.china', url: 'https://open.bigmodel.cn/api/paas/v4' },
      { label: 'settings.baseUrlRegion.international', url: 'https://api.z.ai/api/paas/v4' },
    ],
    requiresApiKey: true,
    icon: '/logos/glm.svg',
    models: [
      // GLM-5.2 Series - Long-horizon coding model
      {
        id: 'glm-5.2',
        name: 'GLM-5.2',
        contextWindow: 1000000,
        outputWindow: 128000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      // GLM-5.1 Series
      {
        id: 'glm-5.1',
        name: 'GLM-5.1',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'glm-5v-turbo',
        name: 'GLM-5V-Turbo',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      // GLM-5 Series
      {
        id: 'glm-5',
        name: 'GLM-5',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      // GLM-4.7 Series
      {
        id: 'glm-4.7',
        name: 'GLM-4.7',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'glm-4.7-flashx',
        name: 'GLM-4.7-FlashX',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'glm-4.7-flash',
        name: 'GLM-4.7-Flash',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      // GLM-4.6 Series - Advanced coding & reasoning
      {
        id: 'glm-4.6',
        name: 'GLM-4.6',
        contextWindow: 200000,
        outputWindow: 128000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'glm-4.6v',
        name: 'GLM-4.6V',
        contextWindow: 128000,
        outputWindow: 32000,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'glm-4.6v-flash',
        name: 'GLM-4.6V-Flash',
        contextWindow: 128000,
        outputWindow: 32000,
        capabilities: { streaming: true, tools: true, vision: true },
      },
    ],
  },

  qwen: {
    id: 'qwen',
    name: 'Qwen',
    type: 'openai',
    defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    requiresApiKey: true,
    icon: '/logos/qwen.svg',
    models: [
      {
        id: 'qwen3.7-plus',
        name: 'Qwen3.7 Plus',
        contextWindow: 1000000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'qwen3.7-max',
        name: 'Qwen3.7 Max',
        contextWindow: 1000000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'qwen3.6-max-preview',
        name: 'Qwen3.6 Max Preview',
        contextWindow: 256000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'qwen3.6-plus',
        name: 'Qwen3.6 Plus',
        contextWindow: 1000000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'qwen3.6-plus-2026-04-02',
        name: 'Qwen3.6 Plus (2026-04-02)',
        contextWindow: 1000000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'qwen3.6-flash',
        name: 'Qwen3.6 Flash',
        contextWindow: 1000000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'qwen3.6-flash-2026-04-16',
        name: 'Qwen3.6 Flash (2026-04-16)',
        contextWindow: 1000000,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'qwen3.6-35b-a3b',
        name: 'Qwen3.6 35B A3B',
        contextWindow: 262144,
        outputWindow: 64000,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: false,
          },
        },
      },
      {
        id: 'qwen3.5-flash',
        name: 'Qwen3.5 Flash',
        contextWindow: 1000000,
        outputWindow: 65536,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'qwen3.5-plus',
        name: 'Qwen3.5 Plus',
        contextWindow: 1000000,
        outputWindow: 65536,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'qwen3-max',
        name: 'Qwen3 Max',
        contextWindow: 262144,
        outputWindow: 65536,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'qwen3-vl-plus',
        name: 'Qwen3 VL Plus',
        contextWindow: 262144,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: true },
      },
    ],
  },

  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    type: 'openai',
    defaultBaseUrl: 'https://api.deepseek.com/v1',
    requiresApiKey: true,
    icon: '/logos/deepseek.svg',
    models: [
      {
        id: 'deepseek-v4-pro',
        name: 'DeepSeek V4 Pro',
        contextWindow: 1048576,
        outputWindow: 393216,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'deepseek-v4-flash',
        name: 'DeepSeek V4 Flash',
        contextWindow: 1048576,
        outputWindow: 393216,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: true,
            defaultEnabled: true,
          },
        },
      },
    ],
  },

  kimi: {
    id: 'kimi',
    name: 'Kimi',
    type: 'openai',
    defaultBaseUrl: 'https://api.moonshot.cn/v1',
    alternateBaseUrls: [
      { label: 'settings.baseUrlRegion.china', url: 'https://api.moonshot.cn/v1' },
      { label: 'settings.baseUrlRegion.international', url: 'https://api.moonshot.ai/v1' },
    ],
    requiresApiKey: true,
    icon: '/logos/kimi.png',
    models: [
      {
        id: 'kimi-k2.7-code',
        name: 'Kimi K2.7 Code',
        contextWindow: 256000,
        outputWindow: 32768,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'kimi-k2.7-code-highspeed',
        name: 'Kimi K2.7 Code HighSpeed',
        contextWindow: 256000,
        outputWindow: 32768,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'kimi-k2.6',
        name: 'Kimi K2.6',
        contextWindow: 256000,
        outputWindow: 8192,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      // K2.5 Series (2026) - 1T MoE, 32B active parameters
      {
        id: 'kimi-k2.5',
        name: 'Kimi K2.5',
        contextWindow: 256000,
        outputWindow: 8192,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'kimi-k2-thinking',
        name: 'Kimi K2 Thinking',
        contextWindow: 256000,
        outputWindow: 8192,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
    ],
  },

  minimax: {
    id: 'minimax',
    name: 'MiniMax',
    type: 'anthropic',
    defaultBaseUrl: 'https://api.minimaxi.com/anthropic/v1',
    alternateBaseUrls: [
      { label: 'settings.baseUrlRegion.china', url: 'https://api.minimaxi.com/anthropic/v1' },
      { label: 'settings.baseUrlRegion.international', url: 'https://api.minimax.io/anthropic/v1' },
    ],
    requiresApiKey: true,
    icon: '/logos/minimax.svg',
    models: [
      {
        id: 'MiniMax-M3',
        name: 'MiniMax M3',
        contextWindow: 1000000,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'MiniMax-M2.7',
        name: 'MiniMax M2.7',
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: false },
      },
    ],
  },

  siliconflow: {
    id: 'siliconflow',
    name: '硅基流动',
    type: 'openai',
    defaultBaseUrl: 'https://api.siliconflow.cn/v1',
    requiresApiKey: true,
    icon: '/logos/siliconflow.svg',
    models: [
      // DeepSeek Series
      {
        id: 'deepseek-ai/DeepSeek-V3.2',
        name: 'DeepSeek-V3.2',
        contextWindow: 128000,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'deepseek-ai/DeepSeek-R1',
        name: 'DeepSeek-R1',
        contextWindow: 128000,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
        name: 'DeepSeek-R1-Distill-Qwen-7B',
        contextWindow: 128000,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      // Qwen Series
      {
        id: 'Qwen/Qwen3-VL-32B-Instruct',
        name: 'Qwen3-VL-32B-Instruct',
        contextWindow: 256000,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      // Kimi Series
      {
        id: 'Pro/moonshotai/Kimi-K2.5',
        name: 'Kimi-K2.5',
        contextWindow: 256000,
        outputWindow: 96000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      // GLM Series
      {
        id: 'THUDM/GLM-4.1V-9B-Thinking',
        name: 'GLM-4.1V-9B-Thinking',
        contextWindow: 64000,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'THUDM/GLM-Z1-Rumination-32B-0414',
        name: 'GLM-Z1-Rumination-32B',
        contextWindow: 32000,
        outputWindow: 16384,
        capabilities: { streaming: true, tools: true, vision: false },
      },
    ],
  },

  doubao: {
    id: 'doubao',
    name: '豆包',
    type: 'openai',
    defaultBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    requiresApiKey: true,
    icon: '/logos/doubao.svg',
    models: [
      {
        id: 'doubao-seed-2-0-pro-260215',
        name: 'Doubao Seed 2.0 Pro',
        contextWindow: 128000,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'doubao-seed-2-0-lite-260215',
        name: 'Doubao Seed 2.0 Lite',
        contextWindow: 128000,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'doubao-seed-2-0-mini-260215',
        name: 'Doubao Seed 2.0 Mini',
        contextWindow: 128000,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'doubao-seed-1-8-251228',
        name: 'Doubao Seed 1.8',
        contextWindow: 128000,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: true },
      },
    ],
  },

  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    type: 'openai',
    defaultBaseUrl: 'https://openrouter.ai/api/v1',
    requiresApiKey: true,
    icon: '/logos/openrouter.svg',
    models: [
      {
        id: 'deepseek/deepseek-v4-pro',
        name: 'DeepSeek V4 Pro',
        contextWindow: 1048576,
        outputWindow: 131072,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'deepseek/deepseek-v4-flash',
        name: 'DeepSeek V4 Flash',
        contextWindow: 1048576,
        outputWindow: 131072,
        capabilities: { streaming: true, tools: true, vision: false },
      },
    ],
  },

  grok: {
    id: 'grok',
    name: 'Grok',
    type: 'openai',
    defaultBaseUrl: 'https://api.x.ai/v1',
    requiresApiKey: true,
    icon: '/logos/grok.svg',
    models: [
      {
        id: 'grok-4.20-reasoning',
        name: 'Grok 4.20 Reasoning',
        contextWindow: 2000000,
        outputWindow: 131072,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'grok-4.20',
        name: 'Grok 4.20',
        contextWindow: 2000000,
        outputWindow: 131072,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'grok-4.20-multi-agent',
        name: 'Grok 4.20 Multi-Agent',
        contextWindow: 2000000,
        outputWindow: 131072,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'grok-4-1-fast-reasoning',
        name: 'Grok 4.1 Fast Reasoning',
        contextWindow: 2000000,
        outputWindow: 131072,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: false,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'grok-4-1-fast-non-reasoning',
        name: 'Grok 4.1 Fast',
        contextWindow: 2000000,
        outputWindow: 131072,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'grok-code-fast-1',
        name: 'Grok Code Fast',
        contextWindow: 256000,
        outputWindow: 32768,
        capabilities: { streaming: true, tools: true, vision: false },
      },
    ],
  },

  'tencent-hunyuan': {
    id: 'tencent-hunyuan',
    name: 'Tencent Hunyuan',
    type: 'openai',
    defaultBaseUrl: 'https://tokenhub.tencentmaas.com/v1',
    alternateBaseUrls: [
      { label: 'settings.baseUrlRegion.china', url: 'https://tokenhub.tencentmaas.com/v1' },
      {
        label: 'settings.baseUrlRegion.international',
        url: 'https://tokenhub-intl.tencentmaas.com/v1',
      },
    ],
    requiresApiKey: true,
    icon: '/logos/hunyuan.svg',
    models: [
      {
        id: 'hy3-preview',
        name: 'Tencent Hy3 Preview',
        contextWindow: 256000,
        outputWindow: 64000,
        capabilities: { streaming: true, tools: true, vision: false },
      },
    ],
  },

  xiaomi: {
    id: 'xiaomi',
    name: 'Xiaomi MiMo',
    type: 'openai',
    defaultBaseUrl: 'https://api.xiaomimimo.com/v1',
    // Token Plan endpoints use the same OpenAI-compatible path with regional hosts.
    alternateBaseUrls: [
      { label: 'settings.baseUrlRegion.xiaomiPayg', url: 'https://api.xiaomimimo.com/v1' },
      {
        label: 'settings.baseUrlRegion.xiaomiTokenPlanCN',
        url: 'https://token-plan-cn.xiaomimimo.com/v1',
      },
      {
        label: 'settings.baseUrlRegion.xiaomiTokenPlanSGP',
        url: 'https://token-plan-sgp.xiaomimimo.com/v1',
      },
      {
        label: 'settings.baseUrlRegion.xiaomiTokenPlanEU',
        url: 'https://token-plan-ams.xiaomimimo.com/v1',
      },
    ],
    requiresApiKey: true,
    icon: '/logos/xiaomi.svg',
    models: [
      {
        id: 'mimo-v2.5-pro',
        name: 'MiMo V2.5 Pro',
        contextWindow: 1048576,
        outputWindow: 131072,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'mimo-v2-pro',
        name: 'MiMo V2 Pro',
        contextWindow: 1048576,
        outputWindow: 131072,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'mimo-v2.5',
        name: 'MiMo V2.5',
        contextWindow: 1048576,
        outputWindow: 131072,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'mimo-v2-omni',
        name: 'MiMo V2 Omni',
        contextWindow: 262144,
        outputWindow: 131072,
        capabilities: {
          streaming: true,
          tools: true,
          vision: true,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
      {
        id: 'mimo-v2-flash',
        name: 'MiMo V2 Flash',
        contextWindow: 262144,
        outputWindow: 65536,
        capabilities: {
          streaming: true,
          tools: true,
          vision: false,
          thinking: {
            toggleable: true,
            budgetAdjustable: false,
            defaultEnabled: true,
          },
        },
      },
    ],
  },

  ollama: {
    id: 'ollama',
    name: 'Ollama',
    type: 'openai',
    defaultBaseUrl: 'http://localhost:11434',
    requiresApiKey: false,
    icon: '/logos/ollama.svg',
    models: [
      {
        id: 'llama3.3',
        name: 'Llama 3.3 70B',
        contextWindow: 131072,
        outputWindow: 4096,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'gemma3',
        name: 'Gemma 3 12B',
        contextWindow: 131072,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: true },
      },
      {
        id: 'deepseek-r1',
        name: 'DeepSeek R1',
        contextWindow: 131072,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: false, vision: false },
      },
    ],
  },

  lemonade: {
    id: 'lemonade',
    name: 'Lemonade',
    type: 'openai',
    defaultBaseUrl: 'http://localhost:13305/v1',
    requiresApiKey: false,
    icon: '/logos/lemonade.svg',
    models: [
      {
        id: 'Gemma-4-26B-A4B-it-GGUF',
        name: 'Gemma 4 26B A4B IT GGUF',
        capabilities: { streaming: true, tools: true, vision: false },
      },
    ],
  },

  /**
   * FreeLLMAPI — self-hosted free-tier aggregator/router
   * (https://github.com/tashfeenahmed/freellmapi).
   *
   * One OpenAI-compatible `/v1` endpoint that routes across 34 free LLM
   * providers (Google, Groq, Cerebras, Mistral, OpenRouter, Z.ai, …) with
   * automatic failover when one is rate-limited. The user installs it
   * locally (docker or desktop app, default port 3001), adds their free-tier
   * keys in ITS dashboard, and points MedQ at the router with the single
   * unified `freellmapi-…` bearer key.
   *
   * The seeded models are the router's virtual routing strategies:
   *   auto        — router picks the best healthy free model per request
   *   auto:fast   — prefer lowest latency
   *   auto:smart  — prefer highest capability
   *   fusion      — fan out to a panel of models, synthesize one answer
   * The REAL model catalog (hundreds of free endpoints) is discovered at
   * runtime via the "Discover models" button (GET /v1/models on the router).
   */
  freellmapi: {
    id: 'freellmapi',
    name: 'FreeLLMAPI',
    type: 'openai',
    defaultBaseUrl: 'http://localhost:3001/v1',
    requiresApiKey: true,
    icon: '/logos/freellmapi.svg',
    models: [
      {
        id: 'auto',
        name: 'Auto (router picks the best free model)',
        contextWindow: 131072,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'auto:fast',
        name: 'Auto: Fast (lowest latency)',
        contextWindow: 131072,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'auto:smart',
        name: 'Auto: Smart (highest capability)',
        contextWindow: 131072,
        outputWindow: 8192,
        capabilities: { streaming: true, tools: true, vision: false },
      },
      {
        id: 'fusion',
        name: 'Fusion (multi-model synthesis)',
        contextWindow: 131072,
        outputWindow: 8192,
        capabilities: { streaming: false, tools: false, vision: false },
      },
    ],
  },

  /**
   * ZAI provider — MedQ's native LLM backend (z-ai-web-dev-sdk).
   *
   * Configured via `.z-ai-config` (apiKey + baseUrl + token). The LanguageModel
   * instance is constructed by `createZaiLanguageModel()` (see
   * `@/lib/ai/zai-language-model.ts`), which wraps `zai.chat.completions.create`
   * into the Vercel AI SDK's `LanguageModelV3` interface so OpenMAIC's real
   * `callLLM`/`streamLLM` (from `@/lib/ai/llm.ts`) can drive the classroom
   * generation pipeline unchanged.
   *
   * `type: 'zai'` is a synthetic provider type handled in `getModel()` below —
   * it bypasses the OpenAI/Anthropic/Google branches and dispatches to the ZAI
   * adapter directly.
   */
  zai: {
    id: 'zai',
    name: 'ZAI',
    type: 'zai' as 'openai',
    defaultBaseUrl: '',
    requiresApiKey: false, // ZAI's apiKey is read from .z-ai-config at call time
    icon: '/logos/zai.svg',
    models: [
      {
        id: 'auto',
        name: 'ZAI Auto (router picks best model)',
        contextWindow: 128000,
        outputWindow: 16384,
        capabilities: {
          streaming: true,
          tools: false,
          vision: true,
          thinking: { toggleable: false, budgetAdjustable: false, defaultEnabled: false },
        },
      },
      {
        id: 'glm-4.5',
        name: 'GLM-4.5',
        contextWindow: 128000,
        outputWindow: 16384,
        capabilities: {
          streaming: true,
          tools: false,
          vision: true,
          thinking: { toggleable: true, budgetAdjustable: false, defaultEnabled: false },
        },
      },
      {
        id: 'glm-4.5-air',
        name: 'GLM-4.5 Air (fast)',
        contextWindow: 128000,
        outputWindow: 8192,
        capabilities: {
          streaming: true,
          tools: false,
          vision: true,
        },
      },
      {
        id: 'glm-4.6',
        name: 'GLM-4.6',
        contextWindow: 200000,
        outputWindow: 16384,
        capabilities: {
          streaming: true,
          tools: false,
          vision: true,
          thinking: { toggleable: true, budgetAdjustable: false, defaultEnabled: false },
        },
      },
    ],
  },
};

// Enrich models with catalog metadata (thinking capability etc.) — this used
// to run in providers.ts; moved here so BOTH server (providers.ts) and client
// (OpenMAIC settings) consumers see the enriched registry. model-metadata is
// itself dependency-free (types only), so this stays browser-safe.
applyModelMetadata(PROVIDERS);
