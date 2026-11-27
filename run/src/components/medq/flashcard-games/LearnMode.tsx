'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, Brain,
  Sparkles, RotateCcw, TrendingUp, Target, BookOpen,
  Lightbulb, Zap, BarChart3,
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

const MASTERY_LABELS: Record<number, { label: string; color: string }> = {
  0: { label: 'Unseen', color: C.dimmed },
  1: { label: 'New', color: C.danger },
  2: { label: 'Learning', color: C.amber },
  3: { label: 'Reviewing', color: C.cyan },
  4: { label: 'Mastered', color: C.green },
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

interface LearnModeProps {
  cards: FlashcardItem[];
  onBack: () => void;
}

/* ─── Progress Ring SVG ─── */
function ProgressRing({ progress, size = 48, strokeWidth = 4 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={`${C.dimmed}20`} strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={progress >= 80 ? C.green : progress >= 50 ? C.cyan : C.amber}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
}

/* ─── Main LearnMode Component ─── */
export default function LearnMode({ cards, onBack }: LearnModeProps) {
  const store = useFlashcardGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'mcq' | 'typed'>('mcq');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  const currentCard = cards[currentIndex];
  const totalCards = cards.length;

  // Determine phase based on mastery level
  const masteryLevel = currentCard ? (store.mastery[currentCard.id]?.level || 0) : 0;
  const effectivePhase = masteryLevel >= 2 ? 'typed' : 'mcq';

  // Generate MCQ options (shuffle correct + distractors)
  const mcqOptions = useMemo(() => {
    if (!currentCard || effectivePhase !== 'mcq') return [];

    const correctAnswer = currentCard.answer;
    const distractors = cards
      .filter((c) => c.id !== currentCard.id)
      .map((c) => c.answer)
      .slice(0, 3);

    const options = [correctAnswer, ...distractors];
    // Shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [currentCard, cards, effectivePhase]);

  const handleMCQSubmit = useCallback(() => {
    if (selectedOption === null || !currentCard) return;

    const selected = mcqOptions[selectedOption];
    const correct = selected === currentCard.answer;

    setIsCorrect(correct);
    setShowResult(true);
    setSessionStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      total: prev.total + 1,
    }));

    useFlashcardGameStore.getState().updateMastery(currentCard.id, correct);

    // Record to flashcard progress API
    fetch('/api/flashcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: currentCard.id, quality: correct ? 4 : 0 }),
    }).catch(() => {});
  }, [selectedOption, mcqOptions, currentCard]);

  const handleTypedSubmit = useCallback(() => {
    if (!typedAnswer.trim() || !currentCard) return;

    const correct = typedAnswer.trim().toLowerCase() === currentCard.answer.trim().toLowerCase()
      || currentCard.answer.trim().toLowerCase().includes(typedAnswer.trim().toLowerCase());

    setIsCorrect(correct);
    setShowResult(true);
    setSessionStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      total: prev.total + 1,
    }));

    useFlashcardGameStore.getState().updateMastery(currentCard.id, correct);

    fetch('/api/flashcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: currentCard.id, quality: correct ? 5 : 1 }),
    }).catch(() => {});
  }, [typedAnswer, currentCard]);

  const handleNext = useCallback(() => {
    if (currentIndex >= totalCards - 1) {
      setSessionComplete(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setTypedAnswer('');
    setShowResult(false);
  }, [currentIndex, totalCards]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setTypedAnswer('');
    setShowResult(false);
    setSessionComplete(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
    useFlashcardGameStore.getState().resetLearn();
  }, []);

  // Compute mastery stats
  const masteryStats = useMemo(() => {
    const levels = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
    cards.forEach((card) => {
      const level = store.mastery[card.id]?.level || 0;
      levels[level as keyof typeof levels]++;
    });
    return levels;
  }, [cards, store.mastery]);

  const masteredCount = masteryStats[4];
  const masterProgress = totalCards > 0 ? (masteredCount / totalCards) * 100 : 0;
  const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;

  /* ─── Session Complete ─── */
  if (sessionComplete) {
    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6" style={{ background: C.bg }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: `${C.green}10` }}>
            <Brain className="w-10 h-10" style={{ color: C.green }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: C.text }}>Learn Session Complete!</h2>
          <p className="text-sm mb-6" style={{ color: C.muted }}>You reviewed {totalCards} cards</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <Target className="w-5 h-5 mx-auto mb-2" style={{ color: C.green }} />
              <p className="text-xl font-black" style={{ color: C.green }}>{sessionStats.correct}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Correct</p>
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <XCircle className="w-5 h-5 mx-auto mb-2" style={{ color: C.danger }} />
              <p className="text-xl font-black" style={{ color: C.danger }}>{sessionStats.incorrect}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Incorrect</p>
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <BarChart3 className="w-5 h-5 mx-auto mb-2" style={{ color: C.cyan }} />
              <p className="text-xl font-black" style={{ color: C.cyan }}>{accuracy}%</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Accuracy</p>
            </div>
          </div>

          {/* Mastery breakdown */}
          <div className="p-4 rounded-xl border text-left mb-6" style={{ background: C.card, borderColor: C.cardBorder }}>
            <p className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: C.text }}>
              <TrendingUp className="w-4 h-4" style={{ color: C.cyan }} />
              Mastery Breakdown
            </p>
            <div className="space-y-2">
              {[4, 3, 2, 1, 0].map((level) => {
                const info = MASTERY_LABELS[level];
                const count = masteryStats[level as keyof typeof masteryStats];
                if (count === 0) return null;
                return (
                  <div key={level} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: info.color }} />
                      <span className="text-[11px]" style={{ color: C.muted }}>{info.label}</span>
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: info.color }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: `${C.cyan}15`, color: C.cyan, border: `1px solid ${C.cyan}25` }}
            >
              <RotateCcw className="w-4 h-4" /> Learn Again
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

  if (!currentCard) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: C.bg }}>
        <p style={{ color: C.muted }}>No cards available for learning</p>
      </div>
    );
  }

  /* ─── Active Learning View ─── */
  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ background: C.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.cardBorder, background: C.card }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors" style={{ color: C.muted }}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold" style={{ color: C.text }}>Learn Mode</h2>
            <p className="text-[10px]" style={{ color: C.dimmed }}>Adaptive learning</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mastery indicator for current card */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: `${MASTERY_LABELS[masteryLevel].color}08` }}>
            <div className="w-2 h-2 rounded-full" style={{ background: MASTERY_LABELS[masteryLevel].color }} />
            <span className="text-[10px] font-bold" style={{ color: MASTERY_LABELS[masteryLevel].color }}>
              {MASTERY_LABELS[masteryLevel].label}
            </span>
          </div>
          {/* Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <Target className="w-3.5 h-3.5" style={{ color: C.green }} />
            <span className="text-xs font-bold" style={{ color: C.green }}>{sessionStats.correct}/{sessionStats.total}</span>
          </div>
        </div>
      </div>

      {/* Progress bar with mastery ring */}
      <div className="px-4 py-3 border-b" style={{ borderColor: C.cardBorder }}>
        <div className="flex items-center gap-4">
          {/* Mastery progress ring */}
          <div className="relative flex-shrink-0">
            <ProgressRing progress={masterProgress} size={40} strokeWidth={3} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] font-bold" style={{ color: C.green }}>{masteredCount}</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px]" style={{ color: C.muted }}>Card {currentIndex + 1} of {totalCards}</span>
              <span className="text-[10px]" style={{ color: C.muted }}>{masteredCount}/{totalCards} mastered</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{
                width: `${((currentIndex + 1) / totalCards) * 100}%`,
                background: `linear-gradient(90deg, ${C.cyan}, ${C.green})`,
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-lg mx-auto">
          {/* Question card */}
          <div className="p-5 rounded-2xl border mb-5" style={{ background: `${C.cyan}04`, borderColor: `${C.cyan}15` }}>
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.cyan }} />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: C.cyan }}>
                  {effectivePhase === 'mcq' ? 'Multiple Choice' : 'Type Your Answer'}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: C.text }}>{currentCard.text}</p>
              </div>
            </div>
          </div>

          {/* Phase indicator */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-1 rounded-full" style={{ background: effectivePhase === 'mcq' ? C.cyan : `${C.cyan}20` }} />
            <div className="flex-1 h-1 rounded-full" style={{ background: effectivePhase === 'typed' ? C.green : `${C.dimmed}20` }} />
          </div>

          {/* MCQ Phase */}
          {effectivePhase === 'mcq' && !showResult && (
            <div className="space-y-2 mb-5">
              {mcqOptions.map((option, idx) => (
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
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <p className="text-[12px] leading-relaxed flex-1" style={{ color: selectedOption === idx ? C.text : C.muted }}>
                      {option}
                    </p>
                  </div>
                </button>
              ))}
              <button
                onClick={handleMCQSubmit}
                disabled={selectedOption === null}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all mt-3"
                style={{
                  background: selectedOption !== null ? C.cyan : `${C.dimmed}30`,
                  color: selectedOption !== null ? C.bg : C.dimmed,
                  cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                }}
              >
                Check Answer
              </button>
            </div>
          )}

          {/* Typed Phase */}
          {effectivePhase === 'typed' && !showResult && (
            <div className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleTypedSubmit(); }}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-[#22d3ee]/40 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.cardBorder, color: C.text }}
                  autoFocus
                />
              </div>
              <button
                onClick={handleTypedSubmit}
                disabled={!typedAnswer.trim()}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all mt-3"
                style={{
                  background: typedAnswer.trim() ? C.green : `${C.dimmed}30`,
                  color: typedAnswer.trim() ? C.bg : C.dimmed,
                  cursor: typedAnswer.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Result feedback */}
          {showResult && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-4 rounded-xl border mb-4" style={{
                borderColor: `${isCorrect ? C.green : C.danger}30`,
                background: `${isCorrect ? C.green : C.danger}05`,
              }}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5" style={{ color: C.green }} />
                  ) : (
                    <XCircle className="w-5 h-5" style={{ color: C.danger }} />
                  )}
                  <span className="text-sm font-bold" style={{ color: isCorrect ? C.green : C.danger }}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </span>
                </div>
                {!isCorrect && (
                  <div className="p-3 rounded-lg mb-2" style={{ background: `${C.green}08`, border: `1px solid ${C.green}20` }}>
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: C.green }}>Correct Answer</p>
                    <p className="text-sm" style={{ color: C.text }}>{currentCard.answer}</p>
                  </div>
                )}
                {currentCard.explanation && (
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{currentCard.explanation}</p>
                )}
              </div>

              {/* Mastery update */}
              <div className="flex items-center gap-2 mb-4 px-1">
                <Sparkles className="w-3.5 h-3.5" style={{ color: C.purple }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.purple }}>
                  Mastery: {MASTERY_LABELS[useFlashcardGameStore.getState().mastery[currentCard.id]?.level || 0].label}
                </span>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: `${C.cyan}15`, color: C.cyan, border: `1px solid ${C.cyan}25` }}
              >
                {currentIndex >= totalCards - 1 ? 'Finish Session' : 'Continue'}
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
