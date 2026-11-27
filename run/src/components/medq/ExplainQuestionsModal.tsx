'use client';

/**
 * ExplainQuestionsModal — batch AI explanation generator UI.
 *
 * Flow:
 *   1. CONFIRM — shows how many questions lack explanations (whole bank) or
 *      the selected count; when launched from a selection, a "replace
 *      existing explanations" toggle enables REGENERATION (overwrite).
 *   2. RUNNING — polls the server-side job. The job is resumable: a
 *      rate-limited pass pauses server-side and auto-resumes on the next
 *      poll (shown as "Pass N"); each batch's writes are durable, so the
 *      written counter climbs in real time. "Run in background" keeps a
 *      localStorage pointer and closes the modal — reopening re-attaches.
 *   3. DONE / ERROR — summary (written / failed) with a bank refresh.
 *
 * Explanations are generated as rich structured teaching notes (why the
 * answer is correct → why each other option is wrong → key pearls →
 * one-line takeaway) and stored as styled HTML the question card renders.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Lightbulb,
  Loader2,
  Check,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  X,
} from 'lucide-react';
import { ModelPicker } from '@/components/medq/byok/ModelPicker';

/** localStorage pointer to a running explanation job (Knowledge-Library
 *  pattern — the job lives server-side in Postgres). */
const EXPLAIN_JOB_KEY = 'medq:explain-job';
const EXPLAIN_JOB_MAX_AGE_MS = 24 * 60 * 60_000;
/** No progress for this long while "running" → treat as stalled. */
const EXPLAIN_STALL_MS = 60 * 60_000;

const POLL_MIN_MS = 2_500;
const POLL_MAX_MS = 10_000;

type Phase = 'confirm' | 'running' | 'done' | 'error';

interface ExplainJobPointer {
  jobId: string;
  startedAt: number;
}

type PollResponse = {
  status?: string;
  error?: string;
  progress?: { done: number; total: number };
  written?: number;
  totalQuestions?: number;
  pass?: number;
  serverUpdatedAt?: number;
  failed?: number;
};

interface ExplainQuestionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Question ids selected in the bank (selected mode). Null/undefined =
   *  whole-bank "everything missing an explanation" mode. */
  selectedIds?: string[] | null;
  /** Called when explanations were (at least partially) written — the bank
   *  refreshes so the new explanations show up immediately. */
  onCompleted?: () => void;
}

function formatElapsed(ms: number): string {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export default function ExplainQuestionsModal({
  open,
  onOpenChange,
  selectedIds,
  onCompleted,
}: ExplainQuestionsModalProps) {
  const [phase, setPhase] = useState<Phase>('confirm');
  const [missing, setMissing] = useState<number | null>(null);
  const [bankTotal, setBankTotal] = useState<number | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [starting, setStarting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [written, setWritten] = useState(0);
  const [failed, setFailed] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [pass, setPass] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [startedAtMs, setStartedAtMs] = useState<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastServerUpdate = useRef<number>(0);
  const completedNotified = useRef(false);

  // ── Model selection (drives x-model on the start request) ──
  // undefined = not loaded yet; null = Auto; string = "providerId:modelId".
  // Initialized from the user's saved default so the picker reflects what
  // the server would use anyway; the user can override per run.
  const [userDefault, setUserDefault] = useState<string | null>(null);
  const [model, setModel] = useState<string | null | undefined>(undefined);

  const isSelectionMode = Array.isArray(selectedIds) && selectedIds.length > 0;

  // ── Confirm-step data (whole-bank mode): how many questions lack explanations ──
  useEffect(() => {
    if (!open || phase !== 'confirm') return;
    let cancelled = false;
    (async () => {
      // Best-effort parallel: missing-count (whole-bank mode) + default model.
      const modelPromise = fetch('/api/providers', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => (cancelled ? undefined : (setUserDefault(d?.userDefault ?? null), d?.userDefault ?? null)))
        .catch(() => undefined);
      if (isSelectionMode) {
        void modelPromise;
        return;
      }
      try {
        const res = await fetch('/api/questions/explain', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setMissing(typeof data.missing === 'number' ? data.missing : null);
          setBankTotal(typeof data.total === 'number' ? data.total : null);
        }
      } catch {
        /* confirm data is best-effort */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase, isSelectionMode]);

  // ── Re-attach to a running background job when the modal opens ──
  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(EXPLAIN_JOB_KEY);
      if (!raw) return;
      const ptr = JSON.parse(raw) as ExplainJobPointer;
      if (!ptr?.jobId || Date.now() - ptr.startedAt > EXPLAIN_JOB_MAX_AGE_MS) {
        localStorage.removeItem(EXPLAIN_JOB_KEY);
        return;
      }
      setJobId(ptr.jobId);
      setStartedAtMs(ptr.startedAt);
      setPhase('running');
    } catch {
      localStorage.removeItem(EXPLAIN_JOB_KEY);
    }
  }, [open]);

  // ── Elapsed ticker while running ──
  useEffect(() => {
    if (phase !== 'running') return;
    const t = setInterval(() => setElapsed(Date.now() - startedAtMs), 1000);
    return () => clearInterval(t);
  }, [phase, startedAtMs]);

  const finishJob = useCallback(
    (data: PollResponse) => {
      setFailed(typeof data.failed === 'number' ? data.failed : 0);
      setPhase('done');
      localStorage.removeItem(EXPLAIN_JOB_KEY);
      if (!completedNotified.current) {
        completedNotified.current = true;
        onCompleted?.();
      }
    },
    [onCompleted],
  );

  // ── The polling loop ──
  useEffect(() => {
    if (phase !== 'running' || !jobId) return;

    let cancelled = false;
    let delay = POLL_MIN_MS;

    const poll = async () => {
      try {
        const res = await fetch(`/api/questions/explain?jobId=${encodeURIComponent(jobId)}`, {
          cache: 'no-store',
        });
        const data: PollResponse = await res.json().catch(() => ({}));

        if (cancelled) return;

        if (data.status === 'running') {
          if (data.serverUpdatedAt && data.serverUpdatedAt !== lastServerUpdate.current) {
            lastServerUpdate.current = data.serverUpdatedAt;
            delay = POLL_MIN_MS; // server is alive — poll fast
          } else {
            delay = Math.min(delay * 1.6, POLL_MAX_MS); // quiet — back off
          }
          setProgress(data.progress ?? { done: 0, total: 0 });
          setWritten(typeof data.written === 'number' ? data.written : 0);
          setTotalQuestions(typeof data.totalQuestions === 'number' ? data.totalQuestions : 0);
          setPass(typeof data.pass === 'number' ? data.pass : 1);
          // Stalled: no server update for a very long time and not done.
          if (
            lastServerUpdate.current &&
            Date.now() - lastServerUpdate.current > EXPLAIN_STALL_MS
          ) {
            setPhase('error');
            setErrorMsg(
              'The job appears stalled (no server activity for a long time). Already-written explanations are kept — you can safely start again for the remaining ones.',
            );
            localStorage.removeItem(EXPLAIN_JOB_KEY);
            return;
          }
          pollTimer.current = setTimeout(poll, delay);
          return;
        }

        if (data.status === 'done') {
          setWritten(typeof data.written === 'number' ? data.written : 0);
          finishJob(data);
          return;
        }

        // error / unknown
        setPhase('error');
        setErrorMsg(data.error || 'Explanation generation failed.');
        localStorage.removeItem(EXPLAIN_JOB_KEY);
      } catch {
        if (cancelled) return;
        // Network hiccup — keep trying with backoff.
        delay = Math.min(delay * 1.6, POLL_MAX_MS);
        pollTimer.current = setTimeout(poll, delay);
      }
    };

    pollTimer.current = setTimeout(poll, POLL_MIN_MS);
    return () => {
      cancelled = true;
      if (pollTimer.current) clearTimeout(pollTimer.current);
    };
  }, [phase, jobId, finishJob]);

  // ── Start ──
  const handleStart = async () => {
    setStarting(true);
    setErrorMsg('');
    // Effective model: explicit per-run choice > saved default. null = Auto.
    const effectiveModel = model === undefined ? userDefault : model;
    try {
      const res = await fetch('/api/questions/explain', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(effectiveModel ? { 'x-model': effectiveModel } : {}),
        },
        body: JSON.stringify({
          ...(isSelectionMode ? { questionIds: selectedIds } : {}),
          overwrite: isSelectionMode ? overwrite : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPhase('error');
        setErrorMsg(data.error || `Failed to start (HTTP ${res.status})`);
        return;
      }
      completedNotified.current = false;
      setJobId(data.jobId);
      setStartedAtMs(Date.now());
      setElapsed(0);
      setProgress({ done: 0, total: 0 });
      setWritten(0);
      setFailed(0);
      setTotalQuestions(data.total ?? 0);
      setPass(1);
      setPhase('running');
      localStorage.setItem(
        EXPLAIN_JOB_KEY,
        JSON.stringify({ jobId: data.jobId, startedAt: Date.now() } satisfies ExplainJobPointer),
      );
    } catch (e: any) {
      setPhase('error');
      setErrorMsg(e?.message || 'Network error while starting the job');
    } finally {
      setStarting(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem(EXPLAIN_JOB_KEY);
    setJobId(null);
    setPhase('confirm');
    setErrorMsg('');
    setMissing(null);
  };

  const targetCount = isSelectionMode
    ? selectedIds!.length
    : missing ?? 0;

  const pct =
    progress.total > 0 ? Math.min(100, Math.round((progress.done / progress.total) * 100)) : 0;

  return (
    <Dialog open={open} onOpenChange={(next) => {
      if (!next && phase === 'running') {
        // Closing mid-run = run in background (the pointer stays).
        onOpenChange(false);
        return;
      }
      onOpenChange(next);
    }}>
      <DialogContent className="bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#e8ecf4] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#f59e0b]" />
            AI Explanations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ── CONFIRM ── */}
          {phase === 'confirm' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-[#f59e0b]/[0.06] border border-[#f59e0b]/15">
                <p className="text-xs leading-relaxed text-[#8b95a8]">
                  {isSelectionMode ? (
                    <>
                      Generate rich, structured teaching explanations for{' '}
                      <span className="text-[#e8ecf4] font-semibold">
                        {selectedIds!.length} selected question{selectedIds!.length === 1 ? '' : 's'}
                      </span>
                      .
                    </>
                  ) : missing === null ? (
                    'Checking how many questions lack explanations…'
                  ) : missing === 0 ? (
                    'Every question in your bank already has an explanation. 🎉'
                  ) : (
                    <>
                      <span className="text-[#e8ecf4] font-semibold">{missing}</span> of{' '}
                      {bankTotal ?? '—'} questions have no explanation. The generator writes{' '}
                      <span className="text-[#e8ecf4] font-semibold">board-style teaching notes</span>:
                      why the answer is correct, why each other option is wrong, key pearls, and a
                      one-line takeaway.
                    </>
                  )}
                </p>
              </div>

              {/* Model selection — the models from Settings → AI Providers appear here */}
              {(missing !== 0 || isSelectionMode) && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5a6478]">
                    Generate with
                  </p>
                  <ModelPicker
                    value={model === undefined ? userDefault : model}
                    onChange={(m) => setModel(m)}
                    placeholder="Auto (your default or server model)"
                  />
                  <p className="text-[9px] text-[#5a6478] leading-relaxed">
                    Every provider and model you added in Settings → AI Providers is listed here —
                    including models you registered by hand or discovered from an endpoint.
                  </p>
                </div>
              )}

              {isSelectionMode && (
                <label className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={overwrite}
                    onChange={(e) => setOverwrite(e.target.checked)}
                    className="mt-0.5 accent-[#00e5a0]"
                  />
                  <span className="text-[11px] leading-relaxed text-[#8b95a8]">
                    <span className="text-[#e8ecf4] font-semibold">Replace existing explanations.</span>{' '}
                    Regenerate even for questions that already have one (recommended after switching
                    AI models — turns thin one-liners into full teaching notes).
                  </span>
                </label>
              )}

              <ul className="space-y-1.5 text-[10px] text-[#5a6478] leading-relaxed">
                <li>• Explanations are written as they're generated — partial progress is kept even if the AI service hiccups.</li>
                <li>• Rate-limited jobs pause and auto-resume (shown as "Pass 2", "Pass 3"…).</li>
                <li>• Existing explanations are never overwritten{isSelectionMode ? ' unless you tick the replace option above' : ''}.</li>
                <li>• You can close this dialog — the job keeps running on the server and re-attaches when you return.</li>
              </ul>

              <button
                onClick={handleStart}
                disabled={starting || (isSelectionMode ? selectedIds!.length === 0 : missing === 0)}
                className="w-full h-10 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] disabled:opacity-40 text-[#0c0e14] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                {starting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Starting…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> Generate explanations
                    {targetCount > 0 ? ` for ${targetCount} question${targetCount === 1 ? '' : 's'}` : ''}
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── RUNNING ── */}
          {phase === 'running' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00e5a0]" />
                <span className="text-[#e8ecf4] font-semibold">
                  Generating explanations…
                </span>
                <span className="ml-auto text-[#5a6478] font-mono text-[10px]">
                  {formatElapsed(elapsed)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-[#8b95a8]">
                  <span>
                    Batch {Math.min(progress.done + 1, progress.total || 1)} of {progress.total || '…'}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00e5a0] to-[#00c988] transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[#00e5a0]">
                    {written} explained{totalQuestions > 0 ? ` / ${totalQuestions}` : ''}
                  </span>
                  {pass >= 2 && (
                    <span className="text-[#f59e0b]">
                      Pass {pass} — auto-resumed after a pause
                    </span>
                  )}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <p className="text-[10px] text-[#5a6478] leading-relaxed">
                  Each batch of 3 questions is written the moment it completes. If the AI service
                  rate-limits us, the job pauses and resumes automatically — your progress is never
                  lost.
                </p>
              </div>

              <button
                onClick={() => onOpenChange(false)}
                className="w-full h-9 rounded-lg border border-white/[0.08] bg-transparent hover:bg-white/[0.04] text-[#8b95a8] hover:text-[#e8ecf4] text-[11px] flex items-center justify-center gap-2 transition-colors"
              >
                Run in background
              </button>
            </div>
          )}

          {/* ── DONE ── */}
          {phase === 'done' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#00e5a0]/[0.08] border border-[#00e5a0]/20">
                <Check className="w-4 h-4 text-[#00e5a0] flex-shrink-0" />
                <p className="text-xs text-[#e8ecf4]">
                  <span className="font-semibold">{written}</span> explanation
                  {written === 1 ? '' : 's'} written
                  {failed > 0 ? (
                    <>
                      {' '}· <span className="text-[#f59e0b] font-semibold">{failed}</span>{' '}
                      couldn&apos;t be generated (the AI service refused or rate-limited them —
                      try again for just those)
                    </>
                  ) : (
                    ' — done!'
                  )}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <p className="text-[10px] text-[#5a6478] leading-relaxed">
                  Explanations include: why the correct answer is right (mechanism), why every other
                  option is wrong, key pearls, and a one-line takeaway — rendered as formatted notes
                  on each question card.
                </p>
              </div>
              <button
                onClick={() => {
                  onOpenChange(false);
                  handleReset();
                }}
                className="w-full h-10 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {/* ── ERROR ── */}
          {phase === 'error' && (
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[#ff5757]/[0.06] border border-[#ff5757]/15">
                <AlertTriangle className="w-4 h-4 text-[#ff5757] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#e8ecf4] leading-relaxed break-words">{errorMsg}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 h-10 rounded-lg bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Try again
                </button>
                <button
                  onClick={() => onOpenChange(false)}
                  className="h-10 px-4 rounded-lg border border-white/[0.08] text-[#8b95a8] hover:text-[#e8ecf4] text-xs transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
