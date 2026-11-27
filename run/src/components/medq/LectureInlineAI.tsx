'use client';

/**
 * LectureInlineAI — AI tutor embedded directly inside the LectureViewer.
 *
 * This is NOT a separate slide-over panel. It renders as a permanent
 * third column (playlist | lecture content | AI tutor) so the AI is
 * always available while a student reads/watches a lecture, without
 * covering the content.
 *
 * Key differences from the GroupAIAssistant slide-over:
 *   - Lecture-scoped only (no question-context Explain mode)
 *   - Section-aware: knows which chunk/section is currently active and
 *     can target AI actions at the active section
 *   - Quick-action chips at the top for one-click Summarize / Quiz / Key Terms
 *   - Three modes: Tutor (free Q&A), Summarize (structured notes),
 *     Quiz Me (3 MCQs). All grounded in the active lecture's content.
 *   - Collapsible — the LectureViewer toggles this panel via a button in
 *     its top bar; closing it gives the lecture full width.
 *
 * Backend: same /api/groups/[id]/ai-assistant endpoint. The endpoint
 * already supports lectureId context and the tutor/summarize/quiz modes.
 *
 * Markdown rendering is shared with GroupAIAssistant via the exported
 * MarkdownRenderer component.
 */

import { useState, useRef, useEffect } from 'react';
import { useCurrentUser } from '@/components/medq/useCurrentUser';
import { MarkdownRenderer } from '@/components/medq/GroupAIAssistant';
import {
  Sparkles, X, Send, Loader2, Brain, FileText, HelpCircle,
  User, RotateCcw, Lightbulb, Wand2, Target, Zap, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

type Mode = 'tutor' | 'summarize' | 'quiz';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ModeConfig {
  id: Mode;
  label: string;
  icon: any;
  color: string;
  description: string;
  placeholder: string;
}

const MODES: ModeConfig[] = [
  {
    id: 'tutor',
    label: 'Tutor',
    icon: Brain,
    color: '#00e5a0',
    description: 'Ask anything about this lecture',
    placeholder: 'e.g. Explain the mechanism in simple terms…',
  },
  {
    id: 'summarize',
    label: 'Summarize',
    icon: FileText,
    color: '#4fc3f7',
    description: 'Structured study notes from this section',
    placeholder: 'Optional: focus on a specific aspect (e.g. "pharmacology only")',
  },
  {
    id: 'quiz',
    label: 'Quiz Me',
    icon: HelpCircle,
    color: '#f59e0b',
    description: 'Generate 3 practice MCQs',
    placeholder: 'Optional: focus on a topic or difficulty',
  },
];

interface Props {
  groupId: string;
  lectureId: string;
  lectureTitle: string;
  /** The currently-active chunk/section. Used to show section-aware
   * context in the header and to target quick actions at this section. */
  activeChunk: {
    id: string;
    title: string;
    type: string;
  } | null;
  /** Called when the user clicks the collapse button. */
  onClose: () => void;
}

export default function LectureInlineAI({
  groupId,
  lectureId,
  lectureTitle,
  activeChunk,
  onClose,
}: Props) {
  const { authHeaders } = useCurrentUser();
  const [mode, setMode] = useState<Mode>('tutor');
  const [histories, setHistories] = useState<Record<Mode, Message[]>>({
    tutor: [],
    summarize: [],
    quiz: [],
  });
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentMode = MODES.find(m => m.id === mode)!;
  const messages = histories[mode];

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  // Autosize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(120, inputRef.current.scrollHeight)}px`;
    }
  }, [input]);

  const send = async (
    overrideMessage?: string,
    overrideMode?: Mode,
  ) => {
    const effectiveMode = overrideMode ?? mode;
    const msg = (overrideMessage ?? input).trim();
    if (busy) return;
    // summarize and quiz can send with empty message (auto-derive from lecture)
    if (effectiveMode !== 'summarize' && effectiveMode !== 'quiz' && !msg) return;

    const userMsg: Message = {
      role: 'user',
      content: msg || (effectiveMode === 'summarize' ? 'Summarize this lecture section.' : 'Generate quiz questions.'),
    };
    const newHistory = [...histories[effectiveMode], userMsg];
    setHistories(h => ({ ...h, [effectiveMode]: newHistory }));
    setInput('');
    setBusy(true);

    try {
      const res = await fetch(`/api/groups/${groupId}/ai-assistant`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          mode: effectiveMode,
          history: newHistory.slice(-10).map(m => ({ role: m.role, content: m.content })),
          lectureId,
        }),
      });
      const d = await res.json();
      if (res.ok) {
        const assistantMsg: Message = { role: 'assistant', content: d.response };
        setHistories(h => ({ ...h, [effectiveMode]: [...h[effectiveMode], assistantMsg] }));
      } else {
        toast.error(d.error || 'AI request failed');
        setHistories(h => ({ ...h, [effectiveMode]: h[effectiveMode].slice(0, -1) }));
      }
    } catch {
      toast.error('Network error — please try again');
      setHistories(h => ({ ...h, [effectiveMode]: h[effectiveMode].slice(0, -1) }));
    } finally {
      setBusy(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearHistory = () => {
    setHistories(h => ({ ...h, [mode]: [] }));
  };

  // Quick-action chips — one click sends a pre-built prompt in the right mode
  const quickActions: { label: string; icon: any; color: string; mode: Mode; prompt?: string }[] = [
    {
      label: 'Summarize section',
      icon: Wand2,
      color: '#4fc3f7',
      mode: 'summarize',
    },
    {
      label: 'Quiz me',
      icon: Target,
      color: '#f59e0b',
      mode: 'quiz',
    },
    {
      label: 'Key concepts',
      icon: Zap,
      color: '#00e5a0',
      mode: 'tutor',
      prompt: 'What are the 5 most high-yield key concepts I must remember from this section?',
    },
    {
      label: 'Clinical pearls',
      icon: Lightbulb,
      color: '#8b5cf6',
      mode: 'tutor',
      prompt: 'Give me 3 clinical pearls and a memorable mnemonic from this section.',
    },
  ];

  const runQuickAction = (action: { mode: Mode; prompt?: string }) => {
    setMode(action.mode);
    // Slight delay so mode state has flushed before send reads it
    setTimeout(() => send(action.prompt, action.mode), 0);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: 'rgba(0,0,0,0.25)' }}>
      {/* ─── Header ─── */}
      <div className="px-4 py-3 border-b flex items-center gap-2.5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: 'linear-gradient(135deg, rgba(0,229,160,0.18) 0%, rgba(79,195,247,0.12) 100%)',
          border: '1px solid rgba(0,229,160,0.25)',
        }}>
          <Sparkles className="w-4 h-4" style={{ color: '#00e5a0' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            AI Tutor
            <span className="text-[8px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>ZAI</span>
          </h3>
          <p className="text-[10px] text-[#5a6478] truncate">
            {activeChunk ? `Section: ${activeChunk.title}` : lectureTitle}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/5 flex-shrink-0"
          title="Hide AI panel"
        >
          <X className="w-4 h-4 text-[#8b95a8]" />
        </button>
      </div>

      {/* ─── Mode tabs ─── */}
      <div className="px-3 py-2 border-b flex items-center gap-1 overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {MODES.map(m => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all"
              style={{
                background: active ? `${m.color}18` : 'rgba(255,255,255,0.03)',
                color: active ? m.color : '#8b95a8',
                border: `1px solid ${active ? `${m.color}30` : 'rgba(255,255,255,0.05)'}`,
              }}
              title={m.description}
            >
              <Icon className="w-3 h-3" /> {m.label}
            </button>
          );
        })}
      </div>

      {/* ─── Quick-action chips (only show when no messages yet in this mode) ─── */}
      {messages.length === 0 && !busy && (
        <div className="px-3 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[9px] uppercase tracking-wider text-[#5a6478] font-bold mb-2 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" /> Quick actions
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  onClick={() => runQuickAction(action)}
                  disabled={busy}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[10px] font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 text-left"
                  style={{
                    background: `${action.color}0d`,
                    color: action.color,
                    border: `1px solid ${action.color}20`,
                  }}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{action.label}</span>
                  <ChevronRight className="w-2.5 h-2.5 ml-auto flex-shrink-0 opacity-50" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Messages area ─── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scrollbar">
        <div className="px-3 py-4">
          {messages.length === 0 ? (
            <EmptyState mode={currentMode} lectureTitle={lectureTitle} sectionTitle={activeChunk?.title} />
          ) : (
            <div className="space-y-3">
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} mode={mode} />
              ))}
              {busy && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      {/* ─── Input bar ─── */}
      <div className="px-3 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(21,24,33,0.4)' }}>
        {messages.length > 0 && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-[#5a6478]">{messages.length} in {currentMode.label}</span>
            <button
              onClick={clearHistory}
              className="text-[9px] flex items-center gap-1 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
            >
              <RotateCcw className="w-2.5 h-2.5" /> Clear
            </button>
          </div>
        )}
        <div className="flex items-end gap-1.5 p-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentMode.placeholder}
            disabled={busy}
            rows={1}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-[#5a6478] focus:outline-none resize-none px-2 py-1.5 disabled:opacity-50"
            style={{ minHeight: '32px', maxHeight: '120px' }}
          />
          <button
            onClick={() => send()}
            disabled={busy || (mode !== 'summarize' && mode !== 'quiz' && !input.trim())}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0"
            style={{ background: currentMode.color, color: '#0c0e14' }}
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </div>
        <p className="text-[8px] text-[#3a4055] mt-1.5 text-center">
          AI is educational — verify against authoritative sources. Enter to send.
        </p>
      </div>
    </div>
  );
}

/* ───────── Empty State ───────── */

function EmptyState({ mode, lectureTitle, sectionTitle }: { mode: ModeConfig; lectureTitle: string; sectionTitle?: string }) {
  const Icon = mode.icon;
  return (
    <div className="text-center py-6 px-2">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3" style={{ background: `${mode.color}12`, border: `1px solid ${mode.color}25` }}>
        <Icon className="w-6 h-6" style={{ color: mode.color }} />
      </div>
      <h4 className="text-sm font-bold text-white mb-1">{mode.label} Mode</h4>
      <p className="text-[11px] text-[#8b95a8] mb-3 leading-relaxed">{mode.description}</p>

      {/* Context card */}
      <div className="rounded-lg p-2.5 mb-3 text-left" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[9px] uppercase tracking-wider text-[#5a6478] font-semibold mb-0.5">Context</p>
        <p className="text-[10px] text-white truncate">📖 {lectureTitle}</p>
        {sectionTitle && <p className="text-[10px] text-[#8b95a8] truncate mt-0.5">§ {sectionTitle}</p>}
      </div>

      <div className="rounded-lg p-2.5 text-left" style={{ background: 'rgba(0,229,160,0.04)', border: '1px solid rgba(0,229,160,0.12)' }}>
        <p className="text-[9px] uppercase tracking-wider text-[#00e5a0] font-bold mb-1 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" /> Try asking
        </p>
        <ul className="space-y-0.5">
          {mode.id === 'tutor' && (
            <>
              <li className="text-[10px] text-[#8b95a8]">• "Explain the pathophysiology simply"</li>
              <li className="text-[10px] text-[#8b95a8]">• "What high-yield points should I know?"</li>
              <li className="text-[10px] text-[#8b95a8]">• "Give me a mnemonic for the symptoms"</li>
            </>
          )}
          {mode.id === 'summarize' && (
            <>
              <li className="text-[10px] text-[#8b95a8]">• Hit Send for a full summary</li>
              <li className="text-[10px] text-[#8b95a8]">• Or focus: "pharmacology only"</li>
              <li className="text-[10px] text-[#8b95a8]">• Or "key differential diagnoses"</li>
            </>
          )}
          {mode.id === 'quiz' && (
            <>
              <li className="text-[10px] text-[#8b95a8]">• Hit Send to get 3 MCQs</li>
              <li className="text-[10px] text-[#8b95a8]">• Or "clinical vignette style"</li>
              <li className="text-[10px] text-[#8b95a8]">• Or "focus on side effects"</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

/* ───────── Message Bubble ───────── */

function MessageBubble({ message, mode }: { message: Message; mode: Mode }) {
  const isUser = message.role === 'user';
  const Icon = isUser ? User : Sparkles;
  const modeColor = MODES.find(m => m.id === mode)?.color || '#00e5a0';

  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: isUser ? 'rgba(255,255,255,0.06)' : `${modeColor}18`,
          border: `1px solid ${isUser ? 'rgba(255,255,255,0.08)' : `${modeColor}30`}`,
        }}
      >
        <Icon className="w-3 h-3" style={{ color: isUser ? '#8b95a8' : modeColor }} />
      </div>
      <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className="inline-block rounded-xl px-3 py-2 text-left max-w-[92%]"
          style={{
            background: isUser ? 'rgba(79,195,247,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isUser ? 'rgba(79,195,247,0.15)' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          {isUser ? (
            <p className="text-xs text-white whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────── Typing Indicator ───────── */

function TypingIndicator() {
  return (
    <div className="flex gap-2">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,229,160,0.18)', border: '1px solid rgba(0,229,160,0.3)' }}>
        <Sparkles className="w-3 h-3" style={{ color: '#00e5a0' }} />
      </div>
      <div className="inline-block rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
