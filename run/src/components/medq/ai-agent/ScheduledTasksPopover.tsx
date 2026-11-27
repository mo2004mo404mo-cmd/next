'use client';

/**
 * ScheduledTasksPopover — the agent's automation panel.
 *
 * Lists the user's scheduled agent jobs (created from chat via the
 * schedule_task tool, the API, or the built-in creation form) with
 * next-run countdown, status, and per-job controls: run-now (▶),
 * pause/resume, delete.
 *
 * NEW: a “+” button in the header opens an inline creation form — name,
 * prompt, and a schedule (one-shot datetime, daily/weekly time, or a raw
 * 5-field cron). Posts to the same /api/agent/tasks endpoint the chat tool
 * uses, so manually created jobs are indistinguishable from chat-created
 * ones (same queue worker, same notifications).
 *
 * Self-contained: mounts a clock icon button into the assistant panel
 * header and manages its own open state, data fetching, and mutations
 * against /api/agent/tasks.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock, Loader2, Pause, Play, Plus, Trash2, X } from 'lucide-react';

interface ScheduledTask {
  id: string;
  name: string;
  prompt: string;
  cron: string | null;
  runAt: string | null;
  timezone: string;
  status: string; // active | paused | completed | failed
  lastRunAt: string | null;
  nextRunAt: string | null;
  recurrence: string;
}

function timeUntil(iso: string | null): string {
  if (!iso) return '—';
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return 'due now';
  const mins = Math.floor(ms / 60_000);
  if (mins < 60) return `in ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `in ${hours}h ${mins % 60}m`;
  const days = Math.floor(hours / 24);
  return `in ${days}d ${hours % 24}h`;
}

const STATUS_COLOR: Record<string, string> = {
  active: '#00e5a0',
  paused: '#f5a623',
  completed: '#4fc3f7',
  failed: '#ff5757',
};

// ── Manual creation form ─────────────────────────────────────────────

type ScheduleMode = 'once' | 'daily' | 'weekly' | 'cron';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/** Cron day-of-week for a datetime-local value (0=Sun … 6=Sat → SUN…SAT). */
function cronDay(iso: string): string {
  const d = new Date(iso);
  return Number.isFinite(d.getTime()) ? DAYS[d.getDay()] : 'SUN';
}

function browserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

/** The inline “New task” form. Field contract mirrors /api/agent/tasks:
 * name ≥ 3 chars, prompt ≥ 10 chars, and either runAt (one-shot ISO) or a
 * 5-field cron + IANA timezone. */
function NewTaskForm({ onCreate, onCancel }: {
  onCreate: (payload: { name: string; prompt: string; cron: string | null; runAt: string | null; timezone: string }) => Promise<string | null>;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<ScheduleMode>('daily');
  const [at, setAt] = useState('21:00');            // daily/weekly time
  const [day, setDay] = useState('SUN');             // weekly day
  const [runAtLocal, setRunAtLocal] = useState('');  // once: datetime-local
  const [cron, setCron] = useState('0 21 * * SUN');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timezone = browserTimezone();

  const submit = async () => {
    setError(null);
    if (name.trim().length < 3) { setError('Give the task a name (3+ characters).'); return; }
    if (prompt.trim().length < 10) { setError('Describe what the agent should do (10+ characters).'); return; }
    let cronValue: string | null = null;
    let runAtValue: string | null = null;
    if (mode === 'once') {
      if (!runAtLocal) { setError('Pick a date and time.'); return; }
      const parsed = new Date(runAtLocal);
      if (Number.isNaN(parsed.getTime())) { setError('Invalid date/time.'); return; }
      if (parsed.getTime() < Date.now()) { setError('That time is in the past — pick a future one.'); return; }
      runAtValue = parsed.toISOString();
    } else if (mode === 'daily') {
      const [h, m] = at.split(':');
      cronValue = `${Number(m)} ${Number(h)} * * *`;
    } else if (mode === 'weekly') {
      const [h, m] = at.split(':');
      cronValue = `${Number(m)} ${Number(h)} * * ${day}`;
    } else {
      cronValue = cron.trim();
    }
    setBusy(true);
    const failure = await onCreate({ name: name.trim(), prompt: prompt.trim(), cron: cronValue, runAt: runAtValue, timezone });
    setBusy(false);
    if (failure) setError(failure);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#e8ecf4',
  } as const;

  return (
    <div className="border-b border-white/5 px-3 py-3" style={{ background: 'rgba(0,229,160,0.03)' }}>
      <div className="mb-2 text-[10px] font-semibold text-[#e8ecf4]">New agent task</div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task name — e.g. Weekly weak-topic quiz"
        maxLength={80}
        className="mb-1.5 w-full rounded-lg px-2 py-1.5 text-[10.5px] outline-none placeholder:text-[#5a6478] focus:border-[#00e5a0]/50"
        style={inputStyle}
      />
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What should the agent do? — e.g. Generate 20 MCQs on my weak topics and save them to the bank"
        rows={3}
        maxLength={2000}
        className="mb-1.5 w-full resize-none rounded-lg px-2 py-1.5 text-[10.5px] outline-none placeholder:text-[#5a6478] focus:border-[#00e5a0]/50"
        style={inputStyle}
      />
      <div className="mb-1.5 flex flex-wrap gap-1">
        {(['once', 'daily', 'weekly', 'cron'] as ScheduleMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className="rounded-full px-2 py-1 text-[9px] font-medium transition-colors"
            style={
              mode === m
                ? { background: '#00e5a0', color: '#06251b' }
                : { background: 'rgba(255,255,255,0.05)', color: '#9ca3b8', border: '1px solid rgba(255,255,255,0.08)' }
            }
          >
            {m === 'once' ? 'Once' : m === 'daily' ? 'Daily' : m === 'weekly' ? 'Weekly' : 'Cron'}
          </button>
        ))}
      </div>
      {mode === 'once' && (
        <input
          type="datetime-local"
          value={runAtLocal}
          onChange={(e) => setRunAtLocal(e.target.value)}
          className="mb-1.5 w-full rounded-lg px-2 py-1.5 text-[10.5px] outline-none focus:border-[#00e5a0]/50"
          style={inputStyle}
        />
      )}
      {mode === 'daily' && (
        <input
          type="time"
          value={at}
          onChange={(e) => setAt(e.target.value)}
          className="mb-1.5 w-full rounded-lg px-2 py-1.5 text-[10.5px] outline-none focus:border-[#00e5a0]/50"
          style={inputStyle}
        />
      )}
      {mode === 'weekly' && (
        <div className="mb-1.5 flex gap-1.5">
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="rounded-lg px-2 py-1.5 text-[10.5px] outline-none"
            style={inputStyle}
          >
            {DAYS.map((d) => (
              <option key={d} value={d} style={{ background: '#101422' }}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            value={at}
            onChange={(e) => setAt(e.target.value)}
            className="flex-1 rounded-lg px-2 py-1.5 text-[10.5px] outline-none focus:border-[#00e5a0]/50"
            style={inputStyle}
          />
        </div>
      )}
      {mode === 'cron' && (
        <input
          value={cron}
          onChange={(e) => setCron(e.target.value)}
          placeholder="5-field cron — e.g. 0 21 * * SUN"
          className="mb-1.5 w-full rounded-lg px-2 py-1.5 font-mono text-[10px] outline-none placeholder:text-[#5a6478] focus:border-[#00e5a0]/50"
          style={inputStyle}
        />
      )}
      <div className="mb-2 text-[8.5px] text-[#5a6478]">
        Timezone {timezone}{mode === 'once' && runAtLocal ? ` · ${cronDay(runAtLocal)} at the picked time` : ''}
      </div>
      {error && <div className="mb-2 text-[9px] text-[#ff8a8a]">{error}</div>}
      <div className="flex gap-1.5">
        <button
          type="button"
          disabled={busy}
          onClick={() => void submit()}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold disabled:opacity-50"
          style={{ background: '#00e5a0', color: '#06251b' }}
        >
          {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
          Create task
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-2.5 py-1.5 text-[10px] text-[#9ca3b8] hover:text-[#e8ecf4]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function ScheduledTasksPopover() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<ScheduledTask[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCount = tasks?.filter((t) => t.status === 'active').length ?? 0;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agent/tasks');
      const data = await res.json().catch(() => ({ tasks: [] }));
      setTasks(Array.isArray(data.tasks) ? data.tasks : []);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on open via the click handler (event-driven setState — effects
  // must not call setState synchronously). Refresh on EVERY open: jobs can
  // be created from chat or the API between opens, and a stale list is worse
  // than a cheap GET.
  const toggle = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) void load();
      return next;
    });
  }, [load]);

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

  const mutate = useCallback(async (id: string, action: 'pause' | 'resume' | 'run-now' | 'delete') => {
    setBusyId(id);
    try {
      if (action === 'delete') {
        await fetch(`/api/agent/tasks/${id}`, { method: 'DELETE' });
      } else {
        const res = await fetch(`/api/agent/tasks/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        });
        const data = await res.json().catch(() => ({}));
        if (action === 'run-now' && data?.note) setToast(String(data.note));
      }
      await load();
    } catch {
      setToast('Action failed — try again.');
    } finally {
      setBusyId(null);
    }
  }, [load]);

  // Toast auto-dismiss (external timer system).
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  /** Create a task via the same API the schedule_task chat tool uses.
   * Returns an error string on failure (the form renders it), or null on
   * success (form collapses, list refreshes, toast confirms). */
  const createTask = useCallback(async (payload: {
    name: string; prompt: string; cron: string | null; runAt: string | null; timezone: string;
  }): Promise<string | null> => {
    try {
      const res = await fetch('/api/agent/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return typeof data?.error === 'string' ? data.error : `Could not create the task (HTTP ${res.status}).`;
      }
      setShowForm(false);
      await load();
      setToast(`Task created — ${payload.cron ? 'recurring' : 'one-shot'}, next run scheduled.`);
      return null;
    } catch {
      return 'Network error — could not create the task.';
    }
  }, [load]);

  return (
    <div ref={containerRef}>
      <button
        onClick={toggle}
        className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8] relative"
        title="Scheduled agent jobs"
        aria-label="Scheduled agent jobs"
      >
        <Clock className="w-3.5 h-3.5" />
        {activeCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center text-black"
            style={{ background: '#00e5a0' }}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* Popover anchors to the PANEL (nearest positioned ancestor — the fixed
          panel root), not the tiny button wrapper: right-0 anchoring put the
          320px card 132px off-screen on phones. right-3/top-[50px] hangs it
          just below the header, inside the panel's right padding; max-w/max-h
          clamp it into the viewport on narrow/short screens. */}
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
            <div className="text-[11px] font-semibold text-[#e8ecf4]">Scheduled agent jobs</div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowForm((v) => !v)}
                className="p-1 rounded hover:bg-white/5 text-[#00e5a0]"
                title="Create a task manually"
                aria-label="Create a task manually"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setOpen(false)} className="text-[#5a6478] hover:text-[#e8ecf4]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {showForm && (
            <NewTaskForm onCreate={createTask} onCancel={() => setShowForm(false)} />
          )}

          <div className="max-h-40 sm:max-h-72 overflow-y-auto custom-scrollbar">
            {loading && tasks === null ? (
              <div className="flex items-center justify-center gap-2 py-6 text-[#5a6478] text-[10px]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading jobs…
              </div>
            ) : !tasks || tasks.length === 0 ? (
              <div className="px-3 py-5 text-center">
                <div className="text-[10px] text-[#5a6478] leading-relaxed">
                  No scheduled jobs yet.
                  <br />
                  Ask the agent:
                  <br />
                  <span className="text-[#00e5a0]">“every Sunday at 9pm, generate 20 MCQs on my weak topics”</span>
                </div>
              </div>
            ) : (
              tasks.map((task) => {
                const busy = busyId === task.id;
                return (
                  <div key={task.id} className="px-3 py-2.5 border-b border-white/5 last:border-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: STATUS_COLOR[task.status] ?? '#5a6478' }}
                            title={task.status}
                          />
                          <span className="text-[11px] font-medium text-[#e8ecf4] truncate">{task.name}</span>
                        </div>
                        <div className="text-[9px] text-[#5a6478] mt-0.5 truncate" title={task.prompt}>
                          {task.recurrence || task.prompt.slice(0, 60)}
                        </div>
                        <div className="text-[9px] text-[#80dea8] mt-0.5">
                          {task.status === 'active'
                            ? `Next run ${timeUntil(task.nextRunAt)}`
                            : task.status === 'paused'
                              ? 'Paused'
                              : task.status === 'completed'
                                ? 'Completed'
                                : 'Failed'}
                          {task.lastRunAt ? ` · last ran ${new Date(task.lastRunAt).toLocaleDateString()}` : ''}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        {busy ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5a6478]" />
                        ) : (
                          <>
                            <button
                              onClick={() => void mutate(task.id, 'run-now')}
                              className="p-1 rounded hover:bg-white/5 text-[#00e5a0]"
                              title="Run now"
                            >
                              <Play className="w-3 h-3" />
                            </button>
                            {task.status === 'active' ? (
                              <button
                                onClick={() => void mutate(task.id, 'pause')}
                                className="p-1 rounded hover:bg-white/5 text-[#f5a623]"
                                title="Pause"
                              >
                                <Pause className="w-3 h-3" />
                              </button>
                            ) : task.status === 'paused' ? (
                              <button
                                onClick={() => void mutate(task.id, 'resume')}
                                className="p-1 rounded hover:bg-white/5 text-[#4fc3f7]"
                                title="Resume"
                              >
                                <Play className="w-3 h-3" />
                              </button>
                            ) : null}
                            <button
                              onClick={() => void mutate(task.id, 'delete')}
                              className="p-1 rounded hover:bg-white/5 text-[#ff5757]"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {toast && (
            <div className="px-3 py-2 text-[9px] text-[#80dea8] border-t border-white/5">{toast}</div>
          )}

          <div className="px-3 py-2 border-t border-white/5 flex items-center gap-1.5 text-[9px] text-[#5a6478]">
            <Plus className="w-3 h-3" />
            Jobs run even when this tab is closed — create them here or by asking the agent.
          </div>
        </div>
      )}
    </div>
  );
}
