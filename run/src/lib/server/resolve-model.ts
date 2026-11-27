/**
 * Shared model resolution utilities for API routes.
 *
 * Extracts the repeated parseModelString → resolveApiKey → resolveBaseUrl →
 * resolveProxy → getModel boilerplate into a single call.
 */

import type { NextRequest } from 'next/server';
import { getModel, parseModelString, PROVIDERS, type ModelWithInfo, isProviderKeyRequired } from '@/lib/ai/providers';
import type { ThinkingConfig } from '@/lib/types/provider';

// Re-export so callers (e.g. /api/openmaic/chat/route.ts) can import
// isProviderKeyRequired from this module as a single entry point.
export { isProviderKeyRequired };
import {
  isServerConfiguredProvider,
  resolveApiKey,
  resolveBaseUrl,
  resolveProxy,
} from '@/lib/server/provider-config';
import { validateUrlForSSRF } from '@/lib/server/ssrf-guard';
import { getStageRoute, type LlmStage } from '@/lib/server/model-routes';
import { resolveUserApiKey, touchUserApiKeyById } from '@/lib/server/byok';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

export interface ResolvedModel extends ModelWithInfo {
  /** Original model string (e.g. "openai/gpt-4o-mini") */
  modelString: string;
  /** Resolved provider ID (e.g. "openai", "ollama") */
  providerId: string;
  /** Resolved model ID (e.g. "gpt-4o-mini") */
  modelId: string;
  /** Effective API key after server-side fallback resolution */
  apiKey: string;
  /** Effective base URL after server/client resolution */
  baseUrl?: string;
  /** Optional per-request thinking configuration from the client. */
  thinkingConfig?: ThinkingConfig;
  /** Set when the key/URL came from a user-saved BYOK endpoint — carries
   *  everything callChat needs to FAIL OVER to the user's other endpoints
   *  for the same provider (multi-endpoint BYOK). */
  byok?: {
    slot: number;
    endpointCount: number;
    rowId: string;
    userId: string;
  };
}

/**
 * Resolve a language model from explicit parameters.
 *
 * Use this when model config comes from the request body.
 */
export async function resolveModel(params: {
  modelString?: string;
  /**
   * Optional generation stage (a `callLLM` source label, e.g. 'scene-content').
   * When set and a route is configured via `MODEL_ROUTES`, the route wins for
   * this call — even over a client-sent `modelString` (x-model). Unrouted
   * stages fall back to `modelString` then `DEFAULT_MODEL`. See
   * lib/server/model-routes.ts.
   */
  stage?: LlmStage;
  apiKey?: string;
  baseUrl?: string;
  providerType?: string;
  thinkingConfig?: ThinkingConfig;
  /**
   * User ID for app-level BYOK lookup (encrypted DB-stored keys). When
   * provided, the user's saved key for the resolved provider is used as a
   * fallback after server-managed and client-sent keys are checked.
   * See src/lib/server/byok.ts.
   */
  userId?: string;
  /**
   * WHICH of the user's saved endpoints to use (multi-endpoint BYOK).
   * Undefined = round-robin pick. callChat's failover loop passes
   * slot = k to walk the user's endpoints on transport failures.
   */
  byokSlot?: number;
  /**
   * Internal: the originating request, used to resolve the user ID via
   * getAuthenticatedUserId when `userId` is not passed explicitly. Callers
   * should use `resolveModelFromHeaders` / `resolveModelFromRequest` instead
   * of passing this directly.
   */
  _req?: NextRequest;
}): Promise<ResolvedModel> {
  // Resolution order: stage route > x-model > DEFAULT_MODEL > ZAI fallback.
  // A configured stage route is the operator's deliberate per-stage choice and
  // wins even over a client-sent x-model (otherwise the browser UI, which always
  // sends its saved model, would shadow every route). Unrouted stages fall back
  // to the client x-model, then DEFAULT_MODEL.
  //
  // MedQ-specific ZAI fallback: if nothing above resolves AND `.z-ai-config`
  // is present (ZAI is configured as a managed provider), default to
  // `zai:auto`. MedQ is designed to run out-of-the-box on ZAI alone — failing
  // loud here would break every OpenMAIC generation request on a fresh
  // deployment that hasn't yet set DEFAULT_MODEL. Operators who want a
  // different default can still set DEFAULT_MODEL or MODEL_ROUTES to override.
  // Non-ZAI deployments (no .z-ai-config) fall through to the loud error.
  const stageRoute = getStageRoute(params.stage);
  const stageModel = stageRoute?.model;
  // Resolution order (highest to lowest):
  //   1. Stage route (operator's per-stage config from MODEL_ROUTES env)
  //   2. Client x-model header (params.modelString — from ModelPicker)
  //   3. User's per-user default (DB: User.defaultModel, set via ModelPicker)
  //   4. DEFAULT_MODEL env var (server-wide default)
  //   5. Auto-detect (Ollama → env keys → ZAI)
  let modelString = stageModel || params.modelString || undefined;
  let usedFallback = false;

  // ── Per-user default model fallback ──
  // If no stage route and no client x-model header, consult the user's saved
  // default (set via the ModelPicker UI). This is a best-effort DB hit — we
  // only do it on the cold path (no other resolution source matched), so it
  // doesn't slow down the hot path.
  if (!modelString && params._req) {
    try {
      const uid = params.userId ?? (await getAuthenticatedUserId(params._req));
      if (uid) {
        const user = await db.user.findUnique({
          where: { id: uid },
          select: { defaultModel: true },
        });
        if (user?.defaultModel) {
          modelString = user.defaultModel;
        }
      }
    } catch {
      // ignore — fall through to DEFAULT_MODEL / auto-detect
    }
  }

  // ── Server-wide default ──
  if (!modelString && process.env.DEFAULT_MODEL) {
    modelString = process.env.DEFAULT_MODEL;
  }

  if (!modelString) {
    // Auto-detect: Ollama (if running) → first env API key → ZAI (if .z-ai-config)
    // This replaces the old ZAI-only fallback so the app works out-of-the-box
    // on any machine with at least one provider configured.
    try {
      const { autoDetectDefaultModel } = await import('@/lib/ai/auto-detect');
      const auto = await autoDetectDefaultModel();
      modelString = `${auto.providerId}:${auto.modelId}`;
      usedFallback = true;
    } catch (autoDetectError) {
      // Auto-detect threw (no provider configured) — try ZAI as last resort
      if (isServerConfiguredProvider('providers', 'zai')) {
        modelString = 'zai:auto';
        usedFallback = true;
      } else {
        throw autoDetectError instanceof Error
          ? autoDetectError
          : new Error(
              'No model could be resolved. Configure DEFAULT_MODEL, run Ollama locally, ' +
              'or set an API key in .env (OPENAI_API_KEY, ANTHROPIC_API_KEY, etc.). ' +
              'See SETUP_PROVIDERS.md for instructions.',
            );
      }
    }
  }
  const { providerId, modelId } = parseModelString(modelString);

  // When a stage route (or the ZAI fallback) overrides the client's model, the
  // client-sent connection params (apiKey/baseUrl/providerType) belong to the
  // client's *other* model and must not bleed onto the resolved provider —
  // otherwise e.g. a routed Anthropic model would be built with the client's
  // OpenAI providerType/key. A routed/fallback model resolves purely from
  // server config, as if no x-model was sent.
  const routed = Boolean(stageModel) || usedFallback;
  const clientApiKey = routed ? undefined : params.apiKey;
  const clientProviderType = routed ? undefined : params.providerType;
  const clientBaseUrlParam = routed ? undefined : params.baseUrl;

  // Server-managed providers are admin-owned: the operator's key and base URL
  // are authoritative and any client-sent override is ignored. SSRF validation
  // therefore applies only to unmanaged providers, where the base URL really is
  // client-supplied. (Server-configured URLs are trusted by the operator.)
  const managed = isServerConfiguredProvider('providers', providerId);
  const clientBaseUrl = managed ? undefined : clientBaseUrlParam || undefined;
  if (clientBaseUrl && process.env.NODE_ENV === 'production') {
    // NOTE: validateUrlForSSRF is the PRE-FLIGHT check. The actual fetch
    // happens downstream in the provider adapter (which takes `baseUrl`
    // as a string and does its own fetch). For full DNS-rebinding defense
    // (connect-time pinning), the adapter should be migrated to use
    // safeFetch from '@/lib/server/ssrf-guard'. See docs/runbook.md#ssrf-blocked.
    const ssrfError = await validateUrlForSSRF(clientBaseUrl);
    if (ssrfError) {
      throw new Error(ssrfError);
    }
  }

  const apiKey = resolveApiKey(providerId, clientApiKey || '');
  const baseUrl = resolveBaseUrl(providerId, clientBaseUrl);
  const proxy = resolveProxy(providerId);

  // ── App-wide BYOK fallback ──
  // If neither the operator nor the client supplied a key, look up the
  // user's saved ENDPOINT for this provider (encrypted in the UserApiKey
  // table — possibly several rows per provider). This is the app-wide BYOK
  // path: keys sync across devices, never appear in the browser, and are
  // scoped per user. See src/lib/server/byok.ts.
  //
  // An endpoint row is a COMPLETE destination: its key AND its baseUrl
  // travel together (you must not send the remote gateway's key to a local
  // Ollama or vice versa), so when an endpoint is chosen its baseUrl is
  // authoritative — even over the operator's env default (OLLAMA_BASE_URL).
  // The operator's env default remains the fallback for users with no
  // saved endpoint. (Managed KEYS still win for managed providers — only
  // the URL follows the endpoint.)
  //
  // We only hit the DB if neither the server nor the client supplied a key —
  // avoiding a DB query on every managed-provider request (the hot path).
  let effectiveApiKey = apiKey;
  let effectiveBaseUrl = baseUrl;
  let apiKeySource: 'managed' | 'client' | 'byok' | 'none' = 'none';
  let byokMeta: ResolvedModel['byok'] | undefined;
  if (apiKey) {
    apiKeySource = managed ? 'managed' : 'client';
  } else {
    // Resolve the user ID from the request — required for BYOK lookup.
    // Callers that pass `userId` explicitly bypass this (e.g. server-side jobs).
    const byokUserId = params.userId ?? (params._req ? await getAuthenticatedUserId(params._req) : null);
    if (byokUserId) {
      const byok = await resolveUserApiKey(byokUserId, providerId, { slot: params.byokSlot });
      if (byok) {
        effectiveApiKey = byok.apiKey;
        // The endpoint's own baseUrl (if set) is authoritative — see note above.
        if (byok.baseUrl) {
          if (process.env.NODE_ENV === 'production') {
    // NOTE: validateUrlForSSRF is the PRE-FLIGHT check. The actual fetch
    // happens downstream in the provider adapter (which takes `baseUrl`
    // as a string and does its own fetch). For full DNS-rebinding defense
    // (connect-time pinning), the adapter should be migrated to use
    // safeFetch from '@/lib/server/ssrf-guard'. See docs/runbook.md#ssrf-blocked.
            const ssrfError = await validateUrlForSSRF(byok.baseUrl);
            if (ssrfError) throw new Error(ssrfError);
          }
          effectiveBaseUrl = byok.baseUrl;
        }
        apiKeySource = 'byok';
        byokMeta = {
          slot: byok.slot,
          endpointCount: byok.endpointCount,
          rowId: byok.rowId,
          userId: byokUserId,
        };
        // Fire-and-forget lastUsedAt update — best-effort, never block the response.
        void touchUserApiKeyById(byokUserId, byok.rowId);
      }
    }
  }

  // Silence the unused warning for apiKeySource when no telemetry reads it.
  void apiKeySource;

  // ZAI is a synthetic provider type — dispatch to the ZAI LanguageModel
  // adapter instead of OpenMAIC's `getModel()` (which only knows OpenAI /
  // Anthropic / Google). The ZAI adapter wraps `z-ai-web-dev-sdk`'s
  // `chat.completions.create` into the Vercel AI SDK's `LanguageModelV3`
  // interface so OpenMAIC's `callLLM`/`streamLLM` work unchanged.
  //
  // This interception lives in resolve-model.ts (server-only) rather than in
  // providers.ts (shared with client) so the `z-ai-web-dev-sdk` import stays
  // out of the client bundle — `z-ai-web-dev-sdk` uses Node's `fs` to read
  // `.z-ai-config` and cannot run in the browser.
  if (providerId === 'zai') {
    const { createZaiLanguageModel } = await import('@/lib/ai/zai-language-model');
    const { PROVIDERS } = await import('@/lib/ai/providers');
    const providerCfg = PROVIDERS.zai;
    const thinkingCapability = providerCfg?.models.find((m) => m.id === modelId)?.capabilities
      ?.thinking;
    const thinkingEnabled =
      thinkingCapability && 'defaultEnabled' in thinkingCapability
        ? (thinkingCapability.defaultEnabled ?? false)
        : false;
    const zaiModel = createZaiLanguageModel({
      modelId,
      thinkingEnabled,
    }) as unknown as ModelWithInfo['model'];
    const modelInfo = providerCfg?.models.find((m) => m.id === modelId) || undefined;
    return {
      model: zaiModel,
      modelInfo,
      modelString,
      providerId,
      modelId,
      apiKey: effectiveApiKey,
      baseUrl: effectiveBaseUrl,
      thinkingConfig: routed ? stageRoute?.thinking : params.thinkingConfig,
      ...(byokMeta ? { byok: byokMeta } : {}),
    };
  }

  // ── Ollama native adapter ──
  // Ollama is dispatched to the native /api/chat adapter (with /v1 fallback)
  // instead of going through getModel()'s createOpenAI() path. This gives us
  // access to Ollama-native features (think levels, keep_alive, format) and
  // auto-detects whether the native API is available. See
  // src/lib/ai/ollama-language-model.ts.
  if (providerId === 'ollama') {
    const { createOllamaLanguageModel } = await import('@/lib/ai/ollama-language-model');
    const { PROVIDERS } = await import('@/lib/ai/providers');
    const providerCfg = PROVIDERS.ollama;
    const modelInfo = providerCfg?.models.find((m) => m.id === modelId) || undefined;
    const thinkingCapability = modelInfo?.capabilities?.thinking;
    const thinkingEnabled =
      thinkingCapability && 'defaultEnabled' in thinkingCapability
        ? (thinkingCapability.defaultEnabled ?? false)
        : false;
    // Resolve the base URL: explicit > provider default > env
    const ollamaBaseUrl =
      effectiveBaseUrl ||
      providerCfg?.defaultBaseUrl?.replace(/\/v1$/, '') ||
      process.env.OLLAMA_BASE_URL ||
      'http://localhost:11434';
    const ollamaModel = createOllamaLanguageModel({
      modelId,
      baseUrl: ollamaBaseUrl,
      thinkingEnabled,
      apiKey: effectiveApiKey,
    }) as unknown as ModelWithInfo['model'];
    return {
      model: ollamaModel,
      modelInfo,
      modelString,
      providerId,
      modelId,
      apiKey: effectiveApiKey,
      baseUrl: ollamaBaseUrl,
      thinkingConfig: routed ? stageRoute?.thinking : params.thinkingConfig,
      ...(byokMeta ? { byok: byokMeta } : {}),
    };
  }

  // Custom BYOK endpoint ids (e.g. the MedQ AI Router registered as its own
  // `medq-router` provider, or any user-saved OpenAI-compatible gateway) are
  // not in the static registry. When the client didn't send a provider type,
  // default them to 'openai' (OpenAI-compatible) — otherwise getModel() would
  // throw "Unknown provider" and the endpoint's models would be unusable.
  const providerKnown = providerId in PROVIDERS;
  const { model, modelInfo } = getModel({
    providerId,
    modelId,
    apiKey: effectiveApiKey,
    baseUrl: effectiveBaseUrl,
    proxy,
    providerType: (clientProviderType ??
      (providerKnown ? undefined : ('openai' as const))) as 'openai' | 'anthropic' | 'google' | undefined,
  });

  // Thinking arbitration mirrors model routing — the route carries a full
  // ThinkingConfig (mode/effort/level/enabled/budgetTokens/…) which callLLM
  // normalizes against the model's capability:
  //  - routed + thinking set → the route's thinking wins (over client thinking).
  //  - routed + no thinking  → routed model uses its own default; client thinking
  //    is dropped (it belonged to the client's other model).
  //  - unrouted              → honor the client's thinking config.
  const thinkingConfig: ThinkingConfig | undefined = routed
    ? stageRoute?.thinking
    : params.thinkingConfig;

  return {
    model,
    modelInfo,
    modelString,
    providerId,
    modelId,
    apiKey: effectiveApiKey,
    baseUrl: effectiveBaseUrl,
    thinkingConfig,
    ...(byokMeta ? { byok: byokMeta } : {}),
  };
}

function getThinkingConfigFromBody(body: unknown): ThinkingConfig | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const record = body as { thinkingConfig?: unknown; thinking?: unknown };
  const config = record.thinkingConfig ?? record.thinking;
  return config && typeof config === 'object' ? (config as ThinkingConfig) : undefined;
}

/**
 * Resolve a language model from standard request headers.
 *
 * Reads: x-model, x-api-key, x-base-url, x-provider-type
 * Note: requiresApiKey is derived server-side from the provider registry,
 * never from client headers, to prevent auth bypass.
 */
export async function resolveModelFromHeaders(
  req: NextRequest,
  stage?: LlmStage,
  thinkingConfig?: ThinkingConfig,
  byokSlot?: number,
): Promise<ResolvedModel> {
  return resolveModel({
    modelString: req.headers.get('x-model') || undefined,
    stage,
    apiKey: req.headers.get('x-api-key') || undefined,
    baseUrl: req.headers.get('x-base-url') || undefined,
    providerType: req.headers.get('x-provider-type') || undefined,
    thinkingConfig,
    ...(byokSlot != null ? { byokSlot } : {}),
    _req: req,
  });
}

/**
 * Resolve a language model from standard request headers plus body fields.
 *
 * Reads model credentials from headers and per-request thinking config from
 * the JSON body field `thinkingConfig` (or legacy/eval field `thinking`).
 * `byokSlot` pins which user-saved endpoint supplies key/baseUrl (failover).
 */
export async function resolveModelFromRequest(
  req: NextRequest,
  body: unknown,
  stage?: LlmStage,
  byokSlot?: number,
): Promise<ResolvedModel> {
  // Pass the client's body thinking into resolveModel so the single arbiter
  // there decides (a routed stage may override or drop it). See resolveModel.
  return resolveModelFromHeaders(req, stage, getThinkingConfigFromBody(body), byokSlot);
}
