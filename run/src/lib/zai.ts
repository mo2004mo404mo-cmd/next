/**
 * ZAI SDK Wrapper — Handles dynamic token management and config updates.
 *
 * The z-ai-web-dev-sdk reads from .z-ai-config, but the API gateway
 * now requires an X-Token header. This utility:
 * 1. Reads the current config
 * 2. Allows dynamic token updates (e.g., from environment or request)
 * 3. Caches the ZAI instance for reuse within a request
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

async function getZaiSdk(): Promise<any | null> {
  try {
    const loader = new Function('return import("z-ai-web-dev-sdk")') as () => Promise<any>;
    const mod = await loader();
    return mod?.default ?? mod ?? null;
  } catch {
    return null;
  }
}

const CONFIG_PATHS = [
  path.join(process.cwd(), '.z-ai-config'),
  path.join(os.homedir(), '.z-ai-config'),
  '/etc/.z-ai-config',
];

interface ZAIConfig {
  baseUrl: string;
  apiKey: string;
  chatId?: string;
  userId?: string;
  token?: string;
}

/**
 * Read the current ZAI config.
 *
 * Resolution order:
 *   1. `.z-ai-config` file (project / home / /etc) — original SDK behavior
 *   2. Env vars: `ZAI_API_KEY` (+ optional `ZAI_BASE_URL`)
 *      Also accepts `GLM_API_KEY` / `GLM_BASE_URL` as aliases (same service).
 *
 * The env-var fallback lets deployments (Docker, Vercel, CI) inject
 * credentials without writing a JSON file to disk, and lets the
 * `isServerConfigured` gate flip to true for the OpenMAIC UI.
 */
export function readConfig(): ZAIConfig | null {
  // 1. File-based config (preferred — may include token, chatId, userId)
  for (const p of CONFIG_PATHS) {
    try {
      const raw = fs.readFileSync(p, 'utf-8');
      const config = JSON.parse(raw);
      if (config.baseUrl && config.apiKey) return config;
    } catch {
      // continue
    }
  }
  // 2. Env-var fallback
  const envApiKey = process.env.ZAI_API_KEY || process.env.GLM_API_KEY;
  if (envApiKey) {
    const envBaseUrl =
      process.env.ZAI_BASE_URL ||
      process.env.GLM_BASE_URL ||
      'https://api.z.ai/api/paas/v4';
    return { baseUrl: envBaseUrl, apiKey: envApiKey };
  }
  return null;
}

/** Write the project-level .z-ai-config with an updated token.
 *  Silently skips the write when the file is read-only (e.g. when it's a
 *  symlink to /etc/.z-ai-config owned by root) — the in-memory config is
 *  still returned so the caller can use it. The warn is downgraded from
 *  console.warn to a no-op because the warning fired on every single ZAI
 *  request when .z-ai-config was deployed as a non-writable symlink, which
 *  is the documented production deployment pattern. */
export function updateConfigToken(token: string): ZAIConfig {
  const configPath = CONFIG_PATHS[0]; // project-level
  // Default config — reads from env vars or uses null sentinel if unconfigured.
  // (Previously hardcoded a sandbox-internal IP; now degrades gracefully when
  // no .z-ai-config exists, so the auto-detect fallback can kick in instead.)
  let config: ZAIConfig | null = readConfig();

  if (!config) {
    // No .z-ai-config found — ZAI is not configured. Return a minimal config
    // with the token so the caller can attempt to use it (ZAI.create() will
    // fail if the SDK can't find a config, which is the correct behavior —
    // the auto-detect system will then fall back to other providers).
    config = {
      baseUrl: process.env.ZAI_BASE_URL || '',
      apiKey: process.env.ZAI_API_KEY || '',
      token,
    };
    return config;
  }

  // Skip the write entirely if the existing config already has this token —
  // common case after the first request (the token doesn't change between
  // requests, so the write is redundant and just produces EACCES noise on
  // non-writable deployments).
  if (config.token === token) {
    return config;
  }

  config.token = token;

  try {
    // Ensure file is writable before writing
    try { fs.chmodSync(configPath, 0o644); } catch {}
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
  } catch {
    // EACCES / EROFS / EISDIR: file is not writable (typically a symlink to
    // /etc/.z-ai-config owned by root). The in-memory config is still valid,
    // so the caller proceeds normally. Silently ignored — the warning fired
    // on every ZAI request in production deployments using a read-only
    // symlink, which is the documented deployment pattern.
  }
  return config;
}

/**
 * Create a ZAI instance with optional token override.
 *
 * Resolution:
 *   1. If a token is provided, persist it to `.z-ai-config` so the SDK's
 *      own `ZAI.create()` picks it up (existing behavior).
 *   2. Otherwise — and whenever `.z-ai-config` is absent but env vars are
 *      set — bypass `ZAI.create()` and instantiate directly with the
 *      env-var-resolved config. This is necessary because the SDK's
 *      `loadConfig()` only reads files and throws otherwise.
 *
 * Note: the SDK marks its constructor as `private` in the .d.ts to force
 * callers through `ZAI.create()`. At runtime the constructor is a plain
 * function, so we cast to bypass the TS check. This lets us inject an
 * env-var-resolved config without writing a temp file to disk.
 */
export async function createZAI(token?: string): Promise<any> {
  if (token) {
    updateConfigToken(token);
  }

  const ZAI = await getZaiSdk();
  if (!ZAI) {
    throw new Error('This project is configured to use the BYOK/provider flow. Configure a provider key or model in the app instead of the missing ZAI SDK.');
  }

  const config = readConfig();
  if (config) {
    const Ctor = ZAI as unknown as new (cfg: ZAIConfig) => any;
    return new Ctor(config);
  }

  return ZAI.create();
}

/** Check if the current config has a non-empty token */
export function hasToken(): boolean {
  const config = readConfig();
  return !!config?.token && config.token.trim().length > 0;
}
