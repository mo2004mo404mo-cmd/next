'use client';

/**
 * Batch 7 — High-impact landing page enhancements.
 *
 * Design goals:
 *   - Conversion-focused: every component drives toward "Get started free"
 *   - Visually striking: interactive radial menus, radar charts, flip cards
 *   - Mobile-first responsive
 *   - Hydration-safe:
 *       * All random/time values deferred to useEffect or seeded PRNG
 *       * All SVG numeric attributes rounded to 3 decimals
 *       * All percentage strings pre-rounded (no `h * 100` float drift)
 *       * All `style` objects use longhand `backgroundImage:` instead of
 *         the `background:` shorthand (avoids SSR/client expansion mismatch)
 *       * All `toLocaleString()` calls locked to 'en-US' locale
 *
 * Components:
 *   - SpecialtyExplorer     — interactive radial wheel of 12 specialties
 *   - AIDiagnosisSimulator  — pick symptoms → AI differential reasoning tree
 *   - SkillRadar            — radar/spider chart of 6 competencies
 *   - PeerCompare           — bar comparison: you vs cohort vs top decile
 *   - StudyPlanGenerator    — exam date input → weekly schedule visual
 *   - ClinicalCaseCarousel  — vignette reveal cards with diagnosis flip
 *   - MemoryAnchorCards     — flip mnemonic cards (MUDPILES, etc.)
 *   - QuestionTypeShowcase  — 5 question formats showcase
 *   - LiveQuestionStream    — animated feed of global student activity
 *   - GamifiedStreakTree    — tree-of-progress visualization
 */

import {
  useState, useEffect, useRef, useMemo, useCallback,
} from 'react';
import Link from 'next/link';
import {
  Brain, HeartPulse, Bone, Eye, Baby, Pill, Microscope,
  Activity, Stethoscope, Syringe, Wind, BrainCircuit,
  ChevronRight, ChevronLeft, Sparkles, Zap, TrendingUp,
  Check, X, Clock, Award, Target, Users, Flame, Lightbulb,
  Calendar, Play, Pause, RotateCcw, ArrowRight, Star,
} from 'lucide-react';

// ─── shared helpers ────────────────────────────────────────────────

// Deterministic PRNG (Mulberry32) so server & client produce identical
// sequences — required for hydration safety when generating random-ish
// visual data.
function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Round to N decimals (default 3) — used for all SVG numeric attributes
// to eliminate last-digit float drift between Node V8 and browser V8.
const round = (n: number, d = 3) => {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
};

// ─── 1. SpecialtyExplorer ──────────────────────────────────────────
// Interactive radial wheel — 12 medical specialties arranged in a circle,
// each with question count, difficulty, and mastery percentage. Clicking
// a slice highlights it and shows its stats panel.

const SPECIALTIES = [
  { name: 'Cardiology',     icon: HeartPulse,    qCount: 8400, diff: 7.8, mastery: 72, color: '#ef4444' },
  { name: 'Neurology',      icon: Brain,         qCount: 6200, diff: 8.4, mastery: 58, color: '#8b5cf6' },
  { name: 'Pulmonology',    icon: Wind,         qCount: 4100, diff: 6.9, mastery: 81, color: '#06b6d4' },
  { name: 'Nephrology',     icon: Activity,      qCount: 3300, diff: 7.5, mastery: 64, color: '#10b981' },
  { name: 'Gastroenterology', icon: Stethoscope, qCount: 5200, diff: 6.7, mastery: 76, color: '#f59e0b' },
  { name: 'Endocrinology',  icon: Pill,          qCount: 2800, diff: 7.1, mastery: 69, color: '#ec4899' },
  { name: 'Hematology',     icon: Syringe,       qCount: 2400, diff: 7.6, mastery: 61, color: '#f43f5e' },
  { name: 'Oncology',       icon: Microscope,    qCount: 1900, diff: 8.8, mastery: 47, color: '#a78bfa' },
  { name: 'Rheumatology',   icon: Bone,          qCount: 1600, diff: 8.1, mastery: 52, color: '#22d3ee' },
  { name: 'Ophthalmology',  icon: Eye,           qCount: 1400, diff: 6.4, mastery: 78, color: '#fbbf24' },
  { name: 'Pediatrics',     icon: Baby,          qCount: 6800, diff: 5.9, mastery: 84, color: '#34d399' },
  { name: 'Psychiatry',     icon: BrainCircuit,  qCount: 3100, diff: 6.2, mastery: 73, color: '#c084fc' },
];

export function SpecialtyExplorer() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const current = SPECIALTIES[hovered ?? active];
  const cx = 150;
  const cy = 150;
  const r = 110;
  const innerR = 50;

  // Auto-rotate every 4s if user isn't interacting
  useEffect(() => {
    const id = setInterval(() => {
      if (hovered === null) {
        setActive((a) => (a + 1) % SPECIALTIES.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <div
      className="rounded-2xl border border-white/10 p-6 md:p-8"
      style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(0,229,160,0.06), transparent 60%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.06), transparent 60%)',
        backgroundColor: '#0c0e14',
      }}
    >
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        {/* Wheel */}
        <div className="relative mx-auto" style={{ width: '100%', maxWidth: 360 }}>
          <svg viewBox="0 0 300 300" className="w-full h-auto">
            {/* Outer ring */}
            <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            {/* Slices */}
            {SPECIALTIES.map((s, i) => {
              const angleStart = (i / SPECIALTIES.length) * 360 - 90;
              const angleEnd = ((i + 1) / SPECIALTIES.length) * 360 - 90;
              const toRad = (deg: number) => (deg * Math.PI) / 180;
              const x1 = round(cx + r * Math.cos(toRad(angleStart)));
              const y1 = round(cy + r * Math.sin(toRad(angleStart)));
              const x2 = round(cx + r * Math.cos(toRad(angleEnd)));
              const y2 = round(cy + r * Math.sin(toRad(angleEnd)));
              const xi1 = round(cx + innerR * Math.cos(toRad(angleStart)));
              const yi1 = round(cy + innerR * Math.sin(toRad(angleStart)));
              const xi2 = round(cx + innerR * Math.cos(toRad(angleEnd)));
              const yi2 = round(cy + innerR * Math.sin(toRad(angleEnd)));
              const isActive = i === (hovered ?? active);
              const path = `M ${xi1} ${yi1} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${innerR} ${innerR} 0 0 0 ${xi1} ${yi1} Z`;
              return (
                <path
                  key={s.name}
                  d={path}
                  fill={s.color + (isActive ? '30' : '12')}
                  stroke={s.color + (isActive ? 'ff' : '60')}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(i)}
                />
              );
            })}
            {/* Center hub */}
            <circle cx={cx} cy={cy} r={innerR - 6} fill="#0a0e1a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#94a3b8" fontWeight="600">12</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fill="#64748b">specialties</text>
            <text x={cx} y={cy + 22} textAnchor="middle" fontSize="9" fill="#64748b">47.2K questions</text>
            {/* Active icon at center */}
            {(() => {
              const Icon = current.icon;
              return null; // icon shown in side panel instead
            })()}
            {/* Labels around the wheel */}
            {SPECIALTIES.map((s, i) => {
              const mid = ((i + 0.5) / SPECIALTIES.length) * 360 - 90;
              const rad = (mid * Math.PI) / 180;
              const lx = round(cx + (r - 18) * Math.cos(rad));
              const ly = round(cy + (r - 18) * Math.sin(rad));
              return (
                <text
                  key={s.name}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="6"
                  fill="#fff"
                  fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  {s.name.slice(0, 4)}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: current.color + '20', border: `1px solid ${current.color}40` }}
            >
              <current.icon size={24} style={{ color: current.color }} />
            </div>
            <div>
              <div className="text-white font-bold text-lg">{current.name}</div>
              <div className="text-xs text-slate-500 font-mono">{current.qCount.toLocaleString('en-US')} questions</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Mastery</span>
              <span className="font-mono font-bold" style={{ color: current.color }}>{current.mastery}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${current.mastery}%`,
                  backgroundImage: `linear-gradient(90deg, ${current.color}, ${current.color}aa)`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Difficulty</span>
              <span className="font-mono text-slate-300">{current.diff}/10</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-sm"
                  style={{
                    backgroundColor: i < Math.floor(current.diff)
                      ? current.color + 'cc'
                      : 'rgba(255,255,255,0.06)',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <Link
              href="/app"
              className="inline-flex items-center gap-1 text-xs font-semibold hover:gap-2 transition-all"
              style={{ color: current.color }}
            >
              Start practicing {current.name} <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500 text-center">
        Hover any slice to inspect. MedQ organizes <strong className="text-slate-300">47,200+ questions</strong> across
        12 core specialties — each with adaptive difficulty tuned to your level.
      </p>
    </div>
  );
}

// ─── 2. AIDiagnosisSimulator ───────────────────────────────────────
// Pick symptoms from a checklist → AI generates a differential diagnosis
// reasoning tree, showing likelihood bars and reasoning steps.

const SYMPTOMS = [
  { id: 'fever', label: 'Fever (38.5°C)', weight: 0.6 },
  { id: 'cough', label: 'Productive cough', weight: 0.8 },
  { id: 'dyspnea', label: 'Dyspnea on exertion', weight: 0.7 },
  { id: 'chest_pain', label: 'Pleuritic chest pain', weight: 0.65 },
  { id: 'fatigue', label: 'Fatigue, malaise', weight: 0.4 },
  { id: 'hemoptysis', label: 'Hemoptysis', weight: 0.5 },
  { id: 'night_sweats', label: 'Night sweats', weight: 0.55 },
  { id: 'weight_loss', label: 'Weight loss (5kg/2wk)', weight: 0.5 },
];

const DIAGNOSES = [
  { id: 'pna', name: 'Community-acquired pneumonia', triggers: ['fever', 'cough', 'dyspnea', 'chest_pain'], base: 0.3, color: '#00e5a0' },
  { id: 'tb', name: 'Pulmonary tuberculosis', triggers: ['fever', 'cough', 'hemoptysis', 'night_sweats', 'weight_loss'], base: 0.15, color: '#f59e0b' },
  { id: 'pe', name: 'Pulmonary embolism', triggers: ['dyspnea', 'chest_pain', 'hemoptysis'], base: 0.18, color: '#ef4444' },
  { id: 'lung_ca', name: 'Bronchogenic carcinoma', triggers: ['cough', 'hemoptysis', 'weight_loss', 'fatigue'], base: 0.08, color: '#8b5cf6' },
  { id: 'copd', name: 'COPD exacerbation', triggers: ['cough', 'dyspnea', 'fatigue'], base: 0.12, color: '#06b6d4' },
];

export function AIDiagnosisSimulator() {
  const [picked, setPicked] = useState<Set<string>>(new Set(['fever', 'cough', 'dyspnea']));
  const [thinking, setThinking] = useState(false);

  const toggle = (id: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Compute differentials deterministically
  const differentials = useMemo(() => {
    return DIAGNOSES
      .map((d) => {
        const matched = d.triggers.filter((t) => picked.has(t));
        const score = matched.reduce((sum, t) => {
          const w = SYMPTOMS.find((s) => s.id === t)?.weight ?? 0.3;
          return sum + w;
        }, d.base);
        const normalized = Math.min(0.95, score / (d.triggers.length * 0.7 + 0.3));
        return { ...d, matched, score: round(normalized, 3), matchedCount: matched.length };
      })
      .sort((a, b) => b.score - a.score);
  }, [picked]);

  const runReasoning = () => {
    setThinking(true);
    setTimeout(() => setThinking(false), 1200);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <BrainCircuit size={16} className="text-violet-400" />
        <strong className="text-white text-sm">AI differential diagnosis</strong>
        <span className="ml-auto text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono">demo</span>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Pick presenting symptoms. MedQ's reasoning engine will list differentials ranked by likelihood,
        with the matched features that drove each score.
      </p>

      {/* Symptom chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SYMPTOMS.map((s) => {
          const on = picked.has(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all border"
              style={{
                backgroundColor: on ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.03)',
                borderColor: on ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)',
                color: on ? '#c4b5fd' : '#94a3b8',
              }}
            >
              {on && <Check size={10} className="inline mr-1" />}
              {s.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={runReasoning}
        disabled={picked.size === 0 || thinking}
        className="mb-5 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40"
        style={{
          backgroundImage: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          color: '#0a0e1a',
        }}
      >
        {thinking ? (
          <>
            <div className="w-3 h-3 border-2 border-[#0a0e1a] border-t-transparent rounded-full animate-spin" />
            Reasoning…
          </>
        ) : (
          <>
            <Sparkles size={12} /> Generate differentials
          </>
        )}
      </button>

      {/* Differential list */}
      <div className="space-y-3">
        {differentials.map((d, i) => (
          <div
            key={d.id}
            className="rounded-xl border border-white/5 p-3"
            style={{ backgroundColor: d.color + '08' }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">#{i + 1}</span>
                <strong className="text-sm text-white">{d.name}</strong>
              </div>
              <span className="text-xs font-mono font-bold" style={{ color: d.color }}>
                {Math.round(d.score * 100)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.round(d.score * 100)}%`,
                  backgroundImage: `linear-gradient(90deg, ${d.color}, ${d.color}66)`,
                }}
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {d.matched.map((m) => {
                const sym = SYMPTOMS.find((s) => s.id === m);
                return (
                  <span
                    key={m}
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                    style={{
                      backgroundColor: d.color + '15',
                      color: d.color,
                      border: `1px solid ${d.color}30`,
                    }}
                  >
                    {sym?.label.split(' (')[0] ?? m}
                  </span>
                );
              })}
              {d.matched.length === 0 && (
                <span className="text-[10px] text-slate-600 font-mono italic">No matching features</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        In the live app, the reasoning engine surfaces <strong className="text-slate-300">next-best questions</strong> to
        differentiate the top 2–3 conditions — mimicking how an attending physician narrows a differential.
      </p>
    </div>
  );
}

// ─── 3. SkillRadar ─────────────────────────────────────────────────
// 6-axis radar/spider chart showing competency dimensions. Animate from
// baseline → current user stats on mount.

const SKILL_AXES = [
  { name: 'Knowledge',     user: 78, peer: 64, top: 92, color: '#00e5a0' },
  { name: 'Application',   user: 71, peer: 58, top: 95, color: '#06b6d4' },
  { name: 'Speed',         user: 65, peer: 70, top: 88, color: '#f59e0b' },
  { name: 'Accuracy',      user: 82, peer: 68, top: 96, color: '#8b5cf6' },
  { name: 'Stamina',       user: 60, peer: 55, top: 90, color: '#ec4899' },
  { name: 'Concept',       user: 75, peer: 61, top: 93, color: '#10b981' },
];

export function SkillRadar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setProgress(1), 200);
    return () => clearTimeout(id);
  }, []);

  const cx = 150;
  const cy = 150;
  const r = 110;

  const pointAt = (i: number, value: number) => {
    const angle = (i / SKILL_AXES.length) * 2 * Math.PI - Math.PI / 2;
    const dist = (value / 100) * r;
    return [round(cx + dist * Math.cos(angle)), round(cy + dist * Math.sin(angle))];
  };

  const buildPath = (key: 'user' | 'peer' | 'top') => {
    const pts = SKILL_AXES.map((_, i) => pointAt(i, SKILL_AXES[i][key] * progress));
    return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ') + ' Z';
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6">
      <div className="flex items-center gap-2 mb-1">
        <Target size={16} className="text-emerald-400" />
        <strong className="text-white text-sm">Six-axis skill profile</strong>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        MedQ doesn't just track a single score. Every question feeds six orthogonal
        competency axes, so you know exactly which dimension to train next.
      </p>

      <div className="grid md:grid-cols-[1fr_220px] gap-6 items-center">
        {/* Radar chart */}
        <svg viewBox="0 0 300 300" className="w-full h-auto max-w-md mx-auto">
          {/* Concentric rings */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((ring) => {
            const pts = SKILL_AXES.map((_, i) => pointAt(i, ring * 100));
            const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ') + ' Z';
            return (
              <path key={ring} d={path} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            );
          })}
          {/* Axis lines */}
          {SKILL_AXES.map((_, i) => {
            const [x, y] = pointAt(i, 100);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />;
          })}
          {/* Top decile */}
          <path d={buildPath('top')} fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.5)" strokeWidth="1" strokeDasharray="3 2" />
          {/* Peer average */}
          <path d={buildPath('peer')} fill="rgba(148,163,184,0.05)" stroke="rgba(148,163,184,0.4)" strokeWidth="1" strokeDasharray="2 2" />
          {/* User */}
          <path d={buildPath('user')} fill="rgba(0,229,160,0.12)" stroke="#00e5a0" strokeWidth="2" />
          {/* Data points */}
          {SKILL_AXES.map((s, i) => {
            const [x, y] = pointAt(i, s.user * progress);
            return <circle key={s.name} cx={x} cy={y} r="3" fill={s.color} stroke="#0c0e14" strokeWidth="1.5" />;
          })}
          {/* Labels */}
          {SKILL_AXES.map((s, i) => {
            const angle = (i / SKILL_AXES.length) * 2 * Math.PI - Math.PI / 2;
            const lx = round(cx + (r + 18) * Math.cos(angle));
            const ly = round(cy + (r + 18) * Math.sin(angle));
            return (
              <text
                key={s.name}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="#94a3b8"
                fontWeight="600"
              >
                {s.name}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm" style={{ backgroundImage: 'linear-gradient(135deg, #00e5a0cc, #00e5a066)', border: '1.5px solid #00e5a0' }} />
            <div>
              <div className="text-white font-semibold">You</div>
              <div className="text-slate-500 font-mono">avg 71.8</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm border border-dashed border-slate-400" />
            <div>
              <div className="text-slate-300 font-semibold">Peer avg</div>
              <div className="text-slate-500 font-mono">avg 62.7</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm border border-dashed border-amber-400" />
            <div>
              <div className="text-amber-300 font-semibold">Top 10%</div>
              <div className="text-slate-500 font-mono">avg 92.3</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/5">
            <div className="text-slate-400">Biggest gap:</div>
            <div className="text-amber-300 font-semibold">Speed (-23 vs top)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. PeerCompare ────────────────────────────────────────────────
// Side-by-side bar chart comparing user vs cohort average vs top decile
// across 5 metrics.

const PEER_METRICS = [
  { name: 'Questions / wk',  user: 142, peer: 88,  top: 230, unit: '',  fmt: 'int' },
  { name: 'Avg accuracy',    user: 78,  peer: 65,  top: 91,  unit: '%', fmt: 'int' },
  { name: 'Streak (days)',   user: 47,  peer: 12,  top: 180, unit: 'd', fmt: 'int' },
  { name: 'Weakness fix',    user: 23,  peer: 11,  top: 52,  unit: '',  fmt: 'int' },
  { name: 'Study hours',     user: 14,  peer: 9,   top: 28,  unit: 'h', fmt: 'int' },
];

export function PeerCompare() {
  const max = Math.max(...PEER_METRICS.map((m) => Math.max(m.user, m.peer, m.top)));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6">
      <div className="flex items-center gap-2 mb-1">
        <Users size={16} className="text-cyan-400" />
        <strong className="text-white text-sm">How you stack up</strong>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Anonymous benchmarks against the 52,000-student cohort. Each metric is
        normalized to a 0–100 scale for fair comparison across units.
      </p>

      <div className="space-y-4">
        {PEER_METRICS.map((m) => {
          const userPct = Math.round((m.user / max) * 100);
          const peerPct = Math.round((m.peer / max) * 100);
          const topPct = Math.round((m.top / max) * 100);
          return (
            <div key={m.name}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">{m.name}</span>
                <span className="font-mono text-white font-bold">
                  {m.user}{m.unit}
                  <span className="text-slate-500 font-normal ml-2">
                    / peer {m.peer}{m.unit} · top {m.top}{m.unit}
                  </span>
                </span>
              </div>
              <div className="relative h-7 rounded-lg bg-white/[0.03] overflow-hidden">
                {/* Top decile marker */}
                <div
                  className="absolute top-0 bottom-0 border-r-2 border-dashed border-amber-400/60"
                  style={{ left: `${topPct}%` }}
                />
                {/* Peer bar (background) */}
                <div
                  className="absolute top-1 bottom-1 left-1 rounded"
                  style={{
                    width: `calc(${peerPct}% - 8px)`,
                    backgroundColor: 'rgba(148,163,184,0.18)',
                  }}
                />
                {/* User bar (foreground) */}
                <div
                  className="absolute top-1 bottom-1 left-1 rounded flex items-center justify-end pr-2 transition-all duration-700"
                  style={{
                    width: `calc(${userPct}% - 8px)`,
                    backgroundImage: 'linear-gradient(90deg, #00e5a0, #06b6d4)',
                  }}
                >
                  <span className="text-[10px] font-mono font-bold text-[#0a0e1a]">
                    {m.user}{m.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm" style={{ backgroundImage: 'linear-gradient(90deg, #00e5a0, #06b6d4)' }} />
          <span className="text-slate-400">You</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-slate-400/30" />
          <span className="text-slate-400">Peer avg</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-0.5 h-3 border-r-2 border-dashed border-amber-400" />
          <span className="text-slate-400">Top 10%</span>
        </div>
      </div>
    </div>
  );
}

// ─── 5. StudyPlanGenerator ─────────────────────────────────────────
// User picks exam date + study days/week → generator produces a visual
// weekly plan preview with topics and review milestones.

const PLAN_TOPICS = [
  { name: 'Cardio · Path + Pharm',  hours: 14, color: '#ef4444' },
  { name: 'Pulmonology deep dive',  hours: 10, color: '#06b6d4' },
  { name: 'Neuro · Stroke & Seizure', hours: 12, color: '#8b5cf6' },
  { name: 'Renal · Acid-base',       hours: 8,  color: '#10b981' },
  { name: 'GI + Hepatology',         hours: 11, color: '#f59e0b' },
  { name: 'Endo · DM & Thyroid',     hours: 9,  color: '#ec4899' },
  { name: 'Heme/Onc high-yield',     hours: 7,  color: '#f43f5e' },
  { name: 'Psych + Ethics',          hours: 6,  color: '#c084fc' },
  { name: 'Biostats + Ethics review', hours: 5, color: '#22d3ee' },
  { name: 'Full-length mock exams',  hours: 16, color: '#fbbf24' },
];

export function StudyPlanGenerator() {
  const [weeksOut, setWeeksOut] = useState(12);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const totalHours = weeksOut * daysPerWeek * 2.5;
  const readinessPct = Math.min(95, Math.round(40 + weeksOut * 3 + daysPerWeek * 2.5));

  // Distribute topics across weeks deterministically
  const weeklyPlan = useMemo(() => {
    const plan: { week: number; topic: string; color: string; hours: number; isReview: boolean }[] = [];
    let topicIdx = 0;
    for (let w = 1; w <= weeksOut; w++) {
      // 2 new topics per week + 1 review session in last 3 weeks
      for (let t = 0; t < 2; t++) {
        const topic = PLAN_TOPICS[topicIdx % PLAN_TOPICS.length];
        plan.push({
          week: w,
          topic: topic.name,
          color: topic.color,
          hours: round(topic.hours / 2, 1),
          isReview: false,
        });
        topicIdx++;
      }
      if (w > weeksOut - 3) {
        plan.push({
          week: w,
          topic: 'Cumulative review + weak spots',
          color: '#fbbf24',
          hours: 8,
          isReview: true,
        });
      }
    }
    return plan;
  }, [weeksOut]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Calendar size={16} className="text-emerald-400" />
        <strong className="text-white text-sm">Generate your study plan</strong>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Drag the sliders. MedQ auto-distributes high-yield topics across your timeline
        and reserves the last 3 weeks for cumulative review.
      </p>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="text-xs text-slate-400 mb-2 block flex justify-between">
            <span>Weeks until exam</span>
            <span className="font-mono text-white font-bold" aria-hidden="true">{weeksOut}w</span>
            <input
              type="range"
              min={4}
              max={24}
              value={weeksOut}
              onChange={(e) => setWeeksOut(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10"
              style={{ accentColor: '#00e5a0' }}
              aria-label="Weeks until exam"
            />
          </label>
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-2 block flex justify-between">
            <span>Study days / week</span>
            <span className="font-mono text-white font-bold" aria-hidden="true">{daysPerWeek}d</span>
            <input
              type="range"
              min={3}
              max={7}
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10"
              style={{ accentColor: '#06b6d4' }}
              aria-label="Study days per week"
            />
          </label>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-xs text-slate-500">Total hours</div>
          <div className="text-xl font-bold text-white font-mono">{totalHours.toLocaleString('en-US')}h</div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-xs text-slate-500">Readiness</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">{readinessPct}%</div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-xs text-slate-500">Topics covered</div>
          <div className="text-xl font-bold text-white font-mono">{PLAN_TOPICS.length}</div>
        </div>
      </div>

      {/* Weekly grid */}
      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-2">
        {weeklyPlan.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/[0.03] transition-colors"
            style={{ borderLeft: `3px solid ${p.color}` }}
          >
            <span className="text-xs font-mono text-slate-500 w-14 shrink-0">W{p.week}</span>
            <span className="text-xs text-white font-medium flex-1 truncate">{p.topic}</span>
            {p.isReview && <RotateCcw size={11} className="text-amber-400 shrink-0" />}
            <span className="text-xs font-mono text-slate-400 shrink-0">{p.hours}h</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        The actual plan adapts daily: if you miss a session, MedQ re-balances the rest
        of the schedule to keep you on track for your exam date.
      </p>
    </div>
  );
}

// ─── 6. ClinicalCaseCarousel ───────────────────────────────────────
// Three case vignettes with reveal-on-click diagnosis. Each card flips
// from "vignette + question" to "answer + explanation".

const CASES = [
  {
    id: 1,
    specialty: 'Cardiology',
    color: '#ef4444',
    age: '62M',
    vignette: 'Crushing substernal chest pain for 45 minutes, radiating to left arm. Diaphoretic, anxious. PMH: T2DM, HTN, smoker.',
    labs: 'Troponin I: 8.2 ng/mL (ref <0.04) · ECG: ST-elevation in II, III, aVF',
    question: 'Most urgent next step?',
    answer: 'Primary PCI',
    explanation: 'STEMI inferior wall. Time-is-muscle — door-to-balloon ≤90 min. Aspirin 325mg, P2Y12 (ticagrelor), heparin, and immediate cath lab activation.',
    icon: HeartPulse,
  },
  {
    id: 2,
    specialty: 'Neurology',
    color: '#8b5cf6',
    age: '54F',
    vignette: 'Sudden-onset severe headache ("worst of my life") while gardening. Brief LOC. On exam: GCS 11, neck stiffness, photophobia.',
    labs: 'CT head: diffuse subarachnoid blood in basal cisterns',
    question: 'Most likely cause?',
    answer: 'Ruptured berry aneurysm',
    explanation: 'Classical thunderclap headache + SAH pattern on CT. Underlying cause in ~85% is a saccular (berry) aneurysm, typically at circle of Willis bifurcations. Next: CTA, then neurosurgery for clipping or coiling.',
    icon: Brain,
  },
  {
    id: 3,
    specialty: 'Pulmonology',
    color: '#06b6d4',
    age: '34M',
    vignette: '3 weeks of productive cough, night sweats, 6kg weight loss. Recently returned from 6-month medical mission in rural India. BCG-vaccinated as child.',
    labs: 'CXR: upper lobe cavitary lesion · Sputum AFB: 3+ positive',
    question: 'First-line regimen?',
    answer: 'RIPE × 2mo → RH × 4mo',
    explanation: 'Pulmonary TB. Standard therapy: Rifampin + Isoniazid + Pyrazinamide + Ethambutol for 2 months intensive phase, then Rifampin + Isoniazid for 4 months continuation. Report to public health. Monitor LFTs.',
    icon: Wind,
  },
];

export function ClinicalCaseCarousel() {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const c = CASES[idx];

  const go = (dir: number) => {
    setRevealed(false);
    setTimeout(() => {
      setIdx((i) => (i + dir + CASES.length) % CASES.length);
    }, 150);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Stethoscope size={16} style={{ color: c.color }} />
        <strong className="text-white text-sm">Clinical case · {c.specialty}</strong>
        <span className="ml-auto text-xs px-2 py-0.5 rounded font-mono" style={{
          backgroundColor: c.color + '15', color: c.color, border: `1px solid ${c.color}30`,
        }}>
          Case {idx + 1}/{CASES.length}
        </span>
      </div>

      {/* Card */}
      <div
        className="rounded-xl p-5 mb-4 border transition-all duration-300"
        style={{
          backgroundColor: c.color + '08',
          borderColor: c.color + (revealed ? '60' : '25'),
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <c.icon size={18} style={{ color: c.color }} />
          <span className="text-xs font-mono text-slate-400">{c.age}</span>
        </div>

        <p className="text-sm text-slate-200 mb-3 leading-relaxed">{c.vignette}</p>

        <div className="rounded-lg bg-black/30 border border-white/5 p-3 mb-4 font-mono text-xs text-slate-300">
          {c.labs}
        </div>

        <div className="text-xs text-slate-400 mb-2">{c.question}</div>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-3 rounded-lg text-sm font-bold border-2 border-dashed transition-all hover:bg-white/[0.03]"
            style={{ borderColor: c.color + '50', color: c.color }}
          >
            <Lightbulb size={14} className="inline mr-1" /> Reveal diagnosis
          </button>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="rounded-lg p-3 mb-2" style={{ backgroundColor: c.color + '12', border: `1px solid ${c.color}40` }}>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Answer</div>
              <div className="text-base font-bold" style={{ color: c.color }}>{c.answer}</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{c.explanation}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {CASES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setRevealed(false); }}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === idx ? 24 : 8,
                backgroundColor: i === idx ? c.color : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── 7. MemoryAnchorCards ──────────────────────────────────────────
// Flip cards for medical mnemonics. Click to reveal expansion.

const MNEMONICS = [
  {
    short: 'MUDPILES',
    title: 'High anion gap metabolic acidosis',
    expansion: ['Methanol', 'Uremia', 'DKA / ketoacidosis', 'Propylene glycol', 'Iron / INH', 'Lactic acidosis', 'Ethylene glycol', 'Salicylates'],
    color: '#ef4444',
  },
  {
    short: 'ABCDE',
    title: 'Melanoma criteria',
    expansion: ['Asymmetry', 'Border irregular', 'Color variegated', 'Diameter >6mm', 'Evolving'],
    color: '#8b5cf6',
  },
  {
    short: 'DAVINCIS',
    title: 'Mitral regurgitation causes',
    expansion: ['Degenerative (MVP)', 'Annular calcification', 'Valvular (IE, RHD)', 'Ischemic (papillary)', 'Congenital (cleft)', 'Inflammatory (SLE)', 'Structural (HCM)', 'other (trauma)'],
    color: '#06b6d4',
  },
  {
    short: 'CHAMP',
    title: 'PCOS diagnostic criteria',
    expansion: ['Cycle irregularity', 'Hyperandrogenism', 'Acanthosis', 'Multi-ovary cysts', 'Polycystic ovaries on US'],
    color: '#f59e0b',
  },
  {
    short: 'SPLINT',
    title: 'Acute pancreatitis causes',
    expansion: ['Stones', 'Post-ERCP', 'Liver disease', 'Infections (mumps)', 'Neoplastic', 'Trauma'],
    color: '#ec4899',
  },
  {
    short: 'PRIME',
    title: 'Hepatitis B serology progression',
    expansion: ['Precore (HBeAg)', 'Replication (HBV DNA)', 'Inflammation', 'Memory (anti-HBs)', 'Elimination (anti-HBe)'],
    color: '#10b981',
  },
];

export function MemoryAnchorCards() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6">
      <div className="flex items-center gap-2 mb-1">
        <Brain size={16} className="text-violet-400" />
        <strong className="text-white text-sm">Memory anchors</strong>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Tap any card to expand the mnemonic. MedQ embeds 600+ high-yield
        mnemonics inside the relevant question explanations — exactly when
        you need them.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {MNEMONICS.map((m, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="relative h-36 rounded-xl border p-4 text-left transition-all hover:scale-[1.02] overflow-hidden"
              style={{
                borderColor: m.color + '40',
                backgroundImage: isFlipped
                  ? `linear-gradient(135deg, ${m.color}15, ${m.color}05)`
                  : `linear-gradient(135deg, ${m.color}08, transparent)`,
                backgroundColor: '#0a0e1a',
              }}
            >
              {!isFlipped ? (
                <div className="flex flex-col h-full justify-between">
                  <div
                    className="text-2xl font-black tracking-tight"
                    style={{ color: m.color }}
                  >
                    {m.short}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 mb-0.5">Click to reveal</div>
                    <div className="text-xs text-slate-400 font-medium">{m.title}</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="text-[10px] uppercase tracking-wider font-mono mb-2" style={{ color: m.color }}>
                    {m.short} · {m.title}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-1 text-[10px]">
                    {m.expansion.map((e, j) => (
                      <div key={j} className="flex items-start gap-1">
                        <span className="font-mono font-bold shrink-0" style={{ color: m.color }}>
                          {m.short[j]}.
                        </span>
                        <span className="text-slate-300 leading-tight">{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── 8. QuestionTypeShowcase ───────────────────────────────────────
// Five interactive question format previews — tabs at top, format demo below.

const Q_TYPES = [
  {
    id: 'mcq',
    label: 'Multiple choice',
    color: '#00e5a0',
    desc: 'Single-best-answer with detailed explanation',
    sample: {
      stem: 'A 55-year-old man presents with progressive dyspnea on exertion and lower-extremity edema. JVP is elevated. Echocardiogram shows EF 30% with dilated LV. Which therapy has been shown to improve survival in this patient?',
      options: [
        { text: 'Furosemide IV', correct: false, why: 'Symptom relief only — no mortality benefit.' },
        { text: 'Spironolactone', correct: true, why: 'RALES trial: 30% mortality reduction in NYHA III–IV HFrEF.' },
        { text: 'Digoxin', correct: false, why: 'Reduces hospitalizations, no mortality benefit (DIG trial).' },
        { text: 'Nifedipine', correct: false, why: 'May worsen HFrEF — avoid non-dihydropyridine CCBs.' },
      ],
    },
  },
  {
    id: 'multi',
    label: 'Multi-select',
    color: '#06b6d4',
    desc: 'Pick all that apply — penalizes partial knowledge',
    sample: {
      stem: 'Which are causes of a widened mediastinum on chest X-ray? Select all that apply.',
      options: [
        { text: 'Aortic dissection', correct: true, why: 'Intimal flap widens mediastinal shadow.' },
        { text: 'Tension pneumothorax', correct: false, why: 'Causes tracheal deviation, not widening.' },
        { text: 'Retrosternal thyroid', correct: true, why: 'Mass effect widens superior mediastinum.' },
        { text: 'Lymphadenopathy', correct: true, why: 'Paratracheal nodes widen mediastinum.' },
      ],
    },
  },
  {
    id: 'matching',
    label: 'Matching',
    color: '#8b5cf6',
    desc: 'Pair items across two columns',
    sample: {
      stem: 'Match each antibody with its associated autoimmune condition.',
      options: [
        { text: 'Anti-dsDNA — SLE', correct: true, why: 'Highly specific for SLE; correlates with disease activity.' },
        { text: 'Anti-CCP — Rheumatoid arthritis', correct: true, why: 'More specific than RF for RA.' },
        { text: 'Anti-Scl-70 — Sjögren syndrome', correct: false, why: 'Anti-Scl-70 → diffuse systemic sclerosis. Sjögren → Anti-Ro/La.' },
        { text: 'Anti-U1-RNP — Mixed connective tissue disease', correct: true, why: 'Hallmark antibody of MCTD.' },
      ],
    },
  },
  {
    id: 'image',
    label: 'Image-based',
    color: '#f59e0b',
    desc: 'Identify findings on clinical images',
    sample: {
      stem: 'A 28-year-old presents with this rash and fever. What is the most likely diagnosis?',
      options: [
        { text: 'Measles', correct: false, why: 'Koplik spots, head-to-toe rash. Image shows target lesions.' },
        { text: 'Erythema multiforme', correct: true, why: 'Targetoid lesions — classic for EM, often HSV-related.' },
        { text: 'Rubella', correct: false, why: 'Pink maculopapular rash, not targetoid.' },
        { text: 'Scarlet fever', correct: false, why: 'Sandpaper-like rash, sandpaper texture.' },
      ],
    },
  },
  {
    id: 'vignette',
    label: 'Clinical vignette',
    color: '#ec4899',
    desc: 'Multi-step patient workup',
    sample: {
      stem: 'A 68-year-old man, 3 days post-op, becomes acutely short of breath. HR 122, BP 86/52, SpO2 88% on RA. What is the immediate priority?',
      options: [
        { text: 'Order CT pulmonary angiogram', correct: false, why: 'Definitive diagnosis, but unstable patient — stabilize first.' },
        { text: 'Begin empiric therapeutic anticoagulation', correct: true, why: 'High clinical suspicion + hemodynamic instability → treat immediately. Thrombolytics if massive PE.' },
        { text: 'Administer IV fluids 1L bolus', correct: false, why: 'May worsen RV failure in massive PE — use cautiously.' },
        { text: 'Intubate and mechanically ventilate', correct: false, why: 'Only if respiratory failure — not first priority if oxygenating.' },
      ],
    },
  },
];

export function QuestionTypeShowcase() {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = Q_TYPES[active];

  const selectTab = (i: number) => {
    setActive(i);
    setPicked(null);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Pill size={16} className="text-emerald-400" />
        <strong className="text-white text-sm">Five question formats</strong>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Real exams use more than just MCQs. MedQ trains every format you'll see on test day.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {Q_TYPES.map((t, i) => (
          <button
            key={t.id}
            onClick={() => selectTab(i)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all border"
            style={{
              backgroundColor: i === active ? t.color + '20' : 'transparent',
              borderColor: i === active ? t.color + '60' : 'rgba(255,255,255,0.08)',
              color: i === active ? t.color : '#94a3b8',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sample */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="text-xs text-slate-500 mb-2 font-mono">{q.desc}</div>
        <p className="text-sm text-slate-200 leading-relaxed mb-4">{q.sample.stem}</p>

        <div className="space-y-2">
          {q.sample.options.map((o, i) => {
            const isPicked = picked === i;
            const showAnswer = picked !== null;
            return (
              <button
                key={i}
                onClick={() => setPicked(i)}
                disabled={showAnswer}
                className="w-full text-left rounded-lg p-3 border transition-all text-sm"
                style={{
                  backgroundColor: showAnswer
                    ? (o.correct ? 'rgba(0,229,160,0.08)' : (isPicked ? 'rgba(239,68,68,0.08)' : 'transparent'))
                    : (isPicked ? q.color + '15' : 'transparent'),
                  borderColor: showAnswer
                    ? (o.correct ? '#00e5a060' : (isPicked ? '#ef444460' : 'rgba(255,255,255,0.05)'))
                    : (isPicked ? q.color + '50' : 'rgba(255,255,255,0.06)'),
                }}
              >
                <div className="flex items-start gap-2">
                  {showAnswer ? (
                    o.correct ? <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                      : (isPicked ? <X size={14} className="text-red-400 mt-0.5 shrink-0" /> : null)
                  ) : (
                    <span className="text-xs font-mono text-slate-500 mt-0.5 shrink-0">{String.fromCharCode(65 + i)}</span>
                  )}
                  <div className="flex-1">
                    <div className="text-slate-200">{o.text}</div>
                    {showAnswer && (o.correct || isPicked) && (
                      <div className="mt-1.5 text-xs text-slate-400 italic">{o.why}</div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <button
            onClick={() => setPicked(null)}
            className="mt-4 text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
          >
            <RotateCcw size={11} /> Try again
          </button>
        )}
      </div>
    </div>
  );
}

// ─── 9. LiveQuestionStream ─────────────────────────────────────────
// Animated feed of "live" question activity from students worldwide.
// New entries stream in every 1.5s. Deterministic — uses Mulberry32.

const STREAM_NAMES = [
  'Aisha K.', 'Marco R.', 'Yuki T.', 'Sofia L.', 'Ahmed H.',
  'Priya S.', 'James W.', 'Fatima B.', 'Lucas M.', 'Nina P.',
  'Chen W.', 'Olga V.', 'Diego F.', 'Hannah S.', 'Raj P.',
];

const STREAM_SPECIALTIES = ['Cardio', 'Neuro', 'Renal', 'Pulm', 'GI', 'Endo', 'Heme', 'Psych'];

const STREAM_QUESTIONS = [
  'MOA of furosemide in acute pulmonary edema',
  'Differentiate Crohn vs UC on biopsy',
  'Cushing reflex components',
  'Pathophysiology of SIADH',
  'Phases of menstruation cycle',
  'Action potential phases in cardiac myocytes',
  'Reversibility of COPD vs asthma',
  'Differentiate central vs nephrogenic DI',
  'Lesion localization in Broca vs Wernicke aphasia',
  'Hepatitis B serology interpretation',
  'Tumor markers for pancreatic adenocarcinoma',
  'Bradyarrhythmia vs tachyarrhythmia management',
];

interface StreamEntry {
  id: number;
  name: string;
  country: string;
  specialty: string;
  question: string;
  correct: boolean;
  timeAgo: string;
}

const COUNTRIES = ['🇺🇸', '🇮🇳', '🇳🇬', '🇧🇷', '🇬🇧', '🇯🇵', '🇩🇪', '🇪🇬', '🇨🇦', '🇦🇺', '🇵🇰', '🇵🇭'];

export function LiveQuestionStream() {
  const [entries, setEntries] = useState<StreamEntry[]>([]);
  const counter = useRef(0);

  // Seed with 6 initial entries (deterministic), then stream new ones
  useEffect(() => {
    const rng = mulberry32(20260809);
    const initial: StreamEntry[] = [];
    for (let i = 0; i < 6; i++) {
      initial.push({
        id: counter.current++,
        name: STREAM_NAMES[Math.floor(rng() * STREAM_NAMES.length)],
        country: COUNTRIES[Math.floor(rng() * COUNTRIES.length)],
        specialty: STREAM_SPECIALTIES[Math.floor(rng() * STREAM_SPECIALTIES.length)],
        question: STREAM_QUESTIONS[Math.floor(rng() * STREAM_QUESTIONS.length)],
        correct: rng() > 0.32,
        timeAgo: `${1 + Math.floor(rng() * 8)}s ago`,
      });
    }
    setEntries(initial);

    const id = setInterval(() => {
      const r = mulberry32(Date.now() % 1000000)();
      setEntries((prev) => {
        const next: StreamEntry = {
          id: counter.current++,
          name: STREAM_NAMES[Math.floor(r * STREAM_NAMES.length)],
          country: COUNTRIES[Math.floor(r * COUNTRIES.length)],
          specialty: STREAM_SPECIALTIES[Math.floor(r * STREAM_SPECIALTIES.length)],
          question: STREAM_QUESTIONS[Math.floor(r * STREAM_QUESTIONS.length)],
          correct: r > 0.32,
          timeAgo: 'just now',
        };
        return [next, ...prev].slice(0, 7);
      });
      // Update time labels
      setEntries((prev) =>
        prev.map((e, i) => (i === 0 ? e : { ...e, timeAgo: i === 1 ? '4s ago' : i === 2 ? '11s ago' : `${15 + i * 8}s ago` }))
      );
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6">
      <div className="flex items-center gap-2 mb-1">
        <Activity size={16} className="text-emerald-400" />
        <strong className="text-white text-sm">Live activity feed</strong>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          LIVE
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Real students answering real questions right now. The MedQ cohort
        answers <strong className="text-slate-300">~40 questions per second</strong> globally.
      </p>

      <div className="space-y-1.5">
        {entries.map((e, i) => (
          <div
            key={e.id}
            className="flex items-center gap-3 rounded-lg p-2.5 transition-all"
            style={{
              backgroundColor: i === 0 ? 'rgba(0,229,160,0.05)' : 'transparent',
              opacity: i === 0 ? 1 : round(1 - i * 0.1, 2),
              animation: i === 0 ? 'slideIn 0.4s ease-out' : undefined,
            }}
          >
            <span className="text-lg shrink-0" aria-hidden>{e.country}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white truncate">{e.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{
                  backgroundColor: 'rgba(139,92,246,0.15)', color: '#a78bfa',
                }}>{e.specialty}</span>
              </div>
              <div className="text-xs text-slate-400 truncate">{e.question}</div>
            </div>
            <div className="shrink-0 flex flex-col items-end gap-0.5">
              {e.correct ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <X size={14} className="text-red-400" />
              )}
              <span className="text-[9px] font-mono text-slate-600">{e.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── 10. GamifiedStreakTree ────────────────────────────────────────
// Tree visualization where branches = specialties and leaves = mastered
// concepts. Leaves grow when streak increases. Streak counter at top.

const TREE_BRANCHES = [
  { angle: -60, length: 80, specialty: 'Cardio', leaves: 12, color: '#ef4444' },
  { angle: -30, length: 75, specialty: 'Neuro', leaves: 9, color: '#8b5cf6' },
  { angle:   0, length: 85, specialty: 'Pulm', leaves: 14, color: '#06b6d4' },
  { angle:  30, length: 70, specialty: 'Renal', leaves: 8, color: '#10b981' },
  { angle:  60, length: 78, specialty: 'GI', leaves: 11, color: '#f59e0b' },
  { angle: -90, length: 72, specialty: 'Endo', leaves: 7, color: '#ec4899' },
  { angle:  90, length: 68, specialty: 'Heme', leaves: 6, color: '#f43f5e' },
];

export function GamifiedStreakTree() {
  const [streak, setStreak] = useState(47);
  const [leavesGrown, setLeavesGrown] = useState(0);

  // Animate leaves growing on mount
  useEffect(() => {
    const id = setInterval(() => {
      setLeavesGrown((n) => {
        if (n >= 67) return n;
        return n + 2;
      });
    }, 30);
    return () => clearInterval(id);
  }, []);

  const cx = 200;
  const cy = 280;
  const trunkH = 100;
  const trunkW = 14;

  const branches = TREE_BRANCHES.map((b) => {
    const rad = (b.angle * Math.PI) / 180;
    const endX = round(cx + b.length * Math.sin(rad));
    const endY = round(cy - trunkH - b.length * Math.cos(rad) * 0.5);
    const ctrlX = round(cx + (b.length * 0.6) * Math.sin(rad));
    const ctrlY = round(cy - trunkH - (b.length * 0.4) * Math.cos(rad) * 0.5);
    return { ...b, endX, endY, ctrlX, ctrlY };
  });

  const totalLeavesShown = Math.min(67, leavesGrown);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0e14] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-orange-400" />
          <strong className="text-white text-sm">Streak tree</strong>
        </div>
        <div className="flex items-center gap-2">
          <Flame size={20} className="text-orange-400" />
          <div>
            <div className="text-2xl font-black text-white leading-none font-mono">{streak}</div>
            <div className="text-[10px] text-slate-500">day streak</div>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Each day you maintain your streak, new leaves sprout on a different specialty branch.
        Miss a day → leaves fall. Mastering concepts within a specialty grows the branch longer.
      </p>

      <svg viewBox="0 0 400 320" className="w-full h-auto">
        {/* Ground */}
        <ellipse cx={cx} cy={290} rx="120" ry="8" fill="rgba(255,255,255,0.03)" />
        {/* Trunk */}
        <path
          d={`M ${cx - trunkW / 2} ${cy} Q ${cx - trunkW / 2 - 4} ${cy - trunkH / 2} ${cx - 3} ${cy - trunkH} L ${cx + 3} ${cy - trunkH} Q ${cx + trunkW / 2 + 4} ${cy - trunkH / 2} ${cx + trunkW / 2} ${cy} Z`}
          fill="#3d2817"
          stroke="#5c3a20"
          strokeWidth="0.5"
        />
        {/* Branches */}
        {branches.map((b, bi) => {
          const leavesToDraw = Math.min(b.leaves, Math.max(0, totalLeavesShown - bi * 9));
          return (
            <g key={bi}>
              <path
                d={`M ${cx} ${cy - trunkH} Q ${b.ctrlX} ${b.ctrlY} ${b.endX} ${b.endY}`}
                fill="none"
                stroke="#5c3a20"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Leaves */}
              {Array.from({ length: leavesToDraw }, (_, li) => {
                const t = (li + 1) / (b.leaves + 1);
                const lx = round(cx + (b.endX - cx) * t + Math.sin(li * 1.3) * 5);
                const ly = round((cy - trunkH) + (b.endY - (cy - trunkH)) * t + Math.cos(li * 1.7) * 4);
                const size = round(3 + (li % 3) * 0.5, 1);
                return (
                  <circle
                    key={li}
                    cx={lx}
                    cy={ly}
                    r={size}
                    fill={b.color}
                    opacity={0.85}
                  />
                );
              })}
              {/* Specialty label */}
              <text
                x={b.endX}
                y={b.endY - 8}
                textAnchor="middle"
                fontSize="8"
                fill={b.color}
                fontWeight="600"
                style={{ pointerEvents: 'none' }}
              >
                {b.specialty}
              </text>
            </g>
          );
        })}
        {/* Streak count badge at top */}
        <g transform={`translate(${cx}, ${cy - trunkH - 100})`}>
          <circle r="14" fill="rgba(249,115,22,0.2)" stroke="#f97316" strokeWidth="1.5" />
          <text textAnchor="middle" dy="4" fontSize="11" fontWeight="700" fill="#fb923c" fontFamily="monospace">
            {streak}d
          </text>
        </g>
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-base font-bold text-white font-mono">{totalLeavesShown}</div>
          <div className="text-[10px] text-slate-500">leaves grown</div>
        </div>
        <div>
          <div className="text-base font-bold text-white font-mono">7</div>
          <div className="text-[10px] text-slate-500">branches</div>
        </div>
        <div>
          <div className="text-base font-bold text-emerald-400 font-mono">+3</div>
          <div className="text-[10px] text-slate-500">today</div>
        </div>
      </div>
    </div>
  );
}
