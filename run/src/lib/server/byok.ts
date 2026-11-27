/**
 * BYOK service — server-only.
 *
 * Single API for reading/writing user-supplied AI provider API keys.
 * Wraps Prisma + byok-crypto so callers never touch the DB or crypto directly.
 *
 * Resolution order at request time (see resolve-model.ts → resolveModel):
 *   1. Server-managed provider (operator's key in env/YAML/.z-ai-config) — wins.
 *   2. Client-sent key (x-api-key header) — classroom BYOK via localStorage.
 *   3. User-saved BYOK endpoint (this module) — app-level, encrypted in DB.
 *   4. Nothing → 401/error.
 *
 * #3 is what this module provides. It exists so that:
 *   - Keys sync across the user's devices (server-side storage, not localStorage).
 *   - Keys never appear in the browser's localStorage/IndexedDB (security).
 *   - All app features (AI chat, tutor, explain, classroom, …) can share one
 *     pool of user keys instead of every feature reinventing BYOK.
 *
 * ── MULTI-ENDPOINT (several keys / base URLs per provider) ──
 * A user may save MULTIPLE endpoints for the same provider — e.g. an OpenAI
 * key plus a corporate-gateway key, or (the classic case) a remote Ollama at
 * https://ollama2.space-z.ai plus a local Ollama at http://localhost:11434.
 * Each UserApiKey row is one ENDPOINT = (optional key, optional baseUrl,
 * label, enabled, priority). The resolver:
 *   - orders enabled endpoints by (priority ASC, createdAt ASC)
 *   - picks `slot` for a request — default is ROUND-ROBIN across the list
 *     (distributes load across keys / spreads rate limits)
 *   - callChat fails over: if the chosen endpoint errors, the next endpoint
 *     is tried, up to endpointCount attempts in total.
 * The baseUrl and the key of one row ALWAYS travel together — an endpoint
 * row describes one complete destination, never a mix-and-match.
 */

import { db } from '@/lib/db';
import {
  encryptApiKey,
  decryptApiKey,
  maskApiKey,
  type EncryptedKey,
} from '@/lib/server/byok-crypto';
import { createLogger } from '@/lib/logger';

const log = createLogger('BYOK');

// ── Public types ──

export interface ByokModelConfig {
  id: string;
  name: string;
  capabilities?: { vision?: boolean; tools?: boolean; streaming?: boolean };
  contextWindow?: number;
  outputWindow?: number;
}

export interface UserApiKeyMeta {
  /** Row id — the endpoint handle (a user may have several per provider). */
  id: string;
  /** Provider ID, e.g. "openai" — matches PROVIDERS in src/lib/ai/providers.ts */
  providerId: string;
  /** Optional base URL override (for OpenAI-compatible proxies / local Ollama). */
  baseUrl: string | null;
  /** Optional user label. */
  label: string | null;
  /** Masked key, e.g. "sk-pr••••789" — for display only, never the real key. */
  maskedKey: string;
  enabled: boolean;
  /** Endpoint order within the provider — lower = tried first. */
  priority: number;
  lastUsedAt: string | null;
  lastVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  /** Per-provider model catalog overrides (null = use auto-discovered models). */
  modelsConfig: ByokModelConfig[] | null;
}

export interface ResolvedApiKey {
  apiKey: string;
  baseUrl: string | null;
  /** Which endpoint (index into the enabled, ordered list) this is. */
  slot: number;
  /** Total enabled endpoints for this provider (for failover loops). */
  endpointCount: number;
  /** Row id of the chosen endpoint (for lastUsedAt/lastVerifiedAt updates). */
  rowId: string;
}

/** Keyless providers may save endpoints with a baseUrl and no key. */
export const KEYLESS_PROVIDER_IDS = new Set(['ollama', 'lemonade']);

/** AES-GCM can't encrypt an empty string, so keyless endpoints store this
 *  sentinel — resolved back to '' on read so the wire never sees it. */
const KEYLESS_SENTINEL = '\u0000keyless';

/** Decrypt an endpoint's stored key (sentinel → ''). Shared by the api-keys
 *  routes so they never re-implement the sentinel handling. */
export function decryptEndpointKey(encryptedKey: string, iv: string, authTag: string): string {
  const pt = decryptApiKey({ ciphertext: encryptedKey, iv, authTag });
  return pt === KEYLESS_SENTINEL ? '' : pt;
}

/** Max endpoints per provider — a sane ceiling (UI + DB hygiene). */
export const MAX_ENDPOINTS_PER_PROVIDER = 10;

// ── Round-robin state ──
// Process-global counter per (userId, providerId) so consecutive requests
// spread across the user's endpoints. Kept on globalThis so dev-mode HMR
// reloads don't reset it (and all workers in the process share it).
const RR: Map<string, number> =
  ((globalThis as Record<string, unknown>).__byokRr as Map<string, number>) ??
  (((globalThis as Record<string, unknown>).__byokRr = new Map<string, number>()) as Map<string, number>);

// ── Reads ──

/** Enabled endpoint rows for one provider, ordered (priority, createdAt). */
async function enabledRows(userId: string, providerId: string) {
  return db.userApiKey.findMany({
    where: { userId, providerId, enabled: true },
    orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
  });
}

/**
 * List all API-key endpoints the user has saved. Returns metadata only —
 * never the plaintext key. Used by the Settings UI.
 */
export async function listUserApiKeys(userId: string): Promise<UserApiKeyMeta[]> {
  const rows = await db.userApiKey.findMany({
    where: { userId },
    orderBy: [{ providerId: 'asc' }, { priority: 'asc' }, { createdAt: 'asc' }],
  });
  return rows.map((row) => {
    let masked = '••••';
    try {
      // Decrypt just to compute the mask. Cheap (one AES-GCM op per row) and
      // happens only when the user opens Settings, so not a hot path.
      masked = maskWithDecrypt(row.encryptedKey, row.iv, row.authTag);
    } catch (e) {
      log.warn(`[listUserApiKeys] Could not decrypt key for ${row.providerId}:`, e);
      masked = '•••• (decryption error)';
    }
    let modelsConfig: ByokModelConfig[] | null = null;
    if (row.modelsConfig) {
      try {
        const parsed = JSON.parse(row.modelsConfig);
        if (Array.isArray(parsed)) modelsConfig = parsed;
      } catch {
        log.warn(`[listUserApiKeys] Invalid modelsConfig JSON for ${row.providerId}`);
      }
    }
    return {
      id: row.id,
      providerId: row.providerId,
      baseUrl: row.baseUrl,
      label: row.label,
      maskedKey: masked,
      enabled: row.enabled,
      priority: row.priority,
      lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
      lastVerifiedAt: row.lastVerifiedAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      modelsConfig,
    };
  });
}

function maskWithDecrypt(ciphertext: string, iv: string, authTag: string): string {
  const pt = decryptEndpointKey(ciphertext, iv, authTag);
  return pt ? maskApiKey(pt) : '(no key)';
}

/**
 * Resolve ONE endpoint for a provider.
 *
 * `slot` selects which enabled endpoint to use (default: round-robin).
 * Used by resolve-model.ts as a fallback after server-managed and
 * client-sent keys have been checked. Returns null if the user has no
 * enabled endpoint for that provider.
 */
export async function resolveUserApiKey(
  userId: string,
  providerId: string,
  opts: { slot?: number } = {},
): Promise<ResolvedApiKey | null> {
  const rows = await enabledRows(userId, providerId);
  if (rows.length === 0) return null;
  const slot =
    opts.slot != null && Number.isFinite(opts.slot)
      ? ((opts.slot % rows.length) + rows.length) % rows.length
      : nextRoundRobin(userId, providerId, rows.length);
  const row = rows[slot];
  try {
    const apiKey = decryptEndpointKey(row.encryptedKey, row.iv, row.authTag);
    return { apiKey, baseUrl: row.baseUrl, slot, endpointCount: rows.length, rowId: row.id };
  } catch (e) {
    log.error(
      `[resolveUserApiKey] Decryption failed for user=${userId} provider=${providerId} row=${row.id}:`,
      e,
    );
    return null;
  }
}

function nextRoundRobin(userId: string, providerId: string, count: number): number {
  const key = `${userId}:${providerId}`;
  const next = (RR.get(key) ?? 0) + 1;
  RR.set(key, next);
  return next % count;
}

// ── Writes ──

/**
 * Save an endpoint. Creates a NEW row by default (the multi-endpoint case);
 * pass `id` to update an existing endpoint in place (key left untouched when
 * `apiKey` is omitted and the provider requires one — e.g. editing just the
 * label / baseUrl / priority).
 *
 * Keyless providers (ollama, lemonade) accept an empty key when a baseUrl
 * is provided — an endpoint may be nothing more than "my local Ollama".
 */
export async function saveUserApiKey(
  userId: string,
  providerId: string,
  params: {
    id?: string;
    apiKey?: string;
    baseUrl?: string | null;
    label?: string | null;
    modelsConfig?: ByokModelConfig[] | null;
  },
): Promise<UserApiKeyMeta> {
  const trimmedKey = (params.apiKey ?? '').trim();
  const baseUrl = params.baseUrl?.trim() || null;
  const keyless = KEYLESS_PROVIDER_IDS.has(providerId);

  if (!trimmedKey && !keyless) {
    throw new Error('API key must not be empty');
  }
  if (!trimmedKey && keyless && !baseUrl) {
    throw new Error('Provide an API key or a base URL for this endpoint');
  }
  if (trimmedKey.length > 4096) {
    throw new Error('API key is too long (max 4096 chars)');
  }

  const label = params.label?.trim() || null;
  const modelsConfigJson = params.modelsConfig ? JSON.stringify(params.modelsConfig) : null;

  // ── Update an existing endpoint in place ──
  if (params.id) {
    const existing = await db.userApiKey.findFirst({ where: { id: params.id, userId } });
    if (!existing) throw new Error('Endpoint not found');
    const enc = trimmedKey ? encryptApiKey(trimmedKey) : null;
    const row = await db.userApiKey.update({
      where: { id: existing.id },
      data: {
        ...(enc ? { encryptedKey: enc.ciphertext, iv: enc.iv, authTag: enc.authTag } : {}),
        baseUrl,
        label,
        enabled: true,
        // Reset verification — the endpoint just changed, re-verify on next use.
        lastVerifiedAt: null,
        updatedAt: new Date(),
      },
    });
    log.info(`[saveUserApiKey] Updated endpoint ${row.id} for provider=${providerId}`);
    return rowToMeta(row, trimmedKey || null, params.modelsConfig ?? null);
  }
  // ── Create a new endpoint ──
  const count = await db.userApiKey.count({ where: { userId, providerId } });
  if (count >= MAX_ENDPOINTS_PER_PROVIDER) {
    throw new Error(`Too many endpoints for ${providerId} (max ${MAX_ENDPOINTS_PER_PROVIDER})`);
  }
  // New endpoints go LAST in priority order (existing order stays stable).
  const priority = count;
  // A "replace the only endpoint" save (legacy UI shape) still just adds a
  // row — the resolver round-robins over all enabled rows.

  const enc: EncryptedKey = encryptApiKey(trimmedKey || KEYLESS_SENTINEL);
  const row = await db.userApiKey.create({
    data: {
      userId,
      providerId,
      encryptedKey: enc.ciphertext,
      iv: enc.iv,
      authTag: enc.authTag,
      baseUrl,
      label,
      priority,
      modelsConfig: count === 0 ? modelsConfigJson : null,
      enabled: true,
    },
  });

  log.info(
    `[saveUserApiKey] Saved endpoint ${row.id} (#${count + 1}) for provider=${providerId} user=${userId}`,
  );
  return rowToMeta(row, trimmedKey || null, count === 0 ? params.modelsConfig ?? null : null);
}

function rowToMeta(
  row: {
    id: string; providerId: string; baseUrl: string | null; label: string | null;
    enabled: boolean; priority: number; lastUsedAt: Date | null; lastVerifiedAt: Date | null;
    createdAt: Date; updatedAt: Date; modelsConfig: string | null;
  },
  plaintextKey: string | null,
  modelsConfig: ByokModelConfig[] | null,
): UserApiKeyMeta {
  let parsedModels: ByokModelConfig[] | null = modelsConfig;
  if (!parsedModels && row.modelsConfig) {
    try {
      const p = JSON.parse(row.modelsConfig);
      if (Array.isArray(p)) parsedModels = p;
    } catch { /* leave null */ }
  }
  return {
    id: row.id,
    providerId: row.providerId,
    baseUrl: row.baseUrl,
    label: row.label,
    maskedKey: plaintextKey ? maskApiKey(plaintextKey) : '(no key)',
    enabled: row.enabled,
    priority: row.priority,
    lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
    lastVerifiedAt: row.lastVerifiedAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    modelsConfig: parsedModels,
  };
}

// ── Per-endpoint management ──

/** Enable/disable ONE endpoint (soft toggle — keep it on file, unused). */
export async function setEndpointEnabled(
  userId: string,
  endpointId: string,
  enabled: boolean,
): Promise<void> {
  await db.userApiKey.updateMany({ where: { id: endpointId, userId }, data: { enabled } });
}

/** Delete ONE endpoint. Throws if not found. */
export async function deleteUserApiKeyById(userId: string, endpointId: string): Promise<void> {
  const res = await db.userApiKey.deleteMany({ where: { id: endpointId, userId } });
  if (res.count === 0) throw new Error('Endpoint not found');
  log.info(`[deleteUserApiKeyById] Deleted endpoint ${endpointId}`);
}

/**
 * Reorder endpoints: moves an endpoint up/down one position and rewrites
 * the provider's priorities to a clean 0..n-1 sequence (robust even when
 * legacy rows share equal priorities).
 */
export async function moveEndpoint(
  userId: string,
  endpointId: string,
  direction: 'up' | 'down',
): Promise<void> {
  const row = await db.userApiKey.findFirst({ where: { id: endpointId, userId } });
  if (!row) throw new Error('Endpoint not found');
  const siblings = await db.userApiKey.findMany({
    where: { userId, providerId: row.providerId },
    orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
  });
  const idx = siblings.findIndex((s) => s.id === endpointId);
  const swapWith = direction === 'up' ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= siblings.length) return; // already at the end
  const next = [...siblings];
  [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
  await db.$transaction(
    next.map((s, i) =>
      db.userApiKey.update({ where: { id: s.id }, data: { priority: i } }),
    ),
  );
}

/**
 * Update the modelsConfig for a provider — applies to ALL endpoint rows of
 * that provider (the model catalog is per-provider, not per-endpoint).
 */
export async function updateModelsConfig(
  userId: string,
  providerId: string,
  modelsConfig: ByokModelConfig[] | null,
): Promise<void> {
  const modelsConfigJson = modelsConfig && modelsConfig.length > 0
    ? JSON.stringify(modelsConfig)
    : null;
  await db.userApiKey.updateMany({
    where: { userId, providerId },
    data: { modelsConfig: modelsConfigJson, updatedAt: new Date() },
  });
  log.info(
    `[updateModelsConfig] Updated models for provider=${providerId} user=${userId} (${modelsConfig?.length ?? 0} models)`,
  );
}

/** Delete ALL of a user's endpoints for a provider. No-op if none exist. */
export async function deleteUserApiKey(userId: string, providerId: string): Promise<void> {
  await db.userApiKey.deleteMany({ where: { userId, providerId } });
  log.info(`[deleteUserApiKey] Deleted all endpoints for provider=${providerId} user=${userId}`);
}

/**
 * Mark an endpoint as "verified working" — called after a successful test.
 * Helps the UI show "✓ verified 2 minutes ago" so the user knows it's good.
 */
export async function markUserApiKeyVerified(userId: string, endpointId: string): Promise<void> {
  await db.userApiKey.updateMany({
    where: { id: endpointId, userId },
    data: { lastVerifiedAt: new Date() },
  });
}

/**
 * Mark an endpoint as "used" — called after a successful AI request.
 *
 * NOTE: deliberately fire-and-forget (no await) at call sites, because this
 * writes on every AI request and we don't want to slow down responses. If the
 * write fails it's not a hard error — the key still works.
 */
export async function touchUserApiKeyById(userId: string, endpointId: string): Promise<void> {
  try {
    await db.userApiKey.updateMany({
      where: { id: endpointId, userId },
      data: { lastUsedAt: new Date() },
    });
  } catch (e) {
    // Silent fail — touch is best-effort.
    log.warn(`[touchUserApiKeyById] Failed for endpoint=${endpointId}:`, e);
  }
}

// ── Back-compat shims (older call sites) ──

/** Legacy single-key touch — touches the FIRST enabled endpoint. */
export async function touchUserApiKey(userId: string, providerId: string): Promise<void> {
  const rows = await enabledRows(userId, providerId);
  if (rows.length > 0) await touchUserApiKeyById(userId, rows[0].id);
}

/** Legacy single-key verify — verifies the FIRST enabled endpoint. */
export async function markProviderKeyVerified(userId: string, providerId: string): Promise<void> {
  const rows = await enabledRows(userId, providerId);
  if (rows.length > 0) await markUserApiKeyVerified(userId, rows[0].id);
}
