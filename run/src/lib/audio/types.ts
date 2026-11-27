/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/types.ts
 *
 * Audio Provider Type Definitions.
 *
 * MedQ adaptation: the OpenMAIC TTS/ASR provider unions are ported verbatim
 * so the ported settings store (`lib/store/settings.ts`) compiles unchanged.
 * MedQ's runtime voice pipeline goes through /api/voice-tts using ZAI's TTS
 * service (browser-native is used as a client-side fallback), so most of
 * these provider IDs never resolve to a configured provider in MedQ — they
 * are accepted at the type level for compatibility with ported call sites.
 *
 * `'zai'` is added to the `TTSProviderId` union as MedQ's first-class TTS
 * provider (analogous to `'zai'` in `WebSearchProviderId`).
 */

// ============================================================================
// TTS (Text-to-Speech) Types
// ============================================================================

export type BuiltInTTSProviderId =
  | 'openai-tts'
  | 'azure-tts'
  | 'glm-tts'
  | 'qwen-tts'
  | 'voxcpm-tts'
  | 'doubao-tts'
  | 'elevenlabs-tts'
  | 'minimax-tts'
  | 'lemonade-tts'
  | 'browser-native-tts';

/**
 * TTS Provider ID.
 *
 * `'zai'` is MedQ's first-class TTS provider; the OpenMAIC built-in IDs are
 * kept for compatibility with the ported settings store.
 */
export type TTSProviderId =
  | 'zai'
  | BuiltInTTSProviderId
  | `custom-tts-${string}`;

/** Voice information for TTS. */
export interface TTSVoiceInfo {
  id: string;
  name: string;
  language: string;
  localeName?: string;
  gender?: 'male' | 'female' | 'neutral';
  description?: string;
  compatibleModels?: string[];
}

/** TTS Provider Configuration. */
export interface TTSProviderConfig {
  id: TTSProviderId;
  name: string;
  requiresApiKey: boolean;
  defaultBaseUrl?: string;
  icon?: string;
  models: Array<{ id: string; name: string }>;
  defaultModelId: string;
  voices: TTSVoiceInfo[];
  supportedFormats: string[];
  speedRange?: {
    min: number;
    max: number;
    default: number;
  };
}

/** TTS Model Configuration for API calls. */
export interface TTSModelConfig {
  providerId: TTSProviderId;
  modelId?: string;
  apiKey?: string;
  baseUrl?: string;
  voice: string;
  speed?: number;
  format?: string;
  providerOptions?: Record<string, unknown>;
}

// ============================================================================
// ASR (Automatic Speech Recognition) Types
// ============================================================================

export type BuiltInASRProviderId =
  | 'openai-whisper'
  | 'browser-native'
  | 'qwen-asr'
  | 'lemonade-asr'
  | 'azure-asr';

export type ASRProviderId = BuiltInASRProviderId | `custom-asr-${string}`;

/** ASR Provider Configuration. */
export interface ASRProviderConfig {
  id: ASRProviderId;
  name: string;
  requiresApiKey: boolean;
  defaultBaseUrl?: string;
  icon?: string;
  models: Array<{ id: string; name: string }>;
  defaultModelId: string;
  supportedLanguages: string[];
  supportedFormats: string[];
}

/** ASR Model Configuration for API calls. */
export interface ASRModelConfig {
  providerId: ASRProviderId;
  modelId?: string;
  apiKey?: string;
  baseUrl?: string;
  language?: string;
}

// ============================================================================
// Custom-provider predicates (verbatim from OpenMAIC)
// ============================================================================

/** Returns true if the provider ID is a user-defined custom TTS provider. */
export function isCustomTTSProvider(id: string): boolean {
  return id.startsWith('custom-tts-');
}

/** Returns true if the provider ID is a user-defined custom ASR provider. */
export function isCustomASRProvider(id: string): boolean {
  return id.startsWith('custom-asr-');
}
