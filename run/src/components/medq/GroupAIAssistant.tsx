'use client';

/**
 * GroupAIAssistant — Slide-over AI study assistant for study groups.
 *
 * Reuses the ZAI-backed /api/groups/[id]/ai-assistant endpoint. Supports
 * four modes:
 *   - Tutor     : free-form medical Q&A (with optional lecture context)
 *   - Summarize : condense a lecture into study notes
 *   - Quiz Me   : generate 3 practice MCQs from lecture content
 *   - Explain   : deep-dive on a specific question's answer
 *
 * The component is a self-contained slide-over panel. Parent renders it
 * conditionally and passes optional `lectureId` / `questionId` context
 * (e.g. when launched from inside the lecture viewer or a question card).
 *
 * Chat history is kept in component state (not persisted) — closing the
 * panel clears it. Each mode keeps its own history so switching tabs
 * doesn't lose context.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useCurrentUser } from '@/components/medq/useCurrentUser';
import {
  Sparkles, X, Send, Loader2, BookOpen, FileText, HelpCircle,
  Brain, MessageSquare, User, RotateCcw, ChevronDown, Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

type Mode = 'tutor' | 'summarize' | 'quiz' | 'explain';

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
  needsContext: 'lecture' | 'question' | 'optional';
}

const MODES: ModeConfig[] = [
  {
    id: 'tutor',
    label: 'Tutor',
    icon: Brain,
    color: '#00e5a0',
    description: 'Ask any question about the lecture material',
    placeholder: 'e.g. Explain the renin-angiotensin-aldosterone system…',
    needsContext: 'optional',
  },
  {
    id: 'summarize',
    label: 'Summarize',
    icon: FileText,
    color: '#4fc3f7',
    description: 'Get a structured study summary of this lecture',
    placeholder: 'Optional: focus on a specific aspect (e.g. "focus on pharmacology")',
    needsContext: 'lecture',
  },
  {
    id: 'quiz',
    label: 'Quiz Me',
    icon: HelpCircle,
    color: '#f59e0b',
    description: 'Generate 3 practice MCQs from this lecture',
    placeholder: 'Optional: focus on a specific topic or difficulty',
    needsContext: 'lecture',
  },
  {
    id: 'explain',
    label: 'Explain',
    icon: Lightbulb,
    color: '#8b5cf6',
    description: 'Get a deeper explanation of a question',
    placeholder: 'What specifically would you like explained?',
    needsContext: 'question',
  },
];

interface Props {
  groupId: string;
  lectureId?: string;
  lectureTitle?: string;
  questionId?: string;
  questionText?: string;
  onClose: () => void;
}

export default function GroupAIAssistant({
  groupId,
  lectureId,
  lectureTitle,
  questionId,
  questionText,
  onClose,
}: Props) {
  const { authHeaders } = useCurrentUser();
  const [mode, setMode] = useState<Mode>(() => {
    // Auto-pick the most relevant mode based on provided context
    if (questionId) return 'explain';
    if (lectureId) return 'tutor';
    return 'tutor';
  });
  const [histories, setHistories] = useState<Record<Mode, Message[]>>({
    tutor: [],
    summarize: [],
    quiz: [],
    explain: [],
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

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Warn if mode requires context that wasn't provided
  const contextMissing =
    (currentMode.needsContext === 'lecture' && !lectureId) ||
    (currentMode.needsContext === 'question' && !questionId);

  const send = async () => {
    if (busy) return;
    if (contextMissing) return;
    // 'summarize' and 'quiz' can send without an explicit user message
    if (mode !== 'summarize' && mode !== 'quiz' && !input.trim()) return;

    const userMsg: Message = { role: 'user', content: input.trim() || (mode === 'summarize' ? 'Summarize this lecture.' : 'Generate quiz questions.') };
    const newHistory = [...messages, userMsg];
    setHistories(h => ({ ...h, [mode]: newHistory }));
    setInput('');
    setBusy(true);

    try {
      const res = await fetch(`/api/groups/${groupId}/ai-assistant`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          mode,
          history: newHistory.slice(-10).map(m => ({ role: m.role, content: m.content })),
          lectureId,
          questionId,
        }),
      });
      const d = await res.json();
      if (res.ok) {
        const assistantMsg: Message = { role: 'assistant', content: d.response };
        setHistories(h => ({ ...h, [mode]: [...h[mode], assistantMsg] }));
      } else {
        toast.error(d.error || 'AI request failed');
        // Roll back the user message so they can retry
        setHistories(h => ({ ...h, [mode]: h[mode].slice(0, -1) }));
      }
    } catch (err) {
      toast.error('Network error — please try again');
      setHistories(h => ({ ...h, [mode]: h[mode].slice(0, -1) }));
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(8, 10, 14, 0.98)', backdropFilter: 'blur(12px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(21,24,33,0.6)' }}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,229,160,0.18) 0%, rgba(79,195,247,0.12) 100%)', border: '1px solid rgba(0,229,160,0.25)' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#00e5a0' }} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              AI Study Assistant
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>ZAI</span>
            </h2>
            <p className="text-[10px] text-[#5a6478] truncate">
              {lectureTitle ? `Lecture: ${lectureTitle}` : questionText ? `Q: ${questionText.slice(0, 60)}${questionText.length > 60 ? '…' : ''}` : 'General tutor'}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 flex items-center gap-1 text-xs text-[#8b95a8]">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Mode selector — pill tabs */}
      <div className="px-4 py-3 border-b flex items-center gap-1 overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {MODES.map(m => {
          const Icon = m.icon;
          const active = mode === m.id;
          const disabled =
            (m.needsContext === 'lecture' && !lectureId) ||
            (m.needsContext === 'question' && !questionId);
          return (
            <button
              key={m.id}
              onClick={() => !disabled && setMode(m.id)}
              disabled={disabled}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: active ? `${m.color}18` : 'rgba(255,255,255,0.03)',
                color: active ? m.color : '#8b95a8',
                border: `1px solid ${active ? `${m.color}30` : 'rgba(255,255,255,0.05)'}`,
              }}
              title={disabled ? `Requires ${m.needsContext} context` : m.description}
            >
              <Icon className="w-3 h-3" /> {m.label}
            </button>
          );
        })}
      </div>

      {/* Context-missing banner */}
      {contextMissing && (
        <div className="px-4 py-3 text-[11px] text-[#f59e0b] flex items-center gap-2" style={{ background: 'rgba(245,158,11,0.06)', borderBottom: '1px solid rgba(245,158,11,0.15)' }}>
          <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            {currentMode.needsContext === 'lecture'
              ? 'Open a lecture first to use this mode — the AI needs lecture content as context.'
              : 'Open a question first to use this mode — the AI needs the question + correct answer as context.'}
          </span>
        </div>
      )}

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scrollbar">
        <div className="max-w-3xl mx-auto px-4 py-5">
          {messages.length === 0 ? (
            <EmptyChat mode={currentMode} lectureTitle={lectureTitle} questionText={questionText} />
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} mode={mode} />
              ))}
              {busy && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(21,24,33,0.6)' }}>
        <div className="max-w-3xl mx-auto">
          {/* Quick-clear button when history exists */}
          {messages.length > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[#5a6478]">{messages.length} message{messages.length === 1 ? '' : 's'} in {currentMode.label}</span>
              <button
                onClick={clearHistory}
                className="text-[10px] flex items-center gap-1 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>
          )}

          <div className="flex items-end gap-2 p-2 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={contextMissing ? 'Select a different mode or open content first…' : currentMode.placeholder}
              disabled={contextMissing || busy}
              rows={1}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-[#5a6478] focus:outline-none resize-none px-2 py-1.5 disabled:opacity-50"
              style={{ minHeight: '36px', maxHeight: '120px' }}
            />
            <button
              onClick={send}
              disabled={busy || contextMissing || (mode !== 'summarize' && mode !== 'quiz' && !input.trim())}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0"
              style={{ background: currentMode.color, color: '#0c0e14' }}
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[9px] text-[#3a4055] mt-1.5 text-center">
            AI responses are educational aids — verify against authoritative sources. Press Enter to send, Shift+Enter for newline.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────── Empty Chat State ───────── */

function EmptyChat({ mode, lectureTitle, questionText }: { mode: ModeConfig; lectureTitle?: string; questionText?: string }) {
  const Icon = mode.icon;
  return (
    <div className="text-center py-10 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: `${mode.color}12`, border: `1px solid ${mode.color}25` }}>
        <Icon className="w-8 h-8" style={{ color: mode.color }} />
      </div>
      <h3 className="text-base font-bold text-white mb-1.5">{mode.label} Mode</h3>
      <p className="text-xs text-[#8b95a8] max-w-sm mx-auto mb-5 leading-relaxed">{mode.description}</p>

      {/* Context card */}
      {(lectureTitle || questionText) && (
        <div className="inline-block text-left rounded-xl p-3 max-w-md mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[10px] uppercase tracking-wider text-[#5a6478] font-semibold mb-1">Context</p>
          {lectureTitle && <p className="text-xs text-white">📖 {lectureTitle}</p>}
          {questionText && <p className="text-xs text-white mt-1">❓ {questionText.slice(0, 200)}{questionText.length > 200 ? '…' : ''}</p>}
        </div>
      )}

      <div className="inline-block text-left rounded-xl p-3 max-w-md" style={{ background: 'rgba(0,229,160,0.04)', border: '1px solid rgba(0,229,160,0.12)' }}>
        <p className="text-[10px] uppercase tracking-wider text-[#00e5a0] font-bold mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Try asking
        </p>
        <ul className="space-y-1">
          {mode.id === 'tutor' && (
            <>
              <li className="text-[11px] text-[#8b95a8]">• "Explain the pathophysiology in simple terms"</li>
              <li className="text-[11px] text-[#8b95a8]">• "What are the high-yield exam points here?"</li>
              <li className="text-[11px] text-[#8b95a8]">• "Give me a mnemonic for the symptoms"</li>
            </>
          )}
          {mode.id === 'summarize' && (
            <>
              <li className="text-[11px] text-[#8b95a8]">• Just hit Send for a full summary</li>
              <li className="text-[11px] text-[#8b95a8]">• Or focus: "pharmacology only"</li>
              <li className="text-[11px] text-[#8b95a8]">• Or "key differential diagnoses"</li>
            </>
          )}
          {mode.id === 'quiz' && (
            <>
              <li className="text-[11px] text-[#8b95a8]">• Just hit Send to get 3 MCQs</li>
              <li className="text-[11px] text-[#8b95a8]">• Or specify: "clinical vignette style"</li>
              <li className="text-[11px] text-[#8b95a8]">• Or "focus on side effects"</li>
            </>
          )}
          {mode.id === 'explain' && (
            <>
              <li className="text-[11px] text-[#8b95a8]">• "Why is option B wrong?"</li>
              <li className="text-[11px] text-[#8b95a8]">• "What's the underlying mechanism?"</li>
              <li className="text-[11px] text-[#8b95a8]">• "Give me a clinical pearl about this"</li>
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
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: isUser ? 'rgba(255,255,255,0.06)' : `${modeColor}18`,
          border: `1px solid ${isUser ? 'rgba(255,255,255,0.08)' : `${modeColor}30`}`,
        }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: isUser ? '#8b95a8' : modeColor }} />
      </div>
      <div className={`flex-1 min-w-0 max-w-[85%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className="inline-block rounded-2xl px-3.5 py-2.5 text-left"
          style={{
            background: isUser ? 'rgba(79,195,247,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isUser ? 'rgba(79,195,247,0.15)' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          {isUser ? (
            <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────── Tiny Markdown renderer ───────── */
/* Renders a small subset of Markdown (headings, bold, italic, lists, code,
 * paragraphs) sufficient for AI tutor responses. Avoids pulling in a full
 * markdown library to keep the bundle small.
 *
 * Exported so the inline lecture AI (LectureInlineAI.tsx) can reuse the
 * same renderer without duplicating the parser. */

export function MarkdownRenderer({ content }: { content: string }) {
  const blocks = parseMarkdown(content);
  return (
    <div className="text-sm text-[#e8ecf4] leading-relaxed space-y-2">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h1':
            return <h1 key={i} className="text-base font-bold text-white mt-2">{b.text}</h1>;
          case 'h2':
            return <h2 key={i} className="text-sm font-bold text-white mt-2">{b.text}</h2>;
          case 'h3':
            return <h3 key={i} className="text-[13px] font-bold text-white mt-1.5">{b.text}</h3>;
          case 'ul':
            return (
              <ul key={i} className="space-y-1 ml-4">
                {b.items?.map((item, j) => (
                  <li key={j} className="text-[13px] flex gap-1.5">
                    <span className="text-[#00e5a0] flex-shrink-0">•</span>
                    <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="space-y-1 ml-4">
                {b.items?.map((item, j) => (
                  <li key={j} className="text-[13px] flex gap-1.5">
                    <span className="text-[#00e5a0] flex-shrink-0 font-bold">{j + 1}.</span>
                    <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
                  </li>
                ))}
              </ol>
            );
          case 'code':
            return (
              <pre key={i} className="rounded-lg p-2.5 text-[11px] overflow-x-auto" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <code className="text-[#00e5a0]">{b.text}</code>
              </pre>
            );
          case 'json':
            return (
              <pre key={i} className="rounded-lg p-2.5 text-[11px] overflow-x-auto" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <code className="text-[#4fc3f7]">{b.text}</code>
              </pre>
            );
          default:
            return <p key={i} className="text-[13px]" dangerouslySetInnerHTML={{ __html: inlineFormat(b.text) }} />;
        }
      })}
    </div>
  );
}

type Block =
  | { type: 'h1' | 'h2' | 'h3' | 'p' | 'code' | 'json'; text: string }
  | { type: 'ul' | 'ol'; items: string[] };

function parseMarkdown(src: string): Block[] {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Code fence
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push({ type: lang === 'json' ? 'json' : 'code', text: buf.join('\n') });
      continue;
    }
    // Headings
    if (/^###\s+/.test(line)) { blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '').trim() }); i++; continue; }
    if (/^##\s+/.test(line))  { blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '').trim() }); i++; continue; }
    if (/^#\s+/.test(line))   { blocks.push({ type: 'h1', text: line.replace(/^#\s+/, '').trim() }); i++; continue; }
    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, '').trim());
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }
    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, '').trim());
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }
    // Blank line
    if (!line.trim()) { i++; continue; }
    // Paragraph (consume until blank line / heading / list)
    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,3}\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('```')
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'p', text: buf.join('\n').trim() });
  }
  return blocks;
}

/** Inline formatting: **bold**, *italic*, `code`, [link](url) */
function inlineFormat(text: string): string {
  // Escape HTML first to avoid XSS from AI output
  let s = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // Bold
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#fff;font-weight:700">$1</strong>');
  // Italic
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em style="color:#8b95a8">$2</em>');
  // Inline code
  s = s.replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.4);padding:1px 4px;border-radius:3px;color:#00e5a0;font-size:11px">$1</code>');
  // Links
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" style="color:#4fc3f7;text-decoration:underline">$1</a>');
  return s;
}

/* ───────── Typing Indicator ───────── */

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,229,160,0.18)', border: '1px solid rgba(0,229,160,0.3)' }}>
        <Sparkles className="w-3.5 h-3.5" style={{ color: '#00e5a0' }} />
      </div>
      <div className="inline-block rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
