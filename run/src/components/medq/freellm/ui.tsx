'use client';

/**
 * Shared UX primitives for the MedQ AI Router tab — freellmapi's dashboard
 * idioms, restyled native in MedQ's design language (bg #0c0e14, accent
 * #00e5a0, muted #8b95a8). No iframe, no external CSS: everything renders
 * with the same Tailwind tokens as the rest of MedQ.
 *
 * Ported patterns (from github.com/tashfeenahmed/freellmapi):
 *   - statusDot       : per-key health vocabulary (healthy / rate-limited / …)
 *   - ConfirmButton   : arm-then-fire destructive actions
 *   - SegmentedControl: pill tab bar (views, ranges)
 *   - StatCard        : dashboard stat tiles
 *   - platformColor   : one accent per provider
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Copy, Loader2, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Provider health vocabulary (sidecar /api/keys statuses) ─────────────────

export type FlStatus = 'healthy' | 'rate-limited' | 'invalid' | 'error' | 'unknown' | 'disabled';

export const FL_STATUS_DOT: Record<string, string> = {
  healthy: 'bg-[#00e5a0] shadow-[0_0_6px_rgba(0,229,160,0.7)]',
  'rate-limited': 'bg-[#f5b73d] shadow-[0_0_6px_rgba(245,183,61,0.6)]',
  invalid: 'bg-[#ff5757]',
  error: 'bg-[#ff5757]',
  unknown: 'bg-white/25',
  disabled: 'bg-white/15',
};

export const FL_STATUS_LABEL: Record<string, string> = {
  healthy: 'Healthy',
  'rate-limited': 'Rate-limited',
  invalid: 'Invalid key',
  error: 'Error',
  unknown: 'Unknown',
  disabled: 'Disabled',
};

export function FlStatusDot({ status, className }: { status: string; className?: string }) {
  return (
    <span
      title={FL_STATUS_LABEL[status] ?? status}
      className={cn('inline-block h-2 w-2 shrink-0 rounded-full', FL_STATUS_DOT[status] ?? 'bg-white/25', className)}
    />
  );
}

// ── Provider colors ─────────────────────────────────────────────────────────

export const PLATFORM_COLORS: Record<string, string> = {
  openai: '#10a37f',
  anthropic: '#d97757',
  google: '#4285f4',
  deepseek: '#4d6bfe',
  glm: '#38bdf8',
  zhipu: '#38bdf8',
  qwen: '#615ced',
  kimi: '#8b5cf6',
  moonshot: '#8b5cf6',
  minimax: '#f97316',
  siliconflow: '#7c3aed',
  doubao: '#0ea5e9',
  openrouter: '#64748b',
  grok: '#e2e8f0',
  xiaomi: '#fd5e5e',
  mistral: '#ff7000',
  cohere: '#39594d',
  groq: '#f55036',
  cerebras: '#f86fa2',
  together: '#0f6fff',
  fireworks: '#8b5cf6',
  ollama: '#a3a3a3',
  custom: '#00e5a0',
  zai: '#00e5a0',
  freellmapi: '#22c55e',
};

export function platformColor(platform: string): string {
  return PLATFORM_COLORS[platform] ?? '#5a6478';
}

// ── Panel / stat tiles ──────────────────────────────────────────────────────

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-xl border border-white/[0.06] bg-white/[0.02]', className)}>{children}</div>
  );
}

export function PanelHeader({ title, hint, right }: { title: ReactNode; hint?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-4 py-3">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-white/90">{title}</div>
        {hint ? <div className="mt-0.5 text-xs text-[#8b95a8]">{hint}</div> : null}
      </div>
      {right ? <div className="ml-auto flex items-center gap-2">{right}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
      <div className="text-[11px] font-medium uppercase tracking-wide text-[#8b95a8]">{label}</div>
      <div className="mt-1.5 text-2xl font-semibold tabular-nums" style={{ color: accent ?? '#e8ecf4' }}>
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-[#8b95a8]">{sub}</div> : null}
    </div>
  );
}

// ── Segmented control (pill tabs) ───────────────────────────────────────────

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  size = 'md',
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: ReactNode }>;
  size?: 'sm' | 'md';
}) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-white/[0.06] bg-black/30 p-0.5">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-md font-medium transition-colors',
              size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs',
              active ? 'bg-[#00e5a0]/15 text-[#00e5a0]' : 'text-[#8b95a8] hover:bg-white/[0.05] hover:text-white/80',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Arm-then-fire destructive button ────────────────────────────────────────

export function ConfirmButton({
  onConfirm,
  children,
  confirmLabel = 'Confirm',
  timeoutMs = 3000,
  className,
  title,
}: {
  onConfirm: () => void;
  children: ReactNode;
  confirmLabel?: ReactNode;
  timeoutMs?: number;
  className?: string;
  title?: string;
}) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return (
    <button
      type="button"
      title={title}
      className={cn(
        'rounded-md px-2 py-1 text-xs font-medium transition-colors',
        armed ? 'bg-[#ff5757]/15 text-[#ff5757]' : 'text-[#8b95a8] hover:bg-white/[0.06] hover:text-[#ff5757]',
        className,
      )}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          timer.current = setTimeout(() => setArmed(false), timeoutMs);
          return;
        }
        if (timer.current) clearTimeout(timer.current);
        setArmed(false);
        onConfirm();
      }}
    >
      {armed ? confirmLabel : children}
    </button>
  );
}

// ── Copy button ─────────────────────────────────────────────────────────────

export function CopyButton({ text, className, label }: { text: string; className?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      title={label ?? 'Copy'}
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white/90',
        className,
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch { /* clipboard unavailable */ }
      }}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#00e5a0]" /> : <Copy className="h-3.5 w-3.5" />}
      {label ? <span>{copied ? 'Copied' : label}</span> : null}
    </button>
  );
}

// ── Misc states ─────────────────────────────────────────────────────────────

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-[#ff5757]/20 bg-[#ff5757]/[0.06] px-3 py-2 text-xs text-[#ffb0b0]">
      <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <div className="min-w-0 break-words">{children}</div>
    </div>
  );
}

export function InlineLoader({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-[#8b95a8]">
      <Loader2 className="h-4 w-4 animate-spin text-[#00e5a0]" />
      {children}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: ReactNode; hint?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-12 text-center">
      <div className="text-sm font-medium text-white/70">{title}</div>
      {hint ? <div className="max-w-md text-xs text-[#8b95a8]">{hint}</div> : null}
    </div>
  );
}
