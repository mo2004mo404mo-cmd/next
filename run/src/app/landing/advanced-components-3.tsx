'use client';

/**
 * MedQ landing — third batch of advanced components.
 *
 * File: /home/z/my-project/extracted/src/app/landing/advanced-components-3.tsx
 *
 * Exports:
 *   - WeeklyPlanner          interactive 7-day study planner with drag-style toggles
 *   - WeaknessDiagnostic     4-question mini quiz with score + recommendation
 *   - PricingCalculator      slider-based "estimate your savings" calculator
 *   - MascotSection          animated SVG mascot with speech bubble
 *   - BeforeAfterSlider      draggable before/after comparison slider
 *   - ResultsShowcase        animated "your score trajectory" line chart
 *   - IntegrationMarquee     infinite-scroll logos of integrations
 *   - SocialProofFeed        real-time activity feed (X answered Y, Z unlocked W)
 *   - ROICalculator          "if you pass 1 month earlier, you save $X" widget
 *   - CommandPaletteDemo     demo Cmd+K palette (press / to open)
 *   - ThemeShowcase          3 theme preview cards (mint / midnight / aurora)
 *   - StatTicker             rolling number with ODOmter-style animation
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Calendar, Flame, Timer, Sparkles, Wand2, Terminal, Command, Palette,
  TrendingUp, TrendingDown, Activity, Target, Award, Trophy, Star, Check, X,
  ChevronUp, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Play, RefreshCw,
  Settings, Sliders, Search, Bell, Brain, Stethoscope, Pill, Microscope, Dna,
  Lightbulb, BookOpen, Library, GraduationCap, Wallet, DollarSign, Coins,
  Percent, Clock, Compass, Atom, FlaskConical, Zap, Rocket, Crown, Medal,
  ArrowDown, ArrowUp, Maximize2, RotateCw, Layers, BarChart3, PieChart,
} from 'lucide-react';

// ─── 1. WeeklyPlanner ──────────────────────────────────────────────

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIME_SLOTS = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
const SUBJECTS = [
  { id: 'cardio', name: 'Cardiology', color: '#ef4444' },
  { id: 'pharm', name: 'Pharmacology', color: '#8b5cf6' },
  { id: 'anatomy', name: 'Anatomy', color: '#06b6d4' },
  { id: 'patho', name: 'Pathology', color: '#10b981' },
  { id: 'physio', name: 'Physiology', color: '#f59e0b' },
];

// Pre-seeded study plan
const INITIAL_PLAN: Record<string, Record<string, string | null>> = {};
DAYS.forEach((d, di) => {
  INITIAL_PLAN[d] = {};
  TIME_SLOTS.forEach((t, ti) => {
    const idx = (di + ti) % SUBJECTS.length;
    // leave some slots empty
    INITIAL_PLAN[d][t] = (ti + di) % 3 === 0 ? null : SUBJECTS[idx].id;
  });
});

export function WeeklyPlanner() {
  const [plan, setPlan] = useState(INITIAL_PLAN);
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0].id);

  const toggle = (day: string, time: string) => {
    setPlan(p => ({
      ...p,
      [day]: { ...p[day], [time]: p[day][time] === activeSubject ? null : activeSubject },
    }));
  };

  const totalSessions = Object.values(plan).flatMap(Object.values).filter(Boolean).length;
  const totalHours = totalSessions * 1.5;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(0,229,160,0.04), rgba(139,92,246,0.04))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Calendar size={18} style={{ color: '#00e5a0' }} />
          <strong style={{ fontSize: 15, color: '#fff' }}>Your AI-built weekly plan</strong>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
          <span style={{ color: '#94a3b8' }}>
            <strong style={{ color: '#00e5a0' }}>{totalSessions}</strong> sessions
          </span>
          <span style={{ color: '#94a3b8' }}>
            <strong style={{ color: '#00e5a0' }}>{totalHours}h</strong> total
          </span>
          <button
            onClick={() => setPlan(INITIAL_PLAN)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '4px 8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#94a3b8', fontSize: 11,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={10} /> Reset
          </button>
        </div>
      </div>

      {/* Subject picker */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#64748b', alignSelf: 'center', marginRight: 4 }}>PAINT →</span>
        {SUBJECTS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSubject(s.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px',
              background: activeSubject === s.id ? s.color + '22' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeSubject === s.id ? s.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 6,
              color: activeSubject === s.id ? s.color : '#94a3b8',
              fontSize: 11, fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
            {s.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 580 }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
            <div />
            {DAYS.map(d => (
              <div key={d} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textAlign: 'center', padding: '4px 0' }}>
                {d}
              </div>
            ))}
          </div>
          {/* Time rows */}
          {TIME_SLOTS.map(t => (
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
              <div style={{ fontSize: 10, color: '#64748b', alignSelf: 'center', textAlign: 'right', paddingRight: 6 }}>
                {t}
              </div>
              {DAYS.map(d => {
                const subjId = plan[d][t];
                const subj = SUBJECTS.find(s => s.id === subjId);
                return (
                  <button
                    key={`${d}-${t}`}
                    onClick={() => toggle(d, t)}
                    style={{
                      height: 38,
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: subj ? subj.color + '22' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontWeight: 600,
                      color: subj ? subj.color : '#475569',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    {subj ? subj.name.slice(0, 4).toUpperCase() : '+'}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 11, color: '#64748b', margin: '14px 0 0', lineHeight: 1.5 }}>
        Tap any cell to assign your active subject. MedQ's AI builds this plan from your weak areas, exam date, and study pace — then adapts daily.
      </p>
    </div>
  );
}

// ─── 2. WeaknessDiagnostic ─────────────────────────────────────────

const DIAGNOSTIC_QUESTIONS = [
  {
    q: 'A 55-year-old presents with crushing chest pain. ECG shows ST elevation in II, III, aVF. Which artery is occluded?',
    options: ['LAD', 'RCA', 'Circumflex', 'Left main'],
    answer: 1,
    topic: 'Cardiology',
    explanation: 'Inferior leads (II, III, aVF) → RCA in 80% of cases.',
  },
  {
    q: 'Which drug class is first-line for essential hypertension in a 60-year-old with diabetes?',
    options: ['Thiazide diuretic', 'Beta-blocker', 'ACE inhibitor', 'Calcium channel blocker'],
    answer: 2,
    topic: 'Pharmacology',
    explanation: 'ACE inhibitors are first-line in diabetics due to renal protective effect.',
  },
  {
    q: 'A lesion at the left optic chiasm causes:',
    options: ['Left eye blindness', 'Right eye blindness', 'Bitemporal hemianopia', 'Homonymous hemianopia'],
    answer: 2,
    topic: 'Neurology',
    explanation: 'Optic chiasm lesions cause bitemporal hemianopia (tunnel vision).',
  },
  {
    q: 'A patient has pancytopenia, low MCV, and hypersegmented neutrophils. Most likely cause:',
    options: ['Iron deficiency', 'B12/folate deficiency', 'Aplastic anemia', 'Leukemia'],
    answer: 1,
    topic: 'Hematology',
    explanation: 'Hypersegmented neutrophils + pancytopenia = megaloblastic anemia (B12/folate).',
  },
];

export function WeaknessDiagnostic() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [topicResults, setTopicResults] = useState<Record<string, boolean>>({});

  const q = DIAGNOSTIC_QUESTIONS[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === q.answer;
    if (correct) setScore(s => s + 1);
    setTopicResults(r => ({ ...r, [q.topic]: correct }));
  };

  const next = () => {
    if (idx + 1 >= DIAGNOSTIC_QUESTIONS.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0); setPicked(null); setScore(0); setDone(false); setTopicResults({});
  };

  if (done) {
    const pct = Math.round((score / DIAGNOSTIC_QUESTIONS.length) * 100);
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(0,229,160,0.06), rgba(139,92,246,0.06))',
          border: '1px solid rgba(0,229,160,0.2)',
          borderRadius: 20,
          padding: 32,
          textAlign: 'center',
        }}
      >
        <div style={{
          width: 80, height: 80, margin: '0 auto 16px',
          borderRadius: '50%',
          background: `conic-gradient(${pct >= 75 ? '#00e5a0' : pct >= 50 ? '#f59e0b' : '#ef4444'} ${pct * 3.6}deg, rgba(255,255,255,0.05) 0)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: '#0a0e1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 800, color: '#fff',
          }}>
            {pct}%
          </div>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
          You scored {score}/{DIAGNOSTIC_QUESTIONS.length}
        </h3>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 18 }}>
          {pct >= 75 ? 'Strong baseline — MedQ can take you to top 10% with targeted advanced cases.' :
           pct >= 50 ? 'Solid foundation — focus on weak areas to accelerate.' :
           'Plenty of room to grow — MedQ recommends the 30-day bootcamp.'}
        </p>
        {/* Topic breakdown */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 18 }}>
          {Object.entries(topicResults).map(([topic, correct]) => (
            <div key={topic} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px',
              background: correct ? 'rgba(0,229,160,0.1)' : 'rgba(239,68,68,0.1)',
              border: `1px solid ${correct ? 'rgba(0,229,160,0.3)' : 'rgba(239,68,68,0.3)'}`,
              borderRadius: 6,
              fontSize: 11,
              color: correct ? '#00e5a0' : '#fca5a5',
            }}>
              {correct ? <Check size={11} /> : <X size={11} />}
              {topic}
            </div>
          ))}
        </div>
        <button
          onClick={restart}
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 10,
            color: '#cbd5e1', fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={12} style={{ display: 'inline', marginRight: 6 }} />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 28,
      }}
    >
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 6 }}>
            <span>QUESTION {idx + 1} OF {DIAGNOSTIC_QUESTIONS.length}</span>
            <span style={{ color: '#00e5a0' }}>{q.topic}</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              width: `${((idx + (picked !== null ? 1 : 0)) / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00e5a0, #06b6d4)',
              transition: 'width 0.4s',
            }} />
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', margin: '0 0 18px', lineHeight: 1.45 }}>
        {q.q}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.answer;
          const showState = picked !== null;
          let bg = 'rgba(255,255,255,0.04)';
          let border = 'rgba(255,255,255,0.08)';
          let color = '#cbd5e1';
          if (showState && isCorrect) {
            bg = 'rgba(0,229,160,0.12)'; border = '#00e5a0'; color = '#00e5a0';
          } else if (showState && isPicked && !isCorrect) {
            bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#fca5a5';
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={picked !== null}
              style={{
                padding: '12px 16px',
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 10,
                color, fontSize: 13, fontWeight: 500,
                cursor: picked === null ? 'pointer' : 'default',
                textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s',
              }}
            >
              <span>{opt}</span>
              {showState && isCorrect && <Check size={14} />}
              {showState && isPicked && !isCorrect && <X size={14} />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div style={{
          marginTop: 16,
          padding: 12,
          background: 'rgba(0,229,160,0.05)',
          border: '1px solid rgba(0,229,160,0.15)',
          borderRadius: 10,
          fontSize: 12, color: '#cbd5e1', lineHeight: 1.5,
        }}>
          <strong style={{ color: '#00e5a0' }}>Explanation: </strong>{q.explanation}
        </div>
      )}

      {picked !== null && (
        <button
          onClick={next}
          style={{
            marginTop: 14, width: '100%',
            padding: 12,
            background: 'linear-gradient(90deg, #00e5a0, #06b6d4)',
            border: 'none', borderRadius: 10,
            color: '#0a0e1a', fontSize: 14, fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {idx + 1 >= DIAGNOSTIC_QUESTIONS.length ? 'See my results' : 'Next question'}
          <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6 }} />
        </button>
      )}
    </div>
  );
}

// ─── 3. PricingCalculator ──────────────────────────────────────────

export function PricingCalculator() {
  const [questions, setQuestions] = useState(500);
  const [students, setStudents] = useState(1);
  const [annual, setAnnual] = useState(true);

  const basePrice = annual ? 19 : 29; // per month
  const totalPrice = basePrice * students;
  const perStudent = totalPrice / students;
  const competitorPrice = 79 * students; // hypothetical competitor
  const savings = competitorPrice - totalPrice * (annual ? 12 : 1);
  const savingsPct = Math.round((savings / competitorPrice) * 100);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(0,229,160,0.04), rgba(139,92,246,0.04))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 28,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <Wallet size={18} style={{ color: '#00e5a0' }} />
        <strong style={{ fontSize: 15, color: '#fff' }}>Estimate your savings</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
        {/* Questions slider */}
        <div>
          <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
            Questions / month: <strong style={{ color: '#00e5a0' }}>{questions}</strong>
            <input
              type="range" min="100" max="2000" step="100"
              value={questions}
              onChange={e => setQuestions(+e.target.value)}
              style={{ width: '100%', accentColor: '#00e5a0', display: 'block', marginTop: 4 }}
              aria-label="Questions per month"
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748b', marginTop: 2 }}>
            <span>100</span><span>2,000</span>
          </div>
        </div>
        {/* Students slider */}
        <div>
          <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
            Students: <strong style={{ color: '#00e5a0' }}>{students}</strong>
            <input
              type="range" min="1" max="20" step="1"
              value={students}
              onChange={e => setStudents(+e.target.value)}
              style={{ width: '100%', accentColor: '#00e5a0', display: 'block', marginTop: 4 }}
              aria-label="Number of students"
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748b', marginTop: 2 }}>
            <span>1</span><span>20</span>
          </div>
        </div>
      </div>

      {/* Billing toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <button
          onClick={() => setAnnual(false)}
          style={{
            flex: 1, padding: 10,
            background: !annual ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${!annual ? '#00e5a0' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 8,
            color: !annual ? '#00e5a0' : '#94a3b8',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => setAnnual(true)}
          style={{
            flex: 1, padding: 10,
            background: annual ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${annual ? '#00e5a0' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 8,
            color: annual ? '#00e5a0' : '#94a3b8',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          Annual
          <span style={{ padding: '2px 6px', background: '#00e5a0', color: '#0a0e1a', borderRadius: 4, fontSize: 10 }}>
            -35%
          </span>
        </button>
      </div>

      {/* Result */}
      <div style={{
        padding: 20,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(0,229,160,0.2)',
        borderRadius: 12,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>YOU PAY</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>
              ${totalPrice}<span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ fontSize: 11, color: '#64748b' }}>
              ${perStudent.toFixed(2)}/student · {questions} Qs/mo
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>VS COMPETITORS</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#94a3b8', textDecoration: 'line-through' }}>
              ${competitorPrice}<span style={{ fontSize: 13, fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#00e5a0' }}>
              You save ${savings.toLocaleString('en-US')}/yr ({savingsPct}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. MascotSection ──────────────────────────────────────────────

export function MascotSection() {
  const [bubble, setBubble] = useState(0);
  const bubbles = [
    "Hi! I'm Q-Bot — your AI study buddy 🤖",
    "I'll keep you on track with daily reminders.",
    "Stuck on a case? Just ask — I'm here 24/7.",
    "I learn from your mistakes and adapt.",
  ];
  useEffect(() => {
    const id = setInterval(() => setBubble(b => (b + 1) % bubbles.length), 3500);
    return () => clearInterval(id);
  }, [bubbles.length]);

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: 24,
        background: 'linear-gradient(135deg, rgba(0,229,160,0.06), rgba(139,92,246,0.06))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        flexWrap: 'wrap',
      }}
    >
      {/* Mascot SVG */}
      <div style={{ position: 'relative', width: 120, height: 140, flexShrink: 0 }}>
        <svg viewBox="0 0 120 140" style={{ width: '100%', height: '100%' }}>
          {/* Antenna */}
          <line x1="60" y1="20" x2="60" y2="35" stroke="#00e5a0" strokeWidth="2" />
          <circle cx="60" cy="18" r="4" fill="#00e5a0" style={{ filter: 'drop-shadow(0 0 4px #00e5a0)' }}>
            <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Head */}
          <rect x="30" y="35" width="60" height="50" rx="14" fill="url(#mascotGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="48" cy="58" r="6" fill="#0a0e1a" />
          <circle cx="72" cy="58" r="6" fill="#0a0e1a" />
          <circle cx="50" cy="56" r="2" fill="#fff">
            <animate attributeName="cy" values="56;60;56" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="74" cy="56" r="2" fill="#fff">
            <animate attributeName="cy" values="56;60;56" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Mouth */}
          <path d="M 50 72 Q 60 80 70 72" fill="none" stroke="#0a0e1a" strokeWidth="2" strokeLinecap="round" />
          {/* Body */}
          <rect x="35" y="90" width="50" height="35" rx="10" fill="url(#mascotGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Heart logo */}
          <circle cx="60" cy="108" r="6" fill="#00e5a0" opacity="0.3" />
          <path d="M 60 113 L 56 108 A 2 2 0 0 1 60 106 A 2 2 0 0 1 64 108 Z" fill="#00e5a0" />
          {/* Arms */}
          <line x1="35" y1="100" x2="22" y2="92" stroke="#00e5a0" strokeWidth="4" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="0 35 100; -10 35 100; 0 35 100" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="85" y1="100" x2="98" y2="92" stroke="#00e5a0" strokeWidth="4" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="0 85 100; 10 85 100; 0 85 100" dur="2s" repeatCount="indefinite" />
          </line>
          <defs>
            <linearGradient id="mascotGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0c0e14" />
              <stop offset="100%" stopColor="#1a1f3a" />
            </linearGradient>
          </defs>
        </svg>
        {/* Floating animation */}
        <style jsx>{`
          div[style*="width: 120px"] svg {
            animation: mascot-float 4s ease-in-out infinite;
          }
          @keyframes mascot-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </div>

      {/* Speech bubble */}
      <div style={{ flex: 1, minWidth: 220 }}>
        <div
          key={bubble}
          style={{
            display: 'inline-block',
            padding: '12px 18px',
            background: 'rgba(0,229,160,0.1)',
            border: '1px solid rgba(0,229,160,0.25)',
            borderRadius: 16,
            borderTopLeftRadius: 4,
            fontSize: 14, color: '#e8ecf4',
            animation: 'bubble-in 0.4s ease',
          }}
        >
          {bubbles[bubble]}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: '#64748b' }}>
          <strong style={{ color: '#00e5a0' }}>Q-Bot</strong> · your AI study companion
        </div>
        <style jsx>{`
          @keyframes bubble-in {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

// ─── 5. BeforeAfterSlider ──────────────────────────────────────────

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onMove = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const mousemove = (e: MouseEvent) => dragging.current && onMove(e.clientX);
    const touchmove = (e: TouchEvent) => dragging.current && onMove(e.touches[0].clientX);
    const stop = () => { dragging.current = false; };
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, [onMove]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'ew-resize',
        userSelect: 'none',
      }}
      onMouseDown={e => { dragging.current = true; onMove(e.clientX); }}
      onTouchStart={e => { dragging.current = true; onMove(e.touches[0].clientX); }}
    >
      {/* After (full) */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #00e5a0 0%, #06b6d4 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: '#0a0e1a', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>AFTER 30 DAYS</div>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#0a0e1a', lineHeight: 1 }}>94%</div>
          <div style={{ fontSize: 13, color: '#0a0e1a', fontWeight: 600 }}>Pass-rate uplift</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 16, fontSize: 11, color: 'rgba(10,14,26,0.7)' }}>
            <span>Streak: 28 days</span>
            <span>Weaknesses: -68%</span>
          </div>
        </div>
      </div>
      {/* Before (clipped) */}
      <div
        style={{
          position: 'absolute', inset: 0,
          width: `${pos}%`,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1a1f3a, #0a0e1a)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '100vw', maxWidth: '100%' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>BEFORE MEDQ</div>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#fff', lineHeight: 1 }}>42%</div>
          <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>Self-assessed readiness</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 16, fontSize: 11, color: '#64748b' }}>
            <span>Streak: 3 days</span>
            <span>Weaknesses: 12 topics</span>
          </div>
        </div>
      </div>
      {/* Handle */}
      <div
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${pos}%`,
          transform: 'translateX(-50%)',
          width: 4, background: '#fff',
          boxShadow: '0 0 12px rgba(255,255,255,0.6)',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          <ChevronLeft size={14} color="#0a0e1a" style={{ marginRight: -3 }} />
          <ChevronRight size={14} color="#0a0e1a" style={{ marginLeft: -3 }} />
        </div>
      </div>
    </div>
  );
}

// ─── 6. ResultsShowcase ────────────────────────────────────────────

export function ResultsShowcase() {
  // Build an SVG line chart showing score trajectory over 30 days
  const data = useMemo(() => {
    const arr: { day: number; score: number }[] = [];
    let s = 42;
    for (let d = 0; d <= 30; d++) {
      // Add a deterministic upward trend with some plateaus
      const trend = 1.7;
      const noise = Math.sin(d * 1.3) * 1.5;
      s = Math.min(94, s + trend + noise);
      arr.push({ day: d, score: Math.round(s) });
    }
    return arr;
  }, []);

  const w = 600, h = 200, pad = 30;
  const maxScore = 100;
  const points = data.map(d => ({
    x: pad + (d.day / 30) * (w - pad * 2),
    y: h - pad - (d.score / maxScore) * (h - pad * 2),
    score: d.score, day: d.day,
  }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${path} L ${points[points.length - 1].x} ${h - pad} L ${pad} ${h - pad} Z`;

  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TrendingUp size={18} style={{ color: '#00e5a0' }} />
          <strong style={{ fontSize: 15, color: '#fff' }}>Score trajectory</strong>
        </div>
        <span style={{ fontSize: 11, color: '#64748b' }}>30-day average across 2,847 users</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5a0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid */}
        {[0, 25, 50, 75, 100].map(s => {
          const y = h - pad - (s / maxScore) * (h - pad * 2);
          return (
            <g key={s}>
              <line x1={pad} y1={y} x2={w - pad} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={pad - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#64748b">{s}</text>
            </g>
          );
        })}
        {/* X-axis labels */}
        {[0, 7, 14, 21, 30].map(d => {
          const x = pad + (d / 30) * (w - pad * 2);
          return <text key={d} x={x} y={h - pad + 14} textAnchor="middle" fontSize="10" fill="#64748b">Day {d}</text>;
        })}
        {/* Area */}
        <path d={areaPath} fill="url(#areaGrad)" />
        {/* Line */}
        <path d={path} fill="none" stroke="#00e5a0" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {/* Start point */}
        <circle cx={points[0].x} cy={points[0].y} r="4" fill="#ef4444" />
        <text x={points[0].x + 8} y={points[0].y + 4} fontSize="11" fill="#fca5a5" fontWeight="600">42%</text>
        {/* End point */}
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="5" fill="#00e5a0" style={{ filter: 'drop-shadow(0 0 6px #00e5a0)' }} />
        <text x={points[points.length - 1].x - 8} y={points[points.length - 1].y - 8} textAnchor="end" fontSize="11" fill="#00e5a0" fontWeight="700">94%</text>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 11 }}>
        <div>
          <div style={{ color: '#64748b' }}>Start</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#ef4444' }}>42%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748b' }}>Change</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#00e5a0' }}>+52 pts</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#64748b' }}>Day 30</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#00e5a0' }}>94%</div>
        </div>
      </div>
    </div>
  );
}

// ─── 7. IntegrationMarquee ─────────────────────────────────────────

const INTEGRATIONS = [
  { name: 'OpenAI', color: '#10a37f' },
  { name: 'Anthropic', color: '#d97757' },
  { name: 'Google', color: '#4285f4' },
  { name: 'Mistral', color: '#fa520f' },
  { name: 'Meta', color: '#0866ff' },
  { name: 'DeepSeek', color: '#4d6bfe' },
  { name: 'Grok', color: '#1d9bf0' },
  { name: 'Cohere', color: '#39594d' },
  { name: 'Perplexity', color: '#20808d' },
  { name: 'Anyscale', color: '#9945ff' },
];

export function IntegrationMarquee() {
  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '20px 0',
        position: 'relative',
        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 32,
          width: 'max-content',
          animation: 'int-marquee 30s linear infinite',
        }}
      >
        {[...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS].map((it, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '10px 18px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              color: '#cbd5e1',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: it.color,
              boxShadow: `0 0 8px ${it.color}80`,
            }} />
            {it.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes int-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}

// ─── 8. SocialProofFeed ────────────────────────────────────────────

const FEED_EVENTS = [
  { name: 'Aisha K.', action: 'unlocked', target: '7-day streak', icon: Flame, color: '#f59e0b' },
  { name: 'Marcus L.', action: 'answered', target: 'Cardiology MCQ #482', icon: Check, color: '#00e5a0' },
  { name: 'Sofia R.', action: 'completed', target: 'Respiratory quiz', icon: Trophy, color: '#8b5cf6' },
  { name: 'Kenji T.', action: 'mastered', target: 'Pharmacology of arrhythmias', icon: Award, color: '#06b6d4' },
  { name: 'Priya S.', action: 'unlocked', target: 'Legendary badge', icon: Crown, color: '#fbbf24' },
  { name: 'Diego M.', action: 'improved', target: 'Cardio score +12%', icon: TrendingUp, color: '#10b981' },
  { name: 'Yara A.', action: 'finished', target: 'Daily challenge', icon: Zap, color: '#ec4899' },
  { name: 'Chen W.', action: 'reviewed', target: '12 weak flashcards', icon: BookOpen, color: '#3b82f6' },
];

export function SocialProofFeed() {
  const [visible, setVisible] = useState<typeof FEED_EVENTS>([]);
  useEffect(() => {
    let i = 0;
    const add = () => {
      setVisible(v => {
        const next = [...v, FEED_EVENTS[i % FEED_EVENTS.length]];
        i++;
        return next.slice(-4);
      });
    };
    add();
    const id = setInterval(add, 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 16,
        minHeight: 240,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: '#00e5a0',
          animation: 'feed-pulse 1.5s ease-in-out infinite',
        }} />
        <span style={{ fontSize: 11, color: '#94a3b8', letterSpacing: 1, fontWeight: 600 }}>LIVE ACTIVITY</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {visible.map((ev, i) => {
          const Icon = ev.icon;
          const idx = visible.length - 1 - i;
          return (
            <div
              key={`${ev.name}-${i}-${idx}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: 8,
                fontSize: 12,
                animation: 'feed-in 0.5s ease',
                opacity: 1 - i * 0.18,
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: ev.color + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={12} style={{ color: ev.color }} />
              </div>
              <span style={{ color: '#cbd5e1' }}>
                <strong style={{ color: '#fff' }}>{ev.name}</strong>{' '}{ev.action}{' '}
                <span style={{ color: ev.color, fontWeight: 600 }}>{ev.target}</span>
              </span>
              <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 10, flexShrink: 0 }}>
                {i === 0 ? 'just now' : `${i * 24}s ago`}
              </span>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes feed-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes feed-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── 9. ROICalculator ──────────────────────────────────────────────

export function ROICalculator() {
  const [monthsSaved, setMonthsSaved] = useState(2);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);

  const residencySaved = monthsSaved * monthlyIncome;
  const medqCost = 19 * 12;
  const netGain = residencySaved - medqCost;
  const roiMultiple = (netGain / medqCost).toFixed(0);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(0,229,160,0.05))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 28,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <DollarSign size={18} style={{ color: '#00e5a0' }} />
        <strong style={{ fontSize: 15, color: '#fff' }}>What's passing early worth to you?</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
            Months earlier you pass: <strong style={{ color: '#00e5a0' }}>{monthsSaved}</strong>
            <input
              type="range" min="1" max="6" step="1"
              value={monthsSaved}
              onChange={e => setMonthsSaved(+e.target.value)}
              style={{ width: '100%', accentColor: '#00e5a0', display: 'block', marginTop: 4 }}
              aria-label="Months earlier you pass"
            />
          </label>
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
            Monthly resident income: <strong style={{ color: '#00e5a0' }}>${monthlyIncome.toLocaleString('en-US')}</strong>
            <input
              type="range" min="3000" max="10000" step="500"
              value={monthlyIncome}
              onChange={e => setMonthlyIncome(+e.target.value)}
              style={{ width: '100%', accentColor: '#00e5a0', display: 'block', marginTop: 4 }}
              aria-label="Monthly resident income in dollars"
            />
          </label>
        </div>
      </div>

      <div style={{
        padding: 20,
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(0,229,160,0.2)',
        borderRadius: 12,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>YOUR NET GAIN</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#00e5a0', lineHeight: 1.1 }}>
          +${netGain.toLocaleString('en-US')}
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
          That's a <strong style={{ color: '#fff' }}>{roiMultiple}x</strong> return on your MedQ subscription
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14, fontSize: 11, color: '#64748b',
        }}>
          <span>Residency income: +${residencySaved.toLocaleString('en-US')}</span>
          <span>MedQ cost: -${medqCost}/yr</span>
        </div>
      </div>
    </div>
  );
}

// ─── 10. CommandPaletteDemo ────────────────────────────────────────

const PALETTE_ITEMS = [
  { icon: Brain, label: 'Start AI tutor session', shortcut: '⌘T', color: '#00e5a0' },
  { icon: BookOpen, label: 'Open question bank', shortcut: '⌘Q', color: '#8b5cf6' },
  { icon: Flame, label: 'Continue daily streak', shortcut: '⌘D', color: '#f59e0b' },
  { icon: Microscope, label: 'Review weak areas', shortcut: '⌘W', color: '#06b6d4' },
  { icon: Trophy, label: 'View leaderboard', shortcut: '⌘L', color: '#fbbf24' },
  { icon: Stethoscope, label: 'Practice OSCE case', shortcut: '⌘O', color: '#ec4899' },
];

export function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (open && e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(a => Math.min(PALETTE_ITEMS.length - 1, a + 1));
      } else if (open && e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(a => Math.max(0, a - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const filtered = PALETTE_ITEMS.filter(it => it.label.toLowerCase().includes(query.toLowerCase()));

  if (!open) {
    return (
      <div
        style={{
          padding: 24,
          background: 'rgba(12,14,20,0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 14, letterSpacing: 1 }}>
          POWER-USER SHORTCUT
        </div>
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 18px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 10,
            color: '#94a3b8', fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}
        >
          <Command size={14} />
          Press <kbd style={{ padding: '2px 6px', background: '#000', borderRadius: 4, color: '#00e5a0', fontSize: 12 }}>/</kbd> to open the command palette
        </button>
        <p style={{ fontSize: 11, color: '#8b95a8', marginTop: 10, marginBottom: 0 }}>
          Try the interactive demo — no signup needed.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          background: '#0c0e14',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: 14,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <Search size={16} style={{ color: '#64748b' }} />
          <input
            autoFocus
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0); }}
            placeholder="Type a command or search..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: '#fff', fontSize: 14, fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            padding: '2px 6px', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4, color: '#64748b', fontSize: 10,
          }}>
            ESC
          </kbd>
        </div>
        {/* Items */}
        <div style={{ maxHeight: 320, overflow: 'auto', padding: 6 }}>
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
              No commands match "{query}"
            </div>
          )}
          {filtered.map((it, i) => {
            const Icon = it.icon;
            const isActive = i === active;
            return (
              <div
                key={it.label}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  background: isActive ? 'rgba(0,229,160,0.08)' : 'transparent',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: it.color + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={14} style={{ color: it.color }} />
                </div>
                <span style={{ fontSize: 13, color: isActive ? '#fff' : '#cbd5e1' }}>{it.label}</span>
                <kbd style={{
                  marginLeft: 'auto',
                  padding: '2px 6px', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4, color: '#64748b', fontSize: 10, fontFamily: 'monospace',
                }}>
                  {it.shortcut}
                </kbd>
              </div>
            );
          })}
        </div>
        {/* Footer */}
        <div style={{
          padding: '8px 14px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', gap: 14,
          fontSize: 10, color: '#64748b',
        }}>
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}

// ─── 11. ThemeShowcase ─────────────────────────────────────────────

const THEMES = [
  {
    name: 'Mint Default',
    bg: '#0a0e1a',
    surface: '#0c0e14',
    accent: '#00e5a0',
    secondary: '#06b6d4',
    desc: 'Cool, calm, focused.',
  },
  {
    name: 'Midnight Violet',
    bg: '#0d0a1f',
    surface: '#13102b',
    accent: '#8b5cf6',
    secondary: '#ec4899',
    desc: 'For night owls who like a pop.',
  },
  {
    name: 'Aurora Dawn',
    bg: '#1a1208',
    surface: '#1f1609',
    accent: '#f59e0b',
    secondary: '#ef4444',
    desc: 'Warm sunrise palette.',
  },
];

export function ThemeShowcase() {
  const [active, setActive] = useState(0);
  const t = THEMES[active];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, justifyContent: 'center' }}>
        {THEMES.map((th, i) => (
          <button
            key={th.name}
            onClick={() => setActive(i)}
            style={{
              padding: '6px 14px',
              background: active === i ? th.accent + '22' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${active === i ? th.accent : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 8,
              color: active === i ? th.accent : '#94a3b8',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {th.name}
          </button>
        ))}
      </div>
      <div
        style={{
          background: t.bg,
          border: `1px solid ${t.accent}33`,
          borderRadius: 16,
          padding: 22,
          transition: 'all 0.4s',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${t.accent}33, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, color: t.accent, letterSpacing: 1, marginBottom: 4 }}>
            {t.name.toUpperCase()}
          </div>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 18 }}>{t.desc}</div>

          {/* Mini app preview */}
          <div style={{
            background: t.surface,
            border: `1px solid ${t.accent}22`,
            borderRadius: 10,
            padding: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: t.accent }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>Daily challenge</div>
                <div style={{ fontSize: 9, color: '#64748b' }}>3 of 5 complete</div>
              </div>
              <div style={{ padding: '2px 8px', background: t.secondary + '22', color: t.secondary, fontSize: 10, borderRadius: 4, fontWeight: 600 }}>
                +50 XP
              </div>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ width: '60%', height: '100%', background: `linear-gradient(90deg, ${t.accent}, ${t.secondary})` }} />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ flex: 1, padding: 8, background: t.accent + '15', borderRadius: 6, fontSize: 10, color: t.accent, textAlign: 'center' }}>
                Cardiology
              </div>
              <div style={{ flex: 1, padding: 8, background: t.secondary + '15', borderRadius: 6, fontSize: 10, color: t.secondary, textAlign: 'center' }}>
                Pharm
              </div>
              <div style={{ flex: 1, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 6, fontSize: 10, color: '#64748b', textAlign: 'center' }}>
                Locked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 12. StatTicker ────────────────────────────────────────────────

export function StatTicker({ value, suffix = '', label, color = '#00e5a0' }: { value: number; suffix?: string; label: string; color?: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const start = Date.now();
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  const isDecimal = value % 1 !== 0;
  const formatted = isDecimal ? display.toFixed(1) : Math.floor(display).toLocaleString('en-US');

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 800, color, fontFamily: 'monospace', lineHeight: 1 }}>
        {formatted}<span style={{ fontSize: 22 }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{label}</div>
    </div>
  );
}
