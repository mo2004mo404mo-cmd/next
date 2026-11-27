/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/server/web-search-config.ts
 *
 * MedQ adaptation: OpenMAIC supports tavily / bocha / brave / baidu / minimax
 * as web-search providers, each with their own allowlist of official base
 * URLs. MedQ uses ZAI's built-in web-search exclusively — `zai` is the only
 * provider ID that ever resolves here.
 *
 * The structure of the resolver (OFFICIAL_CLIENT_BASE_URLS allowlist +
 * resolveClassroomWebSearchConfig) is preserved verbatim so the ported
 * classroom-generation.ts caller compiles unchanged. The allowlist is
 * trimmed to just the ZAI entry; requests for any other provider ID will
 * throw "Unsupported <name> base URL".
 */

import {
  resolveServerWebSearchProviderId,
  resolveWebSearchApiKey,
  resolveWebSearchBaseUrl,
} from '@/lib/server/provider-config';
import { WEB_SEARCH_PROVIDERS } from '@/lib/web-search/constants';
import type { BaiduSubSources, WebSearchProviderId } from '@/lib/web-search/types';

const OFFICIAL_CLIENT_BASE_URLS: Record<WebSearchProviderId, string[]> = {
  // ZAI does not expose a configurable base URL for web search — auth comes
  // from `.z-ai-config`, and the SDK endpoint is fixed. An empty allowlist
  // means any client-supplied baseUrl is rejected.
  zai: [],
  tavily: ['https://api.tavily.com', 'https://api.tavily.com/search'],
  bocha: [
    'https://api.bocha.cn',
    'https://api.bocha.cn/v1',
    'https://api.bocha.cn/v1/web-search',
    'https://api.bochaai.com',
    'https://api.bochaai.com/v1',
    'https://api.bochaai.com/v1/web-search',
  ],
  brave: [
    'https://search.brave.com',
    'https://search.brave.com/search',
    'https://api.search.brave.com',
  ],
  baidu: ['https://qianfan.baidubce.com'],
  minimax: [
    'https://api.minimaxi.com',
    'https://api.minimaxi.com/v1',
    'https://api.minimaxi.com/v1/coding_plan',
    'https://api.minimaxi.com/v1/coding_plan/search',
    'https://api.minimax.io',
    'https://api.minimax.io/v1',
    'https://api.minimax.io/v1/coding_plan',
    'https://api.minimax.io/v1/coding_plan/search',
  ],
};

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, '');
}

function assertWebSearchProviderId(
  providerId: string | undefined,
): providerId is WebSearchProviderId {
  return !!providerId && providerId in WEB_SEARCH_PROVIDERS;
}

export function resolveSafeClientWebSearchBaseUrl(
  providerId: WebSearchProviderId,
  clientBaseUrl?: string,
): string | undefined {
  const trimmed = clientBaseUrl?.trim();
  if (!trimmed) return undefined;

  let normalized: string;
  try {
    const parsed = new URL(trimmed);
    normalized = normalizeBaseUrl(parsed.toString());
  } catch {
    throw new Error(`Unsupported ${WEB_SEARCH_PROVIDERS[providerId].name} base URL`);
  }

  const allowed = OFFICIAL_CLIENT_BASE_URLS[providerId].map(normalizeBaseUrl);
  if (!allowed.includes(normalized)) {
    throw new Error(`Unsupported ${WEB_SEARCH_PROVIDERS[providerId].name} base URL`);
  }
  return normalized;
}

export function resolveWebSearchRouteBaseUrl(
  providerId: WebSearchProviderId,
  clientBaseUrl?: string,
): string | undefined {
  const safeClientBaseUrl = resolveSafeClientWebSearchBaseUrl(providerId, clientBaseUrl);
  return resolveWebSearchBaseUrl(providerId, safeClientBaseUrl);
}

export function resolveClassroomWebSearchConfig(input: {
  webSearchProviderId?: WebSearchProviderId;
  webSearchApiKey?: string;
  baiduSubSources?: BaiduSubSources;
}):
  | {
      providerId: WebSearchProviderId;
      apiKey: string;
      baseUrl?: string;
      baiduSubSources?: BaiduSubSources;
    }
  | undefined {
  const requestedProviderId = assertWebSearchProviderId(input.webSearchProviderId)
    ? input.webSearchProviderId
    : undefined;
  const providerId =
    requestedProviderId ?? (resolveServerWebSearchProviderId() as WebSearchProviderId | undefined);
  if (!providerId) return undefined;

  const provider = WEB_SEARCH_PROVIDERS[providerId];
  const apiKey = resolveWebSearchApiKey(providerId, input.webSearchApiKey);
  if (provider.requiresApiKey && !apiKey) return undefined;

  return {
    providerId,
    apiKey,
    baseUrl: resolveWebSearchBaseUrl(providerId),
    ...(providerId === 'baidu' && input.baiduSubSources
      ? { baiduSubSources: input.baiduSubSources }
      : {}),
  };
}
