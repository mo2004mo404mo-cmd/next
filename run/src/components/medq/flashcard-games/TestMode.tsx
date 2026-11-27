'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  ArrowLeft, CheckCircle2, XCircle, Brain, RotateCcw,
  Timer, Target, BarChart3, AlertTriangle, Award,
  BookOpen, Lightbulb, TrendingUp, FileText, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { useFlashcardGameStore } from './store';

/* ─── Color Constants ─── */
const C = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, #151821)',
  cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
  green: 'var(--medq-accent-green, #00e5a0)',
  cyan: 'var(--medq-accent-cyan, #22d3ee)',
  amber: 'var(--medq-accent-amber, #ffb347)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  purple: 'var(--medq-accent-purple, #8b5cf6)',
  text: 'var(--medq-text, #e8ecf4)',
  muted: 'var(--medq-muted, #5a6478)',
  dimmed: 'var(--medq-dimmed, #3a4055)',
};

interface FlashcardItem {
  id: string;
  text: string;
  answer: string;
  options?: string[];
  explanation?: string;
  type: 'mcq' | 'tf' | 'short';
  difficulty?: string;
}

type TestQuestionType = 'mcq' | 'tf' | 'written';

interface TestQuestion {
  cardId: string;
  questionText: string;
  correctAnswer: string;
  questionType: TestQuestionType;
  options?: string[];
  explanation?: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

interface TestModeProps {
  cards: FlashcardItem[];
  onBack: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ─── Test Setup Screen ─── */
function TestSetup({ cards, onStart, onBack }: {
  cards: FlashcardItem[];
  onStart: (count: number, types: TestQuestionType[]) => void;
  onBack: () => void;
}) {
  const [questionCount, setQuestionCount] = useState(Math.min(10, cards.length));
  const [includeMCQ, setIncludeMCQ] = useState(true);
  const [includeTF, setIncludeTF] = useState(true);
  const [includeWritten, setIncludeWritten] = useState(true);

  const selectedTypes: TestQuestionType[] = [];
  if (includeMCQ) selectedTypes.push('mcq');
  if (includeTF) selectedTypes.push('tf');
  if (includeWritten) selectedTypes.push('written');

  const canStart = selectedTypes.length > 0 && questionCount > 0;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6" style={{ background: C.bg }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors" style={{ color: C.muted }}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold" style={{ color: C.text }}>Practice Test</h2>
            <p className="text-xs" style={{ color: C.muted }}>Configure your test</p>
          </div>
        </div>

        {/* Question count */}
        <div className="p-4 rounded-xl border mb-4" style={{ background: C.card, borderColor: C.cardBorder }}>
          <p className="text-xs font-bold mb-3" style={{ color: C.text }}>Number of Questions</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuestionCount(Math.max(1, questionCount - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.cardBorder, color: C.muted }}
            >
              -
            </button>
            <span className="text-2xl font-black flex-1 text-center" style={{ color: C.cyan }}>{questionCount}</span>
            <button
              onClick={() => setQuestionCount(Math.min(cards.length, questionCount + 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.cardBorder, color: C.muted }}
            >
              +
            </button>
          </div>
          <input
            type="range"
            min={1}
            max={Math.min(30, cards.length)}
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full mt-3 accent-[#22d3ee]"
          />
        </div>

        {/* Question types */}
        <div className="p-4 rounded-xl border mb-4" style={{ background: C.card, borderColor: C.cardBorder }}>
          <p className="text-xs font-bold mb-3" style={{ color: C.text }}>Question Types</p>
          <div className="space-y-2">
            {[
              { type: 'mcq' as TestQuestionType, label: 'Multiple Choice', desc: 'Select the correct answer from options', checked: includeMCQ, toggle: () => setIncludeMCQ(!includeMCQ), color: C.cyan },
              { type: 'tf' as TestQuestionType, label: 'True / False', desc: 'Determine if the statement is true or false', checked: includeTF, toggle: () => setIncludeTF(!includeTF), color: C.amber },
              { type: 'written' as TestQuestionType, label: 'Written Answer', desc: 'Type your answer without hints', checked: includeWritten, toggle: () => setIncludeWritten(!includeWritten), color: C.purple },
            ].map((item) => (
              <button
                key={item.type}
                onClick={item.toggle}
                className="w-full text-left p-3 rounded-xl border transition-all"
                style={{
                  background: item.checked ? `${item.color}06` : 'transparent',
                  borderColor: item.checked ? `${item.color}25` : C.cardBorder,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold" style={{ color: item.checked ? C.text : C.muted }}>{item.label}</p>
                    <p className="text-[10px]" style={{ color: C.dimmed }}>{item.desc}</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-md border flex items-center justify-center"
                    style={{
                      background: item.checked ? item.color : 'transparent',
                      borderColor: item.checked ? item.color : C.cardBorder,
                    }}
                  >
                    {item.checked && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.bg }} />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => canStart && onStart(questionCount, selectedTypes)}
          disabled={!canStart}
          className="w-full py-3.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: canStart ? C.cyan : `${C.dimmed}30`,
            color: canStart ? C.bg : C.dimmed,
            cursor: canStart ? 'pointer' : 'not-allowed',
          }}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Start Test ({questionCount} questions)
        </button>
      </div>
    </div>
  );
}

/* ─── Main TestMode Component ─── */
export default function TestMode({ cards, onBack }: TestModeProps) {
  const [phase, setPhase] = useState<'setup' | 'testing' | 'results'>('setup');
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const qTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start test
  const handleStartTest = useCallback((count: number, types: TestQuestionType[]) => {
    // Generate test questions from cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5).slice(0, count);
    const testQuestions: TestQuestion[] = shuffled.map((card, idx) => {
      const type = types[idx % types.length];
      const q: TestQuestion = {
        cardId: card.id,
        questionText: card.text,
        correctAnswer: card.answer,
        questionType: type,
        explanation: card.explanation,
        userAnswer: '',
        isCorrect: false,
        timeSpent: 0,
      };

      if (type === 'mcq') {
        // Build MCQ options
        const distractors = cards
          .filter((c) => c.id !== card.id)
          .map((c) => c.answer)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        const options = [card.answer, ...distractors].sort(() => Math.random() - 0.5);
        q.options = options;
      } else if (type === 'tf') {
        // For TF, randomly decide if the statement is true or false
        const isTrueStatement = Math.random() > 0.5;
        if (!isTrueStatement) {
          // Make it false by modifying the answer slightly
          q.questionText = card.text;
          q.correctAnswer = 'False';
          q.options = ['True', 'False'];
        } else {
          q.correctAnswer = 'True';
          q.options = ['True', 'False'];
        }
      }
      // written: no options

      return q;
    });

    setQuestions(testQuestions);
    setCurrentIdx(0);
    setPhase('testing');
    setTimer(0);

    // Start timers
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    qTimerRef.current = setInterval(() => setQuestionTimer((t) => t + 1), 1000);
  }, [cards]);

  // Stop timers
  const stopTimers = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (qTimerRef.current) { clearInterval(qTimerRef.current); qTimerRef.current = null; }
  }, []);

  // Submit answer for current question
  const handleSubmitAnswer = useCallback(() => {
    const q = questions[currentIdx];
    if (!q) return;

    let answer = '';
    let correct = false;

    if (q.questionType === 'mcq' && q.options && selectedOption !== null) {
      answer = q.options[selectedOption];
      correct = answer === q.correctAnswer;
    } else if (q.questionType === 'tf' && q.options && selectedOption !== null) {
      answer = q.options[selectedOption];
      correct = answer === q.correctAnswer;
    } else if (q.questionType === 'written') {
      answer = typedAnswer.trim();
      correct = answer.toLowerCase() === q.correctAnswer.toLowerCase()
        || q.correctAnswer.toLowerCase().includes(answer.toLowerCase());
    }

    const updated = [...questions];
    updated[currentIdx] = {
      ...updated[currentIdx],
      userAnswer: answer,
      isCorrect: correct,
      timeSpent: questionTimer,
    };
    setQuestions(updated);

    // Record to API
    fetch('/api/flashcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: q.cardId, quality: correct ? 4 : 1 }),
    }).catch(() => {});

    // Next question or finish
    if (currentIdx + 1 >= questions.length) {
      stopTimers();
      setPhase('results');
    } else {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setTypedAnswer('');
      setQuestionTimer(0);
      // Restart question timer
      if (qTimerRef.current) clearInterval(qTimerRef.current);
      qTimerRef.current = setInterval(() => setQuestionTimer((t) => t + 1), 1000);
    }
  }, [questions, currentIdx, selectedOption, typedAnswer, questionTimer, stopTimers]);

  // Cleanup
  useEffect(() => {
    return () => stopTimers();
  }, [stopTimers]);

  const handleRestart = useCallback(() => {
    setPhase('setup');
    setQuestions([]);
    setCurrentIdx(0);
    setTimer(0);
    setSelectedOption(null);
    setTypedAnswer('');
  }, []);

  /* ─── Setup Phase ─── */
  if (phase === 'setup') {
    return <TestSetup cards={cards} onStart={handleStartTest} onBack={onBack} />;
  }

  /* ─── Results Phase ─── */
  if (phase === 'results') {
    const correctCount = questions.filter((q) => q.isCorrect).length;
    const totalQuestions = questions.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const avgTime = Math.round(questions.reduce((s, q) => s + q.timeSpent, 0) / totalQuestions);

    const gradeLabel = scorePercent >= 90 ? 'Outstanding' : scorePercent >= 75 ? 'Good' : scorePercent >= 60 ? 'Passing' : 'Needs Work';
    const gradeColor = scorePercent >= 90 ? C.green : scorePercent >= 75 ? C.cyan : scorePercent >= 60 ? C.amber : C.danger;

    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6" style={{ background: C.bg }}>
        <div className="max-w-lg mx-auto">
          {/* Score circle */}
          <div className="text-center mb-8">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke={`${C.dimmed}20`} strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={gradeColor} strokeWidth="6"
                  strokeDasharray={`${(scorePercent / 100) * 264} 264`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black" style={{ color: gradeColor }}>{scorePercent}%</span>
                <span className="text-[8px] uppercase tracking-wider" style={{ color: C.muted }}>Score</span>
              </div>
            </div>
            <h2 className="text-lg font-bold mb-1" style={{ color: C.text }}>{gradeLabel}</h2>
            <p className="text-sm" style={{ color: C.muted }}>{correctCount}/{totalQuestions} correct · {formatTime(timer)} total</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <CheckCircle2 className="w-5 h-5 mx-auto mb-2" style={{ color: C.green }} />
              <p className="text-xl font-black" style={{ color: C.green }}>{correctCount}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Correct</p>
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <XCircle className="w-5 h-5 mx-auto mb-2" style={{ color: C.danger }} />
              <p className="text-xl font-black" style={{ color: C.danger }}>{totalQuestions - correctCount}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Incorrect</p>
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <Timer className="w-5 h-5 mx-auto mb-2" style={{ color: C.cyan }} />
              <p className="text-xl font-black" style={{ color: C.cyan }}>{avgTime}s</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Avg/Q</p>
            </div>
          </div>

          {/* Question review */}
          <div className="mb-6">
            <h3 className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: C.text }}>
              <BarChart3 className="w-4 h-4" style={{ color: C.cyan }} />
              Answer Review
            </h3>
            <div className="space-y-2">
              {questions.map((q, idx) => (
                <div key={idx} className="p-3 rounded-xl border" style={{
                  background: q.isCorrect ? `${C.green}04` : `${C.danger}04`,
                  borderColor: q.isCorrect ? `${C.green}15` : `${C.danger}15`,
                }}>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold" style={{
                      background: q.isCorrect ? `${C.green}15` : `${C.danger}15`,
                      color: q.isCorrect ? C.green : C.danger,
                    }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold mb-1 line-clamp-2" style={{ color: C.text }}>
                        {q.questionText.length > 80 ? q.questionText.slice(0, 78) + '...' : q.questionText}
                      </p>
                      {!q.isCorrect && (
                        <div className="mt-1">
                          <p className="text-[10px]" style={{ color: C.danger }}>Your answer: {q.userAnswer || '(none)'}</p>
                          <p className="text-[10px]" style={{ color: C.green }}>Correct: {q.correctAnswer}</p>
                        </div>
                      )}
                      {q.explanation && (
                        <p className="text-[10px] mt-1 line-clamp-2" style={{ color: C.dimmed }}>{q.explanation}</p>
                      )}
                    </div>
                    {q.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: C.green }} />
                    ) : (
                      <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: C.danger }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: `${C.cyan}15`, color: C.cyan, border: `1px solid ${C.cyan}25` }}
            >
              <RotateCcw className="w-4 h-4" /> New Test
            </button>
            <button
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.04)', color: C.muted, border: `1px solid ${C.cardBorder}` }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Testing Phase ─── */
  const currentQ = questions[currentIdx];
  if (!currentQ) return null;

  const canSubmit = currentQ.questionType === 'written'
    ? typedAnswer.trim().length > 0
    : selectedOption !== null;

  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ background: C.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.cardBorder, background: C.card }}>
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-sm font-bold" style={{ color: C.text }}>Practice Test</h2>
            <p className="text-[10px]" style={{ color: C.dimmed }}>
              Question {currentIdx + 1} of {questions.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Question type badge */}
          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{
            background: currentQ.questionType === 'mcq' ? `${C.cyan}12` : currentQ.questionType === 'tf' ? `${C.amber}12` : `${C.purple}12`,
            color: currentQ.questionType === 'mcq' ? C.cyan : currentQ.questionType === 'tf' ? C.amber : C.purple,
          }}>
            {currentQ.questionType === 'mcq' ? 'MCQ' : currentQ.questionType === 'tf' ? 'T/F' : 'Written'}
          </span>
          {/* Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <Timer className="w-3.5 h-3.5" style={{ color: C.cyan }} />
            <span className="text-xs font-mono font-bold" style={{ color: C.cyan }}>{formatTime(timer)}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-2">
        <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300" style={{
            width: `${((currentIdx) / questions.length) * 100}%`,
            background: C.cyan,
          }} />
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: i < currentIdx
                    ? (questions[i]?.isCorrect ? C.green : C.danger)
                    : i === currentIdx ? C.cyan : `${C.dimmed}30`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-lg mx-auto">
          {/* Question */}
          <div className="p-5 rounded-2xl border mb-5" style={{ background: `${C.cyan}04`, borderColor: `${C.cyan}15` }}>
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ background: `${C.cyan}15`, color: C.cyan }}
              >
                {currentIdx + 1}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: C.text }}>{currentQ.questionText}</p>
            </div>
          </div>

          {/* MCQ/TF Options */}
          {(currentQ.questionType === 'mcq' || currentQ.questionType === 'tf') && currentQ.options && (
            <div className="space-y-2 mb-5">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className="w-full text-left p-3.5 rounded-xl border transition-all"
                  style={{
                    background: selectedOption === idx ? `${C.cyan}08` : 'rgba(255,255,255,0.01)',
                    borderColor: selectedOption === idx ? `${C.cyan}30` : C.cardBorder,
                    cursor: 'pointer',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                      style={{
                        background: selectedOption === idx ? `${C.cyan}20` : 'rgba(255,255,255,0.03)',
                        color: selectedOption === idx ? C.cyan : C.muted,
                        border: `1px solid ${selectedOption === idx ? `${C.cyan}40` : 'transparent'}`,
                      }}
                    >
                      {currentQ.questionType === 'tf' ? (idx === 0 ? 'T' : 'F') : String.fromCharCode(65 + idx)}
                    </div>
                    <p className="text-[12px] leading-relaxed flex-1" style={{ color: selectedOption === idx ? C.text : C.muted }}>
                      {option}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Written answer */}
          {currentQ.questionType === 'written' && (
            <div className="mb-5">
              <textarea
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#22d3ee]/40 transition-colors min-h-[100px] resize-y"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.cardBorder, color: C.text }}
                autoFocus
              />
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmitAnswer}
            disabled={!canSubmit}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all"
            style={{
              background: canSubmit ? C.cyan : `${C.dimmed}30`,
              color: canSubmit ? C.bg : C.dimmed,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            {currentIdx + 1 >= questions.length ? 'Finish Test' : 'Next Question'}
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
