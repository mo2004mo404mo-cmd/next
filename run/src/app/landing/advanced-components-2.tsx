'use client';

/**
 * MedQ landing — second batch of advanced components.
 *
 * File: /home/z/my-project/extracted/src/app/landing/advanced-components-2.tsx
 *
 * Exports:
 *   - AuroraBackground    animated nebula/aurora gradient hero backdrop
 *   - CursorGlow          page-wide cursor-following glow
 *   - LivePresence        floating widget: "12 viewing now" with stacked avatars
 *   - SignupToasts        bottom-left periodic signup notifications
 *   - AnatomyViewer       interactive SVG body-system explorer
 *   - KnowledgeGraph      animated topic relationship graph
 *   - DemoVideoSection    mockup video player with play button + progress
 *   - TeamSection         advisor / doctor profile cards
 *   - SecuritySection     BYOK encryption-flow visualization
 *   - NewsPreviewSection  blog / article preview cards
 *   - PersonalizationModal modal asking specialty + year + goals
 *   - ScrollVelocityBanner big text that responds to scroll velocity
 *   - TypewriterText      cycling typewriter effect for hero subtitle
 *   - FloatingDock        macOS-style bottom dock with quick-nav
 *   - LiveNotificationBadge live "new student joined" badge in nav
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize2, X, ChevronRight,
  Shield, Lock, Key, Server, User, ArrowRight, ArrowDown,
  Heart, Brain, Wind, Bone, Eye, Activity, Stethoscope,
  AtSign, Share2, GraduationCap, Sparkles, Clock,
  CheckCircle2, Circle, AlertCircle, Mail, Calendar,
  Users, MessageCircle, Crown, HeartPulse,
} from 'lucide-react';

// ─── 1. AuroraBackground ───────────────────────────────────────────

export function AuroraBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Aurora blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,229,160,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
      <style jsx>{`
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          will-change: transform;
        }
        .aurora-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #00e5a0 0%, transparent 70%);
          top: -200px; left: -150px;
          animation: aurora-1 22s ease-in-out infinite;
        }
        .aurora-blob-2 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
          top: -100px; right: -200px;
          animation: aurora-2 28s ease-in-out infinite;
        }
        .aurora-blob-3 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
          bottom: -150px; left: 30%;
          animation: aurora-3 25s ease-in-out infinite;
        }
        .aurora-blob-4 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
          bottom: 10%; right: 15%;
          opacity: 0.25;
          animation: aurora-4 30s ease-in-out infinite;
        }
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, 60px) scale(1.1); }
          66% { transform: translate(-40px, 120px) scale(0.95); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-100px, 80px) scale(0.9); }
          66% { transform: translate(60px, -60px) scale(1.15); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(120px, -80px) scale(1.2); }
        }
        @keyframes aurora-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-80px, 60px) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ─── 2. CursorGlow ─────────────────────────────────────────────────

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      if (ref.current) {
        ref.current.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,160,0.12) 0%, rgba(0,229,160,0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  );
}

// ─── 3. LivePresence ───────────────────────────────────────────────

const PRESENCE_NAMES = ['Aisha', 'Liu', 'Marco', 'Priya', 'Diego', 'Yara', 'Kenji', 'Sofia'];
const PRESENCE_COLORS = ['#00e5a0', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899'];

export function LivePresence() {
  const [count, setCount] = useState(1247);
  const [viewers, setViewers] = useState(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push({
        name: PRESENCE_NAMES[i % PRESENCE_NAMES.length],
        color: PRESENCE_COLORS[i % PRESENCE_COLORS.length],
      });
    }
    return arr;
  });
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 7) - 3);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 12px 6px 6px',
        borderRadius: 999,
        background: 'rgba(0,229,160,0.08)',
        border: '1px solid rgba(0,229,160,0.25)',
        fontSize: 12,
        color: '#cbd5e1',
      }}
    >
      <div style={{ display: 'flex' }}>
        {viewers.map((v, i) => (
          <div
            key={i}
            style={{
              width: 22, height: 22,
              borderRadius: '50%',
              background: v.color,
              marginLeft: i === 0 ? 0 : -7,
              border: '2px solid #0a0e1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: '#0a0e1a',
            }}
          >
            {v.name[0]}
          </div>
        ))}
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            width: 7, height: 7, borderRadius: '50%', background: '#00e5a0',
            boxShadow: '0 0 8px #00e5a0',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
        />
        <strong style={{ color: '#00e5a0' }}>{count.toLocaleString('en-US')}</strong> studying now
      </span>
      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

// ─── 4. SignupToasts ───────────────────────────────────────────────

const SIGNUP_EVENTS = [
  { name: 'Anjali', country: 'India', flag: '🇮🇳', plan: 'Pro' },
  { name: 'Marcus', country: 'USA', flag: '🇺🇸', plan: 'Pro' },
  { name: 'Sofia', country: 'Brazil', flag: '🇧🇷', plan: 'Free' },
  { name: 'Kenji', country: 'Japan', flag: '🇯🇵', plan: 'Pro' },
  { name: 'Aisha', country: 'Egypt', flag: '🇪🇬', plan: 'Pro' },
  { name: 'Liam', country: 'UK', flag: '🇬🇧', plan: 'Free' },
  { name: 'Priya', country: 'India', flag: '🇮🇳', plan: 'Pro' },
  { name: 'Diego', country: 'Spain', flag: '🇪🇸', plan: 'Pro' },
  { name: 'Yara', country: 'UAE', flag: '🇦🇪', plan: 'Free' },
  { name: 'Chen', country: 'China', flag: '🇨🇳', plan: 'Pro' },
];

export function SignupToasts() {
  const [toast, setToast] = useState<null | (typeof SIGNUP_EVENTS)[number]>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;
    let idx = Math.floor(Math.random() * SIGNUP_EVENTS.length);
    const show = () => {
      setToast(SIGNUP_EVENTS[idx % SIGNUP_EVENTS.length]);
      idx++;
      setVisible(true);
      hideTimer = setTimeout(() => setVisible(false), 5500);
      cycleTimer = setTimeout(show, 9000 + Math.random() * 4000);
    };
    cycleTimer = setTimeout(show, 4000);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cycleTimer);
    };
  }, []);
  if (!toast) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 60,
        pointerEvents: 'none',
        transform: visible ? 'translateY(0)' : 'translateY(120%)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px',
          background: 'rgba(12, 14, 20, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,160,0.1)',
          backdropFilter: 'blur(10px)',
          maxWidth: 320,
        }}
      >
        <div style={{ fontSize: 22 }}>{toast.flag}</div>
        <div style={{ fontSize: 12, color: '#cbd5e1' }}>
          <strong style={{ color: '#fff' }}>{toast.name}</strong> from {toast.country}
          <br />
          <span style={{ color: toast.plan === 'Pro' ? '#00e5a0' : '#94a3b8' }}>
            just started {toast.plan} trial
          </span>{' '}
          · <span style={{ color: '#64748b' }}>2 min ago</span>
        </div>
      </div>
    </div>
  );
}

// ─── 5. AnatomyViewer ──────────────────────────────────────────────

const BODY_SYSTEMS = [
  { id: 'heart', name: 'Cardiovascular', icon: Heart, color: '#ef4444', facts: 'Pumps ~5L blood/min. 4 chambers. Common exam topics: MI, arrhythmias, murmurs.' },
  { id: 'brain', name: 'Nervous System', icon: Brain, color: '#8b5cf6', facts: '86B neurons. Cranial nerves, stroke localisation, reflex arcs are high-yield.' },
  { id: 'lung', name: 'Respiratory', icon: Wind, color: '#06b6d4', facts: 'ARDS, pneumonia, COPD, PE. V/Q mismatch is the #1 concept tested.' },
  { id: 'bone', name: 'Musculoskeletal', icon: Bone, color: '#f59e0b', facts: 'Fractures, RA, OA. Know the Salter-Harris classification cold.' },
  { id: 'eye', name: 'Ophthalmology', icon: Eye, color: '#10b981', facts: 'Glaucoma, diabetic retinopathy, red-eye differential.' },
  { id: 'steth', name: 'Clinical Skills', icon: Stethoscope, color: '#ec4899', facts: 'OSCE-style cases. Inspection, palpation, percussion, auscultation.' },
];

export function AnatomyViewer() {
  const [active, setActive] = useState(BODY_SYSTEMS[0]);
  const ActiveIcon = active.icon;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 280px',
        gap: 24,
        alignItems: 'stretch',
      }}
    >
      {/* Body SVG */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(0,229,160,0.05), rgba(139,92,246,0.05))',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          padding: 24,
          minHeight: 420,
          overflow: 'hidden',
        }}
      >
        <svg viewBox="0 0 200 380" style={{ width: '100%', height: '100%', maxHeight: 420 }}>
          {/* Body outline */}
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="100" cy="35" r="22" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Neck */}
          <rect x="92" y="55" width="16" height="14" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Torso */}
          <path
            d="M 65 70 Q 65 65 75 65 L 125 65 Q 135 65 135 75 L 140 180 Q 140 195 130 200 L 70 200 Q 60 195 60 180 Z"
            fill="url(#bodyGrad)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Arms */}
          <path d="M 65 75 L 40 170 L 38 195" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 135 75 L 160 170 L 162 195" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="14" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 80 200 L 75 320 L 73 360" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="18" strokeLinecap="round" />
          <path d="M 120 200 L 125 320 L 127 360" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="18" strokeLinecap="round" />

          {/* Hotspots */}
          {[
            { sys: 'brain', cx: 100, cy: 35, r: 14 },
            { sys: 'heart', cx: 95, cy: 105, r: 13 },
            { sys: 'lung', cx: 110, cy: 100, r: 13 },
            { sys: 'eye', cx: 92, cy: 32, r: 5 },
            { sys: 'bone', cx: 50, cy: 130, r: 10 },
            { sys: 'steth', cx: 100, cy: 140, r: 14 },
          ].map(spot => {
            const sys = BODY_SYSTEMS.find(s => s.id === spot.sys)!;
            const isActive = active.id === spot.sys;
            return (
              <g
                key={spot.sys}
                onClick={() => setActive(sys)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={spot.cx}
                  cy={spot.cy}
                  r={spot.r}
                  fill={sys.color}
                  opacity={isActive ? 0.5 : 0.18}
                  style={{ transition: 'opacity 0.3s, r 0.3s' }}
                />
                <circle
                  cx={spot.cx}
                  cy={spot.cy}
                  r={spot.r * 0.5}
                  fill={sys.color}
                  opacity={isActive ? 1 : 0.6}
                  style={{
                    filter: isActive ? `drop-shadow(0 0 6px ${sys.color})` : 'none',
                    transition: 'all 0.3s',
                  }}
                />
                {isActive && (
                  <circle
                    cx={spot.cx}
                    cy={spot.cy}
                    r={spot.r}
                    fill="none"
                    stroke={sys.color}
                    strokeWidth="1.5"
                    style={{
                      animation: 'ring-pulse 2s ease-out infinite',
                      transformOrigin: `${spot.cx}px ${spot.cy}px`,
                    }}
                  />
                )}
              </g>
            );
          })}
          <style jsx>{`
            @keyframes ring-pulse {
              0% { transform: scale(1); opacity: 1; }
              100% { transform: scale(1.8); opacity: 0; }
            }
          `}</style>
        </svg>
        <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 11, color: '#64748b', letterSpacing: 1 }}>
          INTERACTIVE BODY MAP
        </div>
      </div>

      {/* Side panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 12, color: '#64748b', letterSpacing: 1, marginBottom: 4 }}>
          CLICK A SYSTEM →
        </div>
        {BODY_SYSTEMS.map(sys => {
          const Icon = sys.icon;
          const isActive = active.id === sys.id;
          return (
            <button
              key={sys.id}
              onClick={() => setActive(sys)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: `1px solid ${isActive ? sys.color + '55' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 10,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={16} style={{ color: sys.color }} />
              <span style={{ fontSize: 13, color: isActive ? '#fff' : '#cbd5e1', fontWeight: isActive ? 600 : 400 }}>
                {sys.name}
              </span>
            </button>
          );
        })}
        <div
          style={{
            marginTop: 8,
            padding: 14,
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${active.color}33`,
            borderRadius: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ActiveIcon size={18} style={{ color: active.color }} />
            <strong style={{ fontSize: 13, color: '#fff' }}>{active.name}</strong>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
            {active.facts}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── 6. KnowledgeGraph ─────────────────────────────────────────────

const GRAPH_NODES = [
  { id: 'cardio', label: 'Cardiology', x: 50, y: 50, r: 22, color: '#ef4444' },
  { id: 'pharm', label: 'Pharmacology', x: 20, y: 25, r: 16, color: '#8b5cf6' },
  { id: 'anatomy', label: 'Anatomy', x: 80, y: 25, r: 16, color: '#06b6d4' },
  { id: 'physio', label: 'Physiology', x: 20, y: 75, r: 16, color: '#f59e0b' },
  { id: 'patho', label: 'Pathology', x: 80, y: 75, r: 16, color: '#10b981' },
  { id: 'emerg', label: 'Emergency', x: 50, y: 88, r: 14, color: '#ec4899' },
  { id: 'renal', label: 'Renal', x: 5, y: 50, r: 12, color: '#3b82f6' },
  { id: 'resp', label: 'Respiratory', x: 95, y: 50, r: 12, color: '#a855f7' },
];
const GRAPH_EDGES = [
  ['cardio', 'pharm'], ['cardio', 'anatomy'], ['cardio', 'physio'],
  ['cardio', 'patho'], ['cardio', 'emerg'], ['cardio', 'renal'],
  ['cardio', 'resp'], ['pharm', 'renal'], ['patho', 'resp'],
  ['physio', 'renal'], ['emerg', 'pharm'], ['anatomy', 'resp'],
];

export function KnowledgeGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulseIdx(i => (i + 1) % GRAPH_EDGES.length), 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(0,229,160,0.05))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 24,
        minHeight: 380,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 11, color: '#64748b', letterSpacing: 1 }}>
        TOPIC RELATIONSHIPS
      </div>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: 380 }}>
        {/* Edges */}
        {GRAPH_EDGES.map(([a, b], i) => {
          const na = GRAPH_NODES.find(n => n.id === a)!;
          const nb = GRAPH_NODES.find(n => n.id === b)!;
          const isActive = pulseIdx === i || hovered === a || hovered === b;
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={isActive ? '#00e5a0' : 'rgba(255,255,255,0.1)'}
              strokeWidth={isActive ? 0.6 : 0.3}
              strokeDasharray={isActive ? '0' : '1 1'}
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
            />
          );
        })}
        {/* Pulses traveling along active edge */}
        {(() => {
          const [a, b] = GRAPH_EDGES[pulseIdx];
          const na = GRAPH_NODES.find(n => n.id === a)!;
          const nb = GRAPH_NODES.find(n => n.id === b)!;
          return (
            <circle r="0.8" fill="#00e5a0">
              <animateMotion dur="1.2s" repeatCount="1" fill="freeze">
                <mpath href={`#path-${pulseIdx}`} />
              </animateMotion>
            </circle>
          );
        })()}
        {GRAPH_EDGES.map(([a, b], i) => {
          const na = GRAPH_NODES.find(n => n.id === a)!;
          const nb = GRAPH_NODES.find(n => n.id === b)!;
          return (
            <path
              key={`path-${i}`}
              id={`path-${i}`}
              d={`M ${na.x} ${na.y} L ${nb.x} ${nb.y}`}
              fill="none"
              stroke="none"
            />
          );
        })}
        {/* Nodes */}
        {GRAPH_NODES.map(n => {
          const isHovered = hovered === n.id;
          return (
            <g
              key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={n.x} cy={n.y} r={n.r / 3 + (isHovered ? 1 : 0)}
                fill={n.color}
                opacity={isHovered ? 1 : 0.85}
                style={{
                  filter: isHovered ? `drop-shadow(0 0 4px ${n.color})` : 'none',
                  transition: 'all 0.2s',
                }}
              />
              <circle
                cx={n.x} cy={n.y} r={n.r / 3}
                fill="none"
                stroke={n.color}
                strokeWidth="0.3"
                opacity={isHovered ? 0.6 : 0.25}
              />
              <text
                x={n.x} y={n.y + n.r / 3 + 4}
                textAnchor="middle"
                fontSize="2.6"
                fill={isHovered ? '#fff' : '#cbd5e1'}
                fontWeight={isHovered ? 700 : 500}
                style={{ pointerEvents: 'none', transition: 'fill 0.2s' }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 11, color: '#64748b' }}>
        {GRAPH_NODES.length} topics · {GRAPH_EDGES.length} connections
      </div>
    </div>
  );
}

// ─── 7. DemoVideoSection ───────────────────────────────────────────

export function DemoVideoSection() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setPlaying(false);
          return 0;
        }
        return p + 0.4;
      });
    }, 100);
    return () => clearInterval(id);
  }, [playing]);
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        background: '#000',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        aspectRatio: '16 / 9',
        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      {/* Video backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 30% 40%, rgba(0,229,160,0.3), transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(139,92,246,0.3), transparent 50%),
            linear-gradient(135deg, #0a0e1a, #1a1f3a)
          `,
        }}
      />
      {/* Mock UI overlay */}
      <div style={{ position: 'absolute', inset: 0, padding: '5% 6%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>
            medq.app/tutor/case-study
          </div>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{ fontSize: 10, color: '#00e5a0', letterSpacing: 1 }}>CASE PRESENTATION</div>
            <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.5 }}>
              58-year-old male presents with crushing chest pain, diaphoresis, and radiation to the left arm...
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['STEMI', 'Troponin↑', 'ST elevation'].map(t => (
                <span key={t} style={{
                  fontSize: 9, padding: '2px 6px',
                  background: 'rgba(239,68,68,0.2)', color: '#fca5a5',
                  borderRadius: 4, border: '1px solid rgba(239,68,68,0.3)',
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{
            background: 'rgba(0,229,160,0.05)',
            border: '1px solid rgba(0,229,160,0.2)',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{ fontSize: 10, color: '#8b5cf6', letterSpacing: 1 }}>AI TUTOR ANALYSIS</div>
            <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.5 }}>
              {playing ? 'Identifying key clues... ✓\nDifferential: ACS, PE, AoD\nRecommend: ECG, troponin, ASA, PCI' : 'Click play to see the AI work through this case step-by-step.'}
            </div>
          </div>
        </div>
      </div>

      {/* Center play button */}
      {!playing && (
        <button
          onClick={() => setPlaying(true)}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'rgba(0,229,160,0.95)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 8px rgba(0,229,160,0.2), 0 0 40px rgba(0,229,160,0.5)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)')}
        >
          <Play size={32} fill="#0a0e1a" color="#0a0e1a" style={{ marginLeft: 4 }} />
        </button>
      )}

      {/* Controls bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '12px 16px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <button
          onClick={() => setPlaying(p => !p)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0 }}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          onClick={() => setMuted(m => !m)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0 }}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#00e5a0', transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', minWidth: 70, textAlign: 'right' }}>
          {Math.floor(progress * 0.03)}:{String(Math.floor((progress * 1.8) % 60)).padStart(2, '0')} / 3:00
        </span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0 }}>
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── 8. TeamSection ────────────────────────────────────────────────

const TEAM = [
  { name: 'Dr. Sarah Chen, MD', role: 'Chief Medical Officer', sub: 'Harvard Medical School · Internal Medicine', color: '#00e5a0', icon: Stethoscope },
  { name: 'Dr. Raj Patel, MD', role: 'Cardiology Advisor', sub: 'Johns Hopkins · Interventional Cardiology', color: '#ef4444', icon: Heart },
  { name: 'Dr. Maria Rodriguez, MD', role: 'Pediatrics Advisor', sub: 'Stanford · Neonatology', color: '#06b6d4', icon: Activity },
  { name: 'Dr. James Okafor, MD', role: 'Surgery Advisor', sub: 'Mayo Clinic · General Surgery', color: '#8b5cf6', icon: Brain },
  { name: 'Dr. Aiko Tanaka, MD', role: 'Neurology Advisor', sub: 'UCSF · Stroke & Cerebrovascular', color: '#f59e0b', icon: Brain },
  { name: 'Dr. Olumide Ade, MD', role: 'Emergency Medicine', sub: 'Emory · Trauma & Resuscitation', color: '#ec4899', icon: HeartPulse },
];

export function TeamSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
      {TEAM.map((m, i) => {
        const Icon = m.icon;
        return (
          <div
            key={m.name}
            style={{
              position: 'relative',
              padding: 22,
              background: 'rgba(12,14,20,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              transition: 'all 0.3s',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = m.color + '55';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -30, right: -30,
                width: 100, height: 100,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${m.color}22, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                width: 56, height: 56,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${m.color}, ${m.color}80)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
                border: `2px solid ${m.color}55`,
              }}
            >
              <Icon size={24} color="#0a0e1a" />
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>{m.name}</p>
            <div style={{ fontSize: 12, color: m.color, fontWeight: 600, marginBottom: 4 }}>{m.role}</div>
            <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{m.sub}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <AtSign size={14} style={{ color: '#64748b', cursor: 'pointer' }} />
              <Share2 size={14} style={{ color: '#64748b', cursor: 'pointer' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 9. SecuritySection ────────────────────────────────────────────

const SECURITY_STEPS = [
  { icon: Key, label: 'Your API key', sub: 'Generated by you', color: '#00e5a0' },
  { icon: Lock, label: 'AES-256-GCM', sub: 'Encrypted in browser', color: '#06b6d4' },
  { icon: Server, label: 'Stored encrypted', sub: 'We never see plaintext', color: '#8b5cf6' },
  { icon: Shield, label: 'Used per-request', sub: 'Decrypted in memory only', color: '#f59e0b' },
];

export function SecuritySection() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActiveStep(i => (i + 1) % (SECURITY_STEPS.length + 1)), 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(0,229,160,0.04), rgba(139,92,246,0.04))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 32,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24, position: 'relative' }}>
        {/* Flow line */}
        <div
          style={{
            position: 'absolute',
            top: 30, left: '12%', right: '12%',
            height: 2,
            background: 'linear-gradient(90deg, #00e5a0, #06b6d4, #8b5cf6, #f59e0b)',
            opacity: 0.3,
          }}
        />
        {SECURITY_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === i || activeStep === i + 1;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: 60, height: 60,
                  borderRadius: '50%',
                  background: isActive ? step.color : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${isActive ? step.color : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 12,
                  transition: 'all 0.4s',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 30px ${step.color}55` : 'none',
                }}
              >
                <Icon size={24} color={isActive ? '#0a0e1a' : '#94a3b8'} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#fff' : '#cbd5e1' }}>{step.label}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{step.sub}</div>
              {i < SECURITY_STEPS.length - 1 && (
                <ArrowRight
                  size={16}
                  style={{
                    position: 'absolute',
                    top: 22, right: '-8%',
                    color: '#475569',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          padding: 18,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(0,229,160,0.2)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 14,
        }}
      >
        <Shield size={20} style={{ color: '#00e5a0', flexShrink: 0 }} />
        <p style={{ fontSize: 13, color: '#cbd5e1', margin: 0, lineHeight: 1.55 }}>
          <strong style={{ color: '#fff' }}>Bring Your Own Key (BYOK).</strong>{' '}
          Your AI provider API keys are encrypted in your browser with AES-256-GCM before they ever touch our servers.
          We store only the ciphertext — we cannot read your keys, even if our database is compromised.
        </p>
      </div>
    </div>
  );
}

// ─── 10. NewsPreviewSection ────────────────────────────────────────

const ARTICLES = [
  {
    tag: 'Research',
    title: 'MedQ users show 94% pass-rate uplift in 30 days',
    excerpt: 'Our internal study of 2,847 active users found a strong correlation between AI tutor usage and exam performance.',
    date: 'Aug 2, 2026',
    readTime: '5 min',
    color: '#00e5a0',
  },
  {
    tag: 'Product',
    title: 'Introducing multimodal cases — X-rays, ECGs, and histology',
    excerpt: 'The AI tutor can now analyze uploaded images alongside case text. Available now for Pro users.',
    date: 'Jul 28, 2026',
    readTime: '3 min',
    color: '#8b5cf6',
  },
  {
    tag: 'Education',
    title: 'Why spaced repetition works (and how MedQ automates it)',
    excerpt: 'A deep dive into the cognitive science behind spaced repetition and our adaptive scheduling algorithm.',
    date: 'Jul 22, 2026',
    readTime: '8 min',
    color: '#06b6d4',
  },
];

export function NewsPreviewSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
      {ARTICLES.map((a, i) => (
        <article
          key={i}
          style={{
            background: 'rgba(12,14,20,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = a.color + '55';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          <div
            style={{
              height: 140,
              background: `linear-gradient(135deg, ${a.color}33, ${a.color}11)`,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1), transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05), transparent 50%)',
              }}
            />
            <div
              style={{
                fontSize: 11,
                padding: '4px 10px',
                background: a.color,
                color: '#0a0e1a',
                fontWeight: 700,
                borderRadius: 4,
                letterSpacing: 1,
                zIndex: 1,
              }}
            >
              {a.tag.toUpperCase()}
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 8px', lineHeight: 1.4 }}>
              {a.title}
            </p>
            <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55, margin: '0 0 14px' }}>
              {a.excerpt}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#64748b' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={11} /> {a.date}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Clock size={11} /> {a.readTime}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

// ─── 11. PersonalizationModal ──────────────────────────────────────

const SPECIALTIES = ['Internal Medicine', 'Cardiology', 'Pediatrics', 'Surgery', 'Neurology', 'Emergency', 'Family Medicine'];
const YEARS = ['Year 1', 'Year 2', 'Year 3', 'Final year', 'Resident', 'Attending'];
const GOALS = ['Pass board exam', 'Build daily habit', 'Master weak areas', 'OSCE prep', 'Refresh knowledge'];

export function PersonalizationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) {
      setStep(0); setSpecialty(null); setYear(null); setGoals([]);
    }
  }, [open]);

  if (!open) return null;

  const toggleGoal = (g: string) =>
    setGoals(prev => (prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]));

  const next = () => setStep(s => Math.min(2, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'modal-fade 0.3s ease',
      }}
      onClick={onClose}
    >
      <style jsx>{`
        @keyframes modal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-rise { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 520,
          background: 'linear-gradient(180deg, #0c0e14, #0a0e1a)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: 32,
          boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
          animation: 'modal-rise 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: '#00e5a0', letterSpacing: 1, marginBottom: 6 }}>
              STEP {step + 1} OF 3
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
              {step === 0 ? 'What is your specialty?' : step === 1 ? 'Where are you in your training?' : 'What do you want to achieve?'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0 }}>
            <X size={20} />
          </button>
        </div>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                background: i <= step ? '#00e5a0' : 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {step === 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SPECIALTIES.map(s => (
              <button
                key={s}
                onClick={() => { setSpecialty(s); next(); }}
                style={{
                  padding: '10px 16px',
                  background: specialty === s ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${specialty === s ? '#00e5a0' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 10,
                  color: specialty === s ? '#00e5a0' : '#cbd5e1',
                  fontSize: 13, fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {YEARS.map(y => (
              <button
                key={y}
                onClick={() => { setYear(y); next(); }}
                style={{
                  padding: 14,
                  background: year === y ? 'rgba(0,229,160,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${year === y ? '#00e5a0' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 10,
                  color: year === y ? '#00e5a0' : '#cbd5e1',
                  fontSize: 14, fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all 0.2s',
                }}
              >
                {y}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {GOALS.map(g => {
                const selected = goals.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggleGoal(g)}
                    style={{
                      padding: '10px 14px',
                      background: selected ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selected ? '#00e5a0' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 10,
                      color: selected ? '#00e5a0' : '#cbd5e1',
                      fontSize: 13, fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {selected ? '✓ ' : ''}{g}
                  </button>
                );
              })}
            </div>
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: 14,
                background: 'linear-gradient(90deg, #00e5a0, #06b6d4)',
                border: 'none',
                borderRadius: 12,
                color: '#0a0e1a',
                fontSize: 15, fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Build my study plan →
            </button>
          </>
        )}

        {step > 0 && (
          <button
            onClick={back}
            style={{
              marginTop: 16,
              background: 'none', border: 'none',
              color: '#64748b', cursor: 'pointer',
              fontSize: 12,
            }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

// ─── 12. ScrollVelocityBanner ──────────────────────────────────────

export function ScrollVelocityBanner({ text = 'MASTER MEDICINE' }: { text?: string }) {
  const [offset, setOffset] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  useEffect(() => {
    let raf = 0;
    let vel = 0;
    const onScroll = () => {
      const now = Date.now();
      const dy = window.scrollY - lastScrollY.current;
      const dt = Math.max(1, now - lastTime.current);
      vel = dy / dt;
      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    };
    const loop = () => {
      setOffset(o => o - vel * 2);
      vel *= 0.92;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  const repeats = 8;
  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '20px 0',
        background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.05), transparent)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 40,
          whiteSpace: 'nowrap',
          transform: `translateX(${offset % 400}px)`,
          willChange: 'transform',
        }}
      >
        {Array.from({ length: repeats }).map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: -2,
              background: i % 2 === 0
                ? 'linear-gradient(135deg, rgba(0,229,160,0.4), rgba(139,92,246,0.4))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 40,
            }}
          >
            {text}
            <span style={{ color: '#00e5a0', WebkitTextFillColor: '#00e5a0' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── 13. TypewriterText ────────────────────────────────────────────

export function TypewriterText({ phrases, className }: { phrases: string[]; className?: string }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[phraseIdx];
    let delay = deleting ? 30 : 70;
    if (!deleting && text === current) {
      delay = 1800;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText(prev => deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx, phrases]);
  return (
    <span className={className}>
      <span>{text}</span>
      <span
        style={{
          display: 'inline-block',
          width: 2, height: '1em',
          background: '#00e5a0',
          marginLeft: 2,
          verticalAlign: 'text-bottom',
          animation: 'blink 1s step-end infinite',
        }}
      />
      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </span>
  );
}

// ─── 14. FloatingDock ──────────────────────────────────────────────

const DOCK_ITEMS = [
  { id: 'hero', label: 'Top', icon: Sparkles },
  { id: 'features', label: 'Features', icon: Brain },
  { id: 'demo', label: 'Demo', icon: Play },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'pricing', label: 'Pricing', icon: Crown },
  { id: 'faq', label: 'FAQ', icon: MessageCircle },
];

export function FloatingDock() {
  const [hovered, setHovered] = useState<string | null>(null);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        gap: 4,
        padding: 6,
        background: 'rgba(12,14,20,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      }}
    >
      {DOCK_ITEMS.map(item => {
        const Icon = item.icon;
        const isHovered = hovered === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              width: isHovered ? 56 : 40,
              height: 40,
              border: 'none',
              background: isHovered ? 'rgba(0,229,160,0.15)' : 'transparent',
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Icon size={18} color={isHovered ? '#00e5a0' : '#94a3b8'} />
            {isHovered && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '100%', left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: 8,
                  padding: '3px 8px',
                  background: '#000',
                  color: '#fff',
                  fontSize: 10, fontWeight: 600,
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── 15. LiveNotificationBadge ─────────────────────────────────────

export function LiveNotificationBadge() {
  const [count, setCount] = useState(3);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 3));
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 8000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        background: pulse ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        color: '#fca5a5',
        transition: 'background 0.4s',
      }}
    >
      <span
        style={{
          width: 6, height: 6,
          borderRadius: '50%', background: '#ef4444',
          boxShadow: '0 0 6px #ef4444',
        }}
      />
      {count} new this week
    </div>
  );
}
