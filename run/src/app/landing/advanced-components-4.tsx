'use client';

/**
 * MedQ landing — fourth batch of advanced components.
 *
 * File: /home/z/my-project/extracted/src/app/landing/advanced-components-4.tsx
 *
 * Exports:
 *   - LiveQuizArena         multiplayer-style live quiz with countdown timer + other players' answers
 *   - AICaseGenerator       type a topic → AI "generates" a case in real time (simulated streaming)
 *   - DnaHelix              rotating SVG DNA double helix with labeled bases
 *   - ExamCountdown         big countdown to user-picked exam date
 *   - StudyTimer            Pomodoro-style focus timer with progress ring
 *   - VoiceTutor            animated audio waveform when "speaking"
 *   - FlashcardDeck         swipeable 3D card deck with flip animation
 *   - ProgressConstellation star-map of mastered topics (constellation)
 *   - GlobeHeatmap          SVG world map with hotspots of student density
 *   - DailyChallenge        today's challenge widget with question preview
 *   - MentorMatchCard       swipeable mentor matching (Tinder-style)
 *   - SpacedRepetitionViz   visual of forgetting curve + spaced reviews
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Users, Radio, Zap, Clock, Calendar, Mic, Volume2, Brain,
  Sparkles, ArrowRight, ArrowLeft, RefreshCw, Play, Pause,
  RotateCw, Flame, Trophy, Medal, Crown, Star, MapPin, Globe2,
  TrendingUp, Activity, Heart, Award, Target, ChevronRight,
  ChevronLeft, ChevronUp, ChevronDown, X, Check, Plus, Minus,
  Dumbbell, GraduationCap, Stethoscope, Pill, Microscope, Dna,
  Atom, FlaskConical, BookOpen, Lightbulb, Wand2, Send, Timer,
  Hourglass, Bell, Bookmark, Share2, Eye, EyeOff, VolumeX,
  Maximize2, Settings, Sliders, Compass, Navigation, Pin, Flag,
  HeartPulse, Bone, Wind, Eye as EyeIcon,
} from 'lucide-react';

// ─── 1. LiveQuizArena ──────────────────────────────────────────────

const QUIZ_QUESTION = {
  q: 'A 24-year-old male presents with acute onset severe testicular pain. What is the most appropriate next step?',
  options: [
    'Prescribe antibiotics and follow up in 24h',
    'Immediate surgical exploration',
    'Outpatient ultrasound within 48h',
    'Reassurance and analgesia',
  ],
  correct: 1,
  explanation: 'Acute testicular pain in a young male = torsion until proven otherwise. Time-sensitive — surgical exploration within 6 hours.',
};

const FAKE_PLAYERS = [
  { name: 'Aisha', flag: '🇪🇬', picked: 3, time: 4.2 },
  { name: 'Kenji', flag: '🇯🇵', picked: 1, time: 6.8 },
  { name: 'Sofia', flag: '🇧🇷', picked: 1, time: 7.1 },
  { name: 'Marcus', flag: '🇺🇸', picked: 0, time: 8.9 },
  { name: 'Priya', flag: '🇮🇳', picked: 2, time: 11.4 },
  { name: 'Diego', flag: '🇪🇸', picked: 1, time: 12.6 },
];

export function LiveQuizArena() {
  const [phase, setPhase] = useState<'waiting' | 'live' | 'reveal'>('waiting');
  const [timeLeft, setTimeLeft] = useState(15);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealedPlayers, setRevealedPlayers] = useState(0);

  useEffect(() => {
    if (phase !== 'live') return;
    if (timeLeft <= 0) {
      setPhase('reveal');
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setRevealedPlayers(i);
      if (i >= FAKE_PLAYERS.length) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, [phase]);

  const start = () => {
    setPhase('live');
    setTimeLeft(15);
    setPicked(null);
    setRevealedPlayers(0);
  };

  const pct = (timeLeft / 15) * 100;
  const playerCounts = [0, 0, 0, 0];
  FAKE_PLAYERS.slice(0, revealedPlayers).forEach(p => { playerCounts[p.picked]++; });
  const totalRevealed = FAKE_PLAYERS.slice(0, revealedPlayers).length;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(0,229,160,0.06))',
        border: '1px solid rgba(139,92,246,0.25)',
        borderRadius: 20,
        padding: 28,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Live badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px',
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: 6,
            fontSize: 10, fontWeight: 700, color: '#fca5a5',
            letterSpacing: 1,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#ef4444',
              animation: 'live-pulse 1.5s ease-in-out infinite',
            }} />
            LIVE ARENA
          </span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>
            <Users size={11} style={{ display: 'inline', marginRight: 4 }} />
            127 playing
          </span>
        </div>
        {phase === 'live' && (
          <div style={{ fontSize: 13, color: '#fff', fontFamily: 'monospace', fontWeight: 700 }}>
            {timeLeft}s
          </div>
        )}
      </div>

      {/* Timer bar */}
      {phase === 'live' && (
        <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden', marginBottom: 18 }}>
          <div style={{
            width: `${pct}%`, height: '100%',
            background: pct > 30 ? 'linear-gradient(90deg, #00e5a0, #06b6d4)' : 'linear-gradient(90deg, #f59e0b, #ef4444)',
            transition: 'width 1s linear',
          }} />
        </div>
      )}

      {phase === 'waiting' && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
          <h3 style={{ fontSize: 20, color: '#fff', margin: '0 0 6px', fontWeight: 700 }}>
            Multiplayer quiz arena
          </h3>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 18px' }}>
            Compete live against medical students worldwide. 15 seconds. Fastest correct answer wins.
          </p>
          <button
            onClick={start}
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(90deg, #8b5cf6, #00e5a0)',
              border: 'none', borderRadius: 10,
              color: '#0a0e1a', fontSize: 14, fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Zap size={14} style={{ display: 'inline', marginRight: 6 }} />
            Join next round
          </button>
        </div>
      )}

      {(phase === 'live' || phase === 'reveal') && (
        <>
          <h3 style={{ fontSize: 15, color: '#fff', margin: '0 0 14px', lineHeight: 1.45, fontWeight: 600 }}>
            {QUIZ_QUESTION.q}
          </h3>
          <div style={{ display: 'grid', gap: 8, marginBottom: 18 }}>
            {QUIZ_QUESTION.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === QUIZ_QUESTION.correct;
              const showState = phase === 'reveal';
              const playerPct = totalRevealed > 0 ? Math.round((playerCounts[i] / totalRevealed) * 100) : 0;
              let bg = 'rgba(255,255,255,0.04)';
              let border = 'rgba(255,255,255,0.08)';
              let color = '#cbd5e1';
              if (showState && isCorrect) {
                bg = 'rgba(0,229,160,0.12)'; border = '#00e5a0'; color = '#00e5a0';
              } else if (showState && isPicked && !isCorrect) {
                bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#fca5a5';
              } else if (isPicked) {
                bg = 'rgba(139,92,246,0.12)'; border = '#8b5cf6'; color = '#a78bfa';
              }
              return (
                <button
                  key={i}
                  onClick={() => phase === 'live' && setPicked(i)}
                  disabled={phase === 'reveal'}
                  style={{
                    position: 'relative',
                    padding: '12px 16px',
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: 10,
                    color, fontSize: 13, fontWeight: 500,
                    cursor: phase === 'live' ? 'pointer' : 'default',
                    textAlign: 'left',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}
                >
                  {/* Player vote bar */}
                  {showState && playerPct > 0 && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      width: `${playerPct}%`,
                      background: isCorrect ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.04)',
                      transition: 'width 0.4s',
                    }} />
                  )}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{opt}</span>
                    {showState && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{playerPct}%</span>
                        {isCorrect && <Check size={14} />}
                        {isPicked && !isCorrect && <X size={14} />}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {/* Player reveals */}
          {phase === 'reveal' && (
            <div style={{
              padding: 14,
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
              marginBottom: 12,
            }}>
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, letterSpacing: 1 }}>
                OTHER PLAYERS' ANSWERS
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {FAKE_PLAYERS.slice(0, revealedPlayers).map((p, i) => (
                  <div key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 8px',
                    background: p.picked === QUIZ_QUESTION.correct ? 'rgba(0,229,160,0.1)' : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${p.picked === QUIZ_QUESTION.correct ? 'rgba(0,229,160,0.3)' : 'rgba(239,68,68,0.2)'}`,
                    borderRadius: 6, fontSize: 11,
                    color: p.picked === QUIZ_QUESTION.correct ? '#00e5a0' : '#fca5a5',
                    animation: 'reveal-in 0.3s ease',
                  }}>
                    {p.flag} {p.name} · {p.time}s
                  </div>
                ))}
              </div>
            </div>
          )}
          {phase === 'reveal' && (
            <>
              <div style={{
                padding: 12,
                background: 'rgba(0,229,160,0.05)',
                border: '1px solid rgba(0,229,160,0.2)',
                borderRadius: 10,
                fontSize: 12, color: '#cbd5e1', lineHeight: 1.5, marginBottom: 12,
              }}>
                <strong style={{ color: '#00e5a0' }}>Why: </strong>{QUIZ_QUESTION.explanation}
              </div>
              <button
                onClick={start}
                style={{
                  width: '100%', padding: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 10,
                  color: '#cbd5e1', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                <RefreshCw size={12} style={{ display: 'inline', marginRight: 6 }} />
                Play another round
              </button>
            </>
          )}
        </>
      )}
      <style jsx>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes reveal-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── 2. AICaseGenerator ────────────────────────────────────────────

const CASE_TEMPLATES: Record<string, string> = {
  'mi': 'A 58-year-old male presents to the ER with 2 hours of crushing substernal chest pain radiating to the left arm, associated with diaphoresis and nausea. He has a history of hypertension and a 30-pack-year smoking history.\n\nVitals: HR 102, BP 148/92, RR 22, SpO2 96% on RA.\nECG: ST elevation in leads II, III, aVF.\nTroponin: 0.8 ng/mL (ref <0.04).\n\nQuestions for the student:\n1. What is the diagnosis?\n2. Which artery is likely occluded?\n3. What is the immediate management?',
  'stroke': 'A 72-year-old female is brought by her daughter after being found unresponsive at home. On exam: GCS 8, right-sided hemiparesis, right facial droop, slurred speech. Onset was approximately 90 minutes ago.\n\nVitals: HR 88, BP 175/95, RR 14, SpO2 98%.\nCT head: No hemorrhage.\n\nQuestions for the student:\n1. What is the time-sensitive intervention?\n2. What are the contraindications to thrombolysis?\n3. Calculate her NIHSS score.',
  'sepsis': 'A 64-year-old male presents with fever, confusion, and rapid breathing. He was diagnosed with a UTI 3 days ago but did not complete his antibiotics.\n\nVitals: T 39.2°C, HR 124, BP 86/52, RR 28, SpO2 94%.\nLactate: 4.2 mmol/L.\nWBC: 18.5.\n\nQuestions for the student:\n1. Calculate qSOFA score.\n2. What is the Surviving Sepsis 1-hour bundle?\n3. What empiric antibiotics would you start?',
  'dka': 'A 19-year-old female with type 1 diabetes presents with vomiting, abdominal pain, and altered mental status. She ran out of insulin 2 days ago.\n\nVitals: HR 128, BP 102/64, RR 32 (deep and rapid).\nGlucose: 642 mg/dL.\nKetones: 5.2 mmol/L.\npH: 7.18, HCO3: 8.\n\nQuestions for the student:\n1. What is the diagnosis?\n2. What is the priority management?\n3. Why is potassium monitoring critical?',
};

const CASE_OPTIONS = [
  { id: 'mi', label: 'Acute MI', icon: HeartPulse, color: '#ef4444' },
  { id: 'stroke', label: 'Acute Stroke', icon: Brain, color: '#8b5cf6' },
  { id: 'sepsis', label: 'Sepsis', icon: Activity, color: '#06b6d4' },
  { id: 'dka', label: 'DKA', icon: FlaskConical, color: '#f59e0b' },
];

export function AICaseGenerator() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState('');
  const [pickedCase, setPickedCase] = useState<string | null>(null);

  const generate = (id: string) => {
    setPickedCase(id);
    setGenerating(true);
    setGenerated('');
    const fullText = CASE_TEMPLATES[id];
    let i = 0;
    const id2 = setInterval(() => {
      i += 4;
      setGenerated(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(id2);
        setGenerating(false);
      }
    }, 16);
  };

  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Wand2 size={18} style={{ color: '#8b5cf6' }} />
        <strong style={{ fontSize: 15, color: '#fff' }}>AI Case Generator</strong>
        <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', borderRadius: 4, fontWeight: 600 }}>
          BETA
        </span>
      </div>

      <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 14px', lineHeight: 1.5 }}>
        Pick a presentation. The AI generates a full clinical case in real time — vitals, labs, ECG findings, and 3 teaching questions.
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {CASE_OPTIONS.map(c => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => generate(c.id)}
              disabled={generating}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '6px 12px',
                background: pickedCase === c.id ? c.color + '22' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${pickedCase === c.id ? c.color : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 6,
                color: pickedCase === c.id ? c.color : '#94a3b8',
                fontSize: 11, fontWeight: 600, cursor: generating ? 'default' : 'pointer',
              }}
            >
              <Icon size={12} />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Output */}
      <div style={{
        background: '#000',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding: 16,
        minHeight: 240,
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#e8ecf4',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        position: 'relative',
      }}>
        {!pickedCase && (
          <div style={{ color: '#64748b', textAlign: 'center', paddingTop: 80 }}>
            Select a case type above to generate ↓
          </div>
        )}
        {pickedCase && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 10, color: '#64748b' }}>
              <Sparkles size={10} style={{ color: '#8b5cf6' }} />
              {generating ? 'Generating...' : 'Generated case'}
              {generating && (
                <span style={{
                  display: 'inline-block', width: 6, height: 13,
                  background: '#8b5cf6', marginLeft: 4,
                  animation: 'cursor-blink 1s step-end infinite',
                }} />
              )}
            </div>
            {generated}
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes cursor-blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

// ─── 3. DnaHelix ───────────────────────────────────────────────────

export function DnaHelix() {
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setRotation(r => r + 0.6);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const segments = 24;
  const height = 360;
  const width = 200;
  const baseColors = ['#00e5a0', '#8b5cf6', '#06b6d4', '#f59e0b'];

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(0,229,160,0.04), rgba(139,92,246,0.04))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 420,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 11, color: '#64748b', letterSpacing: 1 }}>
        DNA HELIX · CLICK TO ROTATE
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: 220, height: 'auto', cursor: 'pointer' }}
        onClick={() => setRotation(r => r + 90)}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const y = (i / segments) * height;
          const phase = (i / segments) * Math.PI * 4 + (rotation * Math.PI) / 180;
          // Round to 3 decimal places before passing to SVG attributes.
          // Without this, Node's V8 and the browser's V8 can stringify the
          // same float differently (e.g. "56.698729810778076" vs
          // "56.69872981077808"), which React 19 flags as a hydration
          // mismatch on x1/cx/r/opacity attributes.
          const round = (n: number) => Math.round(n * 1000) / 1000;
          const x1 = round(width / 2 + Math.sin(phase) * 50);
          const x2 = round(width / 2 - Math.sin(phase) * 50);
          const z1 = Math.cos(phase);
          const z2 = -Math.cos(phase);
          const r1 = round(5 + z1 * 2);
          const r2 = round(5 + z2 * 2);
          const opacity1 = round(0.5 + z1 * 0.5);
          const opacity2 = round(0.5 + z2 * 0.5);
          const baseColor = baseColors[i % baseColors.length];
          return (
            <g key={i}>
              {/* Rung */}
              <line
                x1={x1} y1={y} x2={x2} y2={y}
                stroke={baseColor}
                strokeWidth="1.5"
                opacity={round(Math.min(opacity1, opacity2) * 0.6)}
              />
              {/* Bead 1 */}
              <circle cx={x1} cy={y} r={r1} fill="#00e5a0" opacity={opacity1} />
              {/* Bead 2 */}
              <circle cx={x2} cy={y} r={r2} fill="#8b5cf6" opacity={opacity2} />
            </g>
          );
        })}
        {/* Center axis */}
        <line
          x1={width / 2} y1={0} x2={width / 2} y2={height}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 4"
        />
      </svg>
    </div>
  );
}

// ─── 4. ExamCountdown ──────────────────────────────────────────────

export function ExamCountdown() {
  // Use null initial state on both server and client, then populate in
  // useEffect. Previously this used `new Date()` and `Date.now()` inside
  // useState initializers, which produced different values on the server
  // (Node) vs client (browser) → hydration mismatch on the days/hours/mins
  // display. By deferring to useEffect, the SSR HTML and first client
  // render both show placeholder dashes, then real values appear after
  // mount.
  const [target, setTarget] = useState<string | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // Default target: 90 days from now
    const d = new Date();
    d.setDate(d.getDate() + 90);
    setTarget(d.toISOString().slice(0, 10));
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // While target/now are unset (SSR + first client paint), render
  // placeholder dashes so the layout doesn't shift.
  const targetMs = target ? new Date(target + 'T23:59:59').getTime() : 0;
  const diff = target && now ? Math.max(0, targetMs - now) : 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(239,68,68,0.06))',
        border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 20,
        padding: 28,
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
        <Calendar size={16} style={{ color: '#fbbf24' }} />
        <span style={{ fontSize: 11, color: '#fbbf24', letterSpacing: 1, fontWeight: 700 }}>
          EXAM COUNTDOWN
        </span>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 18 }}>
        Pick your exam date — we'll build a study plan around it.
      </div>

      {/* Big countdown */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
        {[
          { v: days, l: 'DAYS' },
          { v: hours, l: 'HRS' },
          { v: mins, l: 'MIN' },
          { v: secs, l: 'SEC' },
        ].map(({ v, l }) => (
          <div key={l} style={{
            minWidth: 60,
            padding: '12px 8px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
          }}>
            <div style={{
              fontSize: 28, fontWeight: 800, color: '#fff',
              fontFamily: 'monospace', lineHeight: 1,
            }}>
              {String(v).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 9, color: '#64748b', marginTop: 4, letterSpacing: 1 }}>
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* Date picker */}
      <label style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 12px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        fontSize: 12,
        color: '#cbd5e1',
      }}>
        <Calendar size={12} />
        <input
          type="date"
          value={target || ''}
          onChange={e => setTarget(e.target.value)}
          aria-label="Target exam date"
          style={{
            background: 'none', border: 'none', outline: 'none',
            color: '#fff', fontFamily: 'inherit', fontSize: 12,
            colorScheme: 'dark',
          }}
        />
      </label>

      {days > 0 && (
        <div style={{ marginTop: 14, fontSize: 12, color: '#cbd5e1' }}>
          That's <strong style={{ color: '#00e5a0' }}>{Math.ceil(days / 7)} weeks</strong> — about{' '}
          <strong style={{ color: '#00e5a0' }}>{Math.ceil(days * 1.5)} hours</strong> of focused study.
        </div>
      )}
    </div>
  );
}

// ─── 5. StudyTimer ─────────────────────────────────────────────────

export function StudyTimer() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const total = mode === 'focus' ? 25 * 60 : 5 * 60;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          // Mode switch
          if (mode === 'focus') {
            setSessions(n => n + 1);
            setMode('break');
            return 5 * 60;
          } else {
            setMode('focus');
            return 25 * 60;
          }
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const pct = ((total - secondsLeft) / total) * 100;
  const r = 90;
  const circ = 2 * Math.PI * r;

  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 28,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 11, color: mode === 'focus' ? '#00e5a0' : '#06b6d4', letterSpacing: 1, fontWeight: 700, marginBottom: 16 }}>
        {mode === 'focus' ? 'FOCUS TIME' : 'BREAK TIME'} · {sessions} SESSIONS DONE
      </div>

      {/* Progress ring */}
      <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto 18px' }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle cx="110" cy="110" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="110" cy="110" r={r} fill="none"
            stroke={mode === 'focus' ? '#00e5a0' : '#06b6d4'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ - (pct / 100) * circ}
            transform="rotate(-90 110 110)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: 'monospace', lineHeight: 1 }}>
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
            {mode === 'focus' ? 'Stay focused' : 'Take a breath'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        <button
          onClick={() => setRunning(r => !r)}
          style={{
            padding: '10px 22px',
            background: running ? 'rgba(239,68,68,0.15)' : 'linear-gradient(90deg, #00e5a0, #06b6d4)',
            border: 'none', borderRadius: 10,
            color: running ? '#fca5a5' : '#0a0e1a',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}
        >
          {running ? <><Pause size={14} style={{ display: 'inline', marginRight: 4 }} />Pause</> : <><Play size={14} style={{ display: 'inline', marginRight: 4 }} />Start</>}
        </button>
        <button
          onClick={() => { setRunning(false); setMode('focus'); setSecondsLeft(25 * 60); }}
          style={{
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: '#94a3b8', fontSize: 13, cursor: 'pointer',
          }}
        >
          <RefreshCw size={12} style={{ display: 'inline', marginRight: 4 }} />Reset
        </button>
      </div>
    </div>
  );
}

// ─── 6. VoiceTutor ─────────────────────────────────────────────────

export function VoiceTutor() {
  const [speaking, setSpeaking] = useState(false);
  const [bars] = useState(() => Array.from({ length: 28 }, () => 0));
  const [heights, setHeights] = useState<number[]>(bars);

  useEffect(() => {
    if (!speaking) {
      setHeights(bars);
      return;
    }
    const id = setInterval(() => {
      setHeights(Array.from({ length: 28 }, () => Math.random() * 0.8 + 0.2));
    }, 80);
    return () => clearInterval(id);
  }, [speaking]);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(0,229,160,0.05), rgba(139,92,246,0.05))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 28,
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
        <Mic size={16} style={{ color: '#00e5a0' }} />
        <span style={{ fontSize: 11, color: '#00e5a0', letterSpacing: 1, fontWeight: 700 }}>
          VOICE TUTOR · BETA
        </span>
      </div>
      <h3 style={{ fontSize: 18, color: '#fff', margin: '0 0 6px', fontWeight: 700 }}>
        Talk to your AI tutor out loud
      </h3>
      <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 18px' }}>
        Hands-free studying while you're at the gym, cooking, or commuting.
      </p>

      {/* Waveform */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
        height: 80, marginBottom: 18,
      }}>
        {heights.map((h, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: `${h * 100}%`,
              background: `linear-gradient(180deg, ${i % 3 === 0 ? '#00e5a0' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'}, ${i % 3 === 0 ? '#06b6d4' : '#00e5a0'})`,
              borderRadius: 2,
              transition: 'height 0.08s ease',
              opacity: speaking ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Mic button */}
      <button
        onClick={() => setSpeaking(s => !s)}
        style={{
          width: 64, height: 64, borderRadius: '50%',
          background: speaking ? 'rgba(239,68,68,0.2)' : 'linear-gradient(135deg, #00e5a0, #06b6d4)',
          border: speaking ? '2px solid #ef4444' : 'none',
          cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: speaking ? '0 0 0 8px rgba(239,68,68,0.15)' : '0 0 24px rgba(0,229,160,0.3)',
          transition: 'all 0.2s',
        }}
      >
        {speaking ? <VolumeX size={24} color="#fca5a5" /> : <Mic size={24} color="#0a0e1a" />}
      </button>
      <div style={{ marginTop: 12, fontSize: 11, color: '#64748b' }}>
        {speaking ? 'Listening... tap to stop' : 'Tap to ask a question'}
      </div>
    </div>
  );
}

// ─── 7. FlashcardDeck ──────────────────────────────────────────────

const FLASHCARDS = [
  { front: 'What ECG findings characterize hyperkalemia?', back: 'Peaked T waves → PR prolongation → QRS widening → sine wave → asystole. Treat with calcium gluconate, insulin+glucose, kayexalate.', topic: 'Cardiology', color: '#ef4444' },
  { front: 'Mechanism of action of metformin?', back: 'Activates AMPK → decreases hepatic gluconeogenesis → increases insulin sensitivity. Contraindicated in severe renal/hepatic disease due to lactic acidosis risk.', topic: 'Pharmacology', color: '#8b5cf6' },
  { front: 'What is the most common cause of acute pancreatitis?', back: 'Gallstones (40%) and alcohol (30%). Less common: hypertriglyceridemia, ERCP, drugs, trauma. Rx: aggressive IV fluids, pain control, NPO.', topic: 'GI', color: '#06b6d4' },
  { front: 'Define SIRS criteria.', back: '2+ of: T >38°C or <36°C, HR >90, RR >20 or PaCO2 <32, WBC >12k or <4k or >10% bands. Sepsis = SIRS + suspected infection.', topic: 'Critical Care', color: '#f59e0b' },
  { front: 'What is the Cushing reflex triad?', back: 'Hypertension (widened pulse pressure), bradycardia, irregular respirations. Indicates raised ICP — emergency! Treat with mannitol, hyperventilation, elevate head.', topic: 'Neurology', color: '#10b981' },
];

export function FlashcardDeck() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [animateDir, setAnimateDir] = useState<1 | -1>(1);

  const card = FLASHCARDS[idx];

  const next = () => {
    setAnimateDir(1);
    setFlipped(false);
    setTimeout(() => setIdx(i => (i + 1) % FLASHCARDS.length), 100);
  };
  const prev = () => {
    setAnimateDir(-1);
    setFlipped(false);
    setTimeout(() => setIdx(i => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length), 100);
  };

  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 28,
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: '#64748b', letterSpacing: 1 }}>
          CARD {idx + 1} / {FLASHCARDS.length}
        </span>
        <span style={{
          padding: '3px 10px', fontSize: 10, fontWeight: 600,
          background: card.color + '22', color: card.color, borderRadius: 4,
        }}>
          {card.topic}
        </span>
      </div>

      {/* Card */}
      <div
        key={idx}
        style={{
          perspective: '1000px',
          height: 280,
          marginBottom: 16,
          animation: `card-enter-${animateDir} 0.4s ease`,
        }}
      >
        <button
          onClick={() => setFlipped(f => !f)}
          style={{
            position: 'relative', width: '100%', height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            cursor: 'pointer',
            background: 'none', border: 'none', padding: 0,
          }}
        >
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${card.color}15, rgba(12,14,20,0.8))`,
            border: `1px solid ${card.color}33`,
            borderRadius: 16,
            padding: 24,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 10, color: card.color, letterSpacing: 1, marginBottom: 12, fontWeight: 700 }}>
              QUESTION
            </div>
            <p style={{ fontSize: 16, color: '#fff', lineHeight: 1.5, margin: 0 }}>
              {card.front}
            </p>
            <div style={{ position: 'absolute', bottom: 12, fontSize: 10, color: '#64748b' }}>
              tap to flip
            </div>
          </div>
          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${card.color}22, rgba(12,14,20,0.95))`,
            border: `1px solid ${card.color}55`,
            borderRadius: 16,
            padding: 24,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 10, color: card.color, letterSpacing: 1, marginBottom: 12, fontWeight: 700 }}>
              ANSWER
            </div>
            <p style={{ fontSize: 13, color: '#e8ecf4', lineHeight: 1.6, margin: 0, textAlign: 'left' }}>
              {card.back}
            </p>
          </div>
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <button
          onClick={prev}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#cbd5e1', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setFlipped(f => !f)}
          style={{
            padding: '0 22px', height: 44, borderRadius: 22,
            background: 'rgba(0,229,160,0.1)',
            border: '1px solid rgba(0,229,160,0.3)',
            color: '#00e5a0', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <RefreshCw size={12} style={{ display: 'inline', marginRight: 6 }} />
          Flip
        </button>
        <button
          onClick={next}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(0,229,160,0.1)',
            border: '1px solid rgba(0,229,160,0.3)',
            color: '#00e5a0', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <style jsx>{`
        @keyframes card-enter-1 {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes card-enter--1 {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── 8. ProgressConstellation ──────────────────────────────────────

const CONSTELLATION_STARS = [
  { x: 20, y: 30, size: 3, mastered: true, label: 'Cardio' },
  { x: 50, y: 18, size: 4, mastered: true, label: 'Pharm' },
  { x: 78, y: 28, size: 3, mastered: false, label: 'Renal' },
  { x: 30, y: 55, size: 3, mastered: true, label: 'Anatomy' },
  { x: 60, y: 50, size: 5, mastered: true, label: 'Patho' },
  { x: 85, y: 60, size: 3, mastered: false, label: 'Heme' },
  { x: 18, y: 78, size: 3, mastered: false, label: 'Endo' },
  { x: 45, y: 82, size: 4, mastered: true, label: 'Neuro' },
  { x: 70, y: 88, size: 3, mastered: false, label: 'Resp' },
];
const CONSTELLATION_LINKS: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [4, 5], [3, 6], [4, 7], [7, 6], [7, 8], [5, 8],
];

export function ProgressConstellation() {
  const [hovered, setHovered] = useState<number | null>(null);
  const masteredCount = CONSTELLATION_STARS.filter(s => s.mastered).length;
  const pct = Math.round((masteredCount / CONSTELLATION_STARS.length) * 100);

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(12,14,20,0.6))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Star size={14} style={{ color: '#fbbf24' }} />
          <strong style={{ fontSize: 13, color: '#fff' }}>Your mastery constellation</strong>
        </div>
        <span style={{ fontSize: 11, color: '#fbbf24', fontWeight: 700 }}>
          {pct}% MASTERED
        </span>
      </div>

      <div style={{ position: 'relative', height: 280 }}>
        {/* Twinkle background */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: 1.5, height: 1.5,
              borderRadius: '50%', background: '#fff',
              opacity: 0.2 + (i % 5) * 0.1,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          {/* Links */}
          {CONSTELLATION_LINKS.map(([a, b], i) => {
            const sa = CONSTELLATION_STARS[a];
            const sb = CONSTELLATION_STARS[b];
            const bothMastered = sa.mastered && sb.mastered;
            return (
              <line
                key={i}
                x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                stroke={bothMastered ? '#fbbf24' : 'rgba(255,255,255,0.06)'}
                strokeWidth={bothMastered ? 0.4 : 0.2}
                strokeDasharray={bothMastered ? '0' : '1 1'}
                opacity={bothMastered ? 0.5 : 0.3}
              />
            );
          })}
          {/* Stars */}
          {CONSTELLATION_STARS.map((s, i) => {
            const isHovered = hovered === i;
            return (
              <g key={i}>
                {s.mastered && (
                  <circle cx={s.x} cy={s.y} r={s.size + 2} fill="#fbbf24" opacity={0.2}>
                    <animate attributeName="r" values={`${s.size + 1};${s.size + 3};${s.size + 1}`} dur="3s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={s.x} cy={s.y} r={isHovered ? s.size + 0.8 : s.size}
                  fill={s.mastered ? '#fbbf24' : '#475569'}
                  stroke={s.mastered ? '#fef3c7' : '#64748b'}
                  strokeWidth="0.3"
                  style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
                {isHovered && (
                  <text x={s.x} y={s.y - s.size - 2} textAnchor="middle" fontSize="3" fill="#fff" fontWeight="600">
                    {s.label} {s.mastered ? '✓' : '○'}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
        <span>{masteredCount}/{CONSTELLATION_STARS.length} mastered</span>
        <span>{CONSTELLATION_STARS.length - masteredCount} to go</span>
      </div>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

// ─── 9. GlobeHeatmap ───────────────────────────────────────────────

const GLOBE_HOTSPOTS = [
  { x: 22, y: 38, size: 14, label: 'USA · 8.4k' },
  { x: 47, y: 32, size: 10, label: 'UK · 4.1k' },
  { x: 65, y: 45, size: 18, label: 'India · 12.7k' },
  { x: 73, y: 38, size: 8, label: 'China · 3.2k' },
  { x: 50, y: 50, size: 11, label: 'Egypt · 5.5k' },
  { x: 30, y: 65, size: 9, label: 'Brazil · 3.9k' },
  { x: 80, y: 70, size: 12, label: 'Australia · 5.8k' },
  { x: 52, y: 30, size: 7, label: 'Germany · 2.6k' },
  { x: 55, y: 60, size: 8, label: 'Nigeria · 3.1k' },
];

export function GlobeHeatmap() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(6,182,212,0.06), rgba(0,229,160,0.04))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Globe2 size={16} style={{ color: '#06b6d4' }} />
        <strong style={{ fontSize: 13, color: '#fff' }}>52,000+ students worldwide</strong>
      </div>
      <div style={{ position: 'relative' }}>
        <svg viewBox="0 0 100 70" style={{ width: '100%', height: 'auto' }}>
          {/* World silhouette (simplified) */}
          <path
            d="M 5 30 Q 12 22 22 25 Q 32 20 40 28 Q 48 22 55 28 Q 62 24 70 30 Q 80 25 88 32 Q 95 35 95 45 Q 88 52 80 50 Q 70 55 60 52 Q 50 56 40 53 Q 30 58 20 55 Q 10 52 5 45 Z"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.3"
          />
          {/* Latitude/longitude lines */}
          {[15, 30, 45, 60].map(y => (
            <line key={`lat-${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" strokeDasharray="0.5 0.5" />
          ))}
          {[20, 40, 60, 80].map(x => (
            <line key={`lng-${x}`} x1={x} y1="0" x2={x} y2="70" stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" strokeDasharray="0.5 0.5" />
          ))}
          {/* Hotspots */}
          {GLOBE_HOTSPOTS.map((h, i) => (
            <g key={i}>
              <circle cx={h.x} cy={h.y} r={h.size / 4} fill="#06b6d4" opacity="0.15">
                <animate attributeName="r" values={`${h.size / 4};${h.size / 3};${h.size / 4}`} dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={h.x} cy={h.y} r={h.size / 8}
                fill={hovered === i ? '#00e5a0' : '#06b6d4'}
                style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
              {hovered === i && (
                <text x={h.x} y={h.y - h.size / 6} textAnchor="middle" fontSize="2.5" fill="#fff" fontWeight="600">
                  {h.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: '#64748b' }}>
        <span>80+ countries</span>
        <span>4 continents</span>
        <span>Always-on community</span>
      </div>
    </div>
  );
}

// ─── 10. DailyChallenge ────────────────────────────────────────────

const DAILY_CHALLENGE = {
  topic: 'Cardiology',
  difficulty: 'Medium',
  xp: 50,
  streak: 12,
  question: 'A 68-year-old male presents with syncope. ECG shows widened QRS complexes and tall peaked T waves. Most likely electrolyte abnormality?',
  options: ['Hypercalcemia', 'Hypokalemia', 'Hyperkalemia', 'Hypermagnesemia'],
  correct: 2,
  explanation: 'Peaked T waves + widened QRS = hyperkalemia. Emergency: calcium gluconate, insulin+glucose, kayexalate.',
};

export function DailyChallenge() {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === DAILY_CHALLENGE.correct;
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(0,229,160,0.04))',
        border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 20,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Streak flame */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Flame size={16} style={{ color: '#fbbf24' }} />
            <strong style={{ fontSize: 13, color: '#fff' }}>Today's challenge</strong>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 10px',
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 6,
            fontSize: 11, color: '#fbbf24', fontWeight: 700,
          }}>
            <Flame size={10} /> {DAILY_CHALLENGE.streak}-day streak
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span style={{ padding: '2px 8px', background: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontSize: 10, fontWeight: 600, borderRadius: 4 }}>
            {DAILY_CHALLENGE.topic}
          </span>
          <span style={{ padding: '2px 8px', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontSize: 10, fontWeight: 600, borderRadius: 4 }}>
            {DAILY_CHALLENGE.difficulty}
          </span>
          <span style={{ padding: '2px 8px', background: 'rgba(0,229,160,0.15)', color: '#00e5a0', fontSize: 10, fontWeight: 600, borderRadius: 4 }}>
            +{DAILY_CHALLENGE.xp} XP
          </span>
        </div>

        <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.5, marginBottom: 14, margin: 0 }}>
          {DAILY_CHALLENGE.question}
        </p>

        <div style={{ display: 'grid', gap: 6 }}>
          {DAILY_CHALLENGE.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = i === DAILY_CHALLENGE.correct;
            const show = picked !== null;
            let bg = 'rgba(255,255,255,0.04)';
            let border = 'rgba(255,255,255,0.08)';
            let color = '#cbd5e1';
            if (show && isCorrect) { bg = 'rgba(0,229,160,0.12)'; border = '#00e5a0'; color = '#00e5a0'; }
            else if (show && isPicked) { bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#fca5a5'; }
            return (
              <button
                key={i}
                onClick={() => picked === null && setPicked(i)}
                style={{
                  padding: '10px 14px',
                  background: bg, border: `1px solid ${border}`,
                  borderRadius: 8,
                  color, fontSize: 12, fontWeight: 500,
                  cursor: picked === null ? 'pointer' : 'default',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div style={{
            marginTop: 12, padding: 12,
            background: correct ? 'rgba(0,229,160,0.05)' : 'rgba(239,68,68,0.05)',
            border: `1px solid ${correct ? 'rgba(0,229,160,0.2)' : 'rgba(239,68,68,0.2)'}`,
            borderRadius: 10,
            fontSize: 12, color: '#cbd5e1', lineHeight: 1.5,
          }}>
            <strong style={{ color: correct ? '#00e5a0' : '#fca5a5' }}>
              {correct ? 'Correct! +50 XP · Streak continues 🔥' : 'Not quite.'}
            </strong>
            <br />
            {DAILY_CHALLENGE.explanation}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 11. MentorMatchCard ───────────────────────────────────────────

const MENTORS = [
  { name: 'Dr. Sarah Chen', specialty: 'Internal Medicine · Cardiology', exp: 'PGY-4 · Harvard', color: '#ef4444', match: 96, expertise: ['Arrhythmias', 'Cath lab', 'Board prep'], avatar: 'SC' },
  { name: 'Dr. Raj Patel', specialty: 'Emergency Medicine', exp: 'PGY-3 · Hopkins', color: '#06b6d4', match: 92, expertise: ['Trauma', 'Resus', 'Ultrasound'], avatar: 'RP' },
  { name: 'Dr. Maria Rodriguez', specialty: 'Pediatrics · Neonatology', exp: 'Attending · Stanford', color: '#8b5cf6', match: 88, expertise: ['NICU', 'Developmental', 'OSCE'], avatar: 'MR' },
];

export function MentorMatchCard() {
  const [idx, setIdx] = useState(0);
  const [animateDir, setAnimateDir] = useState<'pass' | 'like' | null>(null);
  const m = MENTORS[idx];

  const act = (action: 'pass' | 'like') => {
    setAnimateDir(action);
    setTimeout(() => {
      setIdx(i => (i + 1) % MENTORS.length);
      setAnimateDir(null);
    }, 300);
  };

  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, justifyContent: 'center' }}>
        <Users size={14} style={{ color: '#ec4899' }} />
        <strong style={{ fontSize: 13, color: '#fff' }}>Find your mentor</strong>
      </div>

      <div style={{ position: 'relative', height: 340 }}>
        <div
          key={idx}
          style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, ${m.color}15, rgba(12,14,20,0.95))`,
            border: `1px solid ${m.color}33`,
            borderRadius: 16,
            padding: 22,
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            transform: animateDir === 'like' ? 'translateX(120%) rotate(15deg)' :
                       animateDir === 'pass' ? 'translateX(-120%) rotate(-15deg)' : 'translateX(0)',
            opacity: animateDir ? 0 : 1,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: `linear-gradient(135deg, ${m.color}, ${m.color}80)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 800, color: '#0a0e1a',
            marginBottom: 14, border: `3px solid ${m.color}55`,
          }}>
            {m.avatar}
          </div>

          {/* Match badge */}
          <div style={{
            position: 'absolute', top: 14, right: 14,
            padding: '3px 8px',
            background: 'rgba(0,229,160,0.15)',
            border: '1px solid rgba(0,229,160,0.3)',
            borderRadius: 6,
            fontSize: 10, fontWeight: 700, color: '#00e5a0',
          }}>
            {m.match}% MATCH
          </div>

          <p style={{ fontSize: 16, color: '#fff', margin: '0 0 4px', fontWeight: 700 }}>{m.name}</p>
          <div style={{ fontSize: 12, color: m.color, fontWeight: 600, marginBottom: 4 }}>{m.specialty}</div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 14 }}>{m.exp}</div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'auto' }}>
            {m.expertise.map(e => (
              <span key={e} style={{
                padding: '3px 8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4, fontSize: 10, color: '#cbd5e1',
              }}>
                {e}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
            <button
              onClick={() => act('pass')}
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(239,68,68,0.1)',
                border: '2px solid rgba(239,68,68,0.3)',
                color: '#fca5a5', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={22} />
            </button>
            <button
              onClick={() => act('like')}
              style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(0,229,160,0.15)',
                border: '2px solid rgba(0,229,160,0.4)',
                color: '#00e5a0', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Heart size={22} fill="#00e5a0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 12. SpacedRepetitionViz ───────────────────────────────────────

export function SpacedRepetitionViz() {
  // Forgetting curve: y = e^(-t/S) where S = stability
  // Reviews increase S, flattening the curve
  const days = 30;
  const reviews = [1, 3, 7, 14, 28]; // days where review happens

  const curve = (stability: number) => {
    return Array.from({ length: days + 1 }, (_, d) => {
      return Math.exp(-d / stability) * 100;
    });
  };

  // Simulated: after each review, stability doubles
  const stabilities = [1.5, 3, 6, 12, 24, 48];
  const paths = stabilities.map((s, i) => {
    const c = curve(s);
    // Round to 4 decimal places before joining — without this, Node V8
    // and browser V8 stringify the same float differently in the
    // polyline `points` attribute (e.g. "...5772" vs "...5786"), which
    // React 19 flags as a hydration mismatch.
    const round = (n: number) => Math.round(n * 10000) / 10000;
    const points = c.map((v, d) => `${round((d / days) * 100)},${round(100 - v * 0.8 - 10)}`).join(' ');
    return { points, color: ['#ef4444', '#f59e0b', '#06b6d4', '#00e5a0', '#8b5cf6', '#fbbf24'][i], label: `After review ${i}` };
  });

  return (
    <div
      style={{
        background: 'rgba(12,14,20,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Brain size={16} style={{ color: '#8b5cf6' }} />
        <strong style={{ fontSize: 13, color: '#fff' }}>Spaced repetition in action</strong>
      </div>

      <svg viewBox="0 0 100 100" style={{ width: '100%', height: 200 }}>
        {/* Grid */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" />
        ))}
        {/* Reviews markers */}
        {reviews.map((d, i) => (
          <g key={d}>
            <line
              x1={(d / days) * 100} y1="0"
              x2={(d / days) * 100} y2="100"
              stroke="rgba(0,229,160,0.2)"
              strokeWidth="0.3"
              strokeDasharray="1 1"
            />
            <text x={(d / days) * 100} y="98" textAnchor="middle" fontSize="2.5" fill="#64748b">
              Day {d}
            </text>
          </g>
        ))}
        {/* Curves */}
        {paths.map((p, i) => (
          <polyline
            key={i}
            points={p.points}
            fill="none"
            stroke={p.color}
            strokeWidth={i === paths.length - 1 ? 0.8 : 0.5}
            opacity={0.4 + i * 0.12}
          />
        ))}
        {/* Y-axis labels */}
        <text x="2" y="15" fontSize="3" fill="#64748b">100%</text>
        <text x="2" y="55" fontSize="3" fill="#64748b">50%</text>
        <text x="2" y="95" fontSize="3" fill="#64748b">0%</text>
        <text x="50" y="5" textAnchor="middle" fontSize="3" fill="#94a3b8" fontWeight="600">
          Memory retention over 30 days
        </text>
      </svg>

      <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55, margin: '12px 0 0' }}>
        Each review <strong style={{ color: '#00e5a0' }}>doubles the memory's stability</strong>. After 5 reviews,
        you'll remember a fact for <strong style={{ color: '#00e5a0' }}>months</strong> without re-studying.
        MedQ schedules these reviews automatically.
      </p>
    </div>
  );
}
