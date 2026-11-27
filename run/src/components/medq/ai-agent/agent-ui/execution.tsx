'use client';
// ─── agent-ui/execution ─────────────────────────────────────────────────────
// The agent-run surface — everything that shows *workflow*, not chat:
//   • RunStatusBadge      idle | running | waiting | paused | succeeded | failed | cancelled | recovering
//   • ProgressIndicator   measurable (steps done/total) or indeterminate bar
//   • ExecutionStep       queued | running | success | failed | skipped
//   • ToolCallCard        expandable card separating the CALL (name/args) from
//                         the RESULT (status/output/duration) — a request never
//                         renders as a success
//   • ExecutionTimeline   collapsible ordered view of one agent run (plan steps
//                         + tool activity + stats)
//   • ApprovalCard        pending | approved | rejected | expired decision UI
//   • RunControls         cancel / retry (pause+resume gated behind an explicit
//                         runtime capability flag so we never show dead buttons)

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertOctagon,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CircleSlash,
  Clock,
  GitBranch,
  Image as ImageIcon,
  Loader2,
  Pause,
  Play,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Square,
  ThumbsDown,
  ThumbsUp,
  Timer,
  Wrench,
  X,
} from 'lucide-react';
import type { AgentV2State, Plan, ToolCall } from '../useAgentV2Stream';
import { AgentTooltip, StatusDot } from './primitives';
import {
  formatDuration,
  humanizeToolName,
  phaseToRunStatus,
  stepStatus,
  summarizeArgs,
  type ApprovalVariant,
  type RunStatusVariant,
} from './types';

// ── RunStatusBadge ────────────────────────────────────────────────────────────

const RUN_STATUS_META: Record<RunStatusVariant, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  idle: { label: 'Idle', color: '#9ca3b8', bg: 'rgba(255,255,255,0.05)', icon: <Clock className="h-3 w-3" /> },
  running: { label: 'Running', color: '#00e5a0', bg: 'rgba(0,229,160,0.09)', icon: <Loader2 className="h-3 w-3 animate-spin" /> },
  waiting: { label: 'Waiting for approval', color: '#f59e0b', bg: 'rgba(245,158,11,0.09)', icon: <Timer className="h-3 w-3" /> },
  paused: { label: 'Paused', color: '#f59e0b', bg: 'rgba(245,158,11,0.09)', icon: <Pause className="h-3 w-3" /> },
  succeeded: { label: 'Completed', color: '#00e5a0', bg: 'rgba(0,229,160,0.09)', icon: <Check className="h-3 w-3" /> },
  failed: { label: 'Failed', color: '#ff5757', bg: 'rgba(255,87,87,0.09)', icon: <AlertOctagon className="h-3 w-3" /> },
  cancelled: { label: 'Cancelled', color: '#9ca3b8', bg: 'rgba(255,255,255,0.05)', icon: <CircleSlash className="h-3 w-3" /> },
  recovering: { label: 'Reconnecting', color: '#f59e0b', bg: 'rgba(245,158,11,0.09)', icon: <RefreshCw className="h-3 w-3 animate-spin" /> },
};

export function RunStatusBadge({ variant, compact = false }: { variant: RunStatusVariant; compact?: boolean }) {
  const meta = RUN_STATUS_META[variant];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[9.5px] font-semibold"
      style={{ background: meta.bg, border: `1px solid ${meta.color}30`, color: meta.color }}
    >
      {meta.icon}
      {!compact && meta.label}
    </span>
  );
}

// ── ProgressIndicator ─────────────────────────────────────────────────────────

/**
 * Measurable mode (done/total given) renders a real bar with a percentage;
 * indeterminate mode renders a traveling shimmer bar. `elapsedMs` shows a
 * live-ish timer when the parent refreshes it.
 */
export function ProgressIndicator({
  done,
  total,
  elapsedMs,
  indeterminate = false,
}: {
  done?: number;
  total?: number;
  elapsedMs?: number;
  indeterminate?: boolean;
}) {
  const measurable = !indeterminate && total != null && total > 0 && done != null;
  const pct = measurable ? Math.min(100, Math.round(((done ?? 0) / (total ?? 1)) * 100)) : 0;
  return (
    <div className="w-full">
      <div
        className="h-1 overflow-hidden rounded-full"
        style={{ background: 'rgba(255,255,255,0.07)' }}
        role="progressbar"
        aria-valuenow={measurable ? pct : undefined}
        aria-valuemin={measurable ? 0 : undefined}
        aria-valuemax={measurable ? 100 : undefined}
        aria-label={measurable ? `Run progress ${pct}%` : 'Run in progress'}
      >
        {measurable ? (
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #00e5a0, #8b5cf6)' }}
          />
        ) : (
          <div
            className="h-full w-1/3 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #00e5a0, transparent)', backgroundSize: '200% 100%', animation: 'agentUiShimmer 1.4s linear infinite' }}
          />
        )}
      </div>
      <div className="mt-1 flex items-center justify-between text-[9px] text-[#5a6478]">
        <span>{measurable ? `Step ${Math.min(done ?? 0, total ?? 0)} of ${total}` : 'Working…'}</span>
        {elapsedMs != null && elapsedMs > 0 && (
          <span className="inline-flex items-center gap-1 font-mono">
            <Clock className="h-2.5 w-2.5" />
            {formatDuration(elapsedMs)}
          </span>
        )}
      </div>
    </div>
  );
}

// ── ExecutionStep ─────────────────────────────────────────────────────────────

const STEP_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  queued: { icon: <Clock className="h-2.5 w-2.5" />, color: '#5a6478' },
  running: { icon: <Loader2 className="h-2.5 w-2.5 animate-spin" />, color: '#8b5cf6' },
  success: { icon: <Check className="h-2.5 w-2.5" />, color: '#00e5a0' },
  failed: { icon: <X className="h-2.5 w-2.5" />, color: '#ff5757' },
  skipped: { icon: <CircleSlash className="h-2.5 w-2.5" />, color: '#5a6478' },
};

export function ExecutionStep({
  index,
  title,
  subtitle,
  status,
  durationMs,
  toolCalls,
}: {
  index: number;
  title: string;
  subtitle?: string;
  status: keyof typeof STEP_ICONS;
  durationMs?: number;
  toolCalls?: number;
}) {
  const meta = STEP_ICONS[status];
  return (
    <div
      className="flex items-start gap-2 rounded-md px-2 py-1.5 text-[11px] transition-colors"
      style={{ background: status === 'running' ? 'rgba(139,92,246,0.1)' : 'transparent' }}
    >
      <span
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{
          background: status === 'success' ? '#00e5a0' : status === 'running' ? '#8b5cf6' : status === 'failed' ? '#ff5757' : 'rgba(255,255,255,0.07)',
          color: status === 'success' || status === 'running' || status === 'failed' ? '#fff' : '#5a6478',
        }}
        aria-label={`Step ${index + 1}: ${status}`}
      >
        {status === 'queued' ? <span className="text-[9px]">{index + 1}</span> : meta.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={
            status === 'success'
              ? 'text-[#9ca3b8] line-through decoration-[#00e5a0]/40'
              : status === 'running'
                ? 'font-medium text-[#e8ecf4]'
                : status === 'skipped'
                  ? 'text-[#5a6478] italic'
                  : 'text-[#9ca3b8]'
          }
        >
          {title}
        </div>
        {subtitle && (
          <div className="mt-0.5 font-mono text-[9px] text-[#5a6478]">
            → {subtitle}
            {durationMs != null && durationMs > 0 ? ` · ${formatDuration(durationMs)}` : ''}
            {toolCalls != null && toolCalls > 0 ? ` · ${toolCalls} tool call${toolCalls === 1 ? '' : 's'}` : ''}
          </div>
        )}
      </div>
    </div>
  );
}

// ── ToolCallCard ──────────────────────────────────────────────────────────────
//
// The card that enforces "call ≠ result":
//   Header (always visible)   tool icon · human label · arg summary · STATUS chip · duration
//   Body (expandable)
//     Request  — the exact args the agent sent (pretty JSON)
//     Result   — the outcome payload, only when status ≠ running
//     Timing   — started/ended timestamps
// A running call shows an amber "Requested — waiting for result" state, never
// a green check. A failed call auto-expands so the diagnostics are visible.

/** Per-tool icons (local copy — keeps this module free of circular imports). */
const TOOL_ICONS: Record<string, React.ReactNode> = {
  search_medical_references: <Search className="h-3 w-3" />,
  generate_medical_illustration: <ImageIcon className="h-3 w-3" />,
  run_question_generation_agent: <Sparkles className="h-3 w-3" />,
  save_question: <Save className="h-3 w-3" />,
  create_schedule_task: <Calendar className="h-3 w-3" />,
  task: <GitBranch className="h-3 w-3" />,
  query_knowledge_base: <BookOpen className="h-3 w-3" />,
};

export function ToolCallCard({ tc, defaultOpen = false }: { tc: ToolCall; defaultOpen?: boolean }) {
  const isRunning = tc.status === 'running';
  const isFailed = tc.status === 'failed';
  const [open, setOpen] = useState(defaultOpen || isFailed);
  const [showFullResult, setShowFullResult] = useState(false);

  // Auto-expand on failure (once) so the user sees why it failed.
  const wasFailed = useRef(isFailed);
  useEffect(() => {
    if (isFailed && !wasFailed.current) setOpen(true);
    wasFailed.current = isFailed;
  }, [isFailed]);

  const elapsed = tc.endedAt && tc.startedAt ? tc.endedAt - tc.startedAt : undefined;
  const accent = isRunning ? '#f59e0b' : isFailed ? '#ff5757' : '#00e5a0';
  const statusLabel = isRunning ? 'requested' : isFailed ? 'failed' : 'returned';
  const toolIcon = TOOL_ICONS[tc.toolName] ?? <Wrench className="h-3 w-3" />;
  const summary = summarizeArgs(tc.args);

  let prettyArgs = '';
  try {
    prettyArgs = tc.args == null ? '' : JSON.stringify(tc.args, null, 2);
  } catch {
    prettyArgs = String(tc.args);
  }
  const resultText = tc.result ?? '';
  const resultLines = resultText.split('\n');
  const resultClamped = !showFullResult && resultLines.length > 10;
  const shownResult = resultClamped ? resultLines.slice(0, 10).join('\n') : resultText;

  return (
    <div
      className="overflow-hidden rounded-xl text-[10.5px]"
      style={{
        background: isRunning ? 'rgba(245,158,11,0.05)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${accent}26`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-2.5 py-2 text-left transition-colors hover:bg-white/[0.04]"
        aria-expanded={open}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: `${accent}14`, color: accent }}>
          {toolIcon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate font-semibold text-[#e8ecf4]">{humanizeToolName(tc.toolName)}</span>
            {summary && <span className="truncate text-[9.5px] text-[#9ca3b8]">— {summary}</span>}
          </span>
        </span>
        <span
          className="inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-wide"
          style={{ background: `${accent}12`, color: accent }}
        >
          {isRunning ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : isFailed ? <X className="h-2.5 w-2.5" /> : <Check className="h-2.5 w-2.5" />}
          {statusLabel}
          {elapsed != null && elapsed > 0 && <span className="opacity-60">{formatDuration(elapsed)}</span>}
        </span>
        {open ? <ChevronDown className="h-3 w-3 shrink-0 text-[#5a6478]" /> : <ChevronRight className="h-3 w-3 shrink-0 text-[#5a6478]" />}
      </button>

      {open && (
        <div className="space-y-2 border-t px-2.5 py-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {/* Request — what the agent asked for */}
          <section aria-label="Tool request">
            <div className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-[#5a6478]">Request</div>
            <pre className="max-h-40 overflow-auto rounded-lg p-2 font-mono text-[9.5px] leading-relaxed text-[#d7e0ee]" style={{ background: 'rgba(0,0,0,0.25)' }}>
              {prettyArgs || '(no arguments)'}
            </pre>
          </section>

          {/* Result — what actually came back (never shown for running calls) */}
          {!isRunning && (
            <section aria-label="Tool result">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-[#5a6478]">Result</span>
                <span className="font-mono text-[8.5px]" style={{ color: isFailed ? '#ff5757' : '#00e5a0' }}>
                  {isFailed ? 'error' : 'ok'}
                </span>
              </div>
              <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-lg p-2 font-mono text-[9.5px] leading-relaxed" style={{ background: 'rgba(0,0,0,0.25)', color: isFailed ? '#ff8a8a' : '#d7e0ee' }}>
                {shownResult || '(empty result)'}
              </pre>
              {resultClamped && (
                <button
                  type="button"
                  onClick={() => setShowFullResult(true)}
                  className="mt-1 text-[9px] font-medium text-[#4fc3f7] transition-colors hover:text-[#8fd7ff]"
                >
                  Show all {resultLines.length} lines ↓
                </button>
              )}
            </section>
          )}

          {isRunning && (
            <div className="flex items-center gap-1.5 text-[9.5px]" style={{ color: '#f59e0b' }}>
              <StatusDot color="#f59e0b" />
              Requested — waiting for the result…
            </div>
          )}

          {/* Timing / diagnostics */}
          <div className="flex items-center gap-3 font-mono text-[8.5px] text-[#5a6478]">
            <span>start {new Date(tc.startedAt).toLocaleTimeString()}</span>
            {tc.endedAt != null && <span>end {new Date(tc.endedAt).toLocaleTimeString()}</span>}
            {elapsed != null && elapsed > 0 && <span>Δ {formatDuration(elapsed)}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ExecutionTimeline ─────────────────────────────────────────────────────────
//
// One collapsible surface per agent run. While streaming it shows live steps +
// tool cards + a progress bar; once the run completes it collapses to a single
// summary row ("Agent run — 4 steps · 3 tools · 12.4s") that can be re-opened
// for any HISTORICAL message via its agentSnapshot.

export function ExecutionTimeline({
  plan,
  currentStepIndex,
  stepResults,
  toolCalls,
  phase,
  elapsedMs,
  defaultOpen,
  title = 'Agent run',
}: {
  plan: Plan | null;
  currentStepIndex: number;
  stepResults: AgentV2State['stepResults'];
  toolCalls: ToolCall[];
  phase: AgentV2State['phase'];
  elapsedMs?: number;
  defaultOpen?: boolean;
  title?: string;
}) {
  const isLive = phase === 'classifying' || phase === 'planning' || phase === 'executing' || phase === 'recovering';
  // Derived open state: live runs open by default, completed runs collapsed —
  // an explicit user click (collapsedByUser) always wins. No effect needed.
  const [collapsedByUser, setCollapsedByUser] = useState<boolean | null>(null);
  const open = collapsedByUser == null ? (defaultOpen ?? isLive) : !collapsedByUser;

  const status = phaseToRunStatus(phase);
  const runFailed = phase === 'error';
  const doneSteps = stepResults.filter((s) => s.done).length;
  const totalSteps = plan?.steps.length ?? 0;
  const failedTools = toolCalls.filter((t) => t.status === 'failed').length;
  const hasContent = totalSteps > 0 || toolCalls.length > 0 || plan?.reasoning;

  const stats = useMemo(() => {
    const parts: string[] = [];
    if (totalSteps > 0) parts.push(`${doneSteps}/${totalSteps} step${totalSteps === 1 ? '' : 's'}`);
    if (toolCalls.length > 0) parts.push(`${toolCalls.length} tool${toolCalls.length === 1 ? '' : 's'}${failedTools > 0 ? ` (${failedTools} failed)` : ''}`);
    if (elapsedMs != null && elapsedMs > 0) parts.push(formatDuration(elapsedMs));
    return parts.join(' · ');
  }, [totalSteps, doneSteps, toolCalls.length, failedTools, elapsedMs]);

  if (!hasContent) return null;

  return (
    <div
      className="rounded-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.07), rgba(0,229,160,0.04))',
        border: '1px solid rgba(139,92,246,0.2)',
        animation: 'agentCardIn 0.3s ease-out',
      }}
    >
      <button
        type="button"
        onClick={() => setCollapsedByUser(open)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        {open ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#8b5cf6]" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#8b5cf6]" />}
        <span className="shrink-0 text-[11px] font-semibold text-[#8b5cf6]">{title}</span>
        <RunStatusBadge variant={status} compact />
        <span className="ml-auto min-w-0 truncate text-[9px] text-[#5a6478]">{stats}</span>
      </button>

      {open && (
        <div className="space-y-2.5 border-t px-3 pb-3 pt-2.5" style={{ borderColor: 'rgba(139,92,246,0.15)' }}>
          {plan?.reasoning && (
            <p className="text-[9.5px] leading-relaxed text-[#9ca3b8]">
              <span className="font-semibold text-[#8b5cf6]">Reasoning · </span>
              {plan.reasoning}
            </p>
          )}

          {plan && plan.steps.length > 0 && (
            <section aria-label="Plan steps">
              <div className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-[#5a6478]">Steps</div>
              <div className="space-y-0.5">
                {plan.steps.map((step, index) => {
                  const result = stepResults[index];
                  // write_todos steps carry an EXPLICIT status — prefer it over
                  // the positional inference (docs' todo-list pattern).
                  // (map to STEP_ICONS keys: queued/running/success.)
                  const explicitStatus = step.status === 'completed'
                    ? 'success'
                    : step.status === 'in_progress'
                      ? 'running'
                      : step.status === 'pending'
                        ? 'queued'
                        : null;
                  return (
                    <ExecutionStep
                      key={step.id}
                      index={index}
                      title={step.description}
                      subtitle={step.toolHint}
                      status={explicitStatus ?? stepStatus(index, currentStepIndex, result?.done, runFailed)}
                      durationMs={result?.elapsedMs}
                      toolCalls={result?.toolCalls}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {toolCalls.length > 0 && (
            <section aria-label="Tool activity">
              <div className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-[#5a6478]">Tool activity</div>
              <div className="space-y-1.5">
                {toolCalls.map((tc) => (
                  <ToolCallCard key={tc.id} tc={tc} />
                ))}
              </div>
            </section>
          )}

          {isLive && (
            <ProgressIndicator
              done={totalSteps > 0 ? doneSteps : undefined}
              total={totalSteps > 0 ? totalSteps : undefined}
              elapsedMs={elapsedMs}
              indeterminate={totalSteps === 0}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── SubagentStreamCards ──────────────────────────────────────────────────────

/** Live specialist cards for task-tool delegations (docs' subagent pattern).
 *
 * Each delegated subagent gets a DEDICATED card with its own avatar initials,
 * status and live streaming narration — instead of only a tool-chip
 * annotation. Cards are collapsible; the live one auto-expands, completed
 * ones collapse to a summary line.
 */
export function SubagentStreamCards({ subagents }: { subagents: NonNullable<AgentV2State['subagents']> }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  if (subagents.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {subagents.map((subagent) => {
        const isCollapsed = collapsed[subagent.name] ?? subagent.status === 'completed';
        const initials = subagent.name
          .split(/[-_\s]+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? '')
          .join('') || 'S';
        return (
          <div
            key={subagent.name}
            className="overflow-hidden rounded-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(139,92,246,0.07), rgba(79,195,247,0.04))',
              border: '1px solid rgba(139,92,246,0.22)',
            }}
          >
            <button
              type="button"
              onClick={() => setCollapsed((prev) => ({ ...prev, [subagent.name]: !isCollapsed }))}
              className="flex w-full items-center gap-2 px-3 py-2 text-left"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px] font-bold"
                style={{ background: 'rgba(139,92,246,0.18)', color: '#c4b5fd' }}
              >
                {initials}
              </span>
              <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[#c7d0e0]">
                {subagent.name}
              </span>
              {subagent.status === 'running' ? (
                <span className="flex items-center gap-1.5 text-[10px] text-[#00e5a0]">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  working
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[10px] text-[#9ca3b8]">
                  <Check className="h-3 w-3" />
                  done
                </span>
              )}
              {isCollapsed ? (
                <ChevronRight className="h-3 w-3 text-[#9ca3b8]" />
              ) : (
                <ChevronDown className="h-3 w-3 text-[#9ca3b8]" />
              )}
            </button>
            {!isCollapsed && (
              <div
                className="max-h-40 overflow-y-auto px-3 pb-2.5 text-[11px] leading-relaxed text-[#a8b3c7]"
                style={{ borderTop: '1px solid rgba(139,92,246,0.12)' }}
              >
                {subagent.text
                  ? <span className="whitespace-pre-wrap">{subagent.text}</span>
                  : <span className="italic text-[#9ca3b8]">specialist is starting…</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── ApprovalCard ──────────────────────────────────────────────────────────────

const APPROVAL_META: Record<ApprovalVariant, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Approval needed', color: '#f59e0b', icon: <Timer className="h-3.5 w-3.5" /> },
  approved: { label: 'Approved', color: '#00e5a0', icon: <ThumbsUp className="h-3.5 w-3.5" /> },
  rejected: { label: 'Rejected', color: '#ff5757', icon: <ThumbsDown className="h-3.5 w-3.5" /> },
  expired: { label: 'Expired', color: '#9ca3b8', icon: <CircleSlash className="h-3.5 w-3.5" /> },
};

export function ApprovalCard({
  title,
  description,
  details,
  variant = 'pending',
  onApprove,
  onReject,
}: {
  title: string;
  description?: string;
  details?: Array<{ label: string; value: string }>;
  variant?: ApprovalVariant;
  onApprove?: () => void;
  onReject?: () => void;
}) {
  const meta = APPROVAL_META[variant];
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: `${meta.color}0A`, border: `1px solid ${meta.color}33`, animation: 'agentCardIn 0.3s ease-out' }}
      role="alertdialog"
      aria-label={title}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span style={{ color: meta.color }}>{meta.icon}</span>
        <span className="text-[11px] font-semibold" style={{ color: meta.color }}>{meta.label}</span>
      </div>
      <div className="text-xs font-semibold text-[#e8ecf4]">{title}</div>
      {description && <div className="mt-0.5 text-[10.5px] leading-relaxed text-[#9ca3b8]">{description}</div>}
      {details && details.length > 0 && (
        <div className="mt-2 space-y-0.5">
          {details.slice(0, 5).map((d) => (
            <div key={d.label} className="flex items-baseline gap-1.5 text-[10px]">
              <span className="shrink-0 text-[#5a6478]">{d.label}:</span>
              <span className="min-w-0 truncate text-[#e8ecf4]">{d.value}</span>
            </div>
          ))}
        </div>
      )}
      {variant === 'pending' && (onApprove || onReject) && (
        <div className="mt-2.5 flex gap-2">
          {onApprove && (
            <button
              type="button"
              onClick={onApprove}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: '#00e5a0', color: '#06251b' }}
            >
              <ThumbsUp className="h-3 w-3" /> Approve
            </button>
          )}
          {onReject && (
            <button
              type="button"
              onClick={onReject}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-colors"
              style={{ background: 'rgba(255,87,87,0.12)', color: '#ff8a8a', border: '1px solid rgba(255,87,87,0.3)' }}
            >
              <ThumbsDown className="h-3 w-3" /> Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── RunControls ───────────────────────────────────────────────────────────────

export interface RunControlCapabilities {
  /** Pause/resume need server-side run suspension — off until the runtime
   * supports it. Buttons only render when the capability is true, so we never
   * ship dead UI. */
  pauseResume?: boolean;
}

export function RunControls({
  status,
  busy,
  onCancel,
  onRetry,
  onPause,
  onResume,
  capabilities = {},
}: {
  status: RunStatusVariant;
  busy: boolean;
  onCancel?: () => void;
  onRetry?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  capabilities?: RunControlCapabilities;
}) {
  const running = status === 'running' || status === 'recovering' || status === 'waiting';
  const canRetry = status === 'failed' || status === 'cancelled';
  if (!running && !canRetry && status !== 'paused') return null;
  return (
    <div className="flex items-center gap-1.5">
      {running && onCancel && (
        <AgentTooltip label="Stop the agent">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-colors disabled:opacity-50"
            style={{ background: 'rgba(255,87,87,0.1)', color: '#ff8a8a', border: '1px solid rgba(255,87,87,0.28)' }}
            aria-label="Stop the agent"
          >
            <Square className="h-2.5 w-2.5" fill="currentColor" /> Stop
          </button>
        </AgentTooltip>
      )}
      {capabilities.pauseResume && onPause && status === 'running' && (
        <button
          type="button"
          onClick={onPause}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold"
          style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.28)' }}
        >
          <Pause className="h-2.5 w-2.5" /> Pause
        </button>
      )}
      {capabilities.pauseResume && onResume && status === 'paused' && (
        <button
          type="button"
          onClick={onResume}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold"
          style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.28)' }}
        >
          <Play className="h-2.5 w-2.5" /> Resume
        </button>
      )}
      {canRetry && onRetry && (
        <AgentTooltip label="Run this request again">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-transform hover:scale-[1.02]"
            style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.28)' }}
            aria-label="Retry"
          >
            <RefreshCw className="h-2.5 w-2.5" /> Retry
          </button>
        </AgentTooltip>
      )}
    </div>
  );
}
