// Shared constants & helpers for admin sub-tabs.
// Kept in one place so the sub-tab files can stay focused on layout/logic.

export const ADMIN_COLORS = {
  bg: '#0c0e14',
  card: '#151821',
  cardBorder: 'rgba(255,255,255,0.06)',
  green: '#00e5a0',
  cyan: '#22d3ee',
  purple: '#8b5cf6',
  amber: '#f59e0b',
  blue: '#4fc3f7',
  red: '#ff5757',
  text: '#e8ecf4',
  muted: '#5a6478',
  dimmed: '#3a4055',
} as const;

export const ROLE_COLORS: Record<string, string> = {
  admin: ADMIN_COLORS.red,
  educator: ADMIN_COLORS.blue,
  student: ADMIN_COLORS.green,
};

export const TIER_COLORS: Record<string, string> = {
  free: ADMIN_COLORS.muted,
  premium: ADMIN_COLORS.purple,
  pro: ADMIN_COLORS.amber,
};

export const USER_STATUS_COLORS: Record<string, string> = {
  active: ADMIN_COLORS.green,
  suspended: ADMIN_COLORS.amber,
  banned: ADMIN_COLORS.red,
};

export const REPORT_REASON_COLORS: Record<string, string> = {
  incorrect: ADMIN_COLORS.red,
  outdated: ADMIN_COLORS.amber,
  offensive: ADMIN_COLORS.purple,
  duplicate: ADMIN_COLORS.cyan,
  other: ADMIN_COLORS.muted,
};

export const REPORT_STATUS_COLORS: Record<string, string> = {
  pending: ADMIN_COLORS.amber,
  reviewed: ADMIN_COLORS.blue,
  resolved: ADMIN_COLORS.green,
};

export function getInitials(name: string | null, email: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return '??';
}

export function formatDate(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return '—';
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateTime(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return '—';
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function formatUsd(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(2)}k`;
  return `$${n.toFixed(2)}`;
}

export function formatRelative(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return '—';
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (isNaN(d.getTime())) return '—';
  const diff = Date.now() - d.getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return formatDate(d);
}
