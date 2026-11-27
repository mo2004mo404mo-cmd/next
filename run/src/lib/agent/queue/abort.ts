/**
 * Job abort registry — deep-agent runs/[id]/cancel parity
 * (compare-and-integrate-4). The worker registers an AbortController per
 * in-flight agent.run job; the cancel route aborts it so the underlying
 * LangGraph stream stops at the next checkpoint instead of running to
 * completion. The durable `cancelRequested` flag (queue service) remains the
 * fallback path for jobs between checkpoints and across restarts.
 */

import type { streamMedQDeepAgent } from '../deep-agent-runtime';

type StreamStarter = typeof streamMedQDeepAgent;

const runtime = globalThis as typeof globalThis & {
  __medqJobAborts?: Map<string, { controller: AbortController; startedAt: number }>;
};
const registry = runtime.__medqJobAborts ??= new Map<string, { controller: AbortController; startedAt: number }>();

/** Register an abort controller for a running job (worker). */
export function registerJobAbort(jobId: string): AbortController {
  const controller = new AbortController();
  registry.set(jobId, { controller, startedAt: Date.now() });
  return controller;
}

/** Unregister on completion (worker finally block). */
export function unregisterJobAbort(jobId: string): void {
  registry.delete(jobId);
}

/** Abort an in-flight job (cancel route). Returns true if a live run was aborted. */
export function abortJob(jobId: string): boolean {
  const entry = registry.get(jobId);
  if (!entry) return false;
  entry.controller.abort();
  registry.delete(jobId);
  return true;
}

/** Live jobs snapshot (diagnostics). */
export function activeJobCount(): number {
  return registry.size;
}

export type { StreamStarter };
