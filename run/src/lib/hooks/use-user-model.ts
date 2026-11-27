'use client';

/**
 * useUserModel — client-side hook for the per-user AI model picker.
 *
 * Responsibilities:
 *   1. Fetch the provider catalog from /api/providers (cached, refetchable).
 *   2. Track the user's current selection (per-tab override via localStorage).
 *   3. Persist the user's *default* model to /api/user/default-model (DB).
 *   4. Expose a `getModelHeaders()` helper that returns the fetch headers
 *      { 'x-model': 'providerId:modelId' } to send with AI API requests.
 *
 * Selection hierarchy (per tab):
 *   - If the user picked a model in this tab (localStorage override), use it.
 *   - Else, use the user's saved default (from DB via catalog.userDefault).
 *   - Else, fall back to "auto" (no x-model header → server decides).
 *
 * Why localStorage for per-tab? Because:
 *   - Users want different models in different contexts (Tutor vs. Quiz vs. Mnemonics).
 *   - Saving each as a DB column would bloat the schema.
 *   - It's the same pattern as the existing localStorage-based model state.
 *
 * The user's *default* (the one used when no per-tab override is set) is
 * persisted to the DB so it syncs across devices.
 */

import { useCallback, useEffect, useState } from 'react';
import type { ProviderCatalog } from '@/lib/ai/model-catalog';
import { buildModelString, parseModelString } from '@/lib/ai/model-catalog';

const CATALOG_CACHE_MS = 30_000;

export type ModelHeaders = { 'x-model'?: string };

export interface UseUserModelResult {
  /** Full provider catalog (null while loading) */
  catalog: ProviderCatalog | null;
  /** True while the catalog is loading */
  loading: boolean;
  /** Error message if the catalog failed to load */
  error: string | null;
  /** The currently-effective model string for this tab (null = "auto") */
  currentModel: string | null;
  /** True if currentModel came from a per-tab override (vs. default) */
  isTabOverride: boolean;
  /** Set the model for this tab only (localStorage). Pass null to clear. */
  setTabModel: (model: string | null) => void;
  /** Set the user's default model (persists to DB). Pass null to clear. */
  setDefaultModel: (model: string | null) => Promise<void>;
  /** Force a catalog refetch (e.g. after saving a new BYOK key) */
  refresh: () => void;
  /** Returns the headers to send with AI API requests */
  getModelHeaders: () => ModelHeaders;
}

/**
 * @param tabId Stable identifier for the tab/context (e.g. "tutor", "coach")
 */
export function useUserModel(tabId: string): UseUserModelResult {
  const [catalog, setCatalog] = useState<ProviderCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabModel, setTabModelState] = useState<string | null>(null);
  const [defaultModel, setDefaultModelState] = useState<string | null>(null);

  // Per-tab localStorage key
  const storageKey = `medq:tab-model:${tabId}`;

  // Fetch catalog
  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/providers', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ProviderCatalog = await res.json();
      setCatalog(data);
      setDefaultModelState(data.userDefault);
    } catch (e: any) {
      setError(e?.message || 'Failed to load providers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  // Load per-tab override from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setTabModelState(stored);
    } catch {
      // ignore (private mode, etc.)
    }
  }, [storageKey]);

  // Refresh periodically (so BYOK changes / Ollama restart are picked up)
  useEffect(() => {
    const t = setInterval(loadCatalog, CATALOG_CACHE_MS);
    return () => clearInterval(t);
  }, [loadCatalog]);

  const setTabModel = useCallback(
    (model: string | null) => {
      setTabModelState(model);
      try {
        if (model) {
          localStorage.setItem(storageKey, model);
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const setDefaultModel = useCallback(
    async (model: string | null) => {
      // Optimistic update
      setDefaultModelState(model);
      try {
        await fetch('/api/user/default-model', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ defaultModel: model }),
        });
        // Refresh the catalog so userDefault stays in sync
        void loadCatalog();
      } catch (e) {
        // Revert on failure
        setDefaultModelState(catalog?.userDefault ?? null);
        throw e;
      }
    },
    [catalog?.userDefault, loadCatalog],
  );

  const currentModel = tabModel ?? defaultModel ?? null;
  const isTabOverride = tabModel !== null;

  const getModelHeaders = useCallback((): ModelHeaders => {
    if (!currentModel) return {};
    const parsed = parseModelString(currentModel);
    if (!parsed) return {};
    return { 'x-model': buildModelString(parsed.providerId, parsed.modelId) };
  }, [currentModel]);

  return {
    catalog,
    loading,
    error,
    currentModel,
    isTabOverride,
    setTabModel,
    setDefaultModel,
    refresh: loadCatalog,
    getModelHeaders,
  };
}
