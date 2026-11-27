'use client';

import { DIFFICULTY_LEVELS, DIFFICULTY_COLORS, DIFFICULTY_LABELS, normalizeDifficulty } from '@/lib/medq-types';
import { Hammer, Star } from 'lucide-react';

/* ─── Types ─── */
type DifficultyLabel = 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert';

interface DifficultyIndicatorProps {
  /** Difficulty label string (e.g., 'Moderate', 'Medium' legacy) */
  difficulty: string;
  /** Display variant */
  variant?: 'icons' | 'badge' | 'compact' | 'full';
  /** Size of the icons */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the label text alongside icons */
  showLabel?: boolean;
  /** Optional className for the container */
  className?: string;
}

/* ─── Size Map ─── */
const SIZE_MAP = {
  sm: { icon: 3, gap: 'gap-0', text: 'text-[9px]', hammerW: 2.5, hammerH: 2.5 },
  md: { icon: 3.5, gap: 'gap-0.5', text: 'text-[10px]', hammerW: 3, hammerH: 3 },
  lg: { icon: 4, gap: 'gap-1', text: 'text-xs', hammerW: 3.5, hammerH: 3.5 },
} as const;

/* ─── Component ─── */
export default function DifficultyIndicator({
  difficulty,
  variant = 'icons',
  size = 'md',
  showLabel = true,
  className = '',
}: DifficultyIndicatorProps) {
  const normalized = normalizeDifficulty(difficulty) as DifficultyLabel;
  const level = DIFFICULTY_LEVELS[normalized] ?? 3;
  const color = DIFFICULTY_COLORS[level] ?? '#f59e0b';
  const label = DIFFICULTY_LABELS[level] ?? 'Moderate';
  const s = SIZE_MAP[size];

  /* ─── Icons variant: 5 hammer icons, filled up to level ─── */
  if (variant === 'icons') {
    return (
      <div className={`inline-flex items-center ${s.gap} ${className}`}>
        {Array.from({ length: 5 }, (_, i) => {
          const isActive = i < level;
          return (
            <Hammer
              key={i}
              className="transition-all"
              style={{
                width: s.hammerW * 4,
                height: s.hammerH * 4,
                color: isActive ? color : 'rgba(255,255,255,0.08)',
                filter: isActive ? `drop-shadow(0 0 3px ${color}40)` : 'none',
                transform: isActive ? 'rotate(-45deg)' : 'rotate(-45deg)',
              }}
            />
          );
        })}
        {showLabel && (
          <span
            className={`${s.text} font-semibold ml-1`}
            style={{ color }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  /* ─── Badge variant: single colored badge with star ─── */
  if (variant === 'badge') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${s.text} font-semibold border-0 ${className}`}
        style={{ background: `${color}15`, color }}
      >
        <Star className="fill-current" style={{ width: s.hammerW * 3, height: s.hammerH * 3 }} />
        {showLabel ? label : `L${level}`}
      </span>
    );
  }

  /* ─── Compact variant: just the level number with color dot ─── */
  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-1 ${s.text} font-semibold ${className}`} style={{ color }}>
        <span
          className="rounded-full"
          style={{
            width: size === 'sm' ? 6 : 8,
            height: size === 'sm' ? 6 : 8,
            background: color,
            boxShadow: `0 0 6px ${color}50`,
          }}
        />
        {showLabel ? label : `Lv${level}`}
      </span>
    );
  }

  /* ─── Full variant: hammer icons + label + level number ─── */
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className={`inline-flex items-center ${s.gap}`}>
        {Array.from({ length: 5 }, (_, i) => {
          const isActive = i < level;
          return (
            <Hammer
              key={i}
              style={{
                width: s.hammerW * 4,
                height: s.hammerH * 4,
                color: isActive ? color : 'rgba(255,255,255,0.08)',
                transform: 'rotate(-45deg)',
                filter: isActive ? `drop-shadow(0 0 3px ${color}40)` : 'none',
              }}
            />
          );
        })}
      </div>
      <span className={`${s.text} font-bold`} style={{ color }}>{label}</span>
      {showLabel && (
        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${color}12`, color: `${color}cc` }}>
          Level {level}
        </span>
      )}
    </div>
  );
}

/* ─── Difficulty Filter Chips ─── */
interface DifficultyChipProps {
  level: number;
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}

export function DifficultyChip({ level, label, active, count, onClick }: DifficultyChipProps) {
  // Level 0 is the "All" chip, uses a neutral color
  const color = level === 0 ? '#8b95a8' : (DIFFICULTY_COLORS[level] ?? '#f59e0b');
  const isAll = level === 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
      style={{
        background: active ? `${color}15` : '#1a1e2b',
        borderColor: active ? `${color}30` : 'rgba(255,255,255,0.08)',
        color: active ? color : '#8b95a8',
        boxShadow: active ? `0 0 8px ${color}15` : 'none',
      }}
    >
      <Hammer
        className="transition-all"
        style={{
          width: 12,
          height: 12,
          color: active ? color : 'rgba(255,255,255,0.15)',
          transform: 'rotate(-45deg)',
        }}
      />
      {label}
      {count !== undefined && (
        <span
          className="ml-0.5 text-[9px] px-1 py-0 rounded-full font-medium"
          style={{
            background: active ? `${color}20` : 'rgba(255,255,255,0.06)',
            color: active ? `${color}cc` : '#5a6178',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ─── Difficulty Mini Bar (for stat cards) ─── */
interface DifficultyMiniBarProps {
  level: number;
  value: number; // 0-100
  maxValue?: number;
  label?: string;
  showValue?: boolean;
}

export function DifficultyMiniBar({ level, value, maxValue = 100, label, showValue = true }: DifficultyMiniBarProps) {
  const color = DIFFICULTY_COLORS[level] ?? '#f59e0b';
  const pct = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-[10px] font-medium w-14 truncate" style={{ color: '#8b95a8' }}>{label}</span>
      )}
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${Math.max(pct, 2)}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
        />
      </div>
      {showValue && (
        <span className="text-[10px] font-bold w-8 text-right" style={{ color }}>{value}%</span>
      )}
    </div>
  );
}
