'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Calendar,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  Columns,
  FileText,
  GitBranch,
  Image as ImageIcon,
  Lightbulb,
  ListChecks,
  Loader2,
  Pill,
  Save,
  Search,
  Sparkles,
  Target,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import type { AgentAction, AgentV2State, MessageCard, Plan, SavedQuestionPayload, ToolCall } from './useAgentV2Stream';
// agent-ui rich-output components (imported from the concrete modules — NOT
// the barrel — so renderCard can dispatch to them without a circular import:
// execution.tsx and feedback.tsx depend only on the stream hook's types).
import { ApprovalCard } from './agent-ui/execution';
import { DiffViewer, FormCard } from './agent-ui/feedback';

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "Burning the midnight oil? I'm here to help!";
  if (hour < 12) return 'Good morning! Ready to study?';
  if (hour < 17) return "Good afternoon! Let's keep the momentum going.";
  if (hour < 21) return 'Good evening! Great time for a review session.';
  return "Late night study session? I've got your back!";
}

export function renderSimpleMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|!\[[^\]]*\]\([^)]+\))/g);
  return parts.map((part, index) => {
    // Markdown image — ![alt](url). Lets the agent embed generated
    // illustrations (generate_medical_illustration tool results) directly in
    // the chat so the learner sees the image inline, not just a URL string.
    if (part.startsWith('![') && part.endsWith(')')) {
      const match = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (match) {
        return (
          <img
            key={`img-${index}`}
            src={match[2]}
            alt={match[1] || 'Generated medical illustration'}
            className="mt-2 mb-1 max-w-full rounded-xl"
            style={{
              maxHeight: 260,
              objectFit: 'contain',
              border: '1px solid rgba(0, 229, 160, 0.25)',
            }}
            loading="lazy"
          />
        );
      }
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1 py-0.5 rounded bg-[rgba(0,229,160,0.1)] text-[#00e5a0] text-[11px] font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part.split('\n').map((line, lineIndex) => (
      <React.Fragment key={`${index}-${lineIndex}`}>
        {lineIndex > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  });
}

export function PlanCard({
  plan,
  currentStepIndex,
  stepResults,
}: {
  plan: Plan;
  currentStepIndex: number;
  stepResults: AgentV2State['stepResults'];
}) {
  return (
    <div className="rounded-xl p-3 mt-2" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,229,160,0.05))', border: '1px solid rgba(139,92,246,0.2)', animation: 'agentCardIn 0.3s ease-out' }}>
      <div className="flex items-center gap-2 mb-2">
        <ListChecks className="w-3.5 h-3.5 text-[#8b5cf6]" />
        <div className="text-xs font-semibold text-[#8b5cf6]">Plan</div>
        <div className="text-[10px] text-[#9ca3b8] truncate flex-1">{plan.reasoning}</div>
      </div>
      <div className="space-y-1">
        {plan.steps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isDone = stepResults[index]?.done;
          const elapsed = stepResults[index]?.elapsedMs;
          return (
            <div key={step.id} className="flex items-start gap-2 text-[11px] px-2 py-1.5 rounded-md transition-colors" style={{ background: isCurrent ? 'rgba(139,92,246,0.1)' : 'transparent', animation: `agentPlanStep 0.25s ease-out ${index * 0.08}s both` }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: isDone ? '#00e5a0' : isCurrent ? '#8b5cf6' : 'rgba(255,255,255,0.08)', color: isDone || isCurrent ? '#fff' : '#5a6478' }}>
                {isDone ? <Check className="w-2.5 h-2.5" /> : isCurrent ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <span className="text-[9px]">{index + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className={isDone ? 'text-[#9ca3b8] line-through' : isCurrent ? 'text-[#e8ecf4] font-medium' : 'text-[#9ca3b8]'}>{step.description}</div>
                {step.toolHint && <div className="text-[9px] text-[#5a6478] mt-0.5 font-mono">→ {step.toolHint}{isDone && elapsed ? ` · ${elapsed}ms` : ''}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ToolCallChip({ tc }: { tc: ToolCall }) {
  const isRunning = tc.status === 'running';
  const isFailed = tc.status === 'failed';
  const elapsedMs = tc.endedAt && tc.startedAt ? tc.endedAt - tc.startedAt : undefined;
  const elapsedLabel =
    elapsedMs == null ? '' : elapsedMs < 1000 ? `${elapsedMs}ms` : `${(elapsedMs / 1000).toFixed(1)}s`;
  const accent = isRunning ? '#f59e0b' : isFailed ? '#ff5757' : '#00e5a0';
  const icon =
    isRunning ? <Loader2 className="w-2.5 h-2.5 animate-spin" />
    : isFailed ? <X className="w-2.5 h-2.5" />
    : <Check className="w-2.5 h-2.5" />;
  const toolIcon = TOOL_ICONS[tc.toolName] ?? <Wrench className="w-2.5 h-2.5" />;
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px]"
      style={{
        background: isRunning ? 'rgba(245,158,11,0.1)' : isFailed ? 'rgba(255,87,87,0.1)' : 'rgba(0,229,160,0.1)',
        border: `1px solid ${isRunning ? 'rgba(245,158,11,0.3)' : isFailed ? 'rgba(255,87,87,0.3)' : 'rgba(0,229,160,0.3)'}`,
        color: accent,
        animation: 'agentCardIn 0.2s ease-out',
      }}
      title={isFailed ? `Tool failed${tc.result ? `: ${tc.result.slice(0, 140)}` : ''}` : `Tool ${tc.toolName}${elapsedLabel ? ` · ${elapsedLabel}` : ''}`}
    >
      {icon}
      <span className="inline-flex items-center gap-1">
        {toolIcon}
        {tc.toolName}
      </span>
      {!isRunning && elapsedLabel && <span className="text-[8.5px] opacity-60">{elapsedLabel}</span>}
    </div>
  );
}

/** Per-tool icons for the floating assistant's tool chips. */
const TOOL_ICONS: Record<string, React.ReactNode> = {
  search_medical_references: <Search className="w-2.5 h-2.5" />,
  generate_medical_illustration: <ImageIcon className="w-2.5 h-2.5" />,
  run_question_generation_agent: <Sparkles className="w-2.5 h-2.5" />,
  save_question: <Save className="w-2.5 h-2.5" />,
  create_schedule_task: <Calendar className="w-2.5 h-2.5" />,
  task: <GitBranch className="w-2.5 h-2.5" />,
  query_knowledge_base: <BookOpen className="w-2.5 h-2.5" />,
};

export function MemoryBadge({ memory }: { memory: NonNullable<AgentV2State['memory']> }) {
  if (memory.summaryTurnCount === 0 && memory.episodes.length === 0) return null;
  const total = memory.episodes.length;
  return <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] mb-2" style={{ background: 'rgba(79,195,247,0.08)', border: '1px solid rgba(79,195,247,0.25)', color: '#4fc3f7' }} title={memory.episodes.map((episode) => `${(episode.score * 100).toFixed(0)}%: "${episode.userMessage.slice(0, 60)}"`).join('\n')}>
    <Brain className="w-2.5 h-2.5" />
    <span>Recalled {total} past turn{total === 1 ? '' : 's'}{memory.summaryTurnCount > 0 ? ` · summary of ${memory.summaryTurnCount} turns` : ''}</span>
  </div>;
}

const CARD_ICONS: Record<string, React.ReactNode> = {
  drug: <Pill className="w-3.5 h-3.5" />, question: <Brain className="w-3.5 h-3.5" />, stat: <Zap className="w-3.5 h-3.5" />, tip: <Lightbulb className="w-3.5 h-3.5" />, navigation: <ArrowRight className="w-3.5 h-3.5" />, action: <Target className="w-3.5 h-3.5" />, context: <span />, file: <FileText className="w-3.5 h-3.5" />, image_analysis: <ImageIcon className="w-3.5 h-3.5" />, table: <BarChart3 className="w-3.5 h-3.5" />, chart: <BarChart3 className="w-3.5 h-3.5" />, calendar: <Calendar className="w-3.5 h-3.5" />, kanban: <Columns className="w-3.5 h-3.5" />, timeline: <Clock className="w-3.5 h-3.5" />, workflow: <GitBranch className="w-3.5 h-3.5" />, approval: <CheckSquare className="w-3.5 h-3.5" />, interactive: <Sparkles className="w-3.5 h-3.5" />,
};

const CARD_COLORS: Record<string, string> = {
  drug: '#ff5757', question: '#00e5a0', stat: '#f59e0b', tip: '#8b5cf6', navigation: '#4fc3f7', action: '#00e5a0', context: '#8b5cf6', file: '#4fc3f7', image_analysis: '#8b5cf6', table: '#4fc3f7', chart: '#00e5a0', calendar: '#f59e0b', kanban: '#8b5cf6', timeline: '#4fc3f7', workflow: '#00e5a0', approval: '#ff5757', interactive: '#00e5a0',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#00e5a0',
  medium: '#f59e0b',
  hard: '#ff5757',
  'very hard': '#ff5757',
};

// ── Interactive question-card helpers ──────────────────────────────────────

const normAnswer = (s: string) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

/** Index of the correct option (letter answers like "a"/"B" resolve to the
 *  option position), or -1 when it can't be matched. */
function correctOptionIndex(q: SavedQuestionPayload): number {
  const a = normAnswer(q.answer);
  let idx = q.options.findIndex((o) => normAnswer(o) === a);
  if (idx === -1) idx = q.options.findIndex((o) => a.length > 3 && (a.startsWith(normAnswer(o)) || normAnswer(o).startsWith(a)));
  if (idx === -1 && /^[a-e]$/.test(a)) idx = a.charCodeAt(0) - 97;
  return idx;
}

function isSelectedCorrect(selected: string, q: SavedQuestionPayload): boolean {
  const s = normAnswer(selected);
  const a = normAnswer(q.answer);
  if (s === a) return true;
  // selected a letter → compare the option it points at with the key
  if (/^[a-e]$/.test(s)) {
    const opt = q.options[s.charCodeAt(0) - 97];
    if (opt != null) {
      const o = normAnswer(opt);
      if (o === a || (a.length > 3 && (a.startsWith(o) || o.startsWith(a)))) return true;
    }
  }
  // key is a letter → compare the selected option with that position
  if (/^[a-e]$/.test(a)) {
    const opt = q.options[a.charCodeAt(0) - 97];
    if (opt != null && normAnswer(opt) === s) return true;
  }
  return false;
}

/**
 * ChatQuestionCard — a saved question rendered as a REAL, answerable quiz
 * card inside the chat (options, correct/incorrect feedback, explanation,
 * clinical pearl, image). Falls back to nothing — the caller renders the
 * legacy static preview when `question` is missing.
 */
function ChatQuestionCard({
  question: q,
  topic,
  pills,
  onAction,
  action,
  animateDelay,
}: {
  question: SavedQuestionPayload;
  topic: string;
  pills: string[];
  onAction?: (action: AgentAction) => void;
  action?: { label: string; tab: string };
  animateDelay: number;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const isMCQ = q.type === 'mcq' && q.options.length >= 2;
  const options: string[] = isMCQ
    ? q.options
    : q.type === 'tf'
      ? (q.options.length >= 2 ? q.options : ['True', 'False'])
      : [];
  const correctIdx = options.length > 0 ? correctOptionIndex(q) : -1;
  const gotItRight = revealed && selected != null && isSelectedCorrect(selected, q);
  const longStem = q.text.length > 260;
  const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const handleSelect = (option: string) => {
    if (revealed) return; // one attempt, like a real exam
    setSelected(option);
    setRevealed(true);
  };

  const difficultyColor = DIFFICULTY_COLORS[(pills[0] ?? '').toLowerCase()] ?? '#9ca3b8';

  return (
    <div
      className="mt-2 overflow-hidden rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${gotItRight ? 'rgba(0,229,160,0.45)' : revealed ? 'rgba(255,87,87,0.4)' : 'rgba(0,229,160,0.22)'}`,
        animation: `agentCardIn 0.35s ease-out ${animateDelay}s both`,
      }}
    >
      {/* header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: 'linear-gradient(135deg, rgba(0,229,160,0.12), rgba(139,92,246,0.08))', borderBottom: '1px solid rgba(0,229,160,0.14)' }}
      >
        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}>
          <Brain className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11.5px] font-semibold text-[#e8ecf4] truncate">{topic}</div>
          <div className="flex items-center gap-1 text-[9px] text-[#00e5a0] mt-0.5">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Saved to question bank · try it right here</span>
          </div>
        </div>
        {pills.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end shrink-0">
            {pills.slice(0, 2).map((pill, i) => {
              const color = i === 0 ? difficultyColor : '#4fc3f7';
              return (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-semibold tracking-wide uppercase"
                  style={{ background: `${color}14`, border: `1px solid ${color}30`, color }}
                >
                  {pill}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-3 py-2.5 space-y-2">
        {/* stem */}
        {q.text && (
          <p className={`text-[11px] leading-[1.55] text-[#cdd5e3] whitespace-pre-line ${longStem && !expanded ? 'line-clamp-4' : ''}`}>
            {q.text.replace(/<[^>]*>/g, '')}
          </p>
        )}
        {longStem && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-[#4fc3f7] hover:text-[#7fd8ff]"
          >
            <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            {expanded ? 'Show less' : 'Show full question'}
          </button>
        )}

        {/* image */}
        {q.imageUrl && (
          <img
            src={q.imageUrl}
            alt={q.topic ? `${q.topic} illustration` : 'Question illustration'}
            className="max-w-full rounded-lg"
            style={{ maxHeight: 180, objectFit: 'contain', border: '1px solid rgba(0,229,160,0.25)' }}
            loading="lazy"
          />
        )}

        {/* options */}
        {options.length > 0 ? (
          <div className="space-y-1.5">
            {options.map((option, i) => {
              const isCorrectOption = i === correctIdx;
              const isSelectedOption = selected === option;
              let bg = 'rgba(255,255,255,0.03)';
              let border = 'rgba(255,255,255,0.08)';
              let color = '#cdd5e3';
              let letterBg = 'rgba(255,255,255,0.07)';
              let letterColor = '#9ca3b8';
              if (!revealed) {
                border = 'rgba(255,255,255,0.08)';
              }
              if (!revealed && isSelectedOption) {
                border = 'rgba(0,229,160,0.5)';
              }
              if (revealed && isCorrectOption) {
                bg = 'rgba(0,229,160,0.10)';
                border = 'rgba(0,229,160,0.5)';
                color = '#00e5a0';
                letterBg = 'rgba(0,229,160,0.2)';
                letterColor = '#00e5a0';
              } else if (revealed && isSelectedOption) {
                bg = 'rgba(255,87,87,0.10)';
                border = 'rgba(255,87,87,0.5)';
                color = '#ff8a8a';
                letterBg = 'rgba(255,87,87,0.2)';
                letterColor = '#ff8a8a';
              } else if (revealed) {
                color = '#5a6478';
              }
              return (
                <button
                  key={`${i}-${option.slice(0, 24)}`}
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={revealed}
                  className="w-full flex items-start gap-2 rounded-lg px-2 py-1.5 text-left transition-all"
                  style={{ background: bg, border: `1px solid ${border}`, cursor: revealed ? 'default' : 'pointer' }}
                >
                  <span
                    className="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-[1px] text-[9px] font-bold font-mono"
                    style={{ background: letterBg, color: letterColor }}
                  >
                    {revealed && isCorrectOption ? <Check className="w-2.5 h-2.5" /> : revealed && isSelectedOption ? <X className="w-2.5 h-2.5" /> : OPTION_LETTERS[i] ?? i + 1}
                  </span>
                  <span className="text-[10.5px] leading-[1.5] flex-1 min-w-0" style={{ color }}>{option.replace(/<[^>]*>/g, '')}</span>
                </button>
              );
            })}
            {!revealed && (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="text-[9px] text-[#5a6478] hover:text-[#8b95a8] italic transition-colors"
              >
                (or reveal the answer without answering)
              </button>
            )}
          </div>
        ) : (
          // short-answer style question — just a reveal button
          <div>
            {!revealed ? (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="w-full py-2 rounded-lg text-[10.5px] font-semibold text-[#00e5a0] transition-colors hover:bg-[rgba(0,229,160,0.08)]"
                style={{ background: 'rgba(0,229,160,0.05)', border: '1px solid rgba(0,229,160,0.25)' }}
              >
                Reveal answer
              </button>
            ) : (
              <div className="rounded-lg px-2.5 py-2 text-[10.5px] leading-relaxed" style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.3)' }}>
                <span className="text-[8.5px] font-semibold tracking-wide text-[#5a6478] uppercase block mb-0.5">Answer</span>
                <span className="text-[#00e5a0] font-semibold">{q.answer.replace(/<[^>]*>/g, '')}</span>
              </div>
            )}
          </div>
        )}

        {/* feedback + explanation */}
        {revealed && (
          <div className="rounded-lg px-2.5 py-2 space-y-2" style={{ background: gotItRight ? 'rgba(0,229,160,0.06)' : selected == null ? 'rgba(79,195,247,0.06)' : 'rgba(255,87,87,0.06)', border: `1px solid ${gotItRight ? 'rgba(0,229,160,0.25)' : selected == null ? 'rgba(79,195,247,0.25)' : 'rgba(255,87,87,0.25)'}` }}>
            <div className="flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: gotItRight ? '#00e5a0' : selected == null ? '#4fc3f7' : '#ff8a8a' }}>
              {gotItRight ? <CheckCircle2 className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
              {gotItRight ? 'Correct!' : selected == null ? 'Answer revealed' : 'Not quite — the correct option is highlighted'}
            </div>
            {options.length > 0 && (
              <div className="text-[10px] text-[#cdd5e3] leading-relaxed">
                <span className="text-[#5a6478] font-semibold">Answer: </span>
                <span className="text-[#00e5a0] font-semibold">{q.answer.replace(/<[^>]*>/g, '')}</span>
              </div>
            )}
            {q.explanation && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowExplanation((v) => !v)}
                  className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wide text-[#8b5cf6] hover:text-[#a78bfa]"
                >
                  <Lightbulb className="w-3 h-3" />
                  Explanation
                  <ChevronDown className={`w-3 h-3 transition-transform ${showExplanation ? 'rotate-180' : ''}`} />
                </button>
                {showExplanation && (
                  <p className="mt-1 text-[10px] leading-[1.6] text-[#cdd5e3]">{q.explanation.replace(/<[^>]*>/g, '')}</p>
                )}
              </div>
            )}
            {q.clinicalPearl && (
              <div className="flex items-start gap-1.5 rounded-md px-2 py-1.5" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Sparkles className="w-3 h-3 text-[#f59e0b] shrink-0 mt-0.5" />
                <p className="text-[9.5px] leading-[1.5] text-[#ffd28a]">{q.clinicalPearl.replace(/<[^>]*>/g, '')}</p>
              </div>
            )}
            {q.mnemonic && (
              <div className="flex items-start gap-1.5">
                <Brain className="w-3 h-3 text-[#4fc3f7] shrink-0 mt-0.5" />
                <p className="text-[9.5px] italic text-[#9ca3b8]">{q.mnemonic.replace(/<[^>]*>/g, '')}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* footer CTA */}
      {action && (
        <button
          type="button"
          onClick={() => action.tab && onAction?.({ type: 'navigate_to_tab', params: { tab: action.tab }, description: `Navigate to ${action.tab}` })}
          className="flex w-full items-center justify-center gap-1 py-1.5 text-[10.5px] font-semibold text-[#00e5a0] transition-colors hover:bg-[rgba(0,229,160,0.1)]"
          style={{ borderTop: '1px solid rgba(0,229,160,0.14)', background: 'rgba(0,229,160,0.04)' }}
        >
          {action.label}
          <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

/** Rich rendering for saved-question cards (generation.saved events): a
 *  bank-entry look with difficulty pills, preview, answer and a CTA button. */
function renderQuestionCard(card: MessageCard, index: number, onAction?: (action: AgentAction) => void) {
  const details = card.details ?? {};
  const savedMatch = /^Question\s+\d+\s+saved\s+—\s+(.*)$/i.exec(card.title);
  const topic = savedMatch ? savedMatch[1] : card.title;
  const pills = (card.subtitle ?? '').split('·').map((part) => part.trim()).filter(Boolean);
  const preview = String(details.Question ?? '').replace(/…$/, '');
  const answer = details.Answer != null ? String(details.Answer) : '';
  const difficultyColor = DIFFICULTY_COLORS[(pills[0] ?? '').toLowerCase()] ?? '#9ca3b8';

  // Full payload → interactive, answerable card.
  if (card.question && typeof card.question === 'object') {
    return (
      <ChatQuestionCard
        key={`q-${(card.question as SavedQuestionPayload).id ?? index}`}
        question={card.question as SavedQuestionPayload}
        topic={topic}
        pills={pills}
        onAction={onAction}
        action={card.action}
        animateDelay={Math.min(index, 6) * 0.08}
      />
    );
  }

  return (
    <div
      key={index}
      className="mt-2 overflow-hidden rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,229,160,0.22)',
        animation: `agentCardIn 0.35s ease-out ${Math.min(index, 6) * 0.08}s both`,
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: 'linear-gradient(135deg, rgba(0,229,160,0.12), rgba(139,92,246,0.08))', borderBottom: '1px solid rgba(0,229,160,0.14)' }}
      >
        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}>
          <Brain className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11.5px] font-semibold text-[#e8ecf4] truncate">{topic}</div>
          <div className="flex items-center gap-1 text-[9px] text-[#00e5a0] mt-0.5">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Saved to question bank</span>
          </div>
        </div>
      </div>

      <div className="px-3 py-2 space-y-2">
        {pills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {pills.map((pill, pillIndex) => {
              const color = pillIndex === 0 ? difficultyColor : pillIndex === 1 ? '#4fc3f7' : '#8b5cf6';
              return (
                <span
                  key={`${index}-${pill}`}
                  className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wide uppercase"
                  style={{ background: `${color}14`, border: `1px solid ${color}30`, color }}
                >
                  {pill}
                </span>
              );
            })}
          </div>
        )}
        {preview && (
          <p className="text-[11px] leading-[1.55] text-[#cdd5e3] line-clamp-3">{preview}</p>
        )}
        <div className="flex items-center justify-between gap-2">
          {answer && (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[8.5px] font-semibold tracking-wide text-[#5a6478] uppercase shrink-0">Answer</span>
              <span className="truncate rounded-md px-1.5 py-0.5 font-mono text-[10.5px] font-semibold text-[#00e5a0]" style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)' }}>
                {answer}
              </span>
            </div>
          )}
          <span className="flex items-center gap-1 text-[9px] text-[#9ca3b8] italic">
            <Clock className="w-2.5 h-2.5" /> Pending review
          </span>
        </div>
      </div>

      {card.action && (
        <button
          type="button"
          onClick={() => card.action?.tab && onAction?.({ type: 'navigate_to_tab', params: { tab: card.action.tab }, description: `Navigate to ${card.action.tab}` })}
          className="flex w-full items-center justify-center gap-1 py-1.5 text-[10.5px] font-semibold text-[#00e5a0] transition-colors hover:bg-[rgba(0,229,160,0.1)]"
          style={{ borderTop: '1px solid rgba(0,229,160,0.14)', background: 'rgba(0,229,160,0.04)' }}
        >
          {card.action.label}
          <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

/** Extra wiring renderCard hands to rich-output cards. `onPrefill` lets the
 * FormCard route its answer through the chat composer (one thread, no shadow
 * form state); `onApprovalDecision` is a local visual ack for ApprovalCards. */
export interface RenderCardExtras {
  onPrefill?: (text: string) => void;
  onApprovalDecision?: (approved: boolean) => void;
}

export function renderCard(
  card: MessageCard,
  index: number,
  onAction?: (action: AgentAction) => void,
  extras?: RenderCardExtras,
) {
  if (card.type === 'question') return renderQuestionCard(card, index, onAction);

  // FormCard — the agent asking for missing info/configuration.
  if (card.type === 'form') {
    const rawFields = Array.isArray(card.fields) ? (card.fields as unknown[]) : [];
    const fields = rawFields
      .map((raw): { label: string; hint?: string; example?: string; required?: boolean } | null => {
        if (typeof raw === 'string') return { label: raw };
        if (raw && typeof raw === 'object' && typeof (raw as Record<string, unknown>).label === 'string') {
          const item = raw as Record<string, unknown>;
          return {
            label: String(item.label),
            hint: item.hint ? String(item.hint) : undefined,
            example: item.example ? String(item.example) : undefined,
            required: item.required === true,
          };
        }
        return null;
      })
      .filter((f): f is { label: string; hint?: string; example?: string; required?: boolean } => f !== null);
    if (fields.length === 0) return null;
    return (
      <FormCard
        key={index}
        title={card.title}
        description={card.subtitle}
        fields={fields}
        onAnswer={(text) => (extras?.onPrefill ? extras.onPrefill(text) : onAction?.({ type: 'compose_prefill', params: { text }, description: 'Prefill the composer' }))}
      />
    );
  }

  // DiffViewer — proposed changes vs existing state.
  if (card.type === 'diff') {
    const before = typeof card.before === 'string' ? card.before : Array.isArray(card.before) ? (card.before as string[]).join('\n') : '';
    const after = typeof card.after === 'string' ? card.after : Array.isArray(card.after) ? (card.after as string[]).join('\n') : '';
    if (!before && !after) return null;
    return <DiffViewer key={index} before={before} after={after} fileLabel={card.subtitle || card.title} />;
  }

  // ApprovalCard — proposed action and decision controls.
  if (card.type === 'approval') {
    return (
      <ApprovalCard
        key={index}
        title={card.title}
        description={card.subtitle}
        details={card.details ? Object.entries(card.details).map(([label, value]) => ({ label, value })) : undefined}
        onApprove={() => {
          extras?.onApprovalDecision?.(true);
          onAction?.({ type: 'approval_response', params: { approved: true, cardId: card.id ?? card.title }, description: `Approve: ${card.title}` });
        }}
        onReject={() => {
          extras?.onApprovalDecision?.(false);
          onAction?.({ type: 'approval_response', params: { approved: false, cardId: card.id ?? card.title }, description: `Reject: ${card.title}` });
        }}
      />
    );
  }

  const color = CARD_COLORS[card.type] ?? '#9ca3b8';
  return <div key={index} className="rounded-xl p-3 mt-2 cursor-pointer hover:scale-[1.01] transition-transform" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}20`, animation: `agentCardIn 0.3s ease-out ${index * 0.1}s both` }} onClick={() => card.action?.tab && onAction?.({ type: 'navigate_to_tab', params: { tab: card.action.tab }, description: `Navigate to ${card.action.tab}` })}>
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${color}15`, color }}>{CARD_ICONS[card.type] ?? <Sparkles className="w-3.5 h-3.5" />}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold" style={{ color }}>{card.title}</div>
        {card.subtitle && <div className="text-[11px] text-[#9ca3b8] mt-0.5">{card.subtitle}</div>}
        {card.details && <div className="mt-1.5 space-y-0.5">{Object.entries(card.details).slice(0, 4).map(([key, value]) => <div key={key} className="flex items-center gap-1.5 text-[10px]"><span className="text-[#5a6478]">{key}:</span><span className="text-[#e8ecf4]">{value}</span></div>)}</div>}
        {card.action && <div className="flex items-center gap-1 mt-1.5 text-[10px] font-medium" style={{ color }}>{card.action.label} <ChevronRight className="w-3 h-3" /></div>}
      </div>
    </div>
  </div>;
}
