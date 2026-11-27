'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Crown,
  Shield,
  CreditCard,
  Activity,
  Search,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  UserCog,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Settings as SettingsIcon,
  Megaphone,
  Plus,
  Save,
  Image as ImageIcon,
  Type,
  Palette,
  Braces,

  MousePointerClick,
  Eye as EyeIcon,
  DollarSign,

  ToggleLeft,
  ToggleRight,
  Play,
  Pause,
  Archive,
  Box,
  Upload,
  File,
  Filter,

  // ── Admin moderation icons ──
  Ban,
  KeyRound,
  Gavel,
  BarChart3,
  Flag,
  Unlock,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dynamic from 'next/dynamic';
import ComplianceDashboard from '../compliance/ComplianceDashboard';
// ── New admin sub-tabs (analytics, moderation, revenue) ──
import AnalyticsTab from './AnalyticsTab';
import ModerationTab from './ModerationTab';
import RevenueTab from './RevenueTab';

// Lazy-load the OBJ Model Viewer for preview dialogs (avoids heavy Three.js in initial bundle)
const OBJModelViewer = dynamic(() => import('@/components/medq/OBJModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 rounded-lg" style={{ background: 'var(--medq-app-bg, #0c0e14)' }}>
      <div className="text-center">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" style={{ color: COLORS.cyan }} />
        <p className="text-[10px]" style={{ color: COLORS.muted }}>Loading 3D Viewer...</p>
      </div>
    </div>
  ),
});

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

/* ────────────────────────────── Color Constants ────────────────────────────── */

const COLORS = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, #151821)',
  cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
  green: 'var(--medq-accent-green, #00e5a0)',
  cyan: 'var(--medq-accent-cyan, #22d3ee)',
  purple: 'var(--medq-accent-purple, #8b5cf6)',
  amber: 'var(--medq-accent-amber, #f59e0b)',
  blue: '#4fc3f7',
  red: 'var(--medq-accent-danger, #ff5757)',
  text: 'var(--medq-text, #e8ecf4)',
  muted: 'var(--medq-muted, #5a6478)',
  dimmed: 'var(--medq-dimmed, #3a4055)',
};

const ROLE_COLORS: Record<string, string> = {
  admin: COLORS.red,
  educator: COLORS.blue,
  student: COLORS.green,
};

const TIER_COLORS: Record<string, string> = {
  free: COLORS.muted,
  premium: COLORS.purple,
  pro: COLORS.amber,
};

const STATUS_COLORS: Record<string, string> = {
  active: COLORS.green,
  paused: COLORS.amber,
  archived: COLORS.muted,
};

// User moderation status colors (ban/suspend system)
const USER_STATUS_COLORS: Record<string, string> = {
  active: COLORS.green,
  suspended: COLORS.amber,
  banned: COLORS.red,
};

const ADTYPE_COLORS: Record<string, string> = {
  banner: COLORS.blue,
  interstitial: COLORS.purple,
  rewarded: COLORS.amber,
  native: COLORS.cyan,
};

/* ────────────────────────────── Types ────────────────────────────── */

interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  proUsers: number;
  totalRevenue: number;
  activeToday: number;
  usersTrend: number;
  revenueTrend: number;
  activeTrend: number;
  // ── moderation fields (optional for backward compat) ──
  bannedCount?: number;
  suspendedCount?: number;
  pendingReportsCount?: number;
}

interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  tier: string;
  credits: number;
  createdAt: string;
  image: string | null;
  // ── moderation fields (optional for backward compat) ──
  status?: string;
  suspendedUntil?: string | null;
  suspendedReason?: string | null;
  bannedAt?: string | null;
  bannedReason?: string | null;
  lastActiveAt?: string | null;
}

interface UsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  totalPages: number;
}

interface AppSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  label: string;
  updatedAt: string;
}

interface AdCampaign {
  id: string;
  name: string;
  advertiser: string;
  adType: string;
  placement: string;
  status: string;
  cpm: number;
  cpc: number;
  targetUrl: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  priority: number;
  impressions: number;
  clicks: number;
  revenue: number;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

type AdminTabKey =
  | 'users'
  | 'analytics'
  | 'moderation'
  | 'revenue'
  | 'settings'
  | 'ads'
  | 'models'
  | 'compliance';

/* ────────────────────────────── Helpers ────────────────────────────── */

function getInitials(name: string | null, email: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return '??';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'color': return <Palette className="w-3.5 h-3.5" />;
    case 'image': return <ImageIcon className="w-3.5 h-3.5" />;
    case 'json': return <Braces className="w-3.5 h-3.5" />;
    default: return <Type className="w-3.5 h-3.5" />;
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'color': return COLORS.purple;
    case 'image': return COLORS.cyan;
    case 'json': return COLORS.amber;
    default: return COLORS.green;
  }
}

/* ────────────────────────────── Trend Indicator ────────────────────────────── */

function TrendIndicator({ value }: { value: number }) {
  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-medium" style={{ color: COLORS.green }}>
        <TrendingUp className="w-3 h-3" />+{value}%
      </span>
    );
  }
  if (value < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-medium" style={{ color: COLORS.red }}>
        <TrendingDown className="w-3 h-3" />{value}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium" style={{ color: COLORS.muted }}>
      <Minus className="w-3 h-3" />0%
    </span>
  );
}

/* ────────────────────────────── Stat Card ────────────────────────────── */

function StatCard({
  label,
  value,
  icon,
  color,
  bgColor,
  trend,
  index,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="rounded-2xl p-4 border transition-all hover:border-white/[0.1]"
      style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: bgColor, color }}
        >
          {icon}
        </div>
        {trend !== undefined && <TrendIndicator value={trend} />}
      </div>
      <p className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
        {typeof value === 'number' ? formatNumber(value) : value}
      </p>
      <p className="text-[10px] mt-0.5 font-medium" style={{ color: COLORS.muted }}>
        {label}
      </p>
    </motion.div>
  );
}

/* ────────────────────────────── Loading Skeletons ────────────────────────────── */

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-4 border" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
          <Skeleton className="h-9 w-9 rounded-lg mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <Skeleton className="h-7 w-16 mb-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <Skeleton className="h-3 w-20" style={{ background: 'rgba(255,255,255,0.04)' }} />
        </div>
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="rounded-2xl border p-6" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
      <div className="flex items-center gap-3 mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-32 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }} />
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full mb-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   SETTINGS TAB
   ══════════════════════════════════════════════════════════════════════════════ */

function SettingsTab() {
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editSetting, setEditSetting] = useState<AppSetting | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [editType, setEditType] = useState('text');
  const [saving, setSaving] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState('text');
  const [deleteKey, setDeleteKey] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || []);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleEdit = (setting: AppSetting) => {
    setEditSetting(setting);
    setEditValue(setting.value);
    setEditLabel(setting.label);
    setEditType(setting.type);
  };

  const handleSaveEdit = async () => {
    if (!editSetting) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/settings/${encodeURIComponent(editSetting.key)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: editValue, label: editLabel, type: editType }),
      });
      if (!res.ok) throw new Error('Failed to update setting');

      // If favicon_url was changed, update the document favicon
      if (editSetting.key === 'favicon_url' && editValue) {
        const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
        if (link) {
          link.setAttribute('href', editValue);
        } else {
          const newLink = document.createElement('link');
          newLink.rel = 'icon';
          newLink.href = editValue;
          document.head.appendChild(newLink);
        }
      }

      toast.success(`Setting "${editSetting.key}" updated`);
      setEditSetting(null);
      fetchSettings();
    } catch (err) {
      toast.error('Failed to update setting');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async () => {
    if (!newKey.trim()) {
      toast.error('Key is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newKey, value: newValue, type: newType, label: newLabel }),
      });
      if (!res.ok) throw new Error('Failed to create setting');

      toast.success(`Setting "${newKey}" created`);
      setShowCreate(false);
      setNewKey('');
      setNewValue('');
      setNewLabel('');
      setNewType('text');
      fetchSettings();
    } catch (err) {
      toast.error('Failed to create setting');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteKey) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/settings/${encodeURIComponent(deleteKey)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete setting');

      toast.success(`Setting "${deleteKey}" deleted`);
      setDeleteKey(null);
      fetchSettings();
    } catch (err) {
      toast.error('Failed to delete setting');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-5 border" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
            <Skeleton className="h-5 w-24 mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <Skeleton className="h-4 w-full mb-2" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <Skeleton className="h-8 w-20" style={{ background: 'rgba(255,255,255,0.04)' }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: COLORS.text }}>Application Settings</h3>
          <p className="text-[10px]" style={{ color: COLORS.muted }}>Configure app behavior without code changes</p>
        </div>
        <Button
          onClick={() => setShowCreate(true)}
          className="text-xs font-medium h-8"
          style={{ background: COLORS.green, color: '#0c0e14' }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          New Setting
        </Button>
      </div>

      {/* Settings Grid */}
      {settings.length === 0 ? (
        <div className="rounded-2xl border p-12 text-center" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
          <SettingsIcon className="w-8 h-8 mx-auto mb-2" style={{ color: COLORS.dimmed }} />
          <p className="text-xs mb-1" style={{ color: COLORS.dimmed }}>No settings configured yet</p>
          <p className="text-[10px]" style={{ color: COLORS.muted }}>Click &quot;New Setting&quot; or seed defaults to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {settings.map((setting, i) => {
            const typeColor = getTypeColor(setting.type);
            return (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-2xl p-5 border transition-all hover:border-white/[0.1]"
                style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center"
                      style={{ background: `${typeColor}15`, color: typeColor }}
                    >
                      {getTypeIcon(setting.type)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: COLORS.text }}>{setting.label || setting.key}</p>
                      <p className="text-[9px] font-mono" style={{ color: COLORS.dimmed }}>{setting.key}</p>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                    style={{
                      background: `${typeColor}15`,
                      color: typeColor,
                      border: `1px solid ${typeColor}30`,
                    }}
                  >
                    {setting.type}
                  </span>
                </div>

                {/* Value display */}
                <div className="mb-3">
                  {setting.type === 'color' ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg border"
                        style={{ background: setting.value || '#000', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
                      />
                      <span className="text-xs font-mono" style={{ color: COLORS.muted }}>{setting.value || '(empty)'}</span>
                    </div>
                  ) : setting.type === 'image' ? (
                    <div>
                      {setting.value ? (
                        <img
                          src={setting.value}
                          alt={setting.label || setting.key}
                          className="w-full h-20 object-cover rounded-lg mb-1"
                          style={{ background: 'rgba(255,255,255,0.03)' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : null}
                      <p className="text-[10px] truncate" style={{ color: COLORS.muted }}>{setting.value || '(no image)'}</p>
                    </div>
                  ) : setting.type === 'json' ? (
                    <pre
                      className="text-[10px] p-2 rounded-lg max-h-20 overflow-auto"
                      style={{ background: 'rgba(255,255,255,0.03)', color: COLORS.muted }}
                    >
                      {setting.value ? setting.value.slice(0, 120) + (setting.value.length > 120 ? '...' : '') : '(empty)'}
                    </pre>
                  ) : (
                    <p className="text-xs truncate" style={{ color: COLORS.muted }}>{setting.value || '(empty)'}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-[8px]" style={{ color: COLORS.dimmed }}>
                    Updated {formatDate(setting.updatedAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(setting)}
                      className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                      title="Edit Setting"
                    >
                      <Pencil className="w-3 h-3" style={{ color: COLORS.purple }} />
                    </button>
                    <button
                      onClick={() => setDeleteKey(setting.key)}
                      className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                      title="Delete Setting"
                    >
                      <Trash2 className="w-3 h-3" style={{ color: COLORS.red }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Edit Setting Dialog ── */}
      <Dialog open={!!editSetting} onOpenChange={(open) => { if (!open) setEditSetting(null); }}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>Edit Setting</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Update value for &quot;{editSetting?.label || editSetting?.key}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Label</label>
              <Input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="text-xs"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Type</label>
              <Select value={editType} onValueChange={setEditType}>
                <SelectTrigger
                  className="w-full text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
                  <SelectItem value="text" style={{ color: COLORS.text }}>Text</SelectItem>
                  <SelectItem value="color" style={{ color: COLORS.text }}>Color</SelectItem>
                  <SelectItem value="image" style={{ color: COLORS.text }}>Image URL</SelectItem>
                  <SelectItem value="json" style={{ color: COLORS.text }}>JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Value</label>
              {editType === 'color' ? (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editValue || '#000000'}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-10 h-10 rounded-lg border cursor-pointer"
                    style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', background: 'transparent' }}
                  />
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="text-xs font-mono flex-1"
                    placeholder="#00e5a0"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                      color: COLORS.text,
                    }}
                  />
                </div>
              ) : editType === 'json' ? (
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={5}
                  className="w-full text-xs font-mono p-3 rounded-lg outline-none border resize-y"
                  placeholder="{}"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                />
              ) : (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="text-xs"
                  placeholder={editType === 'image' ? 'https://example.com/image.png' : 'Enter value...'}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                />
              )}
              {editType === 'image' && editValue && (
                <img
                  src={editValue}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-lg mt-2"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setEditSetting(null)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={saving}
              className="text-xs font-medium"
              style={{ background: COLORS.green, color: '#0c0e14' }}
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Create Setting Dialog ── */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>New Setting</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Add a new configurable setting
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Key</label>
              <Input
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="text-xs font-mono"
                placeholder="e.g. favicon_url"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Label</label>
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="text-xs"
                placeholder="e.g. Favicon URL"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Type</label>
              <Select value={newType} onValueChange={setNewType}>
                <SelectTrigger
                  className="w-full text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
                  <SelectItem value="text" style={{ color: COLORS.text }}>Text</SelectItem>
                  <SelectItem value="color" style={{ color: COLORS.text }}>Color</SelectItem>
                  <SelectItem value="image" style={{ color: COLORS.text }}>Image URL</SelectItem>
                  <SelectItem value="json" style={{ color: COLORS.text }}>JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Value</label>
              {newType === 'color' ? (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={newValue || '#000000'}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-10 h-10 rounded-lg border cursor-pointer"
                    style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', background: 'transparent' }}
                  />
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="text-xs font-mono flex-1"
                    placeholder="#00e5a0"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                      color: COLORS.text,
                    }}
                  />
                </div>
              ) : newType === 'json' ? (
                <textarea
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  rows={4}
                  className="w-full text-xs font-mono p-3 rounded-lg outline-none border resize-y"
                  placeholder="{}"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                />
              ) : (
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="text-xs"
                  placeholder={newType === 'image' ? 'https://example.com/image.png' : 'Enter value...'}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                />
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setShowCreate(false)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving}
              className="text-xs font-medium"
              style={{ background: COLORS.green, color: '#0c0e14' }}
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Create
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Setting Confirmation ── */}
      <AlertDialog open={!!deleteKey} onOpenChange={(open) => { if (!open) setDeleteKey(null); }}>
        <AlertDialogContent
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: COLORS.text }}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" style={{ color: COLORS.red }} />
                Delete Setting
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: COLORS.muted }}>
              Are you sure you want to delete the setting <strong style={{ color: COLORS.text }}>{deleteKey}</strong>?
              This may affect app behavior if this setting is used elsewhere.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ color: COLORS.muted, borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              style={{ background: COLORS.red, color: '#fff' }}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ADS TAB
   ══════════════════════════════════════════════════════════════════════════════ */

const EMPTY_CAMPAIGN = {
  name: '',
  advertiser: '',
  adType: 'banner',
  placement: 'dashboard_top',
  status: 'active',
  cpm: 0,
  cpc: 0,
  targetUrl: '',
  imageUrl: '',
  title: '',
  subtitle: '',
  ctaText: '',
  priority: 0,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: '',
};

function AdsTab() {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editCampaign, setEditCampaign] = useState<AdCampaign | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteCampaign, setDeleteCampaign] = useState<AdCampaign | null>(null);

  // Form state for create/edit
  const [form, setForm] = useState(EMPTY_CAMPAIGN);

  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch('/api/ads/campaigns?all=true');
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const openCreate = () => {
    setForm(EMPTY_CAMPAIGN);
    setShowCreate(true);
  };

  const openEdit = (c: AdCampaign) => {
    setForm({
      name: c.name,
      advertiser: c.advertiser,
      adType: c.adType,
      placement: c.placement,
      status: c.status,
      cpm: c.cpm,
      cpc: c.cpc,
      targetUrl: c.targetUrl,
      imageUrl: c.imageUrl,
      title: c.title,
      subtitle: c.subtitle,
      ctaText: c.ctaText,
      priority: c.priority,
      startDate: new Date(c.startDate).toISOString().slice(0, 10),
      endDate: c.endDate ? new Date(c.endDate).toISOString().slice(0, 10) : '',
    });
    setEditCampaign(c);
  };

  const handleCreate = async () => {
    if (!form.name.trim()) {
      toast.error('Campaign name is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/ads/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create campaign');

      toast.success(`Campaign "${form.name}" created`);
      setShowCreate(false);
      fetchCampaigns();
    } catch (err) {
      toast.error('Failed to create campaign');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editCampaign) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/ads/campaigns/${editCampaign.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update campaign');

      toast.success(`Campaign "${form.name}" updated`);
      setEditCampaign(null);
      fetchCampaigns();
    } catch (err) {
      toast.error('Failed to update campaign');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (c: AdCampaign) => {
    const nextStatus = c.status === 'active' ? 'paused' : c.status === 'paused' ? 'active' : 'active';
    try {
      const res = await fetch(`/api/ads/campaigns/${c.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error('Failed to toggle status');

      toast.success(`Campaign "${c.name}" is now ${nextStatus}`);
      fetchCampaigns();
    } catch (err) {
      toast.error('Failed to update status');
      console.error(err);
    }
  };

  const handleArchive = async (c: AdCampaign) => {
    try {
      const res = await fetch(`/api/ads/campaigns/${c.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'archived' }),
      });
      if (!res.ok) throw new Error('Failed to archive campaign');

      toast.success(`Campaign "${c.name}" archived`);
      fetchCampaigns();
    } catch (err) {
      toast.error('Failed to archive campaign');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteCampaign) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/ads/campaigns/${deleteCampaign.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete campaign');

      toast.success(`Campaign "${deleteCampaign.name}" deleted`);
      setDeleteCampaign(null);
      fetchCampaigns();
    } catch (err) {
      toast.error('Failed to delete campaign');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Aggregate stats
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const totalRevenue = campaigns.reduce((s, c) => s + c.revenue, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  if (loading) {
    return <TableSkeleton />;
  }

  const campaignFormFields = (
    <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2 col-span-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Campaign Name *</label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="text-xs"
            placeholder="e.g. PharmaCo Banner"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Advertiser</label>
          <Input
            value={form.advertiser}
            onChange={(e) => setForm({ ...form, advertiser: e.target.value })}
            className="text-xs"
            placeholder="Company name"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Status</label>
          <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
            <SelectTrigger className="w-full text-xs" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
              <SelectItem value="active" style={{ color: COLORS.text }}>Active</SelectItem>
              <SelectItem value="paused" style={{ color: COLORS.text }}>Paused</SelectItem>
              <SelectItem value="archived" style={{ color: COLORS.text }}>Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Ad Type</label>
          <Select value={form.adType} onValueChange={(v) => setForm({ ...form, adType: v })}>
            <SelectTrigger className="w-full text-xs" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
              <SelectItem value="banner" style={{ color: COLORS.text }}>Banner</SelectItem>
              <SelectItem value="interstitial" style={{ color: COLORS.text }}>Interstitial</SelectItem>
              <SelectItem value="rewarded" style={{ color: COLORS.text }}>Rewarded</SelectItem>
              <SelectItem value="native" style={{ color: COLORS.text }}>Native</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Placement</label>
          <Select value={form.placement} onValueChange={(v) => setForm({ ...form, placement: v })}>
            <SelectTrigger className="w-full text-xs" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
              <SelectItem value="dashboard_top" style={{ color: COLORS.text }}>Dashboard Top</SelectItem>
              <SelectItem value="tab_bottom" style={{ color: COLORS.text }}>Tab Bottom</SelectItem>
              <SelectItem value="quiz_result" style={{ color: COLORS.text }}>Quiz Result</SelectItem>
              <SelectItem value="tab_switch" style={{ color: COLORS.text }}>Tab Switch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>CPM ($)</label>
          <Input
            type="number"
            value={form.cpm}
            onChange={(e) => setForm({ ...form, cpm: parseFloat(e.target.value) || 0 })}
            className="text-xs"
            step="0.01"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>CPC ($)</label>
          <Input
            type="number"
            value={form.cpc}
            onChange={(e) => setForm({ ...form, cpc: parseFloat(e.target.value) || 0 })}
            className="text-xs"
            step="0.01"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Priority</label>
          <Input
            type="number"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
            className="text-xs"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Target URL</label>
        <Input
          value={form.targetUrl}
          onChange={(e) => setForm({ ...form, targetUrl: e.target.value })}
          className="text-xs"
          placeholder="https://..."
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Image URL</label>
        <Input
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="text-xs"
          placeholder="https://..."
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-full h-20 object-cover rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Title</label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="text-xs"
            placeholder="Ad headline"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Subtitle</label>
          <Input
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="text-xs"
            placeholder="Ad description"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium" style={{ color: COLORS.muted }}>CTA Text</label>
        <Input
          value={form.ctaText}
          onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
          className="text-xs"
          placeholder="e.g. Learn More"
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Start Date</label>
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="text-xs"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium" style={{ color: COLORS.muted }}>End Date</label>
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="text-xs"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: COLORS.text }}>Ad Campaigns</h3>
          <p className="text-[10px]" style={{ color: COLORS.muted }}>Manage ad campaigns and track performance</p>
        </div>
        <Button
          onClick={openCreate}
          className="text-xs font-medium h-8"
          style={{ background: COLORS.green, color: '#0c0e14' }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          New Campaign
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl p-3 border" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
          <div className="flex items-center gap-2 mb-1">
            <EyeIcon className="w-3.5 h-3.5" style={{ color: COLORS.blue }} />
            <span className="text-[9px] font-medium" style={{ color: COLORS.muted }}>Impressions</span>
          </div>
          <p className="text-lg font-bold" style={{ color: COLORS.text }}>{formatNumber(totalImpressions)}</p>
        </div>
        <div className="rounded-xl p-3 border" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
          <div className="flex items-center gap-2 mb-1">
            <MousePointerClick className="w-3.5 h-3.5" style={{ color: COLORS.purple }} />
            <span className="text-[9px] font-medium" style={{ color: COLORS.muted }}>Clicks</span>
          </div>
          <p className="text-lg font-bold" style={{ color: COLORS.text }}>{formatNumber(totalClicks)}</p>
        </div>
        <div className="rounded-xl p-3 border" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-3.5 h-3.5" style={{ color: COLORS.green }} />
            <span className="text-[9px] font-medium" style={{ color: COLORS.muted }}>Revenue</span>
          </div>
          <p className="text-lg font-bold" style={{ color: COLORS.text }}>${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="rounded-xl p-3 border" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
          <div className="flex items-center gap-2 mb-1">
            <Megaphone className="w-3.5 h-3.5" style={{ color: COLORS.amber }} />
            <span className="text-[9px] font-medium" style={{ color: COLORS.muted }}>Active</span>
          </div>
          <p className="text-lg font-bold" style={{ color: COLORS.text }}>{activeCampaigns}</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: COLORS.cardBorder }}>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Campaign</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Placement</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Impr.</th>
                <th className="text-right px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Clicks</th>
                <th className="text-right px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Revenue</th>
                <th className="text-right px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Megaphone className="w-8 h-8 mx-auto mb-2" style={{ color: COLORS.dimmed }} />
                    <p className="text-xs" style={{ color: COLORS.dimmed }}>No ad campaigns yet</p>
                    <p className="text-[10px] mt-1" style={{ color: COLORS.muted }}>Click &quot;New Campaign&quot; to create one</p>
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => {
                  const statusColor = STATUS_COLORS[c.status] || COLORS.muted;
                  const adTypeColor = ADTYPE_COLORS[c.adType] || COLORS.muted;
                  const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : '0.00';

                  return (
                    <tr
                      key={c.id}
                      className="border-b transition-colors hover:bg-white/[0.02]"
                      style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.04))' }}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-xs font-medium" style={{ color: COLORS.text }}>{c.name || 'Unnamed'}</p>
                          <p className="text-[9px]" style={{ color: COLORS.dimmed }}>{c.advertiser || 'No advertiser'}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider"
                          style={{
                            background: `${adTypeColor}15`,
                            color: adTypeColor,
                            border: `1px solid ${adTypeColor}30`,
                          }}
                        >
                          {c.adType}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[10px]" style={{ color: COLORS.muted }}>
                          {c.placement.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider"
                          style={{
                            background: `${statusColor}15`,
                            color: statusColor,
                            border: `1px solid ${statusColor}30`,
                          }}
                        >
                          {c.status === 'active' && <Play className="w-2.5 h-2.5" />}
                          {c.status === 'paused' && <Pause className="w-2.5 h-2.5" />}
                          {c.status === 'archived' && <Archive className="w-2.5 h-2.5" />}
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs font-medium" style={{ color: COLORS.text }}>{formatNumber(c.impressions)}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs font-medium" style={{ color: COLORS.text }}>{formatNumber(c.clicks)}</span>
                        <span className="text-[8px] ml-1" style={{ color: COLORS.muted }}>({ctr}%)</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs font-medium" style={{ color: COLORS.green }}>${c.revenue.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {c.status !== 'archived' && (
                            <button
                              onClick={() => handleToggleStatus(c)}
                              className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                              title={c.status === 'active' ? 'Pause' : 'Activate'}
                            >
                              {c.status === 'active' ? (
                                <ToggleRight className="w-3.5 h-3.5" style={{ color: COLORS.green }} />
                              ) : (
                                <ToggleLeft className="w-3.5 h-3.5" style={{ color: COLORS.amber }} />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => openEdit(c)}
                            className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                            title="Edit Campaign"
                          >
                            <Pencil className="w-3.5 h-3.5" style={{ color: COLORS.purple }} />
                          </button>
                          {c.status !== 'archived' && (
                            <button
                              onClick={() => handleArchive(c)}
                              className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                              title="Archive"
                            >
                              <Archive className="w-3.5 h-3.5" style={{ color: COLORS.muted }} />
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteCampaign(c)}
                            className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" style={{ color: COLORS.red }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Create Campaign Dialog ── */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent
          className="sm:max-w-lg"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>New Ad Campaign</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>Create a new advertising campaign</DialogDescription>
          </DialogHeader>
          {campaignFormFields}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setShowCreate(false)} className="text-xs" style={{ color: COLORS.muted }}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving}
              className="text-xs font-medium"
              style={{ background: COLORS.green, color: '#0c0e14' }}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 mr-1.5" />}
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Campaign Dialog ── */}
      <Dialog open={!!editCampaign} onOpenChange={(open) => { if (!open) setEditCampaign(null); }}>
        <DialogContent
          className="sm:max-w-lg"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>Edit Campaign</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Update &quot;{editCampaign?.name}&quot;
            </DialogDescription>
          </DialogHeader>
          {campaignFormFields}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setEditCampaign(null)} className="text-xs" style={{ color: COLORS.muted }}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={saving}
              className="text-xs font-medium"
              style={{ background: COLORS.green, color: '#0c0e14' }}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Campaign Confirmation ── */}
      <AlertDialog open={!!deleteCampaign} onOpenChange={(open) => { if (!open) setDeleteCampaign(null); }}>
        <AlertDialogContent
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: COLORS.text }}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" style={{ color: COLORS.red }} />
                Delete Campaign
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: COLORS.muted }}>
              Are you sure you want to delete <strong style={{ color: COLORS.text }}>{deleteCampaign?.name}</strong>?
              This will also remove all impression and click data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ color: COLORS.muted, borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              style={{ background: COLORS.red, color: '#fff' }}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   3D MODELS TAB
   ══════════════════════════════════════════════════════════════════════════════ */

interface CustomModel {
  id: string;
  name: string;
  description: string;
  category: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  thumbnailUrl: string;
  color: string;
  tags: string;
  isPublic: boolean;
  downloadCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface BuiltInModel {
  id: string;
  name: string;
  fjId: string;
  category: string;
  emoji: string;
  objFile: string;
  mirrored: boolean;
}

const BUILTIN_CATEGORIES = [
  { value: 'skeletal', label: 'Skeletal', emoji: '🦴', color: '#f5f0e0' },
  { value: 'muscular', label: 'Muscular', emoji: '💪', color: '#c0392b' },
  { value: 'cardiovascular', label: 'Cardiovascular', emoji: '🩸', color: '#e74c3c' },
  { value: 'nervous', label: 'Nervous', emoji: '🧠', color: '#f1c40f' },
  { value: 'digestive', label: 'Digestive', emoji: '🫁', color: '#d4956a' },
  { value: 'respiratory', label: 'Respiratory', emoji: '🌬️', color: '#f0a0a0' },
  { value: 'urinary', label: 'Urinary', emoji: '💧', color: '#b05050' },
  { value: 'reproductive', label: 'Reproductive', emoji: '🧬', color: '#ec4899' },
  { value: 'endocrine', label: 'Endocrine', emoji: '🦋', color: '#a855f7' },
  { value: 'lymphatic', label: 'Lymphatic', emoji: '🛡️', color: '#06b6d4' },
  { value: 'integumentary', label: 'Integumentary', emoji: '🧍', color: '#e8b89d' },
];

const MODEL_CATEGORIES = [
  { value: 'custom', label: 'Custom', color: COLORS.cyan },
  { value: 'skeletal', label: 'Skeletal', color: '#f5f0e0' },
  { value: 'muscular', label: 'Muscular', color: '#c0392b' },
  { value: 'cardiovascular', label: 'Cardiovascular', color: '#e74c3c' },
  { value: 'nervous', label: 'Nervous', color: '#f1c40f' },
  { value: 'digestive', label: 'Digestive', color: '#d4956a' },
  { value: 'respiratory', label: 'Respiratory', color: '#f0a0a0' },
  { value: 'urinary', label: 'Urinary', color: '#b05050' },
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ModelsTab() {
  // ── Tab toggle: built-in vs custom ──
  const [modelTab, setModelTab] = useState<'builtin' | 'custom'>('builtin');

  // ── Custom models state ──
  const [models, setModels] = useState<CustomModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [editModel, setEditModel] = useState<CustomModel | null>(null);
  const [deleteModel, setDeleteModel] = useState<CustomModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // ── Built-in models state ──
  const [builtInModels, setBuiltInModels] = useState<BuiltInModel[]>([]);
  const [builtInLoading, setBuiltInLoading] = useState(true);
  const [builtInSearch, setBuiltInSearch] = useState('');
  const [builtInCategoryFilter, setBuiltInCategoryFilter] = useState('all');
  const [builtInTotal, setBuiltInTotal] = useState(0);
  const [builtInOffset, setBuiltInOffset] = useState(0);
  const [builtInLimit] = useState(60);
  const [previewModel, setPreviewModel] = useState<BuiltInModel | null>(null);
  const [editingBuiltIn, setEditingBuiltIn] = useState<BuiltInModel | null>(null);
  const [editBuiltInName, setEditBuiltInName] = useState('');
  const [editBuiltInCategory, setEditBuiltInCategory] = useState('');
  const [editBuiltInTags, setEditBuiltInTags] = useState('');
  const [editBuiltInSaving, setEditBuiltInSaving] = useState(false);

  // Upload form state
  const [uploadName, setUploadName] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('custom');
  const [uploadColor, setUploadColor] = useState('#c0c0c0');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('custom');
  const [editColor, setEditColor] = useState('#c0c0c0');
  const [editTags, setEditTags] = useState('');
  const [editIsPublic, setEditIsPublic] = useState(true);

  // ── Fetch built-in models (debounced search) ──
  const builtInSearchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchBuiltInModels = useCallback(async () => {
    setBuiltInLoading(true);
    try {
      const params = new URLSearchParams({
        action: 'catalog',
        limit: builtInLimit.toString(),
        offset: builtInOffset.toString(),
      });
      if (builtInCategoryFilter !== 'all') params.set('category', builtInCategoryFilter);
      if (builtInSearch.trim()) params.set('search', builtInSearch.trim());

      const res = await fetch(`/api/anatomy-3d?${params}`);
      if (res.ok) {
        const data = await res.json();
        setBuiltInModels(data.models || []);
        setBuiltInTotal(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch built-in models:', err);
    } finally {
      setBuiltInLoading(false);
    }
  }, [builtInLimit, builtInOffset, builtInCategoryFilter, builtInSearch]);

  useEffect(() => {
    if (modelTab === 'builtin') {
      fetchBuiltInModels();
    }
  }, [modelTab, fetchBuiltInModels]);

  const fetchModels = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/models');
      if (res.ok) {
        const data = await res.json();
        setModels(data.models || []);
      }
    } catch (err) {
      console.error('Failed to fetch models:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (modelTab === 'custom') {
      fetchModels();
    }
  }, [fetchModels, modelTab]);

  const handleUpload = async () => {
    if (!uploadFile) {
      toast.error('Please select a file to upload');
      return;
    }
    if (!uploadName.trim()) {
      toast.error('Model name is required');
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', uploadName);
      formData.append('description', uploadDescription);
      formData.append('category', uploadCategory);
      formData.append('color', uploadColor);
      formData.append('tags', JSON.stringify(uploadTags.split(',').map(t => t.trim()).filter(Boolean)));
      formData.append('file', uploadFile);

      const res = await fetch('/api/admin/models', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to upload model');
      }

      toast.success(`Model "${uploadName}" uploaded`);
      setShowUpload(false);
      resetUploadForm();
      fetchModels();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to upload model');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const resetUploadForm = () => {
    setUploadName('');
    setUploadDescription('');
    setUploadCategory('custom');
    setUploadColor('#c0c0c0');
    setUploadTags('');
    setUploadFile(null);
  };

  const openEdit = (model: CustomModel) => {
    setEditModel(model);
    setEditName(model.name);
    setEditDescription(model.description);
    setEditCategory(model.category);
    setEditColor(model.color);
    try {
      const parsed = JSON.parse(model.tags);
      setEditTags(Array.isArray(parsed) ? parsed.join(', ') : '');
    } catch {
      setEditTags('');
    }
    setEditIsPublic(model.isPublic);
  };

  const handleUpdate = async () => {
    if (!editModel) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/models/${editModel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          category: editCategory,
          color: editColor,
          tags: JSON.stringify(editTags.split(',').map(t => t.trim()).filter(Boolean)),
          isPublic: editIsPublic,
        }),
      });
      if (!res.ok) throw new Error('Failed to update model');

      toast.success(`Model "${editName}" updated`);
      setEditModel(null);
      fetchModels();
    } catch (err) {
      toast.error('Failed to update model');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModel) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/models/${deleteModel.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete model');

      toast.success(`Model "${deleteModel.name}" deleted`);
      setDeleteModel(null);
      fetchModels();
    } catch (err) {
      toast.error('Failed to delete model');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Filter models
  const filteredModels = models.filter(m => {
    const matchesSearch = !searchQuery.trim() ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalModels = models.length;
  const totalSize = models.reduce((s, m) => s + m.fileSize, 0);
  const publicModels = models.filter(m => m.isPublic).length;
  const categoryCounts: Record<string, number> = {};
  models.forEach(m => { categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1; });

  // Built-in pagination
  const builtInTotalPages = Math.ceil(builtInTotal / builtInLimit);

  if (modelTab === 'custom' && loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: COLORS.text }}>3D Model Manager</h3>
          <p className="text-[10px]" style={{ color: COLORS.muted }}>Browse built-in and manage custom 3D anatomy models</p>
        </div>
        {modelTab === 'custom' && (
          <Button
            onClick={() => { resetUploadForm(); setShowUpload(true); }}
            className="text-xs font-medium h-8"
            style={{ background: COLORS.green, color: '#0c0e14' }}
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            Upload Model
          </Button>
        )}
      </div>

      {/* Tab Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}` }}>
        <button
          onClick={() => setModelTab('builtin')}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: modelTab === 'builtin' ? `${COLORS.cyan}15` : 'transparent',
            border: `1px solid ${modelTab === 'builtin' ? `${COLORS.cyan}30` : 'transparent'}`,
            color: modelTab === 'builtin' ? COLORS.cyan : COLORS.muted,
          }}
        >
          <Box className="w-3.5 h-3.5" />
          Built-in Models
          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.cyan}15`, color: COLORS.cyan }}>
            {builtInTotal > 0 ? formatNumber(builtInTotal) : '2,234'}
          </span>
        </button>
        <button
          onClick={() => setModelTab('custom')}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: modelTab === 'custom' ? `${COLORS.purple}15` : 'transparent',
            border: `1px solid ${modelTab === 'custom' ? `${COLORS.purple}30` : 'transparent'}`,
            color: modelTab === 'custom' ? COLORS.purple : COLORS.muted,
          }}
        >
          <Upload className="w-3.5 h-3.5" />
          Custom Models
          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${COLORS.purple}15`, color: COLORS.purple }}>
            {totalModels}
          </span>
        </button>
      </div>

      {/* ═══ Built-in Models View ═══ */}
      {modelTab === 'builtin' && (
        <div className="space-y-4">
          {/* Built-in Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.muted }} />
              <input
                type="text"
                placeholder="Search built-in models..."
                value={builtInSearch}
                onChange={(e) => {
                  setBuiltInSearch(e.target.value);
                  setBuiltInOffset(0);
                  // Debounce search
                  if (builtInSearchTimeoutRef.current) clearTimeout(builtInSearchTimeoutRef.current);
                  builtInSearchTimeoutRef.current = setTimeout(() => {
                    fetchBuiltInModels();
                  }, 400);
                }}
                className="w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: COLORS.cardBorder,
                  color: COLORS.text,
                }}
              />
            </div>
            <Select value={builtInCategoryFilter} onValueChange={(v) => { setBuiltInCategoryFilter(v); setBuiltInOffset(0); }}>
              <SelectTrigger
                className="w-full sm:w-[180px] text-xs"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: COLORS.cardBorder,
                  color: COLORS.text,
                }}
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
                <SelectItem value="all" style={{ color: COLORS.text }}>All Categories</SelectItem>
                {BUILTIN_CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value} style={{ color: COLORS.text }}>
                    {cat.emoji} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-[10px] ml-auto" style={{ color: COLORS.muted }}>
              {builtInTotal} model{builtInTotal !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Built-in Models Grid */}
          {builtInLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl p-5 border" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
                  <Skeleton className="h-5 w-24 mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <Skeleton className="h-4 w-full mb-2" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  <Skeleton className="h-4 w-16" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              ))}
            </div>
          ) : builtInModels.length === 0 ? (
            <div className="rounded-2xl border p-12 text-center" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
              <Box className="w-8 h-8 mx-auto mb-2" style={{ color: COLORS.dimmed }} />
              <p className="text-xs mb-1" style={{ color: COLORS.dimmed }}>No built-in models found</p>
              <p className="text-[10px]" style={{ color: COLORS.muted }}>Try adjusting your search or category filter</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: `${COLORS.dimmed} transparent` }}>
                {builtInModels.map((model, i) => {
                  const catMeta = BUILTIN_CATEGORIES.find(c => c.value === model.category);
                  const catColor = catMeta?.color || COLORS.cyan;
                  return (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      className="rounded-2xl p-4 border transition-all hover:border-white/[0.1]"
                      style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}
                    >
                      {/* Header row */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: `${catColor}15`, color: catColor }}
                          >
                            <Box className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold truncate" style={{ color: COLORS.text }}>{model.name}</p>
                          </div>
                        </div>
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider flex-shrink-0"
                          style={{
                            background: `${catColor}15`,
                            color: catColor,
                            border: `1px solid ${catColor}30`,
                          }}
                        >
                          OBJ
                        </span>
                      </div>

                      {/* Info row */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[9px]" style={{ color: COLORS.dimmed }}>
                          {catMeta?.emoji} {catMeta?.label || model.category}
                        </span>
                        <span className="text-[9px] font-mono" style={{ color: COLORS.dimmed }}>
                          {model.id}
                        </span>
                        {model.mirrored && (
                          <span className="text-[7px] px-1 py-0.5 rounded" style={{ background: `${COLORS.amber}15`, color: COLORS.amber, border: `1px solid ${COLORS.amber}20` }}>
                            Mirror
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewModel(model)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all hover:brightness-110"
                          style={{
                            background: `${COLORS.cyan}10`,
                            border: `1px solid ${COLORS.cyan}20`,
                            color: COLORS.cyan,
                          }}
                        >
                          <Eye className="w-2.5 h-2.5" />
                          3D View
                        </button>
                        <button
                          onClick={() => {
                            setEditingBuiltIn(model);
                            setEditBuiltInName(model.name);
                            setEditBuiltInCategory(model.category);
                            setEditBuiltInTags('');
                          }}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all hover:brightness-110"
                          style={{
                            background: `${COLORS.amber}10`,
                            border: `1px solid ${COLORS.amber}20`,
                            color: COLORS.amber,
                          }}
                        >
                          <Pencil className="w-2.5 h-2.5" />
                          Edit
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination */}
              {builtInTotalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setBuiltInOffset(Math.max(0, builtInOffset - builtInLimit))}
                    disabled={builtInOffset === 0}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-30"
                    style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text }}
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Prev
                  </button>
                  <span className="text-[10px] px-2" style={{ color: COLORS.muted }}>
                    Page {Math.floor(builtInOffset / builtInLimit) + 1} of {builtInTotalPages}
                  </span>
                  <button
                    onClick={() => setBuiltInOffset(builtInOffset + builtInLimit)}
                    disabled={builtInOffset + builtInLimit >= builtInTotal}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-30"
                    style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text }}
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ═══ Custom Models View ═══ */}
      {modelTab === 'custom' && (
      <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Models', value: totalModels, icon: <Box className="w-4 h-4" />, color: COLORS.cyan, bgColor: `${COLORS.cyan}15` },
          { label: 'Total Size', value: formatFileSize(totalSize), icon: <File className="w-4 h-4" />, color: COLORS.purple, bgColor: `${COLORS.purple}15` },
          { label: 'Public', value: publicModels, icon: <Eye className="w-4 h-4" />, color: COLORS.green, bgColor: `${COLORS.green}15` },
          { label: 'Categories', value: Object.keys(categoryCounts).length, icon: <Filter className="w-4 h-4" />, color: COLORS.amber, bgColor: `${COLORS.amber}15` },
        ].map((stat, i) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} bgColor={stat.bgColor} index={i} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.muted }} />
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: COLORS.cardBorder,
              color: COLORS.text,
            }}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className="w-full sm:w-[160px] text-xs"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: COLORS.cardBorder,
              color: COLORS.text,
            }}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
            <SelectItem value="all" style={{ color: COLORS.text }}>All Categories</SelectItem>
            {MODEL_CATEGORIES.map(cat => (
              <SelectItem key={cat.value} value={cat.value} style={{ color: COLORS.text }}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-[10px] ml-auto" style={{ color: COLORS.muted }}>
          {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Models List */}
      {filteredModels.length === 0 ? (
        <div className="rounded-2xl border p-12 text-center" style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}>
          <Box className="w-8 h-8 mx-auto mb-2" style={{ color: COLORS.dimmed }} />
          <p className="text-xs mb-1" style={{ color: COLORS.dimmed }}>
            {models.length === 0 ? 'No models uploaded yet' : 'No models match your search'}
          </p>
          <p className="text-[10px]" style={{ color: COLORS.muted }}>
            {models.length === 0 ? 'Click "Upload Model" to add your first 3D model' : 'Try adjusting your search or category filter'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map((model, i) => {
            const catMeta = MODEL_CATEGORIES.find(c => c.value === model.category);
            const catColor = catMeta?.color || COLORS.cyan;
            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-2xl p-5 border transition-all hover:border-white/[0.1]"
                style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center"
                      style={{ background: `${catColor}15`, color: catColor }}
                    >
                      <Box className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: COLORS.text }}>{model.name}</p>
                      <p className="text-[9px] font-mono" style={{ color: COLORS.dimmed }}>{model.fileName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                      style={{
                        background: `${catColor}15`,
                        color: catColor,
                        border: `1px solid ${catColor}30`,
                      }}
                    >
                      {model.fileType}
                    </span>
                    {!model.isPublic && (
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                        style={{
                          background: `${COLORS.amber}15`,
                          color: COLORS.amber,
                          border: `1px solid ${COLORS.amber}30`,
                        }}
                      >
                        Private
                      </span>
                    )}
                  </div>
                </div>

                {/* Info row */}
                <div className="mb-3 space-y-1">
                  {model.description && (
                    <p className="text-[10px] truncate" style={{ color: COLORS.muted }}>{model.description}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-[9px]" style={{ color: COLORS.dimmed }}>
                      {catMeta?.label || model.category}
                    </span>
                    <span className="text-[9px]" style={{ color: COLORS.dimmed }}>
                      {formatFileSize(model.fileSize)}
                    </span>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full border"
                        style={{ background: model.color, borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
                      />
                    </div>
                  </div>
                  {(() => {
                    try {
                      const parsedTags = JSON.parse(model.tags);
                      if (Array.isArray(parsedTags) && parsedTags.length > 0) {
                        return (
                          <div className="flex items-center gap-1 flex-wrap mt-1">
                            {parsedTags.slice(0, 3).map((tag: string) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 rounded text-[7px] font-medium"
                                style={{ background: `${COLORS.cyan}10`, color: COLORS.cyan, border: `1px solid ${COLORS.cyan}20` }}
                              >
                                {tag}
                              </span>
                            ))}
                            {parsedTags.length > 3 && (
                              <span className="text-[7px]" style={{ color: COLORS.dimmed }}>+{parsedTags.length - 3}</span>
                            )}
                          </div>
                        );
                      }
                    } catch { /* ignore */ }
                    return null;
                  })()}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-[8px]" style={{ color: COLORS.dimmed }}>
                    {formatDate(model.createdAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(model)}
                      className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                      title="Edit Model"
                    >
                      <Pencil className="w-3 h-3" style={{ color: COLORS.purple }} />
                    </button>
                    <button
                      onClick={() => setDeleteModel(model)}
                      className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                      title="Delete Model"
                    >
                      <Trash2 className="w-3 h-3" style={{ color: COLORS.red }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      </>
      )}

      {/* ── Preview Built-in Model Dialog (Full 3D Viewer) ── */}
      <Dialog open={!!previewModel} onOpenChange={(open) => { if (!open) setPreviewModel(null); }}>
        <DialogContent
          className="sm:max-w-3xl max-h-[90vh]"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle style={{ color: COLORS.text }}>Preview: {previewModel?.name}</DialogTitle>
                <DialogDescription style={{ color: COLORS.muted }}>
                  Built-in BodyParts3D model — {previewModel?.category}
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${BUILTIN_CATEGORIES.find(c => c.value === previewModel?.category)?.color || COLORS.cyan}15`,
                    color: BUILTIN_CATEGORIES.find(c => c.value === previewModel?.category)?.color || COLORS.cyan,
                    border: `1px solid ${BUILTIN_CATEGORIES.find(c => c.value === previewModel?.category)?.color || COLORS.cyan}30`,
                  }}
                >
                  {BUILTIN_CATEGORIES.find(c => c.value === previewModel?.category)?.emoji} {BUILTIN_CATEGORIES.find(c => c.value === previewModel?.category)?.label || previewModel?.category}
                </span>
                {previewModel?.mirrored && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: `${COLORS.amber}15`, color: COLORS.amber, border: `1px solid ${COLORS.amber}20` }}>
                    Mirrored
                  </span>
                )}
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-2">
            {previewModel && (
              <div className="w-full h-[450px] rounded-lg overflow-hidden border" style={{ borderColor: COLORS.cardBorder }}>
                <OBJModelViewer
                  modelId={previewModel.id}
                  fjId={previewModel.fjId}
                  category={previewModel.category}
                  modelName={previewModel.name}
                  showHeader={false}
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono" style={{ color: COLORS.dimmed }}>
                FJ ID: {previewModel?.fjId}
              </span>
              <span className="text-[9px]" style={{ color: COLORS.dimmed }}>
                ID: {previewModel?.id}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setPreviewModel(null)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Built-in Model Dialog ── */}
      <Dialog open={!!editingBuiltIn} onOpenChange={(open) => { if (!open) setEditingBuiltIn(null); }}>
        <DialogContent
          className="sm:max-w-lg"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>Edit Built-in Model</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Update properties for {editingBuiltIn?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Mini 3D preview */}
            {editingBuiltIn && (
              <div className="w-full h-40 rounded-lg overflow-hidden border" style={{ borderColor: COLORS.cardBorder }}>
                <OBJModelViewer
                  modelId={editingBuiltIn.id}
                  fjId={editingBuiltIn.fjId}
                  category={editingBuiltIn.category}
                  modelName={editingBuiltIn.name}
                  showHeader={false}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Model Name</label>
              <Input
                value={editBuiltInName}
                onChange={(e) => setEditBuiltInName(e.target.value)}
                className="text-sm"
                style={{ background: COLORS.card, borderColor: COLORS.cardBorder, color: COLORS.text }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Category</label>
              <Select value={editBuiltInCategory} onValueChange={setEditBuiltInCategory}>
                <SelectTrigger style={{ background: COLORS.card, borderColor: COLORS.cardBorder, color: COLORS.text }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: COLORS.cardBorder }}>
                  {BUILTIN_CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.emoji} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Tags (comma separated)</label>
              <Input
                value={editBuiltInTags}
                onChange={(e) => setEditBuiltInTags(e.target.value)}
                placeholder="e.g., bone, upper limb, anatomy"
                className="text-sm"
                style={{ background: COLORS.card, borderColor: COLORS.cardBorder, color: COLORS.text }}
              />
            </div>
            <div className="flex items-center gap-3 text-[9px]" style={{ color: COLORS.dimmed }}>
              <span>FJ ID: {editingBuiltIn?.fjId}</span>
              <span>•</span>
              <span>Internal ID: {editingBuiltIn?.id}</span>
              {editingBuiltIn?.mirrored && (
                <>
                  <span>•</span>
                  <span style={{ color: COLORS.amber }}>Mirrored</span>
                </>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setEditingBuiltIn(null)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!editingBuiltIn) return;
                setEditBuiltInSaving(true);
                try {
                  const res = await fetch('/api/admin/models', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      id: editingBuiltIn.id,
                      fjId: editingBuiltIn.fjId,
                      name: editBuiltInName,
                      category: editBuiltInCategory,
                      tags: editBuiltInTags,
                      isBuiltIn: true,
                    }),
                  });
                  if (res.ok) {
                    toast.success('Model updated successfully');
                    // Update local state
                    setBuiltInModels(prev => prev.map(m =>
                      m.id === editingBuiltIn.id
                        ? { ...m, name: editBuiltInName, category: editBuiltInCategory }
                        : m
                    ));
                    setEditingBuiltIn(null);
                  } else {
                    toast.error('Failed to update model');
                  }
                } catch {
                  toast.error('Failed to update model');
                }
                setEditBuiltInSaving(false);
              }}
              disabled={editBuiltInSaving}
              className="text-xs"
              style={{ background: COLORS.cyan, color: '#000' }}
            >
              {editBuiltInSaving ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Save className="w-3 h-3 mr-1" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Upload Model Dialog ── */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>Upload 3D Model</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Upload an OBJ, STL, or GLB file for the anatomy viewer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Model Name *</label>
              <Input
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                className="text-xs"
                placeholder="e.g. Custom Femur Model"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Description</label>
              <textarea
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-lg outline-none border resize-y"
                placeholder="Brief description of the model..."
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Category</label>
                <Select value={uploadCategory} onValueChange={setUploadCategory}>
                  <SelectTrigger
                    className="w-full text-xs"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                      color: COLORS.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
                    {MODEL_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value} style={{ color: COLORS.text }}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Display Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={uploadColor}
                    onChange={(e) => setUploadColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border cursor-pointer flex-shrink-0"
                    style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', background: 'transparent' }}
                  />
                  <Input
                    value={uploadColor}
                    onChange={(e) => setUploadColor(e.target.value)}
                    className="text-xs font-mono flex-1"
                    placeholder="#c0c0c0"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                      color: COLORS.text,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Tags (comma separated)</label>
              <Input
                value={uploadTags}
                onChange={(e) => setUploadTags(e.target.value)}
                className="text-xs"
                placeholder="anatomy, femur, bone"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Model File *</label>
              <div
                className="border-2 border-dashed rounded-lg p-4 text-center transition-colors"
                style={{
                  borderColor: uploadFile ? `${COLORS.green}40` : 'rgba(255,255,255,0.1)',
                  background: uploadFile ? `${COLORS.green}05` : 'rgba(255,255,255,0.02)',
                }}
              >
                <input
                  type="file"
                  accept=".obj,.stl,.glb"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="model-file-input"
                />
                <label htmlFor="model-file-input" className="cursor-pointer">
                  {uploadFile ? (
                    <div>
                      <File className="w-6 h-6 mx-auto mb-1" style={{ color: COLORS.green }} />
                      <p className="text-xs font-medium" style={{ color: COLORS.green }}>{uploadFile.name}</p>
                      <p className="text-[9px]" style={{ color: COLORS.muted }}>{formatFileSize(uploadFile.size)}</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-6 h-6 mx-auto mb-1" style={{ color: COLORS.dimmed }} />
                      <p className="text-xs" style={{ color: COLORS.dimmed }}>Click to select file</p>
                      <p className="text-[9px]" style={{ color: COLORS.muted }}>OBJ, STL, or GLB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setShowUpload(false)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={saving}
              className="text-xs font-medium"
              style={{ background: COLORS.green, color: '#0c0e14' }}
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Model Dialog ── */}
      <Dialog open={!!editModel} onOpenChange={(open) => { if (!open) setEditModel(null); }}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>Edit Model</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Update details for &quot;{editModel?.name}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Name</label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-xs"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-lg outline-none border resize-y"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Category</label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger
                    className="w-full text-xs"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                      color: COLORS.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
                    {MODEL_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value} style={{ color: COLORS.text }}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border cursor-pointer flex-shrink-0"
                    style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', background: 'transparent' }}
                  />
                  <Input
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className="text-xs font-mono flex-1"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                      color: COLORS.text,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>Tags (comma separated)</label>
              <Input
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                className="text-xs"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                  color: COLORS.text,
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditIsPublic(!editIsPublic)}
                className="flex items-center gap-2"
              >
                {editIsPublic ? (
                  <ToggleRight className="w-5 h-5" style={{ color: COLORS.green }} />
                ) : (
                  <ToggleLeft className="w-5 h-5" style={{ color: COLORS.muted }} />
                )}
                <span className="text-xs" style={{ color: editIsPublic ? COLORS.green : COLORS.muted }}>
                  {editIsPublic ? 'Public' : 'Private'}
                </span>
              </button>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setEditModel(null)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={saving}
              className="text-xs font-medium"
              style={{ background: COLORS.green, color: '#0c0e14' }}
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Model Confirmation ── */}
      <AlertDialog open={!!deleteModel} onOpenChange={(open) => { if (!open) setDeleteModel(null); }}>
        <AlertDialogContent
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: COLORS.text }}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" style={{ color: COLORS.red }} />
                Delete Model
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: COLORS.muted }}>
              Are you sure you want to delete <strong style={{ color: COLORS.text }}>{deleteModel?.name}</strong>?
              The file will be permanently removed from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ color: COLORS.muted, borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              style={{ background: COLORS.red, color: '#fff' }}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN ADMIN TAB COMPONENT
   ══════════════════════════════════════════════════════════════════════════════ */

export default function AdminTab() {
  /* ── Tab state ── */
  const [activeTab, setActiveTab] = useState<AdminTabKey>('users');

  /* ── User management state ── */
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [usersData, setUsersData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & pagination
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 20;

  // Edit dialog
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [editRole, setEditRole] = useState('');
  const [editTier, setEditTier] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete confirmation
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  // View profile dialog
  const [viewUser, setViewUser] = useState<AdminUser | null>(null);

  // ── Moderation state (suspend/ban/reset-password) ──
  const [moderateUser, setModerateUser] = useState<AdminUser | null>(null);
  const [moderateAction, setModerateAction] = useState<'suspend' | 'ban' | 'activate'>('suspend');
  const [moderateReason, setModerateReason] = useState('');
  const [moderateDuration, setModerateDuration] = useState('24'); // hours
  const [moderating, setModerating] = useState(false);

  // ── Reset password state ──
  const [resetUser, setResetUser] = useState<AdminUser | null>(null);
  const [resetCustomPassword, setResetCustomPassword] = useState('');
  const [resetUseCustom, setResetUseCustom] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetResult, setResetResult] = useState<string | null>(null);

  // ── Status filter ──
  const [statusFilter, setStatusFilter] = useState('all');

  // Debounce search
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchInput, setSearchInput] = useState('');

  /* ── Data Fetching ── */
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
    }
  }, []);

  const fetchUsers = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        role: roleFilter === 'all' ? '' : roleFilter,
        tier: tierFilter === 'all' ? '' : tierFilter,
        status: statusFilter === 'all' ? '' : statusFilter,
      });
      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) {
        const data = await res.json();
        setUsersData(data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, search, roleFilter, tierFilter, statusFilter]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Re-fetch stats on visibility
  const lastFetchRef = useRef<number>(0);
  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === 'admin' && Date.now() - lastFetchRef.current > 30000) {
        fetchStats();
        fetchUsers();
      }
    };
    window.addEventListener('medq-tab-visible', handler as EventListener);
    return () => window.removeEventListener('medq-tab-visible', handler as EventListener);
  }, [fetchStats, fetchUsers]);

  useEffect(() => {
    lastFetchRef.current = Date.now();
  }, [fetchStats, fetchUsers]);

  /* ── Handlers ── */
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 300);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setPage(1);
  };

  const handleTierFilterChange = (value: string) => {
    setTierFilter(value);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchStats(), fetchUsers(true)]);
  };

  const handleEditUser = (user: AdminUser) => {
    setEditUser(user);
    setEditRole(user.role);
    setEditTier(user.tier);
  };

  const handleSaveEdit = async () => {
    if (!editUser) return;
    setSaving(true);
    try {
      // Update role
      if (editRole !== editUser.role) {
        const res = await fetch(`/api/admin/users/${editUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: editRole }),
        });
        if (!res.ok) throw new Error('Failed to update role');
      }

      // Update tier
      if (editTier !== editUser.tier) {
        const res = await fetch(`/api/admin/users/${editUser.id}/subscription`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: editTier }),
        });
        if (!res.ok) throw new Error('Failed to update subscription');
      }

      toast.success('User updated successfully');
      setEditUser(null);
      fetchUsers();
      fetchStats();
    } catch (err) {
      toast.error('Failed to update user');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUser) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteUser.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');

      toast.success('User deleted successfully');
      setDeleteUser(null);
      fetchUsers();
      fetchStats();
    } catch (err) {
      toast.error('Failed to delete user');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  /* ── Moderation handlers (suspend / ban / activate) ── */
  const handleOpenModerate = (user: AdminUser, action: 'suspend' | 'ban' | 'activate') => {
    setModerateUser(user);
    setModerateAction(action);
    setModerateReason('');
    setModerateDuration('24');
  };

  const handleConfirmModerate = async () => {
    if (!moderateUser) return;
    setModerating(true);
    try {
      const body: any = { status: moderateAction === 'activate' ? 'active' : moderateAction };
      if (moderateAction !== 'activate') {
        if (moderateReason.trim()) body.reason = moderateReason.trim();
        if (moderateAction === 'suspend') {
          const hrs = parseInt(moderateDuration, 10);
          if (!isNaN(hrs) && hrs > 0) body.durationHours = hrs;
        }
      }
      const res = await fetch(`/api/admin/users/${moderateUser.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update user status');
      }
      toast.success(
        moderateAction === 'activate'
          ? 'User reactivated'
          : moderateAction === 'ban'
            ? 'User banned'
            : 'User suspended'
      );
      setModerateUser(null);
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update user status');
    } finally {
      setModerating(false);
    }
  };

  /* ── Reset password handler ── */
  const handleOpenReset = (user: AdminUser) => {
    setResetUser(user);
    setResetCustomPassword('');
    setResetUseCustom(false);
    setResetResult(null);
  };

  const handleConfirmReset = async () => {
    if (!resetUser) return;
    setResetting(true);
    setResetResult(null);
    try {
      const body: any = {};
      if (resetUseCustom) {
        if (resetCustomPassword.length < 8) {
          toast.error('Password must be at least 8 characters');
          setResetting(false);
          return;
        }
        body.newPassword = resetCustomPassword;
      }
      const res = await fetch(`/api/admin/users/${resetUser.id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to reset password');
      }
      const data = await res.json();
      setResetResult(data.temporaryPassword);
      toast.success('Password reset successfully');
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setResetting(false);
    }
  };

  /* ── Stat Cards Config ── */
  const statCards = stats
    ? [
        {
          label: 'Total Users',
          value: stats.totalUsers,
          icon: <Users className="w-5 h-5" />,
          color: COLORS.green,
          bgColor: `${COLORS.green}15`,
          trend: stats.usersTrend,
        },
        {
          label: 'Premium Users',
          value: stats.premiumUsers,
          icon: <Crown className="w-5 h-5" />,
          color: COLORS.purple,
          bgColor: `${COLORS.purple}15`,
        },
        {
          label: 'Pro Users',
          value: stats.proUsers,
          icon: <Shield className="w-5 h-5" />,
          color: COLORS.amber,
          bgColor: `${COLORS.amber}15`,
        },
        {
          label: 'Total Revenue',
          value: `${formatNumber(stats.totalRevenue)} cr`,
          icon: <CreditCard className="w-5 h-5" />,
          color: COLORS.blue,
          bgColor: `${COLORS.blue}15`,
          trend: stats.revenueTrend,
        },
        {
          label: 'Active Today',
          value: stats.activeToday,
          icon: <Activity className="w-5 h-5" />,
          color: COLORS.red,
          bgColor: `${COLORS.red}15`,
          trend: stats.activeTrend,
        },
        // ── Moderation cards (shown when there's something to action) ──
        ...(stats.suspendedCount && stats.suspendedCount > 0
          ? [{
              label: 'Suspended',
              value: stats.suspendedCount,
              icon: <Clock className="w-5 h-5" />,
              color: COLORS.amber,
              bgColor: `${COLORS.amber}15`,
            }]
          : []),
        ...(stats.bannedCount && stats.bannedCount > 0
          ? [{
              label: 'Banned',
              value: stats.bannedCount,
              icon: <Ban className="w-5 h-5" />,
              color: COLORS.red,
              bgColor: `${COLORS.red}15`,
            }]
          : []),
        ...(stats.pendingReportsCount && stats.pendingReportsCount > 0
          ? [{
              label: 'Pending Reports',
              value: stats.pendingReportsCount,
              icon: <Flag className="w-5 h-5" />,
              color: COLORS.purple,
              bgColor: `${COLORS.purple}15`,
            }]
          : []),
      ]
    : [];

  /* ── Loading State ── */
  if (loading) {
    return (
      <div className="space-y-6">
        <StatsSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  const users = usersData?.users || [];
  const totalPages = usersData?.totalPages || 1;
  const totalUsers = usersData?.total || 0;

  const tabs: { key: AdminTabKey; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      key: 'moderation',
      label: 'Moderation',
      icon: <Flag className="w-4 h-4" />,
      badge: stats?.pendingReportsCount,
    },
    {
      key: 'revenue',
      label: 'Revenue',
      icon: <DollarSign className="w-4 h-4" />,
    },
    { key: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
    { key: 'ads', label: 'Ads', icon: <Megaphone className="w-4 h-4" /> },
    { key: 'models', label: '3D Models', icon: <Box className="w-4 h-4" /> },
    { key: 'compliance', label: 'Compliance', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${COLORS.red}15` }}
          >
            <Shield className="w-5 h-5" style={{ color: COLORS.red }} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: COLORS.text }}>Admin Dashboard</h2>
            <p className="text-xs" style={{ color: COLORS.muted }}>Manage users, settings, and ads</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: COLORS.cardBorder,
            color: COLORS.muted,
          }}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="flex items-center gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}` }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all flex-1 justify-center whitespace-nowrap"
              style={{
                color: isActive ? '#0c0e14' : COLORS.muted,
                background: isActive ? COLORS.green : 'transparent',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span
                  className="ml-0.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold"
                  style={{
                    background: isActive ? 'rgba(0,0,0,0.2)' : `${COLORS.red}25`,
                    color: isActive ? '#0c0e14' : COLORS.red,
                  }}
                >
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {statCards.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  bgColor={stat.bgColor}
                  trend={stat.trend}
                  index={i}
                />
              ))}
            </div>

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="rounded-2xl border"
              style={{ background: COLORS.card, borderColor: COLORS.cardBorder }}
            >
              {/* Toolbar */}
              <div className="p-4 border-b" style={{ borderColor: COLORS.cardBorder }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {/* Search */}
                  <div className="relative flex-1 w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.muted }} />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchInput}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: COLORS.cardBorder,
                        color: COLORS.text,
                      }}
                    />
                  </div>

                  {/* Role Filter */}
                  <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                    <SelectTrigger
                      className="w-full sm:w-[140px] text-xs"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: COLORS.cardBorder,
                        color: COLORS.text,
                      }}
                    >
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
                    >
                      <SelectItem value="all" style={{ color: COLORS.text }}>All Roles</SelectItem>
                      <SelectItem value="student" style={{ color: COLORS.text }}>Student</SelectItem>
                      <SelectItem value="educator" style={{ color: COLORS.text }}>Educator</SelectItem>
                      <SelectItem value="admin" style={{ color: COLORS.text }}>Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Tier Filter */}
                  <Select value={tierFilter} onValueChange={handleTierFilterChange}>
                    <SelectTrigger
                      className="w-full sm:w-[140px] text-xs"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: COLORS.cardBorder,
                        color: COLORS.text,
                      }}
                    >
                      <SelectValue placeholder="Tier" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
                    >
                      <SelectItem value="all" style={{ color: COLORS.text }}>All Tiers</SelectItem>
                      <SelectItem value="free" style={{ color: COLORS.text }}>Free</SelectItem>
                      <SelectItem value="premium" style={{ color: COLORS.text }}>Premium</SelectItem>
                      <SelectItem value="pro" style={{ color: COLORS.text }}>Pro</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Status Filter */}
                  <Select
                    value={statusFilter}
                    onValueChange={(v) => { setStatusFilter(v); setPage(1); }}
                  >
                    <SelectTrigger
                      className="w-full sm:w-[140px] text-xs"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: COLORS.cardBorder,
                        color: COLORS.text,
                      }}
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
                    >
                      <SelectItem value="all" style={{ color: COLORS.text }}>All Statuses</SelectItem>
                      <SelectItem value="active" style={{ color: COLORS.text }}>Active</SelectItem>
                      <SelectItem value="suspended" style={{ color: COLORS.text }}>Suspended</SelectItem>
                      <SelectItem value="banned" style={{ color: COLORS.text }}>Banned</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Results count */}
                  <span className="text-[10px] ml-auto" style={{ color: COLORS.muted }}>
                    {totalUsers} user{totalUsers !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: COLORS.cardBorder }}>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>User</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Email</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Role</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Tier</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Status</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Credits</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Joined</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold" style={{ color: COLORS.muted }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center">
                          <Users className="w-8 h-8 mx-auto mb-2" style={{ color: COLORS.dimmed }} />
                          <p className="text-xs" style={{ color: COLORS.dimmed }}>
                            No users found. Try adjusting your search or filters.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => {
                        const initials = getInitials(user.name, user.email);
                        const roleColor = ROLE_COLORS[user.role] || COLORS.muted;
                        const tierColor = TIER_COLORS[user.tier] || COLORS.muted;
                        const userStatus = user.status || 'active';
                        const statusColor = USER_STATUS_COLORS[userStatus] || COLORS.muted;

                        return (
                          <tr
                            key={user.id}
                            className="border-b transition-colors hover:bg-white/[0.02]"
                            style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.04))' }}
                          >
                            {/* Avatar + Name */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                  style={{
                                    background: `${roleColor}20`,
                                    color: roleColor,
                                  }}
                                >
                                  {initials}
                                </div>
                                <span className="text-xs font-medium truncate max-w-[120px]" style={{ color: COLORS.text }}>
                                  {user.name || 'Unnamed'}
                                </span>
                              </div>
                            </td>

                            {/* Email */}
                            <td className="px-4 py-3">
                              <span className="text-xs truncate max-w-[160px] block" style={{ color: COLORS.muted }}>
                                {user.email || '—'}
                              </span>
                            </td>

                            {/* Role Badge */}
                            <td className="px-4 py-3">
                              <span
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                                style={{
                                  background: `${roleColor}15`,
                                  color: roleColor,
                                  border: `1px solid ${roleColor}30`,
                                }}
                              >
                                {user.role}
                              </span>
                            </td>

                            {/* Tier Badge */}
                            <td className="px-4 py-3">
                              <span
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                                style={{
                                  background: `${tierColor}15`,
                                  color: tierColor,
                                  border: `1px solid ${tierColor}30`,
                                }}
                              >
                                {user.tier}
                              </span>
                            </td>

                            {/* Status Badge */}
                            <td className="px-4 py-3">
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                                style={{
                                  background: `${statusColor}15`,
                                  color: statusColor,
                                  border: `1px solid ${statusColor}30`,
                                }}
                                title={user.suspendedReason || user.bannedReason || undefined}
                              >
                                {userStatus === 'suspended' && <Clock className="w-2.5 h-2.5" />}
                                {userStatus === 'banned' && <Ban className="w-2.5 h-2.5" />}
                                {userStatus}
                              </span>
                              {userStatus === 'suspended' && user.suspendedUntil && (
                                <p className="text-[9px] mt-1" style={{ color: COLORS.dimmed }}>
                                  until {formatDate(user.suspendedUntil)}
                                </p>
                              )}
                            </td>

                            {/* Credits */}
                            <td className="px-4 py-3">
                              <span className="text-xs font-medium" style={{ color: COLORS.text }}>
                                {formatNumber(user.credits)}
                              </span>
                            </td>

                            {/* Joined */}
                            <td className="px-4 py-3">
                              <span className="text-xs" style={{ color: COLORS.muted }}>
                                {formatDate(user.createdAt)}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setViewUser(user)}
                                  className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                                  title="View Profile"
                                >
                                  <Eye className="w-3.5 h-3.5" style={{ color: COLORS.blue }} />
                                </button>
                                <button
                                  onClick={() => handleEditUser(user)}
                                  className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                                  title="Edit User"
                                >
                                  <UserCog className="w-3.5 h-3.5" style={{ color: COLORS.purple }} />
                                </button>
                                {/* Moderation actions */}
                                {userStatus === 'active' ? (
                                  <>
                                    <button
                                      onClick={() => handleOpenModerate(user, 'suspend')}
                                      className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                                      title="Suspend User"
                                    >
                                      <Clock className="w-3.5 h-3.5" style={{ color: COLORS.amber }} />
                                    </button>
                                    <button
                                      onClick={() => handleOpenModerate(user, 'ban')}
                                      className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                                      title="Ban User"
                                    >
                                      <Ban className="w-3.5 h-3.5" style={{ color: COLORS.red }} />
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => handleOpenModerate(user, 'activate')}
                                    className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                                    title="Reactivate User"
                                  >
                                    <Unlock className="w-3.5 h-3.5" style={{ color: COLORS.green }} />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleOpenReset(user)}
                                  className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                                  title="Reset Password"
                                >
                                  <KeyRound className="w-3.5 h-3.5" style={{ color: COLORS.cyan }} />
                                </button>
                                <button
                                  onClick={() => setDeleteUser(user)}
                                  className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                                  title="Delete User"
                                >
                                  <Trash2 className="w-3.5 h-3.5" style={{ color: COLORS.red }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: COLORS.cardBorder }}>
                <span className="text-[10px]" style={{ color: COLORS.muted }}>
                  Page {page} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="h-8 px-2 text-xs"
                    style={{ color: COLORS.muted }}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages}
                    className="h-8 px-2 text-xs"
                    style={{ color: COLORS.muted }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <AnalyticsTab />
          </motion.div>
        )}

        {activeTab === 'moderation' && (
          <motion.div
            key="moderation"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <ModerationTab />
          </motion.div>
        )}

        {activeTab === 'revenue' && (
          <motion.div
            key="revenue"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <RevenueTab />
          </motion.div>
        )}

        {activeTab === 'models' && (
          <motion.div
            key="models"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <ModelsTab />
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <SettingsTab />
          </motion.div>
        )}

        {activeTab === 'ads' && (
          <motion.div
            key="ads"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <AdsTab />
          </motion.div>
        )}

        {activeTab === 'compliance' && (
          <motion.div
            key="compliance"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <ComplianceDashboard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit User Dialog ── */}
      <Dialog open={!!editUser} onOpenChange={(open) => { if (!open) setEditUser(null); }}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>Edit User</DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Change role and subscription tier for {editUser?.name || editUser?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Role */}
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>
                Role
              </label>
              <Select value={editRole} onValueChange={setEditRole}>
                <SelectTrigger
                  className="w-full text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
                >
                  <SelectItem value="student" style={{ color: COLORS.text }}>Student</SelectItem>
                  <SelectItem value="educator" style={{ color: COLORS.text }}>Educator</SelectItem>
                  <SelectItem value="admin" style={{ color: COLORS.text }}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tier */}
            <div className="space-y-2">
              <label className="text-xs font-medium" style={{ color: COLORS.muted }}>
                Subscription Tier
              </label>
              <Select value={editTier} onValueChange={setEditTier}>
                <SelectTrigger
                  className="w-full text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
                >
                  <SelectItem value="free" style={{ color: COLORS.text }}>Free</SelectItem>
                  <SelectItem value="premium" style={{ color: COLORS.text }}>Premium</SelectItem>
                  <SelectItem value="pro" style={{ color: COLORS.text }}>Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setEditUser(null)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={saving}
              className="text-xs font-medium"
              style={{
                background: COLORS.green,
                color: '#0c0e14',
              }}
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Pencil className="w-3.5 h-3.5 mr-1.5" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
      <AlertDialog open={!!deleteUser} onOpenChange={(open) => { if (!open) setDeleteUser(null); }}>
        <AlertDialogContent
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: COLORS.text }}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" style={{ color: COLORS.red }} />
                Delete User
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: COLORS.muted }}>
              Are you sure you want to delete <strong style={{ color: COLORS.text }}>{deleteUser?.name || deleteUser?.email}</strong>?
              This action cannot be undone. All user data including subscriptions, credits, and study history will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              style={{ color: COLORS.muted, borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={deleting}
              style={{ background: COLORS.red, color: '#fff' }}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete User'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── View Profile Dialog ── */}
      <Dialog open={!!viewUser} onOpenChange={(open) => { if (!open) setViewUser(null); }}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>User Profile</DialogTitle>
          </DialogHeader>

          {viewUser && (
            <div className="space-y-4 py-2">
              {/* Avatar & Name */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{
                    background: `${ROLE_COLORS[viewUser.role] || COLORS.muted}20`,
                    color: ROLE_COLORS[viewUser.role] || COLORS.muted,
                  }}
                >
                  {getInitials(viewUser.name, viewUser.email)}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: COLORS.text }}>
                    {viewUser.name || 'Unnamed User'}
                  </p>
                  <p className="text-xs" style={{ color: COLORS.muted }}>
                    {viewUser.email || 'No email'}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: COLORS.cardBorder }}
                >
                  <p className="text-[10px] font-medium mb-1" style={{ color: COLORS.muted }}>Role</p>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `${ROLE_COLORS[viewUser.role] || COLORS.muted}15`,
                      color: ROLE_COLORS[viewUser.role] || COLORS.muted,
                      border: `1px solid ${ROLE_COLORS[viewUser.role] || COLORS.muted}30`,
                    }}
                  >
                    {viewUser.role}
                  </span>
                </div>
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: COLORS.cardBorder }}
                >
                  <p className="text-[10px] font-medium mb-1" style={{ color: COLORS.muted }}>Tier</p>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `${TIER_COLORS[viewUser.tier] || COLORS.muted}15`,
                      color: TIER_COLORS[viewUser.tier] || COLORS.muted,
                      border: `1px solid ${TIER_COLORS[viewUser.tier] || COLORS.muted}30`,
                    }}
                  >
                    {viewUser.tier}
                  </span>
                </div>
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: COLORS.cardBorder }}
                >
                  <p className="text-[10px] font-medium mb-1" style={{ color: COLORS.muted }}>Status</p>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `${USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted}15`,
                      color: USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted,
                      border: `1px solid ${USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted}30`,
                    }}
                  >
                    {viewUser.status || 'active'}
                  </span>
                  {viewUser.status === 'suspended' && viewUser.suspendedUntil && (
                    <p className="text-[10px] mt-1" style={{ color: COLORS.dimmed }}>
                      Until {formatDate(viewUser.suspendedUntil)}
                    </p>
                  )}
                  {viewUser.status === 'suspended' && viewUser.suspendedReason && (
                    <p className="text-[10px] mt-1 italic" style={{ color: COLORS.muted }}>
                      &ldquo;{viewUser.suspendedReason}&rdquo;
                    </p>
                  )}
                  {viewUser.status === 'banned' && viewUser.bannedReason && (
                    <p className="text-[10px] mt-1 italic" style={{ color: COLORS.muted }}>
                      &ldquo;{viewUser.bannedReason}&rdquo;
                    </p>
                  )}
                </div>
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: COLORS.cardBorder }}
                >
                  <p className="text-[10px] font-medium mb-1" style={{ color: COLORS.muted }}>Credits</p>
                  <p className="text-sm font-bold" style={{ color: COLORS.text }}>{viewUser.credits}</p>
                </div>
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: COLORS.cardBorder }}
                >
                  <p className="text-[10px] font-medium mb-1" style={{ color: COLORS.muted }}>Joined</p>
                  <p className="text-xs font-medium" style={{ color: COLORS.text }}>{formatDate(viewUser.createdAt)}</p>
                </div>
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: COLORS.cardBorder }}
                >
                  <p className="text-[10px] font-medium mb-1" style={{ color: COLORS.muted }}>Last Active</p>
                  <p className="text-xs font-medium" style={{ color: COLORS.text }}>
                    {viewUser.lastActiveAt ? formatDate(viewUser.lastActiveAt) : '—'}
                  </p>
                </div>
              </div>

              {/* ID */}
              <div
                className="rounded-lg p-3 border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: COLORS.cardBorder }}
              >
                <p className="text-[10px] font-medium mb-1" style={{ color: COLORS.muted }}>User ID</p>
                <p className="text-[10px] font-mono" style={{ color: COLORS.dimmed }}>{viewUser.id}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setViewUser(null)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                if (viewUser) {
                  handleEditUser(viewUser);
                  setViewUser(null);
                }
              }}
              className="text-xs font-medium"
              style={{ background: COLORS.purple, color: '#fff' }}
            >
              <UserCog className="w-3.5 h-3.5 mr-1.5" />
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Moderate User Dialog (Suspend / Ban / Activate) ── */}
      <Dialog open={!!moderateUser} onOpenChange={(open) => { if (!open) setModerateUser(null); }}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>
              <div className="flex items-center gap-2">
                {moderateAction === 'suspend' && <Clock className="w-4 h-4" style={{ color: COLORS.amber }} />}
                {moderateAction === 'ban' && <Ban className="w-4 h-4" style={{ color: COLORS.red }} />}
                {moderateAction === 'activate' && <Unlock className="w-4 h-4" style={{ color: COLORS.green }} />}
                {moderateAction === 'suspend' && 'Suspend User'}
                {moderateAction === 'ban' && 'Ban User'}
                {moderateAction === 'activate' && 'Reactivate User'}
              </div>
            </DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              {moderateAction === 'activate'
                ? `This will lift any suspension or ban on ${moderateUser?.name || moderateUser?.email}.`
                : moderateAction === 'ban'
                  ? `Permanently ban ${moderateUser?.name || moderateUser?.email}. They will be unable to sign in.`
                  : `Temporarily suspend ${moderateUser?.name || moderateUser?.email}. They will be unable to sign in until reinstated.`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Duration (suspend only) */}
            {moderateAction === 'suspend' && (
              <div className="space-y-2">
                <label className="text-xs font-medium" style={{ color: COLORS.muted }}>
                  Duration (hours)
                </label>
                <Select value={moderateDuration} onValueChange={setModerateDuration}>
                  <SelectTrigger
                    className="w-full text-xs"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                      color: COLORS.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))' }}>
                    <SelectItem value="1" style={{ color: COLORS.text }}>1 hour</SelectItem>
                    <SelectItem value="6" style={{ color: COLORS.text }}>6 hours</SelectItem>
                    <SelectItem value="24" style={{ color: COLORS.text }}>24 hours</SelectItem>
                    <SelectItem value="72" style={{ color: COLORS.text }}>3 days</SelectItem>
                    <SelectItem value="168" style={{ color: COLORS.text }}>7 days</SelectItem>
                    <SelectItem value="720" style={{ color: COLORS.text }}>30 days</SelectItem>
                    <SelectItem value="indefinite" style={{ color: COLORS.text }}>Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Reason (suspend/ban only) */}
            {moderateAction !== 'activate' && (
              <div className="space-y-2">
                <label className="text-xs font-medium" style={{ color: COLORS.muted }}>
                  Reason <span style={{ color: COLORS.dimmed }}>(optional)</span>
                </label>
                <textarea
                  value={moderateReason}
                  onChange={(e) => setModerateReason(e.target.value)}
                  placeholder="e.g. Spamming study group chats, abusive language, etc."
                  rows={3}
                  className="w-full p-2 rounded-lg text-xs outline-none transition-all border resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                    color: COLORS.text,
                  }}
                />
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setModerateUser(null)}
              className="text-xs"
              style={{ color: COLORS.muted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmModerate}
              disabled={moderating}
              className="text-xs font-medium"
              style={{
                background:
                  moderateAction === 'activate' ? COLORS.green
                    : moderateAction === 'ban' ? COLORS.red
                    : COLORS.amber,
                color: moderateAction === 'activate' ? '#0c0e14' : '#fff',
              }}
            >
              {moderating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {moderateAction === 'suspend' && <Clock className="w-3.5 h-3.5 mr-1.5" />}
                  {moderateAction === 'ban' && <Ban className="w-3.5 h-3.5 mr-1.5" />}
                  {moderateAction === 'activate' && <Unlock className="w-3.5 h-3.5 mr-1.5" />}
                  Confirm {moderateAction === 'activate' ? 'Reactivate' : moderateAction}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Reset Password Dialog ── */}
      <Dialog open={!!resetUser} onOpenChange={(open) => { if (!open) { setResetUser(null); setResetResult(null); } }}>
        <DialogContent
          className="sm:max-w-md"
          style={{ background: 'var(--medq-app-bg, #1a1e2b)', borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))', color: COLORS.text }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: COLORS.text }}>
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" style={{ color: COLORS.cyan }} />
                Reset Password
              </div>
            </DialogTitle>
            <DialogDescription style={{ color: COLORS.muted }}>
              Reset the password for <strong style={{ color: COLORS.text }}>{resetUser?.name || resetUser?.email}</strong>.
              The user will need to use the new password to sign in.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {resetResult ? (
              <div
                className="rounded-lg p-3 border"
                style={{ background: `${COLORS.green}10`, borderColor: `${COLORS.green}40` }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: COLORS.green }}>
                  Temporary Password
                </p>
                <p className="text-sm font-mono font-bold break-all" style={{ color: COLORS.text }}>
                  {resetResult}
                </p>
                <p className="text-[10px] mt-2" style={{ color: COLORS.muted }}>
                  Copy this password and share it securely with the user. It will not be shown again.
                </p>
              </div>
            ) : (
              <>
                {/* Toggle: use custom vs random */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setResetUseCustom(false)}
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border"
                    style={{
                      background: !resetUseCustom ? `${COLORS.cyan}15` : 'transparent',
                      borderColor: !resetUseCustom ? `${COLORS.cyan}40` : COLORS.cardBorder,
                      color: !resetUseCustom ? COLORS.cyan : COLORS.muted,
                    }}
                  >
                    Auto-generate
                  </button>
                  <button
                    onClick={() => setResetUseCustom(true)}
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border"
                    style={{
                      background: resetUseCustom ? `${COLORS.cyan}15` : 'transparent',
                      borderColor: resetUseCustom ? `${COLORS.cyan}40` : COLORS.cardBorder,
                      color: resetUseCustom ? COLORS.cyan : COLORS.muted,
                    }}
                  >
                    Custom password
                  </button>
                </div>

                {resetUseCustom && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium" style={{ color: COLORS.muted }}>
                      New password (min 8 characters)
                    </label>
                    <input
                      type="text"
                      value={resetCustomPassword}
                      onChange={(e) => setResetCustomPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full h-9 px-3 rounded-lg text-xs outline-none transition-all border"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text,
                      }}
                    />
                  </div>
                )}

                {!resetUseCustom && (
                  <p className="text-[10px]" style={{ color: COLORS.muted }}>
                    A random 12-character password will be generated and shown to you once the reset is complete.
                  </p>
                )}
              </>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            {resetResult ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => { setResetUser(null); setResetResult(null); }}
                  className="text-xs"
                  style={{ color: COLORS.muted }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    if (resetResult) {
                      navigator.clipboard.writeText(resetResult).then(() => {
                        toast.success('Password copied to clipboard');
                      }).catch(() => {
                        toast.error('Failed to copy');
                      });
                    }
                  }}
                  className="text-xs font-medium"
                  style={{ background: COLORS.green, color: '#0c0e14' }}
                >
                  Copy Password
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setResetUser(null)}
                  className="text-xs"
                  style={{ color: COLORS.muted }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmReset}
                  disabled={resetting}
                  className="text-xs font-medium"
                  style={{ background: COLORS.cyan, color: '#0c0e14' }}
                >
                  {resetting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                      Reset Password
                    </>
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
