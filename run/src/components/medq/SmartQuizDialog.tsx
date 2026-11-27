'use client';

import { useState, useCallback, useMemo } from 'react';
import { Question } from '@/lib/medq-types';
import QuestionCard from '@/components/medq/QuestionCard';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Target,
  TrendingUp,
  Zap,
  Sparkles,
  Trophy,
  BarChart3,
} from 'lucide-react';

/* ── Types ── */
interface SmartQuizQuestion extends Question {
  adaptiveMetadata?: {
    difficulty: string;
    systemWeight: number;
    reason: string;
  };
}

interface SmartQuizResult {
  questionId: string;
  correct: boolean;
  timeTaken: number;
  difficulty: string;
  system: string;
}

interface SmartQuizProps {
  open: boolean;
  onClose: () => void;
}

type QuizPhase = 'config' | 'loading' | 'active' | 'summary';

/* ── Component ── */
export default function SmartQuizDialog({ open, onClose }: SmartQuizProps) {
  const [phase, setPhase] = useState<QuizPhase>('config');
  const [questionCount, setQuestionCount] = useState(10);
  const [focus, setFocus] = useState<'weak' | 'mixed' | 'untested'>('weak');
  const [questions, setQuestions] = useState<SmartQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SmartQuizResult[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [adaptiveMeta, setAdaptiveMeta] = useState<{
    difficultyTarget?: string;
    weakSystems?: string[];
    systemAccuracies?: Array<{ system: string; accuracy: number; total: number }>;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    totalTime: number;
    xpEarned: number;
    systemBreakdown: Record<string, { correct: number; total: number }>;
    recommendation: string;
  } | null>(null);

  const currentQuestion = questions[currentIndex] || null;

  /* ── Start quiz ── */
  const startQuiz = useCallback(async () => {
    setPhase('loading');
    setAnswers([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setRevealed(false);
    setSummaryData(null);
    try {
      const res = await fetch(`/api/smart-quiz?count=${questionCount}&focus=${focus}`);
      if (!res.ok) throw new Error('Failed to generate quiz');
      const data = await res.json();
      setQuestions(data.questions || []);
      setAdaptiveMeta(data.metadata || {});
      setQuestionStartTime(Date.now());
      setPhase('active');
    } catch (err) {
      console.error('Smart quiz error:', err);
      toast.error('Failed to generate smart quiz');
      setPhase('config');
    }
  }, [questionCount, focus]);

  /* ── Handle answer selection ── */
  const handleAnswer = useCallback((answer: string) => {
    if (revealed) return;
    setSelectedAnswer(answer);
    setRevealed(true);
  }, [revealed]);

  /* ── Check if answer is correct ── */
  const isCorrectAnswer = useCallback((answer: string, question: SmartQuizQuestion) => {
    const normAns = answer.replace(/<[^>]*>/g, '').trim().toLowerCase();
    const normCorrect = question.answer.replace(/<[^>]*>/g, '').trim().toLowerCase();
    if (normAns === normCorrect) return true;
    // Check if answer matches option letter
    if (['a', 'b', 'c', 'd'].includes(normCorrect)) {
      const idx = normCorrect.charCodeAt(0) - 97;
      if (question.options[idx]) {
        const optNorm = question.options[idx].replace(/<[^>]*>/g, '').trim().toLowerCase();
        if (optNorm === normAns) return true;
      }
    }
    // Check if answer is contained in options
    return question.options.some(opt =>
      opt.replace(/<[^>]*>/g, '').trim().toLowerCase() === normAns && normAns === normCorrect
    );
  }, []);

  /* ── Next question ── */
  const nextQuestion = useCallback(() => {
    if (!currentQuestion || !selectedAnswer) return;

    const timeTaken = Date.now() - questionStartTime;
    const correct = isCorrectAnswer(selectedAnswer, currentQuestion);

    const newAnswer: SmartQuizResult = {
      questionId: currentQuestion.id,
      correct,
      timeTaken,
      difficulty: currentQuestion.difficulty,
      system: currentQuestion.system,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // Check if quiz is done
    if (currentIndex >= questions.length - 1) {
      // Submit results
      submitResults(newAnswers);
    } else {
      // Next question
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setRevealed(false);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestion, selectedAnswer, questionStartTime, isCorrectAnswer, answers, currentIndex, questions.length]);

  /* ── Submit results ── */
  const submitResults = useCallback(async (finalAnswers: SmartQuizResult[]) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/smart-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: `sq_${Date.now()}`,
          answers: finalAnswers.map(a => ({
            questionId: a.questionId,
            correct: a.correct,
            timeTaken: a.timeTaken,
          })),
        }),
      });
      if (!res.ok) throw new Error('Failed to submit results');
      const data = await res.json();
      setSummaryData(data.results);
      setPhase('summary');
      toast.success(`Smart Quiz complete! ${data.results.accuracy}% accuracy`);
    } catch (err) {
      console.error('Submit error:', err);
      // Still show summary with local data
      const correct = finalAnswers.filter(a => a.correct).length;
      const totalTime = finalAnswers.reduce((s, a) => s + a.timeTaken, 0) / 1000;
      const systemBreakdown: Record<string, { correct: number; total: number }> = {};
      for (const a of finalAnswers) {
        if (!systemBreakdown[a.system]) systemBreakdown[a.system] = { correct: 0, total: 0 };
        systemBreakdown[a.system].total++;
        if (a.correct) systemBreakdown[a.system].correct++;
      }
      setSummaryData({
        totalQuestions: finalAnswers.length,
        correctAnswers: correct,
        accuracy: Math.round((correct / finalAnswers.length) * 100),
        totalTime: Math.round(totalTime),
        xpEarned: correct * 7,
        systemBreakdown,
        recommendation: 'Keep practicing to improve your accuracy!',
      });
      setPhase('summary');
    } finally {
      setSubmitting(false);
    }
  }, []);

  /* ── Close handler ── */
  const handleClose = useCallback(() => {
    if (phase === 'active') {
      // Confirm before closing active quiz
      if (!window.confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) return;
    }
    setPhase('config');
    setQuestions([]);
    setAnswers([]);
    onClose();
  }, [phase, onClose]);

  /* ── Difficulty progression for summary ── */
  const difficultyProgression = useMemo(() => {
    return answers.map((a, i) => ({
      index: i + 1,
      correct: a.correct ? 1 : 0,
      difficulty: a.difficulty,
    }));
  }, [answers]);

  /* ── Render ── */
  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="bg-[#151821] border-white/[0.08] text-[#e8ecf4] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#e8ecf4]">
            <Brain className="w-5 h-5 text-[#00e5a0]" />
            Smart Quiz
          </DialogTitle>
        </DialogHeader>

        {/* ── Config Phase ── */}
        {phase === 'config' && (
          <div className="space-y-6 py-2">
            {/* Question count */}
            <div>
              <label className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-3 block">
                Number of Questions
              </label>
              <div className="flex gap-3">
                {[5, 10, 20].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuestionCount(n)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${
                      questionCount === n
                        ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30 text-[#00e5a0]'
                        : 'bg-[#1a1e2b] border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15]'
                    }`}
                  >
                    {n} Q
                  </button>
                ))}
              </div>
            </div>

            {/* Focus mode */}
            <div>
              <label className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-3 block">
                Focus Mode
              </label>
              <div className="space-y-2">
                {[
                  { value: 'weak' as const, label: 'Weak Areas', desc: 'Focus on systems where you struggle', icon: <Target className="w-4 h-4" /> },
                  { value: 'mixed' as const, label: 'Mixed', desc: 'Balanced mix across all systems', icon: <BarChart3 className="w-4 h-4" /> },
                  { value: 'untested' as const, label: 'Untested Topics', desc: 'Explore topics you haven\'t studied yet', icon: <Sparkles className="w-4 h-4" /> },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFocus(opt.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      focus === opt.value
                        ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30'
                        : 'bg-[#1a1e2b] border-white/[0.08] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      focus === opt.value ? 'text-[#00e5a0] bg-[#00e5a0]/15' : 'text-[#5a6178] bg-white/[0.04]'
                    }`}>
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${focus === opt.value ? 'text-[#00e5a0]' : 'text-[#e8ecf4]'}`}>
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-[#5a6178]">{opt.desc}</p>
                    </div>
                    {focus === opt.value && (
                      <CheckCircle2 className="w-5 h-5 text-[#00e5a0]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Start button */}
            <button
              type="button"
              onClick={startQuiz}
              className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#00e5a0] text-[#0c0e14] hover:bg-[#00e5a0]/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Start Smart Quiz
            </button>
          </div>
        )}

        {/* ── Loading Phase ── */}
        {phase === 'loading' && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-[#00e5a0]/10 flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-[#00e5a0] animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-[#e8ecf4] mb-2">Analyzing your performance...</p>
            <p className="text-xs text-[#5a6178]">Selecting questions based on your strengths & weaknesses</p>
            <Loader2 className="w-5 h-5 text-[#00e5a0] animate-spin mt-4" />
          </div>
        )}

        {/* ── Active Quiz Phase ── */}
        {phase === 'active' && currentQuestion && (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#8b95a8]">
                {currentIndex + 1}/{questions.length}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#00e5a0] transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              {currentQuestion.adaptiveMetadata && (
                <Badge
                  variant="secondary"
                  className="text-[9px] font-semibold border-0 px-2 py-0.5 bg-[#8b5cf6]/10 text-[#8b5cf6]"
                >
                  {currentQuestion.adaptiveMetadata.reason}
                </Badge>
              )}
            </div>

            {/* Adaptive metadata card */}
            {currentQuestion.adaptiveMetadata && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#8b5cf6]/[0.06] border border-[#8b5cf6]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6]" />
                <span className="text-[10px] text-[#8b5cf6]">
                  Weight: {currentQuestion.adaptiveMetadata.systemWeight}x
                  {adaptiveMeta.difficultyTarget && ` • Target: ${adaptiveMeta.difficultyTarget}`}
                </span>
              </div>
            )}

            {/* Question card */}
            <div className="bg-[#1a1e2b] border border-white/[0.06] rounded-2xl overflow-hidden">
              <QuestionCard
                question={currentQuestion}
                index={currentIndex}
                noAutoReveal
                forceRevealed={revealed}
              />
            </div>

            {/* Answer feedback for MCQ/TF */}
            {revealed && selectedAnswer && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${
                isCorrectAnswer(selectedAnswer, currentQuestion)
                  ? 'bg-[#00e5a0]/10 border-[#00e5a0]/20'
                  : 'bg-[#ff5757]/10 border-[#ff5757]/20'
              }`}>
                {isCorrectAnswer(selectedAnswer, currentQuestion) ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#00e5a0]" />
                    <span className="text-sm font-semibold text-[#00e5a0]">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-[#ff5757]" />
                    <span className="text-sm font-semibold text-[#ff5757]">Incorrect</span>
                  </>
                )}
                {/* Difficulty adjustment indicator */}
                {answers.length > 0 && (
                  <span className="ml-auto text-[10px] text-[#5a6178]">
                    {isCorrectAnswer(selectedAnswer, currentQuestion) ? '↑ Difficulty may increase' : '↓ Difficulty may decrease'}
                  </span>
                )}
              </div>
            )}

            {/* Next button */}
            {revealed && (
              <button
                type="button"
                onClick={nextQuestion}
                disabled={submitting}
                className="w-full py-3 rounded-xl text-sm font-bold bg-[#00e5a0] text-[#0c0e14] hover:bg-[#00e5a0]/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : currentIndex >= questions.length - 1 ? (
                  <>
                    <Trophy className="w-4 h-4" />
                    View Results
                  </>
                ) : (
                  <>
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* ── Summary Phase ── */}
        {phase === 'summary' && summaryData && (
          <div className="space-y-5 py-2">
            {/* Accuracy hero */}
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="text-center">
                <div className={`text-4xl font-black ${
                  summaryData.accuracy >= 80 ? 'text-[#00e5a0]' : summaryData.accuracy >= 50 ? 'text-[#f59e0b]' : 'text-[#ff5757]'
                }`}>
                  {summaryData.accuracy}%
                </div>
                <p className="text-xs text-[#5a6178] mt-1">Accuracy</p>
              </div>
              <div className="w-px h-12 bg-white/[0.08]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#e8ecf4]">
                  {summaryData.correctAnswers}/{summaryData.totalQuestions}
                </div>
                <p className="text-xs text-[#5a6178] mt-1">Correct</p>
              </div>
              <div className="w-px h-12 bg-white/[0.08]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#8b5cf6]">
                  +{summaryData.xpEarned}
                </div>
                <p className="text-xs text-[#5a6178] mt-1">XP Earned</p>
              </div>
            </div>

            {/* Difficulty progression chart */}
            {difficultyProgression.length > 0 && (
              <div className="rounded-xl p-4 bg-[#1a1e2b] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span className="text-xs font-semibold text-[#e8ecf4]">Difficulty Progression</span>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {difficultyProgression.map((dp, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div
                        className="w-full rounded-t transition-all"
                        style={{
                          height: `${dp.difficulty === 'Hard' ? 100 : dp.difficulty === 'Medium' ? 65 : 35}%`,
                          background: dp.correct
                            ? dp.difficulty === 'Hard' ? '#00e5a0' : dp.difficulty === 'Medium' ? 'rgba(0,229,160,0.6)' : 'rgba(0,229,160,0.3)'
                            : dp.difficulty === 'Hard' ? '#ff5757' : dp.difficulty === 'Medium' ? 'rgba(255,87,87,0.6)' : 'rgba(255,87,87,0.3)',
                          minHeight: '4px',
                        }}
                      />
                      <span className="text-[7px] text-[#3a4055]">{dp.difficulty[0]}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[8px] text-[#5a6178]">
                    <span className="w-2 h-2 rounded-sm bg-[#00e5a0]" /> Correct
                  </span>
                  <span className="flex items-center gap-1 text-[8px] text-[#5a6178]">
                    <span className="w-2 h-2 rounded-sm bg-[#ff5757]" /> Wrong
                  </span>
                </div>
              </div>
            )}

            {/* Performance by system */}
            {Object.keys(summaryData.systemBreakdown).length > 0 && (
              <div className="rounded-xl p-4 bg-[#1a1e2b] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-3.5 h-3.5 text-[#22d3ee]" />
                  <span className="text-xs font-semibold text-[#e8ecf4]">Performance by System</span>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Object.entries(summaryData.systemBreakdown).map(([system, data]) => {
                    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                    return (
                      <div key={system}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium text-[#c8cdd8] truncate">{system}</span>
                          <span className={`text-[10px] font-bold ${pct >= 80 ? 'text-[#00e5a0]' : pct >= 50 ? 'text-[#f59e0b]' : 'text-[#ff5757]'}`}>
                            {pct}% ({data.correct}/{data.total})
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${Math.max(pct, 2)}%`,
                              background: pct >= 80 ? '#00e5a0' : pct >= 50 ? '#f59e0b' : '#ff5757',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Adaptive recommendation */}
            <div className="rounded-xl p-4 bg-[#00e5a0]/[0.06] border border-[#00e5a0]/10">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#00e5a0] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#00e5a0] mb-1">Adaptive Recommendation</p>
                  <p className="text-[11px] text-[#8b95a8] leading-relaxed">{summaryData.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setPhase('config'); setQuestions([]); }}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#1a1e2b] border border-white/[0.08] text-[#e8ecf4] hover:border-white/[0.15] transition-all"
              >
                New Quiz
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#00e5a0] text-[#0c0e14] hover:bg-[#00e5a0]/90 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
