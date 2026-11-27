/**
 * AI call telemetry — server-only.
 *
 * Fire-and-forget writes to the AiCallLog table, one row per completed LLM
 * call (success or error). Powers the BYOK Analytics tab. This module is
 * STRICTLY non-blocking and non-throwing:
 *   - logAiCall() returns immediately; the DB insert runs detached.
 *   - Every failure path is swallowed (logged at debug level at most).
 * Telemetry must never break the feature it observes.
 */

import { db } from '@/lib/db';

export interface AiCallLogEntry {
  userId?: string | null;
  providerId: string;
  modelId: string;
  stage?: string | null;
  status: 'success' | 'error';
  inputTokens?: number;
  outputTokens?: number;
  latencyMs?: number | null;
  error?: string | null;
  endpointRowId?: string | null;
}

/** Persist one call log row. Fire-and-forget — never rejects. */
export function logAiCall(entry: AiCallLogEntry): void {
  void (async () => {
    try {
      await db.aiCallLog.create({
        data: {
          ...(entry.userId ? { userId: entry.userId } : {}),
          providerId: entry.providerId,
          modelId: entry.modelId.slice(0, 200),
          ...(entry.stage ? { stage: entry.stage.slice(0, 60) } : {}),
          status: entry.status,
          inputTokens: Math.max(0, Math.min(entry.inputTokens ?? 0, 2_000_000_000)),
          outputTokens: Math.max(0, Math.min(entry.outputTokens ?? 0, 2_000_000_000)),
          ...(entry.latencyMs != null
            ? { latencyMs: Math.max(0, Math.min(Math.round(entry.latencyMs), 2_000_000_000)) }
            : {}),
          ...(entry.error ? { error: entry.error.slice(0, 500) } : {}),
          ...(entry.endpointRowId ? { endpointRowId: entry.endpointRowId } : {}),
        },
      });
    } catch {
      // Swallowed by design: analytics must never surface as a user-facing
      // error. (Table missing in dev before `prisma db push`, DB hiccup, …)
    }
  })();
}

/** Extract token usage from an AI SDK GenerateTextResult-like object. */
export function extractUsage(result: unknown): { inputTokens: number; outputTokens: number } {
  const usage = (result as { usage?: { inputTokens?: unknown; outputTokens?: unknown } })?.usage;
  const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
  return { inputTokens: num(usage?.inputTokens), outputTokens: num(usage?.outputTokens) };
}
