'use client';

import { Lock, Shield, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { EncryptionLevel } from './store';

/* ═══════════════════════════════════════════════════════════════
   COLOR CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
const C = {
  green: 'var(--medq-accent-green, #00e5a0)',
  amber: 'var(--medq-accent-amber, #f59e0b)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  text: 'var(--medq-text, #e8ecf4)',
  dimmed: '#5a6478',
  muted: '#8b95a8',
};

interface EncryptionBadgeProps {
  level: EncryptionLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

/**
 * Encryption status badge for chat headers and meeting interfaces
 */
export function EncryptionBadge({ level, size = 'md', showLabel = true }: EncryptionBadgeProps) {
  const config = {
    none: {
      icon: <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} />,
      label: 'Not Encrypted',
      color: C.danger,
      bg: 'rgba(255,87,87,0.08)',
      border: 'rgba(255,87,87,0.2)',
    },
    transport: {
      icon: <Shield className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} />,
      label: 'TLS Encrypted',
      color: C.amber,
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.2)',
    },
    e2e: {
      icon: <Lock className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} />,
      label: 'End-to-End Encrypted',
      color: C.green,
      bg: 'rgba(0,229,160,0.08)',
      border: 'rgba(0,229,160,0.2)',
    },
  };

  const c = config[level];
  const padding = size === 'sm' ? 'px-1.5 py-0.5' : size === 'md' ? 'px-2 py-1' : 'px-2.5 py-1.5';
  const fontSize = size === 'sm' ? 'text-[9px]' : size === 'md' ? 'text-[10px]' : 'text-[11px]';

  return (
    <span
      className={`inline-flex items-center gap-1 ${padding} rounded-md ${fontSize} font-medium`}
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      {c.icon}
      {showLabel && <span>{c.label}</span>}
    </span>
  );
}

/**
 * Lock icon for chat header — shows encryption status at a glance
 */
export function ChatLockIcon({ level }: { level: EncryptionLevel }) {
  if (level === 'e2e') {
    return <Lock className="w-4 h-4" style={{ color: C.green }} />;
  }
  if (level === 'transport') {
    return <Shield className="w-4 h-4" style={{ color: C.amber }} />;
  }
  return <AlertTriangle className="w-4 h-4" style={{ color: C.danger }} />;
}

/**
 * Meeting encryption status indicator
 */
export function MeetingEncryptionStatus({
  level,
  sas,
  verified,
}: {
  level: EncryptionLevel;
  sas?: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <EncryptionBadge level={level} size="sm" />
      {level === 'e2e' && sas && (
        <div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: C.dimmed }}>SAS:</span>
          <span
            className="font-mono text-[11px] font-bold tracking-widest px-1.5 py-0.5 rounded"
            style={{
              background: verified ? 'rgba(0,229,160,0.1)' : 'rgba(245,158,11,0.1)',
              color: verified ? C.green : C.amber,
              border: `1px solid ${verified ? 'rgba(0,229,160,0.2)' : 'rgba(245,158,11,0.2)'}`,
            }}
          >
            {sas}
          </span>
          {verified ? (
            <ShieldCheck className="w-3 h-3" style={{ color: C.green }} />
          ) : (
            <span className="text-[9px]" style={{ color: C.dimmed }}>unverified</span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Compliance banner for chat — shows "End-to-End Encrypted" or warning
 */
export function ComplianceBanner({ level }: { level: EncryptionLevel }) {
  if (level === 'e2e') {
    return (
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px]"
        style={{ background: 'rgba(0,229,160,0.06)', color: C.green, border: '1px solid rgba(0,229,160,0.12)' }}
      >
        <Lock className="w-3 h-3" />
        <span className="font-medium">Messages are end-to-end encrypted. No one outside this chat can read them.</span>
      </div>
    );
  }
  if (level === 'transport') {
    return (
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px]"
        style={{ background: 'rgba(245,158,11,0.06)', color: C.amber, border: '1px solid rgba(245,158,11,0.12)' }}
      >
        <Shield className="w-3 h-3" />
        <span className="font-medium">Messages are encrypted in transit (TLS). Enable E2E encryption for full protection.</span>
      </div>
    );
  }
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px]"
      style={{ background: 'rgba(255,87,87,0.06)', color: C.danger, border: '1px solid rgba(255,87,87,0.12)' }}
    >
      <AlertTriangle className="w-3 h-3" />
      <span className="font-medium">Messages are not encrypted. Enable encryption in compliance settings.</span>
    </div>
  );
}
