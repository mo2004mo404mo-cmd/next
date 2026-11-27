'use client';
// ─── agent-ui/types ─────────────────────────────────────────────────────────
// Shared variant vocabulary for the MedQ agent component system.
//
// Every component in this library takes *variants*, not booleans — the same
// API shape the taxonomy in the product spec describes:
//   RunStatus      idle | running | waiting | paused | succeeded | failed | cancelled | recovering
//   ExecutionStep  queued | running | success | failed | skipped
//   ApprovalCard   pending | approved | rejected | expired
//
// IMPORTANT (per spec): a tool CALL is not a tool RESULT. ToolCall keeps the
// request side (name, args, startedAt) separate from the outcome side
// (status, result, endedAt) and the UI renders both as distinct sections so
// nothing visually implies an operation succeeded merely because it was
// requested.

import type { AgentV2State, ToolCall } from '../useAgentV2Stream';

// ── RunStatus ────────────────────────────────────────────────────────────────

export type RunStatusVariant =
  | 'idle'
  | 'running'
  | 'waiting'
  | 'paused'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'recovering';

/** Map the stream hook's phase onto the public RunStatus vocabulary. */
export function phaseToRunStatus(phase: AgentV2State['phase']): RunStatusVariant {
  switch (phase) {
    case 'classifying':
    case 'planning':
    case 'executing':
      return 'running';
    case 'awaiting_approval':
    case 'blocked':
      return 'waiting';
    case 'recovering':
      return 'recovering';
    case 'done':
      return 'succeeded';
    case 'error':
      return 'failed';
    default:
      return 'idle';
  }
}

// ── ExecutionStep ─────────────────────────────────────────────────────────────

export type ExecutionStepStatus = 'queued' | 'running' | 'success' | 'failed' | 'skipped';

/** Derive a step status from plan progress. Steps after an error are shown as
 * skipped (never run), which is the honest rendering of a cancelled run. */
export function stepStatus(
  index: number,
  currentStepIndex: number,
  done: boolean | undefined,
  runFailed: boolean,
): ExecutionStepStatus {
  if (done) return 'success';
  if (runFailed) return index <= currentStepIndex ? 'failed' : 'skipped';
  if (index === currentStepIndex) return 'running';
  return 'queued';
}

/** ToolCall.status → ExecutionStepStatus (tools have no queued state — the
 * first render of a TOOL_CALL event means it already started server-side). */
export function toolStatusToStepStatus(tc: ToolCall): ExecutionStepStatus {
  if (tc.status === 'running') return 'running';
  if (tc.status === 'failed') return 'failed';
  return 'success';
}

// ── Approval ──────────────────────────────────────────────────────────────────

export type ApprovalVariant = 'pending' | 'approved' | 'rejected' | 'expired';

// ── Toast ─────────────────────────────────────────────────────────────────────

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

// ── Shared formatting ─────────────────────────────────────────────────────────

/** 940 → "940ms", 12_400 → "12.4s", 95_000 → "1m 35s". */
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);
  return `${minutes}m ${seconds}s`;
}

/** snake_case tool name → human-readable label ("run_question_generation_agent"
 * → "Run question generation agent"). */
export function humanizeToolName(name: string): string {
  return name
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Pick the most meaningful short argument summary for a tool call header. */
export function summarizeArgs(args: unknown): string {
  if (args == null || typeof args !== 'object') return '';
  try {
    const entries = Object.entries(args as Record<string, unknown>);
    for (const [key, value] of entries) {
      if (typeof value !== 'string' || !value.trim()) continue;
      if (/^(id|uuid|thread|request)$/i.test(key)) continue;
      return value.length > 44 ? `${value.slice(0, 44)}…` : value;
    }
    const first = entries.find(([, v]) => typeof v === 'string' || typeof v === 'number');
    if (first) {
      const text = String(first[1]);
      return text.length > 44 ? `${text.slice(0, 44)}…` : text;
    }
    return '';
  } catch {
    return '';
  }
}
