'use client';

/**
 * Client data layer for the MedQ AI Router tab (native port of freellmapi).
 *
 * The AI Router is embedded IN the MedQ server process (#MEDQ-embedded —
 * see src/lib/freellmapi-embedded.ts) and is reached through the
 * /freellmapi/* Next.js proxy; every admin call needs a Bearer dashboard
 * token minted by the MedQ auth bridge (/api/freellmapi-bridge). The token
 * lives in sessionStorage — tab switches reuse it, closing the browser drops
 * it, and a session 401 triggers exactly one silent re-bridge.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Wire types (verified against the live sidecar API) ─────────────────────

export interface FlModelRef {
  id: number;
  kind: string;
  modelId: string;
  displayName: string;
  family: string | null;
}

export interface FlKey {
  id: number;
  platform: string;
  label: string;
  maskedKey: string;
  baseUrl: string | null;
  groupLabel: string | null;
  monthlyRequestCap: number;
  monthlyTokenCap: number;
  monthlyUsage: { requests: number; tokens: number; resetsAt: string } | null;
  status: 'healthy' | 'rate-limited' | 'invalid' | 'error' | 'unknown' | string;
  enabled: boolean;
  keyOptional: boolean;
  keyless: boolean;
  autoHealthCheck: boolean;
  createdAt: string;
  lastCheckedAt: string | null;
  lastHealthError: string | null;
  modelScope: string[] | null;
  models: FlModelRef[];
  modelDiscovery: boolean;
  cooldowns: unknown[];
}

export interface FlProvider {
  platform: string;
  name: string;
  kind: string;
  keyless: boolean;
  configured: boolean;
  keyCount: number;
  enabledKeyCount: number;
}

export interface FlProviderCatalog {
  providers: FlProvider[];
  summary: { total: number; configured: number; unconfigured: number };
}

export interface FlModel {
  id: number;
  platform: string;
  modelId: string;
  displayName: string;
  intelligenceRank: number | null;
  speedRank: number | null;
  sizeLabel: string | null;
  rpmLimit: number | null;
  rpdLimit: number | null;
  tpmLimit: number | null;
  tpdLimit: number | null;
  monthlyTokenBudget: string | null;
  contextWindow: number | null;
  enabled: boolean;
  supportsVision: boolean;
  supportsTools: boolean;
  priority: number | null;
  fallbackEnabled: boolean;
  source: string;
  keyId: number | null;
  keyLabel: string | null;
  hasProvider: boolean;
  keyCount: number;
}

export interface FlSummary {
  totalRequests: number;
  successRate: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  avgLatencyMs: number | null;
  p50LatencyMs: number | null;
  p95LatencyMs: number | null;
  avgTtfbMs: number | null;
  requestTypeCounts: Record<string, number>;
  estimatedCostSavings: number;
  lifetimeTotalRequests: number;
}

export interface FlTimelinePoint {
  timestamp: string;
  requests: number;
  successCount: number;
  failureCount: number;
  inputTokens: number;
  outputTokens: number;
}

export interface FlRequestRow {
  id: number;
  platform: string;
  modelId: string;
  requestedModel: string;
  requestType: string;
  status: 'success' | 'failure' | string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number | null;
  error: string | null;
  clientAgent: string;
  createdAt: string;
  keyLabel: string | null;
  attemptCount: number;
}

export interface FlByModelRow {
  platform: string;
  modelId: string;
  displayName: string;
  requests: number;
  successRate: number;
  avgLatencyMs: number | null;
  totalInputTokens: number;
  totalOutputTokens: number;
}

export interface FlByPlatformRow {
  platform: string;
  endpoint: string;
  requests: number;
  successRate: number;
  avgLatencyMs: number | null;
  p95LatencyMs: number | null;
  errorCount: number;
  totalInputTokens: number;
  totalOutputTokens: number;
}

export interface FlLogEntry {
  id: number;
  ts: string;
  level: 'debug' | 'info' | 'warn' | 'error' | string;
  source?: string;
  message: string;
}

export interface FlHealthKey {
  id: number;
  platform: string;
  label: string;
  status: string;
  enabled: boolean;
  lastCheckedAt: string | null;
  lastHealthError: string | null;
}

export interface FlRoutingState {
  strategy: string;
  keySelectionStrategy: string;
  customWeights: { reliability: number; speed: number; intelligence: number };
}

// ── Session (bridge) ────────────────────────────────────────────────────────

const TOKEN_KEY = 'medq:freellm:token';

export type SessionPhase =
  | { phase: 'boot' }
  | { phase: 'offline'; error: string }
  | { phase: 'signin' }
  | { phase: 'error'; error: string; code: string }
  | { phase: 'ready'; token: string; email: string };

export interface FreellmSession {
  phase: SessionPhase;
  /** Authenticated fetch against the sidecar through the in-app proxy. */
  flFetch: <T>(path: string, init?: RequestInit) => Promise<T>;
  /** Re-run the bridge (used after a session 401 or a manual retry). */
  rebridge: () => void;
}

export function useFreellmSession(): FreellmSession {
  const [phase, setPhase] = useState<SessionPhase>({ phase: 'boot' });
  const tokenRef = useRef<string | null>(null);
  const bridgingRef = useRef(false);

  const bridge = useCallback(async () => {
    if (bridgingRef.current) return;
    bridgingRef.current = true;
    setPhase((p) => (p.phase === 'ready' ? p : { phase: 'boot' }));
    try {
      // Cheap liveness first so the offline state is instant.
      try {
        const livez = await fetch('/freellmapi/livez', { cache: 'no-store' });
        if (!livez.ok) throw new Error('unhealthy');
      } catch {
        setPhase({
          phase: 'offline',
          error: 'The AI Router (embedded in this app — it starts together with MedQ) is not responding. Check the server startup logs, then retry.',
        });
        return;
      }

      // Reuse a still-valid sessionStorage token when we have one.
      const stored = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null;
      if (stored) {
        const me = await fetch('/freellmapi/api/auth/me', {
          headers: { Authorization: `Bearer ${stored}` },
          cache: 'no-store',
        });
        if (me.ok) {
          const body = (await me.json()) as { email: string };
          tokenRef.current = stored;
          setPhase({ phase: 'ready', token: stored, email: body.email });
          return;
        }
        sessionStorage.removeItem(TOKEN_KEY);
      }

      const res = await fetch('/api/freellmapi-bridge', { method: 'POST', cache: 'no-store' });
      if (res.status === 401) {
        setPhase({ phase: 'signin' });
        return;
      }
      const body = (await res.json()) as {
        ok: boolean;
        token?: string;
        email?: string;
        error?: string;
        code?: string;
      };
      if (!body.ok || !body.token || !body.email) {
        setPhase({ phase: 'error', error: body.error ?? 'Bridge failed.', code: body.code ?? 'unknown' });
        return;
      }
      tokenRef.current = body.token;
      try { sessionStorage.setItem(TOKEN_KEY, body.token); } catch { /* private mode */ }
      setPhase({ phase: 'ready', token: body.token, email: body.email });
    } finally {
      bridgingRef.current = false;
    }
  }, []);

  useEffect(() => {
    void bridge();
  }, [bridge]);

  const flFetch = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      const token = tokenRef.current;
      if (!token) throw new Error('AI Router session not ready');
      const headers = new Headers(init?.headers);
      if (!headers.has('Content-Type') && init?.body) headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${token}`);
      const res = await fetch(`/freellmapi${path}`, { ...init, headers, cache: 'no-store' });
      if (res.status === 401) {
        // Session expired — drop it, re-bridge, retry once.
        tokenRef.current = null;
        try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
        const retry = await fetch('/api/freellmapi-bridge', { method: 'POST', cache: 'no-store' });
        if (retry.ok) {
          const body = (await retry.json()) as { token: string; email: string };
          tokenRef.current = body.token;
          try { sessionStorage.setItem(TOKEN_KEY, body.token); } catch { /* ignore */ }
          setPhase({ phase: 'ready', token: body.token, email: body.email });
          const headers2 = new Headers(init?.headers);
          if (!headers2.has('Content-Type') && init?.body) headers2.set('Content-Type', 'application/json');
          headers2.set('Authorization', `Bearer ${body.token}`);
          const res2 = await fetch(`/freellmapi${path}`, { ...init, headers: headers2, cache: 'no-store' });
          if (!res2.ok) throw await flError(res2, path);
          return (await res2.json()) as T;
        }
        setPhase({ phase: 'signin' });
        throw new Error('MedQ sign-in required');
      }
      if (!res.ok) throw await flError(res, path);
      if (res.status === 204) return undefined as T;
      return (await res.json()) as T;
    },
    [],
  );

  return { phase, flFetch, rebridge: () => void bridge() };
}

async function flError(res: Response, path: string): Promise<Error> {
  const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
  return new Error(body?.error?.message ?? `${path} failed (HTTP ${res.status})`);
}

// ── Small shared helpers ────────────────────────────────────────────────────

/** Models that are actually aimed at medical/clinical work. */
const MEDICAL_MODEL_RE = /(medgemma|med-?gemma|biogpt|bio.?bert|pubmed|medllama|biomistral|openbiollm|clinical|med42|haike|diagno|eus?cape?)/i;
export function isMedicalModel(modelId: string): boolean {
  return MEDICAL_MODEL_RE.test(modelId);
}

export function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  const t = Date.parse(iso.includes('T') ? iso : iso.replace(' ', 'T') + 'Z');
  if (Number.isNaN(t)) return '—';
  const diff = Date.now() - t;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

export function formatNumber(n: number | null | undefined): string {
  if (n == null) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function formatLatency(ms: number | null | undefined): string {
  if (ms == null) return '—';
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`;
  return `${Math.round(ms)}ms`;
}
