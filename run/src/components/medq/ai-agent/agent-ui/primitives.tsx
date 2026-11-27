'use client';
// ─── agent-ui/primitives ────────────────────────────────────────────────────
// Small shared building blocks used across the agent component library:
//   • AgentSkeleton    — shimmer placeholder rows (loading / recovering)
//   • AgentTooltip     — lightweight CSS hover/focus tooltip (no portal)
//   • agentToast()     — module-level toast store + useAgentToasts() hook +
//                        <AgentToastViewport/> renderer (no context provider
//                        needed — uses useSyncExternalStore)
//
// Design tokens intentionally match the existing agent chat surface:
// dark glass panels, #00e5a0 success, #f59e0b warning, #ff5757 error,
// #8b5cf6 plan accent, #4fc3f7 info.

import React, { useSyncExternalStore } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ToastVariant } from './types';

// ── One-time keyframes (skeleton shimmer + toast slide-in) ───────────────────

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  if (document.getElementById('agent-ui-styles')) {
    stylesInjected = true;
    return;
  }
  const style = document.createElement('style');
  style.id = 'agent-ui-styles';
  style.textContent = `
@keyframes agentUiShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes agentUiToastIn { from { opacity: 0; transform: translateY(8px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes agentUiToastOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(6px) scale(0.96); } }
@keyframes agentUiDotPulse { 0%, 100% { opacity: 0.35; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.15); } }
`;
  document.head.appendChild(style);
  stylesInjected = true;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

/** Shimmer placeholder block. `lines` renders stacked text-width rows. */
export function AgentSkeleton({ lines = 3, className = '', style }: { lines?: number; className?: string; style?: React.CSSProperties }) {
  injectStyles();
  const widths = ['92%', '78%', '85%', '64%', '88%'];
  return (
    <div className={`space-y-1.5 ${className}`} style={style} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-2.5 rounded-full"
          style={{
            width: widths[index % widths.length],
            background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)',
            backgroundSize: '200% 100%',
            animation: 'agentUiShimmer 1.6s linear infinite',
          }}
        />
      ))}
    </div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────

/** Pure-CSS tooltip (group-hover + focus-visible). Wrap any single child. */
export function AgentTooltip({
  label,
  side = 'top',
  children,
}: {
  label: string;
  side?: 'top' | 'bottom';
  children: React.ReactNode;
}) {
  const pos =
    side === 'top'
      ? { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' }
      : { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' };
  return (
    <span className="group/tt relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute z-50 hidden whitespace-nowrap rounded-md px-2 py-1 text-[9.5px] font-medium leading-none group-hover/tt:block group-focus-within/tt:block"
        style={{ ...pos, background: 'rgba(13,17,29,0.96)', border: '1px solid rgba(255,255,255,0.12)', color: '#e8ecf4', boxShadow: '0 4px 14px rgba(0,0,0,0.35)' }}
      >
        {label}
      </span>
    </span>
  );
}

// ── Toast store (no provider — module singleton) ──────────────────────────────

export interface AgentToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss delay; 0 keeps it until dismissed manually. */
  durationMs?: number;
}

interface ToastItem extends Required<Pick<AgentToastInput, 'title' | 'variant'>> {
  id: number;
  description?: string;
  leaving?: boolean;
}

let toastSeq = 0;
let toasts: ToastItem[] = [];
const toastListeners = new Set<() => void>();

function emit() {
  for (const listener of toastListeners) listener();
}

function dismiss(id: number, immediate = false) {
  if (!toasts.some((t) => t.id === id)) return;
  if (immediate) {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
    return;
  }
  toasts = toasts.map((t) => (t.id === id ? { ...t, leaving: true } : t));
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 220);
}

/** Fire a toast from anywhere (components, callbacks, event handlers). */
export function agentToast(input: AgentToastInput) {
  injectStyles();
  const id = ++toastSeq;
  const item: ToastItem = {
    id,
    title: input.title,
    description: input.description,
    variant: input.variant ?? 'info',
  };
  toasts = [...toasts.slice(-3), item]; // keep at most 4 on screen
  emit();
  const duration = input.durationMs ?? 3800;
  if (duration > 0) setTimeout(() => dismiss(id), duration);
  return id;
}

function subscribe(listener: () => void) {
  toastListeners.add(listener);
  return () => toastListeners.delete(listener);
}

/** Reactive toast list for the viewport renderer. */
export function useAgentToasts(): ToastItem[] {
  return useSyncExternalStore(
    subscribe,
    () => toasts,
    () => toasts,
  );
}

const TOAST_ICONS: Record<ToastVariant, React.ReactNode> = {
  info: <Info className="h-3.5 w-3.5" style={{ color: '#4fc3f7' }} />,
  success: <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#00e5a0' }} />,
  warning: <AlertTriangle className="h-3.5 w-3.5" style={{ color: '#f59e0b' }} />,
  error: <XCircle className="h-3.5 w-3.5" style={{ color: '#ff5757' }} />,
};

/** Fixed toast viewport — mount ONCE near the app root (MedQAgentV3 does). */
export function AgentToastViewport() {
  const items = useAgentToasts();
  if (items.length === 0) return null;
  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-72 flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="pointer-events-auto flex items-start gap-2 rounded-xl px-3 py-2.5"
          style={{
            background: 'rgba(13,17,29,0.97)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
            animation: `${item.leaving ? 'agentUiToastOut 0.22s ease-in forwards' : 'agentUiToastIn 0.22s ease-out'}`,
          }}
        >
          <span className="mt-0.5 shrink-0">{TOAST_ICONS[item.variant]}</span>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-[#e8ecf4]">{item.title}</div>
            {item.description && (
              <div className="mt-0.5 text-[10px] leading-snug text-[#9ca3b8]">{item.description}</div>
            )}
          </div>
          <button
            onClick={() => dismiss(item.id, true)}
            className="shrink-0 rounded-md p-0.5 text-[#5a6478] transition-colors hover:bg-white/5 hover:text-[#e8ecf4]"
            aria-label="Dismiss notification"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}

/** Pulsing status dot used by ConnectionStatusBanner and RunStatusBadge. */
export function StatusDot({ color, pulse = true }: { color: string; pulse?: boolean }) {
  injectStyles();
  return (
    <span
      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ background: color, boxShadow: `0 0 6px ${color}`, ...(pulse ? { animation: 'agentUiDotPulse 1.6s ease-in-out infinite' } : {}) }}
    />
  );
}
