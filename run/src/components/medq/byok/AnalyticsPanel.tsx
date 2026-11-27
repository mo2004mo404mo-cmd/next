'use client';

/**
 * AnalyticsPanel — FreeLLMAPI AnalyticsPage pattern, MedQ data.
 *
 *   - range SegmentedControl (24h / 7d / 30d / 90d), sticky in localStorage
 *   - stat-card grid: Requests, Success rate, Tokens in/out, Avg latency
 *   - requests-over-time bar chart (pure CSS bars — no chart lib needed)
 *   - by-provider table with PlatformDot colors + share bars
 *   - recent calls table (status, model, tokens, latency, stage)
 *
 * Data: GET /api/user/ai-analytics?range=… (AiCallLog telemetry written
 * fire-and-forget by callChat).
 */

import { useCallback, useEffect, useState } from 'react';
import {
  Activity, CheckCircle2, XCircle, ArrowDownToLine, ArrowUpFromLine,
  Timer, Loader2, BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SegmentedControl, PlatformDot, platformColor, formatTokens, formatLatency } from './shared';

interface AnalyticsData {
  range: string;
  summary: {
    totalRequests: number;
    errorCount: number;
    successRate: number | null;
    totalInputTokens: number;
    totalOutputTokens: number;
    avgLatencyMs: number | null;
  };
  byProvider: Array<{
    providerId: string;
    requests: number;
    errors: number;
    inputTokens: number;
    outputTokens: number;
    avgLatencyMs: number | null;
  }>;
  byModel: Array<{
    providerId: string;
    modelId: string;
    requests: number;
    errors: number;
    tokens: number;
    avgLatencyMs: number | null;
  }>;
  timeline: Array<{ date: string; requests: number; errors: number; inputTokens: number; outputTokens: number }>;
  recent: Array<{
    providerId: string;
    modelId: string;
    stage: string | null;
    status: string;
    inputTokens: number;
    outputTokens: number;
    latencyMs: number | null;
    error: string | null;
    createdAt: string;
  }>;
}

type Range = '24h' | '7d' | '30d' | '90d';
const RANGE_KEY = 'medq:byok-analytics-range';

export default function AnalyticsPanel() {
  const [range, setRange] = useState<Range>('30d');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RANGE_KEY) as Range | null;
      if (stored && ['24h', '7d', '30d', '90d'].includes(stored)) setRange(stored);
    } catch { /* ignore */ }
  }, []);

  const load = useCallback(async (r: Range) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/ai-analytics?range=${r}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(range); }, [range, load]);

  const changeRange = (r: Range) => {
    setRange(r);
    try { localStorage.setItem(RANGE_KEY, r); } catch { /* ignore */ }
  };

  if (loading && !data) {
    return (
      <div className="py-16 flex flex-col items-center gap-2.5">
        <Loader2 className="size-5 animate-spin text-[#00e5a0]" />
        <p className="text-[10px] text-[#8b95a8]">Loading your AI usage…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center">
        <p className="text-xs font-semibold text-[#e8ecf4]">Analytics unavailable</p>
        <p className="mt-1 text-[10px] text-[#8b95a8]">Could not load usage data — try again shortly.</p>
      </div>
    );
  }

  const s = data.summary;
  const hasData = s.totalRequests > 0;
  const maxDayRequests = Math.max(1, ...data.timeline.map((d) => d.requests));
  const maxProviderRequests = Math.max(1, ...data.byProvider.map((p) => p.requests));

  return (
    <div className="space-y-4">
      {/* Range control */}
      <div className="flex items-center gap-2">
        <SegmentedControl<Range>
          options={[
            { value: '24h', label: '24h' },
            { value: '7d', label: '7d' },
            { value: '30d', label: '30d' },
            { value: '90d', label: '90d' },
          ]}
          value={range}
          onChange={changeRange}
        />
        <span className="text-[9px] text-[#5a6478] ml-auto">
          every AI call made with your account — both your keys and server-managed ones
        </span>
      </div>

      {!hasData ? (
        <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center space-y-2">
          <div className="mx-auto size-10 rounded-full bg-[#00e5a0]/[0.06] border border-[#00e5a0]/15 flex items-center justify-center">
            <BarChart3 className="size-4.5 text-[#00e5a0]" />
          </div>
          <p className="text-xs font-semibold text-[#e8ecf4]">No AI calls in this range yet</p>
          <p className="text-[10px] text-[#8b95a8] max-w-sm mx-auto leading-relaxed">
            Generate a question explanation or ask the tutor — every call is logged here with
            tokens, latency, and the provider that served it.
          </p>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5">
            <StatCard icon={<Activity className="size-3.5" />} label="Requests" value={String(s.totalRequests)} />
            <StatCard
              icon={s.successRate != null && s.successRate >= 0.9 ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
              label="Success rate"
              value={s.successRate == null ? '—' : `${Math.round(s.successRate * 100)}%`}
              sub={s.errorCount ? `${s.errorCount} failed` : undefined}
              tone={s.successRate != null && s.successRate < 0.8 ? 'warn' : 'ok'}
            />
            <StatCard icon={<ArrowDownToLine className="size-3.5" />} label="Tokens in" value={formatTokens(s.totalInputTokens)} />
            <StatCard icon={<ArrowUpFromLine className="size-3.5" />} label="Tokens out" value={formatTokens(s.totalOutputTokens)} />
            <StatCard icon={<Timer className="size-3.5" />} label="Avg latency" value={formatLatency(s.avgLatencyMs)} />
            <StatCard
              icon={<BarChart3 className="size-3.5" />}
              label="Providers used"
              value={String(data.byProvider.length)}
            />
          </div>

          {/* Requests over time */}
          {data.timeline.length > 1 && (
            <Panel title="Requests over time">
              <div className="px-4 pb-4 pt-2">
                <div className="flex items-end gap-px h-24">
                  {data.timeline.map((d) => (
                    <div
                      key={d.date}
                      title={`${d.date}: ${d.requests} requests${d.errors ? ` · ${d.errors} errors` : ''}`}
                      className="flex-1 min-w-px group relative flex flex-col justify-end gap-px h-full cursor-default"
                    >
                      {d.errors > 0 && (
                        <div
                          className="w-full rounded-t-sm bg-[#ff5757]/70"
                          style={{ height: `${(d.errors / maxDayRequests) * 100}%` }}
                        />
                      )}
                      <div
                        className="w-full rounded-t-sm bg-[#00e5a0]/60 group-hover:bg-[#00e5a0]"
                        style={{ height: `${(d.requests / maxDayRequests) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5 text-[8px] text-[#5a6478] tabular-nums">
                  <span>{data.timeline[0]?.date.slice(5)}</span>
                  <span>{data.timeline[Math.floor(data.timeline.length / 2)]?.date.slice(5)}</span>
                  <span>today</span>
                </div>
              </div>
            </Panel>
          )}

          <div className="grid lg:grid-cols-2 gap-4">
            {/* By provider */}
            {data.byProvider.length > 0 && (
              <Panel title="By provider">
                <div className="px-4 py-3 space-y-2.5">
                  {data.byProvider.map((p) => (
                    <div key={p.providerId} className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <PlatformDot providerId={p.providerId} />
                        <span className="font-medium text-[#e8ecf4]">{p.providerId}</span>
                        <span className="text-[#5a6478] tabular-nums ml-auto">
                          {p.requests} req · {formatTokens(p.inputTokens + p.outputTokens)} tok
                        </span>
                        {p.errors > 0 && (
                          <span className="text-[#ff5757] tabular-nums">{p.errors} err</span>
                        )}
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden flex">
                        <div
                          className="h-full rounded-l-full"
                          style={{
                            width: `${(p.requests / maxProviderRequests) * 100}%`,
                            backgroundColor: platformColor(p.providerId),
                          }}
                        />
                      </div>
                      <div className="flex gap-3 text-[9px] text-[#5a6478] tabular-nums">
                        <span>avg {formatLatency(p.avgLatencyMs)}</span>
                        <span>in {formatTokens(p.inputTokens)}</span>
                        <span>out {formatTokens(p.outputTokens)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {/* Top models */}
            {data.byModel.length > 0 && (
              <Panel title="Top models">
                <div className="px-4 py-3 space-y-2">
                  {data.byModel.map((m) => (
                    <div key={`${m.providerId}:${m.modelId}`} className="flex items-center gap-2 text-[10px]">
                      <PlatformDot providerId={m.providerId} />
                      <code className="font-mono text-[#e8ecf4] truncate min-w-0 flex-1">{m.modelId}</code>
                      <span className="text-[#5a6478] tabular-nums shrink-0">{m.requests} req</span>
                      <span className="text-[#5a6478] tabular-nums shrink-0">{formatTokens(m.tokens)} tok</span>
                      <span className="text-[#5a6478] tabular-nums shrink-0">{formatLatency(m.avgLatencyMs)}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            )}
          </div>

          {/* Recent calls */}
          <Panel title="Recent calls" count={data.recent.length}>
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-[10px]">
                <thead className="sticky top-0 bg-[#0c0e14]">
                  <tr className="text-[#5a6478] text-left">
                    <th className="px-4 py-2 font-semibold">When</th>
                    <th className="py-2 font-semibold">Model</th>
                    <th className="py-2 font-semibold">Stage</th>
                    <th className="py-2 font-semibold">Tokens</th>
                    <th className="py-2 font-semibold">Latency</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {data.recent.map((r, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-1.5 text-[#5a6478] tabular-nums whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-1.5 max-w-48">
                        <span className="flex items-center gap-1.5 min-w-0">
                          <PlatformDot providerId={r.providerId} />
                          <code className="font-mono text-[#8b95a8] truncate">{r.modelId}</code>
                        </span>
                      </td>
                      <td className="py-1.5 text-[#5a6478]">{r.stage ?? '—'}</td>
                      <td className="py-1.5 text-[#8b95a8] tabular-nums whitespace-nowrap">
                        {formatTokens(r.inputTokens)} → {formatTokens(r.outputTokens)}
                      </td>
                      <td className="py-1.5 text-[#8b95a8] tabular-nums">{formatLatency(r.latencyMs)}</td>
                      <td className="px-4 py-1.5">
                        {r.status === 'success' ? (
                          <span className="text-[9px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15">
                            ok
                          </span>
                        ) : (
                          <span
                            title={r.error ?? undefined}
                            className="text-[9px] rounded-full px-1.5 py-px bg-[#ff5757]/10 text-[#ff5757] border border-[#ff5757]/15 cursor-help truncate max-w-40 inline-block"
                          >
                            error
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}

// ── Building blocks ──

function StatCard({
  icon, label, value, sub, tone = 'default',
}: {
  icon: React.ReactNode; label: string; value: string; sub?: string;
  tone?: 'default' | 'ok' | 'warn';
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[#5a6478]">
        <span className={cn(tone === 'ok' && 'text-[#00e5a0]', tone === 'warn' && 'text-[#f5b73d]')}>{icon}</span>
        <span className="text-[9px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 text-lg font-semibold text-[#e8ecf4] tabular-nums leading-tight">{value}</p>
      {sub && <p className="text-[9px] text-[#5a6478] tabular-nums">{sub}</p>}
    </div>
  );
}

function Panel({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-white/[0.06] bg-[#0c0e14] overflow-hidden">
      <header className="flex items-center gap-2 px-4 h-9 border-b border-white/[0.04]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b95a8]">{title}</span>
        {count != null && <span className="text-[9px] text-[#5a6478] tabular-nums">{count}</span>}
      </header>
      {children}
    </section>
  );
}
