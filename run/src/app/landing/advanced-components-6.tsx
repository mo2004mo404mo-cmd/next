'use client';

/**
 * Batch 6 — High-impact landing page enhancements.
 *
 * Design goals:
 *   - Conversion-focused: every component drives toward "Get started free"
 *   - Visually striking: 3D, parallax, animated SVG
 *   - Mobile-first responsive
 *   - Hydration-safe: all random/time values deferred to useEffect or
 *     derived from deterministic seeds
 *
 * Components:
 *   - HeroParallax3D        — multi-layer parallax hero with floating medical icons
 *   - StickyCtaBar          — bottom CTA that appears after scroll, with urgency timer
 *   - MobileAppShowcase     — iPhone mockup with rotating app screens
 *   - TestimonialCoverflow  — 3D coverflow testimonials with auto-rotate
 *   - FeatureMatrix         — detailed comparison vs alternatives
 *   - LabResultsViewer      — interactive lab panel with abnormal flags
 *   - HeartbeatEcgBanner    — animated ECG strip with BPM
 *   - ReadingProgress       — section-by-side reading progress indicator
 *   - AchievementPopup      — gamified toast that fires on scroll milestones
 *   - CoverageMap           — world map pulsing with student locations
 */

import {
  useState, useEffect, useRef, useMemo, useCallback, ReactNode,
} from 'react';
import Link from 'next/link';
import {
  ArrowRight, Check, X, Star, Activity, HeartPulse, Brain,
  Stethoscope, Pill, Microscope, FlaskConical, TrendingUp,
  ChevronLeft, ChevronRight, Zap, Award, Users, Globe2,
  Clock, AlertTriangle, Shield, Sparkles, Lock,
} from 'lucide-react';

// ─── 1. HeroParallax3D ─────────────────────────────────────────────
// Multi-layer parallax hero with floating medical icons at different
// depths. Mouse movement shifts each layer by a different amount.

const HERO_ICONS = [
  { Icon: HeartPulse, x: 8, y: 18, depth: 0.3, color: '#ef4444', size: 36 },
  { Icon: Brain, x: 78, y: 12, depth: 0.5, color: '#8b5cf6', size: 40 },
  { Icon: Stethoscope, x: 14, y: 68, depth: 0.4, color: '#00e5a0', size: 34 },
  { Icon: Pill, x: 86, y: 72, depth: 0.6, color: '#06b6d4', size: 32 },
  { Icon: Microscope, x: 45, y: 8, depth: 0.7, color: '#f59e0b', size: 30 },
  { Icon: FlaskConical, x: 88, y: 42, depth: 0.35, color: '#ec4899', size: 30 },
  { Icon: Activity, x: 6, y: 42, depth: 0.55, color: '#10b981', size: 28 },
  { Icon: AlertTriangle, x: 60, y: 84, depth: 0.45, color: '#fbbf24', size: 26 },
];

export function HeroParallax3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{
        position: 'relative',
        minHeight: 480,
        borderRadius: 24,
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 30% 20%, rgba(0,229,160,0.08), transparent 60%),' +
          'radial-gradient(circle at 70% 80%, rgba(139,92,246,0.08), transparent 60%),' +
          'linear-gradient(135deg, #0a0e1a, #151821)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Floating icons layer */}
      {HERO_ICONS.map(({ Icon, x, y, depth, color, size }, i) => {
        const dx = mouse.x * depth * 60;
        const dy = mouse.y * depth * 60;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(${dx}px, ${dy}px)`,
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              opacity: 0.4 + depth * 0.4,
              filter: `drop-shadow(0 0 ${size / 4}px ${color}80)`,
            }}
          >
            <div
              style={{
                width: size * 2,
                height: size * 2,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${color}20, transparent 70%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `float-${i} ${6 + i}s ease-in-out infinite`,
              }}
            >
              <Icon size={size} color={color} strokeWidth={1.5} />
            </div>
          </div>
        );
      })}

      {/* Center content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 480,
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 999,
            background: 'rgba(0,229,160,0.08)',
            border: '1px solid rgba(0,229,160,0.25)',
            color: '#00e5a0',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.5,
            marginBottom: 24,
          }}
        >
          <Sparkles size={12} /> AI-NATIVE MEDICAL EDUCATION
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.1,
            maxWidth: 720,
            margin: 0,
          }}
        >
          Every concept. Every case. Every question.
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #00e5a0, #06b6d4, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            One platform.
          </span>
        </h2>
        <p
          style={{
            color: '#94a3b8',
            fontSize: 15,
            maxWidth: 540,
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          MedQ uses generative AI to turn any topic into a clinical case, a
          quiz, a flashcard deck, or a personalized study plan — in seconds.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 22px',
              borderRadius: 10,
              background: '#00e5a0',
              color: '#0a0e1a',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Start free <ArrowRight size={14} />
          </Link>
          <Link
            href="/landing#demo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 22px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#cbd5e1',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Watch demo
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes float-1 { 0%,100% { transform: translateY(-8px); } 50% { transform: translateY(8px); } }
        @keyframes float-2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-3 { 0%,100% { transform: translateY(6px); } 50% { transform: translateY(-6px); } }
        @keyframes float-4 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes float-5 { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(10px); } }
        @keyframes float-6 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes float-7 { 0%,100% { transform: translateY(8px); } 50% { transform: translateY(-8px); } }
      `}</style>
    </div>
  );
}

// ─── 2. StickyCtaBar ───────────────────────────────────────────────
// Bottom-of-viewport CTA bar that slides up after the user scrolls past
// the hero. Includes a live urgency timer ("Offer ends in 02:14:33").

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  // Hydration-safe: start at null on both server and client, populate in
  // useEffect. SSR HTML and first client paint both render the bar hidden,
  // then it (maybe) appears after mount.
  const [secsLeft, setSecsLeft] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600 && window.scrollY < document.body.scrollHeight - 1200);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Urgency timer: 2h 14m 33s countdown, persists across reloads via
    // sessionStorage so it doesn't reset on every navigation.
    const KEY = 'medq_cta_deadline';
    let deadline = Number(sessionStorage.getItem(KEY) || 0);
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + (2 * 3600 + 14 * 60 + 33) * 1000;
      sessionStorage.setItem(KEY, String(deadline));
    }
    const tick = () => {
      const s = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setSecsLeft(s);
    };
    tick();
    const id = setInterval(tick, 1000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(id);
    };
  }, []);

  const hh = secsLeft ? String(Math.floor(secsLeft / 3600)).padStart(2, '0') : '--';
  const mm = secsLeft ? String(Math.floor((secsLeft % 3600) / 60)).padStart(2, '0') : '--';
  const ss = secsLeft ? String(secsLeft % 60).padStart(2, '0') : '--';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          margin: '0 auto 16px',
          maxWidth: 920,
          background: 'linear-gradient(90deg, rgba(0,229,160,0.12), rgba(139,92,246,0.12))',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,229,160,0.3)',
          borderRadius: 16,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0, flex: 1 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #00e5a0, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Zap size={18} color="#0a0e1a" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
              Launch week — 50% off Annual
            </div>
            <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>
              Use code <span style={{ color: '#00e5a0', fontFamily: 'monospace', fontWeight: 600 }}>MEDQ50</span> · ends in{' '}
              <span style={{ fontFamily: 'monospace', color: '#fbbf24', fontWeight: 600 }}>
                {hh}:{mm}:{ss}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 10,
            background: '#00e5a0',
            color: '#0a0e1a',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Claim offer <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

// ─── 3. MobileAppShowcase ──────────────────────────────────────────
// iPhone-style mockup with rotating app screens (study / quiz / progress).

const APP_SCREENS = [
  {
    title: 'Today\'s plan',
    accent: '#00e5a0',
    body: [
      { label: 'Cardio · 30 min', done: true },
      { label: 'Pharm quiz · 15 Qs', done: true },
      { label: 'Anatomy flashcards · 20', done: false },
      { label: 'Case: MI workup', done: false },
    ],
  },
  {
    title: 'Live quiz',
    accent: '#8b5cf6',
    body: [
      { q: 'A 62yo male, crushing chest pain...', options: ['STEMI', 'NSTEMI', 'UA', 'Aortic dissection'], answer: 0 },
    ],
  },
  {
    title: 'Mastery',
    accent: '#06b6d4',
    body: [
      { topic: 'Cardiology', pct: 87 },
      { topic: 'Pharmacology', pct: 72 },
      { topic: 'Anatomy', pct: 64 },
      { topic: 'Pathology', pct: 91 },
    ],
  },
];

export function MobileAppShowcase() {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setScreen(s => (s + 1) % APP_SCREENS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const s = APP_SCREENS[screen];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 24px',
        background: 'linear-gradient(180deg, rgba(139,92,246,0.04), rgba(0,229,160,0.04))',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: '#a78bfa', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>
          POCKET-SIZED LEARNING
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
          Study anywhere, even offline
        </h3>
        <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 8, maxWidth: 360 }}>
          Native iOS / Android app with cached questions, offline mode, and push reminders.
        </p>
      </div>

      {/* iPhone mockup */}
      <div
        style={{
          width: 260,
          height: 540,
          borderRadius: 38,
          background: 'linear-gradient(135deg, #1a1e2b, #0a0e1a)',
          border: '8px solid #1a1e2b',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset',
          padding: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 22,
            background: '#0a0e1a',
            borderRadius: 12,
            zIndex: 2,
          }}
        />
        {/* Screen content */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 28,
            background: '#0c0e14',
            padding: '36px 14px 14px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{s.title}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {APP_SCREENS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: i === screen ? s.accent : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Screen body */}
          {screen === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.body.map((item: any, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      background: item.done ? s.accent : 'transparent',
                      border: `1.5px solid ${item.done ? s.accent : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.done && <Check size={11} color="#0a0e1a" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: 11, color: item.done ? '#cbd5e1' : '#fff', textDecoration: item.done ? 'line-through' : 'none' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {screen === 1 && (
            <div>
              <div style={{ fontSize: 11, color: '#cbd5e1', lineHeight: 1.5, marginBottom: 12 }}>
                {s.body[0].q}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {s.body[0].options.map((opt: string, i: number) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      background: i === s.body[0].answer ? `${s.accent}20` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${i === s.body[0].answer ? s.accent : 'rgba(255,255,255,0.06)'}`,
                      fontSize: 10,
                      color: i === s.body[0].answer ? s.accent : '#94a3b8',
                      fontWeight: i === s.body[0].answer ? 700 : 400,
                    }}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
              {s.body.map((item: any, i: number) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: '#cbd5e1' }}>{item.topic}</span>
                    <span style={{ fontSize: 10, color: s.accent, fontWeight: 700, fontFamily: 'monospace' }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${item.pct}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${s.accent}, ${s.accent}80)`,
                        transition: 'width 0.6s ease-out',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* App store badges (mock) */}
      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        {['App Store', 'Google Play'].map(store => (
          <div
            key={store}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: 11,
              color: '#cbd5e1',
              fontWeight: 600,
            }}
          >
            {store}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. TestimonialCoverflow ───────────────────────────────────────
// 3D coverflow-style testimonial carousel with auto-rotate and
// keyboard navigation. Cards rotate in 3D space around a central axis.

const TESTIMONIALS = [
  {
    name: 'Dr. Sarah Chen',
    role: 'PGY-1 Internal Medicine',
    quote: 'I went from 42% to 94% on practice Step 2 CK blocks in 6 weeks. The AI case generator is unreal.',
    rating: 5,
    avatar: '#00e5a0',
  },
  {
    name: 'Ahmed Hassan',
    role: 'USMLE Step 1 candidate',
    quote: 'The spaced repetition actually sticks. I retain topics I crammed months ago.',
    rating: 5,
    avatar: '#8b5cf6',
  },
  {
    name: 'Priya Patel',
    role: 'MRCP Part 1',
    quote: 'Worth every penny. The diagnostic quiz found gaps I didn\'t know I had.',
    rating: 5,
    avatar: '#06b6d4',
  },
  {
    name: 'James Okoro',
    role: 'PLAB 2 candidate',
    quote: 'Used to hate flashcards. MedQ\'s AI decks make them feel personalized, not generic.',
    rating: 5,
    avatar: '#f59e0b',
  },
  {
    name: 'Maria Rodriguez',
    role: 'NEET PG rank 142',
    quote: 'The mentor matching connected me with a cardiologist who reviewed my weak spots.',
    rating: 5,
    avatar: '#ec4899',
  },
];

export function TestimonialCoverflow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      if (e.key === 'ArrowRight') setActive(a => (a + 1) % TESTIMONIALS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      style={{
        padding: '40px 24px',
        background: 'linear-gradient(180deg, rgba(0,229,160,0.03), rgba(139,92,246,0.03))',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 11, color: '#00e5a0', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>
          ★ 4.9 / 5 · 12,400+ REVIEWS
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
          Loved by med students worldwide
        </h3>
      </div>

      {/* Coverflow container */}
      <div
        style={{
          position: 'relative',
          height: 280,
          perspective: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {TESTIMONIALS.map((t, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          // Clamp to 2 visible on each side
          if (abs > 2) return null;
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                position: 'absolute',
                width: 320,
                padding: 24,
                borderRadius: 16,
                background: isActive
                  ? 'linear-gradient(135deg, rgba(0,229,160,0.08), rgba(139,92,246,0.08))'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.06)'}`,
                transform: `translateX(${offset * 220}px) translateZ(${-abs * 120}px) rotateY(${offset * -35}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                opacity: abs > 1 ? 0.3 : 1 - abs * 0.3,
                zIndex: 10 - abs,
                cursor: isActive ? 'default' : 'pointer',
                boxShadow: isActive ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} color="#fbbf24" fill="#fbbf24" />
                ))}
              </div>
              <p style={{ color: '#e8ecf4', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic', margin: 0, marginBottom: 16 }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.avatar}, ${t.avatar}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0a0e1a',
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                >
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{t.role}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 24 }}>
        <button
          onClick={() => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={16} />
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: i === active ? '#00e5a0' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setActive(a => (a + 1) % TESTIMONIALS.length)}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── 5. FeatureMatrix ──────────────────────────────────────────────
// Detailed comparison table: MedQ vs textbooks vs question banks vs
// generic AI tutors.

const MATRIX_FEATURES = [
  { label: 'AI-generated cases from any topic', medq: true, textbook: false, qbank: false, generic: true },
  { label: 'Spaced repetition built-in', medq: true, textbook: false, qbank: false, generic: false },
  { label: 'Personalized weekly study plan', medq: true, textbook: false, qbank: false, generic: false },
  { label: 'Adaptive to your weak spots', medq: true, textbook: false, qbank: true, generic: true },
  { label: 'BYOK (bring your own AI key)', medq: true, textbook: false, qbank: false, generic: false },
  { label: 'Works offline (mobile app)', medq: true, textbook: true, qbank: false, generic: false },
  { label: 'Mentor matching with physicians', medq: true, textbook: false, qbank: false, generic: false },
  { label: 'Multi-region exam prep (USMLE/MRCP/PLAB/NEET)', medq: true, textbook: false, qbank: true, generic: false },
  { label: 'No data sold to third parties', medq: true, textbook: true, qbank: false, generic: false },
  { label: 'Price / month', medq: '$8', textbook: '$0', qbank: '$50', generic: '$20' },
];

export function FeatureMatrix() {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, color: '#64748b', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Feature
              </th>
              <th style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid rgba(0,229,160,0.3)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#00e5a0' }}>MedQ</div>
                  <div style={{ fontSize: 9, color: '#94a3b8', letterSpacing: 1 }}>RECOMMENDED</div>
                </div>
              </th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 13, color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Textbooks
              </th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 13, color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Question bank
              </th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 13, color: '#94a3b8', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Generic AI
              </th>
            </tr>
          </thead>
          <tbody>
            {MATRIX_FEATURES.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px 20px', fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>
                  {row.label}
                </td>
                <td style={{
                  padding: '12px 20px',
                  textAlign: 'center',
                  background: 'rgba(0,229,160,0.04)',
                }}>
                  <MatrixCell value={row.medq} highlight />
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <MatrixCell value={row.textbook} />
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <MatrixCell value={row.qbank} />
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <MatrixCell value={row.generic} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MatrixCell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (typeof value === 'string') {
    return (
      <span style={{
        fontSize: 13,
        fontWeight: 700,
        color: highlight ? '#00e5a0' : '#94a3b8',
        fontFamily: 'monospace',
      }}>
        {value}
      </span>
    );
  }
  return value ? (
    <div style={{ display: 'inline-flex' }}>
      <div style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: highlight ? '#00e5a0' : 'rgba(0,229,160,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Check size={13} color={highlight ? '#0a0e1a' : '#00e5a0'} strokeWidth={3} />
      </div>
    </div>
  ) : (
    <X size={16} color="#475569" style={{ opacity: 0.6 }} />
  );
}

// ─── 6. LabResultsViewer ───────────────────────────────────────────
// Interactive lab panel — click a row to see reference range and
// interpretation. Abnormal values are highlighted.

const LAB_PANEL = [
  { test: 'Sodium', value: 142, unit: 'mmol/L', ref: '135-145', flag: 'normal' },
  { test: 'Potassium', value: 5.8, unit: 'mmol/L', ref: '3.5-5.0', flag: 'high' },
  { test: 'Creatinine', value: 1.8, unit: 'mg/dL', ref: '0.7-1.3', flag: 'high' },
  { test: 'BUN', value: 28, unit: 'mg/dL', ref: '7-20', flag: 'high' },
  { test: 'Glucose', value: 118, unit: 'mg/dL', ref: '70-99', flag: 'high' },
  { test: 'Hemoglobin', value: 11.2, unit: 'g/dL', ref: '13.5-17.5', flag: 'low' },
  { test: 'WBC', value: 14.2, unit: '×10⁹/L', ref: '4.0-11.0', flag: 'high' },
  { test: 'Platelets', value: 245, unit: '×10⁹/L', ref: '150-400', flag: 'normal' },
  { test: 'Troponin I', value: 3.8, unit: 'ng/mL', ref: '<0.04', flag: 'high' },
  { test: 'pH', value: 7.32, unit: '', ref: '7.35-7.45', flag: 'low' },
];

export function LabResultsViewer() {
  const [selected, setSelected] = useState<number | null>(0);

  const sel = selected !== null ? LAB_PANEL[selected] : null;

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(0,229,160,0.04), rgba(0,0,0,0))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <FlaskConical size={16} color="#00e5a0" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>CBC + BMP + Cardiac</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>Drawn 18:42 · Resulted 19:05</div>
        </div>
        <div style={{ padding: '3px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.15)', color: '#fca5a5', fontSize: 10, fontWeight: 700 }}>
          CRITICAL
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 360 }}>
        {/* Lab list */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', maxHeight: 360, overflowY: 'auto' }}>
          {LAB_PANEL.map((lab, i) => {
            const isSelected = selected === i;
            const color = lab.flag === 'high' ? '#ef4444' : lab.flag === 'low' ? '#fbbf24' : '#00e5a0';
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: isSelected ? 'rgba(0,229,160,0.06)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 500 }}>{lab.test}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Ref: {lab.ref} {lab.unit}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontFamily: 'monospace', fontWeight: 700, color }}>
                    {lab.value}
                  </span>
                  {lab.flag !== 'normal' && (
                    <span style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: color,
                      color: '#0a0e1a',
                      fontSize: 10,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {lab.flag === 'high' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div style={{ padding: 20 }}>
          {sel ? (
            <>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                {sel.test}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                <span style={{
                  fontSize: 28,
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  color: sel.flag === 'high' ? '#ef4444' : sel.flag === 'low' ? '#fbbf24' : '#00e5a0',
                }}>
                  {sel.value}
                </span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{sel.unit}</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: sel.flag === 'high' ? 'rgba(239,68,68,0.15)'
                    : sel.flag === 'low' ? 'rgba(251,191,36,0.15)'
                    : 'rgba(0,229,160,0.15)',
                  color: sel.flag === 'high' ? '#fca5a5'
                    : sel.flag === 'low' ? '#fbbf24'
                    : '#00e5a0',
                  fontSize: 10,
                  fontWeight: 700,
                }}>
                  {sel.flag === 'high' ? 'HIGH' : sel.flag === 'low' ? 'LOW' : 'NORMAL'}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>REFERENCE RANGE</div>
              <div style={{ fontSize: 14, color: '#cbd5e1', fontFamily: 'monospace', marginBottom: 16 }}>
                {sel.ref} {sel.unit}
              </div>
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>CLINICAL NOTE</div>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
                {sel.test === 'Troponin I' && 'Markedly elevated troponin consistent with acute myocardial injury. Correlate with ECG and clinical presentation. STEMI activation criteria met.'}
                {sel.test === 'Potassium' && 'Hyperkalemia. Consider calcium gluconate, insulin/dextrose, and kayexalate. Recheck in 2h.'}
                {sel.test === 'Creatinine' && 'Acute kidney injury. Assess volume status, review medications for nephrotoxins.'}
                {sel.test === 'Glucose' && 'Hyperglycemia. If diabetic, check HbA1c. Consider insulin sliding scale.'}
                {sel.test === 'Hemoglobin' && 'Anemia. Evaluate for GI bleed, hemolysis, or chronic disease.'}
                {sel.test === 'WBC' && 'Leukocytosis concerning for infection or stress response. Correlate with differential.'}
                {sel.test === 'pH' && 'Mild acidemia. Calculate anion gap to determine etiology.'}
                {sel.test === 'Sodium' && 'Within normal limits.'}
                {sel.test === 'BUN' && 'Elevated, consistent with dehydration or AKI. BUN:Cr ratio elevated.'}
                {sel.test === 'Platelets' && 'Within normal limits.'}
              </div>
            </>
          ) : (
            <div style={{ color: '#64748b', fontSize: 12, textAlign: 'center', paddingTop: 60 }}>
              Select a test to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 7. HeartbeatEcgBanner ─────────────────────────────────────────
// Animated ECG strip with live BPM display. Pulses continuously.

export function HeartbeatEcgBanner() {
  const [bpm, setBpm] = useState(72);
  // Hydration-safe: tick counter starts at 0 on both server and client
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      setBpm(68 + Math.round(Math.sin(Date.now() / 4000) * 6 + Math.random() * 4));
    }, 60);
    return () => clearInterval(id);
  }, []);

  // Generate ECG path: 800px wide, repeating PQRST pattern
  const width = 800;
  const height = 60;
  const beatsPerStrip = 4;
  const beatWidth = width / beatsPerStrip;
  // ECG waveform: baseline, P wave, Q dip, R spike, S dip, T wave, baseline
  const ecgPath = useMemo(() => {
    let d = `M 0,${height / 2}`;
    for (let b = 0; b < beatsPerStrip; b++) {
      const x0 = b * beatWidth;
      d += ` L ${x0 + beatWidth * 0.15},${height / 2}`;            // baseline
      d += ` Q ${x0 + beatWidth * 0.18},${height / 2 - 6} ${x0 + beatWidth * 0.2},${height / 2}`; // P wave
      d += ` L ${x0 + beatWidth * 0.28},${height / 2}`;            // baseline
      d += ` L ${x0 + beatWidth * 0.30},${height / 2 + 8}`;        // Q dip
      d += ` L ${x0 + beatWidth * 0.32},${height / 2 - 28}`;       // R spike
      d += ` L ${x0 + beatWidth * 0.34},${height / 2 + 10}`;       // S dip
      d += ` L ${x0 + beatWidth * 0.42},${height / 2}`;            // baseline
      d += ` Q ${x0 + beatWidth * 0.5},${height / 2 - 10} ${x0 + beatWidth * 0.58},${height / 2}`; // T wave
      d += ` L ${x0 + beatWidth},${height / 2}`;                   // baseline
    }
    return d;
  }, [beatWidth]);

  // Shift the strip leftward over time for the scrolling effect
  const offset = (tick * 2) % beatWidth;

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(239,68,68,0.06), rgba(0,229,160,0.06))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <HeartPulse size={22} color="#ef4444" />
        <div>
          <div style={{ fontSize: 10, color: '#64748b', letterSpacing: 1, fontWeight: 600 }}>LIVE</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#ef4444', fontFamily: 'monospace', lineHeight: 1 }}>
            {bpm} <span style={{ fontSize: 11, color: '#94a3b8' }}>BPM</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', height }}>
        <svg width={width} height={height} style={{ position: 'absolute', left: -offset, top: 0 }}>
          <path
            d={ecgPath}
            stroke="#00e5a0"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Fade mask on edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 40,
          background: 'linear-gradient(90deg, rgba(10,14,26,1), transparent)',
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 40,
          background: 'linear-gradient(270deg, rgba(10,14,26,1), transparent)',
        }} />
      </div>

      <div style={{ fontSize: 11, color: '#94a3b8', maxWidth: 200, lineHeight: 1.4, flexShrink: 0 }}>
        MedQ monitors your progress in real time — like telemetry for your study.
      </div>
    </div>
  );
}

// ─── 8. ReadingProgress ────────────────────────────────────────────
// Vertical sidebar showing reading progress through page sections.
// Highlights the current section.

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'features', label: 'Features' },
  { id: 'demo', label: 'AI demo' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'testimonials', label: 'Stories' },
  { id: 'faq', label: 'FAQ' },
];

export function ReadingProgress() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(Math.min(1, scrollTop / Math.max(1, docHeight)));

      // Find which section is currently in view
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = s.id;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
      className="hidden lg:flex"
    >
      {/* Vertical track */}
      <div style={{ position: 'relative', width: 2, height: 200, background: 'rgba(255,255,255,0.08)' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${progress * 100}%`,
            background: 'linear-gradient(180deg, #00e5a0, #06b6d4)',
            transition: 'height 0.2s ease-out',
          }}
        />
      </div>
      {/* Section dots */}
      <div style={{ position: 'absolute', top: 0, right: 18, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
              transform: 'translateY(-50%)',
            }}
            aria-label={s.label}
          >
            <span style={{
              fontSize: 10,
              color: activeSection === s.id ? '#00e5a0' : '#64748b',
              fontWeight: activeSection === s.id ? 700 : 400,
              whiteSpace: 'nowrap',
              opacity: activeSection === s.id ? 1 : 0,
              transition: 'opacity 0.2s',
            }}>
              {s.label}
            </span>
            <span style={{
              width: activeSection === s.id ? 8 : 5,
              height: activeSection === s.id ? 8 : 5,
              borderRadius: '50%',
              background: activeSection === s.id ? '#00e5a0' : 'rgba(255,255,255,0.3)',
              boxShadow: activeSection === s.id ? '0 0 12px #00e5a0' : 'none',
              transition: 'all 0.2s',
            }} />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── 9. AchievementPopup ───────────────────────────────────────────
// Gamified toast that fires when user scrolls past certain milestones.
// Shows "Achievement unlocked: X" with confetti-like particles.

export function AchievementPopup() {
  const [current, setCurrent] = useState<number | null>(null);

  const achievements = useMemo(() => [
    { pct: 15, title: 'Curious Explorer', desc: 'Scrolled 15% of the page', icon: '🔍' },
    { pct: 35, title: 'Engaged Learner', desc: 'Scrolled 35% of the page', icon: '📚' },
    { pct: 60, title: 'Deep Diver', desc: 'Scrolled 60% of the page', icon: '🏊' },
    { pct: 85, title: 'Almost There', desc: 'Scrolled 85% of the page', icon: '🎯' },
    { pct: 100, title: 'Completionist', desc: 'Reached the end!', icon: '🏆' },
  ], []);

  // Track which achievements have already fired this session.
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100;
      for (let i = 0; i < achievements.length; i++) {
        if (pct >= achievements[i].pct && !fired.current.has(i)) {
          fired.current.add(i);
          setCurrent(i);
          setTimeout(() => setCurrent(null), 4500);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [achievements]);

  if (current === null) return null;
  const a = achievements[current];

  return (
    <div
      style={{
        position: 'fixed',
        top: 90,
        right: 24,
        zIndex: 100,
        animation: 'slideInRight 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 20px 14px 14px',
          background: 'linear-gradient(135deg, rgba(0,229,160,0.18), rgba(139,92,246,0.18))',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,229,160,0.4)',
          borderRadius: 14,
          boxShadow: '0 10px 40px rgba(0,229,160,0.2)',
          minWidth: 280,
        }}
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #00e5a0, #06b6d4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          flexShrink: 0,
        }}>
          {a.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, color: '#00e5a0', letterSpacing: 1.5, fontWeight: 700 }}>
            ACHIEVEMENT UNLOCKED
          </div>
          <div style={{ fontSize: 14, color: '#fff', fontWeight: 700, marginTop: 2 }}>
            {a.title}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>
            {a.desc}
          </div>
        </div>
        <Award size={16} color="#fbbf24" style={{ flexShrink: 0 }} />
      </div>
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── 10. CoverageMap ───────────────────────────────────────────────
// Stylized world map with pulsing hotspots representing student density.
// Pure SVG, no external dependencies.

const HOTSPOTS = [
  { x: 200, y: 130, country: 'United States', count: '18,400' },
  { x: 340, y: 100, country: 'United Kingdom', count: '8,200' },
  { x: 365, y: 115, country: 'Germany', count: '5,100' },
  { x: 410, y: 145, country: 'India', count: '9,800' },
  { x: 430, y: 130, country: 'Nepal', count: '2,100' },
  { x: 470, y: 100, country: 'Russia', count: '3,400' },
  { x: 520, y: 165, country: 'Indonesia', count: '2,800' },
  { x: 510, y: 145, country: 'China', count: '6,200' },
  { x: 495, y: 175, country: 'Australia', count: '1,900' },
  { x: 290, y: 200, country: 'Brazil', count: '2,400' },
  { x: 320, y: 215, country: 'Argentina', count: '1,100' },
  { x: 360, y: 195, country: 'Nigeria', count: '3,600' },
  { x: 380, y: 215, country: 'South Africa', count: '1,400' },
  { x: 380, y: 155, country: 'Egypt', count: '4,200' },
];

export function CoverageMap() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(0,229,160,0.04), rgba(139,92,246,0.04))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '32px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#06b6d4', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>
          52,000+ STUDENTS · 142 COUNTRIES
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
          Studying everywhere, all at once
        </h3>
      </div>

      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
        <svg viewBox="0 0 700 300" style={{ width: '100%', height: 'auto' }}>
          {/* Stylized world continents (simplified blobs) */}
          <g fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5">
            {/* North America */}
            <path d="M 130 90 Q 180 70 230 90 L 250 130 L 220 170 L 180 175 L 140 150 Z" />
            {/* South America */}
            <path d="M 260 180 L 290 195 L 305 240 L 280 270 L 260 245 Z" />
            {/* Europe */}
            <path d="M 320 95 L 380 90 L 390 120 L 350 130 L 320 115 Z" />
            {/* Africa */}
            <path d="M 340 145 L 400 145 L 410 200 L 380 235 L 355 220 L 340 180 Z" />
            {/* Asia */}
            <path d="M 390 85 L 540 90 L 560 140 L 520 170 L 460 165 L 410 140 Z" />
            {/* India */}
            <path d="M 410 145 L 430 145 L 425 175 L 410 170 Z" />
            {/* Australia */}
            <path d="M 480 180 L 520 180 L 525 205 L 490 210 Z" />
          </g>

          {/* Lat/long grid */}
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
            {[60, 120, 180, 240].map(y => (
              <line key={y} x1="0" y1={y} x2="700" y2={y} />
            ))}
            {[100, 200, 300, 400, 500, 600].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="300" />
            ))}
          </g>

          {/* Hotspots */}
          {HOTSPOTS.map((h, i) => (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              {/* Pulse rings */}
              <circle cx={h.x} cy={h.y} r="4" fill="rgba(0,229,160,0.4)">
                <animate
                  attributeName="r"
                  values="4;14;4"
                  dur="2.5s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2.5s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Core dot */}
              <circle
                cx={h.x}
                cy={h.y}
                r={hovered === i ? 5 : 3}
                fill="#00e5a0"
                stroke="#fff"
                strokeWidth="1"
                style={{ transition: 'r 0.2s' }}
              />
            </g>
          ))}
        </svg>

        {/* Hover tooltip */}
        {hovered !== null && (
          <div
            style={{
              position: 'absolute',
              left: `${(HOTSPOTS[hovered].x / 700) * 100}%`,
              top: `${(HOTSPOTS[hovered].y / 300) * 100}%`,
              transform: 'translate(-50%, calc(-100% - 10px))',
              padding: '6px 10px',
              background: '#1a1e2b',
              border: '1px solid rgba(0,229,160,0.3)',
              borderRadius: 6,
              fontSize: 11,
              color: '#fff',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontWeight: 700 }}>{HOTSPOTS[hovered].country}</div>
            <div style={{ color: '#00e5a0', fontFamily: 'monospace', fontSize: 10 }}>
              {HOTSPOTS[hovered].count} students
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
