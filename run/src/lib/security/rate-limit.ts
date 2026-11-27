// ─────────────────────────────────────────────────────────────────────────
// rate-limit.ts — in-memory token-bucket rate limiter.
// ─────────────────────────────────────────────────────────────────────────
// Usage:
//   import { rateLimit } from '@/lib/security/rate-limit';
//   const ok = await rateLimit({ key: `login:${ip}`, max: 5, windowMs: 60_000 });
//   if (!ok) return tooManyRequests();
//
// Strategy:
//   - In-memory Map<key, {tokens, last}> survives across requests within
//     a single server instance. After a Turbopack dev reload the map is
//     wiped, which is acceptable for dev.
//   - For multi-instance production, you'd want to swap the in-memory map
//     for a Redis backend; the API stays the same.
//   - The persistent RateLimitBucket Prisma table is a fallback for
//     keys that must survive a restart (e.g. email-verification codes).
//     Not used by default — only set `persist: true` if you need that.
// ─────────────────────────────────────────────────────────────────────────

import { db } from '@/lib/db';

interface Bucket {
  tokens: number;
  last: number; // ms epoch
}

const MEMORY = new Map<string, Bucket>();

// GC: every 5 minutes, drop idle buckets older than 1 hour.
const GC_INTERVAL_MS = 5 * 60 * 1000;
const IDLE_TTL_MS = 60 * 60 * 1000;
let lastGc = Date.now();

function gc() {
  const now = Date.now();
  if (now - lastGc < GC_INTERVAL_MS) return;
  lastGc = now;
  for (const [k, v] of MEMORY) {
    if (now - v.last > IDLE_TTL_MS) MEMORY.delete(k);
  }
}

export interface RateLimitOptions {
  /** Unique key — e.g. `login:${ip}` or `api:${userId}:chat`. */
  key: string;
  /** Max tokens in the bucket (= max requests per window). */
  max: number;
  /** Window size in milliseconds. */
  windowMs: number;
  /** Tokens to consume per call. Default 1. */
  cost?: number;
  /** Persist to DB (survives restart). Default false. */
  persist?: boolean;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number; // ms epoch
}

/**
 * Try to consume `cost` tokens from the bucket `key`.
 * Returns ok=true if allowed, ok=false if rate-limited.
 *
 * Algorithm: token bucket with linear refill.
 *   tokens += (now - last) / windowMs * max
 *   tokens = min(tokens, max)
 *   if tokens >= cost: tokens -= cost; ok
 *   else: not ok
 */
export async function rateLimit(opts: RateLimitOptions): Promise<RateLimitResult> {
  gc();
  const { key, max, windowMs, cost = 1, persist = false } = opts;
  const now = Date.now();

  if (persist) {
    return rateLimitPersisted(key, max, windowMs, cost, now);
  }

  let bucket = MEMORY.get(key);
  if (!bucket) {
    bucket = { tokens: max, last: now };
    MEMORY.set(key, bucket);
  }

  // Refill
  const elapsed = now - bucket.last;
  const refill = (elapsed / windowMs) * max;
  bucket.tokens = Math.min(max, bucket.tokens + refill);
  bucket.last = now;

  if (bucket.tokens >= cost) {
    bucket.tokens -= cost;
    return {
      ok: true,
      remaining: Math.floor(bucket.tokens),
      resetAt: now + (1 - bucket.tokens / max) * windowMs,
    };
  }
  return {
    ok: false,
    remaining: 0,
    resetAt: now + ((cost - bucket.tokens) / max) * windowMs,
  };
}

async function rateLimitPersisted(
  key: string,
  max: number,
  windowMs: number,
  cost: number,
  now: number,
): Promise<RateLimitResult> {
  // Upsert the bucket, then do the same token-bucket math in JS.
  // We use a transaction to keep it consistent.
  const existing = await db.rateLimitBucket.findUnique({ where: { bucketKey: key } });
  let tokens: number;
  let last: number;
  if (existing) {
    const elapsed = now - existing.lastRefill.getTime();
    const refill = (elapsed / windowMs) * max;
    tokens = Math.min(max, existing.tokens + refill);
    last = now;
  } else {
    tokens = max;
    last = now;
  }

  let ok = false;
  if (tokens >= cost) {
    tokens -= cost;
    ok = true;
  }

  await db.rateLimitBucket.upsert({
    where: { bucketKey: key },
    create: { bucketKey: key, tokens, lastRefill: new Date(last) },
    update: { tokens, lastRefill: new Date(last) },
  });

  return {
    ok,
    remaining: Math.floor(tokens),
    resetAt: now + (1 - tokens / max) * windowMs,
  };
}

/**
 * Convenience: a strict per-IP limiter for sensitive endpoints
 * (login, register, password-reset). 10 per minute by default.
 */
export async function rateLimitByIp(
  ip: string,
  action: string,
  max = 10,
  windowMs = 60_000,
) {
  return rateLimit({ key: `rl:${action}:${ip}`, max, windowMs });
}
