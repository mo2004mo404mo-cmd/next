'use client';

/**
 * ThreadHistoryPopover — the assistant's conversation switcher.
 *
 * Lists the user's past chat threads (GET /api/agent/threads) with title,
 * relative time and message count. Clicking a thread loads its transcript
 * (the parent fetches /api/agent/threads/:id/messages and adopts the thread
 * via agent.setThreadId so the next turn continues it); a per-row trash
 * button deletes the thread (DELETE /api/agent/threads/:id, server-side
 * message cascade); the footer offers "New chat".
 *
 * Self-contained: mounts a history icon button into the assistant panel
 * header (mirrors ScheduledTasksPopover) and manages its own open state and
 * data fetching. The parent passes the CURRENT thread id (highlight), the
 * select/new-chat handlers, and a streaming guard (switching mid-turn is
 * disabled — the abort would race the persistence of the running reply).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Download, History, Loader2, MessageSquare, Pencil, Plus, Trash2, X } from 'lucide-react';

interface ThreadRow {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 0) return 'just now';
  const mins = Math.floor(ms / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function ThreadHistoryPopover({
  currentThreadId,
  onSelectThread,
  onNewChat,
  disabled,
  refreshKey,
}: {
  /** Thread the panel is currently showing (null before the first turn). */
  currentThreadId: string | null;
  /** Load the clicked thread's transcript and adopt it for the next turn. */
  onSelectThread: (threadId: string) => void;
  /** Clear the panel and start a fresh thread on the next send. */
  onNewChat: () => void;
  /** Disable interactions while a turn is streaming. */
  disabled?: boolean;
  /** Bump to force a reload (e.g. after the parent deletes/switches). */
  refreshKey?: number;
}) {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<ThreadRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  /** Inline rename: which row is being renamed + the live input value. */
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const renameInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agent/threads?limit=30');
      const data = await res.json().catch(() => ({ threads: [] }));
      setThreads(Array.isArray(data.threads) ? data.threads : []);
    } catch {
      setThreads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on every open (threads are created/renamed from any turn) and when
  // the parent signals a change (refreshKey bump after switching/deleting).
  const toggle = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) void load();
      return next;
    });
  }, [load]);

  useEffect(() => {
    if (open) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Note auto-dismiss
  useEffect(() => {
    if (!note) return;
    const t = setTimeout(() => setNote(null), 4000);
    return () => clearTimeout(t);
  }, [note]);

  const remove = useCallback(async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/agent/threads/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('delete failed');
      setThreads((prev) => (prev ? prev.filter((t) => t.id !== id) : prev));
      if (currentThreadId === id) {
        setNote('Current conversation deleted — start a new chat.');
      }
    } catch {
      setNote('Delete failed — try again.');
    } finally {
      setBusyId(null);
    }
  }, [currentThreadId]);

  // Focus the inline input as soon as a rename starts.
  useEffect(() => {
    if (renamingId) renameInputRef.current?.focus();
  }, [renamingId]);

  const startRename = useCallback((thread: ThreadRow) => {
    setRenamingId(thread.id);
    setRenameValue(thread.title?.trim() || '');
  }, []);

  const commitRename = useCallback(async () => {
    const id = renamingId;
    if (!id) return;
    const title = renameValue.trim();
    setRenamingId(null);
    if (!title) return; // empty input = cancel
    setBusyId(id);
    try {
      const res = await fetch(`/api/agent/threads/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('rename failed');
      const data = (await res.json()) as { title?: string };
      setThreads((prev) => (prev ? prev.map((t) => (t.id === id ? { ...t, title: data.title || title } : t)) : prev));
      setNote('Conversation renamed.');
    } catch {
      setNote('Rename failed — try again.');
    } finally {
      setBusyId(null);
    }
  }, [renamingId, renameValue]);

  /** Download the CURRENT conversation as a Markdown study note. */
  const [exporting, setExporting] = useState(false);
  const exportThread = useCallback(async () => {
    if (!currentThreadId || exporting) return;
    setExporting(true);
    try {
      const res = await fetch(`/api/agent/threads/${encodeURIComponent(currentThreadId)}/messages`);
      if (!res.ok) throw new Error('fetch failed');
      const data = (await res.json()) as {
        messages?: Array<{ role?: string; content?: string; createdAt?: string }>;
      };
      const rows = data.messages ?? [];
      if (rows.length === 0) {
        setNote('Nothing to export yet — this conversation is empty.');
        return;
      }
      const stamp = new Date().toISOString().slice(0, 10);
      const lines: string[] = [`# MedQ Assistant — conversation export`, ``, `_Exported ${new Date().toLocaleString()} · ${rows.length} messages_`, ``];
      for (const m of rows) {
        const who = m.role === 'user' ? '🧑 You' : m.role === 'assistant' ? '🤖 MedQ Assistant' : `⚙️ ${m.role || 'system'}`;
        lines.push(`---`, ``, `**${who}**${m.createdAt ? ` · ${new Date(m.createdAt).toLocaleString()}` : ''}`, ``, (m.content || '').trim(), ``);
      }
      const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medq-chat-${stamp}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setNote('Conversation exported as Markdown.');
    } catch {
      setNote('Export failed — try again.');
    } finally {
      setExporting(false);
    }
  }, [currentThreadId, exporting]);

  return (
    <div ref={containerRef}>
      <button
        onClick={toggle}
        className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
        title="Conversation history"
        aria-label="Conversation history"
      >
        <History className="w-3.5 h-3.5" />
      </button>

      {/* Anchored to the PANEL (nearest positioned ancestor) — same fix as
          ScheduledTasksPopover: right-0 on the button wrapper put this card
          off-screen on phones. */}
      {open && (
        <div
          className="absolute right-3 top-[50px] z-50 w-80 max-w-[calc(100vw-2.5rem)] max-h-[calc(100vh-190px)] overflow-y-auto custom-scrollbar rounded-xl"
          style={{
            background: 'rgba(16,20,34,0.98)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
            <div className="text-[11px] font-semibold text-[#e8ecf4]">Past conversations</div>
            <button onClick={() => setOpen(false)} className="text-[#5a6478] hover:text-[#e8ecf4]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-h-40 sm:max-h-72 overflow-y-auto custom-scrollbar">
            {loading && threads === null ? (
              <div className="flex items-center justify-center gap-2 py-6 text-[#5a6478] text-[10px]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading conversations…
              </div>
            ) : !threads || threads.length === 0 ? (
              <div className="px-3 py-5 text-center text-[10px] text-[#5a6478] leading-relaxed">
                No saved conversations yet.
                <br />
                Every chat is kept on the server — it will appear here.
              </div>
            ) : (
              threads.map((thread) => {
                const current = thread.id === currentThreadId;
                const busy = busyId === thread.id;
                const renaming = renamingId === thread.id;
                if (renaming) {
                  return (
                    <div key={thread.id} className="px-3 py-2.5 border-b border-white/5 last:border-0 bg-white/5">
                      <input
                        ref={renameInputRef}
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            void commitRename();
                          } else if (e.key === 'Escape') {
                            e.preventDefault();
                            setRenamingId(null);
                          }
                        }}
                        maxLength={120}
                        placeholder="Conversation name…"
                        className="w-full rounded-lg bg-black/30 px-2.5 py-1.5 text-[11px] text-[#e8ecf4] outline-none placeholder:text-[#5a6478]"
                        style={{ border: '1px solid rgba(0,229,160,0.35)' }}
                        aria-label="Rename conversation"
                      />
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-[8.5px] text-[#5a6478]">Enter to save · Esc to cancel</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => void commitRename()}
                            className="p-1 rounded hover:bg-white/10"
                            title="Save name"
                            aria-label="Save name"
                          >
                            <Check className="w-3 h-3 text-[#00e5a0]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setRenamingId(null)}
                            className="p-1 rounded hover:bg-white/10"
                            title="Cancel"
                            aria-label="Cancel rename"
                          >
                            <X className="w-3 h-3 text-[#5a6478]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    key={thread.id}
                    onClick={() => {
                      if (disabled || busy || current) return;
                      setOpen(false);
                      onSelectThread(thread.id);
                    }}
                    className={`w-full text-left px-3 py-2.5 border-b border-white/5 last:border-0 transition-colors ${
                      current ? 'bg-white/5' : 'hover:bg-white/5'
                    } ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
                    title={thread.title || 'Untitled conversation'}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {current && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00e5a0' }} />}
                          <span className={`text-[11px] truncate ${current ? 'font-semibold text-[#00e5a0]' : 'font-medium text-[#e8ecf4]'}`}>
                            {thread.title?.trim() || 'Untitled conversation'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-[#5a6478]">
                          <span>{relativeTime(thread.updatedAt)}</span>
                          <span className="inline-flex items-center gap-0.5">
                            <MessageSquare className="w-2.5 h-2.5" />
                            {thread.messageCount}
                          </span>
                        </div>
                      </div>
                      <span className="flex items-center gap-0.5 shrink-0">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (disabled || busy) return;
                            startRename(thread);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.stopPropagation();
                              if (disabled || busy) return;
                              startRename(thread);
                            }
                          }}
                          className={`p-1 rounded hover:bg-white/10 ${disabled ? 'opacity-40' : ''}`}
                          title="Rename conversation"
                        >
                          <Pencil className="w-3 h-3 text-[#9ca3b8]" />
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (disabled || busy) return;
                            void remove(thread.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.stopPropagation();
                              if (disabled || busy) return;
                              void remove(thread.id);
                            }
                          }}
                          className={`p-1 rounded hover:bg-white/10 ${disabled ? 'opacity-40' : ''}`}
                          title="Delete conversation"
                        >
                          {busy ? (
                            <Loader2 className="w-3 h-3 animate-spin text-[#5a6478]" />
                          ) : (
                            <Trash2 className="w-3 h-3 text-[#ff5757]" />
                          )}
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {note && (
            <div className="px-3 py-2 text-[9px] text-[#80dea8] border-t border-white/5">{note}</div>
          )}

          <div className="grid grid-cols-2 border-t border-white/5">
            <button
              onClick={() => void exportThread()}
              disabled={!currentThreadId || disabled || exporting}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] font-medium text-[#4fc3f7] hover:bg-white/5 border-r border-white/5 ${
                !currentThreadId || disabled || exporting ? 'opacity-50 cursor-default' : ''
              }`}
              title={currentThreadId ? 'Download this conversation as Markdown' : 'Send a message first — nothing to export yet'}
            >
              {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              Export
            </button>
            <button
              onClick={() => {
                if (disabled) return;
                setOpen(false);
                onNewChat();
              }}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] font-medium text-[#00e5a0] hover:bg-white/5 ${
                disabled ? 'opacity-50 cursor-default' : ''
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              New chat
              {disabled && <span className="text-[#5a6478] font-normal">· turn running</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
