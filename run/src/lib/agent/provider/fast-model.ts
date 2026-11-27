import { ChatOpenAI } from '@langchain/openai';
import { normalizeBaseUrl, poolBaseUrl } from './key-pool';
import { readConfig as readZaiConfig } from '../../zai';

/**
 * Per-task model routing — the FAST model builder (now OPT-IN only).
 *
 * REVERTED 2026-10-25: the default used to route auxiliary workloads to a
 * separate glm-4.5-flash model id, which rate-limited/hung independently
 * of the primary and surfaced as "no data from the server for 3 minutes"
 * stalls. The default is now DISABLED — every workload (main loop,
 * subagents, thread titles, chat digests, skill drafts) runs on the SAME
 * auto model resolved from the env chain (MEDQ_AGENT_MODEL via
 * MEDQ_AGENT_BASE_URL/MEDQ_AGENT_API_KEY). Set MEDQ_AGENT_FAST_MODEL to a
 * model id to re-enable per-task routing explicitly:
 *
 *   MEDQ_AGENT_FAST_MODEL      model id (default off; "off"/blank disables)
 *   MEDQ_AGENT_FAST_BASE_URL   explicit endpoint (default: the primary's)
 *   MEDQ_AGENT_FAST_API_KEY    explicit key     (default: the primary's)
 *
 * All model instances built here carry a request TIMEOUT so a hung gateway
 * call errors into the existing retry/fallback ladders instead of parking
 * the turn forever (the root behavior behind the 3-minute client watchdog).
 *
 * BYOK safety rule: with NO explicit fast endpoint/key, the fast model would
 * inherit the PRIMARY provider's credentials. That is only correct when the
 * primary IS the operator-configured gateway (Auto / env chain), which serves
 * the fast model id. When the user hand-picks a model on a different provider
 * (BYOK endpoint), inheriting would point e.g. glm-4.5-flash at a provider
 * that does not serve it — so the fast model is disabled for that turn and
 * auxiliary tasks inherit the picked model instead (routing stays correct,
 * nothing breaks).
 */

export interface FastModelPrimaryConfig {
  baseUrl: string;
  apiKey: string;
  defaultHeaders?: Record<string, string>;
}

/** The fast model id when per-task routing is enabled, else null.
 * DISABLED by default since the 2026-10-25 revert — opt in via env. */
export function fastModelName(): string | null {
  const name = (process.env.MEDQ_AGENT_FAST_MODEL ?? 'off').trim();
  if (!name || /^(off|none|false|disabled)$/i.test(name)) return null;
  return name;
}

/** True when the fast model has an explicitly configured endpoint or key. */
function hasExplicitFastEndpoint(): boolean {
  return Boolean(
    (process.env.MEDQ_AGENT_FAST_BASE_URL || '').trim() ||
    (process.env.MEDQ_AGENT_FAST_API_KEY || '').trim(),
  );
}

/** True when `primary.baseUrl` is the env-configured gateway the fast model
 * id belongs to (the chain MEDQ_AGENT_API_KEY / OPENAI_API_KEY serves). */
function primaryIsDefaultChain(primary: FastModelPrimaryConfig): boolean {
  const gateway = poolBaseUrl();
  if (!gateway) return true; // no env gateway → primary IS the configured chain
  return normalizeBaseUrl(primary.baseUrl) === gateway;
}

/**
 * Build the fast model for this turn, or null when it should be skipped
 * (disabled by env, or the BYOK safety rule above fires). The runtime passes
 * the resolved primary config; standalone callers (chat digest API) omit it
 * and get the env-default chain.
 */
export function buildFastModel(
  primary?: FastModelPrimaryConfig | null,
): ChatOpenAI | null {
  const name = fastModelName();
  if (!name) return null;

  const explicit = hasExplicitFastEndpoint();
  if (!explicit && primary && !primaryIsDefaultChain(primary)) {
    // Hand-picked provider cannot be assumed to serve the fast model id.
    return null;
  }

  const baseUrl = (process.env.MEDQ_AGENT_FAST_BASE_URL || '').trim()
    || primary?.baseUrl
    || process.env.MEDQ_AGENT_BASE_URL
    || process.env.OPENAI_BASE_URL
    || 'https://api.openai.com/v1';
  const apiKey = (process.env.MEDQ_AGENT_FAST_API_KEY || '').trim()
    || primary?.apiKey
    || process.env.MEDQ_AGENT_API_KEY
    || process.env.OPENAI_API_KEY
    || '';
  if (!apiKey) return null;

  const configuration: { baseURL: string; defaultHeaders?: Record<string, string> } = {
    baseURL: baseUrl,
  };
  if (primary?.defaultHeaders) configuration.defaultHeaders = primary.defaultHeaders;

  return new ChatOpenAI({
    apiKey,
    model: name,
    temperature: 0.3,
    configuration,
    maxRetries: 4,
    // A hung gateway request must error into the retry ladder, not park
    // the turn (the 3-minute no-data stalls).
    timeout: 60_000,
  });
}

/** Per-request timeout for auxiliary (non-chat-loop) model calls. */
export const AUX_MODEL_TIMEOUT_MS = 60_000;

/**
 * The ORIGINAL auto model — the env-chain primary (MEDQ_AGENT_* / OPENAI_*),
 * else the managed Z.AI config. This is the same chain the chat runtime's
 * default provider uses, so everything built here behaves exactly like the
 * main agent's Auto selection. Returns null when nothing is configured.
 */
export function buildPrimaryEnvModel(): ChatOpenAI | null {
  const envKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY;
  if (envKey) {
    return new ChatOpenAI({
      apiKey: envKey,
      model: process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.3,
      maxRetries: 2,
      timeout: AUX_MODEL_TIMEOUT_MS,
      configuration: {
        baseURL: (
          process.env.MEDQ_AGENT_BASE_URL
          || process.env.OPENAI_BASE_URL
          || 'https://api.openai.com/v1'
        ).replace(/\/$/, ''),
      },
    });
  }

  try {
    const zai = readZaiConfig();
    if (zai?.apiKey && zai.baseUrl) {
      const headers: Record<string, string> = { 'X-Z-AI-From': 'Z' };
      if (zai.token) headers['X-Token'] = zai.token;
      return new ChatOpenAI({
        apiKey: zai.apiKey,
        model: process.env.ZAI_FALLBACK_MODEL || 'glm-4.5',
        temperature: 0.3,
        maxRetries: 2,
        timeout: AUX_MODEL_TIMEOUT_MS,
        configuration: { baseURL: zai.baseUrl, defaultHeaders: headers },
      });
    }
  } catch {
    // fall through — no provider
  }
  return null;
}

/**
 * The model auxiliary tasks should use, in priority order:
 *   1. the explicitly-configured fast model (opt-in per-task routing);
 *   2. the env-chain primary (the auto model — the default since the
 *      2026-10-25 revert);
 *   3. the managed Z.AI backup.
 * Consumers: thread titles, chat unread digests, AI skill drafts, follow-up
 * suggestion generation. Never null when ANY provider is configured.
 */
export function buildAuxModel(primary?: FastModelPrimaryConfig | null): ChatOpenAI | null {
  return buildFastModel(primary) ?? buildPrimaryEnvModel() ?? buildZaiBackupModel();
}

/**
 * The managed Z.AI backup as a ready-to-call model (same chain the chat
 * runtime's 3rd fallback rung uses — readConfig resolves .z-ai-config or the
 * ZAI_API_KEY/ZAI_BASE_URL env pair). Returns null when not configured.
 * Used by the chat digest when the primary gateway is in a sustained 429
 * storm; NOT imported from deep-agent-runtime to avoid a dependency cycle.
 */
export function buildZaiBackupModel(): ChatOpenAI | null {
  let zai: { baseUrl?: string; apiKey?: string; token?: string } | null = null;
  try {
    zai = readZaiConfig();
  } catch {
    zai = null;
  }
  if (!zai?.apiKey || !zai.baseUrl) return null;
  const model = process.env.ZAI_FALLBACK_MODEL || 'glm-4.5';
  const headers: Record<string, string> = { 'X-Z-AI-From': 'Z' };
  if (zai.token) headers['X-Token'] = zai.token;
  return new ChatOpenAI({
    apiKey: zai.apiKey,
    model,
    temperature: 0.3,
    configuration: { baseURL: zai.baseUrl, defaultHeaders: headers },
    maxRetries: 2,
    timeout: AUX_MODEL_TIMEOUT_MS,
  });
}
