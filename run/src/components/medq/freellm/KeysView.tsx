'use client';

/**
 * AI Router · Keys — BYOK provider key management, natively in MedQ.
 *
 * Ported from freellmapi's KeysPage: grouped key list with health dots and
 * hover actions, add-key for the 70+ catalog providers, and the custom
 * OpenAI-compatible endpoint flow with live model discovery + bulk
 * registration ("the models I added are finally visible" — the flow that
 * started this whole integration).
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, KeyRound, Loader2, Plus, RefreshCw, Search, Server, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  type FlKey,
  type FlProvider,
  type FlProviderCatalog,
  type FreellmSession,
  formatRelativeTime,
} from './api';
import { ConfirmButton, ErrorNote, FlStatusDot, EmptyState, InlineLoader, Panel, platformColor, SegmentedControl } from './ui';

type StatusFilter = 'all' | 'healthy' | 'issues';

interface DiscoveredModel {
  id: string;
  registered?: boolean;
}

export default function KeysView({ session }: { session: FreellmSession }) {
  const { flFetch } = session;
  const [keys, setKeys] = useState<FlKey[] | null>(null);
  const [providers, setProviders] = useState<FlProvider[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [busyId, setBusyId] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [k, p] = await Promise.all([
        flFetch<FlKey[]>('/api/keys'),
        flFetch<FlProviderCatalog>('/api/keys/providers'),
      ]);
      setKeys(k);
      setProviders(p.providers);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [flFetch]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const filtered = useMemo(() => {
    let list = keys ?? [];
    if (statusFilter === 'healthy') list = list.filter((k) => k.enabled && k.status === 'healthy');
    if (statusFilter === 'issues') list = list.filter((k) => !k.enabled || (k.status !== 'healthy' && k.status !== 'unknown'));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (k) =>
          (k.label ?? '').toLowerCase().includes(q) ||
          k.platform.toLowerCase().includes(q) ||
          (k.baseUrl ?? '').toLowerCase().includes(q) ||
          k.models.some((m) => m.modelId.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [keys, query, statusFilter]);

  const act = async (id: number, fn: () => Promise<unknown>) => {
    setBusyId(id);
    setError(null);
    try {
      await fn();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a8]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keys, providers, models…"
            className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 pl-8 pr-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
          />
        </div>
        <SegmentedControl<StatusFilter>
          value={statusFilter}
          onChange={setStatusFilter}
          size="sm"
          options={[
            { value: 'all', label: `All ${keys?.length ?? ''}` },
            { value: 'healthy', label: 'Healthy' },
            { value: 'issues', label: 'Issues' },
          ]}
        />
        <button
          type="button"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white/90"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#00e5a0] px-3 text-xs font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85"
        >
          <Plus className="h-3.5 w-3.5" /> Add key
        </button>
      </div>

      {error ? <ErrorNote>{error}</ErrorNote> : null}
      {keys === null && !error ? <InlineLoader>Loading keys…</InlineLoader> : null}

      {keys !== null && filtered.length === 0 ? (
        <Panel>
          <EmptyState
            title={keys.length === 0 ? 'No provider keys yet' : 'Nothing matches this filter'}
            hint={
              keys.length === 0
                ? 'Add a free-tier provider key (Google, GLM, Groq…) or point the router at any OpenAI-compatible endpoint — your local Ollama included.'
                : 'Clear the search or switch the status filter to see the rest.'
            }
          />
        </Panel>
      ) : null}

      {/* Key rows */}
      <div className="space-y-2">
        {filtered.map((k) => (
          <Panel key={k.id} className="group transition-colors hover:border-white/[0.1]">
            <div className="flex flex-wrap items-center gap-3 px-4 py-3">
              <FlStatusDot status={k.enabled ? k.status : 'disabled'} />
              <span
                className="rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: `${platformColor(k.platform)}1f`, color: platformColor(k.platform) }}
              >
                {k.platform}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white/90">
                  {k.label || k.baseUrl || 'Unnamed key'}
                  {busyId === k.id ? <Loader2 className="ml-2 inline h-3.5 w-3.5 animate-spin text-[#00e5a0]" /> : null}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#8b95a8]">
                  <span className="font-mono">{k.maskedKey}</span>
                  {k.baseUrl ? <span className="truncate font-mono">{k.baseUrl}</span> : null}
                  <span>checked {formatRelativeTime(k.lastCheckedAt)}</span>
                  {k.monthlyUsage && k.monthlyUsage.requests > 0 ? (
                    <span>
                      {k.monthlyUsage.requests} req · {k.monthlyUsage.tokens.toLocaleString()} tok this month
                    </span>
                  ) : null}
                </div>
                {k.lastHealthError ? (
                  <div className="mt-1 max-w-2xl truncate text-[11px] text-[#ff9d9d]/80" title={k.lastHealthError}>
                    {k.lastHealthError}
                  </div>
                ) : null}
              </div>

              {/* Models */}
              {k.models.length > 0 ? (
                <div className="hidden max-w-56 flex-wrap gap-1 md:flex">
                  {k.models.slice(0, 3).map((m) => (
                    <span key={m.id} className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-white/70">
                      {m.modelId}
                    </span>
                  ))}
                  {k.models.length > 3 ? (
                    <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-[#8b95a8]">+{k.models.length - 3}</span>
                  ) : null}
                </div>
              ) : null}

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <Switch
                  checked={k.enabled}
                  onCheckedChange={(v) => void act(k.id, () => flFetch(`/api/keys/${k.id}`, { method: 'PATCH', body: JSON.stringify({ enabled: v }) }))}
                  aria-label="Enable key"
                />
                <button
                  type="button"
                  title="Run a health check now"
                  onClick={() => void act(k.id, () => flFetch(`/api/health/check/${k.id}`, { method: 'POST' }))}
                  className="rounded-md px-2 py-1 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-[#00e5a0]"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <ConfirmButton
                  title="Delete key"
                  onConfirm={() => void act(k.id, () => flFetch(`/api/keys/${k.id}`, { method: 'DELETE' }))}
                  confirmLabel="Delete?"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </ConfirmButton>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {addOpen ? (
        <AddKeyDialog
          session={session}
          providers={providers ?? []}
          onClose={() => setAddOpen(false)}
          onAdded={() => {
            setAddOpen(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      ) : null}
    </div>
  );
}

// ── Add key dialog ──────────────────────────────────────────────────────────

type DialogPane = 'catalog' | 'custom';

function AddKeyDialog({
  session,
  providers,
  onClose,
  onAdded,
}: {
  session: FreellmSession;
  providers: FlProvider[];
  onClose: () => void;
  onAdded: () => void;
}) {
  const { flFetch } = session;
  const [pane, setPane] = useState<DialogPane>('catalog');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // catalog pane state
  const [providerQuery, setProviderQuery] = useState('');
  const [selected, setSelected] = useState<FlProvider | null>(null);
  const [keyValue, setKeyValue] = useState('');
  const [label, setLabel] = useState('');

  // custom pane state
  const [baseUrl, setBaseUrl] = useState('');
  const [customKey, setCustomKey] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [discovered, setDiscovered] = useState<DiscoveredModel[] | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [discovering, setDiscovering] = useState(false);

  const filteredProviders = useMemo(() => {
    const q = providerQuery.trim().toLowerCase();
    const list = q
      ? providers.filter((p) => p.name.toLowerCase().includes(q) || p.platform.includes(q))
      : providers;
    return [...list].sort((a, b) => Number(b.configured) - Number(a.configured) || a.name.localeCompare(b.name));
  }, [providers, providerQuery]);

  const submitCatalog = async () => {
    if (!selected) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await flFetch<{ notice?: string; modelsAvailable?: number }>('/api/keys', {
        method: 'POST',
        body: JSON.stringify({
          platform: selected.platform,
          ...(keyValue.trim() ? { key: keyValue.trim() } : {}),
          ...(label.trim() ? { label: label.trim() } : {}),
        }),
      });
      if (res.notice) setNotice(res.notice);
      onAdded();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };

  const discover = async (): Promise<DiscoveredModel[]> => {
    if (!baseUrl.trim()) return [];
    setDiscovering(true);
    setError(null);
    try {
      const res = await flFetch<{ models: DiscoveredModel[] }>('/api/keys/custom/discover-models', {
        method: 'POST',
        body: JSON.stringify({
          baseUrl: baseUrl.trim(),
          ...(customKey.trim() ? { apiKey: customKey.trim() } : {}),
        }),
      });
      setDiscovered(res.models);
      setPicked(new Set(res.models.filter((m) => !m.registered).map((m) => m.id)));
      return res.models;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return [];
    } finally {
      setDiscovering(false);
    }
  };

  const submitCustom = async () => {
    setBusy(true);
    setError(null);
    try {
      // Auto-discover when the user didn't — registering an endpoint without
      // models is only valid for a key add on an existing endpoint.
      let models: string[] | undefined;
      if (discovered && picked.size > 0) {
        models = Array.from(picked);
      } else if (!discovered) {
        const found = await discover();
        if (found.length > 0) models = found.filter((m) => !m.registered).map((m) => m.id);
      }
      await flFetch('/api/keys/custom', {
        method: 'POST',
        body: JSON.stringify({
          baseUrl: baseUrl.trim(),
          ...(customKey.trim() ? { apiKey: customKey.trim() } : {}),
          ...(customLabel.trim() ? { label: customLabel.trim() } : {}),
          ...(models && models.length > 0 ? { models } : {}),
        }),
      });
      onAdded();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e14] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
          <KeyRound className="h-4 w-4 text-[#00e5a0]" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-white/90">Add a provider key</div>
            <div className="text-xs text-[#8b95a8]">Bring your own key — it is stored encrypted and never leaves this machine.</div>
          </div>
          <button type="button" onClick={onClose} className="rounded-md px-2 py-1 text-sm text-[#8b95a8] hover:bg-white/[0.06] hover:text-white">✕</button>
        </div>

        <div className="border-b border-white/[0.06] px-5 pt-3">
          <SegmentedControl<DialogPane>
            value={pane}
            onChange={(p) => { setPane(p); setError(null); }}
            options={[
              { value: 'catalog', label: 'Known provider' },
              { value: 'custom', label: 'Custom endpoint' },
            ]}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {pane === 'catalog' ? (
            <div className="space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a8]" />
                <input
                  value={providerQuery}
                  onChange={(e) => setProviderQuery(e.target.value)}
                  placeholder={`Search ${providers.length} providers…`}
                  className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 pl-8 pr-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                />
              </div>
              <div className="max-h-56 overflow-y-auto rounded-lg border border-white/[0.06]">
                {filteredProviders.slice(0, 60).map((p) => {
                  const active = selected?.platform === p.platform;
                  return (
                    <button
                      key={p.platform}
                      type="button"
                      onClick={() => setSelected(p)}
                      className={`flex w-full items-center gap-2 border-b border-white/[0.04] px-3 py-2 text-left text-sm last:border-0 transition-colors ${active ? 'bg-[#00e5a0]/10' : 'hover:bg-white/[0.04]'}`}
                    >
                      {active ? <Check className="h-3.5 w-3.5 text-[#00e5a0]" /> : <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#8b95a8]/50" />}
                      <span className="flex-1 truncate" style={{ color: active ? '#00e5a0' : undefined }}>{p.name}</span>
                      {p.configured ? (
                        <span className="rounded bg-[#00e5a0]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#00e5a0]">added</span>
                      ) : null}
                      {p.keyless ? <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[#8b95a8]">keyless</span> : null}
                    </button>
                  );
                })}
              </div>
              {selected ? (
                <div className="space-y-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="text-xs text-[#8b95a8]">
                    {selected.name}
                    {selected.keyless ? ' — works without a key; add one anyway if you have a higher tier.' : ' — paste the API key from its console.'}
                  </div>
                  {!selected.keyless ? (
                    <input
                      type="password"
                      value={keyValue}
                      onChange={(e) => setKeyValue(e.target.value)}
                      placeholder="API key"
                      className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 font-mono text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                    />
                  ) : null}
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Label (optional) — e.g. Study account"
                    className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-[#8b95a8]">
                <Server className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00e5a0]" />
                Any OpenAI-compatible endpoint: local Ollama (<span className="font-mono">http://127.0.0.1:11434/v1</span>), vLLM, LM Studio, a relay…
              </div>
              <input
                value={baseUrl}
                onChange={(e) => { setBaseUrl(e.target.value); setDiscovered(null); }}
                placeholder="Base URL — https://host/v1"
                className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 font-mono text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
              />
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="API key (optional for local endpoints)"
                className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 font-mono text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
              />
              <input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder="Label — e.g. Local Ollama"
                className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 px-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!baseUrl.trim() || discovering}
                  onClick={discover}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#00e5a0]/30 px-3 text-xs font-medium text-[#00e5a0] transition-colors hover:bg-[#00e5a0]/10 disabled:opacity-40"
                >
                  {discovering ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
                  Discover models
                </button>
                {discovered ? (
                  <span className="text-xs text-[#8b95a8]">{picked.size} of {discovered.length} selected</span>
                ) : null}
              </div>
              {discovered ? (
                <div className="max-h-52 overflow-y-auto rounded-lg border border-white/[0.06]">
                  {discovered.map((m) => {
                    const on = picked.has(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPicked((prev) => { const next = new Set(prev); if (next.has(m.id)) next.delete(m.id); else next.add(m.id); return next; })}
                        className={`flex w-full items-center gap-2 border-b border-white/[0.04] px-3 py-1.5 text-left text-xs last:border-0 ${on ? 'bg-[#00e5a0]/[0.07]' : 'hover:bg-white/[0.04]'}`}
                      >
                        <span className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${on ? 'border-[#00e5a0] bg-[#00e5a0]/20' : 'border-white/20'}`}>
                          {on ? <Check className="h-2.5 w-2.5 text-[#00e5a0]" /> : null}
                        </span>
                        <span className="flex-1 truncate font-mono text-white/85">{m.id}</span>
                        {m.registered ? <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[#8b95a8]">already added</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          )}

          {error ? <div className="mt-3"><ErrorNote>{error}</ErrorNote></div> : null}
          {notice ? <p className="mt-3 text-xs text-[#00e5a0]">{notice}</p> : null}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] px-5 py-3.5">
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-xs text-[#8b95a8] hover:bg-white/[0.06] hover:text-white">Cancel</button>
          <button
            type="button"
            disabled={busy || (pane === 'catalog' ? !selected : !baseUrl.trim())}
            onClick={pane === 'catalog' ? submitCatalog : submitCustom}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#00e5a0] px-4 text-xs font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85 disabled:opacity-40"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {pane === 'catalog' ? 'Add key' : 'Register endpoint'}
          </button>
        </div>
      </div>
    </div>
  );
}
