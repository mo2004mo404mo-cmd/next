/**
 * Server-side Provider Configuration
 *
 * Restored from upstream OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * Original: lib/server/provider-config.ts (597 lines)
 *
 * Loads provider configs from YAML (primary) + environment variables (fallback).
 * Keys never leave the server — only provider IDs and metadata are exposed via API.
 *
 * MedQ adaptation: ZAI (the native LLM backend via z-ai-web-dev-sdk) is injected
 * as a synthetic managed provider into every section, resolved from `.z-ai-config`.
 * This means:
 *   - ZAI is ALWAYS available as a managed provider when `.z-ai-config` exists.
 *   - Operators can ALSO configure additional providers (OpenAI, Anthropic, GLM,
 *     MiniMax, VoxCPM TTS, Brave web search, etc.) via `server-providers.yml`
 *     or env vars — those providers become managed too.
 *   - The Settings UI in the browser can show all managed providers; users can
 *     add their own unmanaged providers (client-supplied keys) for anything
 *     the operator hasn't configured.
 *
 * This file is a merge of:
 *   - upstream's full multi-provider YAML+env loader (lines 1-597 verbatim)
 *   - medq's ZAI injection (resolveZaiConfig + ZAI provider entries)
 */

import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { readConfig as readZaiConfig } from '@/lib/zai';
import { createLogger } from '@/lib/logger';

const log = createLogger('ServerProviderConfig');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ServerProviderEntry {
  apiKey: string;
  baseUrl?: string;
  models?: string[];
  proxy?: string;
  /**
   * Admin/operator force-off switch. `false` disables the provider for ALL
   * clients regardless of the user's per-provider toggle (server precedence).
   * Currently honored for TTS only (#665).
   */
  enabled?: boolean;
}

interface ServerConfig {
  providers: Record<string, ServerProviderEntry>;
  tts: Record<string, ServerProviderEntry>;
  asr: Record<string, ServerProviderEntry>;
  pdf: Record<string, ServerProviderEntry>;
  image: Record<string, ServerProviderEntry>;
  video: Record<string, ServerProviderEntry>;
  webSearch: Record<string, ServerProviderEntry>;
  /** TTS provider IDs the operator force-disabled (server precedence). */
  ttsDisabled: Set<string>;
}

export type ProviderSection =
  | 'providers'
  | 'tts'
  | 'asr'
  | 'pdf'
  | 'image'
  | 'video'
  | 'webSearch';

// ---------------------------------------------------------------------------
// Env-var prefix mappings (verbatim from upstream)
// ---------------------------------------------------------------------------

const LLM_ENV_MAP: Record<string, string> = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GOOGLE: 'google',
  DEEPSEEK: 'deepseek',
  QWEN: 'qwen',
  KIMI: 'kimi',
  MINIMAX: 'minimax',
  GLM: 'glm',
  SILICONFLOW: 'siliconflow',
  DOUBAO: 'doubao',
  OPENROUTER: 'openrouter',
  GROK: 'grok',
  TENCENT: 'tencent-hunyuan',
  TENCENT_HUNYUAN: 'tencent-hunyuan',
  XIAOMI: 'xiaomi',
  MIMO: 'xiaomi',
  OLLAMA: 'ollama',
  LEMONADE: 'lemonade',
  FREELLMAPI: 'freellmapi',
};

const TTS_ENV_MAP: Record<string, string> = {
  TTS_OPENAI: 'openai-tts',
  TTS_AZURE: 'azure-tts',
  TTS_GLM: 'glm-tts',
  TTS_QWEN: 'qwen-tts',
  TTS_VOXCPM: 'voxcpm-tts',
  TTS_DOUBAO: 'doubao-tts',
  TTS_ELEVENLABS: 'elevenlabs-tts',
  TTS_MINIMAX: 'minimax-tts',
  TTS_LEMONADE: 'lemonade-tts',
};

/**
 * Env prefixes for the TTS force-disable switch (`TTS_<PREFIX>_ENABLED=false`).
 * Superset of TTS_ENV_MAP: browser-native has no credential env (it is
 * client-only) but operators may still want to force it off fleet-wide (#665).
 */
const TTS_DISABLE_ENV_MAP: Record<string, string> = {
  ...TTS_ENV_MAP,
  TTS_BROWSER_NATIVE: 'browser-native-tts',
};

const ASR_ENV_MAP: Record<string, string> = {
  ASR_OPENAI: 'openai-whisper',
  ASR_QWEN: 'qwen-asr',
  ASR_AZURE: 'azure-asr',
  ASR_LEMONADE: 'lemonade-asr',
};

const PDF_ENV_MAP: Record<string, string> = {
  PDF_UNPDF: 'unpdf',
  PDF_MINERU: 'mineru',
  PDF_MINERU_CLOUD: 'mineru-cloud',
};

const IMAGE_ENV_MAP: Record<string, string> = {
  IMAGE_OPENAI: 'openai-image',
  IMAGE_SEEDREAM: 'seedream',
  IMAGE_QWEN_IMAGE: 'qwen-image',
  IMAGE_NANO_BANANA: 'nano-banana',
  IMAGE_MINIMAX: 'minimax-image',
  IMAGE_GROK: 'grok-image',
  IMAGE_LEMONADE: 'lemonade',
};

const VIDEO_ENV_MAP: Record<string, string> = {
  VIDEO_SEEDANCE: 'seedance',
  VIDEO_KLING: 'kling',
  VIDEO_VEO: 'veo',
  VIDEO_SORA: 'sora',
  VIDEO_MINIMAX: 'minimax-video',
  VIDEO_GROK: 'grok-video',
  VIDEO_HAPPYHORSE: 'happyhorse',
};

const WEB_SEARCH_ENV_MAP: Record<string, string> = {
  TAVILY: 'tavily',
  BOCHA: 'bocha',
  BRAVE: 'brave',
  BAIDU: 'baidu',
  WEB_SEARCH_MINIMAX: 'minimax',
};

// ---------------------------------------------------------------------------
// ZAI config resolution (medq-specific)
// ---------------------------------------------------------------------------

interface ZAIResolvedConfig {
  apiKey: string;
  baseUrl?: string;
  hasConfig: boolean;
}

let _cachedZaiConfig: ZAIResolvedConfig | null = null;

function resolveZaiConfig(): ZAIResolvedConfig {
  if (_cachedZaiConfig) return _cachedZaiConfig;
  const config = readZaiConfig();
  _cachedZaiConfig = {
    apiKey: config?.apiKey || '',
    baseUrl: config?.baseUrl,
    hasConfig: !!config,
  };
  return _cachedZaiConfig;
}

/** Test hook: re-read .z-ai-config on next access (env changes in dev). */
export function _resetZaiConfigCacheForTests(): void {
  _cachedZaiConfig = null;
  _configs.clear();
}

// ---------------------------------------------------------------------------
// YAML loading (verbatim from upstream)
// ---------------------------------------------------------------------------

type YamlData = Partial<{
  providers: Record<string, Partial<ServerProviderEntry>>;
  tts: Record<string, Partial<ServerProviderEntry>>;
  asr: Record<string, Partial<ServerProviderEntry>>;
  pdf: Record<string, Partial<ServerProviderEntry>>;
  image: Record<string, Partial<ServerProviderEntry>>;
  video: Record<string, Partial<ServerProviderEntry>>;
  'web-search': Record<string, Partial<ServerProviderEntry>>;
}>;

function loadYamlFile(filename: string): YamlData {
  try {
    const filePath = path.join(process.cwd(), filename);
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = yaml.load(raw) as Record<string, unknown> | null;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as YamlData;
  } catch (e) {
    log.warn(`[ServerProviderConfig] Failed to load ${filename}:`, e);
    return {};
  }
}

// ---------------------------------------------------------------------------
// Env-var helpers (verbatim from upstream)
// ---------------------------------------------------------------------------

function loadEnvSection(
  envMap: Record<string, string>,
  yamlSection: Record<string, Partial<ServerProviderEntry>> | undefined,
  {
    requiresBaseUrl = false,
    keylessProviders = new Set<string>(),
  }: { requiresBaseUrl?: boolean; keylessProviders?: Set<string> } = {},
): Record<string, ServerProviderEntry> {
  const result: Record<string, ServerProviderEntry> = {};

  // First, add everything from YAML as defaults
  if (yamlSection) {
    for (const [id, entry] of Object.entries(yamlSection)) {
      if (
        requiresBaseUrl
          ? !!entry?.baseUrl
          : entry?.apiKey || (entry?.baseUrl && keylessProviders.has(id))
      ) {
        result[id] = {
          apiKey: entry.apiKey || '',
          baseUrl: entry.baseUrl,
          models: entry.models,
          proxy: entry.proxy,
          enabled: entry.enabled,
        };
      }
    }
  }

  // Then, apply env vars (env takes priority over YAML)
  for (const [prefix, providerId] of Object.entries(envMap)) {
    const envApiKey = process.env[`${prefix}_API_KEY`] || undefined;
    const envBaseUrl = process.env[`${prefix}_BASE_URL`] || undefined;
    const envModelsStr = process.env[`${prefix}_MODELS`];
    const envModels = envModelsStr
      ? envModelsStr
          .split(',')
          .map((m) => m.trim())
          .filter(Boolean)
      : undefined;

    if (result[providerId]) {
      // YAML entry exists — env vars override individual fields
      if (envApiKey) result[providerId].apiKey = envApiKey;
      if (envBaseUrl) result[providerId].baseUrl = envBaseUrl;
      if (envModels) result[providerId].models = envModels;
      continue;
    }

    // Activate on API key, or base URL alone for keyless providers (e.g. Ollama)
    if (
      requiresBaseUrl
        ? !envBaseUrl
        : !(envApiKey || (envBaseUrl && keylessProviders.has(providerId)))
    )
      continue;
    result[providerId] = {
      apiKey: envApiKey || '',
      baseUrl: envBaseUrl,
      models: envModels,
    };
  }

  return result;
}

/** Parse a boolean-ish env value. Falsey words ⇒ false; anything else ⇒ true. */
function parseBooleanEnv(raw: string): boolean {
  return !/^(false|0|no|off)$/i.test(raw.trim());
}

/**
 * Collect TTS provider IDs the operator force-disabled, from YAML
 * (`tts.<id>.enabled: false`) and env (`TTS_<PREFIX>_ENABLED=false`). An
 * explicit env `true` overrides a YAML disable (env precedence, matching the
 * rest of this module).
 */
function collectDisabledTTS(
  yamlTts: Record<string, Partial<ServerProviderEntry>> | undefined,
): Set<string> {
  const disabled = new Set<string>();
  if (yamlTts) {
    for (const [id, entry] of Object.entries(yamlTts)) {
      if (entry?.enabled === false) disabled.add(id);
    }
  }
  for (const [prefix, providerId] of Object.entries(TTS_DISABLE_ENV_MAP)) {
    const raw = process.env[`${prefix}_ENABLED`];
    // Treat unset / empty (e.g. a blank CI-templated value) as "no opinion" so
    // it never silently overrides an explicit YAML disable.
    if (raw === undefined || raw.trim() === '') continue;
    if (parseBooleanEnv(raw)) disabled.delete(providerId);
    else disabled.add(providerId);
  }
  return disabled;
}

// ---------------------------------------------------------------------------
// ZAI injection into a provider section (medq-specific)
// ---------------------------------------------------------------------------

/**
 * Inject ZAI as a synthetic managed provider into a section's config map.
 * ZAI is always "managed" when `.z-ai-config` exists, regardless of YAML/env.
 * This guarantees ZAI works out-of-the-box for medq deployments without any
 * operator configuration, while still allowing other providers to be added.
 *
 * If the operator has ALSO configured ZAI via YAML/env (unlikely but possible),
 * the YAML/env entry wins (matches the rest of this module's "env > YAML"
 * precedence — except here ZAI is injected last so it never overrides an
 * explicit operator config).
 */
function injectZaiProvider(
  sectionMap: Record<string, ServerProviderEntry>,
  options: { models?: string[] } = {},
): Record<string, ServerProviderEntry> {
  const zai = resolveZaiConfig();
  if (!zai.hasConfig) return sectionMap;
  // Don't override an explicit operator config for ZAI.
  if (sectionMap.zai) return sectionMap;
  return {
    ...sectionMap,
    zai: {
      apiKey: zai.apiKey,
      baseUrl: zai.baseUrl,
      models: options.models,
    },
  };
}

// ---------------------------------------------------------------------------
// Module-level cache (process singleton)
// ---------------------------------------------------------------------------

const DEFAULT_FILENAME = 'server-providers.yml';
const OPENAI_IMAGE_PROVIDER_ID = 'openai-image';

/** Cache keyed by YAML filename (empty string = default file). */
const _configs: Map<string, ServerConfig> = new Map();

function applyOpenAIImageFallback(
  imageConfig: Record<string, ServerProviderEntry>,
  yamlImageSection: Record<string, Partial<ServerProviderEntry>> | undefined,
): Record<string, ServerProviderEntry> {
  if (imageConfig[OPENAI_IMAGE_PROVIDER_ID]) return imageConfig;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return imageConfig;

  const yamlOpenAIImage = yamlImageSection?.[OPENAI_IMAGE_PROVIDER_ID];
  imageConfig[OPENAI_IMAGE_PROVIDER_ID] = {
    apiKey,
    baseUrl:
      yamlOpenAIImage?.baseUrl || process.env.IMAGE_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL,
    models: yamlOpenAIImage?.models,
    proxy: yamlOpenAIImage?.proxy,
  };
  return imageConfig;
}

function buildConfig(yamlData: YamlData): ServerConfig {
  const image = applyOpenAIImageFallback(
    loadEnvSection(IMAGE_ENV_MAP, yamlData.image, {
      keylessProviders: new Set(['lemonade']),
    }),
    yamlData.image,
  );

  // Build each section from YAML + env, then inject ZAI as a managed provider.
  const providers = injectZaiProvider(
    loadEnvSection(LLM_ENV_MAP, yamlData.providers, {
      keylessProviders: new Set(['ollama', 'lemonade']),
    }),
    { models: ['auto'] },
  );
  const tts = injectZaiProvider(
    loadEnvSection(TTS_ENV_MAP, yamlData.tts, {
      keylessProviders: new Set(['voxcpm-tts', 'lemonade-tts']),
    }),
  );
  const asr = injectZaiProvider(
    loadEnvSection(ASR_ENV_MAP, yamlData.asr, {
      keylessProviders: new Set(['lemonade-asr']),
    }),
  );
  const pdf = loadEnvSection(PDF_ENV_MAP, yamlData.pdf, { requiresBaseUrl: true });
  const video = injectZaiProvider(loadEnvSection(VIDEO_ENV_MAP, yamlData.video));
  const webSearch = injectZaiProvider(loadEnvSection(WEB_SEARCH_ENV_MAP, yamlData['web-search']));

  return {
    providers,
    tts,
    asr,
    pdf,
    image: injectZaiProvider(image, { models: ['auto'] }),
    video,
    webSearch,
    ttsDisabled: collectDisabledTTS(yamlData.tts),
  };
}

function logConfig(config: ServerConfig, label: string): void {
  const counts = [
    Object.keys(config.providers).length,
    Object.keys(config.tts).length,
    Object.keys(config.asr).length,
    Object.keys(config.pdf).length,
    Object.keys(config.image).length,
    Object.keys(config.video).length,
    Object.keys(config.webSearch).length,
  ];
  if (counts.some((c) => c > 0)) {
    log.info(
      `[ServerProviderConfig] Loaded (${label}): ${counts[0]} LLM, ${counts[1]} TTS, ${counts[2]} ASR, ${counts[3]} PDF, ${counts[4]} Image, ${counts[5]} Video, ${counts[6]} WebSearch providers`,
    );
  }
}

function getConfig(): ServerConfig {
  const cached = _configs.get('');
  if (cached) return cached;

  const yamlData = loadYamlFile(DEFAULT_FILENAME);
  const config = buildConfig(yamlData);
  logConfig(config, DEFAULT_FILENAME);
  _configs.set('', config);
  return config;
}

// ---------------------------------------------------------------------------
// Managed-provider resolution (verbatim from upstream)
// ---------------------------------------------------------------------------

/** Whether the operator configured this provider in the given section.
 *  ZAI is always considered configured when .z-ai-config exists. */
export function isServerConfiguredProvider(section: ProviderSection, providerId: string): boolean {
  return !!getConfig()[section][providerId];
}

function resolveSectionApiKey(
  section: ProviderSection,
  providerId: string,
  clientKey?: string,
): string {
  const entry = getConfig()[section][providerId];
  if (entry) return entry.apiKey || ''; // managed: server key is authoritative
  return clientKey || ''; // unmanaged: client-supplied key only
}

function resolveSectionBaseUrl(
  section: ProviderSection,
  providerId: string,
  clientBaseUrl?: string,
): string | undefined {
  const entry = getConfig()[section][providerId];
  if (entry) return entry.baseUrl; // managed: server base URL is authoritative
  return clientBaseUrl; // unmanaged: client-supplied base URL only
}

// ---------------------------------------------------------------------------
// Public API — LLM
// ---------------------------------------------------------------------------

/**
 * Returns server-configured LLM providers. Exposes only the allowed model list
 * and the "managed" flag (presence in this map) — never the API key or the
 * base URL, which can reveal internal gateway/proxy infrastructure.
 */
export function getServerProviders(): Record<string, { models?: string[] }> {
  const cfg = getConfig();
  const result: Record<string, { models?: string[] }> = {};
  for (const [id, entry] of Object.entries(cfg.providers)) {
    result[id] = {};
    if (entry.models && entry.models.length > 0) result[id].models = entry.models;
  }
  return result;
}

/** Resolve API key. Managed provider ⇒ server key; otherwise client key. */
export function resolveApiKey(providerId: string, clientKey?: string): string {
  return resolveSectionApiKey('providers', providerId, clientKey);
}

/** Resolve base URL. Managed provider ⇒ server URL; otherwise client URL. */
export function resolveBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  return resolveSectionBaseUrl('providers', providerId, clientBaseUrl);
}

/** Resolve proxy URL for a provider (server config only) */
export function resolveProxy(providerId: string): string | undefined {
  return getConfig().providers[providerId]?.proxy;
}

// ---------------------------------------------------------------------------
// Public API — TTS
// ---------------------------------------------------------------------------

/**
 * Returns TTS providers the client must know about: server-managed providers
 * (presence = managed flag, no base URLs) plus operator force-disabled
 * providers (`{ disabled: true }`). A force-disabled provider is reported as
 * disabled even when it is otherwise configured — disable wins (#665).
 */
export function getServerTTSProviders(): Record<string, { disabled?: boolean }> {
  const cfg = getConfig();
  const result: Record<string, { disabled?: boolean }> = {};
  for (const id of Object.keys(cfg.tts)) result[id] = {};
  for (const id of cfg.ttsDisabled) result[id] = { disabled: true };
  return result;
}

export function resolveTTSApiKey(providerId: string, clientKey?: string): string {
  return resolveSectionApiKey('tts', providerId, clientKey);
}

/** Whether the operator force-disabled this TTS provider (server precedence, #665). */
export function isServerTTSProviderDisabled(providerId: string): boolean {
  return getConfig().ttsDisabled.has(providerId);
}

export function resolveTTSBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  return resolveSectionBaseUrl('tts', providerId, clientBaseUrl);
}

/**
 * Resolve the TTS model. A managed provider may pin its model server-side
 * (`${PREFIX}_MODELS`, first entry) — authoritative like its key/baseUrl, since
 * the managed-provider UI does not expose a model field. Otherwise the client
 * model wins.
 */
export function resolveTTSModel(providerId: string, clientModel?: string): string | undefined {
  const entry = getConfig().tts[providerId];
  if (entry?.models && entry.models.length > 0) return entry.models[0];
  return clientModel;
}

// ---------------------------------------------------------------------------
// Public API — ASR
// ---------------------------------------------------------------------------

/** Returns server-configured ASR providers (managed flag only, no base URLs). */
export function getServerASRProviders(): Record<string, Record<string, never>> {
  return Object.fromEntries(Object.keys(getConfig().asr).map((id) => [id, {}]));
}

export function resolveASRApiKey(providerId: string, clientKey?: string): string {
  return resolveSectionApiKey('asr', providerId, clientKey);
}

export function resolveASRBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  return resolveSectionBaseUrl('asr', providerId, clientBaseUrl);
}

// ---------------------------------------------------------------------------
// Public API — PDF
// ---------------------------------------------------------------------------

/** Returns server-configured PDF providers (managed flag only, no base URLs). */
export function getServerPDFProviders(): Record<string, Record<string, never>> {
  return Object.fromEntries(Object.keys(getConfig().pdf).map((id) => [id, {}]));
}

export function resolvePDFApiKey(providerId: string, clientKey?: string): string {
  return resolveSectionApiKey('pdf', providerId, clientKey);
}

export function resolvePDFBaseUrl(providerId: string, clientBaseUrl?: string): string | undefined {
  return resolveSectionBaseUrl('pdf', providerId, clientBaseUrl);
}

// ---------------------------------------------------------------------------
// Public API — Image Generation
// ---------------------------------------------------------------------------

/** Returns server-configured image providers (allowed models only, no base URLs). */
export function getServerImageProviders(): Record<string, { models?: string[] }> {
  const cfg = getConfig();
  const result: Record<string, { models?: string[] }> = {};
  for (const [id, entry] of Object.entries(cfg.image)) {
    result[id] = {};
    if (entry.models && entry.models.length > 0) result[id].models = entry.models;
  }
  return result;
}

export function resolveImageApiKey(providerId: string, clientKey?: string): string {
  return resolveSectionApiKey('image', providerId, clientKey);
}

export function resolveImageBaseUrl(
  providerId: string,
  clientBaseUrl?: string,
): string | undefined {
  return resolveSectionBaseUrl('image', providerId, clientBaseUrl);
}

// ---------------------------------------------------------------------------
// Public API — Video Generation
// ---------------------------------------------------------------------------

/** Returns server-configured video providers (managed flag only, no base URLs). */
export function getServerVideoProviders(): Record<string, Record<string, never>> {
  return Object.fromEntries(Object.keys(getConfig().video).map((id) => [id, {}]));
}

export function resolveVideoApiKey(providerId: string, clientKey?: string): string {
  return resolveSectionApiKey('video', providerId, clientKey);
}

export function resolveVideoBaseUrl(
  providerId: string,
  clientBaseUrl?: string,
): string | undefined {
  return resolveSectionBaseUrl('video', providerId, clientBaseUrl);
}

// ---------------------------------------------------------------------------
// Public API — Web Search
// ---------------------------------------------------------------------------

/** Returns server-configured web search providers (managed flag only, no base URLs). */
export function getServerWebSearchProviders(): Record<string, Record<string, never>> {
  return Object.fromEntries(Object.keys(getConfig().webSearch).map((id) => [id, {}]));
}

/**
 * Resolve web search API key.
 *
 * Backward-compatible call shapes:
 * - resolveWebSearchApiKey(clientKey) -> Tavily key resolution
 * - resolveWebSearchApiKey(providerId, clientKey) -> provider-specific resolution
 */
export function resolveWebSearchApiKey(clientKey?: string): string;
export function resolveWebSearchApiKey(providerId: string, clientKey?: string): string;
export function resolveWebSearchApiKey(providerIdOrClientKey?: string, clientKey?: string): string {
  const hasProviderId = arguments.length >= 2;
  const providerId = hasProviderId ? providerIdOrClientKey || 'tavily' : 'tavily';
  const effectiveClientKey = hasProviderId ? clientKey : providerIdOrClientKey;
  return resolveSectionApiKey('webSearch', providerId, effectiveClientKey);
}

export function resolveWebSearchBaseUrl(
  providerId: string,
  clientBaseUrl?: string,
): string | undefined {
  return resolveSectionBaseUrl('webSearch', providerId, clientBaseUrl);
}

export function resolveServerWebSearchProviderId(preferredProviderId?: string): string | undefined {
  const webSearch = getConfig().webSearch;
  // ZAI is medq's default — prefer it if configured.
  if (webSearch.zai?.apiKey) return 'zai';
  if (preferredProviderId && webSearch[preferredProviderId]?.apiKey) {
    return preferredProviderId;
  }
  if (webSearch.tavily?.apiKey) return 'tavily';
  if (webSearch.bocha?.apiKey) return 'bocha';
  if (webSearch.baidu?.apiKey) return 'baidu';
  if (webSearch.minimax?.apiKey) return 'minimax';
  return Object.keys(webSearch)[0];
}

/**
 * Opt-in concurrency for parallel scene-content generation (#572).
 *
 * Returns the server-configured `PARALLEL_SCENE_CONCURRENCY`, clamped to
 * [0, 10]. `0` (the default) means the client keeps the original serial
 * generation loop; a value `> 1` enables the hybrid two-phase path. Kept
 * server-side because many deployments use API keys with low per-key
 * concurrency quotas, where a bursty default would surface as 429s.
 */
export function getParallelSceneConcurrency(): number {
  const raw = Number.parseInt(process.env.PARALLEL_SCENE_CONCURRENCY ?? '', 10);
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  return Math.min(raw, 10);
}
