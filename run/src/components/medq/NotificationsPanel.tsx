'use client';

import { useState, useEffect, useRef } from 'react';
import { useNotificationStream, type NotificationPayload } from '@/components/medq/useNotificationStream';
import {
  Users,
  Swords,
  UsersRound,
  Heart,
  MessageCircle,
  AtSign,
  Trophy,
  Bell,
  X,
  CheckCheck,
  Loader2,
  BellDot,
  WifiOff,
} from 'lucide-react';
import { toast } from 'sonner';

/* ───────── Types ───────── */

interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  fromUserId: string | null;
  referenceId: string;
  isRead: boolean;
  createdAt: string;
  user?: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (tab: string) => void;
}

/* ───────── Config ───────── */

const NOTIFICATION_CONFIG: Record<string, { icon: typeof Users; color: string }> = {
  friend_request: { icon: Users, color: '#4fc3f7' },
  challenge: { icon: Swords, color: '#ff5757' },
  group_invite: { icon: UsersRound, color: '#8b5cf6' },
  post_like: { icon: Heart, color: '#ec4899' },
  post_comment: { icon: MessageCircle, color: '#4fc3f7' },
  mention: { icon: AtSign, color: '#f59e0b' },
  achievement: { icon: Trophy, color: '#f59e0b' },
  system: { icon: Bell, color: '#5a6478' },
};

const NAVIGATION_MAP: Record<string, string> = {
  friend_request: 'friends',
  challenge: 'arena',
  group_invite: 'groups',
  // Social Feed tab was removed — route post/mention notifications to Groups
  // (the closest still-existing social surface) instead of the removed 'feed' tab.
  post_like: 'groups',
  post_comment: 'groups',
  mention: 'groups',
  achievement: 'erc',
  system: 'dashboard',
};

/* ───────── Helpers ───────── */

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

/* ───────── Sub-components ───────── */

function NotificationItem({
  notification,
  onRead,
  onNavigate,
  onClose,
}: {
  notification: Notification;
  onRead: (id: string) => void;
  onNavigate?: (tab: string) => void;
  onClose: () => void;
}) {
  const config = NOTIFICATION_CONFIG[notification.type] || NOTIFICATION_CONFIG.system;
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.isRead) {
      onRead(notification.id);
    }
    const tab = NAVIGATION_MAP[notification.type] || 'dashboard';
    // onNavigate(tab);
    onClose();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all group"
      style={{
        background: notification.isRead ? 'transparent' : 'rgba(0,229,160,0.04)',
        border: notification.isRead ? '1px solid transparent' : '1px solid rgba(0,229,160,0.08)',
      }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${config.color}15`, color: config.color }}
      >
        <Icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold truncate"
            style={{ color: notification.isRead ? '#5a6478' : '#e8ecf4' }}
          >
            {notification.title}
          </span>
          {!notification.isRead && (
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: '#00e5a0' }}
            />
          )}
        </div>
        <p
          className="text-[11px] mt-0.5 line-clamp-2"
          style={{ color: notification.isRead ? '#3a4055' : '#8b95a8' }}
        >
          {notification.message}
        </p>
        <p
          className="text-[10px] mt-1"
          style={{ color: '#3a4055' }}
        >
          {timeAgo(notification.createdAt)}
        </p>
      </div>
    </button>
  );
}

function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3">
      <div
        className="w-9 h-9 rounded-lg animate-pulse flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      />
      <div className="flex-1 min-w-0">
        <div
          className="h-3 w-28 rounded animate-pulse mb-2"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />
        <div
          className="h-3 w-full rounded animate-pulse mb-1"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />
        <div
          className="h-2.5 w-12 rounded animate-pulse"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        />
      </div>
    </div>
  );
}

/* ───────── Main Component ───────── */

export default function NotificationsPanel({ open, onClose, onNavigate }: NotificationsPanelProps) {
  // const { isAuthenticated } = useAuth();
  const  isAuthenticated  = true;
  const [notifications, setNotifications] = useState<Notification[]>(() => []);
  const [unreadCount, setUnreadCount] = useState(() => 0);
  const [loading, setLoading] = useState(() => false);
  const [markingAll, setMarkingAll] = useState(() => false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Real-time push via SSE ──
   * When the panel is open and the user is authenticated, subscribe to the
   * notification stream so new notifications appear instantly without a
   * manual refresh. The hook is a singleton, so opening/closing the panel
   * doesn't churn connections. */
  const { connected: sseConnected } = useNotificationStream({
    enabled: !!isAuthenticated && open,
    onUnreadCount: (c) => setUnreadCount(c),
    onNotification: (n: NotificationPayload) => {
      // Prepend new notifications to the local list (only if it matches the
      // current filter — unread always shows; "all" always shows).
      setNotifications(prev => {
        // De-dupe: if the notification is already in the list (e.g. backfill
        // sent it again), don't double-add.
        if (prev.some(p => p.id === n.id)) return prev;
        const next: Notification = { ...n };
        return [next, ...prev].slice(0, 50); // cap at 50
      });
    },
  });

  /* ── Fetch notifications ── */

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '30');
      if (filter === 'unread') params.set('unread', 'true');

      const res = await fetch(`/api/notifications?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Mark single as read ── */

  const markAsRead = async (id: string) => {
    // Optimistic update
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount(prev => Math.max(0, prev - 1));

    try {
      const res = await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
      if (!res.ok) {
        // Revert on failure
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, isRead: false } : n))
        );
        setUnreadCount(prev => prev + 1);
        toast.error('Failed to mark notification');
      }
    } catch {
      // Revert on error
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: false } : n))
      );
      setUnreadCount(prev => prev + 1);
      toast.error('Failed to mark notification');
    }
  };

  /* ── Mark all as read ── */

  const markAllAsRead = async () => {
    if (unreadCount === 0) return;
    setMarkingAll(true);

    // Optimistic update
    const prevUnread = unreadCount;
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);

    try {
      const res = await fetch('/api/notifications', { method: 'PUT' });
      if (res.ok) {
        toast.success('All notifications marked as read');
      } else {
        // Revert
        setNotifications(prev =>
          prev.map((n, i) => (i < prevUnread ? { ...n, isRead: false } : n))
        );
        setUnreadCount(prevUnread);
        toast.error('Failed to mark all as read');
      }
    } catch {
      // Revert
      setNotifications(prev =>
        prev.map((n, i) => (i < prevUnread ? { ...n, isRead: false } : n))
      );
      setUnreadCount(prevUnread);
      toast.error('Failed to mark all as read');
    } finally {
      setMarkingAll(false);
    }
  };

  /* ── Effects ── */

  useEffect(() => {
    if (open && isAuthenticated) {
      fetchNotifications();
    }
  }, [open, isAuthenticated, filter]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Delay to avoid closing immediately from the trigger click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Auto-refresh every 2 min while open (SSE handles real-time; this is a
  // safety net so the list re-syncs if any SSE events were missed).
  useEffect(() => {
    if (!open || !isAuthenticated) return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 120000);

    return () => clearInterval(interval);
  }, [open, isAuthenticated, filter]);

  /* ── Render ── */

  if (!open) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 z-40 lg:hidden"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed right-4 top-16 z-50 w-[360px] max-w-[calc(100vw-32px)] rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: '#12141c',
          border: '1px solid rgba(255,255,255,0.08)',
          maxHeight: 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(0,229,160,0.1)' }}
            >
              {unreadCount > 0 ? (
                <BellDot className="w-4 h-4 text-[#00e5a0]" />
              ) : (
                <Bell className="w-4 h-4 text-[#5a6478]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#e8ecf4]">Notifications</h3>
                {/* Live indicator — shows real-time connection status */}
                {sseConnected ? (
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}
                    title="Real-time connection active"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
                    Live
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#5a6478' }}
                    title="Reconnecting…"
                  >
                    <WifiOff className="w-2.5 h-2.5" />
                    Sync
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <p className="text-[10px] text-[#00e5a0] font-semibold">
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Mark all as read */}
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                disabled={markingAll}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all disabled:opacity-50 hover:bg-white/[0.05]"
                style={{ color: '#00e5a0' }}
                title="Mark all as read"
              >
                {markingAll ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCheck className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">Mark all</span>
              </button>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/[0.05]"
            >
              <X className="w-4 h-4 text-[#5a6478]" />
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="flex items-center gap-1 px-4 py-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={{
                background: filter === f ? 'rgba(0,229,160,0.08)' : 'transparent',
                color: filter === f ? '#00e5a0' : '#5a6478',
                border: filter === f ? '1px solid rgba(0,229,160,0.15)' : '1px solid transparent',
              }}
            >
              {f === 'all' ? 'All' : 'Unread'}
              {f === 'unread' && unreadCount > 0 && (
                <span
                  className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold"
                  style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div
          className="flex-1 overflow-y-auto p-2 space-y-1"
          style={{
            maxHeight: '420px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.08) transparent',
          }}
        >
          {loading ? (
            <>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </>
          ) : notifications.length === 0 ? (
            <div className="text-center py-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <Bell className="w-6 h-6 text-[#3a4055]" />
              </div>
              <p className="text-xs font-semibold text-[#5a6478]">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
              <p className="text-[10px] text-[#3a4055] mt-1">
                {filter === 'unread'
                  ? 'You\u2019re all caught up!'
                  : 'We\u2019ll notify you about friend requests, challenges, and more'}
              </p>
            </div>
          ) : (
            notifications.map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                onRead={markAsRead}
                // onNavigate={onNavigate}
                onClose={onClose}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div
            className="px-4 py-2.5 flex-shrink-0 text-center"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.04)',
              background: 'rgba(255,255,255,0.01)',
            }}
          >
            <p className="text-[10px] text-[#3a4055]">
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              {unreadCount > 0 ? ` \u00B7 ${unreadCount} unread` : ''}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
