'use client';

/**
 * AI Router · Models — the synced free-model catalog, natively in MedQ.
 *
 * Ported from freellmapi's models table: search, provider + status filters,
 * per-model enable/disable (this is the model-switching core), capability
 * chips, medical-model highlighting (MedQ customization), the routing-chain
 * order (↑/↓ over the authoritative /api/fallback chain) and the one-click
 * Smartest/Fastest sort presets.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, Gauge, Loader2, RefreshCw, Search, Sparkles, Stethoscope, Wrench } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { isMedicalModel, type FlModel, type FreellmSession, type FlRoutingState } from './api';
import { ErrorNote, EmptyState, InlineLoader, Panel, platformColor, SegmentedControl } from './ui';

interface ChainRow {
  modelDbId: number;
  priority: number;
  enabled: boolean;
}

type StatusFilter = 'all' | 'enabled' | 'medical' | 'chain';

const PAGE = 60;

export default function ModelsView({ session }: { session: FreellmSession }) {
  const { flFetch } = session;
  const [models, setModels] = useState<FlModel[] | null>(null);
  const [chain, setChain] = useState<ChainRow[] | null>(null);
  const [routing, setRouting] = useState<FlRoutingState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('enabled');
  const [visionOnly, setVisionOnly] = useState(false);
  const [toolsOnly, setToolsOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [m, c, r] = await Promise.all([
        flFetch<FlModel[]>('/api/models'),
        flFetch<ChainRow[]>('/api/fallback'),
        flFetch<FlRoutingState>('/api/fallback/routing'),
      ]);
      setModels(m);
      setChain(c);
      setRouting(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [flFetch]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const chainRank = useMemo(() => {
    const map = new Map<number, number>();
    (chain ?? []).forEach((row, i) => map.set(row.modelDbId, i + 1));
    return map;
  }, [chain]);

  const platforms = useMemo(() => {
    const counts = new Map<string, number>();
    (models ?? []).forEach((m) => counts.set(m.platform, (counts.get(m.platform) ?? 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [models]);

  const filtered = useMemo(() => {
    let list = models ?? [];
    if (statusFilter === 'enabled') list = list.filter((m) => m.enabled);
    if (statusFilter === 'medical') list = list.filter((m) => isMedicalModel(m.modelId));
    if (statusFilter === 'chain') list = list.filter((m) => chainRank.has(m.id));
    if (platform !== 'all') list = list.filter((m) => m.platform === platform);
    if (visionOnly) list = list.filter((m) => m.supportsVision);
    if (toolsOnly) list = list.filter((m) => m.supportsTools);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (m) => m.displayName.toLowerCase().includes(q) || m.modelId.toLowerCase().includes(q) || m.platform.includes(q),
      );
    }
    return list;
  }, [models, statusFilter, platform, visionOnly, toolsOnly, query, chainRank]);

  const toggleModel = async (m: FlModel, enabled: boolean) => {
    setBusyId(m.id);
    setError(null);
    try {
      await flFetch(`/api/models/${m.id}`, { method: 'PATCH', body: JSON.stringify({ enabled }) });
      setModels((prev) => (prev ?? []).map((x) => (x.id === m.id ? { ...x, enabled } : x)));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  /** Move a chained model up/down: swap with its neighbour, renumber, PUT. */
  const move = async (m: FlModel, dir: -1 | 1) => {
    const rows = chain ?? [];
    const idx = rows.findIndex((r) => r.modelDbId === m.id);
    if (idx < 0) return;
    const swapWith = idx + dir;
    if (swapWith < 0 || swapWith >= rows.length) return;
    const next = [...rows];
    [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
    setBusyId(m.id);
    setError(null);
    try {
      await flFetch('/api/fallback', {
        method: 'PUT',
        body: JSON.stringify(next.map((r, i) => ({ modelDbId: r.modelDbId, priority: i + 1, enabled: r.enabled }))),
      });
      setChain(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  const sortPreset = async (preset: 'intelligence' | 'speed') => {
    setBusyId(-1);
    setError(null);
    try {
      await flFetch(`/api/fallback/sort/${preset}`, { method: 'POST' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  };

  const enabledCount = (models ?? []).filter((m) => m.enabled).length;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8b95a8]" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }}
            placeholder={`Search ${models?.length ?? '…'} models…`}
            className="h-9 w-full rounded-lg border border-white/[0.06] bg-black/30 pl-8 pr-3 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
          />
        </div>
        <select
          value={platform}
          onChange={(e) => { setPlatform(e.target.value); setLimit(PAGE); }}
          className="h-9 rounded-lg border border-white/[0.06] bg-black/30 px-2.5 text-xs text-white/85 focus:border-[#00e5a0]/40 focus:outline-none"
        >
          <option value="all">All providers</option>
          {platforms.map(([p, n]) => (
            <option key={p} value={p}>{p} ({n})</option>
          ))}
        </select>
        <SegmentedControl<StatusFilter>
          value={statusFilter}
          onChange={(v) => { setStatusFilter(v); setLimit(PAGE); }}
          size="sm"
          options={[
            { value: 'enabled', label: `Enabled ${enabledCount || ''}` },
            { value: 'all', label: 'All' },
            { value: 'medical', label: 'Medical' },
            { value: 'chain', label: 'Router order' },
          ]}
        />
        <button
          type="button"
          onClick={() => setVisionOnly((v) => !v)}
          className={`inline-flex h-8 items-center gap-1 rounded-lg border px-2.5 text-xs transition-colors ${visionOnly ? 'border-[#22d3ee]/40 bg-[#22d3ee]/10 text-[#22d3ee]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`}
        >
          <Eye className="h-3.5 w-3.5" /> Vision
        </button>
        <button
          type="button"
          onClick={() => setToolsOnly((v) => !v)}
          className={`inline-flex h-8 items-center gap-1 rounded-lg border px-2.5 text-xs transition-colors ${toolsOnly ? 'border-[#a78bfa]/40 bg-[#a78bfa]/10 text-[#a78bfa]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`}
        >
          <Wrench className="h-3.5 w-3.5" /> Tools
        </button>
        <button
          type="button"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white/90"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Routing strategy + sort presets */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#8b95a8]">
        <Gauge className="h-3.5 w-3.5 text-[#00e5a0]" />
        <span>
          Strategy: <span className="text-white/85">{routing?.strategy ?? '…'}</span> · order applies when it is <span className="text-white/85">priority</span>
        </span>
        <span className="mx-1 text-white/15">|</span>
        <button
          type="button"
          disabled={busyId === -1}
          onClick={() => sortPreset('intelligence')}
          className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] px-2 py-1 text-[11px] text-[#8b95a8] transition-colors hover:border-[#00e5a0]/30 hover:text-[#00e5a0] disabled:opacity-40"
        >
          {busyId === -1 ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />} Sort chain: smartest first
        </button>
        <button
          type="button"
          onClick={() => sortPreset('speed')}
          className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] px-2 py-1 text-[11px] text-[#8b95a8] transition-colors hover:border-[#00e5a0]/30 hover:text-[#00e5a0]"
        >
          <Gauge className="h-3 w-3" /> fastest first
        </button>
      </div>

      {error ? <ErrorNote>{error}</ErrorNote> : null}
      {models === null && !error ? <InlineLoader>Loading catalog…</InlineLoader> : null}

      {models !== null && filtered.length === 0 ? (
        <Panel><EmptyState title="No models match" hint="Try clearing filters — or add a key so the catalog's provider models become usable." /></Panel>
      ) : null}

      {/* Model rows */}
      <div className="space-y-1.5">
        {filtered.slice(0, limit).map((m) => {
          const rank = chainRank.get(m.id);
          const med = isMedicalModel(m.modelId);
          return (
            <div
              key={m.id}
              className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border px-3.5 py-2.5 transition-colors ${m.enabled ? 'border-white/[0.08] bg-white/[0.025]' : 'border-white/[0.04] bg-transparent'}`}
            >
              <Switch
                checked={m.enabled}
                onCheckedChange={(v) => void toggleModel(m, v)}
                aria-label={`Enable ${m.displayName}`}
              />
              <div className="min-w-44 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`truncate text-sm font-medium ${m.enabled ? 'text-white/92' : 'text-white/45'}`}>{m.displayName}</span>
                  {med ? (
                    <span className="inline-flex items-center gap-1 rounded bg-[#00e5a0]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#00e5a0]">
                      <Stethoscope className="h-2.5 w-2.5" /> medical
                    </span>
                  ) : null}
                  {m.supportsVision ? <span className="rounded bg-[#22d3ee]/10 px-1.5 py-0.5 text-[10px] text-[#22d3ee]">vision</span> : null}
                  {m.supportsTools ? <span className="rounded bg-[#a78bfa]/10 px-1.5 py-0.5 text-[10px] text-[#a78bfa]">tools</span> : null}
                  {m.source === 'custom' ? <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[#8b95a8]">yours</span> : null}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[11px] text-[#8b95a8]">
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    style={{ backgroundColor: `${platformColor(m.platform)}1f`, color: platformColor(m.platform) }}
                  >
                    {m.platform}
                  </span>
                  <span className="font-mono">{m.modelId}</span>
                  {m.intelligenceRank ? <span title="Intelligence rank">intel {m.intelligenceRank}</span> : null}
                  {m.speedRank ? <span title="Speed rank">speed {m.speedRank}</span> : null}
                  {m.contextWindow ? <span>{Math.round(m.contextWindow / 1024)}k ctx</span> : null}
                  {m.rpdLimit ? <span>{m.rpdLimit}/day</span> : m.rpmLimit ? <span>{m.rpmLimit}/min</span> : null}
                  {m.monthlyTokenBudget ? <span>{m.monthlyTokenBudget}/mo</span> : null}
                </div>
              </div>

              {/* Router order controls (chained models only) */}
              {rank ? (
                <div className="flex items-center gap-1">
                  <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] tabular-nums text-[#8b95a8]" title="Position in the routing chain">
                    #{rank}
                  </span>
                  <button
                    type="button"
                    title="Higher routing priority"
                    disabled={busyId === m.id}
                    onClick={() => void move(m, -1)}
                    className="rounded-md px-1.5 py-1 text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-[#00e5a0] disabled:opacity-40"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Lower routing priority"
                    disabled={busyId === m.id}
                    onClick={() => void move(m, 1)}
                    className="rounded-md px-1.5 py-1 text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-[#00e5a0] disabled:opacity-40"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
              {busyId === m.id ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#00e5a0]" /> : null}
            </div>
          );
        })}
        {filtered.length > limit ? (
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="w-full rounded-xl border border-white/[0.06] py-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.04] hover:text-white/90"
          >
            Show {Math.min(PAGE, filtered.length - limit)} more of {filtered.length}
          </button>
        ) : null}
      </div>
    </div>
  );
}
