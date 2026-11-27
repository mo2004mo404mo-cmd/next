/**
 * Agent API key pool — rate-limit mitigation through key rotation.
 *
 * MEDQ_AGENT_API_KEYS (comma-separated) declares ADDITIONAL keys for the same
 * operator-configured provider/endpoint as MEDQ_AGENT_API_KEY. When the
 * primary key hits a provider rate limit (429 / "too many requests" / 5xx
 * storm), the chat runtime's attempt loop rotates to the next healthy pool
 * key on the SAME endpoint BEFORE falling back to the managed Z.AI backup
 * service. Rotation is capped at one hop per turn — brief storms are already
 * absorbed inside the model call (ChatOpenAI maxRetries + modelRetryMiddleware);
 * the pool hop covers sustained per-key quota exhaustion.
 *
 * Keys only apply to the env-configured provider (MEDQ_AGENT_BASE_URL /
 * OPENAI_BASE_URL): a user-picked model or the Z.AI backup runs on its own
 * credentials and is never rotated.
 */

export interface AgentKeyPool {
  /** De-duplicated, non-empty keys. keys[0] is the primary. */
  keys: string[];
  size: number;
}

/** Resolve the pool from env: primary first, then MEDQ_AGENT_API_KEYS extras. */
export function resolveAgentKeyPool(): AgentKeyPool {
  const primary = (process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '').trim();
  const extras = (process.env.MEDQ_AGENT_API_KEYS || '')
    .split(',')
    .map((key) => key.trim())
    .filter((key) => key.length > 0 && key !== primary);
  const keys = [primary, ...extras].filter(Boolean);
  return { keys, size: keys.length };
}

/**
 * The next pool key that differs from `avoid` (the key that just failed).
 * Returns null when the pool offers no alternative.
 */
export function nextPoolKey(pool: AgentKeyPool, avoid?: string | null): string | null {
  if (pool.size === 0) return null;
  if (!avoid) return pool.keys[0];
  const index = pool.keys.indexOf(avoid);
  if (index >= 0) {
    if (pool.size === 1) return null;
    return pool.keys[(index + 1) % pool.size];
  }
  return pool.keys[0];
}

/** Normalize a base URL for comparison (trim trailing slashes). */
export function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

/** The base URL the pool keys belong to (env-configured provider), or null. */
export function poolBaseUrl(): string | null {
  const raw = process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || '';
  return raw ? normalizeBaseUrl(raw) : null;
}
