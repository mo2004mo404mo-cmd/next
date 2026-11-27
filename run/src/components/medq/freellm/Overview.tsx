'use client';

/**
 * AI Router · Overview — the tab's landing view.
 *
 * Native port of freellmapi's dashboard hero, customized for MedQ: usage
 * stats from the sidecar's analytics plane, key health, the OpenAI-compatible
 * endpoint credentials, and the piece of MedQ-specific wiring that makes the
 * router a first-class citizen of the app — "link with MedQ generation",
 * which registers the router as an OpenAI-compatible endpoint in the user's
 * MedQ BYOK store so its models show up in every model picker (question
 * generation, explanations, tutor …).
 */

import { useCallback, useEffect, useState } from 'react';
import { Check, ExternalLink, KeyRound, Link2, Link2Off, Loader2, RefreshCw, Stethoscope, Zap } from 'lucide-react';
import {
  formatLatency,
  formatNumber,
  type FlHealthKey,
  type FlModel,
  type FlSummary,
  type FreellmSession,
} from './api';
import { CopyButton, ErrorNote, FlStatusDot, InlineLoader, Panel, PanelHeader, StatCard } from './ui';

interface MedqEndpointMeta {
  id: string;
  providerId: string;
  baseUrl: string | null;
  label: string | null;
  modelsConfig: Array<{ id: string; name?: string }> | null;
}

const ROUTER_LABEL = 'MedQ AI Router';
/** Dedicated BYOK provider id — its own entry in the catalog means its
 *  models never mix with a real OpenAI key's round-robin slot, so requests
 *  for `medq-router:<model>` always land on the router endpoint. */
const ROUTER_PROVIDER_ID = 'medq-router';

export default function Overview({ session, onNavigate }: { session: FreellmSession; onNavigate: (v: 'keys' | 'models' | 'playground' | 'analytics') => void }) {
  const { flFetch } = session;
  const [summary, setSummary] = useState<FlSummary | null>(null);
  const [healthKeys, setHealthKeys] = useState<FlHealthKey[] | null>(null);
  const [models, setModels] = useState<FlModel[] | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [s, h, m, k] = await Promise.all([
        flFetch<FlSummary>('/api/analytics/summary?range=7d'),
        flFetch<{ keys: FlHealthKey[] }>('/api/health'),
        flFetch<FlModel[]>('/api/models'),
        flFetch<{ apiKey: string }>('/api/settings/api-key'),
      ]);
      setSummary(s);
      setHealthKeys(h.keys);
      setModels(m);
      setApiKey(k.apiKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [flFetch]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const enabledChat = (models ?? []).filter((m) => m.enabled);
  const healthyKeys = (healthKeys ?? []).filter((k) => k.enabled && (k.status === 'healthy' || k.status === 'unknown'));

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Requests · 7d" value={formatNumber(summary?.totalRequests ?? 0)} sub={`${formatNumber(summary?.lifetimeTotalRequests ?? 0)} lifetime`} />
        <StatCard
          label="Success rate"
          value={`${(summary?.successRate ?? 0).toFixed(0)}%`}
          accent={(summary?.successRate ?? 0) >= 90 ? '#00e5a0' : (summary?.successRate ?? 0) >= 60 ? '#f5b73d' : '#ff5757'}
        />
        <StatCard label="Tokens · 7d" value={formatNumber((summary?.totalInputTokens ?? 0) + (summary?.totalOutputTokens ?? 0))} sub={`${formatNumber(summary?.totalInputTokens ?? 0)} in · ${formatNumber(summary?.totalOutputTokens ?? 0)} out`} />
        <StatCard label="Avg latency" value={formatLatency(summary?.avgLatencyMs)} sub={`p95 ${formatLatency(summary?.p95LatencyMs)}`} />
        <StatCard label="Healthy keys" value={`${healthyKeys.length}/${healthKeys?.length ?? 0}`} accent="#00e5a0" />
        <StatCard label="Models enabled" value={enabledChat.length} sub={`${models?.length ?? 0} available`} />
      </div>

      {error ? <ErrorNote>{error}</ErrorNote> : null}
      {!summary && !error ? <InlineLoader>Loading router telemetry…</InlineLoader> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* OpenAI-compatible endpoint */}
        <Panel>
          <PanelHeader
            title={
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#00e5a0]" /> Use it anywhere
              </span>
            }
            hint="OpenAI-compatible endpoint at MedQ's own origin — works in curl, CLIs and coding agents."
          />
          <div className="space-y-3 px-4 py-3.5 text-sm">
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#8b95a8]">Base URL</div>
              <div className="flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-1.5 font-mono text-xs text-[#00e5a0]">
                  {typeof window !== 'undefined' ? `${window.location.origin}/v1` : '/v1'}
                </code>
                <CopyButton text={`${typeof window !== 'undefined' ? window.location.origin : ''}/v1`} label="Copy" />
              </div>
            </div>
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#8b95a8]">API key (unified)</div>
              <div className="flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-1.5 font-mono text-xs text-white/80">
                  {apiKey ? `${apiKey.slice(0, 10)}••••••••${apiKey.slice(-6)}` : '—'}
                </code>
                {apiKey ? <CopyButton text={apiKey} label="Copy" /> : null}
              </div>
              <p className="mt-1.5 text-xs text-[#8b95a8]">
                One key for every model you enable below — the router picks the best available and fails over automatically.
              </p>
            </div>
          </div>
        </Panel>

        {/* MedQ generation link */}
        <MedqLinkCard models={models} apiKey={apiKey} />

        {/* Key health */}
        <Panel className="lg:col-span-2">
          <PanelHeader
            title={
              <span className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-[#00e5a0]" /> Provider keys
              </span>
            }
            hint="Health is probed automatically; rate-limited keys cool down on their own."
            right={
              <button
                type="button"
                onClick={() => setRefreshKey((k) => k + 1)}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white/90"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            }
          />
          {healthKeys && healthKeys.length > 0 ? (
            <div className="max-h-64 overflow-y-auto px-4 py-2">
              {healthKeys.map((k) => (
                <div key={k.id} className="flex items-center gap-3 border-b border-white/[0.04] py-2 text-sm last:border-0">
                  <FlStatusDot status={k.enabled ? k.status : 'disabled'} />
                  <span className="min-w-0 flex-1 truncate text-white/85">{k.label || k.platform}</span>
                  <span className="text-xs uppercase tracking-wide text-[#8b95a8]">{k.platform}</span>
                  <span className="hidden text-xs text-[#8b95a8] sm:inline">
                    {k.lastCheckedAt ? new Date(k.lastCheckedAt.replace(' ', 'T') + 'Z').toLocaleString() : 'never checked'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-[#8b95a8]">
              No provider keys yet —{' '}
              <button type="button" className="text-[#00e5a0] underline underline-offset-2" onClick={() => onNavigate('keys')}>
                add your first key
              </button>
            </div>
          )}
        </Panel>

        {/* Getting started, MedQ-flavoured */}
        <Panel className="lg:col-span-2">
          <PanelHeader
            title={
              <span className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-[#00e5a0]" /> Getting started in MedQ
              </span>
            }
            hint="From zero to board-style question generation with your own keys."
          />
          <ol className="space-y-2.5 px-4 py-4 text-sm text-white/80">
            <li className="flex gap-3">
              <StepN n={1} />
              <div>
                <span className="font-medium text-white">Add a free provider key.</span>{' '}
                <button type="button" className="text-[#00e5a0] underline underline-offset-2" onClick={() => onNavigate('keys')}>
                  Keys
                </button>{' '}
                → Add key: 70+ free-tier providers (Google, GLM, Groq, Mistral…) or your own OpenAI-compatible endpoint.
              </div>
            </li>
            <li className="flex gap-3">
              <StepN n={2} />
              <div>
                <span className="font-medium text-white">Enable the models you like.</span>{' '}
                <button type="button" className="text-[#00e5a0] underline underline-offset-2" onClick={() => onNavigate('models')}>
                  Models
                </button>{' '}
                — the synced catalog has free limits baked in; look for the <span className="rounded bg-[#00e5a0]/10 px-1.5 py-0.5 text-xs text-[#00e5a0]">medical</span> badge (MedGemma and friends).
              </div>
            </li>
            <li className="flex gap-3">
              <StepN n={3} />
              <div>
                <span className="font-medium text-white">Link it to MedQ generation.</span> Use the <Link2 className="inline h-3.5 w-3.5 text-[#00e5a0]" /> card above — router models then appear in every MedQ model picker (question generation, explanations, tutor).
              </div>
            </li>
            <li className="flex gap-3">
              <StepN n={4} />
              <div>
                <span className="font-medium text-white">Try it in the Playground.</span>{' '}
                <button type="button" className="text-[#00e5a0] underline underline-offset-2" onClick={() => onNavigate('playground')}>
                  Ask a clinical question
                </button>{' '}
                and watch the router stream the answer with per-model attribution.
              </div>
            </li>
          </ol>
        </Panel>
      </div>
    </div>
  );
}

function StepN({ n }: { n: number }) {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00e5a0]/15 text-[11px] font-semibold text-[#00e5a0]">
      {n}
    </span>
  );
}

// ── MedQ generation link ────────────────────────────────────────────────────

function MedqLinkCard({ models, apiKey }: { models: FlModel[] | null; apiKey: string | null }) {
  const [medqKeys, setMedqKeys] = useState<MedqEndpointMeta[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadMedq = useCallback(async () => {
    try {
      const res = await fetch('/api/user/api-keys', { cache: 'no-store' });
      if (!res.ok) throw new Error('Could not read MedQ endpoints');
      const body = (await res.json()) as { keys: MedqEndpointMeta[] };
      setMedqKeys(body.keys);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    void loadMedq();
  }, [loadMedq]);

  const router = (medqKeys ?? []).find(
    (k) => k.providerId === ROUTER_PROVIDER_ID || k.label === ROUTER_LABEL,
  );
  const linkedCount = router?.modelsConfig?.length ?? 0;

  const link = async () => {
    setBusy(true);
    setError(null);
    setMsg(null);
    try {
      const enabled = (models ?? []).filter((m) => m.enabled);
      const picked = enabled.slice(0, 40).map((m) => ({
        id: m.modelId,
        name: m.displayName,
        contextWindow: m.contextWindow ?? undefined,
      }));
      if (!apiKey) throw new Error('Router API key not loaded yet — retry in a moment.');
      const res = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(router ? { id: router.id } : {}),
          providerId: ROUTER_PROVIDER_ID,
          apiKey,
          baseUrl: `${window.location.origin}/v1`,
          label: ROUTER_LABEL,
          modelsConfig: picked.length > 0 ? picked : null,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }
      await loadMedq();
      setMsg(`Linked — ${picked.length} router models now available in MedQ model pickers.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const unlink = async () => {
    if (!router) return;
    setBusy(true);
    setError(null);
    setMsg(null);
    try {
      const res = await fetch(
        `/api/user/api-keys/${encodeURIComponent(router.providerId)}?keyId=${encodeURIComponent(router.id)}`,
        { method: 'DELETE' },
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }
      await loadMedq();
      setMsg('Unlinked — the router endpoint was removed from MedQ.');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel>
      <PanelHeader
        title={
          <span className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-[#00e5a0]" /> Link with MedQ generation
          </span>
        }
        hint="Register the router as a MedQ endpoint — its models appear in every model picker."
        right={
          <ExternalLink className="h-3.5 w-3.5 text-[#8b95a8]" title="Uses MedQ's BYOK store" />
        }
      />
      <div className="space-y-3 px-4 py-3.5">
        {router ? (
          <div className="flex items-center gap-2 rounded-lg border border-[#00e5a0]/20 bg-[#00e5a0]/[0.05] px-3 py-2 text-sm text-[#9ef2d8]">
            <Check className="h-4 w-4 text-[#00e5a0]" />
            <span>
              Linked as <span className="font-medium">{ROUTER_LABEL}</span> — {linkedCount} models available to question generation, explanations and the tutor.
            </span>
          </div>
        ) : (
          <p className="text-sm text-[#8b95a8]">
            The router exposes one OpenAI-compatible endpoint. Link it and MedQ routes generation through your keys — with automatic failover across every model you enable.
          </p>
        )}
        {msg ? <p className="text-xs text-[#00e5a0]">{msg}</p> : null}
        {error ? <ErrorNote>{error}</ErrorNote> : null}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy || !models || !apiKey}
            onClick={link}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#00e5a0] px-3 py-1.5 text-xs font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Link2 className="h-3.5 w-3.5" />}
            {router ? 'Refresh linked models' : 'Link router to MedQ'}
          </button>
          {router ? (
            <button
              type="button"
              disabled={busy}
              onClick={unlink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[#8b95a8] transition-colors hover:border-[#ff5757]/30 hover:text-[#ff5757] disabled:opacity-50"
            >
              <Link2Off className="h-3.5 w-3.5" /> Unlink
            </button>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}
