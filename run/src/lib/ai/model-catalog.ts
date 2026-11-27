/**
 * Shared model catalog types — client-safe (no server-only imports).
 *
 * Used by:
 *   - /api/providers              (server: assembles the catalog)
 *   - ModelPicker.tsx             (client: renders the catalog)
 *   - useUserModel hook           (client: persists selection)
 *
 * The catalog is split into three clearly-differentiated sections:
 *
 *   1. `server`  — providers the operator configured server-side
 *                  (env vars or server-providers.yml). Users can use these
 *                  without any setup; the operator pays.
 *
 *   2. `byok`    — providers the current user has saved their own API key
 *                  for (encrypted in UserApiKey). The user pays. The server
 *                  resolves the key from the DB — it NEVER crosses the wire
 *                  back to the browser.
 *
 *   3. `local`   — keyless local providers (Ollama, Lemonade). Auto-detected
 *                  by probing localhost; usable from any device that has
 *                  the local service running.
 *
 *   4. `available` — providers the user *could* add a key for (BYOK entry
 *                  point). Useful for the "Add provider" UI.
 */

export type ProviderSource = 'server' | 'byok' | 'local';

export interface CatalogModel {
  /** Model ID (e.g. "gpt-4o", "llama3.3") */
  id: string;
  /** Display name (e.g. "GPT-4o") */
  name: string;
  /** Context window in tokens, if known */
  contextWindow?: number;
  /** Output window in tokens, if known */
  outputWindow?: number;
  /** Capabilities (streaming, vision, thinking, tools). `chat: false` marks a
   *  non-chat TOOL model (tts / asr / image / web-search / web-reader): it is
   *  reached through its dedicated feature or endpoint, never chat completions
   *  — pickers badge it and refuse selection instead of surfacing a 400. */
  capabilities?: {
    streaming?: boolean;
    tools?: boolean;
    vision?: boolean;
    thinking?: boolean;
    chat?: boolean;
  };
  /** When `capabilities.chat === false`: what the model actually is ("web-search",
   *  "text-to-speech", ...) — pickers render it as the non-chat badge text. */
  capabilityLabel?: string;
}

export interface CatalogProvider {
  /** Provider ID (e.g. "openai", "ollama") — matches PROVIDERS registry */
  id: string;
  /** Display name (e.g. "OpenAI", "Ollama (local)") */
  name: string;
  /** Provider type — drives how the UI tests the key */
  type: 'openai' | 'anthropic' | 'google' | 'zai';
  /** Icon path under /public/ */
  icon?: string;
  /** True for keyless local providers (Ollama, Lemonade) */
  keyless: boolean;
  /** Whether this provider is currently usable by the user */
  available: boolean;
  /** Reason if not available (e.g. "No API key set") */
  unavailableReason?: string;
  /** Models list (filtered to what's actually available) */
  models: CatalogModel[];
  /** Default base URL (for the BYOK "add key" UI) */
  defaultBaseUrl?: string;
  /** Whether the user's BYOK key for this provider is being shadowed by the server config */
  byokShadowed?: boolean;
}

export interface ProviderCatalog {
  /** Server-managed providers (operator-paid) */
  server: CatalogProvider[];
  /** User BYOK providers (user-paid) */
  byok: CatalogProvider[];
  /** Local keyless providers */
  local: CatalogProvider[];
  /** All providers the user could add a key for (BYOK UI) */
  available: CatalogProvider[];
  /** The current user's default model string ("providerId:modelId") or null */
  userDefault: string | null;
  /** The server-wide default (DEFAULT_MODEL env) — used when userDefault is null */
  serverDefault: string | null;
}

/** Build a model string from providerId + modelId */
export function buildModelString(providerId: string, modelId: string): string {
  return `${providerId}:${modelId}`;
}

/** Parse a model string into providerId + modelId */
export function parseModelString(s: string): { providerId: string; modelId: string } | null {
  if (!s || typeof s !== 'string') return null;
  const idx = s.indexOf(':');
  if (idx <= 0 || idx >= s.length - 1) return null;
  return { providerId: s.slice(0, idx), modelId: s.slice(idx + 1) };
}
