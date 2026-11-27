/**
 * Provider key testing — server-only.
 *
 * Verifies a user-supplied API key actually works against the upstream
 * provider, before we let the user save it (or as a "Test" button action).
 *
 * Strategy: do the CHEAPEST possible authenticated call against each provider:
 *   - OpenAI-compatible (OpenAI, DeepSeek, GLM, Qwen, Kimi, SiliconFlow,
 *     Doubao, OpenRouter, Grok, Xiaomi, Lemonade): GET /models with the
 *     Bearer key. Returns 200 if the key is valid.
 *   - Anthropic (incl. MiniMax which uses the Anthropic API): POST /v1/messages
 *     with a 1-token "hi" request. Returns 200 if the key is valid.
 *     (Anthropic has no /models endpoint that accepts only an API key.)
 *   - Google Gemini: GET /v1beta/models?key=… — returns 200 if key is valid.
 *   - Ollama: GET /api/tags — works without a key, so we just check the URL
 *     is reachable.
 *
 * We deliberately avoid importing the heavy @ai-sdk/* provider packages here —
 * this is a single fetch per test, and pulling in the SDK would balloon this
 * route's cold start.
 */

import { validateUrlForSSRF, safeFetch } from '@/lib/server/ssrf-guard';
import { BYOK_PROVIDER_BY_ID } from '@/lib/ai/byok-providers';

export interface TestKeyParams {
  apiKey: string;
  baseUrl: string | null;
}

export interface TestKeyResult {
  ok: boolean;
  error?: string;
  /** Model identifier returned by the upstream /models endpoint, if any. */
  model?: string;
  /** Full list of model IDs discovered at the upstream /models endpoint. */
  models?: string[];
}

const TIMEOUT_MS = 10_000;

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Stage 9: safeFetch pre-flights the URL AND pins the connect-time DNS
    // lookup through an undici Agent with a custom lookup that re-validates
    // IPs at connect time. This closes the DNS-rebinding TOCTOU gap between
    // the validateUrlForSSRF pre-flight (line 77) and the actual fetch.
    // See docs/runbook.md#ssrf-blocked.
    return await safeFetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve the base URL for a provider: explicit param > provider default > fail.
 */
function resolveBaseUrl(providerId: string, override: string | null): string | null {
  if (override && override.trim()) return override.trim();
  const provider = BYOK_PROVIDER_BY_ID[providerId];
  return provider?.defaultBaseUrl || null;
}

export async function testProviderApiKey(
  providerId: string,
  params: TestKeyParams,
): Promise<TestKeyResult> {
  const provider = BYOK_PROVIDER_BY_ID[providerId];
  if (!provider) {
    return { ok: false, error: `Unknown provider: ${providerId}` };
  }

  const baseUrl = resolveBaseUrl(providerId, params.baseUrl);
  if (!baseUrl) {
    return { ok: false, error: 'No base URL configured for this provider' };
  }

  // SSRF guard — same check the model resolver uses for unmanaged providers.
  if (process.env.NODE_ENV === 'production') {
    const ssrfError = await validateUrlForSSRF(baseUrl);
    if (ssrfError) return { ok: false, error: ssrfError };
  }

  try {
    return await dispatchTest(providerId, provider.type, baseUrl, params.apiKey);
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message || 'Network error while testing the key',
    };
  }
}

async function dispatchTest(
  providerId: string,
  providerType: string,
  baseUrl: string,
  apiKey: string,
): Promise<TestKeyResult> {
  // Ollama is keyless — just probe /api/tags.
  if (providerId === 'ollama' || providerId === 'lemonade') {
    try {
      const res = await fetchWithTimeout(`${baseUrl.replace(/\/v1\/?$/, '')}/api/tags`);
      if (res.ok) {
        // Parse model list from Ollama's /api/tags response.
        let models: string[] | undefined;
        try {
          const json = await res.json();
          if (Array.isArray(json?.models)) {
            models = json.models.map((m: any) => m.name || m.model).filter(Boolean);
          }
        } catch { /* informational only */ }
        return { ok: true, model: providerId, models };
      }
      return { ok: false, error: `${providerId} returned ${res.status}` };
    } catch (e: any) {
      return {
        ok: false,
        error: `Cannot reach ${providerId} at ${baseUrl}: ${e?.message || e}`,
      };
    }
  }

  // Anthropic-style API (also MiniMax which uses the Anthropic API):
  // POST /v1/messages with a 1-token "hi" — /v1/models doesn't accept
  // the simple API-key auth header.
  if (providerType === 'anthropic') {
    const url = `${baseUrl.replace(/\/$/, '')}/v1/messages`;
    try {
      const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'hi' }],
        }),
      });
      if (res.ok) return { ok: true, model: 'claude-haiku-4-5' };
      // 401/403 → bad key. 400/404 → bad model. 5xx → upstream issue.
      if (res.status === 401 || res.status === 403) {
        return { ok: false, error: `Invalid API key (HTTP ${res.status})` };
      }
      const text = await res.text().catch(() => '');
      return {
        ok: false,
        error: `Anthropic returned ${res.status}: ${text.slice(0, 200)}`,
      };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Network error' };
    }
  }

  // Google Gemini: GET /v1beta/models?key=…
  if (providerType === 'google') {
    const url = `${baseUrl.replace(/\/$/, '')}/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    try {
      const res = await fetchWithTimeout(url);
      if (res.ok) {
        let models: string[] | undefined;
        try {
          const json = await res.json();
          if (Array.isArray(json?.models)) {
            models = json.models.map((m: any) => m.name?.replace('models/', '')).filter(Boolean);
          }
        } catch { /* informational only */ }
        return { ok: true, model: 'gemini', models };
      }
      if (res.status === 400 || res.status === 401 || res.status === 403) {
        return { ok: false, error: `Invalid API key (HTTP ${res.status})` };
      }
      return { ok: false, error: `Google returned ${res.status}` };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Network error' };
    }
  }

  // Default: OpenAI-compatible — GET /models with Bearer auth.
  const url = `${baseUrl.replace(/\/$/, '')}/models`;
  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        authorization: `Bearer ${apiKey}`,
        accept: 'application/json',
      },
    });
    if (res.ok) {
      // Parse the full model list so the UI can populate the models section.
      let model: string | undefined;
      let models: string[] | undefined;
      try {
        const json = await res.json();
        const list = json?.data || json?.models;
        if (Array.isArray(list) && list.length > 0) {
          models = list.map((m: any) => m.id).filter(Boolean);
          model = models[0];
        }
      } catch {
        // Ignore — model is just informational.
      }
      return { ok: true, model, models };
    }
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: `Invalid API key (HTTP ${res.status})` };
    }
    const text = await res.text().catch(() => '');
    return {
      ok: false,
      error: `${providerId} returned ${res.status}: ${text.slice(0, 200)}`,
    };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Network error' };
  }
}
