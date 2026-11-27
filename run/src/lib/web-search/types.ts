/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/web-search/types.ts
 *
 * Web Search Provider Type Definitions — MedQ adaptation.
 *
 * OpenMAIC supports tavily / bocha / brave / baidu / minimax as web-search
 * providers. MedQ uses ZAI's built-in `functions.web_search` exclusively
 * (when available), so the union here is just `'zai'`. The other provider
 * IDs are kept in the type for compatibility with ported call sites that
 * may still reference them, but they will never resolve to a configured
 * provider in MedQ.
 */

/**
 * Web Search Provider IDs.
 *
 * `'zai'` is MedQ's only first-class provider. The OpenMAIC IDs
 * (`tavily` / `bocha` / `brave` / `baidu` / `minimax`) are kept in the union
 * so ported code that switches on provider ID compiles, but they never
 * resolve to a configured provider in MedQ — `resolveServerWebSearchProviderId`
 * always returns `'zai'` (or `undefined` when no `.z-ai-config` is found).
 */
export type WebSearchProviderId = 'zai' | 'tavily' | 'bocha' | 'brave' | 'baidu' | 'minimax';

/**
 * Baidu sub-source toggles — kept verbatim from OpenMAIC for type compat.
 * MedQ's ZAI adapter does not support Baidu sub-sources; the field is
 * accepted but ignored.
 */
export interface BaiduSubSources {
  webSearch: boolean;
  baike: boolean;
  scholar: boolean;
}

/**
 * Web Search Provider Configuration — kept verbatim from OpenMAIC for type
 * compat. MedQ's ZAI adapter ignores everything except `id`.
 */
export interface WebSearchProviderConfig {
  id: WebSearchProviderId;
  name: string;
  requiresApiKey: boolean;
  defaultBaseUrl?: string;
  endpointPath: string;
  icon?: string;
}
