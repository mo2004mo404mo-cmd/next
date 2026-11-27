'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Flame,
  Brain,
  Sparkles,
  Bookmark,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Keyboard,
  Zap,
  GraduationCap,
  FileText,
  Shuffle,
} from 'lucide-react';
import { MEDICAL_SYSTEMS } from '@/lib/medq-types';
import { toast } from 'sonner';
import { browserIsOffline, isOfflineError } from '@/lib/offline-response';
import OfflineEmptyState from '@/components/medq/OfflineEmptyState';
import { useFlashcardGameStore, GameMode } from '@/components/medq/flashcard-games/store';
import MatchGame from '@/components/medq/flashcard-games/MatchGame';
import LearnMode from '@/components/medq/flashcard-games/LearnMode';
import TestMode from '@/components/medq/flashcard-games/TestMode';

/* ─── Types ─── */

interface FlashcardQuestion {
  id: string;
  type: 'mcq' | 'tf' | 'short';
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  mnemonic: string;
  clinicalPearl: string;
  distractorAnalysis: string;
  difficulty: 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert';
  system: string;
  topic: string;
  tags: string[];
  isAIGenerated: boolean;
  flashcardProgress: {
    id: string;
    questionId: string;
    interval: number;
    repetition: number;
    efactor: number;
    nextReview: string;
    lastReview: string;
  } | null;
}

interface SessionStats {
  studied: number;
  correct: number;
  incorrect: number;
  startTime: number;
}

type FlashcardMode = 'due' | 'new' | 'all' | 'random';

/* ─── Helpers ─── */

function stripHtml(html: string): string {
  if (!html) return '';
  // Replace common HTML entities first
  const decoded = html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]*>/g, '')
    .trim();
  return decoded;
}

function formatInterval(interval: number): string {
  if (interval <= 0) return 'Now';
  if (interval === 1) return '1 day';
  if (interval < 7) return `${interval} days`;
  if (interval < 30) return `${Math.round(interval / 7)} week${Math.round(interval / 7) > 1 ? 's' : ''}`;
  return `${Math.round(interval / 30)} month${Math.round(interval / 30) > 1 ? 's' : ''}`;
}

const MODE_OPTIONS: { value: FlashcardMode; label: string; icon: React.ReactNode }[] = [
  { value: 'due', label: 'Due for Review', icon: <Flame className="w-3.5 h-3.5" /> },
  { value: 'new', label: 'New Cards', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { value: 'all', label: 'All Cards', icon: <Bookmark className="w-3.5 h-3.5" /> },
  { value: 'random', label: 'Random', icon: <RefreshCw className="w-3.5 h-3.5" /> },
];

const GAME_MODE_OPTIONS: { value: GameMode; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
  { value: 'classic', label: 'Classic', icon: <Brain className="w-4 h-4" />, desc: 'Spaced repetition', color: '#00e5a0' },
  { value: 'match', label: 'Match', icon: <Shuffle className="w-4 h-4" />, desc: 'Match terms & definitions', color: '#22d3ee' },
  { value: 'learn', label: 'Learn', icon: <GraduationCap className="w-4 h-4" />, desc: 'Adaptive learning', color: '#8b5cf6' },
  { value: 'test', label: 'Test', icon: <FileText className="w-4 h-4" />, desc: 'Practice test', color: '#ffb347' },
];

const RATING_OPTIONS = [
  { quality: 0, label: 'Again', emoji: '😕', color: 'bg-[#ff5757]/15 border-[#ff5757]/30 text-[#ff5757] hover:bg-[#ff5757]/25', key: '1' },
  { quality: 3, label: 'Hard', emoji: '🤔', color: 'bg-[#f59e0b]/15 border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/25', key: '2' },
  { quality: 4, label: 'Good', emoji: '🙂', color: 'bg-[#00e5a0]/15 border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/25', key: '3' },
  { quality: 5, label: 'Easy', emoji: '😎', color: 'bg-[#8b5cf6]/15 border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/25', key: '4' },
];

/* ─── Component ─── */

export default function FlashcardTab() {
  // Game mode state
  const gameStore = useFlashcardGameStore();
  const gameMode = gameStore.mode;

  // Card data state
  const [questions, setQuestions] = useState<FlashcardQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offlineEmpty, setOfflineEmpty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Controls state
  const [mode, setMode] = useState<FlashcardMode>('due');
  const [systemFilter, setSystemFilter] = useState('all');

  // Flip state
  const [isFlipped, setIsFlipped] = useState(false);

  // Slide animation
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Session tracking
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    studied: 0,
    correct: 0,
    incorrect: 0,
    startTime: Date.now(),
  });
  const [sessionComplete, setSessionComplete] = useState(false);

  // Keyboard shortcut help
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Ref for session recording on unmount
  const sessionStatsRef = useRef(sessionStats);
  const hasRecordedRef = useRef(false);

  // Keep ref in sync
  useEffect(() => {
    sessionStatsRef.current = sessionStats;
  }, [sessionStats]);

  // Record StudySession on unmount
  useEffect(() => {
    return () => {
      if (hasRecordedRef.current) return;
      const stats = sessionStatsRef.current;
      if (stats.studied > 0) {
        hasRecordedRef.current = true;
        const timeSpent = Math.round((Date.now() - stats.startTime) / 1000);
        fetch('/api/study-sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'flashcard',
            questionsStudied: stats.studied,
            correctAnswers: stats.correct,
            totalTimeSpent: timeSpent,
          }),
        }).catch(() => {
          // Silent fail on unmount
        });
      }
    };
  }, []);

  /* ─── Fetch flashcards ─── */
  const fetchFlashcards = useCallback(async (fetchMode: FlashcardMode, fetchSystem: string) => {
    setLoading(true);
    setOfflineEmpty(false);
    setIsFlipped(false);
    setCurrentIndex(0);
    setSessionComplete(false);
    setSessionStats({ studied: 0, correct: 0, incorrect: 0, startTime: Date.now() });

    try {
      const params = new URLSearchParams({
        mode: fetchMode,
        limit: '20',
      });
      if (fetchSystem && fetchSystem !== 'all') {
        params.set('system', fetchSystem);
      }

      const res = await fetch(`/api/flashcard?${params.toString()}`);
      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        if (isOfflineError(res, errBody)) {
          setOfflineEmpty(true);
          setQuestions([]);
          return;
        }
        throw new Error('Failed to fetch flashcards');
      }
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Fetch flashcards error:', err);
      if (browserIsOffline()) {
        setOfflineEmpty(true);
      } else {
        toast.error('Failed to load flashcards');
      }
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and mode/filter changes
  useEffect(() => {
    fetchFlashcards(mode, systemFilter);
  }, [mode, systemFilter, fetchFlashcards]);

  /* ─── Current card ─── */
  const currentCard = questions[currentIndex] as FlashcardQuestion | undefined;
  const totalCards = questions.length;

  /* ─── Flip handler ─── */
  const handleFlip = useCallback(() => {
    if (!currentCard || isAnimating) return;
    setIsFlipped((prev) => !prev);
  }, [currentCard, isAnimating]);

  /* ─── Rating handler ─── */
  const handleRate = useCallback(async (quality: number) => {
    if (!currentCard || submitting || isAnimating) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentCard.id,
          quality,
        }),
      });

      if (!res.ok) throw new Error('Failed to record review');

      const data = await res.json();

      // Update session stats
      const isCorrect = quality >= 3;
      setSessionStats((prev) => ({
        ...prev,
        studied: prev.studied + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      // Show XP toast
      if (data.xpEarned) {
        toast.success(`+${data.xpEarned} XP`, { duration: 1500 });
      }

      // Auto-advance to next card
      if (currentIndex < totalCards - 1) {
        setSlideDirection('left');
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setIsFlipped(false);
          setSlideDirection(null);
          setTimeout(() => setIsAnimating(false), 300);
        }, 250);
      } else {
        // Session complete
        setSessionComplete(true);
        // Record session
        if (!hasRecordedRef.current) {
          hasRecordedRef.current = true;
          const timeSpent = Math.round((Date.now() - sessionStatsRef.current.startTime) / 1000);
          fetch('/api/study-sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'flashcard',
              questionsStudied: sessionStatsRef.current.studied + 1,
              correctAnswers: sessionStatsRef.current.correct + (isCorrect ? 1 : 0),
              totalTimeSpent: timeSpent,
            }),
          }).catch(() => {});
        }
      }
    } catch (err) {
      console.error('Rate error:', err);
      toast.error('Failed to save review');
    } finally {
      setSubmitting(false);
    }
  }, [currentCard, submitting, isAnimating, currentIndex, totalCards]);

  /* ─── Navigation ─── */
  const goNext = useCallback(() => {
    if (currentIndex < totalCards - 1 && !isAnimating) {
      setSlideDirection('left');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
        setSlideDirection(null);
        setTimeout(() => setIsAnimating(false), 300);
      }, 250);
    }
  }, [currentIndex, totalCards, isAnimating]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setSlideDirection('right');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsFlipped(false);
        setSlideDirection(null);
        setTimeout(() => setIsAnimating(false), 300);
      }, 250);
    }
  }, [currentIndex, isAnimating]);

  /* ─── Keyboard shortcuts ─── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          handleFlip();
          break;
        case '1':
          if (isFlipped) handleRate(0);
          break;
        case '2':
          if (isFlipped) handleRate(3);
          break;
        case '3':
          if (isFlipped) handleRate(4);
          break;
        case '4':
          if (isFlipped) handleRate(5);
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleRate, goNext, goPrev, isFlipped]);

  /* ─── Restart session ─── */
  const handleRestart = useCallback(() => {
    fetchFlashcards(mode, systemFilter);
  }, [mode, systemFilter, fetchFlashcards]);

  /* ─── Back to classic mode from game modes ─── */
  const handleBackToClassic = useCallback(() => {
    useFlashcardGameStore.getState().setMode('classic');
  }, []);

  /* ─── Computed values ─── */
  const accuracy = sessionStats.studied > 0
    ? Math.round((sessionStats.correct / sessionStats.studied) * 100)
    : 0;

  const progressPercent = totalCards > 0
    ? ((currentIndex + (sessionComplete ? 1 : 0)) / totalCards) * 100
    : 0;

  /* ─── Game Mode Rendering ─── */
  // Match Game mode
  if (gameMode === 'match') {
    if (questions.length === 0) {
      return (
        <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-[#22d3ee]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#e8ecf4]">Match Game</h2>
              <p className="text-xs text-[#5a6478]">Load some flashcards first to play</p>
            </div>
          </div>
          <p className="text-sm text-[#5a6478] text-center py-8">No cards available. Switch to Classic mode and load cards first.</p>
          <div className="text-center">
            <button onClick={handleBackToClassic} className="px-4 py-2 rounded-xl text-sm font-bold bg-[#22d3ee]/15 border border-[#22d3ee]/30 text-[#22d3ee] hover:bg-[#22d3ee]/25">
              Go to Classic Mode
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0">
        <MatchGame
          cards={questions.map((q) => ({ id: q.id, text: q.text, answer: q.answer }))}
          onBack={handleBackToClassic}
        />
      </div>
    );
  }

  // Learn Mode
  if (gameMode === 'learn') {
    if (questions.length === 0) {
      return (
        <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#e8ecf4]">Learn Mode</h2>
              <p className="text-xs text-[#5a6478]">Load some flashcards first to learn</p>
            </div>
          </div>
          <p className="text-sm text-[#5a6478] text-center py-8">No cards available. Switch to Classic mode and load cards first.</p>
          <div className="text-center">
            <button onClick={handleBackToClassic} className="px-4 py-2 rounded-xl text-sm font-bold bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/25">
              Go to Classic Mode
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0">
        <LearnMode
          cards={questions.map((q) => ({
            id: q.id,
            text: q.text,
            answer: q.answer,
            options: q.options,
            explanation: q.explanation,
            type: q.type,
            difficulty: q.difficulty,
          }))}
          onBack={handleBackToClassic}
        />
      </div>
    );
  }

  // Test Mode
  if (gameMode === 'test') {
    if (questions.length === 0) {
      return (
        <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#ffb347]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#ffb347]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#e8ecf4]">Practice Test</h2>
              <p className="text-xs text-[#5a6478]">Load some flashcards first to test</p>
            </div>
          </div>
          <p className="text-sm text-[#5a6478] text-center py-8">No cards available. Switch to Classic mode and load cards first.</p>
          <div className="text-center">
            <button onClick={handleBackToClassic} className="px-4 py-2 rounded-xl text-sm font-bold bg-[#ffb347]/15 border border-[#ffb347]/30 text-[#ffb347] hover:bg-[#ffb347]/25">
              Go to Classic Mode
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0">
        <TestMode
          cards={questions.map((q) => ({
            id: q.id,
            text: q.text,
            answer: q.answer,
            options: q.options,
            explanation: q.explanation,
            type: q.type,
            difficulty: q.difficulty,
          }))}
          onBack={handleBackToClassic}
        />
      </div>
    );
  }

  /* ─── Render: Loading skeleton ─── */
  if (loading) {
    return (
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] animate-pulse" />
          <div className="flex-1">
            <div className="h-5 w-32 rounded bg-white/[0.03] animate-pulse mb-2" />
            <div className="h-3 w-20 rounded bg-white/[0.03] animate-pulse" />
          </div>
        </div>
        {/* Card skeleton */}
        <div className="max-w-lg mx-auto">
          <div className="min-h-80 rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.06]" />
        </div>
      </div>
    );
  }

  /* ─── Render: Offline empty state (no cached flashcards) ─── */
  if (offlineEmpty && questions.length === 0) {
    return (
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-[#00e5a0]" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#e8ecf4]">Flashcards</h2>
            <p className="text-xs text-[#5a6478]">Spaced repetition study</p>
          </div>
        </div>
        <OfflineEmptyState
          label="flashcards"
          onRetry={() => fetchFlashcards(mode, systemFilter)}
          hint="Flashcards haven't been cached yet. Open this tab while online once to make your deck available offline."
        />
      </div>
    );
  }

  /* ─── Render: Session complete summary ─── */
  if (sessionComplete) {
    return (
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-[#00e5a0]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#e8ecf4]">Flashcards</h2>
            <p className="text-xs text-[#5a6478]">Spaced repetition study</p>
          </div>
        </div>

        {/* Game Mode Switcher */}
        <div className="flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          {GAME_MODE_OPTIONS.map((opt) => {
            const isActive = gameMode === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => useFlashcardGameStore.getState().setMode(opt.value)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all"
                style={{
                  background: isActive ? `${opt.color}12` : 'transparent',
                  color: isActive ? opt.color : '#5a6478',
                }}
              >
                {opt.icon}
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Session Summary */}
        <div className="max-w-lg mx-auto text-center py-8">
          <div className="w-20 h-20 rounded-2xl bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#00e5a0]" />
          </div>
          <h3 className="text-2xl font-bold text-[#e8ecf4] mb-2">Session Complete!</h3>
          <p className="text-sm text-[#5a6478] mb-8">Great work reviewing your flashcards</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4">
              <p className="text-2xl font-bold text-[#00e5a0]">{sessionStats.studied}</p>
              <p className="text-xs text-[#5a6478] mt-1">Studied</p>
            </div>
            <div className="bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4">
              <p className="text-2xl font-bold text-[#00e5a0]">{sessionStats.correct}</p>
              <p className="text-xs text-[#5a6478] mt-1">Correct</p>
            </div>
            <div className="bg-[#1a1e2b] border border-white/[0.06] rounded-xl p-4">
              <p className="text-2xl font-bold text-[#00e5a0]">{accuracy}%</p>
              <p className="text-xs text-[#5a6478] mt-1">Accuracy</p>
            </div>
          </div>

          <Button
            onClick={handleRestart}
            className="bg-[#00e5a0]/15 border border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/25 transition-all px-8 py-3 text-sm font-bold"
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Study Again
          </Button>
        </div>
      </div>
    );
  }

  /* ─── Render: Empty state ─── */
  if (totalCards === 0) {
    return (
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
        {/* Header + Controls */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-[#00e5a0]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#e8ecf4]">Flashcards</h2>
            <p className="text-xs text-[#5a6478]">Spaced repetition study</p>
          </div>
        </div>

        {/* Game Mode Switcher */}
        <div className="flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          {GAME_MODE_OPTIONS.map((opt) => {
            const isActive = gameMode === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => useFlashcardGameStore.getState().setMode(opt.value)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all"
                style={{
                  background: isActive ? `${opt.color}12` : 'transparent',
                  color: isActive ? opt.color : '#5a6478',
                }}
              >
                {opt.icon}
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mode & Filter Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Select value={mode} onValueChange={(v) => setMode(v as FlashcardMode)}>
            <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[170px] hover:border-white/[0.15] transition-colors text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
              {MODE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                  <span className="flex items-center gap-2">{opt.icon} {opt.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={systemFilter} onValueChange={setSystemFilter}>
            <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs">
              <SelectValue placeholder="System" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
              <SelectItem value="all" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">All Systems</SelectItem>
              {MEDICAL_SYSTEMS.map((s) => (
                <SelectItem key={s} value={s} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Empty state */}
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-7 h-7 text-[#3a4055]" />
          </div>
          {mode === 'due' ? (
            <>
              <p className="text-[#8b95a8] text-sm font-medium mb-1">No cards due for review</p>
              <p className="text-[#3a4055] text-xs">Great job! Come back later when cards are scheduled for review.</p>
            </>
          ) : mode === 'new' ? (
            <>
              <p className="text-[#8b95a8] text-sm font-medium mb-1">No new cards available</p>
              <p className="text-[#3a4055] text-xs">Generate some questions first, then come back to study them as flashcards.</p>
            </>
          ) : (
            <>
              <p className="text-[#8b95a8] text-sm font-medium mb-1">No flashcards available</p>
              <p className="text-[#3a4055] text-xs">Generate some questions first to start studying with flashcards.</p>
            </>
          )}
          <div className="flex gap-3 justify-center mt-6">
            {mode !== 'all' && (
              <Button
                onClick={() => setMode('all')}
                variant="outline"
                className="bg-[#1a1e2b] border-white/[0.1] text-[#e8ecf4] hover:bg-white/[0.06] hover:border-white/[0.2] text-xs"
              >
                Try All Cards
              </Button>
            )}
            {mode !== 'random' && (
              <Button
                onClick={() => setMode('random')}
                variant="outline"
                className="bg-[#00e5a0]/10 border-[#00e5a0]/25 text-[#00e5a0] hover:bg-[#00e5a0]/20 text-xs"
              >
                Try Random
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main Render ─── */
  return (
    <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center">
          <Brain className="w-5 h-5 text-[#00e5a0]" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#e8ecf4]">Flashcards</h2>
          <p className="text-xs text-[#5a6478]">Spaced repetition study</p>
        </div>
        <button
          type="button"
          onClick={() => setShowShortcuts(!showShortcuts)}
          className="p-2 rounded-lg text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-all"
          title="Keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>
      </div>

      {/* ── Game Mode Switcher ── */}
      <div className="flex gap-1.5 mb-5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]">
        {GAME_MODE_OPTIONS.map((opt) => {
          const isActive = gameMode === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => useFlashcardGameStore.getState().setMode(opt.value)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all"
              style={{
                background: isActive ? `${opt.color}12` : 'transparent',
                color: isActive ? opt.color : '#5a6478',
                boxShadow: isActive ? `0 0 12px ${opt.color}08` : 'none',
              }}
            >
              {opt.icon}
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Keyboard shortcuts popover ── */}
      {showShortcuts && (
        <div className="mb-4 p-3 rounded-xl bg-[#1a1e2b] border border-white/[0.08] text-xs text-[#8b95a8]">
          <p className="font-semibold text-[#e8ecf4] mb-2">Keyboard Shortcuts</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono">Space</kbd> Flip card</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono">←</kbd> Previous</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono">1</kbd> Again (😕)</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono">→</kbd> Next</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono">2</kbd> Hard (🤔)</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono">3</kbd> Good (🙂)</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#e8ecf4] font-mono">4</kbd> Easy (😎)</span>
          </div>
        </div>
      )}

      {/* ── Controls Row ── */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Mode selector */}
        <Select value={mode} onValueChange={(v) => setMode(v as FlashcardMode)}>
          <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[170px] hover:border-white/[0.15] transition-colors text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
            {MODE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                <span className="flex items-center gap-2">{opt.icon} {opt.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* System filter */}
        <Select value={systemFilter} onValueChange={setSystemFilter}>
          <SelectTrigger className="bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4] w-[160px] hover:border-white/[0.15] transition-colors text-xs">
            <SelectValue placeholder="System" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1e2b] border-white/[0.08]">
            <SelectItem value="all" className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">All Systems</SelectItem>
            {MEDICAL_SYSTEMS.map((s) => (
              <SelectItem key={s} value={s} className="text-[#e8ecf4] text-xs focus:bg-white/[0.06]">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Refresh button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRestart}
          className="text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 text-xs h-8"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          Refresh
        </Button>
      </div>

      {/* ── Progress Bar ── */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-[#5a6478]">
            Card {currentIndex + 1} of {totalCards}
          </span>
          <span className="text-xs text-[#5a6478]">
            {Math.round(progressPercent)}% complete
          </span>
        </div>
        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00e5a0] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Flashcard ── */}
      <div className="max-w-lg mx-auto">
        <div
          className="relative cursor-pointer"
          style={{ perspective: '1200px' }}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? 'Click to show question' : 'Click to reveal answer'}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleFlip();
          }}
        >
          {/* Slide animation wrapper */}
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: slideDirection === 'left'
                ? 'translateX(-30px)'
                : slideDirection === 'right'
                  ? 'translateX(30px)'
                  : 'translateX(0)',
              opacity: slideDirection ? 0 : 1,
            }}
          >
            {/* Flip card container */}
            <div
              className="relative w-full transition-transform duration-500 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ── FRONT SIDE (Question) ── */}
              <div
                className="w-full min-h-80 rounded-2xl border border-white/[0.06] p-6 sm:p-8 flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  boxShadow: '0 0 40px rgba(0,229,160,0.06), 0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Top badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {currentCard && (
                    <>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-semibold border-0 px-2 py-0.5 ${
                          currentCard.type === 'mcq'
                            ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                            : currentCard.type === 'tf'
                              ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                              : 'bg-[#8b5cf6]/10 text-[#8b5cf6]'
                        }`}
                      >
                        {currentCard.type === 'mcq' ? 'MCQ' : currentCard.type === 'tf' ? 'TF' : 'Short'}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-semibold border-0 px-2 py-0.5 ${
                          currentCard.difficulty === 'Easy'
                            ? 'bg-[#22c55e]/10 text-[#22c55e]'
                            : currentCard.difficulty === 'Basic'
                              ? 'bg-[#4ade80]/10 text-[#4ade80]'
                              : currentCard.difficulty === 'Moderate'
                                ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                                : currentCard.difficulty === 'Hard'
                                  ? 'bg-[#f97316]/10 text-[#f97316]'
                                  : 'bg-[#ef4444]/10 text-[#ef4444]'
                        }`}
                      >
                        {currentCard.difficulty}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-semibold bg-white/[0.05] text-[#8b92a8] border-0 px-2 py-0.5"
                      >
                        {currentCard.system}
                      </Badge>
                      {currentCard.flashcardProgress && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-semibold bg-[#00e5a0]/10 text-[#00e5a0] border-0 px-2 py-0.5"
                        >
                          Review in {formatInterval(currentCard.flashcardProgress.interval)}
                        </Badge>
                      )}
                    </>
                  )}
                </div>

                {/* Question text */}
                <div className="flex-1 flex items-center">
                  <div className="w-full">
                    <p className="text-xs text-[#5a6478] uppercase tracking-wider font-semibold mb-3">
                      Question
                    </p>
                    <p className="text-[15px] sm:text-base leading-relaxed text-[#e8ecf4]">
                      {currentCard ? stripHtml(currentCard.text) : ''}
                    </p>

                    {/* MCQ options preview */}
                    {currentCard && currentCard.type === 'mcq' && currentCard.options && (
                      <div className="mt-4 space-y-2">
                        {currentCard.options.map((opt, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-sm text-[#8b95a8]"
                          >
                            <span className="text-[10px] font-bold text-[#3a4055] mt-0.5 w-5 text-center flex-shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span>{stripHtml(opt)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Flip hint */}
                <div className="mt-4 pt-4 border-t border-white/[0.06] text-center">
                  <p className="text-xs text-[#3a4055]">
                    Tap to reveal answer · <kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-[#5a6478] font-mono text-[10px]">Space</kbd>
                  </p>
                </div>
              </div>

              {/* ── BACK SIDE (Answer) ── */}
              <div
                className="absolute inset-0 w-full min-h-80 rounded-2xl border border-white/[0.06] p-6 sm:p-8 flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'rgba(255,255,255,0.03)',
                  boxShadow: '0 0 40px rgba(0,229,160,0.08), 0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {currentCard && (
                  <>
                    {/* Answer */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00e5a0]" />
                        <p className="text-xs text-[#00e5a0] uppercase tracking-wider font-semibold">
                          Answer
                        </p>
                      </div>
                      <div className="bg-[#00e5a0]/10 border border-[#00e5a0]/20 rounded-xl px-4 py-3">
                        <p className="text-sm sm:text-base text-[#e8ecf4] font-medium">
                          {stripHtml(currentCard.answer)}
                        </p>
                      </div>
                    </div>

                    {/* Explanation */}
                    {currentCard.explanation && (
                      <div className="mb-3">
                        <p className="text-xs text-[#5a6478] uppercase tracking-wider font-semibold mb-1.5">
                          Explanation
                        </p>
                        <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed">
                          {stripHtml(currentCard.explanation)}
                        </p>
                      </div>
                    )}

                    {/* Mnemonic */}
                    {currentCard.mnemonic && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Sparkles className="w-3 h-3 text-[#8b5cf6]" />
                          <p className="text-xs text-[#8b5cf6] uppercase tracking-wider font-semibold">
                            Mnemonic
                          </p>
                        </div>
                        <div className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-lg px-3 py-2">
                          <p className="text-xs sm:text-sm text-[#c4b5fd] leading-relaxed">
                            {stripHtml(currentCard.mnemonic)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Clinical Pearl */}
                    {currentCard.clinicalPearl && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Bookmark className="w-3 h-3 text-[#f59e0b]" />
                          <p className="text-xs text-[#f59e0b] uppercase tracking-wider font-semibold">
                            Clinical Pearl
                          </p>
                        </div>
                        <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg px-3 py-2">
                          <p className="text-xs sm:text-sm text-[#fcd34d] leading-relaxed">
                            {stripHtml(currentCard.clinicalPearl)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Next review info */}
                    {currentCard.flashcardProgress && (
                      <div className="mt-auto pt-3 border-t border-white/[0.06]">
                        <p className="text-[10px] text-[#3a4055]">
                          Last reviewed: {new Date(currentCard.flashcardProgress.lastReview).toLocaleDateString()} ·
                          Interval: {formatInterval(currentCard.flashcardProgress.interval)} ·
                          Repetition: {currentCard.flashcardProgress.repetition}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Rating Buttons ── */}
        {isFlipped && (
          <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs text-[#5a6478] text-center mb-3">
              How well did you know this? Rate your recall:
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {RATING_OPTIONS.map((rating) => (
                <button
                  key={rating.quality}
                  type="button"
                  onClick={() => handleRate(rating.quality)}
                  disabled={submitting}
                  className={`
                    flex flex-col items-center gap-1.5 py-3 sm:py-4 px-2 rounded-xl
                    border text-sm font-bold transition-all
                    ${rating.color}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    min-h-[60px]
                  `}
                >
                  <span className="text-lg sm:text-xl">{rating.emoji}</span>
                  <span className="text-xs sm:text-sm">{rating.label}</span>
                  <span className="text-[10px] opacity-60">
                    <kbd className="px-1 py-0.5 rounded bg-white/[0.06] font-mono">{rating.key}</kbd>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Navigation Buttons ── */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrev}
            disabled={currentIndex <= 0 || isAnimating}
            className="text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] text-xs disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(totalCards, 10) }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (!isAnimating) {
                    setSlideDirection(i > currentIndex ? 'left' : 'right');
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentIndex(i);
                      setIsFlipped(false);
                      setSlideDirection(null);
                      setTimeout(() => setIsAnimating(false), 300);
                    }, 250);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-[#00e5a0] w-4'
                    : i < currentIndex
                      ? 'bg-[#00e5a0]/40'
                      : 'bg-white/[0.1]'
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
            {totalCards > 10 && (
              <span className="text-[10px] text-[#3a4055] ml-1">+{totalCards - 10}</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={goNext}
            disabled={currentIndex >= totalCards - 1 || isAnimating}
            className="text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] text-xs disabled:opacity-30"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* ── Session Stats ── */}
      <div className="mt-6 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="text-xs text-[#8b95a8]">
                <span className="font-bold text-[#e8ecf4]">{sessionStats.studied}</span> studied
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5a0]" />
              <span className="text-xs text-[#8b95a8]">
                <span className="font-bold text-[#00e5a0]">{sessionStats.correct}</span> correct
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-[#ff5757]" />
              <span className="text-xs text-[#8b95a8]">
                <span className="font-bold text-[#ff5757]">{sessionStats.incorrect}</span> missed
              </span>
            </div>
          </div>
          <div className="text-xs text-[#5a6478]">
            Accuracy: <span className={`font-bold ${accuracy >= 70 ? 'text-[#00e5a0]' : accuracy >= 40 ? 'text-[#f59e0b]' : 'text-[#ff5757]'}`}>{accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
