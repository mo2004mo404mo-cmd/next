'use client';

/**
 * Advanced interactive components for the MedQ landing page.
 *
 * Each component is self-contained, accessible, and respects
 * prefers-reduced-motion where it matters.
 *
 * Components:
 *   - ScrollReveal       — fade/slide in on scroll (IntersectionObserver)
 *   - TiltCard           — 3D perspective tilt that follows the cursor
 *   - MagneticButton     — CTA that subtly pulls toward the cursor
 *   - Sparkline          — tiny inline SVG line chart
 *   - StudyHeatmap       — GitHub-style 52×7 contribution grid
 *   - LiveLeaderboard    — ranked list with rank-up/down indicators
 *   - AiDemo             — interactive chat with preset medical questions
 *   - AchievementBadges  — gamification preview grid with rarity tiers
 *   - FloatingScrollTop  — back-to-top button that appears on scroll
 *   - RegionSelector     — exam region dropdown that personalizes content
 *   - LiveStatsBar       — live "X students studying right now" counter
 *   - GradientText       — animated shimmering gradient text
 *   - StackingFeatures   — pin-and-scrub stacking feature cards
 */

import {
  useState, useEffect, useRef, useCallback, useMemo, ReactNode, useId,
} from 'react';
import Link from 'next/link';
import {
  ArrowRight, ArrowUp, Crown, Flame, TrendingUp, TrendingDown,
  Minus, Send, Sparkles, Trophy, Medal, Award, Star, Zap,
  Brain, Target, Check, ChevronDown, Globe2, Lock, Users,
  Activity, BookOpen, HeartPulse, Microscope, Pill, Stethoscope,
  MessageCircle, Mic, Gauge, GraduationCap, Wreath,
} from 'lucide-react';

// ─── ScrollReveal ──────────────────────────────────────────────────

export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

// ─── TiltCard ──────────────────────────────────────────────────────

export function TiltCard({
  children,
  className = '',
  max = 12,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  max?: number; // max degrees of tilt
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - py) * max * 2;
    const rotY = (px - 0.5) * max * 2;
    setTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`);
    setGlowPos({ x: px * 100, y: py * 100 });
  }, [max, scale]);

  const onLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={ref}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Glow overlay that follows the cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,229,160,0.12), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

// ─── MagneticButton ────────────────────────────────────────────────

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.3,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  }, [strength]);

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const baseClass = `group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-base font-bold transition-all duration-200 ${className}`;
  const variantClass = variant === 'primary'
    ? 'bg-[#00e5a0] text-[#0a0e1a] hover:bg-[#00d090] hover:shadow-[0_0_40px_-10px_rgba(0,229,160,0.6)]'
    : 'border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]';

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
  };

  if (href) {
    return (
      <Link
        ref={ref as any}
        href={href}
        className={`${baseClass} ${variantClass}`}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref as any}
      onClick={onClick}
      className={`${baseClass} ${variantClass}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}

// ─── Sparkline ─────────────────────────────────────────────────────

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color = '#00e5a0',
  fill = true,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * height;
    return [x, y];
  });
  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`))
    .join(' ');
  const fillPath = `${linePath} L ${width},${height} L 0,${height} Z`;
  const gradId = `spark-${useId().replace(/:/g, '')}`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      {fill && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillPath} fill={`url(#${gradId})`} />
        </>
      )}
      <path d={linePath} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="2" fill={color} />
    </svg>
  );
}

// ─── StudyHeatmap (GitHub-style contribution grid) ─────────────────

const HEATMAP_WEEKS = 26; // ~6 months
const HEATMAP_DAYS = 7;

// Mulberry32 — tiny deterministic PRNG. Using a fixed seed guarantees the
// SSR-rendered grid and the client-hydrated grid are byte-identical, which
// eliminates the "126 vs 131 active days" hydration mismatch we were seeing
// when generateHeatmap() called Math.random() (which produces different
// values on Node vs browser V8).
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateHeatmap(): number[][] {
  // [week][day] → intensity 0-4
  const grid: number[][] = [];
  const rand = mulberry32(20260808); // fixed seed → stable across SSR/client
  for (let w = 0; w < HEATMAP_WEEKS; w++) {
    const week: number[] = [];
    for (let d = 0; d < HEATMAP_DAYS; d++) {
      // Weekends a bit lighter, recent weeks heavier (study ramp-up)
      const isWeekend = d === 0 || d === 6;
      const rampUp = w / HEATMAP_WEEKS;
      const base = rand() * (0.4 + rampUp * 0.6);
      const v = isWeekend ? base * 0.6 : base;
      if (v < 0.15) week.push(0);
      else if (v < 0.35) week.push(1);
      else if (v < 0.55) week.push(2);
      else if (v < 0.75) week.push(3);
      else week.push(4);
    }
    grid.push(week);
  }
  return grid;
}

const HEAT_COLORS = ['#151821', '#0d3a2c', '#0f5e44', '#15915f', '#00e5a0'];

export function StudyHeatmap() {
  const grid = useMemo(() => generateHeatmap(), []);
  const total = useMemo(
    () => grid.flat().reduce((a, b) => a + (b > 0 ? 1 : 0), 0),
    [grid],
  );
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Activity className="size-4 text-[#00e5a0]" />
            Your study intensity
          </div>
          <div className="mt-0.5 text-xs text-[#8b95a8]">
            Last 6 months · {total} active days
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#5a6478]">
          <span>Less</span>
          {HEAT_COLORS.map((c, i) => (
            <span key={i} className="size-2.5 rounded-sm" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: `${HEATMAP_WEEKS * 14}px` }}>
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((v, di) => (
                <div
                  key={di}
                  className="size-3 rounded-sm transition-transform hover:scale-125"
                  style={{
                    background: HEAT_COLORS[v],
                    transitionDelay: `${wi * 8}ms`,
                  }}
                  title={`Week ${wi + 1}, day ${di + 1}: ${v * 25}% intensity`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#8b95a8]">
        <span>6 months ago</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00e5a0]/10 px-2.5 py-1 font-medium text-[#00e5a0]">
          <Flame className="size-3.5" />
          42-day streak
        </span>
        <span>Today</span>
      </div>
    </div>
  );
}

// ─── LiveLeaderboard ───────────────────────────────────────────────

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Aisha K.', country: '🇪🇬', score: 9842, delta: 0, avatar: 'AK', color: '#f59e0b' },
  { rank: 2, name: 'Marcus L.', country: '🇰🇷', score: 9721, delta: 1, avatar: 'ML', color: '#06b6d4' },
  { rank: 3, name: 'Priya S.', country: '🇮🇳', score: 9654, delta: -1, avatar: 'PS', color: '#8b5cf6' },
  { rank: 4, name: 'Kwame M.', country: '🇬🇭', score: 9502, delta: 2, avatar: 'KM', color: '#ec4899' },
  { rank: 5, name: 'Sofia R.', country: '🇲🇽', score: 9411, delta: 0, avatar: 'SR', color: '#00e5a0' },
  { rank: 6, name: 'Lin T.', country: '🇹🇼', score: 9356, delta: -1, avatar: 'LT', color: '#ff5757' },
  { rank: 7, name: 'Fatima A.', country: '🇸🇦', score: 9204, delta: 3, avatar: 'FA', color: '#14b8a6' },
];

export function LiveLeaderboard() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Trophy className="size-4 text-[#f59e0b]" />
          Global leaderboard
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#8b95a8]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5a0] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#00e5a0]" />
          </span>
          Live · this week
        </div>
      </div>
      <div className="space-y-1.5">
        {LEADERBOARD_DATA.map((u) => (
          <div
            key={u.rank}
            className={`flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/[0.03] ${
              u.rank <= 3 ? 'bg-white/[0.02]' : ''
            }`}
          >
            <div className="flex w-6 items-center justify-center text-sm font-bold">
              {u.rank === 1 && <Crown className="size-4 text-[#f59e0b]" />}
              {u.rank === 2 && <Medal className="size-4 text-[#8b95a8]" />}
              {u.rank === 3 && <Award className="size-4 text-[#cd7f32]" />}
              {u.rank > 3 && <span className="font-mono text-xs text-[#5a6478]">{u.rank}</span>}
            </div>
            <div
              className="flex size-8 items-center justify-center rounded-full text-[10px] font-bold text-[#0a0e1a]"
              style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}88)` }}
            >
              {u.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                {u.name} <span className="text-xs">{u.country}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {u.delta > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#00e5a0]">
                  <TrendingUp className="size-3" />+{u.delta}
                </span>
              )}
              {u.delta < 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#ff5757]">
                  <TrendingDown className="size-3" />{u.delta}
                </span>
              )}
              {u.delta === 0 && (
                <span className="inline-flex items-center text-[10px] text-[#5a6478]">
                  <Minus className="size-3" />
                </span>
              )}
              <span className="font-mono text-sm font-bold text-[#e8ecf4]">{u.score.toLocaleString('en-US')}</span>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 text-xs font-medium text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white"
      >
        View top 100
        <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

// ─── AiDemo (interactive chat) ─────────────────────────────────────

const DEMO_PROMPTS = [
  {
    label: 'Why peaked T waves in hyperkalemia?',
    icon: HeartPulse,
    response: "Great question. High extracellular K⁺ reduces the concentration gradient across the myocyte membrane. This **accelerates early repolarization** (phase 3 of the action potential) — so the T wave narrows and peaks.\n\nClinically: look for K⁺ > 5.5 mEq/L. ECG progression: peaked T → PR prolongation → QRS widening → sine wave → arrest.",
  },
  {
    label: 'Compare Type 1 vs Type 2 RTA',
    icon: Microscope,
    response: "**Type 1 (Distal) RTA** — alpha-intercalated cells can't secrete H⁺ against a gradient. Urine pH stays > 5.5. Associated with hypokalemia, kidney stones, bone demineralization.\n\n**Type 2 (Proximal) RTA** — proximal tubule can't reabsorb HCO₃⁻. Once plasma HCO₃⁻ drops low enough, distal nephron can still acidify → urine pH can fall < 5.5. Often Fanconi syndrome.",
  },
  {
    label: 'Mechanism of metformin',
    icon: Pill,
    response: "Metformin **activates AMPK** (AMP-activated protein kinase) in hepatocytes → ↓ hepatic gluconeogenesis, ↓ intestinal glucose absorption, ↑ peripheral glucose uptake.\n\nKey risk: **lactic acidosis** (avoid in AKI, severe CHF). Contrast with sulfonylureas which stimulate insulin secretion.",
  },
  {
    label: 'Differential for chest pain',
    icon: Stethoscope,
    response: "Life-threatening first:\n• **ACS** (STEMI/NSTEMI/unstable angina)\n• **PE** — pleuritic, dyspnea, risk factors\n• **Aortic dissection** — tearing, BP differential\n• **Tension pneumothorax** — absent breath sounds, tracheal deviation\n• **Esophageal rupture** (Boerhaave) — post-emesis\n\nThen: GERD, costochondritis, anxiety, herpes zoster.",
  },
];

export function AiDemo() {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const prompt = DEMO_PROMPTS[selected];
    setTyping(true);
    setDisplayed('');
    // Strip ** markers for the typing animation, but we'll restore them in render.
    const text = prompt.response.replace(/\*\*/g, '');
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [selected]);

  // Render markdown-style bold inline.
  const renderFormatted = (text: string) => {
    // We stripped ** before typing; now re-bold known patterns.
    // For simplicity, just render the typed text with line breaks.
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0e14] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-[#ff5f57]" />
          <div className="size-2.5 rounded-full bg-[#febc2e]" />
          <div className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex-1 truncate text-[11px] font-mono text-[#5a6478]">
          medq.app / ai-tutor · live demo
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#00e5a0]/10 px-2 py-0.5 text-[10px] font-medium text-[#00e5a0]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5a0] opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#00e5a0]" />
          </span>
          Live
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[200px_1fr]">
        {/* Prompt picker */}
        <div className="border-b border-white/[0.06] p-3 md:border-b-0 md:border-r">
          <div className="mb-2 text-[10px] uppercase tracking-wider text-[#5a6478]">
            Try a question
          </div>
          <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            {DEMO_PROMPTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                    selected === i
                      ? 'bg-[#00e5a0]/10 text-[#00e5a0]'
                      : 'text-[#8b95a8] hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span className="line-clamp-2">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        <div className="min-h-[320px] p-5">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#00e5a0]/15 px-3.5 py-2 text-xs text-[#e8ecf4]">
              {DEMO_PROMPTS[selected].label}
            </div>
          </div>

          {/* AI response with typing */}
          <div className="mt-3 flex justify-start gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5a0] to-[#06b6d4] text-[10px] font-bold text-[#0a0e1a]">
              AI
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.04] px-4 py-2.5 text-xs leading-relaxed text-[#c8d0e0]">
              {renderFormatted(displayed)}
              {typing && (
                <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-[#00e5a0]" />
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white">
              <Sparkles className="size-3 text-[#00e5a0]" />
              Generate quiz
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white">
              <Brain className="size-3 text-[#00e5a0]" />
              Save as flashcard
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-[#8b95a8] transition-colors hover:bg-white/[0.05] hover:text-white">
              <Target className="size-3 text-[#00e5a0]" />
              Add to weak areas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AchievementBadges ─────────────────────────────────────────────

const BADGES = [
  { name: 'First Diagnosis', icon: Stethoscope, rarity: 'common', color: '#8b95a8', desc: 'Complete your first case sim' },
  { name: 'Streak x7', icon: Flame, rarity: 'common', color: '#f59e0b', desc: '7-day study streak' },
  { name: 'Streak x30', icon: Flame, rarity: 'rare', color: '#ff5757', desc: '30-day study streak' },
  { name: 'Streak x100', icon: Flame, rarity: 'legendary', color: '#8b5cf6', desc: '100-day study streak' },
  { name: 'Quiz Master', icon: Brain, rarity: 'rare', color: '#06b6d4', desc: '90%+ on 10 quizzes' },
  { name: 'Top 1%', icon: Crown, rarity: 'epic', color: '#f59e0b', desc: 'Reach top 1% globally' },
  { name: 'Cardiology Pro', icon: HeartPulse, rarity: 'epic', color: '#ff5757', desc: 'Master cardiology' },
  { name: 'Night Owl', icon: Activity, rarity: 'rare', color: '#8b5cf6', desc: 'Study after midnight 10x' },
  { name: 'Speed Demon', icon: Gauge, rarity: 'epic', color: '#00e5a0', desc: 'Avg < 30s per question' },
  { name: 'Polyglot', icon: Globe2, rarity: 'rare', color: '#06b6d4', desc: 'Study in 3+ languages' },
  { name: 'Mentor', icon: GraduationCap, rarity: 'epic', color: '#00e5a0', desc: 'Help 50 peers in groups' },
  { name: 'Exam Slayer', icon: Trophy, rarity: 'legendary', color: '#f59e0b', desc: 'Pass your exam' },
];

const RARITY_STYLES = {
  common: { ring: 'rgba(139, 149, 168, 0.3)', glow: 'rgba(139, 149, 168, 0.15)', label: 'Common', labelColor: '#8b95a8' },
  rare: { ring: 'rgba(6, 182, 212, 0.4)', glow: 'rgba(6, 182, 212, 0.2)', label: 'Rare', labelColor: '#06b6d4' },
  epic: { ring: 'rgba(139, 92, 246, 0.4)', glow: 'rgba(139, 92, 246, 0.25)', label: 'Epic', labelColor: '#8b5cf6' },
  legendary: { ring: 'rgba(245, 158, 11, 0.5)', glow: 'rgba(245, 158, 11, 0.3)', label: 'Legendary', labelColor: '#f59e0b' },
};

export function AchievementBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {BADGES.map((b) => {
        const Icon = b.icon;
        const r = RARITY_STYLES[b.rarity as keyof typeof RARITY_STYLES];
        return (
          <div
            key={b.name}
            className="group relative overflow-hidden rounded-2xl border p-4 text-center transition-all hover:scale-[1.03]"
            style={{
              borderColor: r.ring,
              background: `radial-gradient(circle at 50% 0%, ${r.glow}, transparent 70%)`,
            }}
          >
            <div
              className="mx-auto flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${b.color}, ${b.color}66)`,
                boxShadow: `0 0 24px -4px ${b.color}80`,
              }}
            >
              <Icon className="size-6 text-white" />
            </div>
            <div className="mt-3 text-sm font-bold text-white">{b.name}</div>
            <div className="mt-1 text-[10px] text-[#8b95a8]">{b.desc}</div>
            <div
              className="mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ background: `${r.labelColor}20`, color: r.labelColor }}
            >
              {r.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── FloatingScrollTop ─────────────────────────────────────────────

export function FloatingScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border border-white/10 bg-[#0c0e14]/90 text-white shadow-xl backdrop-blur transition-all hover:bg-[#151821] hover:text-[#00e5a0] ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="size-4" />
    </button>
  );
}

// ─── RegionSelector ────────────────────────────────────────────────

const REGIONS = [
  { id: 'us', label: 'United States', flag: '🇺🇸', exams: ['USMLE Step 1', 'USMLE Step 2 CK', 'COMLEX'] },
  { id: 'uk', label: 'United Kingdom', flag: '🇬🇧', exams: ['MRCP Part 1', 'MRCP Part 2', 'PLAB 1', 'PLAB 2'] },
  { id: 'in', label: 'India', flag: '🇮🇳', exams: ['NEET-PG', 'FMGE', 'INICET'] },
  { id: 'ca', label: 'Canada', flag: '🇨🇦', exams: ['MCCQE Part 1', 'MCCQE Part 2'] },
  { id: 'au', label: 'Australia', flag: '🇦🇺', exams: ['AMC Part 1', 'AMC Part 2'] },
];

export function RegionSelector({
  region,
  onChange,
}: {
  region: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = REGIONS.find((r) => r.id === region) ?? REGIONS[0];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
      >
        <Globe2 className="size-4 text-[#00e5a0]" />
        <span className="text-base">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown className={`size-4 text-[#8b95a8] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0e14] p-1 shadow-2xl">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onChange(r.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  r.id === region
                    ? 'bg-[#00e5a0]/10 text-[#00e5a0]'
                    : 'text-[#c8d0e0] hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-base">{r.flag}</span>
                <span className="flex-1">{r.label}</span>
                {r.id === region && <Check className="size-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── LiveStatsBar ──────────────────────────────────────────────────

export function LiveStatsBar() {
  const [studyingNow, setStudyingNow] = useState(1247);
  const [questionsToday, setQuestionsToday] = useState(38492);

  useEffect(() => {
    const id = setInterval(() => {
      setStudyingNow((n) => Math.max(1100, n + Math.floor(Math.random() * 21) - 10));
      setQuestionsToday((n) => n + Math.floor(Math.random() * 8) + 1);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#8b95a8]">
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5a0] opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-[#00e5a0]" />
        </span>
        <span className="font-mono font-semibold text-white">{studyingNow.toLocaleString('en-US')}</span>
        students studying right now
      </span>
      <span className="hidden text-white/20 sm:inline">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Activity className="size-3.5 text-[#06b6d4]" />
        <span className="font-mono font-semibold text-white">{questionsToday.toLocaleString('en-US')}</span>
        questions answered today
      </span>
      <span className="hidden text-white/20 sm:inline">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Users className="size-3.5 text-[#8b5cf6]" />
        <span className="font-mono font-semibold text-white">52,341</span>
        active this week
      </span>
    </div>
  );
}

// ─── GradientText (animated shimmer) ───────────────────────────────

export function GradientText({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #00e5a0, #06b6d4, #8b5cf6, #00e5a0)',
        backgroundSize: '300% 100%',
        animation: 'medq-shimmer 4s linear infinite',
      }}
    >
      {children}
      <style jsx>{`
        @keyframes medq-shimmer {
          from { background-position: 0% 50%; }
          to { background-position: 300% 50%; }
        }
      `}</style>
    </span>
  );
}

// ─── LiveCommunitySection (heatmap + leaderboard combo) ────────────

export function LiveCommunitySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#8b95a8]">
            <Users className="size-3 text-[#00e5a0]" />
            Study with 52,000+ future doctors
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A community that keeps you accountable
          </h2>
          <p className="mt-4 text-lg text-[#8b95a8]">
            Track your study intensity, climb the global leaderboard, and earn
            achievements. Every day you show up, MedQ shows up for you.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <ScrollReveal delay={0}>
          <StudyHeatmap />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <LiveLeaderboard />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── AiDemoSection ─────────────────────────────────────────────────

export function AiDemoSection() {
  return (
    <section className="border-y border-white/[0.04] bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <Sparkles className="size-3" />
              Try the AI tutor right now
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Don't take our word for it. Ask it yourself.
            </h2>
            <p className="mt-4 text-lg text-[#8b95a8]">
              Pick a question. Watch the AI explain it the way a senior resident
              would — clear, clinical, and calibrated to your level.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-14">
          <AiDemo />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── AchievementsSection ───────────────────────────────────────────

export function AchievementsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#8b95a8]">
            <Trophy className="size-3 text-[#f59e0b]" />
            Gamified · addictive in a good way
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Earn achievements as you grow
          </h2>
          <p className="mt-4 text-lg text-[#8b95a8]">
            120+ badges across common, rare, epic, and legendary tiers. Each one
            marks a real milestone — and unlocks new study content.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120} className="mt-14">
        <AchievementBadges />
      </ScrollReveal>
    </section>
  );
}
