import React, { type ReactNode } from 'react';

export interface ChatRoomInfo {
  id: string;
  type: string;
  name: string;
  avatar: string;
  description?: string;
  createdBy?: string;
  lastMessage: { id: string; content: string; senderName: string | null; createdAt: string; type: string } | null;
  members: { id: string; name: string | null; image: string | null; role: string; isOnline?: boolean; lastActiveAt?: string | null }[];
  unreadCount: number;
  lastMessageAt: string;
  isPinned?: boolean;
  isMuted?: boolean;
  pinOrder?: number | null;
}

export interface Reaction { emoji: string; userIds: string[]; }

export interface ReplyToMsg {
  id: string;
  content: string;
  senderId: string;
  sender?: { id: string; name: string | null } | null;
}

export interface ChatMsg {
  id: string;
  roomId: string;
  senderId: string;
  senderName?: string;
  content: string;
  type: string;
  metadata: any;
  isPinned?: boolean;
  isDeleted?: boolean;
  replyToId?: string;
  replyTo?: ReplyToMsg | null;
  editedAt?: string | null;
  createdAt: string;
  sender?: { id: string; name: string | null; image: string | null };
}

export interface FriendInfo {
  id: string;
  name: string | null;
  email?: string | null;
  image: string | null;
  specialty?: string | null;
  medicalSchool?: string | null;
  isOnline?: boolean;
  lastActiveAt?: string | null;
}

export interface FriendshipInfo {
  friendshipId: string;
  id: string;
  name: string | null;
  email?: string | null;
  image: string | null;
  specialty?: string | null;
  medicalSchool?: string | null;
  isOnline?: boolean;
  lastActiveAt?: string | null;
  isFavorite?: boolean;
  note?: string | null;
  nickname?: string | null;
  friendedAt?: string;
}

export interface FriendRequestInfo {
  friendshipId: string;
  id: string;
  name: string | null;
  email?: string | null;
  image?: string | null;
  specialty?: string | null;
  medicalSchool?: string | null;
  isOnline?: boolean;
  lastActiveAt?: string | null;
  createdAt: string;
  note?: string;
}

export interface SearchUserResult {
  id: string;
  name: string | null;
  email?: string | null;
  specialty?: string | null;
  medicalSchool?: string | null;
  mutualFriends?: number;
  mutualCount?: number;
  image?: string | null;
  isOnline?: boolean;
}

export interface UserProfileData {
  id: string;
  name: string | null;
  email?: string | null;
  image: string | null;
  specialty?: string | null;
  medicalSchool?: string | null;
  isOnline?: boolean;
  lastActiveAt?: string | null;
  bio?: string | null;
  role?: string;
}

export interface ChatFolder {
  id: string;
  name: string;
  color: string;
  icon: string;
  roomIds: string[];
}

export const AVATAR_COLORS = ['#00e5a0', '#4fc3f7', '#f59e0b', '#b79bff', '#ff5757', '#ec4899'];
export const REACTION_EMOJIS = ['❤️', '👍', '😂', '🎉', '🤔', '👏', '🔥', '💯'];
export const MEDICAL_STICKERS = ['🩺', '💊', '🧬', '🫀', '🧠', '📚', '🔬', '⚕️', '🩻', '💉', '🩸', '🦴', '👁️', '🫁', '🦷', '🧪'];
export const COMMON_EMOJIS = [
  '😀','😂','🥹','😍','🤩','😎','🥳','😤','😭','🤯',
  '🫡','🤝','💪','✅','❌','⭐','💡','🎯','📝','🏆',
  '❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍','💯',
  '🔥','⚡','✨','🎉','🎊','💀','👻','🤖','👨‍⚕️','👩‍⚕️',
];
export const EMOJI_AVATAR_OPTIONS = ['👥', '🩺', '💊', '🧬', '🫀', '🧠', '📚', '🔬', '⚕️', '🩻'];

export function getColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export function getInitials(name: string | null | undefined) {
  if (!name) return '?';
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatDateSeparator(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const generateWaveformBars = (seed: number, count: number = 30): number[] => {
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const h = 0.2 + 0.8 * Math.abs(Math.sin(seed * 13.37 + i * 2.65) * Math.cos(seed * 7.89 + i * 1.23));
    bars.push(h);
  }
  return bars;
};

export const extractUrl = (text: string): string | null => {
  const match = text.match(/https?:\/\/[^\s]+/i);
  return match ? match[0] : null;
};

export const parseInternalDeepLink = (url: string): { room: string; msg?: string } | null => {
  if (typeof window === 'undefined') return null;
  try {
    const u = new URL(url);
    if (u.origin !== window.location.origin) return null;
    if (u.pathname !== '/messages') return null;
    const room = u.searchParams.get('room');
    if (!room) return null;
    const msg = u.searchParams.get('msg') || undefined;
    return { room, msg };
  } catch {
    return null;
  }
};

export const isSingleEmoji = (text: string): boolean => {
  const emojiRegex = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}]{1,3}$/u;
  return emojiRegex.test(text.trim());
};

export function isRecentlyActive(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < 5 * 60 * 1000;
}

export function isSameDay(a: string, b: string) {
  const da = new Date(a), db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
}

export function parseReactions(metadata: any): Reaction[] {
  try {
    const parsed = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;
    if (parsed?.reactions && Array.isArray(parsed.reactions)) return parsed.reactions;
    return [];
  } catch {
    return [];
  }
}

export function toggleReaction(metadata: any, emoji: string, userId: string): any {
  const parsed = typeof metadata === 'string' ? JSON.parse(metadata) : (metadata || {});
  const reactions: Reaction[] = Array.isArray(parsed.reactions) ? parsed.reactions : [];
  const existing = reactions.find((r) => r.emoji === emoji);
  if (existing) {
    if (existing.userIds.includes(userId)) {
      existing.userIds = existing.userIds.filter((id) => id !== userId);
      if (existing.userIds.length === 0) return { ...parsed, reactions: reactions.filter((r) => r.emoji !== emoji) };
    } else {
      existing.userIds.push(userId);
    }
  } else {
    reactions.push({ emoji, userIds: [userId] });
  }
  return { ...parsed, reactions };
}

export function parseMeta(metadata: any) {
  try {
    return typeof metadata === 'string' ? JSON.parse(metadata || '{}') : (metadata || {});
  } catch {
    return {};
  }
}

export function highlightText(text: string, query: string): ReactNode[] | string {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return parts.map((part, i) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return React.createElement(
        'mark',
        {
          key: i,
          style: {
            background: 'rgba(0,229,160,0.3)',
            color: 'var(--medq-text, #e8ecf4)',
            borderRadius: '2px',
            padding: '0 1px',
          },
        },
        part,
      );
    }
    return part;
  });
}
