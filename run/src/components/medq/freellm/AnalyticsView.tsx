'use client';

/**
 * AI Router · Analytics — usage telemetry, natively in MedQ.
 *
 * Ported from freellmapi's AnalyticsPage: range selector, summary stat
 * cards, a zero-padded daily timeline (CSS bars — no chart lib needed at
 * this size), per-model usage table and the recent-requests log with
 * routing attribution.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  type FlByModelRow,
  type FlRequestRow,
  type FlSummary,
  type FlTimelinePoint,
  type FreellmSession,
  formatLatency,
  formatNumber,
  formatRelativeTime,
} from './api';
import { ErrorNote, InlineLoader, Panel, PanelHeader, SegmentedControl, StatCard } from './ui';

type Range = '24h' | '7d' | '30d' | '90d';

export default function AnalyticsView({ session }: { session: FreellmSession }) {
  const { flFetch } = session;
  const [range, setRange] = useState<Range>('7d');
  const [summary, setSummary] = useState<FlSummary | null>(null);
  const [timeline, setTimeline] = useState<FlTimelinePoint[] | null>(null);
  const [byModel, setByModel] = useState<FlByModelRow[] | null>(null);
  const [requests, setRequests] = useState<FlRequestRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [s, t, m, r] = await Promise.all([
        flFetch<FlSummary>(`/api/analytics/summary?range=${range}`),
        flFetch<FlTimelinePoint[]>(`/api/analytics/timeline?range=${range}`),
        flFetch<FlByModelRow[]>(`/api/analytics/by-model?range=${range}`),
        flFetch<{ rows: FlRequestRow[] }>(`/api/analytics/requests?limit=25&range=${range}`),
      ]);
      setSummary(s);
      setTimeline(t);
      setByModel(m);
      setRequests(r.rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [flFetch, range]);

  useEffect(() => {
    void load();
  }, [load]);

  const maxReq = Math.max(1, ...(timeline ?? []).map((p) => p.requests));
  const totalTokens = (summary?.totalInputTokens ?? 0) + (summary?.totalOutputTokens ?? 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <SegmentedControl<Range>
          value={range}
          onChange={setRange}
          options={[
            { value: '24h', label: '24h' },
            { value: '7d', label: '7d' },
            { value: '30d', label: '30d' },
            { value: '90d', label: '90d' },
          ]}
        />
        <span className="text-xs text-[#8b95a8]">
          {summary ? `${formatNumber(summary.totalRequests)} requests · ${summary.successRate.toFixed(0)}% success` : '…'}
        </span>
      </div>

      {error ? <ErrorNote>{error}</ErrorNote> : null}
      {!summary && !error ? <InlineLoader>Loading analytics…</InlineLoader> : null}

      {summary ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            <StatCard label="Requests" value={formatNumber(summary.totalRequests)} sub={`${formatNumber(summary.lifetimeTotalRequests)} lifetime`} />
            <StatCard
              label="Success"
              value={`${summary.successRate.toFixed(0)}%`}
              accent={summary.successRate >= 90 ? '#00e5a0' : summary.successRate >= 60 ? '#f5b73d' : '#ff5757'}
            />
            <StatCard label="Tokens" value={formatNumber(totalTokens)} sub={`${formatNumber(summary.totalInputTokens)} in · ${formatNumber(summary.totalOutputTokens)} out`} />
            <StatCard label="Avg latency" value={formatLatency(summary.avgLatencyMs)} sub={`ttfb ${formatLatency(summary.avgTtfbMs)}`} />
            <StatCard label="p50 / p95" value={`${formatLatency(summary.p50LatencyMs)} / ${formatLatency(summary.p95LatencyMs)}`} />
            <StatCard label="Saved*" value={`$${summary.estimatedCostSavings.toFixed(2)}`} sub="vs paid-tier list price" />
          </div>

          {/* Timeline */}
          <Panel>
            <PanelHeader title="Requests over time" hint={`Success (teal) vs failure (red) · ${range}`} />
            <div className="px-4 py-4">
              {timeline && timeline.length > 0 ? (
                <div className="flex h-28 items-end gap-[3px]">
                  {timeline.map((p) => (
                    <div
                      key={p.timestamp}
                      className="group relative flex min-w-1.5 flex-1 flex-col justify-end"
                      title={`${p.timestamp}: ${p.requests} requests · ${p.successCount} ok · ${p.failureCount} failed`}
                    >
                      {/* Stacked column: failures (red) on top of successes (teal) */}
                      <div className="flex h-24 w-full flex-col justify-end overflow-hidden rounded-sm">
                        <div className="w-full bg-[#ff5757]/70" style={{ height: `${(p.failureCount / maxReq) * 96}px` }} />
                        <div className="w-full bg-[#00e5a0]/70 transition-colors group-hover:bg-[#00e5a0]" style={{ height: `${(p.successCount / maxReq) * 96}px` }} />
                      </div>
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-[10px] text-white/90 group-hover:block">
                        {p.timestamp.slice(5)} · {p.requests} req · {formatNumber(p.inputTokens + p.outputTokens)} tok
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-[#8b95a8]">No traffic in this range yet.</div>
              )}
            </div>
          </Panel>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* By model */}
            <Panel>
              <PanelHeader title="By model" hint="Top models by request volume" />
              {byModel && byModel.length > 0 ? (
                <div className="max-h-72 overflow-y-auto">
                  {byModel.slice(0, 12).map((m) => {
                    const max = Math.max(1, byModel[0].requests);
                    return (
                      <div key={`${m.platform}/${m.modelId}`} className="border-b border-white/[0.04] px-4 py-2 last:border-0">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="min-w-0 flex-1 truncate text-white/85">{m.displayName}</span>
                          <span className="tabular-nums text-xs text-[#8b95a8]">{m.requests} req</span>
                          <span className={`tabular-nums text-xs ${m.successRate >= 90 ? 'text-[#00e5a0]' : m.successRate >= 60 ? 'text-[#f5b73d]' : 'text-[#ff5757]'}`}>
                            {m.successRate.toFixed(0)}%
                          </span>
                        </div>
                        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                          <div className="h-full rounded-full bg-[#00e5a0]/50" style={{ width: `${(m.requests / max) * 100}%` }} />
                        </div>
                        <div className="mt-0.5 flex gap-3 text-[10px] text-[#8b95a8]">
                          <span>{formatLatency(m.avgLatencyMs)} avg</span>
                          <span>{formatNumber(m.totalInputTokens + m.totalOutputTokens)} tok</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-[#8b95a8]">No model usage yet.</div>
              )}
            </Panel>

            {/* Recent requests */}
            <Panel>
              <PanelHeader title="Recent requests" hint="Latest 25 routed calls" />
              {requests && requests.length > 0 ? (
                <div className="max-h-72 overflow-y-auto">
                  {requests.map((r) => (
                    <div key={r.id} className="flex items-center gap-2.5 border-b border-white/[0.04] px-4 py-2 text-xs last:border-0">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${r.status === 'success' ? 'bg-[#00e5a0]' : 'bg-[#ff5757]'}`} />
                      <span className="min-w-0 flex-1 truncate font-mono text-white/80" title={`${r.requestedModel} → ${r.modelId}`}>
                        {r.requestedModel || r.modelId}
                      </span>
                      {r.requestedModel && r.requestedModel !== r.modelId ? (
                        <span className="shrink-0 text-[10px] text-[#f5b73d]" title={`Router redirected ${r.requestedModel} → ${r.modelId}`}>
                          ↳ {r.modelId}
                        </span>
                      ) : null}
                      <span className="shrink-0 tabular-nums text-[#8b95a8]">{formatNumber(r.inputTokens + r.outputTokens)} tok</span>
                      <span className="shrink-0 tabular-nums text-[#8b95a8]">{formatLatency(r.latencyMs)}</span>
                      <span className="shrink-0 text-[10px] text-[#8b95a8]">{formatRelativeTime(r.createdAt)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-[#8b95a8]">No requests yet — try the Playground.</div>
              )}
            </Panel>
          </div>
        </>
      ) : null}
    </div>
  );
}
