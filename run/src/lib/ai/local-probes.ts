/**
 * Fast local-runtime probes for keyless providers (Ollama, Lemonade).
 *
 * Used by the provider catalog to decide whether a local inference server is
 * up, and — when the server exposes a model list — what concrete model ids to
 * show instead of the static registry defaults.
 *
 * Contract: these probes are fired from `Promise.all` inside
 * `buildProviderCatalog`, so they must NEVER reject — every failure path
 * resolves to `{ ok: false }`. Timeouts are deliberately short (the catalog
 * render path waits on all probes before answering the client).
 */

export interface LocalProbeResult {
  ok: boolean;
  /** Model ids reported by the local server, when it exposes a model list. */
  models?: string[];
}

/** Abort-based fetch with a hard timeout; resolves null on any failure. */
async function fetchJson(url: string, timeoutMs: number): Promise<unknown | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) return null;
      return (await res.json()) as unknown;
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return null;
  }
}

function normalizeBaseUrl(raw: string | undefined, fallback: string): string {
  const url = (raw || fallback).trim();
  return url.replace(/\/+$/, '');
}

/**
 * Probe a native Ollama server (`GET {base}/api/tags`).
 * `ok` only when the daemon answers AND reports at least one installed model.
 */
export async function probeOllama(): Promise<LocalProbeResult> {
  const baseUrl = normalizeBaseUrl(process.env.OLLAMA_BASE_URL, 'http://127.0.0.1:11434');
  // An OpenAI-compatible gateway configured as OLLAMA_BASE_URL has no
  // /api/tags route — that resolves to { ok: false } and the catalog falls
  // back to the static registry models, which is the desired behaviour.
  const data = await fetchJson(`${baseUrl}/api/tags`, 3000);
  if (!data || typeof data !== 'object') return { ok: false };
  const models = (data as { models?: Array<{ name?: string; model?: string }> }).models;
  if (!Array.isArray(models) || models.length === 0) return { ok: false };
  const ids = models
    .map((m) => (typeof m?.name === 'string' && m.name ? m.name : m?.model))
    .filter((id): id is string => typeof id === 'string' && id.length > 0);
  if (ids.length === 0) return { ok: false };
  return { ok: true, models: ids };
}

/**
 * Probe a Lemonade Server instance (`GET {base}/models`, OpenAI-shaped).
 * Lemonade always serves its model list at the /v1 OpenAI route, so the env
 * base URL (which conventionally carries the /v1 suffix) is used as-is.
 */
export async function probeLemonade(): Promise<LocalProbeResult> {
  const baseUrl = normalizeBaseUrl(process.env.LEMONADE_BASE_URL, 'http://127.0.0.1:13305/v1');
  const data = await fetchJson(`${baseUrl}/models`, 2500);
  if (!data || typeof data !== 'object') return { ok: false };
  const list = (data as { data?: Array<{ id?: string }> }).data;
  if (!Array.isArray(list)) return { ok: false };
  const ids = list
    .map((m) => (typeof m?.id === 'string' ? m.id : ''))
    .filter((id) => id.length > 0);
  if (ids.length === 0) return { ok: false };
  return { ok: true, models: ids };
}
