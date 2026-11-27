'use client';

/**
 * Exam Simulation — timed USMLE-style question blocks with score reports.
 *
 *   Setup   → configure block size / duration / system focus, optionally
 *             pick specific questions, toggle Voice mode + Show-answer mode.
 *   Running → one question at a time, countdown timer, navigation grid, flags.
 *             Voice mode: TTS reads questions, mic captures spoken answers.
 *             Show-answer mode: instant feedback after each answer.
 *   Report  → score + pass band, per-organ-system / per-task breakdown,
 *             per-question review with full explanations.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Clock, Flag, ChevronLeft, ChevronRight, Play, Trophy, RotateCcw, AlertTriangle, CheckCircle2, XCircle, LayoutGrid, Headphones, Mic, Settings as SettingsIcon } from 'lucide-react';
import QuestionCard from '@/components/medq/QuestionCard';
import { MEDICAL_SYSTEMS, type Question } from '@/lib/medq-types';
import { toast } from 'sonner';
import {
  DEFAULT_VOICE_SETTINGS, TTS_SUPPORTED, ASR_SUPPORTED, useVoiceSettings,
  useQuestionPicker, useInstantFeedback, type VoiceSettings,
} from '@/components/medq/exam-sim/shared';
import { VoicePanel, QuestionPicker, InstantFeedbackPanel } from '@/components/medq/exam-sim/components';

interface ExamQuestionSafe extends Partial<Question> {
  id: string;
  type: string;
  text: string;
  options: string[] | string;
  answer?: string;
}

interface ReportRow {
  questionId: string;
  order: number;
  correct: boolean;
  selectedAnswer: string;
  correctAnswer: string;
  blank: boolean;
  question: (Question & { options: string[] | string }) | null;
}

interface ScoreReport {
  attemptId: string;
  score: number;
  total: number;
  percentage: number;
  band: string;
  autoSubmitted: boolean;
  perOrgan: Array<{ system: string; correct: number; total: number; pct: number }>;
  perTask: Array<{ task: string; correct: number; total: number; pct: number }>;
  results: ReportRow[];
}

interface HistoryItem {
  id: string;
  title: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

type Phase = 'setup' | 'running' | 'report';
type AnswerMode = 'mcq' | 'open';

function fmtClock(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0
    ? `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    : `${m}:${sec.toString().padStart(2, '0')}`;
}

const BAND_COLORS: Record<string, string> = {
  'High performance': '#00e5a0',
  'Passing': '#4fc3f7',
  'Below passing': '#ff5757',
};

export default function ExamSimPage() {
  const [phase, setPhase] = useState<Phase>('setup');

  // ── Setup ──
  const [blockSize, setBlockSize] = useState(40);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [systemFocus, setSystemFocus] = useState('all');
  const [starting, setStarting] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // New setup options
  const [voiceMode, setVoiceMode] = useState(false);
  const [answerMode, setAnswerMode] = useState<AnswerMode>('mcq');
  const [instantFeedback, setInstantFeedback] = useState(false);
  const [useCustomQuestions, setUseCustomQuestions] = useState(false);
  const picker = useQuestionPicker();

  // ── Voice settings ──
  const { settings: voiceSettings, setSettings: setVoiceSettings, voices } = useVoiceSettings();

  // ── Running ──
  const [examId, setExamId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ExamQuestionSafe[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const answersRef = useRef<Record<string, string>>({});
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const submittedRef = useRef(false);
  const [spokenText, setSpokenText] = useState('');

  // ── Report ──
  const [report, setReport] = useState<ScoreReport | null>(null);
  const [reviewOpen, setReviewOpen] = useState<Record<string, boolean>>({});

  // ── Instant feedback ──
  const instantFb = useInstantFeedback(examId);

  // Load history on setup phase
  useEffect(() => {
    if (phase !== 'setup' || historyLoaded) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/exam-sim/history');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setHistory(data.attempts || []);
        }
      } catch { /* ignore */ }
      if (!cancelled) setHistoryLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [phase, historyLoaded]);

  const startExam = useCallback(async () => {
    setStarting(true);
    try {
      const payload: Record<string, unknown> = {
        count: blockSize,
        durationMinutes,
        system: systemFocus,
      };
      if (useCustomQuestions && picker.selectedCount >= 5) {
        payload.questionIds = picker.selectedIds();
      }
      const res = await fetch('/api/exam-sim/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Could not start the exam');
        return;
      }
      setExamId(data.examId);
      setQuestions(
        (data.questions || []).map((q: ExamQuestionSafe & { tags?: string | string[]; sources?: string | string[] }) => ({
          ...q,
          options: typeof q.options === 'string' ? safeParse(q.options) : q.options,
          tags: typeof q.tags === 'string' ? safeParse(q.tags) : Array.isArray(q.tags) ? q.tags : [],
          sources: typeof q.sources === 'string' ? safeParse(q.sources) : Array.isArray(q.sources) ? q.sources : [],
          answer: '',
          explanation: '',
          mnemonic: '',
          clinicalPearl: '',
          distractorAnalysis: '',
        })),
      );
      setAnswers({});
      answersRef.current = {};
      setTranscripts({});
      setCurrentIdx(0);
      setFlagged(new Set());
      setSecondsLeft(data.durationMinutes * 60);
      submittedRef.current = false;
      setSpokenText('');
      instantFb.clear();
      setPhase('running');
      toast.success(`${data.count}-question simulation started — good luck!`);
    } catch {
      toast.error('Could not start the exam — check your connection');
    } finally {
      setStarting(false);
    }
  }, [blockSize, durationMinutes, systemFocus, useCustomQuestions, picker]);

  const submitExam = useCallback(
    async (auto: boolean) => {
      if (submittedRef.current || !examId) return;
      submittedRef.current = true;
      setSubmitting(true);
      try {
        const res = await fetch(`/api/exam-sim/${examId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: answersRef.current, autoSubmitted: auto }),
        });
        const data = await res.json();
        if (!res.ok) {
          submittedRef.current = false;
          toast.error(data.error || 'Submit failed');
          return;
        }
        // Merge voice transcripts into report
        const merged: ScoreReport = {
          ...data,
          results: (data.results || []).map((r: ReportRow) => ({
            ...r,
            selectedAnswer: transcripts[r.questionId] || r.selectedAnswer,
          })),
        };
        setReport(merged);
        setReviewOpen({});
        setPhase('report');
        if (auto) toast.info('Time is up — the exam was submitted automatically');
      } catch {
        submittedRef.current = false;
        toast.error('Submit failed — check your connection');
      } finally {
        setSubmitting(false);
      }
    },
    [examId, transcripts],
  );

  // Countdown timer + auto-submit at zero
  useEffect(() => {
    if (phase !== 'running') return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          submitExam(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, submitExam]);

  const onSelectAnswer = useCallback((questionId: string, value: string | null) => {
    const next = { ...answersRef.current };
    if (value) next[questionId] = value;
    else delete next[questionId];
    answersRef.current = next;
    setAnswers(next);
    // Trigger instant feedback if enabled
    if (instantFeedback && examId && value) {
      instantFb.check(questionId, value);
    }
  }, [instantFeedback, examId, instantFb]);

  const toggleFlag = useCallback((questionId: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  }, []);

  // Reset spoken text + instant feedback panel when navigating
  useEffect(() => {
    if (phase !== 'running') return;
    const q = questions[currentIdx];
    if (q) {
      setSpokenText(transcripts[q.id] || '');
    }
  }, [currentIdx, phase, questions, transcripts]);

  const answeredCount = Object.keys(answers).length;

  // ───────────────────────────────────────────────────────────────────────────
  // SETUP PHASE
  // ───────────────────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-[#0b0e15] text-[#e8ecf4] px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#00e5a0]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Exam Simulator</h1>
              <p className="text-sm text-[#8b95a8]">Timed USMLE-style blocks · voice mode · instant feedback</p>
            </div>
          </div>

          {/* Capability warnings */}
          {voiceMode && !TTS_SUPPORTED && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
              ⚠ Your browser doesn't support text-to-speech. Use Chrome, Edge, or Safari for voice mode.
            </div>
          )}
          {voiceMode && !ASR_SUPPORTED && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
              ⚠ Your browser doesn't support speech recognition. Use Chrome, Edge, or Safari to answer by voice.
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6 space-y-6">
            <div>
              <label className="text-xs font-bold text-[#8b95a8] uppercase tracking-wider">Block size</label>
              <div className="flex gap-2 mt-2">
                {[20, 40, 60].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setBlockSize(n);
                      setDurationMinutes(Math.round(n * 1.5));
                    }}
                    disabled={useCustomQuestions}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                      blockSize === n
                        ? 'bg-[#00e5a0]/[0.12] border-[#00e5a0]/40 text-[#00e5a0]'
                        : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478] hover:text-[#e8ecf4]'
                    }`}
                  >
                    {n} questions
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#5a6478] mt-1.5">
                {useCustomQuestions ? 'Block size ignored — using your picked questions' : 'USMLE pace: ~1.5 minutes per question'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#8b95a8] uppercase tracking-wider">Time limit (min)</label>
                <input
                  type="number"
                  min={10}
                  max={240}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Math.min(240, Math.max(10, Number(e.target.value) || 60)))}
                  className="w-full mt-2 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#e8ecf4] focus:outline-none focus:border-[#00e5a0]/40"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#8b95a8] uppercase tracking-wider">System focus</label>
                <select
                  value={systemFocus}
                  onChange={(e) => setSystemFocus(e.target.value)}
                  disabled={useCustomQuestions}
                  className="w-full mt-2 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#e8ecf4] focus:outline-none focus:border-[#00e5a0]/40 disabled:opacity-40"
                >
                  <option value="all">All systems (balanced)</option>
                  {MEDICAL_SYSTEMS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── New toggles ── */}
            <div className="grid grid-cols-1 gap-3">
              {/* Voice mode toggle */}
              <button
                type="button"
                onClick={() => setVoiceMode((v) => !v)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  voiceMode
                    ? 'bg-[#4fc3f7]/[0.08] border-[#4fc3f7]/40'
                    : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${voiceMode ? 'bg-[#4fc3f7] text-[#0a0e1a]' : 'bg-white/5 text-[#5a6478]'}`}>
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#e8ecf4]">Voice mode</div>
                  <div className="text-[10px] text-[#8b95a8]">Read questions aloud · answer with your voice</div>
                </div>
                <div className={`w-10 h-5 rounded-full p-0.5 transition-all ${voiceMode ? 'bg-[#4fc3f7]' : 'bg-white/10'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${voiceMode ? 'translate-x-5' : ''}`} />
                </div>
              </button>

              {/* Voice mode: answer mode picker */}
              {voiceMode && (
                <div className="ml-12 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswerMode('mcq')}
                    className={`p-2 rounded-lg border text-left text-xs ${
                      answerMode === 'mcq' ? 'bg-[#4fc3f7]/15 border-[#4fc3f7]/40 text-[#4fc3f7]' : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478]'
                    }`}
                  >
                    <div className="font-bold">MCQ voice</div>
                    <div className="text-[10px]">Say "B" / "option C" — auto-graded</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswerMode('open')}
                    className={`p-2 rounded-lg border text-left text-xs ${
                      answerMode === 'open' ? 'bg-[#4fc3f7]/15 border-[#4fc3f7]/40 text-[#4fc3f7]' : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478]'
                    }`}
                  >
                    <div className="font-bold">Open voice</div>
                    <div className="text-[10px]">Speak naturally — self-review</div>
                  </button>
                </div>
              )}

              {/* Instant feedback toggle */}
              <button
                type="button"
                onClick={() => setInstantFeedback((v) => !v)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  instantFeedback
                    ? 'bg-[#f59e0b]/[0.08] border-[#f59e0b]/40'
                    : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${instantFeedback ? 'bg-[#f59e0b] text-[#0a0e1a]' : 'bg-white/5 text-[#5a6478]'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#e8ecf4]">Show answer after answering</div>
                  <div className="text-[10px] text-[#8b95a8]">Instant feedback: see correct answer + explanation right after each question</div>
                </div>
                <div className={`w-10 h-5 rounded-full p-0.5 transition-all ${instantFeedback ? 'bg-[#f59e0b]' : 'bg-white/10'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${instantFeedback ? 'translate-x-5' : ''}`} />
                </div>
              </button>

              {/* Custom question picker toggle */}
              <button
                type="button"
                onClick={() => setUseCustomQuestions((v) => !v)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  useCustomQuestions
                    ? 'bg-[#a78bfa]/[0.08] border-[#a78bfa]/40'
                    : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${useCustomQuestions ? 'bg-[#a78bfa] text-[#0a0e1a]' : 'bg-white/5 text-[#5a6478]'}`}>
                  <SettingsIcon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#e8ecf4]">Pick specific questions</div>
                  <div className="text-[10px] text-[#8b95a8]">Search the question bank and choose exactly which questions to include</div>
                </div>
                <div className={`w-10 h-5 rounded-full p-0.5 transition-all ${useCustomQuestions ? 'bg-[#a78bfa]' : 'bg-white/10'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${useCustomQuestions ? 'translate-x-5' : ''}`} />
                </div>
              </button>

              {useCustomQuestions && (
                <div className="ml-0">
                  <QuestionPicker picker={picker} />
                  {picker.selectedCount > 0 && picker.selectedCount < 5 && (
                    <p className="mt-2 text-[10px] text-[#ff8a8a]">Pick at least 5 questions to use custom selection (currently {picker.selectedCount}).</p>
                  )}
                  {picker.selectedCount >= 5 && (
                    <p className="mt-2 text-[10px] text-[#00e5a0]">✓ {picker.selectedCount} questions selected — exam will use these.</p>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={startExam}
              disabled={starting || (useCustomQuestions && picker.selectedCount < 5)}
              className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#00e5a0]/[0.12] text-[#00e5a0] border border-[#00e5a0]/30 hover:bg-[#00e5a0]/[0.2] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {starting ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : voiceMode ? (
                <Mic className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {starting
                ? 'Building your exam…'
                : useCustomQuestions && picker.selectedCount >= 5
                  ? `Start exam with ${picker.selectedCount} picked questions`
                  : `Start ${blockSize}-question simulation${voiceMode ? ' (voice)' : ''}${instantFeedback ? ' (instant feedback)' : ''}`}
            </button>
            <p className="text-[10px] text-[#5a6478] text-center">
              {useCustomQuestions
                ? 'Custom selection · preserves your order'
                : 'Questions balanced across organ systems · medically-reviewed preferred'}
              {!instantFeedback && ' · answers graded at submit'}
            </p>
          </div>

          {/* History */}
          {historyLoaded && history.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-[#f59e0b]" />
                <h2 className="text-sm font-bold">Past simulations</h2>
              </div>
              <div className="space-y-2">
                {history.slice(0, 5).map((h) => (
                  <div key={h.id} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span
                      className="text-lg font-bold tabular-nums w-14 text-right"
                      style={{ color: h.percentage >= 70 ? '#00e5a0' : h.percentage >= 55 ? '#4fc3f7' : '#ff5757' }}
                    >
                      {h.percentage.toFixed(0)}%
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{h.title}</p>
                      <p className="text-[10px] text-[#5a6478]">
                        {h.score}/{h.totalQuestions} correct · {new Date(h.completedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RUNNING PHASE
  // ───────────────────────────────────────────────────────────────────────────
  if (phase === 'running') {
    const q = questions[currentIdx];
    const lowTime = secondsLeft < 300;
    if (!q) return <div className="p-8 text-center text-[#5a6478]">No questions.</div>;
    const opts = typeof q.options === 'string' ? safeParse(q.options) : (q.options as string[]) || [];
    const selectedLetter = answers[q.id];
    const fb = instantFb.feedback[q.id];
    const isChecking = instantFb.checking.has(q.id);

    return (
      <div className="min-h-screen bg-[#0b0e15] text-[#e8ecf4]">
        {/* Sticky exam top bar */}
        <div className="sticky top-0 z-40 bg-[#0b0e15]/95 backdrop-blur border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
            <div className={`flex items-center gap-2 font-mono text-xl font-bold tabular-nums ${lowTime ? 'text-[#ff5757] animate-pulse' : 'text-[#e8ecf4]'}`}>
              <Clock className="w-5 h-5" />
              {fmtClock(secondsLeft)}
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs font-bold">
                Q{currentIdx + 1} / {questions.length}
              </p>
              <p className="text-[10px] text-[#5a6478]">
                {answeredCount} answered · {questions.length - answeredCount} blank
                {voiceMode && ' · 🎤 voice'}
                {instantFeedback && ' · instant'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmEnd(true)}
              disabled={submitting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#ff5757]/[0.1] text-[#ff8a8a] border border-[#ff5757]/25 hover:bg-[#ff5757]/[0.18] transition-all"
            >
              End &amp; Submit
            </button>
          </div>
          {/* progress bar */}
          <div className="h-0.5 bg-white/[0.05]">
            <div className="h-full bg-[#00e5a0]/60 transition-all" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFlag(q.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                flagged.has(q.id)
                  ? 'bg-[#f59e0b]/[0.12] border-[#f59e0b]/40 text-[#f59e0b]'
                  : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478] hover:text-[#f59e0b]'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {flagged.has(q.id) ? 'Flagged' : 'Flag for review'}
            </button>
            <span className="text-[10px] text-[#5a6478] ml-auto">
              {instantFeedback ? 'instant feedback ON' : 'no feedback until submit — like the real thing'}
            </span>
          </div>

          <QuestionCard
            key={q.id}
            question={q as unknown as Question}
            index={currentIdx}
            noAutoReveal
            attemptMode="exam-sim"
            initialSelected={answers[q.id] ?? null}
            onSelectedChange={(value) => onSelectAnswer(q.id, value)}
          />

          {/* Voice panel */}
          <VoicePanel
            voiceMode={voiceMode}
            voiceSettings={voiceSettings}
            setVoiceSettings={setVoiceSettings}
            voices={voices}
            questionText={q.text}
            options={opts}
            selectedLetter={selectedLetter}
            onLetterSelected={(letter) => onSelectAnswer(q.id, letter)}
            onTranscript={(t) => setTranscripts((prev) => ({ ...prev, [q.id]: t }))}
            answerMode={answerMode}
            spokenText={spokenText}
            setSpokenText={setSpokenText}
            onOpenAnswerChange={(text) => onSelectAnswer(q.id, text)}
          />

          {/* Instant feedback panel */}
          {instantFeedback && (fb || isChecking) && (
            <InstantFeedbackPanel
              feedback={fb}
              checking={isChecking}
              onNext={() => {
                if (currentIdx < questions.length - 1) setCurrentIdx((i) => i + 1);
                else submitExam(false);
              }}
              isLast={currentIdx === questions.length - 1}
            />
          )}

          {/* nav */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/[0.08] text-[#e8ecf4] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
              disabled={currentIdx === questions.length - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00e5a0]/[0.12] border border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/[0.2] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* question grid */}
          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-4">
            <p className="text-[10px] text-[#5a6478] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <LayoutGrid className="w-3 h-3" /> question navigator
            </p>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((qq, i) => {
                const isAnswered = Boolean(answers[qq.id]);
                const isFlagged = flagged.has(qq.id);
                const isCurrent = i === currentIdx;
                const hasFb = instantFb.feedback[qq.id];
                return (
                  <button
                    key={qq.id}
                    type="button"
                    onClick={() => setCurrentIdx(i)}
                    className={`w-8 h-8 rounded-lg text-[11px] font-bold border transition-all ${
                      isCurrent
                        ? 'bg-[#4fc3f7] border-[#4fc3f7] text-[#0a1a24]'
                        : hasFb
                          ? hasFb.correct
                            ? 'bg-[#00e5a0]/[0.15] border-[#00e5a0]/40 text-[#00e5a0]'
                            : 'bg-[#ff5757]/[0.15] border-[#ff5757]/40 text-[#ff8a8a]'
                          : isAnswered
                            ? 'bg-[#00e5a0]/[0.15] border-[#00e5a0]/40 text-[#00e5a0]'
                            : 'bg-white/[0.03] border-white/[0.08] text-[#5a6478] hover:text-[#e8ecf4]'
                    } ${isFlagged && !isCurrent ? 'ring-1 ring-[#f59e0b]/60' : ''}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-center text-[10px] text-[#3a4055]">
            ⚠️ Answers live in this tab — do not refresh. The exam auto-submits when time runs out.
          </p>
        </div>

        {/* end-exam confirm */}
        {showConfirmEnd && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="max-w-md w-full rounded-2xl border border-white/[0.08] bg-[#151821] p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
                <h2 className="text-base font-bold">Submit the exam?</h2>
              </div>
              <p className="text-sm text-[#8b95a8] mb-2">
                You answered <span className="font-bold text-[#00e5a0]">{answeredCount}</span> of {questions.length} questions.
              </p>
              {questions.length - answeredCount > 0 && (
                <p className="text-xs text-[#ff8a8a] mb-4">
                  {questions.length - answeredCount} unanswered question{questions.length - answeredCount > 1 ? 's' : ''} will be graded as incorrect.
                </p>
              )}
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowConfirmEnd(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/[0.08] text-[#e8ecf4] hover:bg-white/[0.08]"
                >
                  Keep working
                </button>
                <button
                  type="button"
                  onClick={() => { setShowConfirmEnd(false); submitExam(false); }}
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#ff5757]/[0.12] border border-[#ff5757]/30 text-[#ff8a8a] hover:bg-[#ff5757]/[0.2] disabled:opacity-50"
                >
                  {submitting ? 'Submitting…' : 'Submit now'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // REPORT PHASE
  // ───────────────────────────────────────────────────────────────────────────
  if (phase === 'report' && report) {
    const bandColor = BAND_COLORS[report.band] || '#8b95a8';
    return (
      <div className="min-h-screen bg-[#0b0e15] text-[#e8ecf4] px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Score header */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#151821] p-8 text-center">
            <Trophy className="w-10 h-10 mx-auto mb-3" style={{ color: bandColor }} />
            <p className="text-5xl font-bold tabular-nums" style={{ color: bandColor }}>
              {report.percentage.toFixed(1)}%
            </p>
            <p className="text-sm text-[#8b95a8] mt-1">
              {report.score} / {report.total} correct · <span className="font-bold" style={{ color: bandColor }}>{report.band}</span>
            </p>
            {report.autoSubmitted && (
              <p className="text-[11px] text-[#f59e0b] mt-2">⏰ Time expired — submitted automatically</p>
            )}
            <button
              type="button"
              onClick={() => { setPhase('setup'); setHistoryLoaded(false); }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00e5a0]/[0.12] text-[#00e5a0] border border-[#00e5a0]/30 hover:bg-[#00e5a0]/[0.2] transition-all"
            >
              <RotateCcw className="w-4 h-4" /> New simulation
            </button>
          </div>

          {/* Per-organ breakdown */}
          {report.perOrgan.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6">
              <h2 className="text-sm font-bold mb-4">Performance by organ system <span className="text-[#5a6478] font-normal text-[10px]">(weakest first)</span></h2>
              <div className="space-y-3">
                {report.perOrgan.map((row) => (
                  <div key={row.system}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold">{row.system}</span>
                      <span className="text-[#8b95a8] tabular-nums">{row.correct}/{row.total} · {row.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${row.pct}%`,
                          background: row.pct >= 70 ? '#00e5a0' : row.pct >= 55 ? '#4fc3f7' : '#ff5757',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Per-task breakdown */}
          {report.perTask.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6">
              <h2 className="text-sm font-bold mb-4">Performance by task <span className="text-[#5a6478] font-normal text-[10px]">(USMLE-style competency)</span></h2>
              <div className="space-y-3">
                {report.perTask.map((row) => (
                  <div key={row.task}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold">{row.task}</span>
                      <span className="text-[#8b95a8] tabular-nums">{row.correct}/{row.total} · {row.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${row.pct}%`,
                          background: row.pct >= 70 ? '#00e5a0' : row.pct >= 55 ? '#4fc3f7' : '#ff5757',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question review */}
          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-[#151821] p-6">
            <h2 className="text-sm font-bold mb-4">Question review</h2>
            <div className="space-y-2">
              {report.results.map((row, i) => {
                const open = reviewOpen[row.questionId];
                return (
                  <div key={row.questionId} className="rounded-xl border border-white/[0.06] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setReviewOpen((prev) => ({ ...prev, [row.questionId]: !open }))}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] text-left"
                    >
                      {row.correct ? (
                        <CheckCircle2 className="w-4 h-4 text-[#00e5a0] flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#ff5757] flex-shrink-0" />
                      )}
                      <span className="text-xs font-bold">Q{i + 1}</span>
                      <span className="flex-1 text-[11px] text-[#8b95a8] truncate">
                        {row.blank ? '(left blank)' : row.question ? plainPreview(row.question.text) : ''}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${row.correct ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'bg-[#ff5757]/10 text-[#ff8a8a]'}`}>
                        {row.correct ? 'CORRECT' : row.blank ? 'BLANK' : 'WRONG'}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-[#5a6478] transition-transform ${open ? 'rotate-90' : ''}`} />
                    </button>
                    {open && row.question && (
                      <div className="px-4 pb-4">
                        {/* user's answer summary */}
                        <div className="mb-3 text-[11px]">
                          <span className="text-[#5a6478]">Your answer: </span>
                          <span className={row.correct ? 'text-[#00e5a0] font-bold' : 'text-[#ff8a8a] font-bold'}>
                            {row.blank ? '—' : row.selectedAnswer}
                          </span>
                          {!row.correct && (
                            <>
                              <span className="text-[#5a6478]"> · Correct: </span>
                              <span className="text-[#00e5a0] font-bold">{row.correctAnswer}</span>
                            </>
                          )}
                        </div>
                        <QuestionCard
                          question={row.question as unknown as Question}
                          index={i}
                          forceRevealed
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function safeParse(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function plainPreview(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90);
}
