'use client';
// ─── agent-ui/conversation ──────────────────────────────────────────────────
// The chat layer around messages:
//   • ConversationEmptyState  welcome + capabilities + starter prompts
//   • PromptSuggestions       contextual starter actions (chips | cards)
//   • MessageActions          copy · retry · edit · feedback row
//   • ConnectionStatusBanner  offline / reconnecting / connected states
//   • AgentSkeletonRows      placeholder while a (re)load is in flight

import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  Brain,
  Check,
  Copy,
  Lightbulb,
  Pencil,
  RefreshCw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { AgentSkeleton, StatusDot, AgentTooltip } from './primitives';

// ── PromptSuggestions ─────────────────────────────────────────────────────────

export function PromptSuggestions({
  suggestions,
  onPick,
  variant = 'chips',
  max,
}: {
  suggestions: string[];
  onPick: (suggestion: string) => void;
  variant?: 'chips' | 'cards';
  max?: number;
}) {
  const items = max ? suggestions.slice(0, max) : suggestions;
  if (items.length === 0) return null;
  if (variant === 'cards') {
    return (
      <div className="grid gap-1.5">
        {items.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPick(suggestion)}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-all hover:scale-[1.01]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Sparkles className="h-3 w-3 shrink-0 text-[#00e5a0]" />
            <span className="text-[11px] text-[#e8ecf4]">{suggestion}</span>
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {items.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => onPick(suggestion)}
          className="rounded-full border border-white/8 px-2.5 py-1.5 text-[10px] text-[#9ca3b8] transition-all hover:border-[#00e5a0]/40 hover:bg-[#00e5a0]/8 hover:text-[#e8ecf4]"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

// ── ConversationEmptyState ────────────────────────────────────────────────────

const CAPABILITIES: Array<{ icon: React.ReactNode; title: string; blurb: string }> = [
  { icon: <Brain className="h-3.5 w-3.5" />, title: 'Generate', blurb: 'MCQs, cases & flashcards on any topic' },
  { icon: <BookOpen className="h-3.5 w-3.5" />, title: 'Explain', blurb: 'Concepts, drugs & references with sources' },
  { icon: <Lightbulb className="h-3.5 w-3.5" />, title: 'Plan', blurb: 'Study schedules and exam strategies' },
];

export function ConversationEmptyState({
  greeting,
  subline = 'Ask me anything about your studies. Drop a file, hit the mic, or just type.',
  suggestions,
  onSuggestion,
}: {
  greeting: string;
  subline?: string;
  suggestions: string[];
  onSuggestion: (suggestion: string) => void;
}) {
  return (
    <div className="py-8 text-center">
      <div className="relative mx-auto mb-3 h-16 w-16">
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #00e5a0, #8b5cf6)', animation: 'agentOrbPulse 3s ease-in-out infinite' }}
        />
        <div
          className="absolute inset-[-4px] rounded-full"
          style={{ border: '1px dashed rgba(0,229,160,0.3)', animation: 'agentThinkingDot 3s ease-in-out infinite' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
      </div>

      <div className="mb-1 text-sm font-semibold text-[#e8ecf4]">{greeting}</div>
      <div className="mb-4 text-[11px] text-[#9ca3b8]">{subline}</div>

      <div className="mx-auto mb-4 grid max-w-sm grid-cols-3 gap-1.5 px-2">
        {CAPABILITIES.map((capability) => (
          <div
            key={capability.title}
            className="rounded-xl px-2 py-2.5 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="mb-1 flex justify-center" style={{ color: '#00e5a0' }}>{capability.icon}</div>
            <div className="text-[10px] font-semibold text-[#e8ecf4]">{capability.title}</div>
            <div className="mt-0.5 text-[8.5px] leading-snug text-[#5a6478]">{capability.blurb}</div>
          </div>
        ))}
      </div>

      <PromptSuggestions suggestions={suggestions} onPick={onSuggestion} max={4} />
    </div>
  );
}

// ── MessageActions ────────────────────────────────────────────────────────────

export function MessageActions({
  copied,
  onCopy,
  onRetry,
  onEdit,
  feedback,
  onFeedback,
  meta,
  /** Read-aloud (TTS) — only rendered for assistant messages that opt in. */
  speaking,
  onSpeak,
}: {
  copied: boolean;
  onCopy: () => void;
  onRetry?: () => void;
  onEdit?: () => void;
  feedback?: 'positive' | 'negative' | null;
  onFeedback?: (feedback: 'positive' | 'negative') => void;
  /** Right-aligned meta (e.g. "3 LLM calls"). */
  meta?: string;
  speaking?: boolean;
  onSpeak?: () => void;
}) {
  const buttonClass =
    'flex items-center gap-1 rounded-md px-1.5 py-1 text-[9px] font-medium text-[#5a6478] transition-colors hover:bg-white/5 hover:text-[#e8ecf4] disabled:opacity-40';
  return (
    <div className="flex items-center gap-0.5 px-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
      {onCopy && (
        <AgentTooltip label={copied ? 'Copied' : 'Copy'}>
          <button type="button" onClick={onCopy} className={buttonClass} aria-label="Copy message">
            {copied ? <Check className="h-3 w-3 text-[#00e5a0]" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </AgentTooltip>
      )}
      {onRetry && (
        <AgentTooltip label="Ask again">
          <button type="button" onClick={onRetry} className={buttonClass} aria-label="Retry this turn">
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </AgentTooltip>
      )}
      {onEdit && (
        <AgentTooltip label="Reuse this text in the composer">
          <button type="button" onClick={onEdit} className={buttonClass} aria-label="Edit message">
            <Pencil className="h-3 w-3" /> Edit
          </button>
        </AgentTooltip>
      )}
      {onSpeak && (
        <AgentTooltip label={speaking ? 'Stop reading' : 'Read aloud'}>
          <button
            type="button"
            onClick={onSpeak}
            className={buttonClass}
            aria-label={speaking ? 'Stop reading aloud' : 'Read this answer aloud'}
          >
            {speaking ? <VolumeX className="h-3 w-3 text-[#00e5a0]" /> : <Volume2 className="h-3 w-3" />}
            {speaking ? 'Stop' : 'Listen'}
          </button>
        </AgentTooltip>
      )}
      {onFeedback && (
        <>
          <button
            type="button"
            onClick={() => onFeedback('positive')}
            className="rounded-md p-1 transition-colors hover:bg-white/5"
            style={{ color: feedback === 'positive' ? '#00e5a0' : '#5a6478' }}
            title="Good response"
            aria-label="Mark as good response"
          >
            <ThumbsUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => onFeedback('negative')}
            className="rounded-md p-1 transition-colors hover:bg-white/5"
            style={{ color: feedback === 'negative' ? '#ff5757' : '#5a6478' }}
            title="Bad response"
            aria-label="Mark as bad response"
          >
            <ThumbsDown className="h-3 w-3" />
          </button>
        </>
      )}
      {meta && <span className="ml-1 text-[9px] text-[#5a6478]">{meta}</span>}
    </div>
  );
}

// ── ConnectionStatusBanner ────────────────────────────────────────────────────

export type ConnectionState = 'connected' | 'offline' | 'reconnecting';

/**
 * Transport-level honesty: the SSE wire between browser and server can die
 * mid-turn (proxy idle timeout). While the client polls the thread store to
 * recover the finished answer, this banner explains exactly what is going on.
 */
export function ConnectionStatusBanner({ state, note }: { state: ConnectionState; note?: string }) {
  if (state === 'connected') return null;
  const offline = state === 'offline';
  const color = offline ? '#ff5757' : '#f59e0b';
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-[10.5px]"
      style={{ background: `${color}0D`, border: `1px solid ${color}2E`, color, animation: 'agentCardIn 0.25s ease-out' }}
      role="status"
      aria-live="polite"
    >
      {offline ? <WifiOff className="h-3.5 w-3.5 shrink-0" /> : <StatusDot color={color} />}
      <div className="min-w-0 flex-1">
        <span className="font-semibold">{offline ? 'You are offline' : 'Connection interrupted'}</span>
        <span className="text-[#9ca3b8]">
          {' '}
          — {note ?? (offline ? 'messages will fail until the network returns.' : 'reconnecting… the agent is still finishing your answer.')}
        </span>
      </div>
      {!offline && <Wifi className="h-3 w-3 shrink-0 animate-pulse opacity-60" />}
    </div>
  );
}

/** Warning-style notice row (used for app-level errors surfaced mid-chat). */
export function InlineWarning({ text }: { text: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-[10.5px]"
      style={{ background: 'rgba(255,87,87,0.08)', border: '1px solid rgba(255,87,87,0.25)', color: '#ff8a8a' }}
      role="alert"
    >
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
      <span className="min-w-0 flex-1">{text}</span>
    </div>
  );
}

// ── AgentSkeletonRows ─────────────────────────────────────────────────────────

/**
 * Message-shaped skeleton used while thread history or a recovery poll runs.
 * `withAvatar={false}` for rows that already render their own AssistantAvatar
 * (inline placeholders) — otherwise a shimmer avatar prefixes each row.
 */
export function AgentSkeletonRows({ rows = 2, withAvatar = true }: { rows?: number; withAvatar?: boolean }) {
  return (
    <div className="space-y-3" aria-label="Loading messages">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-start gap-2">
          {withAvatar && (
            <div className="mt-4 h-7 w-7 shrink-0 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', animation: 'agentUiShimmer 1.6s linear infinite', backgroundSize: '200% 100%' }} />
          )}
          <div className={`flex flex-col gap-1.5 ${withAvatar ? 'w-[85%]' : 'w-full'}`}>
            <AgentSkeleton lines={index % 2 === 0 ? 3 : 2} />
          </div>
        </div>
      ))}
    </div>
  );
}
