'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles, ChevronLeft, ChevronRight, Flame, Calendar,
  CheckCircle2, XCircle, RotateCcw, BookOpen, Brain,
  Target, Clock, Lightbulb, GraduationCap, Star,
  ArrowRight, Layers, Zap, ChevronDown, ChevronRight as ChevronRightIcon,
  AlertCircle, Stethoscope, CreditCard, FileQuestion,
  Settings2, Bell, Trophy,
} from 'lucide-react';
import { useMicroLessonStore } from './micro-lessons/store';
import type { MicroLesson, SelfTest, NotificationTime } from './micro-lessons/store';
import { DIFFICULTY_COLORS } from '@/lib/medq-types';

// ─── Color Constants ─────────────────────────────────────────────────────────

const C = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, #151821)',
  cardGlass: 'var(--medq-w-alpha-03, rgba(255,255,255,0.03))',
  input: 'var(--medq-surface, #1a1e2b)',
  green: 'var(--medq-accent-green, #00e5a0)',
  greenDark: 'var(--medq-accent-green, #00b87a)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  orange: 'var(--medq-accent-amber, #f59e0b)',
  orangeAccent: 'var(--medq-accent-amber, #ff6b35)',
  purple: 'var(--medq-accent-purple, #8b5cf6)',
  cyan: 'var(--medq-accent-cyan, #4fc3f7)',
  teal: 'var(--medq-accent-cyan, #22d3ee)',
  blue: '#3b82f6',
  pink: '#ec4899',
  yellow: 'var(--medq-accent-amber, #ffb347)',
  lightGreen: 'var(--medq-accent-green, #4ade80)',
  text: 'var(--medq-text, #e8ecf4)',
  textSec: 'var(--medq-muted-2, #8b95a8)',
  textMuted: 'var(--medq-muted, #5a6478)',
  textDim: 'var(--medq-dimmed, #3a4055)',
  border: 'var(--medq-card-border, rgba(255,255,255,0.06))',
};

const SYSTEM_GRADIENTS: Record<string, { from: string; to: string }> = {
  Cardiovascular: { from: '#ff5757', to: '#f97316' },
  Respiratory: { from: '#3b82f6', to: '#22d3ee' },
  Neurological: { from: '#8b5cf6', to: '#ec4899' },
  Gastrointestinal: { from: '#f59e0b', to: '#ff6b35' },
  Renal: { from: '#22d3ee', to: '#4fc3f7' },
  Endocrine: { from: '#00e5a0', to: '#4ade80' },
  Hematologic: { from: '#ef4444', to: '#ff5757' },
  Musculoskeletal: { from: '#f97316', to: '#ffb347' },
  default: { from: '#8b5cf6', to: '#4fc3f7' },
};

// ─── MicroLessonCard with Flip Animation ─────────────────────────────────────

function MicroLessonCard({
  lesson,
  onComplete,
  onEngage,
  isActive,
}: {
  lesson: MicroLesson;
  onComplete: (id: string) => void;
  onEngage: (action: string) => void;
  isActive: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const gradient = SYSTEM_GRADIENTS[lesson.system] || SYSTEM_GRADIENTS.default;

  const handleFlip = () => {
    if (!flipped) onEngage('flip');
    setFlipped(!flipped);
  };

  const handleAnswer = (option: string) => {
    if (answered) return;
    setSelectedAnswer(option);
    setAnswered(true);
    const correct = option === lesson.selfTest.answer;
    onComplete(lesson.id);
    onEngage('self_test_answer');
  };

  const diffColor = DIFFICULTY_COLORS[lesson.difficulty as keyof typeof DIFFICULTY_COLORS] ?? C.yellow;

  return (
    <div style={{
      width: '100%',
      perspective: '1200px',
      minHeight: 420,
    }}>
      <style>{`
        @keyframes mlCardIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ml-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .ml-flip-inner.flipped {
          transform: rotateY(180deg);
        }
        .ml-flip-front, .ml-flip-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .ml-flip-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div
        className="ml-flip-inner"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'none',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front: Fact Card */}
        <div
          className="ml-flip-front"
          style={{
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            background: C.card,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* System gradient bar */}
          <div style={{
            height: 4,
            background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
          }} />

          <div style={{ padding: 20 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  fontSize: 10,
                  padding: '2px 8px',
                  borderRadius: 8,
                  background: `${gradient.from}15`,
                  color: gradient.from,
                  fontWeight: 600,
                }}>
                  {lesson.system}
                </span>
                <span style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 6,
                  background: `${diffColor}15`,
                  color: diffColor,
                  fontWeight: 600,
                }}>
                  {lesson.difficulty}/5
                </span>
              </div>
              {lesson.completed && (
                <CheckCircle2 size={16} style={{ color: C.green }} />
              )}
            </div>

            {/* Fact */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Lightbulb size={14} style={{ color: C.yellow }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.yellow, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Fact</span>
              </div>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.6, margin: 0 }}>
                {lesson.fact}
              </p>
            </div>

            {/* Clinical Relevance */}
            <div style={{
              padding: 12,
              borderRadius: 10,
              background: `${C.green}06`,
              border: `1px solid ${C.green}12`,
              marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Stethoscope size={12} style={{ color: C.green }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: C.green }}>Clinical Relevance</span>
              </div>
              <p style={{ fontSize: 12, color: C.textSec, margin: 0, lineHeight: 1.5 }}>
                {lesson.clinicalRelevance}
              </p>
            </div>

            {/* Flip button */}
            <button
              onClick={handleFlip}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 10,
                border: `1px solid ${C.purple}25`,
                background: `${C.purple}08`,
                color: C.purple,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
            >
              <Target size={14} />
              Test Yourself — Flip to Answer
            </button>
          </div>
        </div>

        {/* Back: Self-Test Card */}
        <div
          className="ml-flip-back"
          style={{
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            background: C.card,
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div style={{ height: 4, background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})` }} />
          <div style={{ padding: 20 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <Brain size={14} style={{ color: C.purple }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.purple }}>Self-Test</span>
              <button onClick={handleFlip} style={{
                marginLeft: 'auto',
                padding: '2px 8px',
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                background: 'transparent',
                color: C.textMuted,
                fontSize: 10,
                cursor: 'pointer',
              }}>
                ← Back
              </button>
            </div>

            {/* Question */}
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 14 }}>
              {lesson.selfTest.question}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              {lesson.selfTest.options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = answered && opt === lesson.selfTest.answer;
                const isWrong = answered && isSelected && opt !== lesson.selfTest.answer;

                let bg = C.input;
                let border = C.border;
                let color = C.text;

                if (isCorrect) { bg = 'rgba(0,229,160,0.08)'; border = 'rgba(0,229,160,0.25)'; color = C.green; }
                else if (isWrong) { bg = 'rgba(255,87,87,0.08)'; border = 'rgba(255,87,87,0.25)'; color = C.danger; }
                else if (!answered) { bg = C.input; border = C.border; color = C.text; }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    disabled={answered}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: `1px solid ${border}`,
                      background: bg,
                      color,
                      fontSize: 12,
                      cursor: answered ? 'default' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      width: '100%',
                    }}
                  >
                    <span style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: isCorrect ? `${C.green}15` : isWrong ? `${C.danger}15` : `${C.textDim}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      flexShrink: 0,
                      color: isCorrect ? C.green : isWrong ? C.danger : C.textMuted,
                    }}>
                      {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && lesson.selfTest.explanation && (
              <div style={{
                padding: 10,
                borderRadius: 8,
                background: selectedAnswer === lesson.selfTest.answer
                  ? 'rgba(0,229,160,0.06)'
                  : 'rgba(255,87,87,0.06)',
                border: `1px solid ${selectedAnswer === lesson.selfTest.answer ? 'rgba(0,229,160,0.15)' : 'rgba(255,87,87,0.15)'}`,
                marginBottom: 12,
              }}>
                <p style={{ fontSize: 12, color: C.textSec, margin: 0, lineHeight: 1.5 }}>
                  {lesson.selfTest.explanation}
                </p>
              </div>
            )}

            {/* Related content */}
            <div style={{
              padding: '8px 12px',
              borderRadius: 8,
              background: C.input,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              {lesson.relatedContent.type === 'flashcard' ? <CreditCard size={12} style={{ color: C.cyan }} /> :
               lesson.relatedContent.type === 'question' ? <FileQuestion size={12} style={{ color: C.blue }} /> :
               lesson.relatedContent.type === 'case' ? <Stethoscope size={12} style={{ color: C.teal }} /> :
               <BookOpen size={12} style={{ color: C.purple }} />}
              <span style={{ fontSize: 11, color: C.textSec, flex: 1 }}>{lesson.relatedContent.title}</span>
              <ArrowRight size={10} style={{ color: C.textDim }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Streak Badge ────────────────────────────────────────────────────────────

function StreakBadge() {
  const currentStreak = useMicroLessonStore(s => s.currentStreak);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderRadius: 12,
      background: currentStreak > 0
        ? `linear-gradient(135deg, ${C.orangeAccent}12, ${C.orange}12)`
        : C.input,
      border: `1px solid ${currentStreak > 0 ? `${C.orangeAccent}25` : C.border}`,
    }}>
      <Flame size={18} style={{
        color: currentStreak > 0 ? C.orangeAccent : C.textDim,
        animation: currentStreak > 0 ? 'mlStreakPulse 1.5s ease-in-out infinite' : 'none',
      }} />
      <div>
        <span style={{ fontSize: 16, fontWeight: 800, color: currentStreak > 0 ? C.orangeAccent : C.textDim }}>
          {currentStreak}
        </span>
        <span style={{ fontSize: 11, color: C.textMuted, marginLeft: 4 }}>day streak</span>
      </div>
      <style>{`
        @keyframes mlStreakPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}

// ─── Calendar View ───────────────────────────────────────────────────────────

function MicroLessonCalendar() {
  const dayStreaks = useMicroLessonStore(s => s.dayStreaks);
  const getLessonsForDate = useMicroLessonStore(s => s.getLessonsForDate);
  const selectedCalendarDate = useMicroLessonStore(s => s.selectedCalendarDate);
  const setSelectedCalendarDate = useMicroLessonStore(s => s.setSelectedCalendarDate);
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());

  const streakMap: Record<string, { lessonsCompleted: number; totalLessons: number; allCompleted: boolean }> = {};
  for (const ds of dayStreaks) {
    streakMap[ds.date] = { lessonsCompleted: ds.lessonsCompleted, totalLessons: ds.totalLessons, allCompleted: ds.allCompleted };
  }

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const today = new Date().toISOString().split('T')[0];
  const monthName = new Date(viewYear, viewMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const selectedLessons = selectedCalendarDate ? getLessonsForDate(selectedCalendarDate) : [];

  return (
    <div style={{
      background: C.card,
      borderRadius: 16,
      border: `1px solid ${C.border}`,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={16} style={{ color: C.cyan }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Lesson History</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => {
            if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
            else setViewMonth(viewMonth - 1);
          }} style={{ padding: 4, borderRadius: 6, border: 'none', background: C.input, color: C.textSec, cursor: 'pointer' }}>
            <ChevronLeft size={14} />
          </button>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text, minWidth: 120, textAlign: 'center' }}>{monthName}</span>
          <button onClick={() => {
            if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
            else setViewMonth(viewMonth + 1);
          }} style={{ padding: 4, borderRadius: 6, border: 'none', background: C.input, color: C.textSec, cursor: 'pointer' }}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 10, color: C.textMuted, fontWeight: 600, padding: 4 }}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {days.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />;
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const ds = streakMap[dateStr];
            const isToday = dateStr === today;
            const isSelected = dateStr === selectedCalendarDate;

            let bg = 'transparent';
            let dotColor = 'transparent';
            if (ds) {
              if (ds.allCompleted) { bg = 'rgba(0,229,160,0.12)'; dotColor = C.green; }
              else if (ds.lessonsCompleted > 0) { bg = 'rgba(0,229,160,0.06)'; dotColor = C.yellow; }
            }

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedCalendarDate(isSelected ? null : dateStr)}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 8,
                  border: isSelected ? `2px solid ${C.green}` : isToday ? `1px solid ${C.green}40` : '1px solid transparent',
                  background: bg,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 11, color: isToday ? C.green : ds ? C.text : C.textDim, fontWeight: isToday ? 700 : 400 }}>
                  {day}
                </span>
                {ds && (
                  <div style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: dotColor,
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected date detail */}
        {selectedCalendarDate && selectedLessons.length > 0 && (
          <div style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            background: C.input,
            border: `1px solid ${C.border}`,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.textSec }}>
              {selectedCalendarDate} — {selectedLessons.length} lessons
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
              {selectedLessons.map((l, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 0',
                }}>
                  {l.completed ? <CheckCircle2 size={10} style={{ color: C.green }} /> : <div style={{ width: 10, height: 10, borderRadius: '50%', border: `1px solid ${C.textDim}` }} />}
                  <span style={{ fontSize: 11, color: C.textSec, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {l.fact.slice(0, 60)}...
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MicroLessonCarousel (Swipeable) ─────────────────────────────────────────

export function MicroLessonCarousel({ onNavigateToTab }: { onNavigateToTab?: (tab: string) => void }) {
  const todayLessons = useMicroLessonStore(s => s.todayLessons);
  const loading = useMicroLessonStore(s => s.loading);
  const error = useMicroLessonStore(s => s.error);
  const currentStreak = useMicroLessonStore(s => s.currentStreak);
  const currentCardIndex = useMicroLessonStore(s => s.currentCardIndex);
  const setCurrentCardIndex = useMicroLessonStore(s => s.setCurrentCardIndex);
  const markLessonCompleted = useMicroLessonStore(s => s.markLessonCompleted);
  const answerSelfTest = useMicroLessonStore(s => s.answerSelfTest);
  const logEngagement = useMicroLessonStore(s => s.logEngagement);
  const generateLessons = useMicroLessonStore(s => s.generateLessons);

  // Touch/drag state for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate on mount if needed
  useEffect(() => {
    if (todayLessons.length === 0 && !loading) {
      generateLessons();
    }
  }, []);

  const handleEngage = useCallback((action: string) => {
    const lesson = todayLessons[currentCardIndex];
    if (lesson) {
      logEngagement({ lessonId: lesson.id, timestamp: Date.now(), action: action as any });
    }
  }, [todayLessons, currentCardIndex, logEngagement]);

  const handleComplete = useCallback((id: string) => {
    markLessonCompleted(id);
  }, [markLessonCompleted]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 60) {
      if (touchDelta < 0 && currentCardIndex < todayLessons.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else if (touchDelta > 0 && currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      }
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  const navigateCard = (dir: 'prev' | 'next') => {
    if (dir === 'prev' && currentCardIndex > 0) setCurrentCardIndex(currentCardIndex - 1);
    if (dir === 'next' && currentCardIndex < todayLessons.length - 1) setCurrentCardIndex(currentCardIndex + 1);
  };

  const completedCount = todayLessons.filter(l => l.completed).length;

  return (
    <div style={{
      borderRadius: 16,
      border: `1px solid ${C.border}`,
      background: C.card,
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes mlSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={16} style={{ color: C.purple }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Daily Micro-Lessons</span>
          <span style={{
            fontSize: 9,
            padding: '2px 6px',
            borderRadius: 8,
            background: `${C.purple}15`,
            color: C.purple,
            fontWeight: 700,
          }}>NEW</span>
        </div>
        <StreakBadge />
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            padding: '40px 0',
          }}>
            <div style={{
              width: 32, height: 32,
              border: `3px solid ${C.purple}25`,
              borderTopColor: C.purple,
              borderRadius: '50%',
              animation: 'mlSpin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: 12, color: C.textMuted }}>Generating today's lessons...</span>
            <style>{`@keyframes mlSpin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && (
          <div style={{
            padding: 16,
            borderRadius: 10,
            background: 'rgba(255,87,87,0.06)',
            border: '1px solid rgba(255,87,87,0.15)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 12, color: C.danger, margin: '0 0 8px' }}>{error}</p>
            <button onClick={() => generateLessons()} style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: `1px solid ${C.danger}30`,
              background: 'transparent',
              color: C.danger,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              margin: '0 auto',
            }}>
              <RotateCcw size={10} /> Retry
            </button>
          </div>
        )}

        {!loading && !error && todayLessons.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <BookOpen size={32} style={{ color: C.textDim, marginBottom: 8 }} />
            <p style={{ fontSize: 13, color: C.textSec }}>No lessons yet today</p>
            <button onClick={() => generateLessons()} style={{
              marginTop: 8,
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: `linear-gradient(135deg, ${C.purple}, ${C.blue})`,
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Generate Today's Lessons
            </button>
          </div>
        )}

        {!loading && todayLessons.length > 0 && (
          <>
            {/* Swipeable card container */}
            <div
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                overflow: 'hidden',
                position: 'relative',
                touchAction: 'pan-y',
              }}
            >
              <div style={{
                display: 'flex',
                transition: touchStart !== null ? 'none' : 'transform 0.3s ease',
                transform: `translateX(${-currentCardIndex * 100 + (touchStart !== null ? touchDelta * 0.3 : 0)}%)`,
              }}>
                {todayLessons.map((lesson, i) => (
                  <div key={lesson.id} style={{
                    minWidth: '100%',
                    padding: '0 2px',
                  }}>
                    <MicroLessonCard
                      lesson={lesson}
                      onComplete={handleComplete}
                      onEngage={handleEngage}
                      isActive={i === currentCardIndex}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation & Progress */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
              <button
                onClick={() => navigateCard('prev')}
                disabled={currentCardIndex === 0}
                aria-label="Previous lesson card"
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: `1px solid ${currentCardIndex > 0 ? C.border : 'transparent'}`,
                  background: currentCardIndex > 0 ? C.input : 'transparent',
                  color: currentCardIndex > 0 ? C.textSec : C.textDim,
                  cursor: currentCardIndex > 0 ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>

              {/* Dots + progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' }}>
                {todayLessons.map((lesson, i) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentCardIndex(i)}
                    aria-label={`Go to lesson ${i + 1}${lesson.completed ? ' (completed)' : ''}`}
                    aria-current={i === currentCardIndex ? 'true' : undefined}
                    style={{
                      width: i === currentCardIndex ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: lesson.completed
                        ? C.green
                        : i === currentCardIndex
                        ? C.purple
                        : C.textDim + '40',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigateCard('next')}
                disabled={currentCardIndex === todayLessons.length - 1}
                aria-label="Next lesson card"
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: `1px solid ${currentCardIndex < todayLessons.length - 1 ? C.border : 'transparent'}`,
                  background: currentCardIndex < todayLessons.length - 1 ? C.input : 'transparent',
                  color: currentCardIndex < todayLessons.length - 1 ? C.textSec : C.textDim,
                  cursor: currentCardIndex < todayLessons.length - 1 ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Progress bar */}
            <div style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: C.textDim + '20',
              }}>
                <div style={{
                  width: `${(completedCount / todayLessons.length) * 100}%`,
                  height: '100%',
                  borderRadius: 2,
                  background: C.green,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <span style={{ fontSize: 10, color: C.textMuted }}>{completedCount}/{todayLessons.length}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main MicroLessonsTab Component ──────────────────────────────────────────

interface MicroLessonsTabProps {
  onNavigateToTab?: (tab: string, query?: string) => void;
}

export default function MicroLessonsTab({ onNavigateToTab }: MicroLessonsTabProps) {
  const currentStreak = useMicroLessonStore(s => s.currentStreak);
  const longestStreak = useMicroLessonStore(s => s.longestStreak);
  const todayLessons = useMicroLessonStore(s => s.todayLessons);
  const preferences = useMicroLessonStore(s => s.preferences);
  const updatePreferences = useMicroLessonStore(s => s.updatePreferences);
  const getWeeklyEngagement = useMicroLessonStore(s => s.getWeeklyEngagement);
  const [showSettings, setShowSettings] = useState(false);

  const weekly = getWeeklyEngagement();

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Sparkles size={28} style={{ color: C.purple }} />
            <h1 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Micro-Lessons</h1>
          </div>
          <p style={{ color: C.textSec, fontSize: 13, margin: 0 }}>
            Daily bite-sized lessons personalized for you
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StreakBadge />
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: `1px solid ${C.border}`,
              background: showSettings ? `${C.purple}12` : C.card,
              color: showSettings ? C.purple : C.textMuted,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Settings2 size={16} />
          </button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div style={{
          background: C.card,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          padding: 20,
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <Settings2 size={16} style={{ color: C.purple }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Preferences</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Daily count */}
            <div>
              <label style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, display: 'block', marginBottom: 6 }}>Daily Lesson Count</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[3, 4, 5].map(n => (
                  <button key={n} onClick={() => updatePreferences({ dailyCount: n })} style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: preferences.dailyCount === n ? `1px solid ${C.purple}40` : `1px solid ${C.border}`,
                    background: preferences.dailyCount === n ? `${C.purple}12` : C.input,
                    color: preferences.dailyCount === n ? C.purple : C.textMuted,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification time */}
            <div>
              <label style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, display: 'block', marginBottom: 6 }}>Notification Time</label>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['morning', 'afternoon', 'evening', 'night'] as NotificationTime[]).map(t => (
                  <button key={t} onClick={() => updatePreferences({ preferredNotificationTime: t })} style={{
                    padding: '5px 8px',
                    borderRadius: 6,
                    border: preferences.preferredNotificationTime === t ? `1px solid ${C.cyan}30` : `1px solid ${C.border}`,
                    background: preferences.preferredNotificationTime === t ? `${C.cyan}10` : C.input,
                    color: preferences.preferredNotificationTime === t ? C.cyan : C.textMuted,
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}>
                    {t.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
              {[
                { key: 'includeWeakAreas', label: 'Weak Areas', color: C.danger },
                { key: 'includeTrending', label: 'Trending', color: C.orange },
                { key: 'includeReview', label: 'Review', color: C.green },
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => updatePreferences({ [key]: !preferences[key as keyof typeof preferences] })}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: `1px solid ${preferences[key as keyof typeof preferences] ? `${color}30` : C.border}`,
                    background: preferences[key as keyof typeof preferences] ? `${color}10` : C.input,
                    color: preferences[key as keyof typeof preferences] ? color : C.textMuted,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {preferences[key as keyof typeof preferences] ? <CheckCircle2 size={10} /> : <div style={{ width: 10, height: 10, borderRadius: '50%', border: `1px solid ${C.textDim}` }} />}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        <div style={{
          background: C.card,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          padding: '12px 14px',
          textAlign: 'center',
        }}>
          <Flame size={16} style={{ color: C.orangeAccent, margin: '0 auto 4px' }} />
          <span style={{ fontSize: 20, fontWeight: 800, color: C.orangeAccent, display: 'block' }}>{currentStreak}</span>
          <span style={{ fontSize: 10, color: C.textMuted }}>Current Streak</span>
        </div>
        <div style={{
          background: C.card,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          padding: '12px 14px',
          textAlign: 'center',
        }}>
          <Trophy size={16} style={{ color: C.yellow, margin: '0 auto 4px' }} />
          <span style={{ fontSize: 20, fontWeight: 800, color: C.yellow, display: 'block' }}>{longestStreak}</span>
          <span style={{ fontSize: 10, color: C.textMuted }}>Best Streak</span>
        </div>
        <div style={{
          background: C.card,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          padding: '12px 14px',
          textAlign: 'center',
        }}>
          <Target size={16} style={{ color: C.green, margin: '0 auto 4px' }} />
          <span style={{ fontSize: 20, fontWeight: 800, color: C.green, display: 'block' }}>
            {todayLessons.length > 0 ? Math.round(todayLessons.filter(l => l.completed).length / todayLessons.length * 100) : 0}%
          </span>
          <span style={{ fontSize: 10, color: C.textMuted }}>Today Done</span>
        </div>
      </div>

      {/* Weekly engagement bar */}
      <div style={{
        background: C.card,
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        padding: 14,
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 8 }}>This Week</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
          {weekly.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{
                width: '100%',
                borderRadius: 3,
                background: d.completed > 0 ? C.green : C.textDim + '20',
                height: Math.max(4, (d.completed / Math.max(d.total, 1)) * 32),
                transition: 'height 0.3s ease',
              }} />
              <span style={{ fontSize: 9, color: C.textMuted }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <MicroLessonCarousel onNavigateToTab={onNavigateToTab} />

      {/* Calendar */}
      <div style={{ marginTop: 20 }}>
        <MicroLessonCalendar />
      </div>
    </div>
  );
}
