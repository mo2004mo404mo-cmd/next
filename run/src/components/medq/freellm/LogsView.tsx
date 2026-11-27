'use client';

/**
 * AI Router · Logs — the sidecar's operational log, natively in MedQ.
 *
 * Ported from freellmapi's LogsPage: level-coloured entries, auto-refresh,
 * manual refresh and the arm-then-fire "clear" for wiping the ring buffer.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { type FlLogEntry, type FreellmSession, formatRelativeTime } from './api';
import { ConfirmButton, ErrorNote, EmptyState, InlineLoader, Panel, SegmentedControl } from './ui';

const LEVEL_STYLE: Record<string, string> = {
  debug: 'text-[#8b95a8]',
  info: 'text-[#7dd3fc]',
  warn: 'text-[#f5b73d]',
  error: 'text-[#ff9d9d]',
};

const LEVEL_BG: Record<string, string> = {
  debug: 'bg-white/[0.05] text-[#8b95a8]',
  info: 'bg-[#7dd3fc]/10 text-[#7dd3fc]',
  warn: 'bg-[#f5b73d]/10 text-[#f5b73d]',
  error: 'bg-[#ff5757]/10 text-[#ff5757]',
};

export default function LogsView({ session }: { session: FreellmSession }) {
  const { flFetch } = session;
  const [entries, setEntries] = useState<FlLogEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all');
  const [auto, setAuto] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const body = await flFetch<{ entries: FlLogEntry[] }>('/api/logs?limit=200');
      setEntries(body.entries);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [flFetch]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (auto) timer.current = setInterval(() => void load(), 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [auto, load]);

  const filtered = (entries ?? []).filter((e) => {
    if (levelFilter === 'all') return true;
    if (levelFilter === 'info') return e.level === 'info' || e.level === 'debug';
    return e.level === levelFilter;
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <SegmentedControl<'all' | 'info' | 'warn' | 'error'>
          value={levelFilter}
          onChange={setLevelFilter}
          size="sm"
          options={[
            { value: 'all', label: `All ${entries?.length ?? ''}` },
            { value: 'info', label: 'Info' },
            { value: 'warn', label: 'Warnings' },
            { value: 'error', label: 'Errors' },
          ]}
        />
        <button
          type="button"
          onClick={() => setAuto((v) => !v)}
          className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs transition-colors ${auto ? 'border-[#00e5a0]/30 bg-[#00e5a0]/10 text-[#00e5a0]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${auto ? 'animate-pulse bg-[#00e5a0]' : 'bg-white/25'}`} />
          Live
        </button>
        <button
          type="button"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white/90"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
        <ConfirmButton
          onConfirm={async () => {
            try {
              await flFetch('/api/logs/clear', { method: 'POST' });
              await load();
            } catch (e) {
              setError(e instanceof Error ? e.message : String(e));
            }
          }}
          className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5"
          confirmLabel="Wipe the log?"
          title="Clear the log buffer"
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear
        </ConfirmButton>
      </div>

      {error ? <ErrorNote>{error}</ErrorNote> : null}
      {entries === null && !error ? <InlineLoader>Loading log…</InlineLoader> : null}

      <Panel>
        {filtered.length === 0 ? (
          <EmptyState title={entries?.length ? 'No entries at this level' : 'Log is empty'} hint="Router activity — health checks, routing decisions, cooldowns — lands here." />
        ) : (
          <div className="max-h-[calc(100vh-320px)] min-h-64 overflow-y-auto px-3 py-2 font-mono text-[11px] leading-relaxed">
            {filtered.map((e) => (
              <div key={e.id} className="flex gap-2 border-b border-white/[0.03] py-1.5 last:border-0">
                <span className="w-16 shrink-0 text-[#8b95a8]/70">{formatRelativeTime(e.ts)}</span>
                <span className={`w-12 shrink-0 rounded px-1 text-center text-[10px] font-semibold uppercase ${LEVEL_BG[e.level] ?? LEVEL_BG.debug}`}>
                  {e.level}
                </span>
                <span className={`min-w-0 flex-1 break-words ${LEVEL_STYLE[e.level] ?? LEVEL_STYLE.debug}`}>
                  {e.source ? <span className="text-white/50">[{e.source}] </span> : null}
                  {e.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
