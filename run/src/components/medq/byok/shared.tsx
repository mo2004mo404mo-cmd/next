'use client';

/**
 * Shared UX primitives for the BYOK hub — FreeLLMAPI-inspired idioms,
 * restyled in MedQ's design language (bg #0c0e14, text #e8ecf4, accent
 * #00e5a0, muted #8b95a8).
 *
 * Ported patterns (from github.com/tashfeenahmed/freellmapi):
 *   - statusDot            : colored per-key health dot
 *   - PLATFORM_COLORS      : one color source of truth per provider
 *   - ConfirmButton        : arm-then-fire destructive pattern
 *   - SegmentedControl     : pill tab bar
 *   - CapabilityChip       : vision (cyan) / tools (violet) mini chips
 *   - hover-revealed action clusters on rows
 *   - formatRelativeTime   : "3m ago" readouts
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BYOK_MONO_LOGO_IDS, type ByokProviderMeta } from '@/lib/ai/byok-providers';
import { cn } from '@/lib/utils';

// ── Provider health (derived from lastVerifiedAt + enabled) ──

export type KeyStatus = 'healthy' | 'stale' | 'error' | 'disabled' | 'unknown';

export const statusDot: Record<KeyStatus, string> = {
  healthy: 'bg-[#00e5a0]',
  stale: 'bg-[#f5b73d]',
  error: 'bg-[#ff5757]',
  disabled: 'bg-[#5a6478]',
  unknown: 'bg-[#5a6478]/50',
};

export const statusLabel: Record<KeyStatus, string> = {
  healthy: 'Verified',
  stale: 'Not verified recently',
  error: 'Failed check',
  disabled: 'Disabled',
  unknown: 'Never checked',
};

/** Derive key health. `forceError` marks the last test result as failed. */
export function keyStatus(key: {
  enabled: boolean;
  lastVerifiedAt: string | null;
  lastTestError?: string | null;
}): KeyStatus {
  if (!key.enabled) return 'disabled';
  if (key.lastTestError) return 'error';
  if (!key.lastVerifiedAt) return 'unknown';
  const age = Date.now() - new Date(key.lastVerifiedAt).getTime();
  // 24h freshness window — freellmapi polls health every 30s, MedQ verifies
  // on demand, so "verified within a day" reads as healthy.
  return age < 24 * 60 * 60 * 1000 ? 'healthy' : 'stale';
}

// ── Provider colors (brand-tinted dots, bars, avatars across the hub) ──

export const PLATFORM_COLORS: Record<string, string> = {
  openai: '#10a37f',
  anthropic: '#d97757',
  google: '#4285f4',
  deepseek: '#4d6bfe',
  glm: '#38bdf8',
  qwen: '#615ced',
  kimi: '#8b5cf6',
  minimax: '#f97316',
  siliconflow: '#7c3aed',
  doubao: '#0ea5e9',
  openrouter: '#64748b',
  grok: '#e2e8f0',
  xiaomi: '#fd5e5e',
  ollama: '#a3a3a3',
  freellmapi: '#22c55e',
  lemonade: '#84cc16',
  zai: '#00e5a0',
};

export function platformColor(providerId: string): string {
  return PLATFORM_COLORS[providerId] ?? '#5a6478';
}

/** Small colored dot for a provider (timeline legends, tables). */
export function PlatformDot({ providerId, className }: { providerId: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block size-2 rounded-full shrink-0', className)}
      style={{ backgroundColor: platformColor(providerId) }}
    />
  );
}

/** Provider avatar: logo image on a brand-tinted tile. */
export function ProviderAvatar({
  provider,
  size = 'md',
  className,
}: {
  provider: Pick<ByokProviderMeta, 'id' | 'name' | 'icon'>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const dim =
    size === 'xs' ? 'size-4' :
    size === 'sm' ? 'size-7' :
    size === 'lg' ? 'size-10' : 'size-8';
  const mono = BYOK_MONO_LOGO_IDS.has(provider.id);
  return (
    <span
      title={provider.name}
      className={cn(
        'inline-flex items-center justify-center overflow-hidden shrink-0',
        'border border-white/[0.06]',
        size === 'xs' ? 'rounded-[4px]' : 'rounded-lg',
        dim,
        mono ? 'bg-[#161923]' : 'bg-white/[0.06]',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={provider.icon}
        alt=""
        className={cn('size-[62%] object-contain', mono && 'invert')}
        onError={(e) => {
          // Logo missing → first letter chip instead of a broken image icon.
          const el = e.currentTarget;
          el.style.display = 'none';
          if (el.parentElement) {
            el.parentElement.dataset.fallback = provider.name.slice(0, 1).toUpperCase();
            el.parentElement.style.fontWeight = '700';
          }
        }}
      />
    </span>
  );
}

// ── ConfirmButton: arm-then-fire destructive pattern ──

export function ConfirmButton({
  onConfirm,
  children,
  confirmLabel,
  className,
  timeoutMs = 3000,
  title,
}: {
  onConfirm: () => void;
  children: ReactNode;
  confirmLabel: string;
  className?: string;
  timeoutMs?: number;
  title?: string;
}) {
  const [armed, setArmed] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (t.current) clearTimeout(t.current); }, []);

  const arm = () => {
    setArmed(true);
    t.current = setTimeout(() => setArmed(false), timeoutMs);
  };

  return (
    <button
      type="button"
      title={title ?? (armed ? confirmLabel : undefined)}
      onClick={(e) => {
        e.stopPropagation();
        if (armed) {
          if (t.current) clearTimeout(t.current);
          setArmed(false);
          onConfirm();
        } else {
          arm();
        }
      }}
      onPointerLeave={() => {
        if (armed && t.current) {
          clearTimeout(t.current);
          setArmed(false);
        }
      }}
      className={cn(
        'inline-flex items-center gap-1 rounded-md text-[10px] font-semibold h-6 px-2 transition-colors',
        armed
          ? 'bg-[#ff5757] text-[#0c0e14]'
          : 'text-[#ff5757] hover:bg-[#ff5757]/10 border border-transparent hover:border-[#ff5757]/20',
        className,
      )}
    >
      {armed ? confirmLabel : children}
    </button>
  );
}

// ── SegmentedControl: pill tab bar ──

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: Array<{ value: T; label: string; count?: number }>;
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg bg-[#08090f] border border-white/[0.06] p-0.5',
        className,
      )}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'rounded-md px-2.5 h-7 text-[10px] font-semibold transition-colors whitespace-nowrap',
              active
                ? 'bg-[#00e5a0] text-[#0c0e14]'
                : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04]',
            )}
          >
            {o.label}
            {o.count != null && (
              <span className={cn('ml-1 tabular-nums', active ? 'text-[#0c0e14]/70' : 'text-[#5a6478]')}>
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Capability chips (the FreeLLMAPI metadata vocabulary) ──

export function CapabilityChip({ kind }: { kind: 'vision' | 'tools' | 'streaming' | 'thinking' }) {
  const styles: Record<typeof kind, { cls: string; label: string }> = {
    vision: { cls: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20', label: 'vision' },
    tools: { cls: 'bg-violet-400/10 text-violet-300 border-violet-400/20', label: 'tools' },
    streaming: { cls: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20', label: 'stream' },
    thinking: { cls: 'bg-amber-400/10 text-amber-300 border-amber-400/20', label: 'thinking' },
  };
  const s = styles[kind];
  return (
    <span className={cn('text-[9px] font-semibold rounded-full px-1.5 py-px border', s.cls)}>
      {s.label}
    </span>
  );
}

/** Context-window chip ("128K"). */
export function ContextChip({ tokens }: { tokens?: number }) {
  if (!tokens) return null;
  const label =
    tokens >= 1_000_000
      ? `${Math.round(tokens / 1_000_000)}M`
      : tokens >= 1000
        ? `${Math.round(tokens / 1000)}K`
        : `${tokens}`;
  return (
    <span className="text-[9px] font-medium rounded-full px-1.5 py-px border border-white/[0.08] text-[#8b95a8] tabular-nums">
      {label}
    </span>
  );
}

// ── Formatting helpers ──

export function formatRelativeTime(iso: string | null): string {
  if (!iso) return 'never';
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 45) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function formatLatency(ms: number | null): string {
  if (ms == null) return '—';
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${ms}ms`;
}
