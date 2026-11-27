'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import {
  MessageCircle, Send, ArrowLeft, Plus, Search, Users,
  Loader2, Check, CheckCheck, Mic, X, Reply, Pencil, Trash2,
  Pin, ChevronDown, ChevronUp, Play, Pause, UserPlus, UserMinus,
  LogOut, Phone, Video, MoreVertical, Smile, Paperclip, Copy,
  Shield, Clock, Image as ImageIcon, UserCheck, UserX,
  Sparkles, BarChart3, Bookmark, Volume2, Trash, Heart, Hash,
  FolderOpen, Archive, EyeOff, Palette, GripVertical, Bookmark as BookmarkIcon,
  CheckSquare, Square, Share2, Link2, FileText, Calendar, Bell, BellOff,
  Settings, Type, Maximize2, Crown, Move, Menu, Home, BookOpen, UsersRound,
  Languages, Timer, Vote, Film, Upload, Download, Camera, MicOff, PhoneOff, PhoneCall, VideoOff, PhoneIncoming,
  Brain, Zap, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  ChatFolder,
  ChatMsg,
  ChatRoomInfo,
  UserProfileData,
  formatDuration,
  getColor,
  getInitials,
  isRecentlyActive,
  REACTION_EMOJIS,
} from './chat-utils';

/* ── Viewport-aware positioning for fixed menus ─────────────────────────
   Context menus opened near the bottom of the screen (e.g. right-click on
   the LAST messages) used to overflow past the viewport edge because the
   old code clamped `top` with a hardcoded menu height (320px) while the
   real menu is ~480px tall. This hook measures the ACTUAL rendered size
   before paint and then:
   • flips the menu ABOVE the cursor when it would overflow the bottom,
   • clamps horizontally so it never runs off the left/right edge,
   • falls back to a scrollable menu (max-height = viewport) when there
     isn't room on either side (short viewports / landscape phones). */
export function useViewportMenuPosition(x: number, y: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number; maxHeight?: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;
    const w = rect.width || 200;
    const h = rect.height || 300;

    // Horizontal: keep inside [margin, vw - w - margin]
    const left = Math.min(Math.max(x, margin), Math.max(vw - w - margin, margin));

    // Vertical: prefer below the cursor; flip above when it would overflow
    let top = y;
    let maxHeight: number | undefined;
    if (y + h > vh - margin) {
      top = y - h; // flip above the cursor
      if (top < margin) {
        // Not enough room above either — pin to top and let it scroll
        top = margin;
        maxHeight = vh - margin * 2;
      }
    }
    setPos({ left, top, maxHeight });
  }, [x, y]);

  return { ref, pos };
}

export function VoicePlayer({ src, duration }: { src: string; duration?: number }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [dur, setDur] = useState(duration || 0);
  const rafRef = useRef<number>(0);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const cycleSpeed = () => {
    const speeds: (1 | 1.5 | 2)[] = [1, 1.5, 2];
    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      if (audio.duration) setDur(audio.duration);
      setProgress(audio.currentTime / (audio.duration || 1));
      rafRef.current = requestAnimationFrame(update);
    };
    audio.addEventListener('play', () => { rafRef.current = requestAnimationFrame(update); });
    audio.addEventListener('pause', () => { cancelAnimationFrame(rafRef.current); });
    audio.addEventListener('ended', () => { setPlaying(false); setProgress(0); cancelAnimationFrame(rafRef.current); });
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button onClick={toggle} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105" style={{ background: 'rgba(0,229,160,0.15)' }}>
        {playing ? <Pause className="w-4 h-4 text-[#00e5a0]" /> : <Play className="w-4 h-4 text-[#00e5a0] ml-0.5" />}
      </button>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-end gap-[2px] h-5">
          {Array.from({ length: 24 }).map((_, i) => {
            const h = Math.sin(i * 0.6) * 0.35 + 0.45 + Math.sin(i * 1.3) * 0.15;
            const filled = i / 24 < progress;
            return <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${h * 100}%`, background: filled ? '#00e5a0' : 'rgba(255,255,255,0.1)', minWidth: '2px' }} />;
          })}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-[#5a6478]">{formatDuration(dur * (1 / playbackSpeed))}</span>
          <button onClick={cycleSpeed} className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: playbackSpeed > 1 ? '#00e5a0' : '#5a6478' }}>
            {playbackSpeed}x
          </button>
        </div>
      </div>
    </div>
  );
}

interface ContextMenuProps {
  x: number; y: number; msg: ChatMsg; isOwn: boolean; isAdmin: boolean; onClose: () => void;
  onReply: (msg: ChatMsg) => void; onEdit: (msg: ChatMsg) => void;
  onCopy: (text: string) => void; onForward: (msg: ChatMsg) => void;
  onPin: (msgId: string, pinned: boolean) => void; onDelete: (msgId: string) => void;
  onDeleteForEveryone: (msgId: string) => void;
  onReact: (msg: ChatMsg, emoji: string) => void;
  onSave: (msgId: string) => void;
  isSaved: boolean;
  onTranslate?: (msg: ChatMsg) => void;
  onCopyMessageLink?: (msg: ChatMsg) => void;
  // Whether the current user is authorized to pin/unpin this message.
  // Computed by the caller from: logged-in, room membership, room type,
  // admin role, and the room's pinMessages permission. When false, the
  // Pin/Unpin item is hidden from the menu entirely (Telegram only shows
  // it to admins in admin-only-pin groups).
  canPin?: boolean;
}

export function MessageContextMenu({ x, y, msg, isOwn, isAdmin, onClose, onReply, onEdit, onCopy, onForward, onPin, onDelete, onDeleteForEveryone, onReact, onSave, isSaved, onTranslate, onCopyMessageLink, canPin = true }: ContextMenuProps) {
  const { ref: menuRef, pos } = useViewportMenuPosition(x, y);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose(); };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  // Hidden until measured so the flip-above never flashes at the wrong spot.
  const style: CSSProperties = { left: pos?.left ?? x, top: pos?.top ?? y, visibility: pos ? undefined : 'hidden', maxHeight: pos?.maxHeight, overflowY: pos?.maxHeight ? 'auto' : undefined };

  return (
    <div ref={menuRef} className="fixed z-[100] animate-in fade-in-0 zoom-in-95 duration-150" style={style}>
      <div className="flex items-center gap-1 p-1.5 rounded-xl mb-1 backdrop-blur-xl" style={{ background: 'rgba(30,33,46,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {REACTION_EMOJIS.map((emoji) => (
          <button key={emoji} onClick={() => { onReact(msg, emoji); onClose(); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-base hover:bg-white/[0.08] transition-all hover:scale-110">{emoji}</button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden backdrop-blur-xl min-w-[180px]" style={{ background: 'rgba(30,33,46,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {[
          { icon: <Reply className="w-4 h-4" />, label: 'Reply', action: () => onReply(msg) },
          ...(isOwn ? [{ icon: <Pencil className="w-4 h-4" />, label: 'Edit', action: () => onEdit(msg) }] : []),
          { icon: <Copy className="w-4 h-4" />, label: 'Copy Text', action: () => onCopy(msg.content) },
          ...(onCopyMessageLink ? [{ icon: <Link2 className="w-4 h-4" />, label: 'Copy Message Link', action: () => onCopyMessageLink(msg) }] : []),
          { icon: <Sparkles className="w-4 h-4" />, label: 'Forward', action: () => onForward(msg) },
          ...(canPin ? [{ icon: <Pin className="w-4 h-4" />, label: msg.isPinned ? 'Unpin' : 'Pin', action: () => onPin(msg.id, !!msg.isPinned) }] : []),
          { icon: <BookmarkIcon className="w-4 h-4" />, label: isSaved ? 'Unsave' : 'Save Message', action: () => onSave(msg.id) },
          ...(onTranslate ? [{ icon: <Type className="w-4 h-4" />, label: 'Translate', action: () => onTranslate(msg) }] : []),
        ].map((item, i) => (
          <button key={i} onClick={() => { item.action(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs text-[#e8ecf4] hover:bg-white/[0.06] transition-all">
            <span className="text-[#8b95a8]">{item.icon}</span>{item.label}
          </button>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        <button onClick={() => { onDelete(msg.id); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs text-[#ff5757] hover:bg-red-500/[0.06] transition-all">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
        {(isOwn || isAdmin) && (
          <button onClick={() => { onDeleteForEveryone(msg.id); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs text-[#ff5757] hover:bg-red-500/[0.06] transition-all">
            <Trash className="w-4 h-4" /> Delete for Everyone
          </button>
        )}
      </div>
    </div>
  );
}

interface RoomContextMenuProps {
  x: number; y: number; room: ChatRoomInfo; onClose: () => void;
  onTogglePin: (roomId: string, isPinned: boolean) => void;
  onToggleMute: (roomId: string, isMuted: boolean) => void;
  onMarkAsRead: (roomId: string) => void;
  onMarkAsUnread: (roomId: string) => void;
  onDeleteRoom: (room: ChatRoomInfo) => void;
  onLeaveGroup: (room: ChatRoomInfo) => void;
  onArchive: (roomId: string) => void;
  onUnarchive: (roomId: string) => void;
  isArchived: boolean;
  onMoveToFolder: (folderId: string, roomId: string) => void;
  onRemoveFromFolder: (folderId: string, roomId: string) => void;
  folders: ChatFolder[];
  isPinned: boolean;
  onSetTTL?: (roomId: string, seconds: number) => void;
  ttlSeconds?: number;
  onExportChat?: () => void;
  onShowTTLMenu?: (show: boolean) => void;
  showTTLMenu?: boolean;
}

export function RoomContextMenu({ x, y, room, onClose, onTogglePin, onToggleMute, onMarkAsRead, onMarkAsUnread, onDeleteRoom, onLeaveGroup, onArchive, onUnarchive, isArchived, onMoveToFolder, onRemoveFromFolder, folders, isPinned, onSetTTL, ttlSeconds, onExportChat, onShowTTLMenu, showTTLMenu }: RoomContextMenuProps) {
  const { ref: menuRef, pos } = useViewportMenuPosition(x, y);
  const [showFolderSubmenu, setShowFolderSubmenu] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose(); };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  // Hidden until measured so the flip-above never flashes at the wrong spot.
  const style: CSSProperties = { left: pos?.left ?? x, top: pos?.top ?? y, visibility: pos ? undefined : 'hidden', maxHeight: pos?.maxHeight, overflowY: pos?.maxHeight ? 'auto' : undefined };

  return (
    <div ref={menuRef} className="fixed z-[100] animate-in fade-in-0 zoom-in-95 duration-150" style={style}>
      <div className="rounded-xl overflow-hidden backdrop-blur-xl min-w-[200px] max-h-[70vh] overflow-y-auto chat-scrollbar" style={{ background: 'rgba(30,33,46,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {[
          { icon: <Pin className="w-4 h-4" />, label: room.isPinned ? 'Unpin Chat' : 'Pin Chat', action: () => onTogglePin(room.id, !!room.isPinned), color: 'var(--medq-text, #e8ecf4)' },
          ...(isPinned ? [{ icon: <GripVertical className="w-4 h-4" />, label: 'Drag to Reorder', action: () => { toast.info('Drag pinned chats by their grip handle to reorder'); }, color: 'var(--medq-text-muted, #8b95a8)' }] : []),
          { icon: <Volume2 className="w-4 h-4" />, label: room.isMuted ? 'Unmute Notifications' : 'Mute Notifications', action: () => onToggleMute(room.id, !!room.isMuted), color: 'var(--medq-text, #e8ecf4)' },
          { icon: <CheckCheck className="w-4 h-4" />, label: 'Mark as Read', action: () => onMarkAsRead(room.id), color: 'var(--medq-text, #e8ecf4)' },
          { icon: <EyeOff className="w-4 h-4" />, label: 'Mark as Unread', action: () => onMarkAsUnread(room.id), color: 'var(--medq-text, #e8ecf4)' },
        ].map((item, i) => (
          <button key={i} onClick={() => { item.action(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all" style={{ color: item.color }}>
            <span className="text-[#8b95a8]">{item.icon}</span>{item.label}
          </button>
        ))}

        <div className="relative">
          <button onClick={() => setShowFolderSubmenu(!showFolderSubmenu)} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
            <span className="text-[#8b95a8]"><FolderOpen className="w-4 h-4" /></span>
            <span className="flex-1">Move to Folder</span>
            <ChevronDown className={`w-3 h-3 text-[#5a6478] transition-transform ${showFolderSubmenu ? 'rotate-180' : ''}`} />
          </button>
          {showFolderSubmenu && (
            <div className="pl-7 pb-1" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {folders.length === 0 ? (
                <p className="px-3 py-2 text-[10px] text-[#5a6478]">No folders yet — create one</p>
              ) : (
                folders.map((folder) => {
                  const isInFolder = folder.roomIds.includes(room.id);
                  return (
                    <button key={folder.id} onClick={() => { if (isInFolder) onRemoveFromFolder(folder.id, room.id); else onMoveToFolder(folder.id, room.id); onClose(); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
                      <span className="text-xs">{folder.icon}</span>
                      <span className="flex-1">{folder.name}</span>
                      {isInFolder && <Check className="w-3 h-3 text-[#00e5a0]" />}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {isArchived ? (
          <button onClick={() => { onUnarchive(room.id); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
            <span className="text-[#8b95a8]"><Archive className="w-4 h-4" /></span>Unarchive Chat
          </button>
        ) : (
          <button onClick={() => { onArchive(room.id); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
            <span className="text-[#8b95a8]"><Archive className="w-4 h-4" /></span>Archive Chat
          </button>
        )}

        <div className="relative">
          <button onClick={() => onShowTTLMenu?.(!showTTLMenu)} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
            <span className="text-[#8b95a8]"><Clock className="w-4 h-4" /></span>
            <span className="flex-1">Disappearing Messages</span>
            {ttlSeconds ? <span className="text-[10px] text-[#00e5a0]">{ttlSeconds < 60 ? ttlSeconds + 's' : ttlSeconds < 3600 ? Math.floor(ttlSeconds / 60) + 'm' : ttlSeconds < 86400 ? Math.floor(ttlSeconds / 3600) + 'h' : Math.floor(ttlSeconds / 86400) + 'd'}</span> : <span className="text-[10px] text-[#5a6478]">Off</span>}
            <ChevronDown className={`w-3 h-3 text-[#5a6478] transition-transform ${showTTLMenu ? 'rotate-180' : ''}`} />
          </button>
          {showTTLMenu && (
            <div className="pl-7 pb-1" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {[
                { label: 'Off', seconds: 0 },
                { label: '5 seconds', seconds: 5 },
                { label: '30 seconds', seconds: 30 },
                { label: '1 minute', seconds: 60 },
                { label: '1 hour', seconds: 3600 },
                { label: '1 day', seconds: 86400 },
                { label: '1 week', seconds: 604800 },
              ].map((opt) => (
                <button key={opt.seconds} onClick={() => { onSetTTL?.(room.id, opt.seconds); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
                  <span className="flex-1">{opt.label}</span>
                  {ttlSeconds === opt.seconds && <Check className="w-3 h-3 text-[#00e5a0]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {onExportChat && (
          <button onClick={() => { onExportChat(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
            <span className="text-[#8b95a8]"><FileText className="w-4 h-4" /></span>Export Chat
          </button>
        )}

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        {room.type === 'direct' ? (
          <button onClick={() => { onDeleteRoom(room); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs text-[#ff5757] hover:bg-red-500/[0.06] transition-all">
            <Trash2 className="w-4 h-4" /> Delete Conversation
          </button>
        ) : (
          <button onClick={() => { onLeaveGroup(room); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs text-[#ff5757] hover:bg-red-500/[0.06] transition-all">
            <LogOut className="w-4 h-4" /> Leave Group
          </button>
        )}
      </div>
    </div>
  );
}

export function UserProfilePopup({
  user, isFriend, onClose, onSendMessage, onAddFriend, sendingRequest, position
}: {
  user: UserProfileData;
  isFriend: boolean;
  onClose: () => void;
  onSendMessage: (userId: string) => void;
  onAddFriend: (userId: string) => void;
  sendingRequest: string | null;
  position: { x: number; y: number };
}) {
  const { ref: popupRef, pos } = useViewportMenuPosition(position.x, position.y);
  const isOnline = user.isOnline || isRecentlyActive(user.lastActiveAt);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (popupRef.current && !popupRef.current.contains(e.target as Node)) onClose(); };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  // Hidden until measured so the flip-above never flashes at the wrong spot.
  const style: CSSProperties = { left: pos?.left ?? position.x, top: pos?.top ?? position.y, visibility: pos ? undefined : 'hidden', maxHeight: pos?.maxHeight, overflowY: pos?.maxHeight ? 'auto' : undefined };

  return (
    <div ref={popupRef} className="fixed z-[110] animate-in fade-in-0 zoom-in-95 duration-150" style={style}>
      <div className="w-64 rounded-2xl p-4 backdrop-blur-xl" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold" style={{ background: `${getColor(user.id)}20`, color: getColor(user.id) }}>
              {getInitials(user.name)}
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2" style={{ background: isOnline ? '#00e5a0' : '#5a6478', borderColor: 'rgba(21,24,33,0.98)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#e8ecf4] truncate">{user.name}</p>
            <p className="text-xs text-[#8b95a8] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: isOnline ? '#00e5a0' : '#5a6478' }} />
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-3.5 h-3.5 text-[#8b95a8]" /></button>
        </div>

        {user.specialty && <p className="text-xs text-[#8b95a8] mb-1"><span className="text-[#5a6478]">Specialty:</span> {user.specialty}</p>}
        {user.medicalSchool && <p className="text-xs text-[#8b95a8] mb-1"><span className="text-[#5a6478]">School:</span> {user.medicalSchool}</p>}
        {user.role && <p className="text-xs text-[#8b95a8] mb-3"><span className="text-[#5a6478]">Role:</span> <span className="capitalize">{user.role}</span></p>}

        <div className="flex gap-2">
          <button onClick={() => onSendMessage(user.id)} className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}>
            <MessageCircle className="w-3 h-3" /> Message
          </button>
          {!isFriend && (
            <button onClick={() => onAddFriend(user.id)} disabled={sendingRequest === user.id} className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1" style={{ background: 'rgba(79,195,247,0.12)', color: '#4fc3f7', border: '1px solid rgba(79,195,247,0.2)' }}>
              {sendingRequest === user.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserPlus className="w-3 h-3" />} Add Friend
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
