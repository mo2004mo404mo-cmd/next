'use client';

/**
 * ImportQuestionsModal — import questions from a file into the Question Bank.
 *
 * Flow:
 *   1. User uploads a file (JSON / CSV / TXT / MD / DOCX / PDF) or pastes text
 *   2. Structured files (JSON/CSV) are parsed directly in the browser
 *   3. Unstructured files (TXT/MD/DOCX/PDF) and pasted text go through
 *      POST /api/questions/import/extract — AI pulls out every question
 *   4. Parsed questions are previewed — each can be included/excluded
 *      and edited inline (pencil button) before import
 *   5. Import posts the final selection to POST /api/questions/import
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  UploadCloud,
  FileJson,
  FileSpreadsheet,
  FileText,
  ClipboardPaste,
  Loader2,
  Check,
  CheckCircle2,
  Sparkles,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Trash2,
  Pencil,
  Plus,
  X,
  Image as ImageIcon,
  Square,
  ScanSearch,
  FileSearch,
  Clock,
  RefreshCw,
} from 'lucide-react';

/** localStorage pointer to a running/finished extraction job, so the user
 *  can close the page mid-extraction and re-attach on return (the job itself
 *  lives server-side in the DB — Knowledge-Library pattern). */
const EXTRACT_JOB_KEY = 'medq:extract-job';
/** Pending file content (text + images) persisted during the gap between
 *  file upload and the server POST that creates a jobId. If the user
 *  reloads during client-side extraction, this is restored so the upload
 *  isn't lost. Cleared once the server job is created (EXTRACT_JOB_KEY
 *  takes over as the resume pointer). */
const PENDING_FILE_KEY = 'medq:extract-pending-file';
/** Mirrors the server's MAX_INPUT_CHARS — checked client-side so the user
 *  gets an immediate, friendly message instead of a 413 round-trip. */
const MAX_EXTRACT_CHARS = 1_500_000;
const EXTRACT_JOB_MAX_AGE_MS = 24 * 60 * 60_000;

type ExtractPollResponse = {
  status?: string;
  questions?: ParsedQuestion[];
  error?: string;
  progress?: { done: number; total: number };
  droppedChunks?: number;
  estimatedCount?: number;
  /** Pass number — ≥2 means the job was resumed after a rate-limit pause. */
  pass?: number;
  /** Number of images attached to this job (PPTX/DOCX/PDF embedded figures). */
  imageCount?: number;
  /** Present while the VLM image-analysis pass is running (pass 1, before
   *  any chunks settle). UI uses this to show "Analyzing image N of M…" */
  vlm?: { images: number; done: number };
  /** Set when the user cancelled the job (DELETE → server marks as cancelled). */
  cancelled?: boolean;
};
type SavedExtractJob = {
  jobId?: string;
  fileName?: string;
  kind?: 'file-ai' | 'paste-ai';
  at?: number;
};

/** Rough live estimate of how many questions sit in the pasted text, so the
 *  user sees up front what the AI is about to work on (question-mark count is
 *  a solid floor for most banks; numbered lines catch statement-style stems). */
function estimateQuestionCount(text: string): number {
  const qmarks = (text.match(/\?/g) || []).length;
  const numbered = (text.match(/(^|\n)\s*(?:\d{1,3}[.)\]:\-]\s|Q\s?\d{1,3}[.)\]:\-]\s)/g) || []).length;
  // Multi-signal, mirroring the server: inline option markers ("a. x b. y …"),
  // "Answer:" lines, and short-line density — single signals each miss real
  // formats (a bank whose stems have no "?" and "9-" numbering looked ~40%
  // sparser than reality to the old qmark-only check).
  const optionMarkers = (text.match(/(?:^|[\s(])[A-Ea-e][.)]\s+\S/g) || []).length;
  const answerLines =
    (text.match(/(^|\n)\s*(?:ans(?:wer)?|correct(?:\s+answer)?)\s*[:.\-)]/gi) || []).length;
  const shortLines = text.split('\n').filter((l) => {
    const n = l.trim().length;
    return n > 0 && n <= 90;
  }).length;
  const est = Math.max(qmarks, numbered, Math.floor(optionMarkers / 4), answerLines, Math.floor(shortLines / 6));
  return Math.min(est, Math.floor(text.length / 80));
}

/* ── Types ── */
interface ParsedQuestion {
  text: string;
  type: 'mcq' | 'tf' | 'short';
  options: string[];
  answer: string;
  explanation: string;
  mnemonic?: string;
  clinicalPearl?: string;
  difficulty: string;
  system: string;
  topic: string;
  tags: string[];
  /** Public URL of the source image — present only for image-extracted
   *  questions (PPTX slide image, DOCX word/media, PDF page render, etc.).
   *  Persisted on Question.imageUrl after import. */
  imageUrl?: string;
}

interface ImportResult {
  imported: number;
  duplicates?: number;
  total: number;
  errorsCount: number;
  errors: Array<{ row: number; message: string }>;
}

type Mode = 'upload' | 'paste';
type Phase = 'idle' | 'reading' | 'extracting' | 'preview' | 'importing' | 'done';

const DIFF_COLORS: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  Basic: 'text-green-400 bg-green-400/10 border-green-400/25',
  Moderate: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  Hard: 'text-orange-400 bg-orange-400/10 border-orange-400/25',
  Expert: 'text-red-400 bg-red-400/10 border-red-400/25',
};

const TYPE_LABELS: Record<string, string> = {
  mcq: 'MCQ',
  tf: 'True/False',
  short: 'Short Answer',
};

const DIFFICULTIES = ['Easy', 'Basic', 'Moderate', 'Hard', 'Expert'];

/* ── Inline editing ── */
interface EditDraft {
  text: string;
  type: 'mcq' | 'tf' | 'short';
  options: string[];
  correctIdx: number; // MCQ: index of the correct option, -1 = none marked
  answer: string;      // 'True'/''False' for tf, free text for short
  explanation: string;
  difficulty: string;
  system: string;
  topic: string;
  tagsInput: string;   // comma-separated
}

/** Build an editable draft from an extracted question (best-effort answer→option matching). */
function draftFromQuestion(q: ParsedQuestion): EditDraft {
  let answer = String(q.answer ?? '');
  if (q.type === 'tf') {
    answer = answer.trim().toLowerCase().startsWith('f') ? 'False' : 'True';
  }
  let correctIdx = -1;
  const options = q.options.map((o) => String(o ?? ''));
  if (q.type === 'mcq') {
    const norm = answer.trim().toLowerCase();
    correctIdx = options.findIndex((o) => o.trim().toLowerCase() === norm);
    if (correctIdx === -1 && norm) {
      // letter answers like "A" or "b)"
      const letter = norm.match(/^[a-f](?![a-z])/);
      if (letter) correctIdx = letter[0].charCodeAt(0) - 97;
      if (correctIdx === -1 || correctIdx >= options.length) {
        // partial text match (answer contained in an option or vice versa)
        correctIdx = options.findIndex(
          (o) => o.trim() && (o.toLowerCase().includes(norm) || norm.includes(o.trim().toLowerCase())),
        );
      }
    }
    if (correctIdx !== -1 && (correctIdx < 0 || correctIdx >= options.length)) correctIdx = -1;
  }
  return {
    text: String(q.text ?? ''),
    type: q.type,
    options: q.type === 'mcq' ? options : [],
    correctIdx,
    answer,
    explanation: String(q.explanation ?? ''),
    difficulty: DIFFICULTIES.includes(q.difficulty) ? q.difficulty : 'Moderate',
    system: String(q.system ?? 'General') || 'General',
    topic: String(q.topic ?? 'General') || 'General',
    tagsInput: (q.tags ?? []).join(', '),
  };
}

function parseCSVClient(text: string): string[][] {
  const lines = text.split('\n').filter((l) => l.trim());
  return lines.map((line) => {
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) { cells.push(current.trim()); current = ''; }
      else current += char;
    }
    cells.push(current.trim());
    return cells;
  });
}

/** Parse CSV rows into the ParsedQuestion shape (mirrors the API's mapping). */
function csvToQuestions(csv: string): { questions: ParsedQuestion[]; errors: string[] } {
  const parsed = parseCSVClient(csv);
  const errors: string[] = [];
  const questions: ParsedQuestion[] = [];
  if (parsed.length < 2) return { questions, errors: ['CSV needs a header row and at least one data row'] };
  const headers = parsed[0].map((h) => h.trim());
  for (let i = 1; i < parsed.length; i++) {
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = (parsed[i][idx] || '').trim(); });
    const text = row.text || row.question || '';
    const answer = row.answer || row.correctAnswer || '';
    if (!text || !answer) {
      errors.push(`Row ${i}: missing ${!text ? 'question text' : 'answer'}`);
      continue;
    }
    const rawType = (row.type || 'mcq').toLowerCase();
    const type: 'mcq' | 'tf' | 'short' =
      ['tf', 'true_false', 'truefalse', 'boolean'].includes(rawType) ? 'tf'
        : rawType === 'short' ? 'short' : 'mcq';
    const validDifficulty = ['Easy', 'Basic', 'Moderate', 'Hard', 'Expert'];
    questions.push({
      text,
      type,
      options: row.options ? row.options.split('|').map((o) => o.trim()).filter(Boolean) : [],
      answer,
      explanation: row.explanation || '',
      mnemonic: row.mnemonic || '',
      clinicalPearl: row.clinicalPearl || '',
      difficulty: validDifficulty.includes(row.difficulty) ? row.difficulty : 'Moderate',
      system: row.system || 'General',
      topic: row.topic || 'General',
      tags: row.tags ? row.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    });
  }
  return { questions, errors };
}

/** Read a File object as text in the browser. */
function readFileText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.readAsText(file);
  });
}

/** Persist the pending file content (text + images) to sessionStorage so a
 *  reload during client-side extraction doesn't lose the upload. Cleared
 *  once the server job is created. */
function savePendingFile(text: string, fileName: string, images?: Array<{ dataUrl: string; caption: string }>) {
  try {
    window.sessionStorage.setItem(PENDING_FILE_KEY, JSON.stringify({
      text, fileName, images: images ?? [], at: Date.now(),
    }));
  } catch { /* quota exceeded — large file; skip persistence */ }
}
function clearPendingFile() {
  try { window.sessionStorage.removeItem(PENDING_FILE_KEY); } catch { /* ignore */ }
}
function loadPendingFile(): { text: string; fileName: string; images: Array<{ dataUrl: string; caption: string }>; at: number } | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_FILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.text || !parsed?.fileName) return null;
    // 1-hour window for the pending state (longer than typical
    // client-side extraction, shorter than the job resume window).
    if (Date.now() - (parsed.at || 0) > 60 * 60 * 1000) {
      window.sessionStorage.removeItem(PENDING_FILE_KEY);
      return null;
    }
    return parsed;
  } catch { return null; }
}

/* ── Inline edit form shown inside a preview card ── */
function QuestionEditForm({
  draft,
  onChange,
  onSave,
  onCancel,
}: {
  draft: EditDraft;
  onChange: (patch: Partial<EditDraft>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const inputCls = 'w-full rounded-lg border border-white/[0.1] bg-[#1a1e2b] px-3 py-2 text-xs text-[#e8ecf4] placeholder:text-[#5a6178]/60 focus:outline-none focus:border-[#00e5a0]/40 focus:ring-1 focus:ring-[#00e5a0]/25';
  const labelCls = 'block text-[10px] font-semibold uppercase tracking-wide text-[#5a6178] mb-1.5';

  const changeType = (t: 'mcq' | 'tf' | 'short') => {
    if (t === draft.type) return;
    const patch: Partial<EditDraft> = { type: t };
    if (t === 'mcq') {
      if (draft.options.length < 2) patch.options = ['', '', '', ''];
      patch.correctIdx = -1;
    } else if (t === 'tf') {
      patch.answer = draft.answer.trim().toLowerCase().startsWith('f') ? 'False' : 'True';
    } else {
      patch.answer = draft.answer === 'True' || draft.answer === 'False' ? '' : draft.answer;
    }
    onChange(patch);
  };

  const setOption = (oi: number, val: string) => {
    const next = [...draft.options];
    next[oi] = val;
    onChange({ options: next });
  };

  const removeOption = (oi: number) => {
    if (draft.options.length <= 2) return;
    const next = draft.options.filter((_, k) => k !== oi);
    let correctIdx = draft.correctIdx;
    if (correctIdx === oi) correctIdx = -1;
    else if (correctIdx > oi) correctIdx -= 1;
    onChange({ options: next, correctIdx });
  };

  const addOption = () => {
    if (draft.options.length >= 6) return;
    onChange({ options: [...draft.options, ''] });
  };

  return (
    <div className="px-3 pb-3 pt-1 border-t border-white/[0.05] space-y-3">
      <div>
        <label className={labelCls}>Question</label>
        <textarea
          value={draft.text}
          onChange={(e) => onChange({ text: e.target.value })}
          rows={3}
          placeholder="Question text"
          className={`${inputCls} leading-relaxed resize-y`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Type</label>
          <div className="flex gap-1">
            {(['mcq', 'tf', 'short'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => changeType(t)}
                className={`flex-1 px-2 py-1.5 rounded-md text-[10px] font-bold border transition-all ${
                  draft.type === t
                    ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/30'
                    : 'text-[#8b92a8] border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                {TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelCls}>Difficulty</label>
          <div className="flex flex-wrap gap-1">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onChange({ difficulty: d })}
                className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                  draft.difficulty === d
                    ? DIFF_COLORS[d] || DIFF_COLORS.Moderate
                    : 'text-[#8b92a8] border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {draft.type === 'mcq' && (
        <div>
          <label className={labelCls}>Options — mark the correct one</label>
          <div className="space-y-1.5">
            {draft.options.map((opt, oi) => {
              const isCorrect = draft.correctIdx === oi;
              return (
                <div
                  key={oi}
                  className={`flex items-center gap-2 rounded-md border px-2 py-1.5 transition-all ${
                    isCorrect
                      ? 'border-[#00e5a0]/30 bg-[#00e5a0]/[0.07]'
                      : 'border-white/[0.06] bg-white/[0.02]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onChange({ correctIdx: isCorrect ? -1 : oi })}
                    title={isCorrect ? 'Unmark as correct' : 'Mark as correct answer'}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      isCorrect
                        ? 'border-[#00e5a0]/50 bg-[#00e5a0]/15 text-[#00e5a0]'
                        : 'border-white/[0.15] text-transparent hover:border-[#00e5a0]/40'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] font-bold text-[#5a6178] shrink-0">{String.fromCharCode(65 + oi)}</span>
                  <input
                    value={opt}
                    onChange={(e) => setOption(oi, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                    className="flex-1 min-w-0 bg-transparent text-[11px] text-[#e8ecf4] placeholder:text-[#5a6178]/60 focus:outline-none"
                  />
                  {draft.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(oi)}
                      title="Remove option"
                      className="text-[#5a6178] hover:text-[#ff5757] transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {draft.correctIdx === -1 ? (
            <p className="text-[10px] text-[#f59e0b] mt-1.5">Click the check icon next to the correct option</p>
          ) : (
            <button
              type="button"
              onClick={addOption}
              disabled={draft.options.length >= 6}
              className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-[#00e5a0]/80 hover:text-[#00e5a0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3 h-3" /> Add option
            </button>
          )}
        </div>
      )}

      {draft.type === 'tf' && (
        <div>
          <label className={labelCls}>Correct answer</label>
          <div className="flex gap-1">
            {['True', 'False'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ answer: v })}
                className={`px-4 py-1.5 rounded-md text-[11px] font-bold border transition-all ${
                  draft.answer === v
                    ? 'text-[#00e5a0] bg-[#00e5a0]/10 border-[#00e5a0]/40'
                    : 'text-[#8b92a8] border-white/[0.1] hover:border-white/[0.25]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {draft.type === 'short' && (
        <div>
          <label className={labelCls}>Correct answer</label>
          <input
            value={draft.answer}
            onChange={(e) => onChange({ answer: e.target.value })}
            placeholder="Expected answer"
            className={inputCls}
          />
        </div>
      )}

      <div>
        <label className={labelCls}>Explanation</label>
        <textarea
          value={draft.explanation}
          onChange={(e) => onChange({ explanation: e.target.value })}
          rows={2}
          placeholder="Why this answer is correct (optional)"
          className={`${inputCls} leading-relaxed resize-y`}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelCls}>System</label>
          <input value={draft.system} onChange={(e) => onChange({ system: e.target.value })} placeholder="e.g. Cardiovascular" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Topic</label>
          <input value={draft.topic} onChange={(e) => onChange({ topic: e.target.value })} placeholder="e.g. Heart failure" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Tags</label>
          <input value={draft.tagsInput} onChange={(e) => onChange({ tagsInput: e.target.value })} placeholder="comma, separated" className={inputCls} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-semibold bg-[#00e5a0]/15 border border-[#00e5a0]/35 text-[#00e5a0] hover:bg-[#00e5a0]/25 transition-all"
        >
          <Check className="w-3.5 h-3.5" /> Save changes
        </button>
      </div>
    </div>
  );
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImported?: (count: number) => void;
}

export default function ImportQuestionsModal({ open, onOpenChange, onImported }: Props) {
  const [mode, setMode] = useState<Mode>('upload');
  const [phase, setPhase] = useState<Phase>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [fileName, setFileName] = useState('');
  /** Detector's independent count of question-like blocks in the source text
   *  — surfaced in the preview so the user sees "found N of ~M detected"
   *  when extraction fell short (0 = not measured). */
  const [detectedCount, setDetectedCount] = useState(0);
  const [pastedText, setPastedText] = useState('');
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [excluded, setExcluded] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<EditDraft | null>(null);
  const [edited, setEdited] = useState<Set<number>>(new Set());
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [sourceKind, setSourceKind] = useState<'file-structured' | 'file-ai' | 'paste-ai'>('file-structured');
  const [csvText, setCsvText] = useState('');
  /** Extraction job behind the current preview (for server-side cleanup). */
  const [extractJobId, setExtractJobId] = useState<string | null>(null);

  /* ── Live progress state for the extracting phase ── */
  /** Latest poll snapshot — drives the rich progress UI (per-stage status,
   *  ETA, image thumbnails, pass counter). Reset to null when extraction
   *  settles so the next run starts fresh. */
  const [livePoll, setLivePoll] = useState<ExtractPollResponse | null>(null);
  /** Wall-clock when the current extraction started — for the elapsed-time
   *  readout in the progress UI. */
  const [extractStartedAt, setExtractStartedAt] = useState<number | null>(null);
  /** Set when the user clicked "Stop extraction" — disables the button and
   *  shows a "Stopping…" state while the in-flight LLM call finishes. */
  const [cancelling, setCancelling] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const busy = phase === 'reading' || phase === 'extracting' || phase === 'importing';

  const reset = useCallback(() => {
    setPhase('idle');
    setStatusMsg('');
    setFileName('');
    setQuestions([]);
    setDetectedCount(0);
    setExcluded(new Set());
    setResult(null);
    setExpanded(null);
    setEditing(null);
    setDraft(null);
    setEdited(new Set());
    setCsvText('');
    setLivePoll(null);
    setExtractStartedAt(null);
    setCancelling(false);
    setPastedText('');
    setSourceKind('file-structured');
    setExtractJobId(null);
  }, []);

  const handleClose = useCallback((next: boolean) => {
    if (busy) return; // block closing mid-flight
    if (!next) reset();
    onOpenChange(next);
  }, [busy, onOpenChange, reset]);

  /* ── AI extraction (background job, Knowledge-Library pattern) ──
     The POST returns a jobId instantly; the job lives in the DATABASE, so it
     survives server restarts (auto-resumed server-side) and the browser can
     be closed — the localStorage pointer re-attaches on the next open. */

  /** Poll a running extraction job until it settles. Returns the questions
   *  (or null when the AI found none) plus the detector's independent count
   *  of question-like blocks in the source text; throws on hard errors. */
  const pollExtraction = useCallback(async (
    jobId: string,
  ): Promise<{ questions: ParsedQuestion[]; estimatedCount: number } | null> => {
    // Large files are extracted in parallel parts and can take a few minutes —
    // keep polling while progress keeps moving, and only give up when the job
    // STALLS (no part completed for several minutes) or hits a generous cap.
    const startedAt = Date.now();
    const hardDeadline = startedAt + 30 * 60_000;
    const STALL_TIMEOUT_MS = 10 * 60_000; // ≥ worst-case one silent slow part (429 backoffs can take minutes)
    // ADAPTIVE cadence: poll every 2.5 s while parts are completing, back off
    // toward 10 s while idle — a poll during a quiet phase is pure waste on
    // both server (auth + DB read per hit) and client (network + wakeups).
    const POLL_MIN_MS = 2500;
    const POLL_MAX_MS = 10_000;
    let pollDelay = POLL_MIN_MS;
    let lastDone = -1;
    let lastProgressAt = Date.now();
    let data: ExtractPollResponse | null = null;
    for (;;) {
      await new Promise((r) => setTimeout(r, pollDelay));
      const poll = await fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(jobId)}`)
        .catch(() => null);
      if (!poll) throw new Error('Lost connection to the server — please retry.');
      if (poll.status === 404) throw new Error('Extraction job not found — it may have expired. Please try again.');
      data = (await poll.json().catch(() => null)) as ExtractPollResponse | null;
      if (!data) throw new Error('Unexpected server response — please retry.');
      // Mirror to state so the rich progress UI can render live counters,
      // ETA, image thumbnails, pass counter, etc. (the simple statusMsg is
      // kept as a fallback for accessibility / older render paths).
      setLivePoll(data);
      if (data.status === 'error') {
        // The server returns 'cancelled' jobs as status='error' with the
        // "Cancelled by the user." message — detect that and exit quietly
        // (no error toast) so the cancel button's own handler closes the UI.
        if (data.error && /cancel/i.test(data.error)) {
          throw new Error('__CANCELLED__');
        }
        throw new Error(data.error || 'AI extraction failed');
      }
      if (data.status === 'running') {
        const p = data.progress;
        if (p && p.done !== lastDone) {
          lastDone = p.done;
          lastProgressAt = Date.now();
          pollDelay = POLL_MIN_MS; // progress moving — poll fast
        } else {
          pollDelay = Math.min(pollDelay + 1500, POLL_MAX_MS); // idle — back off
        }
        if (Date.now() - lastProgressAt > STALL_TIMEOUT_MS) {
          throw new Error('Extraction appears stalled — the AI service may be unreachable right now. The job keeps running in the background; reopen this dialog to re-attach, or import a JSON/CSV file instead (direct import, no AI needed).');
        }
        // StatusMsg kept as a fallback for the simple-progress render path.
        // The rich progress UI reads livePoll directly.
        const elapsed = Math.round((Date.now() - startedAt) / 1000);
        if (data.vlm && data.vlm.images > 0) {
          setStatusMsg(`Analyzing image ${data.vlm.done}/${data.vlm.images}… (${elapsed}s)`);
        } else if (p && p.total > 1) {
          setStatusMsg(`AI is extracting questions… ${p.done}/${p.total} parts done (${elapsed}s)`);
        } else {
          setStatusMsg(`AI is extracting questions… ${elapsed}s`);
        }
      }
      if (data.status === 'done') {
        if (data.droppedChunks && data.droppedChunks > 0) {
          toast.warning(`${data.droppedChunks} part${data.droppedChunks > 1 ? 's' : ''} of the file could not be read`, {
            description: 'The extracted list below may be incomplete — try importing those parts again separately.',
          });
        }
        break;
      }
      if (Date.now() > hardDeadline) {
        throw new Error('Extraction is taking too long (>30 min). It keeps running in the background — reopen this dialog later to pick up the result, or import a JSON/CSV instead.');
      }
    }
    const parsed: ParsedQuestion[] = Array.isArray(data.questions) ? data.questions : [];
    const estimatedCount = typeof data.estimatedCount === 'number' ? data.estimatedCount : 0;
    return parsed.length ? { questions: parsed, estimatedCount } : null;
  }, []);

  /** Cancel the running extraction — fires a DELETE to mark the job as
   *  'cancelled'. The runner picks up the flag at the next chunk boundary
   *  (5–15 s for in-flight LLM calls) and exits. The poll loop then sees
   *  status='error' with "Cancelled by the user." and throws '__CANCELLED__'
   *  which we silently swallow (no error toast).
   *
   *  If called before the POST has returned a jobId (null), just resets the
   *  UI to idle — the user hasn't actually started anything on the server
   *  yet, so there's nothing to cancel server-side. */
  const cancelExtraction = useCallback(async (jobId: string | null) => {
    if (!jobId) {
      // Pre-POST window: the fetch to start the job is still in flight, or
      // the job was never created. Just reset the UI so the user can try
      // again. No server-side cleanup needed.
      setPhase('idle');
      setStatusMsg('');
      setLivePoll(null);
      setExtractStartedAt(null);
      setExtractJobId(null);
      setCancelling(false);
      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
      return;
    }
    setCancelling(true);
    try {
      await fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(jobId)}`, { method: 'DELETE' })
        .catch(() => { /* best-effort — the server-side flag is what matters */ });
    } finally {
      // Keep `cancelling` true until pollExtraction notices and throws;
      // the runAiExtraction catch block resets it.
    }
  }, []);

  const runAiExtraction = useCallback(async (
    text: string,
    label: string,
    kind: 'file-ai' | 'paste-ai',
    images?: { dataUrl: string; caption: string }[],
  ) => {
    if (text.length > MAX_EXTRACT_CHARS) {
      toast.error('Content is too large to extract in one go', {
        description: `${Math.round(text.length / 1000)}k characters — the limit is ${Math.round(MAX_EXTRACT_CHARS / 1000)}k. Split it into two or three parts and import them one by one; duplicates are skipped automatically.`,
      });
      return;
    }
    setSourceKind(kind);
    setPhase('extracting');
    setExtractStartedAt(Date.now());
    setLivePoll(null);
    setCancelling(false);
    setStatusMsg(
      images && images.length > 0
        ? `AI is reading your content and analyzing ${images.length} image${images.length > 1 ? 's' : ''}…`
        : 'AI is reading your content and extracting questions…',
    );
    try {
      // Persist the file content NOW so a reload during the POST/poll
      // doesn't lose it. Cleared once the job is created below.
      savePendingFile(text, label, images);
      const res = await fetch('/api/questions/import/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fileName: label, images }),
      });
      // The app returns { jobId } on success or { error } on failure. The z.ai
      // preview gateway, when it rejects a request itself (e.g. EntityTooLarge
      // for bodies > 32 MiB, or 502 HTML on upstream reset), returns JSON
      // shaped as { Code, Message, RequestId } — or a non-JSON HTML error page.
      // Surface whichever field exists so the user sees the real reason
      // instead of the generic "Could not start extraction" fallback.
      const start: { jobId?: string; error?: string; Message?: string; Code?: string } = await res
        .json()
        .catch(() => ({} as { jobId?: string; error?: string; Message?: string; Code?: string }));
      if (!res.ok || !start.jobId) {
        const reason =
          start.error ||
          start.Message ||
          (res.status === 502
            ? 'The preview gateway could not reach the app (502 Bad Gateway). Try a smaller file or retry in a moment.'
            : 'Could not start extraction');
        throw new Error(reason);
      }

      // Job created — clear the pending-file pointer; the job pointer
      // (EXTRACT_JOB_KEY) takes over as the resume mechanism.
      clearPendingFile();
      setExtractJobId(start.jobId);
      try {
        window.localStorage.setItem(EXTRACT_JOB_KEY, JSON.stringify({ jobId: start.jobId, fileName: label, kind, at: Date.now() }));
      } catch { /* private mode etc. — extraction still works, just no resume */ }

      const polled = await pollExtraction(start.jobId);
      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
      clearPendingFile();
      if (!polled) {
        setPhase('idle');
        setStatusMsg('');
        setLivePoll(null);
        setExtractStartedAt(null);
        setCancelling(false);
        toast.error('No questions found', {
          description: 'The AI could not find any complete questions (with answers) in this content.',
        });
        return;
      }
      setFileName(label);
      setQuestions(polled.questions);
      setDetectedCount(polled.estimatedCount);
      setPhase('preview');
      setLivePoll(null);
      setExtractStartedAt(null);
      setCancelling(false);
    } catch (err) {
      // User-cancelled jobs throw a sentinel '__CANCELLED__' — silently
      // return to the input state, no error toast.
      if (err instanceof Error && err.message === '__CANCELLED__') {
        setPhase('idle');
        setStatusMsg('');
        setLivePoll(null);
        setExtractStartedAt(null);
        setExtractJobId(null);
        setCancelling(false);
        try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
        toast.info('Extraction cancelled', {
          description: 'You can start a new extraction any time.',
        });
        return;
      }
      // Definitive errors discard the pointer; on stalls/timeouts it stays so
      // reopening this dialog can re-attach to the still-running background job.
      if (!(err instanceof Error) || !/stalled|taking too long|Lost connection/.test(err.message)) {
        try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
        clearPendingFile();
      }
      setPhase('idle');
      setStatusMsg('');
      setLivePoll(null);
      setExtractStartedAt(null);
      setCancelling(false);
      toast.error(err instanceof Error ? err.message : 'AI extraction failed');
    }
  }, [pollExtraction]);

  /* ── Re-attach on open: if the page was closed during an extraction, the
     job kept running server-side — resume polling or load the finished
     result straight into the preview. Runs at most once per mount. ── */
  const resumeChecked = useRef(false);
  useEffect(() => {
    if (!open || resumeChecked.current) return;
    resumeChecked.current = true;

    // ── Pending file re-attach: the user uploaded a file but the server
    //  POST hadn't completed when they reloaded. Restore the extracted
    //  text + images and auto-start the server extraction. ──
    const pending = loadPendingFile();
    if (pending && !window.localStorage.getItem(EXTRACT_JOB_KEY)) {
      console.log('[Import] re-attaching pending file:', pending.fileName);
      setFileName(pending.fileName);
      // Re-run the server extraction with the restored content. The
      // text + images were already extracted client-side before the
      // reload — no need to re-parse the original file.
      void runAiExtraction(pending.text, pending.fileName, 'file-ai', pending.images);
      return;
    }
    // Clear stale pending file if a server job pointer exists (the job
    // is the authoritative resume mechanism).
    if (pending) clearPendingFile();

    let entry: SavedExtractJob | null = null;
    try {
      const raw = window.localStorage.getItem(EXTRACT_JOB_KEY);
      if (raw) entry = JSON.parse(raw) as SavedExtractJob;
    } catch { return; }
    if (!entry?.jobId || !entry.at || Date.now() - entry.at > EXTRACT_JOB_MAX_AGE_MS) {
      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
      return;
    }
    const label = entry.fileName || 'pasted text';
    const kind: 'file-ai' | 'paste-ai' = entry.kind === 'paste-ai' ? 'paste-ai' : 'file-ai';
    const jobId = entry.jobId;
    const clearPointer = () => {
      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
    };
    (async () => {
      try {
        const peek = await fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(jobId)}`).catch(() => null);
        if (!peek || peek.status === 404) { clearPointer(); return; }
        const data = await peek.json().catch(() => null) as ExtractPollResponse | null;
        if (!data || (data.status !== 'running' && data.status !== 'done')) {
          clearPointer();
          if (data?.error) toast.info('Your previous extraction failed', { description: data.error });
          return;
        }
        setSourceKind(kind);
        setFileName(label);
        if (data.status === 'done') {
          const parsed: ParsedQuestion[] = Array.isArray(data.questions) ? data.questions : [];
          clearPointer();
          if (!parsed.length) return;
          setExtractJobId(jobId);
          setQuestions(parsed);
          setDetectedCount(typeof data.estimatedCount === 'number' ? data.estimatedCount : 0);
          setPhase('preview');
          toast.success(`Resumed your previous extraction — ${parsed.length} question${parsed.length > 1 ? 's' : ''} ready`, {
            description: 'It kept running in the background while you were away.',
          });
          return;
        }
        // Still running — re-attach and keep waiting.
        setPhase('extracting');
        setExtractJobId(jobId);
        setExtractStartedAt(Date.now());
        setLivePoll(null);
        setCancelling(false);
        setStatusMsg('Resuming your extraction…');
        const parsed = await pollExtraction(jobId);
        clearPointer();
        if (!parsed) { setPhase('idle'); setStatusMsg(''); setExtractJobId(null); setExtractStartedAt(null); return; }
        setQuestions(parsed.questions);
        setDetectedCount(parsed.estimatedCount);
        setPhase('preview');
        setLivePoll(null);
        setExtractStartedAt(null);
        setCancelling(false);
        toast.success(`Extraction finished — ${parsed.questions.length} question${parsed.questions.length > 1 ? 's' : ''} ready`);
      } catch {
        clearPointer();
      }
    })();
  }, [open, pollExtraction]);

  /* ── File intake ── */
  const handleFile = useCallback(async (file: File) => {
    if (busy) return;
    reset();
    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    setPhase('reading');
    setStatusMsg(`Reading ${file.name}…`);

    try {
      // JSON — direct structured import
      if (ext === 'json') {
        const text = await readFileText(file);
        let parsed: unknown;
        try { parsed = JSON.parse(text); } catch { throw new Error('Invalid JSON file'); }
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        const qs: ParsedQuestion[] = [];
        for (const item of arr) {
          if (item && typeof item === 'object') {
            const q = item as Record<string, unknown>;
            const text2 = typeof q.text === 'string' ? q.text : typeof q.question === 'string' ? (q.question as string) : '';
            const ans = typeof q.answer === 'string' ? q.answer : '';
            if (text2 && ans) {
              const iu =
                (typeof q.imageUrl === 'string' && q.imageUrl) ||
                (typeof q.image_url === 'string' && q.image_url) ||
                '';
              qs.push({
                text: text2,
                type: q.type === 'tf' || q.type === 'short' ? (q.type as 'tf' | 'short') : 'mcq',
                options: Array.isArray(q.options) ? q.options.map(String) : [],
                answer: ans,
                explanation: typeof q.explanation === 'string' ? q.explanation : '',
                mnemonic: typeof q.mnemonic === 'string' ? q.mnemonic : '',
                clinicalPearl: typeof q.clinicalPearl === 'string' ? q.clinicalPearl : '',
                difficulty: typeof q.difficulty === 'string' ? q.difficulty : 'Moderate',
                system: typeof q.system === 'string' && q.system ? q.system : 'General',
                topic: typeof q.topic === 'string' && q.topic ? q.topic : 'General',
                tags: Array.isArray(q.tags) ? q.tags.map(String) : [],
                ...(iu.startsWith('/generated/agent/imported/') ? { imageUrl: iu } : {}),
              });
            }
          }
        }
        if (qs.length === 0) throw new Error('No valid questions found — each needs at least "text" and "answer"');
        setSourceKind('file-structured');
        setQuestions(qs);
        setPhase('preview');
        return;
      }

      // CSV — direct structured import
      if (ext === 'csv' || ext === 'tsv') {
        const text = await readFileText(file);
        const { questions: qs, errors } = csvToQuestions(text);
        if (qs.length === 0) {
          throw new Error(errors[0] || 'No valid questions found in the CSV');
        }
        if (errors.length > 0) {
          toast.warning(`${errors.length} row${errors.length > 1 ? 's' : ''} skipped`, {
            description: errors.slice(0, 3).join(' · ') + (errors.length > 3 ? ' …' : ''),
          });
        }
        setSourceKind('file-structured');
        setCsvText(text);
        setQuestions(qs);
        setPhase('preview');
        return;
      }

      // TXT / MD — try JSON first, then AI extraction
      if (ext === 'txt' || ext === 'md') {
        const text = await readFileText(file);
        const trimmed = text.trim();
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          try {
            const parsed = JSON.parse(trimmed);
            const arr = Array.isArray(parsed) ? parsed : [parsed];
            const withAnswer = arr.filter(
              (x) => x && typeof x === 'object' && ((x as Record<string, unknown>).text || (x as Record<string, unknown>).question) && (x as Record<string, unknown>).answer
            );
            if (withAnswer.length > 0) {
              setSourceKind('file-structured');
              const qs: ParsedQuestion[] = withAnswer.map((item) => {
                const q = item as Record<string, unknown>;
                const iu =
                  (typeof q.imageUrl === 'string' && q.imageUrl) ||
                  (typeof q.image_url === 'string' && q.image_url) ||
                  '';
                return {
                  text: String(q.text ?? q.question ?? ''),
                  type: q.type === 'tf' || q.type === 'short' ? (q.type as 'tf' | 'short') : 'mcq',
                  options: Array.isArray(q.options) ? q.options.map(String) : [],
                  answer: String(q.answer ?? ''),
                  explanation: typeof q.explanation === 'string' ? q.explanation : '',
                  mnemonic: typeof q.mnemonic === 'string' ? q.mnemonic : '',
                  clinicalPearl: typeof q.clinicalPearl === 'string' ? q.clinicalPearl : '',
                  difficulty: typeof q.difficulty === 'string' ? q.difficulty : 'Moderate',
                  system: typeof q.system === 'string' && q.system ? q.system : 'General',
                  topic: typeof q.topic === 'string' && q.topic ? q.topic : 'General',
                  tags: Array.isArray(q.tags) ? q.tags.map(String) : [],
                  ...(iu.startsWith('/generated/agent/imported/') ? { imageUrl: iu } : {}),
                };
              });
              setQuestions(qs);
              setPhase('preview');
              return;
            }
          } catch { /* not JSON — fall through to AI */ }
        }
        await runAiExtraction(text, file.name, 'file-ai');
        return;
      }

      // DOCX / PDF / PPTX / images — SERVER-SIDE extraction (more reliable:
      // no browser OOM, no pdfjs worker mismatch, no reload loss).
      // Upload the raw file as multipart/form-data; the server parses it
      // with extractFromFileServer() and starts the AI job in one step.
      setSourceKind('file-ai');
      setStatusMsg(`Uploading ${file.name} for server-side extraction…`);
      await runAiExtractionFromFile(file);
    } catch (err) {
      setPhase('idle');
      setStatusMsg('');
      toast.error(err instanceof Error ? err.message : 'Failed to read the file');
    }
  }, [busy, reset, runAiExtraction]);

  /* ── File upload → server-side extraction ──
   * Uploads the raw File as multipart/form-data to the extract route.
   * The server parses it (extractFromFileServer) and starts the AI job
   * in one step — no client-side FileReader/pdfjs/mammoth. More reliable:
   * no browser OOM, no worker mismatch, no reload loss (the server creates
   * the job immediately, before any polling starts). */
  const runAiExtractionFromFile = useCallback(async (file: File) => {
    if (busy) return;
    // Preview-gateway cap (32 MiB hard limit at the z.ai proxy). Reject
    // BEFORE the fetch so the user gets an inline toast instead of a raw
    // 502/400 EntityTooLarge from the gateway after a long upload attempt.
    const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error(
        `File is too large (${Math.round(file.size / 1024 / 1024)} MB — the limit is 30 MB through the preview gateway).`,
        { description: 'Split it into smaller files and import them one by one — duplicate questions are skipped automatically.' },
      );
      return;
    }
    setPhase('extracting');
    setExtractStartedAt(Date.now());
    setLivePoll(null);
    setCancelling(false);
    setStatusMsg(`Uploading ${file.name}…`);
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Persist a pointer so reload re-attaches (the job pointer takes
      // over once the server returns a jobId below).
      savePendingFile('', file.name);
      const res = await fetch('/api/questions/import/extract', {
        method: 'POST',
        body: formData,
        // Note: do NOT set Content-Type — the browser sets it with the
        // multipart boundary automatically.
      });
      // The app returns { jobId } on success or { error } on failure. The z.ai
      // preview gateway, when it rejects a request itself (e.g. EntityTooLarge
      // for bodies > 32 MiB, or 502 HTML on upstream reset), returns JSON
      // shaped as { Code, Message, RequestId } — or a non-JSON HTML error page.
      // Surface whichever field exists so the user sees the real reason
      // instead of the generic "Could not start extraction" fallback.
      const start: { jobId?: string; error?: string; Message?: string; Code?: string } = await res
        .json()
        .catch(() => ({} as { jobId?: string; error?: string; Message?: string; Code?: string }));
      if (!res.ok || !start.jobId) {
        const reason =
          start.error ||
          start.Message ||
          (res.status === 502
            ? 'The preview gateway could not reach the app (502 Bad Gateway). Try a smaller file or retry in a moment.'
            : 'Could not start extraction');
        throw new Error(reason);
      }

      // Job created — clear the pending pointer; the job pointer takes over.
      clearPendingFile();
      setExtractJobId(start.jobId);
      setFileName(file.name);
      try {
        window.localStorage.setItem(EXTRACT_JOB_KEY, JSON.stringify({ jobId: start.jobId, fileName: file.name, kind: 'file-ai', at: Date.now() }));
      } catch { /* private mode etc. */ }

      setStatusMsg('AI is reading your content and extracting questions…');
      const polled = await pollExtraction(start.jobId);
      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
      clearPendingFile();
      if (!polled) {
        setPhase('idle');
        setStatusMsg('');
        setLivePoll(null);
        setExtractStartedAt(null);
        setCancelling(false);
        toast.error('No questions found', {
          description: 'The AI could not find any complete questions (with answers) in this content.',
        });
        return;
      }
      setQuestions(polled.questions);
      setDetectedCount(polled.estimatedCount);
      setPhase('preview');
      setLivePoll(null);
      setExtractStartedAt(null);
      setCancelling(false);
    } catch (err) {
      clearPendingFile();
      if (err instanceof Error && err.message === '__CANCELLED__') {
        setPhase('idle'); setStatusMsg(''); setLivePoll(null);
        setExtractStartedAt(null); setExtractJobId(null); setCancelling(false);
        try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }
        toast.info('Extraction cancelled', { description: 'You can start a new extraction any time.' });
        return;
      }
      setPhase('idle'); setStatusMsg(''); setLivePoll(null);
      setExtractStartedAt(null); setCancelling(false);
      toast.error(err instanceof Error ? err.message : 'AI extraction failed');
    }
  }, [busy, pollExtraction]);

  /* ── Paste intake ── */
  const handleExtractPasted = useCallback(async () => {
    if (!pastedText.trim()) {
      toast.error('Paste some questions first');
      return;
    }
    reset();
    setFileName('Pasted text');
    await runAiExtraction(pastedText, 'pasted text', 'paste-ai');
  }, [pastedText, reset, runAiExtraction]);

  /* ── Final import ── */
  const handleImport = useCallback(async () => {
    const selected = questions.filter((_, i) => !excluded.has(i));
    if (selected.length === 0) {
      toast.error('No questions selected');
      return;
    }
    setPhase('importing');
    setStatusMsg(`Importing ${selected.length} question${selected.length > 1 ? 's' : ''}…`);
    try {
      let res: Response;
      if (sourceKind === 'file-structured' && fileName.toLowerCase().endsWith('.csv') && edited.size === 0) {
        // send raw CSV so the server applies the same mapping
        // (once anything is edited we always send the edited JSON instead)
        res = await fetch('/api/questions/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ format: 'csv', data: csvText }),
        });
      } else {
        res = await fetch('/api/questions/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ format: 'json', data: JSON.stringify(selected) }),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Import failed');

      // Clean up the finished extraction job server-side (rows also TTL
      // out after 24 h, but this keeps the table tidy right away).
      if (extractJobId) {
        const doneId = extractJobId;
        setExtractJobId(null);
        void fetch(`/api/questions/import/extract?jobId=${encodeURIComponent(doneId)}`, { method: 'DELETE' })
          .catch(() => { /* tidy-up only */ });
      }

      setResult(data);
      setPhase('done');
      if (data.imported > 0) {
        toast.success(`Imported ${data.imported} question${data.imported > 1 ? 's' : ''} into the bank`);
        onImported?.(data.imported);
        if (data.duplicates > 0) {
          toast.info(`${data.duplicates} duplicate${data.duplicates > 1 ? 's' : ''} skipped`, {
            description: 'Questions already in the bank (same text) are never imported twice.',
          });
        }
      } else if ((data.duplicates ?? 0) > 0) {
        toast.info(`All ${data.duplicates} questions already exist in the bank — nothing new to import`, {
          description: 'Duplicates are skipped automatically, so re-importing a file never creates doubles.',
        });
      } else {
        toast.error('No questions were imported', {
          description: data.errors?.[0]?.message || 'Check that each question has text and an answer',
        });
      }
    } catch (err) {
      setPhase('preview');
      setStatusMsg('');
      toast.error(err instanceof Error ? err.message : 'Import failed');
    }
  }, [questions, excluded, sourceKind, fileName, csvText, edited, onImported, extractJobId]);

  /* ── Templates ── */
  const downloadTemplate = useCallback(async (kind: 'csv' | 'json') => {
    try {
      const res = await fetch('/api/questions/import');
      const data = await res.json();
      const content = kind === 'csv' ? data.csvTemplate : JSON.stringify(data.jsonTemplate, null, 2);
      const blob = new Blob([content], { type: kind === 'csv' ? 'text/csv' : 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `question-import-template.${kind}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${kind.toUpperCase()} template downloaded`);
    } catch {
      toast.error('Could not download the template');
    }
  }, []);

  const toggleExcluded = (i: number) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  /* ── Inline editing handlers ── */
  const patchDraft = useCallback((patch: Partial<EditDraft>) => {
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const startEdit = (i: number) => {
    setEditing(i);
    setDraft(draftFromQuestion(questions[i]));
    setExpanded(i);
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (editing === null || !draft) return;
    const text = draft.text.trim();
    if (!text) {
      toast.error('Question text is required');
      return;
    }
    let options: string[] = [];
    let answer = '';
    if (draft.type === 'mcq') {
      options = draft.options.map((o) => o.trim()).filter(Boolean);
      const chosen = draft.correctIdx >= 0 ? draft.options[draft.correctIdx]?.trim() : '';
      if (options.length < 2) {
        toast.error('An MCQ needs at least 2 non-empty options');
        return;
      }
      if (!chosen || !options.includes(chosen)) {
        toast.error('Mark which option is the correct answer');
        return;
      }
      answer = chosen;
    } else if (draft.type === 'tf') {
      answer = draft.answer === 'False' ? 'False' : 'True';
    } else {
      answer = draft.answer.trim();
      if (!answer) {
        toast.error('Enter the expected answer');
        return;
      }
    }
    const idx = editing;
    setQuestions((prev) =>
      prev.map((q, k) =>
        k === idx
          ? {
              ...q,
              text,
              type: draft.type,
              options,
              answer,
              explanation: draft.explanation.trim(),
              difficulty: DIFFICULTIES.includes(draft.difficulty) ? draft.difficulty : 'Moderate',
              system: draft.system.trim() || 'General',
              topic: draft.topic.trim() || 'General',
              tags: draft.tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
            }
          : q,
      ),
    );
    setEdited((prev) => new Set(prev).add(idx));
    setEditing(null);
    setDraft(null);
    toast.success('Question updated', {
      description: 'Your edited version will be imported.',
    });
  };

  const includedCount = questions.length - excluded.size;

  /* ── Render ── */
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#e8ecf4] flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-[#00e5a0]" />
            Import Questions
          </DialogTitle>
        </DialogHeader>

        {/* ── Success state ── */}
        {phase === 'done' && result && (
          <div className="py-4 space-y-4">
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#00e5a0]/10 border border-[#00e5a0]/25 flex items-center justify-center">
                <Check className="w-7 h-7 text-[#00e5a0]" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#e8ecf4]">
                  {result.imported} of {result.total} question{result.total > 1 ? 's' : ''} imported
                </p>
                <p className="text-xs text-[#5a6178] mt-1">
                  Your questions are now in the Question Bank database
                  {result.errorsCount > 0 ? ` · ${result.errorsCount} row(s) had errors` : ''}
                </p>
              </div>
              {result.errorsCount > 0 && (
                <div className="w-full max-h-32 overflow-y-auto rounded-lg border border-[#f59e0b]/25 bg-[#f59e0b]/[0.06] p-3 text-left">
                  {result.errors.map((e, i) => (
                    <p key={i} className="text-xs text-[#f59e0b]">
                      Row {e.row}: {e.message}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => { reset(); setMode('upload'); }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all"
                >
                  Import Another File
                </button>
                <button
                  type="button"
                  onClick={() => handleClose(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Working states ── */}
        {(phase === 'reading' || phase === 'extracting' || phase === 'importing') && (
          (() => {
            // Live elapsed-time readout from extractStartedAt (or fall back
            // to the statusMsg that the polling loop updates).
            const elapsedSec = extractStartedAt
              ? Math.round((Date.now() - extractStartedAt) / 1000)
              : null;
            const p = livePoll?.progress;
            const vlm = livePoll?.vlm;
            const imageCount = livePoll?.imageCount ?? 0;
            const pass = livePoll?.pass ?? 1;
            const total = p?.total ?? 0;
            const done = p?.done ?? 0;
            const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;
            const vlmPct = vlm && vlm.images > 0 ? Math.min(100, Math.round((vlm.done / vlm.images) * 100)) : 0;
            // ETA: simple linear extrapolation from elapsed × (remaining / done).
            // Only show once we have ≥1 done chunk AND ≥5 s elapsed (otherwise
            // the estimate is wildly noisy).
            const showEta = elapsedSec !== null && elapsedSec >= 5 && done > 0 && total > 0 && done < total;
            const etaSec = showEta ? Math.round((elapsedSec / done) * (total - done)) : null;

            // Stage progression: VLM image analysis → text extraction → done.
            // The VLM stage runs first (pass 1, before any chunks settle).
            const inVlmStage = !!vlm && vlm.images > 0 && total === 0;
            const inExtractStage = total > 0;

            return (
              <div className="py-8 px-6 flex flex-col items-center gap-5 text-center">
                {/* Spinning icon + headline */}
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin text-[#00e5a0]" />
                  {cancelling && (
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#ff5757]/20 border border-[#ff5757]/40 text-[9px] font-bold text-[#ff5757] uppercase tracking-wider">
                      Stopping
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#e8ecf4]">
                    {phase === 'reading' && `Reading ${fileName || 'your file'}…`}
                    {phase === 'extracting' && (
                      cancelling ? 'Stopping extraction…' :
                      inVlmStage ? `Analyzing ${vlm!.images} image${vlm!.images > 1 ? 's' : ''} with AI vision…` :
                      inExtractStage ? `Extracting questions with AI…` :
                      'Extracting questions with AI…'
                    )}
                    {phase === 'importing' && 'Saving to the Question Bank…'}
                  </p>
                  <p className="text-xs text-[#5a6178] mt-1.5 max-w-sm">
                    {phase === 'extracting' && pass >= 2 && !cancelling && (
                      <span className="text-[#fbbf24]">Resumed after a rate-limit pause (pass {pass}). </span>
                    )}
                    {statusMsg || (phase === 'extracting' ? 'This can take up to a minute for long documents.' : '')}
                  </p>
                </div>

                {/* ── Rich progress card (extracting phase only) ── */}
                {phase === 'extracting' && (
                  <div className="w-full max-w-md flex flex-col gap-3 mt-1">
                    {/* Stage 1: VLM image analysis */}
                    {imageCount > 0 && (
                      <div className={`rounded-lg border p-3 text-left transition-all ${
                        inVlmStage
                          ? 'border-[#f472b6]/30 bg-[#f472b6]/[0.04]'
                          : vlm && vlm.images > 0
                            ? 'border-[#00e5a0]/20 bg-[#00e5a0]/[0.03]'
                            : 'border-white/[0.06] bg-[#1a1e2b]/40'
                      }`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          {inVlmStage ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#f472b6]" />
                          ) : vlm && vlm.images > 0 ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5a0]" />
                          ) : (
                            <ScanSearch className="w-3.5 h-3.5 text-[#5a6178]" />
                          )}
                          <span className="text-xs font-semibold text-[#e8ecf4]">
                            Image analysis {inVlmStage ? '(running)' : vlm && vlm.images > 0 ? '(done)' : ''}
                          </span>
                          <span className="ml-auto text-[10px] text-[#5a6178]">
                            {vlm && vlm.images > 0 ? `${vlm.done}/${vlm.images}` : `${imageCount} pending`}
                          </span>
                        </div>
                        {inVlmStage && vlm && vlm.images > 0 && (
                          <div className="h-1 rounded-full bg-[#1a1e2b] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#f472b6] to-[#ec4899] transition-all duration-500"
                              style={{ width: `${vlmPct}%` }}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stage 2: Text extraction */}
                    <div className={`rounded-lg border p-3 text-left transition-all ${
                      inExtractStage
                        ? 'border-[#00e5a0]/30 bg-[#00e5a0]/[0.04]'
                        : inVlmStage
                          ? 'border-white/[0.06] bg-[#1a1e2b]/40 opacity-60'
                          : 'border-white/[0.06] bg-[#1a1e2b]/40'
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        {inExtractStage ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00e5a0]" />
                        ) : (
                          <FileSearch className="w-3.5 h-3.5 text-[#5a6178]" />
                        )}
                        <span className="text-xs font-semibold text-[#e8ecf4]">
                          Question extraction {inExtractStage ? '(running)' : '(queued)'}
                        </span>
                        {total > 0 && (
                          <span className="ml-auto text-[10px] text-[#5a6178]">
                            {done}/{total} parts
                          </span>
                        )}
                      </div>
                      {inExtractStage && total > 0 && (
                        <>
                          <div className="h-1 rounded-full bg-[#1a1e2b] overflow-hidden mb-1.5">
                            <div
                              className="h-full bg-gradient-to-r from-[#00e5a0] to-[#10b981] transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[#5a6178]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {elapsedSec !== null ? `${elapsedSec}s elapsed` : '—'}
                            </span>
                            {showEta && etaSec !== null && (
                              <span>~{etaSec}s remaining</span>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Stop button — always enabled during the extracting
                        phase. If called before the POST returns a jobId,
                        cancelExtraction handles it by resetting the UI. */}
                    {!cancelling ? (
                      <button
                        type="button"
                        onClick={() => cancelExtraction(extractJobId)}
                        className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[#ff5757]/30 bg-[#ff5757]/10 text-[#ff5757] hover:bg-[#ff5757]/20 hover:border-[#ff5757]/50 transition-all"
                        title="Cancel this extraction and return to the input"
                      >
                        <Square className="w-3 h-3 fill-current" />
                        Stop extraction
                      </button>
                    ) : (
                      <div className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[#ff5757]/30 bg-[#ff5757]/10 text-[#ff5757]">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Stopping — finishing current AI call…
                      </div>
                    )}
                  </div>
                )}

                {/* Reading phase: simpler progress (just a spinner + the
                    file-extract stage message from extractFromFile). */}
                {phase === 'reading' && (
                  <p className="text-[10px] text-[#5a6178] max-w-sm">
                    Extracting text and embedded images from the file before sending to the AI…
                  </p>
                )}
              </div>
            );
          })()
        )}

        {/* ── Idle / input ── */}
        {(phase === 'idle' || phase === 'preview') && (
          <>
            {/* Mode tabs */}
            {phase === 'idle' && (
              <div className="flex items-center gap-1 p-1 rounded-lg bg-[#1a1e2b] border border-white/[0.06] w-fit mb-4">
                {([
                  { id: 'upload', label: 'Upload File', icon: UploadCloud },
                  { id: 'paste', label: 'Paste Text', icon: ClipboardPaste },
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setMode(t.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      mode === t.id
                        ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
                        : 'text-[#8b92a8] hover:text-[#e8ecf4]'
                    }`}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {/* Upload tab */}
            {phase === 'idle' && mode === 'upload' && (
              <div className="space-y-4">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => inputRef.current?.click()}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const f = e.dataTransfer.files?.[0];
                    if (f) handleFile(f);
                  }}
                  className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all ${
                    dragOver
                      ? 'border-[#00e5a0]/60 bg-[#00e5a0]/[0.06]'
                      : 'border-white/[0.12] hover:border-[#00e5a0]/35 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/25 flex items-center justify-center">
                    <UploadCloud className="w-6 h-6 text-[#00e5a0]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#e8ecf4]">
                      Drop a question file here, or click to browse
                    </p>
                    <p className="text-xs text-[#5a6178] mt-1">
                      JSON / CSV import directly · TXT / MD / DOCX / PDF / PPTX are parsed with AI
                    </p>
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".json,.csv,.tsv,.txt,.md,.docx,.pdf,.pptx"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                      e.target.value = '';
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#5a6178]">
                  <span className="flex items-center gap-1.5"><FileJson className="w-3.5 h-3.5" /> JSON</span>
                  <span className="flex items-center gap-1.5"><FileSpreadsheet className="w-3.5 h-3.5" /> CSV</span>
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> TXT / MD</span>
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> DOCX / PDF / PPTX</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#1a1e2b] px-4 py-3">
                  <div className="flex items-start gap-2.5">
                    <Download className="w-3.5 h-3.5 text-[#8b92a8] mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#8b92a8]">Need a template?</p>
                      <p className="text-[11px] text-[#5a6178]">Download the exact column / field format</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => downloadTemplate('csv')}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] transition-all"
                    >
                      CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadTemplate('json')}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#1a1e2b] border border-white/[0.1] text-[#e8ecf4] hover:border-white/[0.2] transition-all"
                    >
                      JSON
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Paste tab */}
            {phase === 'idle' && mode === 'paste' && (
              <div className="space-y-3">
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder={`Paste your questions here, in any layout. Examples:\n\n1. What is the most common cause of community-acquired pneumonia?\nA) Streptococcus pneumoniae  B) Haemophilus influenzae  C) Mycoplasma  D) Klebsiella\nAnswer: A — S. pneumoniae is the #1 cause of CAP.\n\n2. The left lung has three lobes. (True/False)\nAnswer: False — the left lung has two lobes.`}
                  rows={10}
                  className="w-full rounded-lg border border-white/[0.1] bg-[#1a1e2b] px-3.5 py-3 text-sm text-[#e8ecf4] placeholder:text-[#5a6178]/70 focus:outline-none focus:border-[#00e5a0]/40 focus:ring-1 focus:ring-[#00e5a0]/25 font-mono leading-relaxed"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#5a6178] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00e5a0]/70" />
                    {pastedText.trim()
                      ? `${pastedText.length.toLocaleString()} characters ≈ ${estimateQuestionCount(pastedText)} questions — AI will find them all`
                      : 'AI will find the questions, options and answers in your text'}
                  </p>
                  <button
                    type="button"
                    onClick={handleExtractPasted}
                    disabled={!pastedText.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Extract Questions
                  </button>
                </div>
              </div>
            )}

            {/* Preview */}
            {phase === 'preview' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#1a1e2b] px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {sourceKind === 'file-structured' ? (
                      <FileSpreadsheet className="w-4 h-4 text-[#00e5a0] shrink-0" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-[#00e5a0] shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#e8ecf4] truncate">{fileName}</p>
                      <p className="text-[11px] text-[#5a6178]">
                        {questions.length} question{questions.length > 1 ? 's' : ''} found
                        {sourceKind !== 'file-structured' ? ' (AI-extracted — review before import)' : ''}
                        {' · '}{includedCount} selected for import
                      </p>
                      {sourceKind !== 'file-structured' && detectedCount > questions.length * 1.15 && (
                        <p className="text-[11px] text-[#e8b45a] mt-0.5">
                          The text detector saw ~{detectedCount} question-like blocks — {detectedCount - questions.length} more than the AI found. Some may be duplicates or partial questions, but if your file should have more, try re-importing it (duplicates are skipped automatically).
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => { setExcluded(new Set()); }}
                      className="text-[11px] font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors"
                    >
                      Select all
                    </button>
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="p-1.5 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all"
                      title="Start over"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-[42vh] overflow-y-auto space-y-2 pr-1">
                  {questions.map((q, i) => {
                    const isExcluded = excluded.has(i);
                    const isExpanded = expanded === i;
                    return (
                      <div
                        key={i}
                        className={`rounded-lg border transition-all ${
                          isExcluded
                            ? 'border-white/[0.04] bg-[#1a1e2b]/40 opacity-50'
                            : 'border-white/[0.08] bg-[#1a1e2b] hover:border-white/[0.14]'
                        }`}
                      >
                        <div className="flex items-start gap-3 p-3">
                          <button
                            type="button"
                            onClick={() => toggleExcluded(i)}
                            className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              isExcluded
                                ? 'border-white/[0.15] text-transparent'
                                : 'border-[#00e5a0]/50 bg-[#00e5a0]/15 text-[#00e5a0]'
                            }`}
                            title={isExcluded ? 'Include this question' : 'Exclude this question'}
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpanded(isExpanded ? null : i)}
                            className="flex-1 text-left min-w-0"
                          >
                            <p className="text-xs text-[#e8ecf4] leading-relaxed line-clamp-2">
                              <span className="text-[#5a6178] mr-1.5">{i + 1}.</span>
                              {q.text}
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                q.type === 'mcq' ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/25'
                                  : q.type === 'tf' ? 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/25'
                                  : 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/25'
                              }`}>
                                {TYPE_LABELS[q.type] || q.type}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${DIFF_COLORS[q.difficulty] || DIFF_COLORS.Moderate}`}>
                                {q.difficulty}
                              </span>
                              {q.imageUrl && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border text-[#f472b6] bg-[#f472b6]/10 border-[#f472b6]/25" title="Question extracted from this image">
                                  <ImageIcon className="w-2.5 h-2.5" /> Image
                                </span>
                              )}
                              {edited.has(i) && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border text-[#00e5a0] bg-[#00e5a0]/10 border-[#00e5a0]/25">
                                  <Pencil className="w-2.5 h-2.5" /> Edited
                                </span>
                              )}
                              {q.system && q.system !== 'General' && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/[0.05] border border-white/[0.08] text-[#8b92a8]">
                                  {q.system}
                                </span>
                              )}
                              {q.options.length > 0 && (
                                <span className="text-[10px] text-[#5a6178]">{q.options.length} options</span>
                              )}
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => (editing === i ? cancelEdit() : startEdit(i))}
                            className={`mt-0.5 p-1.5 rounded-lg transition-all shrink-0 ${
                              editing === i
                                ? 'text-[#00e5a0] bg-[#00e5a0]/10'
                                : edited.has(i)
                                  ? 'text-[#00e5a0] hover:bg-[#00e5a0]/10'
                                  : 'text-[#5a6178] hover:text-[#e8ecf4] hover:bg-white/[0.05]'
                            }`}
                            title={editing === i ? 'Cancel editing' : 'Edit this question'}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpanded(isExpanded ? null : i)}
                            className="mt-0.5 text-[#5a6178] hover:text-[#e8ecf4] transition-colors shrink-0"
                          >
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        </div>

                        {isExpanded && (editing === i && draft ? (
                          <QuestionEditForm
                            draft={draft}
                            onChange={patchDraft}
                            onSave={saveEdit}
                            onCancel={cancelEdit}
                          />
                        ) : (
                          <div className="px-3 pb-3 pt-1 border-t border-white/[0.05] space-y-2.5">
                            {q.options.length > 0 && (
                              <div className="space-y-1">
                                {q.options.map((opt, oi) => {
                                  const isCorrect = opt.trim().toLowerCase() === q.answer.trim().toLowerCase();
                                  return (
                                    <div
                                      key={oi}
                                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] ${
                                        isCorrect
                                          ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0]'
                                          : 'bg-white/[0.03] border border-transparent text-[#8b92a8]'
                                      }`}
                                    >
                                      <span className="font-bold opacity-70">{String.fromCharCode(65 + oi)}</span>
                                      <span className="flex-1">{opt}</span>
                                      {isCorrect && <Check className="w-3 h-3" />}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {q.type === 'tf' && (
                              <div className="px-2.5 py-1.5 rounded-md text-[11px] bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] inline-block font-semibold">
                                Answer: {q.answer}
                              </div>
                            )}
                            {q.type === 'short' && (
                              <div className="px-2.5 py-1.5 rounded-md text-[11px] bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0]">
                                Answer: {q.answer}
                              </div>
                            )}
                            {q.explanation && (
                              <p className="text-[11px] text-[#8b92a8] leading-relaxed">
                                <span className="font-semibold text-[#5a6178]">Explanation: </span>
                                {q.explanation}
                              </p>
                            )}
                            {(q.topic || q.tags?.length > 0) && (
                              <div className="flex flex-wrap gap-1.5">
                                {q.topic && q.topic !== 'General' && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8]">{q.topic}</span>
                                )}
                                {q.tags.slice(0, 5).map((t) => (
                                  <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.05] border border-white/[0.08] text-[#8b92a8]">#{t}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>

                {sourceKind !== 'file-structured' && (
                  <div className="flex items-start gap-2 rounded-lg border border-[#f59e0b]/20 bg-[#f59e0b]/[0.05] px-3.5 py-2.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[#8b92a8] leading-relaxed">
                      These questions were extracted by AI — verify the highlighted answers look right. Use the
                      pencil icon on any question to fix its text, options or answer before importing.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { reset(); }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors"
                  >
                    ← Back
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleClose(false)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-[#8b92a8] hover:text-[#e8ecf4] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleImport}
                      disabled={includedCount === 0}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-[#00e5a0]/15 border border-[#00e5a0]/35 text-[#00e5a0] hover:bg-[#00e5a0]/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Import {includedCount} Question{includedCount > 1 ? 's' : ''}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
