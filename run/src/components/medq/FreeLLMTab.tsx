'use client';

/**
 * MedQ AI Router — the freellmapi BYOK suite as a REAL MedQ tab.
 *
 * This is a native re-implementation (not an iframe) of the freellmapi
 * dashboard (github.com/tashfeenahmed/freellmapi), customized for MedQ:
 *
 *   • Linked with MedQ — the /api/freellmapi-bridge route mints a sidecar
 *     session for the signed-in MedQ user, so there is no second login;
 *     the router can also be registered as a MedQ generation endpoint
 *     (Overview → "Link with MedQ generation").
 *   • MedQ design language — same dark theme, teal accent and component
 *     vocabulary as the rest of the app.
 *   • Medical context — MedQ Tutor playground prompt, clinical starter
 *     prompts, medical-model badges across the catalog.
 *
 * The router itself (complete clone at ./freellmapi, Express + SQLite) runs
 * EMBEDDED in the MedQ server process (#MEDQ-embedded — booted by
 * instrumentation on an internal ephemeral port) and remains the data plane:
 * encrypted key storage, the synced 70+ provider catalog, routing/failover
 * engine and analytics. All calls flow through the /freellmapi/* in-app
 * proxy. The standalone advanced dashboard (Fusion, Embeddings, Agents,
 * media…) stays reachable via the "Advanced" link for power features this
 * tab does not re-implement.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  Bot,
  ExternalLink,
  KeyRound,
  LayoutDashboard,
  Loader2,
  LogIn,
  RefreshCw,
  ServerCrash,
  Stethoscope,
} from 'lucide-react';
import { useFreellmSession } from '@/components/medq/freellm/api';
import Overview from '@/components/medq/freellm/Overview';
import KeysView from '@/components/medq/freellm/KeysView';
import ModelsView from '@/components/medq/freellm/ModelsView';
import Playground from '@/components/medq/freellm/Playground';
import AnalyticsView from '@/components/medq/freellm/AnalyticsView';
import LogsView from '@/components/medq/freellm/LogsView';
import { AiModelsGuideButton } from '@/components/medq/AiModelsGuide';

type View = 'overview' | 'keys' | 'models' | 'playground' | 'analytics' | 'logs';

const NAV: Array<{ id: View; label: string; icon: typeof KeyRound; hint: string }> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, hint: 'Health, usage, MedQ link' },
  { id: 'keys', label: 'Keys', icon: KeyRound, hint: 'BYOK provider keys' },
  { id: 'models', label: 'Models', icon: Bot, hint: 'Catalog & switching' },
  { id: 'playground', label: 'Playground', icon: Stethoscope, hint: 'Streaming clinical chat' },
  { id: 'analytics', label: 'Analytics', icon: Activity, hint: 'Usage & latency' },
  { id: 'logs', label: 'Logs', icon: ServerCrash, hint: 'Operational log' },
];

export default function FreeLLMTab() {
  const session = useFreellmSession();
  const [view, setView] = useState<View>('overview');
  const { phase } = session;

  // Keep the sidecar liveness dot fresh.
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  const navigate = useCallback((v: View) => setView(v), []);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0e14]">
      {/* ── Tab header ── */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00e5a0]/10">
            <Bot className="h-4 w-4 text-[#00e5a0]" />
          </span>
          <div className="leading-tight">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/95">
              MedQ AI Router
              <span className="hidden rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-[#8b95a8] sm:inline">
                BYOK
              </span>
            </div>
            <div className="hidden text-[11px] text-[#8b95a8] md:block">
              Your keys · 70+ free providers · automatic failover · analytics
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {phase.phase === 'ready' ? (
            <span className="hidden items-center gap-1.5 text-[11px] text-[#8b95a8] lg:inline-flex">
              <span className="inline-block h-2 w-2 rounded-full bg-[#00e5a0] shadow-[0_0_6px_rgba(0,229,160,0.8)]" />
              sidecar online
              <span className="mx-1 text-white/15">·</span>
              <span className="max-w-40 truncate">{phase.email}</span>
            </span>
          ) : null}
          <AiModelsGuideButton variant="icon" />
          <a
            href="/freellmapi/"
            target="_blank"
            rel="noopener"
            className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
            title="Open the full freellmapi dashboard (Fusion, Embeddings, Agents, media…)"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Advanced
          </a>
          <button
            type="button"
            onClick={session.rebridge}
            className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
            title="Re-connect the MedQ bridge"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Gates ── */}
      {phase.phase === 'boot' ? (
        <GateShell>
          <Loader2 className="h-7 w-7 animate-spin text-[#00e5a0]" />
          <p className="text-sm text-white/60">Connecting the AI Router to your MedQ session…</p>
        </GateShell>
      ) : null}

      {phase.phase === 'offline' ? (
        <GateShell>
          <ServerCrash className="h-8 w-8 text-[#ff5757]/80" />
          <p className="max-w-md text-sm text-white/70">{phase.error}</p>
          <button
            type="button"
            onClick={session.rebridge}
            className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs text-white/85 transition-colors hover:bg-white/[0.06]"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </button>
        </GateShell>
      ) : null}

      {phase.phase === 'signin' ? (
        <GateShell>
          <LogIn className="h-8 w-8 text-[#00e5a0]/80" />
          <p className="max-w-md text-sm text-white/70">
            The AI Router is linked to your MedQ account — sign in to MedQ to manage keys, models and analytics.
          </p>
        </GateShell>
      ) : null}

      {phase.phase === 'error' ? (
        <GateShell>
          <ServerCrash className="h-8 w-8 text-[#f5b73d]/80" />
          <p className="max-w-md text-sm text-white/70">{phase.error}</p>
          <button
            type="button"
            onClick={session.rebridge}
            className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs text-white/85 transition-colors hover:bg-white/[0.06]"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </button>
        </GateShell>
      ) : null}

      {/* ── Ready: native views ── */}
      {phase.phase === 'ready' ? (
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* Rail */}
          <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/[0.06] bg-white/[0.015] px-2 py-2 md:w-44 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r md:py-3">
            {NAV.map((item) => {
              const active = view === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  title={item.hint}
                  className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors ${
                    active ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-[#8b95a8] hover:bg-white/[0.04] hover:text-white/90'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
            <div className="mt-auto hidden px-3 pb-1 pt-4 text-[10px] leading-relaxed text-[#8b95a8]/60 md:block">
              freellmapi v0.16 · cloned in full at ./freellmapi · keys encrypted at rest
            </div>
          </nav>

          {/* View */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {view === 'overview' ? <Overview session={session} onNavigate={navigate} /> : null}
            {view === 'keys' ? <KeysView session={session} /> : null}
            {view === 'models' ? <ModelsView session={session} /> : null}
            {view === 'playground' ? (
              <div className="h-full min-h-[420px]">
                <Playground session={session} />
              </div>
            ) : null}
            {view === 'analytics' ? <AnalyticsView session={session} /> : null}
            {view === 'logs' ? <LogsView session={session} /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function GateShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-64 flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      {children}
    </div>
  );
}
