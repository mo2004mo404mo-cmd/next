/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/types/provider.ts
 *
 * AI Provider Type Definitions — full ThinkingConfig type plus the surrounding
 * ModelInfo / ProviderConfig shape that MedQ needs to compile ported generation
 * code. MedQ does not yet expose a settings UI for these knobs; only the type
 * contract is required by the ported scene-generator.
 */

/**
 * Built-in provider IDs recognized by MedQ's ported generation code.
 */
export type BuiltInProviderId =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'deepseek'
  | 'qwen'
  | 'kimi'
  | 'minimax'
  | 'glm'
  | 'siliconflow'
  | 'doubao'
  | 'openrouter'
  | 'grok'
  | 'tencent-hunyuan'
  | 'xiaomi'
  | 'lemonade'
  | 'ollama'
  | 'freellmapi'
  | 'zai';

/** Provider ID (built-in or custom). */
export type ProviderId = BuiltInProviderId | `custom-${string}`;

/** Provider API families. */
export type ProviderType = 'openai' | 'anthropic' | 'google';

export type ThinkingControlType =
  | 'none'
  | 'toggle'
  | 'toggle-budget'
  | 'effort'
  | 'level'
  | 'mode'
  | 'budget-only';

export type ThinkingMode = 'default' | 'disabled' | 'enabled' | 'auto';
export type ThinkingEffort = 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max';
export type ThinkingLevel = 'minimal' | 'low' | 'medium' | 'high';

export type ThinkingRequestAdapter =
  | 'none'
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'qwen'
  | 'deepseek'
  | 'kimi'
  | 'glm'
  | 'siliconflow'
  | 'doubao'
  | 'openrouter'
  | 'hunyuan'
  | 'xiaomi'
  | 'lemonade';

/**
 * Describes a model's thinking/reasoning API control capability.
 * Models without thinking support simply omit this field from capabilities.
 */
export interface ThinkingCapability {
  control?: ThinkingControlType;
  requestAdapter?: ThinkingRequestAdapter;
  defaultMode?: ThinkingMode;
  effortValues?: ThinkingEffort[];
  defaultEffort?: ThinkingEffort;
  levelValues?: ThinkingLevel[];
  defaultLevel?: ThinkingLevel;
  budgetRange?: {
    min: number;
    max: number;
    step?: number;
    allowDynamic?: boolean;
    disableValue?: number;
  };
  defaultBudgetTokens?: number;
  anthropicThinking?: {
    type: 'adaptive' | 'enabled';
    budgetByEffort?: Partial<Record<ThinkingEffort, number>>;
  };
  toggleable?: boolean;
  budgetAdjustable?: boolean;
  defaultEnabled?: boolean;
}

/**
 * Unified thinking configuration for LLM calls.
 * The adapter maps this to provider-specific providerOptions.
 */
export interface ThinkingConfig {
  mode?: ThinkingMode;
  effort?: ThinkingEffort;
  level?: ThinkingLevel;
  enabled?: boolean;
  budgetTokens?: number;
  excludeReasoningOutput?: boolean;
}

/** Model information. */
export interface ModelInfo {
  id: string;
  name: string;
  contextWindow?: number;
  outputWindow?: number;
  capabilities?: {
    streaming?: boolean;
    tools?: boolean;
    vision?: boolean;
    thinking?: ThinkingCapability;
  };
}

/** Provider configuration. */
export interface ProviderConfig {
  id: ProviderId;
  name: string;
  type: ProviderType;
  defaultBaseUrl?: string;
  alternateBaseUrls?: { label: string; url: string }[];
  requiresApiKey: boolean;
  icon?: string;
  models: ModelInfo[];
}

/** Model configuration for API calls. */
export interface ModelConfig {
  providerId: ProviderId;
  modelId: string;
  apiKey: string;
  baseUrl?: string;
  proxy?: string;
  providerType?: ProviderType;
}
