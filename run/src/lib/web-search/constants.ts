/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/web-search/constants.ts
 *
 * Web Search Provider Constants — verbatim port.
 *
 * OpenMAIC's `lib/web-search/types.ts` defines `WebSearchProviderId` as
 * a union of the five IDs in `WEB_SEARCH_PROVIDERS` below. MedQ's
 * `lib/web-search/types.ts` extends that union with `'zai'` (MedQ's
 * first-class web-search provider) but keeps the OpenMAIC IDs so ported
 * code that switches on provider ID compiles unchanged.
 *
 * This constants file is pure data — no side-effect imports — so it is
 * ported verbatim. MedQ's runtime web-search route (which uses ZAI's
 * `functions.web_search` exclusively) never consults this registry; it
 * is here only so the ported settings store can populate the
 * `webSearchProvidersConfig` defaults on rehydrate.
 */

import type { BaiduSubSources, WebSearchProviderId, WebSearchProviderConfig } from './types';

/**
 * Web Search Provider Registry
 */
export const WEB_SEARCH_PROVIDERS: Record<WebSearchProviderId, WebSearchProviderConfig> = {
  tavily: {
    id: 'tavily',
    name: 'Tavily',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.tavily.com',
    endpointPath: '/search',
    icon: '/logos/tavily.svg',
  },
  bocha: {
    id: 'bocha',
    name: 'Bocha',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.bocha.cn',
    endpointPath: '/v1/web-search',
    icon: '/logos/bocha.png',
  },
  brave: {
    id: 'brave',
    name: 'Brave Search',
    requiresApiKey: false,
    defaultBaseUrl: 'https://search.brave.com',
    endpointPath: '/search',
    icon: '/logos/brave.png',
  },
  baidu: {
    id: 'baidu',
    name: 'Baidu',
    requiresApiKey: true,
    defaultBaseUrl: 'https://qianfan.baidubce.com',
    endpointPath: '/v2/ai_search/web_search',
    icon: '/logos/baidu.png',
  },
  minimax: {
    id: 'minimax',
    name: 'MiniMax',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.minimaxi.com',
    endpointPath: '/v1/coding_plan/search',
    icon: '/logos/minimax.svg',
  },
  // `zai` is MedQ-only — the OpenMAIC source does not include this entry.
  // MedQ's runtime web-search route uses ZAI's `functions.web_search`
  // exclusively; this registry entry exists only so the type
  // `Record<WebSearchProviderId, WebSearchProviderConfig>` (which MedQ's
  // types.ts extends with `'zai'`) compiles. The default base URL points
  // at the ZAI SDK; the operator's .z-ai-config supplies the actual
  // credentials at runtime.
  zai: {
    id: 'zai',
    name: 'ZAI',
    requiresApiKey: false,
    defaultBaseUrl: 'https://api.z.ai/api/paas/v4',
    endpointPath: '/functions/web_search',
    icon: '/logos/zai.svg',
  },
};

/**
 * Baidu sub-source metadata. Used by the settings UI to label each
 * toggle. MedQ's ZAI adapter does not support Baidu sub-sources; the
 * field is accepted but ignored at the API level.
 */
export const BAIDU_SUB_SOURCES: Record<
  keyof BaiduSubSources,
  { labelKey: string; descriptionKey: string; docsUrl?: string }
> = {
  webSearch: {
    labelKey: 'settings.baiduSubSourceWeb',
    descriptionKey: 'settings.baiduSubSourceWebDescription',
    docsUrl: 'https://cloud.baidu.com/doc/qianfan/s/Mmh4sv6ec',
  },
  baike: {
    labelKey: 'settings.baiduSubSourceBaike',
    descriptionKey: 'settings.baiduSubSourceBaikeDescription',
    docsUrl: 'https://ai.baidu.com/ai-doc/AppBuilder/rmckc6mtu',
  },
  scholar: {
    labelKey: 'settings.baiduSubSourceScholar',
    descriptionKey: 'settings.baiduSubSourceScholarDescription',
    docsUrl: 'https://cloud.baidu.com/doc/qianfan/s/Amkw9qpzd',
  },
};

/**
 * Get the display name for a web search provider. Pure helper, ported
 * verbatim — the optional translator function `t` is passed through
 * unchanged so ported call sites continue to compile.
 */
export function getWebSearchProviderDisplayName(
  providerId: WebSearchProviderId,
  t?: (key: string) => string,
): string {
  const provider = WEB_SEARCH_PROVIDERS[providerId];
  if (!provider) return providerId;

  if (t) {
    const key = `settings.providerNames.${providerId}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
  }

  return provider.name;
}

/**
 * Get all available web search providers.
 */
export function getAllWebSearchProviders(): WebSearchProviderConfig[] {
  return Object.values(WEB_SEARCH_PROVIDERS);
}
