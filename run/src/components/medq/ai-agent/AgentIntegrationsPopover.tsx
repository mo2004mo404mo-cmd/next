'use client';

/**
 * AgentIntegrationsPopover — MCP servers + tool-permission settings + the
 * user's agent-skill library.
 *
 * Three tabs:
 *   • MCP Servers — add/enable/disable/test/delete external MCP servers
 *     (http | sse | stdio). Tools the servers expose are auto-synced to the
 *     agent on its next turn (gated behind HITL approvals by default).
 *   • Tool permissions — per-tool confirmation policy for the agent: "Ask"
 *     (default for consequential tools), "Never ask" (allow), or "Always
 *     ask" for tools that normally run silently — the conditional-HITL surface.
 *   • Agent skills — the AgentSkill DB library (manage_skills-authored or
 *     hand-created): enable/disable packs, create, delete, and push one into
 *     the composer. Enabled packs load into the agent's skills catalog on
 *     the next turn (progressive disclosure / load_skill).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Eye, History, Loader2, MessageSquareCode, Pencil, Plug, Plus, RefreshCw, Sparkles, Trash2, Wand2, X } from 'lucide-react';
import { AgentMarkdown } from './AgentMarkdown';

interface McpServer {
  id: string;
  name: string;
  transport: string;
  url: string | null;
  command: string | null;
  enabled: boolean;
  status: string;
  lastError: string | null;
  toolCount: number;
}

interface ToolEntry {
  tool: string;
  label: string;
  capability: string;
  gatedByDefault: boolean;
  effect: 'default' | 'allow' | 'ask';
}

interface SkillEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  source: string;
  enabled: boolean;
  contentChars: number;
  lastEditedBy: string;
}

/** Full skill row — GET /api/agent/skills?id=… (viewer dialog). */
interface SkillFull {
  id: string;
  name: string;
  description: string;
  category: string;
  source: string;
  enabled: boolean;
  content: string;
  suggestedTools: string | null;
  lastEditedBy: string;
  updatedAt: string;
}

/** Light revision row — GET /api/agent/skills/history?id=… */
interface SkillRevision {
  id: string;
  name: string;
  reason: string | null;
  editedBy: string;
  createdAt: string;
  contentChars: number;
}

/** Compact relative time for revision rows. */
function timeAgo(iso: string): string {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return '';
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

function StatusDot({ status }: { status: string }) {
  const color = status === 'ok' ? '#00e5a0' : status === 'error' ? '#ff5757' : '#9ca3b8';
  return <span className="inline-block h-1.5 w-1.5 rounded-full shrink-0" style={{ background: color }} />;
}

// ── Add-server form ─────────────────────────────────────────────────────

function AddServerForm({ onCreate, onCancel }: {
  onCreate: (payload: { name: string; transport: string; url: string; command: string; args: string; headers: string }) => Promise<string | null>;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [transport, setTransport] = useState('http');
  const [url, setUrl] = useState('');
  const [command, setCommand] = useState('');
  const [args, setArgs] = useState('');
  const [headers, setHeaders] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (name.trim().length < 2) { setError('Give the server a name (2+ characters).'); return; }
    if (transport !== 'stdio' && !/^https?:\/\/.+/i.test(url.trim())) { setError('Enter the server URL (http/https).'); return; }
    if (transport === 'stdio' && !command.trim()) { setError('Enter the command to run.'); return; }
    if (headers.trim()) {
      try { JSON.parse(headers); } catch { setError('Headers must be valid JSON ({\"Authorization\": \"Bearer …\"}).'); return; }
    }
    setBusy(true);
    const failure = await onCreate({
      name: name.trim(), transport, url: url.trim(), command: command.trim(),
      args: args.trim(), headers: headers.trim(),
    });
    setBusy(false);
    if (failure) setError(failure);
  };

  const inputCls = 'w-full rounded-lg px-2.5 py-1.5 text-[10.5px] text-[#e8ecf4] outline-none';
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };

  return (
    <div className="px-3 py-2.5 border-b border-white/5 flex flex-col gap-2">
      <input className={inputCls} style={inputStyle} placeholder="Server name (e.g. PubMed MCP)" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex gap-1">
        {['http', 'sse', 'stdio'].map((t) => (
          <button key={t} onClick={() => setTransport(t)}
            className="flex-1 rounded-lg px-2 py-1 text-[10px] font-medium"
            style={transport === t
              ? { background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }
              : { background: 'rgba(255,255,255,0.04)', color: '#9ca3b8', border: '1px solid rgba(255,255,255,0.08)' }}>
            {t}
          </button>
        ))}
      </div>
      {transport === 'stdio' ? (
        <>
          <input className={inputCls} style={inputStyle} placeholder="Command (e.g. npx)" value={command} onChange={(e) => setCommand(e.target.value)} />
          <input className={inputCls} style={inputStyle} placeholder='Arguments, comma-separated (e.g. -y,@modelcontextprotocol/server-filesystem)' value={args} onChange={(e) => setArgs(e.target.value)} />
        </>
      ) : (
        <input className={inputCls} style={inputStyle} placeholder="https://server.example.com/mcp" value={url} onChange={(e) => setUrl(e.target.value)} />
      )}
      <input className={inputCls} style={inputStyle} placeholder='Optional headers JSON ({"Authorization": "Bearer …"})' value={headers} onChange={(e) => setHeaders(e.target.value)} />
      {error && <div className="text-[10px] text-[#ff5757]">{error}</div>}
      <div className="flex gap-2">
        <button onClick={submit} disabled={busy}
          className="flex-1 rounded-lg py-1.5 text-[10.5px] font-semibold text-black flex items-center justify-center gap-1.5"
          style={{ background: busy ? 'rgba(0,229,160,0.4)' : '#00e5a0' }}>
          {busy && <Loader2 className="w-3 h-3 animate-spin" />} Add & test
        </button>
        <button onClick={onCancel} className="px-3 rounded-lg text-[10.5px] text-[#9ca3b8] hover:text-[#e8ecf4]">Cancel</button>
      </div>
    </div>
  );
}

// ── Add-skill form ──────────────────────────────────────────────────────

function AddSkillForm({ onCreate, onCancel, initial }: {
  onCreate: (payload: { name: string; description: string; content: string }) => Promise<string | null>;
  onCancel: () => void;
  /** Prefill (the AI-generate flow drops a draft here for review). */
  initial?: { name?: string; description?: string; content?: string };
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (name.trim().length < 3) { setError('Give the skill a name (3+ characters, e.g. "renal-drill").'); return; }
    if (description.trim().length < 10) { setError('Describe what it does (10+ characters).'); return; }
    setBusy(true);
    const failure = await onCreate({ name: name.trim(), description: description.trim(), content });
    setBusy(false);
    if (failure) setError(failure);
  };

  const inputCls = 'w-full rounded-lg px-2.5 py-1.5 text-[10.5px] text-[#e8ecf4] outline-none';
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };
  const counter = (n: number, max: number) => (
    <span className={n > max ? 'text-[#ff5757]' : 'text-[#5a6478]'}>{n.toLocaleString()}/{max.toLocaleString()}</span>
  );

  return (
    <div className="px-3 py-2.5 border-b border-white/5 flex flex-col gap-2">
      {initial && (
        <div className="text-[9px] text-[#a78bfa] flex items-center gap-1">
          <Wand2 className="w-3 h-3" /> AI draft loaded — review, edit, then save.
        </div>
      )}
      <input className={inputCls} style={inputStyle} placeholder="Skill name (e.g. osce-practice-drill)" value={name} onChange={(e) => setName(e.target.value)} />
      <div>
        <textarea
          className={`${inputCls} resize-none`}
          style={{ ...inputStyle, minHeight: '40px' }}
          placeholder="What the skill does and when the agent should use it"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <div className="mt-0.5 text-right text-[8.5px]">{counter(description.length, 1024)}</div>
      </div>
      <div>
        <textarea
          className={`${inputCls} resize-none font-mono`}
          style={{ ...inputStyle, minHeight: '120px' }}
          placeholder="SKILL.md body — when to use it, the workflow steps, and the output format"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={7}
        />
        <div className="mt-0.5 text-right text-[8.5px]">{counter(content.length, 200000)}</div>
      </div>
      {error && <div className="text-[10px] text-[#ff5757]">{error}</div>}
      <div className="flex gap-2">
        <button onClick={submit} disabled={busy}
          className="flex-1 rounded-lg py-1.5 text-[10.5px] font-semibold text-black flex items-center justify-center gap-1.5"
          style={{ background: busy ? 'rgba(0,229,160,0.4)' : '#00e5a0' }}>
          {busy && <Loader2 className="w-3 h-3 animate-spin" />} Save skill
        </button>
        <button onClick={onCancel} className="px-3 rounded-lg text-[10.5px] text-[#9ca3b8] hover:text-[#e8ecf4]">Cancel</button>
      </div>
    </div>
  );
}

// ── Import-from-web form ────────────────────────────────────────────────

function ImportSkillForm({ onImport, onCancel }: {
  onImport: (url: string) => Promise<string | null>;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (!/^https?:\/\/.+\..+/i.test(url.trim())) { setError('Paste a URL — e.g. a GitHub skill folder or SKILL.md file.'); return; }
    setBusy(true);
    const failure = await onImport(url.trim());
    setBusy(false);
    if (failure) setError(failure);
  };

  const inputCls = 'w-full rounded-lg px-2.5 py-1.5 text-[10.5px] text-[#e8ecf4] outline-none';
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };

  return (
    <div className="px-3 py-2.5 border-b border-white/5 flex flex-col gap-2">
      <input className={inputCls} style={inputStyle} placeholder="https://github.com/anthropics/skills/tree/main/skills/canvas-design" value={url} onChange={(e) => setUrl(e.target.value)} />
      <div className="text-[9px] text-[#5a6478] leading-relaxed">
        Any public SKILL.md: GitHub file/folder links (…/blob/… or …/tree/…) or raw URLs. The pack imports into your library, enabled.
      </div>
      {error && <div className="text-[10px] text-[#ff5757]">{error}</div>}
      <div className="flex gap-2">
        <button onClick={submit} disabled={busy}
          className="flex-1 rounded-lg py-1.5 text-[10.5px] font-semibold text-black flex items-center justify-center gap-1.5"
          style={{ background: busy ? 'rgba(0,229,160,0.4)' : '#00e5a0' }}>
          {busy && <Loader2 className="w-3 h-3 animate-spin" />} Import skill
        </button>
        <button onClick={onCancel} className="px-3 rounded-lg text-[10.5px] text-[#9ca3b8] hover:text-[#e8ecf4]">Cancel</button>
      </div>
    </div>
  );
}

// ── AI-generate form ────────────────────────────────────────────────────

function GenerateSkillForm({ onGenerate, onCancel }: {
  onGenerate: (prompt: string) => Promise<{ name: string; description: string; content: string } | null>;
  onCancel: () => void;
}) {
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (prompt.trim().length < 5) { setError('Describe the skill you want the AI to write.'); return; }
    setBusy(true);
    const draft = await onGenerate(prompt.trim());
    setBusy(false);
    if (!draft) setError('Generation failed — try again or rephrase.');
  };

  const inputCls = 'w-full rounded-lg px-2.5 py-1.5 text-[10.5px] text-[#e8ecf4] outline-none';
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };

  return (
    <div className="px-3 py-2.5 border-b border-white/5 flex flex-col gap-2">
      <textarea
        className={`${inputCls} resize-none`}
        style={{ ...inputStyle, minHeight: '60px' }}
        placeholder="Describe the skill — e.g. a drill that quizzes me on ECG rhythms with audio, then explains each one with a cheat-sheet table"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
      />
      <div className="text-[9px] text-[#5a6478] leading-relaxed">
        The fast model drafts a SKILL.md referencing MedQ&rsquo;s real tools; you review and save it.
      </div>
      {error && <div className="text-[10px] text-[#ff5757]">{error}</div>}
      <div className="flex gap-2">
        <button onClick={submit} disabled={busy}
          className="flex-1 rounded-lg py-1.5 text-[10.5px] font-semibold text-black flex items-center justify-center gap-1.5"
          style={{ background: busy ? 'rgba(167,139,250,0.4)' : '#a78bfa' }}>
          {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />} {busy ? 'Drafting…' : 'Generate draft'}
        </button>
        <button onClick={onCancel} className="px-3 rounded-lg text-[10.5px] text-[#9ca3b8] hover:text-[#e8ecf4]">Cancel</button>
      </div>
    </div>
  );
}

// ── Skill viewer/edit dialog ────────────────────────────────────────────

function SkillViewerDialog({ skill, busy, onClose, onSave, onUseSkill, onSkillChanged }: {
  skill: SkillFull;
  busy: boolean;
  onClose: () => void;
  onSave: (patch: { name: string; description: string; content: string }) => Promise<string | null>;
  onUseSkill?: (skillName: string) => void;
  /** Fired after a version restore so the parent refetches skill + list. */
  onSkillChanged?: () => void;
}) {
  const canEdit = skill.source !== 'builtin';
  const [mode, setMode] = useState<'view' | 'edit' | 'history'>('view');
  const [name, setName] = useState(skill.name);
  const [description, setDescription] = useState(skill.description);
  const [content, setContent] = useState(skill.content);
  const [error, setError] = useState<string | null>(null);
  const [revisions, setRevisions] = useState<SkillRevision[] | null>(null);
  const [revisionDetail, setRevisionDetail] = useState<{ id: string; content: string; createdAt: string } | null>(null);
  const [historyBusy, setHistoryBusy] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  useEffect(() => {
    // Re-sync when the parent loads a different skill (or restores a version).
    setName(skill.name);
    setDescription(skill.description);
    setContent(skill.content);
    setMode('view');
    setError(null);
    setRevisions(null);
    setRevisionDetail(null);
  }, [skill.id, skill.name, skill.description, skill.content]);

  const save = async () => {
    setError(null);
    if (name.trim().length < 3) { setError('Name must be 3+ characters.'); return; }
    if (description.trim().length < 10) { setError('Description must be 10+ characters.'); return; }
    const failure = await onSave({ name: name.trim(), description: description.trim(), content });
    if (failure) { setError(failure); return; }
    setMode('view');
  };

  const openHistory = async () => {
    setMode('history');
    setRevisionDetail(null);
    setRevisions(null);
    setHistoryBusy(true);
    try {
      const res = await fetch(`/api/agent/skills/history?id=${encodeURIComponent(skill.id)}`);
      const data = await res.json().catch(() => ({}));
      setRevisions(Array.isArray(data.revisions) ? data.revisions : []);
    } catch {
      setRevisions([]);
    } finally {
      setHistoryBusy(false);
    }
  };

  const viewRevision = async (id: string) => {
    setHistoryBusy(true);
    try {
      const res = await fetch(`/api/agent/skills/history?revisionId=${encodeURIComponent(id)}`);
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.revision) {
        setRevisionDetail({
          id,
          content: String(data.revision.content ?? ''),
          createdAt: String(data.revision.createdAt ?? ''),
        });
      }
    } catch {
      // Keep the list on failure.
    } finally {
      setHistoryBusy(false);
    }
  };

  const restoreRevision = async (id: string) => {
    setRestoringId(id);
    setError(null);
    try {
      const res = await fetch('/api/agent/skills/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revisionId: id }),
      });
      if (res.ok) {
        onSkillChanged?.();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(String(data.error ?? 'Restore failed.'));
      }
    } catch {
      setError('Network error — try again.');
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(5,8,16,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: '#0f1422', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: skill.enabled ? '#00e5a0' : '#5a6478' }} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-[13px] font-semibold text-[#e8ecf4]">{skill.name}</span>
              <span
                className="shrink-0 rounded px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wide uppercase"
                style={skill.source === 'builtin'
                  ? { background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }
                  : { background: 'rgba(79,195,247,0.12)', color: '#4fc3f7' }}
              >
                {skill.source}
              </span>
              {skill.lastEditedBy === 'agent' && (
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wide"
                  style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}
                  title="The current version was written by the agent's self-improvement loop — earlier versions restorable via History"
                >
                  AGENT-TUNED
                </span>
              )}
              <span className="text-[9px] text-[#5a6478]">{skill.content.length.toLocaleString()} chars</span>
            </div>
            {mode !== 'edit' && <div className="mt-0.5 text-[10px] text-[#8b94a8] leading-snug">{skill.description}</div>}
          </div>
          {onUseSkill && (
            <button
              onClick={() => { onUseSkill(skill.name); onClose(); }}
              disabled={!skill.enabled}
              className="shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-black disabled:opacity-30"
              style={{ background: '#00e5a0' }}
              title={skill.enabled ? 'Use this skill in chat' : 'Enable the skill first'}
            >
              Use in chat
            </button>
          )}
          {canEdit && mode === 'view' && (
            <button onClick={() => setMode('edit')} className="shrink-0 p-1.5 rounded hover:bg-white/5 text-[#4fc3f7]" title="Edit skill">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
          {canEdit && (
            <button onClick={() => void openHistory()} disabled={historyBusy}
              className="shrink-0 p-1.5 rounded hover:bg-white/5 text-[#9ca3b8] hover:text-[#e8ecf4] disabled:opacity-40"
              title="Version history — every agent improvement and edit keeps a restorable snapshot">
              <History className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={onClose} className="shrink-0 text-[#5a6478] hover:text-[#e8ecf4]" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {mode === 'edit' ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-3 flex flex-col gap-2">
            <input
              className="w-full rounded-lg px-2.5 py-1.5 text-[11px] text-[#e8ecf4] outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Skill name"
            />
            <textarea
              className="w-full rounded-lg px-2.5 py-1.5 text-[10.5px] text-[#e8ecf4] outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Description"
            />
            <div className="text-right text-[8.5px] text-[#5a6478]">{description.length}/1024</div>
            <textarea
              className="w-full flex-1 min-h-[240px] rounded-lg px-3 py-2 text-[10.5px] font-mono text-[#e8ecf4] outline-none resize-none custom-scrollbar"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="text-right text-[8.5px] text-[#5a6478]">{content.length.toLocaleString()}/200,000</div>
            {error && <div className="text-[10px] text-[#ff5757]">{error}</div>}
            <div className="flex gap-2 justify-end">
              <button onClick={() => { setMode('view'); setName(skill.name); setDescription(skill.description); setContent(skill.content); setError(null); }}
                className="px-3 rounded-lg py-1.5 text-[10.5px] text-[#9ca3b8] hover:text-[#e8ecf4]">
                Discard changes
              </button>
              <button onClick={save} disabled={busy}
                className="rounded-lg px-4 py-1.5 text-[10.5px] font-semibold text-black flex items-center gap-1.5"
                style={{ background: busy ? 'rgba(0,229,160,0.4)' : '#00e5a0' }}>
                {busy && <Loader2 className="w-3 h-3 animate-spin" />} Save changes
              </button>
            </div>
          </div>
        ) : mode === 'history' ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-3 flex flex-col gap-2">
            {revisionDetail ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  <button onClick={() => setRevisionDetail(null)} className="text-[10px] text-[#4fc3f7] hover:underline">
                    &larr; Back to history
                  </button>
                  <span className="text-[9px] text-[#5a6478]">Viewing the version from {timeAgo(revisionDetail.createdAt)}</span>
                </div>
                <div className="flex-1 min-h-[240px] overflow-y-auto custom-scrollbar rounded-lg px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <AgentMarkdown text={revisionDetail.content || '_Empty revision._'} />
                </div>
                <div className="flex justify-end">
                  <button onClick={() => void restoreRevision(revisionDetail.id)} disabled={restoringId !== null}
                    className="rounded-lg px-4 py-1.5 text-[10.5px] font-semibold text-black flex items-center gap-1.5"
                    style={{ background: restoringId ? 'rgba(0,229,160,0.4)' : '#00e5a0' }}>
                    {restoringId ? <Loader2 className="w-3 h-3 animate-spin" /> : <History className="w-3 h-3" />} Restore this version
                  </button>
                </div>
              </>
            ) : historyBusy || revisions === null ? (
              <div className="flex items-center justify-center gap-2 py-8 text-[#5a6478] text-[10px]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading history…
              </div>
            ) : revisions.length === 0 ? (
              <div className="px-2 py-6 text-center text-[10px] text-[#5a6478] leading-relaxed">
                No version history yet.
                <br />
                Agent improvements and your edits snapshot the prior version here automatically.
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="text-[9.5px] text-[#5a6478]">Every change keeps a restorable snapshot of what came before.</div>
                {revisions.map((rev) => (
                  <div key={rev.id} className="flex items-center gap-2 rounded-lg px-2.5 py-2"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wide uppercase"
                      style={rev.editedBy === 'agent'
                        ? { background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }
                        : rev.editedBy === 'user'
                          ? { background: 'rgba(79,195,247,0.12)', color: '#4fc3f7' }
                          : { background: 'rgba(255,255,255,0.06)', color: '#9ca3b8' }}
                      title={`Version written by ${rev.editedBy}`}
                    >
                      {rev.editedBy}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[10px] text-[#c7d0e0]" title={rev.reason ?? ''}>{rev.reason ?? 'Version snapshot'}</div>
                      <div className="text-[8.5px] text-[#5a6478]">{timeAgo(rev.createdAt)} · {rev.contentChars.toLocaleString()} chars</div>
                    </div>
                    <button onClick={() => void viewRevision(rev.id)} disabled={historyBusy}
                      className="p-1 rounded hover:bg-white/5 text-[#9ca3b8] hover:text-[#e8ecf4] disabled:opacity-40" title="View this version">
                      <Eye className="w-3 h-3" />
                    </button>
                    <button onClick={() => void restoreRevision(rev.id)} disabled={restoringId !== null || historyBusy}
                      className="p-1 rounded hover:bg-white/5 text-[#00e5a0] disabled:opacity-40" title="Restore this version">
                      {restoringId === rev.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <History className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
            {error && <div className="text-[10px] text-[#ff5757]">{error}</div>}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4">
            <AgentMarkdown text={skill.content || '_This skill has no body._'} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main popover ────────────────────────────────────────────────────────

export function AgentIntegrationsPopover({ onUseSkill }: { onUseSkill?: (skillName: string) => void } = {}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'mcp' | 'tools' | 'skills'>('mcp');
  const [servers, setServers] = useState<McpServer[] | null>(null);
  const [tools, setTools] = useState<ToolEntry[] | null>(null);
  const [skills, setSkills] = useState<SkillEntry[] | null>(null);
  const [toolSearch, setToolSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [skillForm, setSkillForm] = useState<'create' | 'import' | 'generate' | null>(null);
  const [skillDraft, setSkillDraft] = useState<{ name?: string; description?: string; content?: string } | undefined>(undefined);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [viewingSkill, setViewingSkill] = useState<SkillFull | null>(null);
  const [viewingBusy, setViewingBusy] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    try {
      const [mcpRes, permRes, skillRes] = await Promise.all([
        fetch('/api/agent/mcp/servers'),
        fetch('/api/agent/permissions'),
        fetch('/api/agent/skills'),
      ]);
      const mcpData = await mcpRes.json().catch(() => ({ servers: [] }));
      const permData = await permRes.json().catch(() => ({ tools: [] }));
      const skillData = await skillRes.json().catch(() => ({ skills: [] }));
      setServers(Array.isArray(mcpData.servers) ? mcpData.servers : []);
      setTools(Array.isArray(permData.tools) ? permData.tools : []);
      setSkills(Array.isArray(skillData.skills) ? skillData.skills : []);
    } catch {
      setServers([]);
      setTools([]);
      setSkills([]);
    }
  }, []);

  const toggle = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) void load();
      return next;
    });
  }, [load]);

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

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const createServer = async (payload: { name: string; transport: string; url: string; command: string; args: string; headers: string }): Promise<string | null> => {
    try {
      const body: Record<string, unknown> = { name: payload.name, transport: payload.transport };
      if (payload.transport === 'stdio') {
        body.command = payload.command;
        if (payload.args) body.args = payload.args.split(',').map((a) => a.trim()).filter(Boolean);
      } else {
        body.url = payload.url;
      }
      if (payload.headers) body.headers = JSON.parse(payload.headers);
      const res = await fetch('/api/agent/mcp/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return String(data.error ?? 'Failed to add the server.');
      setShowForm(false);
      await load();
      const test = data.test as { ok?: boolean; toolCount?: number; error?: string } | null;
      setToast(test ? (test.ok ? `Connected — ${test.toolCount} tools available` : `Saved, but the test failed: ${test.error ?? 'unknown'}`) : 'Server added.');
      return null;
    } catch {
      return 'Network error — try again.';
    }
  };

  const serverAction = async (id: string, action: 'toggle' | 'test' | 'delete', enabled?: boolean) => {
    setBusyId(id);
    try {
      if (action === 'delete') {
        await fetch(`/api/agent/mcp/servers/${id}`, { method: 'DELETE' });
      } else if (action === 'test') {
        const res = await fetch(`/api/agent/mcp/servers/${id}`, { method: 'POST' });
        const data = await res.json().catch(() => ({}));
        setToast(data.ok ? `Connected — ${data.toolCount} tools` : `Test failed: ${data.error ?? 'unknown'}`);
      } else {
        await fetch(`/api/agent/mcp/servers/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled }),
        });
      }
      await load();
    } catch {
      setToast('Action failed — try again.');
    } finally {
      setBusyId(null);
    }
  };

  const setToolEffect = async (tool: string, effect: 'default' | 'allow' | 'ask') => {
    setTools((prev) => prev?.map((t) => (t.tool === tool ? { ...t, effect } : t)) ?? prev);
    try {
      await fetch('/api/agent/permissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, effect }),
      });
    } catch {
      setToast('Could not save the setting.');
      await load();
    }
  };

  const createSkill = async (payload: { name: string; description: string; content: string }): Promise<string | null> => {
    try {
      const res = await fetch('/api/agent/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return String(data.error ?? 'Failed to save the skill.');
      setSkillForm(null);
      setSkillDraft(undefined);
      await load();
      setToast(`Skill "${data.name ?? payload.name}" saved — it loads on the agent's next turn.`);
      return null;
    } catch {
      return 'Network error — try again.';
    }
  };

  const importSkill = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch('/api/agent/skills/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return String(data.error ?? 'Import failed.');
      setSkillForm(null);
      await load();
      setToast(`Imported "${data.name}" (${(data.contentChars ?? 0).toLocaleString()} chars) — enabled and ready.`);
      return null;
    } catch {
      return 'Network error — try again.';
    }
  };

  const generateSkill = async (prompt: string): Promise<{ name: string; description: string; content: string } | null> => {
    try {
      const res = await fetch('/api/agent/skills/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.draft) return null;
      // Drop the draft into the create form for review — the user saves it.
      setSkillDraft(data.draft);
      setSkillForm('create');
      return data.draft;
    } catch {
      return null;
    }
  };

  const openViewer = useCallback(async (id: string) => {
    setViewingId(id);
    setViewingSkill(null);
    try {
      const res = await fetch(`/api/agent/skills?id=${encodeURIComponent(id)}`);
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.skill) {
        setViewingSkill(data.skill as SkillFull);
      } else {
        setViewingId(null);
        setToast(String(data.error ?? 'Could not load the skill.'));
      }
    } catch {
      setViewingId(null);
      setToast('Could not load the skill.');
    }
  }, []);

  const saveViewingSkill = async (patch: { name: string; description: string; content: string }): Promise<string | null> => {
    if (!viewingSkill) return 'No skill loaded.';
    setViewingBusy(true);
    try {
      const res = await fetch('/api/agent/skills', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: viewingSkill.id, ...patch }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return String(data.error ?? 'Failed to save.');
      // Refresh both the dialog and the list.
      const refreshed = { ...viewingSkill, ...patch };
      setViewingSkill(refreshed);
      await load();
      setToast('Skill updated — the agent picks up the change on its next turn.');
      return null;
    } catch {
      return 'Network error — try again.';
    } finally {
      setViewingBusy(false);
    }
  };

  const skillAction = async (id: string, action: 'toggle' | 'delete', enabled?: boolean) => {
    setBusyId(id);
    try {
      if (action === 'delete') {
        await fetch(`/api/agent/skills?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      } else {
        await fetch('/api/agent/skills', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, enabled }),
        });
      }
      await load();
    } catch {
      setToast('Action failed — try again.');
    } finally {
      setBusyId(null);
    }
  };

  const filteredTools = (tools ?? []).filter((t) =>
    !toolSearch.trim() ||
    t.tool.toLowerCase().includes(toolSearch.trim().toLowerCase()) ||
    t.label.toLowerCase().includes(toolSearch.trim().toLowerCase())
  );

  const filteredSkills = (skills ?? []).filter((s) =>
    !skillSearch.trim() ||
    s.name.toLowerCase().includes(skillSearch.trim().toLowerCase()) ||
    s.description.toLowerCase().includes(skillSearch.trim().toLowerCase())
  );

  const segBtn = (active: boolean) => ({
    background: active ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
    color: active ? '#c4b5fd' : '#9ca3b8',
    border: active ? '1px solid rgba(139,92,246,0.45)' : '1px solid rgba(255,255,255,0.08)',
  });

  return (
    <div ref={containerRef}>
      <button
        onClick={toggle}
        className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
        title="Integrations (MCP servers & tool permissions)"
        aria-label="Integrations"
      >
        <Plug className="w-3.5 h-3.5" />
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
            <div className="text-[11px] font-semibold text-[#e8ecf4]">Integrations</div>
            <div className="flex items-center gap-1">
              <button onClick={() => void load()} className="p-1 rounded hover:bg-white/5 text-[#9ca3b8]" title="Refresh">
                <RefreshCw className="w-3 h-3" />
              </button>
              <button onClick={() => setOpen(false)} className="text-[#5a6478] hover:text-[#e8ecf4]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-3 pt-2">
            <button onClick={() => setTab('mcp')}
              className="flex-1 rounded-lg px-2 py-1.5 text-[10.5px] font-medium"
              style={tab === 'mcp' ? segBtn(true) : segBtn(false)}>
              MCP Servers
            </button>
            <button onClick={() => setTab('tools')}
              className="flex-1 rounded-lg px-2 py-1.5 text-[10.5px] font-medium"
              style={tab === 'tools' ? segBtn(true) : segBtn(false)}>
              Tool permissions
            </button>
            <button onClick={() => setTab('skills')}
              className="flex-1 rounded-lg px-2 py-1.5 text-[10.5px] font-medium"
              style={tab === 'skills' ? segBtn(true) : segBtn(false)}>
              Agent skills
            </button>
          </div>

          {tab === 'mcp' ? (
            <>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-[9.5px] text-[#5a6478]">External tool servers — every tool they expose is approval-gated.</div>
                <button onClick={() => setShowForm((v) => !v)}
                  className="p-1 rounded hover:bg-white/5 text-[#00e5a0]" title="Add a server">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              {showForm && <AddServerForm onCreate={createServer} onCancel={() => setShowForm(false)} />}

              {servers === null ? (
                <div className="flex items-center justify-center gap-2 py-6 text-[#5a6478] text-[10px]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading…
                </div>
              ) : servers.length === 0 ? (
                <div className="px-3 py-5 text-center text-[10px] text-[#5a6478] leading-relaxed">
                  No MCP servers connected.
                  <br />
                  Add one with <span className="text-[#00e5a0]">+</span> — its tools join the agent automatically.
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {servers.map((server) => (
                    <div key={server.id} className="px-3 py-2.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <StatusDot status={server.status} />
                        <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-[#c7d0e0]">{server.name}</span>
                        <span className="text-[9px] text-[#5a6478]">{server.toolCount} tools</span>
                        {/* Enabled toggle */}
                        <button
                          onClick={() => serverAction(server.id, 'toggle', !server.enabled)}
                          disabled={busyId === server.id}
                          className="relative h-3.5 w-6 rounded-full transition-colors"
                          style={{ background: server.enabled ? 'rgba(0,229,160,0.5)' : 'rgba(255,255,255,0.12)' }}
                          title={server.enabled ? 'Disable' : 'Enable'}
                        >
                          <span
                            className="absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all"
                            style={{ left: server.enabled ? '12px' : '2px' }}
                          />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[9px] text-[#5a6478]">
                            {server.transport} · {server.url ?? server.command ?? ''}
                          </div>
                          {server.lastError && (
                            <div className="truncate text-[9px] text-[#ff5757]" title={server.lastError}>{server.lastError}</div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => serverAction(server.id, 'test')} disabled={busyId === server.id}
                            className="p-1 rounded hover:bg-white/5 text-[#4fc3f7]" title="Test connection">
                            {busyId === server.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                          </button>
                          <button onClick={() => serverAction(server.id, 'delete')} disabled={busyId === server.id}
                            className="p-1 rounded hover:bg-white/5 text-[#ff5757]" title="Remove server">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : tab === 'tools' ? (
            <>
              <div className="px-3 py-2">
                <input
                  className="w-full rounded-lg px-2.5 py-1.5 text-[10.5px] text-[#e8ecf4] outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  placeholder="Search tools…"
                  value={toolSearch}
                  onChange={(e) => setToolSearch(e.target.value)}
                />
                <div className="mt-1 flex items-center gap-1 text-[9px] text-[#5a6478]">
                  <MessageSquareCode className="w-3 h-3" />
                  Consequential tools ask by default — change that per tool here.
                </div>
              </div>
              {tools === null ? (
                <div className="flex items-center justify-center gap-2 py-6 text-[#5a6478] text-[10px]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading…
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {filteredTools.map((entry) => (
                    <div key={entry.tool} className="px-3 py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-[10.5px] text-[#c7d0e0]">{entry.label}</div>
                          <div className="truncate text-[9px] text-[#5a6478]">{entry.tool}</div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {entry.gatedByDefault ? (
                            <>
                              <button onClick={() => setToolEffect(entry.tool, 'default')}
                                className="rounded-md px-2 py-1 text-[9px] font-medium"
                                style={segBtn(entry.effect !== 'allow')}>
                                Ask
                              </button>
                              <button onClick={() => setToolEffect(entry.tool, 'allow')}
                                className="rounded-md px-2 py-1 text-[9px] font-medium"
                                style={segBtn(entry.effect === 'allow')}>
                                Never ask
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => setToolEffect(entry.tool, 'default')}
                                className="rounded-md px-2 py-1 text-[9px] font-medium"
                                style={segBtn(entry.effect !== 'ask')}>
                                Auto
                              </button>
                              <button onClick={() => setToolEffect(entry.tool, 'ask')}
                                className="rounded-md px-2 py-1 text-[9px] font-medium"
                                style={segBtn(entry.effect === 'ask')}>
                                Always ask
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-[9.5px] text-[#5a6478]">Reusable workflows the agent loads on demand — click a skill to read it.</div>
                <div className="flex items-center gap-0.5">
                  <button onClick={() => setSkillForm(skillForm === 'create' ? null : 'create')}
                    className="p-1 rounded hover:bg-white/5 text-[#00e5a0]" title="Write a skill by hand">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setSkillForm(skillForm === 'import' ? null : 'import')}
                    className="p-1 rounded hover:bg-white/5 text-[#4fc3f7]" title="Import a skill from the web (GitHub / any SKILL.md URL)">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setSkillForm(skillForm === 'generate' ? null : 'generate')}
                    className="p-1 rounded hover:bg-white/5 text-[#a78bfa]" title="Let the AI draft a skill">
                    <Wand2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {skills !== null && skills.length > 3 && (
                <div className="px-3 pb-2">
                  <input
                    className="w-full rounded-lg px-2.5 py-1.5 text-[10.5px] text-[#e8ecf4] outline-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    placeholder="Search skills…"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                  />
                </div>
              )}

              {skillForm === 'create' && <AddSkillForm onCreate={createSkill} onCancel={() => { setSkillForm(null); setSkillDraft(undefined); }} initial={skillDraft} />}
              {skillForm === 'import' && <ImportSkillForm onImport={importSkill} onCancel={() => setSkillForm(null)} />}
              {skillForm === 'generate' && <GenerateSkillForm onGenerate={generateSkill} onCancel={() => setSkillForm(null)} />}

              {skills === null ? (
                <div className="flex items-center justify-center gap-2 py-6 text-[#5a6478] text-[10px]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading…
                </div>
              ) : skills.length === 0 ? (
                <div className="px-3 py-5 text-center text-[10px] text-[#5a6478] leading-relaxed">
                  No skills yet.
                  <br />
                  Ask the agent to “save this approach as a skill”, or add one with <span className="text-[#00e5a0]">+</span>.
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {filteredSkills.map((skill) => (
                    <div key={skill.id} className="px-3 py-2.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="shrink-0 inline-flex"
                          title={skill.lastEditedBy === 'agent' ? 'Enhanced by the agent — earlier versions restorable in the viewer' : undefined}
                        >
                          <Sparkles
                            className="w-3 h-3"
                            style={{ color: skill.enabled ? (skill.lastEditedBy === 'agent' ? '#a78bfa' : '#00e5a0') : '#5a6478' }}
                          />
                        </span>
                        <button
                          onClick={() => void openViewer(skill.id)}
                          className="min-w-0 flex-1 truncate text-left text-[10.5px] font-medium text-[#c7d0e0] hover:text-[#e8ecf4] underline decoration-white/20 underline-offset-2 hover:decoration-[#00e5a0]"
                          title="View the skill content"
                        >
                          {skill.name}
                        </button>
                        <span className="text-[9px] text-[#5a6478] shrink-0" title={`${skill.contentChars.toLocaleString()} chars of skill content`}>{skill.contentChars.toLocaleString()} ch</span>
                        {skill.source === 'builtin' ? (
                          <span
                            className="shrink-0 rounded px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wide"
                            style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}
                            title="Shipped with MedQ — always available, managed by the operator"
                          >
                            BUILT-IN
                          </span>
                        ) : (
                          <span className="text-[9px] text-[#5a6478] shrink-0">{skill.source}</span>
                        )}
                        {/* Enabled toggle — user skills only (builtins are operator-managed) */}
                        {skill.source !== 'builtin' && (
                          <button
                            onClick={() => skillAction(skill.id, 'toggle', !skill.enabled)}
                            disabled={busyId === skill.id}
                            className="relative h-3.5 w-6 rounded-full transition-colors shrink-0"
                            style={{ background: skill.enabled ? 'rgba(0,229,160,0.5)' : 'rgba(255,255,255,0.12)' }}
                            title={skill.enabled ? 'Disable' : 'Enable'}
                          >
                            <span
                              className="absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all"
                              style={{ left: skill.enabled ? '12px' : '2px' }}
                            />
                          </button>
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[9px] text-[#5a6478]" title={skill.description}>{skill.description}</div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => void openViewer(skill.id)}
                            className="p-1 rounded hover:bg-white/5 text-[#9ca3b8] hover:text-[#e8ecf4]"
                            title="View / edit the skill content"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          {onUseSkill && (
                            <button
                              onClick={() => {
                                onUseSkill(skill.name);
                                setOpen(false);
                              }}
                              disabled={!skill.enabled}
                              className="p-1 rounded hover:bg-white/5 text-[#4fc3f7] disabled:opacity-30"
                              title={skill.enabled ? 'Use this skill in chat' : 'Enable the skill first'}
                            >
                              <MessageSquareCode className="w-3 h-3" />
                            </button>
                          )}
                          <button onClick={() => skillAction(skill.id, 'delete')} disabled={busyId === skill.id || skill.source === 'builtin'}
                            className="p-1 rounded hover:bg-white/5 text-[#ff5757] disabled:opacity-0 disabled:pointer-events-none"
                            title={skill.source === 'builtin' ? 'Built-in skills cannot be deleted' : 'Delete skill'}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredSkills.length === 0 && (
                    <div className="px-3 py-4 text-center text-[10px] text-[#5a6478]">No skills match “{skillSearch}”.</div>
                  )}
                </div>
              )}
            </>
          )}

          {toast && (
            <div className="px-3 py-2 border-t border-white/5 text-[10px] text-[#00e5a0]">{toast}</div>
          )}
        </div>
      )}

      {/* Skill viewer/edit dialog — rendered OUTSIDE the popover so its
          position:fixed layer isn't trapped by the popover's backdropFilter
          containing block. */}
      {viewingId && (
        viewingSkill ? (
          <SkillViewerDialog
            skill={viewingSkill}
            busy={viewingBusy}
            onClose={() => { setViewingId(null); setViewingSkill(null); }}
            onSave={saveViewingSkill}
            onUseSkill={onUseSkill ? (name) => { onUseSkill(name); setOpen(false); } : undefined}
            onSkillChanged={() => { void openViewer(viewingSkill.id); void load(); }}
          />
        ) : (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'rgba(5,8,16,0.7)' }}
            onClick={() => setViewingId(null)}
          >
            <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: '#0f1422', border: '1px solid rgba(255,255,255,0.12)' }}>
              <Loader2 className="w-4 h-4 animate-spin text-[#00e5a0]" />
              <span className="text-[11px] text-[#c7d0e0]">Loading skill…</span>
            </div>
          </div>
        )
      )}
    </div>
  );
}
