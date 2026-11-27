'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { FileText, Square, Stethoscope, User } from 'lucide-react';
import { MultimodalRenderer } from './MultimodalRenderer';
import { AgentMarkdown } from './AgentMarkdown';
import type { MultimodalContent } from '@/lib/agent/multimodal-types';
import type { FileAttachment } from '@/lib/agent/file-intelligence';
import type { AgentAction, AgentV2State, MessageCard, PendingApproval, PendingClarification } from './useAgentV2Stream';
import type { ClarificationAnswers } from '@/lib/agent/clarification';
import { MemoryBadge, renderCard } from './MedQAgentMessageParts';
import { MessageFileCards } from './ArtifactFileCards';
import { buildFollowUps } from './follow-ups';
// agent-ui — the component library this surface is built from
import {
  ActionReceipt,
  AgentSkeletonRows,
  ApprovalCard,
  CitationList,
  WebCitationList,
  ConnectionStatusBanner,
  ConversationEmptyState,
  ErrorCard,
  ExecutionTimeline,
  MessageActions,
  PartialSuccessBanner,
  SubagentStreamCards,
  formatDuration,
} from './agent-ui';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  actions?: AgentAction[];
  cards?: NonNullable<AgentV2State['cards']>;
  multimodalContent?: MultimodalContent[];
  fileAttachments?: FileAttachment[];
  timestamp: number;
  feedback?: 'positive' | 'negative' | null;
  /** True when this restored assistant answer was persisted mid-generation
   *  (explicit Stop / run hard-cap) — renders the "Interrupted — may be
   *  incomplete" honesty badge. */
  interrupted?: boolean;
  /** Receipt labels for UI actions that were actually executed for this
   * message (e.g. "Navigated to Questions") — rendered as ActionReceipts. */
  executedActions?: string[];
  agentSnapshot?: {
    plan: AgentV2State['plan'];
    toolCalls: AgentV2State['toolCalls'];
    llmCallCount: AgentV2State['llmCallCount'];
    memory: AgentV2State['memory'];
    stepResults: AgentV2State['stepResults'];
    citations?: AgentV2State['citations'];
    webCitations?: AgentV2State['webCitations'];
  };
};

type TimelineAgent = {
  isStreaming: boolean;
  state: AgentV2State;
  /** Abort the in-flight run (same control the composer's Stop uses). */
  cancel?: () => void;
};

type MedQAgentTimelineProps = {
  messages: ChatMessage[];
  agent: TimelineAgent;
  suggestions: string[];
  onSuggestion: (suggestion: string) => void;
  onCopy: (text: string, messageId: string) => void;
  copiedId: string | null;
  onAction: (action: AgentAction) => void;
  onFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  /** Retry the most recent user turn (agent-ui ErrorCard “Try again”). */
  onRetry?: () => void;
  /** Prefill the composer with text (MessageActions edit, FormCard answers). */
  onPrefill?: (text: string) => void;
  /** Browser transport state — drives the ConnectionStatusBanner. */
  online?: boolean;
  /** True when the user scrolled ≥320px away from the latest message —
   *  shows the floating "jump to latest" pill. */
  showJumpToLatest?: boolean;
  /** Smooth-scroll back to the newest message (pill click). */
  onJumpToLatest?: () => void;
  /** Undo callback for the most recent executed navigation, if reversible. */
  onUndoNavigate?: (() => void) | null;
  /** HITL: the user decided the live pendingApproval (Approve/Reject). The
   *  optional third argument carries user-EDITED tool args (approve-with-
   *  changes from the card's argument editor). */
  onApprovalDecision?: (approved: boolean, remember: boolean, modifiedArgs?: Record<string, unknown>) => void;
  /** True while the panel waits for the server-side run (refresh mid-run):
   * drives the honest “still working” row under the dangling user message. */
  awaitingServerReply?: boolean;
  /** Approvals restored after a refresh (server-side waits still pending). */
  restoredApprovals?: PendingApproval[];
  /** Decision for a restored approval (works without a live SSE stream). */
  onRestoredApprovalDecision?: (approvalId: string, approved: boolean, remember: boolean) => void;
  /** The agent's pending ask_user form (null when none). Rendered under the
   *  latest message; answers are sent as the next user message by the parent. */
  pendingClarification?: PendingClarification | null;
  /** clarificationId of an already-submitted form — flips the card to its
   *  compact "Answered" summary. */
  clarificationAnsweredId?: string | null;
  /** Submit (or skip) the pending clarification form. */
  onClarificationSubmit?: (
    payload: PendingClarification,
    answers: ClarificationAnswers,
    skipped: boolean,
  ) => void;
  /** Chat-specific follow-up chips from the server (LLM, conversation-
   *  grounded). When non-empty they REPLACE the heuristic chips; the
   *  heuristics remain the instant fallback. */
  chatFollowUps?: string[];
  /** id of the assistant message currently being read aloud (drives the
   *  Listen→Stop flip on that row's MessageActions). */
  speakingMessageId?: string | null;
  /** Toggle read-aloud for an assistant message (start / stop). */
  onSpeakMessage?: (message: ChatMessage) => void;
};

// ── Shared pieces ───────────────────────────────────────────────────────────

/** Summarize approval args into card detail rows (strings/numbers only). */
function approvalDetailRows(args: unknown): Array<{ label: string; value: string }> {
  if (!args || typeof args !== 'object') return [];
  return Object.entries(args as Record<string, unknown>)
    .filter(([, v]) => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
    .slice(0, 4)
    .map(([k, v]) => ({ label: k, value: String(v).slice(0, 80) }))
    .filter((d) => d.value !== '');
}

/** ask_user's interactive form card — the agent's structured questions.
 *
 * Renders the payload's inputs as REAL widgets (checkbox lists, choice
 * buttons, dropdowns, text/number/date fields). Submitting sends the
 * formatted answers as the next user message (MedQAgentV3 wires that), and
 * the card flips to a compact "answered" summary so history stays readable.
 * While the agent is still streaming the form renders read-only — the
 * learner submits after the turn settles (ask_user ends the model's turn,
 * so this is normally brief). */
function ClarificationCard({
  clarification,
  disabled,
  answered,
  onSubmit,
}: {
  clarification: PendingClarification;
  /** True while the agent turn is still running (form renders read-only). */
  disabled: boolean;
  /** Set after submit — the card shows what was answered instead of widgets. */
  answered: boolean;
  onSubmit: (answers: ClarificationAnswers, skipped: boolean) => void;
}) {
  const [values, setValues] = useState<Record<string, string | string[]>>(() => {
    const initial: Record<string, string | string[]> = {};
    for (const input of clarification.inputs) {
      if (input.defaultValue !== undefined) {
        initial[input.id] = input.type === 'multiselect'
          ? input.defaultValue.split(',').map((v) => v.trim()).filter(Boolean)
          : input.defaultValue;
      } else if (input.type === 'multiselect') {
        initial[input.id] = [];
      } else if (input.type === 'checkbox') {
        initial[input.id] = 'no';
      } else {
        initial[input.id] = '';
      }
    }
    return initial;
  });
  const [error, setError] = useState<string | null>(null);

  const setValue = (id: string, value: string | string[]) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const toggleMulti = (id: string, value: string) => {
    setValues((prev) => {
      const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [id]: next };
    });
  };

  const handleSubmit = () => {
    for (const input of clarification.inputs) {
      if (!input.required) continue;
      const raw = values[input.id];
      const empty = Array.isArray(raw) ? raw.length === 0 : !String(raw ?? '').trim();
      if (empty) {
        setError(`"${input.label}" is required.`);
        return;
      }
    }
    setError(null);
    const answers: ClarificationAnswers = {};
    for (const input of clarification.inputs) {
      const raw = values[input.id];
      answers[input.id] = Array.isArray(raw) ? raw.join(', ') : String(raw ?? '');
    }
    onSubmit(answers, false);
  };

  const fieldStyle =
    'w-full rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-[#e8ecf4] outline-none transition-colors placeholder:text-[#5a6478] focus:border-[#00e5a0]/50';
  const optionButton = (selected: boolean) =>
    `rounded-lg border px-2.5 py-1.5 text-left text-[10.5px] transition-all ${
      selected
        ? 'border-[#00e5a0]/60 bg-[#00e5a0]/12 text-[#e8ecf4]'
        : 'border-white/10 bg-white/[0.03] text-[#9ca3b8] hover:border-white/25 hover:text-[#e8ecf4]'
    }`;

  if (answered) {
    return (
      <div className="max-w-[85%]" style={{ animation: 'agentCardIn 0.3s ease-out' }}>
        <div
          className="rounded-2xl rounded-tl-md px-3.5 py-2.5"
          style={{
            background: 'linear-gradient(180deg, rgba(0,229,160,0.08), rgba(255,255,255,0.02))',
            border: '1px solid rgba(0,229,160,0.25)',
          }}
        >
          <div className="text-[11px] font-semibold text-[#00e5a0]">Answered</div>
          <div className="mt-1 text-[10.5px] leading-relaxed text-[#9ca3b8]">
            {clarification.question.slice(0, 220)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[90%]" style={{ animation: 'agentCardIn 0.3s ease-out' }}>
      <div
        className="rounded-2xl rounded-tl-md px-3.5 py-3"
        style={{
          background: 'linear-gradient(180deg, rgba(139,92,246,0.10), rgba(13,17,29,0.6))',
          border: '1px solid rgba(139,92,246,0.35)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-[#c4b5fd]">
            {clarification.title ?? 'Quick questions'}
          </span>
          <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-wide text-[#c4b5fd]">
            Answer to continue
          </span>
        </div>
        <div className="mt-1.5 text-[11px] leading-relaxed text-[#e8ecf4]">{clarification.question}</div>

        <div className="mt-2.5 flex flex-col gap-3">
          {clarification.inputs.map((input) => (
            <div key={input.id} className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-[#9ca3b8]" htmlFor={`clar-${input.id}`}>
                {input.label}
                {input.required && <span className="ml-1 text-[#f87171]">*</span>}
              </label>
              {input.helpText && <div className="text-[9px] text-[#5a6478]">{input.helpText}</div>}

              {input.type === 'textarea' && (
                <textarea
                  id={`clar-${input.id}`}
                  className={`${fieldStyle} min-h-[56px] resize-y`}
                  placeholder={input.placeholder}
                  value={String(values[input.id] ?? '')}
                  disabled={disabled}
                  onChange={(e) => setValue(input.id, e.target.value)}
                />
              )}

              {input.type === 'multiselect' && (
                <div className="flex flex-wrap gap-1.5">
                  {(input.options ?? []).map((option) => {
                    const selected = (Array.isArray(values[input.id]) ? values[input.id] : []).includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleMulti(input.id, option.value)}
                        className={optionButton(selected)}
                      >
                        <span
                          className="mr-1.5 inline-flex h-3 w-3 items-center justify-center rounded border"
                          style={{ borderColor: selected ? 'rgba(0,229,160,0.8)' : 'rgba(255,255,255,0.2)' }}
                        >
                          {selected && <span className="text-[8px] leading-none text-[#00e5a0]">✓</span>}
                        </span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {input.type === 'radio' && (
                <div className="flex flex-wrap gap-1.5">
                  {(input.options ?? []).map((option) => {
                    const selected = values[input.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={disabled}
                        onClick={() => setValue(input.id, option.value)}
                        className={optionButton(selected)}
                      >
                        <span
                          className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full"
                          style={{
                            border: selected ? '5px solid rgba(0,229,160,0.9)' : '1.5px solid rgba(255,255,255,0.25)',
                          }}
                        />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {input.type === 'select' && (
                <select
                  id={`clar-${input.id}`}
                  className={fieldStyle}
                  value={String(values[input.id] ?? '')}
                  disabled={disabled}
                  onChange={(e) => setValue(input.id, e.target.value)}
                >
                  <option value="">Choose…</option>
                  {(input.options ?? []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              )}

              {input.type === 'checkbox' && (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setValue(input.id, values[input.id] === 'yes' ? 'no' : 'yes')}
                  className={optionButton(values[input.id] === 'yes')}
                >
                  <span
                    className="mr-1.5 inline-flex h-3 w-4 items-center justify-center rounded-[3px]"
                    style={{
                      border: '1px solid',
                      borderColor: values[input.id] === 'yes' ? 'rgba(0,229,160,0.8)' : 'rgba(255,255,255,0.2)',
                      background: values[input.id] === 'yes' ? 'rgba(0,229,160,0.7)' : 'transparent',
                    }}
                  />
                  {values[input.id] === 'yes' ? 'Yes' : 'No'}
                </button>
              )}

              {(input.type === 'text' || input.type === 'number' || input.type === 'date') && (
                <input
                  id={`clar-${input.id}`}
                  type={input.type === 'text' ? 'text' : input.type}
                  className={fieldStyle}
                  placeholder={input.placeholder}
                  value={String(values[input.id] ?? '')}
                  disabled={disabled}
                  onChange={(e) => setValue(input.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {error && <div className="mt-2 text-[10px] text-[#f87171]">{error}</div>}

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled}
            className="rounded-lg px-3.5 py-1.5 text-[11px] font-semibold text-[#0b1120] transition-all"
            style={{
              background: disabled ? 'rgba(0,229,160,0.35)' : 'linear-gradient(120deg, #00e5a0, #34d399)',
              cursor: disabled ? 'wait' : 'pointer',
            }}
          >
            {disabled ? 'Finishing…' : 'Send answers'}
          </button>
          {clarification.allowSkip !== false && (
            <button
              type="button"
              onClick={() => onSubmit({}, true)}
              disabled={disabled}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-[10.5px] text-[#9ca3b8] transition-colors hover:border-white/25 hover:text-[#e8ecf4]"
            >
              Skip — use your best judgment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Live HITL approval request — rendered while the gated tool waits.
 *
 * Flips to approved/rejected in place once the user decides (the run then
 * continues through the still-open SSE stream). The “Don’t ask again”
 * checkbox persists an allow-setting for the capability server-side. The
 * argument editor lets the user tweak the tool's arguments BEFORE
 * approving — the edited object replaces the model's originals when the
 * gated tool executes (DeepAgents interrupt parity: approve / edit /
 * reject). */
function LiveApprovalCard({
  approval,
  decision,
  onDecide,
}: {
  approval: PendingApproval;
  decision: 'approved' | 'rejected' | null;
  onDecide: (approved: boolean, remember: boolean, modifiedArgs?: Record<string, unknown>) => void;
}) {
  const [remember, setRemember] = useState(false);
  const [editing, setEditing] = useState(false);
  const [argsText, setArgsText] = useState(() => {
    try { return JSON.stringify(approval.args ?? {}, null, 2); } catch { return '{}'; }
  });
  const [argsError, setArgsError] = useState<string | null>(null);

  const parseEditedArgs = (): Record<string, unknown> | undefined => {
    if (!editing) return undefined;
    try {
      const parsed = JSON.parse(argsText);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        setArgsError('Arguments must be a JSON object, e.g. { "count": 3 }');
        return undefined;
      }
      setArgsError(null);
      return parsed as Record<string, unknown>;
    } catch {
      setArgsError('Invalid JSON — fix the syntax or turn off editing to use the original arguments.');
      return undefined;
    }
  };

  return (
    <div className="max-w-[85%]" style={{ animation: 'agentCardIn 0.3s ease-out' }}>
      <ApprovalCard
        title={approval.description ?? `Approve: ${approval.tool}`}
        description={`The agent needs your permission before running “${approval.tool}”. The run is paused until you decide.`}
        details={approvalDetailRows(approval.args)}
        variant={decision ?? 'pending'}
        onApprove={decision ? undefined : () => {
          const edited = parseEditedArgs();
          if (editing && edited === undefined) return; // invalid JSON — keep the card open
          onDecide(true, remember, edited);
        }}
        onReject={decision ? undefined : () => onDecide(false, false)}
      />
      {decision === null && (
        <>
          <button
            type="button"
            onClick={() => {
              setEditing((v) => !v);
              setArgsError(null);
            }}
            className="mt-1.5 text-[9.5px] font-medium text-[#4fc3f7] hover:underline"
          >
            {editing ? '↩ Use original arguments' : '✎ Edit arguments before approving'}
          </button>
          {editing && (
            <div className="mt-1.5">
              <textarea
                value={argsText}
                onChange={(e) => { setArgsText(e.target.value); setArgsError(null); }}
                spellCheck={false}
                rows={Math.min(10, Math.max(3, argsText.split('\n').length))}
                className="w-full rounded-lg p-2 font-mono text-[9.5px] leading-relaxed custom-scrollbar"
                style={{
                  background: 'rgba(0,0,0,0.35)',
                  border: `1px solid ${argsError ? 'rgba(255,87,87,0.5)' : 'rgba(79,195,247,0.3)'}`,
                  color: '#e8ecf4',
                  resize: 'vertical',
                }}
              />
              {argsError && <div className="mt-1 text-[9px] text-[#ff5757]">{argsError}</div>}
            </div>
          )}
          <label className="mt-1.5 flex cursor-pointer items-center gap-1.5 text-[9.5px] text-[#9ca3b8]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3 w-3 accent-[#00e5a0]"
            />
            Don’t ask again for this type of action
          </label>
        </>
      )}
    </div>
  );
}

function formatTime(timestamp: number): string {
  try {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function AssistantAvatar({ active = false }: { active?: boolean }) {
  return (
    <div
      className="mt-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #00e5a0, #8b5cf6)',
        boxShadow: '0 2px 10px rgba(0,229,160,0.25)',
        ...(active ? { animation: 'agentPulseGlow 2s ease-out infinite' } : {}),
      }}
    >
      <Stethoscope className="h-3.5 w-3.5 text-white" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      className="mt-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <User className="h-3.5 w-3.5 text-[#9ca3b8]" />
    </div>
  );
}

/** Self-contained clock for the live run. Mounts when streaming starts,
 * unmounts when it ends — so every run starts from a fresh zero without any
 * ref reads or setState during the parent's render. */
function ElapsedTicker({ onTick }: { onTick: (ms: number) => void }) {
  const [start] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => onTick(Date.now() - start), 1000);
    return () => clearInterval(timer);
  }, [start, onTick]);
  return null;
}

/** Small name · time meta line above a bubble. The live-run status lives in
 * the thinking-dots phase label + execution timeline — no badge chip here. */
function MetaLine({
  name,
  time,
  accent = false,
  statusBadge,
}: {
  name: string;
  time: string;
  accent?: boolean;
  statusBadge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 px-1 text-[9.5px] leading-none">
      <span className="font-semibold" style={{ color: accent ? '#00e5a0' : '#9ca3b8' }}>{name}</span>
      {statusBadge ?? (time && <span className="text-[#5a6478]">{time}</span>)}
    </div>
  );
}

// ── Timeline ────────────────────────────────────────────────────────────────

export function MedQAgentTimeline({
  messages,
  agent,
  suggestions,
  onSuggestion,
  onCopy,
  copiedId,
  onAction,
  onFeedback,
  chatContainerRef,
  chatEndRef,
  onRetry,
  onPrefill,
  online = true,
  showJumpToLatest = false,
  onJumpToLatest,
  onUndoNavigate,
  onApprovalDecision,
  awaitingServerReply = false,
  restoredApprovals = [],
  onRestoredApprovalDecision,
  pendingClarification = null,
  clarificationAnsweredId = null,
  onClarificationSubmit,
  chatFollowUps = [],
  speakingMessageId = null,
  onSpeakMessage,
}: MedQAgentTimelineProps) {
  // Live elapsed timer for the in-flight run (feeds ExecutionTimeline +
  // ProgressIndicator). The ticker child owns the clock; the parent stores
  // {runKey, ms} so a stale value from a PREVIOUS run is ignored the moment a
  // new user turn starts (runKey increments).
  const runKey = messages.reduce((count, m) => (m.role === 'user' ? count + 1 : count), 0);
  const [elapsed, setElapsed] = useState<{ key: number; ms: number } | null>(null);
  const handleElapsedTick = useCallback((ms: number) => setElapsed({ key: runKey, ms }), [runKey]);
  const elapsedMs = elapsed && elapsed.key === runKey ? elapsed.ms : 0;

  // Local approval decisions keyed by `${messageId}:${cardIndex}` so an
  // ApprovalCard flips to approved/rejected in place after the user decides.
  const [approvalDecisions, setApprovalDecisions] = useState<Record<string, 'approved' | 'rejected'>>({});

  const phaseLabel =
    agent.state.phase === 'planning'
      ? 'planning'
      : agent.state.phase === 'classifying'
        ? 'analyzing request'
        : agent.state.phase === 'executing'
          ? 'working'
          : agent.state.phase === 'awaiting_approval'
            ? 'waiting for your approval'
            : agent.state.phase === 'recovering'
              ? 'reconnecting — finishing your answer'
              : agent.state.phase === 'blocked'
                ? 'awaiting approval'
                : 'responding';

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  const lastAssistantId = [...messages].reverse().find((m) => m.role === 'assistant')?.id ?? null;
  const connectionState = !online ? 'offline' : agent.state.phase === 'recovering' ? 'reconnecting' : 'connected';

  // ── Interruption-banner grace ──
  // Genuine gateway blips re-attach in well under a second — flashing
  // "Connection interrupted" for every one of them trains users to distrust
  // the signal. Only surface the banner once the connection has actually
  // been down for a beat (offline is immediate — the network really is gone
  // and nothing can proceed). Planned wire swaps (preempting the gateway's
  // ~3-minute absolute connection cap) never enter 'recovering' at all —
  // see useAgentV2Stream's WIRE_RECYCLE_MS.
  const [showConnectionBanner, setShowConnectionBanner] = useState(false);
  useEffect(() => {
    if (connectionState === 'connected') {
      setShowConnectionBanner(false);
      return;
    }
    if (connectionState === 'offline') {
      setShowConnectionBanner(true);
      return;
    }
    const timer = setTimeout(() => setShowConnectionBanner(true), 2_500);
    return () => clearTimeout(timer);
  }, [connectionState]);

  // ── Follow-up chips ──
  // Shown under the LATEST assistant message once the run is idle: 2-4
  // contextual next actions (flashcards, drills, artifacts) computed from the
  // turn's tool calls + answer content. Heuristic only — no LLM call, so the
  // chips appear the instant the answer lands.
  const lastMessage = messages[messages.length - 1];
  const unansweredClarification = pendingClarification && clarificationAnsweredId !== pendingClarification.clarificationId
    ? pendingClarification
    : null;
  const showFollowUps =
    !agent.isStreaming &&
    !unansweredClarification &&
    lastMessage?.role === 'assistant' &&
    lastMessage.content.trim().length > 0;
  const followUps = showFollowUps
    ? (chatFollowUps.length > 0
        ? chatFollowUps
        : buildFollowUps({
            toolCalls: lastMessage.agentSnapshot?.toolCalls ?? [],
            content: lastMessage.content,
            attachmentCount: lastUserMessage?.fileAttachments?.length ?? 0,
          }))
    : [];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div ref={chatContainerRef} className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden custom-scrollbar p-3">
      {agent.isStreaming && <ElapsedTicker onTick={handleElapsedTick} />}
      {messages.length === 0 && (
        <ConversationEmptyState
          greeting="Ready when you are"
          subline="Ask me anything about your studies. Drop a file, hit the mic, or just type."
          suggestions={suggestions}
          onSuggestion={onSuggestion}
        />
      )}

      {messages.map((message) => {
        if (message.role === 'system') {
          // Warnings (⚠ …) render as structured ErrorCards with a retry
          // action; neutral notices (e.g. the "⏹ Cancelled" feedback) render
          // as calm gray pills so a deliberate stop does not look like a
          // failure.
          const isWarning = message.content.trimStart().startsWith('⚠');
          if (isWarning) {
            return (
              <div key={message.id} className="flex justify-center" style={{ animation: 'agentRowIn 0.3s ease-out both' }}>
                <div className="w-full max-w-[92%]">
                  <ErrorCard
                    problem={message.content.replace(/^[⚠⏹]\s*/u, '')}
                    impact="This turn stopped before an answer was produced."
                    nextSteps={['Try again in a moment', 'Pick a different chat model if it keeps happening']}
                    onRetry={onRetry}
                    requestLabel={lastUserMessage?.content}
                  />
                </div>
              </div>
            );
          }
          return (
            <div key={message.id} className="flex justify-center" style={{ animation: 'agentRowIn 0.3s ease-out both' }}>
              <div
                className="inline-flex max-w-[90%] items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#9ca3b8',
                }}
              >
                <Square className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">{message.content.replace(/^[⚠⏹]\s*/u, '')}</span>
              </div>
            </div>
          );
        }

        const isAssistant = message.role === 'assistant';
        const snapshot = message.agentSnapshot;
        const mixedTools = snapshot?.toolCalls ?? [];
        const hasFailedTools = mixedTools.some((tc) => tc.status === 'failed');
        const hasSucceededTools = mixedTools.some((tc) => tc.status === 'completed');

        // Split cards: approval cards get local decision state; the rest go
        // through renderCard (question / form / diff / generic).
        const approvalCards: Array<{ card: MessageCard; index: number }> = [];
        const plainCards: MessageCard[] = [];
        (message.cards ?? []).forEach((card, index) => {
          if (card.type === 'approval') approvalCards.push({ card, index });
          else plainCards.push(card);
        });

        return (
          <div key={message.id} className="group" style={{ animation: 'agentRowIn 0.35s ease-out both' }}>
            <div className={`flex items-start gap-2 ${isAssistant ? '' : 'flex-row-reverse'}`}>
              {isAssistant ? <AssistantAvatar /> : <UserAvatar />}

              <div className="flex min-w-0 max-w-[85%] flex-col gap-1">
                <div className={`flex ${isAssistant ? '' : 'justify-end'}`}>
                  <MetaLine name={isAssistant ? 'MedQ Agent' : 'You'} time={formatTime(message.timestamp)} accent={isAssistant} />
                </div>

                {isAssistant && message.interrupted && (
                  <div
                    className="flex w-fit items-center gap-1.5 rounded-lg px-2 py-1 text-[10px]"
                    style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.3)', color: '#fb923c' }}
                    title="This answer was stopped before it finished — it may be incomplete. Retry the turn to regenerate it."
                  >
                    <span>⚠</span>
                    <span>Interrupted — may be incomplete</span>
                  </div>
                )}

                {isAssistant && snapshot && hasFailedTools && hasSucceededTools && (
                  <PartialSuccessBanner toolCalls={mixedTools} />
                )}

                {isAssistant && snapshot && ((snapshot.plan && snapshot.plan.steps.length > 0) || (snapshot.toolCalls?.length ?? 0) > 0) && (
                  <ExecutionTimeline
                    plan={snapshot.plan}
                    currentStepIndex={-1}
                    stepResults={snapshot.stepResults}
                    toolCalls={snapshot.toolCalls}
                    phase="done"
                    defaultOpen={false}
                    title="Agent run"
                  />
                )}

                {!isAssistant && message.fileAttachments && message.fileAttachments.length > 0 && (
                  <div className="mb-1 flex flex-wrap justify-end gap-1.5">
                    {message.fileAttachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px]"
                        style={{ background: 'rgba(79,195,247,0.08)', border: '1px solid rgba(79,195,247,0.25)', color: '#4fc3f7' }}
                        title={attachment.name}
                      >
                        {attachment.dataUrl ? (
                          <Image src={attachment.dataUrl} alt={attachment.name} width={24} height={24} unoptimized className="h-6 w-6 rounded object-cover" />
                        ) : (
                          <FileText className="h-3 w-3" />
                        )}
                        <span className="max-w-20 truncate">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`px-3 py-2.5 ${isAssistant ? 'rounded-2xl rounded-tl-md' : 'rounded-2xl rounded-tr-md'}`}
                  style={
                    isAssistant
                      ? {
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#e8ecf4',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                        }
                      : {
                          background: 'linear-gradient(135deg, #00e5a0, #8b5cf6)',
                          color: '#fff',
                          boxShadow: '0 4px 16px rgba(0,229,160,0.18)',
                        }
                  }
                >
                  <AgentMarkdown text={message.content} citations={snapshot?.citations} webCitations={snapshot?.webCitations} />
                  {isAssistant && snapshot?.memory && <MemoryBadge memory={snapshot.memory} />}
                  {isAssistant && message.multimodalContent && message.multimodalContent.length > 0 && (
                    <div className="mt-2">
                      <MultimodalRenderer content={message.multimodalContent} />
                    </div>
                  )}
                </div>

                {isAssistant && <MessageFileCards toolCalls={snapshot?.toolCalls} />}

                {isAssistant && snapshot?.citations && snapshot.citations.length > 0 && (
                  <CitationList citations={snapshot.citations} />
                )}

                {isAssistant && snapshot?.webCitations && snapshot.webCitations.length > 0 && (
                  <WebCitationList webCitations={snapshot.webCitations} />
                )}

                {isAssistant &&
                  plainCards.map((card, index) =>
                    renderCard(card, index, onAction, { onPrefill: onPrefill }),
                  )}

                {isAssistant &&
                  approvalCards.map(({ card, index }) => {
                    const key = `${message.id}:${index}`;
                    const decision = approvalDecisions[key];
                    return (
                      <ApprovalCard
                        key={key}
                        title={card.title}
                        description={card.subtitle}
                        details={card.details ? Object.entries(card.details).map(([label, value]) => ({ label, value })) : undefined}
                        variant={decision ?? 'pending'}
                        onApprove={() => {
                          setApprovalDecisions((prev) => ({ ...prev, [key]: 'approved' }));
                          onAction({ type: 'approval_response', params: { approved: true, cardId: card.id ?? card.title }, description: `Approve: ${card.title}` });
                        }}
                        onReject={() => {
                          setApprovalDecisions((prev) => ({ ...prev, [key]: 'rejected' }));
                          onAction({ type: 'approval_response', params: { approved: false, cardId: card.id ?? card.title }, description: `Reject: ${card.title}` });
                        }}
                      />
                    );
                  })}

                {isAssistant && message.executedActions && message.executedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {message.executedActions.map((label, receiptIndex) => (
                      <ActionReceipt
                        key={`${message.id}-receipt-${receiptIndex}`}
                        label={label}
                        onUndo={
                          message.id === lastAssistantId && onUndoNavigate && receiptIndex === 0
                            ? onUndoNavigate
                            : undefined
                        }
                      />
                    ))}
                  </div>
                )}

                {isAssistant ? (
                  <MessageActions
                    copied={copiedId === message.id}
                    onCopy={() => onCopy(message.content, message.id)}
                    onRetry={onRetry}
                    onEdit={onPrefill ? () => onPrefill(message.content) : undefined}
                    feedback={message.feedback}
                    onFeedback={(next) => onFeedback(message.id, next)}
                    meta={snapshot ? `${snapshot.llmCallCount} LLM call${snapshot.llmCallCount === 1 ? '' : 's'}` : undefined}
                    speaking={speakingMessageId === message.id}
                    onSpeak={onSpeakMessage ? () => onSpeakMessage(message) : undefined}
                  />
                ) : (
                  <MessageActions
                    copied={copiedId === message.id}
                    onCopy={() => onCopy(message.content, message.id)}
                    onEdit={onPrefill ? () => onPrefill(message.content) : undefined}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* ask_user — the agent's structured question form. Rendered both
          while the turn finishes (read-only) and after it settles (live);
          flips to the compact "Answered" summary once submitted. */}
      {pendingClarification && (
        <div className="flex items-start gap-2" style={{ animation: 'agentRowIn 0.3s ease-out both' }}>
          <AssistantAvatar active={!clarificationAnsweredId} />
          <ClarificationCard
            clarification={pendingClarification}
            disabled={agent.isStreaming}
            answered={clarificationAnsweredId === pendingClarification.clarificationId}
            onSubmit={(answers, skipped) =>
              onClarificationSubmit?.(pendingClarification, answers, skipped)}
          />
        </div>
      )}

      {/* Follow-up suggestion chips under the latest answer (skill
          discoverability — most learners never open the skills browser). */}
      {showFollowUps && followUps.length > 0 && (
        <div className="flex justify-start pl-9" style={{ animation: 'agentRowIn 0.3s ease-out both' }}>
          <div className="flex max-w-[85%] flex-wrap gap-1.5">
            {followUps.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSuggestion(suggestion)}
                className="rounded-full border border-white/8 px-2.5 py-1.5 text-[10px] text-[#9ca3b8] transition-all hover:border-[#00e5a0]/40 hover:bg-[#00e5a0]/8 hover:text-[#e8ecf4]"
                title="Suggested next step"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {agent.isStreaming && (
        <div className="flex items-start gap-2" style={{ animation: 'agentRowIn 0.3s ease-out both' }}>
          <AssistantAvatar active />
          <div className="flex min-w-0 max-w-[85%] flex-col gap-1.5">
            <MetaLine name="MedQ Agent" time="" accent />

            {showConnectionBanner && connectionState !== 'connected' && (
              <ConnectionStatusBanner
                state={connectionState}
                note={
                  connectionState === 'offline'
                    ? undefined
                    : 'reconnecting… the agent is still finishing your answer.'
                }
              />
            )}

            {(agent.state.plan || agent.state.toolCalls.length > 0) && (
              <ExecutionTimeline
                plan={agent.state.plan}
                currentStepIndex={agent.state.currentStepIndex}
                stepResults={agent.state.stepResults}
                toolCalls={agent.state.toolCalls}
                phase={agent.state.phase}
                elapsedMs={elapsedMs}
                defaultOpen
              />
            )}

            {agent.state.memory && <MemoryBadge memory={agent.state.memory} />}

            {/* Live specialist cards — task-tool subagents streaming their own
                narration (docs' subagent rendering pattern). */}
            {agent.state.subagents.length > 0 && (
              <SubagentStreamCards subagents={agent.state.subagents} />
            )}

            {/* HITL — the gated tool is parked waiting for this decision.
                The card flips in place on decide; the run then continues. */}
            {agent.state.pendingApproval && (
              <LiveApprovalCard
                approval={agent.state.pendingApproval}
                decision={agent.state.approvalDecision}
                onDecide={(approved, remember) => onApprovalDecision?.(approved, remember)}
              />
            )}

            {agent.state.streamingText ? (
              <div
                className="rounded-2xl rounded-tl-md p-[1px]"
                style={{
                  background: 'linear-gradient(120deg, #00e5a0, #8b5cf6, #4fc3f7, #00e5a0)',
                  backgroundSize: '300% 300%',
                  animation: 'agentBorderFlow 3s linear infinite',
                }}
              >
                <div
                  className="rounded-[15px] px-3 py-2.5"
                  style={{ background: 'rgba(13,17,29,0.98)', color: '#e8ecf4' }}
                >
                  <AgentMarkdown text={agent.state.streamingText} streaming citations={agent.state.citations} webCitations={agent.state.webCitations} />
                </div>
              </div>
            ) : agent.state.phase !== 'error' ? (
              <div
                className="flex items-center gap-2.5 rounded-2xl rounded-tl-md px-3.5 py-3"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: index === 1 ? '#8b5cf6' : '#00e5a0',
                        animation: 'agentThinkingDot 1.4s ease-in-out infinite',
                        animationDelay: `${index * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10.5px] text-[#9ca3b8] capitalize">{phaseLabel}…</span>
                {elapsedMs > 3000 && (
                  <span className="ml-auto font-mono text-[9px] text-[#5a6478]">{formatDuration(elapsedMs)}</span>
                )}
              </div>
            ) : null}

            {/* The thinking-dots bubble above is the single recovering
                placeholder — no extra skeleton row (it duplicated the row
                avatar and stacked two placeholders in one turn). */}

            {agent.state.phase === 'error' && agent.state.error && (
              <ErrorCard
                problem={agent.state.error}
                impact="This turn stopped before an answer was produced."
                nextSteps={['Retry the request', 'Check the connection indicator', 'Ask a shorter question if it keeps timing out']}
                onRetry={onRetry}
                requestLabel={lastUserMessage?.content}
              />
            )}

            {/* NOTE: no Stop control here — the composer's morphing Send/Stop
                button owns cancellation (one control, one place). The ErrorCard
                above still offers Retry for failed runs. */}
          </div>
        </div>
      )}

      {/* ── Refresh-mid-run recovery row ──
          The page reloaded while the server-side run was still executing.
          The run survived the disconnect and will persist its answer; this
          honest placeholder + the panel-level poller (MedQAgentV3) pick the
          reply up the moment it lands. */}
      {awaitingServerReply && !agent.isStreaming && (
        <div className="flex items-start gap-2" style={{ animation: 'agentRowIn 0.3s ease-out both' }}>
          <AssistantAvatar active />
          <div className="flex min-w-0 max-w-[85%] flex-col gap-1.5">
            <MetaLine name="MedQ Agent" time="" accent />
            {/* Approvals restored after the refresh — the parked tool is
                still waiting server-side; deciding here resumes the run. */}
            {restoredApprovals.map((approval) => (
              <LiveApprovalCard
                key={approval.approvalId}
                approval={approval}
                decision={null}
                onDecide={(approved, remember) =>
                  onRestoredApprovalDecision?.(approval.approvalId, approved, remember)}
              />
            ))}
            <AgentSkeletonRows rows={1} withAvatar={false} />
            <div className="text-[10px] text-[#9ca3b8]">
              Finishing your previous request — the answer will appear here as soon as it’s ready.
            </div>
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
      </div>
      {showJumpToLatest && (
        <button
          type="button"
          onClick={onJumpToLatest}
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium shadow-lg transition-transform hover:scale-105"
          style={{
            background: 'rgba(11,14,26,0.95)',
            border: '1px solid rgba(0,229,160,0.4)',
            color: '#00e5a0',
            animation: 'agentCardIn 0.2s ease-out',
          }}
          aria-label="Jump to latest message"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          Latest messages
        </button>
      )}
    </div>
  );
}
