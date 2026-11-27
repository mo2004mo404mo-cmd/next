'use client';

/**
 * useByokData — the single data layer for the BYOK hub.
 *
 * Owns:
 *   - keys      : GET  /api/user/api-keys          (endpoints, masked keys)
 *   - catalog   : GET  /api/providers              (models visible to pickers)
 *   - mutations : save / delete / toggle / reorder / test / discover-merge
 *
 * Every mutation refreshes BOTH keys and catalog — the catalog embeds the
 * user's curated modelsConfig, so adding a model immediately makes it
 * visible to every model picker in the app (the original visibility bug).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { ProviderCatalog } from '@/lib/ai/model-catalog';
import type { ByokProviderMeta } from '@/lib/ai/byok-providers';

// ── Types (mirror server responses) ──

export interface ByokModelConfig {
  id: string;
  name: string;
  capabilities?: { vision?: boolean; tools?: boolean; streaming?: boolean };
  contextWindow?: number;
  outputWindow?: number;
}

export interface SavedKey {
  id: string;
  providerId: string;
  baseUrl: string | null;
  label: string | null;
  maskedKey: string;
  enabled: boolean;
  priority: number;
  lastUsedAt: string | null;
  lastVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  isServerManaged?: boolean;
  modelsConfig: ByokModelConfig[] | null;
}

export type LoadError = string | '__unauthenticated__' | '__session_expired__' | null;

export interface TestResult {
  ok: boolean;
  error?: string;
  model?: string;
  models?: string[];
}

// ── Hook ──

export function useByokData() {
  const { status: sessionStatus } = useSession();
  const [keys, setKeys] = useState<SavedKey[]>([]);
  const [catalog, setCatalog] = useState<ProviderCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [loadError, setLoadError] = useState<LoadError>(null);
  // Per-key last test outcome, keyed by row id — drives the status dot until
  // the next full reload.
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const sessionStatusRef = useRef(sessionStatus);
  sessionStatusRef.current = sessionStatus;

  const reloadKeys = useCallback(async () => {
    try {
      const res = await fetch('/api/user/api-keys', { cache: 'no-store' });
      if (res.status === 401) {
        setLoadError(
          sessionStatusRef.current === 'authenticated' ? '__session_expired__' : '__unauthenticated__',
        );
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setKeys(data.keys ?? []);
      setLoadError(null);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Failed to load API keys');
    } finally {
      setLoading(false);
    }
  }, []);

  const reloadCatalog = useCallback(async () => {
    try {
      const res = await fetch('/api/providers', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setCatalog(await res.json());
    } catch {
      // Catalog is a nice-to-have for the picker; keys list still works.
      setCatalog(null);
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  const reload = useCallback(async () => {
    await Promise.all([reloadKeys(), reloadCatalog()]);
  }, [reloadKeys, reloadCatalog]);

  useEffect(() => {
    if (sessionStatus === 'loading') return;
    const t = setTimeout(() => void reload(), 0);
    return () => clearTimeout(t);
  }, [sessionStatus, reload]);

  // ── Mutations (all refresh keys + catalog afterwards) ──

  const refreshAfter = useCallback(async () => {
    await Promise.all([reloadKeys(), reloadCatalog()]);
  }, [reloadKeys, reloadCatalog]);

  /** Save an endpoint (create when no id, update in place when id given). */
  const saveKey = useCallback(
    async (params: {
      id?: string;
      providerId: string;
      apiKey?: string;
      baseUrl?: string | null;
      label?: string | null;
      test?: boolean;
    }): Promise<{ ok: boolean; error?: string; keyId?: string }> => {
      const res = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data.error || `HTTP ${res.status}` };
      await refreshAfter();
      return { ok: true, keyId: data.key?.id };
    },
    [refreshAfter],
  );

  /** Enable/disable one endpoint row. */
  const toggleKey = useCallback(
    async (keyId: string, providerId: string, enabled: boolean) => {
      // Optimistic
      setKeys((ks) => ks.map((k) => (k.id === keyId ? { ...k, enabled } : k)));
      const res = await fetch(`/api/user/api-keys/${encodeURIComponent(providerId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyId, enabled }),
      });
      if (!res.ok) {
        setKeys((ks) => ks.map((k) => (k.id === keyId ? { ...k, enabled: !enabled } : k)));
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      await refreshAfter();
    },
    [refreshAfter],
  );

  /** Delete one endpoint row. */
  const deleteKey = useCallback(
    async (keyId: string, providerId: string) => {
      const res = await fetch(
        `/api/user/api-keys/${encodeURIComponent(providerId)}?keyId=${encodeURIComponent(keyId)}`,
        { method: 'DELETE' },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setTestResults((r) => {
        const next = { ...r };
        delete next[keyId];
        return next;
      });
      await refreshAfter();
    },
    [refreshAfter],
  );

  /** Delete every endpoint of a provider. */
  const deleteAllKeys = useCallback(
    async (providerId: string) => {
      const res = await fetch(`/api/user/api-keys/${encodeURIComponent(providerId)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      await refreshAfter();
    },
    [refreshAfter],
  );

  /** Reorder an endpoint (move up/down in the failover order). */
  const moveKey = useCallback(
    async (keyId: string, providerId: string, move: 'up' | 'down') => {
      const res = await fetch(`/api/user/api-keys/${encodeURIComponent(providerId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyId, move }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await reloadKeys();
    },
    [reloadKeys],
  );

  /**
   * Test one endpoint (saved row or ad-hoc). Returns the discovered model
   * list (when the provider exposes /models) and remembers the outcome for
   * the status dot. NOTE: the route requires providerId alongside keyId.
   */
  const testKey = useCallback(
    async (
      keyId?: string,
      providerId?: string,
      adhoc?: { apiKey?: string; baseUrl?: string | null },
    ): Promise<TestResult> => {
      const res = await fetch('/api/user/api-keys/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          keyId && providerId
            ? { keyId, providerId }
            : adhoc && providerId
              ? { providerId, apiKey: adhoc.apiKey, baseUrl: adhoc.baseUrl }
              : { providerId, apiKey: adhoc?.apiKey, baseUrl: adhoc?.baseUrl },
        ),
      });
      const data: TestResult = await res.json().catch(() => ({ ok: false, error: `HTTP ${res.status}` }));
      if (keyId) setTestResults((r) => ({ ...r, [keyId]: data }));
      // A successful test updates lastVerifiedAt server-side — refresh keys
      // (cheap) but not the whole catalog.
      if (data.ok) void reloadKeys();
      return data;
    },
    [reloadKeys],
  );

  /** Replace a provider's curated model catalog (the "models I add"). */
  const saveModels = useCallback(
    async (providerId: string, models: ByokModelConfig[] | null) => {
      const res = await fetch('/api/user/api-keys', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, modelsConfig: models }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      await refreshAfter();
    },
    [refreshAfter],
  );

  /**
   * Test an endpoint and merge its discovered model list into the provider's
   * modelsConfig (dedup by id). Returns the newly added models.
   */
  const discoverModels = useCallback(
    async (
      key: SavedKey,
    ): Promise<{ ok: boolean; error?: string; added: ByokModelConfig[]; discovered: string[] }> => {
      const result = await testKey(key.id, key.providerId);
      if (!result.ok) {
        return { ok: false, error: result.error || 'Test failed', added: [], discovered: [] };
      }
      const discovered = result.models ?? [];
      if (!discovered.length) {
        return { ok: true, added: [], discovered: [] };
      }
      const existing = new Map((key.modelsConfig ?? []).map((m) => [m.id, m]));
      for (const id of discovered) {
        if (!existing.has(id)) {
          existing.set(id, { id, name: id });
        }
      }
      const prev = key.modelsConfig ?? [];
      const next = [...existing.values()];
      await saveModels(key.providerId, next);
      return {
        ok: true,
        added: next.filter((m) => !prev.some((p) => p.id === m.id)),
        discovered,
      };
    },
    [testKey, saveModels],
  );

  // Set the user's app-wide default model (persisted to User.defaultModel).
  const setDefaultModel = useCallback(
    async (model: string | null) => {
      setCatalog((c) => (c ? { ...c, userDefault: model } : c));
      const res = await fetch('/api/user/default-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ defaultModel: model }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    },
    [],
  );

  return {
    keys,
    catalog,
    catalogLoading,
    loading,
    loadError,
    testResults,
    reload,
    reloadKeys,
    reloadCatalog,
    saveKey,
    toggleKey,
    deleteKey,
    deleteAllKeys,
    moveKey,
    testKey,
    saveModels,
    discoverModels,
    setDefaultModel,
  };
}

// ── Derived helpers (pure — components import these directly) ──

/** Group keys by provider, preserving BYOK_PROVIDERS order then custom ids. */
export function groupKeysByProvider(
  keys: SavedKey[],
  providers: ByokProviderMeta[],
): Array<{ provider: ByokProviderMeta; keys: SavedKey[] }> {
  const byProvider = new Map<string, SavedKey[]>();
  for (const k of keys) {
    const list = byProvider.get(k.providerId);
    if (list) list.push(k);
    else byProvider.set(k.providerId, [k]);
  }
  const groups: Array<{ provider: ByokProviderMeta; keys: SavedKey[] }> = [];
  for (const p of providers) {
    const ks = byProvider.get(p.id);
    if (ks?.length) {
      groups.push({ provider: p, keys: ks });
      byProvider.delete(p.id);
    }
  }
  // Providers outside the static registry (custom gateway ids) last.
  for (const [id, ks] of byProvider) {
    groups.push({
      provider: {
        id,
        name: id,
        type: 'openai',
        defaultBaseUrl: '',
        icon: '',
        keyHint: '',
        requiresKey: true,
      },
      keys: ks,
    });
  }
  return groups;
}
