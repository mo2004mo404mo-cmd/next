/**
 * Server-side provider catalog assembly.
 *
 * Builds the ProviderCatalog that /api/providers returns. Combines:
 *   - Server-managed providers (from env vars + server-providers.yml)
 *   - User BYOK providers (from UserApiKey table)
 *   - Local keyless providers (Ollama, Lemonade) with live probing
 *   - The full available-provider registry (for the "Add provider" UI)
 *
 * Sensitive data (API keys, base URLs that might reveal internal gateways)
 * is never included — only provider IDs, model lists, and availability flags.
 */

import { PROVIDERS } from '@/lib/ai/providers';
import { BYOK_PROVIDERS, BYOK_PROVIDER_BY_ID } from '@/lib/ai/byok-providers';
import type {
  ProviderCatalog,
  CatalogProvider,
  CatalogModel,
} from '@/lib/ai/model-catalog';
import { isServerConfiguredProvider, getServerProviders } from '@/lib/server/provider-config';
import { listUserApiKeys, type ByokModelConfig } from '@/lib/server/byok';
import { probeOllama, probeLemonade } from '@/lib/ai/local-probes';

/**
 * Build the full provider catalog for a user.
 *
 * @param userId The authenticated user ID (for BYOK lookup). Pass null for
 *               unauthenticated users — they'll see server + local providers
 *               only, no BYOK section.
 */
export async function buildProviderCatalog(userId: string | null): Promise<ProviderCatalog> {
  // Parallel-fetch everything we need
  const [userKeys, serverProviders, ollamaProbe, lemonadeProbe] = await Promise.all([
    userId ? listUserApiKeys(userId) : Promise.resolve([]),
    getServerProviders(),
    probeOllama(),
    probeLemonade(),
  ]);

  const server: CatalogProvider[] = [];
  const byok: CatalogProvider[] = [];
  const local: CatalogProvider[] = [];
  const available: CatalogProvider[] = [];

  // Track which provider IDs we've already shown (so a provider that's BOTH
  // server-managed and in the user's BYOK list appears once, in `server`,
  // with a `byokShadowed: true` flag).
  const seenIds = new Set<string>();

  // ── 1. Server-managed providers (operator-paid) ──
  for (const providerId of Object.keys(serverProviders)) {
    const cfg = PROVIDERS[providerId as keyof typeof PROVIDERS];
    if (!cfg) continue; // unknown provider in YAML, skip
    seenIds.add(providerId);

    const models = (serverProviders[providerId]?.models?.length
      ? filterModelsByIdList(cfg, serverProviders[providerId]!.models!)
      : cfg.models
    ).map(toCatalogModel);

    server.push({
      id: providerId,
      name: cfg.name,
      type: cfg.type,
      icon: cfg.icon,
      keyless: !cfg.requiresApiKey,
      available: true,
      models,
      defaultBaseUrl: cfg.defaultBaseUrl,
    });
  }

  // ── 2. User BYOK providers (user-paid) ──
  // Group enabled keys by providerId first: a user may hold SEVERAL endpoints
  // under one provider (two OpenAI keys, or the MedQ AI Router registered as
  // its own `medq-router` provider). Every key's curated models must surface —
  // grouping here is what keeps "the models I added" visible no matter which
  // key row they were saved on.
  const byokGroups = new Map<string, typeof userKeys>();
  for (const key of userKeys) {
    if (!key.enabled) continue;
    const group = byokGroups.get(key.providerId);
    if (group) group.push(key);
    else byokGroups.set(key.providerId, [key]);
  }

  for (const [groupProviderId, groupKeys] of byokGroups) {
    const cfg = PROVIDERS[groupProviderId as keyof typeof PROVIDERS];
    if (!cfg) {
      // Unknown to the static registry (e.g. the MedQ AI Router, or any
      // OpenAI-compatible gateway saved under a custom provider id) — still
      // list it so its models stay visible. Prefer BYOK registry metadata
      // (name/icon) when present; otherwise the endpoint's label.
      if (seenIds.has(groupProviderId)) continue;
      seenIds.add(groupProviderId);
      const byokMeta = BYOK_PROVIDER_BY_ID[groupProviderId];
      byok.push({
        id: groupProviderId,
        name: byokMeta?.name || groupKeys[0]?.label || groupProviderId,
        type: 'openai',
        icon: byokMeta?.icon,
        keyless: false,
        available: true,
        // User-curated catalog ("the models I added") is the source of truth.
        models: dedupeById(groupKeys.flatMap((k) => k.modelsConfig ?? [])).map(toCatalogModel),
      });
      continue;
    }
    if (seenIds.has(groupProviderId)) {
      // Already shown as server-managed — mark it as shadowed instead of duplicating
      const existing = server.find((p) => p.id === groupProviderId);
      if (existing) existing.byokShadowed = true;
      continue;
    }
    seenIds.add(groupProviderId);

    // ── THE VISIBILITY FIX ──
    // The user's modelsConfig ("models I added" in the Models manager) is the
    // source of truth for this provider's catalog — merged across EVERY
    // enabled endpoint of the provider, so models curated on any key row
    // show up. Only when the user has never curated models on any key do we
    // fall back to the static registry list.
    // Previously this read just the FIRST key row, which is why models added
    // on other rows (or via the AI Router link) were invisible to every
    // model picker in the app.
    const mergedUserModels = dedupeById(groupKeys.flatMap((k) => k.modelsConfig ?? []));
    const models = (mergedUserModels.length
      ? mergedUserModels.map(toCatalogModel)
      : cfg.models.map(toCatalogModel)
    ).map((m) => ({ ...m, source: 'byok' as const }));

    byok.push({
      id: groupProviderId,
      name: cfg.name,
      type: cfg.type,
      icon: cfg.icon,
      keyless: !cfg.requiresApiKey,
      available: true,
      models,
      defaultBaseUrl: cfg.defaultBaseUrl,
    });
  }

  // ── 3. Local keyless providers (auto-detected) ──
  if (ollamaProbe.ok) {
    const cfg = PROVIDERS.ollama;
    // If Ollama returned a model list, use that; otherwise fall back to the registry
    const models = ollamaProbe.models?.length
      ? ollamaProbe.models.map((id) => ({
          id,
          name: id,
          capabilities: { streaming: true, tools: false },
        }))
      : cfg.models.map(toCatalogModel);
    if (!seenIds.has('ollama')) {
      local.push({
        id: 'ollama',
        name: 'Ollama (local)',
        type: 'openai',
        icon: cfg.icon,
        keyless: true,
        available: true,
        models,
        defaultBaseUrl: cfg.defaultBaseUrl,
      });
      seenIds.add('ollama');
    } else {
      // Server-managed Ollama — augment with the probed model list
      const existing = server.find((p) => p.id === 'ollama');
      if (existing && ollamaProbe.models?.length) {
        existing.models = models;
      }
    }
  }

  if (lemonadeProbe.ok) {
    const cfg = PROVIDERS.lemonade;
    if (!seenIds.has('lemonade')) {
      local.push({
        id: 'lemonade',
        name: 'Lemonade (local)',
        type: 'openai',
        icon: cfg.icon,
        keyless: true,
        available: true,
        models: cfg.models.map(toCatalogModel),
        defaultBaseUrl: cfg.defaultBaseUrl,
      });
      seenIds.add('lemonade');
    }
  }

  // ── 4. Available providers (anything user could add a key for) ──
  for (const byokMeta of BYOK_PROVIDERS) {
    if (seenIds.has(byokMeta.id)) continue;
    const cfg = PROVIDERS[byokMeta.id as keyof typeof PROVIDERS];
    if (!cfg) continue;
    available.push({
      id: byokMeta.id,
      name: byokMeta.name,
      type: byokMeta.type,
      icon: byokMeta.icon,
      keyless: !byokMeta.requiresKey,
      available: byokMeta.requiresKey, // keyless ones (Ollama) only show up via local probe
      unavailableReason: byokMeta.requiresKey ? undefined : 'Local provider — start it to use',
      models: cfg.models.map(toCatalogModel),
      defaultBaseUrl: byokMeta.defaultBaseUrl,
    });
  }

  return {
    server,
    byok,
    local,
    available,
    userDefault: null, // populated by /api/providers route handler
    serverDefault: process.env.DEFAULT_MODEL ?? null,
  };
}

// ── Helpers ──

// The medq-router self-bridge advertises the app's OWN capability models
// (modelsConfig: zai-llm, zai-vision, zai-web-search, ...). They are named after
// the managed gateway's tool capabilities, and on OpenAI-compatible gateways
// only the chat/vision entries accept /v1/chat/completions — the rest 400 with
// "Model X does not support /v1/chat/completions" (verified live on the user's
// gateways, 2026-10-26). Annotating them here lets pickers badge/refuse them
// instead of letting a doomed request burn the router's attempt trail.
const NON_CHAT_MODEL_HINT: Record<string, string> = {
  'zai-web-search': 'web-search',
  'zai-web-reader': 'web-reader',
  'zai-image-gen': 'image generation',
  'zai-image-edit': 'image editing',
  'zai-tts': 'text-to-speech',
  'zai-asr': 'speech recognition',
};

function toCatalogModel(m: {
  id: string;
  name: string;
  contextWindow?: number;
  outputWindow?: number;
  capabilities?: { streaming?: boolean; tools?: boolean; vision?: boolean; thinking?: any };
}): CatalogModel & { source?: 'byok' } {
  const nonChatHint = NON_CHAT_MODEL_HINT[m.id];
  return {
    id: m.id,
    name: m.name,
    contextWindow: m.contextWindow,
    outputWindow: m.outputWindow,
    capabilities: {
      streaming: m.capabilities?.streaming,
      tools: m.capabilities?.tools,
      vision: m.capabilities?.vision,
      thinking: !!m.capabilities?.thinking,
      // Absent (undefined) = chat as far as anyone knows; only explicit
      // knowledge ever marks a model non-chat.
      ...(nonChatHint ? { chat: false as const } : {}),
    },
    ...(nonChatHint ? { capabilityLabel: nonChatHint } : {}),
  };
}

function filterModelsByIdList(
  cfg: { models: Array<{ id: string; name: string; contextWindow?: number; outputWindow?: number; capabilities?: any }> },
  ids: string[],
) {
  return cfg.models.filter((m) => ids.includes(m.id));
}

/** Merge model lists from several endpoint rows of one provider — first
 *  occurrence of an id wins (keys are ordered by priority, so the
 *  higher-priority endpoint's curation is authoritative). */
function dedupeById<T extends { id: string }>(models: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const m of models) {
    if (!m?.id || seen.has(m.id)) continue;
    seen.add(m.id);
    out.push(m);
  }
  return out;
}
