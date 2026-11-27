/**
 * Shared resilience layer for outbound AI-gateway calls (ZAI SDK and friends).
 *
 * Why this exists: the shared Z.AI gateway periodically 429-storms (observed
 * 2026-10-08 and again during the 2026-10-23 skill-testing session). Tool
 * calls that hit the gateway directly (image search, image edit, ASR, TTS,
 * web search, vision) failed hard and surfaced raw errors to students until
 * the storm passed. This module provides:
 *
 *   • withGatewayRetry — exponential backoff + jitter for transient errors
 *     (429 / 5xx / network). Non-transient errors (validation, auth, 4xx)
 *     propagate immediately.
 *   • createGatewayLimiter / withGatewaySlot — a process-wide concurrency
 *     cap so parallel agent tool calls don't amplify a rate-limited gateway
 *     (N simultaneous 429s make storms worse; queueing spreads them out).
 *
 * Env knobs (all optional):
 *   MEDQ_GATEWAY_RETRIES         — max retries per call (default 3)
 *   MEDQ_GATEWAY_BASE_DELAY_MS   — first backoff step (default 800)
 *   MEDQ_GATEWAY_MAX_CONCURRENCY — simultaneous gateway calls (default 3)
 */
import { createLogger } from '../logger';

const log = createLogger('GatewayResilience');

const RETRIES = clampInt(process.env.MEDQ_GATEWAY_RETRIES, 3, 0, 6);
const BASE_DELAY_MS = clampInt(process.env.MEDQ_GATEWAY_BASE_DELAY_MS, 800, 100, 10_000);
const MAX_CONCURRENCY = clampInt(process.env.MEDQ_GATEWAY_MAX_CONCURRENCY, 3, 1, 16);

function clampInt(raw: string | undefined, fallback: number, min: number, max: number): number {
  const value = parseInt(raw ?? '', 10);
  if (Number.isNaN(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

/** Transient gateway conditions worth retrying: rate limits (the gateway wraps
 * 429s in 500s sometimes), 5xx, and network-level failures. Everything else
 * (auth, validation, 4xx, code bugs) fails fast. */
export function isTransientGatewayError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  if (/\b429\b|too many requests|rate.?limit/i.test(message)) return true;
  if (/\b(?:500|502|503|504)\b/.test(message) && /status|http/i.test(message)) return true;
  return /ECONNRESET|ETIMEDOUT|EAI_AGAIN|fetch failed|network|timeout|timed out|service unavailable/i.test(message);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Full-jitter exponential backoff: wait uniform(0, base * 2^attempt). */
function backoffDelay(attempt: number): number {
  const ceiling = Math.min(BASE_DELAY_MS * 2 ** attempt, 15_000);
  return Math.random() * ceiling;
}

export interface GatewayRetryOptions {
  /** Caller-facing label used in warn logs (e.g. "search_medical_images"). */
  label?: string;
  /** Override the env-configured retry count for this call. */
  retries?: number;
  /** Optional signal; aborts the wait between retries. */
  signal?: AbortSignal;
}

/**
 * Run `fn`, retrying transient failures with full-jitter exponential backoff.
 * Never retries non-transient errors. Returns the first successful result or
 * rethrows the last error after the retry budget is spent.
 */
export async function withGatewayRetry<T>(
  fn: () => Promise<T>,
  options: GatewayRetryOptions = {},
): Promise<T> {
  const maxRetries = options.retries ?? RETRIES;
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries || !isTransientGatewayError(error)) throw error;
      const delay = Math.round(backoffDelay(attempt));
      log.warn?.(
        `${options.label ?? 'gateway call'} transient failure (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms:`,
        error instanceof Error ? error.message : error,
      );
      if (options.signal?.aborted) throw error;
      await sleep(delay);
    }
  }
  throw lastError;
}

// ── Process-wide concurrency limiter ────────────────────────────────────────
//
// A simple FIFO semaphore. Agent tool calls can fan out in parallel
// (LangGraph ToolNode runs sibling tool_calls concurrently); without a cap,
// a single "compare these 4 images" turn fires 4 simultaneous gateway calls
// and multiplies the chance of a 429 storm.

interface LimiterSlot {
  release: () => void;
}

class GatewayLimiter {
  private active = 0;
  private readonly queue: Array<() => void> = [];

  constructor(private readonly max: number) {}

  async acquire(): Promise<LimiterSlot> {
    if (this.active < this.max) {
      this.active += 1;
      return { release: () => this.releaseSlot() };
    }
    await new Promise<void>((resolve) => this.queue.push(resolve));
    this.active += 1;
    return { release: () => this.releaseSlot() };
  }

  private releaseSlot(): void {
    this.active -= 1;
    const next = this.queue.shift();
    if (next) next();
  }
}

const globalLimiter = new GatewayLimiter(MAX_CONCURRENCY);

/** Run `fn` while holding one global gateway slot (FIFO queue when full). */
export async function withGatewaySlot<T>(fn: () => Promise<T>): Promise<T> {
  const slot = await globalLimiter.acquire();
  try {
    return await fn();
  } finally {
    slot.release();
  }
}

/** Convenience: slot + retry combined (the standard wrapper for ZAI calls). */
export async function withGatewayResilience<T>(
  fn: () => Promise<T>,
  options: GatewayRetryOptions = {},
): Promise<T> {
  return withGatewaySlot(() => withGatewayRetry(fn, options));
}
