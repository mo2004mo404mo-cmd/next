'use client';

/**
 * ProviderList — the FreeLLMAPI-style provider/key management surface.
 *
 * Patterns ported from freellmapi's provider-list.tsx:
 *   - toolbar: search + status SegmentedControl + provider/key counts
 *   - provider cards grouped per provider, collapsible (auto-expand on
 *     search / issues / small groups, remembered per group)
 *   - key rows: status dot, masked key (mono), label, baseUrl, model-count
 *     badge, relative verified time, HOVER-revealed action cluster
 *     (test / discover / edit / delete with arm-then-fire confirm)
 *   - model chips sub-panel per provider (the models the user added),
 *     with capability chips and inline delete
 *   - empty + loading states
 */

import { useMemo, useState } from 'react';
import {
  Search, ChevronDown, Zap, ListPlus, Pencil, Trash2, KeyRound,
  Shield, ShieldCheck, ArrowUp, ArrowDown, Plus, Layers, CircleAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip';
import { BYOK_PROVIDERS, type ByokProviderMeta } from '@/lib/ai/byok-providers';
import {
  ProviderAvatar, ConfirmButton, SegmentedControl, statusDot, statusLabel, keyStatus,
  CapabilityChip, ContextChip, formatRelativeTime, platformColor, PlatformDot,
} from './shared';
import { groupKeysByProvider, type SavedKey, type ByokModelConfig } from './useByokData';

type StatusFilter = 'all' | 'healthy' | 'issues' | 'disabled';

export interface ProviderListProps {
  keys: SavedKey[];
  testResults: Record<string, { ok: boolean; error?: string }>;
  loading: boolean;
  onToggle: (key: SavedKey, enabled: boolean) => void;
  onDelete: (key: SavedKey) => void;
  onMove: (key: SavedKey, move: 'up' | 'down') => void;
  onTest: (key: SavedKey) => void;
  onDiscover: (key: SavedKey) => void;
  onEdit: (key: SavedKey) => void;
  onAddModel: (provider: ByokProviderMeta, key: SavedKey) => void;
  onEditModel: (provider: ByokProviderMeta, key: SavedKey, model: ByokModelConfig) => void;
  onDeleteModel: (provider: ByokProviderMeta, key: SavedKey, modelId: string) => void;
  onAddKey: (provider?: ByokProviderMeta) => void;
  testingKeyId?: string | null;
  discoveringKeyId?: string | null;
}

export default function ProviderList(props: ProviderListProps) {
  const { keys, loading } = props;
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => groupKeysByProvider(keys, BYOK_PROVIDERS), [keys]);

  const keyStatusOf = (k: SavedKey) => {
    const t = props.testResults[k.id];
    return keyStatus({
      enabled: k.enabled,
      lastVerifiedAt: k.lastVerifiedAt,
      lastTestError: t ? (t.ok ? null : t.error || 'failed') : null,
    });
  };

  const matchesSearch = (g: { provider: ByokProviderMeta; keys: SavedKey[] }, q: string) => {
    if (!q) return true;
    const lq = q.toLowerCase();
    if (g.provider.name.toLowerCase().includes(lq) || g.provider.id.includes(lq)) return true;
    return g.keys.some(
      (k) =>
        (k.label ?? '').toLowerCase().includes(lq) ||
        k.maskedKey.toLowerCase().includes(lq) ||
        (k.baseUrl ?? '').toLowerCase().includes(lq),
    );
  };

  const groupPassesFilter = (g: { keys: SavedKey[] }) => {
    if (statusFilter === 'all') return true;
    return g.keys.some((k) => {
      const s = keyStatusOf(k);
      if (statusFilter === 'healthy') return s === 'healthy';
      if (statusFilter === 'issues') return s === 'error' || s === 'stale';
      if (statusFilter === 'disabled') return s === 'disabled';
      return true;
    });
  };

  const visibleGroups = groups.filter((g) => matchesSearch(g, search) && groupPassesFilter(g));
  const visibleKeyCount = visibleGroups.reduce((n, g) => n + g.keys.length, 0);

  const isExpanded = (providerId: string, keyCount: number, hasIssues: boolean) => {
    if (search) return true; // auto-expand matches while searching
    if (collapsed[providerId] != null) return !collapsed[providerId];
    return hasIssues || keyCount <= 3; // default: expand small/problem groups
  };

  if (loading) {
    return (
      <div className="space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-[#0c0e14] h-16 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!keys.length) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center space-y-3">
        <div className="mx-auto size-10 rounded-full bg-[#00e5a0]/[0.06] border border-[#00e5a0]/15 flex items-center justify-center">
          <KeyRound className="size-4.5 text-[#00e5a0]" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#e8ecf4]">No providers yet</p>
          <p className="text-[10px] text-[#8b95a8] max-w-xs mx-auto leading-relaxed">
            Add an API key for any provider — OpenAI, Anthropic, Gemini, Ollama, or any
            OpenAI-compatible endpoint. Keys are encrypted (AES-256-GCM) and sync across devices.
          </p>
        </div>
        <button
          type="button"
          onClick={() => props.onAddKey()}
          className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] text-[11px] font-semibold transition-colors"
        >
          <Plus className="size-3.5" /> Add your first key
        </button>
      </div>
    );
  }

  return (
    <TooltipProvider delay={250}>
      <div className="space-y-3">
        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6478] pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search providers, keys, URLs…"
              className="h-8 w-56 pl-8 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
            />
          </div>
          <SegmentedControl<StatusFilter>
            options={[
              { value: 'all', label: 'All' },
              { value: 'healthy', label: 'Healthy' },
              { value: 'issues', label: 'Issues' },
              { value: 'disabled', label: 'Off' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <span className="text-[10px] text-[#5a6478] tabular-nums ml-auto">
            {visibleGroups.length} providers · {visibleKeyCount} keys
          </span>
        </div>

        {visibleGroups.length === 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-8 text-center">
            <p className="text-[11px] text-[#8b95a8]">No providers match the current filters.</p>
            {(search || statusFilter !== 'all') && (
              <button
                type="button"
                onClick={() => { setSearch(''); setStatusFilter('all'); }}
                className="mt-2 text-[10px] text-[#00e5a0] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Provider groups */}
        {visibleGroups.map((g) => {
          const models = g.keys.find((k) => k.modelsConfig?.length)?.modelsConfig ?? null;
          const statuses = g.keys.map(keyStatusOf);
          const healthy = statuses.filter((s) => s === 'healthy').length;
          const issues = statuses.filter((s) => s === 'error' || s === 'stale').length;
          const hasIssues = issues > 0;
          const expanded = isExpanded(g.provider.id, g.keys.length, hasIssues);
          const anyEnabled = g.keys.some((k) => k.enabled);

          return (
            <div
              key={g.provider.id}
              className="rounded-xl border border-white/[0.06] bg-[#0c0e14] overflow-hidden"
            >
              {/* Group header */}
              <div className="flex items-center gap-2.5 px-3.5 h-12 border-b border-white/[0.04] hover:bg-white/[0.02]">
                <ProviderAvatar provider={g.provider} size="sm" />
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [g.provider.id]: expanded }))}
                  className="flex items-center gap-2 min-w-0 flex-1 text-left"
                >
                  <span className="text-xs font-semibold text-[#e8ecf4] truncate">
                    {g.provider.name}
                  </span>
                  <span className="text-[9px] rounded-full px-1.5 py-px bg-white/[0.06] text-[#8b95a8] border border-white/[0.06] tabular-nums shrink-0">
                    {g.keys.length} {g.keys.length === 1 ? 'key' : 'keys'}
                  </span>
                  {models && (
                    <span className="text-[9px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15 tabular-nums shrink-0 hidden sm:inline-flex items-center gap-1">
                      <Layers className="size-2.5" /> {models.length}
                    </span>
                  )}
                  {/* Inline health summary */}
                  <span className="hidden sm:flex items-center gap-1 text-[9px] text-[#5a6478] shrink-0">
                    {healthy > 0 && (
                      <span className="flex items-center gap-0.5">
                        <span className={cn('size-1.5 rounded-full', statusDot.healthy)} />
                        {healthy}
                      </span>
                    )}
                    {issues > 0 && (
                      <span className="flex items-center gap-0.5 text-[#ff5757]/80">
                        <span className={cn('size-1.5 rounded-full', statusDot.error)} />
                        {issues}
                      </span>
                    )}
                  </span>
                </button>
                {/* Enable/disable all endpoints of this provider */}
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[9px] text-[#5a6478] hidden sm:inline">use</span>
                        <Switch
                          checked={anyEnabled}
                          onCheckedChange={(v) => {
                            // Toggle every key to match the group switch.
                            for (const k of g.keys) {
                              if (k.enabled !== v) props.onToggle(k, v);
                            }
                          }}
                          className="scale-[0.85]"
                        />
                      </div>
                    }
                  />
                  <TooltipContent side="top" className="text-[10px]">
                    {anyEnabled ? 'Disable all endpoints' : 'Enable all endpoints'}
                  </TooltipContent>
                </Tooltip>
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [g.provider.id]: expanded }))}
                  className="text-[#5a6478] hover:text-[#e8ecf4] shrink-0"
                  aria-label={expanded ? 'Collapse' : 'Expand'}
                >
                  <ChevronDown className={cn('size-4 transition-transform', !expanded && '-rotate-90')} />
                </button>
              </div>

              {/* Key rows */}
              {expanded && (
                <div className="divide-y divide-white/[0.04]">
                  {g.keys.map((k, idx) => {
                    const st = keyStatusOf(k);
                    const busy = props.testingKeyId === k.id || props.discoveringKeyId === k.id;
                    const lastTest = props.testResults[k.id];
                    return (
                      <div key={k.id} className="group/krow px-3.5 py-2.5 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-2.5">
                          {/* Status dot */}
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <span
                                  aria-label={statusLabel[st]}
                                  className={cn('size-2 rounded-full shrink-0', statusDot[st])}
                                />
                              }
                            />
                            <TooltipContent side="top" className="text-[10px]">
                              {statusLabel[st]}
                              {k.lastVerifiedAt ? ` · ${formatRelativeTime(k.lastVerifiedAt)}` : ''}
                            </TooltipContent>
                          </Tooltip>

                          {/* Failover order arrows */}
                          {g.keys.length > 1 && (
                            <span className="flex flex-col gap-px shrink-0">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => props.onMove(k, 'up')}
                                className="text-[#5a6478] hover:text-[#e8ecf4] disabled:opacity-0 disabled:pointer-events-none"
                                aria-label="Move up in failover order"
                              >
                                <ArrowUp className="size-2.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === g.keys.length - 1}
                                onClick={() => props.onMove(k, 'down')}
                                className="text-[#5a6478] hover:text-[#e8ecf4] disabled:opacity-0 disabled:pointer-events-none"
                                aria-label="Move down in failover order"
                              >
                                <ArrowDown className="size-2.5" />
                              </button>
                            </span>
                          )}

                          {/* Masked key */}
                          <code className="text-[10px] font-mono text-[#8b95a8] shrink-0 hidden sm:inline">
                            {k.maskedKey}
                          </code>

                          {/* Label (click = edit) */}
                          <button
                            type="button"
                            onClick={() => props.onEdit(k)}
                            className="text-[11px] text-[#e8ecf4]/80 hover:text-[#e8ecf4] hover:underline underline-offset-2 truncate min-w-0"
                          >
                            {k.label || <span className="text-[#5a6478] italic">unlabeled</span>}
                          </button>

                          {/* baseUrl chip */}
                          {k.baseUrl && (
                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <code className="text-[9px] font-mono text-[#5a6478] bg-white/[0.03] border border-white/[0.05] rounded px-1.5 py-px max-w-40 truncate hidden md:inline-block">
                                    {k.baseUrl.replace(/^https?:\/\//, '')}
                                  </code>
                                }
                              />
                              <TooltipContent side="top" className="text-[10px] max-w-64 break-all">
                                {k.baseUrl}
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {/* Verified time */}
                          <span className="text-[9px] text-[#5a6478] ml-auto shrink-0 hidden lg:inline tabular-nums">
                            {k.lastVerifiedAt ? formatRelativeTime(k.lastVerifiedAt) : 'never checked'}
                          </span>

                          {/* Hover action cluster */}
                          <span className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover/krow:opacity-100 focus-within:opacity-100 transition-opacity">
                            <IconButton title="Test key" onClick={() => props.onTest(k)} disabled={busy}>
                              <Zap className={cn('size-3', busy && props.testingKeyId === k.id && 'animate-pulse text-[#f5b73d]')} />
                            </IconButton>
                            <IconButton title="Discover models (/models)" onClick={() => props.onDiscover(k)} disabled={busy}>
                              <ListPlus className={cn('size-3', busy && props.discoveringKeyId === k.id && 'animate-pulse text-[#f5b73d]')} />
                            </IconButton>
                            <IconButton title="Edit endpoint" onClick={() => props.onEdit(k)}>
                              <Pencil className="size-3" />
                            </IconButton>
                            <IconButton title="Add model by hand" onClick={() => props.onAddModel(g.provider, k)}>
                              <Plus className="size-3" />
                            </IconButton>
                            <ConfirmButton
                              onConfirm={() => props.onDelete(k)}
                              confirmLabel="Delete?"
                              title="Delete endpoint"
                            >
                              <Trash2 className="size-3" />
                            </ConfirmButton>
                          </span>
                        </div>

                        {/* Error line */}
                        {lastTest && !lastTest.ok && lastTest.error && (
                          <p className="mt-1.5 flex items-start gap-1.5 text-[9px] text-[#ff5757]/90 leading-relaxed pl-[4.4rem]">
                            <CircleAlert className="size-3 shrink-0 mt-px" />
                            <span className="break-all line-clamp-2">{lastTest.error}</span>
                          </p>
                        )}

                        {/* Model chips (the models the user added to this provider) */}
                        {k.modelsConfig?.length ? (
                          <div className="mt-2 flex flex-wrap gap-1.5 pl-[1.1rem] sm:pl-[4.4rem]">
                            {k.modelsConfig.map((m) => (
                              <span
                                key={m.id}
                                className="group/chip inline-flex items-center gap-1 text-[9px] rounded-full border border-white/[0.08] bg-white/[0.03] pl-2 pr-1 py-0.5 hover:border-white/[0.16] transition-colors"
                              >
                                <button
                                  type="button"
                                  onClick={() => props.onEditModel(g.provider, k, m)}
                                  className="font-mono text-[#8b95a8] group-hover/chip:text-[#e8ecf4] transition-colors"
                                  title={`Edit ${m.id}`}
                                >
                                  {m.id}
                                </button>
                                {m.capabilities?.vision && <CapabilityChip kind="vision" />}
                                {m.capabilities?.tools && <CapabilityChip kind="tools" />}
                                <ContextChip tokens={m.contextWindow} />
                                <button
                                  type="button"
                                  onClick={() => props.onDeleteModel(g.provider, k, m.id)}
                                  className="text-[#5a6478] hover:text-[#ff5757] transition-colors"
                                  title={`Remove ${m.id}`}
                                >
                                  <Trash2 className="size-2.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Expanded info footer */}
              {expanded && (
                <div className="px-3.5 py-2 border-t border-white/[0.04] bg-[#08090f]/60 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[9px] text-[#5a6478]">
                    {anyEnabled ? (
                      <><ShieldCheck className="size-3 text-[#00e5a0]/70" /> encrypted · round-robin failover</>
                    ) : (
                      <><Shield className="size-3 text-[#5a6478]" /> all endpoints disabled</>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => props.onAddKey(g.provider)}
                    className="ml-auto inline-flex items-center gap-1 text-[9px] font-semibold text-[#00e5a0] hover:text-[#00d090]"
                  >
                    <Plus className="size-2.5" /> add endpoint
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

function IconButton({
  children, title, onClick, disabled,
}: {
  children: React.ReactNode; title: string; onClick: () => void; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center size-6 rounded-md text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06] disabled:opacity-40 disabled:pointer-events-none transition-colors"
    >
      {children}
    </button>
  );
}
