'use client';

/**
 * AI Router · Playground — streaming chat against any enabled model or the
 * auto-router, natively in MedQ (no iframe). Streams token-by-token through
 * the same OpenAI-compatible /v1 the router exposes to the outside world,
 * with the unified key as credentials.
 *
 * MedQ customization: the default system prompt is MedQ Tutor — a board-style
 * medical educator — and the starter prompts are clinical teaching scenarios.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, ChevronDown, Eraser, Loader2, Send, Square, Stethoscope, User } from 'lucide-react';
import { isMedicalModel, type FlModel, type FreellmSession } from './api';
import { ErrorNote, platformColor } from './ui';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
  via?: string;
  latencyMs?: number;
}

const MEDQ_TUTOR_PROMPT =
  'You are MedQ Tutor, an expert medical educator. Answer with clinical precision ' +
  'and a teaching mindset: lead with the key point, explain the mechanism, flag the ' +
  'classic exam trap, and keep it concise. Use plain language a medical student can follow.';

const STARTERS = [
  'Explain the difference between cushingoid and addisonian lab findings.',
  'A 58-year-old with crushing chest pain radiating to the jaw — walk me through the first 10 minutes.',
  'Why does hypokalemia cause U waves, and when should I worry?',
  'Top 5 differentials for a unilateral pounding headache.',
];

export default function Playground({ session }: { session: FreellmSession }) {
  const { flFetch } = session;
  const [models, setModels] = useState<FlModel[] | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>('auto');
  const [modelQuery, setModelQuery] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(MEDQ_TUTOR_PROMPT);
  const [showSystem, setShowSystem] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const [m, k] = await Promise.all([
          flFetch<FlModel[]>('/api/models'),
          flFetch<{ apiKey: string }>('/api/settings/api-key'),
        ]);
        setModels(m.filter((x) => x.enabled));
        setApiKey(k.apiKey);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, [flFetch]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const enabled = models ?? [];
  const filteredModels = modelQuery.trim()
    ? enabled.filter(
        (m) =>
          m.displayName.toLowerCase().includes(modelQuery.toLowerCase()) ||
          m.modelId.toLowerCase().includes(modelQuery.toLowerCase()),
      )
    : enabled;
  const selectedLabel =
    selected === 'auto'
      ? 'Auto — router picks the best model'
      : enabled.find((m) => m.modelId === selected)?.displayName ?? selected;

  const send = useCallback(
    async (text: string) => {
      const prompt = text.trim();
      if (!prompt || streaming) return;
      if (!apiKey) {
        setError('Router API key not loaded yet — try again in a moment.');
        return;
      }
      setError(null);
      setInput('');
      const userMsg: ChatMessage = { role: 'user', content: prompt };
      const baseMessages: ChatMessage[] = [...messages, userMsg];
      setMessages([...baseMessages, { role: 'assistant', content: '' }]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;
      const start = Date.now();

      try {
        const res = await fetch('/freellmapi/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            messages: [
              ...(systemPrompt.trim() ? [{ role: 'system', content: systemPrompt.trim() }] : []),
              ...baseMessages.map((m) => ({ role: m.role, content: m.content })),
            ],
            ...(selected !== 'auto' ? { model: selected } : {}),
            stream: true,
            temperature,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
          throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
        }

        const routedVia = res.headers.get('X-Routed-Via');
        const contentType = res.headers.get('Content-Type') ?? '';

        if (contentType.includes('text/event-stream') && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;
              const payload = trimmed.slice(5).trim();
              if (payload === '[DONE]') continue;
              try {
                const chunk = JSON.parse(payload) as {
                  choices?: Array<{ delta?: { content?: string } }>;
                };
                const delta = chunk.choices?.[0]?.delta?.content;
                if (delta) {
                  setMessages((prev) => {
                    const next = [...prev];
                    const last = next[next.length - 1];
                    if (last && last.role === 'assistant') next[next.length - 1] = { ...last, content: last.content + delta };
                    return next;
                  });
                }
              } catch { /* keep partial JSON in buffer */ }
            }
          }
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === 'assistant') {
              next[next.length - 1] = {
                ...last,
                via: routedVia ?? (selected === 'auto' ? 'auto-router' : selected),
                latencyMs: Date.now() - start,
              };
            }
            return next;
          });
        } else {
          const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
          const content = data.choices?.[0]?.message?.content ?? '';
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === 'assistant') {
              next[next.length - 1] = { ...last, content, via: routedVia ?? selected, latencyMs: Date.now() - start };
            }
            return next;
          });
        }
      } catch (e) {
        const aborted = e instanceof DOMException && e.name === 'AbortError';
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === 'assistant') {
            next[next.length - 1] = {
              ...last,
              content: last.content || (aborted ? '_Stopped._' : ''),
              isError: !aborted && !last.content,
              ...( !aborted && !last.content ? { content: e instanceof Error ? e.message : String(e) } : {}),
            };
          }
          return next;
        });
        if (!aborted) setError(e instanceof Error ? e.message : String(e));
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [apiKey, messages, selected, streaming, systemPrompt, temperature],
  );

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Model picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPickerOpen((v) => !v)}
            className="inline-flex h-9 max-w-72 items-center gap-2 rounded-lg border border-white/[0.08] bg-black/30 px-3 text-xs text-white/90 transition-colors hover:border-[#00e5a0]/30"
          >
            <Bot className="h-3.5 w-3.5 shrink-0 text-[#00e5a0]" />
            <span className="truncate">{selectedLabel}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#8b95a8]" />
          </button>
          {pickerOpen ? (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setPickerOpen(false)} />
              <div className="absolute left-0 top-10 z-40 w-80 overflow-hidden rounded-xl border border-white/[0.1] bg-[#10131b] shadow-2xl">
                <div className="border-b border-white/[0.06] p-2">
                  <input
                    autoFocus
                    value={modelQuery}
                    onChange={(e) => setModelQuery(e.target.value)}
                    placeholder="Search enabled models…"
                    className="h-8 w-full rounded-md border border-white/[0.06] bg-black/40 px-2.5 text-xs text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
                  />
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => { setSelected('auto'); setPickerOpen(false); }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${selected === 'auto' ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-white/85 hover:bg-white/[0.05]'}`}
                  >
                    <SparklesInline /> Auto — router decides and fails over
                  </button>
                  {filteredModels.slice(0, 80).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setSelected(m.modelId); setPickerOpen(false); }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${selected === m.modelId ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-white/85 hover:bg-white/[0.05]'}`}
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: platformColor(m.platform) }} />
                      <span className="min-w-0 flex-1 truncate">{m.displayName}</span>
                      {isMedicalModel(m.modelId) ? <Stethoscope className="h-3 w-3 shrink-0 text-[#00e5a0]" /> : null}
                    </button>
                  ))}
                  {filteredModels.length === 0 ? (
                    <div className="px-3 py-4 text-center text-[11px] text-[#8b95a8]">No enabled models match — enable some in Models.</div>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setShowSystem((v) => !v)}
          className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs transition-colors ${showSystem ? 'border-[#00e5a0]/30 bg-[#00e5a0]/10 text-[#00e5a0]' : 'border-white/[0.06] text-[#8b95a8] hover:text-white/85'}`}
        >
          <Stethoscope className="h-3.5 w-3.5" /> MedQ Tutor prompt
        </button>

        <label className="flex h-9 items-center gap-2 rounded-lg border border-white/[0.06] px-3 text-xs text-[#8b95a8]">
          temp
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="h-1 w-20 accent-[#00e5a0]"
          />
          <span className="tabular-nums text-white/80">{temperature.toFixed(1)}</span>
        </label>

        <div className="ml-auto flex items-center gap-1.5">
          {streaming ? (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#ff5757]/30 px-3 text-xs font-medium text-[#ff5757] transition-colors hover:bg-[#ff5757]/10"
            >
              <Square className="h-3.5 w-3.5" /> Stop
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => { setMessages([]); setError(null); }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.06] px-3 text-xs text-[#8b95a8] transition-colors hover:text-white/85"
          >
            <Eraser className="h-3.5 w-3.5" /> Clear
          </button>
        </div>
      </div>

      {showSystem ? (
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-xs leading-relaxed text-white/85 focus:border-[#00e5a0]/40 focus:outline-none"
        />
      ) : null}

      {error ? <ErrorNote>{error}</ErrorNote> : null}

      {/* Messages */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.015]">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-10 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00e5a0]/10">
              <Stethoscope className="h-5 w-5 text-[#00e5a0]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">Clinical playground</div>
              <div className="mt-1 text-xs text-[#8b95a8]">Ask anything medical — streamed through your own keys with automatic failover.</div>
            </div>
            <div className="flex max-w-xl flex-wrap justify-center gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-left text-[11px] text-[#9aa4b8] transition-colors hover:border-[#00e5a0]/30 hover:text-white/90"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${m.role === 'user' ? 'bg-white/[0.06]' : 'bg-[#00e5a0]/10'}`}
                >
                  {m.role === 'user' ? <User className="h-3.5 w-3.5 text-white/70" /> : <Bot className="h-3.5 w-3.5 text-[#00e5a0]" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-sm leading-relaxed ${m.isError ? 'text-[#ff9d9d]' : m.role === 'user' ? 'text-white/90' : 'text-white/85'}`}
                  >
                    {m.role === 'assistant' ? (
                      <div className="prose-invert max-w-none break-words text-[13px] leading-relaxed [&_p]:mb-2 [&_ul]:mb-2 [&_li]:mb-0.5 [&_code]:rounded [&_code]:bg-black/40 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[11px] [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:p-2.5">
                        <ReactMarkdown>{m.content || (streaming && i === messages.length - 1 ? '' : '')}</ReactMarkdown>
                        {streaming && i === messages.length - 1 && !m.content ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#00e5a0]" />
                        ) : null}
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap">{m.content}</span>
                    )}
                  </div>
                  {m.via ? (
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#8b95a8]">
                      <span className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono">{m.via}</span>
                      {m.latencyMs ? <span>{(m.latencyMs / 1000).toFixed(1)}s</span> : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={1}
          placeholder="Ask a clinical question… (Enter to send, Shift+Enter for a new line)"
          className="max-h-32 min-h-10 w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 px-3.5 py-2.5 text-sm text-white/90 placeholder:text-[#8b95a8]/70 focus:border-[#00e5a0]/40 focus:outline-none"
        />
        <button
          type="button"
          disabled={streaming || !input.trim()}
          onClick={() => void send(input)}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-[#00e5a0] px-4 text-sm font-semibold text-[#06231a] transition-colors hover:bg-[#00e5a0]/85 disabled:opacity-40"
        >
          {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function SparklesInline() {
  return <span className="text-[#00e5a0]">✦</span>;
}
