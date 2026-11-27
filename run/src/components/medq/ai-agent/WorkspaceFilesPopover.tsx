'use client';

/**
 * WorkspaceFilesPopover — the agent's file drawer.
 *
 * Browses the SAME jailed per-user workspace the agent's file tools
 * (ls/read_file/write_file/…) run in: what you see here is exactly what the
 * agent sees. Directory navigation via breadcrumbs, text file viewer
 * (markdown rendered lightly as pre-wrapped text), delete, and "Ask about
 * this file" which prefills the composer.
 *
 * Self-contained: mounts a folder icon button into the assistant panel
 * header and talks to /api/agent/workspace (same jail, owner-scoped).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, FileText, Folder, Loader2, MessageSquare, Trash2, X } from 'lucide-react';

interface Entry {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  modified?: string;
}

function formatSize(bytes?: number): string {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function WorkspaceFilesPopover({ onAsk }: { onAsk?: (text: string) => void }) {
  const [open, setOpen] = useState(false);
  const [dir, setDir] = useState('');
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [viewing, setViewing] = useState<{ path: string; content: string; size?: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async (path: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/agent/workspace?path=${encodeURIComponent(path)}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(String(data.error ?? 'Failed to load'));
        setEntries([]);
        return;
      }
      if (data.type === 'dir') {
        setEntries(Array.isArray(data.entries) ? data.entries : []);
        setViewing(null);
      } else {
        setViewing({ path, content: String(data.content ?? ''), size: data.size });
        setEntries(null);
      }
    } catch {
      setError('Failed to load the workspace.');
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggle = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) {
        setViewing(null);
        void load(dir);
      }
      return next;
    });
  }, [dir, load]);

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

  const navigate = (path: string) => {
    setDir(path);
    void load(path);
  };

  const remove = async (path: string) => {
    try {
      const res = await fetch(`/api/agent/workspace?path=${encodeURIComponent(path)}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(String(data.error ?? 'Delete failed'));
        return;
      }
      if (viewing?.path === path) setViewing(null);
      void load(viewing?.path === path ? dir : dir);
    } catch {
      setError('Delete failed — try again.');
    }
  };

  const crumbs = dir ? dir.split('/').filter(Boolean) : [];

  return (
    <div ref={containerRef}>
      <button
        onClick={toggle}
        className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
        title="Agent workspace files"
        aria-label="Agent workspace files"
      >
        <Folder className="w-3.5 h-3.5" />
      </button>

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
            <div className="text-[11px] font-semibold text-[#e8ecf4]">Workspace files</div>
            <button onClick={() => setOpen(false)} className="text-[#5a6478] hover:text-[#e8ecf4]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 px-3 py-1.5 border-b border-white/5 text-[10px] text-[#9ca3b8]">
            {(viewing || crumbs.length > 0) && (
              <button onClick={() => navigate('')} className="hover:text-[#e8ecf4]">workspace</button>
            )}
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1 min-w-0">
                <span className="text-[#5a6478]">/</span>
                <button
                  onClick={() => navigate(crumbs.slice(0, i + 1).join('/'))}
                  className="hover:text-[#e8ecf4] truncate max-w-[80px]"
                >
                  {crumb}
                </button>
              </span>
            ))}
          </div>

          {error && (
            <div className="px-3 py-2 text-[10px] text-[#ff5757]">{error}</div>
          )}

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-[#5a6478] text-[10px]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading…
            </div>
          ) : viewing ? (
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 px-3 py-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <button onClick={() => navigate(dir)} className="text-[#9ca3b8] hover:text-[#e8ecf4]" title="Back">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <FileText className="w-3 h-3 text-[#4fc3f7] shrink-0" />
                  <span className="truncate text-[10.5px] text-[#c7d0e0]">{viewing.path.split('/').pop()}</span>
                  <span className="text-[9px] text-[#5a6478]">{formatSize(viewing.size)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {onAsk && (
                    <button
                      onClick={() => {
                        onAsk(`Tell me about my workspace file "${viewing.path}" — read it and summarize what's inside.`);
                        setOpen(false);
                      }}
                      className="p-1 rounded hover:bg-white/5 text-[#00e5a0]"
                      title="Ask the agent about this file"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => remove(viewing.path)}
                    className="p-1 rounded hover:bg-white/5 text-[#ff5757]"
                    title="Delete this file"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <pre className="mx-3 mb-3 max-h-72 overflow-auto custom-scrollbar rounded-lg p-2 text-[9.5px] leading-relaxed text-[#a8b3c7] whitespace-pre-wrap break-words"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {viewing.content}
              </pre>
            </div>
          ) : !entries || entries.length === 0 ? (
            <div className="px-3 py-5 text-center text-[10px] text-[#5a6478] leading-relaxed">
              {dir ? 'Empty folder.' : (
                <>
                  No files yet.
                  <br />
                  Ask the agent to save something —
                  <br />
                  <span className="text-[#00e5a0]">“write study notes on sepsis to a file”</span>
                </>
              )}
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto custom-scrollbar">
              {dir && (
                <button
                  onClick={() => navigate(crumbs.slice(0, -1).join('/'))}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-left text-[10.5px] text-[#9ca3b8]"
                >
                  <ChevronLeft className="w-3 h-3" /> ..
                </button>
              )}
              {entries.map((entry) => (
                <div key={entry.path} className="group flex items-center gap-2 px-3 py-2 hover:bg-white/5">
                  <button
                    onClick={() => navigate(entry.path)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    {entry.type === 'dir' ? (
                      <Folder className="w-3.5 h-3.5 text-[#f5a623] shrink-0" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-[#4fc3f7] shrink-0" />
                    )}
                    <span className="truncate text-[10.5px] text-[#c7d0e0]">{entry.name}</span>
                    {entry.type === 'file' && (
                      <span className="ml-auto shrink-0 text-[9px] text-[#5a6478]">{formatSize(entry.size)}</span>
                    )}
                  </button>
                  <button
                    onClick={() => remove(entry.path)}
                    className="hidden group-hover:block p-1 rounded hover:bg-white/10 text-[#ff5757]"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
