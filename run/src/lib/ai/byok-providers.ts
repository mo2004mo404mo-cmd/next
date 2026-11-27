/**
 * BYOK provider metadata for the app-wide Settings UI.
 *
 * Lightweight, client-safe subset of the full PROVIDERS registry in
 * src/lib/ai/providers.ts. We don't import that file directly because it
 * pulls in @ai-sdk/* packages (heavy, server-leaning) and the BYOK UI is
 * a client component mounted inside the SettingsDialog.
 *
 * Fields:
 *   id           — provider ID, matches PROVIDERS keys
 *   name         — display name
 *   type         — provider type, drives the test endpoint strategy
 *   defaultBaseUrl — used to pre-fill the Base URL field in the UI
 *   icon         — logo path under /public/openmaic/logos/
 *   keyHint      — placeholder shown in the API key input
 *   requiresKey  — false for keyless providers like Ollama
 */

export interface ByokProviderMeta {
  id: string;
  name: string;
  type: 'openai' | 'anthropic' | 'google' | 'zai';
  defaultBaseUrl: string;
  icon: string;
  keyHint: string;
  requiresKey: boolean;
}

const L = '/openmaic/logos';

export const BYOK_PROVIDERS: ByokProviderMeta[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai',
    defaultBaseUrl: 'https://api.openai.com/v1',
    icon: `${L}/openai.svg`,
    keyHint: 'sk-proj-...',
    requiresKey: true,
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    type: 'anthropic',
    defaultBaseUrl: 'https://api.anthropic.com',
    icon: `${L}/claude.svg`,
    keyHint: 'sk-ant-...',
    requiresKey: true,
  },
  {
    id: 'google',
    name: 'Google Gemini',
    type: 'google',
    defaultBaseUrl: 'https://generativelanguage.googleapis.com',
    icon: `${L}/gemini.svg`,
    keyHint: 'AIza...',
    requiresKey: true,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    type: 'openai',
    defaultBaseUrl: 'https://api.deepseek.com/v1',
    icon: `${L}/deepseek.svg`,
    keyHint: 'sk-...',
    requiresKey: true,
  },
  {
    id: 'glm',
    name: 'GLM (Zhipu)',
    type: 'openai',
    defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    icon: `${L}/glm.svg`,
    keyHint: '...',
    requiresKey: true,
  },
  {
    id: 'qwen',
    name: 'Qwen (DashScope)',
    type: 'openai',
    defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    icon: `${L}/qwen.svg`,
    keyHint: 'sk-...',
    requiresKey: true,
  },
  {
    id: 'kimi',
    name: 'Kimi (Moonshot)',
    type: 'openai',
    defaultBaseUrl: 'https://api.moonshot.cn/v1',
    icon: `${L}/kimi.png`,
    keyHint: 'sk-...',
    requiresKey: true,
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    type: 'anthropic',
    defaultBaseUrl: 'https://api.minimaxi.com/anthropic/v1',
    icon: `${L}/minimax.svg`,
    keyHint: '...',
    requiresKey: true,
  },
  {
    id: 'siliconflow',
    name: 'SiliconFlow',
    type: 'openai',
    defaultBaseUrl: 'https://api.siliconflow.cn/v1',
    icon: `${L}/siliconflow.svg`,
    keyHint: 'sk-...',
    requiresKey: true,
  },
  {
    id: 'doubao',
    name: 'Doubao (Volcengine Ark)',
    type: 'openai',
    defaultBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    icon: `${L}/doubao.svg`,
    keyHint: '...',
    requiresKey: true,
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    type: 'openai',
    defaultBaseUrl: 'https://openrouter.ai/api/v1',
    icon: `${L}/openrouter.svg`,
    keyHint: 'sk-or-...',
    requiresKey: true,
  },
  {
    id: 'grok',
    name: 'Grok (xAI)',
    type: 'openai',
    defaultBaseUrl: 'https://api.x.ai/v1',
    icon: `${L}/grok.svg`,
    keyHint: 'xai-...',
    requiresKey: true,
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi MiMo',
    type: 'openai',
    defaultBaseUrl: 'https://api.xiaomimimo.com/v1',
    icon: `${L}/xiaomi.svg`,
    keyHint: '...',
    requiresKey: true,
  },
  {
    id: 'ollama',
    name: 'Ollama (local)',
    type: 'openai',
    defaultBaseUrl: 'http://localhost:11434',
    icon: `${L}/ollama.svg`,
    keyHint: '(no key needed — local only)',
    requiresKey: false,
  },
  {
    id: 'freellmapi',
    name: 'FreeLLMAPI (free-tier router)',
    type: 'openai',
    defaultBaseUrl: 'http://localhost:3001/v1',
    icon: `${L}/freellmapi.svg`,
    keyHint: 'freellmapi-… (unified key from its dashboard)',
    requiresKey: true,
  },
  {
    id: 'medq-router',
    name: 'MedQ AI Router (this app)',
    type: 'openai',
    // Same-origin wire surface — the AI Router tab links this automatically,
    // so the default is only a prefill for manual adds.
    defaultBaseUrl: '/v1',
    icon: `${L}/freellmapi.svg`,
    keyHint: 'freellm… (unified key from the AI Router tab)',
    requiresKey: true,
  },
  {
    id: 'lemonade',
    name: 'Lemonade (local)',
    type: 'openai',
    defaultBaseUrl: 'http://localhost:13305/v1',
    icon: `${L}/lemonade.svg`,
    keyHint: '(no key needed — local only)',
    requiresKey: false,
  },
];

export const BYOK_PROVIDER_BY_ID: Record<string, ByokProviderMeta> = Object.fromEntries(
  BYOK_PROVIDERS.map((p) => [p.id, p]),
);

/** Monochrome SVG logos that need a dark background to render correctly. */
export const BYOK_MONO_LOGO_IDS: ReadonlySet<string> = new Set([
  'openai',
  'openrouter',
  'ollama',
  'siliconflow',
]);
