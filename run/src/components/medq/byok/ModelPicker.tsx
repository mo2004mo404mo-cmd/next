'use client';

/**
 * ModelPicker — the searchable model combobox (FreeLLMAPI model-combobox
 * pattern) that reads the LIVE /api/providers catalog.
 *
 * This is the component that makes "the models I added" visible app-wide:
 * the catalog's `byok` section is built from the user's curated
 * modelsConfig, so anything added in Settings → AI Providers → Models
 * appears here immediately.
 *
 * Usage:
 *   <ModelPicker
 *     value={model}                    // "providerId:modelId" | null (auto)
 *     onChange={(v) => setModel(v)}
 *     compact                          // inline trigger (default: block)
 *   />
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronsUpDown, Check, Search, Sparkles, Zap, Globe, Server, User, HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProviderCatalog, CatalogProvider, CatalogModel } from '@/lib/ai/model-catalog';
import { parseModelString } from '@/lib/ai/model-catalog';
import { platformColor, CapabilityChip, ContextChip, ProviderAvatar } from './shared';
import { BYOK_PROVIDER_BY_ID } from '@/lib/ai/byok-providers';

interface ModelOption {
  value: string; // "providerId:modelId"
  providerId: string;
  providerName: string;
  providerIcon?: string;
  model: CatalogModel;
  section: 'server' | 'byok' | 'local';
}

/** Brand tile for a model option: the provider's /logos/ mark when the
 *  catalog carries one, the registry's icon as a fallback, else a colored
 *  dot (the pre-logo treatment). Mono logos are inverted by ProviderAvatar. */
function optionAvatar(o: Pick<ModelOption, 'providerId' | 'providerName' | 'providerIcon'>) {
  const icon = o.providerIcon ?? BYOK_PROVIDER_BY_ID[o.providerId]?.icon;
  if (!icon) {
    return (
      <span
        aria-hidden
        className="size-2 rounded-full shrink-0"
        style={{ backgroundColor: platformColor(o.providerId) }}
      />
    );
  }
  return <ProviderAvatar provider={{ id: o.providerId, name: o.providerName, icon }} size="xs" />;
}

const SECTION_META = {
  server: { label: 'Server (managed)', icon: Server },
  byok: { label: 'Your providers', icon: User },
  local: { label: 'Local', icon: HardDrive },
} as const;

export function ModelPicker({
  value,
  onChange,
  compact = false,
  placeholder = 'Auto (server decides)',
  className,
}: {
  value: string | null;
  onChange: (model: string | null) => void;
  compact?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [catalog, setCatalog] = useState<ProviderCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch the live catalog whenever the picker opens (cheap, no-store).
  useEffect(() => {
    if (!open || catalog) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/providers', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ProviderCatalog = await res.json();
        if (!cancelled) setCatalog(data);
      } catch {
        /* picker still usable with "Auto" */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [open, catalog]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const options = useMemo<ModelOption[]>(() => {
    if (!catalog) return [];
    const out: ModelOption[] = [];
    const push = (p: CatalogProvider, section: ModelOption['section']) => {
      for (const m of p.models) {
        out.push({
          value: `${p.id}:${m.id}`,
          providerId: p.id,
          providerName: p.name,
          providerIcon: p.icon,
          model: m,
          section,
        });
      }
    };
    for (const p of catalog.server) push(p, 'server');
    for (const p of catalog.byok) push(p, 'byok');
    for (const p of catalog.local) push(p, 'local');
    return out;
  }, [catalog]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.model.name.toLowerCase().includes(q) ||
        o.model.id.toLowerCase().includes(q) ||
        o.providerName.toLowerCase().includes(q) ||
        o.providerId.toLowerCase().includes(q),
    );
  }, [options, query]);

  // Group filtered options by section for rendering.
  const grouped = useMemo(() => {
    const map = new Map<ModelOption['section'], ModelOption[]>();
    for (const o of filtered) {
      const list = map.get(o.section);
      if (list) list.push(o);
      else map.set(o.section, [o]);
    }
    return map;
  }, [filtered]);

  const selected = useMemo(() => {
    if (!value || !catalog) return null;
    const parsed = parseModelString(value);
    if (!parsed) return null;
    return options.find((o) => o.providerId === parsed.providerId && o.model.id === parsed.modelId) ?? null;
  }, [value, catalog, options]);

  const byokCount = catalog?.byok.reduce((n, p) => n + p.models.length, 0) ?? 0;

  const select = (v: string | null) => {
    onChange(v);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={rootRef} className={cn('relative', !compact && 'w-full', className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#08090f] text-left transition-colors hover:border-[#00e5a0]/30',
          compact ? 'h-8 px-2.5' : 'h-9 px-3 w-full',
        )}
      >
        {selected ? (
          <>
            {optionAvatar(selected)}
            <span className="text-[11px] font-medium text-[#e8ecf4] truncate">
              {selected.model.name}
            </span>
            <span className="text-[10px] text-[#5a6478] truncate hidden sm:inline">
              {selected.providerName}
            </span>
          </>
        ) : (
          <>
            <Sparkles className="size-3.5 text-[#00e5a0] shrink-0" />
            <span className="text-[11px] text-[#8b95a8] truncate">{placeholder}</span>
          </>
        )}
        <ChevronsUpDown className="size-3.5 text-[#5a6478] ml-auto shrink-0" />
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-[min(26rem,calc(100vw-3rem))] rounded-xl border border-white/[0.08] bg-[#0c0e14] shadow-2xl shadow-black/60 overflow-hidden left-0">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 h-10 border-b border-white/[0.06]">
            <Search className="size-3.5 text-[#5a6478] shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models…"
              className="flex-1 bg-transparent text-[11px] text-[#e8ecf4] placeholder:text-[#5a6478] outline-none"
            />
            <span className="text-[9px] text-[#5a6478] tabular-nums shrink-0">
              {loading ? '…' : `${filtered.length} models`}
            </span>
          </div>

          {/* Options */}
          <div className="max-h-[45vh] overflow-y-auto">
            {/* Auto option */}
            <button
              type="button"
              onClick={() => select(null)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[0.04] text-left border-b border-white/[0.04]"
            >
              <Zap className="size-3.5 text-[#00e5a0] shrink-0" />
              <span className="text-[11px] font-medium text-[#e8ecf4]">Auto</span>
              <span className="text-[9px] text-[#5a6478] truncate">
                {catalog?.serverDefault ? `defaults to ${catalog.serverDefault}` : 'server decides'}
              </span>
              {value == null && <Check className="size-3.5 text-[#00e5a0] ml-auto shrink-0" />}
            </button>

            {loading && (
              <div className="px-3 py-6 text-center text-[10px] text-[#5a6478]">Loading catalog…</div>
            )}

            {!loading && filtered.length === 0 && query && (
              <div className="px-3 py-6 text-center text-[10px] text-[#5a6478]">
                No models match “{query}”
              </div>
            )}

            {!loading && filtered.length === 0 && !query && !options.length && (
              <div className="px-3 py-6 text-center space-y-1.5">
                <p className="text-[10px] text-[#8b95a8]">No models available yet.</p>
                <p className="text-[9px] text-[#5a6478]">
                  Add a provider key in Settings → AI Providers, then add models.
                </p>
              </div>
            )}

            {[...grouped.entries()].map(([section, list]) => {
              const meta = SECTION_META[section];
              const Icon = meta.icon;
              return (
                <div key={section}>
                  <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1 sticky top-0 bg-[#0c0e14] z-10">
                    <Icon className="size-3 text-[#5a6478]" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#5a6478]">
                      {meta.label}
                      {section === 'byok' && byokCount > 0 && (
                        <span className="ml-1 text-[#00e5a0]">· {byokCount} yours</span>
                      )}
                    </span>
                  </div>
                  {list.slice(0, 60).map((o) => {
                    // #task29: a non-chat TOOL model (tts / asr / image / web-search /
                    // web-reader) cannot answer chat completions — selecting it would
                    // only produce a 400 from the provider. Shown for transparency,
                    // but not selectable.
                    const nonChat = o.model.capabilities?.chat === false;
                    return (
                      <button
                        key={o.value}
                        type="button"
                        disabled={nonChat}
                        onClick={() => select(o.value)}
                        title={nonChat
                          ? `Tool model (${o.model.capabilityLabel ?? 'non-chat'}) — it is used by its own feature, not chat completions`
                          : undefined}
                        aria-disabled={nonChat}
                        className={cn(
                          'w-full flex items-center gap-2.5 px-3 py-2 text-left group',
                          nonChat ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/[0.04] cursor-pointer',
                        )}
                      >
                        {optionAvatar(o)}
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-medium text-[#e8ecf4] truncate">
                            {o.model.name}
                          </span>
                          <span className="block text-[9px] text-[#5a6478] truncate font-mono">
                            {o.providerId}:{o.model.id}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          {nonChat && (
                            <span
                              className="text-[9px] rounded-full px-1.5 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/25"
                            >
                              {o.model.capabilityLabel ?? 'tool'} · not chat
                            </span>
                          )}
                          {o.model.capabilities?.vision && <CapabilityChip kind="vision" />}
                          {o.model.capabilities?.tools && <CapabilityChip kind="tools" />}
                          <ContextChip tokens={o.model.contextWindow} />
                        </span>
                        {value === o.value && (
                          <Check className="size-3.5 text-[#00e5a0] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                  {list.length > 60 && (
                    <p className="px-3 py-1.5 text-[9px] text-[#5a6478]">
                      +{list.length - 60} more — type to search
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="flex items-center gap-1.5 px-3 h-8 border-t border-white/[0.06] bg-[#08090f]">
            <Globe className="size-3 text-[#5a6478]" />
            <span className="text-[9px] text-[#5a6478]">
              Catalog from server + your providers{catalog?.userDefault ? ' · default saved' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
