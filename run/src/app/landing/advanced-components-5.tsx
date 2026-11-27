'use client';

/**
 * MedQ landing — fifth batch of advanced components.
 *
 * File: /home/z/my-project/extracted/src/app/landing/advanced-components-5.tsx
 *
 * Exports:
 *   - EcgTrace              animated ECG/heartbeat SVG trace with reading cardiology
 *   - StreakCalendar        GitHub-style contribution heatmap of study activity
 *   - CaseTimeline          vertical timeline of a clinical case evolving over days
 *   - CodeTerminal          animated terminal showing the MedQ API integration code
 *   - NeuralNetworkViz      animated SVG of a neural network with weighted edges
 *   - ParallaxDepthScene    multi-layer parallax scene reacting to scroll
 *   - LeaderboardRace       animated bar-chart race between top students this week
 *   - MorphingLogo          SVG path morphing between medical icons
 *   - LiveExamSimulator     full-screen simulated exam with progress + question palette
 *   - ConfettiCelebration   burst confetti when an achievement unlocks
 *   - WaveformPlayer        audio waveform scrubber with chapter markers
 *   - StatsCube3D           CSS-3D rotating cube showing stats on each face
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Activity, Heart, Brain, Zap, Calendar, Terminal, Code2,
  Network, Layers, Mountain, Trophy, Award, Crown, Medal,
  Star, Sparkles, ArrowRight, ArrowUpRight, Play, Pause,
  RotateCw, RefreshCw, Flame, TrendingUp, TrendingDown,
  ChevronRight, ChevronLeft, X, Check, Plus, Minus, Clock,
  Target, Stethoscope, Pill, Microscope, Dna, Atom, FlaskConical,
  BookOpen, Lightbulb, GraduationCap, Bell, Bookmark, Share2,
  Eye, Volume2, Maximize2, Settings, Cpu, GitBranch, Wifi,
  AlertCircle, CheckCircle2, CircleDot, Radio, Send, Hash,
  Boxes, Box, Gauge, BarChart3, LineChart, PieChart,
  HeartPulse, Globe2,
} from 'lucide-react';

// ─── 1. EcgTrace ──────────────────────────────────────────────────

export function EcgTrace() {
  const [beat, setBeat] = useState(0);
  const [bpm, setBpm] = useState(72);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setBeat((b) => b + 1);
      setBpm(68 + Math.round(Math.sin(Date.now() / 4000) * 6 + Math.random() * 4));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  // Build a repeating ECG path that scrolls left
  const ecgPattern = 'M0,40 L40,40 L48,40 L52,20 L56,60 L60,10 L64,70 L68,40 L80,40 L100,40 L108,40 L120,40';
  const path = useMemo(() => {
    let p = 'M0,40 ';
    for (let i = 0; i < 4; i++) {
      p += ecgPattern.replace(/M0,40 /, `L${i * 120},40 `).replace(/L0,40/, '');
    }
    return p;
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Heart className="w-5 h-5 text-rose-400" />
            <div className="absolute inset-0 animate-ping rounded-full bg-rose-500/20" />
          </div>
          <span className="text-sm font-mono text-rose-300">LIVE ECG · Lead II</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-emerald-400">{bpm} BPM</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Sinus rhythm</span>
        </div>
      </div>

      <svg ref={svgRef} viewBox="0 0 480 80" className="w-full h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ecg-glow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#00e5a0" stopOpacity="0" />
            <stop offset="80%" stopColor="#00e5a0" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffd0" stopOpacity="1" />
          </linearGradient>
          <pattern id="ecg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,229,160,0.07)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ecg-grid)" />
        <g key={beat}>
          <path
            d={path}
            fill="none"
            stroke="url(#ecg-glow)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(0,229,160,0.6))',
              animation: 'ecg-scroll 4s linear infinite',
            }}
          />
        </g>
        {/* Leading dot */}
        <circle cx="460" cy="40" r="4" fill="#00ffd0">
          <animate attributeName="cy" values="40;20;60;10;70;40;40;40" dur="1.1s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="mt-4 grid grid-cols-4 gap-3 text-center">
        {[
          { label: 'PR', value: '160 ms', ok: true },
          { label: 'QRS', value: '88 ms', ok: true },
          { label: 'QT', value: '380 ms', ok: true },
          { label: 'Axis', value: '+60°', ok: true },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-white/5 px-2 py-2">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">{m.label}</div>
            <div className="font-mono text-sm text-emerald-300">{m.value}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes ecg-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-120px); }
        }
      `}</style>
    </div>
  );
}

// ─── 2. StreakCalendar ────────────────────────────────────────────

export function StreakCalendar() {
  // Defer data generation until after mount. Previously this used
  // `new Date()` and `Math.random()` inside useMemo, which produced
  // different values on the server (Node V8) vs client (browser V8)
  // → hydration mismatch on every cell color, currentStreak, longestStreak,
  // and totalActive. By starting with an empty array and populating in
  // useEffect, the SSR HTML and first client render both show an empty
  // calendar, then it fills in after mount.
  const [days, setDays] = useState<{ date: Date; count: number }[]>([]);

  useEffect(() => {
    const arr: { date: Date; count: number }[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      // Simulate streaky activity — heavier in last 60 days
      const recent = i < 60;
      const baseline = recent ? 0.7 : 0.4;
      const count = Math.random() < baseline ? Math.floor(Math.random() * 4) + 1 : 0;
      arr.push({ date: d, count });
    }
    setDays(arr);
  }, []);

  const weeks = useMemo(() => {
    const w: { date: Date; count: number }[][] = [];
    for (let i = 0; i < days.length; i += 7) w.push(days.slice(i, i + 7));
    return w;
  }, [days]);

  const totalActive = days.filter((d) => d.count > 0).length;
  const currentStreak = useMemo(() => {
    let s = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) s++;
      else break;
    }
    return s;
  }, [days]);

  const longestStreak = useMemo(() => {
    let max = 0, cur = 0;
    days.forEach((d) => {
      if (d.count > 0) { cur++; max = Math.max(max, cur); }
      else cur = 0;
    });
    return max;
  }, [days]);

  const colorFor = (count: number) => {
    if (count === 0) return 'rgba(255,255,255,0.04)';
    if (count === 1) return 'rgba(0,229,160,0.25)';
    if (count === 2) return 'rgba(0,229,160,0.5)';
    if (count === 3) return 'rgba(0,229,160,0.75)';
    return 'rgba(0,229,160,1)';
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h3 className="font-semibold text-white">Study activity · last 12 months</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="rounded-full bg-orange-500/15 px-2 py-1 text-orange-300">🔥 {currentStreak}-day streak</span>
          <span className="text-slate-400">Best: {longestStreak}d</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px] min-w-[640px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((d, di) => (
                <div
                  key={di}
                  title={`${d.date.toDateString()} · ${d.count} questions`}
                  className="w-[10px] h-[10px] rounded-sm transition-transform hover:scale-150 hover:ring-1 hover:ring-emerald-400"
                  style={{ background: colorFor(d.count) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((c) => (
            <div key={c} className="w-[10px] h-[10px] rounded-sm" style={{ background: colorFor(c) }} />
          ))}
          <span>More</span>
        </div>
        <div className="font-mono text-slate-400">
          {totalActive} active days · {days.reduce((s, d) => s + d.count, 0)} questions
        </div>
      </div>
    </div>
  );
}

// ─── 3. CaseTimeline ──────────────────────────────────────────────

const CASE_EVENTS = [
  {
    day: 'Day 0 · 18:42',
    title: 'ED presentation',
    icon: '🚨',
    body: '62 y/o male, crushing substernal chest pain radiating to left arm, diaphoretic. BP 156/94, HR 102, SpO₂ 97%.',
    vitals: { bp: '156/94', hr: '102', spo2: '97%' },
    accent: '#ef4444',
  },
  {
    day: 'Day 0 · 18:48',
    title: 'ECG — STEMI',
    icon: '⚡',
    body: '12-lead ECG: 3 mm ST-elevation in II, III, aVF. Reciprocal depression in I, aVL. Diagnosis: inferior STEMI.',
    vitals: { bp: '148/88', hr: '98', spo2: '97%' },
    accent: '#f59e0b',
  },
  {
    day: 'Day 0 · 19:05',
    title: 'Cath lab activation',
    icon: '🫀',
    body: 'Code STEMI called. Aspirin 325 mg, ticagrelor 180 mg, heparin bolus. Door-to-balloon target ≤ 90 min.',
    vitals: { bp: '142/82', hr: '94', spo2: '98%' },
    accent: '#8b5cf6',
  },
  {
    day: 'Day 0 · 19:38',
    title: 'PCI — RCA stent',
    icon: '✨',
    body: 'Angiogram: 100% occlusion mid-RCA. Primary PCI with drug-eluting stent. TIMI 3 flow restored. Pain resolved.',
    vitals: { bp: '128/76', hr: '82', spo2: '99%' },
    accent: '#00e5a0',
  },
  {
    day: 'Day 1 · 08:00',
    title: 'CCU — post-MI',
    icon: '🛏️',
    body: 'Uneventful overnight. Troponin I peaked at 38 ng/mL. Started on metoprolol, atorvastatin 80 mg, ACE-I.',
    vitals: { bp: '124/74', hr: '68', spo2: '99%' },
    accent: '#06b6d4',
  },
  {
    day: 'Day 3',
    title: 'Discharge planning',
    icon: '🏠',
    body: 'Echo: EF 48% with inferior hypokinesis. Cardiac rehab referral. Dual antiplatelet therapy for 12 months.',
    vitals: { bp: '120/72', hr: '64', spo2: '99%' },
    accent: '#10b981',
  },
];

export function CaseTimeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % CASE_EVENTS.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] p-6">
      <div className="flex items-center gap-2 mb-5">
        <Stethoscope className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold text-white">Case timeline · Inferior STEMI</h3>
        <span className="ml-auto text-xs font-mono text-slate-500">auto-advancing</span>
      </div>

      <div className="relative pl-8">
        {/* vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-rose-500 via-violet-500 to-emerald-500" />

        <div className="space-y-3">
          {CASE_EVENTS.map((e, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative w-full text-left group"
              >
                {/* dot */}
                <div
                  className="absolute -left-[22px] top-3 w-3 h-3 rounded-full border-2 border-[#0a0e1a] transition-all"
                  style={{
                    background: e.accent,
                    transform: isActive ? 'scale(1.4)' : 'scale(1)',
                    boxShadow: isActive ? `0 0 12px ${e.accent}` : 'none',
                  }}
                />
                <div
                  className="rounded-xl p-3 transition-all"
                  style={{
                    background: isActive ? `${e.accent}15` : 'rgba(255,255,255,0.02)',
                    border: isActive ? `1px solid ${e.accent}40` : '1px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{e.icon}</span>
                    <span className="text-xs font-mono text-slate-400">{e.day}</span>
                    {isActive && (
                      <span className="ml-auto text-[10px] font-bold uppercase tracking-wider" style={{ color: e.accent }}>
                        ● Live
                      </span>
                    )}
                  </div>
                  <div className={`font-semibold text-sm mt-1 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {e.title}
                  </div>
                  {isActive && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{e.body}</p>
                  )}
                  {isActive && (
                    <div className="flex gap-3 mt-2 font-mono text-[10px]">
                      <span className="text-rose-300">BP {e.vitals.bp}</span>
                      <span className="text-amber-300">HR {e.vitals.hr}</span>
                      <span className="text-cyan-300">SpO₂ {e.vitals.spo2}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── 4. CodeTerminal ──────────────────────────────────────────────

const TERMINAL_LINES = [
  { t: '$', c: 'npm install @medq/sdk', color: 'text-slate-300' },
  { t: '', c: '✓ installed in 2.3s', color: 'text-emerald-400' },
  { t: '$', c: 'cat > generate.ts << EOF', color: 'text-slate-300' },
  { t: '', c: 'import { MedQ } from "@medq/sdk";', color: 'text-cyan-300' },
  { t: '', c: '', color: '' },
  { t: '', c: 'const medq = new MedQ({ apiKey: process.env.MEDQ_KEY });', color: 'text-slate-200' },
  { t: '', c: '', color: '' },
  { t: '', c: 'const question = await medq.generate({', color: 'text-slate-200' },
  { t: '', c: '  topic: "cardiology",', color: 'text-violet-300' },
  { t: '', c: '  difficulty: "hard",', color: 'text-violet-300' },
  { t: '', c: '  format: "sba",', color: 'text-violet-300' },
  { t: '', c: '  imaging: "ecg",', color: 'text-violet-300' },
  { t: '', c: '});', color: 'text-slate-200' },
  { t: '', c: 'EOF', color: 'text-slate-300' },
  { t: '$', c: 'npx tsx generate.ts', color: 'text-slate-300' },
  { t: '', c: '⚡ Streaming from gpt-4o...', color: 'text-amber-300' },
  { t: '', c: '✓ Generated in 1.8s', color: 'text-emerald-400' },
  { t: '', c: '{', color: 'text-slate-300' },
  { t: '', c: '  "stem": "A 58-year-old male..."', color: 'text-slate-400' },
  { t: '', c: '  "options": ["A","B","C","D"],', color: 'text-slate-400' },
  { t: '', c: '  "answer": "B",', color: 'text-emerald-300' },
  { t: '', c: '  "rationale": "..."', color: 'text-slate-400' },
  { t: '', c: '}', color: 'text-slate-300' },
];

export function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) {
      const reset = setTimeout(() => setVisibleLines(0), 3000);
      return () => clearTimeout(reset);
    }
    const delay = TERMINAL_LINES[visibleLines]?.c.startsWith('✓') ? 600 : 180;
    const id = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(id);
  }, [visibleLines]);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0e1a] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="ml-3 text-xs font-mono text-slate-500 flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          medq@sdk ~ /quickstart
        </div>
        <button
          onClick={() => {
            const code = TERMINAL_LINES.filter((l, i) => i >= 3 && i <= 13).map((l) => l.c).join('\n');
            navigator.clipboard?.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="ml-auto text-xs text-slate-400 hover:text-emerald-300 flex items-center gap-1"
        >
          {copied ? <Check className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-[13px] leading-relaxed min-h-[360px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((l, i) => (
          <div key={i} className="flex gap-2">
            {l.t && <span className="text-emerald-400 select-none">{l.t}</span>}
            <span className={l.color || 'text-slate-300'}>{l.c || '\u00A0'}</span>
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
        )}
      </div>
    </div>
  );
}

// ─── 5. NeuralNetworkViz ──────────────────────────────────────────

export function NeuralNetworkViz() {
  const [pulse, setPulse] = useState(0);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const layers = [4, 6, 6, 3]; // input, hidden1, hidden2, output
  const layerLabels = ['Symptoms', 'Hidden A', 'Hidden B', 'Dx'];
  const nodeLabels = [
    ['Chest pain', 'Dyspnea', 'Fever', 'Headache'],
    ['h₁', 'h₂', 'h₃', 'h₄', 'h₅', 'h₆'],
    ['h₁', 'h₂', 'h₃', 'h₄', 'h₅', 'h₆'],
    ['MI', 'Pneumonia', 'Migraine'],
  ];

  const W = 600, H = 320, padX = 80, padY = 40;
  const colX = layers.map((_, i) => padX + (i * (W - 2 * padX)) / (layers.length - 1));
  const nodeY = (col: number, idx: number) => {
    const n = layers[col];
    return padY + (idx + 0.5) * ((H - 2 * padY) / n);
  };

  // Build edges with random-ish weights
  const edges: { x1: number; y1: number; x2: number; y2: number; w: number; key: string }[] = [];
  for (let c = 0; c < layers.length - 1; c++) {
    for (let i = 0; i < layers[c]; i++) {
      for (let j = 0; j < layers[c + 1]; j++) {
        const w = ((i * 7 + j * 13 + c * 3) % 11) / 11 - 0.5; // deterministic pseudo-random
        edges.push({
          x1: colX[c], y1: nodeY(c, i),
          x2: colX[c + 1], y2: nodeY(c + 1, j),
          w, key: `${c}-${i}-${j}`,
        });
      }
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-violet-400" />
          <h3 className="font-semibold text-white">Diagnosis engine · neural pathway</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">2.4M parameters · fine-tuned</span>
      </div>

      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="edge-pos" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00e5a0" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* edges */}
        {edges.map((e) => (
          <line
            key={e.key}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={e.w >= 0 ? 'rgba(139,92,246,0.25)' : 'rgba(244,63,94,0.2)'}
            strokeWidth={Math.abs(e.w) * 2 + 0.4}
          />
        ))}

        {/* signal pulses traveling along select edges */}
        {pulse >= 0 && edges.filter((_, i) => i % 9 === pulse % 9).slice(0, 6).map((e, i) => (
          <circle key={`p-${pulse}-${i}`} r="3" fill="#00ffd0">
            <animate attributeName="cx" from={e.x1} to={e.x2} dur="1.4s" begin="0s" repeatCount="1" />
            <animate attributeName="cy" from={e.y1} to={e.y2} dur="1.4s" begin="0s" repeatCount="1" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" begin="0s" repeatCount="1" />
          </circle>
        ))}

        {/* nodes */}
        {layers.map((count, c) => (
          <g key={c}>
            {Array.from({ length: count }).map((_, i) => (
              <g key={i}>
                <circle
                  cx={colX[c]} cy={nodeY(c, i)} r={12}
                  fill={c === layers.length - 1 ? 'rgba(0,229,160,0.15)' : 'rgba(139,92,246,0.1)'}
                  stroke={c === layers.length - 1 ? '#00e5a0' : '#8b5cf6'}
                  strokeWidth="1.5"
                />
                <text
                  x={colX[c]} y={nodeY(c, i) + 4}
                  textAnchor="middle"
                  className="fill-white font-mono"
                  fontSize="10"
                >
                  {c === 0 ? nodeLabels[c][i].slice(0, 1) : c === layers.length - 1 ? nodeLabels[c][i].slice(0, 1) : i + 1}
                </text>
                {/* Label outside */}
                {c !== 1 && c !== 2 && (
                  <text
                    x={colX[c] + (c === 0 ? -22 : 22)}
                    y={nodeY(c, i) + 3}
                    textAnchor={c === 0 ? 'end' : 'start'}
                    className="fill-slate-400 font-mono"
                    fontSize="9"
                  >
                    {nodeLabels[c][i]}
                  </text>
                )}
              </g>
            ))}
            {/* Layer label */}
            <text
              x={colX[c]} y={H - 8}
              textAnchor="middle"
              className="fill-slate-500 font-mono uppercase tracking-wider"
              fontSize="9"
            >
              {layerLabels[c]}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-3 flex items-center justify-center gap-6 text-xs font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-violet-400" /> positive weight
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-rose-400" /> negative weight
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" /> signal
        </span>
      </div>
    </div>
  );
}

// ─── 6. ParallaxDepthScene ────────────────────────────────────────

export function ParallaxDepthScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // 0 when section enters from bottom, 1 when section exits at top
      const p = 1 - Math.min(Math.max((rect.top + rect.height * 0.5) / (winH + rect.height * 0.5), 0), 1);
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(${(progress - 0.5) * depth * -40}px, ${(progress - 0.5) * depth * 20}px, 0) scale(${1 + depth * 0.1})`,
  });

  return (
    <div ref={ref} className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1e2b] via-[#0c0e14] to-[#0a0e1a]">
      {/* Layer 1: stars / far background */}
      <div className="absolute inset-0" style={layer(0.2)}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: i % 5 === 0 ? '3px' : '1.5px',
              height: i % 5 === 0 ? '3px' : '1.5px',
              opacity: 0.3 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Layer 2: distant mountains */}
      <svg className="absolute bottom-0 w-full" style={layer(0.5)} viewBox="0 0 800 200" preserveAspectRatio="none">
        <path d="M0,200 L0,140 L80,80 L160,120 L240,60 L320,110 L400,40 L480,100 L560,70 L640,120 L720,90 L800,140 L800,200 Z" fill="rgba(139,92,246,0.15)" />
      </svg>

      {/* Layer 3: mid hills */}
      <svg className="absolute bottom-0 w-full" style={layer(0.9)} viewBox="0 0 800 200" preserveAspectRatio="none">
        <path d="M0,200 L0,170 L100,120 L200,160 L300,100 L400,150 L500,110 L600,160 L700,130 L800,170 L800,200 Z" fill="rgba(0,229,160,0.18)" />
      </svg>

      {/* Layer 4: foreground silhouette */}
      <svg className="absolute bottom-0 w-full" style={layer(1.4)} viewBox="0 0 800 200" preserveAspectRatio="none">
        <path d="M0,200 L0,185 L60,165 L120,180 L180,150 L240,175 L300,140 L360,170 L420,145 L480,175 L540,155 L600,180 L660,160 L720,175 L800,165 L800,200 Z" fill="rgba(10,14,26,0.95)" />
      </svg>

      {/* Floating medical icons in mid-layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={layer(0.7)}>
        <div className="relative">
          <div className="absolute -top-32 -left-24 w-12 h-12 rounded-xl bg-violet-500/20 backdrop-blur border border-violet-500/30 flex items-center justify-center rotate-12">
            <Dna className="w-6 h-6 text-violet-300" />
          </div>
          <div className="absolute -top-20 right-0 w-12 h-12 rounded-xl bg-emerald-500/20 backdrop-blur border border-emerald-500/30 flex items-center justify-center -rotate-6">
            <HeartPulse className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="absolute top-8 -left-32 w-12 h-12 rounded-xl bg-cyan-500/20 backdrop-blur border border-cyan-500/30 flex items-center justify-center rotate-6">
            <Microscope className="w-6 h-6 text-cyan-300" />
          </div>
          <div className="absolute top-12 -right-32 w-12 h-12 rounded-xl bg-rose-500/20 backdrop-blur border border-rose-500/30 flex items-center justify-center -rotate-12">
            <Pill className="w-6 h-6 text-rose-300" />
          </div>
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-emerald-500/30 to-violet-500/30 blur-2xl" />
        </div>
      </div>

      {/* Center caption */}
      <div className="absolute inset-0 flex items-center justify-center" style={layer(0.3)}>
        <div className="text-center">
          <Mountain className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
          <p className="text-white/90 font-semibold">Layered learning journey</p>
          <p className="text-xs text-slate-400 mt-1">Scroll to see depth shift · {Math.round(progress * 100)}%</p>
        </div>
      </div>
    </div>
  );
}

// ─── 7. LeaderboardRace ───────────────────────────────────────────

const RACERS = [
  { id: 1, name: 'Aisha M.', flag: '🇪🇬', color: '#00e5a0', questions: [120, 240, 380, 520, 680, 850, 920, 1100] },
  { id: 2, name: 'Kenji T.', flag: '🇯🇵', color: '#8b5cf6', questions: [180, 320, 410, 480, 590, 720, 810, 940] },
  { id: 3, name: 'Sofia R.', flag: '🇧🇷', color: '#06b6d4', questions: [90, 200, 350, 470, 610, 760, 880, 1020] },
  { id: 4, name: 'Marcus L.', flag: '🇺🇸', color: '#f59e0b', questions: [150, 280, 360, 440, 510, 580, 640, 710] },
  { id: 5, name: 'Priya K.', flag: '🇮🇳', color: '#ec4899', questions: [60, 180, 320, 460, 620, 790, 910, 1080] },
];

export function LeaderboardRace() {
  const [week, setWeek] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setWeek((w) => {
        if (w >= 7) {
          setPlaying(false);
          return 7;
        }
        return w + 1;
      });
    }, 1100);
    return () => clearInterval(id);
  }, [playing]);

  // Compute ranked order for current week
  const ranked = useMemo(() => {
    return [...RACERS].sort((a, b) => b.questions[week] - a.questions[week]);
  }, [week]);

  const maxQ = Math.max(...RACERS.map((r) => r.questions[7]));

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-white">Top students · week race</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setWeek(0); setPlaying(true); }}
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs flex items-center gap-1"
          >
            <RotateCw className="w-3 h-3" /> Replay
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs flex items-center gap-1"
          >
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      {/* Week indicator */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full transition-colors"
            style={{ background: i <= week ? '#00e5a0' : 'rgba(255,255,255,0.08)' }}
          />
        ))}
      </div>
      <div className="text-xs font-mono text-slate-400 mb-4">Week {week + 1} of 8</div>

      {/* Race track */}
      <div className="space-y-2">
        {ranked.map((r, i) => (
          <div key={r.id} className="flex items-center gap-3">
            <div className="w-6 text-center font-mono text-sm">
              {i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
            </div>
            <div className="w-32 text-sm truncate">
              <span className="mr-1">{r.flag}</span>
              <span className="text-slate-300">{r.name}</span>
            </div>
            <div className="flex-1 relative h-7 rounded-lg bg-white/5 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{
                  width: `${(r.questions[week] / maxQ) * 100}%`,
                  background: `linear-gradient(90deg, ${r.color}20, ${r.color}80)`,
                  boxShadow: i === 0 ? `0 0 16px ${r.color}40` : 'none',
                }}
              >
                <span className="font-mono text-xs text-white">{r.questions[week]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 8. MorphingLogo ──────────────────────────────────────────────

const LOGO_PATHS = [
  // heart
  'M50,30 C50,20 35,10 25,10 C15,10 5,20 5,30 C5,50 50,75 50,75 C50,75 95,50 95,30 C95,20 85,10 75,10 C65,10 50,20 50,30 Z',
  // cross (plus)
  'M40,10 L60,10 L60,40 L90,40 L90,60 L60,60 L60,90 L40,90 L40,60 L10,60 L10,40 L40,40 Z',
  // dna-ish spiral
  'M20,10 C80,30 20,50 80,70 C20,90 80,90 80,90 L20,10 Z M80,10 C20,30 80,50 20,70 C80,90 20,90 20,90 L80,10 Z',
  // brain-ish
  'M50,15 C30,15 20,30 25,45 C15,50 15,70 30,75 C35,85 60,85 70,75 C85,70 85,50 75,45 C80,30 70,15 50,15 Z',
  // stethoscope-ish
  'M20,20 L20,50 C20,70 40,80 50,80 C60,80 80,70 80,50 L80,20 M20,20 L30,15 M80,20 L70,15 M50,80 L50,95',
];

export function MorphingLogo() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % LOGO_PATHS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] p-8 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4 self-stretch">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-mono text-slate-500">brand · morphing identity</span>
      </div>

      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          <defs>
            <linearGradient id="logo-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#00e5a0" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="logo-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={LOGO_PATHS[idx]}
            fill="url(#logo-grad)"
            filter="url(#logo-glow)"
            style={{
              transition: 'd 1.4s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.6s',
            }}
          />
        </svg>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl -z-10" />
      </div>

      <div className="mt-4 flex gap-1.5">
        {LOGO_PATHS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: i === idx ? '#00e5a0' : 'rgba(255,255,255,0.2)',
              transform: i === idx ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      <div className="mt-3 text-xs font-mono text-slate-400">
        {['Cardiology', 'General Medicine', 'Genetics', 'Neurology', 'Auscultation'][idx]}
      </div>
    </div>
  );
}

// ─── 9. LiveExamSimulator ─────────────────────────────────────────

const EXAM_QUESTIONS = [
  { n: 1, answered: true, marked: false, status: 'correct' },
  { n: 2, answered: true, marked: false, status: 'correct' },
  { n: 3, answered: true, marked: true, status: 'incorrect' },
  { n: 4, answered: true, marked: false, status: 'correct' },
  { n: 5, answered: false, marked: true, status: null },
  { n: 6, answered: true, marked: false, status: 'correct' },
  { n: 7, answered: true, marked: false, status: 'correct' },
  { n: 8, answered: false, marked: false, status: null },
  { n: 9, answered: true, marked: false, status: 'incorrect' },
  { n: 10, answered: false, marked: false, status: null },
  { n: 11, answered: false, marked: false, status: null },
  { n: 12, answered: false, marked: false, status: null },
  { n: 13, answered: false, marked: false, status: null },
  { n: 14, answered: false, marked: false, status: null },
  { n: 15, answered: false, marked: false, status: null },
  { n: 16, answered: false, marked: false, status: null },
  { n: 17, answered: false, marked: false, status: null },
  { n: 18, answered: false, marked: false, status: null },
  { n: 19, answered: false, marked: false, status: null },
  { n: 20, answered: false, marked: false, status: null },
];

export function LiveExamSimulator() {
  const [current, setCurrent] = useState(8);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(8 * 60 + 42); // 8:42

  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const ss = (timeLeft % 60).toString().padStart(2, '0');
  const answeredCount = EXAM_QUESTIONS.filter((q) => q.answered).length;
  const markedCount = EXAM_QUESTIONS.filter((q) => q.marked).length;

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">Mock Exam · Cardiology Block</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-400">Q {current}/20</div>
          <div className={`flex items-center gap-1 font-mono text-sm px-2 py-0.5 rounded ${timeLeft < 300 ? 'bg-rose-500/15 text-rose-300' : 'bg-emerald-500/15 text-emerald-300'}`}>
            <Clock className="w-3 h-3" />
            {mm}:{ss}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_220px] gap-0">
        {/* Question panel */}
        <div className="p-5">
          <div className="text-xs font-mono text-slate-500 mb-2">Question 8 · Single Best Answer</div>
          <p className="text-sm text-slate-200 leading-relaxed mb-4">
            A 68-year-old male with a history of hypertension and type 2 diabetes presents with progressive dyspnea on exertion and bilateral lower extremity edema. Echocardiogram reveals an ejection fraction of 35% with dilated left ventricle. Which of the following medications has been shown to reduce mortality in this condition?
          </p>

          <div className="space-y-2">
            {[
              'Amlodipine 5 mg daily',
              'Carvedilol 12.5 mg BID',
              'Furosemide 40 mg daily',
              'Nitroglycerin patch 0.4 mg/hr',
              'Digoxin 0.125 mg daily',
            ].map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all text-sm ${
                  selected === i
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                    : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <span className="font-mono mr-2 text-slate-500">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => setCurrent((c) => Math.max(1, c - 1))}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs flex items-center gap-1"
            >
              <ChevronLeft className="w-3 h-3" /> Previous
            </button>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs flex items-center gap-1">
                <Bookmark className="w-3 h-3" /> Mark
              </button>
              <button
                onClick={() => setCurrent((c) => Math.min(20, c + 1))}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs flex items-center gap-1"
              >
                Next <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Question palette */}
        <div className="p-5 bg-white/[0.02] border-l border-white/10">
          <div className="text-xs font-mono text-slate-500 mb-3">Question palette</div>
          <div className="grid grid-cols-5 gap-1.5">
            {EXAM_QUESTIONS.map((q) => (
              <button
                key={q.n}
                onClick={() => setCurrent(q.n)}
                className={`aspect-square rounded text-xs font-mono transition-all ${
                  q.n === current
                    ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-[#0c0e14]'
                    : ''
                } ${
                  q.status === 'correct'
                    ? 'bg-emerald-500/30 text-emerald-200'
                    : q.status === 'incorrect'
                    ? 'bg-rose-500/30 text-rose-200'
                    : q.marked
                    ? 'bg-amber-500/30 text-amber-200'
                    : q.answered
                    ? 'bg-cyan-500/20 text-cyan-200'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {q.n}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/40" /> Answered
              </span>
              <span className="font-mono text-slate-300">{answeredCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500/40" /> Marked
              </span>
              <span className="font-mono text-slate-300">{markedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-white/10" /> Unseen
              </span>
              <span className="font-mono text-slate-300">{20 - answeredCount}</span>
            </div>
          </div>

          <button className="w-full mt-4 px-3 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-semibold">
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 10. ConfettiCelebration ──────────────────────────────────────

const CONFETTI_COLORS = ['#00e5a0', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981'];

export function ConfettiCelebration() {
  const [burst, setBurst] = useState(0);
  const [pieces, setPieces] = useState<{ id: number; x: number; color: string; rot: number; delay: number; shape: 'rect' | 'circ' }[]>([]);

  const trigger = useCallback(() => {
    const newPieces = Array.from({ length: 60 }).map((_, i) => ({
      id: burst * 1000 + i,
      x: 50 + (Math.random() - 0.5) * 30,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rot: Math.random() * 720 - 360,
      delay: Math.random() * 0.3,
      shape: Math.random() > 0.5 ? 'rect' : 'circ',
    }));
    setPieces(newPieces);
    setBurst((b) => b + 1);
    setTimeout(() => setPieces([]), 4000);
  }, [burst]);

  useEffect(() => {
    const id = setTimeout(trigger, 800); // auto first burst
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1e2b] via-[#0c0e14] to-[#0a0e1a] p-8 overflow-hidden text-center">
      {/* Confetti pieces */}
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            animation: `confetti-fall 3s cubic-bezier(0.3, 0.6, 0.4, 1) forwards`,
            animationDelay: `${p.delay}s`,
            // Custom properties for the keyframes
            ['--tx' as any]: `${(p.x - 50) * 6}px`,
            ['--rot' as any]: `${p.rot}deg`,
          }}
        >
          {p.shape === 'rect' ? (
            <div style={{ width: 8, height: 12, background: p.color, transform: `rotate(${p.rot}deg)` }} />
          ) : (
            <div style={{ width: 8, height: 8, background: p.color, borderRadius: '50%' }} />
          )}
        </div>
      ))}

      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/30">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Achievement unlocked!</h3>
        <p className="text-sm text-slate-400 mt-1">7-day streak · Cardiology Master</p>
        <button
          onClick={trigger}
          className="mt-4 px-4 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-sm flex items-center gap-2 mx-auto"
        >
          <Sparkles className="w-4 h-4" /> Trigger celebration
        </button>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), 220px) rotate(var(--rot));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ─── 11. WaveformPlayer ───────────────────────────────────────────

export function WaveformPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { start: 0, title: 'Introduction · murmurs overview', dur: '0:42' },
    { start: 0.15, title: 'Systolic murmurs', dur: '2:18' },
    { start: 0.42, title: 'Diastolic murmurs', dur: '3:05' },
    { start: 0.7, title: 'Auscultation points', dur: '2:30' },
    { start: 0.88, title: 'Clinical pearls', dur: '1:12' },
  ];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.004;
        if (next >= 1) { setPlaying(false); return 0; }
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const c = chapters.findIndex((ch, i) => progress >= ch.start && (i === chapters.length - 1 || progress < chapters[i + 1].start));
    setCurrentChapter(c >= 0 ? c + 1 : 1);
  }, [progress]);

  // Build deterministic waveform bars — store final percentage (0–100)
  // rounded to 1 decimal, so SSR and client stringify identically.
  const bars = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 80; i++) {
      const base = Math.sin(i * 0.4) * 0.3 + Math.sin(i * 0.13) * 0.4;
      const noise = ((i * 7) % 5) / 5 - 0.3;
      // Round the FINAL PERCENTAGE to 1 decimal — even after rounding h
      // to 4 decimals, multiplying by 100 can reintroduce float error
      // (e.g. 0.1342 * 100 = 13.420000000000002). The browser's CSS
      // parser normalises "13.420000000000002%" to "13.42%" during
      // hydration, so React 19 then flags the style attribute as
      // mismatched. Rounding the percentage itself to 1 decimal kills
      // this entirely.
      const pct = Math.round((0.5 + base + noise) * 1000) / 10;
      arr.push(Math.max(10, Math.min(100, pct)));
    }
    return arr;
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-semibold text-white text-sm">Podcast · Heart Murmurs Decoded</h3>
            <p className="text-xs text-slate-500">Dr. Elena Vasquez · 9:47</p>
          </div>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center hover:scale-105 transition-transform"
        >
          {playing ? <Pause className="w-4 h-4 text-[#0a0e1a]" /> : <Play className="w-4 h-4 text-[#0a0e1a] ml-0.5" />}
        </button>
      </div>

      {/* Waveform */}
      <div className="relative h-16 mb-2 cursor-pointer" onClick={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setProgress(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
      }}>
        <div className="absolute inset-0 flex items-center gap-[2px]">
          {bars.map((h, i) => {
            const barProgress = i / bars.length;
            const played = barProgress <= progress;
            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-colors"
                style={{
                  height: `${h}%`,
                  // Use longhand properties (backgroundImage / backgroundColor)
                  // instead of the `background` shorthand. React 19's SSR
                  // serializer outputs `background:` shorthand, but the
                  // browser's CSS parser expands it to `background-image:`
                  // + `background-position-x:` + ... during hydration,
                  // causing a style attribute mismatch.
                  backgroundImage: played
                    ? 'linear-gradient(to top, #00e5a0, #06b6d4)'
                    : 'none',
                  backgroundColor: played ? 'transparent' : 'rgba(255,255,255,0.12)',
                }}
              />
            );
          })}
        </div>
        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${progress * 100}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
        <span>{Math.floor(progress * 587 / 60)}:{(Math.floor(progress * 587) % 60).toString().padStart(2, '0')}</span>
        <span>9:47</span>
      </div>

      {/* Chapters */}
      <div className="space-y-1.5">
        <div className="text-xs font-mono text-slate-500 mb-1">Chapters</div>
        {chapters.map((c, i) => (
          <button
            key={i}
            onClick={() => setProgress(c.start)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition-colors ${
              currentChapter === i + 1
                ? 'bg-cyan-500/10 text-cyan-300'
                : 'text-slate-400 hover:bg-white/5'
            }`}
          >
            <span className="font-mono text-slate-500">{i + 1}</span>
            <span className="flex-1 truncate">{c.title}</span>
            <span className="font-mono text-slate-500">{c.dur}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 12. StatsCube3D ──────────────────────────────────────────────

export function StatsCube3D() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [face, setFace] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => setFace((f) => (f + 1) % 6), 3000);
    return () => clearInterval(id);
  }, [autoRotate]);

  const faces = [
    { label: 'Questions generated', value: '1.2M+', icon: Target, color: '#00e5a0', rot: 'rotateY(0deg) translateZ(80px)' },
    { label: 'Active students', value: '47K', icon: GraduationCap, color: '#8b5cf6', rot: 'rotateY(180deg) translateZ(80px)' },
    { label: 'Avg score lift', value: '+23%', icon: TrendingUp, color: '#06b6d4', rot: 'rotateY(90deg) translateZ(80px)' },
    { label: 'Hours saved', value: '180K', icon: Clock, color: '#f59e0b', rot: 'rotateY(-90deg) translateZ(80px)' },
    { label: 'Pass rate', value: '94%', icon: CheckCircle2, color: '#ec4899', rot: 'rotateX(90deg) translateZ(80px)' },
    { label: 'Countries', value: '89', icon: Globe2, color: '#10b981', rot: 'rotateX(-90deg) translateZ(80px)' },
  ];

  // Determine rotation matrix from current face
  const rotations = [
    'rotateY(0deg)',
    'rotateY(180deg)',
    'rotateY(-90deg)',
    'rotateY(90deg)',
    'rotateX(-90deg)',
    'rotateX(90deg)',
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0e1a] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-violet-400" />
          <h3 className="font-semibold text-white">Impact · six dimensions</h3>
        </div>
        <button
          onClick={() => setAutoRotate((r) => !r)}
          className="text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-1"
        >
          {autoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {autoRotate ? 'Pause' : 'Auto'}
        </button>
      </div>

      <div className="relative h-64 flex items-center justify-center" style={{ perspective: '600px' }}>
        <div
          className="relative w-40 h-40 transition-transform duration-1000 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: rotations[face],
          }}
        >
          {faces.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="absolute inset-0 rounded-2xl border-2 backdrop-blur flex flex-col items-center justify-center gap-2"
                style={{
                  transform: f.rot,
                  borderColor: `${f.color}40`,
                  background: `linear-gradient(135deg, ${f.color}15, ${f.color}05)`,
                  boxShadow: `inset 0 0 30px ${f.color}10`,
                }}
              >
                <Icon className="w-7 h-7" style={{ color: f.color }} />
                <div className="text-2xl font-bold text-white">{f.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{f.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Face indicators */}
      <div className="flex justify-center gap-1.5 mt-2">
        {faces.map((_, i) => (
          <button
            key={i}
            onClick={() => setFace(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background: i === face ? '#00e5a0' : 'rgba(255,255,255,0.15)',
              transform: i === face ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}


