'use client';
// ─── agent-ui/feedback ──────────────────────────────────────────────────────
// Control, transparency and resilience:
//   • ErrorCard            problem · impact · next steps (+ retry)
//   • PartialSuccessBanner what succeeded vs what failed in a mixed run
//   • FeedbackControl      thumbs with an optional reason
//   • CitationList         sources gathered by knowledge searches ([K#])
//   • ActionReceipt        verified outcome of an executed UI action (+ undo)
//   • FormCard             the agent asking for missing info / configuration
//   • DiffViewer           proposed changes vs existing state

import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileText,
  Globe,
  Minus,
  Plus,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Undo2,
} from 'lucide-react';
import type { KnowledgeCitation, ToolCall, WebCitation } from '../useAgentV2Stream';
import { humanizeToolName } from './types';

// ── ErrorCard ─────────────────────────────────────────────────────────────────

export function ErrorCard({
  problem,
  impact,
  nextSteps,
  onRetry,
  requestLabel,
}: {
  problem: string;
  impact?: string;
  nextSteps?: string[];
  onRetry?: () => void;
  /** Short label of the failed request, e.g. the user's prompt. */
  requestLabel?: string;
}) {
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: 'rgba(255,87,87,0.06)', border: '1px solid rgba(255,87,87,0.3)', animation: 'agentCardIn 0.3s ease-out' }}
      role="alert"
    >
      <div className="flex items-start gap-2">
        <AlertOctagon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5757]" />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold text-[#ff8a8a]">Something went wrong</div>
          <div className="mt-0.5 text-[10.5px] leading-relaxed text-[#e8ecf4]">{problem}</div>

          {impact && (
            <div className="mt-1.5 text-[10px] leading-relaxed text-[#9ca3b8]">
              <span className="font-semibold text-[#ff8a8a]">Impact · </span>
              {impact}
            </div>
          )}

          {nextSteps && nextSteps.length > 0 && (
            <ul className="mt-1.5 space-y-0.5">
              {nextSteps.map((step) => (
                <li key={step} className="flex items-baseline gap-1.5 text-[10px] text-[#9ca3b8]">
                  <span className="text-[#5a6478]">›</span>
                  <span className="min-w-0">{step}</span>
                </li>
              ))}
            </ul>
          )}

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }}
            >
              <RefreshCw className="h-3 w-3" />
              Try again{requestLabel ? ` “${requestLabel.slice(0, 28)}${requestLabel.length > 28 ? '…' : ''}”` : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PartialSuccessBanner ──────────────────────────────────────────────────────

/** Derived from a run's ToolCalls: succeeded names on one side, failed on the
 * other — so a mixed outcome never reads as a clean success. */
export function PartialSuccessBanner({ toolCalls }: { toolCalls: ToolCall[] }) {
  const failed = toolCalls.filter((tc) => tc.status === 'failed');
  const succeeded = toolCalls.filter((tc) => tc.status === 'completed');
  if (failed.length === 0 || succeeded.length === 0) return null;
  return (
    <div
      className="rounded-xl px-3 py-2"
      style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', animation: 'agentCardIn 0.3s ease-out' }}
      role="status"
    >
      <div className="text-[10px] font-semibold text-[#f59e0b]">
        Partial success — {succeeded.length} tool {succeeded.length === 1 ? 'call' : 'calls'} succeeded, {failed.length} failed
      </div>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[9.5px]">
        <span className="text-[#00e5a0]">✓ {succeeded.map((tc) => humanizeToolName(tc.toolName)).slice(0, 4).join(', ')}</span>
        <span className="text-[#ff8a8a]">✗ {failed.map((tc) => humanizeToolName(tc.toolName)).slice(0, 4).join(', ')}</span>
      </div>
    </div>
  );
}

// ── FeedbackControl ───────────────────────────────────────────────────────────

const REASONS = ['Too generic', 'Factually off', 'Not what I asked', 'Too long', 'Too short'];

export function FeedbackControl({
  value,
  onChange,
}: {
  value: 'positive' | 'negative' | null;
  onChange: (next: 'positive' | 'negative' | null, reason?: string) => void;
}) {
  const [showReasons, setShowReasons] = useState(false);
  const [reason, setReason] = useState<string | undefined>();

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={() => {
          const next = value === 'positive' ? null : 'positive';
          onChange(next);
          setShowReasons(false);
        }}
        className="rounded-md p-1 transition-colors hover:bg-white/5"
        style={{ color: value === 'positive' ? '#00e5a0' : '#5a6478' }}
        aria-pressed={value === 'positive'}
        aria-label="Good response"
        title="Good response"
      >
        <ThumbsUp className="h-3 w-3" />
      </button>
      <button
        type="button"
        onClick={() => {
          const next = value === 'negative' ? null : 'negative';
          onChange(next);
          if (next === 'negative') setShowReasons(true);
          else setReason(undefined);
        }}
        className="rounded-md p-1 transition-colors hover:bg-white/5"
        style={{ color: value === 'negative' ? '#ff5757' : '#5a6478' }}
        aria-pressed={value === 'negative'}
        aria-label="Bad response — tell us why"
        title="Bad response — tell us why"
      >
        <ThumbsDown className="h-3 w-3" />
      </button>

      {showReasons && value === 'negative' && (
        <span className="flex flex-wrap items-center gap-1">
          {REASONS.map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => {
                const next = reason === candidate ? undefined : candidate;
                setReason(next);
                onChange('negative', next);
              }}
              className="rounded-full px-1.5 py-0.5 text-[8.5px] transition-colors"
              style={{
                background: reason === candidate ? 'rgba(255,87,87,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${reason === candidate ? 'rgba(255,87,87,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: reason === candidate ? '#ff8a8a' : '#9ca3b8',
              }}
            >
              {candidate}
            </button>
          ))}
        </span>
      )}
    </div>
  );
}

// ── CitationList ──────────────────────────────────────────────────────────────

/** Knowledge-tool relevance arrives normalized 0-100 (knowledge.ts multiplies
 *  at the source). Older/hand-made payloads occasionally carry 0-1 fractions —
 *  normalize BOTH at display time so the card never shows "10000%". */
function formatRelevance(relevance: number): string {
  const pct = relevance > 1 ? relevance : relevance * 100;
  return `${Math.min(100, Math.round(pct))}%`;
}

// ── WebCitationList ─────────────────────────────────────────────────────────

/** Web sources gathered by search_medical_references ([S#]) — each entry is
 *  a real clickable link (new tab) with title, host and snippet. This is the
 *  card that replaces the raw URL dumps the model used to paste inline. */
export function WebCitationList({ webCitations }: { webCitations: WebCitation[] }) {
  const [open, setOpen] = useState(true);
  if (webCitations.length === 0) return null;
  return (
    <div className="rounded-xl" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.22)' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        {open ? <ChevronDown className="h-3 w-3 text-[#fbbf24]" /> : <ChevronRight className="h-3 w-3 text-[#fbbf24]" />}
        <Globe className="h-3 w-3 text-[#fbbf24]" />
        <span className="text-[10.5px] font-semibold text-[#fbbf24]">
          Web sources <span className="text-[#9ca3b8]">· {webCitations.length} linked</span>
        </span>
      </button>
      {open && (
        <ol className="space-y-1.5 border-t px-3 py-2" style={{ borderColor: 'rgba(251,191,36,0.15)' }}>
          {webCitations.map((citation, index) => (
            <li key={`${citation.ref}-${index}`} className="flex items-start gap-2">
              <span className="shrink-0 rounded-md px-1 py-0.5 font-mono text-[8.5px] font-semibold" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>
                {citation.ref}
              </span>
              <div className="min-w-0 flex-1">
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10.5px] font-medium text-[#e8ecf4] underline decoration-[#fbbf24]/40 underline-offset-2 transition-colors hover:text-[#fbbf24] hover:decoration-[#fbbf24]"
                >
                  <span className="truncate">{citation.title}</span>
                  <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-60" />
                </a>
                {citation.host && (
                  <div className="mt-0.5 text-[9px] text-[#5a6478]">{citation.host}{citation.date ? ` · ${citation.date}` : ''}</div>
                )}
                {citation.snippet && (
                  <p className="mt-0.5 line-clamp-2 text-[9.5px] leading-relaxed text-[#9ca3b8]">{citation.snippet}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function CitationList({ citations }: { citations: KnowledgeCitation[] }) {
  const [open, setOpen] = useState(false);
  if (citations.length === 0) return null;
  return (
    <div className="rounded-xl" style={{ background: 'rgba(79,195,247,0.05)', border: '1px solid rgba(79,195,247,0.22)' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        {open ? <ChevronDown className="h-3 w-3 text-[#4fc3f7]" /> : <ChevronRight className="h-3 w-3 text-[#4fc3f7]" />}
        <BookOpen className="h-3 w-3 text-[#4fc3f7]" />
        <span className="text-[10.5px] font-semibold text-[#4fc3f7]">
          Sources <span className="text-[#9ca3b8]">· {citations.length} cited</span>
        </span>
      </button>
      {open && (
        <ol className="space-y-1.5 border-t px-3 py-2" style={{ borderColor: 'rgba(79,195,247,0.15)' }}>
          {citations.map((citation, index) => (
            <li key={`${citation.ref}-${index}`} className="flex items-start gap-2">
              <span className="shrink-0 rounded-md px-1 py-0.5 font-mono text-[8.5px] font-semibold" style={{ background: 'rgba(79,195,247,0.12)', color: '#4fc3f7' }}>
                {citation.ref}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[10.5px] font-medium text-[#e8ecf4]">{citation.title}</span>
                  {citation.relevance != null && (
                    <span className="shrink-0 text-[8.5px] text-[#5a6478]">{formatRelevance(citation.relevance)}</span>
                  )}
                </div>
                {citation.excerpt && (
                  <p className="mt-0.5 line-clamp-2 text-[9.5px] leading-relaxed text-[#9ca3b8]">{citation.excerpt}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ── ActionReceipt ─────────────────────────────────────────────────────────────

/** Verified outcome of an executed UI action (navigation, save, schedule…).
 * `onUndo` renders an Undo chip — only wire it for genuinely reversible
 * operations (e.g. navigate back to the previous tab). */
export function ActionReceipt({
  label,
  onUndo,
  undoLabel = 'Undo',
}: {
  label: string;
  onUndo?: () => void;
  undoLabel?: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9.5px]"
      style={{ background: 'rgba(0,229,160,0.07)', border: '1px solid rgba(0,229,160,0.25)', color: '#00e5a0' }}
      role="status"
    >
      <Check className="h-2.5 w-2.5" />
      <span className="truncate">{label}</span>
      {onUndo && (
        <button
          type="button"
          onClick={onUndo}
          className="ml-0.5 inline-flex items-center gap-0.5 rounded-full px-1 py-px text-[8.5px] font-semibold transition-colors hover:bg-[#00e5a0]/10"
          style={{ color: '#7dffd4' }}
          aria-label={undoLabel}
        >
          <Undo2 className="h-2.5 w-2.5" />
          {undoLabel}
        </button>
      )}
    </div>
  );
}

// ── FormCard ──────────────────────────────────────────────────────────────────

export interface FormFieldSpec {
  label: string;
  hint?: string;
  example?: string;
  required?: boolean;
}

/** The agent asking for missing information or configuration. Submitting
 * routes through the chat composer (prefill) so the whole exchange stays in
 * one thread — no shadow form state. */
export function FormCard({
  title,
  description,
  fields,
  onAnswer,
}: {
  title: string;
  description?: string;
  fields: FormFieldSpec[];
  onAnswer: (prefill: string) => void;
}) {
  return (
    <div className="rounded-xl p-3" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.25)', animation: 'agentCardIn 0.3s ease-out' }}>
      <div className="flex items-center gap-2">
        <ClipboardList className="h-3.5 w-3.5 text-[#8b5cf6]" />
        <span className="text-[11px] font-semibold text-[#8b5cf6]">{title}</span>
      </div>
      {description && <p className="mt-1 text-[10px] leading-relaxed text-[#9ca3b8]">{description}</p>}
      <div className="mt-2 space-y-1.5">
        {fields.map((field) => (
          <div key={field.label} className="flex items-start gap-1.5 text-[10px]">
            <span className="mt-0.5 shrink-0" style={{ color: field.required ? '#ff8a8a' : '#5a6478' }}>
              {field.required ? '●' : '○'}
            </span>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-[#e8ecf4]">{field.label}</span>
              {field.hint && <span className="text-[#9ca3b8]"> — {field.hint}</span>}
              {field.example && <span className="block font-mono text-[9px] text-[#5a6478]">e.g. {field.example}</span>}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          onAnswer(
            `About “${title}”:\n${fields.map((f) => `- ${f.label}: `).join('\n')}`.trim(),
          )
        }
        className="mt-2 inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-transform hover:scale-[1.02]"
        style={{ background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.35)' }}
      >
        <ExternalLink className="h-3 w-3" /> Answer in chat
      </button>
    </div>
  );
}

// ── DiffViewer ────────────────────────────────────────────────────────────────

interface DiffLine {
  kind: 'same' | 'add' | 'remove';
  text: string;
}

/** Small LCS line diff — plenty for question-edit scale (tens of lines). */
function diffLines(before: string[], after: string[]): DiffLine[] {
  const n = before.length;
  const m = after.length;
  const table: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      table[i][j] = before[i] === after[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (before[i] === after[j]) {
      out.push({ kind: 'same', text: before[i] });
      i++;
      j++;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      out.push({ kind: 'remove', text: before[i] });
      i++;
    } else {
      out.push({ kind: 'add', text: after[j] });
      j++;
    }
  }
  while (i < n) out.push({ kind: 'remove', text: before[i++] });
  while (j < m) out.push({ kind: 'add', text: after[j++] });
  return out;
}

export function DiffViewer({ before, after, fileLabel }: { before: string; after: string; fileLabel?: string }) {
  const lines = useMemo(() => {
    const b = before.split('\n');
    const a = after.split('\n');
    return diffLines(b, a);
  }, [before, after]);
  const added = lines.filter((l) => l.kind === 'add').length;
  const removed = lines.filter((l) => l.kind === 'remove').length;

  return (
    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.1)', animation: 'agentCardIn 0.3s ease-out' }}>
      <div className="flex items-center gap-2 border-b px-3 py-1.5" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
        <FileText className="h-3 w-3 text-[#9ca3b8]" />
        <span className="truncate text-[10px] font-semibold text-[#e8ecf4]">{fileLabel ?? 'Proposed changes'}</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px]">
          <span className="inline-flex items-center gap-0.5 text-[#00e5a0]"><Plus className="h-2.5 w-2.5" />{added}</span>
          <span className="inline-flex items-center gap-0.5 text-[#ff8a8a]"><Minus className="h-2.5 w-2.5" />{removed}</span>
        </span>
      </div>
      <div className="max-h-64 overflow-auto font-mono text-[9.5px] leading-relaxed">
        {lines.map((line, index) => (
          <div
            key={index}
            className="flex items-start gap-1.5 px-2 py-px"
            style={{
              background: line.kind === 'add' ? 'rgba(0,229,160,0.08)' : line.kind === 'remove' ? 'rgba(255,87,87,0.08)' : 'transparent',
            }}
          >
            <span className="w-2.5 shrink-0 text-center" style={{ color: line.kind === 'add' ? '#00e5a0' : line.kind === 'remove' ? '#ff8a8a' : '#5a6478' }}>
              {line.kind === 'add' ? '+' : line.kind === 'remove' ? '−' : ' '}
            </span>
            <span className="whitespace-pre-wrap" style={{ color: line.kind === 'same' ? '#9ca3b8' : '#e8ecf4', textDecoration: line.kind === 'remove' ? 'line-through' : 'none' }}>
              {line.text || ' '}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
